import { and, eq } from "drizzle-orm";
import { db } from "@venore/plugin-sdk";
import type { EditionRecord } from "../../contracts/types";
import { listasEditions } from "../../database/schema";
import { recordEditionEvent, toEditionRecord } from "../../shared/edition-store";

export async function markEditionInReview(command: { editionId: string; expectedVersion: number; actorId: string }): Promise<EditionRecord | null> {
  return db.transaction(async (tx) => {
    const [row] = await tx
      .update(listasEditions)
      .set({ status: "in_review", reviewNote: null, updatedAt: new Date() })
      .where(
        and(
          eq(listasEditions.id, command.editionId),
          eq(listasEditions.version, command.expectedVersion),
          eq(listasEditions.status, "draft"),
        ),
      )
      .returning();
    if (!row) return null;
    await recordEditionEvent(tx, { editionId: command.editionId, action: "submitted", actorId: command.actorId });
    return toEditionRecord(row);
  });
}
