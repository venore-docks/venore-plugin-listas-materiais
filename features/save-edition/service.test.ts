import { beforeEach, describe, expect, it, vi } from "vitest";
import type { EditionContent, EditionRecord } from "../../contracts/types";

const findEditionById = vi.fn();
vi.mock("../../shared/edition-store", () => ({
  findEditionById: (...args: unknown[]) => findEditionById(...args),
}));

const updateEditionContent = vi.fn();
vi.mock("./store", () => ({
  updateEditionContent: (...args: unknown[]) => updateEditionContent(...args),
}));

vi.mock("@venore/plugin-sdk/observability", () => ({ beginOperation: () => ({}), endOperation: () => undefined }));

const baseContent: EditionContent = {
  info: [],
  groups: [{ id: "g1", name: "1º ano", rows: [{ id: "r1", category: "", quantity: "1", description: "Caderno", note: "" }] }],
  books: [],
  assembly: [{ id: "a1", kind: "static", label: "Capa", mediaId: "capa-2026" }],
};

const edition = (patch: Partial<EditionRecord> = {}): EditionRecord => ({
  id: "e1",
  segmentId: "s1",
  year: 2026,
  status: "draft",
  content: baseContent,
  version: 3,
  reviewNote: null,
  approvedRevisionId: null,
  publishedRevisionId: null,
  publishedPdfMediaId: null,
  publishedAt: null,
  updatedBy: null,
  createdAt: new Date(),
  updatedAt: new Date(),
  ...patch,
});

const withItem = (description: string): EditionContent => ({
  ...baseContent,
  groups: [{ ...baseContent.groups[0], rows: [{ ...baseContent.groups[0].rows[0], description }] }],
});
const withCover = (mediaId: string): EditionContent => ({ ...baseContent, assembly: [{ id: "a1", kind: "static", label: "Capa", mediaId }] });

const command = (content: EditionContent, perms: { edit: boolean; design: boolean }, expectedVersion = 3) => ({
  editionId: "e1",
  expectedVersion,
  content,
  actorId: "u1",
  canEditContent: perms.edit,
  canEditAssembly: perms.design,
});

describe("saveEdition", () => {
  beforeEach(() => {
    findEditionById.mockReset().mockResolvedValue(edition());
    updateEditionContent.mockReset().mockImplementation(async (input) => edition({ content: input.content, version: 4 }));
  });

  it("coordenação (edit) altera item, mas não capa/ordem", async () => {
    const { saveEdition } = await import("./service");
    expect((await saveEdition(command(withItem("Caderno grande"), { edit: true, design: false }))).success).toBe(true);

    const blocked = await saveEdition(command(withCover("capa-2027"), { edit: true, design: false }));
    expect(blocked).toMatchObject({ success: false, error: { code: "listas-materiais.forbidden_assembly" } });
  });

  it("quem só tem design não altera itens", async () => {
    const { saveEdition } = await import("./service");
    const blocked = await saveEdition(command(withItem("Outro"), { edit: false, design: true }));
    expect(blocked).toMatchObject({ success: false, error: { code: "listas-materiais.forbidden_content" } });
    expect(updateEditionContent).not.toHaveBeenCalled();
  });

  it("versão desatualizada é recusada sem gravar", async () => {
    const { saveEdition } = await import("./service");
    const result = await saveEdition(command(withItem("X"), { edit: true, design: true }, 2));
    expect(result).toMatchObject({ success: false, error: { code: "listas-materiais.version_conflict" } });
    expect(updateEditionContent).not.toHaveBeenCalled();
  });

  it("salvar sem mudança não grava nem cria evento", async () => {
    const { saveEdition } = await import("./service");
    const result = await saveEdition(command(baseContent, { edit: true, design: true }));
    expect(result.success).toBe(true);
    expect(updateEditionContent).not.toHaveBeenCalled();
  });

  it("alteração depois de aprovada registra que voltou para rascunho", async () => {
    findEditionById.mockResolvedValue(edition({ status: "approved" }));
    const { saveEdition } = await import("./service");
    await saveEdition(command(withItem("Y"), { edit: true, design: false }));
    expect(updateEditionContent).toHaveBeenCalledWith(expect.objectContaining({ eventNote: expect.stringContaining("voltou para rascunho") }));
  });
});
