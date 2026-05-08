# Scale Kit

Production-ready enterprise SaaS foundation built as a **[Turborepo](https://turbo.build/) monorepo** with a Next.js application at its core.

This repository is **not** a generic dashboard theme. It is an evolving codebase meant to showcase **scalable SaaS architecture**: multi-tenancy, strong auth and authorization patterns, modular features, and patterns you would expect in real products—not tutorial demos.

---

## Audience

Anyone reviewing this repo—including **senior engineers and hiring teams**—should be able to see:

- deliberate system design choices for a **multi-tenant B2B SaaS**
- separation of concerns and **feature-based** organization
- **production-minded** tooling (lint, types, CI direction, testing strategy as we add them)
- clarity on **what is done today** versus **what is planned**

---

## Vision

Deliver a codebase that proves understanding of:

- scalable frontend architecture
- multi-tenant SaaS constraints (isolation, billing, auditing)
- enterprise patterns (RBAC, organizations, subscriptions, integrations)
- clean architecture boundaries (domain vs application vs infrastructure vs presentation)

We prioritize **maintainability, modularity, and developer experience**. We deliberately avoid flashy-only UI and random folder layouts.

---

## Current status

| Area                                                                             | Status                                                                                                                   |
| -------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| Monorepo (npm workspaces + Turborepo)                                            | Implemented                                                                                                              |
| App shell: [`apps/web`](./apps/web) (Next.js App Router + TypeScript + Tailwind) | Implemented                                                                                                              |
| Shared `packages/*`                                                              | In progress: `@scale-kit/tsconfig`, `@scale-kit/eslint-config`, `@scale-kit/utils` (`packages/ui`, `auth`, etc. planned) |
| Backend: Prisma / PostgreSQL, Better Auth, billing, RBAC…                        | Planned—see roadmap below                                                                                                |

**Stack today (pinned in workspaces):**

- Next.js **16**, React **19**, TypeScript **5**, Tailwind **4**, shared ESLint (Next preset via `@scale-kit/eslint-config`), Prettier, Husky + lint-staged

The roadmap below is the project’s stated direction; implementations will land incrementally behind focused PRs.

---

## What we are building (roadmap)

This section is the **north star** for scope—not a promise that every item ships at once.

### Product & platform foundations

| Topic                         | Scope                                                                                                                                           |
| ----------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| **Authentication**            | Email/password flows, verification, forgot/reset password, sessions, optional social login, multi-session-aware UX                              |
| **Multi-tenant architecture** | Organizations as tenants; subdomain-style mental model (`company.scale-kit.example`); isolated users, billing, settings, audit where applicable |
| **RBAC**                      | Roles (Owner, Admin, Manager, Support, User) and a reusable permission engine—not scattered `if` checks                                         |
| **Organizations & teams**     | Create org, invites, accept flow, membership, ownership transfer, org switcher                                                                  |

### Monetization & product controls

| Topic                   | Scope                                                                                                                             |
| ----------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| **Billing abstraction** | Provider interface (e.g. `createCheckout`, `cancelSubscription`, `getInvoices`) with adapters for Stripe / Lemon Squeezy / Paddle |
| **Subscription plans**  | Free / Pro / Enterprise with limits (features, seats, API usage, storage)                                                         |
| **Feature flags**       | Toggle features per plan, tenant, or rollout cohort                                                                               |

### Operations, trust, and integrations

| Topic             | Scope                                                                                         |
| ----------------- | --------------------------------------------------------------------------------------------- |
| **Notifications** | In-app, realtime channels, transactional email triggers                                       |
| **Audit logs**    | Immutable-style trail of sensitive actions with actor, time, IP, device, organization context |
| **API keys**      | Issue, revoke, scope by permission, usage tracking                                            |

### UX surface (application)

Landing pages plus app surfaces (marketing, dashboards, billing, settings, notifications, audit, feature flags, API keys, etc.) will grow as features land.

### Cross-cutting systems

| Topic                    | Scope                                                                                                                       |
| ------------------------ | --------------------------------------------------------------------------------------------------------------------------- |
| **AI-ready layout**      | Dedicated areas (e.g. `services/ai/`) for future assistants, summaries, search—without painting the whole app into a corner |
| **Realtime**             | Notifications, live dashboard slices, activity/presence where product needs it                                              |
| **Errors & logging**     | Global boundaries, structured errors, audit-oriented logging hooks                                                          |
| **Internationalization** | English + Arabic with RTL and locale routing                                                                                |
| **Theming**              | Light / dark / system                                                                                                       |
| **File uploads**         | Validated uploads with storage abstraction (S3, Cloudinary, UploadThing, etc.)                                              |
| **Search**               | Global / debounced / server-filtered patterns                                                                               |

### Engineering quality

- **Testing:** Vitest, React Testing Library, Playwright (tiers by risk)
- **CI:** GitHub Actions (lint, typecheck, test, build)
- **Developer hygiene:** ESLint/Prettier, Husky/lint-staged (configured at repo root)

### Optional / later

Plugins, microfrontends, webhooks marketplace-style ideas, workflows—explicitly deferred until the core SaaS backbone is credible.

---

## Target architecture (intent)

The repo will converge toward:

- **Feature modules** under something like `src/modules/<feature>/` inside the app package (components, hooks, services, schemas, server actions/types as appropriate)
- **Clean-ish layering:** domain rules → application use cases → infrastructure adapters → presentation
- **Sharable libraries** under `packages/` (`ui`, `auth`, shared types/utils, ESLint/tsconfig bases)

Exact folder names may evolve slightly; conventions will stay documented here as they stabilize.

---

## Repository layout (today)

```
.
├── apps/
│   └── web/                 # Next.js application (App Router, `src/app`)
├── packages/
│   ├── eslint-config/       # @scale-kit/eslint-config (flat + eslint-config-next)
│   ├── tsconfig/            # @scale-kit/tsconfig (base + nextjs JSON)
│   └── utils/               # @scale-kit/utils (shared TS; build → dist/)
├── package.json             # Root workspaces + Turborepo scripts
├── turbo.json               # Pipeline: dev (persistent), build, lint
└── package-lock.json        # Single lockfile at repo root (npm workspaces)
```

---

## Prerequisites

- **Node.js** 22.x (project developed against current LTS line; align team on `.nvmrc` / `.node-version` when added)
- **npm** aligned with **`packageManager`** in root `package.json` (currently `npm@11.6.x`). **[Corepack](https://nodejs.org/api/corepack.html)** is recommended: `corepack enable`

This repository is configured for **npm**, not Yarn or pnpm, so contributors should use **`npm`** from the root.

---

## Getting started

```bash
# install all workspace dependencies from repository root
npm install

# start dev for all workspaces that define "dev"
npm run dev
```

By default Turborepo runs the **`web`** app’s Next dev server (see [`apps/web`](./apps/web)). Open the URL printed in the terminal (typically `http://localhost:3000`).

Other root scripts:

| Script                 | Meaning              |
| ---------------------- | -------------------- |
| `npm run dev`          | `turbo dev`          |
| `npm run build`        | `turbo build`        |
| `npm run lint`         | `turbo lint`         |
| `npm run format`       | `prettier --write .` |
| `npm run format:check` | `prettier --check .` |

### Monorepo note (Next.js + lockfile)

The `web` app’s production build sets `NEXT_IGNORE_INCORRECT_LOCKFILE=1` to avoid a known Next.js lockfile-patching edge case when `package-lock.json` lives at the **monorepo root** while the app runs from **`apps/web`**. Dependencies remain installed via **root** `npm install`; do not add a second lockfile under `apps/web`.

---

## Package manager policy

The root `packageManager` field pins npm for reproducible installs. Using **Yarn** or **pnpm** against this tree without migrating workspaces and lockfiles will conflict with that contract—stick to **npm** unless the team explicitly migrates and updates this README.

---

## Contributing & change style

- Prefer **small, reviewable changes** with clear intent (one concern per PR when possible).
- Match existing patterns before introducing new abstractions.
- When adding a major vertical (auth, billing, tenants), update this README’s **Current status** table so visitors stay oriented.
