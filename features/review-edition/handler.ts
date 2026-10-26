import { authorizeActor } from "@venore/plugin-sdk/rbac";
import { LISTAS_PERMISSIONS } from "../../shared/permissions";
import { failure } from "../../shared/results";
import { reviewEdition } from "./service";
import type { ReviewEditionInput, ReviewEditionResult } from "./types";

export async function reviewEditionHandler(input: ReviewEditionInput): Promise<ReviewEditionResult> {
  if (input.decision !== "approve" && input.decision !== "reject") {
    return failure("invalid_decision", "Decisão inválida.");
  }
  if (input.decision === "reject" && !input.note?.trim()) {
    return failure("missing_note", "Escreva o motivo da devolução para a coordenação saber o que ajustar.");
  }
  if ((input.note?.length ?? 0) > 2000) {
    return failure("note_too_long", "O comentário pode ter no máximo 2000 caracteres.");
  }

  const authz = await authorizeActor(LISTAS_PERMISSIONS.approve);
  if (!authz.authorized) return { success: false, error: authz.error };
  return reviewEdition({ ...input, actorId: authz.actorId });
}
