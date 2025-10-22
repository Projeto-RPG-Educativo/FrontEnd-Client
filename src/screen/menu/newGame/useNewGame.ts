import { useState, useCallback } from 'react';
import { usePersonagem } from '../../../hooks/character/usePersonagem';
import type { ClassName } from '../../../types/Character';

type Dificuldade = 'facil' | 'medio' | 'dificil';

// interface OpcoesNovoJogo {
//   dificuldade: Dificuldade;
//   comTutorial: boolean;
//   nomePersonagem: string;
//   classePersonagem: string;
// }

interface UseNewGameReturn {
  // Estados do formulário
  dificuldadeSelecionada: Dificuldade | null;
  comTutorial: boolean | null;
  classePersonagem: ClassName;
  erro: string | null;
  carregando: boolean;
  formularioValido: boolean;
  
  // Ações
  setDificuldade: (dificuldade: Dificuldade) => void;
  setComTutorial: (comTutorial: boolean) => void;
  // setNomePersonagem: (nome: string) => void;
  setClassePersonagem: (classe: ClassName) => void;
  iniciarNovoJogo: (onSuccess: (characterId: number) => void) => Promise<void>;
  limparErro: () => void;
}

/**
 * Hook específico para a tela de Novo Jogo
 * 
 * Gerencia configurações iniciais e criação de personagem
 * 
 * @example
 * ```tsx
 * const NewGamePanel = () => {
 *   const {
 *     dificuldadeSelecionada,
 *     comTutorial,
 *     nomePersonagem,
 *     classePersonagem,
 *     formularioValido,
 *     setDificuldade,
 *     setComTutorial,
 *     setNomePersonagem,
 *     setClassePersonagem,
 *     iniciarNovoJogo,
 *   } = useNewGamePanel();
 * 
 *   const handleStart = async () => {
 *     await iniciarNovoJogo((characterId) => {
 *       // Iniciar jogo com o personagem criado
 *       console.log('Personagem criado:', characterId);
 *     });
 *   };
 * };
 * ```
 */
export const useNewGame = (): UseNewGameReturn => {
  const [dificuldadeSelecionada, setDificuldadeState] = useState<Dificuldade | null>(null);
  const [comTutorial, setComTutorialState] = useState<boolean | null>(null);
  // const [nomePersonagem, setNomePersonagemState] = useState('');
  const [classePersonagem, setClassePersonagemState] = useState<ClassName>('Tank'); // ✅ Valor padrão
  const [erro, setErro] = useState<string | null>(null);
  
  const { criarPersonagem, carregando } = usePersonagem();

  // Validação do formulário
  const formularioValido = 
    dificuldadeSelecionada !== null &&
    comTutorial !== null &&
    // nomePersonagem.trim().length >= 3 &&
    classePersonagem !== undefined; // ✅ Validar classe também

  // Limpar erro
  const limparErro = useCallback(() => {
    setErro(null);
  }, []);

  // Setters
  const setDificuldade = useCallback((dificuldade: Dificuldade) => {
    setDificuldadeState(dificuldade);
    limparErro();
  }, [limparErro]);

  const setComTutorial = useCallback((tutorial: boolean) => {
    setComTutorialState(tutorial);
    limparErro();
  }, [limparErro]);

  // const setNomePersonagem = useCallback((nome: string) => {
  //   setNomePersonagemState(nome);
  //   limparErro();
  // }, [limparErro]);

  const setClassePersonagem = useCallback((classe: ClassName) => {
    setClassePersonagemState(classe);
    limparErro();
  }, [limparErro]);

  // Iniciar novo jogo
  const iniciarNovoJogo = useCallback(async (
    onSuccess: (characterId: number) => void
  ) => {
    if (!formularioValido) {
      setErro('Preencha todos os campos obrigatórios');
      return;
    }

    // Criar personagem
    const personagem = await criarPersonagem({
      classe: classePersonagem,
      nome: 'Heroi'
    });

    if (personagem) {
      // Salvar configurações do jogo no localStorage
      localStorage.setItem('gameDifficulty', dificuldadeSelecionada!);
      localStorage.setItem('withTutorial', String(comTutorial));
      
      onSuccess(typeof personagem.id === 'number' ? personagem.id : Number(personagem.id));
    } else {
      setErro('Erro ao criar personagem. Tente novamente.');
    }
  }, [
    formularioValido,
    // nomePersonagem,
    classePersonagem,
    dificuldadeSelecionada,
    comTutorial,
    criarPersonagem,
  ]);

  return {
    dificuldadeSelecionada,
    comTutorial,
    // nomePersonagem,
    classePersonagem,
    erro,
    carregando,
    formularioValido,
    setDificuldade,
    setComTutorial,
    // setNomePersonagem,
    setClassePersonagem,
    iniciarNovoJogo,
    limparErro,
  };
};
