import { useConnection, useWallet } from "@solana/wallet-adapter-react"

export function Airdrop(){
    const wallet = useWallet();
    const { connection } = useConnection();

    async function sendAirdrop() {
        const a = document.getElementById("amt").value;
        await connection.requestAirdrop(wallet.publicKey, a * 1000000000);
        alert("airdrop sol")
    }


    return <>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <input id="amt" type="text" placeholder="amount"/>
            <button onClick={sendAirdrop}>Airdrop</button>
        </div>
    </>
}