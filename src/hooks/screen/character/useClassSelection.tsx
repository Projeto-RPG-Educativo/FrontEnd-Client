import { useState, useEffect, useCallback, useContext } from 'react';
import {
  type ClassName,
  type Player,
  type GameClassDTO,
  type FullClassData,
  type CharacterResponse
} from '../../../types';

import { useGame } from '../../../contexts/GameContext';
import { useCharacter } from '../../services/useCharacter';
import { AuthContext } from '../../../contexts/AuthContext';

export const ClassLogic = () => {

  const { player, setPlayer, setGameState, setClass: setClassName } = useGame();
  const { createCharacter: createCharacterService, fetchClasses, error: characterError } = useCharacter();
  const { user } = useContext(AuthContext);

  // 2. Estados para gerir os dados, o carregamento e os erros
  const [classes, setClasses] = useState<FullClassData[]>([]);
  const [isLoadingClasses, setIsLoadingClasses] = useState(true);
  const [classError, setClassError] = useState<string | null>(null);
  const [selectedClass, setSelectedClass] = useState<FullClassData | null>(null);
  const [creatingCharacter, setCreatingCharacter] = useState(false);

  // 3. useEffect para buscar os dados do backend quando o hook é montado
  useEffect(() => {
    const loadClassData = async () => {
      try {
        setClassError(null);
        setIsLoadingClasses(true);

        // Buscar classes do backend via hook
        const backendClasses = await fetchClasses();

        // Mapear para o formato FullClassData
        const mappedClasses: FullClassData[] = backendClasses.map((cls: GameClassDTO) => ({
          id: cls.id,
          name: cls.name as ClassName,
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
        setClassError("Não foi possível carregar as classes. Tente recarregar a página.");
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
    setClassName(cls.name);
  }, []);

  // Cancelar seleção
  const handleCancelSelection = useCallback(() => {
    console.log('❌ Seleção cancelada');
    setSelectedClass(null);
  }, []);


  const createCharacter = useCallback(async (className: ClassName) => {
    try {
      if (creatingCharacter) return;
      console.log('🎮 Criando personagem:', className);
      setCreatingCharacter(true);
      setClassError(null);

      // Buscar dados completos da classe
      const classData = classes.find(c => c.name === className);

      if (!classData) {
        setCreatingCharacter(false);
        throw new Error(`Classe ${className} não encontrada`);
      }

      
      if (!user?.id) {
        setCreatingCharacter(false);
        throw new Error('Usuário não autenticado. Faça login novamente.');
      }

      console.log('📤 Enviando para o backend:', {
        userid: user.id,
        classname: classData.name
      });

      // Criar personagem usando o service hook
      const newCharacter: CharacterResponse | null = await createCharacterService({
        Userid: typeof user.id === 'number' ? user.id : parseInt(user.id, 10),
        classe: classData.name as ClassName 
      }) as CharacterResponse | null;

      if (newCharacter) {
        // Criar player object baseado no personagem criado (convertendo CharacterResponse para Player)
        const newPlayer: Player = {
          id: typeof newCharacter.id === 'number' ? newCharacter.id : parseInt(newCharacter.id as string),
          nome: newCharacter.nome,
          className: classData.name,
          xp: newCharacter.xp,
          gold: newCharacter.gold,
          hp: newCharacter.hp,
          maxHp: newCharacter.maxHp,
          stamina: newCharacter.energy,
          maxStamina: newCharacter.maxEnergy,
          lastSavedAt: newCharacter.lastSavedAt
        };

        // Salvar jogador no contexto
        setPlayer(newPlayer);

        console.log('✅ Personagem criado com sucesso:', newPlayer);

        // Ir para a próxima tela (Hub ou Diálogo inicial)
        setTimeout(() => {
          setGameState('LOADING');
          setCreatingCharacter(false);
        }, 500);
      } else {
        setCreatingCharacter(false);
      }

    } catch (err) {
      console.error('❌ Erro ao criar personagem:', err);
      const errorMessage = characterError instanceof Error ? characterError.message : 'Erro ao criar personagem. Tente novamente.';
      setClassError(errorMessage);
      setCreatingCharacter(false);
    }
  }, [classes, createCharacterService, characterError, setPlayer, setGameState, user, creatingCharacter]);

  // Confirmar seleção e criar personagem
  const handleConfirmSelection = useCallback(async () => {
    if (!selectedClass || creatingCharacter) return;
    await createCharacter(selectedClass.name as ClassName);
  }, [selectedClass, createCharacter, creatingCharacter]);

  
  return {
    // Estados
    player,
    classes,
    isLoadingClasses,
    error: classError,
    selectedClass,
    creatingCharacter,

    // Funções
    handleClassClick,
    handleConfirmSelection,
    handleCancelSelection,
    createCharacter,
  };
};
