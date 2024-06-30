"use client"

import { MoralisProvider } from "react-moralis"
import { NotificationProvider } from "web3uikit"

export default function MoralisProviderComponent({ children }: { children: React.ReactNode }) {
    return (
        <MoralisProvider initializeOnMount={false}>
            <NotificationProvider>{children}</NotificationProvider>
        </MoralisProvider>
    )
}
