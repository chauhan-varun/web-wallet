import { useConnection, useWallet } from "@solana/wallet-adapter-react"
import { LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction  } from "@solana/web3.js";

export function Tokens(){
    const wallet = useWallet();
    const { connection } = useConnection();

    async function sendToken() {
        let to = document.getElementById("pubKey").value;
        let amount = document.getElementById("amt").value;
        const transaction = new Transaction(); 
        transaction.add(SystemProgram.transfer({
            fromPubkey: wallet.publicKey,
            toPubkey: new PublicKey(to),
            lamports: amount * LAMPORTS_PER_SOL
        }));

        await wallet.sendTransaction(transaction, connection)  //important
        alert(`${amount} SOL has send to ${to} account`);
        console.log(`${amount} SOL has send to ${to} account`);
        
    }
    


    return <>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <input id="pubKey" type="text" placeholder="public key which you want to send"/>
            <input id="amt" type="text" placeholder="amount"/>
            <button onClick={sendToken}>Send</button>
        </div>
    </>
}