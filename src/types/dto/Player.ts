import type { CharacterResponse, ClassName } from './Character';
import type { UserProfileResponse, UserStatsResponse } from './User';

/**
 * Modelo de Domínio do Front-end.
 * Representa o "Jogador" logado na aplicação, combinando
 * dados de perfil, estatísticas e o personagem ativo.
 * É aqui que você pode adicionar campos extras (ex: imageUrl).
 */
export interface PlayerModel {
  profile: UserProfileResponse;
  stats: UserStatsResponse;
  activeCharacter: CharacterResponse;
  // Exemplo de campo extra do front-end:
  avatarUrl: string;
}

export interface Player {
  id: number;
  nome: string;
  stamina: number;
  maxStamina: number;
  hp: number;
  xp: number;
  gold: number;
  lastSavedAt: string;
  maxHp?: number;
  image?: string;
  damage?: number;
  className?: ClassName;
  level?: number;
  coins?: number;
  abilityUsed?: boolean;
}

