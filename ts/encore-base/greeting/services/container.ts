import { CheckHealthUseCase } from "../application/check-health.usecase";
import { GetVersionUseCase } from "../application/get-version.usecase";
import { SayHelloUseCase } from "../application/say-hello.usecase";
import { InMemoryGreetingRepository } from "../infrastructure/repositories/in-memory-greeting.repository";

/**
 * Composition root for the greeting service.
 *
 * This is the ONE place allowed to know about concrete adapters: it instantiates
 * infrastructure and injects it into application use-cases, then exposes them
 * ready to use. The Encore handlers (the api layer) import these instances and
 * stay thin — no `new`, no infrastructure imports, just `useCase.execute(...)`.
 */
const greetingRepository = new InMemoryGreetingRepository();

export const sayHelloUseCase = new SayHelloUseCase(greetingRepository);
export const getVersionUseCase = new GetVersionUseCase();
export const checkHealthUseCase = new CheckHealthUseCase();
