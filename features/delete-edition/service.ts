import { beginOperation, endOperation } from "@venore/plugin-sdk/observability";
import { failure } from "../../shared/results";
import { deleteEditionRow } from "./store";
import type { DeleteEditionCommand, DeleteEditionResult } from "./types";

export async function deleteEdition(command: DeleteEditionCommand): Promise<DeleteEditionResult> {
  const handle = beginOperation({
    useCase: "listas-materiais.delete-edition",
    actor: { id: command.actorId, type: "user" },
    kind: "write",
  });
  const deleted = await deleteEditionRow(command.editionId);
  const result: DeleteEditionResult = deleted ? { success: true, data: deleted } : failure("edition_not_found", "Lista não encontrada.");
  endOperation(handle, result);
  return result;
}
