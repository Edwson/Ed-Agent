# Test plan (QA · test pyramid)

## Unit + integration
- [ ] unit: Build a REST API for user onboarding
- [ ] integration: Build a REST API for user onboarding against its dependency
- [ ] unit: auth
- [ ] integration: auth against its dependency
- [ ] unit: rate limiting
- [ ] integration: rate limiting against its dependency
- [ ] unit: error handling
- [ ] integration: error handling against its dependency

## End-to-end
- [ ] happy path for the full requirement
- [ ] one failure path (errors fail closed)

## Gates in CI
- lint · type-check · unit · integration · dependency scan
