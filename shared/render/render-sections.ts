import type { BookRow, EditionContent, InfoBlock, ListGroup, SectionKind } from "../../contracts/types";
import { renderRichText } from "./rich-text";
import { LISTAS_STYLE } from "./style";

// Porta fiel de render_info/render_list/render_books + o template de página da célula "3.0 - Geração
// de HTML e PDF" do notebook antigo (_ref/listas-materiais/Lista de Material - Gerar). A ordem e o
// aninhamento dos elementos importam: .lista-item:nth-child(even) (zebra) conta TODOS os irmãos
// dentro de .conteudo-lista, inclusive títulos e cards — mudar a árvore muda a listra.

// mediaId -> data URI da capa do livro (o notebook embutia a imagem em base64 no HTML).
export type BookImageMap = ReadonlyMap<string, string>;

const text = (value: string | null | undefined) => (value ?? "").trim();

function renderInfo(blocks: InfoBlock[]): string {
  let html = "";
  for (const block of blocks) {
    const note = text(block.note);
    const noteHtml = note ? `<div class="observacao-card"><p>${renderRichText(note)}</p></div>` : "";
    const body = renderRichText(block.body ?? "").replace(/\n/g, "<br>");
    html += `
        <div class="info-bloco">
            <h3 class="info-titulo">${renderRichText(block.title ?? "")}</h3>
            <p class="info-conteudo">${body}</p>
            ${noteHtml}
        </div>`;
  }
  return html;
}

// groupby(sort=False) do pandas: grupos na ordem da primeira aparição, linhas de um mesmo grupo
// juntas mesmo que não sejam contíguas na planilha.
function groupByFirstAppearance<T>(rows: T[], keyOf: (row: T) => string): [string, T[]][] {
  const groups = new Map<string, T[]>();
  for (const row of rows) {
    const key = keyOf(row);
    const list = groups.get(key);
    if (list) list.push(row);
    else groups.set(key, [row]);
  }
  return [...groups.entries()];
}

function renderList(groups: ListGroup[]): string {
  let html = '<div class="conteudo-lista">';

  for (const group of groups) {
    const turma = text(group.name);
    if (turma) {
      html += `<h1 class="titulo-turma-lista">${renderRichText(turma)}</h1>`;
    }

    for (const [category, rows] of groupByFirstAppearance(group.rows, (row) => row.category ?? "")) {
      if (category.trim()) {
        html += `<h2 class="subtitulo-secao">${renderRichText(category)}</h2>`;
      }

      for (const row of rows) {
        const description = text(row.description);
        const note = text(row.note);
        const quantity = text(row.quantity);

        if (!description && note) {
          html += `<div class="observacao-card"><p>${renderRichText(note)}</p></div>`;
        } else if (description) {
          const noteHtml = note ? `<div class="observacao-item"><p>${renderRichText(note)}</p></div>` : "";
          html += `
                    <div class="lista-item">
                        <span class="lista-quantidade">${renderRichText(quantity)}</span>
                        <div style="flex: 1;">
                            <p class="lista-descricao">${renderRichText(description)}</p>
                            ${noteHtml}
                        </div>
                    </div>`;
        }
      }
    }
  }

  html += "</div>";
  return html;
}

// Comparação por code point, igual à de string do Python (sort_values) — não localeCompare.
function compareCodePoints(a: string, b: string): number {
  return a < b ? -1 : a > b ? 1 : 0;
}

