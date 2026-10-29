import { describe, expect, it } from "vitest";
import { editionContentSchema } from "../../shared/content-schema";
import { SEED_ASSETS } from "../assets";
import { toEditionContent } from "../to-edition-content";
import { EDICOES_2026 } from "./edicoes-2026";
import { assemblyAssets } from "./types";

describe("seed das listas de 2026", () => {
  it("cinco segmentos, slugs únicos", () => {
    expect(EDICOES_2026.map((seed) => seed.slug)).toEqual([
      "educacao-infantil",
      "ensino-fundamental-1",
      "ensino-fundamental-2",
      "ensino-medio",
      "ensino-medio-hunters",
    ]);
  });

  it("todo arquivo referenciado (capa de livro e página fixa) existe em seeds/assets", () => {
    for (const seed of EDICOES_2026) {
      const hashes = [
        ...seed.content.books.flatMap((book) => (book.image ? [book.image] : [])),
        ...seed.content.assembly.flatMap(assemblyAssets),
      ];
      for (const hash of hashes) expect(SEED_ASSETS[hash], `${seed.slug}: ${hash}`).toBeDefined();
    }
  });

  it("vira um documento válido para o editor", () => {
    for (const seed of EDICOES_2026) {
      const content = toEditionContent(seed, (hash) => `media-${hash}`);
      expect(editionContentSchema.safeParse(content).success, seed.slug).toBe(true);
    }
  });

  it("traz as duas correções sobre o PDF de 2026", () => {
    const medio = EDICOES_2026.find((seed) => seed.slug === "ensino-medio")!;
    expect(medio.content.groups.map((group) => group.name)).toContain("Ensino Religioso");
    const hunters = EDICOES_2026.find((seed) => seed.slug === "ensino-medio-hunters")!;
    expect(hunters.content.groups.map((group) => group.name)).toContain("Para todas as Matérias");
  });

  it("quantidades sem o .0 do xlsx", () => {
    const quantities = EDICOES_2026.flatMap((seed) => seed.content.groups.flatMap((group) => group.rows.map((row) => row.quantity)));
    expect(quantities.some((quantity) => quantity.endsWith(".0"))).toBe(false);
  });
});
