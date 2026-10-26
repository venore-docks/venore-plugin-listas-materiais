"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Input,
} from "@venore/plugin-sdk/ui";
import { createSegmentAction } from "./actions";

export function CreateSegmentDialog({ defaultYear }: { defaultYear: number }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [year, setYear] = useState(String(defaultYear));
  const [pending, startTransition] = useTransition();

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    startTransition(async () => {
      const result = await createSegmentAction(name, Number(year));
      if (!result.ok) {
        toast.error(result.error);
        return;
      }
      setOpen(false);
      router.push(`/admin/listas-materiais/${result.data.editionId}`);
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Plus className="size-4" />
          Novo segmento
        </Button>
      </DialogTrigger>
      <DialogContent>
        <form onSubmit={submit} className="space-y-4">
          <DialogHeader>
            <DialogTitle>Novo segmento</DialogTitle>
            <DialogDescription>
              Cria uma lista vazia com as seções padrão. As capas e páginas fixas são adicionadas depois, na aba Montagem.
            </DialogDescription>
          </DialogHeader>
          <label className="block space-y-1.5 text-sm">
            <span className="font-medium">Nome</span>
            <Input value={name} onChange={(event) => setName(event.target.value)} placeholder="Ex.: Ensino Médio (3º ano)" required />
          </label>
          <label className="block space-y-1.5 text-sm">
            <span className="font-medium">Ano letivo</span>
            <Input type="number" value={year} onChange={(event) => setYear(event.target.value)} min={2000} max={2200} required />
          </label>
          <DialogFooter>
            <Button type="submit" disabled={pending || !name.trim()}>
              Criar segmento
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
