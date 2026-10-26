import { beginOperation, endOperation } from "@venore/plugin-sdk/observability";
import { failure } from "../../shared/results";
import { findLatestEdition, insertEdition } from "./store";
import type { StartNextYearCommand, StartNextYearResult } from "./types";

// Ano novo nunca começa do zero: copia a lista do último ano (itens, livros, capas e ordem) como
// rascunho. As capas do ano anterior trazem o ano antigo impresso — o marketing troca na aba Montagem.
export async function startNextYear(command: StartNextYearCommand): Promise<StartNextYearResult> {
  const handle = beginOperation({
    useCase: "listas-materiais.start-next-year",
    actor: { id: command.actorId, type: "user" },
    kind: "write",
  });
  const finish = (result: StartNextYearResult) => {
    endOperation(handle, result);
    return result;
  };

  const latest = await findLatestEdition(command.segmentId);
  if (!latest) return finish(failure("no_previous_edition", "Este segmento ainda não tem nenhuma lista para copiar."));

  const year = latest.year + 1;
  const created = await insertEdition({
    segmentId: command.segmentId,
    year,
    content: latest.content,
    actorId: command.actorId,
    note: `Criada a partir da lista de ${latest.year}.`,
  });
  if (!created) return finish(failure("year_exists", `A lista de ${year} deste segmento já existe.`));
  return finish({ success: true, data: created });
}
