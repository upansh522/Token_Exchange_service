import crypto from "crypto";

export function generateMockTxHash(): string {
  return "0x" + crypto.randomBytes(16).toString("hex");
}
