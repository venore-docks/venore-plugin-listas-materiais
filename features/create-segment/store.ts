import { max } from "drizzle-orm";
import { db } from "@venore/plugin-sdk";
import type { EditionContent, EditionRecord, SegmentRecord } from "../../contracts/types";
import { listasEditions, listasSegments } from "../../database/schema";
import { recordEditionEvent, toEditionRecord } from "../../shared/edition-store";

// null = slug já usado por outro segmento.
export async function insertSegmentWithEdition(command: {
  slug: string;
  name: string;
  year: number;
  content: EditionContent;
  actorId: string;
  sortOrder?: number;
  fileNameTemplate?: string;
  eventNote?: string;
}): Promise<{ segment: SegmentRecord; edition: EditionRecord } | null> {
  return db.transaction(async (tx) => {
    const [{ last }] = await tx.select({ last: max(listasSegments.sortOrder) }).from(listasSegments);
    const [segment] = await tx
      .insert(listasSegments)
      .values({
        slug: command.slug,
        name: command.name,
        sortOrder: command.sortOrder ?? (last ?? 0) + 10,
        ...(command.fileNameTemplate ? { fileNameTemplate: command.fileNameTemplate } : {}),
      })
      .onConflictDoNothing()
      .returning();
    if (!segment) return null;

    const [edition] = await tx
      .insert(listasEditions)
      .values({ segmentId: segment.id, year: command.year, content: command.content, updatedBy: command.actorId })
      .returning();
    await recordEditionEvent(tx, { editionId: edition.id, action: "created", actorId: command.actorId, note: command.eventNote ?? null });
    return { segment, edition: toEditionRecord(edition) };
  });
}
