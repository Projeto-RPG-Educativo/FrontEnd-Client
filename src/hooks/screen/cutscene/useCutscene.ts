import { useState, useCallback, useEffect } from 'react';
import { getDialogueById } from '../../../services/';
import type { DialogueLine as ApiDialogueData } from '../../../types/dto/Tutorial.types';
import type { CutsceneDialogue } from '../../../screen/cutscene/Cutscene';

interface UseCutsceneProps {
  startDialogueId: number;
  totalDialogues: number;
  onComplete: () => void;
  autoStart?: boolean;
}

interface UseCutsceneReturn {
  dialogues: CutsceneDialogue[];
  isLoading: boolean;
  error: string | null;
  currentDialogue: CutsceneDialogue | null;
  hasMoreDialogues: boolean;
  loadNextDialogue: () => Promise<void>;
  resetCutscene: () => void;
}

const mapApiToDialogue = (apiData: ApiDialogueData): CutsceneDialogue => {
  if (!apiData || !apiData.speaker) {
    console.error('❌ [useCutscene] Dados do diálogo inválidos');
    throw new Error('Dados do diálogo inválidos');
  }

  const speakerName = apiData.speaker.name || 'Desconhecido';

  return {
    id: apiData.id,
    speaker: speakerName,
    content: apiData.content || '',
  };
};

export const useCutscene = ({
  startDialogueId,
  totalDialogues,
  onComplete,
  autoStart = true,
}: UseCutsceneProps): UseCutsceneReturn => {
  const [dialogues, setDialogues] = useState<CutsceneDialogue[]>([]);
  const [currentId, setCurrentId] = useState<number>(startDialogueId);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasLoaded, setHasLoaded] = useState(false);

  const currentDialogue = dialogues.length > 0 ? dialogues[dialogues.length - 1] : null;
  const hasMoreDialogues = dialogues.length < totalDialogues;

  const loadNextDialogue = useCallback(async () => {
    if (isLoading || !hasMoreDialogues) return;

    setIsLoading(true);
    setError(null);

    try {
      console.log(`📚 [useCutscene] Carregando diálogo ID: ${currentId}`);
      const apiDialogue = await getDialogueById(currentId);
      const dialogue = mapApiToDialogue(apiDialogue);

      setDialogues(prev => [...prev, dialogue]);
      setCurrentId(prev => prev + 1);

      if (dialogues.length + 1 >= totalDialogues) {
        console.log('✅ [useCutscene] Cutscene completa');
        setTimeout(() => {
          onComplete();
        }, 300);
      }
    } catch (err) {
      console.error('❌ [useCutscene] Erro ao carregar diálogo:', err);
      setError('Erro ao carregar diálogo');
      onComplete();
    } finally {
      setIsLoading(false);
    }
  }, [currentId, hasMoreDialogues, isLoading, dialogues.length, totalDialogues, onComplete]);

  const resetCutscene = useCallback(() => {
    setDialogues([]);
    setCurrentId(startDialogueId);
    setError(null);
    setHasLoaded(false);
  }, [startDialogueId]);

  // Reset quando startDialogueId mudar (nova cutscene)
  useEffect(() => {
    setDialogues([]);
    setCurrentId(startDialogueId);
    setError(null);
    setHasLoaded(false);
  }, [startDialogueId, totalDialogues]);

  // Carregar diálogos apenas uma vez quando autoStart=true e ainda não carregou
  useEffect(() => {
    if (autoStart && totalDialogues > 0 && !hasLoaded && !isLoading) {
      setHasLoaded(true);
      
      const loadAll = async () => {
        setIsLoading(true);
        setError(null);
        const loadedDialogues: CutsceneDialogue[] = [];

        try {
          for (let i = 0; i < totalDialogues; i++) {
            const dialogueId = startDialogueId + i;
            const apiDialogue = await getDialogueById(dialogueId);
            const dialogue = mapApiToDialogue(apiDialogue);
            loadedDialogues.push(dialogue);
          }

          setDialogues(loadedDialogues);
          console.log(`✅ [useCutscene] ${totalDialogues} diálogos carregados (IDs ${startDialogueId}-${startDialogueId + totalDialogues - 1})`);
        } catch (err) {
          console.error('❌ [useCutscene] Erro ao carregar diálogos:', err);
          setError('Erro ao carregar diálogos');
        } finally {
          setIsLoading(false);
        }
      };

      loadAll();
    }
  }, [autoStart, totalDialogues, startDialogueId, hasLoaded, isLoading]);

  return {
    dialogues,
    isLoading,
    error,
    currentDialogue,
    hasMoreDialogues,
    loadNextDialogue,
    resetCutscene,
  };
};
