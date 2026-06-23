# Test plan (QA · test pyramid)

## Unit + integration
- [ ] unit: Add a payment retry flow
- [ ] integration: Add a payment retry flow against its dependency
- [ ] unit: migrate the payments schema
- [ ] integration: migrate the payments schema against its dependency

## End-to-end
- [ ] happy path for the full requirement
- [ ] one failure path (errors fail closed)

## Gates in CI
- lint · type-check · unit · integration · dependency scan
