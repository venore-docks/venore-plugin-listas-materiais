import { uploadReservedCategoryAsset } from "@venore/plugin-sdk/media";
import type { UploadReservedCategoryAssetResult } from "@venore/plugin-sdk/media";
import { findExistingAssetByChecksum, sha256Hex } from "./media-refs";
import { LISTAS_FILES_CATEGORY } from "./permissions";

// Envio pra categoria do plugin. O driver de storage (Vercel Blob/S3) LANÇA em vez de devolver erro
// — ex: "Vercel Blob: This store has been suspended" — e a tela só mostraria uma falha genérica.
export async function uploadListasFile(input: {
  filename: string;
  contentType: string;
  data: Buffer;
  allowedMimeCategories?: string[];
  // Reaproveita arquivo idêntico já usado por alguma lista (padrão). O PDF gerado não usa.
  dedupe?: boolean;
}): Promise<UploadReservedCategoryAssetResult> {
  try {
    if (input.dedupe !== false) {
      const existing = await findExistingAssetByChecksum(sha256Hex(input.data));
      if (existing) return { success: true, data: existing } as UploadReservedCategoryAssetResult;
    }
    return await uploadReservedCategoryAsset({
      filename: input.filename,
      contentType: input.contentType,
      size: input.data.byteLength,
      data: input.data,
      categoryKey: LISTAS_FILES_CATEGORY.key,
      categoryName: LISTAS_FILES_CATEGORY.name,
      allowedMimeCategories: input.allowedMimeCategories,
    });
  } catch (cause) {
    return {
      success: false,
      error: {
        code: "listas-materiais.storage_failed",
        message: `O armazenamento de arquivos do site recusou "${input.filename}": ${cause instanceof Error ? cause.message : String(cause)}`,
      },
    };
  }
}
