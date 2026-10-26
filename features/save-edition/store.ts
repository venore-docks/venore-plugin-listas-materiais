import { and, eq, sql } from "drizzle-orm";
import { db } from "@venore/plugin-sdk";
import type { EditionContent, EditionRecord } from "../../contracts/types";
import { listasEditions } from "../../database/schema";
import { recordEditionEvent, toEditionRecord } from "../../shared/edition-store";

// Update condicional na versão (lock otimista): 0 linhas = alguém salvou antes.
export async function updateEditionContent(input: {
  editionId: string;
  expectedVersion: number;
  content: EditionContent;
  actorId: string;
  eventNote: string | null;
}): Promise<EditionRecord | null> {
  return db.transaction(async (tx) => {
    const [row] = await tx
      .update(listasEditions)
      .set({
        content: input.content,
        status: "draft",
        version: sql`${listasEditions.version} + 1`,
        updatedBy: input.actorId,
        updatedAt: new Date(),
      })
      .where(and(eq(listasEditions.id, input.editionId), eq(listasEditions.version, input.expectedVersion)))
      .returning();
    if (!row) return null;

    await recordEditionEvent(tx, { editionId: input.editionId, action: "saved", actorId: input.actorId, note: input.eventNote });
    return toEditionRecord(row);
  });
}
