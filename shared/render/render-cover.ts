import { MONTSERRAT_FONT_FACES } from "./fonts.generated";

// Capa/quarta capa com ano dinâmico: a arte (enviada uma vez pelo marketing) preenche a página A4
// inteira e o ano da edição é escrito por cima, como texto — substitui o PDF pronto que trazia o ano
// já impresso na imagem (ver AssemblyItem["cover"] em contracts/types.ts).
//
// Posição/tamanho do ano são as duas variáveis CSS abaixo: ajustar aqui não exige mexer no resto do
// render. Valores de partida (canto inferior direito) — conferir contra a arte real e ajustar.
const COVER_STYLE = `${MONTSERRAT_FONT_FACES}
* { box-sizing: border-box; }
html, body {
    margin: 0; padding: 0; width: 210mm; height: 297mm;
    background-color: #ffffff; -webkit-print-color-adjust: exact;
}
.capa {
    position: relative; width: 210mm; height: 297mm; overflow: hidden;
}
.capa-fundo {
    position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover;
}
.capa-ano {
    --ano-bottom: 18mm;
    --ano-right: 18mm;
    --ano-fonte: 48pt;
    --ano-cor: #ffffff;
    position: absolute; bottom: var(--ano-bottom); right: var(--ano-right);
    font-family: "Montserrat", "Helvetica", sans-serif;
    font-weight: 700; font-size: var(--ano-fonte); color: var(--ano-cor);
    line-height: 1;
}`;

export function renderCoverDocument(input: { year: number; backgroundImage: string | null }): string {
  const background = input.backgroundImage ? `<img src="${input.backgroundImage}" class="capa-fundo">` : "";
  return `
            <!DOCTYPE html>
            <html lang="pt-br">
            <head>
                <meta charset="UTF-8">
                <style>${COVER_STYLE}</style>
            </head>
            <body>
                <div class="capa">
                    ${background}
                    <span class="capa-ano">${input.year}</span>
                </div>
            </body>
            </html>
            `;
}
