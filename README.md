# IdleCoins

IdleCoins es una plataforma web híbrida de **idle clicker + rewards**.

La idea central es combinar un juego incremental que tenga valor por sí mismo con una capa de tareas, ofertas y experiencias publicitarias recompensadas. La economía distingue claramente las monedas de juego de los fondos potencialmente retirables.

## Principios

- El juego debe ser divertido aunque el usuario nunca retire dinero.
- Las recompensas económicas deben estar respaldadas por ingresos reales y reglas de elegibilidad.
- El frontend nunca puede acreditar dinero por sí solo.
- Toda recompensa económica pasa por un ledger auditable y validación antifraude.
- Las integraciones externas se implementan detrás de adaptadores.
- La economía debe poder parametrizarse sin reescribir el juego.
- Seguridad, privacidad, cumplimiento y antifraude forman parte del producto desde el MVP.

## Monorepo

```text
apps/
  web/                 # interfaz web
  api/                 # backend HTTP / jobs

packages/
  game-core/           # reglas deterministas del idle game
  shared/              # tipos y contratos compartidos
  economy/             # reglas de economía y ledger
  integrations/        # adaptadores de ads/offers/payouts
  anti-fraud/          # scoring y reglas de riesgo
  config/              # configuración tipada

docs/
  product/             # visión y UX
  game/                # game design
  economy/             # economía y payouts
  security/            # seguridad y antifraude
  architecture/        # arquitectura
  operations/          # operación y observabilidad
  compliance/          # requisitos y políticas

infra/
  ci/                  # automatización CI/CD
  database/            # evolución del esquema
scripts/               # tooling local
```

## Estado

Fase actual: **Fundación del producto**.

Este repositorio empieza como una base limpia. La implementación se hará por etapas verificables para evitar una economía rota, deuda estructural o dependencias prematuras.

Consulta [docs/ROADMAP.md](docs/ROADMAP.md) para el orden de construcción.
