import { useState, useCallback, useEffect } from 'react';
import { useHub } from '../../hooks/services/useHub';
import { usePlayer } from '../../hooks/services/usePlayer';
import type { 
  HubStats,
  Skill,
  Book,
  Professor,
  StoreItem 
} from '../../types/legado/Hub';
import type { PlayerStats } from '../../types/legado/Player';

type HubZone = 'TOWER' | 'ARENA' | 'LIBRARY' | 'SHOP' | 'HOME';

interface UseHubScreenReturn {
  // Estado geral
  currentZone: HubZone;
  hubStats: HubStats | null;
  playerStats: PlayerStats | null;
  loading: boolean;
  error: string | null;
  
  // Navegação
  goToZone: (zone: HubZone) => void;
  returnToHub: () => void;
  
  // Skills
  skills: Skill[];
  purchaseSkill: (skillId: number) => Promise<boolean>;
  
  // Livros
  books: Book[];
  selectedBook: Book | null;
  fetchBookDetails: (bookId: number) => Promise<void>;
  
  // Professores
  professors: Professor[];
  professorDialogues: string[];
  fetchProfessorDialogues: (professorId: number) => Promise<void>;
  
  // Loja
  storeItems: StoreItem[];
  purchaseItem: (itemId: number, quantity: number) => Promise<boolean>;
  
  // Estatísticas
  updateStats: () => Promise<void>;
}

/**
 * Hook específico para o Hub (mundo aberto)
 * 
 * Gerencia navegação entre zonas e interações no hub
 * 
 * @example
 * ```tsx
 * const HubScreen = () => {
 *   const {
 *     currentZone,
 *     hubStats,
 *     skills,
 *     books,
 *     goToZone,
 *     purchaseSkill,
 *   } = useHubScreen();
 * 
 *   return (
 *     <div>
 *       <button onClick={() => goToZone('TOWER')}>
 *         Torre do Conhecimento
 *       </button>
 *     </div>
 *   );
 * };
 * ```
 */
export const useHubScreen = (): UseHubScreenReturn => {
  const [currentZone, setCurrentZone] = useState<HubZone>('HOME');
  const [hubStats, setHubStats] = useState<HubStats | null>(null);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [books, setBooks] = useState<Book[]>([]);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [professors, setProfessors] = useState<Professor[]>([]);
  const [professorDialogues, setProfessorDialogues] = useState<string[]>([]);
  const [storeItems, setStoreItems] = useState<StoreItem[]>([]);

  const {
    fetchStats: fetchHubStats,
    fetchSkills,
    purchaseSkill: purchaseSkillService,
    fetchBooks,
    fetchBookDetails: fetchBookDetailsService,
    fetchProfessors,
    fetchProfessorDialogues: fetchProfessorDialoguesService,
    fetchStoreItems,
    purchaseItem: purchaseItemService,
    updateStats: updateHubStats,
    loading: loadingHub,
    error: errorHub,
  } = useHub();

  const {
    fetchStats: fetchPlayerStats,
    updateStats: updatePlayerStats,
    loading: loadingPlayer,
    error: errorPlayer,
  } = usePlayer();

  const [playerStats, setPlayerStats] = useState<PlayerStats | null>(null);

  const loading = loadingHub || loadingPlayer;
  const error = errorHub || errorPlayer;

  // Carregar estatísticas iniciais
  useEffect(() => {
    const loadInitialData = async () => {
      const stats = await fetchHubStats();
      if (stats) {
        setHubStats(stats);
      }

      const pStats = await fetchPlayerStats();
      if (pStats) {
        setPlayerStats(pStats);
      }
    };

    loadInitialData();
  }, [fetchHubStats, fetchPlayerStats]);

  // Navegar para zona
  const goToZone = useCallback((zone: HubZone) => {
    setCurrentZone(zone);
    
    // Carregar dados específicos da zona
    switch (zone) {
      case 'TOWER':
        fetchSkills().then((skillsData: Skill[] | null) => {
          if (skillsData) setSkills(skillsData);
        });
        fetchProfessors().then((profsData: Professor[] | null) => {
          if (profsData) setProfessors(profsData);
        });
        break;
      
      case 'LIBRARY':
        fetchBooks().then((booksData: Book[] | null) => {
          if (booksData) setBooks(booksData);
        });
        break;
      
      case 'SHOP':
        fetchStoreItems().then((itemsData: StoreItem[] | null) => {
          if (itemsData) setStoreItems(itemsData);
        });
        break;
    }
  }, [fetchSkills, fetchProfessors, fetchBooks, fetchStoreItems]);

  // Voltar para o hub central
  const returnToHub = useCallback(() => {
    setCurrentZone('HOME');
  }, []);

  // Comprar habilidade
  const purchaseSkill = useCallback(async (skillId: number): Promise<boolean> => {
    const result = await purchaseSkillService(skillId);
    
    if (result) {
      // Atualizar lista de habilidades
      const skillsData = await fetchSkills();
      if (skillsData) setSkills(skillsData);
      
      // Atualizar estatísticas
      await updateStats();
      
      return true;
    }
    
    return false;
  }, [purchaseSkillService, fetchSkills]);

  // Buscar detalhes de um livro
  const fetchBookDetails = useCallback(async (bookId: number) => {
    const book = await fetchBookDetailsService(bookId);
    
    if (book) {
      setSelectedBook(book);
    }
  }, [fetchBookDetailsService]);

  // Buscar diálogos de um professor
  const fetchProfessorDialogues = useCallback(async (professorId: number) => {
    const dialogues = await fetchProfessorDialoguesService(professorId);
    
    if (dialogues) {
      setProfessorDialogues(dialogues);
    }
  }, [fetchProfessorDialoguesService]);

  // Comprar item da loja
  const purchaseItem = useCallback(async (
    itemId: number,
    quantity: number
  ): Promise<boolean> => {
    const result = await purchaseItemService(itemId, quantity);
    
    if (result) {
      // Atualizar lista de itens
      const itemsData = await fetchStoreItems();
      if (itemsData) setStoreItems(itemsData);
      
      // Atualizar estatísticas
      await updateStats();
      
      return true;
    }
    
    return false;
  }, [purchaseItemService, fetchStoreItems]);

  // Atualizar estatísticas
  const updateStats = useCallback(async () => {
    // Atualizar estatísticas do Hub (passa objeto vazio para apenas buscar)
    const hStats = await updateHubStats({});
    if (hStats) {
      setHubStats(hStats);
    }

    // Buscar estatísticas atualizadas do jogador
    const pStats = await fetchPlayerStats();
    if (pStats) {
      setPlayerStats(pStats);
    }
  }, [updateHubStats, fetchPlayerStats]);

  return {
    currentZone,
    hubStats,
    playerStats,
    loading,
    error: error ? error.message : null,
    goToZone,
    returnToHub,
    skills,
    purchaseSkill,
    books,
    selectedBook,
    fetchBookDetails,
    professors,
    professorDialogues,
    fetchProfessorDialogues,
    storeItems,
    purchaseItem,
    updateStats,
  };
};
