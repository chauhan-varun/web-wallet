import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useEffect, useState } from "react";

export function GetBalance() {
  const wallet = useWallet();
  const { connection } = useConnection();
  const [balance, setBalance] = useState(null);
  const [loading, setLoading] = useState(false);

  async function getUserBalance() {
    if (!wallet.publicKey) return;

    setLoading(true);
    try {
      const amount = await connection.getBalance(wallet.publicKey);
      setBalance(amount / LAMPORTS_PER_SOL);
    } catch (error) {
      console.error("Error fetching balance:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (wallet.publicKey) {
      getUserBalance();
    } else {
      setBalance(null);
    }
  }, [wallet.publicKey, connection]);

  return (
    <div className="flex flex-col items-center">
      <div className="mb-4 text-center w-full">
        {!wallet.publicKey ? (
          <div className="text-sm sm:text-base text-slate-500">
            Connect your wallet to view balance
          </div>
        ) : loading ? (
          <div className="text-sm sm:text-base text-slate-500">Loading...</div>
        ) : (
          <div className="flex items-baseline justify-center">
            <span className="text-2xl sm:text-3xl font-bold text-slate-800 break-all">
              {balance !== null ? balance : "-"}
            </span>
            <span className="ml-1 text-xs sm:text-sm text-slate-600">SOL</span>
          </div>
        )}
      </div>
      {wallet.publicKey && (
        <button
          onClick={getUserBalance}
          className="px-3 py-2 text-sm bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-md transition-colors w-full sm:w-auto"
        >
          Refresh Balance
        </button>
      )}
    </div>
  );
}
