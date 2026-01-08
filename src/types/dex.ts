export interface DexQuote {
  dex: "raydium" | "meteora";
  price: number;
  fee: number;
  effectivePrice: number;
}