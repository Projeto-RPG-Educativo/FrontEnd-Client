import { useState, useCallback } from 'react';
import api from '../../services/api/api'; 
import type { GameState } from '../../contexts/GameContext';
import type { SaveData, DisplaySlot } from '../../types/Save';  
import type { Player, ClassName } from '../../types/Character';  

const BASE_SLOTS: DisplaySlot[] = Array.from({ length: 5 }, (_, index) => ({
  id: index + 1,
  name: `Slot ${index + 1}`,
  progress: 'Não há dados',
  saveData: null,
}));

interface SaveGameLogicProps {
  setGameState: (state: GameState) => void;
  setPlayer: (player: Player | null) => void;
}

export const SaveLogic = ({ setGameState, setPlayer }: SaveGameLogicProps) => {
  const [slots, setSlots] = useState<DisplaySlot[]>(BASE_SLOTS);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchSaves = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await api.get('/saves');
      const apiSaves: SaveData[] = response.data;

      const updatedSlots = BASE_SLOTS.map((baseSlot) => {
        const save = apiSaves.find(s => s.slotName === baseSlot.name);
        if (save) {
          const date = new Date(save.savedAt).toLocaleString();
          const charName = save.character.nome;
          const charClass = save.character.classe;
          const level = save.characterState?.level ? `Nível ${save.characterState.level}` : 'Em Jogo';
          return { 
            ...baseSlot, 
            progress: `${charName} (${charClass}) | ${level} | ${date}`, 
            saveData: save 
          };
        }
        return baseSlot;
      });
      
      setSlots(updatedSlots);
    } catch (err) {
      console.error("❌ Erro ao carregar saves:", err);
      setError("Não foi possível carregar os dados salvos.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleLoadGame = useCallback((saveData: SaveData | null) => {
    if (!saveData || !saveData.characterState) {
      console.error("❌ Tentativa de carregar um save inválido ou sem estado de personagem.");
      return;
    }

    console.log("📂 Carregando jogo a partir do estado:", saveData);

    try {
      // ✅ Obter imagem do barrel
      const className = saveData.character.classe as ClassName;
    //   const characterImage = CHARACTER_IMAGES[className] || CHARACTER_IMAGES.default;

      // ✅ Criar objeto Player COMPLETO
      const loadedPlayer: Player = {
        // IDs e identificação
        id: saveData.character.id || 0,  // ✅ ADICIONAR com fallback
        name: saveData.character.nome || 'Desconhecido',  // ✅ ADICIONAR com fallback
        className: className || 'Guerreiro',  // ✅ ADICIONAR com fallback
        
        // Stats de combate
        hp: saveData.characterState.hp,
        maxHp: saveData.characterState.maxHp,
        stamina: saveData.characterState.stamina,
        maxStamina: saveData.characterState.maxStamina,
        damage: saveData.characterState.damage || 10,  // ✅ ADICIONAR
        
        // Progressão
        level: saveData.characterState.level,
        coins: saveData.characterState.coins || 0,  // ✅ ADICIONAR
        
        // Estado de habilidade
        abilityUsed: false,  // ✅ ADICIONAR
        
        // Visual
        // image: saveData.character.image || characterImage,
      };

      console.log("✅ Player carregado:", loadedPlayer);

      // Atualizar estado global
      setPlayer(loadedPlayer);
      
      console.log("🎮 Jogo carregado com sucesso!");
      
    } catch (err) {
      console.error("❌ Erro ao processar dados do save:", err);
    }
  }, [setPlayer, setGameState]);

  return { 
    slots, 
    isLoading, 
    error, 
    fetchSaves, 
    handleLoadGame 
  };
};