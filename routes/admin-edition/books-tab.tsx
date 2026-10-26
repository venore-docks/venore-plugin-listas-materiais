"use client";

import { useState } from "react";
import { ImageOff, Plus, StickyNote } from "lucide-react";
import { Button, Input, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@venore/plugin-sdk/ui";
import type { BookRow } from "../../contracts/types";
import { insertItem, moveItem, newId, removeItem, replaceItem } from "./array-ops";
import { Field, RichTextarea, RowActions, UploadButton } from "./editor-fields";
import type { MediaRef } from "./edition-editor";

const ALL = "__todas__";

const emptyBook = (discipline: string, turma: string): BookRow => ({
  id: newId(),
  discipline,
  turma,
  semester: "",
  bimester: "",
  imageMediaId: null,
  title: "",
  isbn: "",
  author: "",
  publisher: "",
  note: "",
});

// Aba "Livros" da planilha antiga. No PDF: agrupados por disciplina (ordem da primeira aparição) e,
// dentro dela, por turma (ordem alfabética). Linha sem título e sem imagem = observação geral azul.
export function BooksTab({
  books,
  media,
  disabled,
  onChange,
  onMediaAdded,
}: {
  books: BookRow[];
  media: Record<string, MediaRef>;
  disabled: boolean;
  onChange: (books: BookRow[]) => void;
  onMediaAdded: (id: string, ref: MediaRef) => void;
}) {
  const disciplines = [...new Set(books.map((book) => book.discipline.trim()).filter(Boolean))];
  const [filter, setFilter] = useState(ALL);
  const visible = books.map((book, index) => ({ book, index })).filter(({ book }) => filter === ALL || book.discipline.trim() === filter);

  const update = (index: number, patch: Partial<BookRow>) => onChange(replaceItem(books, index, patch));
  const add = (kind: "book" | "note") => {
    const discipline = filter === ALL ? disciplines.at(-1) ?? "" : filter;
    const book = emptyBook(discipline, kind === "book" ? books.at(-1)?.turma ?? "" : "");
    onChange([...books, kind === "note" ? { ...book, note: "Nova observação" } : book]);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-end gap-3">
        <Field label="Disciplina" className="w-64">
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={ALL}>Todas ({books.length})</SelectItem>
              {disciplines.map((discipline) => (
                <SelectItem key={discipline} value={discipline}>
                  {discipline}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>
        <p className="pb-2 text-xs text-muted-foreground">Capa ideal: 500 px no lado maior, JPG com fundo branco ou PNG transparente.</p>
      </div>

      <datalist id="livros-disciplinas">
        {disciplines.map((discipline) => (
          <option key={discipline} value={discipline} />
        ))}
      </datalist>

      {visible.length === 0 && <p className="text-sm text-muted-foreground">Nenhum livro cadastrado.</p>}
      {visible.map(({ book, index }) => {
        const isNote = !book.title.trim() && !book.imageMediaId && Boolean(book.note.trim());
        const image = book.imageMediaId ? media[book.imageMediaId] : undefined;
        return (
          <div key={book.id} className="rounded-md border border-border p-3">
            <div className="flex flex-wrap items-start gap-3">
              <div className="flex w-24 flex-col items-center gap-1">
                {image ? (
                  // eslint-disable-next-line @next/next/no-img-element -- miniatura de mídia restrita, sem otimização do next/image
                  <img src={image.url} alt="" className="max-h-28 w-auto rounded border border-border object-contain" />
                ) : (
                  <div className="flex h-28 w-20 items-center justify-center rounded border border-dashed border-border text-muted-foreground">
                    <ImageOff className="size-5" />
                  </div>
                )}
                <UploadButton
                  kind="image"
                  label={image ? "Trocar" : "Capa"}
                  disabled={disabled}
                  onUploaded={(file) => {
                    onMediaAdded(file.id, { url: file.url, filename: file.filename });
                    update(index, { imageMediaId: file.id });
                  }}
                />
                {image && !disabled && (
                  <button type="button" className="text-xs text-muted-foreground hover:underline" onClick={() => update(index, { imageMediaId: null })}>
                    Sem capa
                  </button>
                )}
              </div>
              <div className="grid min-w-[260px] flex-1 gap-2 sm:grid-cols-2 lg:grid-cols-4">
                <Field label="Disciplina">
                  <Input list="livros-disciplinas" value={book.discipline} disabled={disabled} onChange={(event) => update(index, { discipline: event.target.value })} />
                </Field>
                <Field label="Turma">
                  <Input value={book.turma} disabled={disabled} placeholder="(todas)" onChange={(event) => update(index, { turma: event.target.value })} />
                </Field>
                <Field label="Semestre">
                  <Input value={book.semester} disabled={disabled} onChange={(event) => update(index, { semester: event.target.value })} />
                </Field>
                <Field label="Bimestre">
                  <Input value={book.bimester} disabled={disabled} onChange={(event) => update(index, { bimester: event.target.value })} />
                </Field>
                <Field label="Título" className="sm:col-span-2">
                  <Input value={book.title} disabled={disabled} onChange={(event) => update(index, { title: event.target.value })} />
                </Field>
                <Field label="Autor">
                  <Input value={book.author} disabled={disabled} onChange={(event) => update(index, { author: event.target.value })} />
                </Field>
                <Field label="Editora">
                  <Input value={book.publisher} disabled={disabled} onChange={(event) => update(index, { publisher: event.target.value })} />
                </Field>
                <Field label="ISBN">
                  <Input value={book.isbn} disabled={disabled} onChange={(event) => update(index, { isbn: event.target.value })} />
                </Field>
                <Field label={isNote ? "Observação geral — sem título e sem capa, sai como card azul acima dos livros da disciplina" : "Observação (sem título e sem capa = observação geral da disciplina)"} className="sm:col-span-2 lg:col-span-4">
                  <RichTextarea value={book.note} disabled={disabled} rows={isNote ? 3 : 2} onChange={(note) => update(index, { note })} />
                </Field>
              </div>
              <RowActions
                index={index}
                count={books.length}
                disabled={disabled}
                onMove={(delta) => onChange(moveItem(books, index, delta))}
                onRemove={() => onChange(removeItem(books, index))}
              />
            </div>
            {!disabled && (
              <button
                type="button"
                className="mt-1 text-xs text-muted-foreground underline-offset-2 hover:underline"
                onClick={() => onChange(insertItem(books, index + 1, emptyBook(book.discipline, book.turma)))}
              >
                + inserir livro abaixo
              </button>
            )}
          </div>
        );
      })}

      {!disabled && (
        <div className="flex flex-wrap gap-2">
          <Button type="button" size="sm" variant="outline" onClick={() => add("book")}>
            <Plus className="size-3.5" />
            Novo livro
          </Button>
          <Button type="button" size="sm" variant="ghost" onClick={() => add("note")}>
            <StickyNote className="size-3.5" />
            Nova observação geral
          </Button>
        </div>
      )}
    </div>
  );
}
