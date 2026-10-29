import { beginOperation, endOperation } from "@venore/plugin-sdk/observability";
import { editionFileName, renderEditionPdf } from "../../shared/edition-pdf";
import { findEditionById, findRevisionById, findSegmentById } from "../../shared/edition-store";
import { createListasMediaLoader } from "../../shared/media";
import { failure } from "../../shared/results";
import type { ExportEditionPdfInput, ExportEditionPdfResult } from "./types";

export async function exportEditionPdf(command: ExportEditionPdfInput & { actorId: string }): Promise<ExportEditionPdfResult> {
  const handle = beginOperation({
    useCase: "listas-materiais.export-edition-pdf",
    actor: { id: command.actorId, type: "user" },
    kind: "read",
  });
  const finish = (result: ExportEditionPdfResult) => {
    endOperation(handle, result.success ? { success: true } : result);
    return result;
  };

  const edition = await findEditionById(command.editionId);
  const segment = edition ? await findSegmentById(edition.segmentId) : null;
  if (!edition || !segment) return finish(failure("edition_not_found", "Lista não encontrada."));

  if (command.source === "published") {
    if (!edition.publishedPdfMediaId) return finish(failure("not_published", "Esta lista ainda não foi publicada."));
    const loadMedia = await createListasMediaLoader();
    const file = await loadMedia(edition.publishedPdfMediaId);
    if (!file) return finish(failure("published_file_missing", "O arquivo publicado não foi encontrado na biblioteca de mídia."));
    return finish({
      success: true,
      data: { fileName: editionFileName(segment, edition.year), bytes: file.bytes, skipped: [] },
    });
  }

  if (command.source === "approved") {
    const revision = edition.approvedRevisionId ? await findRevisionById(edition.approvedRevisionId) : null;
    if (!revision) return finish(failure("not_approved", "Esta lista ainda não tem versão aprovada."));
    const pdf = await renderEditionPdf(revision.content, edition.year);
    return finish({
      success: true,
      data: { fileName: editionFileName(segment, edition.year, `Aprovada v${revision.number} - `), ...pdf },
    });
  }

  const pdf = await renderEditionPdf(edition.content, edition.year);
  return finish({ success: true, data: { fileName: editionFileName(segment, edition.year, "Prévia - "), ...pdf } });
}
