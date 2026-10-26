"use client";

import { useRef, useTransition, type ReactNode } from "react";
import { ArrowDown, ArrowUp, Bold, Loader2, Trash2, Upload } from "lucide-react";
import { toast } from "sonner";
import { Button, Textarea, cn } from "@venore/plugin-sdk/ui";
import { uploadEditionFileAction } from "../admin/actions";

export function Field({ label, children, className }: { label: string; children: ReactNode; className?: string }) {
  return (
    <label className={cn("block space-y-1 text-xs", className)}>
      <span className="font-medium text-muted-foreground">{label}</span>
      {children}
    </label>
  );
}

export function RowActions({
  index,
  count,
  disabled,
  onMove,
  onRemove,
  removeLabel = "Remover",
}: {
  index: number;
  count: number;
  disabled?: boolean;
  onMove: (delta: -1 | 1) => void;
  onRemove: () => void;
  removeLabel?: string;
}) {
  return (
    <div className="flex shrink-0 items-center gap-0.5">
      <Button type="button" size="icon" variant="ghost" className="size-7" disabled={disabled || index === 0} onClick={() => onMove(-1)} aria-label="Mover para cima">
        <ArrowUp className="size-3.5" />
      </Button>
      <Button
        type="button"
        size="icon"
        variant="ghost"
        className="size-7"
        disabled={disabled || index === count - 1}
        onClick={() => onMove(1)}
        aria-label="Mover para baixo"
      >
        <ArrowDown className="size-3.5" />
      </Button>
      <Button type="button" size="icon" variant="ghost" className="size-7 text-destructive" disabled={disabled} onClick={onRemove} aria-label={removeLabel}>
        <Trash2 className="size-3.5" />
      </Button>
    </div>
  );
}

// Textarea com botão de negrito: envolve a seleção em <b>…</b> — o único markup que o PDF entende
// além da quebra de linha (shared/render/rich-text.ts).
export function RichTextarea({
  value,
  onChange,
  disabled,
  rows = 3,
  placeholder,
}: {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  rows?: number;
  placeholder?: string;
}) {
  const ref = useRef<HTMLTextAreaElement>(null);

  const applyBold = () => {
    const element = ref.current;
    if (!element) return;
    const { selectionStart, selectionEnd } = element;
    if (selectionStart === selectionEnd) return;
    const next = `${value.slice(0, selectionStart)}<b>${value.slice(selectionStart, selectionEnd)}</b>${value.slice(selectionEnd)}`;
    onChange(next);
  };

  return (
    <div className="space-y-1">
      <Textarea ref={ref} value={value} rows={rows} disabled={disabled} placeholder={placeholder} onChange={(event) => onChange(event.target.value)} />
      {!disabled && (
        <Button type="button" size="sm" variant="ghost" className="h-6 px-2 text-xs" onClick={applyBold}>
          <Bold className="size-3" />
          Negrito na seleção
        </Button>
      )}
    </div>
  );
}

export function UploadButton({
  kind,
  label,
  disabled,
  onUploaded,
}: {
  kind: "image" | "pdf";
  label: string;
  disabled?: boolean;
  onUploaded: (file: { id: string; url: string; filename: string }) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [pending, startTransition] = useTransition();

  const upload = (file: File) => {
    const formData = new FormData();
    formData.set("file", file);
    formData.set("kind", kind);
    startTransition(async () => {
      const result = await uploadEditionFileAction(formData);
      if (!result.ok) {
        toast.error(result.error);
        return;
      }
      onUploaded(result.data);
    });
  };

  return (
    <>
      <input
        ref={inputRef}
        type="file"
        hidden
        accept={kind === "pdf" ? "application/pdf" : "image/jpeg,image/png,image/webp"}
        onChange={(event) => {
          const file = event.target.files?.[0];
          event.target.value = "";
          if (file) upload(file);
        }}
      />
      <Button type="button" size="sm" variant="outline" disabled={disabled || pending} onClick={() => inputRef.current?.click()}>
        {pending ? <Loader2 className="size-3.5 animate-spin" /> : <Upload className="size-3.5" />}
        {label}
      </Button>
    </>
  );
}
