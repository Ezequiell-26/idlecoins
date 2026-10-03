import type { Boost, GameState } from "./models.js";
import {
  calculateScaledCost,
  type ContentBuilding,
  type ContentUpgrade,
  sumBuildingProduction
} from "./content.js";

export interface RuntimeGameState extends GameState {
  playerLevel: number;
  lifetimeClicks: bigint;
  lifetimeCoins: bigint;
  offlineCapSeconds: bigint;
  missionRewardMultiplierBps: number;
  buildings: Record<string, number>;
  upgrades: Record<string, number>;
  boosts: Boost[];
}

export interface PurchaseResult {
  state: RuntimeGameState;
  spent: bigint;
}

const activeMultiplier = (
  boosts: readonly Boost[],
  type: Boost["type"],
  nowMs: number
): bigint => boosts
  .filter((boost) => boost.expiresAtMs > nowMs && boost.type === type)
  .reduce((value, boost) => value * BigInt(boost.multiplierBps) / 10000n, 1n);

const productionUpgradeMultiplierBps = (
  definitions: readonly ContentUpgrade[],
  levels: Readonly<Record<string, number>>
): number => definitions.reduce((total, definition) => {
  if (definition.effectType !== "PRODUCTION") return total;
  const level = levels[definition.id] ?? 0;
  return total + Number(definition.effectValue) * level;
}, 10000);

export function totalBuildingProduction(
  definitions: readonly ContentBuilding[],
  state: RuntimeGameState
): bigint {
  return sumBuildingProduction(definitions, state.buildings);
}

export function recalculateProduction(
  buildingDefinitions: readonly ContentBuilding[],
  state: RuntimeGameState,
  nowMs: number,
  upgradeDefinitions: readonly ContentUpgrade[] = []
): bigint {
  const base = totalBuildingProduction(buildingDefinitions, state);
  const upgradeMultiplierBps = productionUpgradeMultiplierBps(
    upgradeDefinitions,
    state.upgrades
  );
  const boostMultiplier = activeMultiplier(state.boosts, "PRODUCTION", nowMs);

  return (
    base *
    BigInt(state.permanentMultiplierBps) *
    BigInt(upgradeMultiplierBps) *
    boostMultiplier
  ) / 1000000000000n;
}

export function performClick(
  state: RuntimeGameState,
  nowMs: number
): RuntimeGameState {
  const clickBoost = activeMultiplier(state.boosts, "CLICK_POWER", nowMs);
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
  nowMs: number,
  upgradeDefinitions: readonly ContentUpgrade[] = []
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
  const nextState = { ...state, buildings };

  return {
    spent: cost,
    state: {
      ...nextState,
      coins: state.coins - cost,
      productionPerSecond: recalculateProduction(
        definitions,
        nextState,
        nowMs,
        upgradeDefinitions
      ),
      lastCheckpointMs: nowMs
    }
  };
}

export function buyUpgrade(
  definitions: readonly ContentUpgrade[],
  state: RuntimeGameState,
  upgradeId: string,
  nowMs: number,
  buildingDefinitions: readonly ContentBuilding[] = []
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
  const nextState: RuntimeGameState = {
    ...state,
    coins: state.coins - cost,
    upgrades,
    clickPower:
      definition.effectType === "CLICK_POWER"
        ? state.clickPower + definition.effectValue
        : state.clickPower,
    energyCap:
      definition.effectType === "ENERGY_CAP"
        ? state.energyCap + Number(definition.effectValue)
        : state.energyCap,
    offlineCapSeconds:
      definition.effectType === "OFFLINE_CAP"
        ? state.offlineCapSeconds + definition.effectValue
        : state.offlineCapSeconds,
    missionRewardMultiplierBps:
      definition.effectType === "MISSION_REWARD"
        ? state.missionRewardMultiplierBps + Number(definition.effectValue)
        : state.missionRewardMultiplierBps,
    lastCheckpointMs: nowMs
  };

  return {
    spent: cost,
    state: {
      ...nextState,
      productionPerSecond: recalculateProduction(
        buildingDefinitions,
        nextState,
        nowMs,
        definitions
      )
    }
  };
}

export function collectOfflineProduction(
  definitions: readonly ContentBuilding[],
  state: RuntimeGameState,
  nowMs: number,
  offlineCapSeconds: bigint,
  upgradeDefinitions: readonly ContentUpgrade[] = []
): RuntimeGameState {
  const elapsedMs = Math.max(0, nowMs - state.lastCheckpointMs);
  const elapsedSeconds = BigInt(Math.floor(elapsedMs / 1000));
  const configuredCap =
    state.offlineCapSeconds > offlineCapSeconds ? state.offlineCapSeconds : offlineCapSeconds;
  const capped = elapsedSeconds > configuredCap ? configuredCap : elapsedSeconds;
  const production = recalculateProduction(
    definitions,
    state,
    nowMs,
    upgradeDefinitions
  );
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
