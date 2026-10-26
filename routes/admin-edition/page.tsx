import { getPluginAdminPageData } from "@venore/plugin-sdk/admin";
import { getMediaAsset, getMediaAssetUrls } from "@venore/plugin-sdk/media";
import { AdminAccessDenied } from "@venore/plugin-sdk/ui";
import { getEdition } from "../../index";
import { LISTAS_PERMISSIONS } from "../../shared/permissions";
import { EditionEditor, type EditorPermissions, type MediaRef } from "./edition-editor";

export default async function EditionEditorPage({ params }: { params: Promise<{ editionId: string }> }) {
  const gate = await getPluginAdminPageData("listas-materiais");
  if (!gate.granted) {
    return <AdminAccessDenied message="Você não tem permissão para ver as listas de materiais." />;
  }

  const { editionId } = await params;
  const result = await getEdition({ editionId });
  if (!result.success) {
    return <p className="text-sm text-destructive">{result.error.message}</p>;
  }
  const view = result.data;

  const can = (permission: string) => gate.actor.isSuperadmin || gate.actor.permissions.includes(permission);
  const permissions: EditorPermissions = {
    edit: can(LISTAS_PERMISSIONS.edit),
    design: can(LISTAS_PERMISSIONS.design),
    approve: can(LISTAS_PERMISSIONS.approve),
    publish: can(LISTAS_PERMISSIONS.publish),
    delete: can(LISTAS_PERMISSIONS.delete),
  };

  // Miniaturas das capas de livro e nome dos PDFs das páginas fixas (o documento guarda só o id).
  const imageIds = view.edition.content.books.map((book) => book.imageMediaId).filter((id): id is string => Boolean(id));
  const staticIds = view.edition.content.assembly.flatMap((item) => (item.kind === "static" && item.mediaId ? [item.mediaId] : []));
  const [imageUrls, staticAssets] = await Promise.all([
    imageIds.length > 0 ? getMediaAssetUrls({ ids: imageIds, displayWidth: 160 }) : null,
    Promise.all(staticIds.map((id) => getMediaAsset({ id }))),
  ]);

  const media: Record<string, MediaRef> = {};
  if (imageUrls?.success) {
    for (const [id, url] of Object.entries(imageUrls.data)) media[id] = { url, filename: "" };
  }
  for (const asset of staticAssets) {
    if (asset.success && asset.data) media[asset.data.id] = { url: asset.data.url, filename: asset.data.filename };
  }

  return <EditionEditor view={view} permissions={permissions} initialMedia={media} />;
}
