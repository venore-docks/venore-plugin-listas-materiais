import { desc, eq } from "drizzle-orm";
import { db } from "@venore/plugin-sdk";
import { listasEditionEvents, listasEditions, listasRevisions, listasSegments } from "../database/schema";
import type {
  EditionEventAction,
  EditionEventRecord,
  EditionRecord,
  EditionStatus,
  RevisionRecord,
  SegmentRecord,
} from "../contracts/types";

// Consultas repetidas entre features (mesmo papel do shared/ do vagas): ler edição/segmento,
// registrar evento do histórico.

type Executor = Pick<typeof db, "select" | "insert" | "update">;

export function toEditionRecord(row: typeof listasEditions.$inferSelect): EditionRecord {
  return { ...row, status: row.status as EditionStatus };
}

export async function findEditionById(editionId: string, executor: Executor = db): Promise<EditionRecord | null> {
  const [row] = await executor.select().from(listasEditions).where(eq(listasEditions.id, editionId)).limit(1);
  return row ? toEditionRecord(row) : null;
}

export async function findSegmentById(segmentId: string): Promise<SegmentRecord | null> {
  const [row] = await db.select().from(listasSegments).where(eq(listasSegments.id, segmentId)).limit(1);
  return row ?? null;
}

export async function findRevisionById(revisionId: string): Promise<RevisionRecord | null> {
  const [row] = await db.select().from(listasRevisions).where(eq(listasRevisions.id, revisionId)).limit(1);
  return row ?? null;
}

export async function listEditionEvents(editionId: string): Promise<EditionEventRecord[]> {
  const rows = await db
    .select()
    .from(listasEditionEvents)
    .where(eq(listasEditionEvents.editionId, editionId))
    .orderBy(desc(listasEditionEvents.createdAt));
  return rows.map((row) => ({ ...row, action: row.action as EditionEventAction }));
}

// Salvar várias vezes seguidas não enche o histórico: o mesmo autor salvando de novo em até 30 min
// só atualiza o horário do último "saved".
const SAVE_COALESCE_WINDOW_MS = 30 * 60 * 1000;

export async function recordEditionEvent(
  executor: Executor,
  event: { editionId: string; action: EditionEventAction; actorId: string; note?: string | null },
): Promise<void> {
  if (event.action === "saved") {
    const [last] = await executor
      .select()
      .from(listasEditionEvents)
      .where(eq(listasEditionEvents.editionId, event.editionId))
      .orderBy(desc(listasEditionEvents.createdAt))
      .limit(1);
    if (
      last &&
      last.action === "saved" &&
      last.actorId === event.actorId &&
      Date.now() - last.createdAt.getTime() < SAVE_COALESCE_WINDOW_MS
    ) {
      await executor.update(listasEditionEvents).set({ createdAt: new Date() }).where(eq(listasEditionEvents.id, last.id));
      return;
    }
  }

  await executor.insert(listasEditionEvents).values({
    editionId: event.editionId,
    action: event.action,
    actorId: event.actorId,
    note: event.note ?? null,
  });
}
