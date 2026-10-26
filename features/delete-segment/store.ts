import { count, eq } from "drizzle-orm";
import { db } from "@venore/plugin-sdk";
import { listasEditions, listasSegments } from "../../database/schema";

export async function countSegmentEditions(segmentId: string): Promise<number> {
  const [row] = await db.select({ total: count() }).from(listasEditions).where(eq(listasEditions.segmentId, segmentId));
  return row?.total ?? 0;
}

// Edições, revisões e histórico saem em cascata (FKs on delete cascade).
export async function deleteSegmentRow(segmentId: string): Promise<boolean> {
  const rows = await db.delete(listasSegments).where(eq(listasSegments.id, segmentId)).returning({ id: listasSegments.id });
  return rows.length > 0;
}
