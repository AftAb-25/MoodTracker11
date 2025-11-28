// components/sample.tsx
"use client"

import { useState } from "react"
import { useAccount } from "wagmi"
import { useWillContract } from "@/hooks/useContract"

const MAX_MOOD_LENGTH = 256

const SampleIntregation = () => {
  const { isConnected, address } = useAccount()
  const [newMood, setNewMood] = useState("")

  const { data, actions, state } = useWillContract()

  const trimmedMood = newMood.trim()
  const moodLength = newMood.length
  const isValidMood = trimmedMood.length > 0 && moodLength <= MAX_MOOD_LENGTH
  const isBusy = state.isLoading || state.isPending

  const handleSetMood = async () => {
    if (!isValidMood) return
    try {
      await actions.setMood(trimmedMood)
      setNewMood("")
    } catch (err) {
      console.error("Error:", err)
    }
  }

  const handleClear = () => {
    if (isBusy) return
    setNewMood("")
  }

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-card border border-border rounded-xl p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-foreground mb-3">On-Chain Mood Tracker</h2>
          <p className="text-muted-foreground text-sm mb-4">
            Connect your wallet to read and update your mood on the Flare Coston2 testnet.
          </p>
          <ul className="text-xs text-muted-foreground space-y-1 list-disc list-inside">
            <li>View the globally stored on-chain mood</li>
            <li>Update your mood via a blockchain transaction</li>
            <li>See live transaction and confirmation status</li>
          </ul>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-2xl mx-auto space-y-8">
        {/* Header */}
        <header className="space-y-3">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-foreground">On-Chain Mood Tracker</h1>
              <p className="text-muted-foreground text-sm mt-1">
                Store and update your current mood on the Flare Coston2 testnet.
              </p>
            </div>
            <span className="inline-flex items-center rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
              Network: <span className="ml-1 text-foreground">Flare Coston2</span>
            </span>
          </div>
          {address && (
            <p className="text-xs text-muted-foreground break-all">
              Connected wallet: <span className="font-mono text-foreground">{address}</span>
            </p>
          )}
        </header>

        {/* Current Mood */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-card border border-border rounded-xl p-4 flex flex-col justify-between">
            <div>
              <p className="text-muted-foreground text-xs uppercase tracking-wide mb-2">
                Current On-Chain Mood
              </p>
              <p className="text-sm text-muted-foreground mb-1">
                This is the latest mood stored in the smart contract.
              </p>
            </div>
            <div className="mt-3 rounded-lg bg-muted px-3 py-2 min-h-[3rem] flex items-center">
              <p className="text-base font-medium text-foreground break-words">
                {data.mood ? <span>&quot;{data.mood}&quot;</span> : <span>No mood set yet.</span>}
              </p>
            </div>
          </div>

          <div className="bg-card border border-border rounded-xl p-4">
            <p className="text-muted-foreground text-xs uppercase tracking-wide mb-2">
              Transaction Status
            </p>
            <div className="space-y-2 text-sm">
              {state.isLoading || state.isPending || state.isConfirming ? (
                <p className="text-primary">A transaction is currently being processed...</p>
              ) : (
                <p className="text-muted-foreground">
                  No active transaction. You can safely update your mood.
                </p>
              )}
              {state.isConfirmed && (
                <p className="text-green-500">
                  ✅ Last transaction confirmed and mood updated on-chain.
                </p>
              )}
              {state.hash && (
                <div className="mt-2">
                  <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
                    Last Transaction Hash
                  </p>
                  <p className="text-xs font-mono text-foreground break-all">{state.hash}</p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Mood Input */}
        <section className="space-y-3 bg-card border border-border rounded-xl p-4 md:p-5">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold">
                1
              </span>
              <label className="block text-sm font-medium text-foreground">Update Your Mood</label>
            </div>
            <span className="text-xs text-muted-foreground">
              {moodLength}/{MAX_MOOD_LENGTH} characters
            </span>
          </div>

          <textarea
            placeholder="How are you feeling today? (This will be public on-chain, so avoid sensitive information.)"
            value={newMood}
            onChange={(e) => setNewMood(e.target.value)}
            rows={4}
            maxLength={MAX_MOOD_LENGTH}
            disabled={isBusy}
            className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none disabled:opacity-60 disabled:cursor-not-allowed"
          />

          {!isValidMood && moodLength > 0 && (
            <p className="text-xs text-destructive">
              Please enter a non-empty mood within {MAX_MOOD_LENGTH} characters.
            </p>
          )}

          <div className="flex flex-col sm:flex-row gap-3 mt-2">
            <button
              onClick={handleSetMood}
              disabled={!isValidMood || isBusy}
              className="w-full sm:w-auto flex-1 px-6 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
            >
              {isBusy ? "Updating Mood..." : "Update Mood On-Chain"}
            </button>
            <button
              type="button"
              onClick={handleClear}
              disabled={isBusy || newMood.length === 0}
              className="w-full sm:w-auto px-6 py-2 border border-border rounded-lg text-sm font-medium text-muted-foreground hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Clear
            </button>
          </div>

          <p className="text-xs text-muted-foreground mt-1">
            Each update sends a transaction to the smart contract. You&apos;ll see the transaction hash and
            confirmation status once it&apos;s processed.
          </p>
        </section>

        {/* Error Block */}
        {state.error && (
          <section className="p-4 bg-card border border-destructive rounded-xl">
            <p className="text-sm font-medium text-destructive-foreground mb-1">Transaction Error</p>
            <p className="text-xs text-destructive-foreground break-words">
              {state.error.message || "Something went wrong while interacting with the contract."}
            </p>
          </section>
        )}
      </div>
    </div>
  )
}

export default SampleIntregation
