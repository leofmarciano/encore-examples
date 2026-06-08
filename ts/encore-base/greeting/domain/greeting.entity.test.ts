import { describe, expect, test } from "vitest";

import { Greeting } from "./greeting.entity";
import { Recipient } from "./recipient.vo";

// The domain is pure, so it tests with zero setup — no Encore, no I/O, no mocks.
describe("Greeting", () => {
  test("formats the message with recipient and visitor number", () => {
    const greeting = Greeting.create(Recipient.create("World"), 1);
    expect(greeting.message).toBe("Hello, World! You are visitor #1.");
    expect(greeting.visitorNumber).toBe(1);
  });

  test("rejects a non-positive visitor number", () => {
    expect(() => Greeting.create(Recipient.create("World"), 0)).toThrow();
  });
});

describe("Recipient", () => {
  test("trims and accepts a valid name", () => {
    expect(Recipient.create("  Ada  ").value).toBe("Ada");
  });

  test("rejects an empty name", () => {
    expect(() => Recipient.create("   ")).toThrow();
  });
});
