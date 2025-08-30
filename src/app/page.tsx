"use client";

import { useState, useEffect } from "react";
import { useAccount, useReadContract, useWriteContract } from "wagmi";
import { useMiniKit } from "@coinbase/onchainkit/minikit";
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "./web3-config";
import WalletModal from "./components/WalletModal";

export default function GuessMyNumber() {
  const { setFrameReady, isFrameReady } = useMiniKit();
  const [secretNumber, setSecretNumber] = useState<number>(0);
  const [score, setScore] = useState<number>(20);
  const [message, setMessage] = useState<string>("😎 Start guessing...");
  const [guess, setGuess] = useState<string>("");
  const [gameWon, setGameWon] = useState<boolean>(false);
  const [numberDisplay, setNumberDisplay] = useState<string>("?");
  const [isWalletModalOpen, setIsWalletModalOpen] = useState<boolean>(true);

  // Wallet hooks
  const { address, isConnected } = useAccount();

  // Contract hooks
  const { data: contractHighscore, refetch: refetchHighscore } =
    useReadContract({
      address: CONTRACT_ADDRESS as `0x${string}`,
      abi: CONTRACT_ABI,
      functionName: "getMyHighscore",
      account: address,
      query: {
        enabled: !!address,
      },
    });

  const { data: totalPlayers } = useReadContract({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi: CONTRACT_ABI,
    functionName: "getTotalPlayers",
  });

  const { data: isRegistered } = useReadContract({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi: CONTRACT_ABI,
    functionName: "isPlayerRegistered",
    args: [address as `0x${string}`],
    query: {
      enabled: !!address,
    },
  });

  const { writeContract: registerPlayer } = useWriteContract();
  const { writeContract: updateHighscoreContract } = useWriteContract();

  // Initialize game
  useEffect(() => {
    if (!isFrameReady) setFrameReady();
    setSecretNumber(Math.trunc(Math.random() * 20) + 1);
  }, [isFrameReady, setFrameReady]);

  // Handle wallet connection
  useEffect(() => {
    if (isConnected && address) {
      setIsWalletModalOpen(false);
    } else {
      setIsWalletModalOpen(true);
    }
  }, [isConnected, address]);

  // Register new player if not registered
  useEffect(() => {
    if (isConnected && address && isRegistered === false) {
      try {
        registerPlayer({
          address: CONTRACT_ADDRESS as `0x${string}`,
          abi: CONTRACT_ABI,
          functionName: "registerPlayer",
        });
      } catch (error) {
        console.error("Error registering player:", error);
      }
    }
  }, [isConnected, address, isRegistered]);

  const displayMessage = (msg: string) => {
    setMessage(msg);
  };

  const handleCheck = () => {
    const guessNum = Number(guess);

    // When there is no input
    if (!guessNum) {
      displayMessage("❌ No number!");
      return;
    }

    // When player wins
    if (guessNum === secretNumber) {
      displayMessage("🍕 Correct Number!");
      setNumberDisplay(secretNumber.toString());
      setGameWon(true);

      const currentHighscore = Number(contractHighscore || 0);
      if (score > currentHighscore) {
        // Update highscore on contract
        if (isConnected && address) {
          try {
            updateHighscoreContract(
              {
                address: CONTRACT_ADDRESS as `0x${string}`,
                abi: CONTRACT_ABI,
                functionName: "updateHighscore",
                args: [BigInt(score)],
              },
              {
                onSuccess: () => {
                  // Refetch highscore after update
                  refetchHighscore();
                },
              }
            );
          } catch (error) {
            console.error("Error updating highscore:", error);
          }
        }
      }
    }
    // When guess is wrong
    else if (guessNum !== secretNumber) {
      if (score > 1) {
        displayMessage(
          guessNum > secretNumber ? "😏 Try Again!" : "🤨 Oops, Keep Trying!"
        );
        setScore((prev) => prev - 1);
      } else {
        displayMessage("💥 You lost the game!");
        setScore(0);
      }
    }
  };

  const handleAgain = () => {
    setScore(20);
    setSecretNumber(Math.trunc(Math.random() * 20) + 1);
    setGuess("");
    setNumberDisplay("?");
    setGameWon(false);
    displayMessage("😎 Start guessing...");
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleCheck();
    }
  };

  return (
    <div
      className={`h-screen overflow-y-auto md:overflow-hidden ${
        gameWon ? "bg-green-500" : "bg-gray-900"
      } text-gray-100 transition-colors duration-300`}
      style={{ fontFamily: "'Press Start 2P', monospace" }}
    >
      {/* Header - Mobile Layout */}
      <header className="relative border-b-8 border-gray-100 px-4 py-6 md:h-[35vh] md:flex md:flex-col md:items-center md:justify-center">
        {/* Mobile Layout (less than 600px) */}
        <div className="block md:hidden">
          <div className="flex justify-between items-center mb-6">
            <button
              onClick={handleAgain}
              className="bg-gray-100 text-gray-900 px-4 py-2 text-sm font-bold border-none cursor-pointer hover:bg-gray-300 transition-colors rounded"
            >
              Again!
            </button>

            {/* Wallet Display */}
            {isConnected && address && (
              <div className="flex items-center gap-2">
                <span className="text-xs bg-gray-700 px-2 py-1 rounded">
                  {address.slice(0, 4)}...{address.slice(-4)}
                </span>
                <button
                  onClick={() => setIsWalletModalOpen(true)}
                  className="bg-red-600 hover:bg-red-700 text-white px-2 py-1 text-xs rounded"
                >
                  ✕
                </button>
              </div>
            )}
          </div>

          <div className="text-center">
            <h1 className="text-3xl mb-2">GuessQuest!</h1>
            <p className="text-sm mb-6">(Between 1 and 20)</p>
          </div>
        </div>

        {/* Desktop Layout (600px and above) */}
        <div className="hidden md:block relative w-full h-full">
          <h1 className="text-4xl sm:text-6xl text-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
            GuessQuest!
          </h1>
          <p className="text-sm sm:text-lg absolute top-8 right-8">
            (Between 1 and 20)
          </p>
          <button
            onClick={handleAgain}
            className="absolute top-8 left-8 bg-gray-100 text-gray-900 px-6 py-3 text-lg font-bold border-none cursor-pointer hover:bg-gray-300 transition-colors rounded"
          >
            Again!
          </button>

          {/* Wallet Display */}
          {isConnected && address && (
            <div className="absolute top-8 right-8 flex items-center gap-2">
              <span className="text-sm bg-gray-700 px-3 py-1 rounded">
                {address.slice(0, 6)}...{address.slice(-4)}
              </span>
              <button
                onClick={() => setIsWalletModalOpen(true)}
                className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 text-sm rounded"
              >
                Disconnect
              </button>
            </div>
          )}
        </div>

        {/* Number Display - Desktop only */}
        <div
          className={`hidden md:block bg-gray-100 text-gray-900 text-6xl lg:text-8xl px-8 py-6 text-center rounded absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 ${
            gameWon ? "w-48 lg:w-72" : "w-36 lg:w-60"
          } transition-all duration-300`}
        >
          {numberDisplay}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col md:flex-row items-center justify-center md:justify-around px-4 py-4 md:py-8 gap-6 md:gap-8">
        {/* Mobile Number Display - positioned after hero text */}
        <div
          className={`md:hidden bg-gray-100 text-gray-900 text-5xl px-6 py-4 text-center rounded mb-6 ${
            gameWon ? "w-36" : "w-28"
          } transition-all duration-300 mx-auto`}
        >
          {numberDisplay}
        </div>

        {/* Left Section */}
        <section className="flex flex-col items-center gap-6 md:gap-8">
          <input
            type="number"
            value={guess}
            onChange={(e) => setGuess(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={!isConnected}
            className="bg-transparent border-4 border-gray-100 text-4xl md:text-5xl lg:text-7xl px-8 md:px-10 py-4 md:py-6 w-56 md:w-64 lg:w-80 text-center block text-gray-100 focus:outline-none focus:border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ fontFamily: "'Press Start 2P', monospace" }}
            placeholder={!isConnected ? "Connect wallet to play" : ""}
          />
          <button
            onClick={handleCheck}
            disabled={!isConnected}
            className="bg-gray-100 text-gray-900 px-6 md:px-8 py-3 md:py-4 text-lg md:text-xl font-bold border-none cursor-pointer hover:bg-gray-300 transition-colors rounded disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isConnected ? "Check!" : "Connect Wallet"}
          </button>
        </section>

        {/* Right Section */}
        <section className="text-center md:text-left text-base md:text-lg lg:text-2xl space-y-3 md:space-y-4">
          <p className="mb-16 md:mb-20 lg:mb-32 h-10 md:h-12 flex items-center justify-center md:justify-start text-sm md:text-base lg:text-lg">
            {message}
          </p>
          <p className="mb-6 md:mb-8">
            💯 Score: <span className="font-bold">{score}</span>
          </p>
          <p>
            🥇 Highscore:{" "}
            <span className="font-bold">{Number(contractHighscore || 0)}</span>
          </p>
        </section>
      </main>

      {/* Total Players Display */}
      <div className="text-center py-4 border-t border-gray-600">
        <p className="text-sm md:text-base text-gray-300">
          👥 Total Players:{" "}
          <span className="font-bold text-gray-100">
            {totalPlayers ? Number(totalPlayers) : 0}
          </span>
        </p>
      </div>

      {/* Wallet Modal */}
      <WalletModal
        isOpen={isWalletModalOpen}
        onClose={() => setIsWalletModalOpen(false)}
      />
    </div>
  );
}
