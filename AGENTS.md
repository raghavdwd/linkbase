# AGENTS.md

This file provides guidance for agentic coding systems working in this repository.

## Project Overview

This is a **T3 Stack** project using Next.js 15, tRPC, Drizzle ORM, Better-Auth, and Tailwind CSS. The project uses pnpm as package manager and follows TypeScript strict mode.

## Commands

### Development

```bash
pnpm dev           # Start dev server with Turbo
pnpm build         # Build for production
pnpm start         # Start production server
pnpm preview       # Build and preview
```

### Code Quality

```bash
pnpm lint          # Run ESLint
pnpm lint:fix      # Run ESLint with auto-fix
pnpm typecheck     # Run TypeScript type checking (noEmit)
pnpm check         # Run both lint and typecheck (comprehensive check)
```

### Formatting

```bash
pnpm format:check  # Check code formatting with Prettier
pnpm format:write  # Format code with Prettier
```

### Database

```bash
pnpm db:generate   # Generate Drizzle migrations
pnpm db:migrate    # Run Drizzle migrations
pnpm db:push       # Push schema changes directly
pnpm db:studio     # Open Drizzle Studio
```

### Testing

No test suite is configured in this project.

## Code Style Guidelines

### Import Organization

**Order:**

1. Third-party libraries (React, Next.js, external packages)
2. Local imports using `~/` alias (points to `src/` directory)
3. Type-only imports where possible

**Pattern:**

```typescript
import { useState } from "react";
import { z } from "zod";
import { api } from "~/trpc/react";
import { Button } from "~/components/ui/button";
import type { Session } from "~/server/better-auth/config";
```

**ESLint Rule:** `@typescript-eslint/consistent-type-imports` enforced with inline type imports.

### File Naming

- **Components & Utilities:** kebab-case (`link-editor.tsx`, `theme-selector.tsx`)
- **React Components:** PascalCase (`Button`, `LinkCard`)
- **Next.js Routes:** `page.tsx`, `layout.tsx`, `route.ts` (conventional)
- **Private components:** Place in `_components` folders within routes

### Naming Conventions

- **Components:** PascalCase (`UserProfile`, `AnalyticsView`)
- **Functions/Variables:** camelCase (`getUserById`, `isLoading`)
- **Constants:** UPPER_SNAKE_CASE (`FREE_PLAN_LINK_LIMIT`, `DEFAULT_THEME`)
- **Booleans:** Prefix with `is/has/should` (`isVisible`, `hasPermission`)

### TypeScript & Types

**Source of Truth:**

1. Drizzle schema in `src/server/db/schema.ts` (database types)
2. tRPC routers with Zod validation (API types)
3. Inference helpers in `src/trpc/react.tsx` (`RouterInputs`, `RouterOutputs`)

**Pattern:**

```typescript
// Infer types from tRPC router
import { type RouterOutputs } from "~/trpc/react";
type Link = RouterOutputs["link"]["getAll"][number];

// Use Drizzle table types
import { links } from "~/server/db/schema";
import { eq } from "drizzle-orm";

// Zod validation in procedures
input: z.object({
  title: z.string().min(1),
  url: z.string().url(),
});
```

**Strictness:**

- `strict: true` enabled
- `noUncheckedIndexedAccess: true` (handle undefined array access)
- Never use `as any`, `@ts-ignore`, or `@ts-expect-error`

### Error Handling

**Client-side:**

```typescript
try {
  await api.link.create.mutate(data);
} catch (err) {
  const errorMessage =
    err instanceof Error ? err.message : "Something went wrong";
  setError(errorMessage);
  console.error("[ComponentName] Error:", err);
}
```

**Server-side (tRPC):**

```typescript
import { TRPCError } from "@trpc/server";

throw new TRPCError({
  code: "FORBIDDEN",
  message: "You've reached your link limit",
});
```

**Logging:**

- Use prefixed console statements: `console.log("[AUTH] ...")`, `console.error("[TRPC] ...")`
- Always log errors with context: `console.error("Error submitting application:", error)`

