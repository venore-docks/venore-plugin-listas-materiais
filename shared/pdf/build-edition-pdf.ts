import { PDFDocument, rgb } from "pdf-lib";
import type { EditionContent, SectionKind } from "../../contracts/types";
import { renderCoverDocument } from "../render/render-cover";
import { isSectionEmpty, renderSectionDocument } from "../render/render-sections";
import { launchPdfBrowser } from "./browser";

// Montagem do PDF final — porta das células "3.0" (HTML -> PDF por seção + barra lateral) e "4.0"
// (junta as páginas fixas e as seções na ordem do config) do notebook antigo.

export type LoadedMedia = { bytes: Uint8Array; contentType: string };
export type MediaLoader = (mediaId: string) => Promise<LoadedMedia | null>;

export type BuildEditionPdfResult = {
  bytes: Uint8Array;
  // Rótulos das páginas fixas sem arquivo (ou com arquivo ilegível) — o notebook avisava e pulava.
  skipped: string[];
};

// CORES_BARRA / LARGURA_BARRA do notebook: faixa de 5 mm na borda esquerda de toda página gerada,
// desenhada POR CIMA do conteúdo (pypdf merge_page), na altura de um A4 (297 mm).
const SIDE_BAR_COLORS: Record<SectionKind, ReturnType<typeof rgb>> = {
  info: hexColor("#f7a600"),
  list: hexColor("#0396a6"),
  book: hexColor("#004a99"),
};
const MM_TO_PT = 72 / 25.4;
const SIDE_BAR_WIDTH = 5 * MM_TO_PT;
const A4_HEIGHT = 297 * MM_TO_PT;

function hexColor(hex: string) {
  const value = Number.parseInt(hex.slice(1), 16);
  return rgb(((value >> 16) & 255) / 255, ((value >> 8) & 255) / 255, (value & 255) / 255);
}

async function loadBookImages(content: EditionContent, loadMedia: MediaLoader): Promise<Map<string, string>> {
  const ids = [...new Set(content.books.map((book) => book.imageMediaId).filter((id): id is string => Boolean(id)))];
  const entries = await Promise.all(
    ids.map(async (id): Promise<[string, string] | null> => {
      const media = await loadMedia(id);
      if (!media || !media.contentType.startsWith("image/")) return null;
      return [id, `data:${media.contentType};base64,${Buffer.from(media.bytes).toString("base64")}`];
    }),
  );
  return new Map(entries.filter((entry): entry is [string, string] => entry !== null));
}

export async function buildEditionPdf(content: EditionContent, year: number, loadMedia: MediaLoader): Promise<BuildEditionPdfResult> {
  const images = await loadBookImages(content, loadMedia);
  const output = await PDFDocument.create();
  const skipped: string[] = [];

  const browser = await launchPdfBrowser();
  try {
    const page = await browser.newPage();
    // Defesa em profundidade: o HTML já sai escapado (rich-text.ts), e o render nunca precisa de
    // rede — fonte e imagens vão embutidas em data: URI.
    await page.setRequestInterception(true);
    page.on("request", (request) => {
      const url = request.url();
      if (url.startsWith("data:") || url === "about:blank") void request.continue();
      else void request.abort();
    });

    for (const item of content.assembly) {
      if (item.kind === "static") {
        const media = item.mediaId ? await loadMedia(item.mediaId) : null;
        if (!media) {
          skipped.push(item.label);
          continue;
        }
        try {
          const source = await PDFDocument.load(media.bytes, { ignoreEncryption: true });
          const pages = await output.copyPages(source, source.getPageIndices());
          for (const copied of pages) output.addPage(copied);
        } catch {
          skipped.push(item.label);
        }
        continue;
      }

      if (item.kind === "cover") {
        // Logo extra ilegível não derruba a capa: ela sai só com o logo do colégio.
        const media = item.logoMediaId ? await loadMedia(item.logoMediaId) : null;
        const logo = media?.contentType.startsWith("image/")
          ? `data:${media.contentType};base64,${Buffer.from(media.bytes).toString("base64")}`
          : null;
        if (item.logoMediaId && !logo) skipped.push("Logo extra da capa");
        await page.setContent(
          renderCoverDocument({ year, subtitle: item.subtitle, topColor: item.topColor, bandColor: item.bandColor, logo }),
          { waitUntil: "load" },
        );
        await page.evaluate(() => document.fonts.ready.then(() => undefined));
        // A capa é medida em pt do A4 exato (@page size: A4); 8.27×11.69in é 0,2pt mais baixo e
        // jogaria a borda inferior pra uma segunda página.
        const coverBytes = await page.pdf({ preferCSSPageSize: true, printBackground: true });
        const cover = await PDFDocument.load(coverBytes);
        const [coverPage] = await output.copyPages(cover, [0]);
        output.addPage(coverPage);
        continue;
      }

      if (isSectionEmpty(item.section, content)) continue;

      await page.setContent(renderSectionDocument({ section: item.section, title: item.title, content, images }), {
        waitUntil: "load",
      });
      await page.evaluate(() => document.fonts.ready.then(() => undefined));
      const sectionBytes = await page.pdf({
        width: "8.27in",
        height: "11.69in",
        margin: { top: 0, right: 0, bottom: 0, left: 0 },
        printBackground: true,
      });

      const section = await PDFDocument.load(sectionBytes);
      const pages = await output.copyPages(section, section.getPageIndices());
      for (const copied of pages) {
        copied.drawRectangle({ x: 0, y: 0, width: SIDE_BAR_WIDTH, height: A4_HEIGHT, color: SIDE_BAR_COLORS[item.section] });
        output.addPage(copied);
      }
    }
  } finally {
    await browser.close();
  }

  return { bytes: await output.save(), skipped };
}
