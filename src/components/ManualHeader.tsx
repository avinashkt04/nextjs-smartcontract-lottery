"use client"
import React, { useEffect } from "react"
import { useMoralis } from "react-moralis"

function ManualHeader() {
    const { enableWeb3, account, isWeb3Enabled, Moralis, deactivateWeb3, isWeb3EnableLoading } = useMoralis()

    useEffect(() => {
        if (isWeb3Enabled) return
        if (typeof window !== "undefined") {
            if (window.localStorage.getItem("connected")) {
                enableWeb3()
            }
        }
    }, [isWeb3Enabled])

    useEffect (() => {
      Moralis.onAccountChanged((account) => {
        console.log(`Account changed to ${account}`)
        if (account == null) {
          window.localStorage.removeItem("connected")
          deactivateWeb3()
          console.log("No account found")
        }
      })
    }, [])
    return (
        <div>
            {account ? (
                <p>
                    Connected to {account.slice(0, 6)}...{account.slice(account.length - 4)}
                </p>
            ) : (
                <button
                    onClick={async () => {
                        await enableWeb3()
                        if (typeof window !== "undefined") {
                            window.localStorage.setItem("connected", "true")
                        }
                    }}
                    disabled={isWeb3EnableLoading}
                >
                    Connect
                </button>
            )}
        </div>
    )
}

export default ManualHeader
