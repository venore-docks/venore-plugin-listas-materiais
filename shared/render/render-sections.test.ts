import { describe, expect, it } from "vitest";
import type { BookRow, EditionContent } from "../../contracts/types";
import { isSectionEmpty, renderSectionDocument } from "./render-sections";
import { renderRichText } from "./rich-text";

const book = (patch: Partial<BookRow>): BookRow => ({
  id: crypto.randomUUID(),
  discipline: "Língua Portuguesa",
  turma: "",
  semester: "",
  bimester: "",
  imageMediaId: null,
  title: "",
  isbn: "",
  author: "",
  publisher: "",
  note: "",
  ...patch,
});

const content = (patch: Partial<EditionContent>): EditionContent => ({ info: [], groups: [], books: [], assembly: [], ...patch });

// Só o <body>: o <style> embute o CSS e as fontes em base64, onde qualquer trecho curto aparece.
const render = (section: "info" | "list" | "book", value: EditionContent, images = new Map<string, string>()) => {
  const html = renderSectionDocument({ section, title: "Título", content: value, images });
  return html.slice(html.indexOf("<body"));
};

const order = (html: string, needles: string[]) => needles.map((needle) => html.indexOf(needle));

describe("renderRichText", () => {
  it("escapa HTML e só devolve as tags inline permitidas, sem atributo", () => {
    expect(renderRichText('<b>3º ao 5º</b> & <img src="http://interno/x"> <script>x</script> <B>ok</B> <br/>')).toBe(
      "<b>3º ao 5º</b> &amp; &lt;img src=&quot;http://interno/x&quot;&gt; &lt;script&gt;x&lt;/script&gt; <b>ok</b> <br>",
    );
  });

  it("tag permitida com atributo continua escapada", () => {
    expect(renderRichText('<b onclick="x">a</b>')).toBe("&lt;b onclick=&quot;x&quot;&gt;a</b>");
  });
});

describe("renderSectionDocument — listas", () => {
  it("agrupa categorias pela primeira aparição (groupby sort=False), mesmo não contíguas", () => {
    const html = render(
      "list",
      content({
        groups: [
          {
            id: "g1",
            name: "1º ano",
            rows: [
              { id: "1", category: "", quantity: "1", description: "Caderno", note: "" },
              { id: "2", category: "Penal (estojo)", quantity: "3", description: "Lápis", note: "" },
              { id: "3", category: "", quantity: "2", description: "Cola", note: "" },
            ],
          },
        ],
      }),
    );
    const [caderno, cola, penal, lapis] = order(html, ["Caderno", "Cola", "Penal (estojo)", "Lápis"]);
    expect(caderno).toBeLessThan(cola);
    expect(cola).toBeLessThan(penal);
    expect(penal).toBeLessThan(lapis);
  });

  it("linha sem descrição e com observação vira card; sem nenhum dos dois some", () => {
    const html = render(
      "list",
      content({
        groups: [
          {
            id: "g1",
            name: "Nível II",
            rows: [
              { id: "1", category: "Kit mochila", quantity: "", description: "", note: "Enviar todos os dias" },
              { id: "2", category: "Kit mochila", quantity: "", description: "", note: "" },
            ],
          },
        ],
      }),
    );
    expect(html).toContain('<div class="observacao-card"><p>Enviar todos os dias</p></div>');
    expect(html.match(/lista-item/g)).toBeNull();
  });

  it("turma sem itens não sai e seção sem nenhum item é vazia", () => {
    const value = content({ groups: [{ id: "g1", name: "Vazia", rows: [] }] });
    expect(isSectionEmpty("list", value)).toBe(true);
    expect(render("list", value)).not.toContain("Vazia");
  });
});

describe("renderSectionDocument — livros", () => {
  it("observação geral (sem título e sem imagem) sai antes dos livros da disciplina, mesmo com turma", () => {
    const html = render(
      "book",
      content({
        books: [
          book({ turma: "1º ano", title: "Coleção Os Pingos" }),
          book({ turma: "1º ano", note: "Escolher 1 (um) livro" }),
        ],
      }),
    );
    const [note, pingos] = order(html, ["Escolher 1 (um) livro", "Coleção Os Pingos"]);
    expect(note).toBeGreaterThan(-1);
    expect(note).toBeLessThan(pingos);
    expect(html).toContain('class="observacao-geral-blue"');
  });

  it("ordena turmas por code point e mantém a ordem digitada dentro da turma (sort estável)", () => {
    const html = render(
      "book",
      content({
        books: [
          book({ turma: "2º ano", title: "B2" }),
          book({ turma: "1º ano", title: "A1" }),
          book({ turma: "2º ano", title: "A2" }),
          book({ turma: "", title: "Sem turma" }),
        ],
      }),
    );
    const [semTurma, a1, b2, a2] = order(html, ["Sem turma", "A1", "B2", "A2"]);
    expect(semTurma).toBeLessThan(a1);
    expect(a1).toBeLessThan(b2);
    expect(b2).toBeLessThan(a2);
  });

  it("capa sem arquivo carregado sai como espaço vazio, sem <img>", () => {
    const html = render("book", content({ books: [book({ title: "Livro", imageMediaId: "m1" })] }));
    expect(html).toContain('<div class="book-imagem"></div>');
    expect(html).not.toContain("<img");
    const withImage = render("book", content({ books: [book({ title: "Livro", imageMediaId: "m1" })] }), new Map([["m1", "data:image/jpeg;base64,AAA"]]));
    expect(withImage).toContain('<img src="data:image/jpeg;base64,AAA" class="book-cover">');
  });
});

describe("renderSectionDocument — informações", () => {
  it("quebra de linha do texto vira <br> e o título da seção sai no topo", () => {
    const html = render("info", content({ info: [{ id: "1", title: "Entrega", body: "Linha 1\nLinha 2", note: "" }] }));
    expect(html).toContain('<h1 class="titulo-pagina">Título</h1>');
    expect(html).toContain("Linha 1<br>Linha 2");
    expect(html).toContain('<body class="tipo-info">');
  });
});
