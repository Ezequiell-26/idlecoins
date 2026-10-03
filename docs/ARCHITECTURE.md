# Architecture

## Platform constraint

IdleCoins is a **web platform**. The primary client is a browser application, responsive across desktop and mobile. Native desktop/mobile applications are not part of the core architecture.

The browser is a presentation and interaction layer. The API/backend remains authoritative for persistent game state, rewards, wallet operations and security decisions.

## Target shape

```text
                    Web UI
                      |
                    API/BFF
          ____________|____________
         /      /      |      \
      Auth    Game   Rewards   Wallet
                |       |        |
             game-core economy  ledger
                |       |        |
                |    adapters  payout adapters
                |
           PostgreSQL / event storage
```

## Dependency direction

```
apps -> packages
packages/game-core -> shared
packages/economy -> shared
packages/integrations -> shared
packages/anti-fraud -> shared
apps/api -> all required packages
apps/web -> shared contracts only where possible
```

Business rules belong in packages, not inside page components.

## Adapters

External systems must sit behind interfaces.

Examples:
- ads provider
- offerwall provider
- survey provider
- payout provider
- analytics provider

This keeps the core independent from any single vendor.

## API rules

- server authoritative state
- input validation at boundaries
- idempotent write endpoints
- explicit error codes
- audit events for financial operations

## Persistence

Primary relational storage should support transactional wallet updates and unique constraints.

Recommended future split:
- PostgreSQL for authoritative state
- object storage for non-transactional assets
- queue/worker for asynchronous provider callbacks and payouts
- cache only for derived/non-authoritative data

## Observability

Every production release should expose:
- structured logs
- request correlation IDs
- job status
- provider callback metrics
- wallet reconciliation metrics
- fraud decisions
