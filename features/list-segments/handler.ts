import { authorizeActor } from "@venore/plugin-sdk/rbac";
import { LISTAS_PERMISSIONS } from "../../shared/permissions";
import { listSegments } from "./service";
import type { ListSegmentsResult } from "./types";

export async function listSegmentsHandler(): Promise<ListSegmentsResult> {
  const authz = await authorizeActor(LISTAS_PERMISSIONS.read);
  if (!authz.authorized) return { success: false, error: authz.error };
  return listSegments({ actorId: authz.actorId });
}
