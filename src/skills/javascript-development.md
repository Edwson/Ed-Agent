---
name: javascript-development
description: Use this skill when a project needs modern vanilla JavaScript engineered correctly — the language and runtime fundamentals people get subtly wrong, DOM and browser work without a framework, and the testing, performance, and security discipline that keeps it shippable. It produces concrete patterns and a review you can act on.
---

# JavaScript Development

> **What this is** — a repeatable, AI-assisted working method for writing modern vanilla JavaScript well: correct language and runtime behaviour, DOM and browser engineering without a framework, and the testing, performance, and security discipline around it.
> **What this is NOT** — not a substitute for a framework where one is genuinely warranted, and not a security audit; patterns reduce classes of bugs but do not guarantee correctness. Untrusted input, auth, and crypto route to security review, and code is tested before it reaches production. Readability and correctness are the bar — not slogans about "clean code".

## When to use this
- A feature can ship in vanilla JS and pulling in a framework would add more weight than it removes.
- Async code misbehaves — race conditions, unhandled rejections, or confusion about ordering and the event loop.
- The DOM layer is a tangle of ad-hoc listeners and manual updates that needs delegation and a clear state model.
- A bundle is too large or a page janks, and the code needs a performance budget rather than guesswork.
- User-supplied content reaches the DOM, and the code needs XSS-safe handling instead of `innerHTML` and `eval`.

## Operating principle
Understand the runtime before reaching for a library: closures, scope, the event loop, and promise semantics explain most "impossible" bugs, and getting them right removes whole classes of them. Prefer the platform — DOM and Web APIs, event delegation, and explicit state — over abstraction the problem does not need, and treat testing, performance budgets, and safe input handling as part of the work, not a later pass. AI accelerates pattern generation and mechanical refactoring; human judgement owns correctness, the security-sensitive boundaries, and the review.

## Capability 1 — Language & runtime fundamentals
**Goal.** Get the parts people get subtly wrong right: closures, scope, the event loop, promises, modules, and immutability.
**Inputs.** The code in question, its target runtime (browser, Node, or both), and the observed behaviour or bug.
**Method.**
1. Trace scope and closures explicitly — what each function closes over, and where captured variables are shared versus fresh per iteration.
2. Model execution order against the event loop: synchronous code, then microtasks (promise callbacks), then macrotasks (timers, I/O).
3. Use `async`/`await` with real error handling; never leave a promise rejection unhandled, and parallelise independent work with `Promise.all` rather than awaiting in series.
4. Prefer immutable updates and pure functions for state transitions, so data flow is predictable and testable.
5. Structure code as ES modules with explicit `import`/`export`, keeping the public surface small and side effects contained.
**Output.** Corrected code with an explanation of the runtime behaviour, the async/error model, and the module boundaries.
**Quality bar.** No unhandled rejections; execution order is justified against the microtask/macrotask model; no accidental shared-closure or `var`-hoisting bugs; modules have explicit, minimal exports.

## Capability 2 — Browser & DOM engineering
**Goal.** Build interactive UI on the DOM and Web APIs directly, with delegated events, explicit state, and progressive enhancement.
**Inputs.** The markup and interaction requirements, the target browsers, and any accessibility or design-system constraints.
**Method.**
1. Query and update the DOM deliberately; batch reads and writes to avoid layout thrash, and cache references instead of re-querying in loops.
2. Use event delegation on a stable ancestor so handlers survive dynamic content and parse order, rather than binding per element.
3. Model UI state in one place and render from it, so the DOM reflects state instead of drifting from it across scattered mutations.
4. Reach for the right Web API — `fetch` with `AbortController`, `IntersectionObserver`, `requestAnimationFrame`, `localStorage` — instead of reinventing it.
5. Build progressive enhancement: the core works with server markup and no JS, and script adds capability on top; expose accessibility hooks (`aria-*`, focus, keyboard) as you go.
**Output.** A DOM/interaction implementation with delegated events, a single state source, chosen Web APIs, and the enhancement/accessibility notes.
**Quality bar.** Handlers survive dynamic content via delegation; no layout thrash in hot paths; the DOM is driven from explicit state; keyboard and focus paths work, and the baseline degrades gracefully without JS.

## Capability 3 — Testing, performance & security
**Goal.** Keep the code shippable: unit and integration tests, a performance budget, and safe handling of untrusted input.
**Inputs.** The modules to cover, the current bundle and runtime cost, and every point where external or user data enters.
**Method.**
1. Write unit tests for logic and integration tests for behaviour, testing through the interface a user or caller sees rather than internals.
2. Set a bundle and performance budget — size, main-thread cost, Core Web Vitals — and measure against it rather than assuming.
3. Treat all external input as untrusted: escape or use `textContent`, avoid `innerHTML` with user data, and never `eval`, `new Function`, or build queries by string concatenation.
4. Follow OWASP guidance for the browser: prevent XSS at the sink, set a Content Security Policy, and keep secrets off the client.
5. Wire accessibility and error handling into the tested paths, so loading, empty, and error states are covered, not just the happy path.
**Output.** A test suite through the public interface, a stated performance budget with measurements, and an input-safety review of every untrusted boundary.
**Quality bar.** Logic and key flows are covered by tests that run before deploy; the performance budget is stated and met; no `eval` or unescaped user input reaches a dangerous sink; error and empty states are tested.

## Worked example (illustrative)
*Illustrative only.* A dashboard renders a live list of alerts and re-binds a click handler to every row on each update, which leaks listeners and occasionally fires twice. The fix moves to a single delegated listener on the list container, keyed off `event.target.closest('[data-alert-id]')`, so it survives re-renders and binds once. The list now renders from one state object rather than mutating rows in place, and the fetch uses `AbortController` so a superseded request cannot land after a newer one. Alert text arrives from an external feed, so it is inserted with `textContent`, never `innerHTML`, closing the XSS path. Independent fetches that were awaited in series are parallelised with `Promise.all`. Vitest covers the state-to-DOM rendering and the abort behaviour, and the bundle is checked against its size budget. None of this removes the need for review — it narrows what can go wrong so the tests and reviewer can focus.

## Guardrails & escalation
- Never put user-controlled data into `innerHTML`, `eval`, `new Function`, or a string-built query; escape at the sink or use safe DOM APIs, and route auth, sessions, and crypto to security review.
- Do not ship without tests through the public interface; where coverage is thin, add it before changing behaviour rather than trusting the pattern alone.
- Flag uncertainty explicitly: note where behaviour depends on an untested browser, runtime, or device, and verify it before relying on it.
- Escalate for a real security review before shipping anything that handles untrusted input, authentication, or secrets, and for a performance audit before a heavy surface goes live.

## References & standards
- ECMAScript (ES2023+) language specification; MDN Web Docs as the working reference for language and Web APIs.
- The event loop, microtask, and task model — promise callback ordering versus timers and I/O.
- DOM and Web APIs: event delegation, `fetch`/`AbortController`, `IntersectionObserver`, `requestAnimationFrame`.
- Testing with Vitest or Jest and Testing Library, exercised through the public interface.
- OWASP guidance on XSS and injection; Content Security Policy; keeping secrets off the client.
- WCAG accessibility hooks (roles, focus, keyboard) and Core Web Vitals (LCP, INP, CLS) as a performance budget.

---
*Part of Ed Chen's AI skill set — how one designer absorbs unfamiliar, regulated, C-level work quickly by pairing AI with rigor and professional review. https://edwson.com*
