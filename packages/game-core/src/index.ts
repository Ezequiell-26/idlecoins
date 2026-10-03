export interface GameState {
  version: number;
  coins: bigint;
  clickPower: bigint;
  productionPerSecond: bigint;
  lastCheckpointMs: number;
}

export interface Upgrade {
  id: string;
  name: string;
  level: number;
  baseCost: bigint;
  costMultiplierBps: bigint;
  productionPerLevel: bigint;
}

export function click(state: GameState): GameState {
  return { ...state, coins: state.coins + state.clickPower };
}

export function calculateOfflineCoins(
  productionPerSecond: bigint,
  elapsedSeconds: bigint,
  capSeconds: bigint
): bigint {
  const cappedSeconds = elapsedSeconds > capSeconds ? capSeconds : elapsedSeconds;
  return productionPerSecond * cappedSeconds;
}

export function applyOfflineProgress(
  state: GameState,
  nowMs: number,
  capSeconds: bigint
): GameState {
  const elapsedMs = Math.max(0, nowMs - state.lastCheckpointMs);
  const elapsedSeconds = BigInt(Math.floor(elapsedMs / 1000));
  const gained = calculateOfflineCoins(
    state.productionPerSecond,
    elapsedSeconds,
    capSeconds
  );

  return {
    ...state,
    coins: state.coins + gained,
    lastCheckpointMs: nowMs
  };
}
