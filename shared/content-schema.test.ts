import { describe, expect, it } from "vitest";
import type { EditionContent } from "../contracts/types";
import { hasAssemblyChanged, hasListContentChanged, parseEditionContent } from "./content-schema";

const content: EditionContent = {
  info: [{ id: "i1", title: "Entrega", body: "Texto", note: "" }],
  groups: [{ id: "g1", name: "1º ano", rows: [{ id: "r1", category: "", quantity: "1", description: "Caderno", note: "" }] }],
  books: [],
  assembly: [{ id: "a1", kind: "static", label: "Capa", mediaId: "m1" }],
};

describe("comparação do documento", () => {
  it("ordem das chaves não conta (jsonb do Postgres reordena)", () => {
    const reordered = JSON.parse(
      '{"books":[],"assembly":[{"mediaId":"m1","label":"Capa","kind":"static","id":"a1"}],"groups":[{"rows":[{"note":"","quantity":"1","id":"r1","description":"Caderno","category":""}],"name":"1º ano","id":"g1"}],"info":[{"note":"","body":"Texto","title":"Entrega","id":"i1"}]}',
    ) as EditionContent;
    expect(hasAssemblyChanged(content, reordered)).toBe(false);
    expect(hasListContentChanged(content, reordered)).toBe(false);
  });

  it("ordem dos itens conta", () => {
    const swapped = { ...content, info: [...content.info, { id: "i2", title: "B", body: "", note: "" }].reverse() };
    expect(hasListContentChanged(content, swapped)).toBe(true);
    expect(hasAssemblyChanged(content, swapped)).toBe(false);
  });

  it("rejeita documento malformado", () => {
    expect(parseEditionContent({ ...content, assembly: [{ id: "a1", kind: "outro" }] })).toBeNull();
    expect(parseEditionContent(content)).not.toBeNull();
  });
});
