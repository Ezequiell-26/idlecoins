import type { Boost, GameState } from "./models.js";
import {
  calculateScaledCost,
  type ContentBuilding,
  type ContentUpgrade,
  calculateBuildingProduction,
  sumBuildingProduction
} from "./content.js";

export interface RuntimeGameState extends GameState {
  playerLevel: number;
  lifetimeClicks: bigint;
  lifetimeCoins: bigint;
  buildings: Record<string, number>;
  upgrades: Record<string, number>;
  boosts: Boost[];
}

export interface PurchaseResult {
  state: RuntimeGameState;
  spent: bigint;
}

export function totalBuildingProduction(
  definitions: readonly ContentBuilding[],
  state: RuntimeGameState
): bigint {
  return sumBuildingProduction(definitions, state.buildings);
}

export function recalculateProduction(
  definitions: readonly ContentBuilding[],
  state: RuntimeGameState,
  nowMs: number
): bigint {
  const base = totalBuildingProduction(definitions, state);
  const multiplier = state.boosts
    .filter((boost) => boost.expiresAtMs > nowMs && boost.type === "PRODUCTION")
    .reduce((value, boost) => value * BigInt(boost.multiplierBps) / 10000n, 1n);

  return base * BigInt(state.permanentMultiplierBps) / 10000n * multiplier;
}

export function performClick(
  state: RuntimeGameState,
  nowMs: number
): RuntimeGameState {
  const clickBoost = state.boosts
    .filter((boost) => boost.expiresAtMs > nowMs && boost.type === "CLICK_POWER")
    .reduce((value, boost) => value * BigInt(boost.multiplierBps) / 10000n, 1n);

  const gained = state.clickPower * clickBoost;

  return {
    ...state,
    coins: state.coins + gained,
    xp: state.xp + 1n,
    lifetimeClicks: state.lifetimeClicks + 1n,
    lifetimeCoins: state.lifetimeCoins + gained,
    lastCheckpointMs: nowMs
  };
}

export function buyBuilding(
  definitions: readonly ContentBuilding[],
  state: RuntimeGameState,
  buildingId: string,
  nowMs: number
): PurchaseResult | null {
  const definition = definitions.find((item) => item.id === buildingId);
  if (!definition) return null;

  const currentLevel = state.buildings[buildingId] ?? 0;
  if (definition.maxLevel !== null && currentLevel >= definition.maxLevel) return null;
  const cost = calculateScaledCost(
    definition.baseCost,
    definition.costMultiplierBps,
    currentLevel
  );

  if (state.coins < cost) return null;

  const buildings = { ...state.buildings, [buildingId]: currentLevel + 1 };
  const productionPerSecond = recalculateProduction(
    definitions,
    { ...state, buildings },
    nowMs
  );

  return {
    spent: cost,
    state: {
      ...state,
      coins: state.coins - cost,
      productionPerSecond,
      buildings,
      lastCheckpointMs: nowMs
    }
  };
}

export function buyUpgrade(
  definitions: readonly ContentUpgrade[],
  state: RuntimeGameState,
  upgradeId: string,
  nowMs: number
): PurchaseResult | null {
  const definition = definitions.find((item) => item.id === upgradeId);
  if (!definition) return null;

  const currentLevel = state.upgrades[upgradeId] ?? 0;
  if (definition.maxLevel !== null && currentLevel >= definition.maxLevel) return null;

  const cost = calculateScaledCost(
    definition.baseCost,
    definition.costMultiplierBps,
    currentLevel
  );

  if (state.coins < cost) return null;

  const upgrades = { ...state.upgrades, [upgradeId]: currentLevel + 1 };
  let nextClickPower = state.clickPower;

  if (definition.effectType === "CLICK_POWER") {
    nextClickPower += definition.effectValue;
  }

  return {
    spent: cost,
    state: {
      ...state,
      coins: state.coins - cost,
      clickPower: nextClickPower,
      upgrades,
      lastCheckpointMs: nowMs
    }
  };
}

export function collectOfflineProduction(
  definitions: readonly ContentBuilding[],
  state: RuntimeGameState,
  nowMs: number,
  offlineCapSeconds: bigint
): RuntimeGameState {
  const elapsedMs = Math.max(0, nowMs - state.lastCheckpointMs);
  const elapsedSeconds = BigInt(Math.floor(elapsedMs / 1000));
  const capped = elapsedSeconds > offlineCapSeconds ? offlineCapSeconds : elapsedSeconds;
  const production = recalculateProduction(definitions, state, nowMs);
  const gained = production * capped;

  return {
    ...state,
    coins: state.coins + gained,
    lifetimeCoins: state.lifetimeCoins + gained,
    lastCheckpointMs: nowMs
  };
}

export function clearExpiredBoosts(
  state: RuntimeGameState,
  nowMs: number
): RuntimeGameState {
  return {
    ...state,
    boosts: state.boosts.filter((boost) => boost.expiresAtMs > nowMs)
  };
}

export function addBoost(
  state: RuntimeGameState,
  boost: Boost
): RuntimeGameState {
  return { ...state, boosts: [...state.boosts, boost] };
}

export { calculateBuildingProduction };
