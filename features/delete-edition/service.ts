import { beginOperation, endOperation } from "@venore/plugin-sdk/observability";
import { collectEditionMediaIds, deleteOrphanedMedia } from "../../shared/media-refs";
import { failure } from "../../shared/results";
import { deleteEditionRow } from "./store";
import type { DeleteEditionCommand, DeleteEditionResult } from "./types";

export async function deleteEdition(command: DeleteEditionCommand): Promise<DeleteEditionResult> {
  const handle = beginOperation({
    useCase: "listas-materiais.delete-edition",
    actor: { id: command.actorId, type: "user" },
    kind: "write",
  });
  const mediaIds = await collectEditionMediaIds([command.editionId]);
  const deleted = await deleteEditionRow(command.editionId);
  // Arquivo que só esta lista usava vai embora; o que outro ano/segmento ainda referencia fica.
  if (deleted) await deleteOrphanedMedia(mediaIds);
  const result: DeleteEditionResult = deleted ? { success: true, data: deleted } : failure("edition_not_found", "Lista não encontrada.");
  endOperation(handle, result);
  return result;
}
