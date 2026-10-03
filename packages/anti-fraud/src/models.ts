export type RiskDecision =
  | "ALLOW"
  | "PENDING_REVIEW"
  | "DELAY"
  | "REJECT"
  | "BLOCK";

export interface RiskSignals {
  accountAgeSeconds: number;
  recentTaskCount: number;
  recentWithdrawalCount: number;
  recentRewardMinor: string;
  knownDuplicateSignal: boolean;
  providerVerified: boolean;
  callbackReplaySignal: boolean;
  velocityScore: number;
}

export interface RiskAssessment {
  userId: string;
  score: number;
  decision: RiskDecision;
  reasons: string[];
  rulesVersion: string;
  evaluatedAt: string;
}

export interface FraudEvent {
  id: string;
  userId: string | null;
  category:
    | "DUPLICATE_ACCOUNT"
    | "VELOCITY"
    | "CALLBACK_REPLAY"
    | "REWARD_ANOMALY"
    | "PAYOUT_ANOMALY"
    | "SESSION_ANOMALY";
  severity: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
  evidence: Record<string, string | number | boolean>;
  createdAt: string;
}

export interface RiskPolicy {
  version: string;
  delayScore: number;
  manualReviewScore: number;
  rejectScore: number;
  blockScore: number;
  maxTasksPerHour: number;
  maxWithdrawalsPerDay: number;
  pendingRewardWindowSeconds: number;
}
