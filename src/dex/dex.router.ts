import { RaydiumService } from "./raydium.service";
import { MeteoraService } from "./meteora.service";
import { DexQuote } from "../types/dex";

const raydium = new RaydiumService();
const meteora = new MeteoraService();

/*
 * Fetch quotes from Raydium and Meteora in parallel
 * and return the best effective price.
 */
export async function getBestDexQuote(
    tokenIn: string,
    tokenOut: string,
    amount: number
): Promise<DexQuote> {
    // Fetch both quotes in parallel
    const [raydiumQuote, meteoraQuote] = await Promise.all([
        raydium.getQuote(tokenIn, tokenOut, amount) as Promise<DexQuote>,
        meteora.getQuote(tokenIn, tokenOut, amount) as Promise<DexQuote>
    ]);

    // Compare effective prices (price after fee)
    const bestQuote =
        raydiumQuote.effectivePrice >
            meteoraQuote.effectivePrice
            ? raydiumQuote
            : meteoraQuote;

    return bestQuote;
}
