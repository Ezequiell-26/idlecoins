export type MoneyStatus =
  | "PENDING"
  | "AVAILABLE"
  | "RESERVED"
  | "PAID"
  | "REVERSED"
  | "CANCELLED";

export type LedgerEntryType =
  | "REWARD_CREDIT"
  | "MANUAL_CREDIT"
  | "REVERSAL"
  | "WITHDRAWAL_RESERVATION"
  | "WITHDRAWAL_RELEASE"
  | "PAYOUT";

export interface MoneyAmount {
  minor: bigint;
  currency: string;
}

export interface WalletBalance {
  pending: MoneyAmount;
  available: MoneyAmount;
  reserved: MoneyAmount;
  paid: MoneyAmount;
}

export interface LedgerEntry {
  id: string;
  walletId: string;
  userId: string;
  type: LedgerEntryType;
  status: "POSTED" | "VOIDED";
  amount: MoneyAmount;
  externalReference: string | null;
  idempotencyKey: string | null;
  reasonCode: string;
  createdAtMs: number;
}

export interface RewardRecord {
  id: string;
  userId: string;
  providerId: string;
  providerEventId: string;
  amount: MoneyAmount;
  status: MoneyStatus;
  sourceType: "TASK" | "OFFER" | "SPONSORED" | "AD";
  sourceId: string | null;
  receivedAtMs: number;
  validatedAtMs: number | null;
  reversedAtMs: number | null;
}

export interface Withdrawal {
  id: string;
  userId: string;
  walletId: string;
  amount: MoneyAmount;
  status:
    | "REQUESTED"
    | "RISK_CHECK"
    | "APPROVED"
    | "PROCESSING"
    | "PAID"
    | "REJECTED"
    | "CANCELLED";
  destinationRef: string;
  riskScore: number | null;
  providerPayoutId: string | null;
  createdAtMs: number;
  completedAtMs: number | null;
}
