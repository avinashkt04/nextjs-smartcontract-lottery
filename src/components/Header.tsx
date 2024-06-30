"use client"
import { ConnectButton } from "web3uikit"

export default function Header() {
    return (
        <div className="border-b-2 flex justify-between items-center">
            <h1 className="p-4 font-bold text-3xl">Decentralized Lottery</h1>
            <div>
                <ConnectButton moralisAuth={false} />
            </div>
        </div>
    )
}
