import { headers } from "next/headers";
import { getMediaAssetForTrustedReview } from "@venore/plugin-sdk/media";
import type { MediaLoader } from "./pdf/build-edition-pdf";
import { LISTAS_PERMISSIONS } from "./permissions";

async function resolveRequestOrigin(): Promise<string> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host") ?? "localhost:3000";
  const protocol = requestHeaders.get("x-forwarded-proto") ?? (host.startsWith("localhost") ? "http" : "https");
  return `${protocol}://${host}`;
}

// Lê os bytes das capas de livro e páginas fixas pra montar o PDF. Só chamar depois do handler já
// ter autorizado listas-materiais.read. getMediaAssetForTrustedReview devolve URL assinada curta
// (o arquivo é "restricted"), e o filtro por accessPermission garante que o id vindo do documento
// (editável) só alcança arquivo desta categoria — nunca um arquivo privado qualquer da plataforma.
export async function createListasMediaLoader(): Promise<MediaLoader> {
  const origin = await resolveRequestOrigin();
  return async (mediaId) => {
    const asset = await getMediaAssetForTrustedReview({ id: mediaId });
    if (!asset.success || !asset.data || asset.data.deletedAt) return null;
    if (asset.data.accessPermission !== LISTAS_PERMISSIONS.read) return null;

    const response = await fetch(new URL(asset.data.url, origin), { cache: "no-store" });
    if (!response.ok) return null;
    return { bytes: new Uint8Array(await response.arrayBuffer()), contentType: asset.data.contentType };
  };
}
