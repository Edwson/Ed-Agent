# 06 · Architecture (Architect)

## Layers
- Presentation / API
- Application (use-cases)
- Domain (rules)
- Infrastructure (data, external services)

## Modules (from sub-requirements)
- **M1** Build a REST API for user onboarding — owning module + interface
- **M2** auth — owning module + interface
- **M3** rate limiting — owning module + interface
- **M4** error handling — owning module + interface

## Key decisions to make (with trade-offs)
- Sync vs async at the boundary — latency vs operational complexity
- SQL vs document store — consistency/queries vs flexibility
- Build vs buy for auth — control vs time-to-ship

## Cross-cutting (from research)
- Input validation
- Auth & secrets
- Error handling

> Design judgment stays human — the Architect proposes; the operator approves at the gate.
