import { beginOperation, endOperation } from "@venore/plugin-sdk/observability";
import { failure } from "../../shared/results";
import { approveEdition, rejectEdition } from "./store";
import type { ReviewEditionCommand, ReviewEditionResult } from "./types";

export async function reviewEdition(command: ReviewEditionCommand): Promise<ReviewEditionResult> {
  const handle = beginOperation({
    useCase: `listas-materiais.${command.decision}-edition`,
    actor: { id: command.actorId, type: "user" },
    kind: "write",
  });

  const note = command.note?.trim() || null;
  const updated =
    command.decision === "approve"
      ? await approveEdition({ editionId: command.editionId, expectedVersion: command.expectedVersion, actorId: command.actorId, note })
      : await rejectEdition({ editionId: command.editionId, expectedVersion: command.expectedVersion, actorId: command.actorId, note: note ?? "" });

  const result: ReviewEditionResult = updated
    ? { success: true, data: updated }
    : failure("invalid_transition", "A lista não está mais aguardando aprovação ou foi alterada — recarregue a página.");
  endOperation(handle, result);
  return result;
}
