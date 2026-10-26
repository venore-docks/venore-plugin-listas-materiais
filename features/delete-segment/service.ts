import { beginOperation, endOperation } from "@venore/plugin-sdk/observability";
import { findSegmentById } from "../../shared/edition-store";
import { failure } from "../../shared/results";
import { countSegmentEditions, deleteSegmentRow } from "./store";
import type { DeleteSegmentCommand, DeleteSegmentResult } from "./types";

export async function deleteSegment(command: DeleteSegmentCommand): Promise<DeleteSegmentResult> {
  const handle = beginOperation({
    useCase: "listas-materiais.delete-segment",
    actor: { id: command.actorId, type: "user" },
    kind: "write",
  });
  const finish = (result: DeleteSegmentResult) => {
    endOperation(handle, result);
    return result;
  };

  const segment = await findSegmentById(command.segmentId);
  if (!segment) return finish(failure("segment_not_found", "Segmento não encontrado."));
  if (command.confirmName.trim() !== segment.name.trim()) {
    return finish(failure("confirm_mismatch", "O nome digitado não confere com o do segmento."));
  }

  const editions = await countSegmentEditions(segment.id);
  if (!(await deleteSegmentRow(segment.id))) return finish(failure("segment_not_found", "Segmento não encontrado."));
  return finish({ success: true, data: { name: segment.name, editions } });
}
