import { createHash } from "node:crypto";
import { inArray, or, eq, sql } from "drizzle-orm";
import { db } from "@venore/plugin-sdk";
import { deleteMediaSafely, getMediaAssetForTrustedReview } from "@venore/plugin-sdk/media";
import type { EditionContent } from "../contracts/types";
import { listasEditions, listasRevisions } from "../database/schema";
import { LISTAS_PERMISSIONS } from "./permissions";

// Higiene da mídia do plugin: o mesmo arquivo nunca deve existir duas vezes, e arquivo que nenhuma
// lista usa mais não fica pra trás. "Usa" = id citado no conteúdo de alguma edição/revisão (capas
// de livro, páginas fixas, logo da capa) ou PDF publicado de edição/revisão.

export function contentMediaIds(content: EditionContent): string[] {
  const ids = [
    ...content.books.map((book) => book.imageMediaId),
    ...content.assembly.flatMap((item) => (item.kind === "static" ? [item.mediaId] : item.kind === "cover" ? [item.logoMediaId] : [])),
  ];
  return [...new Set(ids.filter((id): id is string => Boolean(id)))];
}

function idsFrom(
  editions: { content: EditionContent; publishedPdfMediaId: string | null }[],
  revisions: { content: EditionContent; pdfMediaId: string | null }[],
): string[] {
  const ids = new Set<string>();
  for (const edition of editions) {
    contentMediaIds(edition.content).forEach((id) => ids.add(id));
    if (edition.publishedPdfMediaId) ids.add(edition.publishedPdfMediaId);
  }
  for (const revision of revisions) {
    contentMediaIds(revision.content).forEach((id) => ids.add(id));
    if (revision.pdfMediaId) ids.add(revision.pdfMediaId);
  }
  return [...ids];
}

// Tudo que as edições informadas (e suas revisões) referenciam — coletar ANTES de apagar as linhas.
export async function collectEditionMediaIds(editionIds: string[]): Promise<string[]> {
  if (editionIds.length === 0) return [];
  const editions = await db
    .select({ content: listasEditions.content, publishedPdfMediaId: listasEditions.publishedPdfMediaId })
    .from(listasEditions)
    .where(inArray(listasEditions.id, editionIds));
  const revisions = await db
    .select({ content: listasRevisions.content, pdfMediaId: listasRevisions.pdfMediaId })
    .from(listasRevisions)
    .where(inArray(listasRevisions.editionId, editionIds));
  return idsFrom(editions, revisions);
}

async function collectAllMediaIds(): Promise<string[]> {
  const editions = await db
    .select({ content: listasEditions.content, publishedPdfMediaId: listasEditions.publishedPdfMediaId })
    .from(listasEditions);
  const revisions = await db.select({ content: listasRevisions.content, pdfMediaId: listasRevisions.pdfMediaId }).from(listasRevisions);
  return idsFrom(editions, revisions);
}

// O id é um UUID: achá-lo como texto dentro do jsonb não tem falso positivo prático.
async function isReferenced(mediaId: string): Promise<boolean> {
  const [inEdition] = await db
    .select({ id: listasEditions.id })
    .from(listasEditions)
    .where(or(eq(listasEditions.publishedPdfMediaId, mediaId), sql`position(${mediaId} in ${listasEditions.content}::text) > 0`))
    .limit(1);
  if (inEdition) return true;
  const [inRevision] = await db
    .select({ id: listasRevisions.id })
    .from(listasRevisions)
    .where(or(eq(listasRevisions.pdfMediaId, mediaId), sql`position(${mediaId} in ${listasRevisions.content}::text) > 0`))
    .limit(1);
  return Boolean(inRevision);
}

// Apaga (vai pra lixeira da mídia, recuperável) os candidatos que nenhuma lista referencia mais.
// Só mexe em arquivo da categoria do plugin, e nunca derruba a operação que o chamou: limpar é
// melhor-esforço, o pior caso é sobrar um arquivo.
export async function deleteOrphanedMedia(candidateIds: Iterable<string | null | undefined>): Promise<number> {
  let deleted = 0;
  for (const id of new Set([...candidateIds].filter((value): value is string => Boolean(value)))) {
    try {
      if (await isReferenced(id)) continue;
      const asset = await getMediaAssetForTrustedReview({ id });
      if (!asset.success || !asset.data || asset.data.deletedAt) continue;
      if (asset.data.accessPermission !== LISTAS_PERMISSIONS.read) continue;
      const result = await deleteMediaSafely({ id, confirmed: true });
      if (result.success) deleted += 1;
    } catch {
      // melhor-esforço
    }
  }
  return deleted;
}

export function sha256Hex(data: Buffer): string {
  return createHash("sha256").update(data).digest("hex");
}

// Arquivo idêntico (mesmo SHA-256) que o plugin já usa — evita a segunda cópia no upload. Só olha
// os arquivos referenciados por listas (dezenas), então não precisa de índice nem de tabela nova.
export async function findExistingAssetByChecksum(checksum: string) {
  const ids = await collectAllMediaIds();
  const assets = await Promise.all(ids.map((id) => getMediaAssetForTrustedReview({ id }).catch(() => null)));
  for (const asset of assets) {
    if (!asset?.success || !asset.data || asset.data.deletedAt) continue;
    if (asset.data.accessPermission !== LISTAS_PERMISSIONS.read) continue;
    if (asset.data.checksum === checksum) return asset.data;
  }
  return null;
}
