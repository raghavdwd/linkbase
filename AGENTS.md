# PROJECT KNOWLEDGE BASE

**Generated:** 2026-04-04
**Commit:** e55a0ef (`feat: add dynamic origin display in Hero and PhoneMockup components`)
**Branch:** main

## OVERVIEW

Linkbase — link-in-bio platform. T3 Stack: Next.js 15 (App Router) + TypeScript 5 + tRPC v11 + Drizzle ORM + Better-auth + Tailwind v4 + shadcn/ui.

## STRUCTURE

```
linkbase/
├── src/
│   ├── app/              # Next.js App Router — pages, layouts, API routes
│   ├── components/ui/    # shadcn/ui primitives (12 components, no barrel)
│   ├── server/           # Backend: tRPC routers, DB, auth
│   ├── trpc/             # tRPC client/SSR bridge
│   ├── lib/              # Shared utilities (utils, uploadthing)
│   ├── styles/           # Global CSS (Tailwind v4 @theme)
│   └── env.js            # Runtime env validation (@t3-oss/env-nextjs)
├── drizzle/              # Drizzle migrations + meta
├── drizzle.config.ts     # Drizzle kit config
├── next.config.js        # Imports env.js — build fails if env invalid
├── eslint.config.js      # Flat config + drizzle safety rules
├── prettier.config.js    # tailwindcss plugin only
└── components.json       # shadcn/ui config (references missing tailwind.config.ts)
```

## WHERE TO LOOK

| Task               | Location                            | Notes                                |
| ------------------ | ----------------------------------- | ------------------------------------ |
| Add/edit page      | `src/app/<route>/page.tsx`          | Next.js App Router convention        |
| Add API endpoint   | `src/app/api/`                      | Route handlers (tRPC, auth, uploads) |
| Add tRPC procedure | `src/server/api/routers/`           | Then register in `root.ts`           |
| DB schema change   | `src/server/db/schema/`             | Run `pnpm db:generate` after         |
| Auth config        | `src/server/better-auth/`           | Better-auth setup                    |
| UI component       | `src/components/ui/`                | shadcn primitives, no barrel index   |
| Landing page       | `src/app/_components/landing-page/` | Composed in root page                |
| Dashboard          | `src/app/dashboard/`                | Authenticated user area              |
| Public profile     | `src/app/[username]/`               | Dynamic route                        |

## CODE MAP

| Symbol               | Type      | Location                 | Role                                          |
| -------------------- | --------- | ------------------------ | --------------------------------------------- |
| `appRouter`          | const     | `src/server/api/root.ts` | Root tRPC router — aggregates all sub-routers |
| `createTRPCContext`  | const     | `src/server/api/trpc.ts` | tRPC context factory (db, session, headers)   |
| `protectedProcedure` | const     | `src/server/api/trpc.ts` | Auth-guarded tRPC procedure                   |
| `publicProcedure`    | const     | `src/server/api/trpc.ts` | Unauthenticated tRPC procedure                |
| `db`                 | const     | `src/server/db/index.ts` | Drizzle client (dev-cached via globalForDb)   |
| `TRPCProvider`       | component | `src/trpc/react.tsx`     | Client-side tRPC React provider               |
| `HydrateClient`      | component | `src/trpc/server.ts`     | RSC hydration wrapper                         |
| `RootLayout`         | component | `src/app/layout.tsx`     | App-level layout with all providers           |

## CONVENTIONS

- **Import alias**: `~/*` → `./src/*` (tsconfig)
- **Type imports**: `prefer: "type-imports", fixStyle: "inline-type-imports"` (ESLint)
- **Unused args**: Prefix with `_` to suppress (`argsIgnorePattern: "^_"`)
- **Drizzle safety**: `delete`/`update` MUST have `.where()` — ESLint errors if missing
- **No barrel exports** for `components/ui/` — each component imported directly
- **env.js** is `.js` not `.ts` — intentional for T3 runtime validation

## ANTI-PATTERNS (THIS PROJECT)

- **NEVER** commit `.env` — contains live secrets (DB, OAuth, API keys). Use `.env.example`
- **NEVER** use `process.env.RAZORPAY_*` with fallback placeholders — throw config error
- **NEVER** call tRPC procedures without `.where()` on DB mutations
- **DO NOT** add barrel index to `components/ui/` without updating all imports
- **DO NOT** expose server-only env vars to client — use `env.server` vs `env.client` split

## UNIQUE STYLES

- Tailwind v4 uses `@import "tailwindcss"` + `@theme` blocks (no `tailwind.config.ts`)
- `components.json` references `tailwind.config.ts` which is **missing** — Tailwind v4 CSS-first config works without it
- `next.config.js` imports `src/env.js` at top — build fails if env validation fails (set `SKIP_ENV_VALIDATION` to bypass)
- `images.remotePatterns` uses wildcard `**` — permissive, tighten for production
- `start-database.sh` parses `DATABASE_URL` via awk/sed — brittle, mutates `.env` in-place

## COMMANDS

```bash
pnpm dev              # Dev server (Turbopack)
pnpm build            # Production build
pnpm start            # Production server
pnpm lint             # ESLint
pnpm typecheck        # tsc --noEmit
pnpm format:write     # Prettier
pnpm db:push          # Push schema to DB (no migrations)
pnpm db:generate      # Generate migration files
pnpm db:migrate       # Run pending migrations
pnpm db:studio        # Drizzle Studio (visual DB)
./start-database.sh   # Start local Postgres via Docker
```

## NOTES

- **No test infrastructure** — no jest, vitest, playwright, or `__tests__` directories
- **No CI/CD** — no `.github/workflows/`, no Dockerfile
- **pnpm** is the package manager (fingerprint-locked in package.json)
- **2 files >500 lines** — check before editing large components
- **Payment flow incomplete** — Razorpay integration has TODOs in `subscription.ts` and `pricing-card.tsx`
