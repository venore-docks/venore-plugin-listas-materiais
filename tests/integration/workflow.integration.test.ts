// Fluxo inteiro contra um Postgres de verdade (PGlite): criar, salvar (lock otimista), enviar,
// devolver, aprovar (revisão congelada), publicar, editar depois de publicada, ano seguinte e o seed
// de 2026. O PDF em si é trocado por um stub — o render tem teste próprio e o harness
// scripts/render-seed-pdfs.mts.
import { fileURLToPath } from "node:url";
import { eq } from "drizzle-orm";
import { beforeAll, describe, expect, it, vi } from "vitest";
import { applyMigrations, db, state } from "./mocks";
import type { EditionContent, EditionRecord } from "../../contracts/types";
import { listasEditionEvents, listasRevisions, listasSegments } from "../../database/schema";
import { createSegmentHandler } from "../../features/create-segment/handler";
import { deleteEditionHandler } from "../../features/delete-edition/handler";
import { deleteSegmentHandler } from "../../features/delete-segment/handler";
import { getEditionHandler } from "../../features/get-edition/handler";
import { listSegmentsHandler } from "../../features/list-segments/handler";
import { publishEditionHandler } from "../../features/publish-edition/handler";
import { reviewEditionHandler } from "../../features/review-edition/handler";
import { saveEditionHandler } from "../../features/save-edition/handler";
import { startNextYearHandler } from "../../features/start-next-year/handler";
import { submitEditionHandler } from "../../features/submit-edition/handler";
import { LISTAS_PERMISSIONS as P } from "../../shared/permissions";

vi.mock("../../shared/edition-pdf", () => ({
  editionFileName: (segment: { name: string }, year: number) => `Lista de Materiais ${year} - ${segment.name}.pdf`,
  renderEditionPdf: async () => ({ bytes: new Uint8Array([37, 80, 68, 70]), skipped: [] }),
}));

const coordenacao = { id: "coord-1", name: "Coordenação", email: "coord@erasto.com.br" };
const direcao = { id: "dir-1", name: "Direção", email: "dir@erasto.com.br" };
const marketing = { id: "mkt-1", name: "Marketing", email: "mkt@erasto.com.br" };

function as(user: typeof coordenacao, permissions: string[]) {
  state.current = user;
  state.permissions = new Set([P.read, ...permissions]);
}
const asCoordenacao = () => as(coordenacao, [P.edit]);
const asDirecao = () => as(direcao, [P.approve]);
const asMarketing = () => as(marketing, [P.edit, P.design, P.publish]);

function ok<T>(result: { success: true; data: T } | { success: false; error: { code: string; message: string } }): T {
  if (!result.success) throw new Error(`${result.error.code}: ${result.error.message}`);
  return result.data;
}

const withItem = (content: EditionContent, description: string): EditionContent => ({
  ...content,
  groups: [{ id: "g1", name: "1º ano", rows: [{ id: "r1", category: "", quantity: "1", description, note: "" }] }],
});

