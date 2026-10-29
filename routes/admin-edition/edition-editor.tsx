"use client";

import { useCallback, useEffect, useMemo, useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Download, Loader2, Save } from "lucide-react";
import { toast } from "sonner";
import { Button, Tabs, TabsContent, TabsList, TabsTrigger } from "@venore/plugin-sdk/ui";
import type { EditionContent, EditionStatus } from "../../contracts/types";
import type { EditionView } from "../../features/get-edition/types";
import { EditionStatusBadge, formatDateTime, pdfDownloadHref } from "../../shared/ui/status-badge";
import { saveEditionAction } from "../admin/actions";
import { AssemblyTab } from "./assembly-tab";
import { BooksTab } from "./books-tab";
import { DeleteEditionButton } from "./delete-edition-button";
import { HistoryTab } from "./history-tab";
import { InfoTab } from "./info-tab";
import { ListsTab } from "./lists-tab";
import { WorkflowActions } from "./workflow-actions";

export type EditorPermissions = { edit: boolean; design: boolean; approve: boolean; publish: boolean; delete: boolean };
export type MediaRef = { url: string; filename: string };

export function EditionEditor({
  view,
  permissions,
  initialMedia,
}: {
  view: EditionView;
  permissions: EditorPermissions;
  initialMedia: Record<string, MediaRef>;
}) {
  const router = useRouter();
  const { edition, segment } = view;
  const [content, setContent] = useState<EditionContent>(edition.content);
  const [savedJson, setSavedJson] = useState(() => JSON.stringify(edition.content));
  // Versão/status do servidor valem, exceto logo depois de um salvar — até o router.refresh trazer a
  // versão nova, vale a que o próprio salvar devolveu.
  const [savedMeta, setSavedMeta] = useState<{ version: number; status: EditionStatus } | null>(null);
  const meta = savedMeta && savedMeta.version > edition.version ? savedMeta : { version: edition.version, status: edition.status };
  const [media, setMedia] = useState(initialMedia);
  const [saving, startSaving] = useTransition();

  const dirty = useMemo(() => JSON.stringify(content) !== savedJson, [content, savedJson]);
  const canModify = permissions.edit || permissions.design;
  const title = `${segment.name} ${edition.year}`;

  const save = useCallback(() => {
    if (!dirty || saving) return;
    const snapshot = content;
    startSaving(async () => {
      const result = await saveEditionAction(edition.id, meta.version, snapshot);
      if (!result.ok) {
        toast.error(result.error);
        return;
      }
      setSavedJson(JSON.stringify(snapshot));
      setSavedMeta({ version: result.data.version, status: result.data.status });
      toast.success(meta.status === "draft" ? "Alterações salvas." : "Alterações salvas — a lista voltou para rascunho.");
      router.refresh();
    });
  }, [content, dirty, edition.id, meta.status, meta.version, router, saving]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "s") {
        event.preventDefault();
        save();
      }
    };
    const onBeforeUnload = (event: BeforeUnloadEvent) => {
      if (dirty) event.preventDefault();
    };
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("beforeunload", onBeforeUnload);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("beforeunload", onBeforeUnload);
    };
  }, [dirty, save]);

  const addMedia = (id: string, ref: MediaRef) => setMedia((current) => ({ ...current, [id]: ref }));
  const setPart = <K extends keyof EditionContent>(key: K) => (value: EditionContent[K]) => setContent((current) => ({ ...current, [key]: value }));

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/admin/listas-materiais">
            <ArrowLeft className="size-4" />
            Listas de materiais
          </Link>
        </Button>

        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="space-y-1">
            <h1 className="text-xl font-semibold">{segment.name}</h1>
            <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
              {view.siblingYears.map((sibling) =>
                sibling.id === edition.id ? (
                  <span key={sibling.id} className="font-medium text-foreground">
                    {sibling.year}
                  </span>
                ) : (
                  <Link key={sibling.id} href={`/admin/listas-materiais/${sibling.id}`} className="underline underline-offset-2">
                    {sibling.year}
                  </Link>
                ),
              )}
              <EditionStatusBadge status={meta.status} />
              {dirty && <span className="font-medium text-primary">● alterações não salvas</span>}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {canModify && (
              <Button size="sm" onClick={save} disabled={!dirty || saving}>
                {saving ? <Loader2 className="size-4 animate-spin" /> : <Save className="size-4" />}
                Salvar
              </Button>
            )}
            <WorkflowActions editionId={edition.id} version={meta.version} status={meta.status} dirty={dirty} permissions={permissions} title={title} />
          </div>
        </div>

        <StatusNotice view={view} status={meta.status} />

        <div className="flex flex-wrap gap-2">
          <Button size="sm" variant="outline" asChild title={dirty ? "A prévia mostra a última versão salva." : undefined}>
            <a href={pdfDownloadHref(edition.id, "previa")} target="_blank" rel="noreferrer">
              <Download className="size-4" />
              Prévia do PDF{dirty ? " (versão salva)" : ""}
            </a>
          </Button>
          {view.approvedRevisionNumber !== null && (
            <Button size="sm" variant="outline" asChild>
              <a href={pdfDownloadHref(edition.id, "aprovada")} target="_blank" rel="noreferrer">
                <Download className="size-4" />
                Aprovada (v{view.approvedRevisionNumber})
              </a>
            </Button>
          )}
          {edition.publishedPdfMediaId && (
            <Button size="sm" variant="outline" asChild>
              <a href={pdfDownloadHref(edition.id, "publicada")}>
                <Download className="size-4" />
                PDF publicado
              </a>
            </Button>
          )}
          {permissions.delete && <DeleteEditionButton editionId={edition.id} title={title} isOnlyYear={view.siblingYears.length === 1} />}
        </div>
      </div>

      <Tabs defaultValue="listas">
        <TabsList>
          <TabsTrigger value="listas">Listas</TabsTrigger>
          <TabsTrigger value="livros">Livros</TabsTrigger>
          <TabsTrigger value="informacoes">Informações</TabsTrigger>
          <TabsTrigger value="montagem">Capas e ordem</TabsTrigger>
          <TabsTrigger value="historico">Histórico</TabsTrigger>
        </TabsList>
        <TabsContent value="listas" className="pt-4">
          <ListsTab groups={content.groups} disabled={!permissions.edit} onChange={setPart("groups")} />
        </TabsContent>
        <TabsContent value="livros" className="pt-4">
          <BooksTab books={content.books} media={media} disabled={!permissions.edit} onChange={setPart("books")} onMediaAdded={addMedia} />
        </TabsContent>
        <TabsContent value="informacoes" className="pt-4">
          <InfoTab blocks={content.info} disabled={!permissions.edit} onChange={setPart("info")} />
        </TabsContent>
        <TabsContent value="montagem" className="pt-4">
          <AssemblyTab
            items={content.assembly}
            media={media}
            disabled={!permissions.design}
            defaultSubtitle={segment.name}
            onChange={setPart("assembly")}
            onMediaAdded={addMedia}
          />
        </TabsContent>
        <TabsContent value="historico" className="pt-4">
          <HistoryTab events={view.events} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

function StatusNotice({ view, status }: { view: EditionView; status: EditionStatus }) {
  const { edition } = view;
  const messages: string[] = [];

  if (status === "draft" && edition.reviewNote) messages.push(`Devolvida pela direção: ${edition.reviewNote}`);
  if (status === "in_review") messages.push("Aguardando aprovação da direção. Se alguém salvar uma alteração agora, a lista volta para rascunho.");
  if (status === "approved") messages.push(`Aprovada (versão ${view.approvedRevisionNumber}). Falta o marketing publicar o PDF.`);
  if (status === "published" && edition.publishedAt) messages.push(`PDF publicado em ${formatDateTime(edition.publishedAt)}.`);
  if (status !== "published" && edition.publishedPdfMediaId) {
    messages.push(`O PDF publicado anteriormente (versão ${view.publishedRevisionNumber}) continua valendo até a próxima publicação.`);
  }

  if (messages.length === 0) return null;
  return (
    <div className="space-y-1 rounded-md border border-border bg-muted/40 px-3 py-2 text-sm">
      {messages.map((message) => (
        <p key={message}>{message}</p>
      ))}
    </div>
  );
}
