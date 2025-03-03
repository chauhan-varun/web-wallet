import { ed25519 } from '@noble/curves/ed25519'
import { useWallet } from '@solana/wallet-adapter-react'
import bs58 from 'bs58';
import React from 'react';

export function SignMessage(){
    const { publicKey, signMessage } = useWallet();  // Changed to lowercase 'signMessage'

    async function onClick(){
        if(!publicKey) throw new Error("Wallet not connected");
        if(!signMessage) throw new Error("Wallet doesn't support signing a message");

        const message = document.getElementById("msg").value;
        const encoder = new TextEncoder();  // Create encoder instance
        const encodedMsg = encoder.encode(message);  // Properly encode the message
        const signature = await signMessage(encodedMsg);

        if(!ed25519.verify(signature, encodedMsg, publicKey.toBytes())) throw new Error("Msg signature invalid");
        alert(`Message Signature: ${bs58.encode(signature)}`);  // Fixed alert syntax
    };

    return (
        <div>
            <input type="text" id='msg' placeholder='Message' />
            <button onClick={onClick} >Sign</button>
        </div>
    )
}