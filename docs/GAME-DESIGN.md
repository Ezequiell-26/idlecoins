# Game Design

## Design goal

IdleCoins debe producir una sensación constante de **progreso, descubrimiento y dominio**. El jugador debe tener siempre una siguiente mejora, misión o desbloqueo razonable.

La referencia es la intensidad de los mejores juegos incrementales, no las mecánicas de apuesta de casino.

## Core loop

```
Click
  -> produce Coins
  -> compra upgrade
  -> aumenta producción
  -> desbloquea contenido
  -> completa misión
  -> obtiene boost
  -> descubre siguiente objetivo
```

## One-more-upgrade loop

Cada sesión debe mostrar:

1. objetivo actual;
2. progreso;
3. recompensa;
4. siguiente desbloqueo.

Ejemplo:

```
HITO
1.000 / 1.250 Coins

████████████████░░░ 80%

Al llegar:
+1 Generator slot
+25% production
Nuevo sector
```

## Feedback inmediato

Cada acción importante debe generar feedback:
- número que sube;
- microanimación;
- partículas;
- sonido opcional;
- progreso actualizado.

Las celebraciones deben ser breves y no ocultar controles.

## Progression layers

### Instant
Click, Coins, combo visual y micro feedback.

### Minutes
Upgrade, mission, boost y unlock.

### Session
Nuevo edificio, zona, achievement o milestone.

### Days
Streak, collection, prestige y event progress.

### Long term
Mastery, seasonal progression y league rank.

## Excitement without gambling

Permitido para gameplay:
- recompensas variables de Coins/XP/cosméticos;
- cofres obtenidos jugando;
- eventos;
- multiplicadores;
- descubrimientos;
- rachas.

Evitar:
- apuestas de Coins o dinero;
- ruletas pagadas;
- pérdida de dinero por azar;
- recompensas monetarias aleatorias compradas;
- probabilidades ocultas;
- falsas situaciones de "casi ganas";
- presión artificial para depositar o retirar.

Las recompensas puramente lúdicas deben permanecer separadas del balance monetario.

## Streaks

Ejemplo:

```
Día 1 +500 Coins
Día 2 +750
Día 3 +1.000
Día 4 +boost
Día 5 +2.000
Día 6 +XP
Día 7 +cosmetic
```

Perder el streak no destruye progreso ni saldo.

## Prestige

El prestigio reinicia una capa temporal para entregar un multiplicador permanente:

```
RESET:
- buildings
- temporary bonuses

KEEP:
- prestige
- permanent multiplier
- achievements
- cosmetics
```

## Events

Eventos de corta duración:
- Production Rush
- Double Mission XP
- Factory Challenge
- Weekend Sector
- Community Milestone

Las reglas, fechas y condiciones deben ser visibles.

## Social

- leaderboard semanal;
- leagues;
- achievements;
- profile level;
- badges;
- friends comparison;
- seasonal progression.

## Offline return

Al regresar:

```
BIENVENIDO DE VUELTA

Ausente: 6h 42m
Producción acumulada: +184.200 Coins

BONUS
+10% production durante 15 min

[RECLAMAR]
```

## Rewarded ads

Los anuncios recompensados aportan beneficios de gameplay:
- x2 production;
- instant offline collection;
- energy;
- mission reroll;
- temporary boost.

No se deben presentar como una apuesta o como una garantía de efectivo retirable.

## Pacing

La curva debe alternar progreso rápido, decisión, acumulación, gran hito y desbloqueo nuevo.

La pregunta que debe responder la interfaz es:

**¿Qué tengo? ¿Qué puedo mejorar? ¿Qué viene después?**
