# Economy Design

## Two-ledger model

IdleCoins uses two independent economic layers.

### Game ledger

Denomination: Coins.

Purpose:
- game progression
- upgrades
- boosts
- prestige
- events

### Monetary ledger

Denomination: configured fiat minor units.

Purpose:
- validated rewards
- adjustments
- payout reservations
- completed payouts

Never use floating-point numbers for monetary values.

## Revenue flow

```
Ad / offer / sponsor revenue
        |
        v
Provider validation
        |
        v
Fraud checks
        |
        v
Pending reward
        |
        v
Available balance
        |
        v
Payout eligibility
        |
        v
Payout processing
```

## Budgeting

Rewards must be bounded by configurable economics.

The system should maintain:
- provider revenue
- provider fees
- expected fraud loss
- operational reserve
- user reward pool
- platform margin

The reward pool is never inferred from client activity.

## Idempotency

Every provider callback must carry or be mapped to a stable event identifier.

Processing the same event twice must not create a second monetary credit.

## Accounting states

```
PENDING
AVAILABLE
RESERVED
PAID
REVERSED
CANCELLED
```

No state transition should be implicit.

## Example game economy

Initial balance:
- 0 Coins
- 0 monetary balance

Starter progression:
- click power: 1 Coin
- base passive production: 0 Coin/s
- first generator: 25 Coins

All values are provisional and should be tuned through telemetry, not hard-coded assumptions.
