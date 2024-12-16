// app/page.tsx
import React from 'react'
import Link from 'next/link'
import WalletConnectButton from '@/app/components/walletConnect'

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8 text-center">
        <h1 className="text-3xl font-bold mb-4 text-blue-600">Base Points Tracker</h1>
        <p className="mb-6 text-gray-600">
          Connect your wallet and start earning points for blockchain interactions!
        </p>
        <WalletConnectButton />
        <div className="mt-4">
          <Link 
            href="/leaderboard" 
            className="text-blue-500 hover:underline"
          >
            View Leaderboard
          </Link>
        </div>
      </div>
    </main>
  )
}