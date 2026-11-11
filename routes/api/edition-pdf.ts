import { asPluginApiHandler, isPluginActive } from "@venore/plugin-sdk";
import { exportEditionPdf } from "../../index";
import type { PdfSource } from "../../index";

// GET /api/listas-materiais/edicoes/:editionId/pdf?versao=previa|aprovada|publicada
const SOURCE_BY_QUERY: Record<string, PdfSource> = { previa: "draft", aprovada: "approved", publicada: "published" };

function contentDisposition(fileName: string): string {
  const ascii = fileName.normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^\x20-\x7e]/g, "_").replace(/"/g, "");
  return `attachment; filename="${ascii}"; filename*=UTF-8''${encodeURIComponent(fileName)}`;
}

export const getEditionPdf = asPluginApiHandler<{ editionId: string }>(async (request, { params }) => {
  if (!(await isPluginActive("listas-materiais"))) {
    return Response.json({ error: "O plugin Listas de materiais está desabilitado." }, { status: 404 });
  }
  const { editionId } = await params;
  const source = SOURCE_BY_QUERY[new URL(request.url).searchParams.get("versao") ?? "previa"];
  if (!source) return Response.json({ error: "Versão inválida." }, { status: 400 });

  const result = await exportEditionPdf({ editionId, source, ifNoneMatch: request.headers.get("if-none-match") });
  if (!result.success) {
    const code = result.error.code;
    const status = code === "rbac.authorization.unauthenticated" ? 401 : code.startsWith("rbac.") ? 403 : 404;
    return Response.json({ error: result.error.message }, { status });
  }

  // "private, no-cache" = o navegador guarda mas revalida sempre; o ETag faz a revalidação virar 304
  // (sem gerar PDF) enquanto a versão não mudou. A autorização roda a cada requisição, antes do 304.
  const cacheHeaders = { ETag: result.data.etag, "Cache-Control": "private, no-cache" };
  if (result.data.notModified) return new Response(null, { status: 304, headers: cacheHeaders });

  const headers = new Headers({
    "Content-Type": "application/pdf",
    "Content-Disposition": contentDisposition(result.data.fileName),
    ...cacheHeaders,
  });
  // Página fixa sem arquivo fica fora do PDF — o cabeçalho deixa isso visível pra quem baixou via script.
  if (result.data.skipped.length > 0) headers.set("X-Listas-Paginas-Puladas", encodeURIComponent(result.data.skipped.join(", ")));
  return new Response(Buffer.from(result.data.bytes), { status: 200, headers });
});
