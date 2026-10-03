export type GoalPriority = "PRIMARY" | "SECONDARY" | "META";

export type GoalType =
  | "UPGRADE"
  | "BUILDING"
  | "MISSION"
  | "MILESTONE"
  | "PRESTIGE"
  | "EVENT"
  | "ACHIEVEMENT"
  | "COLLECTION";

export interface ProgressionGoal {
  id: string;
  type: GoalType;
  priority: GoalPriority;
  title: string;
  current: bigint;
  target: bigint;
  rewardSummary: string;
  unlockSummary: string | null;
  available: boolean;
}

export interface GoalContext {
  coins: bigint;
  clickPower: bigint;
  productionPerSecond: bigint;
  prestigeLevel: number;
  activeMissionCount: number;
  nearMilestoneCount: number;
  activeEventCount: number;
}

const completionRatio = (goal: ProgressionGoal): number => {
  if (goal.target <= 0n) return 1;
  const bounded = goal.current > goal.target ? goal.target : goal.current;
  return Number(bounded * 1000n / goal.target) / 1000;
};

export function choosePrimaryGoal(goals: ProgressionGoal[]): ProgressionGoal | null {
  const candidates = goals
    .filter((goal) => goal.available)
    .sort((a, b) => {
      const priorityRank: Record<GoalPriority, number> = {
        PRIMARY: 0,
        SECONDARY: 1,
        META: 2
      };

      const priorityDiff = priorityRank[a.priority] - priorityRank[b.priority];
      if (priorityDiff !== 0) return priorityDiff;

      return completionRatio(b) - completionRatio(a);
    });

  return candidates[0] ?? null;
}

export function hasReasonableNextAction(
  goals: ProgressionGoal[],
  context: GoalContext
): boolean {
  if (goals.some((goal) => goal.available && goal.target <= context.coins)) {
    return true;
  }

  if (context.activeMissionCount > 0) return true;
  if (context.nearMilestoneCount > 0) return true;
  if (context.activeEventCount > 0) return true;

  return goals.some((goal) => goal.available && completionRatio(goal) >= 0.1);
}
