import { authorizeActor } from "@venore/plugin-sdk/rbac";
import { LISTAS_PERMISSIONS } from "../../shared/permissions";
import { failure } from "../../shared/results";
import { exportEditionPdf } from "./service";
import { PDF_SOURCES, type ExportEditionPdfInput, type ExportEditionPdfResult } from "./types";

// Os três perfis (read) baixam qualquer versão: prévia do rascunho, aprovada e publicada.
export async function exportEditionPdfHandler(input: ExportEditionPdfInput): Promise<ExportEditionPdfResult> {
  if (!input.editionId || !PDF_SOURCES.includes(input.source)) {
    return failure("invalid_source", "Versão do PDF inválida.");
  }
  const authz = await authorizeActor(LISTAS_PERMISSIONS.read);
  if (!authz.authorized) return { success: false, error: authz.error };
  return exportEditionPdf({ ...input, actorId: authz.actorId });
}
