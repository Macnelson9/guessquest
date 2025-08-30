# GuessQuest - Web3 Guessing Game

A blockchain-powered number guessing game built with Next.js, TypeScript, and Solidity.

## 🚀 Features

- **MetaMask Integration**: Connect wallet to play
- **On-chain Highscores**: Persistent highscore storage on blockchain
- **Player Tracking**: Track total number of players
- **Mobile Responsive**: Optimized for all screen sizes
- **Real-time Updates**: Live contract data synchronization

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, TypeScript, Tailwind CSS
- **Web3**: Wagmi, Ethers.js, MetaMask
- **Blockchain**: Solidity, Ethereum
- **Styling**: Tailwind CSS with Press Start 2P font

## 📋 Prerequisites

- Node.js 18+
- MetaMask browser extension
- Hardhat (for contract deployment)

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Deploy Smart Contract

```bash
# Install Hardhat if not already installed
npm install -g hardhat

# Deploy to local network
npx hardhat run scripts/deploy.js --network localhost

# Or deploy to testnet (update hardhat.config.js first)
npx hardhat run scripts/deploy.js --network sepolia
```

### 3. Update Contract Address

Update `CONTRACT_ADDRESS` in `src/app/web3-config.ts` with your deployed contract address.

### 4. Start Development Server

```bash
npm run dev
```

## 🎮 How to Play

1. **Connect Wallet**: Click "Connect Wallet" to connect your MetaMask
2. **Guess Number**: Enter a number between 1-20
3. **Check Answer**: Click "Check!" or press Enter
4. **Track Progress**: Your highscore is stored on-chain
5. **Play Again**: Click "Again!" to start a new game

## 🏗️ Smart Contract

### Functions

- `registerPlayer()`: Register new player
- `updateHighscore(uint256)`: Update player's highscore
- `getMyHighscore()`: Get current player's highscore
- `getTotalPlayers()`: Get total registered players

### Deployment

```bash
npx hardhat compile
npx hardhat run scripts/deploy.js --network <network-name>
```

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_CONTRACT_ADDRESS=0x...
```

### Hardhat Configuration

Update `hardhat.config.js` for your preferred network:

```javascript
require("@nomicfoundation/hardhat-toolbox");

module.exports = {
  solidity: "0.8.19",
  networks: {
    sepolia: {
      url: "YOUR_SEPOLIA_RPC_URL",
      accounts: ["YOUR_PRIVATE_KEY"],
    },
  },
};
```

## 📱 Mobile Features

- **Responsive Design**: Optimized for screens < 600px
- **Touch Controls**: Mobile-friendly buttons and inputs
- **Vertical Scrolling**: Smooth scrolling on mobile devices
- **Wallet Integration**: Mobile MetaMask support

## 🎯 Game Rules

1. Guess a number between 1 and 20
2. You have 20 attempts per game
3. Higher scores are better
4. Highscores are permanently stored on blockchain
5. Must connect wallet to play

## 🔐 Security Features

- **Wallet Required**: Must connect MetaMask to play
- **On-chain Verification**: All highscores verified on blockchain
- **Immutable Records**: Game history cannot be altered
- **Transparent Scoring**: All scores publicly visible

## 🚀 Deployment

### Frontend Deployment

```bash
npm run build
npm run start
```

### Contract Verification

```bash
npx hardhat verify --network sepolia CONTRACT_ADDRESS
```

## 📊 Contract Analytics

- **Total Players**: Displayed at bottom of game
- **Highscore Leaderboard**: On-chain highscore tracking
- **Player Registration**: Automatic registration on first play
- **Real-time Updates**: Live contract data synchronization

## 🐛 Troubleshooting

### Common Issues

1. **MetaMask Not Connecting**

   - Ensure MetaMask is installed
   - Check if on correct network
   - Try refreshing the page

2. **Contract Not Updating**

   - Verify contract address is correct
   - Check network configuration
   - Ensure sufficient gas for transactions

3. **Highscore Not Saving**
   - Confirm wallet is connected
   - Check transaction confirmation
   - Verify contract has sufficient funds

## 🤝 Contributing

1. Fork the repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Create Pull Request

## 📄 License

MIT License - see LICENSE file for details
