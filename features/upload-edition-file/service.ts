import { beginOperation, endOperation } from "@venore/plugin-sdk/observability";
import { uploadListasFile } from "../../shared/upload";
import type { UploadEditionFileInput, UploadEditionFileResult } from "./types";

// Sobe pra categoria reservada do plugin (não a biblioteca geral, que exige media.manage): o arquivo
// nasce "restricted" a listas-materiais.read (manifest.restrictedUploadCategories), legível pelos
// três perfis — inclusive no PDF que outra pessoa gerar.
export async function uploadEditionFile(command: UploadEditionFileInput & { actorId: string }): Promise<UploadEditionFileResult> {
  const handle = beginOperation({
    useCase: "listas-materiais.upload-edition-file",
    actor: { id: command.actorId, type: "user" },
    kind: "write",
  });

  const uploaded = await uploadListasFile({
    filename: command.filename,
    contentType: command.contentType,
    data: command.data,
    allowedMimeCategories: [command.kind === "pdf" ? "document" : "image"],
  });

  const result: UploadEditionFileResult = uploaded.success
    ? { success: true, data: { id: uploaded.data.id, url: uploaded.data.url, filename: uploaded.data.filename } }
    : uploaded;
  endOperation(handle, result);
  return result;
}
