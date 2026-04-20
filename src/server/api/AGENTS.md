# tRPC API KNOWLEDGE BASE

**Generated:** 2026-04-04
**Scope:** `src/server/api/` (T3 tRPC Layer)

## OVERVIEW

End-to-end typesafe API layer using tRPC v11 with domain-driven routers and auth-guarded procedures.

## STRUCTURE

```
src/server/api/
├── root.ts             # AppRouter definition — merges 5 domain routers
├── trpc.ts             # Context factory, router creator, auth middleware
└── routers/            # Domain-specific procedures
    ├── link.ts         # Profile link management (CRUD)
    ├── user.ts         # Profile settings and metadata
    ├── post.ts         # Content/update management
    ├── analytics.ts    # Link clicks and visitor tracking
    └── subscription.ts # Razorpay integration (WIP: checkout/verify)
```

## WHERE TO LOOK

| Symbol               | File      | Role                                                         |
| :------------------- | :-------- | :----------------------------------------------------------- |
| `appRouter`          | `root.ts` | Central aggregation point for all sub-routers                |
| `createTRPCContext`  | `trpc.ts` | Context setup: injects `db`, `session`, and `headers`        |
| `protectedProcedure` | `trpc.ts` | Auth-guarded procedure (throws `UNAUTHORIZED` if no session) |
| `publicProcedure`    | `trpc.ts` | Unauthenticated base procedure                               |
| `timingMiddleware`   | `trpc.ts` | Performance logger (logs start, end, and waitMs)             |
| `createCaller`       | `root.ts` | Factory for server-side internal procedure calls             |

## CONVENTIONS

- **Router Pattern**: Each domain file in `routers/` exports a `createTRPCRouter({})` object.
- **Middleware Chain**: `protectedProcedure` uses `.use()` to verify `ctx.session` before execution.
- **Server-side calls**: Use `createCaller` from `root.ts` for internal procedure invocation (e.g., from RSC).
- (General conventions — superjson, errorFormatter, timingMiddleware — defined in parent `../AGENTS.md`.)

## ANTI-PATTERNS

- **NEVER** hardcode Razorpay secrets in `subscription.ts`. Use the validated `env` object.
- **AVOID** deep nesting in routers. Keep procedures flat; delegate complex logic to `~/lib/` helpers.
- **DO NOT** add new routers without registering them in `root.ts`.
