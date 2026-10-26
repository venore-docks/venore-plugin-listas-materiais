"use client";

import { Plus } from "lucide-react";
import { Button, Input } from "@venore/plugin-sdk/ui";
import type { InfoBlock } from "../../contracts/types";
import { moveItem, newId, removeItem, replaceItem } from "./array-ops";
import { Field, RichTextarea, RowActions } from "./editor-fields";

// Aba "Informações Importantes": um bloco por tópico; a observação vira o card laranja do bloco.
export function InfoTab({ blocks, disabled, onChange }: { blocks: InfoBlock[]; disabled: boolean; onChange: (blocks: InfoBlock[]) => void }) {
  const update = (index: number, patch: Partial<InfoBlock>) => onChange(replaceItem(blocks, index, patch));

  return (
    <div className="space-y-4">
      {blocks.length === 0 && <p className="text-sm text-muted-foreground">Nenhuma informação cadastrada — a seção fica fora do PDF.</p>}
      {blocks.map((block, index) => (
        <div key={block.id} className="space-y-3 rounded-md border border-border p-3">
          <div className="flex items-end gap-2">
            <Field label="Título" className="flex-1">
              <Input value={block.title} disabled={disabled} onChange={(event) => update(index, { title: event.target.value })} />
            </Field>
            <RowActions
              index={index}
              count={blocks.length}
              disabled={disabled}
              onMove={(delta) => onChange(moveItem(blocks, index, delta))}
              onRemove={() => onChange(removeItem(blocks, index))}
            />
          </div>
          <Field label="Texto">
            <RichTextarea value={block.body} disabled={disabled} rows={5} onChange={(body) => update(index, { body })} />
          </Field>
          <Field label="Observação em destaque (opcional)">
            <RichTextarea value={block.note} disabled={disabled} rows={2} onChange={(note) => update(index, { note })} />
          </Field>
        </div>
      ))}
      {!disabled && (
        <Button type="button" size="sm" variant="outline" onClick={() => onChange([...blocks, { id: newId(), title: "", body: "", note: "" }])}>
          <Plus className="size-3.5" />
          Nova informação
        </Button>
      )}
    </div>
  );
}