describe("listas de materiais — fluxo (PGlite)", () => {
  let edition: EditionRecord;
  let segmentId = "";

  beforeAll(async () => {
    await applyMigrations(fileURLToPath(new URL("../../migrations", import.meta.url)));
    state.users = [coordenacao, direcao, marketing];
  });

  it("só quem tem design cria segmento; nasce rascunho com as três seções", async () => {
    asCoordenacao();
    expect(await createSegmentHandler({ name: "Ensino Médio (3º ano)", year: 2026 })).toMatchObject({ success: false });

    asMarketing();
    const created = ok(await createSegmentHandler({ name: "Ensino Médio (3º ano)", year: 2026 }));
    expect(created.segment.slug).toBe("ensino-medio-3-ano");
    expect(created.edition).toMatchObject({ status: "draft", version: 1, year: 2026 });
    expect(created.edition.content.assembly.map((item) => (item.kind === "section" ? item.section : "static"))).toEqual(["info", "list", "book"]);
    expect(await createSegmentHandler({ name: "Ensino Médio (3º ano)", year: 2026 })).toMatchObject({
      error: { code: "listas-materiais.segment_exists" },
    });
    edition = created.edition;
    segmentId = created.segment.id;
  });

  it("salvar sobe a versão, recusa versão velha e junta salvamentos seguidos no histórico", async () => {
    asCoordenacao();
    edition = ok(await saveEditionHandler({ editionId: edition.id, expectedVersion: 1, content: withItem(edition.content, "Caderno") }));
    expect(edition.version).toBe(2);

    expect(await saveEditionHandler({ editionId: edition.id, expectedVersion: 1, content: withItem(edition.content, "Outro") })).toMatchObject({
      error: { code: "listas-materiais.version_conflict" },
    });

    edition = ok(await saveEditionHandler({ editionId: edition.id, expectedVersion: 2, content: withItem(edition.content, "Caderno grande") }));
    const events = await db.select().from(listasEditionEvents).where(eq(listasEditionEvents.editionId, edition.id));
    expect(events.filter((event) => event.action === "saved")).toHaveLength(1);
  });

  it("coordenação não mexe na montagem", async () => {
    asCoordenacao();
    const content = { ...edition.content, assembly: edition.content.assembly.slice(1) };
    expect(await saveEditionHandler({ editionId: edition.id, expectedVersion: edition.version, content })).toMatchObject({
      error: { code: "listas-materiais.forbidden_assembly" },
    });
  });

  it("enviar → devolver (com motivo) → enviar de novo limpa o motivo", async () => {
    asCoordenacao();
    ok(await submitEditionHandler({ editionId: edition.id, expectedVersion: edition.version }));
    expect(await submitEditionHandler({ editionId: edition.id, expectedVersion: edition.version })).toMatchObject({ success: false });

    asDirecao();
    expect(await reviewEditionHandler({ editionId: edition.id, expectedVersion: edition.version, decision: "reject" })).toMatchObject({
      error: { code: "listas-materiais.missing_note" },
    });
    const rejected = ok(await reviewEditionHandler({ editionId: edition.id, expectedVersion: edition.version, decision: "reject", note: "Faltou o 2º ano" }));
    expect(rejected).toMatchObject({ status: "draft", reviewNote: "Faltou o 2º ano" });

    asCoordenacao();
    const resubmitted = ok(await submitEditionHandler({ editionId: edition.id, expectedVersion: edition.version }));
    expect(resubmitted).toMatchObject({ status: "in_review", reviewNote: null });
  });

  it("editar durante a aprovação volta pra rascunho e a direção não aprova versão velha", async () => {
    asMarketing();
    const before = edition.version;
    edition = ok(await saveEditionHandler({ editionId: edition.id, expectedVersion: before, content: withItem(edition.content, "Caderno A4") }));
    expect(edition.status).toBe("draft");

    asDirecao();
    expect(await reviewEditionHandler({ editionId: edition.id, expectedVersion: before, decision: "approve" })).toMatchObject({
      error: { code: "listas-materiais.invalid_transition" },
    });
  });

  it("aprovar congela uma revisão; só publish publica; publicação guarda o PDF", async () => {
    asCoordenacao();
    ok(await submitEditionHandler({ editionId: edition.id, expectedVersion: edition.version }));
    asDirecao();
    edition = ok(await reviewEditionHandler({ editionId: edition.id, expectedVersion: edition.version, decision: "approve" }));
    expect(edition.status).toBe("approved");
    const [revision] = await db.select().from(listasRevisions).where(eq(listasRevisions.editionId, edition.id));
    expect(revision).toMatchObject({ number: 1, approvedBy: direcao.id });
    expect(JSON.stringify(revision.content)).toContain("Caderno A4");

    expect(await publishEditionHandler({ editionId: edition.id })).toMatchObject({ success: false });

    asMarketing();
    const published = ok(await publishEditionHandler({ editionId: edition.id }));
    expect(published.edition.status).toBe("published");
    expect(published.edition.publishedPdfMediaId).toMatch(/^media-/);
    expect(state.uploads.at(-1)).toEqual({ filename: "Lista de Materiais 2026 - Ensino Médio (3º ano).pdf", categoryKey: "listas-materiais.arquivos" });
    edition = published.edition;
  });

  it("edição depois de publicada: rascunho novo, PDF publicado preservado", async () => {
    asCoordenacao();
    const pdfId = edition.publishedPdfMediaId;
    edition = ok(await saveEditionHandler({ editionId: edition.id, expectedVersion: edition.version, content: withItem(edition.content, "Caderno 2027") }));
    expect(edition).toMatchObject({ status: "draft", publishedPdfMediaId: pdfId });

    const view = ok(await getEditionHandler({ editionId: edition.id }));
    expect(view.publishedRevisionNumber).toBe(1);
    expect(view.events.map((event) => `${event.actorName}:${event.action}`)).toEqual(
      expect.arrayContaining(["Marketing:published", "Direção:approved", "Direção:rejected", "Coordenação:submitted", "Marketing:created"]),
    );
  });

  it("ano seguinte copia o último e não duplica", async () => {
    asCoordenacao();
    const next = ok(await startNextYearHandler({ segmentId }));
    expect(next).toMatchObject({ year: 2027, status: "draft" });
    expect(JSON.stringify(next.content)).toContain("Caderno 2027");
    expect(await startNextYearHandler({ segmentId })).toMatchObject({ success: true });
    const overview = ok(await listSegmentsHandler());
    expect(overview[0].editions.map((item) => item.year)).toEqual([2028, 2027, 2026]);
  });

  it("seed com storage fora do ar: erro claro e nenhum segmento criado", async () => {
    state.failUploads = true;
    const { seedListas2026 } = await import("../../seeds/listas-2026");
    const result = await seedListas2026();
    state.failUploads = false;
    expect(result).toMatchObject({ success: false, error: { code: "listas-materiais.storage_failed" } });
    expect(!result.success && result.error.message).toContain("store has been suspended");
    expect((await db.select().from(listasSegments)).map((segment) => segment.slug)).toEqual(["ensino-medio-3-ano"]);
  });

  it("seed de 2026: cinco segmentos, cada arquivo sobe uma vez, rodar de novo não duplica", async () => {
    state.uploads = [];
    const { seedListas2026 } = await import("../../seeds/listas-2026");
    const { SEED_ASSETS } = await import("../../seeds/assets");

    ok(await seedListas2026());
    const segments = await db.select().from(listasSegments);
    expect(segments.map((segment) => segment.slug)).toEqual(
      expect.arrayContaining(["educacao-infantil", "ensino-fundamental-1", "ensino-fundamental-2", "ensino-medio", "ensino-medio-hunters"]),
    );
    expect(state.uploads).toHaveLength(Object.keys(SEED_ASSETS).length);

    ok(await seedListas2026());
    expect(await db.select().from(listasSegments)).toHaveLength(segments.length);
    expect(state.uploads).toHaveLength(Object.keys(SEED_ASSETS).length);
  });

  it("apagar: só com a permission; lista de um ano e segmento inteiro (com nome digitado)", async () => {
    asMarketing();
    expect(await deleteEditionHandler({ editionId: edition.id })).toMatchObject({ success: false });

    as(marketing, [P.delete]);
    const [, , oldest] = ok(await listSegmentsHandler()).find((segment) => segment.id === segmentId)!.editions;
    expect(ok(await deleteEditionHandler({ editionId: oldest.id }))).toEqual({ segmentId, year: 2026 });
    expect(ok(await listSegmentsHandler()).find((segment) => segment.id === segmentId)!.editions.map((item) => item.year)).toEqual([2028, 2027]);
    expect(await db.select().from(listasRevisions).where(eq(listasRevisions.editionId, oldest.id))).toHaveLength(0);

    expect(await deleteSegmentHandler({ segmentId, confirmName: "outro nome" })).toMatchObject({
      error: { code: "listas-materiais.confirm_mismatch" },
    });
    expect(ok(await deleteSegmentHandler({ segmentId, confirmName: "Ensino Médio (3º ano)" }))).toEqual({ name: "Ensino Médio (3º ano)", editions: 2 });
    expect(ok(await listSegmentsHandler()).some((segment) => segment.id === segmentId)).toBe(false);
  });
});
