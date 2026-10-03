import type { UserId, WalletId, WithdrawalId } from "./ids.js";

export type LedgerEntryType =
  | "REWARD_CREDIT"
  | "MANUAL_CREDIT"
  | "REVERSAL"
  | "WITHDRAWAL_RESERVATION"
  | "WITHDRAWAL_RELEASE"
  | "PAYOUT";

export type WithdrawalStatus =
  | "REQUESTED"
  | "RISK_CHECK"
  | "APPROVED"
  | "PROCESSING"
  | "PAID"
  | "REJECTED"
  | "CANCELLED";

export interface Wallet {
  id: WalletId;
  userId: UserId;
  currency: string;
  pendingMinor: string;
  availableMinor: string;
  reservedMinor: string;
  paidMinor: string;
  createdAt: string;
  updatedAt: string;
}

export interface LedgerEntry {
  id: string;
  walletId: WalletId;
  userId: UserId;
  type: LedgerEntryType;
  status: "POSTED" | "VOIDED";
  amountMinor: string;
  currency: string;
  externalReference: string | null;
  idempotencyKey: string | null;
  reasonCode: string;
  createdAt: string;
}

export interface WithdrawalRequest {
  id: WithdrawalId;
  walletId: WalletId;
  userId: UserId;
  amountMinor: string;
  currency: string;
  destinationType: "PAYMENT_PROVIDER" | "BANK" | "OTHER";
  destinationRef: string;
  status: WithdrawalStatus;
  riskScore: number | null;
  rejectionReason: string | null;
  providerPayoutId: string | null;
  requestedAt: string;
  processedAt: string | null;
}

export interface WalletSnapshot {
  currency: string;
  pendingMinor: string;
  availableMinor: string;
  reservedMinor: string;
  paidMinor: string;
  minimumWithdrawalMinor: string;
}
