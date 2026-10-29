import type { PluginManifest } from "@venore/plugin-sdk";

// Faixa escrita à mão, não importada do CORE_VERSION corrente — mesmo motivo do vagasManifest.
// Funciona em qualquer core 2.x; num core sem o upload com sessão já aplicando
// restrictedUploadCategories (platform/media-lifecycle/upload-reserved-category-asset-gated.ts), a
// capa de livro enviada por uma pessoa só aparece no PDF gerado por outra depois do próximo deploy.
export const listasMateriaisManifest: PluginManifest = {
  manifestVersion: "1.0.0",
  key: "listas-materiais",
  name: "Listas de materiais",
  version: "0.3.0",
  description:
    "Listas de materiais escolares por segmento e ano: a coordenação edita, a direção aprova e o marketing publica o PDF final com as capas.",
  compatibility: { coreVersion: ">=2.0.0 <3.0.0" },
  migrationsPath: "./migrations",
  permissions: [
    { key: "listas-materiais.read", label: "Ver listas de materiais e baixar os PDFs" },
    { key: "listas-materiais.edit", label: "Editar itens, turmas, livros e capas de livro" },
    { key: "listas-materiais.design", label: "Editar capas, páginas fixas e a ordem do PDF" },
    { key: "listas-materiais.approve", label: "Aprovar ou devolver listas enviadas" },
    { key: "listas-materiais.publish", label: "Publicar o PDF final aprovado" },
    { key: "listas-materiais.delete", label: "Apagar listas (um ano) e segmentos inteiros" },
  ],
  // Capas de livro, páginas fixas e PDFs publicados: legíveis pelos três perfis (read), inclusive
  // quando quem gera o PDF não é quem enviou o arquivo. Fora disso, nem media.manage abre.
  restrictedUploadCategories: [{ key: "listas-materiais.arquivos", accessPermission: "listas-materiais.read" }],
  navigation: [
    {
      key: "listas-materiais.admin",
      label: "Listas de materiais",
      href: "/admin/listas-materiais",
      icon: "clipboard-list",
      groupKey: "plugins",
      groupLabel: "Plugins",
      groupOrder: 30,
      order: 40,
      requiredPermission: "listas-materiais.read",
    },
  ],
  seeds: [
    {
      key: "listas-2026",
      label: "Listas de 2026",
      description: "Os cinco segmentos com as listas, livros, capas e páginas fixas de 2026 (importados do Drive).",
    },
  ],
};
