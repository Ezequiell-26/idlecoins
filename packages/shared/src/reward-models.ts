import type {
  ProviderId,
  RewardEventId,
  TaskCompletionId,
  TaskId,
  UserId
} from "./ids.js";

export type RewardStatus =
  | "PENDING"
  | "AVAILABLE"
  | "RESERVED"
  | "PAID"
  | "REVERSED"
  | "CANCELLED";

export type TaskCategory =
  | "SURVEY"
  | "OFFER"
  | "VIDEO"
  | "APP_INSTALL"
  | "SPONSORED"
  | "OTHER";

export interface RewardTask {
  id: TaskId;
  providerId: ProviderId;
  title: string;
  description: string;
  category: TaskCategory;
  estimatedMinutes: number | null;
  rewardMinor: string;
  currency: string;
  status: "ACTIVE" | "PAUSED" | "EXPIRED";
  startsAt: string;
  expiresAt: string | null;
  countryCodes: string[];
  termsUrl: string | null;
}

export interface TaskCompletion {
  id: TaskCompletionId;
  taskId: TaskId;
  userId: UserId;
  providerId: ProviderId;
  providerEventId: string | null;
  status: "STARTED" | "PENDING" | "VERIFIED" | "REJECTED" | "REVERSED";
  rewardMinor: string;
  currency: string;
  startedAt: string;
  completedAt: string | null;
  verifiedAt: string | null;
  rejectionReason: string | null;
}

export interface RewardEvent {
  id: RewardEventId;
  userId: UserId;
  providerId: ProviderId;
  providerEventId: string;
  sourceType: "TASK" | "OFFER" | "SPONSORED" | "AD";
  sourceId: string | null;
  amountMinor: string;
  currency: string;
  status: RewardStatus;
  receivedAt: string;
  validatedAt: string | null;
  reversedAt: string | null;
}

export interface RewardSummary {
  pendingMinor: string;
  availableMinor: string;
  paidMinor: string;
  reversedMinor: string;
  currency: string;
}
