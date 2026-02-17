---
title: "How to Set Up a Bitcoin Node on Raspberry Pi: Step-by-Step Guide"
description: "Learn how to easily set up a Bitcoin full node on a Raspberry Pi 5 in 2026. Affordable, energy-efficient, and perfect for beginners seeking privacy and network support."
date: 2025-12-29
updatedDate: 2025-12-29
image: "/images/posts/bitcoin-node2.jpg"
heroImageAlt: "Raspberry Pi running Bitcoin Core with blockchain syncing"
authors: ["Galaxy"]
authorTwitter: "@txchyon"
tags: ["bitcoin", "bitcoin node", "raspberry pi", "full node", "diy setup"]
category: "infrastructure-tech"
subcategory: "layer-1s"
draft: false
---

Running a Bitcoin node on a Raspberry Pi is an accessible way to contribute to the network while maintaining your privacy. This guide builds on the basics from our [What Is a Bitcoin Node and Why You Need One](https://txchyon.com/blog/infrastructure-tech/what-is-a-bitcoin-node-and-why-you-need-one) article, focusing on a budget-friendly hardware setup.

### Why Raspberry Pi for Your Bitcoin Node?
- **Low Cost**: Under $100 for the Pi 5 kit.
- **Energy Efficient**: Runs 24/7 without high electricity bills.
- **Compact**: Fits anywhere in your home.
- Enhances self-sovereignty, as discussed in our [Bitcoin Privacy Best Practices](/bitcoin-privacy-best-practices) guide.

### Requirements
- Raspberry Pi 5 (4GB or 8GB model)
- 1TB microSD card or external SSD
- Stable internet connection
- Basic Linux knowledge (or follow our steps)

### Step-by-Step Setup
1. **Install Raspberry Pi OS**: Download from raspberrypi.com and flash to your microSD.
2. **Update System**: Boot up, open terminal, run `sudo apt update && sudo apt upgrade`.
3. **Install Bitcoin Core**: Add the Bitcoin PPA or download from bitcoincore.org. Verify signatures.
4. **Configure bitcoin.conf**: Set pruned mode if space is limited (see our [Best Hardware for Bitcoin Nodes](https://txchyon.com/blog/infrastructure-tech/best-hardware-for-bitcoin-nodes-2026) for upgrades).
5. **Sync the Blockchain**: Launch Bitcoin Core—it'll take 2–10 days initially.
6. **Connect Your Wallet**: Use Electrum or Sparrow, pointing to your node's IP.

### Troubleshooting Tips
- Slow sync? Check internet speed.
- Overheating? Add a heatsink.
- For advanced features, explore Lightning integration from [Setting Up a Lightning Network Node](https://txchyon.com/blog/infrastructure-tech/how-to-setup-up-lightning-network-node).

### Conclusion
This setup empowers you to run a node affordably. Link it with our core guide on [Bitcoin nodes](https://txchyon.com/blog/infrastructure-tech/what-is-a-bitcoin-node-and-why-you-need-one) for full context.