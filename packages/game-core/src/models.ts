export type GameCurrency = "COINS" | "XP" | "ENERGY";

export interface GameState {
  version: number;
  coins: bigint;
  xp: bigint;
  energy: number;
  energyCap: number;
  clickPower: bigint;
  productionPerSecond: bigint;
  prestigeLevel: number;
  permanentMultiplierBps: number;
  lastCheckpointMs: number;
}

export interface Building {
  id: string;
  level: number;
  baseCost: bigint;
  costMultiplierBps: number;
  baseProductionPerSecond: bigint;
  productionGrowthBps: number;
  maxLevel: number | null;
}

export interface Upgrade {
  id: string;
  level: number;
  baseCost: bigint;
  costMultiplierBps: number;
  effectType:
    | "CLICK_POWER"
    | "PRODUCTION"
    | "OFFLINE_CAP"
    | "ENERGY_CAP"
    | "MISSION_REWARD";
  effectValue: bigint;
  maxLevel: number | null;
}

export interface Boost {
  id: string;
  type:
    | "PRODUCTION"
    | "CLICK_POWER"
    | "OFFLINE_COLLECTION"
    | "MISSION_REWARD";
  multiplierBps: number;
  startedAtMs: number;
  expiresAtMs: number;
  source: "GAME" | "REWARDED_AD" | "MISSION" | "EVENT";
}

export interface PrestigeState {
  level: number;
  totalPrestiges: number;
  permanentMultiplierBps: number;
  lifetimeCoinsReset: bigint;
  lastPrestigeAtMs: number | null;
}
