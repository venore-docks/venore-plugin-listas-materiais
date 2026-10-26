import type { OperationResult } from "@venore/plugin-sdk";

export function failure<T = never>(code: string, message: string): OperationResult<T> {
  return { success: false, error: { code: `listas-materiais.${code}`, message } };
}

export const STATUS_LABELS = {
  draft: "Rascunho",
  in_review: "Aguardando aprovação",
  approved: "Aprovada",
  published: "Publicada",
} as const;