function renderBookCard(book: BookRow, images: BookImageMap): string {
  const image = book.imageMediaId ? images.get(book.imageMediaId) : undefined;
  const imageHtml = image
    ? `<div class="book-imagem"><img src="${image}" class="book-cover"></div>`
    : '<div class="book-imagem"></div>';

  const badges: string[] = [];
  const semester = text(book.semester);
  const bimester = text(book.bimester);
  if (semester) badges.push(`<span class="badge-pill badge-semestre">Sem. ${renderRichText(semester)}</span>`);
  if (bimester) badges.push(`<span class="badge-pill badge-bimestre">Bim. ${renderRichText(bimester)}</span>`);
  const badgesHtml = badges.length > 0 ? `<div class="book-meta-badges">${badges.join("")}</div>` : "";

  const author = text(book.author);
  const publisher = text(book.publisher);
  const isbn = text(book.isbn);
  let metaHtml = "";
  if (author) metaHtml += `<p class="book-meta"><span class="book-label">Autor:</span> ${renderRichText(author)}</p>`;
  if (publisher) metaHtml += `<p class="book-meta"><span class="book-label">Editora:</span> ${renderRichText(publisher)}</p>`;
  if (isbn) metaHtml += `<p class="book-meta"><span class="book-label">ISBN:</span> ${renderRichText(isbn)}</p>`;

  const note = text(book.note);
  const noteHtml = note
    ? `<div class="observacao-item" style="padding-left:0; margin-top:5px;"><p>${renderRichText(note)}</p></div>`
    : "";

  return `
                <div class="book-card">
                    ${imageHtml}
                    <div class="book-info">
                        ${badgesHtml}
                        <h3 class="book-titulo">${renderRichText(book.title ?? "")}</h3>
                        ${metaHtml}
                        ${noteHtml}
                    </div>
                </div>`;
}

function renderBooks(books: BookRow[], images: BookImageMap): string {
  let html = "";

  for (const [discipline, disciplineRows] of groupByFirstAppearance(books, (book) => text(book.discipline))) {
    if (discipline) {
      html += `<h2 class="subtitulo-secao">${renderRichText(discipline)}</h2>`;
    }

    // Observação geral da disciplina: linha sem título e sem imagem (qualquer turma).
    for (const row of disciplineRows) {
      if (!text(row.title) && !row.imageMediaId && text(row.note)) {
        html += `<div class="observacao-geral-blue"><p>${renderRichText(text(row.note))}</p></div>`;
      }
    }

    // Array.prototype.sort é estável — a ordem de digitação vale dentro da mesma turma.
    const titled = disciplineRows
      .filter((row) => text(row.title))
      .map((row) => ({ ...row, turma: text(row.turma) }))
      .sort((a, b) => compareCodePoints(a.turma, b.turma));

    for (const [turma, turmaRows] of groupByFirstAppearance(titled, (row) => row.turma)) {
      html += '<div class="turma-block">';
      if (turma) {
        html += `<h3 class="titulo-turma-subsecao">${renderRichText(turma)}</h3>`;
      }
      html += '<div class="book-grid-container">';
      for (const book of turmaRows) html += renderBookCard(book, images);
      html += "</div></div>";
    }
  }

  return html;
}

// Seção vazia não gera página (o notebook pulava quando o DataFrame filtrado vinha vazio).
export function isSectionEmpty(section: SectionKind, content: EditionContent): boolean {
  if (section === "info") return content.info.length === 0;
  if (section === "list") return content.groups.every((group) => group.rows.length === 0);
  return content.books.length === 0;
}

export function renderSectionDocument(input: {
  section: SectionKind;
  title: string;
  content: EditionContent;
  images: BookImageMap;
}): string {
  const { section, content, images } = input;
  let body = "";
  let titleElement = "";

  if (section === "info") {
    body = renderInfo(content.info);
    titleElement = `<h1 class="titulo-pagina">${renderRichText(input.title)}</h1>`;
  } else if (section === "list") {
    body = renderList(content.groups.filter((group) => group.rows.length > 0));
  } else {
    body = renderBooks(content.books, images);
    titleElement = `<h1 class="titulo-pagina">${renderRichText(input.title)}</h1>`;
  }

  return `
            <!DOCTYPE html>
            <html lang="pt-br">
            <head>
                <meta charset="UTF-8">
                <style>${LISTAS_STYLE}</style>
            </head>
            <body class="tipo-${section}">
                <div class="pagina-conteudo">
                    ${titleElement}
                    ${body}
                </div>
            </body>
            </html>
            `;
}
