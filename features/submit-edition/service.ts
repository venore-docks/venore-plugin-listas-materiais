import { beginOperation, endOperation } from "@venore/plugin-sdk/observability";
import { failure } from "../../shared/results";
import { markEditionInReview } from "./store";
import type { SubmitEditionCommand, SubmitEditionResult } from "./types";

export async function submitEdition(command: SubmitEditionCommand): Promise<SubmitEditionResult> {
  const handle = beginOperation({
    useCase: "listas-materiais.submit-edition",
    actor: { id: command.actorId, type: "user" },
    kind: "write",
  });

  const updated = await markEditionInReview(command);
  const result: SubmitEditionResult = updated
    ? { success: true, data: updated }
    : failure("invalid_transition", "Só um rascunho salvo pode ser enviado para aprovação — recarregue a página e tente de novo.");
  endOperation(handle, result);
  return result;
}
