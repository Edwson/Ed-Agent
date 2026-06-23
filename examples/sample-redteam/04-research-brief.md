# 04 · Engineering research (security + reliability references)

**Coverage:** 100% (3/3) · **Sources:** OWASP, 12-Factor App, Google SRE

## Input validation — CORROBORATED
**Anchors:** ASVS V5 · Top 10 A03 (Injection)

- Be validated against an allow-list at the trust boundary before use. *(— OWASP, ASVS V5)*
- Be parameterised or escaped to prevent injection. *(— OWASP, Top 10 A03 (Injection))*

## Auth & secrets — CORROBORATED
**Anchors:** ASVS V2/V6 · III. Config

- Never be hardcoded; credentials must be stored in a managed secret store and rotated. *(— OWASP, ASVS V2/V6)*
- Be read from the environment, not committed to the repo. *(— 12-Factor App, III. Config)*

## Error handling — SINGLE-SOURCE
**Anchors:** Handling Overload

- Fail closed, be logged with context, and never leak internals to the caller. *(— Google SRE, Handling Overload)*

