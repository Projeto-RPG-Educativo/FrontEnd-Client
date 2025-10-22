import { useState } from 'react';
import {
  listCharacters,
  getCharacter,
  createCharacter,
  updateCharacter,
  deleteCharacter,
  getAvailableClasses,
  type CreateCharacterRequest,
  type UpdateCharacterRequest,
  type ClassResponse,
} from '../../services/character/CharacterService';
import type { Character } from '../../types/Character';

interface UsePersonagemReturn {
  personagens: Character[];
  personagemAtual: Character | null;
  classes: ClassResponse[];
  carregando: boolean;
  erro: Error | null;
  listarPersonagens: () => Promise<Character[]>;
  buscarPersonagem: (id: number) => Promise<Character | null>;
  criarPersonagem: (dados: CreateCharacterRequest) => Promise<Character | null>;
  atualizarPersonagem: (id: string, dados: UpdateCharacterRequest) => Promise<Character | null>;
  deletarPersonagem: (id: string) => Promise<boolean>;
  buscarClasses: () => Promise<ClassResponse[]>;
  limparErro: () => void;
}

/**
 * Hook para gerenciar personagens
 * 
 * @example
 * ```tsx
 * const { criarPersonagem, listarPersonagens, personagens, carregando } = usePersonagem();
 * 
 * const handleCriarPersonagem = async () => {
 *   const novoPersonagem = await criarPersonagem({
 *     nome: "Herói",
 *     classe: "Tanque",
 *     vida: 100,
 *     ataque: 10,
 *     defesa: 5
 *   });
 *   
 *   if (novoPersonagem) {
 *     await listarPersonagens();
 *   }
 * };
 * ```
 */
export const usePersonagem = (): UsePersonagemReturn => {
  const [personagens, setPersonagens] = useState<Character[]>([]);
  const [personagemAtual, setPersonagemAtual] = useState<Character | null>(null);
  const [classes, setClasses] = useState<ClassResponse[]>([]);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState<Error | null>(null);

  const listarPersonagens = async (): Promise<Character[]> => {
    setCarregando(true);
    setErro(null);
    try {
      const lista = await listCharacters();
      setPersonagens(lista);
      return lista;
    } catch (error) {
      setErro(error as Error);
      return [];
    } finally {
      setCarregando(false);
    }
  };

  const buscarPersonagem = async (id: number): Promise<Character | null> => {
    setCarregando(true);
    setErro(null);
    try {
      const personagem = await getCharacter(id);
      setPersonagemAtual(personagem);
      return personagem;
    } catch (error) {
      setErro(error as Error);
      return null;
    } finally {
      setCarregando(false);
    }
  };

  const criarPersonagem = async (
    dados: CreateCharacterRequest
  ): Promise<Character | null> => {
    setCarregando(true);
    setErro(null);
    try {
      const novoPersonagem = await createCharacter(dados);
      setPersonagens((prev) => [...prev, novoPersonagem]);
      return novoPersonagem;
    } catch (error) {
      setErro(error as Error);
      return null;
    } finally {
      setCarregando(false);
    }
  };

  const atualizarPersonagem = async (
    id: string,
    dados: UpdateCharacterRequest
  ): Promise<Character | null> => {
    setCarregando(true);
    setErro(null);
    try {
      const personagemAtualizado = await updateCharacter(id, dados);
      setPersonagens((prev) =>
        prev.map((p) => (p.id === id ? personagemAtualizado : p))
      );
      if (personagemAtual?.id === id) {
        setPersonagemAtual(personagemAtualizado);
      }
      return personagemAtualizado;
    } catch (error) {
      setErro(error as Error);
      return null;
    } finally {
      setCarregando(false);
    }
  };

  const deletarPersonagem = async (id: string): Promise<boolean> => {
    setCarregando(true);
    setErro(null);
    try {
      await deleteCharacter(id);
      setPersonagens((prev) => prev.filter((p) => p.id !== id));
      if (personagemAtual?.id === id) {
        setPersonagemAtual(null);
      }
      return true;
    } catch (error) {
      setErro(error as Error);
      return false;
    } finally {
      setCarregando(false);
    }
  };

  const limparErro = () => {
    setErro(null);
  };

  const buscarClasses = async (): Promise<ClassResponse[]> => {
    setCarregando(true);
    setErro(null);
    try {
      const classesDisponiveis = await getAvailableClasses();
      setClasses(classesDisponiveis);
      return classesDisponiveis;
    } catch (error) {
      setErro(error as Error);
      return [];
    } finally {
      setCarregando(false);
    }
  };

  return {
    personagens,
    personagemAtual,
    classes,
    carregando,
    erro,
    listarPersonagens,
    buscarPersonagem,
    criarPersonagem,
    atualizarPersonagem,
    deletarPersonagem,
    buscarClasses,
    limparErro,
  };
};
