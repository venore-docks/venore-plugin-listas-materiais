import { authorizeActor } from "@venore/plugin-sdk/rbac";
import { LISTAS_PERMISSIONS } from "../../shared/permissions";
import { failure } from "../../shared/results";
import { slugify } from "../../shared/slugify";
import { createSegment } from "./service";
import type { CreateSegmentInput, CreateSegmentResult } from "./types";

export async function createSegmentHandler(input: CreateSegmentInput): Promise<CreateSegmentResult> {
  const name = input.name?.trim() ?? "";
  if (!name || name.length > 120 || !slugify(name)) {
    return failure("invalid_name", "Informe o nome do segmento (até 120 caracteres).");
  }
  if (!Number.isInteger(input.year) || input.year < 2000 || input.year > 2200) {
    return failure("invalid_year", "Ano letivo inválido.");
  }

  const authz = await authorizeActor(LISTAS_PERMISSIONS.design);
  if (!authz.authorized) return { success: false, error: authz.error };
  return createSegment({ name, year: input.year, actorId: authz.actorId });
}
