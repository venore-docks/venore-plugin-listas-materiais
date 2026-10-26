import Link from "next/link";
import { ClipboardList, Download, FileText } from "lucide-react";
import { getPluginAdminPageData } from "@venore/plugin-sdk/admin";
import { AdminAccessDenied, AdminPageHeader, Button, Card, CardContent, CardHeader, CardTitle, EmptyState } from "@venore/plugin-sdk/ui";
import { listSegments } from "../../index";
import { LISTAS_PERMISSIONS } from "../../shared/permissions";
import { EditionStatusBadge, formatDateTime, pdfDownloadHref } from "../../shared/ui/status-badge";
import { CreateSegmentDialog } from "./create-segment-dialog";
import { StartNextYearButton } from "./start-next-year-button";

export default async function ListasMateriaisAdminPage() {
  const gate = await getPluginAdminPageData("listas-materiais");
  if (!gate.granted) {
    return <AdminAccessDenied message="Você não tem permissão para ver as listas de materiais." />;
  }

  const result = await listSegments();
  if (!result.success) {
    return <p className="text-sm text-destructive">Erro ao carregar as listas: {result.error.message}</p>;
  }

  const can = (permission: string) => gate.actor.isSuperadmin || gate.actor.permissions.includes(permission);
  const canStartYear = can(LISTAS_PERMISSIONS.edit) || can(LISTAS_PERMISSIONS.design);
  const canCreateSegment = can(LISTAS_PERMISSIONS.design);
  const segments = result.data;
  const nextSchoolYear = new Date().getFullYear() + 1;

  return (
    <div className="space-y-8">
      <AdminPageHeader
        title="Listas de materiais"
        description="Uma lista por segmento e ano letivo. A coordenação edita e envia, a direção aprova e o marketing publica o PDF final."
        actions={canCreateSegment && segments.length > 0 && <CreateSegmentDialog defaultYear={nextSchoolYear} />}
      />

      {segments.length === 0 ? (
        <EmptyState
          icon={<ClipboardList className="size-8" strokeWidth={1.5} />}
          title="Nenhuma lista cadastrada"
          description="Para trazer as listas de 2026 do Drive, use “Popular dados de exemplo” deste plugin em Plugins. Também é possível começar um segmento vazio."
          action={canCreateSegment ? <CreateSegmentDialog defaultYear={nextSchoolYear} /> : undefined}
        />
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {segments.map((segment) => {
            const [latest, ...older] = segment.editions;
            const lastPublished = segment.editions.find((edition) => edition.hasPublishedPdf);
            return (
              <Card key={segment.id} className="flex flex-col">
                <CardHeader className="space-y-2">
                  <CardTitle className="text-base">{segment.name}</CardTitle>
                  {latest ? (
                    <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                      <span className="font-medium text-foreground">{latest.year}</span>
                      <EditionStatusBadge status={latest.status} />
                      <span>atualizada em {formatDateTime(latest.updatedAt)}</span>
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">Sem lista cadastrada.</p>
                  )}
                </CardHeader>
                <CardContent className="mt-auto space-y-3">
                  <div className="flex flex-wrap gap-2">
                    {latest && (
                      <Button size="sm" asChild>
                        <Link href={`/admin/listas-materiais/${latest.id}`}>
                          <FileText className="size-4" />
                          Abrir lista {latest.year}
                        </Link>
                      </Button>
                    )}
                    {lastPublished && (
                      <Button size="sm" variant="outline" asChild>
                        <a href={pdfDownloadHref(lastPublished.id, "publicada")}>
                          <Download className="size-4" />
                          PDF publicado {lastPublished.year}
                        </a>
                      </Button>
                    )}
                    {canStartYear && latest && (
                      <StartNextYearButton segmentId={segment.id} segmentName={segment.name} fromYear={latest.year} />
                    )}
                  </div>
                  {older.length > 0 && (
                    <p className="text-xs text-muted-foreground">
                      Anos anteriores:{" "}
                      {older.map((edition, index) => (
                        <span key={edition.id}>
                          {index > 0 && " · "}
                          <Link className="underline underline-offset-2" href={`/admin/listas-materiais/${edition.id}`}>
                            {edition.year}
                          </Link>
                        </span>
                      ))}
                    </p>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
