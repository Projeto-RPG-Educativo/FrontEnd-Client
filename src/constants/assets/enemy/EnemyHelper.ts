import { BOSS_IMAGES } from './BossAssets';
import { MINION_IMAGES } from './MinionAssets';

export const getEnemyImage = (enemyType: string, isBoss: boolean = false): string => {
  if (isBoss) {
    // Para bosses
    const bossType = enemyType as keyof typeof BOSS_IMAGES;
    return BOSS_IMAGES[bossType] || BOSS_IMAGES.Malak; // fallback
  } else {
    // Para minions
    const minionType = enemyType as keyof typeof MINION_IMAGES;
    return MINION_IMAGES[minionType] || MINION_IMAGES.Diabrete; // fallback
  }
};

// Função mais inteligente que mapeia nomes da API
export const getEnemyImageByName = (enemyName: string): string => {
  // Normalizar nome (remover espaços, acentos, etc.)
  const normalizedName = enemyName
    .toLowerCase()
    .replace(/\s+/g, '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');

  // Mapeamento de nomes da API para tipos de imagem
  const nameMapping: Record<string, string> = {
    // Minions
    'diabrete': 'Diabrete',
    'diabreteErroneo': 'Diabrete',
    'diabrete_erroneo': 'Diabrete',
    
    'esqueleto': 'Esqueleto', 
    'esqueletosintaxe': 'Esqueleto',
    'esqueleto_sintaxe': 'Esqueleto',
    
    'harpia': 'Harpia',
    'harpiaindagada': 'Harpia',
    'harpia_indagada': 'Harpia',
    
    'zumbi': 'Zumbi',
    'zumbidemente': 'Zumbi',
    'zumbi_demente': 'Zumbi',
    
    // Bosses
    'lexicografo': 'Lexicografo',
    'malak': 'Malak',
    'malaksilenciador': 'Malak',
    'malak_silenciador': 'Malak',
    'centauro': 'Centauro',
    'centauroquestionador': 'Centauro',
    'centauro_questionador': 'Centauro',
    'goblin': 'Goblin',
    'goblinestudado': 'Goblin',
    'goblin_estudado': 'Goblin',
  };

  const mappedType = nameMapping[normalizedName];
  
  if (mappedType) {
    // Verifica se é boss ou minion
    const isBoss = ['Lexicografo', 'Malak', 'Centauro', 'Goblin'].includes(mappedType);
    return getEnemyImage(mappedType, isBoss);
  }

  // Fallback
  return MINION_IMAGES.Diabrete;
};