// Mocks do SDK do core para rodar os serviços do plugin contra um Postgres em memória (PGlite) —
// mesmo esquema de venore-plugin-tests/tests/integration/mocks.ts.
import { createHash } from "node:crypto";
import fs from "node:fs";
import { PGlite } from "@electric-sql/pglite";
import { drizzle } from "drizzle-orm/pglite";

const client = new PGlite();
export const db = drizzle(client);

export async function applyMigrations(dir: string) {
  const files = fs.readdirSync(dir).filter((name) => name.endsWith(".sql")).sort();
  for (const file of files) {
    const sql = fs.readFileSync(`${dir}/${file}`, "utf8");
    for (const statement of sql.split("--> statement-breakpoint")) {
      if (statement.trim()) await client.exec(statement);
    }
  }
}

export type TestUser = { id: string; name: string | null; email: string };
export const state: { current: TestUser | null; users: TestUser[]; permissions: Set<string>; uploads: { filename: string; categoryKey: string }[]; failUploads: boolean } = {
  current: null,
  users: [],
  permissions: new Set(),
  uploads: [],
  failUploads: false,
};

export const getCurrentUser = async () => ({ success: true as const, data: state.current });
export const listUsers = async () => ({ success: true as const, data: state.users.map((user) => ({ ...user, status: "approved" })) });

// Igual ao core: array = qualquer uma das permissions (OR).
export const authorizeActor = async (permission: string | string[]) => {
  const wanted = Array.isArray(permission) ? permission : [permission];
  return state.current && wanted.some((key) => state.permissions.has(key))
    ? { authorized: true as const, actorId: state.current.id }
    : { authorized: false as const, error: { code: "rbac.authorization.forbidden", message: "sem permissão" } };
};

export const uploadReservedCategoryAsset = async (input: { filename: string; categoryKey: string; data?: Buffer }) => {
  if (state.failUploads) throw new Error("Vercel Blob: This store has been suspended.");
  state.uploads.push({ filename: input.filename, categoryKey: input.categoryKey });
  const id = `media-${state.uploads.length}`;
  mediaState.assets.set(id, {
    id,
    checksum: createHash("sha256").update(input.data ?? Buffer.alloc(0)).digest("hex"),
    accessPermission: "listas-materiais.read",
    deletedAt: null,
  });
  return { success: true as const, data: { id, url: `/api/media/asset/${id}`, filename: input.filename } };
};

export const beginOperation = () => ({});
export const endOperation = () => {};
export const staticBreadcrumbSegment = (input: unknown) => input;
export const isPluginActive = async () => true;

// Mídia em memória pro teste da higiene de arquivos: o id "media-N" do upload vira asset com checksum.
export const mediaState: { assets: Map<string, { id: string; checksum: string; accessPermission: string; deletedAt: Date | null }>; deleted: string[] } = {
  assets: new Map(),
  deleted: [],
};
export const getMediaAssetForTrustedReview = async ({ id }: { id: string }) => {
  const asset = mediaState.assets.get(id);
  return asset ? { success: true as const, data: asset } : { success: false as const, error: { code: "media.not_found", message: "" } };
};
export const deleteMediaSafely = async ({ id }: { id: string; confirmed?: boolean }) => {
  const asset = mediaState.assets.get(id);
  if (asset) asset.deletedAt = new Date();
  mediaState.deleted.push(id);
  return { success: true as const, data: { id } };
};
