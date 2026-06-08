import { api } from "encore.dev/api";

import {
  checkHealthUseCase,
  getVersionUseCase,
  sayHelloUseCase,
} from "./services/container";

// The api layer (Encore handlers). Handlers stay deliberately thin: they adapt
// HTTP <-> use-case and nothing more. All business logic lives in the use-cases
// they delegate to, which keeps this layer free of `new`, of infrastructure
// imports, and of branching.

interface HelloResponse {
  message: string;
  visitor: number;
}

// GET /hello/:name — greet a recipient and count the visit.
//   curl http://localhost:4000/hello/World
export const hello = api(
  { expose: true, method: "GET", path: "/hello/:name" },
  async ({ name }: { name: string }): Promise<HelloResponse> => {
    return sayHelloUseCase.execute({ name });
  },
);

interface VersionResponse {
  name: string;
  version: string;
}

// GET /version — the application name and version.
//   curl http://localhost:4000/version
export const version = api(
  { expose: true, method: "GET", path: "/version" },
  async (): Promise<VersionResponse> => {
    return getVersionUseCase.execute();
  },
);

interface HealthResponse {
  status: "ok";
  service: string;
}

// GET /health — a liveness probe.
//   curl http://localhost:4000/health
export const health = api(
  { expose: true, method: "GET", path: "/health" },
  async (): Promise<HealthResponse> => {
    return checkHealthUseCase.execute();
  },
);
