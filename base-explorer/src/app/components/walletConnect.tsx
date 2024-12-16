// components/WalletConnectButton.tsx
'use client'
import { useEffect } from 'react'
import { useAccount, useConnect } from 'wagmi'
import { injected } from 'wagmi/connectors'
import { usePointsStore } from '@/app/lib/stores/pointsStore'

export default function WalletConnectButton() {
  const { connect } = useConnect()
  const { address, isConnected } = useAccount()
  const { addPointsForUser } = usePointsStore()

  const handleConnect = () => {
    connect({ connector: injected() })
  }

  useEffect(() => {
    if (isConnected && address) {
      // Award points for wallet connection
      addPointsForUser(address, 'WALLET_CONNECT')
    }
  }, [isConnected, address])

  return (
    <button 
      onClick={handleConnect}
      className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
    >
      {isConnected 
        ? `Connected: ${address?.slice(0, 6)}...${address?.slice(-4)}` 
        : 'Connect Wallet'}
    </button>
  )
}