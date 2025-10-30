// hooks/managers/useTutorialManager.ts
import { useState, useEffect, useCallback } from 'react';

// Importa seus tipos e serviços
import type { GameState } from '../../../contexts';
import { getDialogueById } from '../../../services/'; // Importa o service direto
import type { DialogueLine as ApiDialogueData } from '../../../types'; // Tipo da API

// Importa os tipos da UI
import type { DialogueLine, CharacterImages } from '../../../types';

import GoblinGramatica from '../../../assets/Images/npc/GoblinDaGramatica.png';

import { 
  classNameToImageType, 
  getCharacterImage 
} from '../../../constants/assets/CharacterAssets';

interface TutorialManagerProps {
  gamestate: GameState | 'DIALOGUE';
  setGameState: (state: GameState | 'DIALOGUE') => void;
}

const TUTORIAL_SCENE_IMAGES: CharacterImages = {

  "Goblin da Gramatica": GoblinGramatica,

  "Voce": getCharacterImage(classNameToImageType("Rogue")),  
};


/**
 * Mapeia a resposta da API (que tem o 'speaker' como objeto)
 * para o formato que a UI 'PixelDialogueOverlay' espera.
 */
const mapApiToUI = (apiData: ApiDialogueData): DialogueLine => {
  // A UI só precisa saber o nome do falante e o texto
  return {
    speaker: apiData.speaker,
    response: apiData.response,
    id: apiData.id,
    content: apiData.content,
  };
}

/**
 * Gerencia todo o fluxo de tutorial sequencial baseado em API.
 */

export const TutorialLogic= ({ gamestate, setGameState }: TutorialManagerProps) => {
  
  const [currentDialogueId, setCurrentDialogueId] = useState<number | null>(null);
  
  // O 'dialogueData' agora é um array com UMA ÚNICA fala
  const [dialogueData, setDialogueData] = useState<DialogueLine[] | null>(null);
  const [isLoading, setIsLoading] = useState(false); 

  /**
   * Esta função é chamada pelo botão "Avançar".
   * Ela busca o PRÓXIMO diálogo na API.
   */

  const handleAdvance = useCallback(async () => {
    if (currentDialogueId === null || isLoading) return; 

    setIsLoading(true);
    const nextId = currentDialogueId + 1; // 1. Incrementa o ID
    console.log(`TutorialManager: Avançando... buscando ID ${nextId}`);

    try {
      // 2. Chama a API
      const nextDialogue = await getDialogueById(nextId);
      
      // 3. SUCESSO: A API achou o próximo diálogo
      const line  = mapApiToUI(nextDialogue);
      
      setCurrentDialogueId(nextId); // Atualiza o ID atual
      setDialogueData([line]);      // Atualiza a UI com a nova fala
      
    } catch (error: any) {
      
      console.log('TutorialLogic: Fim do diálogo (API retornou erro/null). Navegando para HUB.');
      
      // Limpa a tela e muda o estado do jogo
      setDialogueData(null); 
      setCurrentDialogueId(null);
      setGameState('HUB'); // 5. Navega para o HUB
    } finally {
      setIsLoading(false);
    }
  }, [currentDialogueId, isLoading, setGameState]);


  /**
   * Efeito para buscar o *primeiro* diálogo (ID 1)
   * quando o jogo entra no estado 'TUTORIAL'.
   */

  useEffect(() => {
    const startTutorial = async () => {
      const initialId = 1; // Começa pelo ID 1
      setIsLoading(true);
      console.log(`TutorialManager: Iniciando tutorial. Buscando ID ${initialId}`);
      
      try {
        const firstDialogue = await getDialogueById(initialId);
        const line  = mapApiToUI(firstDialogue);
        
        setCurrentDialogueId(initialId);
        setDialogueData([line]); 

      } catch (error) {
        console.error("TutorialLogic: Falha ao carregar o *primeiro* diálogo (ID 1). Pulando...", error);
        setGameState('HUB');
      } finally {
        setIsLoading(false);
      }
    };
    
    // Se o jogo entrou no estado 'TUTORIAL' e o tutorial não começou...
    if (gamestate === 'TUTORIAL' && currentDialogueId === null && !isLoading) {
      startTutorial();
    }
    
  }, [gamestate, currentDialogueId, isLoading, setGameState]);


  return {
    // 'dialogueData' é o array de 1 item
    dialogueData,
    // 'currentDialogueIndex' é sempre 0, já que o array só tem 1 item
    currentDialogueIndex: 0, 
    characterImages: TUTORIAL_SCENE_IMAGES,
    // 'advanceDialogue' é a nossa nova função que busca na API
    advanceDialogue: handleAdvance,
    // 'isTutorialLoading' para mostrar um spinner se desejar
    isTutorialLoading: isLoading,
  };
};