/**
 * Recipient — a Value Object for "who is being greeted".
 *
 * Value objects are immutable, equal by value, and self-validating: an instance
 * can only exist if it is valid. Construction goes through `create`, which is the
 * single place the invariant (non-empty, bounded length) is enforced.
 *
 * Pure domain: no framework, no I/O, no Encore — trivially unit-testable.
 */
export class Recipient {
  private constructor(public readonly value: string) {}

  static create(raw: string): Recipient {
    const name = raw.trim();
    if (name.length === 0) {
      throw new Error("Recipient name must not be empty.");
    }
    if (name.length > 64) {
      throw new Error("Recipient name must be at most 64 characters.");
    }
    return new Recipient(name);
  }

  equals(other: Recipient): boolean {
    return this.value === other.value;
  }
}
