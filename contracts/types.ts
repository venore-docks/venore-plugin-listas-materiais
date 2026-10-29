// Conteúdo de uma edição (segmento × ano) — um documento só, salvo inteiro (jsonb), porque é editado
// como um todo, congelado inteiro na aprovação (revisão = cópia do documento) e renderizado inteiro no
// PDF. Espelha 1:1 as três abas da planilha antiga + o config.json de cada segmento
// (_ref/listas-materiais/<segmento>/src/config.json), pra que o render reproduza o PDF de 2026.

// Aba "Informações Importantes": um bloco por linha. `body` aceita <b>…</b> (único markup usado nas
// planilhas) e quebra de linha vira <br> no render.
export type InfoBlock = {
  id: string;
  title: string;
  body: string;
  note: string;
};

// Aba "Séries": linha com descrição = item; linha só com observação = aviso (card) da categoria.
// `category` agrupa por primeira aparição dentro da turma (groupby sort=False do pandas).
export type ListRow = {
  id: string;
  category: string;
  quantity: string;
  description: string;
  note: string;
};

// Turma na ordem em que sai no PDF (era a lista `filtros` do config.json).
export type ListGroup = {
  id: string;
  name: string;
  rows: ListRow[];
};

// Aba "Livros": linha com título = livro; linha sem título e sem imagem = observação geral da
// disciplina (card azul acima dos livros).
export type BookRow = {
  id: string;
  discipline: string;
  turma: string;
  semester: string;
  bimester: string;
  imageMediaId: string | null;
  title: string;
  isbn: string;
  author: string;
  publisher: string;
  note: string;
};

export type SectionKind = "info" | "list" | "book";

// Ordem de montagem do PDF final (era pacote_final.ordem_montagem): páginas fixas (PDF enviado pelo
// marketing — folha de rosto, horário, parceiros) intercaladas com as seções geradas e as capas.
// `title` da seção é o título impresso no topo (info/book); lista não imprime título.
//
// `cover`: imagem de fundo (enviada uma vez) + ano da edição escrito por cima no render — assim a
// virada de ano não exige subir PDF novo (capa e quarta capa usam o mesmo tipo).
export type AssemblyItem =
  | { id: string; kind: "static"; label: string; mediaId: string | null }
  | { id: string; kind: "section"; section: SectionKind; title: string }
  | { id: string; kind: "cover"; label: string; backgroundMediaId: string | null };

export type EditionContent = {
  info: InfoBlock[];
  groups: ListGroup[];
  books: BookRow[];
  assembly: AssemblyItem[];
};

// draft → in_review (coordenação envia) → approved (direção aprova; congela uma revisão) → published
// (marketing publica o PDF da revisão aprovada). Qualquer edição depois de enviada volta a draft — o
// PDF publicado anterior continua valendo até a próxima publicação.
export const EDITION_STATUSES = ["draft", "in_review", "approved", "published"] as const;
export type EditionStatus = (typeof EDITION_STATUSES)[number];

export type SegmentRecord = {
  id: string;
  slug: string;
  name: string;
  sortOrder: number;
  fileNameTemplate: string;
  createdAt: Date;
};

export type EditionRecord = {
  id: string;
  segmentId: string;
  year: number;
  status: EditionStatus;
  content: EditionContent;
  version: number;
  reviewNote: string | null;
  approvedRevisionId: string | null;
  publishedRevisionId: string | null;
  publishedPdfMediaId: string | null;
  publishedAt: Date | null;
  updatedBy: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export type RevisionRecord = {
  id: string;
  editionId: string;
  number: number;
  content: EditionContent;
  approvedBy: string;
  approvedAt: Date;
  pdfMediaId: string | null;
};

export const EDITION_EVENT_ACTIONS = [
  "created",
  "saved",
  "submitted",
  "approved",
  "rejected",
  "published",
] as const;
export type EditionEventAction = (typeof EDITION_EVENT_ACTIONS)[number];

export type EditionEventRecord = {
  id: string;
  editionId: string;
  action: EditionEventAction;
  actorId: string;
  note: string | null;
  createdAt: Date;
};
