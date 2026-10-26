"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Check, Loader2, Send, Share2, Undo2 } from "lucide-react";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  Button,
  Textarea,
} from "@venore/plugin-sdk/ui";
import type { EditionStatus } from "../../contracts/types";
import { publishEditionAction, reviewEditionAction, submitEditionAction } from "../admin/actions";
import type { EditorPermissions } from "./edition-editor";

type Props = {
  editionId: string;
  version: number;
  status: EditionStatus;
  dirty: boolean;
  permissions: EditorPermissions;
  title: string;
};

// Botões do fluxo, cada um só pra quem pode e só no status certo. Com alteração não salva, nada de
// enviar/aprovar: o que vai pra frente é sempre a versão salva.
export function WorkflowActions({ editionId, version, status, dirty, permissions, title }: Props) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [note, setNote] = useState("");

  const run = (action: () => Promise<{ ok: true; data?: unknown } | { ok: false; error: string }>, success: string) =>
    startTransition(async () => {
      const result = await action();
      if (!result.ok) {
        toast.error(result.error);
        return;
      }
      toast.success(success);
      setNote("");
      router.refresh();
    });

  const canSubmit = (permissions.edit || permissions.design) && status === "draft";
  const canReview = permissions.approve && status === "in_review";
  const canPublish = permissions.publish && status === "approved";
  const blockedHint = dirty ? "Salve as alterações primeiro." : undefined;

  return (
    <>
      {canSubmit && (
        <ConfirmButton
          icon={<Send className="size-4" />}
          label="Enviar para aprovação"
          title={`Enviar ${title} para a direção?`}
          description="A direção recebe a lista para conferir. Se alguém editar depois do envio, ela volta para rascunho e precisa ser enviada de novo."
          confirmLabel="Enviar"
          disabled={pending || dirty}
          hint={blockedHint}
          onConfirm={() => run(() => submitEditionAction(editionId, version), "Lista enviada para aprovação.")}
        />
      )}

      {canReview && (
        <>
          <ConfirmButton
            icon={<Check className="size-4" />}
            label="Aprovar"
            title={`Aprovar ${title}?`}
            description="Esta versão fica congelada e é ela que o marketing publica. Baixe a prévia antes, se ainda não conferiu o PDF."
            confirmLabel="Aprovar"
            disabled={pending || dirty}
            hint={blockedHint}
            onConfirm={() => run(() => reviewEditionAction(editionId, version, "approve", note), "Lista aprovada.")}
          >
            <Textarea placeholder="Comentário (opcional)" value={note} onChange={(event) => setNote(event.target.value)} />
          </ConfirmButton>
          <ConfirmButton
            variant="outline"
            icon={<Undo2 className="size-4" />}
            label="Devolver"
            title="Devolver para a coordenação"
            description="Explique o que precisa ser ajustado — o comentário aparece no topo da lista para quem for editar."
            confirmLabel="Devolver"
            disabled={pending || dirty}
            confirmDisabled={!note.trim()}
            hint={blockedHint}
            onConfirm={() => run(() => reviewEditionAction(editionId, version, "reject", note), "Lista devolvida para ajustes.")}
          >
            <Textarea placeholder="O que precisa mudar?" value={note} onChange={(event) => setNote(event.target.value)} />
          </ConfirmButton>
        </>
      )}

      {canPublish && (
        <ConfirmButton
          icon={pending ? <Loader2 className="size-4 animate-spin" /> : <Share2 className="size-4" />}
          label={pending ? "Gerando PDF…" : "Publicar PDF"}
          title={`Publicar ${title}?`}
          description="O PDF final é gerado a partir da versão aprovada pela direção e fica disponível para download pelos três perfis. Pode levar alguns segundos."
          confirmLabel="Publicar"
          disabled={pending}
          onConfirm={() =>
            startTransition(async () => {
              const result = await publishEditionAction(editionId);
              if (!result.ok) {
                toast.error(result.error);
                return;
              }
              if (result.data.skipped.length > 0) {
                toast.warning(`Publicado sem as páginas: ${result.data.skipped.join(", ")} (sem arquivo).`);
              } else {
                toast.success("PDF publicado.");
              }
              router.refresh();
            })
          }
        />
      )}
    </>
  );
}

function ConfirmButton({
  icon,
  label,
  title,
  description,
  confirmLabel,
  disabled,
  confirmDisabled,
  hint,
  variant = "default",
  onConfirm,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  title: string;
  description: string;
  confirmLabel: string;
  disabled?: boolean;
  confirmDisabled?: boolean;
  hint?: string;
  variant?: "default" | "outline";
  onConfirm: () => void;
  children?: React.ReactNode;
}) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button size="sm" variant={variant} disabled={disabled} title={hint}>
          {icon}
          {label}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        {children}
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction disabled={confirmDisabled} onClick={onConfirm}>
            {confirmLabel}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
