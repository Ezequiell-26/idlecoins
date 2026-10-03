export interface ContentBuilding {
  id: string;
  name: string;
  zoneId: string;
  unlockLevel: number;
  baseCost: bigint;
  costMultiplierBps: number;
  baseProductionPerSecond: bigint;
  productionGrowthBps: number;
  maxLevel: number | null;
}

export interface ContentUpgrade {
  id: string;
  name: string;
  effectType:
    | "CLICK_POWER"
    | "PRODUCTION"
    | "OFFLINE_CAP"
    | "ENERGY_CAP"
    | "MISSION_REWARD";
  unlockLevel: number;
  baseCost: bigint;
  costMultiplierBps: number;
  effectValue: bigint;
  maxLevel: number | null;
}

export interface ActiveBoost {
  id: string;
  type: "PRODUCTION" | "CLICK_POWER" | "MISSION_REWARD";
  multiplierBps: number;
  expiresAtMs: number;
}

const ceilMultiplyDiv = (
  value: bigint,
  multiplier: bigint,
  divisor: bigint
): bigint => {
  const product = value * multiplier;
  return (product + divisor - 1n) / divisor;
};

export function calculateScaledCost(
  baseCost: bigint,
  multiplierBps: number,
  level: number
): bigint {
  let cost = baseCost;
  for (let i = 0; i < level; i += 1) {
    cost = ceilMultiplyDiv(cost, BigInt(multiplierBps), 10000n);
  }
  return cost;
}

export function calculateBuildingProduction(
  baseProductionPerSecond: bigint,
  growthBps: number,
  level: number
): bigint {
  if (level <= 0) return 0n;

  let production = baseProductionPerSecond;
  for (let i = 1; i < level; i += 1) {
    production = ceilMultiplyDiv(production, BigInt(growthBps), 10000n);
  }

  return production;
}

export function sumBuildingProduction(
  definitions: readonly ContentBuilding[],
  levels: Readonly<Record<string, number>>
): bigint {
  return definitions.reduce((total, definition) => {
    const level = levels[definition.id] ?? 0;
    return total + calculateBuildingProduction(
      definition.baseProductionPerSecond,
      definition.productionGrowthBps,
      level
    );
  }, 0n);
}

export function buyCost(
  baseCost: bigint,
  multiplierBps: number,
  currentLevel: number
): bigint {
  return calculateScaledCost(baseCost, multiplierBps, currentLevel);
}

export function isLevelCapReached(
  level: number,
  maxLevel: number | null
): boolean {
  return maxLevel !== null && level >= maxLevel;
}
