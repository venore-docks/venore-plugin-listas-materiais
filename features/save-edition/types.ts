import type { OperationResult } from "@venore/plugin-sdk";
import type { EditionContent, EditionRecord } from "../../contracts/types";

export type SaveEditionInput = {
  editionId: string;
  // Versão que o editor carregou — se outra pessoa salvou no meio tempo, recusa em vez de sobrescrever.
  expectedVersion: number;
  content: unknown;
};

export type SaveEditionCommand = {
  editionId: string;
  expectedVersion: number;
  content: EditionContent;
  actorId: string;
  canEditContent: boolean;
  canEditAssembly: boolean;
};

export type SaveEditionResult = OperationResult<EditionRecord>;
