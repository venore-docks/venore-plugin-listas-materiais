import { listUsers } from "@venore/plugin-sdk/auth";
import { beginOperation, endOperation } from "@venore/plugin-sdk/observability";
import { findEditionById, findRevisionById, findSegmentById, listEditionEvents } from "../../shared/edition-store";
import { failure } from "../../shared/results";
import { selectSiblingYears } from "./store";
import type { GetEditionResult } from "./types";

const SEED_ACTOR_NAMES: Record<string, string> = { "system-seed": "Importação inicial" };

export async function getEdition(command: { editionId: string; actorId: string }): Promise<GetEditionResult> {
  const handle = beginOperation({
    useCase: "listas-materiais.get-edition",
    actor: { id: command.actorId, type: "user" },
    kind: "read",
  });

  const edition = await findEditionById(command.editionId);
  const segment = edition ? await findSegmentById(edition.segmentId) : null;
  if (!edition || !segment) {
    const result = failure<never>("edition_not_found", "Lista não encontrada.");
    endOperation(handle, result);
    return result;
  }

  const [events, approvedRevision, publishedRevision, siblingYears, users] = await Promise.all([
    listEditionEvents(edition.id),
    edition.approvedRevisionId ? findRevisionById(edition.approvedRevisionId) : null,
    edition.publishedRevisionId ? findRevisionById(edition.publishedRevisionId) : null,
    selectSiblingYears(segment.id),
    listUsers(),
  ]);

  // Usuário apagado deixa o id órfão no histórico (texto solto, sem FK) — mostra "Usuário removido".
  const nameById = new Map(users.success ? users.data.map((user) => [user.id, user.name ?? user.email]) : []);

  endOperation(handle, { success: true });
  return {
    success: true,
    data: {
      segment,
      edition,
      events: events.map((event) => ({
        ...event,
        actorName: SEED_ACTOR_NAMES[event.actorId] ?? nameById.get(event.actorId) ?? "Usuário removido",
      })),
      approvedRevisionNumber: approvedRevision?.number ?? null,
      publishedRevisionNumber: publishedRevision?.number ?? null,
      siblingYears,
    },
  };
}
