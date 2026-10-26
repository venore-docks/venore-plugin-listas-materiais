"use server";

import { revalidatePath } from "next/cache";
import { isPluginActive } from "@venore/plugin-sdk";
import {
  createSegment,
  deleteEdition,
  deleteSegment,
  publishEdition,
  reviewEdition,
  saveEdition,
  startNextYear,
  submitEdition,
  uploadEditionFile,
} from "../../index";
import type { EditionFileKind, EditionRecord, ReviewDecision } from "../../index";

// Toda action passa pelo handler do barrel (authorizeActor lá dentro) — nenhuma escreve sem sessão
// autorizada (src/app/server-actions-authorization.test.ts do core).
export type ListasActionResult<T = undefined> = { ok: true; data: T } | { ok: false; error: string };

const BASE_PATH = "/admin/listas-materiais";
const PLUGIN_DISABLED_ERROR = "O plugin Listas de materiais está desabilitado.";

async function pluginDisabled(): Promise<boolean> {
  return !(await isPluginActive("listas-materiais"));
}

function revalidateEdition(editionId: string) {
  revalidatePath(BASE_PATH);
  revalidatePath(`${BASE_PATH}/${editionId}`);
}

export async function saveEditionAction(
  editionId: string,
  expectedVersion: number,
  content: unknown,
): Promise<ListasActionResult<EditionRecord>> {
  if (await pluginDisabled()) return { ok: false, error: PLUGIN_DISABLED_ERROR };
  const result = await saveEdition({ editionId, expectedVersion, content });
  if (!result.success) return { ok: false, error: result.error.message };
  revalidateEdition(editionId);
  return { ok: true, data: result.data };
}

export async function submitEditionAction(editionId: string, expectedVersion: number): Promise<ListasActionResult> {
  if (await pluginDisabled()) return { ok: false, error: PLUGIN_DISABLED_ERROR };
  const result = await submitEdition({ editionId, expectedVersion });
  if (!result.success) return { ok: false, error: result.error.message };
  revalidateEdition(editionId);
  return { ok: true, data: undefined };
}

export async function reviewEditionAction(
  editionId: string,
  expectedVersion: number,
  decision: ReviewDecision,
  note: string,
): Promise<ListasActionResult> {
  if (await pluginDisabled()) return { ok: false, error: PLUGIN_DISABLED_ERROR };
  const result = await reviewEdition({ editionId, expectedVersion, decision, note });
  if (!result.success) return { ok: false, error: result.error.message };
  revalidateEdition(editionId);
  return { ok: true, data: undefined };
}

export async function publishEditionAction(editionId: string): Promise<ListasActionResult<{ skipped: string[] }>> {
  if (await pluginDisabled()) return { ok: false, error: PLUGIN_DISABLED_ERROR };
  const result = await publishEdition({ editionId });
  if (!result.success) return { ok: false, error: result.error.message };
  revalidateEdition(editionId);
  return { ok: true, data: { skipped: result.data.skipped } };
}

export async function startNextYearAction(segmentId: string): Promise<ListasActionResult<{ editionId: string; year: number }>> {
  if (await pluginDisabled()) return { ok: false, error: PLUGIN_DISABLED_ERROR };
  const result = await startNextYear({ segmentId });
  if (!result.success) return { ok: false, error: result.error.message };
  revalidatePath(BASE_PATH);
  return { ok: true, data: { editionId: result.data.id, year: result.data.year } };
}

export async function createSegmentAction(name: string, year: number): Promise<ListasActionResult<{ editionId: string }>> {
  if (await pluginDisabled()) return { ok: false, error: PLUGIN_DISABLED_ERROR };
  const result = await createSegment({ name, year });
  if (!result.success) return { ok: false, error: result.error.message };
  revalidatePath(BASE_PATH);
  return { ok: true, data: { editionId: result.data.edition.id } };
}

export async function uploadEditionFileAction(
  formData: FormData,
): Promise<ListasActionResult<{ id: string; url: string; filename: string }>> {
  if (await pluginDisabled()) return { ok: false, error: PLUGIN_DISABLED_ERROR };
  const file = formData.get("file");
  const kind = formData.get("kind") === "pdf" ? "pdf" : ("image" satisfies EditionFileKind);
  if (!(file instanceof File) || file.size === 0) return { ok: false, error: "Selecione um arquivo." };

  const result = await uploadEditionFile({
    kind,
    filename: file.name,
    contentType: file.type,
    size: file.size,
    data: Buffer.from(await file.arrayBuffer()),
  });
  if (!result.success) return { ok: false, error: result.error.message };
  return { ok: true, data: result.data };
}

export async function deleteEditionAction(editionId: string): Promise<ListasActionResult<{ year: number }>> {
  if (await pluginDisabled()) return { ok: false, error: PLUGIN_DISABLED_ERROR };
  const result = await deleteEdition({ editionId });
  if (!result.success) return { ok: false, error: result.error.message };
  revalidatePath(BASE_PATH);
  return { ok: true, data: { year: result.data.year } };
}

export async function deleteSegmentAction(segmentId: string, confirmName: string): Promise<ListasActionResult<{ name: string }>> {
  if (await pluginDisabled()) return { ok: false, error: PLUGIN_DISABLED_ERROR };
  const result = await deleteSegment({ segmentId, confirmName });
  if (!result.success) return { ok: false, error: result.error.message };
  revalidatePath(BASE_PATH);
  return { ok: true, data: { name: result.data.name } };
}
