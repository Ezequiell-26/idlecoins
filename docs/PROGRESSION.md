# Progression & Momentum System

## Objective
IdleCoins debe transmitir avance de forma prácticamente continua.

> hice algo -> gané algo -> mejoré algo -> desbloqueé algo -> ahora puedo ganar más.

## Golden rule
Nunca dejar al jugador en un estado donde no exista una próxima victoria razonablemente alcanzable.

En todo momento debe existir al menos:
- una microvictoria inmediata;
- un objetivo de pocos minutos;
- una meta de sesión;
- una meta de largo plazo.

## Four layers of winning

### 1. Micro-win
Frecuencia: segundos.

Ejemplos: +Coins, combo, progress tick, XP, energy regeneration y misión avanzando.

### 2. Upgrade win
Frecuencia inicial objetivo: 30-120 segundos.

Ejemplos: comprar upgrade, aumentar click power, aumentar production/sec o desbloquear un slot.

### 3. Unlock win
Frecuencia: varios minutos.

Ejemplos: nuevo building, automatización, nueva misión, nueva zona o nuevo sistema.

### 4. Meta win
Frecuencia: horas, días o semanas.

Ejemplos: prestige, achievement, league promotion, collection set o season milestone.

## Progression chain
ACTION -> REWARD -> POWER INCREASE -> FASTER PROGRESS -> UNLOCK -> NEW STRATEGY -> BIGGER REWARD

El jugador debe notar la aceleración.

## No dead-end progression
Si una compra importante está lejos, siempre debe existir una alternativa alcanzable.

Las alternativas deben ser gameplay real: una misión cercana, un upgrade barato, una colección, un evento o un boost.

## Near-win design
Las metas deben mostrar progreso real: 92/100 clicks, 760/1.000 Coins, 4/5 missions, 8/10 upgrades.

Cuando una meta esté cerca, debe ser inmediatamente identificable.

## Escalation
La frecuencia de victorias puede bajar progresivamente mientras aumenta su impacto.

Early: muchas victorias pequeñas.
Mid: menos victorias, pero más fuertes.
Late: victorias grandes y estratégicas.

## Power acceleration
El crecimiento debe sentirse exponencial, aunque la economía permanezca controlada.

Ejemplo perceptual: 1/s -> 6/s -> 42/s -> 350/s -> 4.2K/s -> 60K/s.

## Comeback mechanics
Al regresar después de una pausa, el usuario debe encontrar progreso listo para reclamar:
- offline production;
- resumen de lo ocurrido;
- siguiente upgrade razonable;
- una acción principal clara.

No se destruye saldo ni progreso por ausencia.

## Soft catch-up
Los jugadores rezagados pueden recibir caminos de recuperación exclusivamente de gameplay:
- temporary production boost;
- mission chain;
- cheaper next upgrade;
- accelerated offline collection.

Nunca se convierte esto en dinero retirable automático.

## Milestone cadence
Cada milestone importante debe introducir algo nuevo: recompensa + unlock + nueva decisión.

No diseñar milestones que solamente sumen una cifra.

## Meaningful upgrades
Cada upgrade debe cambiar una métrica comprensible: +25% production, +5 click power, +1 slot, +10% offline cap.

## Recommended action
El juego puede recomendar una única acción principal explicando por qué es valiosa.

Ejemplo: Upgrade Mine Lv. 4 / Cost 2.8K / Result +140/s.

## Session arc
ENTER -> collect offline -> small upgrade -> mission -> milestone -> unlock -> boost -> strategic choice -> clear next goal -> EXIT.

Al salir, el usuario debe saber qué estará esperando su próximo regreso.

## Metrics
- time_to_first_reward
- time_to_first_upgrade
- time_to_first_unlock
- wins_per_session
- meaningful_actions_per_session
- percent_sessions_with_unlock
- goal_completion_percent
- dead_end_sessions
- return_after_offline_reward
- prestige_frequency

### Critical metric
`dead_end_sessions` debe tender a cero.

Una sesión es dead-end cuando el jugador no tiene ninguna acción razonable de bajo/medio esfuerzo que produzca progreso perceptible.