import type { UserId } from "./ids.js";

export type DomainEventType =
  | "GAME_CLICKED"
  | "GAME_UPGRADE_PURCHASED"
  | "GAME_BUILDING_PURCHASED"
  | "GAME_MILESTONE_REACHED"
  | "GAME_PRESTIGE"
  | "MISSION_COMPLETED"
  | "DAILY_REWARD_CLAIMED"
  | "TASK_STARTED"
  | "TASK_COMPLETED"
  | "REWARD_PENDING"
  | "REWARD_AVAILABLE"
  | "REWARD_REVERSED"
  | "WITHDRAWAL_REQUESTED"
  | "WITHDRAWAL_APPROVED"
  | "WITHDRAWAL_PAID"
  | "WITHDRAWAL_REJECTED"
  | "FRAUD_DECISION";

export interface DomainEvent<TPayload = Record<string, unknown>> {
  id: string;
  type: DomainEventType;
  aggregateType:
    | "PLAYER"
    | "GAME"
    | "MISSION"
    | "TASK"
    | "REWARD"
    | "WALLET"
    | "WITHDRAWAL"
    | "RISK";
  aggregateId: string;
  userId: UserId | null;
  version: number;
  occurredAt: string;
  payload: TPayload;
  correlationId: string | null;
}
