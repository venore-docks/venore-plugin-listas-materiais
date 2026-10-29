# @venore/plugin-listas-materiais — instruções para o Claude

Plugin do [Venore Docks](https://github.com/venore-docks/venore-docks), instalado no core como dependência git
(`@venore/plugin-listas-materiais`). Este repo não roda sozinho: build, lint, typecheck e testes rodam **a partir do core**.
Visão geral, perfis e fluxo: `README.md`.

## Regras de arquitetura

As regras são as do core — não copie para cá, leia lá quando a tarefa tocar a área:
- `AGENTS.md` do core (§1 camadas `handler → service → store`, `OperationResult<T>`; §2 padrões proibidos).
- `.claude/rules/plugin-routes.md` do core: toda rota mora em `routes/route-table.ts`, nunca em `app/`.
- `.claude/rules/css-tokens.md` do core: só tokens shadcn no admin. **Exceção**: `shared/render/style.ts` é o CSS do
  PDF (cópia fiel do gerador antigo) e tem cor/mm/fonte crus de propósito — mexer nele muda o PDF oficial.
- Schema: migration gerada com `drizzle-kit generate` (`drizzle.config.ts`), nunca editar `_journal.json` à mão.

## Pontos que já morderam

- `content` é jsonb: o Postgres **reordena as chaves**. Comparar documento salvo × editado sempre com
  `canonicalJson` (`shared/content-schema.ts`), nunca `JSON.stringify` puro.
- Render (`shared/render/render-sections.ts`) é porta 1:1 do notebook antigo; a ordem dos elementos importa
  (zebra por `nth-child`). Depois de mexer, rode `scripts/render-seed-pdfs.mts` e compare com os PDFs de 2026.
- Capa (`shared/render/render-cover.ts`): réplica da arte de 2026 com coordenadas em pt medidas no PDF do
  marketing. `cover-art.generated.ts` (logo do colégio + faixa ondulada) e `fonts-cover.generated.ts` são
  extraídos/gerados — ao reextrair o SVG do logo, tirar só os `<path fill=…>` do fundo da página: o mesmo
  retângulo aparece nos `<clipPath>`, e sem ele o Chromium recorta o logo inteiro (o PyMuPDF não).
- O id de mídia no documento é editável pelo cliente: `shared/media.ts` só lê arquivo com
  `accessPermission === listas-materiais.read` (categoria do plugin).

## Verificar contra o core

```bash
cd ../venore-docks
npm pkg set "dependencies.@venore/plugin-listas-materiais=file:../venore-plugin-listas-materiais"   # não commitar
npm install --no-audit --no-fund --loglevel=error
npm run gen:registries:strict && npm run typecheck
npm run test:plugins -- --reporter=dot
git checkout package.json package-lock.json
```

Integração com PGlite: `.\scripts\run-integration.ps1`.

## Versão

`package.json` `version` = tag `vX.Y.Z` (workflow `tag-release.yml`). Manter `manifest.ts#version` igual.
O core passa a usar a versão nova com a skill `bump-plugin` do core.
