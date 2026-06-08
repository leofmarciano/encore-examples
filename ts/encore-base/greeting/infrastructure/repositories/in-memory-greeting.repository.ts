import type { Greeting } from "../../domain/greeting.entity";
import type { GreetingRepositoryPort } from "../../domain/ports/greeting-repository.port";

/**
 * InMemoryGreetingRepository — a driven adapter implementing the repository port.
 *
 * This is the only place that knows HOW greetings are stored. Replace it with an
 * Encore `SQLDatabase`-backed adapter and nothing in the domain or application
 * layers changes — that is the payoff of depending on the port, not the detail.
 */
export class InMemoryGreetingRepository implements GreetingRepositoryPort {
  private readonly greetings: Greeting[] = [];

  async save(greeting: Greeting): Promise<void> {
    this.greetings.push(greeting);
  }

  async total(): Promise<number> {
    return this.greetings.length;
  }
}
