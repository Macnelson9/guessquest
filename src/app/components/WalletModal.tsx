"use client";

import { useConnect, useAccount, useDisconnect, Connector } from "wagmi";

interface WalletModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function WalletModal({ isOpen, onClose }: WalletModalProps) {
  const { connectors, connect, isPending } = useConnect();
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();

  const handleConnect = (connector: Connector) => {
    connect({ connector });
    onClose();
  };

  const handleDisconnect = () => {
    disconnect();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 text-gray-100 p-6 rounded-lg max-w-md w-full mx-4">
        <h2
          className="text-xl font-bold mb-4 text-center"
          style={{ fontFamily: "'Press Start 2P', monospace" }}
        >
          Connect Wallet
        </h2>

        {isConnected ? (
          <div className="text-center">
            <p className="mb-4">
              Connected: {address?.slice(0, 6)}...{address?.slice(-4)}
            </p>
            <button
              onClick={handleDisconnect}
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded font-bold"
              style={{ fontFamily: "'Press Start 2P', monospace" }}
            >
              Disconnect
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {connectors.map((connector) => (
              <button
                key={connector.id}
                onClick={() => handleConnect(connector)}
                disabled={isPending}
                className="w-full bg-orange-600 hover:bg-orange-700 disabled:bg-gray-600 text-white px-6 py-3 rounded font-bold transition-colors"
                style={{ fontFamily: "'Press Start 2P', monospace" }}
              >
                {isPending ? "Connecting..." : `Connect ${connector.name}`}
              </button>
            ))}
          </div>
        )}

        <button
          onClick={onClose}
          className="mt-4 w-full bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded"
        >
          Close
        </button>
      </div>
    </div>
  );
}
