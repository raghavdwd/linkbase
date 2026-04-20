# APP ROUTER KNOWLEDGE BASE

## OVERVIEW

Next.js 15 App Router handling public profiles, authenticated dashboard, and marketing pages.

## STRUCTURE

- `[username]/` — Public profiles (dynamic route)
- `dashboard/` — Authenticated user area with link management
- `api/` — tRPC, Better-auth, and UploadThing endpoints
- `_components/` — Shared UI logic private to the app directory
- Marketing routes: `about/`, `blog/`, `pricing/`, `how-it-works/`, etc.
- Social integrations: `instagram/`, `linkedin/`, `twitter/`
- Legal & Support: `privacy/`, `terms/`, `help-center/`, `status/`

## WHERE TO LOOK

| Task              | Location                     | Notes                                |
| :---------------- | :--------------------------- | :----------------------------------- |
| Public Profile UI | `[username]/_components/`    | Composition in `[username]/page.tsx` |
| Dashboard UI      | `dashboard/_components/`     | Analytics and link editor            |
| Landing Page      | `_components/landing-page/`  | Root `page.tsx` entry point          |
| Global Providers  | `layout.tsx`                 | Hydration, Auth, and tRPC providers  |
| Auth Endpoints    | `api/auth/[...all]/route.ts` | Better-auth catch-all                |
| tRPC API          | `api/trpc/[trpc]/route.ts`   | Server-side procedure handler        |

## CONVENTIONS

- Prefix private folders with `_` to exclude them from routing.
- Place route-specific components in a local `_components/` directory.
- Use `page.tsx` for the main route entry and `layout.tsx` for shared nesting.
- Root `page.tsx` uses conditional redirects for authenticated vs. guest views.

## ANTI-PATTERNS

- No business logic in `page.tsx` files. Keep them as thin composition wrappers.
- Don't add new marketing pages to the root without checking existing patterns.
- Avoid placing reusable UI primitives here. Use `src/components/ui/` instead.
- Never bypass the `layout.tsx` provider chain for data-fetching components.
