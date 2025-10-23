// Player Stats
export interface PlayerStats {
  id: string;
  userId: string;
  totalBattles: number;
  victories: number;
  defeats: number;
  questionsAnswered: number;
  correctAnswers: number;
  totalDamageDealt: number;
  totalDamageTaken: number;
  goldEarned: number;
  expEarned: number;
  createdAt: string;
  updatedAt: string;
}

// Achievements
export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  requirement: string;
  unlocked: boolean;
  unlockedAt?: string;
}

export interface PlayerAchievements {
  userId: string;
  achievements: Achievement[];
  totalUnlocked: number;
  totalAvailable: number;
}

// Battle History
export interface BattleRecord {
  id: string;
  characterId: string;
  characterName: string;
  enemyName: string;
  enemyType: 'minion' | 'boss';
  result: 'victory' | 'defeat';
  turnCount: number;
  expGained: number;
  goldGained: number;
  questionsAnswered: number;
  correctAnswers: number;
  battleDate: string;
}

export interface BattleHistory {
  userId: string;
  battles: BattleRecord[];
  totalBattles: number;
}

// Rankings
export interface RankingEntry {
  rank: number;
  userId: string;
  username: string;
  characterName: string;
  characterClass: string;
  level: number;
  totalVictories: number;
  winRate: number;
  score: number;
}

export interface Rankings {
  rankings: RankingEntry[];
  userRank?: RankingEntry;
  totalPlayers: number;
}

// Update Stats Request
export interface UpdatePlayerStatsRequest {
  totalBattles?: number;
  victories?: number;
  defeats?: number;
  questionsAnswered?: number;
  correctAnswers?: number;
  totalDamageDealt?: number;
  totalDamageTaken?: number;
  goldEarned?: number;
  expEarned?: number;
}
