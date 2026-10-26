import { authorizeActor } from "@venore/plugin-sdk/rbac";
import { LISTAS_PERMISSIONS } from "../../shared/permissions";
import { deleteEdition } from "./service";
import type { DeleteEditionInput, DeleteEditionResult } from "./types";

export async function deleteEditionHandler(input: DeleteEditionInput): Promise<DeleteEditionResult> {
  const authz = await authorizeActor(LISTAS_PERMISSIONS.delete);
  if (!authz.authorized) return { success: false, error: authz.error };
  return deleteEdition({ ...input, actorId: authz.actorId });
}
