// style.css do gerador antigo (Drive "Listas de Materiais/style.css", 27/11/2025), copiado sem
// alteração de regra — é ele que garante o PDF idêntico ao de 2026. Única troca: o @import do Google
// Fonts virou @font-face embutido (fonts.generated.ts), pra o render não depender de rede.
import { MONTSERRAT_FONT_FACES } from "./fonts.generated";

const LEGACY_STYLE = `/* ==========================================================================
    STYLE.CSS - VERSÃO FLUXO CONTÍNUO (SEM QUEBRAS NA LISTA)
========================================================================== */

/* --- Importação da Fonte --- */
/* (fonte Montserrat embutida em fonts.generated.ts — era @import do Google Fonts) */

/* --- Variáveis de Cor --- */
:root {
    --cor-principal: #0396a6;   /* Verde Turquesa (Listas) */
    --cor-secundaria: #f7a600;  /* Laranja (Info) */
    --cor-terciaria: #004a99;   /* Azul Escuro (Livros) */
    
    --cor-texto: #4d4d4d;
    --cor-texto-forte: #1a1a1a;
    --cor-texto-obs: #333333;
    
    --cor-fundo-claro: #E8E8E8;
    --cor-fundo-obs-list: #e6f4f5;
    --cor-fundo-obs-info: #fffaf0;
    --cor-fundo-obs-book: #e6f0fa;
    
    /* Margens */
    --margem-lateral: 15mm;
    --margem-topo-padrao: 20mm;
    --margem-topo-info: 15mm;
}

/* ==========================================================================
    Regras de Layout @page
========================================================================== */
@page {
    size: A4;
    margin: var(--margem-topo-padrao) var(--margem-lateral) var(--margem-topo-padrao) var(--margem-lateral);
}
body.tipo-info @page { margin-top: var(--margem-topo-info); }

/* Remove margem do topo na primeira página de Listas e Livros */
body.tipo-list @page :first, 
body.tipo-book @page :first { 
    margin-top: 0; 
}

/* ==========================================================================
    Configuração Global
========================================================================== */
* { box-sizing: border-box; }
body {
    margin: 0; padding: 0; background-color: #ffffff !important;
    font-family: "Montserrat", "Helvetica", sans-serif;
    font-weight: 300; font-size: 10pt; line-height: 1.5;
    color: var(--cor-texto); -webkit-print-color-adjust: exact;
}

.pagina-conteudo { padding: 0; width: 100%; }

/* Evita quebras indesejadas */
h1, h2, h3, h4, .info-bloco, .lista-item, .book-card, .observacao-card, .turma-block {
    page-break-inside: avoid;
}
.titulo-pagina, .subtitulo-secao, .info-titulo, .book-turma, .titulo-turma-lista {
    page-break-after: avoid;
}

/* ==========================================================================
    ESTILOS DE TÍTULOS
========================================================================== */

/* 1. Título Padrão de Página (H1) */
.titulo-pagina { 
    font-weight: 600; font-size: 16pt;
    padding-bottom: 8px; margin: 0 0 25px 0; text-align: center;
}
body.tipo-info .titulo-pagina {
    color: var(--cor-principal); border-bottom: 2px solid var(--cor-principal);
}
body.tipo-book .titulo-pagina {
    color: #ffffff; border-bottom: none; padding: 10px var(--margem-lateral);
    margin-top: 0; 
    margin-left: calc(-1 * var(--margem-lateral));
    margin-right: calc(-1 * var(--margem-lateral));
    margin-bottom: 25px;
    background-color: var(--cor-terciaria);
}

/* 2. Título de Turma na LISTA (A MUDANÇA ESTÁ AQUI) */
.titulo-turma-lista {
    font-weight: 600; font-size: 16pt;
    padding: 10px var(--margem-lateral);
    
    /* Margens negativas para sangrar nas laterais */
    margin-left: calc(-1 * var(--margem-lateral));
    margin-right: calc(-1 * var(--margem-lateral));
    
    /* Espaçamento: afasta da turma anterior, gruda na atual */
    margin-top: 40px; 
    margin-bottom: 20px;
    
    color: #ffffff;
    background-color: var(--cor-principal); /* Verde Turquesa */
    text-align: center; /* Centralizado como pediu */
    
    /* FLUXO CONTÍNUO: NÃO força nova página */
    page-break-before: auto; 
    page-break-after: avoid;
}

/* O primeiro título da lista não precisa de margem topo extra */
.conteudo-lista > .titulo-turma-lista:first-child {
    margin-top: 0;
}

/* 3. Subtítulos */
.subtitulo-secao {
    font-weight: 600; font-size: 12pt; color: var(--cor-texto-forte);
    margin: 25px 0 10px 0; border-bottom: 1px solid #eee; padding-bottom: 5px;
    text-align: left;
}
body.tipo-book .subtitulo-secao {
    color: var(--cor-terciaria); border-bottom: 2px solid var(--cor-terciaria);
    margin-bottom: 15px;
}

/* ==========================================================================
    SEÇÃO: INFORMAÇÕES
========================================================================== */
.info-bloco { margin-bottom: 40px; margin-top: 25px; }
.info-titulo { font-weight: 600; font-size: 12pt; color: var(--cor-texto-forte); margin-bottom: 5px; }
.info-conteudo { margin-top: 0; text-align: justify; font-weight: 400; line-height: 1.6; }

/* ==========================================================================
    SEÇÃO: LISTA DE MATERIAIS
========================================================================== */
.lista-item { display: flex; flex-wrap: wrap; border-bottom: 1px solid #eee; align-items: flex-start; padding: 6px 4px; font-size: 9.5pt; }
.lista-item:last-child { border-bottom: none; }
.lista-item:nth-child(even) { background-color: var(--cor-fundo-claro); }

.lista-quantidade { flex: 0 0 10%; font-weight: 600; text-align: center; padding-top: 1px; }
.lista-descricao { flex: 1; padding-left: 10px; font-weight: 600; margin: 0; }

/* ==========================================================================
    SEÇÃO: LIVROS
========================================================================== */
.book-grid-container { 
    display: grid; grid-template-columns: repeat(2, 1fr); 
    gap: 15px; margin-top: 8px; align-items: start;
}
.book-card { 
    display: flex; align-items: flex-start; text-align: left; 
    border: 1px solid #eee; padding: 10px; border-radius: 5px;
    background-color: #fff;
}
.book-imagem { 
    flex: 0 0 auto; margin-right: 12px; 
    border: none; background: transparent; 
    display: flex; align-items: flex-start;
}
.book-cover { 
    max-width: 95px; max-height: 125px; 
    width: auto; height: auto; display: block; 
}
.book-info { flex: 1; text-align: left; display: flex; flex-direction: column; gap: 2px; min-width: 0; }
.book-titulo { font-weight: 600; font-size: 10pt; color: var(--cor-terciaria); margin: 0 0 1px 0; }
.book-meta { font-size: 8.5pt; color: #444; margin: 0; }
.book-label { font-weight: 600; color: #222; }

.book-meta-badges { display: flex; flex-wrap: wrap; gap: 4px; margin-bottom: 4px; }
.badge-pill { padding: 3px 10px; font-size: 8pt; font-weight: 600; color: #ffffff; border-radius: 50px; text-transform: uppercase; }
.badge-semestre { background-color: var(--cor-secundaria); }
.badge-bimestre { background-color: var(--cor-principal); }

.turma-block { 
    page-break-inside: avoid; break-inside: avoid; 
    margin-bottom: 20px; display: block; 
}
.titulo-turma-subsecao { 
    font-size: 11pt; font-weight: 700; color: #666; 
    border-bottom: 1px dotted #ccc; margin: 10px 0; padding-bottom: 2px; 
}

/* ==========================================================================
    OBSERVAÇÕES
========================================================================== */
.observacao-card { 
    width: 100%; padding: 8px 12px; margin-top: 8px; border-radius: 4px; 
    font-weight: 600; font-size: 9pt; color: var(--cor-texto-obs); text-align: left; 
}
body.tipo-list .observacao-card { background-color: var(--cor-fundo-obs-list); border: 1px solid var(--cor-principal); border-left: 5px solid var(--cor-principal); }
body.tipo-info .observacao-card { background-color: var(--cor-fundo-obs-info); border: 1px solid var(--cor-secundaria); border-left: 5px solid var(--cor-secundaria); }
body.tipo-book .observacao-card { background-color: var(--cor-fundo-obs-book); border: 1px solid var(--cor-terciaria); border-left: 5px solid var(--cor-terciaria); }

.observacao-item {
    width: 100%; margin-top: 2px; padding-left: 10px;
    font-size: 9pt; color: #666666; font-style: italic;
    background: transparent; border: none;
}
.observacao-item p { margin: 0; }

.observacao-geral-blue {
    grid-column: 1 / -1; 
    background-color: var(--cor-fundo-obs-book); border-left: 5px solid var(--cor-terciaria);
    color: var(--cor-terciaria); padding: 10px 15px; margin-bottom: 15px;
    font-weight: 600; font-size: 10pt; border-radius: 4px;
    page-break-inside: avoid;
}`;

export const LISTAS_STYLE = `${MONTSERRAT_FONT_FACES}
${LEGACY_STYLE}`;
