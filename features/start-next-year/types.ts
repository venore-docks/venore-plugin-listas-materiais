import type { OperationResult } from "@venore/plugin-sdk";
import type { EditionRecord } from "../../contracts/types";

export type StartNextYearInput = { segmentId: string };
export type StartNextYearCommand = StartNextYearInput & { actorId: string };
export type StartNextYearResult = OperationResult<EditionRecord>;
