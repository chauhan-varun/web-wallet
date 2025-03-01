import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react"
import { WalletDisconnectButton, WalletModalProvider, WalletMultiButton } from "@solana/wallet-adapter-react-ui"
import { Airdrop } from "./requestAirdrop"
import "@solana/wallet-adapter-react-ui/styles.css"


function App() {
  return (
    <>
      <ConnectionProvider endpoint={"https://solana-devnet.g.alchemy.com/v2/OmpV8pByLQt4GL68rAeSLc9iKtIgy7ly"}>
        <WalletProvider wallets={[]} autoConnect>
          <WalletModalProvider>
            <div>
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <WalletMultiButton></WalletMultiButton>
              <WalletDisconnectButton></WalletDisconnectButton>
              </div>
              <Airdrop />
            </div>
          </WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>
    </>
  )
}

export default App
