# Roadmap

## Phase 0 — Foundation — COMPLETE

- repository structure
- product documentation
- dual-ledger model
- security principles
- CI
- shared domain contracts
- engagement design system
- progression/momentum model
- first content balance data
- executable game-core formulas
- executable game-core self-test

## Phase 1 — Playable MVP — IN PROGRESS

- [ ] registration/auth
- [ ] game dashboard
- [x] clicking domain logic
- [x] passive production formulas
- [x] upgrades/cost scaling
- [x] offline progression logic
- [x] first buildings/content
- [x] first milestones
- [x] first missions
- [x] gameplay boosts
- [x] prestige calculation
- [ ] persistence
- [ ] API commands
- [ ] frontend implementation

### Starter gameplay arc

The first content pass now contains:
- 5 zones
- 10 production buildings
- 9 upgrade lines
- 10 milestones
- 8 missions
- 3 gameplay boosts
- prestige progression

Target design:
- first upgrade: under ~90 seconds for a normal active start
- first major milestone: a few minutes
- first automation/second layer: within the first session
- first prestige: a meaningful long-session objective

Values are balance seeds and must be tuned with telemetry after the playable client exists.

## Phase 2 — Retention Systems

- achievements
- collections
- advanced boosts
- prestige UI
- events
- leaderboard leagues
- seasonal progression
- player mastery

## Phase 3 — Rewards

- provider adapter interface
- rewarded-ad gameplay boosts
- offer/task adapter
- pending rewards
- validation callbacks
- earn history

## Phase 4 — Wallet

- authoritative ledger
- payout eligibility
- withdrawal requests
- payout provider abstraction
- reconciliation
- admin review

## Phase 5 — Trust

- anti-fraud scoring
- rate limits
- duplicate detection
- payout risk rules
- audit tooling
- account controls

## Phase 6 — Growth

- referrals
- social profiles
- localization
- analytics
- live operations tooling

## Definition of Done for money

A money feature is not complete until:
- provider validation works
- idempotency is tested
- ledger entries are transactional
- reversal behavior exists
- fraud handling exists
- reconciliation exists
- audit history exists
