import { and, eq } from "drizzle-orm";
import { db } from "@venore/plugin-sdk";
import type { EditionRecord } from "../../contracts/types";
import { listasEditions, listasRevisions } from "../../database/schema";
import { recordEditionEvent, toEditionRecord } from "../../shared/edition-store";

// Só marca publicada se a edição ainda está "approved" NA MESMA revisão de quando o PDF começou a
// ser gerado — se alguém editou durante a geração, a publicação é descartada.
export async function markEditionPublished(command: {
  editionId: string;
  revisionId: string;
  pdfMediaId: string;
  actorId: string;
}): Promise<EditionRecord | null> {
  return db.transaction(async (tx) => {
    const [row] = await tx
      .update(listasEditions)
      .set({
        status: "published",
        publishedRevisionId: command.revisionId,
        publishedPdfMediaId: command.pdfMediaId,
        publishedAt: new Date(),
        updatedAt: new Date(),
      })
      .where(
        and(
          eq(listasEditions.id, command.editionId),
          eq(listasEditions.status, "approved"),
          eq(listasEditions.approvedRevisionId, command.revisionId),
        ),
      )
      .returning();
    if (!row) return null;

    await tx.update(listasRevisions).set({ pdfMediaId: command.pdfMediaId }).where(eq(listasRevisions.id, command.revisionId));
    await recordEditionEvent(tx, { editionId: command.editionId, action: "published", actorId: command.actorId });
    return toEditionRecord(row);
  });
}
