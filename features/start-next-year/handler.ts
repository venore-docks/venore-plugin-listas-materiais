import { authorizeActor } from "@venore/plugin-sdk/rbac";
import { LISTAS_PERMISSIONS } from "../../shared/permissions";
import { startNextYear } from "./service";
import type { StartNextYearInput, StartNextYearResult } from "./types";

export async function startNextYearHandler(input: StartNextYearInput): Promise<StartNextYearResult> {
  const authz = await authorizeActor([LISTAS_PERMISSIONS.edit, LISTAS_PERMISSIONS.design]);
  if (!authz.authorized) return { success: false, error: authz.error };
  return startNextYear({ ...input, actorId: authz.actorId });
}
