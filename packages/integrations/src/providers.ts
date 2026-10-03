export interface RewardedAdProvider {
  readonly id: string;
  startRewardedSession(input: {
    userId: string;
    placement: string;
  }): Promise<{ sessionId: string }>;
}

export interface OfferProvider {
  readonly id: string;
  verifyConversion(input: {
    externalEventId: string;
    signature: string;
    payload: string;
  }): Promise<{
    valid: boolean;
    amountMinor?: bigint;
    currency?: string;
  }>;
}

export interface PayoutProvider {
  readonly id: string;
  createPayout(input: {
    withdrawalId: string;
    amountMinor: bigint;
    currency: string;
    destinationRef: string;
  }): Promise<{ providerPayoutId: string }>;
}
