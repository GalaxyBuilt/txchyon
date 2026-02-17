---
title: "How to Revoke Token Allowances on Ethereum, Arbitrum, & BSC"
description: "High-volume farming on EVM chains requires connecting to many protocols. Learn what an 'unlimited token allowance' is, why it's a security vulnerability, and the simple, multi-chain method using Revoke.cash to sever unwanted permissions and protect your Ethereum, Arbitrum, BSC, and Polygon funds."
date: 2025-12-21
updatedDate: 2025-12-21
image: "/images/posts/revokecash2.jpg"
heroImageAlt: "A digital lock with multiple chains (Ethereum, BNB, Arbitrum logos) connected, symbolizing multi-chain security management"
authors: ["Galaxy"]
authorTwitter: "@txchyon"
tags: ["EVM", "Ethereum", "Arbitrum", "BSC", "Security", "Token Allowance", "Revoke.cash", "DeFi"]
category: "security-privacy"
subcategory: "transaction-security"
  # Keep: "security", "beginner"
draft: false
---

#Cut the Cord: Revoking Unlimited Token Allowances on EVM Chains

When participating in airdrop farming across EVM-compatible networks (like Ethereum, Arbitrum, BNB Chain, Polygon, etc.), you constantly interact with new smart contracts. Every time you swap, stake, or provide liquidity, your wallet is prompted to grant a **Token Allowance** (also known as a token approval).

Understanding and managing these allowances is the single most important security practice on EVM.

## 1. What is a Token Allowance?

A Token Allowance is the permission you grant a smart contract to move a specific amount of one of your tokens on your behalf.

* **The Approval:** You sign a transaction authorizing a dApp's contract (the **Spender**) to transfer your tokens (the **Owner**) up to a specified amount (the **Allowance**).
* **The Risk:** Most dApps default to asking for an **"Unlimited"** allowance. This is convenient because you only pay the gas fee once, but it means that contract can technically drain your entire balance of that token forever.

### The Danger of Unlimited Allowance

If a protocol you granted unlimited access to is later hacked, exploited, or turned malicious, the attacker can use the existing permission to call the contract and **drain your wallet of the approved tokens** without any further action or signature from you.

**Disconnecting your MetaMask or Trust Wallet DOES NOT remove this permission!** The permission is written to the blockchain.

---

## 2. The Solution: Multi-Chain Revocation with Revoke.cash

To maintain a secure "Wallet Hygiene," you must periodically check your allowances and revoke any that are unnecessary. The most widely recognized and easiest tool for this across all major EVM chains is **Revoke.cash**.

### Step-by-Step Revocation Guide:

Follow these steps using your **Burner Wallet** (or any wallet you use for farming) to manage your allowances.

**1. Access the Revoke Tool:**
* Navigate to the official **Revoke.cash** website. Always verify the URL is correct to prevent phishing.

**2. Connect Wallet and Select Network:**
* Click **'Connect Wallet'** (e.g., MetaMask, WalletConnect).
* **IMPORTANT:** Use the network selection menu (usually in the top right) to choose the blockchain you want to audit (e.g., Ethereum, Arbitrum, BNB Chain, Polygon). You must check each chain separately!

**3. Review Active Allowances:**
* The tool will scan the selected network and display a list of all your active token allowances.
* The list shows:
    * The **Token** (e.g., ETH, USDC, DAI).
    * The **Spender** (the contract that has permission).
    * The **Allowance Amount** (often displayed as "Unlimited" or a very large number).

**4. Identify and Prioritize Revocations:**
* **Priority 1:** Revoke unlimited allowances for high-value assets (USDC, USDT, ETH) on platforms you no longer use.
* **Priority 2:** Revoke any approvals for tokens from projects you suspect might be scams or have minimal TVL (Total Value Locked).

**5. Execute the Revocation Transaction:**
* Click the **'Revoke'** button next to the specific allowance you want to cut off.
* Your wallet (e.g., MetaMask) will prompt you to sign a transaction. This transaction calls the original token contract and sets the allowance to **zero (0)**.
* **Gas Fee:** Note that revoking an allowance is a transaction written to the blockchain, and therefore costs a small amount of the native currency (e.g., ETH on Ethereum, BNB on BSC, or ARB on Arbitrum) to pay the gas fee.

**6. Confirmation:**
* Once the transaction confirms on the blockchain, the contract's permission is permanently removed.

## Pro-Tip: Setting Custom Allowances

To prevent the need for constant revocation, many wallets (like MetaMask) allow you to edit the spending limit when prompted for an approval:

* When the approval pop-up appears, look for the **'Edit Permission'** or **'Custom Spend Limit'** option.
* Instead of leaving it as "Unlimited," enter a specific amount slightly higher than your planned transaction (e.g., if you plan to swap $100 USDC, set the allowance to $110 USDC).

This limits the potential damage of an exploit, but you will have to re-approve the contract when you exceed that custom limit.

---