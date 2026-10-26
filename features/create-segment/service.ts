import { beginOperation, endOperation } from "@venore/plugin-sdk/observability";
import type { EditionContent } from "../../contracts/types";
import { failure } from "../../shared/results";
import { slugify } from "../../shared/slugify";
import { insertSegmentWithEdition } from "./store";
import type { CreateSegmentCommand, CreateSegmentResult } from "./types";

// Segmento novo nasce com as três seções na ordem padrão; as páginas fixas (capa etc.) o marketing
// adiciona na aba Montagem.
function emptyContent(): EditionContent {
  return {
    info: [],
    groups: [],
    books: [],
    assembly: [
      { id: crypto.randomUUID(), kind: "section", section: "info", title: "Informações Importantes" },
      { id: crypto.randomUUID(), kind: "section", section: "list", title: "Listas de Materiais" },
      { id: crypto.randomUUID(), kind: "section", section: "book", title: "Livros" },
    ],
  };
}

export async function createSegment(command: CreateSegmentCommand): Promise<CreateSegmentResult> {
  const handle = beginOperation({
    useCase: "listas-materiais.create-segment",
    actor: { id: command.actorId, type: "user" },
    kind: "write",
  });

  const name = command.name.trim();
  const created = await insertSegmentWithEdition({
    slug: slugify(name),
    name,
    year: command.year,
    content: emptyContent(),
    actorId: command.actorId,
  });
  const result: CreateSegmentResult = created
    ? { success: true, data: created }
    : failure("segment_exists", "Já existe um segmento com esse nome.");
  endOperation(handle, result);
  return result;
}
