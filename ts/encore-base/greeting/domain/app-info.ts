/**
 * Application identity — surfaced by the `version` endpoint.
 *
 * A small, framework-free domain constant. Kept in the domain so the version
 * use-case depends only on the core, never on a framework or build tool.
 */
export const APP_INFO = {
  name: "encore-base",
  version: "1.0.0",
} as const;
