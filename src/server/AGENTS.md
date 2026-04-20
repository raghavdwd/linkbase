# BACKEND KNOWLEDGE BASE

**Generated:** 2026-04-04
**Parent:** `linkbase/`
**Domain:** tRPC Routers, Drizzle ORM, Better-auth, UploadThing

## OVERVIEW

The backend layer manages type-safe API procedures, database persistence, and secure authentication.

## STRUCTURE

```
src/server/
├── api/              # tRPC Layer
│   ├── routers/      # link, user, post, analytics, subscription
│   ├── root.ts       # Router aggregation (appRouter)
│   └── trpc.ts       # Context, Procedures, SuperJSON
├── better-auth/      # Auth Configuration (Better-auth)
├── db/               # Database Layer (Drizzle)
│   ├── schema/       # Table definitions
│   └── index.ts      # Client with dev-caching
└── uploadthing.ts    # File upload server config
```

## WHERE TO LOOK

| Task              | Location                  | Notes                       |
| :---------------- | :------------------------ | :-------------------------- |
| Add API Procedure | `src/server/api/routers/` | Register in `root.ts` after |
| Modify Context    | `src/server/api/trpc.ts`  | `createTRPCContext` factory |
| DB Schema Change  | `src/server/db/schema/`   | Run `pnpm db:generate`      |
| Auth Middleware   | `src/server/api/trpc.ts`  | `protectedProcedure`        |
| Session Helper    | `src/server/better-auth/` | `auth.api.getSession` usage |

## CONVENTIONS

- **Procedure Security**: Use `protectedProcedure` for any action requiring a user session.
- **Data Transformation**: Uses `superjson` for Date/Map/Set serialization over the wire.
- **Error Handling**: Custom `errorFormatter` handles Zod validation errors for the client.
- **Performance**: `timingMiddleware` is applied to all procedures for latency tracking.
- **Client Caching**: `globalForDb` pattern in `db/index.ts` prevents connection exhaustion in HMR.

## ANTI-PATTERNS

- **NEVER** use `publicProcedure` for mutations affecting user-owned data.
- **NEVER** bypass `.where()` in DB calls (enforced by ESLint).
- **NEVER** call `process.env` directly in routers; use verified `env` from `~/env`.
- **DO NOT** perform heavy computation in `createTRPCContext`; keep it for header/session parsing.
- **DO NOT** initialize multiple DB clients; use the exported `db` instance.
