import { useState } from 'react';
import {
  getPlayerStats,
  getPlayerAchievements,
  getBattleHistory,
  getRankings,
 // updatePlayerStats,
} from '../../Services';


import type {
  PlayerStats,
  PlayerAchievements,
  BattleHistory,
  Rankings,
  UpdatePlayerStatsRequest,
} from '../../types';

interface UsePlayerReturn {
  stats: PlayerStats | null;
  achievements: PlayerAchievements | null;
  battleHistory: BattleHistory | null;
  rankings: Rankings | null;
  loading: boolean;
  error: Error | null;
  fetchStats: () => Promise<PlayerStats | null>;
  fetchAchievements: () => Promise<PlayerAchievements | null>;
  fetchBattleHistory: () => Promise<BattleHistory | null>;
  fetchRankings: () => Promise<Rankings | null>;
  // updateStats: (data: UpdatePlayerStatsRequest) => Promise<PlayerStats | null>;
  clearError: () => void;
}

/**
 * Hook to manage player statistics and information
 * 
 * @example
 * ```tsx
 * const {
 *   fetchStats,
 *   fetchAchievements,
 *   stats,
 *   achievements,
 *   loading
 * } = usePlayer();
 * 
 * useEffect(() => {
 *   fetchStats();
 *   fetchAchievements();
 * }, []);
 * 
 * // Update stats after battle
 * const handleAfterBattle = async () => {
 *   await updateStats({
 *     totalBattles: 1,
 *     victories: 1,
 *     expEarned: 100
 *   });
 * };
 * ```
 */
export const usePlayer = (): UsePlayerReturn => {
  const [stats, setStats] = useState<PlayerStats | null>(null);
  const [achievements, setAchievements] = useState<PlayerAchievements | null>(null);
  const [battleHistory, setBattleHistory] = useState<BattleHistory | null>(null);
  const [rankings, setRankings] = useState<Rankings | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchStats = async (): Promise<PlayerStats | null> => {
    setLoading(true);
    setError(null);
    try {
      const playerStats = await getPlayerStats();
      setStats(playerStats);
      return playerStats;
    } catch (err) {
      setError(err as Error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const fetchAchievements = async (): Promise<PlayerAchievements | null> => {
    setLoading(true);
    setError(null);
    try {
      const playerAchievements = await getPlayerAchievements();
      setAchievements(playerAchievements);
      return playerAchievements;
    } catch (err) {
      setError(err as Error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const fetchBattleHistory = async (): Promise<BattleHistory | null> => {
    setLoading(true);
    setError(null);
    try {
      const history = await getBattleHistory();
      setBattleHistory(history);
      return history;
    } catch (err) {
      setError(err as Error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const fetchRankings = async (): Promise<Rankings | null> => {
    setLoading(true);
    setError(null);
    try {
      const rank = await getRankings();
      setRankings(rank);
      return rank;
    } catch (err) {
      setError(err as Error);
      return null;
    } finally {
      setLoading(false);
    }
  };

//   const updateStats = async (
//     data: UpdatePlayerStatsRequest
//   ): Promise<PlayerStats | null> => {
//     setLoading(true);
//     setError(null);
//     try {
//       const updatedStats = await updatePlayerStats(data);
//       setStats(updatedStats);
//       return updatedStats;
//     } catch (err) {
//       setError(err as Error);
//       return null;
//     } finally {
//       setLoading(false);
//     }
//   };

  const clearError = () => {
    setError(null);
  };

  return {
    stats,
    achievements,
    battleHistory,
    rankings,
    loading,
    error,
    fetchStats,
    fetchAchievements,
    fetchBattleHistory,
    fetchRankings,
    clearError,
  };
};
