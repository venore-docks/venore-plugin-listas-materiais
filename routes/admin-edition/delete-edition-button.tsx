"use client";

import { useTransition } from "react";
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
} from "@venore/plugin-sdk/ui";
import { deleteEditionAction } from "../admin/actions";

export function DeleteEditionButton({ editionId, title, isOnlyYear }: { editionId: string; title: string; isOnlyYear: boolean }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  const confirm = () =>
    startTransition(async () => {
      const result = await deleteEditionAction(editionId);
      if (!result.ok) {
        toast.error(result.error);
        return;
      }
      toast.success(`Lista de ${result.data.year} apagada.`);
      router.push("/admin/listas-materiais");
    });

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button size="sm" variant="ghost" className="text-destructive" disabled={pending}>
          <Trash2 className="size-4" />
          Apagar lista
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Apagar a lista {title}?</AlertDialogTitle>
          <AlertDialogDescription>
            Apaga a lista deste ano, com as versões aprovadas, o PDF publicado e o histórico. Os outros anos do segmento não
            mudam.{isOnlyYear ? " É o único ano deste segmento: o segmento continua existindo, sem lista." : ""} Não dá para
            desfazer.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={confirm}>Apagar lista</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
