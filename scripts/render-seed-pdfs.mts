// Gera os PDFs do seed (sem banco) pelo mesmo pipeline do plugin, com o Chrome/Edge local — pra
// conferir o layout contra os PDFs de 2026 depois de mexer no render/CSS. Não roda no app.
// Uso (na pasta do plugin, com npm install feito): npx tsx scripts/render-seed-pdfs.mts <outDir> [slug] [--legacy]
import { writeFileSync, mkdirSync } from "node:fs";
import { EDICOES_2026 } from "../seeds/data/edicoes-2026";
import { SEED_ASSETS } from "../seeds/assets/index";
import { toEditionContent } from "../seeds/to-edition-content";
import { buildEditionPdf } from "../shared/pdf/build-edition-pdf";

const [outDir, only] = process.argv.slice(2).filter((a) => !a.startsWith("--"));
const legacy = process.argv.includes("--legacy");
mkdirSync(outDir, { recursive: true });

for (const seed of EDICOES_2026) {
  if (only && seed.slug !== only) continue;
  const content = toEditionContent(seed, (hash) => hash);
  if (legacy) {
    // Reverte as duas correções pra comparar com o PDF de 2026 como saiu.
    content.groups = content.groups.filter((g) => !(seed.slug === "ensino-medio" && g.name === "Ensino Religioso"));
    for (const g of content.groups) if (g.name === "Para todas as Matérias") g.name = "Para todas as Matéroas";
  }
  const started = Date.now();
  const result = await buildEditionPdf(content, seed.year, async (id) => {
    const asset = SEED_ASSETS[id];
    if (!asset) return null;
    return { bytes: Buffer.from(await asset.load(), "base64"), contentType: asset.contentType };
  });
  writeFileSync(`${outDir}/${seed.slug}.pdf`, result.bytes);
  console.log(seed.slug, `${(result.bytes.length / 1e6).toFixed(2)}MB`, `${Date.now() - started}ms`, "skipped:", result.skipped);
}
