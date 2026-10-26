import { authorizeActor } from "@venore/plugin-sdk/rbac";
import { parseEditionContent } from "../../shared/content-schema";
import { LISTAS_PERMISSIONS } from "../../shared/permissions";
import { failure } from "../../shared/results";
import { saveEdition } from "./service";
import type { SaveEditionInput, SaveEditionResult } from "./types";

export async function saveEditionHandler(input: SaveEditionInput): Promise<SaveEditionResult> {
  const content = parseEditionContent(input.content);
  if (!content || !input.editionId || !Number.isInteger(input.expectedVersion)) {
    return failure("invalid_content", "Os dados da lista vieram incompletos ou em formato inválido.");
  }

  const authz = await authorizeActor([LISTAS_PERMISSIONS.edit, LISTAS_PERMISSIONS.design]);
  if (!authz.authorized) return { success: false, error: authz.error };

  // Qual parte do documento o ator pode mexer é decidido no service, comparando com o salvo.
  const [canEditContent, canEditAssembly] = await Promise.all([
    authorizeActor(LISTAS_PERMISSIONS.edit).then((result) => result.authorized),
    authorizeActor(LISTAS_PERMISSIONS.design).then((result) => result.authorized),
  ]);

  return saveEdition({
    editionId: input.editionId,
    expectedVersion: input.expectedVersion,
    content,
    actorId: authz.actorId,
    canEditContent,
    canEditAssembly,
  });
}
