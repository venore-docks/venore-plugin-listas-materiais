import { beginOperation, endOperation } from "@venore/plugin-sdk/observability";
import { editionFileName, renderEditionPdf } from "../../shared/edition-pdf";
import { findEditionById, findRevisionById, findSegmentById } from "../../shared/edition-store";
import { createListasMediaLoader } from "../../shared/media";
import { failure } from "../../shared/results";
import type { ExportEditionPdfInput, ExportEditionPdfResult } from "./types";

// Mude quando o render do PDF mudar (capa, CSS, barra lateral): invalida o cache dos navegadores.
const PDF_RENDER_REVISION = "r1";

// Gerar o PDF abre um Chromium — a parte cara. O ETag identifica o conteúdo SEM gerar nada: rascunho
// = id + versão (cada salvar incrementa), aprovada = id da revisão congelada, publicada = id do
// arquivo. Se o navegador já tem essa versão, a resposta é 304 e nenhum Chromium sobe.
export async function exportEditionPdf(
  command: ExportEditionPdfInput & { actorId: string; ifNoneMatch?: string | null },
): Promise<ExportEditionPdfResult> {
  const handle = beginOperation({
    useCase: "listas-materiais.export-edition-pdf",
    actor: { id: command.actorId, type: "user" },
    kind: "read",
  });
  const finish = (result: ExportEditionPdfResult) => {
    endOperation(handle, result.success ? { success: true } : result);
    return result;
  };
  const tagged = (key: string) => `"${PDF_RENDER_REVISION}-${key}"`;
  const notModified = (etag: string): ExportEditionPdfResult => ({
    success: true,
    data: { fileName: "", bytes: new Uint8Array(), skipped: [], etag, notModified: true },
  });

  const edition = await findEditionById(command.editionId);
  const segment = edition ? await findSegmentById(edition.segmentId) : null;
  if (!edition || !segment) return finish(failure("edition_not_found", "Lista não encontrada."));

  if (command.source === "published") {
    if (!edition.publishedPdfMediaId) return finish(failure("not_published", "Esta lista ainda não foi publicada."));
    const etag = tagged(`p-${edition.publishedPdfMediaId}`);
    if (command.ifNoneMatch === etag) return finish(notModified(etag));
    const loadMedia = await createListasMediaLoader();
    const file = await loadMedia(edition.publishedPdfMediaId);
    if (!file) return finish(failure("published_file_missing", "O arquivo publicado não foi encontrado na biblioteca de mídia."));
    return finish({
      success: true,
      data: { fileName: editionFileName(segment, edition.year), bytes: file.bytes, skipped: [], etag },
    });
  }

  if (command.source === "approved") {
    const revision = edition.approvedRevisionId ? await findRevisionById(edition.approvedRevisionId) : null;
    if (!revision) return finish(failure("not_approved", "Esta lista ainda não tem versão aprovada."));
    const etag = tagged(`a-${revision.id}`);
    if (command.ifNoneMatch === etag) return finish(notModified(etag));
    const pdf = await renderEditionPdf(revision.content, edition.year);
    return finish({
      success: true,
      data: { fileName: editionFileName(segment, edition.year, `Aprovada v${revision.number} - `), ...pdf, etag },
    });
  }

  const etag = tagged(`d-${edition.id}-v${edition.version}`);
  if (command.ifNoneMatch === etag) return finish(notModified(etag));
  const pdf = await renderEditionPdf(edition.content, edition.year);
  return finish({ success: true, data: { fileName: editionFileName(segment, edition.year, "Prévia - "), ...pdf, etag } });
}
