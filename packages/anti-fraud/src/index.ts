export * from "./models.js";

export function assessRisk(signals: import("./models.js").RiskSignals): import("./models.js").RiskAssessment {
  let score = 0;
  const reasons: string[] = [];

  if (signals.knownDuplicateSignal) {
    score += 80;
    reasons.push("duplicate-account-signal");
  }
  if (signals.callbackReplaySignal) {
    score += 50;
    reasons.push("callback-replay");
  }
  if (!signals.providerVerified) {
    score += 40;
    reasons.push("provider-not-verified");
  }
  if (signals.recentTaskCount > 100) {
    score += 25;
    reasons.push("task-velocity");
  }
  if (signals.recentWithdrawalCount > 5) {
    score += 25;
    reasons.push("withdrawal-velocity");
  }
  if (signals.accountAgeSeconds < 300) {
    score += 10;
    reasons.push("new-account");
  }

  const decision =
    score >= 80 ? "BLOCK" :
    score >= 60 ? "REJECT" :
    score >= 40 ? "PENDING_REVIEW" :
    score >= 20 ? "DELAY" : "ALLOW";

  return {
    userId: "unknown",
    score,
    decision,
    reasons,
    rulesVersion: "v1",
    evaluatedAt: new Date().toISOString()
  };
}
