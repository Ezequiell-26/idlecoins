export type UserId = string & { readonly __brand: "UserId" };
export type GameAccountId = string & { readonly __brand: "GameAccountId" };
export type MoneyMinor = bigint & { readonly __brand: "MoneyMinor" };

export type RewardStatus =
  | "PENDING"
  | "AVAILABLE"
  | "RESERVED"
  | "PAID"
  | "REVERSED"
  | "CANCELLED";

export interface RewardEvent {
  id: string;
  userId: UserId;
  provider: string;
  providerEventId: string;
  amountMinor: MoneyMinor;
  currency: string;
  status: RewardStatus;
  occurredAt: string;
}

export interface GameState {
  version: number;
  coins: bigint;
  clickPower: bigint;
  productionPerSecond: bigint;
  lastCheckpointMs: number;
}
