import type { OperationResult } from "@venore/plugin-sdk";
import type { EditionEventRecord, EditionRecord, SegmentRecord } from "../../contracts/types";

export type GetEditionInput = { editionId: string };

export type EditionEventView = EditionEventRecord & { actorName: string };

export type EditionView = {
  segment: SegmentRecord;
  edition: EditionRecord;
  events: EditionEventView[];
  approvedRevisionNumber: number | null;
  publishedRevisionNumber: number | null;
  // Outros anos do mesmo segmento (seletor de ano no editor), mais recente primeiro.
  siblingYears: { id: string; year: number }[];
};

export type GetEditionResult = OperationResult<EditionView>;
