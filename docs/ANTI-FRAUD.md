# Anti-Fraud Model

Fraud prevention is a first-class subsystem.

## Trust pipeline

```
Account
  -> session signals
  -> velocity checks
  -> device/session correlation
  -> task/provider verification
  -> risk score
  -> pending reward
  -> payout risk review
```

## Controls

- account velocity limits
- task completion cooldowns
- duplicate-account detection
- provider callback signature validation
- replay protection
- idempotency keys
- pending reward windows
- payout velocity limits
- suspicious pattern review
- audit logging

## Principle

Never trust:
- client-side completion claims
- client-side wallet amounts
- arbitrary reward amounts from query parameters
- unsigned provider callbacks

## Risk outcomes

```
ALLOW
PENDING_REVIEW
DELAY
REJECT
BLOCK
```

Risk rules must be configurable and versioned so a rule change can be audited.

## Privacy

Collect the minimum signals required for fraud prevention and document retention periods. Avoid turning fraud prevention into unnecessary personal-data collection.
