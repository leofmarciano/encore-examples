import type { Greeting } from "../greeting.entity";

/**
 * GreetingRepositoryPort — a driven (secondary) port.
 *
 * The domain DEFINES this persistence boundary; infrastructure PROVIDES an
 * adapter for it. Application use-cases depend on this interface, never on a
 * concrete implementation — this is what keeps the core swappable (in-memory
 * today, an Encore `SQLDatabase` tomorrow) without touching business logic.
 */
export interface GreetingRepositoryPort {
  save(greeting: Greeting): Promise<void>;
  total(): Promise<number>;
}
