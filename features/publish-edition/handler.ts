import { authorizeActor } from "@venore/plugin-sdk/rbac";
import { LISTAS_PERMISSIONS } from "../../shared/permissions";
import { publishEdition } from "./service";
import type { PublishEditionInput, PublishEditionResult } from "./types";

export async function publishEditionHandler(input: PublishEditionInput): Promise<PublishEditionResult> {
  const authz = await authorizeActor(LISTAS_PERMISSIONS.publish);
  if (!authz.authorized) return { success: false, error: authz.error };
  return publishEdition({ ...input, actorId: authz.actorId });
}
