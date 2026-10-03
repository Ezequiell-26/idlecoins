export type IntegrationStatus = "ACTIVE" | "PAUSED" | "DISABLED";

export interface ProviderConfig {
  id: string;
  name: string;
  category: "ADS" | "OFFERS" | "SURVEYS" | "PAYOUTS" | "ANALYTICS";
  status: IntegrationStatus;
  countries: string[];
  createdAt: string;
  updatedAt: string;
}

export interface ProviderCallback {
  providerId: string;
  externalEventId: string;
  signature: string;
  receivedAt: string;
  payload: string;
}

export interface RewardedAdSession {
  id: string;
  providerId: string;
  userId: string;
  placement: string;
  status: "CREATED" | "STARTED" | "COMPLETED" | "REJECTED" | "EXPIRED";
  rewardType: "COINS" | "BOOST" | "ENERGY" | "MISSION_REROLL";
  rewardValue: string;
  createdAt: string;
  completedAt: string | null;
}

export interface PayoutAttempt {
  id: string;
  withdrawalId: string;
  providerId: string;
  status: "CREATED" | "SUBMITTED" | "PROCESSING" | "PAID" | "FAILED";
  providerPayoutId: string | null;
  providerReference: string | null;
  attemptedAt: string;
  completedAt: string | null;
  errorCode: string | null;
}
