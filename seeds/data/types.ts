import type { BookRow, InfoBlock, ListRow, SectionKind } from "../../contracts/types";

// Formato do dado gerado (edicoes-2026.ts): o mesmo EditionContent, sem ids (o seed gera) e com
// imagens/páginas fixas apontando pro hash do arquivo em seeds/assets em vez de um mediaId.
type WithoutId<T> = Omit<T, "id">;

export type SeedAssembly =
  | { kind: "static"; label: string; asset: string }
  | { kind: "section"; section: SectionKind; title: string };

export type SeedSegment = {
  slug: string;
  name: string;
  sortOrder: number;
  year: number;
  fileNameTemplate: string;
  content: {
    info: WithoutId<InfoBlock>[];
    groups: { name: string; rows: WithoutId<ListRow>[] }[];
    books: (Omit<WithoutId<BookRow>, "imageMediaId"> & { image: string | null })[];
    assembly: SeedAssembly[];
  };
};
