# Release Checklist

## Before merge

- typecheck
- lint
- unit tests
- integration tests
- migration validation
- no secret material committed

## Before production

- environment variables configured
- database backups verified
- provider webhooks verified
- rate limits enabled
- monitoring enabled
- payout kill switch available
- admin access audited

## After deployment

- smoke test authentication
- smoke test game state
- verify background jobs
- verify provider callbacks
- verify ledger reconciliation
- verify error rates

## Emergency controls

The platform must be able to disable:
- new payouts
- a single provider
- a reward campaign
- referrals
- an exploit-prone game feature

without taking down the whole site.
