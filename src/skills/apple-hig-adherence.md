---
name: Apple HIG Adherence
description: Keep a product on the rails of Apple's Human Interface Guidelines from the moment a project decides to target Apple platforms — enforce the non-negotiable rules, earn a premium feel through restraint and native conventions, and protect performance and App Store review readiness. For designers and developers building for iOS, iPadOS, macOS, watchOS, or visionOS.
audience: designer · iOS/macOS developer · product team
---

# Apple HIG Adherence

## What this is

A continuous-adherence method for Apple platforms. When a project commits to iOS/iPadOS/macOS (or watch/visionOS), the Human Interface Guidelines stop being inspiration and become the rails: navigation patterns, touch targets, Dynamic Type, safe areas, system materials, and platform conventions that users expect without noticing. This skill keeps the product on those rails throughout, translates "premium feel" into concrete moves (restraint, native components, real depth and motion, typographic discipline), and protects the two things a beautiful app still fails on — performance and App Store review.

## What this is NOT

Not affiliated with or endorsed by Apple, and not a substitute for the official Human Interface Guidelines or App Store Review Guidelines — it defers to the current versions, which change each release. Not a promise of App Store approval; it reduces avoidable rejections, it does not guarantee acceptance. Not "add a blur and call it premium" — premium here is earned through convention and restraint, not decoration. Not a reason to fight the platform: an app that reinvents navigation to look unique usually just feels broken to an iPhone user.

## Method

1. **Confirm the platform contract early.** Each Apple platform has its own idioms — iPadOS is not a big iPhone, visionOS is not a flat screen. Target the right one and adopt its conventions from the start, not as a retrofit.
2. **Enforce the non-negotiables.** Minimum 44pt touch targets, Dynamic Type support, safe-area and notch/Island respect, legible contrast, and standard gestures. These are rules, not preferences.
3. **Use native components before custom.** Navigation bars, tab bars, lists, sheets, and menus carry accessibility and muscle memory for free — reach for them first; custom only where the system genuinely has no answer, built to feel native.
4. **Earn the premium feel through restraint.** Generous space, one clear focal action per screen, SF Pro / system type with a disciplined hierarchy, real system materials and depth used sparingly, and motion that clarifies rather than performs.
5. **Make motion and haptics purposeful.** Spring animations tied to gestures, transitions that explain hierarchy, and haptics that confirm meaningful events — never gratuitous.
6. **Support the system, not just the happy path.** Light/dark, Dynamic Type at large sizes, VoiceOver, Reduce Motion, and localization — a premium Apple app is premium at accessibility settings too.
7. **Protect performance as a feature.** 120Hz-smooth scrolling, fast cold launch, no dropped frames during animation, and respect for battery and memory — on Apple hardware, jank reads as cheap.
8. **Pre-check App Store review.** Privacy nudges, sign-in and account-deletion requirements, permission priming, and human-interface conformance — walk the common rejection reasons before submitting.

## Quality bar

The correct Apple platform and its idioms are targeted from the start · non-negotiables (44pt targets, Dynamic Type, safe areas, contrast, standard gestures) are enforced · native components are used before custom · premium is earned through restraint, type discipline, and purposeful depth — not decoration · motion and haptics are purposeful · system settings (dark mode, Dynamic Type, VoiceOver, Reduce Motion, localization) are supported · performance is treated as a feature · common App Store rejection reasons are pre-checked.

## Guardrails & escalation

An adherence method, not the guidelines — verify specifics against the current Human Interface Guidelines and App Store Review Guidelines, which Apple updates every cycle. Accessibility and performance are required outputs, not polish. This does not guarantee App Store approval; where a review outcome or a legal/privacy requirement is genuinely uncertain, route to Apple's current documentation or the team's legal counsel rather than guessing. If a brand demand conflicts with a HIG rule users rely on, name the trade-off — fighting the platform is usually the wrong side of it.

## References

- Catalogue: https://edwson.com/consumer-design-system.html · Contracts: https://edwson.com/cds/components.json · Agent brief: https://edwson.com/cds/AGENTS.md
- Primary sources: Apple Human Interface Guidelines and App Store Review Guidelines (developer.apple.com) — verify against the current versions. Related: the Material Design and Ant Design adoption skills, and CDS accessibility verification.
