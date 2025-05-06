# Solana Web Wallet

A React-based web wallet application for interacting with the Solana blockchain. This wallet runs on Devnet for development and testing purposes.

## Features

- Connect to Solana wallets using wallet adapter
- Request SOL airdrops on Devnet
- Check wallet balance
- Send and receive transactions
- Sign messages

## Prerequisites

- Node.js (v16 or later)
- npm or yarn

## Installation

```bash
# Clone the repository
git clone https://github.com/chauhan-varun/web-wallet.git
cd web-wallet

# Install dependencies
npm install
```

## Usage

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

Open your browser and navigate to the local development server (usually http://localhost:5173).

## Development

This project is built with:

- React
- Solana Web3.js
- Solana Wallet Adapter
- Vite
- TailwindCSS

## Important Note

This wallet operates on Solana's Devnet. Any airdrops or transactions are performed on the Devnet network, not the mainnet.

## License

[MIT](LICENSE)
