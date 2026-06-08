import { APP_INFO } from "../domain/app-info";

export interface VersionOutput {
  name: string;
  version: string;
}

/** GetVersionUseCase — returns the application identity. Pure, dependency-free. */
export class GetVersionUseCase {
  async execute(): Promise<VersionOutput> {
    return { name: APP_INFO.name, version: APP_INFO.version };
  }
}
