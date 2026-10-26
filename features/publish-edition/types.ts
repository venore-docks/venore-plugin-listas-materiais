import type { OperationResult } from "@venore/plugin-sdk";
import type { EditionRecord } from "../../contracts/types";

export type PublishEditionInput = { editionId: string };
export type PublishEditionCommand = PublishEditionInput & { actorId: string };
// skipped: páginas fixas sem arquivo que ficaram de fora (o PDF sai mesmo assim, com aviso).
export type PublishEditionResult = OperationResult<{ edition: EditionRecord; skipped: string[] }>;
