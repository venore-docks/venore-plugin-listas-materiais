import { asc, desc } from "drizzle-orm";
import { db } from "@venore/plugin-sdk";
import { listasEditions, listasSegments } from "../../database/schema";
import type { SegmentOverview } from "./types";

export async function selectSegmentsOverview(): Promise<SegmentOverview[]> {
  const segments = await db.select().from(listasSegments).orderBy(asc(listasSegments.sortOrder), asc(listasSegments.name));
  const editions = await db
    .select({
      id: listasEditions.id,
      segmentId: listasEditions.segmentId,
      year: listasEditions.year,
      status: listasEditions.status,
      updatedAt: listasEditions.updatedAt,
      publishedAt: listasEditions.publishedAt,
      publishedPdfMediaId: listasEditions.publishedPdfMediaId,
    })
    .from(listasEditions)
    .orderBy(desc(listasEditions.year));

  return segments.map((segment) => ({
    ...segment,
    editions: editions
      .filter((edition) => edition.segmentId === segment.id)
      .map((edition) => ({
        id: edition.id,
        year: edition.year,
        status: edition.status as SegmentOverview["editions"][number]["status"],
        updatedAt: edition.updatedAt,
        publishedAt: edition.publishedAt,
        hasPublishedPdf: Boolean(edition.publishedPdfMediaId),
      })),
  }));
}
