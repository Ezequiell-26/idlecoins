export interface PrestigeCalculation {
  eligible: boolean;
  requiredCoins: bigint;
  prestigeLevelGain: number;
  newPermanentMultiplierBps: number;
  resetCoins: bigint;
}

export interface PrestigeConfig {
  firstRequirementCoins: bigint;
  basePermanentMultiplierBps: number;
  multiplierIncreaseBpsPerPrestige: number;
}

export function calculatePrestige(
  currentCoins: bigint,
  currentPrestigeLevel: number,
  config: PrestigeConfig
): PrestigeCalculation {
  const requiredCoins =
    config.firstRequirementCoins *
    BigInt(currentPrestigeLevel + 1) *
    BigInt(currentPrestigeLevel + 1);

  const eligible = currentCoins >= requiredCoins;

  return {
    eligible,
    requiredCoins,
    prestigeLevelGain: eligible ? 1 : 0,
    newPermanentMultiplierBps: eligible
      ? config.basePermanentMultiplierBps +
        currentPrestigeLevel * config.multiplierIncreaseBpsPerPrestige
      : config.basePermanentMultiplierBps +
        Math.max(0, currentPrestigeLevel - 1) *
          config.multiplierIncreaseBpsPerPrestige,
    resetCoins: eligible ? currentCoins : 0n
  };
}
