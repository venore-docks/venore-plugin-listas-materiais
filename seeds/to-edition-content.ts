import type { EditionContent } from "../contracts/types";
import type { SeedSegment } from "./data/types";

// Dado do seed -> documento da edição. `resolveAsset` troca o hash do arquivo em seeds/assets pelo
// mediaId já enviado à biblioteca de mídia (o seed sobe cada arquivo uma vez só, mesmo que vários
// segmentos usem — Parceiros.pdf, capas de Bíblia).
export function toEditionContent(seed: SeedSegment, resolveAsset: (hash: string) => string | null): EditionContent {
  const id = () => crypto.randomUUID();
  return {
    info: seed.content.info.map((block) => ({ id: id(), ...block })),
    groups: seed.content.groups.map((group) => ({
      id: id(),
      name: group.name,
      rows: group.rows.map((row) => ({ id: id(), ...row })),
    })),
    books: seed.content.books.map(({ image, ...book }) => ({
      id: id(),
      ...book,
      imageMediaId: image ? resolveAsset(image) : null,
    })),
    assembly: seed.content.assembly.map((item) =>
      item.kind === "static"
        ? { id: id(), kind: "static", label: item.label, mediaId: resolveAsset(item.asset) }
        : { id: id(), kind: "section", section: item.section, title: item.title },
    ),
  };
}
