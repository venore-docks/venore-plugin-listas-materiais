import type { OperationResult } from "@venore/plugin-sdk";

// image = capa de livro (coordenação); pdf = página fixa da montagem (marketing).
export type EditionFileKind = "image" | "pdf";

export type UploadEditionFileInput = {
  kind: EditionFileKind;
  filename: string;
  contentType: string;
  size: number;
  data: Buffer;
};

export type UploadedEditionFile = { id: string; url: string; filename: string };
export type UploadEditionFileResult = OperationResult<UploadedEditionFile>;
