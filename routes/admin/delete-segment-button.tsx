"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";
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
  Input,
} from "@venore/plugin-sdk/ui";
import { deleteSegmentAction } from "./actions";

// Apaga o segmento com todos os anos — pede o nome digitado pra não sair por engano.
export function DeleteSegmentButton({ segmentId, segmentName, years }: { segmentId: string; segmentName: string; years: number[] }) {
  const router = useRouter();
  const [confirmName, setConfirmName] = useState("");
  const [pending, startTransition] = useTransition();

  const confirm = () =>
    startTransition(async () => {
      const result = await deleteSegmentAction(segmentId, confirmName);
      if (!result.ok) {
        toast.error(result.error);
        return;
      }
      toast.success(`Segmento "${result.data.name}" apagado.`);
      router.refresh();
    });

  return (
    <AlertDialog onOpenChange={() => setConfirmName("")}>
      <AlertDialogTrigger asChild>
        <Button size="sm" variant="ghost" className="text-destructive" disabled={pending}>
          <Trash2 className="size-4" />
          Apagar segmento
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Apagar o segmento “{segmentName}”?</AlertDialogTitle>
          <AlertDialogDescription>
            Apaga {years.length === 1 ? `a lista de ${years[0]}` : `as listas de ${years.join(", ")}`}, com versões aprovadas e
            histórico. Não dá para desfazer. Os PDFs já baixados e divulgados continuam com quem os tem.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <label className="block space-y-1.5 text-sm">
          <span>
            Digite <span className="font-medium">{segmentName}</span> para confirmar
          </span>
          <Input value={confirmName} onChange={(event) => setConfirmName(event.target.value)} />
        </label>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction disabled={confirmName.trim() !== segmentName.trim()} onClick={confirm}>
            Apagar segmento
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
