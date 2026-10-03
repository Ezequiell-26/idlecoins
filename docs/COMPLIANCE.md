# Compliance & Policy Track

This file is a product engineering checklist, not legal advice.

## Advertising

Different advertising products have different rules for:
- rewarded inventory
- user consent
- reward types
- placement
- frequency
- prohibited incentives

The integration layer must encode provider-specific constraints rather than assuming that all ad networks behave the same way.

## Offers and tasks

For every offer/task provider document:
- permitted traffic sources
- permitted incentive model
- supported territories
- callback validation mechanism
- reversal conditions
- payout terms
- privacy/data requirements

## Payments

Before real payouts:
- verify provider availability for target countries
- verify KYC/AML obligations where applicable
- define age restrictions
- define tax/reporting responsibilities
- publish terms and privacy policies
- define refund/reversal procedures

## Product safety

Users must not be shown a balance as withdrawable until backend validation makes it eligible.
