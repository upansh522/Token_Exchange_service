import { sleep } from "../utils/sleep";
import { getBasePrice } from "./getBasePrice";

export class MeteoraService {
  async getQuote(
    tokenIn: string,
    tokenOut: string,
    amount: number
  ) {
    await sleep(200);

    const basePrice = getBasePrice(tokenIn, tokenOut);

    const price =
      basePrice * (0.97 + Math.random() * 0.05);

    return {
      dex: "meteora",
      price,
      fee: 0.002,
      effectivePrice: price * (1 - 0.002)
    };
  }
}
