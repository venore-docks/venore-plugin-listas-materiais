import { beginOperation, endOperation } from "@venore/plugin-sdk/observability";
import { editionFileName, renderEditionPdf } from "../../shared/edition-pdf";
import { findEditionById, findRevisionById, findSegmentById } from "../../shared/edition-store";
import { uploadListasFile } from "../../shared/upload";
import { failure } from "../../shared/results";
import { markEditionPublished } from "./store";
import type { PublishEditionCommand, PublishEditionResult } from "./types";

export async function publishEdition(command: PublishEditionCommand): Promise<PublishEditionResult> {
  const handle = beginOperation({
    useCase: "listas-materiais.publish-edition",
    actor: { id: command.actorId, type: "user" },
    kind: "write",
  });
  const finish = (result: PublishEditionResult) => {
    endOperation(handle, result);
    return result;
  };

  const edition = await findEditionById(command.editionId);
  const segment = edition ? await findSegmentById(edition.segmentId) : null;
  if (!edition || !segment) return finish(failure("edition_not_found", "Lista não encontrada."));
  if (edition.status !== "approved" || !edition.approvedRevisionId) {
    return finish(failure("not_approved", "Só uma lista aprovada pela direção pode ser publicada."));
  }
  const revision = await findRevisionById(edition.approvedRevisionId);
  if (!revision) return finish(failure("revision_missing", "A versão aprovada não foi encontrada."));

  // O PDF publicado sai da revisão congelada na aprovação, nunca do rascunho vivo.
  const pdf = await renderEditionPdf(revision.content, edition.year);
  const fileName = editionFileName(segment, edition.year);
  const uploaded = await uploadListasFile({
    filename: fileName,
    contentType: "application/pdf",
    data: Buffer.from(pdf.bytes),
    allowedMimeCategories: ["document"],
  });
  if (!uploaded.success) return finish(uploaded);

  const published = await markEditionPublished({
    editionId: edition.id,
    revisionId: revision.id,
    pdfMediaId: uploaded.data.id,
    actorId: command.actorId,
  });
  if (!published) {
    return finish(failure("changed_while_publishing", "A lista foi alterada enquanto o PDF era gerado — ela precisa ser aprovada de novo."));
  }
  return finish({ success: true, data: { edition: published, skipped: pdf.skipped } });
}
