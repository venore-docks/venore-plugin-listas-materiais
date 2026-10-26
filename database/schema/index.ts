import { sql } from "drizzle-orm";
import { check, index, integer, jsonb, pgSchema, text, timestamp, uniqueIndex } from "drizzle-orm/pg-core";
import type { EditionContent } from "../../contracts/types";

export const listasMateriaisSchema = pgSchema("listas_materiais");

// Segmento = um PDF por ano (Educação Infantil, Ensino Fundamental I…). fileNameTemplate era
// pacote_final.nome_arquivo_final do config.json antigo ({ano} e {segmento} substituídos no download).
export const listasSegments = listasMateriaisSchema.table("segments", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  slug: text("slug").notNull().unique(),
  name: text("name").notNull(),
  sortOrder: integer("sort_order").notNull().default(0),
  fileNameTemplate: text("file_name_template").notNull().default("Lista de Materiais {ano} - {segmento}.pdf"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

// Edição = segmento × ano letivo. `content` é o documento editável inteiro (contracts/types.ts) e
// `version` é o lock otimista do salvar (duas abas/pessoas editando não se sobrescrevem em silêncio).
// Ids de mídia e de usuário são texto solto, sem FK pra media/auth (plugin nunca FK em outro schema).
export const listasEditions = listasMateriaisSchema.table(
  "editions",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    segmentId: text("segment_id")
      .notNull()
      .references(() => listasSegments.id, { onDelete: "cascade" }),
    year: integer("year").notNull(),
    status: text("status").notNull().default("draft"),
    content: jsonb("content").$type<EditionContent>().notNull(),
    version: integer("version").notNull().default(1),
    // Motivo da devolução pela direção — limpo no próximo envio.
    reviewNote: text("review_note"),
    approvedRevisionId: text("approved_revision_id"),
    publishedRevisionId: text("published_revision_id"),
    publishedPdfMediaId: text("published_pdf_media_id"),
    publishedAt: timestamp("published_at", { withTimezone: true }),
    updatedBy: text("updated_by"),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [
    uniqueIndex("listas_editions_segment_year_idx").on(table.segmentId, table.year),
    check("listas_editions_status_check", sql`${table.status} in ('draft', 'in_review', 'approved', 'published')`),
  ],
);

// Revisão = cópia congelada do conteúdo no momento da aprovação. O PDF publicado sai sempre de uma
// revisão (nunca do rascunho vivo), então o que a direção aprovou é exatamente o que vai pro ar.
export const listasRevisions = listasMateriaisSchema.table(
  "revisions",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    editionId: text("edition_id")
      .notNull()
      .references(() => listasEditions.id, { onDelete: "cascade" }),
    number: integer("number").notNull(),
    content: jsonb("content").$type<EditionContent>().notNull(),
    approvedBy: text("approved_by").notNull(),
    approvedAt: timestamp("approved_at", { withTimezone: true }).notNull().defaultNow(),
    pdfMediaId: text("pdf_media_id"),
  },
  (table) => [uniqueIndex("listas_revisions_edition_number_idx").on(table.editionId, table.number)],
);

// Histórico (quem salvou/enviou/aprovou/devolveu/publicou e quando) mostrado na aba Histórico.
export const listasEditionEvents = listasMateriaisSchema.table(
  "edition_events",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    editionId: text("edition_id")
      .notNull()
      .references(() => listasEditions.id, { onDelete: "cascade" }),
    action: text("action").notNull(),
    actorId: text("actor_id").notNull(),
    note: text("note"),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [index("listas_edition_events_edition_idx").on(table.editionId, table.createdAt)],
);
