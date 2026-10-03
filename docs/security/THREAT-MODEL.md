# Threat Model

## Assets

- account credentials/session
- game state
- game Coins
- monetary ledger
- provider callback secrets
- payout destinations
- fraud signals
- admin controls

## Threats

### Client tampering
Attackers manipulate browser state or network requests.

Mitigation: server-authoritative game and wallet operations.

### Callback replay
A provider event is submitted multiple times.

Mitigation: unique provider-event identity + transactional idempotency.

### Multi-account abuse
An actor creates many accounts to exploit rewards.

Mitigation: risk signals, velocity controls and payout review.

### Reward inflation
An attacker submits arbitrary reward amounts.

Mitigation: server-side provider verification; never trust client amounts.

### Admin abuse
A privileged user changes balances or rules without traceability.

Mitigation: least privilege + audit logs + explicit reason codes.

### Database race
Concurrent requests spend or credit the same balance twice.

Mitigation: database transactions and appropriate row/ledger locking.
