import { desc, eq } from "drizzle-orm";
import { db } from "@venore/plugin-sdk";
import { listasEditions } from "../../database/schema";

export async function selectSiblingYears(segmentId: string): Promise<{ id: string; year: number }[]> {
  return db
    .select({ id: listasEditions.id, year: listasEditions.year })
    .from(listasEditions)
    .where(eq(listasEditions.segmentId, segmentId))
    .orderBy(desc(listasEditions.year));
}
