import type { EventPublisherPort } from "../../application/ports/event-publisher.port";
import type { DomainEvent } from "../../domain/events/domain-event";

/**
 * Driven adapter: collects published domain events in memory. Swap for an Encore
 * Pub/Sub `Topic` adapter to broadcast events across services — the use-cases
 * that depend on `EventPublisherPort` don't change.
 */
export class InMemoryEventPublisher implements EventPublisherPort {
  private readonly published: DomainEvent[] = [];

  async publishAll(events: readonly DomainEvent[]): Promise<void> {
    this.published.push(...events);
  }
}
