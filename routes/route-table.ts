import { asPluginPage, type PluginRouteTable } from "@venore/plugin-sdk";
import AdminPage from "./admin/page";
import EditionEditorPage from "./admin-edition/page";
import { getEditionPdf } from "./api/edition-pdf";

export const listasMateriaisRouteTable: PluginRouteTable = {
  admin: [
    { pattern: "", Component: asPluginPage(AdminPage) },
    { pattern: ":editionId", Component: asPluginPage(EditionEditorPage) },
  ],
  api: [{ pattern: "edicoes/:editionId/pdf", handlers: { GET: getEditionPdf } }],
};
