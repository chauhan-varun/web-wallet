import React, { useMemo } from 'react';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import {
    WalletModalProvider,
    WalletDisconnectButton,
    WalletMultiButton
} from '@solana/wallet-adapter-react-ui';
import { clusterApiUrl } from '@solana/web3.js';
import '@solana/wallet-adapter-react-ui/styles.css';
import { RequestAirdrop } from './components/requestAirdrop';
import { GetBalance } from './components/getBalance';
import { Tokens } from './components/SendTransaction';
import { SignMessage } from './components/SignMessage';

function App() {
  const network = WalletAdapterNetwork.Devnet;

  const endpoint = useMemo(() => clusterApiUrl(network), [network]);

  return (
      <ConnectionProvider endpoint={endpoint}>
          <WalletProvider wallets={[]} autoConnect>
              <WalletModalProvider>
                <div style={{ display: 'flex', justifyContent: "space-between" }}>
                  <WalletMultiButton />
                  <WalletDisconnectButton />
                </div>
                {/* <RequestAirdrop />
                <GetBalance /> */}
                {/* <Tokens /> */}
                <SignMessage />
              </WalletModalProvider>
          </WalletProvider>
      </ConnectionProvider>
  );
}

export default App