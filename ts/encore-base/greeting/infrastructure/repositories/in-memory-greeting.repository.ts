import type { Greeting } from "../../domain/greeting.entity";
import type { GreetingRepositoryPort } from "../../domain/ports/greeting-repository.port";

/**
 * Driven adapter: an in-memory implementation of the greeting repository port.
 * Replace it with an Encore `SQLDatabase`-backed adapter and the domain and
 * application layers are untouched.
 */
export class InMemoryGreetingRepository implements GreetingRepositoryPort {
  private readonly store: Greeting[] = [];

  async save(greeting: Greeting): Promise<void> {
    this.store.push(greeting);
  }

  async total(): Promise<number> {
    return this.store.length;
  }

  async findRecent(limit: number): Promise<readonly Greeting[]> {
    return this.store.slice(-limit).reverse();
  }
}
