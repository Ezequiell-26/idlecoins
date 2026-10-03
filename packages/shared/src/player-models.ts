import type { UserId } from "./ids.js";

export type AccountStatus = "ACTIVE" | "LIMITED" | "SUSPENDED" | "BANNED";

export interface PlayerProfile {
  userId: UserId;
  username: string;
  displayName: string;
  avatarUrl: string | null;
  countryCode: string | null;
  timezone: string;
  level: number;
  xp: string;
  streakDays: number;
  longestStreakDays: number;
  status: AccountStatus;
  createdAt: string;
  lastSeenAt: string | null;
}

export interface DailyRewardState {
  userId: UserId;
  currentStreak: number;
  lastClaimedDate: string | null;
  nextRewardIndex: number;
  resetOnMiss: boolean;
}

export interface ReferralProfile {
  userId: UserId;
  referralCode: string;
  referredByUserId: UserId | null;
  successfulReferrals: number;
  lifetimeReferralRewardMinor: string;
}
