import { describe, expect, test } from "vitest";

import type { Greeting } from "../domain/greeting.entity";
import type { GreetingRepositoryPort } from "../domain/ports/greeting-repository.port";
import { SayHelloUseCase } from "./say-hello.usecase";

// Because the use-case depends on a PORT, we test it with a hand-rolled fake —
// no database, no Encore runtime, no framework. This is the testability dividend
// of Clean Architecture.
class FakeGreetingRepository implements GreetingRepositoryPort {
  readonly saved: Greeting[] = [];
  async save(greeting: Greeting): Promise<void> {
    this.saved.push(greeting);
  }
  async total(): Promise<number> {
    return this.saved.length;
  }
}

describe("SayHelloUseCase", () => {
  test("greets the recipient and assigns the next visitor number", async () => {
    const repo = new FakeGreetingRepository();
    const useCase = new SayHelloUseCase(repo);

    const first = await useCase.execute({ name: "Ada" });
    expect(first).toEqual({ message: "Hello, Ada! You are visitor #1.", visitor: 1 });

    const second = await useCase.execute({ name: "Linus" });
    expect(second.visitor).toBe(2);
    expect(repo.saved).toHaveLength(2);
  });

  test("rejects an invalid recipient", async () => {
    const useCase = new SayHelloUseCase(new FakeGreetingRepository());
    await expect(useCase.execute({ name: "" })).rejects.toThrow();
  });
});
