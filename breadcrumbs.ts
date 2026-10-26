import type { BreadcrumbSegmentDefinition } from "@venore/plugin-sdk";
import { staticBreadcrumbSegment } from "@venore/plugin-sdk";

export const listasMateriaisBreadcrumbSegments: BreadcrumbSegmentDefinition[] = [
  staticBreadcrumbSegment({ key: "listas-materiais.admin", segments: ["admin", "listas-materiais"], label: "Listas de materiais" }),
];
