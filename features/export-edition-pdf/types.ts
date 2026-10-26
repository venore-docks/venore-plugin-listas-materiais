import type { OperationResult } from "@venore/plugin-sdk";

// draft = o que está no editor agora (prévia); approved = revisão aprovada pela direção, ainda não
// publicada; published = o PDF oficial que o marketing divulgou.
export const PDF_SOURCES = ["draft", "approved", "published"] as const;
export type PdfSource = (typeof PDF_SOURCES)[number];

export type ExportEditionPdfInput = { editionId: string; source: PdfSource };

export type ExportedPdf = { fileName: string; bytes: Uint8Array; skipped: string[] };
export type ExportEditionPdfResult = OperationResult<ExportedPdf>;
