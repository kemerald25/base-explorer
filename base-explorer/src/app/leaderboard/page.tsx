// app/leaderboard/page.tsx
'use client'

import React, { useEffect } from 'react'
import { usePointsStore } from '@/app/lib/stores/pointsStore'

export default function LeaderboardPage() {
  const { leaderboard, fetchLeaderboard } = usePointsStore()

  useEffect(() => {
    fetchLeaderboard()
    const interval = setInterval(fetchLeaderboard, 10000)
    return () => clearInterval(interval)
  }, [fetchLeaderboard])

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Leaderboard</h1>
      <div className="bg-white shadow-md text-black rounded-lg">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Rank</th>
              <th className="p-3 text-left">Wallet/Username</th>
              <th className="p-3 text-right">Total Points</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.map((user, index) => (
              <tr key={user.walletAddress} className="border-b">
                <td className="p-3">{index + 1}</td>
                <td className="p-3">
                  {user.username || `${user.walletAddress.slice(0, 10)}...`}
                </td>
                <td className="p-3 text-right">{user.totalPoints}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}