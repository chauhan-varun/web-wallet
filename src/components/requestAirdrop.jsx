import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useState } from "react";

export function RequestAirdrop() {
  const wallet = useWallet();
  const { connection } = useConnection();
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  async function requestAirdrop() {
    if (!amount || !wallet.publicKey) return;

    setLoading(true);
    setStatus("Requesting airdrop...");

    try {
      const signature = await connection.requestAirdrop(
        wallet.publicKey,
        parseFloat(amount) * LAMPORTS_PER_SOL
      );

      setStatus("Confirming transaction...");
      try {
        await connection.confirmTransaction(signature, "processed");
        setStatus(`Successfully airdropped ${amount} SOL!`);
        setAmount("");
      } catch (confirmError) {
        console.error("Confirmation error:", confirmError);
        setStatus(`Error confirming transaction: ${confirmError.message}`);
      }
    } catch (error) {
      console.error("Airdrop error:", error);

      // Check for rate limit errors (429)
      if (error.message && error.message.includes("429")) {
        setStatus(
          <span>
            Rate limit reached. Try again later or use an alternative faucet:{" "}
            <a
              href="https://solana-devnet.g.alchemy.com/v2/OmpV8pByLQt4GL68rAeSLc9iKtIgy7ly"
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-600 underline hover:text-indigo-800"
            >
              faucet.solana.com
            </a>
          </span>
        );
      } else {
        setStatus(`Error: ${error.message}`);
      }
    } finally {
      setLoading(false);
      // Don't auto-clear error messages related to rate limits
      if (!status.toString().includes("Rate limit")) {
        setTimeout(() => setStatus(""), 5000);
      }
    }
  }

  return (
    <div className="flex flex-col">
      {!wallet.publicKey ? (
        <div className="text-sm sm:text-base text-slate-500 text-center">
          Connect your wallet to request an airdrop
        </div>
      ) : (
        <>
          <div className="mb-4">
            <label
              htmlFor="amount"
              className="block text-sm font-medium text-slate-700 mb-1"
            >
              Amount (SOL)
            </label>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                id="amount"
                type="number"
                min="0.1"
                step="0.1"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="1.0"
                className="block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                                focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                disabled={loading}
              />
              <button
                onClick={requestAirdrop}
                disabled={loading || !amount}
                className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {loading ? "Processing..." : "Request"}
              </button>
            </div>
          </div>

          {status && (
            <div
              className={`text-xs sm:text-sm mt-2 ${
                status.toString().includes("Error") ||
                status.toString().includes("Rate limit")
                  ? "text-red-600"
                  : status.toString().includes("Success")
                  ? "text-green-600"
                  : "text-slate-600"
              }`}
            >
              {status}
            </div>
          )}

          <div className="text-xs text-slate-500 mt-2">
            Note: Airdrop is limited on devnet (2 SOL per request, ~5 requests
            per day)
          </div>
        </>
      )}
    </div>
  );
}
