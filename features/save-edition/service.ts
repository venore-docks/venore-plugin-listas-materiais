import { beginOperation, endOperation } from "@venore/plugin-sdk/observability";
import { hasAssemblyChanged, hasListContentChanged } from "../../shared/content-schema";
import { findEditionById } from "../../shared/edition-store";
import { failure, STATUS_LABELS } from "../../shared/results";
import { updateEditionContent } from "./store";
import type { SaveEditionCommand, SaveEditionResult } from "./types";

export async function saveEdition(command: SaveEditionCommand): Promise<SaveEditionResult> {
  const handle = beginOperation({
    useCase: "listas-materiais.save-edition",
    actor: { id: command.actorId, type: "user" },
    kind: "write",
  });
  const finish = (result: SaveEditionResult) => {
    endOperation(handle, result);
    return result;
  };

  const current = await findEditionById(command.editionId);
  if (!current) return finish(failure("edition_not_found", "Lista não encontrada."));
  if (current.version !== command.expectedVersion) {
    return finish(
      failure("version_conflict", "Outra pessoa salvou esta lista enquanto você editava. Recarregue a página para ver a versão atual."),
    );
  }

  const listChanged = hasListContentChanged(current.content, command.content);
  const assemblyChanged = hasAssemblyChanged(current.content, command.content);
  if (!listChanged && !assemblyChanged) return finish({ success: true, data: current });
  if (listChanged && !command.canEditContent) {
    return finish(failure("forbidden_content", "Você não tem permissão para alterar itens, turmas e livros."));
  }
  if (assemblyChanged && !command.canEditAssembly) {
    return finish(failure("forbidden_assembly", "Você não tem permissão para alterar capas e a ordem das páginas."));
  }

  // Edição depois de enviada/aprovada/publicada volta pra rascunho e precisa de nova aprovação; o
  // PDF publicado continua valendo até a próxima publicação.
  const eventNote = current.status === "draft" ? null : `Alterada quando estava "${STATUS_LABELS[current.status]}" — voltou para rascunho.`;
  const saved = await updateEditionContent({
    editionId: command.editionId,
    expectedVersion: command.expectedVersion,
    content: command.content,
    actorId: command.actorId,
    eventNote,
  });
  if (!saved) {
    return finish(
      failure("version_conflict", "Outra pessoa salvou esta lista enquanto você editava. Recarregue a página para ver a versão atual."),
    );
  }
  return finish({ success: true, data: saved });
}
