import type { MonsterBattleInfo } from '../../types';
import type { Monster } from '../../types'; // Verifique o caminho

/**
 * Mapeia o DTO 'MonsterBattleInfo' (vindo da API, com nomes em português)
 * para o Modelo de Domínio 'Monster' (usado no front-end, com nomes em inglês).
 *
 * @param dto O DTO 'MonsterBattleInfo' recebido da API.
 * @returns Um objeto 'Monster' pronto para ser usado pela UI.
 */
export const mapMonsterDtoToModel = (dto: MonsterBattleInfo): Monster => {
  const imageSlug = dto.nome.toLowerCase().replace(/\s+/g, '-');
  const imageUrl = `/assets/images/monsters/${imageSlug}.png`;

  return {
    // --- Mapeamento de Tipos e Nomes ---
    id: dto.id.toString(), 
    name: dto.nome, 
    hp: dto.hp,
    damage: dto.dano,

    // --- Campos Adicionais do Modelo (Defaults) ---
    maxHp: dto.hp,
    image: imageUrl,

    // O DTO não nos diz se é um boss ou o tipo,
    // então definimos valores padrão.
    isBoss: false,
    type: 'minion',
  };
};