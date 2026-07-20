---
name: typescript-architecture
description: Use this skill when a TypeScript codebase needs stronger type modelling, a safe refactor of loose or JavaScript code, or an architecture review of a frontend app. It produces a concrete, staged plan and typed patterns you can adopt incrementally.
---

# TypeScript Architecture

> **What this is** — a repeatable, AI-assisted working method for TypeScript type-system design, incremental refactoring, and frontend architecture, producing a rigorous, well-structured result quickly.
> **What this is NOT** — not a substitute for code review, tests, or your team's own architecture decisions; type-safety reduces classes of bugs but does not replace testing or domain correctness. Treat outputs as drafts to validate before they ship.

## When to use this
- Domain state is modelled with loose objects and optional flags, and illegal combinations keep causing bugs.
- A JavaScript or loosely-typed codebase needs to become type-safe without a risky big-bang rewrite.
- A frontend app has unclear component, state, and data-fetching boundaries and needs an architecture review.
- Type errors are being silenced with `any` or `as`, and the team wants to tighten strictness safely.
- A growing monorepo has slow builds and tangled module dependencies that need untangling.

## Operating principle
Model the domain so illegal states cannot be represented, then let the compiler enforce it — types are a design tool, not decoration. Move in small, test-backed steps rather than large rewrites, so each change is reversible and reviewable. AI accelerates pattern generation and mechanical refactoring; human judgement owns domain correctness, boundary decisions, and the final review.

## Capability 1 — Type-system design review
**Goal.** Model domain state so that illegal states are unrepresentable and the compiler catches misuse.
**Inputs.** The domain concepts and their states, current type definitions, and the strictness settings in `tsconfig.json`.
**Method.**
1. Enumerate the real states of each domain entity and identify combinations that should never occur.
2. Replace flag-soup objects with discriminated unions keyed on a literal tag, and switch on that tag with an exhaustiveness check (a `never` default case).
3. Use generics, and mapped, conditional, and template-literal types to express relationships once instead of duplicating shapes.
4. Introduce branded (nominal) types for values that share a primitive but must not mix (e.g. `UserId` vs `OrderId`).
5. Turn on `strict`, then add `noUncheckedIndexedAccess` and `exactOptionalPropertyTypes`; fix the failures rather than suppressing them.
6. Remove `any` and unsafe assertions; replace them with `unknown` plus narrowing, or runtime validation at the boundary.
**Output.** Revised type definitions, a discriminated-union model with exhaustiveness handling, recommended strictness flags, and a list of removed unsafe casts.
**Quality bar.** Illegal states fail to compile; no `any` or unchecked `as` on domain types; exhaustiveness is enforced by a `never` check.

## Capability 2 — Large-project refactoring
**Goal.** Bring a loose or JavaScript codebase to type-safety incrementally, behind tests, without breaking behaviour.
**Inputs.** The current codebase, its build setup, existing tests, and the module/dependency layout.
**Method.**
1. Establish a baseline: enable `allowJs` and `checkJs` or add `// @ts-check`, and record the current error count.
2. Type the boundaries first — public APIs, module entry points, and shared data shapes — so callers get signal early.
3. Define the intended dependency direction and flag imports that point the wrong way (e.g. domain importing UI).
4. Sequence refactors leaf-first, changing one module at a time and running the test suite after each step.
5. Split large modules along their real seams; keep the public API surface small and explicit with `export` control.
6. For monorepos, adopt TypeScript project references and incremental builds so type-checking and rebuilds stay fast.
**Output.** A staged refactor plan, a typed module/boundary map, corrected dependency directions, and build-performance recommendations.
**Quality bar.** Each step is independently green under tests; the type-error count trends to zero; no circular or wrong-direction module dependencies remain.

## Capability 3 — Frontend architecture best practices
**Goal.** Define clear component, state, and data boundaries with typed contracts, accessibility, and a performance budget.
**Inputs.** The app's framework and build tool (e.g. React with Vite), the data sources, and any design-system tokens.
**Method.**
1. Draw component and state boundaries: keep components presentational where possible and lift shared state deliberately.
2. Separate the data-fetching and caching layer from view logic, and define what runs on the server versus the client.
3. Define typed API contracts and validate external data at runtime (for example with a zod-style schema) before it enters the typed core.
4. Integrate design tokens and design-system components so styling is consistent and theme-aware (relevant to Ed's eds-mcp work).
5. Place error boundaries and typed loading, empty, and error states so failures are contained and visible.
6. Set an accessibility and performance budget — keyboard paths, focus, bundle size, and Core Web Vitals — and check against it.
**Output.** An architecture note: boundary diagram, data/caching strategy, server/client split, typed API contracts, and an accessibility/performance checklist.
**Quality bar.** External data is validated before use; boundaries are explicit and typed; every async surface has loading/empty/error handling; accessibility and performance budgets are stated and met.

## Worked example (illustrative)
*Illustrative only.* A checkout module represents its state as `{ isLoading, isError, data, error }`, and components keep hitting combinations like "loading and error at once." The review replaces it with a discriminated union: `{ status: 'idle' } | { status: 'loading' } | { status: 'success'; order: Order } | { status: 'error'; message: string }`, switched on `status` with a `never` default so a new state cannot be forgotten. `OrderId` and `UserId` become branded types so they can no longer be swapped. Incoming API responses are validated with a schema at the boundary, then flow into the typed core. `strict` and `noUncheckedIndexedAccess` are enabled leaf-first, one module at a time, with the Vitest suite run after each step. Nothing here removes the need for tests — the types narrow the input space that tests still have to cover.

## Guardrails & escalation
- Validate every refactor against the existing test suite; where coverage is thin, add tests before changing behaviour rather than trusting the compiler alone.
- Never ship a change that silences errors with `any`, non-null `!`, or unchecked `as` on untrusted data; validate at runtime at the boundary instead.
- Flag uncertainty explicitly: note where domain correctness, not type-shape, is the open question, and route it to the team that owns the domain.
- Escalate architecture decisions with long-lived consequences (module boundaries, server/client split, build topology) to the team for review before adopting.

## References & standards
- TypeScript Handbook — discriminated unions, generics, and mapped, conditional, and template-literal types.
- `tsconfig` strictness options: `strict`, `noUncheckedIndexedAccess`, `exactOptionalPropertyTypes`, `noImplicitAny`.
- TypeScript project references and incremental builds for monorepo build performance.
- React and Vite architecture patterns; server/client component boundaries.
- Runtime validation for typed API contracts (e.g. zod-style schemas at the boundary).
- Vitest and Playwright as the testing complement to static types.

---
*Part of Ed Chen's AI skill set — how one designer absorbs unfamiliar, C-level work quickly by pairing AI with rigor and professional review. https://edwson.com*
