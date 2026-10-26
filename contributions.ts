import type { PluginContributions } from "@venore/plugin-sdk";
import { listasMateriaisBreadcrumbSegments } from "./breadcrumbs";
import { listasMateriaisSeeds } from "./seeds";

export const listasMateriaisContributions: PluginContributions = {
  breadcrumbSegments: listasMateriaisBreadcrumbSegments,
  seeds: listasMateriaisSeeds,
};
