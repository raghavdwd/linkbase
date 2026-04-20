# UI COMPONENTS KNOWLEDGE BASE

## OVERVIEW

Collection of 12 shadcn/ui primitives built on Radix UI, managed with class-variance-authority and Tailwind CSS.

## STRUCTURE

- **Primitives**: badge, button, card, dialog, dropdown-menu, input, label, navigation-menu, skeleton, switch, tabs, textarea.
- **Single-file pattern**: Every component exists in its own `.tsx` file.
- **No barrel exports**: Files don't use `index.ts`. Import each component directly from its specific file path.

## CONVENTIONS

- **Radix UI**: Complex components like `Dialog` and `Tabs` rely on Radix primitives for accessibility.
- **Styling**: Composition uses `cn()` from `~/lib/utils.ts` (combines `clsx` and `tailwind-merge`).
- **Variants**: Managed via `cva` (class-variance-authority). Locate style logic in the same file as the component.
- **Slots**: Components usually accept a `className` prop to allow external layout adjustments.

## ANTI-PATTERNS

- **No barrel files**: Don't add an `index.ts` to this directory. It breaks the existing import pattern.
- **Direct modification**: Avoid editing these files for one-off design changes. Wrap the component or use the `className` prop instead.
- **Hardcoded colors**: Stick to Tailwind theme variables (e.g., `bg-primary`, `text-muted-foreground`) to maintain theme support.
- **Missing accessibility**: Never strip away Radix sub-components that provide ARIA attributes.
