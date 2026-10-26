// Plugin não declara papel (manifest não tem `roles`) — os três perfis do fluxo são papéis
// personalizados criados em /admin/rbac com estas permissions (ver README):
// - Coordenação: read + edit
// - Direção: read + approve
// - Marketing: read + edit + design + publish
export const LISTAS_PERMISSIONS = {
  read: "listas-materiais.read",
  edit: "listas-materiais.edit",
  design: "listas-materiais.design",
  approve: "listas-materiais.approve",
  publish: "listas-materiais.publish",
} as const;

// Categoria reservada de mídia de todos os arquivos do plugin (capas de livro e páginas fixas).
// Restrita a listas-materiais.read no manifesto: arquivo nasce legível pelos três perfis.
export const LISTAS_FILES_CATEGORY = { key: "listas-materiais.arquivos", name: "Listas de materiais" } as const;
