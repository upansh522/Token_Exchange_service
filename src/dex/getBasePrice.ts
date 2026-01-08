import { BASE_PRICES } from "./basePrices";

export function getBasePrice(
  tokenIn: string,
  tokenOut: string
): number {
  const key = `${tokenIn}-${tokenOut}`;
  const price = BASE_PRICES[key];

  if (!price) {
    throw new Error(`Unsupported pair: ${key}`);
  }

  return price;
}
