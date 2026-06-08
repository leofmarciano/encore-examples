import { Recipient } from "./recipient.vo";

/**
 * Greeting — the core domain Entity.
 *
 * It owns the single business rule of this service: how a greeting message is
 * formed for a recipient and which visitor number they are. The constructor is
 * private so a Greeting can only be created through `create`, guaranteeing the
 * message is always well-formed.
 *
 * Pure domain: depends on nothing but another domain type (the Recipient VO).
 */
export class Greeting {
  private constructor(
    public readonly recipient: string,
    public readonly message: string,
    public readonly visitorNumber: number,
  ) {}

  static create(recipient: Recipient, visitorNumber: number): Greeting {
    if (!Number.isInteger(visitorNumber) || visitorNumber < 1) {
      throw new Error("visitorNumber must be a positive integer.");
    }
    const message = `Hello, ${recipient.value}! You are visitor #${visitorNumber}.`;
    return new Greeting(recipient.value, message, visitorNumber);
  }
}
