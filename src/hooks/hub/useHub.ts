import { useState } from 'react';
import {
  getHubStats,
  getAchievements,
  getBattleHistory,
  getRankings,
  updateHubStats,
  getSkills,
  purchaseSkill,
  getBooks,
  getBookDetails,
  getProfessors,
  getProfessorDialogues,
  getStoreItems,
  purchaseItem,
} from '../../Services';

import type {
  HubStats,
  SkillsResponse,
  PurchaseSkillRequest,
  BooksResponse,
  BookDetails,
  ProfessorsResponse,
  ProfessorDialoguesResponse,
  StoresResponse,
  PurchaseItemRequest,
} from '../../types';

import type { PlayerStats, PlayerAchievements, BattleHistory, Rankings } from '../../types';

interface UseHubReturn {
  // States
  stats: PlayerStats | null;
  achievements: PlayerAchievements | null;
  history: BattleHistory | null;
  rankings: Rankings | null;
  skills: SkillsResponse | null;
  books: BooksResponse | null;
  bookDetails: BookDetails | null;
  professors: ProfessorsResponse | null;
  dialogues: ProfessorDialoguesResponse | null;
  store: StoresResponse | null;
  loading: boolean;
  error: Error | null;
  
  // Functions - Stats & Progress
  fetchStats: () => Promise<PlayerStats | null>;
  fetchAchievements: () => Promise<PlayerAchievements | null>;
  fetchHistory: () => Promise<BattleHistory | null>;
  fetchRankings: () => Promise<Rankings | null>;
  updateStats: (data: Partial<HubStats>) => Promise<PlayerStats | null>;
  
  // Functions - Skills
  fetchSkills: () => Promise<SkillsResponse | null>;
  purchaseSkill: (data: PurchaseSkillRequest) => Promise<boolean>;
  
  // Functions - Books
  fetchBooks: () => Promise<BooksResponse | null>;
  fetchBookDetails: (bookId: string) => Promise<BookDetails | null>;
  
  // Functions - Professors
  fetchProfessors: () => Promise<ProfessorsResponse | null>;
  fetchProfessorDialogues: (professorId: string) => Promise<ProfessorDialoguesResponse | null>;
  
  // Functions - Store
  fetchStoreItems: () => Promise<StoresResponse | null>;
  purchaseItem: (data: PurchaseItemRequest) => Promise<boolean>;
  
  // Utilities
  clearError: () => void;
}

/**
 * Hook to manage all Hub functionalities
 * 
 * @example
 * ```tsx
 * const {
 *   fetchSkills,
 *   purchaseSkill,
 *   skills,
 *   loading
 * } = useHub();
 * 
 * // Fetch skills
 * useEffect(() => {
 *   fetchSkills();
 * }, []);
 * 
 * // Purchase skill
 * const handlePurchase = async (skillId: string) => {
 *   const success = await purchaseSkill({ skillId });
 *   if (success) {
 *     console.log('Skill purchased!');
 *     await fetchSkills(); // Update list
 *   }
 * };
 * ```
 */
export const useHub = (): UseHubReturn => {
  // States
  const [stats, setStats] = useState<PlayerStats | null>(null);
  const [achievements, setAchievements] = useState<PlayerAchievements | null>(null);
  const [history, setHistory] = useState<BattleHistory | null>(null);
  const [rankings, setRankings] = useState<Rankings | null>(null);
  const [skills, setSkills] = useState<SkillsResponse | null>(null);
  const [books, setBooks] = useState<BooksResponse | null>(null);
  const [bookDetails, setBookDetails] = useState<BookDetails | null>(null);
  const [professors, setProfessors] = useState<ProfessorsResponse | null>(null);
  const [dialogues, setDialogues] = useState<ProfessorDialoguesResponse | null>(null);
  const [store, setStore] = useState<StoresResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  // Stats & Progress
  const fetchStats = async (): Promise<PlayerStats | null> => {
    setLoading(true);
    setError(null);
    try {
      const playerStats = await getHubStats();
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
      const playerAchievements = await getAchievements();
      setAchievements(playerAchievements);
      return playerAchievements;
    } catch (err) {
      setError(err as Error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const fetchHistory = async (): Promise<BattleHistory | null> => {
    setLoading(true);
    setError(null);
    try {
      const battleHistory = await getBattleHistory();
      setHistory(battleHistory);
      return battleHistory;
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

  const updateStats = async (
    data: Partial<HubStats>
  ): Promise<PlayerStats | null> => {
    setLoading(true);
    setError(null);
    try {
      const updatedStats = await updateHubStats(data);
      setStats(updatedStats);
      return updatedStats;
    } catch (err) {
      setError(err as Error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Skills
  const fetchSkills = async (): Promise<SkillsResponse | null> => {
    setLoading(true);
    setError(null);
    try {
      const skillsData = await getSkills();
      setSkills(skillsData);
      return skillsData;
    } catch (err) {
      setError(err as Error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const buySkill = async (
    data: PurchaseSkillRequest
  ): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      const result = await purchaseSkill(data);
      // Update skills after purchase
      if (result.success) {
        await fetchSkills();
      }
      return result.success;
    } catch (err) {
      setError(err as Error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Books
  const fetchBooks = async (): Promise<BooksResponse | null> => {
    setLoading(true);
    setError(null);
    try {
      const booksData = await getBooks();
      setBooks(booksData);
      return booksData;
    } catch (err) {
      setError(err as Error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const fetchBookDetails = async (bookId: string): Promise<BookDetails | null> => {
    setLoading(true);
    setError(null);
    try {
      const details = await getBookDetails(bookId);
      setBookDetails(details);
      return details;
    } catch (err) {
      setError(err as Error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Professors
  const fetchProfessors = async (): Promise<ProfessorsResponse | null> => {
    setLoading(true);
    setError(null);
    try {
      const professorsData = await getProfessors();
      setProfessors(professorsData);
      return professorsData;
    } catch (err) {
      setError(err as Error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const fetchProfessorDialogues = async (
    professorId: string
  ): Promise<ProfessorDialoguesResponse | null> => {
    setLoading(true);
    setError(null);
    try {
      const dialoguesData = await getProfessorDialogues(professorId);
      setDialogues(dialoguesData);
      return dialoguesData;
    } catch (err) {
      setError(err as Error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Store
  const fetchStoreItems = async (): Promise<StoresResponse | null> => {
    setLoading(true);
    setError(null);
    try {
      const storeData = await getStoreItems();
      setStore(storeData);
      return storeData;
    } catch (err) {
      setError(err as Error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const buyItem = async (data: PurchaseItemRequest): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      const result = await purchaseItem(data);
      // Update store after purchase
      if (result.success) {
        await fetchStoreItems();
      }
      return result.success;
    } catch (err) {
      setError(err as Error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const clearError = () => {
    setError(null);
  };

  return {
    // States
    stats,
    achievements,
    history,
    rankings,
    skills,
    books,
    bookDetails,
    professors,
    dialogues,
    store,
    loading,
    error,
    
    // Stats & Progress
    fetchStats,
    fetchAchievements,
    fetchHistory,
    fetchRankings,
    updateStats,
    
    // Skills
    fetchSkills,
    purchaseSkill: buySkill,
    
    // Books
    fetchBooks,
    fetchBookDetails,
    
    // Professors
    fetchProfessors,
    fetchProfessorDialogues,
    
    // Store
    fetchStoreItems,
    purchaseItem: buyItem,
    
    // Utilities
    clearError,
  };
};
