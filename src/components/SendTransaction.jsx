import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import {
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export function Tokens() {
  const wallet = useWallet();
  const { connection } = useConnection();
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  async function sendToken() {
    if (!recipient || !amount || !wallet.publicKey) return;

    // Create loading toast that we'll update later
    const toastId = toast.loading("Preparing transaction...");
    setLoading(true);

    try {
      // Validate recipient address
      let recipientPubKey;
      try {
        recipientPubKey = new PublicKey(recipient);
      } catch (err) {
        toast.error("Invalid recipient address", { id: toastId });
        return;
      }

      toast.loading("Building transaction...", { id: toastId });
      const transaction = new Transaction();
      transaction.add(
        SystemProgram.transfer({
          fromPubkey: wallet.publicKey,
          toPubkey: recipientPubKey,
          lamports: parseFloat(amount) * LAMPORTS_PER_SOL,
        })
      );

      toast.loading("Sending transaction...", { id: toastId });
      const signature = await wallet.sendTransaction(transaction, connection);

      toast.loading("Confirming transaction...", { id: toastId });
      const confirmation = await connection.confirmTransaction(
        signature,
        "confirmed"
      );

      if (confirmation.value.err) {
        throw new Error("Transaction failed to confirm");
      }

      // Success! Update the toast and reset form
      toast.success(`Successfully sent ${amount} SOL!`, { id: toastId });
      setAmount("");
      setRecipient("");
    } catch (err) {
      console.error("Error sending transaction:", err);
      toast.error(`Transaction failed: ${err.message}`, { id: toastId });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col">
      {/* Changed position from bottom-center to top-center */}
      <Toaster position="top-center" toastOptions={{ duration: 5000 }} />

      {!wallet.publicKey ? (
        <div className="text-sm sm:text-base text-slate-500 text-center">
          Connect your wallet to send tokens
        </div>
      ) : (
        <>
          <div className="mb-3">
            <label
              htmlFor="pubKey"
              className="block text-sm font-medium text-slate-700 mb-1"
            >
              Recipient Address
            </label>
            <input
              id="pubKey"
              type="text"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              placeholder="Enter recipient's public key"
              className="block w-full px-3 py-2 mb-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 overflow-ellipsis"
              disabled={loading}
            />
          </div>

          <div className="mb-3">
            <label
              htmlFor="amt"
              className="block text-sm font-medium text-slate-700 mb-1"
            >
              Amount (SOL)
            </label>
            <input
              id="amt"
              type="number"
              min="0.000001"
              step="0.000001"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.1"
              className="block w-full px-3 py-2 mb-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              disabled={loading}
            />
          </div>

          <button
            onClick={sendToken}
            disabled={loading || !amount || !recipient}
            className="w-full px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors touch-manipulation"
          >
            {loading ? "Processing..." : "Send SOL"}
          </button>
        </>
      )}
    </div>
  );
}
