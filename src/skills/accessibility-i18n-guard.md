---
name: Accessibility (WCAG 2.1 AA) & i18n Guard
description: Checks colour contrast, screen-reader labelling, and full keyboard operation against named WCAG 2.1 AA success criteria, then reviews right-to-left mirroring and long-word / multi-language overflow so a layout survives localization. A combined a11y and i18n pass that cites the specific criterion for each finding and verifies locale rules against the target locale. For designers, front-end, and localization.
audience: designer · front-end · localization
---

# Accessibility (WCAG 2.1 AA) & i18n Guard

## What this is

A two-part verification pass. The accessibility half checks the things products most often break at WCAG 2.1 AA: contrast (1.4.3), keyboard operability with no traps (2.1.1, 2.1.2), visible focus (2.4.7), meaningful sequence and labelling (1.3.1, 1.3.2, 4.1.2), and text resize / reflow (1.4.4, 1.4.10). The i18n half checks that the same layout holds when the language changes: RTL mirroring, long compound words (German, Finnish) that overflow buttons, wider scripts, and locale-specific number, date, and name formats.

## What this is NOT

Not a formal conformance audit and not a substitute for testing with real assistive-technology users — automated and manual checks reduce risk but cannot confirm that a screen-reader user can actually complete a task. Findings cite specific success criteria as evidence, not as a certification of conformance. RTL and locale rules are only as good as the target locale they were verified against; a guess about a language nobody on the team reads is labelled as unverified, not asserted.

## Method

1. **Set the scope.** Name the target WCAG level (2.1 AA) and the exact locales in play — RTL, CJK, long-compound, and the base — because "internationalized" without a locale list checks nothing.
2. **Contrast pass.** Measure text and UI contrast against 1.4.3; check that state and meaning never rely on colour alone (1.4.1); test both themes if applicable.
3. **Keyboard walk.** Complete every task pointer-free — all controls reachable and operable, focus visible and ordered, no traps (2.1.1, 2.1.2, 2.4.3, 2.4.7).
4. **Screen-reader labelling.** Verify names, roles, and states are exposed, form fields have programmatic labels, and structure conveys meaning (1.3.1, 1.3.2, 4.1.2).
5. **Resize & reflow.** Confirm 200% zoom and 400% reflow work without loss of content or function (1.4.4, 1.4.10), and that text spacing overrides don't clip.
6. **RTL mirroring.** Flip to right-to-left: layout, icons, and progression mirror correctly while directional-neutral glyphs (play, clock, checkmark) do not.
7. **Overflow & locale formats.** Test the longest realistic strings per locale for truncation and clipping, and verify number, date, currency, and name formats match the target locale.
8. **Report per criterion and per locale.** Record each finding with its SC number and the locale it failed in, pass/fail by state, and mark unverified locales as such.

## Quality bar

Every accessibility finding cites its SC number (1.4.3, 2.1.1, 1.3.2, and the rest) · keyboard tasks complete pointer-free with visible focus · screen-reader names/roles/states verified · RTL mirrors layout without mirroring neutral glyphs · longest-string overflow tested per named locale · locale formats verified against the target · unverified locales labelled, not guessed.

## Guardrails & escalation

This pass reduces accessibility and localization risk but is not a formal WCAG conformance audit and does not replace testing with real assistive-technology users — both are recommended, not substituted. Locale and RTL rules are verified against the stated target locale; anything outside a locale the team can actually read is flagged as unverified rather than asserted. Legal questions about accessibility obligations route to qualified counsel.

## References

- Catalogue: https://edwson.com/consumer-design-system.html · Contracts: https://edwson.com/cds/components.json · Agent brief: https://edwson.com/cds/AGENTS.md
- Related within this kit: CDS accessibility verification, CDS token theming (contrast in both themes), and the design-tokens & component-states skill.
