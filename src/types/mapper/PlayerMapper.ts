import type {
  CharacterResponse,
  Player,
  ClassName,
} from '../../types'; 

/**
 * Mapeia o DTO 'CharacterResponse' (vindo da API) para o
 * Modelo de Domínio 'Player' (usado no front-end).
 *
 * O modelo 'Player' tem nomes de campos diferentes (ex: 'stamina' em vez de 'energy')
 * e pode ter campos de estado de UI adicionais.
 *
 * @param dto O DTO 'CharacterResponse' recebido da API.
 * @returns Um objeto 'Player' pronto para ser usado pela UI.
 */

export const mapCharacterToPlayer = (dto: CharacterResponse): Player => {
  const calculateLevel = (xp: number): number => {
    return Math.floor(xp / 100) + 1;
  };

  return {
    
    id: dto.id,
    nome: dto.nome,
    hp: dto.hp,
    xp: dto.xp,
    gold: dto.gold,
    lastSavedAt: dto.lastSavedAt,

   
    stamina: dto.energy,
    maxStamina: dto.maxEnergy,

  
    className: dto.className.toLowerCase() as ClassName,

    
    level: calculateLevel(dto.xp),
    coins: dto.gold,
    maxHp: dto.hp, 
    abilityUsed: false, 

   
    image: undefined,
    damage: undefined,
  };
};