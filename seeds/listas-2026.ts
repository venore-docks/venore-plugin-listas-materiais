import type { OperationResult } from "@venore/plugin-sdk";
import { insertSegmentWithEdition } from "../features/create-segment/store";
import { selectSegmentsOverview } from "../features/list-segments/store";
import { uploadListasFile } from "../shared/upload";
import { SEED_ASSETS } from "./assets";
import { EDICOES_2026 } from "./data/edicoes-2026";
import { toEditionContent } from "./to-edition-content";

// Listas de 2026 como estavam no Drive — o ponto de partida da coordenação (ninguém cria lista do
// zero; a de 2027 nasce copiando esta). Chama store/service direto, sem handler: não há permissão
// de plugin envolvida (mesmo racional de venore-plugin-vagas/seeds/example.ts). O upload dos
// arquivos usa a sessão de quem clicou em "Popular dados" em /admin/plugins.
const SEED_ACTOR_ID = "system-seed";

// Idempotente por segmento: segmento já existente (pelo slug) é pulado inteiro, sem reenviar arquivos.
export async function seedListas2026(): Promise<OperationResult<void>> {
  const existing = new Set((await selectSegmentsOverview()).map((segment) => segment.slug));
  const pending = EDICOES_2026.filter((seed) => !existing.has(seed.slug));
  if (pending.length === 0) return { success: true, data: undefined };

  // Cada arquivo sobe uma vez só, mesmo usado por vários segmentos (Parceiros.pdf, capas de Bíblia).
  const mediaIdByHash = new Map<string, string>();
  const neededHashes = new Set(
    pending.flatMap((seed) => [
      ...seed.content.books.map((book) => book.image).filter((hash): hash is string => Boolean(hash)),
      ...seed.content.assembly.flatMap((item) => (item.kind === "static" ? [item.asset] : [])),
    ]),
  );
  for (const hash of neededHashes) {
    const asset = SEED_ASSETS[hash];
    if (!asset) continue;
    const data = Buffer.from(await asset.load(), "base64");
    const uploaded = await uploadListasFile({ filename: asset.filename, contentType: asset.contentType, data });
    if (!uploaded.success) return { success: false, error: { ...uploaded.error, message: `${uploaded.error.message} Nenhuma lista foi criada.` } };
    mediaIdByHash.set(hash, uploaded.data.id);
  }

  for (const seed of pending) {
    const created = await insertSegmentWithEdition({
      slug: seed.slug,
      name: seed.name,
      year: seed.year,
      sortOrder: seed.sortOrder,
      fileNameTemplate: seed.fileNameTemplate,
      content: toEditionContent(seed, (hash) => mediaIdByHash.get(hash) ?? null),
      actorId: SEED_ACTOR_ID,
      eventNote: `Importada das planilhas do Drive (lista de ${seed.year}).`,
    });
    if (!created) {
      return { success: false, error: { code: "listas-materiais.seed_conflict", message: `O segmento "${seed.name}" já existe.` } };
    }
  }

  return { success: true, data: undefined };
}
