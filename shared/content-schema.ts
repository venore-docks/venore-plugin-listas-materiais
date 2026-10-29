import { z } from "zod";
import type { EditionContent } from "../contracts/types";

// Validação do documento inteiro no salvar (vem do editor, cliente) — formato e limites. O texto
// em si é livre: o render escapa tudo (shared/render/rich-text.ts).
const id = z.string().min(1).max(64);
const shortText = z.string().max(500);
const longText = z.string().max(10_000);
// Vai direto pro CSS da capa — só #rrggbb, nada que feche a declaração.
const hexColor = z.string().regex(/^#[0-9a-fA-F]{6}$/);

const infoBlock = z.object({ id, title: shortText, body: longText, note: longText });
const listRow = z.object({ id, category: shortText, quantity: z.string().max(40), description: longText, note: longText });
const listGroup = z.object({ id, name: shortText, rows: z.array(listRow).max(500) });
const bookRow = z.object({
  id,
  discipline: shortText,
  turma: shortText,
  semester: z.string().max(40),
  bimester: z.string().max(40),
  imageMediaId: id.nullable(),
  title: shortText,
  isbn: z.string().max(80),
  author: shortText,
  publisher: shortText,
  note: longText,
});
const assemblyItem = z.discriminatedUnion("kind", [
  z.object({ id, kind: z.literal("static"), label: shortText, mediaId: id.nullable() }),
  z.object({ id, kind: z.literal("section"), section: z.enum(["info", "list", "book"]), title: shortText }),
  z.object({ id, kind: z.literal("cover"), subtitle: shortText, topColor: hexColor, bandColor: hexColor, logoMediaId: id.nullable() }),
]);

export const editionContentSchema = z.object({
  info: z.array(infoBlock).max(100),
  groups: z.array(listGroup).max(60),
  books: z.array(bookRow).max(500),
  assembly: z.array(assemblyItem).max(40),
}) satisfies z.ZodType<EditionContent>;

export function parseEditionContent(value: unknown): EditionContent | null {
  const parsed = editionContentSchema.safeParse(value);
  return parsed.success ? parsed.data : null;
}

// JSON com chaves ordenadas: o jsonb do Postgres devolve as chaves dos objetos em outra ordem, então
// JSON.stringify puro acusaria "mudou" comparando o salvo com o mesmo conteúdo vindo do editor.
function canonicalJson(value: unknown): string {
  return JSON.stringify(value, (_key, inner: unknown) =>
    inner && typeof inner === "object" && !Array.isArray(inner)
      ? Object.fromEntries(Object.entries(inner as Record<string, unknown>).sort(([a], [b]) => (a < b ? -1 : a > b ? 1 : 0)))
      : inner,
  );
}

// Montagem (capas/páginas fixas e ordem) é do marketing; o resto é conteúdo da coordenação.
export function hasAssemblyChanged(before: EditionContent, after: EditionContent): boolean {
  return canonicalJson(before.assembly) !== canonicalJson(after.assembly);
}

export function hasListContentChanged(before: EditionContent, after: EditionContent): boolean {
  return canonicalJson([before.info, before.groups, before.books]) !== canonicalJson([after.info, after.groups, after.books]);
}
