import { authorizeActor } from "@venore/plugin-sdk/rbac";
import { LISTAS_PERMISSIONS } from "../../shared/permissions";
import { deleteSegment } from "./service";
import type { DeleteSegmentInput, DeleteSegmentResult } from "./types";

export async function deleteSegmentHandler(input: DeleteSegmentInput): Promise<DeleteSegmentResult> {
  const authz = await authorizeActor(LISTAS_PERMISSIONS.delete);
  if (!authz.authorized) return { success: false, error: authz.error };
  return deleteSegment({ segmentId: input.segmentId, confirmName: input.confirmName ?? "", actorId: authz.actorId });
}
