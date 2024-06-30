"use client"
import React, { useEffect, useState } from "react"
import { useWeb3Contract } from "react-moralis"
import abi from "@/constants/abi.json"
import contractAddresses from "@/constants/contractAddresses.json"
import { useMoralis } from "react-moralis"
import { ethers } from "ethers"
import { useNotification } from "web3uikit"

interface ContractAddress {
    [key: string]: string[]
}

const address: ContractAddress = contractAddresses as ContractAddress
function LotteryEntrance() {
    const { chainId: chainIdHex, isWeb3Enabled, enableWeb3 } = useMoralis()
    const chainId = parseInt(chainIdHex!)
    const raffleAddress = chainIdHex && chainId in address ? address[chainId][0] : null
    const [entranceFee, setEntranceFee] = useState<string>("0")
    const [numPlayers, setNumPlayers] = useState<string>("0")
    const [recentWinner, setRecentWinner] = useState<string>("0")

    const dispatch = useNotification()

    console.log(raffleAddress)

    const {
        runContractFunction: enterRaffle,
        isLoading,
        isFetching,
    } = useWeb3Contract({
        abi: abi,
        contractAddress: raffleAddress!,
        functionName: "enterRaffle",
        params: {},
        msgValue: entranceFee,
    })

    const { runContractFunction: getEntranceFee } = useWeb3Contract({
        abi: abi,
        contractAddress: raffleAddress!,
        functionName: "getEntranceFee",
        params: {},
    })

    const { runContractFunction: getNumberOfPlayers } = useWeb3Contract({
        abi: abi,
        contractAddress: raffleAddress!,
        functionName: "getNumberOfPlayers",
        params: {},
    })

    const { runContractFunction: getRecentWinner } = useWeb3Contract({
        abi: abi,
        contractAddress: raffleAddress!,
        functionName: "getRecentWinner",
        params: {},
    })

    async function updateUI() {
        const entranceFeeFromCall = (await getEntranceFee())!.toString()
        const numPlayerFromCall = (await getNumberOfPlayers())!.toString()
        const recentWinnerFromCall = (await getRecentWinner())!.toString()
        setEntranceFee(entranceFeeFromCall)
        setNumPlayers(numPlayerFromCall)
        setRecentWinner(recentWinnerFromCall)
    }

    useEffect(() => {
        if (isWeb3Enabled) {
            updateUI()
        }
    }, [isWeb3Enabled])

    const handleSuccess = async function (tx: any) {
        await tx.wait(1)
        handleNotification()
        updateUI()
    }

    const handleNotification = function () {
        dispatch({
            type: "info",
            message: "Transaction Complete!",
            title: "Transaction Notification",
            icon: (
                <span role="img" aria-label="bell">
                    🔔
                </span>
            ),
            position: "topR",
        })
    }

    // const filter = {
    //     address: raffleAddress,
    //     topics: [
    //         ethers.utils.id("WinnerPicked(address)"),
    //     ],
    // }


    return (
        <div>
            LotteryEntrance
            {raffleAddress ? (
                <div>
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 font-bold rounded"
                        onClick={async () => {
                            await enterRaffle({
                                onSuccess: handleSuccess,
                                onError: (error) => console.log(error),
                            })
                        }}
                        disabled={isLoading || isFetching}
                    >
                        {isLoading || isFetching ? <div className="animate-spin h-6 w-6 border-b-2 rounded-full"></div> : "Enter Raffle"}
                    </button>
                    <div>Entrance Fee: {ethers.utils.formatEther(entranceFee)} ETH</div>
                    <div>Number of Players: {numPlayers}</div>
                    <div>Recent Winner: {recentWinner}</div>
                </div>
            ) : (
                <div>No Raffle Address Detected</div>
            )}
        </div>
    )
}

export default LotteryEntrance
