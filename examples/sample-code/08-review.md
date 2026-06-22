# 08 · Security review (Security)

## STRIDE over the concerns
- **Input validation** — Spoofing/Tampering/Repudiation/Info-disclosure/DoS/Elevation: assess + mitigate
- **Auth & secrets** — Spoofing/Tampering/Repudiation/Info-disclosure/DoS/Elevation: assess + mitigate
- **Error handling** — Spoofing/Tampering/Repudiation/Info-disclosure/DoS/Elevation: assess + mitigate

## Mitigations (baseline)
- validate input at the trust boundary (allow-list)
- secrets from a managed store, never committed
- encrypt sensitive data at rest + in transit
- fail closed; log with context; no internal leakage
- pin + scan dependencies

## Ambiguities in the requirement
- none flagged
