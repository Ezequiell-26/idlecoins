# Payout Design

## Eligibility

A withdrawal request is eligible only when:
- balance is available
- minimum threshold is satisfied
- no blocking risk decision exists
- account is eligible in the target region
- required verification is complete

## Withdrawal lifecycle

```
REQUESTED
  -> RISK_CHECK
  -> APPROVED
  -> PROCESSING
  -> PAID

REQUESTED
  -> REJECTED
  -> balance released
```

## Safety

Payout processing must have:
- idempotency
- provider reconciliation
- retry policy
- kill switch
- immutable audit trail

## Currency

Store money in minor units using integers. Never use JavaScript floating-point arithmetic for balances.
