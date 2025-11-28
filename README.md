# On-Chain Mood Tracker DApp

## Contract Address

- **Mood Contract (Flare Coston2 Testnet)**: `0x167799e9066B38F23413f9d86d805BdB1deEba2A`  
- **Block Explorer**: https://coston2-explorer.flare.network/address/0x167799e9066B38F23413f9d86d805BdB1deEba2A
- <img width="1823" height="965" alt="image" src="https://github.com/user-attachments/assets/815e6f42-0446-48aa-81a7-05bb10a7074e" />


---

## Description

The **On-Chain Mood Tracker DApp** is a simple, educational decentralized application built on the **Flare Coston2 testnet**. It allows users to store and update their current mood directly on-chain via a minimal Solidity smart contract.

The contract exposes a small, focused API:

- `mood` – a public string variable that holds the latest mood set on-chain.
- `getMood()` – a view function that returns the current stored mood.
- `setMood(string _mood)` – a transaction function that updates the on-chain mood.

The frontend integrates with this contract using **wagmi** and **viem**, providing a clean React-based interface for:

- Reading the current on-chain mood.
- Submitting a new mood via a connected wallet.
- Displaying transaction states (pending, confirming, confirmed) and errors.

This project is intended as a beginner-friendly example of how to connect a React UI to a live smart contract on a test network, while still following good practices like wallet gating, loading states, and error handling.

---

## Features

- **Live On-Chain Mood Storage**
  - Persist a string-based mood value on the Flare Coston2 testnet.
  - Anyone can read the currently stored mood via the contract.

- **Wallet-Gated Interactions**
  - Users must connect a Web3 wallet to update the mood.
  - Read operations are performed through the contract but the UI still guides the user through wallet connection for full interaction.

- **Type-Safe Contract Integration**
  - Contract address and ABI are exported from `lib/contract.ts` in a format compatible with **viem** / **wagmi**.
  - Strong TypeScript typing for contract interactions and UI state.

- **React Hook for Contract Logic**
  - `useWillContract` (repurposed as the mood contract hook) encapsulates:
    - Reading the current mood using `useReadContract`.
    - Writing new moods using `useWriteContract`.
    - Tracking transaction lifecycle with `useWaitForTransactionReceipt`.
    - Exposing a clean `data`, `actions`, and `state` interface to the UI.

- **User-Friendly UI**
  - Simple, responsive layout built with modern utility-first CSS classes.
  - Clear status indicators for:
    - Transaction hash.
    - Pending/confirming states.
    - Success and error messages.
  - Input validation for empty moods.

- **Educational and Extensible**
  - The project structure (contract library, custom hook, sample UI component) is designed to be:
    - Easy to understand for beginners.
    - Straightforward to extend with more features (e.g., mood history, per-address moods).

---

## How It Solves the Problem

### The Problem

For developers and learners entering the Web3 space, one of the biggest challenges is understanding how a frontend application actually talks to a smart contract deployed on a blockchain testnet. Typical questions include:

- How do I structure my code to keep contract logic separate from UI logic?
- How do I handle reading and writing data from/to a contract?
- How can I provide smooth UX with proper loading, confirmation, and error states?
- How can I experiment with a real contract on a testnet without a complex domain model?

A minimal, focused example that demonstrates **end-to-end integration** (contract → hook → UI) is extremely valuable for learning and for bootstrapping future projects.

### The Solution

This project addresses those questions through a concrete, simple use case: **tracking a mood on-chain**.

1. **Clear, Single-Purpose Smart Contract**
   - The contract exposes only one core piece of state (`mood`) and two functions (`getMood` and `setMood`).
   - This keeps the mental model simple and lets learners focus on the integration rather than complex business logic.

2. **Well-Defined Integration Layer (`lib/contract.ts`)**
   - The contract address and ABI are centralized in one file.
   - Frontend code imports these definitions directly, ensuring:
     - No duplication of ABI.
     - No hardcoding of addresses across multiple files.
   - This mirrors best practices in production-grade dApps.

3. **Reusable Contract Hook (`hooks/useContract.ts`)**
   - Encapsulates all interaction details:
     - Reading the mood with `useReadContract`.
     - Writing the mood with `useWriteContract`.
     - Listening for transaction confirmation with `useWaitForTransactionReceipt`.
   - Exposes a simple interface:
     - `data.mood` – current on-chain mood.
     - `actions.setMood(mood: string)` – function to update mood.
     - `state` – contains loading flags, transaction hash, and error object.
   - This separation allows the UI to remain declarative and focused on user experience.

4. **User-Centric UI (`components/sample.tsx`)**
   - Gated behind wallet connection:
     - Users are prompted to connect a wallet before interacting.
   - Displays:
     - Current on-chain mood.
     - Connected wallet address (for transparency).
   - Provides:
     - A textarea for the new mood.
     - A primary action button to submit the transaction.
   - Handles:
     - Disabled states when loading or when the input is empty.
     - Clear transaction feedback (hash, pending, confirmed).
     - Error messaging when something goes wrong.

5. **Benefits and Use Cases**

   - **For Learners**
     - Serves as a template for:
       - Reading and writing contract state.
       - Using wagmi hooks in a real app.
       - Managing async transaction flows in React.
     - Easy to fork and modify (e.g., turning the mood into a per-user entry).

   - **For Developers**
     - Provides a baseline scaffold for:
       - DApp experiments on Flare Coston2.
       - Prototyping new features by swapping out the contract ABI and functions.
     - Encourages best practices like:
       - Centralized contract configuration.
       - Typed hooks for contract interactions.
       - Clear UI feedback loops.

   - **For Demonstrations / Workshops**
     - Perfect for live coding or demos:
       - Simple concept that non-technical audiences can understand (“your mood is saved on the blockchain”).
       - Quick feedback after each transaction (immediate UI updates, visible on explorer).

---

This repository can be used as a starting point for more advanced experiments, such as:

- Storing mood per wallet address.
- Recording mood history with timestamps.
- Integrating events and real-time updates.
- Adding authentication or profile features on top of the on-chain data.

By starting from a focused, well-structured example, you can gradually evolve this project into a richer Web3 application while keeping the core contract–hook–UI pipeline clean and maintainable.


