import type { OperationResult } from "@venore/plugin-sdk";

// confirmName: o nome do segmento digitado pela pessoa — apaga todos os anos de uma vez.
export type DeleteSegmentInput = { segmentId: string; confirmName: string };
export type DeleteSegmentCommand = { segmentId: string; confirmName: string; actorId: string };
export type DeleteSegmentResult = OperationResult<{ name: string; editions: number }>;
