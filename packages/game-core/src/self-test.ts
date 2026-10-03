import {
  calculateBuildingProduction,
  calculatePrestige,
  calculateScaledCost
} from "./index.ts";

const assert = (condition: boolean, message: string): void => {
  if (!condition) throw new Error(message);
};

assert(calculateScaledCost(20n, 11500, 0) === 20n, "level 0 cost mismatch");
assert(calculateScaledCost(20n, 11500, 1) === 23n, "level 1 cost mismatch");

assert(
  calculateBuildingProduction(1n, 11200, 1) === 1n,
  "level 1 production mismatch"
);
assert(
  calculateBuildingProduction(1n, 11200, 2) === 2n,
  "low-production growth must not stall"
);

const firstPrestige = calculatePrestige(1_000_000n, 0, {
  firstRequirementCoins: 1_000_000n,
  basePermanentMultiplierBps: 10_500,
  multiplierIncreaseBpsPerPrestige: 500
});

assert(firstPrestige.eligible, "first prestige should be eligible");
assert(firstPrestige.prestigeLevelGain === 1, "prestige level gain mismatch");
assert(firstPrestige.newPermanentMultiplierBps === 10_500, "first prestige multiplier mismatch");

const lockedPrestige = calculatePrestige(999_999n, 0, {
  firstRequirementCoins: 1_000_000n,
  basePermanentMultiplierBps: 10_500,
  multiplierIncreaseBpsPerPrestige: 500
});

assert(!lockedPrestige.eligible, "prestige should remain locked below requirement");

console.log("IdleCoins game-core self-test: PASS");
