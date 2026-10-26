"use client";

import { useState } from "react";
import { Plus, StickyNote } from "lucide-react";
import { Button, Input, cn } from "@venore/plugin-sdk/ui";
import type { ListGroup, ListRow } from "../../contracts/types";
import { insertItem, moveItem, newId, removeItem, replaceItem } from "./array-ops";
import { Field, RowActions } from "./editor-fields";

// Uma linha por item (Categoria | Qtd. | Descrição | Observação | ações) — turma com 30 itens cabe na tela.
const ROW_GRID = "grid grid-cols-[130px_52px_minmax(280px,2.2fr)_minmax(140px,1fr)_auto] items-center gap-1.5";

// Aba "Séries" da planilha antiga, organizada por turma (cada turma vira a faixa verde no PDF, na
// ordem desta coluna). Linha sem descrição e com observação = aviso em destaque (card).
export function ListsTab({ groups, disabled, onChange }: { groups: ListGroup[]; disabled: boolean; onChange: (groups: ListGroup[]) => void }) {
  const [selectedId, setSelectedId] = useState(groups[0]?.id ?? null);
  const selectedIndex = Math.max(0, groups.findIndex((group) => group.id === selectedId));
  const selected = groups[selectedIndex];

  const updateGroup = (index: number, patch: Partial<ListGroup>) => onChange(replaceItem(groups, index, patch));
  const updateRows = (rows: ListRow[]) => updateGroup(selectedIndex, { rows });

  const addGroup = () => {
    const group: ListGroup = { id: newId(), name: "Nova turma", rows: [] };
    onChange([...groups, group]);
    setSelectedId(group.id);
  };

  const removeGroup = (index: number) => {
    const group = groups[index];
    if (group.rows.length > 0 && !window.confirm(`Remover a turma "${group.name}" e seus ${group.rows.length} itens?`)) return;
    const next = removeItem(groups, index);
    onChange(next);
    setSelectedId(next[Math.min(index, next.length - 1)]?.id ?? null);
  };

  const addRow = (kind: "item" | "aviso") => {
    if (!selected) return;
    const lastCategory = selected.rows.at(-1)?.category ?? "";
    const row: ListRow = { id: newId(), category: lastCategory, quantity: kind === "item" ? "1" : "", description: "", note: "" };
    updateRows([...selected.rows, row]);
  };

  const categories = selected ? [...new Set(selected.rows.map((row) => row.category).filter((category) => category.trim()))] : [];

  return (
    <div className="grid gap-6 lg:grid-cols-[220px_1fr]">
      <div className="space-y-2">
        <p className="text-xs text-muted-foreground">Turmas, na ordem em que saem no PDF.</p>
        <div className="space-y-1">
          {groups.map((group, index) => (
            <div
              key={group.id}
              className={cn(
                "flex items-center gap-1 rounded-md border px-2 py-1",
                group.id === selected?.id ? "border-primary bg-accent" : "border-border",
              )}
            >
              <button type="button" className="min-w-0 flex-1 truncate text-left text-sm" onClick={() => setSelectedId(group.id)}>
                {group.name || "(sem nome)"}
                <span className="ml-1 text-xs text-muted-foreground">({group.rows.length})</span>
              </button>
              <RowActions
                index={index}
                count={groups.length}
                disabled={disabled}
                onMove={(delta) => onChange(moveItem(groups, index, delta))}
                onRemove={() => removeGroup(index)}
                removeLabel="Remover turma"
              />
            </div>
          ))}
        </div>
        {!disabled && (
          <Button type="button" size="sm" variant="outline" onClick={addGroup}>
            <Plus className="size-3.5" />
            Nova turma
          </Button>
        )}
      </div>

      {selected ? (
        <div className="space-y-4">
          <Field label="Nome da turma (título da faixa no PDF)">
            <Input value={selected.name} disabled={disabled} onChange={(event) => updateGroup(selectedIndex, { name: event.target.value })} />
          </Field>

          <datalist id={`categorias-${selected.id}`}>
            {categories.map((category) => (
              <option key={category} value={category} />
            ))}
          </datalist>

          {selected.rows.length === 0 ? (
            <p className="text-sm text-muted-foreground">Nenhum item nesta turma.</p>
          ) : (
            <div className="overflow-x-auto">
              <div className="min-w-[760px] space-y-1">
                <div className={cn(ROW_GRID, "px-1 text-xs font-medium text-muted-foreground")}>
                  <span>Categoria</span>
                  <span>Qtd.</span>
                  <span>Descrição</span>
                  <span>Observação / texto do aviso</span>
                  <span />
                </div>
                {selected.rows.map((row, index) => {
                  const isNotice = !row.description.trim();
                  const patch = (value: Partial<ListRow>) => updateRows(replaceItem(selected.rows, index, value));
                  return (
                    <div key={row.id} className={cn(ROW_GRID, "rounded-md px-1 py-0.5", isNotice && "bg-muted/60")}>
                      <Input
                        className="h-8"
                        list={`categorias-${selected.id}`}
                        value={row.category}
                        disabled={disabled}
                        placeholder="—"
                        onChange={(event) => patch({ category: event.target.value })}
                      />
                      <Input className="h-8 text-center" value={row.quantity} disabled={disabled} onChange={(event) => patch({ quantity: event.target.value })} />
                      <Input
                        className="h-8"
                        value={row.description}
                        disabled={disabled}
                        placeholder={isNotice ? "(vazio: a linha sai como aviso em destaque)" : undefined}
                        onChange={(event) => patch({ description: event.target.value })}
                      />
                      <Input className="h-8" value={row.note} disabled={disabled} onChange={(event) => patch({ note: event.target.value })} />
                      <div className="flex items-center">
                        {!disabled && (
                          <Button
                            type="button"
                            size="icon"
                            variant="ghost"
                            className="size-7"
                            aria-label="Inserir item abaixo"
                            onClick={() =>
                              updateRows(insertItem(selected.rows, index + 1, { id: newId(), category: row.category, quantity: "1", description: "", note: "" }))
                            }
                          >
                            <Plus className="size-3.5" />
                          </Button>
                        )}
                        <RowActions
                          index={index}
                          count={selected.rows.length}
                          disabled={disabled}
                          onMove={(delta) => updateRows(moveItem(selected.rows, index, delta))}
                          onRemove={() => updateRows(removeItem(selected.rows, index))}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {!disabled && (
            <div className="flex flex-wrap gap-2">
              <Button type="button" size="sm" variant="outline" onClick={() => addRow("item")}>
                <Plus className="size-3.5" />
                Novo item
              </Button>
              <Button type="button" size="sm" variant="ghost" onClick={() => addRow("aviso")}>
                <StickyNote className="size-3.5" />
                Novo aviso
              </Button>
            </div>
          )}
          <p className="text-xs text-muted-foreground">
            Itens com a mesma categoria saem juntos no PDF, sob o título da categoria, na ordem em que a categoria aparece pela primeira vez.
          </p>
        </div>
      ) : (
        <p className="text-sm text-muted-foreground">Crie uma turma para começar.</p>
      )}
    </div>
  );
}
