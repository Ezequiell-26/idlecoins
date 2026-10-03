import type { MoneyStatus } from "./models.js";

export function isTerminal(status: MoneyStatus): boolean {
  return status === "PAID" || status === "REVERSED" || status === "CANCELLED";
}
