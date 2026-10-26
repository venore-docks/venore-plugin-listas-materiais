"use client";

import { FileText, Plus } from "lucide-react";
import { Badge, Button, Input } from "@venore/plugin-sdk/ui";
import type { AssemblyItem, SectionKind } from "../../contracts/types";
import { moveItem, newId, removeItem, replaceItem } from "./array-ops";
import { Field, RowActions, UploadButton } from "./editor-fields";
import type { MediaRef } from "./edition-editor";

const SECTION_LABELS: Record<SectionKind, string> = {
  info: "Seção gerada — Informações",
  list: "Seção gerada — Listas por turma",
  book: "Seção gerada — Livros",
};

// Ordem das páginas do PDF final (era pacote_final.ordem_montagem): PDFs prontos do marketing
// (capa, folha de rosto, horário, parceiros, quarta capa) intercalados com as seções geradas.
export function AssemblyTab({
  items,
  media,
  disabled,
  onChange,
  onMediaAdded,
}: {
  items: AssemblyItem[];
  media: Record<string, MediaRef>;
  disabled: boolean;
  onChange: (items: AssemblyItem[]) => void;
  onMediaAdded: (id: string, ref: MediaRef) => void;
}) {
  const update = (index: number, patch: Partial<AssemblyItem>) => onChange(replaceItem(items, index, patch as Partial<AssemblyItem>) as AssemblyItem[]);

  return (
    <div className="space-y-3">
      <p className="text-sm text-muted-foreground">
        Páginas na ordem em que saem no PDF. As páginas fixas são PDFs prontos (A4) — para trocar a capa do ano, envie o PDF novo.
      </p>
      {items.map((item, index) => (
        <div key={item.id} className="flex flex-wrap items-end gap-3 rounded-md border border-border p-3">
          <span className="w-6 pb-2 text-sm text-muted-foreground">{index + 1}.</span>
          {item.kind === "static" ? (
            <>
              <Field label="Página fixa" className="w-56">
                <Input value={item.label} disabled={disabled} onChange={(event) => update(index, { label: event.target.value })} />
              </Field>
              <div className="flex min-w-[200px] flex-1 items-center gap-2 pb-1 text-sm">
                {item.mediaId && media[item.mediaId] ? (
                  <a className="flex items-center gap-1 truncate underline-offset-2 hover:underline" href={media[item.mediaId].url} target="_blank" rel="noreferrer">
                    <FileText className="size-4 shrink-0" />
                    <span className="truncate">{media[item.mediaId].filename || "Arquivo"}</span>
                  </a>
                ) : (
                  <span className="text-destructive">Sem arquivo — esta página fica fora do PDF.</span>
                )}
              </div>
              <UploadButton
                kind="pdf"
                label={item.mediaId ? "Trocar PDF" : "Enviar PDF"}
                disabled={disabled}
                onUploaded={(file) => {
                  onMediaAdded(file.id, { url: file.url, filename: file.filename });
                  update(index, { mediaId: file.id });
                }}
              />
            </>
          ) : (
            <>
              <Field label={item.section === "list" ? "Título (não impresso nesta seção)" : "Título impresso no topo"} className="w-56">
                <Input value={item.title} disabled={disabled} onChange={(event) => update(index, { title: event.target.value })} />
              </Field>
              <div className="flex-1 pb-1.5">
                <Badge variant="secondary">{SECTION_LABELS[item.section]}</Badge>
              </div>
            </>
          )}
          <RowActions
            index={index}
            count={items.length}
            disabled={disabled}
            onMove={(delta) => onChange(moveItem(items, index, delta))}
            onRemove={() => onChange(removeItem(items, index))}
            removeLabel="Remover página"
          />
        </div>
      ))}
      {!disabled && (
        <div className="flex flex-wrap gap-2">
          <Button type="button" size="sm" variant="outline" onClick={() => onChange([...items, { id: newId(), kind: "static", label: "Nova página", mediaId: null }])}>
            <Plus className="size-3.5" />
            Página fixa (PDF)
          </Button>
          {(["info", "list", "book"] as const)
            .filter((section) => !items.some((item) => item.kind === "section" && item.section === section))
            .map((section) => (
              <Button
                key={section}
                type="button"
                size="sm"
                variant="ghost"
                onClick={() =>
                  onChange([
                    ...items,
                    { id: newId(), kind: "section", section, title: section === "info" ? "Informações Importantes" : section === "list" ? "Listas de Materiais" : "Livros" },
                  ])
                }
              >
                <Plus className="size-3.5" />
                {SECTION_LABELS[section]}
              </Button>
            ))}
        </div>
      )}
    </div>
  );
}
