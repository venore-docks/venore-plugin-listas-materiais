import type { OperationResult } from "@venore/plugin-sdk";
import type { EditionRecord, SegmentRecord } from "../../contracts/types";

export type CreateSegmentInput = { name: string; year: number };
export type CreateSegmentCommand = CreateSegmentInput & { actorId: string };
export type CreateSegmentResult = OperationResult<{ segment: SegmentRecord; edition: EditionRecord }>;
