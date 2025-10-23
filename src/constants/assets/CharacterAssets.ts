// Imports diretos
import tankImage from '../../assets/Images/characters/Tank.jpg';
import mageImage from '../../assets/Images/characters/Mage.jpg';
import fighterImage from '../../assets/Images/characters/Fighter.jpg';
import rogueImage from '../../assets/Images/characters/Rogue.jpg';
import paladinImage from '../../assets/Images/characters/Paladin.jpg';
import bardImage from '../../assets/Images/characters/Bard.jpg';
import defaultImage from '../../assets/Images/characters/Default.jpg';

// Definir tipos para as imagens
export type CharacterImage = 
  | 'Tank' 
  | 'Mage'
  | 'Fighter'
  | 'Rogue'
  | 'Paladin'
  | 'Bard'
  | 'default';

// Mapas tipados para as imagens 
export const CHARACTER_IMAGES: Record<CharacterImage, string> = {
  Tank: tankImage,
  Mage: mageImage,
  Fighter: fighterImage,
  Rogue: rogueImage,
  Paladin: paladinImage,
  Bard: bardImage,
  default: defaultImage,
} as const;

// Helper functions
export const getCharacterImage = (character: CharacterImage): string => {
  return CHARACTER_IMAGES[character];
};

// Função para converter nome da classe para tipo de imagem
export const classNameToImageType = (className: string): CharacterImage => {
  const classMapping: Record<string, CharacterImage> = {
    'Tank': 'Tank',
    'tank': 'Tank',
    'TANK': 'Tank',

    'Mage': 'Mage',
    'mage': 'Mage',
    'MAGE': 'Mage',
    'Mago': 'Mage',
    'mago': 'Mage',
    'MAGO': 'Mage',

    'Fighter': 'Fighter',
    'fighter': 'Fighter',
    'FIGHTER': 'Fighter',
    'Lutador': 'Fighter',
    'lutador': 'Fighter',
    'LUTADOR': 'Fighter',

    'Rogue': 'Rogue',
    'rogue': 'Rogue',
    'ROGUE': 'Rogue',
    'Ladino': 'Rogue',
    'ladino': 'Rogue',
    'LADINO': 'Rogue',

    'Paladin': 'Paladin',
    'paladin': 'Paladin',
    'PALADIN': 'Paladin',
    'Paladino': 'Paladin',
    'paladino': 'Paladin',
    'PALADINO': 'Paladin',

    'Bard': 'Bard',
    'bard': 'Bard',
    'BARD': 'Bard',
    'Bardo': 'Bard',
    'bardo': 'Bard',
    'BARDO': 'Bard',

  };
  
  if (className in classMapping) {
    return classMapping[className];
  }
  
  return 'default';
};

// Lista de todas as imagens para preloading
export const ALL_CHARACTER_IMAGES = Object.values(CHARACTER_IMAGES);