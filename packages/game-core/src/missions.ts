export interface MissionProgress {
  missionId: string;
  progress: bigint;
  target: bigint;
  completed: boolean;
  claimed: boolean;
}

export interface MissionDefinition {
  id: string;
  type: "CLICK" | "EARN_COINS" | "BUY_BUILDING" | "BUY_UPGRADE" | "PRESTIGE";
  target: bigint;
}

export function updateMissionProgress(
  mission: MissionProgress,
  delta: bigint
): MissionProgress {
  if (mission.completed) return mission;

  const next = mission.progress + delta;
  return {
    ...mission,
    progress: next >= mission.target ? mission.target : next,
    completed: next >= mission.target
  };
}

export function completionPercent(mission: MissionProgress): number {
  if (mission.target <= 0n) return 100;
  const bounded = mission.progress > mission.target ? mission.target : mission.progress;
  return Number(bounded * 100n / mission.target);
}
