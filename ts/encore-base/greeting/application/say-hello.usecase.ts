import { Greeting } from "../domain/greeting.entity";
import type { GreetingRepositoryPort } from "../domain/ports/greeting-repository.port";
import { Recipient } from "../domain/recipient.vo";

/** Input/output DTOs are co-located with the use-case (the `appliesTo: class` rule ignores them). */
export interface SayHelloInput {
  name: string;
}
export interface SayHelloOutput {
  message: string;
  visitor: number;
}

/**
 * SayHelloUseCase — application orchestration for greeting a recipient.
 *
 * It validates input via the domain (Recipient VO), derives the visitor number,
 * builds the Greeting entity, and persists it through the repository PORT. It
 * depends only on the domain — never on infrastructure or Encore — so it can be
 * unit-tested with a fake repository in milliseconds.
 */
export class SayHelloUseCase {
  constructor(private readonly greetings: GreetingRepositoryPort) {}

  async execute(input: SayHelloInput): Promise<SayHelloOutput> {
    const recipient = Recipient.create(input.name);
    const visitor = (await this.greetings.total()) + 1;
    const greeting = Greeting.create(recipient, visitor);
    await this.greetings.save(greeting);
    return { message: greeting.message, visitor };
  }
}
