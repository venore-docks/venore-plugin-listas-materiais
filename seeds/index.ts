import type { PluginSeedFn } from "@venore/plugin-sdk";

// Ponto de extensão "seeds" do plugin engine — a chave bate com manifest.seeds. Import preguiçoso:
// o dado do seed carrega ~7 MB de arquivos (capas de livro e páginas fixas em base64) que não devem
// entrar no grafo de quem só registra o plugin.
export const listasMateriaisSeeds: Record<string, PluginSeedFn> = {
  "listas-2026": async () => (await import("./listas-2026")).seedListas2026(),
};
