export interface GameConfig {
  startingCoins: string;
  startingClickPower: string;
  offlineProgressCapSeconds: number;
  baseEnergyCap: number;
}

export interface EconomyConfig {
  currency: string;
  minimumWithdrawalMinor: string;
  defaultPendingWindowSeconds: number;
}

export interface EngagementConfig {
  targetFirstUpgradeSeconds: number;
  targetFirstMilestoneMinutes: number;
  targetFirstAutomationMinutes: number;
  streaksEnabled: boolean;
  eventsEnabled: boolean;
}

export interface SecurityConfig {
  sessionLifetimeSeconds: number;
  maxRequestsPerMinute: number;
  requireSignedProviderCallbacks: boolean;
}

export interface IdleCoinsConfig {
  game: GameConfig;
  economy: EconomyConfig;
  engagement: EngagementConfig;
  security: SecurityConfig;
}
