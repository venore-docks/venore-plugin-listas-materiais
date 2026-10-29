import type { EditionContent, SegmentRecord } from "../contracts/types";
import { createListasMediaLoader } from "./media";
import { buildEditionPdf, type BuildEditionPdfResult } from "./pdf/build-edition-pdf";

// pacote_final.nome_arquivo_final do config antigo: "Lista de Materiais {ano} - {segmento}.pdf".
export function editionFileName(segment: SegmentRecord, year: number, prefix = ""): string {
  const name = segment.fileNameTemplate.replaceAll("{ano}", String(year)).replaceAll("{segmento}", segment.name);
  return `${prefix}${name.toLowerCase().endsWith(".pdf") ? name : `${name}.pdf`}`;
}

export async function renderEditionPdf(content: EditionContent, year: number): Promise<BuildEditionPdfResult> {
  return buildEditionPdf(content, year, await createListasMediaLoader());
}
