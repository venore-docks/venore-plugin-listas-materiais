import type { OperationResult } from "@venore/plugin-sdk";

export type DeleteEditionInput = { editionId: string };
export type DeleteEditionCommand = DeleteEditionInput & { actorId: string };
// segmentId pra tela voltar pra lista de segmentos (ou pro ano que sobrou).
export type DeleteEditionResult = OperationResult<{ segmentId: string; year: number }>;
