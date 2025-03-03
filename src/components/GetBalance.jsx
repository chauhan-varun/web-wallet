import { useConnection, useWallet } from "@solana/wallet-adapter-react"
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useEffect } from "react";

export function GetBalance(){
    const wallet = useWallet();
    const { connection } = useConnection();

    async function getUserBalance() {
        const amount = await connection.getBalance(wallet.publicKey);
        document.getElementById("balance").innerHTML = amount/LAMPORTS_PER_SOL; 
    }

    useEffect(function(){
        getUserBalance();
    }, [wallet]);

    return <>
        <div style={{ display: "flex", justifyContent: "center" }}>
            Balance: <div id="balance"></div> SOL
        </div>
    </>
}