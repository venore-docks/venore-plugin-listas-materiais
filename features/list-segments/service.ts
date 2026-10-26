import { beginOperation, endOperation } from "@venore/plugin-sdk/observability";
import { selectSegmentsOverview } from "./store";
import type { ListSegmentsResult } from "./types";

export async function listSegments(command: { actorId: string }): Promise<ListSegmentsResult> {
  const handle = beginOperation({
    useCase: "listas-materiais.list-segments",
    actor: { id: command.actorId, type: "user" },
    kind: "read",
  });
  const data = await selectSegmentsOverview();
  endOperation(handle, { success: true });
  return { success: true, data };
}
