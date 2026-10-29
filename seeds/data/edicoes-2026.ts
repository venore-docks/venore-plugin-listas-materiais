// GERADO a partir do Drive "Listas de Materiais" (planilhas + config.json de cada segmento, 2026) —
// ver seeds/README.md. Conteúdo como estava nas planilhas; imagens e páginas fixas referenciam
// seeds/assets pelo hash. Duas correções conscientes sobre o PDF de 2026: a turma "Ensino Religioso"
// do Ensino Médio volta a sair (o config tinha o filtro "Ensino Religoso") e "Para todas as Matéroas"
// (Hunters) virou "Para todas as Matérias".
import type { SeedSegment } from "./types";

export const EDICOES_2026: SeedSegment[] = [
  {
    "slug": "educacao-infantil",
    "name": "Educação Infantil",
    "sortOrder": 10,
    "year": 2026,
    "fileNameTemplate": "Lista de Materiais {ano} - {segmento}.pdf",
    "content": {
      "info": [
        {
          "title": "Material da Educação Infantil",
          "body": "O Colégio Erasto Gaertner trabalha na Educação Infantil com uma metodologia interacionista baseada em Projetos. Isto quer dizer que, a partir das vivências e interesses das crianças são organizados  trabalhos que visam instigar a curiosidade e trazer experiências e vivências para os alunos. \nPor causa disso diversos materiais e insumos diferentes precisam ser adquiridos pela Escola, de acordo com a especificidade de cada projeto realizado pelas professoras. Os materiais podem ser desde artigos de papelaria até objetos do cotidianos, ou de consumo imediato, como alimentos. Este custo faz parte da mensalidade e não será cobrado à parte.",
          "note": ""
        },
        {
          "title": "Entrega de Materiais",
          "body": "Os materiais devem ser entregues no dia da Reunião de Pais, em uma sacola grande ou saco plástico, identificado com o nome da criança, contendo os itens desta lista. Os materiais também devem estar identificados com o nome da criança, inclusive os lápis de cor e canetinhas, individualmente. Pedimos que prezem pela simplicidade dos materiais. Além disso, pedimos que respeitem as medidas e orientações indicadas na lista. Havendo necessidade, ao longo do ano, poderemos solicitar materiais para reposição.",
          "note": "Os materiais deverão ser entregues na 1º Reunião de pais. \nVerifique as datas e horários das reuniões no link https://erasto.com.br/alunos-novos"
        },
        {
          "title": "Biblioteca de Sala",
          "body": "Cada sala de aula possui uma pequena biblioteca, na qual os alunos podem ter acesso a diferentes tipos de leitura adequados a sua faixa etária. Para compor esta biblioteca pedimos que enviem os *livros sugeridos nas listas (Nível II, III, IV e V). Estes serão devolvidos no final do ano letivo, para isso devem estar identificados. Sugerimos autores adequados à faixa etária, como Ruth Rocha, Ana Maria Machado, Audrey Wood, Monteiro Lobato, e outros.",
          "note": ""
        },
        {
          "title": "Brinquedos de uso coletivo",
          "body": "Cada sala de aula possui um pequeno acervo de jogos e brinquedos, para que os alunos possam fazer uso diário e coletivo em sala de aula. Para compor este acervo pedimos que enviem os *itens da lista, evitando o envio de pelúcias, por conta das orientações da Vigilância Sanitária. Os brinquedos devem estar de acordo com as normas de segurança e adequados à faixa etária dos alunos, e podem ser carrinhos, bonecas de borracha, kits infantis de cozinha ou de médico, frutas de plástico, brinquedos de madeira, etc...",
          "note": ""
        },
        {
          "title": "Jogos de Madeira",
          "body": "O método interacionista prevê que a criança interaja com outras pessoas e com o ambiente para desenvolver sua aprendizagem. Por isso é importante que o aluno possa desenvolver a interação com diferentes tipos de materiais. Atualmente muitos dos materiais com os quais interagimos são materiais sintéticos, feitos de plástico. Por isso sugerimos que os jogos enviados para uso coletivo em sala sejam feitos em madeira. Isso fará com que o aluno possa interagir com diferentes materiais, desenvolvendo os seus sentidos.",
          "note": "Sites com sugestões de jogos educativos e em madeira:\nwww.ninabrinquedoseducativos.com.br\nwww.geminijogoscriativos.com.br"
        },
        {
          "title": "Taxa de Eventos",
          "body": "Ao longo do ano são realizados diversos eventos na escola. Passeios pedagógicos, atividades extras,  celebrações do dia das mães, dos pais, das crianças, entre outros. Existe um valor que é destinado para custear estes eventos, que é a Taxa de Eventos. Este valor não é cobrado a parte, estando incluso na mensalidade escolar.",
          "note": "Não há cobrança de taxas de eventos."
        }
      ],
      "groups": [
        {
          "name": "Nível II",
          "rows": [
            {
              "category": "",
              "quantity": "2",
              "description": "Blocos de papel Creative colorido (tamanho A4, não reciclado)",
              "note": ""
            },
            {
              "category": "",
              "quantity": "1",
              "description": "Brinquedo (comidinha de plástico, carrinhos, ferramentas de plástico) adequado à faixa etária",
              "note": ""
            },
            {
              "category": "",
              "quantity": "1",
              "description": "Caixa de cola colorida (6 cores)",
              "note": ""
            },
            {
              "category": "",
              "quantity": "1",
              "description": "Caixa de giz de cera (06 cores) Gizão",
              "note": ""
            },
            {
              "category": "",
              "quantity": "1",
              "description": "Camiseta branca para atividade direcionada (número que a criança usa normalmente)",
              "note": ""
            },
            {
              "category": "",
              "quantity": "1",
              "description": "Camiseta para atividades de pintura (com um nº maior do que a criança usa normalmente)",
              "note": ""
            },
            {
              "category": "",
              "quantity": "1",
              "description": "Cola bastão pequena",
              "note": ""
            },
            {
              "category": "",
              "quantity": "1",
              "description": "Cola líquida (90g)",
              "note": ""
            },
            {
              "category": "",
              "quantity": "1",
              "description": "Estojo de tinta aquarela escolar com 12 cores",
              "note": ""
            },
            {
              "category": "",
              "quantity": "3",
              "description": "Fitas Crepe Marrom grossa",
              "note": ""
            },
            {
              "category": "",
              "quantity": "1",
              "description": "Fita dupla face",
              "note": ""
            },
            {
              "category": "",
              "quantity": "1",
              "description": "Kit forminhas e brinquedos para massinha",
              "note": ""
            },
            {
              "category": "",
              "quantity": "2",
              "description": "Livros de história infantil adequado à faixa etária",
              "note": ""
            },
            {
              "category": "",
              "quantity": "1",
              "description": "Metro de tecido de tricoline  cor que preferir",
              "note": ""
            },
            {
              "category": "",
              "quantity": "30",
              "description": "Envelopes Plástico 4 Furos - A4",
              "note": ""
            },
            {
              "category": "",
              "quantity": "1",
              "description": "Pacote de papel A4 branco ( 100 folhas) de 180 Gramas",
              "note": ""
            },
            {
              "category": "",
              "quantity": "3",
              "description": "Pacotes de lenços umedecidos (sugestão: Toalhas umedecidas com 100 folhas)",
              "note": ""
            },
            {
              "category": "",
              "quantity": "3",
              "description": "Papel crepom – Cores que preferir",
              "note": ""
            },
            {
              "category": "",
              "quantity": "1",
              "description": "Pincel nº. 20 - redondo",
              "note": ""
            },
            {
              "category": "",
              "quantity": "2",
              "description": "Potes de massa de modelar grande (500g) – preferencialmente Uti Guti - antialérgica",
              "note": ""
            },
            {
              "category": "",
              "quantity": "2",
              "description": "Potes de tinta guache grande, 250ml - cores que preferir",
              "note": ""
            },
            {
              "category": "",
              "quantity": "1",
              "description": "Rolo escolar espuma para pintura 4cm preferencialmente da marca Tigre",
              "note": ""
            },
            {
              "category": "",
              "quantity": "1",
              "description": "Tela de pintura 30x20",
              "note": ""
            },
            {
              "category": "Kit mochila",
              "quantity": "",
              "description": "",
              "note": "Estes itens devem ser enviados todos os dias na mochila e todos estes itens devem estar com o nome da criança."
            },
            {
              "category": "Kit mochila",
              "quantity": "2",
              "description": "Duas trocas completas de roupas reserva (todo dia na mochila)",
              "note": ""
            },
            {
              "category": "Kit mochila",
              "quantity": "3",
              "description": "Fraldas (Ou a quantidade adequada de acordo com a necessidade da criança no dia)",
              "note": ""
            },
            {
              "category": "Kit mochila",
              "quantity": "1",
              "description": "Garrafinha para água de fácil manuseio da criança",
              "note": ""
            },
            {
              "category": "Kit mochila",
              "quantity": "1",
              "description": "Lancheira contendo uma toalha pequena para o momento do lanche",
              "note": ""
            },
            {
              "category": "Kit mochila",
              "quantity": "1",
              "description": "Pacote de lenço umedecido",
              "note": ""
            },
            {
              "category": "Kit mochila",
              "quantity": "1",
              "description": "Pomada (Caso faça uso)",
              "note": ""
            },
            {
              "category": "Kit mochila",
              "quantity": "1",
              "description": "Toalha de Banho",
              "note": ""
            },
            {
              "category": "Caixa Organizadora 20L",
              "quantity": "",
              "description": "",
              "note": "A caixa organizadora com os itens deve ser enviada no 1º dia de aula e todos estes itens devem estar com o nome da criança"
            },
            {
              "category": "Caixa Organizadora 20L",
              "quantity": "",
              "description": "",
              "note": "O lençol e a fronha irão no último dia da semana para  higienização em casa e devem retornar no primeiro dia da semana."
            },
            {
              "category": "Caixa Organizadora 20L",
              "quantity": "1",
              "description": "Cobertor Infantil",
              "note": ""
            },
            {
              "category": "Caixa Organizadora 20L",
              "quantity": "1",
              "description": "Fronha (para o momento do soninho)",
              "note": ""
            },
            {
              "category": "Caixa Organizadora 20L",
              "quantity": "1",
              "description": "Lençol para cama infantil -  tamanho 135cm x 35cm (momento do soninho)",
              "note": ""
            },
            {
              "category": "Caixa Organizadora 20L",
              "quantity": "1",
              "description": "Travesseiro (para o momento do soninho)",
              "note": ""
            }
          ]
        },
        {
          "name": "Nível III",
          "rows": [
            {
              "category": "",
              "quantity": "1",
              "description": "Aquarela com 12 cores – Preferencialmente da marca Acrilex",
              "note": ""
            },
            {
              "category": "",
              "quantity": "1",
              "description": "Bloco de papel creative (tamanho A4, não reciclado)",
              "note": ""
            },
            {
              "category": "",
              "quantity": "5",
              "description": "Brinquedos (forminhas - peças de plástico para modelar massinha - adequado a faixa etária)",
              "note": ""
            },
            {
              "category": "",
              "quantity": "1",
              "description": "Caixa de cola colorida (6 cores)",
              "note": ""
            },
            {
              "category": "",
              "quantity": "1",
              "description": "Caixa de giz de cera triangular (12 cores) grosso",
              "note": ""
            },
            {
              "category": "",
              "quantity": "1",
              "description": "Caixa de lápis de cor “jumbo” – Triangular",
              "note": ""
            },
            {
              "category": "",
              "quantity": "1",
              "description": "Camiseta usada grande (ou um nº maior do que a criança usa normalmente)\npara atividades de pintura",
              "note": ""
            },
            {
              "category": "",
              "quantity": "1",
              "description": "Cola bastão 40g (sugerimos a marca Faber Castell)",
              "note": ""
            },
            {
              "category": "",
              "quantity": "1",
              "description": "Cola branca – Tubo grande 90g",
              "note": ""
            },
            {
              "category": "",
              "quantity": "2",
              "description": "Fitas crepe marrom grossa",
              "note": ""
            },
            {
              "category": "",
              "quantity": "1",
              "description": "Garrafinha para água de fácil manuseio da criança",
              "note": ""
            },
            {
              "category": "",
              "quantity": "2",
              "description": "Livros de história infantil adequado à faixa etária",
              "note": ""
            },
            {
              "category": "",
              "quantity": "1",
              "description": "Jogo de canetinhas hidrográficas ponta grossa (12 cores). Sugerimos as da marca\nFaber Castell ou Compactor Color",
              "note": ""
            },
            {
              "category": "",
              "quantity": "1",
              "description": "Jogo de madeira adequado à faixa etária",
              "note": ""
            },
            {
              "category": "",
              "quantity": "1",
              "description": "Lancheira contendo uma toalha pequena para o momento do lanche",
              "note": ""
            },
            {
              "category": "",
              "quantity": "3",
              "description": "Pacotes de lenço umedecido – 100 unidades",
              "note": ""
            },
            {
              "category": "",
              "quantity": "1",
              "description": "Mochila média",
              "note": ""
            },
            {
              "category": "",
              "quantity": "1",
              "description": "Pacote de papel A3 180g/m² - 20 folhas",
              "note": ""
            },
            {
              "category": "",
              "quantity": "1",
              "description": "Pacote de papel sulfite A4 - 100 folhas",
              "note": ""
            },
            {
              "category": "",
              "quantity": "1",
              "description": "Pacote de papel A4 branco 180g - 100 folhas",
              "note": ""
            },
            {
              "category": "",
              "quantity": "1",
              "description": "Pacote de papel creative A3.",
              "note": ""
            },
            {
              "category": "",
              "quantity": "50",
              "description": "Sacos plástico A4 - com furo",
              "note": ""
            },
            {
              "category": "",
              "quantity": "1",
              "description": "Pasta com 100 plásticos A4 (para o Inglês)",
              "note": ""
            },
            {
              "category": "",
              "quantity": "1",
              "description": "Penal (estojo)",
              "note": ""
            },
            {
              "category": "",
              "quantity": "1",
              "description": "Pincel arredondado para aquarela",
              "note": ""
            },
            {
              "category": "",
              "quantity": "2",
              "description": "Potes de massa de modelar grande (500g) – preferencialmente Uti Guti - antialérgica",
              "note": ""
            },
            {
              "category": "",
              "quantity": "1",
              "description": "Pote de tinta guache – 250ml – cores (amarelo, vermelho, verde, preto, marrom,\nlaranja)",
              "note": ""
            },
            {
              "category": "",
              "quantity": "1",
              "description": "Revista para recorte (de animais, comidas, jardinagem/paisagem)",
              "note": ""
            },
            {
              "category": "",
              "quantity": "2",
              "description": "Telas de Pintura (30x30)",
              "note": ""
            },
            {
              "category": "",
              "quantity": "1",
              "description": "Tesoura sem ponta – cabo preto, preferencialmente da marca Tramontina",
              "note": ""
            }
          ]
        },
        {
          "name": "Nível IV",
          "rows": [
            {
              "category": "",
              "quantity": "3",
              "description": "Blocos de papel Creative colorido (tamanho A4 não reciclado)",
              "note": ""
            },
            {
              "category": "",
              "quantity": "2",
              "description": "Blocos desenho 180g 50 folhas",
              "note": ""
            },
            {
              "category": "",
              "quantity": "1",
              "description": "Pacote de sulfite colorido 100 folhas (mesclado com 4 cores)",
              "note": ""
            },
            {
              "category": "",
              "quantity": "1",
              "description": "Metro de tecido colorido estampado (voal ou tricoline)",
              "note": ""
            },
            {
              "category": "",
              "quantity": "1",
              "description": "Pasta com 100 plásticos A4 (para o Inglês)",
              "note": ""
            },
            {
              "category": "",
              "quantity": "2",
              "description": "Pacotes de papel de sulfite branco A4 (100 folhas)",
              "note": ""
            },
            {
              "category": "",
              "quantity": "1",
              "description": "Cola branca 90g (sugerimos Faber Castell ou Acrilex)",
              "note": ""
            },
            {
              "category": "",
              "quantity": "2",
              "description": "Colas bastão 40g (sugerimos Faber Castell ou Acrilex)",
              "note": ""
            },
            {
              "category": "",
              "quantity": "1",
              "description": "Caixa de cola colorida (6 cores)",
              "note": ""
            },
            {
              "category": "",
              "quantity": "1",
              "description": "Penal (Estojo)",
              "note": ""
            },
            {
              "category": "",
              "quantity": "1",
              "description": "Caderno de desenho de capa dura com 96 folhas",
              "note": ""
            },
            {
              "category": "",
              "quantity": "1",
              "description": "Lápis de escrever triangular",
              "note": ""
            },
            {
              "category": "",
              "quantity": "1",
              "description": "Jogo de canetinhas ponta grossa (12 cores) (sugerimos Faber Castell ou Acrilex)",
              "note": ""
            },
            {
              "category": "",
              "quantity": "1",
              "description": "Caixa de lápis de cor (12 cores)",
              "note": ""
            },
            {
              "category": "",
              "quantity": "1",
              "description": "Potinho de lantejoula colorida ou gliter",
              "note": ""
            },
            {
              "category": "",
              "quantity": "1",
              "description": "Caixa de giz de cera (12 cores)",
              "note": ""
            },
            {
              "category": "",
              "quantity": "2",
              "description": "Potes de massa de modelar grande antialérgica (500g)",
              "note": ""
            },
            {
              "category": "",
              "quantity": "1",
              "description": "Pote de tinta guache - 250ml (sugestão de cores - preto, branco, marrom, bege ou cinza)",
              "note": ""
            },
            {
              "category": "",
              "quantity": "1",
              "description": "Camiseta usada para atividades de pintura (tamanho adulto)",
              "note": ""
            },
            {
              "category": "",
              "quantity": "1",
              "description": "Aquarela 12 cores",
              "note": ""
            },
            {
              "category": "",
              "quantity": "1",
              "description": "Borracha branca",
              "note": ""
            },
            {
              "category": "",
              "quantity": "1",
              "description": "Tesoura sem ponta",
              "note": ""
            },
            {
              "category": "",
              "quantity": "1",
              "description": "Jogo adequado à faixa etária",
              "note": ""
            },
            {
              "category": "",
              "quantity": "1",
              "description": "Brinquedo  (boneca, carrinhos, kit cozinha, kit profissões) para uso coletivo",
              "note": ""
            },
            {
              "category": "",
              "quantity": "3",
              "description": "Caixas de lenços de papel",
              "note": ""
            },
            {
              "category": "",
              "quantity": "3",
              "description": "Pacotes de toalhas umedecidas (c/ 100un)",
              "note": ""
            },
            {
              "category": "",
              "quantity": "2",
              "description": "Livros adequado à faixa etária (sugerimos Ruth Rocha, Ana Maria Machado,\nAudrey Wood, Todd Parr, Sara Agostini, Ziraldo.)",
              "note": ""
            },
            {
              "category": "",
              "quantity": "2",
              "description": "Telas para pintura 20x30",
              "note": ""
            },
            {
              "category": "",
              "quantity": "1",
              "description": "Pincel nº18 - arredondado ou chato",
              "note": ""
            },
            {
              "category": "",
              "quantity": "1",
              "description": "Garrafinha para água",
              "note": ""
            },
            {
              "category": "",
              "quantity": "1",
              "description": "Lancheira contendo uma toalha de tecido pequena para o momento do lanche",
              "note": ""
            },
            {
              "category": "",
              "quantity": "1",
              "description": "Mochila média com rodinhas",
              "note": ""
            }
          ]
        },
        {
          "name": "Nível V",
          "rows": [
            {
              "category": "",
              "quantity": "2",
              "description": "Cadernos de desenho espiral 48 folhas",
              "note": ""
            },
            {
              "category": "",
              "quantity": "2",
              "description": "Pacotes papel creative (tamanho A4, não reciclado)",
              "note": ""
            },
            {
              "category": "",
              "quantity": "1",
              "description": "Pacote de papel A4 120g (50 folhas)",
              "note": ""
            },
            {
              "category": "",
              "quantity": "2",
              "description": "Pacotes de papel sulfite branco A4 (100 folhas)",
              "note": ""
            },
            {
              "category": "",
              "quantity": "1",
              "description": "Caneta permanente preta",
              "note": ""
            },
            {
              "category": "",
              "quantity": "1",
              "description": "Pasta com 100 plásticos A4 (para o Inglês)",
              "note": ""
            },
            {
              "category": "",
              "quantity": "2",
              "description": "Colas branca – Tubo grande 110g. (Sugerimos a marca Pritt)",
              "note": ""
            },
            {
              "category": "",
              "quantity": "1",
              "description": "Tela 40x40cm",
              "note": ""
            },
            {
              "category": "",
              "quantity": "1",
              "description": "Caixa de giz pastel oleoso. Sugerimos Acrilex ou Faber Castell",
              "note": ""
            },
            {
              "category": "",
              "quantity": "1",
              "description": "Caixa de giz de cera (12 cores)",
              "note": ""
            },
            {
              "category": "",
              "quantity": "2",
              "description": "Colas bastão 40g (sugerimos a marca Faber Castell ou Pritt)",
              "note": ""
            },
            {
              "category": "",
              "quantity": "1",
              "description": "Jogo de canetinhas hidrográficas ponta grossa (12 cores). Sugerimos as da marca\nFaber Castell ou Acrilex",
              "note": ""
            },
            {
              "category": "",
              "quantity": "1",
              "description": "Pacote de argila",
              "note": ""
            },
            {
              "category": "",
              "quantity": "1",
              "description": "Bloco de papel A3 - 140g",
              "note": ""
            },
            {
              "category": "",
              "quantity": "1",
              "description": "Metro de tecido diversos",
              "note": ""
            },
            {
              "category": "",
              "quantity": "2",
              "description": "Potes de massa de modelar grande (500g) – preferencialmente Uti Guti - antialérgica",
              "note": ""
            },
            {
              "category": "",
              "quantity": "1",
              "description": "Pote de massa areia grande (500g)",
              "note": ""
            },
            {
              "category": "",
              "quantity": "1",
              "description": "Pote de tinta guache – 250ml - cores variadas",
              "note": ""
            },
            {
              "category": "",
              "quantity": "1",
              "description": "Aquarela com 12 cores – Preferencialmente da marca Acrilex",
              "note": ""
            },
            {
              "category": "",
              "quantity": "1",
              "description": "Pasta com elástico fina - A4",
              "note": ""
            },
            {
              "category": "",
              "quantity": "1",
              "description": "Pincel nº. 10 - chato",
              "note": ""
            },
            {
              "category": "",
              "quantity": "1",
              "description": "Pincel nº 20 - largo - Sugerimos Tramontina",
              "note": ""
            },
            {
              "category": "",
              "quantity": "1",
              "description": "Tesoura sem ponta – cabo preto, preferencialmente da marca Tramontina",
              "note": ""
            },
            {
              "category": "",
              "quantity": "2",
              "description": "Pacotes de Lenço Umedecido com 50 unidades",
              "note": ""
            },
            {
              "category": "",
              "quantity": "1",
              "description": "Caixa de lenço de papel",
              "note": ""
            },
            {
              "category": "",
              "quantity": "1",
              "description": "Revista para recorte (de animais, comidas, jardinagem/paisagem)",
              "note": ""
            },
            {
              "category": "",
              "quantity": "1",
              "description": "Camiseta usada (Tamanho Adulto)",
              "note": ""
            },
            {
              "category": "",
              "quantity": "1",
              "description": "Caixa de Cola Colorida - 6 cores",
              "note": ""
            },
            {
              "category": "",
              "quantity": "1",
              "description": "Caixa de Cola Gliter - 6 cores",
              "note": ""
            },
            {
              "category": "",
              "quantity": "1",
              "description": "Livro adequado à idade (Ruth Rocha, Ana Maria Machado, Audrey Wood,\nMonteiro Lobato, Mary França, Bia Vilela e outros.)",
              "note": ""
            },
            {
              "category": "",
              "quantity": "1",
              "description": "Jogo educativo adequado à faixa etária (quebra-cabeça, dominó ou jogo da memória)",
              "note": ""
            },
            {
              "category": "",
              "quantity": "1",
              "description": "Brinquedo adequado à faixa etária (kit médico, kit dentista, kit ferramentas, bonecas, carrinhos)",
              "note": ""
            },
            {
              "category": "",
              "quantity": "1",
              "description": "Gibi (adequado à faixa etária)",
              "note": ""
            },
            {
              "category": "Penal (estojo) grande",
              "quantity": "1",
              "description": "Apontador",
              "note": ""
            },
            {
              "category": "Penal (estojo) grande",
              "quantity": "4",
              "description": "Lápis grafite",
              "note": ""
            },
            {
              "category": "Penal (estojo) grande",
              "quantity": "2",
              "description": "Borrachas",
              "note": ""
            },
            {
              "category": "Penal (estojo) grande",
              "quantity": "1",
              "description": "Caixa de lápis de cor (12 cores)",
              "note": "Sugerimos Faber Castell"
            }
          ]
        },
        {
          "name": "Ampliado II e III",
          "rows": [
            {
              "category": "",
              "quantity": "1",
              "description": "Camiseta para pintura (camiseta simples usada, um ou dois números maiores)",
              "note": ""
            },
            {
              "category": "",
              "quantity": "1",
              "description": "Sulfite Branco A4 – 180g (100 folhas)",
              "note": ""
            },
            {
              "category": "",
              "quantity": "1",
              "description": "Lápis de cor jumbo – 12 cores",
              "note": ""
            },
            {
              "category": "",
              "quantity": "1",
              "description": "Canetinha ponta grossa – 12 cores",
              "note": ""
            },
            {
              "category": "",
              "quantity": "1",
              "description": "Giz de cera jumbo – 12 cores",
              "note": ""
            },
            {
              "category": "",
              "quantity": "2",
              "description": "Pacotes de lenço umedecido",
              "note": ""
            },
            {
              "category": "",
              "quantity": "1",
              "description": "Massa de modelar grande – 500g",
              "note": ""
            },
            {
              "category": "",
              "quantity": "1",
              "description": "Brinquedo adequado à faixa etária (bonecas, carro grande, kit profissões)",
              "note": ""
            },
            {
              "category": "Kit mochila",
              "quantity": "",
              "description": "",
              "note": "Estes itens devem ser enviados todos os dias na mochila e todos estes itens devem estar com o nome da criança."
            },
            {
              "category": "Kit mochila",
              "quantity": "1",
              "description": "Estojo para o kit higiene",
              "note": ""
            },
            {
              "category": "Kit mochila",
              "quantity": "1",
              "description": "Escova de dente",
              "note": ""
            },
            {
              "category": "Kit mochila",
              "quantity": "1",
              "description": "Creme dental",
              "note": ""
            },
            {
              "category": "Kit mochila",
              "quantity": "2",
              "description": "Fraldas, lenço umedecido e pomada de assadura",
              "note": "pomada para prevenção de assadura"
            },
            {
              "category": "Kit mochila",
              "quantity": "1",
              "description": "Roupa reserva (cuecas/calcinhas, meias, tênis, camiseta, calça e blusa de frio)",
              "note": ""
            },
            {
              "category": "Kit mochila",
              "quantity": "1",
              "description": "Garrafinha",
              "note": ""
            },
            {
              "category": "Caixa Organizadora 20L",
              "quantity": "",
              "description": "",
              "note": "A caixa organizadora com os itens deve ser enviada no 1º dia de aula e todos estes itens devem estar com o nome da criança"
            },
            {
              "category": "Caixa Organizadora 20L",
              "quantity": "",
              "description": "",
              "note": "O lençol e a fronha irão no último dia da semana para  higienização em casa e devem retornar no primeiro dia da semana."
            },
            {
              "category": "Caixa Organizadora 20L",
              "quantity": "1",
              "description": "Cobertor, fronha e travesseiro (para o momento do soninho)",
              "note": ""
            },
            {
              "category": "Caixa Organizadora 20L",
              "quantity": "1",
              "description": "Lençol para cama infantil – tamanho 135cm x 35cm (momento do soninho)",
              "note": ""
            }
          ]
        },
        {
          "name": "Ampliado IV e V",
          "rows": [
            {
              "category": "",
              "quantity": "",
              "description": "",
              "note": "Os materiais do ampliado são de uso coletivo."
            },
            {
              "category": "",
              "quantity": "1",
              "description": "Camiseta para pintura (camiseta simples usada, um ou dois números maiores)",
              "note": ""
            },
            {
              "category": "",
              "quantity": "1",
              "description": "Sulfite Branco A4 – 180g (100 folhas)",
              "note": ""
            },
            {
              "category": "",
              "quantity": "1",
              "description": "Lápis de cor - 12 cores",
              "note": ""
            },
            {
              "category": "",
              "quantity": "1",
              "description": "Canetinha ponta grossa – 12 cores",
              "note": ""
            },
            {
              "category": "",
              "quantity": "1",
              "description": "Giz de cera  – 12 cores",
              "note": ""
            },
            {
              "category": "",
              "quantity": "2",
              "description": "Pacotes de lenço umedecido",
              "note": ""
            },
            {
              "category": "",
              "quantity": "1",
              "description": "Brinquedo adequado à faixa etária (bonecas, carrinho, kit profissões)",
              "note": ""
            },
            {
              "category": "Kit mochila",
              "quantity": "",
              "description": "",
              "note": "Estes itens devem ser enviados todos os dias na mochila e todos estes itens devem estar com o nome da criança."
            },
            {
              "category": "Kit mochila",
              "quantity": "1",
              "description": "Estojo para o kit higiene",
              "note": ""
            },
            {
              "category": "Kit mochila",
              "quantity": "1",
              "description": "Escova de dente",
              "note": ""
            },
            {
              "category": "Kit mochila",
              "quantity": "1",
              "description": "Creme dental",
              "note": ""
            },
            {
              "category": "Kit mochila",
              "quantity": "1",
              "description": "Roupa reserva (cuecas/calcinhas, meias, tênis, camiseta, calça e blusa de frio)",
              "note": ""
            },
            {
              "category": "Kit mochila",
              "quantity": "1",
              "description": "Garrafinha",
              "note": ""
            },
            {
              "category": "Caixa Organizadora 20L",
              "quantity": "",
              "description": "",
              "note": "A caixa organizadora com os itens deve ser enviada no 1º dia de aula e todos estes itens devem estar com o nome da criança"
            },
            {
              "category": "Caixa Organizadora 20L",
              "quantity": "",
              "description": "",
              "note": "O lençol e a fronha irão no último dia da semana para  higienização em casa e devem retornar no primeiro dia da semana."
            },
            {
              "category": "Caixa Organizadora 20L",
              "quantity": "1",
              "description": "Cobertor, fronha e travesseiro (para o momento do soninho)",
              "note": ""
            },
            {
              "category": "Caixa Organizadora 20L",
              "quantity": "1",
              "description": "Lençol para cama infantil – tamanho 135cm x 35cm (momento do soninho)",
              "note": ""
            }
          ]
        }
      ],
      "books": [
        {
          "discipline": "Alemão",
          "turma": "Ampliado - Nível V",
          "semester": "",
          "bimester": "",
          "image": "4449fdd822fa5459",
          "title": "Hallo Anna, Vorkurs",
          "isbn": "978-3-12-600071-0",
          "author": "Lehrbuch",
          "publisher": "",
          "note": ""
        },
        {
          "discipline": "Alemão",
          "turma": "Ampliado - Nível V",
          "semester": "",
          "bimester": "",
          "image": "525526521ec2e5ed",
          "title": "Hallo Anna, Vorkurs",
          "isbn": "978-3-12-600072-7",
          "author": "Arbeitsbuch",
          "publisher": "",
          "note": ""
        }
      ],
      "assembly": [
        {
          "kind": "cover",
          "subtitle": "Educação Infantil",
          "topColor": "#2b4372",
          "bandColor": "#006b82",
          "logo": "d28758c7ae91e884"
        },
        {
          "kind": "static",
          "label": "Folha de Rosto",
          "asset": "264b689c58c673bb"
        },
        {
          "kind": "static",
          "label": "Horário",
          "asset": "52201814c314225f"
        },
        {
          "kind": "static",
          "label": "Parceiros",
          "asset": "778f02cbf8590ace"
        },
        {
          "kind": "section",
          "section": "info",
          "title": "Informações Importantes"
        },
        {
          "kind": "section",
          "section": "list",
          "title": "Listas de Materiais"
        },
        {
          "kind": "section",
          "section": "book",
          "title": "Livros"
        },
        {
          "kind": "static",
          "label": "Quarta Capa",
          "asset": "814f4281c8b58b4e"
        }
      ]
    }
  },
  {
    "slug": "ensino-fundamental-1",
    "name": "Ensino Fundamental I",
    "sortOrder": 20,
    "year": 2026,
    "fileNameTemplate": "Lista de Materiais {ano} - {segmento}.pdf",
    "content": {
      "info": [
        {
          "title": "Material Bernoulli",
          "body": "O material didático utilizado na escola é do sistema de ensino da Bernoulli. No Ensino Fundamental I, ele consiste em livros físicos das disciplinas de Matemática, Português, História, Geografia e Ciências. Serão entregues aos alunos duas coleções, uma para cada semestre. Existe também o acesso ao material em sua versão digital, disponível em formato e-book no portal da Bernoulli. O login e senha são fornecidos ao aluno pela instituição.\n<b>https://meu.bernoulli.com.br/login</b>",
          "note": "Esse material é adquirido e entregue pela instituição direto para o aluno, e seu valor está incluso na taxa\nde material."
        },
        {
          "title": "Programação",
          "body": "Para os alunos do 4° ao 5° ano começam as aulas de Programação. O objetivo destas aulas é que os alunos entrem em contato com o Pensamento Computacional, além de fazerem atividades maker e trabalhos em grupo para desenvolver as habilidades do século XXI. Os alunos recebem um material físico próprio, com acesso a uma plataforma com os projetos, e farão atividades online e de mão na massa. Este material está todo incluso no valor do Material Didático.",
          "note": ""
        },
        {
          "title": "Dicionário",
          "body": "Os alunos do 3° ao 5° Ano são estimulados a utilizar o dicionário para desenvolver a aprendizagem na Língua Portuguesa. Por isso é solicitado que seja enviado um dicionário, conforme as orientações abaixo:\n<b>3°, 4° e 5° Ano - Dicionário “Luft”, “Aurélio” ou “Michaelis” – de acordo com a Nova Reforma Ortográfica</b>",
          "note": ""
        },
        {
          "title": "Jogos Educativos",
          "body": "Para desenvolver o processo de alfabetização de uma maneira lúdica, e a interação social entre os alunos, os alunos do 1° Ano desenvolvem atividades com jogos educativos. Por isso solicitamos que sejam enviados jogos que envolvam letras, palavras ou números, ou que estimulem habilidades da criança, como o jogo da memória. Dessa forma o processo de alfabetização pode ser feito de maneira lúdica e efetiva para os alunos.",
          "note": ""
        }
      ],
      "groups": [
        {
          "name": "1º ano",
          "rows": [
            {
              "category": "",
              "quantity": "1",
              "description": "Caderno de linguagem universitário, brochura, capa dura - 48 Folhas.",
              "note": ""
            },
            {
              "category": "",
              "quantity": "1",
              "description": "Caderno de Desenho grande, sem seda, capa dura - 48 Folhas (Ensino Religioso).",
              "note": ""
            },
            {
              "category": "",
              "quantity": "1",
              "description": "Caderno de Desenho grande, sem seda, capa dura - 48 Folhas (Inglês).",
              "note": ""
            },
            {
              "category": "",
              "quantity": "1",
              "description": "Caderno de Desenho grande, sem seda, capa dura - 96 Folhas (Regente)",
              "note": ""
            },
            {
              "category": "",
              "quantity": "1",
              "description": "Pasta fina com elástico.",
              "note": ""
            },
            {
              "category": "",
              "quantity": "1",
              "description": "Pasta com grampo contendo 20 plásticos com furo - Tamanho A4.",
              "note": ""
            },
            {
              "category": "",
              "quantity": "1",
              "description": "Pacote de sulfite branco - 100 Folhas.",
              "note": ""
            },
            {
              "category": "",
              "quantity": "50",
              "description": "Folhas de sulfite branco - Gramatura 180g/m².",
              "note": ""
            },
            {
              "category": "",
              "quantity": "2",
              "description": "Potes grandes de massa de modelar - Cor opcional.",
              "note": ""
            },
            {
              "category": "",
              "quantity": "3",
              "description": "Colas bastão grande.",
              "note": ""
            },
            {
              "category": "",
              "quantity": "1",
              "description": "Cola Colorida - caixa com 6 cores.",
              "note": ""
            },
            {
              "category": "",
              "quantity": "1",
              "description": "Aquarela 12 cores.",
              "note": ""
            },
            {
              "category": "",
              "quantity": "1",
              "description": "Avental (de tecido ou plástico)",
              "note": "Que a criança possa vestir e fechar sozinha"
            },
            {
              "category": "",
              "quantity": "1",
              "description": "Pacote de lenço umedecido - Para uso pedagógico.",
              "note": ""
            },
            {
              "category": "",
              "quantity": "1",
              "description": "Caixa de madeira de material dourado individual - 62 peças.",
              "note": ""
            },
            {
              "category": "",
              "quantity": "1",
              "description": "Tinta Guache Têmpera Show color, tampa com pincel 18ml - 6 Cores.",
              "note": ""
            },
            {
              "category": "",
              "quantity": "1",
              "description": "Jogo educativo (adequado à faixa etária)",
              "note": ""
            },
            {
              "category": "Penal (estojo) com 2 ou 3 divisórias",
              "quantity": "3",
              "description": "Lápis de escrever",
              "note": ""
            },
            {
              "category": "Penal (estojo) com 2 ou 3 divisórias",
              "quantity": "2",
              "description": "Apontadores com depósito",
              "note": ""
            },
            {
              "category": "Penal (estojo) com 2 ou 3 divisórias",
              "quantity": "1",
              "description": "Tesoura sem ponta",
              "note": ""
            },
            {
              "category": "Penal (estojo) com 2 ou 3 divisórias",
              "quantity": "1",
              "description": "Caixa de lápis de cor - 12 cores",
              "note": ""
            },
            {
              "category": "Penal (estojo) com 2 ou 3 divisórias",
              "quantity": "1",
              "description": "Caixa de caneta hidrográfica, ponta grossa - 12 Cores",
              "note": ""
            },
            {
              "category": "Penal (estojo) com 2 ou 3 divisórias",
              "quantity": "2",
              "description": "Borrachas",
              "note": ""
            }
          ]
        },
        {
          "name": "2º ano",
          "rows": [
            {
              "category": "",
              "quantity": "1",
              "description": "Caderno de linguagem universitário, brochura, capa dura - 48 Folhas (História, Geografia e Ciências)",
              "note": ""
            },
            {
              "category": "",
              "quantity": "1",
              "description": "Caderno de linguagem universitário, brochura, capa dura - 98 Folhas (Português)",
              "note": ""
            },
            {
              "category": "",
              "quantity": "1",
              "description": "Caderno universitário quadriculado, brochura, capa dura, com margem, quadriculado 7x7mm - 96 Folhas (Matemática)",
              "note": "Se o caderno não tiver margem, solicitamos que seja feita pelos pais antes do início das aulas."
            },
            {
              "category": "",
              "quantity": "1",
              "description": "Caderno de Desenho grande, sem seda, capa dura - 48 Folhas (Ensino Religioso)",
              "note": ""
            },
            {
              "category": "",
              "quantity": "1",
              "description": "Caderno de Desenho grande, sem seda, capa dura - 48 Folhas (Inglês)",
              "note": ""
            },
            {
              "category": "",
              "quantity": "1",
              "description": "Caderno de Caligrafia, capa dura, 187mm x 245mm - 40 folhas - linha tradicional.",
              "note": ""
            },
            {
              "category": "",
              "quantity": "1",
              "description": "Pasta fina com elástico",
              "note": ""
            },
            {
              "category": "",
              "quantity": "1",
              "description": "Pasta com grampo contendo 10 plásticos com furo - Tamanho A4",
              "note": ""
            },
            {
              "category": "",
              "quantity": "1",
              "description": "Pacote de sulfite branco - 100 Folhas",
              "note": ""
            },
            {
              "category": "",
              "quantity": "1",
              "description": "Bloco Canson A3 120g",
              "note": ""
            },
            {
              "category": "",
              "quantity": "1",
              "description": "Sulfite A3 - 75g - 20 folhas",
              "note": ""
            },
            {
              "category": "",
              "quantity": "2",
              "description": "Blocos desenho A4 branco, Canson BL- Gramatura 140g/m² 20 folhas.",
              "note": ""
            },
            {
              "category": "",
              "quantity": "1",
              "description": "Pote grande de massa de modelar - Cor opcional",
              "note": ""
            },
            {
              "category": "",
              "quantity": "1",
              "description": "Bloco de papel Creative tamanho 325mm x 235mm, não reciclado - Gramatura 120g/m² 32 Folhas",
              "note": ""
            },
            {
              "category": "",
              "quantity": "1",
              "description": "Caixa de material dourado individual - 62 Peças, para uso domiciliar",
              "note": ""
            },
            {
              "category": "",
              "quantity": "2",
              "description": "Colas bastão 40g",
              "note": ""
            },
            {
              "category": "",
              "quantity": "2",
              "description": "Colas líquida",
              "note": ""
            },
            {
              "category": "",
              "quantity": "1",
              "description": "Kit de Tinta Guache - 6 Cores",
              "note": ""
            },
            {
              "category": "",
              "quantity": "1",
              "description": "Pincel n° 06 (chato ou redondo)",
              "note": ""
            },
            {
              "category": "",
              "quantity": "2",
              "description": "Gibis",
              "note": ""
            },
            {
              "category": "Penal (estojo) ",
              "quantity": "6",
              "description": "Lápis de escrever",
              "note": ""
            },
            {
              "category": "Penal (estojo) ",
              "quantity": "1",
              "description": "Apontador com depósito",
              "note": ""
            },
            {
              "category": "Penal (estojo) ",
              "quantity": "2",
              "description": "Borrachas",
              "note": ""
            },
            {
              "category": "Penal (estojo) ",
              "quantity": "1",
              "description": "Caixa de lápis de cor - 12 cores",
              "note": ""
            },
            {
              "category": "Penal (estojo) ",
              "quantity": "1",
              "description": "Tesoura sem ponta",
              "note": ""
            },
            {
              "category": "Penal (estojo) ",
              "quantity": "1",
              "description": "Conjunto de canetinhas - 12 cores",
              "note": ""
            },
            {
              "category": "Penal (estojo) ",
              "quantity": "1",
              "description": "Caixa de giz de cera",
              "note": ""
            }
          ]
        },
        {
          "name": "3º ano",
          "rows": [
            {
              "category": "",
              "quantity": "1",
              "description": "Caderno de linguagem universitário, brochura, capa dura - 48 Folhas (História, Geografia e Ciências)",
              "note": ""
            },
            {
              "category": "",
              "quantity": "1",
              "description": "Caderno de linguagem universitário, brochura, capa dura - 96 Folhas (Português)",
              "note": ""
            },
            {
              "category": "",
              "quantity": "1",
              "description": "Caderno de linguagem universitário, brochura, capa dura - 48 Folhas (Inglês)",
              "note": ""
            },
            {
              "category": "",
              "quantity": "1",
              "description": "Caderno universitário quadriculado, brochura, capa dura, com margem, quadriculado 7x7mm - 96 Folhas (Matemática)",
              "note": "Se o caderno não tiver margem, solicitamos que seja feita pelos pais antes do início das aulas."
            },
            {
              "category": "",
              "quantity": "1",
              "description": "Caderno de caligrafia, capa dura, 187x245mm - 40 Folhas - Linha tradicional.",
              "note": ""
            },
            {
              "category": "",
              "quantity": "1",
              "description": "Caderno de Desenho grande, sem seda, capa dura - 48 Folhas (Ensino Religioso)",
              "note": ""
            },
            {
              "category": "",
              "quantity": "1",
              "description": "Caderno de Desenho grande, sem seda, capa dura - 48 Folhas (Arte)",
              "note": ""
            },
            {
              "category": "",
              "quantity": "1",
              "description": "Pasta fina com elástico",
              "note": ""
            },
            {
              "category": "",
              "quantity": "1",
              "description": "Pacote de sulfite branco - 100 Folhas",
              "note": ""
            },
            {
              "category": "",
              "quantity": "1",
              "description": "Pacote de sulfite colorida - 100 Folhas",
              "note": ""
            },
            {
              "category": "",
              "quantity": "1",
              "description": "Pacote de sulfite branco - Gramatura 180g/m² - 50 Folhas",
              "note": ""
            },
            {
              "category": "",
              "quantity": "1",
              "description": "Bloco desenho A3 branco, Canson BL- Gramatura 140g/m² 20 .Folhas",
              "note": ""
            },
            {
              "category": "",
              "quantity": "1",
              "description": "Bloco de papel Creative A4, não reciclado - Gramatura 120g/m² 32 Folhas",
              "note": ""
            },
            {
              "category": "",
              "quantity": "1",
              "description": "Calculadora simples",
              "note": ""
            },
            {
              "category": "",
              "quantity": "2",
              "description": "Colas bastão 40g",
              "note": ""
            },
            {
              "category": "",
              "quantity": "1",
              "description": "Conjunto de canetinhas - 12 Cores",
              "note": ""
            },
            {
              "category": "",
              "quantity": "1",
              "description": "Fita adesiva papel crepado kraft 45 x 45mm - Recomendado 3M",
              "note": ""
            },
            {
              "category": "",
              "quantity": "1",
              "description": "Tinta Guache Têmpera Show color, tampa com pincel 18ml - 6 cores.",
              "note": ""
            },
            {
              "category": "",
              "quantity": "2",
              "description": "Gibis Turma da Mônica",
              "note": ""
            },
            {
              "category": "",
              "quantity": "1",
              "description": "Régua 30cm",
              "note": ""
            },
            {
              "category": "",
              "quantity": "1",
              "description": "Cola líquida 110g",
              "note": ""
            },
            {
              "category": "",
              "quantity": "1",
              "description": "Caixa de Cola Colorida - 6 cores",
              "note": ""
            },
            {
              "category": "",
              "quantity": "1",
              "description": "Tela branca para pintura - 10x15cm",
              "note": ""
            },
            {
              "category": "Penal (estojo)",
              "quantity": "3",
              "description": "Lápis de escrever",
              "note": ""
            },
            {
              "category": "Penal (estojo)",
              "quantity": "1",
              "description": "Apontador com depósito",
              "note": ""
            },
            {
              "category": "Penal (estojo)",
              "quantity": "2",
              "description": "Borrachas",
              "note": ""
            },
            {
              "category": "Penal (estojo)",
              "quantity": "1",
              "description": "Caixa de lápis de cor - 12 cores",
              "note": ""
            },
            {
              "category": "Penal (estojo)",
              "quantity": "1",
              "description": "Tesoura sem ponta",
              "note": ""
            },
            {
              "category": "Penal (estojo)",
              "quantity": "2",
              "description": "Canetas marca texto",
              "note": ""
            }
          ]
        },
        {
          "name": "4º ano",
          "rows": [
            {
              "category": "",
              "quantity": "1",
              "description": "Caixa de giz de cera - 12 cores",
              "note": ""
            },
            {
              "category": "",
              "quantity": "1",
              "description": "Conjunto de canetinhas - 12 cores",
              "note": ""
            },
            {
              "category": "",
              "quantity": "1",
              "description": "Caderno de linguagem universitário, brochura, capa dura - 96 Folhas (Português)",
              "note": ""
            },
            {
              "category": "",
              "quantity": "1",
              "description": "Caderno de linguagem pequeno, brochura, capa dura - 48 Folhas (Inglês)",
              "note": ""
            },
            {
              "category": "",
              "quantity": "1",
              "description": "Caderno de linguagem pequeno, brochura, capa dura - 48 Folhas (Ensino Religioso)",
              "note": ""
            },
            {
              "category": "",
              "quantity": "1",
              "description": "Caderno universitário quadriculado, brochura, capa dura, com margem, quadriculado 7x7mm - 96 Folhas (Matemática)",
              "note": "Se o caderno não tiver margem, solicitamos que seja feita pelos pais antes do início das aulas"
            },
            {
              "category": "",
              "quantity": "1",
              "description": "Caderno de Desenho grande, sem seda, capa dura - 48 Folhas (para professora regente)",
              "note": ""
            },
            {
              "category": "",
              "quantity": "1",
              "description": "Pasta fina com elástico",
              "note": ""
            },
            {
              "category": "",
              "quantity": "1",
              "description": "Aquarela com pincel - 12 Cores",
              "note": ""
            },
            {
              "category": "",
              "quantity": "1",
              "description": "Sulfite 180g - pacote com 50 folhas",
              "note": ""
            },
            {
              "category": "",
              "quantity": "1",
              "description": "Régua 30cm",
              "note": ""
            },
            {
              "category": "",
              "quantity": "1",
              "description": "Bloco desenho A3 branco, canson - 180g - 20 folhas",
              "note": ""
            },
            {
              "category": "",
              "quantity": "2",
              "description": "Gibis",
              "note": ""
            },
            {
              "category": "",
              "quantity": "2",
              "description": "Telas de pintura branca 15x20cm",
              "note": ""
            },
            {
              "category": "Penal (estojo)",
              "quantity": "6",
              "description": "Lápis de escrever",
              "note": ""
            },
            {
              "category": "Penal (estojo)",
              "quantity": "1",
              "description": "Apontador com depósito",
              "note": ""
            },
            {
              "category": "Penal (estojo)",
              "quantity": "2",
              "description": "Borrachas",
              "note": ""
            },
            {
              "category": "Penal (estojo)",
              "quantity": "1",
              "description": "Tesoura sem ponta",
              "note": ""
            },
            {
              "category": "Penal (estojo)",
              "quantity": "1",
              "description": "Cola bastão",
              "note": ""
            },
            {
              "category": "Penal (estojo)",
              "quantity": "1",
              "description": "Caixa de lápis de cor - 12 cores",
              "note": ""
            }
          ]
        },
        {
          "name": "5º ano",
          "rows": [
            {
              "category": "",
              "quantity": "1",
              "description": "Caderno de linguagem universitário, brochura, capa dura - 96 Folhas (Português)",
              "note": ""
            },
            {
              "category": "",
              "quantity": "1",
              "description": "Caderno de linguagem pequeno, brochura, capa dura - 48 Folhas (Inglês)",
              "note": ""
            },
            {
              "category": "",
              "quantity": "1",
              "description": "Caderno de linguagem pequeno, brochura, capa dura - 48 Folhas (Ensino Religioso)",
              "note": ""
            },
            {
              "category": "",
              "quantity": "1",
              "description": "Caderno de linguagem universitário, brochura, capa dura - 96 folhas (História, Geografia e Ciências)",
              "note": ""
            },
            {
              "category": "",
              "quantity": "1",
              "description": "Caderno universitário quadriculado, brochura, capa dura, com margem, quadriculado 7x7mm - 96 Folhas (Matemática)",
              "note": "Se o caderno não tiver margem, solicitamos que seja feita pelos pais antes do início das aulas"
            },
            {
              "category": "",
              "quantity": "1",
              "description": "Pasta fina com elástico",
              "note": ""
            },
            {
              "category": "",
              "quantity": "1",
              "description": "Bloco de papel Creative A4, não reciclado - Gramatura 120g/m² 32 Folhas",
              "note": ""
            },
            {
              "category": "",
              "quantity": "1",
              "description": "Bloco desenho A3 branco, Canson BL- Gramatura 140g/m² 20 .Folhas",
              "note": ""
            },
            {
              "category": "",
              "quantity": "1",
              "description": "Bloco de folha para fichário",
              "note": ""
            },
            {
              "category": "",
              "quantity": "1",
              "description": "Fita marrom larga",
              "note": ""
            },
            {
              "category": "",
              "quantity": "1",
              "description": "Régua 30cm",
              "note": ""
            },
            {
              "category": "",
              "quantity": "1",
              "description": "Pincel nº4",
              "note": ""
            },
            {
              "category": "",
              "quantity": "1",
              "description": "Pincel nº 10",
              "note": ""
            },
            {
              "category": "",
              "quantity": "1",
              "description": "Tinta guache - 12 Cores",
              "note": ""
            },
            {
              "category": "",
              "quantity": "2",
              "description": "Telas branca para pintura - 20x30cm",
              "note": ""
            },
            {
              "category": "",
              "quantity": "1",
              "description": "Gibi",
              "note": ""
            },
            {
              "category": "",
              "quantity": "1",
              "description": "Cola líquida pequena",
              "note": ""
            },
            {
              "category": "",
              "quantity": "1",
              "description": "Pacote de sulfite branco - 100 Folhas",
              "note": ""
            },
            {
              "category": "Penal (estojo)",
              "quantity": "4",
              "description": "Lápis de escrever",
              "note": ""
            },
            {
              "category": "Penal (estojo)",
              "quantity": "1",
              "description": "Apontador com depósito",
              "note": ""
            },
            {
              "category": "Penal (estojo)",
              "quantity": "2",
              "description": "Borrachas",
              "note": ""
            },
            {
              "category": "Penal (estojo)",
              "quantity": "2",
              "description": "Canetas esferográficas azuis",
              "note": ""
            },
            {
              "category": "Penal (estojo)",
              "quantity": "2",
              "description": "Canetas esferográficas  pretas",
              "note": ""
            },
            {
              "category": "Penal (estojo)",
              "quantity": "1",
              "description": "Cola bastão 40g Pritt",
              "note": ""
            },
            {
              "category": "Penal (estojo)",
              "quantity": "1",
              "description": "Caixa de lápis de cor - 12 cores",
              "note": ""
            },
            {
              "category": "Penal (estojo)",
              "quantity": "1",
              "description": "Tesoura sem ponta",
              "note": ""
            },
            {
              "category": "Penal (estojo)",
              "quantity": "1",
              "description": "Corretivo fita",
              "note": ""
            },
            {
              "category": "Penal (estojo)",
              "quantity": "1",
              "description": "Conjunto de canetinhas - 12 cores",
              "note": ""
            },
            {
              "category": "Penal (estojo)",
              "quantity": "3",
              "description": "Canetas marca texto",
              "note": ""
            }
          ]
        },
        {
          "name": "Material de Uso Pessoal e Diário",
          "rows": [
            {
              "category": "",
              "quantity": "1",
              "description": "Garrafinha para água (tipo squeeze)",
              "note": ""
            },
            {
              "category": "",
              "quantity": "1",
              "description": "Mochila (o tamanho deve ser compatível com as pastas e os livros didáticos)",
              "note": ""
            },
            {
              "category": "",
              "quantity": "1",
              "description": "Toalha americana ou guardanapo de tecido para higiene do lanche",
              "note": ""
            },
            {
              "category": "",
              "quantity": "1",
              "description": "Lancheira",
              "note": ""
            }
          ]
        },
        {
          "name": "Ampliado 1º ao 3º ano",
          "rows": [
            {
              "category": "",
              "quantity": "2",
              "description": "Pacotes de folha sulfite (branco)",
              "note": ""
            },
            {
              "category": "",
              "quantity": "1",
              "description": "Caderno de desenho grande, sem seda, capa dura - 90 folhas",
              "note": ""
            },
            {
              "category": "",
              "quantity": "1",
              "description": "Caixa de tinta guache - 6 cores (individual)",
              "note": ""
            },
            {
              "category": "",
              "quantity": "1",
              "description": "Camiseta de tamanho maior para atividades de pintura",
              "note": ""
            },
            {
              "category": "",
              "quantity": "1",
              "description": "Jogo (quebra-cabeça ou tabuleiro), próprio para a idade",
              "note": ""
            },
            {
              "category": "",
              "quantity": "1",
              "description": "Pote de massinha grande",
              "note": ""
            },
            {
              "category": "",
              "quantity": "2",
              "description": "Livros (próprio para a idade)",
              "note": ""
            },
            {
              "category": "",
              "quantity": "1",
              "description": "Brinquedo de uso coletivo",
              "note": ""
            },
            {
              "category": "",
              "quantity": "1",
              "description": "Cola líquida 110g",
              "note": ""
            },
            {
              "category": "",
              "quantity": "1",
              "description": "Pincel nº 6",
              "note": ""
            },
            {
              "category": "Penal (estojo)",
              "quantity": "",
              "description": "",
              "note": "Este penal ficará na sala do ampliado, não poderá ser compartilhado com o horário regular"
            },
            {
              "category": "Penal (estojo)",
              "quantity": "1",
              "description": "Conjunto de canetinhas",
              "note": ""
            },
            {
              "category": "Penal (estojo)",
              "quantity": "1",
              "description": "Caixa de lápis de cor",
              "note": ""
            },
            {
              "category": "Penal (estojo)",
              "quantity": "1",
              "description": "Lápis de escrever",
              "note": ""
            },
            {
              "category": "Penal (estojo)",
              "quantity": "1",
              "description": "Cola bastão",
              "note": ""
            },
            {
              "category": "Penal (estojo)",
              "quantity": "1",
              "description": "Borracha",
              "note": ""
            },
            {
              "category": "Penal (estojo)",
              "quantity": "1",
              "description": "Tesoura",
              "note": ""
            },
            {
              "category": "Penal (estojo)",
              "quantity": "1",
              "description": "Apontador",
              "note": ""
            }
          ]
        },
        {
          "name": "Ampliado 4º ao 5º ano",
          "rows": [
            {
              "category": "",
              "quantity": "",
              "description": "",
              "note": "O material dos alunos matriculados no período ampliado devem trazê-lo em sacola separada, devidamente\nidentificados, no 1° dia de aula de contraturno.\nO livro didático de alemão será solicitado no início do ano letivo."
            },
            {
              "category": "",
              "quantity": "1",
              "description": "Caderno de desenho grande, sem seda, capa dura - 90 folhas",
              "note": ""
            },
            {
              "category": "",
              "quantity": "1",
              "description": "Pacote de folha sulfite (branco)",
              "note": ""
            },
            {
              "category": "",
              "quantity": "1",
              "description": "Pote de massinha grande",
              "note": ""
            },
            {
              "category": "",
              "quantity": "1",
              "description": "Bloco de papel Creative A4, não reciclado - gramatura 120g - 32 folhas",
              "note": ""
            },
            {
              "category": "",
              "quantity": "1",
              "description": "Tinta guache 250 ml - cor opcional",
              "note": ""
            },
            {
              "category": "",
              "quantity": "1",
              "description": "Camiseta de tamanho maior para atividades de pintura",
              "note": ""
            },
            {
              "category": "",
              "quantity": "1",
              "description": "Jogo (quebra-cabeça ou tabuleiro), próprio para a idade",
              "note": ""
            },
            {
              "category": "",
              "quantity": "1",
              "description": "Livro (próprio para a idade)",
              "note": ""
            },
            {
              "category": "",
              "quantity": "1",
              "description": "E.V.A branco",
              "note": ""
            },
            {
              "category": "",
              "quantity": "1",
              "description": "E.V.A amarelo",
              "note": ""
            },
            {
              "category": "",
              "quantity": "1",
              "description": "E.V.A vermelho",
              "note": ""
            },
            {
              "category": "",
              "quantity": "1",
              "description": "Pincel nº8",
              "note": ""
            },
            {
              "category": "Penal (estojo)",
              "quantity": "",
              "description": "",
              "note": "Este penal ficará na sala do ampliado, não poderá ser compartilhado com o horário regular"
            },
            {
              "category": "Penal (estojo)",
              "quantity": "1",
              "description": "Conjunto de canetinhas",
              "note": ""
            },
            {
              "category": "Penal (estojo)",
              "quantity": "1",
              "description": "Caixa de lápis de cor",
              "note": ""
            },
            {
              "category": "Penal (estojo)",
              "quantity": "1",
              "description": "Lápis de escrever",
              "note": ""
            },
            {
              "category": "Penal (estojo)",
              "quantity": "1",
              "description": "Cola bastão",
              "note": ""
            },
            {
              "category": "Penal (estojo)",
              "quantity": "1",
              "description": "Borracha",
              "note": ""
            },
            {
              "category": "Penal (estojo)",
              "quantity": "1",
              "description": "Tesoura",
              "note": ""
            },
            {
              "category": "Penal (estojo)",
              "quantity": "1",
              "description": "Apontador",
              "note": ""
            }
          ]
        },
        {
          "name": "Material de Uso Pessoal e Diário para o período Ampliado",
          "rows": [
            {
              "category": "",
              "quantity": "",
              "description": "",
              "note": "Para os alunos do Período Ampliado é importante ter um kit com material de uso pessoal. Este kit deve \nconter uma roupa reserva, que deve ser enviado na mochila diariamente e também uma \nnecessaire com os seguintes itens abaixo, devidamente identificados com o nome do aluno:"
            },
            {
              "category": "",
              "quantity": "1",
              "description": "Garrafinha para água (tipo squeeze)",
              "note": ""
            },
            {
              "category": "",
              "quantity": "1",
              "description": "Escova de dente e creme dental dentro de estojo específico.",
              "note": ""
            },
            {
              "category": "",
              "quantity": "1",
              "description": "Caixa de lenço de papel",
              "note": ""
            },
            {
              "category": "",
              "quantity": "1",
              "description": "Lenço umedecido",
              "note": ""
            }
          ]
        }
      ],
      "books": [
        {
          "discipline": "Ensino Religioso",
          "turma": "",
          "semester": "",
          "bimester": "",
          "image": null,
          "title": "",
          "isbn": "",
          "author": "",
          "publisher": "",
          "note": "Para as aulas de Ensino Religioso do <b>3º ao 5º</b> ano solicitamos que os alunos tenham \numa bíblia em formato físico em sala.\nExistem várias versões e traduções diferentes. Para se adequar à faixa etária \ndos alunos, solicitamos que seja adquirida a seguinte versão e tradução:"
        },
        {
          "discipline": "Ensino Religioso",
          "turma": "",
          "semester": "",
          "bimester": "",
          "image": "c75fb23d5a8877c2",
          "title": "A BÍBLIA DAS DESCOBERTAS NTLH",
          "isbn": "978-8531110740",
          "author": "",
          "publisher": "Sociedade Bíblica do Brasil",
          "note": ""
        },
        {
          "discipline": "Língua Portuguesa",
          "turma": "",
          "semester": "",
          "bimester": "",
          "image": null,
          "title": "",
          "isbn": "",
          "author": "",
          "publisher": "",
          "note": "Os professores de Língua Portuguesa procuram estimular o desenvolvimento da leitura dos alunos através de livros paradidáticos. Estes são selecionados de acordo com a faixa etária dos alunos, e são realizadas atividades relacionadas a eles.\n\n<b>Por isso solicitamos que sejam adquiridos os seguintes livros, de acordo com a série de cada aluno.</b>"
        },
        {
          "discipline": "Língua Portuguesa",
          "turma": "1º ano",
          "semester": "",
          "bimester": "",
          "image": null,
          "title": "",
          "isbn": "",
          "author": "",
          "publisher": "",
          "note": "Escolher 1 (um) livro entre as coleções abaixo"
        },
        {
          "discipline": "Língua Portuguesa",
          "turma": "1º ano",
          "semester": "",
          "bimester": "",
          "image": "bcad175492559fe1",
          "title": "Coleção Os Pingos",
          "isbn": "",
          "author": "Mary França e Eliardo França",
          "publisher": "",
          "note": ""
        },
        {
          "discipline": "Língua Portuguesa",
          "turma": "1º ano",
          "semester": "",
          "bimester": "",
          "image": "dcf31340121c48ee",
          "title": "Coleção Gato e Rato",
          "isbn": "",
          "author": "Mary França e Eliardo França",
          "publisher": "",
          "note": ""
        },
        {
          "discipline": "Língua Portuguesa",
          "turma": "1º ano",
          "semester": "",
          "bimester": "",
          "image": "d571507a69905b43",
          "title": "Coleção Estrelinha",
          "isbn": "",
          "author": "Sonia Junqueira",
          "publisher": "",
          "note": ""
        },
        {
          "discipline": "Língua Portuguesa",
          "turma": "1º ano",
          "semester": "",
          "bimester": "",
          "image": "85f65a64fc2ea310",
          "title": "Série Sim",
          "isbn": "",
          "author": "Bia Vilela",
          "publisher": "",
          "note": ""
        },
        {
          "discipline": "Língua Portuguesa",
          "turma": "2º ano",
          "semester": "1",
          "bimester": "",
          "image": "3b37c765bd494b5e",
          "title": "Marcelo, marmelo, martelo",
          "isbn": "978-8516071493",
          "author": "Ruth Rocha",
          "publisher": "Editora Moderna",
          "note": ""
        },
        {
          "discipline": "Língua Portuguesa",
          "turma": "3º ano",
          "semester": "1",
          "bimester": "",
          "image": "7e1900c7aa7ccc4b",
          "title": "Asas do Joel",
          "isbn": "978-8516079369",
          "author": "Walcyr Carrasco",
          "publisher": "Editora Moderna",
          "note": ""
        },
        {
          "discipline": "Língua Portuguesa",
          "turma": "3º ano",
          "semester": "2",
          "bimester": "",
          "image": "585d70481b6d9ce8",
          "title": "As coisas que a gente fala",
          "isbn": "978-8516080549",
          "author": "Ruth Rocha",
          "publisher": "Editora Salamandra (Moderna)",
          "note": ""
        },
        {
          "discipline": "Língua Portuguesa",
          "turma": "4º ano",
          "semester": "1",
          "bimester": "",
          "image": "130bb1c040a2696e",
          "title": "De coração aberto",
          "isbn": "978-8516130145",
          "author": "Michele Lacoca e Carolina",
          "publisher": "Editora Moderna",
          "note": ""
        },
        {
          "discipline": "Língua Portuguesa",
          "turma": "4º ano",
          "semester": "2",
          "bimester": "",
          "image": "4c7ccf2768f30e0a",
          "title": "Edmundo e o Resmungo",
          "isbn": "978-6552171238",
          "author": "Fernanda Witwytzky",
          "publisher": "Editora Thomas Nelson Brasil",
          "note": ""
        },
        {
          "discipline": "Língua Portuguesa",
          "turma": "5º ano",
          "semester": "1",
          "bimester": "",
          "image": "23368a3e390839a9",
          "title": "Viagem ao centro da Terra",
          "isbn": "978-8526238671",
          "author": "Júlio Verne, adaptação Lúcia Tulchinski",
          "publisher": "Editora Scipione",
          "note": ""
        },
        {
          "discipline": "Língua Portuguesa",
          "turma": "5º ano",
          "semester": "2",
          "bimester": "",
          "image": "4bdd606c44988d68",
          "title": "O Encantador de Livros",
          "isbn": "978-8568925331",
          "author": "Lucas de Sousa",
          "publisher": "Editora Ler Editorial",
          "note": ""
        },
        {
          "discipline": "Alemão - Ampliado",
          "turma": "1º ano",
          "semester": "",
          "bimester": "",
          "image": "7052b45b6d77e4eb",
          "title": "Hallo Anna Neu 1 Lehrbuc",
          "isbn": "978-3-12-600059-",
          "author": "",
          "publisher": "",
          "note": ""
        },
        {
          "discipline": "Alemão - Ampliado",
          "turma": "1º ano",
          "semester": "",
          "bimester": "",
          "image": "a32183bdb43916ea",
          "title": "Hallo Anna Neu 1 Arbeitsbuch",
          "isbn": "978-3-12-600060-",
          "author": "",
          "publisher": "",
          "note": ""
        },
        {
          "discipline": "Alemão - Ampliado",
          "turma": "2º ano",
          "semester": "",
          "bimester": "",
          "image": "2e9aa09c5c443018",
          "title": "Hallo Anna Neu 2 Lehrbuc",
          "isbn": "978-3-12-600063-",
          "author": "",
          "publisher": "",
          "note": ""
        },
        {
          "discipline": "Alemão - Ampliado",
          "turma": "2º ano",
          "semester": "",
          "bimester": "",
          "image": "4504987229d25cb2",
          "title": "Hallo Anna Neu 2 Arbeitsbuch",
          "isbn": "978-3-12-600079-",
          "author": "",
          "publisher": "",
          "note": ""
        },
        {
          "discipline": "Alemão - Ampliado",
          "turma": "3º ano",
          "semester": "",
          "bimester": "",
          "image": "9c60cda6a0ec7925",
          "title": "Hallo Anna Neu 3 Lehrbuc",
          "isbn": "978-3-12-600067-",
          "author": "",
          "publisher": "",
          "note": ""
        },
        {
          "discipline": "Alemão - Ampliado",
          "turma": "3º ano",
          "semester": "",
          "bimester": "",
          "image": "399b1452737cf0cb",
          "title": "Hallo Anna Neu 3 Arbeitsbuch",
          "isbn": "978-3-12-600068-",
          "author": "",
          "publisher": "",
          "note": ""
        },
        {
          "discipline": "Alemão - Ampliado",
          "turma": "4º ano e 5º ano",
          "semester": "",
          "bimester": "",
          "image": "de779f343e569dc7",
          "title": "Wir Alle A1.1 - Kurs- Und Ubungsbuch Mit Audios Und Video",
          "isbn": "978-3-12-674003-6",
          "author": "",
          "publisher": "",
          "note": "O material Wir Alle A1.1 será utilizado por dois anos, sendo metade do livro estudado em um ano e a outra metade no ano seguinte. Assim,\n\nalunos que já adquiriram o livro em 2025 não precisam adquirir um novo livro para 2026"
        }
      ],
      "assembly": [
        {
          "kind": "cover",
          "subtitle": "Ensino Fundamental I",
          "topColor": "#006b82",
          "bandColor": "#02748d",
          "logo": null
        },
        {
          "kind": "static",
          "label": "Folha de Rosto",
          "asset": "43c85bd8ed8b37ea"
        },
        {
          "kind": "static",
          "label": "Horário",
          "asset": "99f7353fdefa4342"
        },
        {
          "kind": "static",
          "label": "Parceiros",
          "asset": "778f02cbf8590ace"
        },
        {
          "kind": "section",
          "section": "info",
          "title": "Informações Importantes"
        },
        {
          "kind": "section",
          "section": "list",
          "title": "Listas de Materiais"
        },
        {
          "kind": "section",
          "section": "book",
          "title": "Livros"
        },
        {
          "kind": "static",
          "label": "Quarta Capa",
          "asset": "b23f5ca907099786"
        }
      ]
    }
  },
  {
    "slug": "ensino-fundamental-2",
    "name": "Ensino Fundamental II",
    "sortOrder": 30,
    "year": 2026,
    "fileNameTemplate": "Lista de Materiais {ano} - {segmento}.pdf",
    "content": {
      "info": [
        {
          "title": "Material Bernoulli",
          "body": "O material didático utilizado na escola é do sistema de ensino da Bernoulli. No Ensino Fundamental I, ele consiste em livros físicos das disciplinas de Matemática, Português, História, Geografia e Ciências. Serão entregues aos alunos duas coleções, uma para cada semestre. Existe também o acesso ao material em sua versão digital, disponível em formato e-book no portal da Bernoulli. O login e senha são fornecidos ao aluno pela instituição.\n<b>https://meu.bernoulli.com.br/login</b>",
          "note": "Esse material é adquirido e entregue pela instituição direto para o aluno, e seu valor está incluso na taxa\nde material."
        },
        {
          "title": "Programação",
          "body": "Os alunos de 6° ao 9° Ano tem aulas de Programação. O objetivo destas aulas é que os alunos entrem em contato com o Pensamento Computacional, além de fazerem atividades maker e trabalhos em grupo para desenvolver as habilidades do século XXI. Os alunos recebem um material físico próprio, com acesso a uma plataforma com os projetos, e farão atividades online e de mão na massa. Este material está todo incluso no valor do Material Didático.",
          "note": ""
        }
      ],
      "groups": [
        {
          "name": "6º ano",
          "rows": [
            {
              "category": "",
              "quantity": "3",
              "description": "Caderno universitário espiral - 96 folhas",
              "note": "Um para cada: Ciências, História e Geografia"
            },
            {
              "category": "Matemática",
              "quantity": "1",
              "description": "Caderno Universitário quadriculado - 96 folhas",
              "note": ""
            },
            {
              "category": "Matemática",
              "quantity": "1",
              "description": "Caderno de desenho milimetrado – 48 folhas",
              "note": ""
            },
            {
              "category": "Matemática",
              "quantity": "1",
              "description": "Régua de 30 centimetros",
              "note": ""
            },
            {
              "category": "Matemática",
              "quantity": "1",
              "description": "Transferidor",
              "note": ""
            },
            {
              "category": "Matemática",
              "quantity": "1",
              "description": "Compasso",
              "note": ""
            },
            {
              "category": "Matemática",
              "quantity": "1",
              "description": "Borracha macia",
              "note": ""
            },
            {
              "category": "Português",
              "quantity": "1",
              "description": "Caderno Universitário - 96 folhas",
              "note": ""
            },
            {
              "category": "Português",
              "quantity": "1",
              "description": "Acesso a dicionário atualizado (impresso ou digital)",
              "note": ""
            },
            {
              "category": "Artes",
              "quantity": "1",
              "description": "Bloco de desenho tamanho A4, 20 folhas com 180g/m² branco ou creme",
              "note": ""
            },
            {
              "category": "Artes",
              "quantity": "1",
              "description": "Caderno para anotações: Modelo a critério do(a) aluno(a)",
              "note": ""
            },
            {
              "category": "Artes",
              "quantity": "1",
              "description": "Pasta trilho ou portfólio para guardar trabalhos com plásticos e identificação",
              "note": ""
            },
            {
              "category": "Artes",
              "quantity": "1",
              "description": "Lápis de cor (diversos)",
              "note": ""
            },
            {
              "category": "Artes",
              "quantity": "1",
              "description": "Lápis grafite nas gradações hb, 2b e 6b",
              "note": ""
            },
            {
              "category": "Artes",
              "quantity": "1",
              "description": "Borracha",
              "note": ""
            },
            {
              "category": "Artes",
              "quantity": "1",
              "description": "Apontador",
              "note": ""
            },
            {
              "category": "Artes",
              "quantity": "1",
              "description": "Canetinhas, aquarela, giz e demais materiais para prática artística de uso individual ficam a critério do(a) aluno(a)",
              "note": ""
            },
            {
              "category": "Lingua Estrangeira Moderna - Inglês",
              "quantity": "1",
              "description": "Caderno pequeno - 48 folhas",
              "note": ""
            },
            {
              "category": "Lingua Estrangeira Moderna - Inglês",
              "quantity": "1",
              "description": "Minidicionário Português/Inglês - Inglês/Português",
              "note": ""
            }
          ]
        },
        {
          "name": "7º ano",
          "rows": [
            {
              "category": "",
              "quantity": "3",
              "description": "Caderno universitário espiral - 96 folhas",
              "note": "Um para cada: Ciências, História e Geografia"
            },
            {
              "category": "Matemática",
              "quantity": "1",
              "description": "Jogo de Esquadros",
              "note": ""
            },
            {
              "category": "Matemática",
              "quantity": "1",
              "description": "Caderno Universitário quadriculado - 96 folhas",
              "note": ""
            },
            {
              "category": "Matemática",
              "quantity": "1",
              "description": "Caderno de desenho milimetrado – 48 folhas",
              "note": ""
            },
            {
              "category": "Matemática",
              "quantity": "1",
              "description": "Régua de 30 centimetros",
              "note": ""
            },
            {
              "category": "Matemática",
              "quantity": "1",
              "description": "Transferidor",
              "note": ""
            },
            {
              "category": "Matemática",
              "quantity": "1",
              "description": "Compasso",
              "note": ""
            },
            {
              "category": "Matemática",
              "quantity": "1",
              "description": "Borracha macia",
              "note": ""
            },
            {
              "category": "Português",
              "quantity": "1",
              "description": "Caderno Universitário - 96 folhas",
              "note": ""
            },
            {
              "category": "Português",
              "quantity": "1",
              "description": "Acesso a dicionário atualizado (impresso ou digital)",
              "note": ""
            },
            {
              "category": "Artes",
              "quantity": "1",
              "description": "Bloco de desenho tamanho A4, 20 folhas com 180g/m² branco ou creme",
              "note": ""
            },
            {
              "category": "Artes",
              "quantity": "1",
              "description": "Caderno para anotações: Modelo a critério do(a) aluno(a)",
              "note": ""
            },
            {
              "category": "Artes",
              "quantity": "1",
              "description": "Pasta trilho ou portfólio para guardar trabalhos com plásticos e identificação",
              "note": ""
            },
            {
              "category": "Artes",
              "quantity": "1",
              "description": "Lápis de cor (diversos)",
              "note": ""
            },
            {
              "category": "Artes",
              "quantity": "1",
              "description": "Lápis grafite nas gradações hb, 2b e 6b",
              "note": ""
            },
            {
              "category": "Artes",
              "quantity": "1",
              "description": "Borracha",
              "note": ""
            },
            {
              "category": "Artes",
              "quantity": "1",
              "description": "Apontador",
              "note": ""
            },
            {
              "category": "Artes",
              "quantity": "1",
              "description": "Canetinhas, aquarela, giz e demais materiais para prática artística de uso individual ficam a critério do(a) aluno(a)",
              "note": ""
            },
            {
              "category": "Lingua Estrangeira Moderna - Inglês",
              "quantity": "1",
              "description": "Caderno pequeno - 48 folhas",
              "note": ""
            },
            {
              "category": "Lingua Estrangeira Moderna - Inglês",
              "quantity": "1",
              "description": "Minidicionário Português/Inglês - Inglês/Português",
              "note": ""
            }
          ]
        },
        {
          "name": "8º ano",
          "rows": [
            {
              "category": "",
              "quantity": "1",
              "description": "Caderno Universitário - 160 folhas",
              "note": "Dividir com Ciências, História e Geografia"
            },
            {
              "category": "Matemática",
              "quantity": "1",
              "description": "Jogo de Esquadros",
              "note": ""
            },
            {
              "category": "Matemática",
              "quantity": "1",
              "description": "Caderno Universitário quadriculado - 96 folhas",
              "note": ""
            },
            {
              "category": "Matemática",
              "quantity": "1",
              "description": "Caderno de desenho milimetrado – 48 folhas",
              "note": ""
            },
            {
              "category": "Matemática",
              "quantity": "1",
              "description": "Régua de 30 centimetros",
              "note": ""
            },
            {
              "category": "Matemática",
              "quantity": "1",
              "description": "Transferidor",
              "note": ""
            },
            {
              "category": "Matemática",
              "quantity": "1",
              "description": "Compasso",
              "note": ""
            },
            {
              "category": "Matemática",
              "quantity": "1",
              "description": "Borracha macia",
              "note": ""
            },
            {
              "category": "Português",
              "quantity": "1",
              "description": "Caderno Universitário - 96 folhas",
              "note": ""
            },
            {
              "category": "Português",
              "quantity": "1",
              "description": "Acesso a dicionário atualizado (impresso ou digital)",
              "note": ""
            },
            {
              "category": "Artes",
              "quantity": "1",
              "description": "Bloco de desenho tamanho A4, 20 folhas com 180g/m² branco ou creme",
              "note": ""
            },
            {
              "category": "Artes",
              "quantity": "1",
              "description": "Caderno para anotações: Modelo a critério do(a) aluno(a)",
              "note": ""
            },
            {
              "category": "Artes",
              "quantity": "1",
              "description": "Pasta trilho ou portfólio para guardar trabalhos com plásticos e identificação",
              "note": ""
            },
            {
              "category": "Artes",
              "quantity": "1",
              "description": "Lápis de cor (diversos)",
              "note": ""
            },
            {
              "category": "Artes",
              "quantity": "1",
              "description": "Lápis grafite nas gradações hb, 2b e 6b",
              "note": ""
            },
            {
              "category": "Artes",
              "quantity": "1",
              "description": "Borracha",
              "note": ""
            },
            {
              "category": "Artes",
              "quantity": "1",
              "description": "Apontador",
              "note": ""
            },
            {
              "category": "Artes",
              "quantity": "1",
              "description": "Canetinhas, aquarela, giz e demais materiais para prática artística de uso individual ficam a critério do(a) aluno(a)",
              "note": ""
            },
            {
              "category": "Lingua Estrangeira Moderna - Inglês",
              "quantity": "1",
              "description": "Caderno pequeno - 48 folhas",
              "note": ""
            },
            {
              "category": "Lingua Estrangeira Moderna - Inglês",
              "quantity": "1",
              "description": "Minidicionário Português/Inglês - Inglês/Português",
              "note": ""
            }
          ]
        },
        {
          "name": "9º ano",
          "rows": [
            {
              "category": "",
              "quantity": "1",
              "description": "Caderno Universitário - 160 folhas",
              "note": "Dividir com Ciências, História e Geografia"
            },
            {
              "category": "Matemática",
              "quantity": "1",
              "description": "Jogo de Esquadros",
              "note": ""
            },
            {
              "category": "Matemática",
              "quantity": "1",
              "description": "Caderno Universitário quadriculado - 96 folhas",
              "note": ""
            },
            {
              "category": "Matemática",
              "quantity": "1",
              "description": "Régua de 30 centimetros",
              "note": ""
            },
            {
              "category": "Matemática",
              "quantity": "1",
              "description": "Transferidor",
              "note": ""
            },
            {
              "category": "Matemática",
              "quantity": "1",
              "description": "Compasso",
              "note": ""
            },
            {
              "category": "Matemática",
              "quantity": "1",
              "description": "Borracha macia",
              "note": ""
            },
            {
              "category": "Português",
              "quantity": "1",
              "description": "Caderno Universitário - 96 folhas",
              "note": ""
            },
            {
              "category": "Português",
              "quantity": "1",
              "description": "Acesso a dicionário atualizado (impresso ou digital)",
              "note": ""
            },
            {
              "category": "Artes",
              "quantity": "1",
              "description": "Bloco de desenho tamanho A4, 20 folhas com 180g/m² branco ou creme",
              "note": ""
            },
            {
              "category": "Artes",
              "quantity": "1",
              "description": "Caderno para anotações: Modelo a critério do(a) aluno(a)",
              "note": ""
            },
            {
              "category": "Artes",
              "quantity": "1",
              "description": "Pasta trilho ou portfólio para guardar trabalhos com plásticos e identificação",
              "note": ""
            },
            {
              "category": "Artes",
              "quantity": "1",
              "description": "Lápis de cor (diversos)",
              "note": ""
            },
            {
              "category": "Artes",
              "quantity": "1",
              "description": "Lápis grafite nas gradações hb, 2b e 6b",
              "note": ""
            },
            {
              "category": "Artes",
              "quantity": "1",
              "description": "Borracha",
              "note": ""
            },
            {
              "category": "Artes",
              "quantity": "1",
              "description": "Apontador",
              "note": ""
            },
            {
              "category": "Artes",
              "quantity": "1",
              "description": "Canetinhas, aquarela, giz e demais materiais para prática artística de uso individual ficam a critério do(a) aluno(a)",
              "note": ""
            },
            {
              "category": "Lingua Estrangeira Moderna - Inglês",
              "quantity": "1",
              "description": "Caderno pequeno - 48 folhas",
              "note": ""
            },
            {
              "category": "Lingua Estrangeira Moderna - Inglês",
              "quantity": "1",
              "description": "Minidicionário Português/Inglês - Inglês/Português",
              "note": ""
            }
          ]
        },
        {
          "name": "Material de Uso Pessoal e Diário",
          "rows": [
            {
              "category": "",
              "quantity": "",
              "description": "",
              "note": "Itens devidamente identificados"
            },
            {
              "category": "",
              "quantity": "1",
              "description": "Garrafa para água",
              "note": ""
            },
            {
              "category": "Penal (estojo), contendo:",
              "quantity": "1",
              "description": "Caneta azul",
              "note": ""
            },
            {
              "category": "Penal (estojo), contendo:",
              "quantity": "1",
              "description": "Caneta preta",
              "note": ""
            },
            {
              "category": "Penal (estojo), contendo:",
              "quantity": "1",
              "description": "Caneta vermelha",
              "note": ""
            },
            {
              "category": "Penal (estojo), contendo:",
              "quantity": "1",
              "description": "Lápis",
              "note": ""
            },
            {
              "category": "Penal (estojo), contendo:",
              "quantity": "1",
              "description": "Borracha",
              "note": ""
            },
            {
              "category": "Penal (estojo), contendo:",
              "quantity": "1",
              "description": "Marca texto",
              "note": ""
            }
          ]
        }
      ],
      "books": [
        {
          "discipline": "Ensino Religioso",
          "turma": "",
          "semester": "",
          "bimester": "",
          "image": null,
          "title": "",
          "isbn": "",
          "author": "",
          "publisher": "",
          "note": "Na escolha da Bíblia Sagrada, recomendamos <b>uma</b> das seguintes versões:"
        },
        {
          "discipline": "Ensino Religioso",
          "turma": "",
          "semester": "",
          "bimester": "",
          "image": "1fc80fdb0c88046e",
          "title": "Almeida Revista e Atualizada",
          "isbn": "",
          "author": "",
          "publisher": "",
          "note": "Escolha uma das versões"
        },
        {
          "discipline": "Ensino Religioso",
          "turma": "",
          "semester": "",
          "bimester": "",
          "image": "86eedec0b8914720",
          "title": "Nova Versão Internacional",
          "isbn": "",
          "author": "",
          "publisher": "",
          "note": "Escolha uma das versões"
        },
        {
          "discipline": "Ensino Religioso",
          "turma": "",
          "semester": "",
          "bimester": "",
          "image": "3b41012cdb4d0dd6",
          "title": "Nova Tradução na Linguagem de Hoje",
          "isbn": "",
          "author": "",
          "publisher": "",
          "note": "Escolha uma das versões"
        },
        {
          "discipline": "Ensino Religioso",
          "turma": "6º ano",
          "semester": "",
          "bimester": "3",
          "image": "86eedec0b8914720",
          "title": "Bíblia Sagrada: Evangelho de João",
          "isbn": "",
          "author": "",
          "publisher": "",
          "note": "Não é necessário comprar, pois a Bíblia já está solicitada na lista de materiais"
        },
        {
          "discipline": "Ensino Religioso",
          "turma": "7º ano",
          "semester": "",
          "bimester": "3",
          "image": "711f41796692f21a",
          "title": "O Diário mais legal do Mundo",
          "isbn": "978-8578607340",
          "author": "",
          "publisher": "Thomas Nelson",
          "note": ""
        },
        {
          "discipline": "Ensino Religioso",
          "turma": "8º ano",
          "semester": "",
          "bimester": "3",
          "image": "f76bd4d253dcc241",
          "title": "Louco Amor",
          "isbn": "978-8506060940",
          "author": "Francis Chan",
          "publisher": "Mundo Cristão",
          "note": ""
        },
        {
          "discipline": "Ensino Religioso",
          "turma": "9º ano",
          "semester": "",
          "bimester": "3",
          "image": "3d0e876df89979d5",
          "title": "As Crônicas de Nárnia - A Viagem do Peregrino 5ª ED",
          "isbn": "978-6555114997",
          "author": "C.S Lewis",
          "publisher": "HarperCollins",
          "note": ""
        },
        {
          "discipline": "Língua Portuguesa",
          "turma": "",
          "semester": "",
          "bimester": "",
          "image": null,
          "title": "",
          "isbn": "",
          "author": "",
          "publisher": "",
          "note": "Os professores de Língua Portuguesa procuram estimular o desenvolvimento da leitura dos alunos através de livros paradidáticos. Estes são selecionados de acordo com a faixa etária dos alunos, e são realizadas atividades relacionadas a eles.\n\n<b>Por isso solicitamos que sejam adquiridos os seguintes livros, de acordo com a série de cada aluno.</b>"
        },
        {
          "discipline": "Língua Portuguesa",
          "turma": "6º ano",
          "semester": "",
          "bimester": "1",
          "image": "6e05a804ded0df0e",
          "title": "20.000 Léguas Submarinas em Quadrinhos – (Um clássico de Júlio Verne)",
          "isbn": "",
          "author": "João Marcos e Will",
          "publisher": "Editora Nemo",
          "note": ""
        },
        {
          "discipline": "Língua Portuguesa",
          "turma": "6º ano",
          "semester": "",
          "bimester": "2",
          "image": "7e62ea20e754fd91",
          "title": "Aladim: Edição de Bolso de Luxo",
          "isbn": "978-8537818299",
          "author": "José Roberto O’Shea(Trad.)",
          "publisher": "Clássicos Zahar",
          "note": ""
        },
        {
          "discipline": "Língua Portuguesa",
          "turma": "6º ano",
          "semester": "",
          "bimester": "3",
          "image": "b965c92d12e7c1a3",
          "title": "A Ilha Perdida",
          "isbn": "978-8508173457",
          "author": "Maria José Dupré",
          "publisher": "Ática",
          "note": ""
        },
        {
          "discipline": "Língua Portuguesa",
          "turma": "6º ano",
          "semester": "",
          "bimester": "4",
          "image": "01c4b218959e4c7d",
          "title": "Os Meninos da Rua da Praia",
          "isbn": "978-8525400109",
          "author": "Sérgio Capparelli",
          "publisher": "L&PM",
          "note": ""
        },
        {
          "discipline": "Língua Portuguesa",
          "turma": "7º ano",
          "semester": "",
          "bimester": "1",
          "image": "8c1738b87e9a79b0",
          "title": "O Professor de Português Enlouqueceu de Vez",
          "isbn": "978-6555394771",
          "author": "Eliana Martins",
          "publisher": "Editora Melhoramentos",
          "note": ""
        },
        {
          "discipline": "Língua Portuguesa",
          "turma": "7º ano",
          "semester": "",
          "bimester": "2",
          "image": "386be9fcd1528d50",
          "title": "Aventura no Egito",
          "isbn": "978-8506068953",
          "author": "Elisabeth Loibl",
          "publisher": "Editora Melhoramentos",
          "note": ""
        },
        {
          "discipline": "Língua Portuguesa",
          "turma": "7º ano",
          "semester": "",
          "bimester": "3",
          "image": "d250fbbabebaf2fe",
          "title": "O Tesouro da Independência",
          "isbn": "978-6555394801",
          "author": "Luis Eduardo Matta",
          "publisher": "Editora Melhoramentos",
          "note": ""
        },
        {
          "discipline": "Língua Portuguesa",
          "turma": "7º ano",
          "semester": "",
          "bimester": "4",
          "image": "21397b9c069910a1",
          "title": "O Alienista (Quadrinhos) Baseado na obra de Machado de Assis",
          "isbn": "978-6559212644",
          "author": "Fábio Moon e Gabriel Bá",
          "publisher": "Companhia das Letras",
          "note": ""
        },
        {
          "discipline": "Língua Portuguesa",
          "turma": "8º ano",
          "semester": "",
          "bimester": "1",
          "image": "817f2e57b2b6f4ce",
          "title": "Poemas para Ler na Escola",
          "isbn": "978-8539004102",
          "author": "Mario Quintana",
          "publisher": "Editora Objetiva",
          "note": ""
        },
        {
          "discipline": "Língua Portuguesa",
          "turma": "8º ano",
          "semester": "",
          "bimester": "2",
          "image": "553c7a63555a94e8",
          "title": "Ilíada - Recortado por Nick McCarty ",
          "isbn": "978-8506060940",
          "author": "Luiz Antônio Aguiar(Trad.)",
          "publisher": "Editora Melhoramentos",
          "note": ""
        },
        {
          "discipline": "Língua Portuguesa",
          "turma": "8º ano",
          "semester": "",
          "bimester": "3",
          "image": "17176e911c879522",
          "title": "Crônicas 1",
          "isbn": "978-8508130627",
          "author": "Vários Autores",
          "publisher": "Editora Ática",
          "note": ""
        },
        {
          "discipline": "Língua Portuguesa",
          "turma": "8º ano",
          "semester": "",
          "bimester": "4",
          "image": "2f7ca5647d443943",
          "title": "A Revolução dos Bichos",
          "isbn": "978-8535909555",
          "author": "George Orwell",
          "publisher": "Companhia das Letras",
          "note": ""
        },
        {
          "discipline": "Língua Portuguesa",
          "turma": "9º ano",
          "semester": "",
          "bimester": "1",
          "image": "cb8536d6b7aa8e24",
          "title": "Vidas Secas",
          "isbn": "978-8501114785",
          "author": "Graciliano Ramos",
          "publisher": "Editora Record",
          "note": ""
        },
        {
          "discipline": "Língua Portuguesa",
          "turma": "9º ano",
          "semester": "",
          "bimester": "2",
          "image": "9c7836c976142a9a",
          "title": "A Batalha do Castelo",
          "isbn": "978-8516084509",
          "author": "Domingos Pellegrini",
          "publisher": "Editora Moderna",
          "note": ""
        },
        {
          "discipline": "Língua Portuguesa",
          "turma": "9º ano",
          "semester": "",
          "bimester": "3",
          "image": "9be8798ca5e2da41",
          "title": "A Caverna",
          "isbn": "978-8526025196",
          "author": "Toni Brandão",
          "publisher": "Global Editora",
          "note": ""
        },
        {
          "discipline": "Língua Portuguesa",
          "turma": "9º ano",
          "semester": "",
          "bimester": "4",
          "image": "84fe77221efa2b74",
          "title": "Maus (História Completa)",
          "isbn": "978-8535906288",
          "author": "Art Spiegelman",
          "publisher": "Editora Quadrinhos e Cia.",
          "note": ""
        }
      ],
      "assembly": [
        {
          "kind": "cover",
          "subtitle": "Ensino Fundamental II",
          "topColor": "#006b82",
          "bandColor": "#0a96a6",
          "logo": null
        },
        {
          "kind": "static",
          "label": "Folha de Rosto",
          "asset": "ee45cd86be5f696b"
        },
        {
          "kind": "static",
          "label": "Horário",
          "asset": "5176471e526a46b6"
        },
        {
          "kind": "static",
          "label": "Parceiros",
          "asset": "778f02cbf8590ace"
        },
        {
          "kind": "section",
          "section": "info",
          "title": "Informações Importantes"
        },
        {
          "kind": "section",
          "section": "list",
          "title": "Listas de Materiais"
        },
        {
          "kind": "section",
          "section": "book",
          "title": "Livros"
        },
        {
          "kind": "static",
          "label": "Quarta Capa",
          "asset": "f917b591c463d5fe"
        }
      ]
    }
  },
  {
    "slug": "ensino-medio",
    "name": "Ensino Médio (1º e 2º ano)",
    "sortOrder": 40,
    "year": 2026,
    "fileNameTemplate": "Lista de Materiais {ano} - {segmento}.pdf",
    "content": {
      "info": [
        {
          "title": "Material Bernoulli",
          "body": "O material didático utilizado na escola é do sistema de ensino da Bernoulli No Ensino Médio, ele consiste em livros físicos das disciplinas de Matemática, Português, História, Geografi a e Ciências. Serão entregues aos alunos quatro coleções, uma para cada bimestre. Existe também o acesso ao material em sua versão digital, disponível em formato e-book no portal da Bernoulli. O login e senha são fornecidos ao aluno pela instituição.\n<b>https://meu.bernoulli.com.br/login</b>",
          "note": "Esse material é adquirido e entregue pela instituição direto para o aluno, e seu valor está incluso na taxa\nde material."
        }
      ],
      "groups": [
        {
          "name": "Para todas as Matérias",
          "rows": [
            {
              "category": "",
              "quantity": "1",
              "description": "Caderno Universitário com 12 matérias ou fichário",
              "note": ""
            }
          ]
        },
        {
          "name": "Ensino Religioso",
          "rows": [
            {
              "category": "",
              "quantity": "1",
              "description": "Caderno pequeno ou folhas de ficheiro para anotações",
              "note": ""
            }
          ]
        },
        {
          "name": "Artes",
          "rows": [
            {
              "category": "",
              "quantity": "1",
              "description": "Pacote de folhas sulfi te A4",
              "note": ""
            },
            {
              "category": "",
              "quantity": "1",
              "description": "Caixa de lápis de cor",
              "note": ""
            },
            {
              "category": "",
              "quantity": "1",
              "description": "Cola bastão",
              "note": ""
            },
            {
              "category": "",
              "quantity": "1",
              "description": "Régua",
              "note": ""
            },
            {
              "category": "",
              "quantity": "1",
              "description": "Tesoura",
              "note": ""
            },
            {
              "category": "",
              "quantity": "1",
              "description": "Embalagem caneta hidrográfi ca (12 cores)",
              "note": ""
            }
          ]
        },
        {
          "name": "Material de Uso Pessoal e Diário",
          "rows": [
            {
              "category": "",
              "quantity": "",
              "description": "",
              "note": "Itens devidamente identificados"
            },
            {
              "category": "",
              "quantity": "1",
              "description": "Garrafa para água",
              "note": ""
            },
            {
              "category": "Penal (estojo), contendo:",
              "quantity": "1",
              "description": "Caneta azul",
              "note": ""
            },
            {
              "category": "Penal (estojo), contendo:",
              "quantity": "1",
              "description": "Caneta preta",
              "note": ""
            },
            {
              "category": "Penal (estojo), contendo:",
              "quantity": "1",
              "description": "Caneta vermelha",
              "note": ""
            },
            {
              "category": "Penal (estojo), contendo:",
              "quantity": "1",
              "description": "Lápis",
              "note": ""
            },
            {
              "category": "Penal (estojo), contendo:",
              "quantity": "1",
              "description": "Borracha",
              "note": ""
            },
            {
              "category": "Penal (estojo), contendo:",
              "quantity": "1",
              "description": "Marca texto",
              "note": ""
            }
          ]
        }
      ],
      "books": [
        {
          "discipline": "Ensino Religioso",
          "turma": "",
          "semester": "",
          "bimester": "",
          "image": null,
          "title": "",
          "isbn": "",
          "author": "",
          "publisher": "",
          "note": "Na escolha da Bíblia Sagrada, recomendamos <b>uma</b> das seguintes versões:"
        },
        {
          "discipline": "Ensino Religioso",
          "turma": "",
          "semester": "",
          "bimester": "",
          "image": "1fc80fdb0c88046e",
          "title": "Almeida Revista e Atualizada",
          "isbn": "",
          "author": "",
          "publisher": "",
          "note": "Escolha uma das versões"
        },
        {
          "discipline": "Ensino Religioso",
          "turma": "",
          "semester": "",
          "bimester": "",
          "image": "86eedec0b8914720",
          "title": "Nova Versão Internacional",
          "isbn": "",
          "author": "",
          "publisher": "",
          "note": "Escolha uma das versões"
        },
        {
          "discipline": "Ensino Religioso",
          "turma": "",
          "semester": "",
          "bimester": "",
          "image": "3b41012cdb4d0dd6",
          "title": "Nova Tradução na Linguagem de Hoje",
          "isbn": "",
          "author": "",
          "publisher": "",
          "note": "Escolha uma das versões"
        },
        {
          "discipline": "Ensino Religioso",
          "turma": "1º EM",
          "semester": "",
          "bimester": "3",
          "image": "0ea48250ff70913a",
          "title": "Ame o seu Próximo: A ètica Radical de Jesus",
          "isbn": "978-6586027365",
          "author": "Davi Lago",
          "publisher": "Mundo Cristão",
          "note": ""
        },
        {
          "discipline": "Ensino Religioso",
          "turma": "2º EM",
          "semester": "",
          "bimester": "3",
          "image": "898ee02816197a17",
          "title": "A Revolução Irresistível: Gente Comum, Vida Radical",
          "isbn": "978-8562877346",
          "author": "Shane Claiborne",
          "publisher": "Garimpo Editorial",
          "note": ""
        },
        {
          "discipline": "História",
          "turma": "2º EM",
          "semester": "",
          "bimester": "",
          "image": "2c8ae118e1790f17",
          "title": "1808: Edição Juvenil Ilustrada",
          "isbn": "978-8525060914",
          "author": "Laurentino Gomes",
          "publisher": "Globo Livros",
          "note": "Para os alunos do 2° Ano do Ensino Médio é pedido a aquisição deste livro. Este trabalho é realizado já no\n1° Bimestre, e tem como base o livro 1808, na versão JUVENIL"
        },
        {
          "discipline": "Língua Portuguesa",
          "turma": "1º EM",
          "semester": "",
          "bimester": "1",
          "image": "c28acc656df47811",
          "title": "O livro das semelhanças",
          "isbn": "",
          "author": "Ana Martins Marques",
          "publisher": "",
          "note": ""
        },
        {
          "discipline": "Língua Portuguesa",
          "turma": "1º EM",
          "semester": "",
          "bimester": "2",
          "image": "c2ebcd3d82d2aa6b",
          "title": "O Auto da Compadecida",
          "isbn": "",
          "author": "Ariano Suassuna",
          "publisher": "",
          "note": ""
        },
        {
          "discipline": "Língua Portuguesa",
          "turma": "1º EM",
          "semester": "",
          "bimester": "3",
          "image": "5e1c9de7a63001ce",
          "title": "Últimos Cantos",
          "isbn": "",
          "author": "Gonçalves Dias",
          "publisher": "",
          "note": ""
        },
        {
          "discipline": "Língua Portuguesa",
          "turma": "1º EM",
          "semester": "",
          "bimester": "4",
          "image": "7cda56e2c7e53f0e",
          "title": "Quarto de Despejo",
          "isbn": "",
          "author": "Carolina Maria de Jesus",
          "publisher": "",
          "note": ""
        },
        {
          "discipline": "Língua Portuguesa",
          "turma": "2º EM",
          "semester": "",
          "bimester": "1",
          "image": "9c85af079b936336",
          "title": "Dom Casmurro",
          "isbn": "",
          "author": "Machado de Assis",
          "publisher": "",
          "note": ""
        },
        {
          "discipline": "Língua Portuguesa",
          "turma": "2º EM",
          "semester": "",
          "bimester": "2",
          "image": "d680c09831e94198",
          "title": "Nove Noites",
          "isbn": "",
          "author": "Bernardo Carvalho",
          "publisher": "",
          "note": ""
        },
        {
          "discipline": "Língua Portuguesa",
          "turma": "2º EM",
          "semester": "",
          "bimester": "3",
          "image": "6f0b259ff0d62d45",
          "title": "Clara dos Anjos",
          "isbn": "",
          "author": "Lima Barreto",
          "publisher": "",
          "note": ""
        },
        {
          "discipline": "Língua Portuguesa",
          "turma": "2º EM",
          "semester": "",
          "bimester": "4",
          "image": "b9e0c8c5d890667c",
          "title": "Nihonjin",
          "isbn": "",
          "author": "Oscar Nakasato",
          "publisher": "",
          "note": ""
        }
      ],
      "assembly": [
        {
          "kind": "cover",
          "subtitle": "Ensino Médio (1ºEM e 2º EM)",
          "topColor": "#2f2f30",
          "bandColor": "#006b82",
          "logo": null
        },
        {
          "kind": "static",
          "label": "Folha de Rosto",
          "asset": "612eb4f1c601ddc8"
        },
        {
          "kind": "static",
          "label": "Horário",
          "asset": "3590db5d5a6474ec"
        },
        {
          "kind": "static",
          "label": "Parceiros",
          "asset": "778f02cbf8590ace"
        },
        {
          "kind": "section",
          "section": "info",
          "title": "Informações Importantes"
        },
        {
          "kind": "section",
          "section": "list",
          "title": "Listas de Materiais"
        },
        {
          "kind": "section",
          "section": "book",
          "title": "Livros"
        },
        {
          "kind": "static",
          "label": "Quarta Capa",
          "asset": "83810b3d481865d6"
        }
      ]
    }
  },
  {
    "slug": "ensino-medio-hunters",
    "name": "Ensino Médio Hunters",
    "sortOrder": 50,
    "year": 2026,
    "fileNameTemplate": "Lista de Materiais {ano} - {segmento}.pdf",
    "content": {
      "info": [
        {
          "title": "Material Bernoulli",
          "body": "O material didático utilizado na escola é do sistema de ensino da Bernoulli No Ensino Médio, ele consiste em livros físicos das disciplinas de Matemática, Português, História, Geografi a e Ciências. Serão entregues aos alunos quatro coleções, uma para cada bimestre. Existe também o acesso ao material em sua versão digital, disponível em formato e-book no portal da Bernoulli. O login e senha são fornecidos ao aluno pela instituição.\n<b>https://meu.bernoulli.com.br/login</b>",
          "note": "Esse material é adquirido e entregue pela instituição direto para o aluno, e seu valor está incluso na taxa\nde material."
        }
      ],
      "groups": [
        {
          "name": "Para todas as Matérias",
          "rows": [
            {
              "category": "",
              "quantity": "1",
              "description": "Caderno Universitário com 12 matérias ou fichário",
              "note": ""
            }
          ]
        },
        {
          "name": "Material de Uso Pessoal e Diário",
          "rows": [
            {
              "category": "",
              "quantity": "",
              "description": "",
              "note": "Itens devidamente identificados"
            },
            {
              "category": "",
              "quantity": "1",
              "description": "Garrafa para água",
              "note": ""
            },
            {
              "category": "Penal (estojo), contendo",
              "quantity": "1",
              "description": "Caneta azul",
              "note": ""
            },
            {
              "category": "Penal (estojo), contendo",
              "quantity": "1",
              "description": "Caneta preta",
              "note": ""
            },
            {
              "category": "Penal (estojo), contendo",
              "quantity": "1",
              "description": "Caneta vermelha",
              "note": ""
            },
            {
              "category": "Penal (estojo), contendo",
              "quantity": "1",
              "description": "Lápis",
              "note": ""
            },
            {
              "category": "Penal (estojo), contendo",
              "quantity": "1",
              "description": "Borracha",
              "note": ""
            },
            {
              "category": "Penal (estojo), contendo",
              "quantity": "1",
              "description": "Marca texto",
              "note": ""
            }
          ]
        }
      ],
      "books": [
        {
          "discipline": "Ensino Religioso",
          "turma": "",
          "semester": "",
          "bimester": "",
          "image": null,
          "title": "",
          "isbn": "",
          "author": "",
          "publisher": "",
          "note": "Na escolha da Bíblia Sagrada, recomendamos <b>uma</b> das seguintes versões:"
        },
        {
          "discipline": "Ensino Religioso",
          "turma": "",
          "semester": "",
          "bimester": "",
          "image": "1fc80fdb0c88046e",
          "title": "Almeida Revista e Atualizada",
          "isbn": "",
          "author": "",
          "publisher": "",
          "note": "Escolha uma das versões"
        },
        {
          "discipline": "Ensino Religioso",
          "turma": "",
          "semester": "",
          "bimester": "",
          "image": "86eedec0b8914720",
          "title": "Nova Versão Internacional",
          "isbn": "",
          "author": "",
          "publisher": "",
          "note": "Escolha uma das versões"
        },
        {
          "discipline": "Ensino Religioso",
          "turma": "",
          "semester": "",
          "bimester": "",
          "image": "3b41012cdb4d0dd6",
          "title": "Nova Tradução na Linguagem de Hoje",
          "isbn": "",
          "author": "",
          "publisher": "",
          "note": "Escolha uma das versões"
        },
        {
          "discipline": "Ensino Religioso",
          "turma": "",
          "semester": "",
          "bimester": "3",
          "image": "af01ad244d0dff23",
          "title": "O Deus Pródigo",
          "isbn": "978-85275008790",
          "author": "Timothy Keller",
          "publisher": "Editora Vida Nova",
          "note": ""
        }
      ],
      "assembly": [
        {
          "kind": "cover",
          "subtitle": "Hunters (3º EM)",
          "topColor": "#2f2f30",
          "bandColor": "#1f8399",
          "logo": "733ace0db014ccfa"
        },
        {
          "kind": "static",
          "label": "Folha de Rosto",
          "asset": "56b42d1d95652976"
        },
        {
          "kind": "static",
          "label": "Horário",
          "asset": "1683d852f51aa535"
        },
        {
          "kind": "static",
          "label": "Parceiros",
          "asset": "778f02cbf8590ace"
        },
        {
          "kind": "section",
          "section": "info",
          "title": "Informações Importantes"
        },
        {
          "kind": "section",
          "section": "list",
          "title": "Listas de Materiais"
        },
        {
          "kind": "section",
          "section": "book",
          "title": "Livros"
        },
        {
          "kind": "static",
          "label": "Quarta Capa",
          "asset": "44e42bde0f27c4cc"
        }
      ]
    }
  }
];
