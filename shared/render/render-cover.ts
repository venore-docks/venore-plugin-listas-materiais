import { COVER_WAVE_PATH, ERASTO_LOGO_SRC } from "./cover-art.generated";
import { COVER_FONT_FACES } from "./fonts-cover.generated";
import { escapeHtml } from "./rich-text";

// A capa de 2026 (PDF do marketing) refeita em HTML pra imprimir no mesmo Chromium das seções. As
// posições são as do PDF original, medidas em pt na página A4 (595.276 × 841.89): título "MA/TERIAIS"
// em Bebas Neue, ano numa caixa laranja, subtítulo em Montserrat Medium, faixa de baixo com o logo do
// colégio e, opcional, um logo extra à esquerda dele. `text-box: trim-both cap alphabetic` faz a
// caixa de cada texto ir da altura das maiúsculas até a linha de base — é o que deixa "MA" alinhado
// com a caixa do ano como no original.
export type CoverInput = {
  year: number;
  subtitle: string;
  topColor: string;
  bandColor: string;
  // data: URI já carregado (o render não tem rede).
  logo: string | null;
};

const HEX_COLOR = /^#[0-9a-fA-F]{6}$/;
const DEFAULT_TOP_COLOR = "#006b82";
const DEFAULT_BAND_COLOR = "#02748d";

const COVER_STYLE = `${COVER_FONT_FACES}
@page { size: A4; margin: 0; }
* { box-sizing: border-box; }
html, body { margin: 0; padding: 0; -webkit-print-color-adjust: exact; }
.capa { position: relative; width: 595.276pt; height: 841.89pt; overflow: hidden; color: #ffffff; }
.capa-fundo, .capa-faixa, .capa-onda { position: absolute; left: 0; right: 0; }
.capa-fundo { top: 0; bottom: 0; }
.capa-faixa { bottom: 0; height: 183.552pt; }
.capa-onda { top: 0; width: 595.276pt; height: 841.89pt; }
.capa-titulo, .capa-ano, .capa-subtitulo { margin: 0; line-height: 1; white-space: nowrap; text-box: trim-both cap alphabetic; }
.capa-titulo { position: absolute; font-family: "Bebas Neue", sans-serif; font-weight: 400; font-size: 150.913pt; }
.capa-titulo-1 { left: 153.016pt; top: 187.5pt; }
.capa-titulo-2 { left: 157.574pt; top: 303.9pt; }
.capa-caixa-ano {
    position: absolute; left: 305.575pt; top: 187.844pt; width: 188.581pt; height: 105.507pt;
    border: 6pt solid #f7a600; display: flex; align-items: center; justify-content: center;
}
.capa-ano { font-family: "Montserrat", sans-serif; font-weight: 500; font-size: 59.4305pt; color: #f7a600; }
.capa-subtitulo {
    position: absolute; left: 60.42pt; right: 0; top: 457.62pt; text-align: center;
    font-family: "Montserrat", sans-serif; font-weight: 500; font-size: 28.7585pt;
}
.capa-logos {
    position: absolute; left: 60.42pt; right: 0; bottom: 0; height: 183.552pt;
    display: flex; align-items: center; justify-content: center; gap: 26pt;
}
.capa-logo-colegio { width: 168pt; height: 71pt; }
.capa-logo-extra { display: block; max-width: 135pt; max-height: 93pt; }`;

const color = (value: string, fallback: string) => (HEX_COLOR.test(value) ? value : fallback);

export function renderCoverDocument(input: CoverInput): string {
  const topColor = color(input.topColor, DEFAULT_TOP_COLOR);
  const bandColor = color(input.bandColor, DEFAULT_BAND_COLOR);
  const extraLogo = input.logo ? `<img class="capa-logo-extra" src="${escapeHtml(input.logo)}" alt="">` : "";
  return `
            <!DOCTYPE html>
            <html lang="pt-br">
            <head>
                <meta charset="UTF-8">
                <style>${COVER_STYLE}</style>
            </head>
            <body>
                <div class="capa">
                    <div class="capa-fundo" style="background-color: ${topColor}"></div>
                    <div class="capa-faixa" style="background-color: ${bandColor}"></div>
                    <svg class="capa-onda" viewBox="0 0 595.276 841.89" xmlns="http://www.w3.org/2000/svg">${COVER_WAVE_PATH}</svg>
                    <p class="capa-titulo capa-titulo-1">MA</p>
                    <div class="capa-caixa-ano"><p class="capa-ano">${Math.trunc(input.year)}</p></div>
                    <p class="capa-titulo capa-titulo-2">TERIAIS</p>
                    <p class="capa-subtitulo">${escapeHtml(input.subtitle)}</p>
                    <div class="capa-logos">
                        ${extraLogo}
                        <img class="capa-logo-colegio" src="${ERASTO_LOGO_SRC}" alt="">
                    </div>
                </div>
            </body>
            </html>
            `;
}
