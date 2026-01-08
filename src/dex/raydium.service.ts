import { sleep } from "../utils/sleep";
import { getBasePrice } from "./getBasePrice";

export class RaydiumService {
  async getQuote(
    tokenIn: string,
    tokenOut: string,
    amount: number
  ) {
    await sleep(200);

    const basePrice = getBasePrice(tokenIn, tokenOut);

    const price =
      basePrice * (0.98 + Math.random() * 0.04);

    return {
      dex: "raydium",
      price,
      fee: 0.003,
      effectivePrice: price * (1 - 0.003)
    };
  }
}
