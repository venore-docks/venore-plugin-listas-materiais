import type { OperationResult } from "@venore/plugin-sdk";

// draft = o que está no editor agora (prévia); approved = revisão aprovada pela direção, ainda não
// publicada; published = o PDF oficial que o marketing divulgou.
export const PDF_SOURCES = ["draft", "approved", "published"] as const;
export type PdfSource = (typeof PDF_SOURCES)[number];

// ifNoneMatch: ETag que o navegador já tem — igual ao atual, o PDF nem é gerado (notModified).
export type ExportEditionPdfInput = { editionId: string; source: PdfSource; ifNoneMatch?: string | null };

export type ExportedPdf = { fileName: string; bytes: Uint8Array; skipped: string[]; etag: string; notModified?: boolean };
export type ExportEditionPdfResult = OperationResult<ExportedPdf>;
