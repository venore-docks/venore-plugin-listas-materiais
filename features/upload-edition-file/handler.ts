import { authorizeActor } from "@venore/plugin-sdk/rbac";
import { LISTAS_PERMISSIONS } from "../../shared/permissions";
import { failure } from "../../shared/results";
import { uploadEditionFile } from "./service";
import type { UploadEditionFileInput, UploadEditionFileResult } from "./types";

export async function uploadEditionFileHandler(input: UploadEditionFileInput): Promise<UploadEditionFileResult> {
  if (input.kind === "pdf" && input.contentType !== "application/pdf") {
    return failure("invalid_file", "A página fixa precisa ser um arquivo PDF.");
  }
  if (input.kind === "image" && !input.contentType.startsWith("image/")) {
    return failure("invalid_file", "A capa do livro precisa ser uma imagem (JPG ou PNG).");
  }

  // Capa de livro é conteúdo (coordenação ou marketing); página fixa é montagem (só marketing).
  const authz = await authorizeActor(
    input.kind === "pdf" ? LISTAS_PERMISSIONS.design : [LISTAS_PERMISSIONS.edit, LISTAS_PERMISSIONS.design],
  );
  if (!authz.authorized) return { success: false, error: authz.error };
  return uploadEditionFile({ ...input, actorId: authz.actorId });
}
