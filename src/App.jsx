import React, { useMemo } from "react";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import {
  WalletModalProvider,
  WalletDisconnectButton,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import { clusterApiUrl } from "@solana/web3.js";
import "@solana/wallet-adapter-react-ui/styles.css";
import { RequestAirdrop } from "./components/requestAirdrop";
import { GetBalance } from "./components/GetBalance";
import { Tokens } from "./components/SendTransaction";
import { SignMessage } from "./components/SignMessage";

function App() {
  const network = WalletAdapterNetwork.Devnet;
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={[]} autoConnect>
        <WalletModalProvider>
          <div className="min-h-screen bg-slate-100 flex flex-col">
            {/* Header */}
            <header className="bg-white shadow-sm border-b border-slate-200">
              <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-3 sm:py-4">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                  <h1 className="text-xl sm:text-2xl font-bold text-slate-800 mb-3 sm:mb-0">
                    Solana Web Wallet
                  </h1>
                  <div className="flex flex-wrap gap-2">
                    <WalletMultiButton />
                    <WalletDisconnectButton />
                  </div>
                </div>
              </div>
            </header>

            {/* Main content */}
            <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                {/* Wallet Balance Card */}
                <div className="bg-white shadow-sm rounded-lg p-4 sm:p-6 border border-slate-200">
                  <h2 className="text-lg font-medium text-slate-900 mb-4">
                    Wallet Balance
                  </h2>
                  <GetBalance />
                </div>

                {/* Request Airdrop Card */}
                <div className="bg-white shadow-sm rounded-lg p-4 sm:p-6 border border-slate-200">
                  <h2 className="text-lg font-medium text-slate-900 mb-4">
                    Request Airdrop
                  </h2>
                  <RequestAirdrop />
                </div>

                {/* Token Transfer Card */}
                <div className="bg-white shadow-sm rounded-lg p-4 sm:p-6 border border-slate-200">
                  <h2 className="text-lg font-medium text-slate-900 mb-4">
                    Send Tokens
                  </h2>
                  <Tokens />
                </div>

                {/* Sign Message Card */}
                <div className="bg-white shadow-sm rounded-lg p-4 sm:p-6 border border-slate-200">
                  <h2 className="text-lg font-medium text-slate-900 mb-4">
                    Sign Message
                  </h2>
                  <SignMessage />
                </div>
              </div>
            </main>

            {/* Footer */}
            <footer className="bg-white border-t border-slate-200 py-3 sm:py-4 mt-auto">
              <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
                <p className="text-center text-xs sm:text-sm text-slate-500">
                  Built with Solana Web3.js and Wallet Adapter
                </p>
              </div>
            </footer>
          </div>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}

export default App;
