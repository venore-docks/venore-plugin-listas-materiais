import type { OperationResult } from "@venore/plugin-sdk";
import type { EditionRecord } from "../../contracts/types";

export type ReviewDecision = "approve" | "reject";

export type ReviewEditionInput = {
  editionId: string;
  // Aprova exatamente a versão que a direção conferiu.
  expectedVersion: number;
  decision: ReviewDecision;
  // Obrigatório ao devolver (motivo aparece pra coordenação no editor).
  note?: string;
};
export type ReviewEditionCommand = ReviewEditionInput & { actorId: string };
export type ReviewEditionResult = OperationResult<EditionRecord>;
