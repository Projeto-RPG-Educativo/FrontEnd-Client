import { useState } from 'react';
import {
  getHubStats,
  getAchievements,
  getSkills,
  purchaseSkill,
  getBooks,
  getBookDetails,
  getProfessors,
  getProfessorDialogues,
  getStoreItems,
  purchaseItem,
} from '../../services';

import type {
  SkillsResponse,
  PurchaseSkillRequest,
  PurchaseSkillResponse, 
  BooksResponse,
  BookDetails,
  ProfessorsResponse,
  ProfessorDialoguesResponse,
  StoresResponse,
  PurchaseItemRequest,
  PurchaseItemResponse, 
} from '../../types'; 

import type {
  PlayerStats,
  PlayerAchievements,
} from '../../types'; 

interface UseHubReturn {
  stats: PlayerStats | null;
  achievements: PlayerAchievements | null;
  skills: SkillsResponse | null;
  books: BooksResponse | null;
  bookDetails: BookDetails | null;
  professors: ProfessorsResponse | null;
  dialogues: ProfessorDialoguesResponse | null;
  store: StoresResponse | null;
  loading: boolean;
  error: Error | null;
  fetchStats: () => Promise<PlayerStats | null>;
  fetchAchievements: () => Promise<PlayerAchievements | null>;
  fetchSkills: () => Promise<SkillsResponse | null>;
  purchaseSkill: (
    data: PurchaseSkillRequest
  ) => Promise<PurchaseSkillResponse | null>;

  // Functions - Books
  fetchBooks: () => Promise<BooksResponse | null>;
  fetchBookDetails: (bookId: string) => Promise<BookDetails | null>;

  // Functions - Professors
  fetchProfessors: () => Promise<ProfessorsResponse | null>;
  fetchProfessorDialogues: (
    professorId: string
  ) => Promise<ProfessorDialoguesResponse | null>;

  // Functions - Store
  fetchStoreItems: () => Promise<StoresResponse | null>;
  purchaseItem: (
    data: PurchaseItemRequest
  ) => Promise<PurchaseItemResponse | null>; 

  // Utilities
  clearError: () => void;
}

export const useHub = (): UseHubReturn => {
  const [stats, setStats] = useState<PlayerStats | null>(null);
  const [achievements, setAchievements] = useState<PlayerAchievements | null>(
    null
  );

  const [skills, setSkills] = useState<SkillsResponse | null>(null);
  const [books, setBooks] = useState<BooksResponse | null>(null);
  const [bookDetails, setBookDetails] = useState<BookDetails | null>(null);
  const [professors, setProfessors] = useState<ProfessorsResponse | null>(null);
  const [dialogues, setDialogues] = useState<ProfessorDialoguesResponse | null>(
    null
  );
  const [store, setStore] = useState<StoresResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);


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

  // const fetchHistory = async (): Promise<BattleHistory | null> => {
  //   // ... (lógica existente está correta)
  //   setLoading(true);
  //   setError(null);
  //   try {
  //     const battleHistory = await getBattleHistory();
  //     setHistory(battleHistory);
  //     return battleHistory;
  //   } catch (err) {
  //     setError(err as Error);
  //     return null;
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // const fetchRankings = async (): Promise<Rankings | null> => {
  //   // ... (lógica existente está correta)
  //   setLoading(true);
  //   setError(null);
  //   try {
  //     const rank = await getRankings();
  //     setRankings(rank);
  //     return rank;
  //   } catch (err) {
  //     setError(err as Error);
  //     return null;
  //   } finally {
  //     setLoading(false);
  //   }
  // };


  const fetchSkills = async (): Promise<SkillsResponse | null> => {
    // ... (lógica existente está correta)
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

  // ATUALIZADO: Retorna o objeto de resposta completo
  const buySkill = async (
    data: PurchaseSkillRequest
  ): Promise<PurchaseSkillResponse | null> => {
    setLoading(true);
    setError(null);
    try {
      const result = await purchaseSkill(data);
      if (result.success) {
        await fetchSkills();
      }
      return result;
    } catch (err) {
      setError(err as Error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  // --- Books (Rotas 22, 23) ---
  const fetchBooks = async (): Promise<BooksResponse | null> => {
    // ... (lógica existente está correta)
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

  const fetchBookDetails = async (
    bookId: string
  ): Promise<BookDetails | null> => {
    // ... (lógica existente está correta)
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

  // --- Professors (Rotas 31, 32) ---
  const fetchProfessors = async (): Promise<ProfessorsResponse | null> => {
    // ... (lógica existente está correta)
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
    // ... (lógica existente está correta)
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

  // --- Store (Rotas 29, 30) ---
  const fetchStoreItems = async (): Promise<StoresResponse | null> => {
    // ... (lógica existente está correta)
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

  // ATUALIZADO: Retorna o objeto de resposta completo
  const buyItem = async (
    data: PurchaseItemRequest
  ): Promise<PurchaseItemResponse | null> => {
    setLoading(true);
    setError(null);
    try {
      const result = await purchaseItem(data);
      if (result.success) {
        await fetchStoreItems();
      }
      return result;
    } catch (err) {
      setError(err as Error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const clearError = () => {
    setError(null);
  };

  return {
    stats,
    achievements,
    skills,
    books,
    bookDetails,
    professors,
    dialogues,
    store,
    loading,
    error,
    fetchStats,
    fetchAchievements,
    // updateStats, // Removido
    fetchSkills,
    purchaseSkill: buySkill,
    fetchBooks,
    fetchBookDetails,
    fetchProfessors,
    fetchProfessorDialogues,
    fetchStoreItems,
    purchaseItem: buyItem,
    clearError,
  };
};