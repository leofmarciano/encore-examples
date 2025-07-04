<p align="center" dir="auto">
<a href="https://encore.dev"><img src="https://user-images.githubusercontent.com/78424526/214602214-52e0483a-b5fc-4d4c-b03e-0b7b23e012df.svg" width="160px" alt="encore icon"></img></a><br/><br/>
<b>Encore Templates</b><br/>
Templates to help you build backend applications with <a href="https://github.com/encoredev/encore">Encore</a>.
</p>

## Template types

This repo contains two types of templates:

- **Starters:** Runnable Encore applications to use as they are or to take inspiration from.
- **Bits:** Small re-usable parts solving common development patterns or integrating Encore applications with
  third-party APIs and services.

## Prerequisite: Install Encore

If this is the first time you're using Encore, you first need to install the CLI that runs the local development
environment. Use the appropriate command for your system:

- **macOS:** `brew install encoredev/tap/encore`
- **Linux:** `curl -L https://encore.dev/install.sh | bash`
- **Windows:** `iwr https://encore.dev/install.ps1 | iex`

## Starters

Create a local app from a template by running:

```bash
encore app create [app-name] --example=[folder-name]
```

E.g. `encore app create my-app --example=ts/hello-world`

### TypeScript starters

| Name                                                             | Description                                                                                                              | Primitives                                                             |
|------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------|
| [ts/hello-world](ts/hello-world)                                 | REST API Starter                                                                                                         | APIs                                                                   |
| [ts/saas-starter](ts/saas-starter)                               | SaaS Starter (Encore.ts backend, Next.js frontend, Clerk, Stripe)                                                        | Microservices, APIs, Auth, SQL, Frontend
| [ts/mcp-example](ts/mcp-example)                                 | MCP Server Starter (build your own MCP server)
| [ts/ai-chat](ts/ai-chat)                                         | LLM chat application which let's you create and chat with personalized bots. Integrates with OpenAI, Anthropic and Slack | Microservices, APIs, SQL Database, Pub/Sub, External Requests, Configs |
| [ts/streaming](ts/streaming)                                     | Examples of the different WebSocket Streaming APIs                                                                       | Streaming API, Static Endpoint, Frontend                               |
| [ts/react-starter](ts/react-starter)                             | Encore + React Web App Starter                                                                                           | APIs, Frontend                                                         |
| [ts/nextjs-starter](ts/nextjs-starter)                           | Encore + Next.js Web App Starter                                                                                         | Microservices, APIs, Frontend                                          |
| [https://github.com/encoredev/nextjs-starter/](nextjs-starter) † | Encore + Next.js Web App Starter (separate dependencies)                                                                 | Microservices, APIs, Frontend                                          |
| [ts/graphql](ts/graphql)                                         | Apollo GraphQL Server Starter                                                                                            | APIs, GraphQL                                                          |
| [ts/streaming-chat](ts/streaming-chat)                           | Simple Chat app using the Streaming API to create a WebSocket stream                                                     | Streaming API, Static Endpoint, Frontend                               |
| [ts/simple-event-driven](ts/simple-event-driven)                 | Simple Event-Driven Application                                                                                          | Microservices, SQL Database, Pub/Sub, Secrets                          |
| [ts/uptime](ts/uptime)                                           | Event-Driven Architecture Starter (Uptime Monitor)                                                                       | Microservices, SQL Databases, Pub/Sub, Cron Jobs                       |
| [ts/gpt-functions](ts/gpt-functions)                             | ChatGPT Functions with Encore Example                                                                                    | APIs                                                                   |
| [ts/url-shortener](ts/url-shortener)                             | Basic url shortener                                                                                                      | APIs, SQL Database                                                     |
| [ts/nestjs](ts/nestjs)                                           | Encore + NestJS Example                                                                                                  | APIs, SQL Database, Auth                                               |
| [ts/slack-bot](ts/slack-bot)                                     | Slack Bot Starter                                                                                                        | APIs, Raw Endpoint                                                     |
| [ts/auth0-react-sdk](ts/auth0-react-sdk)                         | Auth0 React SDK Authentication + Encore Example                                                                          | APIs, Auth, Frontend                                                   |
| [ts/clerk](ts/clerk)                                             | Clerk React SDK Authentication + Encore Example                                                                          | APIs, Auth, Frontend                                                   |
| [ts/supabase](ts/supabase)                                       | Supabase Authentication + Encore Example                                                                                 | APIs, Auth, Frontend                                                   |
| [ts/elevenlabs](ts/elevenlabs)                                   | ElevenLabs AI Speech SDK + Encore Example                                                                                | APIs, Raw Endpoints, Frontend                                          |
| [ts/sequelize](ts/sequelize)                                     | Encore + Sequelize TypeScript Example                                                                                    | APIs, SQL Database                                                     |
| [ts/drizzle](ts/drizzle)                                         | Encore + Drizzle TypeScript Example                                                                                      | APIs, SQL Database                                                     |
| [ts/knex](ts/knex)                                               | Encore + Knex TypeScript Example                                                                                         | APIs, SQL Database                                                     |
| [ts/prisma](ts/prisma)                                           | Encore + Prisma TypeScript Example                                                                                       | APIs, SQL Database                                                     |
| [ts/expressjs-migration](ts/expressjs-migration)                 | Express.js migration guide examples                                                                                      | APIs, Raw Endpoints, Auth, Databases                                   |
| [ts/file-upload](ts/file-upload)                                 | Upload files from frontend example                                                                                       | Raw Endpoints                                                          |
| [ts/static-files](ts/static-files)                               | Serving static files example                                                                                             | Static Endpoints                                                       |
| [ts/middleware](ts/middleware)                                   | Rate limiting and Authorization middleware examples                                                                      | APIs, Auth, Middleware                                                           |
| [ts/template-engine](ts/template-engine)                         | Using a templating engine                                                                                                | Raw Endpoints, Static Endpoints                                        |

### Go starters

| Name                                       | Description                                                                                                                         | Primitives                                                                                  |
| ------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| [hello-world](hello-world)                 | REST API Starter                                                                                                                    | APIs                                                                                        |
| [sql-database](sql-database)               | PostgreSQL database Starter                                                                                                         | APIs, SQL Database                                                                          |
| [ai-chat](ai-chat)                         | LLM chat room application which let's you create and chat with personalized bots. Integrates with OpenAI, Gemini, Slack and Discord | Microservices, APIs, SQL Database, Pub/Sub, Cron Jobs, Frontend, External Requests, Configs |
| [assembly-ai](assemblyai-starter)          | AssemblyAI Starter - Conversational Intelligence app that lets you upload and transcribe voice data.                                | APIs, SQL Database, Frontend, External Requests, Configs                                    |
| [slack-bot](slack-bot)                     | Slack Bot Starter                                                                                                                   | APIs, Webhooks                                                                              |
| [trello-clone](trello-clone)               | Microservices Starter (Trello Clone)                                                                                                | Microservices, APIs, SQL Database                                                           |
| [uptime](uptime)                           | Event-Driven Architecture Starter (Uptime Monitor)                                                                                  | Microservices, SQL Databases, Pub/Sub, Cron Jobs                                            |
| [graphql](graphql)                         | GraphQL Server Starter                                                                                                              | APIs, SQL Database, GraphQL                                                                 |
| [url-shortener](url-shortener)             | Basic url shortener                                                                                                                 | APIs, SQL Database                                                                          |
| [sqlc-database](sqlc-database)             | Simple sqlc implementation                                                                                                          | APIs, SQL Database                                                                          |
| [next-starter](nextjs-starter)             | Next.js + Encore Web App Starter                                                                                                    | APIs, Auth, Frontend                                                                        |
| [next-auth0-starter](nextjs-auth0-starter) | Next.js + Auth0 + Encore Web App Starter                                                                                            | Microservices, APIs, Auth, Frontend                                                         |
| [react-starter](react-starter)             | React + Encore Web App Starter                                                                                                      | APIs, Auth, Frontend                                                                        |
| [booking-system](booking-system)           | Appointment Booking System Starter using data scrubbing and sqlc                                                                    | Microservices, APIs, Auth, SQL Database, Frontend                                           |
| [meeting-notes](meeting-notes)             | Meeting Notes App deployed to GitHub Pages                                                                                          | APIs, SQL Database, External Requests                                                       |
| [auth0](auth0)                             | Auth0 Authentication + React + Encore Example                                                                                       | APIs, Auth, Frontend                                                                        |
| [auth0-react-sdk](auth0-react-sdk)         | Auth0 React SDK Authentication + Encore Example                                                                                     | APIs, Auth, Frontend                                                                        |
| [clerk](clerk)                             | Clerk React SDK Authentication + Encore Example                                                                                     | APIs, Auth, Frontend                                                                        |
| [firebase-auth](firebase-auth)             | Firebase Authentication + Encore Example                                                                                            | APIs, Auth, Frontend                                                                        |
| [logto-react-sdk](logto-react-sdk)         | Logto React SDK Authentication + Encore Example                                                                                     | APIs, Auth, Frontend                                                                        |

† = Cannot be installed using `encore app create --example`, create an empty app and clone the repo instead.

## Bits

### Go Bits

The [bits](bits) sub-folder contains reusable code samples that can be copied directly into your own application.

| Name                          | Description                                                                          | Primitives             | Requirements                                                                              |
|-------------------------------|--------------------------------------------------------------------------------------|------------------------|-------------------------------------------------------------------------------------------|
| [elevenlabs](bits/elevenlabs) | Getting text to speech from [ElevenLabs](https://elevenlabs.io/) generative voice AI | APIs, Secrets          | [ElevenLabs API key](https://docs.elevenlabs.io/api-reference/quick-start/authentication) |
| [pexels](bits/pexels)         | Searching and retrieving photos and videos from [Pexels](https://www.pexels.com/)    | APIs, Secrets          | [Pexels API key](https://www.pexels.com/api/)                                             |
| [sendgrid](bits/sendgrid)     | Asynchronous sending emails via [SendGrid](https://sendgrid.com/)                    | APIs, Secrets, Pub/Sub | [SendGrid API key](https://docs.sendgrid.com/ui/account-and-settings/api-keys)            |

## Contribute your templates

Contribute a template by submitting a Pull Request to
the [Open Source Examples Repo](https://github.com/encoredev/examples): `https://github.com/encoredev/examples`

### Submitting Starters

Follow these steps to submit a **Starter**:

1. Fork the repo.
2. Create a new folder in the root directory of the repo, this is where you will place your template. Use a short folder
   name as your template will be installable via the CLI, like
   so: `encore app create APP-NAME --example=<TEMPLATE_FOLDER_NAME>`
3. Include a `README.md` with instructions for how to use the template. We recommend
   following [this format](https://github.com/encoredev/examples/blob/8c7e33243f6bfb1b2654839e996e9a924dcd309e/uptime/README.md).

Once your Pull Request has been approved, it may be featured on the [Templates page](https://encore.dev/templates) on the Encore website.

### Submitting Bits

Follow these steps to submit your **Bits**:

1. Fork the repo.
2. Create a new folder inside the `bits` folder in the repo and place your template inside it. Use a short folder name
   as your template will soon be installable via the CLI.
3. Include a `README.md` with instructions for how to use the template.

Once your Pull Request has been approved, it may be featured on the [Templates page](https://encore.dev/templates) on the Encore website.

### Dynamic Encore AppID

In most cases, you should avoid hardcoding an `AppID` in your template's source code. Instead, use the
notation `{{ENCORE_APP_ID}}`.

When a developer creates an app using the template, `{{ENCORE_APP_ID}}` will be dymically replaced with their new and
unique `AppID`, meaning they will not need to make any manual code adjustments.
