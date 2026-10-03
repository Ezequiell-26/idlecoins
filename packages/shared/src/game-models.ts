import type {
  AchievementId,
  BuildingId,
  EventId,
  GameId,
  GameStateId,
  MissionId,
  SeasonId,
  UpgradeId,
  UserId
} from "./ids.js";

export type GameCurrency = "COINS" | "XP" | "ENERGY";

export interface PlayerGameState {
  id: GameStateId;
  userId: UserId;
  gameId: GameId;
  version: number;
  coins: string;
  xp: string;
  energy: number;
  clickPower: string;
  productionPerSecond: string;
  prestigeLevel: number;
  permanentMultiplierBps: number;
  lastCheckpointAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface BuildingDefinition {
  id: BuildingId;
  name: string;
  description: string;
  unlockLevel: number;
  baseCostCoins: string;
  costMultiplierBps: number;
  baseProductionPerSecond: string;
  productionGrowthBps: number;
  maxLevel: number | null;
}

export interface PlayerBuilding {
  buildingId: BuildingId;
  level: number;
  totalSpentCoins: string;
  purchasedAt: string;
  updatedAt: string;
}

export interface UpgradeDefinition {
  id: UpgradeId;
  name: string;
  description: string;
  unlockLevel: number;
  baseCostCoins: string;
  costMultiplierBps: number;
  effectType:
    | "CLICK_POWER"
    | "PRODUCTION"
    | "OFFLINE_CAP"
    | "ENERGY_CAP"
    | "MISSION_REWARD";
  effectValue: string;
  maxLevel: number | null;
}

export interface PlayerUpgrade {
  upgradeId: UpgradeId;
  level: number;
  purchasedAt: string;
  updatedAt: string;
}

export interface GameMilestone {
  id: string;
  title: string;
  description: string;
  targetCoins: string;
  rewards: GameReward[];
}

export interface GameReward {
  currency: GameCurrency;
  amount: string;
  referenceId?: string;
}

export interface MissionDefinition {
  id: MissionId;
  title: string;
  description: string;
  type: "CLICK" | "EARN_COINS" | "BUY_UPGRADE" | "BUY_BUILDING" | "COLLECT" | "LOGIN";
  target: string;
  reward: GameReward[];
  expiresAt?: string;
}

export interface PlayerMission {
  missionId: MissionId;
  progress: string;
  claimedAt?: string;
  completedAt?: string;
}

export interface AchievementDefinition {
  id: AchievementId;
  title: string;
  description: string;
  targetType: "COINS" | "CLICKS" | "BUILDINGS" | "PRESTIGE" | "MISSIONS" | "STREAK";
  target: string;
  rewards: GameReward[];
}

export interface PlayerAchievement {
  achievementId: AchievementId;
  unlockedAt: string;
}

export interface SeasonalProgress {
  seasonId: SeasonId;
  level: number;
  xp: string;
  claimedMilestones: string[];
}

export interface GameEvent {
  id: EventId;
  name: string;
  description: string;
  startsAt: string;
  endsAt: string;
  modifiers: EventModifier[];
}

export interface EventModifier {
  type: "PRODUCTION" | "CLICK_POWER" | "MISSION_REWARD" | "XP";
  multiplierBps: number;
}
