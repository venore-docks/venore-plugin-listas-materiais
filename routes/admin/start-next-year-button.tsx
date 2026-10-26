"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { CalendarPlus } from "lucide-react";
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
import { startNextYearAction } from "./actions";

export function StartNextYearButton({ segmentId, segmentName, fromYear }: { segmentId: string; segmentName: string; fromYear: number }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const nextYear = fromYear + 1;

  const confirm = () =>
    startTransition(async () => {
      const result = await startNextYearAction(segmentId);
      if (!result.ok) {
        toast.error(result.error);
        return;
      }
      toast.success(`Lista de ${result.data.year} criada a partir de ${fromYear}.`);
      router.push(`/admin/listas-materiais/${result.data.editionId}`);
    });

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button size="sm" variant="ghost" disabled={pending}>
          <CalendarPlus className="size-4" />
          Iniciar {nextYear}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Iniciar a lista de {nextYear} — {segmentName}?
          </AlertDialogTitle>
          <AlertDialogDescription>
            A lista de {fromYear} é copiada inteira (itens, livros, capas e ordem das páginas) como rascunho de {nextYear}. A de{" "}
            {fromYear} continua disponível como está. Lembre de trocar as capas que trazem o ano impresso.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={confirm}>Criar lista de {nextYear}</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
