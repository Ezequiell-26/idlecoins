# Game Design

## Fantasy

IdleCoins presents a simple incremental world that grows from manual clicking into an automated economy.

## Progression

```
Click
  -> Generator
  -> Automation
  -> Industrial buildings
  -> Advanced production
  -> Multipliers
  -> Prestige
  -> New season
```

## Core entities

### Generator

Produces Coins per second.

### Upgrade

Improves production, efficiency or click power.

### Boost

Temporary multiplier with a defined duration.

### Mission

A bounded objective that grants game rewards.

### Prestige

Resets selected progression while awarding a permanent meta multiplier.

## Session behavior

The game state must be deterministic enough to reconcile offline progress on the server.

A client may display predicted production for responsiveness, but the server remains authoritative for persistent state.

## Anti-idle abuse

Offline progression has configurable caps so an account cannot create unlimited value simply by leaving a tab open.

## Future systems

- achievements
- seasons
- events
- leaderboards
- clans
- cosmetics
- collections
- social challenges
