"use client"

import { useState } from "react"
import { useReadContract, useWriteContract, useWaitForTransactionReceipt } from "wagmi"
import { contractABI, contractAddress } from "@/lib/contract"

export interface MoodData {
  mood?: string
}

export interface ContractState {
  isLoading: boolean
  isPending: boolean
  isConfirming: boolean
  isConfirmed: boolean
  hash: `0x${string}` | undefined
  error: Error | null
}

export interface ContractActions {
  setMood: (mood: string) => Promise<void>
}

export const useWillContract = () => {
  const [isLoading, setIsLoading] = useState(false)

  const { data: mood } = useReadContract({
    address: contractAddress,
    abi: contractABI,
    functionName: "mood",
  })

  const { writeContractAsync, data: txData, error, isPending } = useWriteContract()

  const hash = (txData as any)?.hash ?? (typeof txData === "string" ? txData : undefined)

  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  })

  const setMood = async (newMood: string) => {
    if (!newMood) return
    try {
      setIsLoading(true)
      await writeContractAsync({
        address: contractAddress,
        abi: contractABI,
        functionName: "setMood",
        args: [newMood],
      })
    } catch (err) {
      console.error("Error setting mood:", err)
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  const data: MoodData = {
    mood: mood as unknown as string | undefined,
  }

  const actions: ContractActions = {
    setMood,
  }

  const state: ContractState = {
    isLoading: isLoading || isPending || isConfirming,
    isPending,
    isConfirming,
    isConfirmed,
    hash: hash as `0x${string}` | undefined,
    error: error as Error | null,
  }

  return { data, actions, state }
}
