CREATE SCHEMA "listas_materiais";
--> statement-breakpoint
CREATE TABLE "listas_materiais"."edition_events" (
	"id" text PRIMARY KEY NOT NULL,
	"edition_id" text NOT NULL,
	"action" text NOT NULL,
	"actor_id" text NOT NULL,
	"note" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "listas_materiais"."editions" (
	"id" text PRIMARY KEY NOT NULL,
	"segment_id" text NOT NULL,
	"year" integer NOT NULL,
	"status" text DEFAULT 'draft' NOT NULL,
	"content" jsonb NOT NULL,
	"version" integer DEFAULT 1 NOT NULL,
	"review_note" text,
	"approved_revision_id" text,
	"published_revision_id" text,
	"published_pdf_media_id" text,
	"published_at" timestamp with time zone,
	"updated_by" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "listas_editions_status_check" CHECK ("listas_materiais"."editions"."status" in ('draft', 'in_review', 'approved', 'published'))
);
--> statement-breakpoint
CREATE TABLE "listas_materiais"."revisions" (
	"id" text PRIMARY KEY NOT NULL,
	"edition_id" text NOT NULL,
	"number" integer NOT NULL,
	"content" jsonb NOT NULL,
	"approved_by" text NOT NULL,
	"approved_at" timestamp with time zone DEFAULT now() NOT NULL,
	"pdf_media_id" text
);
--> statement-breakpoint
CREATE TABLE "listas_materiais"."segments" (
	"id" text PRIMARY KEY NOT NULL,
	"slug" text NOT NULL,
	"name" text NOT NULL,
	"sort_order" integer DEFAULT 0 NOT NULL,
	"file_name_template" text DEFAULT 'Lista de Materiais {ano} - {segmento}.pdf' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "segments_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
ALTER TABLE "listas_materiais"."edition_events" ADD CONSTRAINT "edition_events_edition_id_editions_id_fk" FOREIGN KEY ("edition_id") REFERENCES "listas_materiais"."editions"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "listas_materiais"."editions" ADD CONSTRAINT "editions_segment_id_segments_id_fk" FOREIGN KEY ("segment_id") REFERENCES "listas_materiais"."segments"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "listas_materiais"."revisions" ADD CONSTRAINT "revisions_edition_id_editions_id_fk" FOREIGN KEY ("edition_id") REFERENCES "listas_materiais"."editions"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "listas_edition_events_edition_idx" ON "listas_materiais"."edition_events" USING btree ("edition_id","created_at");--> statement-breakpoint
CREATE UNIQUE INDEX "listas_editions_segment_year_idx" ON "listas_materiais"."editions" USING btree ("segment_id","year");--> statement-breakpoint
CREATE UNIQUE INDEX "listas_revisions_edition_number_idx" ON "listas_materiais"."revisions" USING btree ("edition_id","number");