### Component Patterns

**Client Components:**

```typescript
"use client";

import { useState } from "react";
import { api } from "~/trpc/react";

export function LinkEditor() {
  const [isOpen, setIsOpen] = useState(false);
  // ... interactive logic
}
```

**Server Components:**

- No `"use client"` directive
- Use for data fetching and session checks
- Pass data to client components as props

**UI Components (Shadcn):**

- Located in `src/components/ui/`
- Use `cn()` utility from `~/lib/utils` for class merging
- Follow Radix UI patterns for accessibility

### Database & Drizzle ORM

**Schema Definition:**

- Centralized in `src/server/db/schema.ts`
- Use `pgTableCreator` for table prefixing
- Define relations using Drizzle's `relations` API
- Default values with `.$defaultFn(() => new Date())`

**Query Patterns:**

```typescript
// Relational Query API (read operations)
await ctx.db.query.links.findMany({
  where: eq(links.userId, ctx.session.user.id),
  orderBy: [asc(links.order)],
  with: { user: true },
});

// SQL-like API (mutations & aggregations)
await ctx.db
  .insert(links)
  .values({ title: "Home", url: "https://example.com" });
const [count] = await ctx.db.select({ value: count() }).from(links);
```

**Transaction Safety:**

- Use `ctx.db.transaction(async (tx) => { ... })` for atomic operations
- ESLint enforces `WHERE` clauses on DELETE/UPDATE operations (`drizzle/enforce-delete-with-where`, `drizzle/enforce-update-with-where`)

### tRPC Patterns

**Router Structure:**

```typescript
export const linkRouter = createTRPCRouter({
  getAll: protectedProcedure.query(async ({ ctx }) => {
    return ctx.db.query.links.findMany({
      where: eq(links.userId, ctx.session.user.id),
    });
  }),

  create: protectedProcedure
    .input(z.object({ title: z.string(), url: z.string().url() }))
    .mutation(async ({ ctx, input }) => {
      // implementation
    }),
});
```

**Context:**

- `ctx.db` - Database client
- `ctx.session` - User session (guaranteed non-null in `protectedProcedure`)

### Better-Auth Integration

- Configuration in `src/server/better-auth/config.ts`
- Server helpers in `src/server/better-auth/server.ts`
- Client helpers in `src/server/better-auth/client.ts`
- Session types inferred from auth config: `typeof auth.$Infer.Session`

### Styling (Tailwind CSS)

- Use `cn()` utility from `~/lib/utils` for conditional classes
- Follow Tailwind CSS v4 patterns
- Prettier with `prettier-plugin-tailwindcss` handles class ordering
- No inline styles; use Tailwind utility classes

## Architecture Principles

1. **Path Aliasing:** Always use `~/` for imports from `src/`
2. **Server-Client Separation:** Keep server code in `src/server/`, client code in `src/app/` and `src/components/`
3. **Type Safety:** Never manually duplicate types - infer from Drizzle schema or tRPC routers
4. **Component Co-location:** Route-specific components go in `_components` folders
5. **DRY:** Reuse UI components from `src/components/ui/`, don't recreate buttons/inputs

## Common Patterns

**Creating a new feature:**

1. Add table to `src/server/db/schema.ts`
2. Create tRPC router in `src/server/api/routers/`
3. Register router in `src/server/api/root.ts`
4. Use inferred types in frontend components via `RouterOutputs`
5. Run migrations: `pnpm db:generate && pnpm db:migrate`

**Adding a new UI component:**

1. Place in `src/components/ui/` if reusable, or `src/app/[route]/_components/` if route-specific
2. Use `cn()` for class merging
3. Name in PascalCase, file in kebab-case
4. Add `"use client"` if interactive (state, event handlers)

## Before Committing

Always run: `pnpm check` (runs lint + typecheck)
Format: `pnpm format:write`
Build test: `pnpm build` (optional but recommended)
