import { ed25519 } from "@noble/curves/ed25519";
import { useWallet } from "@solana/wallet-adapter-react";
import bs58 from "bs58";
import { useState } from "react";

export function SignMessage() {
  const { publicKey, signMessage } = useWallet();
  const [message, setMessage] = useState("");
  const [signature, setSignature] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSign() {
    if (!message) return;

    setLoading(true);
    setError("");
    setSignature("");

    try {
      if (!publicKey) throw new Error("Wallet not connected");
      if (!signMessage)
        throw new Error("Wallet doesn't support message signing");

      const encoder = new TextEncoder();
      const encodedMessage = encoder.encode(message);
      const signatureBytes = await signMessage(encodedMessage);

      // Verify the signature
      if (
        !ed25519.verify(signatureBytes, encodedMessage, publicKey.toBytes())
      ) {
        throw new Error("Message signature verification failed");
      }

      const signatureString = bs58.encode(signatureBytes);
      setSignature(signatureString);
    } catch (err) {
      console.error("Signing error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  function handleCopySignature() {
    if (signature) {
      navigator.clipboard.writeText(signature);
      alert("Signature copied to clipboard!");
    }
  }

  return (
    <div className="flex flex-col">
      {!publicKey ? (
        <div className="text-sm sm:text-base text-slate-500 text-center">
          Connect your wallet to sign messages
        </div>
      ) : (
        <>
          <div className="mb-4">
            <label
              htmlFor="message"
              className="block text-sm font-medium text-slate-700 mb-1"
            >
              Message
            </label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Enter a message to sign"
              rows={3}
              className="block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              disabled={loading}
            />
          </div>

          <button
            onClick={handleSign}
            disabled={loading || !message}
            className="w-full px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors touch-manipulation mb-4"
          >
            {loading ? "Signing..." : "Sign Message"}
          </button>

          {error && (
            <div className="text-xs sm:text-sm mt-2 text-red-600 mb-4 break-words">
              {error}
            </div>
          )}

          {signature && (
            <div className="mt-2">
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Signature
              </label>
              <div className="flex flex-col sm:flex-row">
                <div className="block w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-md text-xs text-slate-700 font-mono overflow-x-auto break-all">
                  {signature}
                </div>
                <button
                  onClick={handleCopySignature}
                  className="mt-2 sm:mt-0 sm:ml-2 px-4 py-2 bg-slate-200 text-slate-600 text-sm rounded hover:bg-slate-300 focus:outline-none w-full sm:w-auto"
                  title="Copy to clipboard"
                >
                  Copy
                </button>
              </div>
              <p className="text-xs text-green-600 mt-1">
                ✓ Signature verified
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
}
