"use client";

import { FileText, Image as ImageIcon, Plus } from "lucide-react";
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
// (folha de rosto, horário, parceiros, quarta capa), a capa gerada e as seções geradas.
function ColorField({ label, value, disabled, onChange }: { label: string; value: string; disabled: boolean; onChange: (value: string) => void }) {
  return (
    // Só o seletor nativo (sempre devolve #rrggbb, que é o que o schema aceita); o hex fica visível ao lado.
    <Field label={label} className="w-28">
      <div className="flex h-9 items-center gap-2">
        <input
          type="color"
          value={value}
          disabled={disabled}
          onChange={(event) => onChange(event.target.value)}
          className="h-9 w-9 shrink-0 cursor-pointer rounded border border-border bg-transparent p-0.5 disabled:cursor-not-allowed"
          aria-label={label}
        />
        <span className="font-mono text-xs text-muted-foreground">{value}</span>
      </div>
    </Field>
  );
}

export function AssemblyTab({
  items,
  media,
  disabled,
  defaultSubtitle,
  onChange,
  onMediaAdded,
}: {
  items: AssemblyItem[];
  media: Record<string, MediaRef>;
  disabled: boolean;
  defaultSubtitle: string;
  onChange: (items: AssemblyItem[]) => void;
  onMediaAdded: (id: string, ref: MediaRef) => void;
}) {
  const update = (index: number, patch: Partial<AssemblyItem>) => onChange(replaceItem(items, index, patch as Partial<AssemblyItem>) as AssemblyItem[]);

  return (
    <div className="space-y-3">
      <p className="text-sm text-muted-foreground">
        Páginas na ordem em que saem no PDF. Páginas fixas são PDFs prontos (A4). A capa é gerada com o ano desta lista —
        virar o ano não exige arquivo novo; o logo extra (Kinder, Hunters…) é opcional.
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
          ) : item.kind === "cover" ? (
            <div className="flex min-w-[260px] flex-1 flex-wrap items-end gap-3">
              <Field label="Capa — subtítulo (o ano vem da lista)" className="w-64">
                <Input value={item.subtitle} disabled={disabled} onChange={(event) => update(index, { subtitle: event.target.value })} />
              </Field>
              <ColorField label="Fundo" value={item.topColor} disabled={disabled} onChange={(topColor) => update(index, { topColor })} />
              <ColorField label="Faixa do logo" value={item.bandColor} disabled={disabled} onChange={(bandColor) => update(index, { bandColor })} />
              <div className="flex items-end gap-2">
                <div
                  className="flex h-14 w-28 items-center justify-center rounded border border-border p-1"
                  style={{ backgroundColor: item.bandColor }}
                  title="Logo extra, à esquerda do logo do colégio"
                >
                  {item.logoMediaId && media[item.logoMediaId] ? (
                    // eslint-disable-next-line @next/next/no-img-element -- miniatura de mídia restrita, sem otimização do next/image
                    <img src={media[item.logoMediaId].url} alt="" className="max-h-full max-w-full object-contain" />
                  ) : (
                    <ImageIcon className="size-5 text-white/70" />
                  )}
                </div>
                <div className="flex flex-col items-start gap-1">
                  <UploadButton
                    kind="image"
                    label={item.logoMediaId ? "Trocar logo extra" : "Logo extra"}
                    disabled={disabled}
                    onUploaded={(file) => {
                      onMediaAdded(file.id, { url: file.url, filename: file.filename });
                      update(index, { logoMediaId: file.id });
                    }}
                  />
                  {item.logoMediaId && !disabled && (
                    <button type="button" className="text-xs text-muted-foreground hover:underline" onClick={() => update(index, { logoMediaId: null })}>
                      Sem logo extra
                    </button>
                  )}
                </div>
              </div>
            </div>
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
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={() =>
              onChange([
                { id: newId(), kind: "cover", subtitle: defaultSubtitle, topColor: "#006b82", bandColor: "#02748d", logoMediaId: null },
                ...items,
              ])
            }
          >
            <Plus className="size-3.5" />
            Capa com o ano
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
