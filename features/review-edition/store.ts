import { and, eq, max } from "drizzle-orm";
import { db } from "@venore/plugin-sdk";
import type { EditionRecord } from "../../contracts/types";
import { listasEditions, listasRevisions } from "../../database/schema";
import { findEditionById, recordEditionEvent, toEditionRecord } from "../../shared/edition-store";

const inReviewAt = (editionId: string, version: number) =>
  and(eq(listasEditions.id, editionId), eq(listasEditions.version, version), eq(listasEditions.status, "in_review"));

// Aprovar = congelar o conteúdo numa revisão nova (número sequencial por edição).
export async function approveEdition(command: { editionId: string; expectedVersion: number; actorId: string; note: string | null }): Promise<EditionRecord | null> {
  return db.transaction(async (tx) => {
    const edition = await findEditionById(command.editionId, tx);
    if (!edition || edition.status !== "in_review" || edition.version !== command.expectedVersion) return null;

    const [{ last }] = await tx
      .select({ last: max(listasRevisions.number) })
      .from(listasRevisions)
      .where(eq(listasRevisions.editionId, command.editionId));
    const [revision] = await tx
      .insert(listasRevisions)
      .values({ editionId: command.editionId, number: (last ?? 0) + 1, content: edition.content, approvedBy: command.actorId })
      .returning();

    const [row] = await tx
      .update(listasEditions)
      .set({ status: "approved", approvedRevisionId: revision.id, reviewNote: null, updatedAt: new Date() })
      .where(inReviewAt(command.editionId, command.expectedVersion))
      .returning();
    if (!row) throw new Error("A lista mudou durante a aprovação.");

    await recordEditionEvent(tx, { editionId: command.editionId, action: "approved", actorId: command.actorId, note: command.note });
    return toEditionRecord(row);
  });
}

export async function rejectEdition(command: { editionId: string; expectedVersion: number; actorId: string; note: string }): Promise<EditionRecord | null> {
  return db.transaction(async (tx) => {
    const [row] = await tx
      .update(listasEditions)
      .set({ status: "draft", reviewNote: command.note, updatedAt: new Date() })
      .where(inReviewAt(command.editionId, command.expectedVersion))
      .returning();
    if (!row) return null;
    await recordEditionEvent(tx, { editionId: command.editionId, action: "rejected", actorId: command.actorId, note: command.note });
    return toEditionRecord(row);
  });
}
