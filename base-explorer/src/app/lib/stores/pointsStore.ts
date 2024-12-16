// lib/stores/pointsStore.ts
import { create } from 'zustand'
import { addDoc, collection, query, orderBy, limit, getDocs } from 'firebase/firestore'
import { db } from '../firebase/config'

type PointsAction = 
  | 'WALLET_CONNECT' 
  | 'TRANSACTION' 
  | 'NFT_MINT' 
  | 'DAPP_INTERACTION'

interface UserPoints {
  walletAddress: string
  username?: string
  totalPoints: number
  actions: Array<{
    type: PointsAction
    points: number
    timestamp: Date
  }>
}

interface PointsStore {
  leaderboard: UserPoints[]
  addPointsForUser: (
    walletAddress: string, 
    action: PointsAction, 
    username?: string
  ) => Promise<void>
  fetchLeaderboard: () => Promise<void>
}

const POINTS_MAP: Record<PointsAction, number> = {
  WALLET_CONNECT: 10,
  TRANSACTION: 5,
  NFT_MINT: 20,
  DAPP_INTERACTION: 15
}

export const usePointsStore = create<PointsStore>((set, get) => ({
  leaderboard: [],
  
  addPointsForUser: async (walletAddress, action, username) => {
    const points = POINTS_MAP[action]
    
    try {
      await addDoc(collection(db, 'userPoints'), {
        walletAddress,
        username: username || null,
        action,
        points,
        timestamp: new Date()
      })
      
      // Trigger leaderboard refresh
      await get().fetchLeaderboard()
    } catch (error) {
      console.error('Error adding points:', error)
    }
  },
  
  fetchLeaderboard: async () => {
    try {
      const pointsRef = collection(db, 'userPoints')
      const q = query(
        pointsRef, 
        orderBy('points', 'desc'), 
        limit(100)
      )
      
      const snapshot = await getDocs(q)
      const leaderboardData = snapshot.docs.map(doc => doc.data() as UserPoints)
      
      set({ leaderboard: leaderboardData })
    } catch (error) {
      console.error('Error fetching leaderboard:', error)
    }
  }
}))