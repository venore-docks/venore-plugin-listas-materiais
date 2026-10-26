import { authorizeActor } from "@venore/plugin-sdk/rbac";
import { LISTAS_PERMISSIONS } from "../../shared/permissions";
import { submitEdition } from "./service";
import type { SubmitEditionInput, SubmitEditionResult } from "./types";

export async function submitEditionHandler(input: SubmitEditionInput): Promise<SubmitEditionResult> {
  const authz = await authorizeActor([LISTAS_PERMISSIONS.edit, LISTAS_PERMISSIONS.design]);
  if (!authz.authorized) return { success: false, error: authz.error };
  return submitEdition({ ...input, actorId: authz.actorId });
}
