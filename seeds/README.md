# Seed "Listas de 2026"

Gerado uma vez a partir do Drive "Listas de Materiais" (zip extraído localmente), 26/10/2026:

- `data/edicoes-2026.ts` — as três abas de cada planilha (Informações Importantes, Séries, Livros) e
  o `config.json` de cada segmento (ordem das turmas e das páginas). Números inteiros sem o `.0` do
  xlsx (o gspread do notebook já fazia isso).
- `assets/a<hash>.ts` — capas de livro e páginas fixas em base64, um arquivo por conteúdo (o mesmo
  `Parceiros.pdf` dos cinco segmentos vira um só). Carregados sob demanda.

Diferenças conscientes em relação aos PDFs de 2026:

- **Ensino Médio**: a turma "Ensino Religioso" volta a sair — o `config.json` filtrava
  "Ensino Religoso" (com erro de digitação) e o item ficava fora do PDF.
- **Hunters**: título de turma "Para todas as Matéroas" → "Para todas as Matérias".

O seed sobe os arquivos pela sessão de quem clicou em "Popular dados" e é idempotente por segmento.
Depois que a coordenação começar a editar no sistema, este seed é só o ponto de partida — não há
reimportação do Drive.
