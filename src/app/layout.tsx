import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
// import ManualHeader from "@/components/ManualHeader"
import Header from "@/components/Header"
import MoralisProviderComponent from "@/context/MoralisProvider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
    title: "Create Next App",
    description: "Generated by create next app",
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <MoralisProviderComponent>
                    {/* <ManualHeader /> */}
                    <Header/>
                    {children}
                </MoralisProviderComponent>
            </body>
        </html>
    )
}
