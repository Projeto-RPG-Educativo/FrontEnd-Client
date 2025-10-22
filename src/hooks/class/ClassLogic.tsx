import { useState, useEffect, useCallback } from 'react';
import { 
  type ClassName, 
  type Player,
  type ClassResponse,
  type FullClassData
} from '../../types/Character';
import { useGame } from '../../contexts/GameContext';
import { usePersonagem } from '../character/usePersonagem';

// ==================== TIPOS ====================
// Mapeamento entre nomes do backend e nomes do frontend
const CLASS_NAME_MAP: Record<string, ClassName> = {
  'tank': 'Tank' as ClassName,
  'mage': 'Mage' as ClassName,
  'fighter': 'Fighter' as ClassName,
  'rogue': 'Rogue' as ClassName,
  'paladin': 'Paladin' as ClassName,
  'bard': 'Bard' as ClassName
};
// ==================== HOOK ====================
export const ClassLogic = () => {

  const { player, setPlayer, setGameState, setIsLoading } = useGame();
  const { criarPersonagem, buscarClasses, erro: erroPersonagem } = usePersonagem();

  // 2. Estados para gerir os dados, o carregamento e os erros
  const [classes, setClasses] = useState<FullClassData[]>([]);
  const [isLoadingClasses, setIsLoadingClasses] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedClass, setSelectedClass] = useState<FullClassData | null>(null);

  // 3. useEffect para buscar os dados do backend quando o hook é montado
  useEffect(() => {
    const loadClassData = async () => {
      try {
        setError(null);
        setIsLoadingClasses(true);
        
        // Buscar classes do backend via hook
        const backendClasses = await buscarClasses();
        
        // Mapear para o formato FullClassData
        const mappedClasses: FullClassData[] = backendClasses.map((cls: ClassResponse) => ({
          id: cls.id,
          name: CLASS_NAME_MAP[cls.name] || cls.name as ClassName,
          backendName: cls.name,
          description: `botar skills aqui futuramente ta sem rota(nao procurei)`,
          hp: cls.hp,
          stamina: cls.stamina,
          strength: cls.strength,
          intelligence: cls.intelligence
        }));
        
        setClasses(mappedClasses);
      } catch (err) {
        console.error('❌ Erro ao carregar classes:', err);
        setError("Não foi possível carregar as classes. Tente recarregar a página.");
      } finally {
        setIsLoadingClasses(false);
      }
    };
    loadClassData();
  }, []); // Array vazio: executa apenas uma vez na montagem do componente

  // Selecionar classe
  const handleClassClick = useCallback((cls: FullClassData) => {
    console.log('🎭 Classe selecionada:', cls.name);
    setSelectedClass(cls);
  }, []);

  // Cancelar seleção
  const handleCancelSelection = useCallback(() => {
    console.log('❌ Seleção cancelada');
    setSelectedClass(null);
  }, []);

  // ✅ CRIAR PERSONAGEM
  const createCharacter = useCallback(async (className: ClassName) => {
    try {
      console.log('🎮 Criando personagem:', className);
      setIsLoading(true);
      setError(null);

      // Buscar dados completos da classe
      const classData = classes.find(c => c.name === className);

      if (!classData) {
        throw new Error(`Classe ${className} não encontrada`);
      }

      // Criar personagem usando o service hook (passa nome backend: tank, mago, etc)
      const novoPersonagem = await criarPersonagem({
        nome: classData.name, // Nome frontend (Guerreiro, Mago, etc)
        classe: classData.backendName as ClassName // Nome backend (tank, mago, etc)
      });

      if (novoPersonagem) {
        // Criar player object baseado no personagem criado
        const newPlayer: Player = {
          id: typeof novoPersonagem.id === 'number' ? novoPersonagem.id : parseInt(novoPersonagem.id as string),
          name: novoPersonagem.nome || classData.name,
          className: className,
          level: novoPersonagem.level || 1,
          hp: novoPersonagem.hp || classData.hp,
          maxHp: novoPersonagem.maxHp || classData.hp,
          damage: classData.strength || 10, // Usar força como base de dano
          abilityUsed: false,
         // image: novoPersonagem.image || '',
          stamina: novoPersonagem.stamina || classData.stamina || 0,
          maxStamina: novoPersonagem.maxStamina || classData.stamina || 0,
          coins: novoPersonagem.coins || 0
        };

        // Salvar jogador no contexto
        setPlayer(newPlayer);

        console.log('✅ Personagem criado com sucesso:', newPlayer);

        // Ir para a próxima tela (Hub ou Diálogo inicial)
        setTimeout(() => {
          setGameState('HUB');
          setIsLoading(false);
        }, 500);
      }

    } catch (err) {
      console.error('❌ Erro ao criar personagem:', err);
      const errorMessage = erroPersonagem instanceof Error ? erroPersonagem.message : 'Erro ao criar personagem. Tente novamente.';
      setError(errorMessage);
      setIsLoading(false);
    }
  }, [classes, criarPersonagem, erroPersonagem, setPlayer, setGameState, setIsLoading]);

  // Confirmar seleção e criar personagem
  const handleConfirmSelection = useCallback(async () => {
    if (selectedClass) {
      await createCharacter(selectedClass.name as ClassName);
    }
  }, [selectedClass, createCharacter]);

  // 4. Retorna tudo o que a UI precisa para se renderizar
    return {
    // Estados
    player,
    classes,
    isLoadingClasses,
    error,
    selectedClass,

    // Funções
    handleClassClick,
    handleConfirmSelection,
    handleCancelSelection,
    createCharacter,
  };
};
