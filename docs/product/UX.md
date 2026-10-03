# UX Architecture

## Product feeling

IdleCoins debe sentirse premium, energético y muy fácil de entender.

Visual language:
- base dark/high contrast;
- accent fuerte para acciones;
- números grandes;
- tarjetas compactas;
- iconografía clara;
- motion sutil;
- jerarquía fuerte.

## Primary navigation

Game | Earn | Missions | Wallet | Referrals | Profile

## Game screen

Primer viewport:
- total Coins;
- Coins per second;
- acción principal;
- milestone actual;
- upgrade recomendado;
- boost activo.

El jugador no debería buscar la siguiente acción.

## Attention hierarchy

### Ahora
click, collect, claim, buy.

### Próximo
next upgrade, next milestone, active mission.

### Largo plazo
prestige, collection, season, leaderboard.

## Reward presentation

```
+2.450 Coins
+18 XP
BOOST +25%
```

La animación confirma el resultado; nunca debe ocultar información.

## Milestones

Los hitos grandes pueden usar:
- pulse;
- count-up;
- badge;
- unlock reveal;
- sonido;
- nuevo objetivo.

La celebración debe terminar rápido.

## Earn

Distinguir siempre:
- game reward;
- pending money reward;
- available money reward.

Mostrar:
- proveedor;
- tarea;
- tiempo estimado;
- recompensa;
- condiciones;
- estado.

## Wallet

Mostrar:
- available;
- pending;
- withdrawn;
- minimum withdrawal;
- history;
- status.

La UI monetaria debe ser factual, no presionante.

## Trust UX

Nunca mostrar pending como withdrawable.

Cuando existe una restricción, mostrar una categoría de motivo útil sin revelar señales antifraude sensibles.

## Notifications

Buenas:
"Generator ready for upgrade."
"Your offline production is waiting."

Evitar:
"LAST CHANCE!!!"
"YOU'RE LOSING MONEY!"
"DEPOSIT NOW!"

## Accessibility

- respetar reduced motion;
- no depender solo del color;
- keyboard navigation;
- screen-reader labels;
- legibilidad al 200% de zoom.
