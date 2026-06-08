export interface HealthOutput {
  status: "ok";
  service: string;
}

/** CheckHealthUseCase — a trivial liveness probe, kept in the application layer for consistency. */
export class CheckHealthUseCase {
  async execute(): Promise<HealthOutput> {
    return { status: "ok", service: "greeting" };
  }
}
