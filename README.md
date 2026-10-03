# IdleCoins

IdleCoins es una plataforma web híbrida de **idle/incremental game + rewards**.

El objetivo es que el juego sea atractivo por sí mismo y tenga una capa económica separada, transparente y sostenible.

## Experiencia

```
PLAY
  -> Coins
  -> upgrades
  -> automation
  -> milestones
  -> unlocks
  -> prestige
  -> mastery

EARN
  -> eligible task/offer
  -> provider validation
  -> pending reward
  -> fraud checks
  -> available balance
  -> payout
```

## Qué hace atractivo el juego

- feedback inmediato;
- metas visibles;
- upgrades frecuentes al principio;
- misiones cortas;
- boosts temporales;
- streaks;
- hitos celebrables;
- nuevas zonas;
- prestige;
- eventos;
- colecciones;
- ligas y rankings;
- progresión de temporada;
- objetivos de largo plazo.

La intensidad visual puede ser alta, pero el producto evita convertir el dinero retirable en una mecánica de apuesta.

## Arquitectura

```text
apps/
  web/
  api/

packages/
  shared/
  game-core/
  economy/
  integrations/
  anti-fraud/
  config/

docs/
  product/
  game/
  economy/
  security/
  operations/
```

## Principios

- El frontend nunca es autoridad sobre dinero.
- Los Coins del juego están separados del balance monetario.
- Los callbacks externos son verificados e idempotentes.
- Todo movimiento monetario queda en un ledger auditable.
- Los proveedores externos son intercambiables.
- La economía se parametriza.
- Seguridad y antifraude forman parte del MVP.

Consulta [docs/GAME-DESIGN.md](docs/GAME-DESIGN.md), [docs/ENGAGEMENT.md](docs/ENGAGEMENT.md) y [docs/ROADMAP.md](docs/ROADMAP.md).
