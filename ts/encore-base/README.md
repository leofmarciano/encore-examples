# Clean Architecture Starter (encore-base)

A tiny Encore.ts service — `hello`, `version`, `health` — built as a **complete,
textbook Clean Architecture** reference, with every architectural rule enforced
automatically by [ArchContract](https://www.npmjs.com/package/arch-contract).

The behavior is intentionally trivial. The point is the **structure**: domain at
the center, dependencies pointing inward, infrastructure swappable behind ports,
handlers kept thin — and a CI check that fails the build the moment any of that
drifts.

## Prerequisites

**Install Encore:**
- **macOS:** `brew install encoredev/tap/encore`
- **Linux:** `curl -L https://encore.dev/install.sh | bash`
- **Windows:** `iwr https://encore.dev/install.ps1 | iex`

## Create app

Create a local app from this template:

```bash
encore app create my-app-name --example=ts/encore-base
```

## Run app locally

Run this command from your application's root folder:

```bash
encore run
```

## Using the API

```bash
curl http://localhost:4000/hello/World
# { "message": "Hello, World! You are visitor #1.", "visitor": 1 }

curl http://localhost:4000/version
# { "name": "encore-base", "version": "1.0.0" }

curl http://localhost:4000/health
# { "status": "ok", "service": "greeting" }
```

### Local Development Dashboard

While `encore run` is running, open [http://localhost:9400/](http://localhost:9400/)
for Encore's local developer dashboard — traces, the architecture diagram, and the
API explorer.

## Architecture

Each Encore service is a vertical slice of Clean Architecture. Dependencies only
ever point **inward** (toward the domain):

```
greeting/
├── encore.service.ts                  # service boundary (Encore)
├── greeting.ts                        # api — thin Encore handlers, delegate only
├── services/
│   └── container.ts                   # composition root — the only place that `new`s adapters
├── domain/                            # the center: no framework, no I/O, no Encore
│   ├── greeting.entity.ts             #   entity (business rules)
│   ├── recipient.vo.ts                #   value object (self-validating)
│   ├── app-info.ts                    #   domain constant
│   └── ports/
│       └── greeting-repository.port.ts#   driven port (interface the domain owns)
├── application/                       # use-cases — orchestrate the domain via ports
│   ├── say-hello.usecase.ts
│   ├── get-version.usecase.ts
│   └── check-health.usecase.ts
└── infrastructure/                    # adapters — implement the ports
    └── repositories/
        └── in-memory-greeting.repository.ts
```

**The dependency rule, made concrete:**

- **domain** depends on nothing. Pure TypeScript — instantiate and test it with zero setup.
- **application** (use-cases) depends only on the domain, and only through **ports** — never on a concrete adapter.
- **infrastructure** implements the ports. Swap the in-memory repository for an Encore `SQLDatabase` adapter and the domain/application layers don't change.
- **api** (Encore handlers) stay thin: they translate HTTP ⇄ use-case and nothing else. No `new`, no infrastructure imports.
- **composition root** (`services/container.ts`) is the single place that wires concrete adapters into use-cases.

### Architecture tests

The contract above isn't a convention you have to remember — it's enforced. This
project ships an [`arch-contract.yaml`](./arch-contract.yaml) that activates the
AAA-quality built-in `encore-ts` preset and layers strict Clean Architecture
rules on top:

```bash
npm install
npm run arch:check
```

It verifies, among other things, that the domain never imports outward, use-cases
never touch infrastructure, every use-case is a `*UseCase` class with `execute()`,
repository ports are interfaces, concrete repositories implement a port, and the
Encore handlers stay thin. Wire it into CI and architectural drift fails the build.

### Unit tests

Because the core is pure and depends on ports, the domain and use-cases test in
milliseconds with no database and no Encore runtime — see the `*.test.ts` files.

```bash
npm test
```

## Development

### Add a new service

Create a new directory with an `encore.service.ts` and at least one API. Mirror the
same `domain / application / infrastructure` layering inside it.
Learn more: https://encore.dev/docs/ts/primitives/services

### Add a database

Replace the in-memory adapter with an Encore `SQLDatabase`-backed repository that
implements `GreetingRepositoryPort` — nothing in the domain or application layers
changes. Learn more: https://encore.dev/docs/ts/primitives/databases

## Deployment

Deploy to Encore's free development cloud with `git push encore`, or self-host with
`encore build docker`. See https://encore.dev/docs/ts/deploy.
