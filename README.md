# @venore/plugin-listas-materiais

Listas de materiais escolares do Colégio Erasto Gaertner no Venore Docks. Substitui as planilhas do
Drive ("Listas de Materiais") e o notebook do Colab que gerava os PDFs.

- Uma lista por **segmento** (Educação Infantil, Fundamental I, Fundamental II, Médio, Médio Hunters…)
  e **ano letivo**. Ninguém começa do zero: "Iniciar 2027" copia a lista de 2026 inteira.
- O PDF final é o **mesmo modelo de 2026**: mesmo CSS, mesma fonte, mesmas faixas laterais, com as
  capas e páginas fixas (capa, folha de rosto, horário, parceiros, quarta capa) como PDFs prontos.

## Fluxo

| Status | Quem age | O que acontece |
|---|---|---|
| Rascunho | Coordenação (e Marketing) | edita itens, turmas, livros, capas de livro; envia para aprovação |
| Aguardando aprovação | Direção | baixa a prévia e **aprova** ou **devolve** com comentário |
| Aprovada | Marketing | **publica**: o PDF é gerado da versão aprovada e guardado |
| Publicada | todos | os três perfis baixam o PDF publicado |

Qualquer edição depois do envio volta a lista para **rascunho** e exige nova aprovação. O PDF já
publicado continua disponível até a próxima publicação. Cada aprovação congela uma revisão
numerada; o histórico registra quem salvou, enviou, aprovou, devolveu e publicou.

## Perfis (papéis em `/admin/rbac`)

Plugin não cria papel — crie três papéis personalizados e marque as permissions:

| Papel | Permissions |
|---|---|
| Coordenação | `listas-materiais.read`, `listas-materiais.edit` |
| Direção | `listas-materiais.read`, `listas-materiais.approve` |
| Marketing | `listas-materiais.read`, `listas-materiais.edit`, `listas-materiais.design`, `listas-materiais.publish` |

`design` = capas/páginas fixas e ordem do PDF (aba "Capas e ordem"). Capas de livro são `edit`.
Arquivos enviados ficam na categoria de mídia restrita `listas-materiais.arquivos` (legível só por
quem tem `listas-materiais.read`).

## Instalação numa instância

1. Core: dependência `@venore/plugin-listas-materiais` no `package.json` e `listas-materiais` em
   `instances/<instância>.json`; deploy.
2. `/admin/plugins` → **Instalar**, marcando **Popular com dados de exemplo** (seed "Listas de
   2026": os cinco segmentos, livros com capa e páginas fixas, importados do Drive).
3. Criar os papéis acima e atribuir às pessoas.

## Geração do PDF

`shared/pdf/` — Chromium headless (`puppeteer-core`), um PDF por seção gerada, faixa lateral
desenhada com `pdf-lib` e montagem com as páginas fixas na ordem da aba "Capas e ordem".

- **Vercel / Linux**: `@sparticuz/chromium-min` baixa o pack do Chromium na primeira execução de
  cada instância fria (~60 MB, do GitHub Releases) para `/tmp`. Para usar outra origem (ex: bucket
  próprio), defina `LISTAS_MATERIAIS_CHROMIUM_PACK_URL`. Recomendado: função com ≥ 1 GB de memória.
- **Dev local (Windows/macOS)**: usa o Chrome ou Edge instalado; `LISTAS_MATERIAIS_CHROME_PATH`
  força um binário.
- O HTML vai pro navegador sem acesso à rede (fonte e imagens embutidas; texto escapado — só `<b>`,
  `<i>`, `<u>` e quebras de linha são aceitos dos campos).

## Desenvolvimento

Ver `CLAUDE.md`. Testes:

- unitários: `npm run test:plugins` no core;
- integração (Postgres em memória/PGlite): `.\scripts\run-integration.ps1 [-Core ..\venore-docks]`;
- layout do PDF contra os de 2026: `npm install` aqui e
  `npx tsx scripts/render-seed-pdfs.mts <pasta> [slug] [--legacy]` (apague o `node_modules` depois:
  o `test:plugins` do core varre esta pasta).
