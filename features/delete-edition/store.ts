import { eq } from "drizzle-orm";
import { db } from "@venore/plugin-sdk";
import { listasEditions } from "../../database/schema";

// Revisões e histórico saem junto (FK on delete cascade). Arquivos de mídia ficam: outro ano do
// mesmo segmento costuma apontar pras mesmas capas (o "Iniciar ano" copia os ids).
export async function deleteEditionRow(editionId: string): Promise<{ segmentId: string; year: number } | null> {
  const [row] = await db
    .delete(listasEditions)
    .where(eq(listasEditions.id, editionId))
    .returning({ segmentId: listasEditions.segmentId, year: listasEditions.year });
  return row ?? null;
}
