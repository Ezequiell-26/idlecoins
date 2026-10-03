export interface AuthenticatedRequestContext {
  userId: string;
  sessionId: string;
  correlationId: string;
  roles: Array<"PLAYER" | "MODERATOR" | "ADMIN" | "FINANCE">;
}

export interface GameCommand {
  type:
    | "CLICK"
    | "BUY_BUILDING"
    | "BUY_UPGRADE"
    | "CLAIM_MISSION"
    | "CLAIM_DAILY_REWARD"
    | "CLAIM_OFFLINE"
    | "PRESTIGE";
  idempotencyKey: string;
  payload: Record<string, string | number | boolean>;
}

export interface RewardCallbackCommand {
  providerId: string;
  providerEventId: string;
  signature: string;
  payload: string;
}

export interface WithdrawalCommand {
  amountMinor: string;
  currency: string;
  destinationRef: string;
  idempotencyKey: string;
}

export interface AdminWalletAdjustment {
  userId: string;
  amountMinor: string;
  currency: string;
  reasonCode: string;
  idempotencyKey: string;
}

export interface ApiError {
  code: string;
  message: string;
  correlationId: string;
}
