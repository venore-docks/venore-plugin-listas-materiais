import { authorizeActor } from "@venore/plugin-sdk/rbac";
import { LISTAS_PERMISSIONS } from "../../shared/permissions";
import { getEdition } from "./service";
import type { GetEditionInput, GetEditionResult } from "./types";

export async function getEditionHandler(input: GetEditionInput): Promise<GetEditionResult> {
  const authz = await authorizeActor(LISTAS_PERMISSIONS.read);
  if (!authz.authorized) return { success: false, error: authz.error };
  return getEdition({ editionId: input.editionId, actorId: authz.actorId });
}
