# Changelog

## 2026-10-04

### Added
- initialized public IdleCoins repository
- established product/game/economy/anti-fraud architecture
- documented two-ledger model
- documented provider adapter boundaries
- added monorepo package skeleton
- added release and compliance engineering checklists
- redesigned game loop around high-retention gameplay
- added engagement specification and pacing model
- added streaks, milestones, events, collections, prestige and mastery to roadmap
- added engagement guardrails
- added shared identity, player, game, reward, wallet and event models
- added game-core, economy, integrations, anti-fraud and API domain models
- separated browser/API command contracts from authoritative domain state
- added package exports for domain model consumption
- added progression and momentum rules
- added always-next-action, catch-up and dead-end session metrics
- added 5-zone / 10-building starter content
- added 9 upgrade lines, 10 milestones, 8 missions and 3 gameplay boosts
- added executable building/cost/production/upgrade/offline/prestige logic
- added game-core self-test and real TypeScript CI verification

### Verification
- Remote clone verified on main
- JSON configuration parsed successfully
- TypeScript typecheck passed on remote machine
- game-core self-test passed

### Next
- implement PostgreSQL persistence
- implement server-authoritative game API
- build the first playable web screen
- connect the progression goal engine to persistent player state
- add frontend telemetry for momentum/dead-end metrics
