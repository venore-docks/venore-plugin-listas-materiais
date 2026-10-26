import type { OperationResult } from "@venore/plugin-sdk";
import type { EditionStatus, SegmentRecord } from "../../contracts/types";

export type EditionSummary = {
  id: string;
  year: number;
  status: EditionStatus;
  updatedAt: Date;
  publishedAt: Date | null;
  hasPublishedPdf: boolean;
};

// Edições do ano mais recente primeiro.
export type SegmentOverview = SegmentRecord & { editions: EditionSummary[] };

export type ListSegmentsResult = OperationResult<SegmentOverview[]>;
