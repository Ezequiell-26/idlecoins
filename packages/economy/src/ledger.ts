export type RewardStatus =
  | "PENDING"
  | "AVAILABLE"
  | "RESERVED"
  | "PAID"
  | "REVERSED"
  | "CANCELLED";

export interface LedgerEntry {
  id: string;
  walletId: string;
  externalEventId: string | null;
  amountMinor: bigint;
  currency: string;
  status: RewardStatus;
  reason: string;
  createdAt: string;
}

export function isTerminal(status: RewardStatus): boolean {
  return status === "PAID" || status === "REVERSED" || status === "CANCELLED";
}
