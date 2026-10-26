import { desc, eq } from "drizzle-orm";
import { db } from "@venore/plugin-sdk";
import type { EditionContent, EditionRecord } from "../../contracts/types";
import { listasEditions } from "../../database/schema";
import { recordEditionEvent, toEditionRecord } from "../../shared/edition-store";

export async function findLatestEdition(segmentId: string): Promise<EditionRecord | null> {
  const [row] = await db
    .select()
    .from(listasEditions)
    .where(eq(listasEditions.segmentId, segmentId))
    .orderBy(desc(listasEditions.year))
    .limit(1);
  return row ? toEditionRecord(row) : null;
}

// null = já existe edição desse ano (unique segment_id + year).
export async function insertEdition(command: {
  segmentId: string;
  year: number;
  content: EditionContent;
  actorId: string;
  note: string;
}): Promise<EditionRecord | null> {
  return db.transaction(async (tx) => {
    const [row] = await tx
      .insert(listasEditions)
      .values({ segmentId: command.segmentId, year: command.year, content: command.content, updatedBy: command.actorId })
      .onConflictDoNothing()
      .returning();
    if (!row) return null;
    await recordEditionEvent(tx, { editionId: row.id, action: "created", actorId: command.actorId, note: command.note });
    return toEditionRecord(row);
  });
}
