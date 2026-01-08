import { sleep } from "../utils/sleep";
import { generateMockTxHash } from "../utils/txHash";
import { Order } from "../types/order";

export async function executeSwap(
  dex: string,
  order: Order,
  price: number
) {
  await sleep(2000 + Math.random() * 1000);

  return {
    dex,
    txHash: generateMockTxHash(),
    executedPrice: price
  };
}
