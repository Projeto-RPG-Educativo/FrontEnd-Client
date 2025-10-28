import espadaIcon from '../../../assets/Images/icons/espada.png';
import escudoIcon from '../../../assets/Images/icons/escudo.png';
import habilidadeIcon from '../../../assets/Images/icons/habilidade.png';
import itemIcon from '../../../assets/Images/icons/item.png';
import fugaIcon from '../../../assets/Images/icons/fuga.png';
import perguntaIcon from '../../../assets/Images/icons/pergunta.png';


export type BattleAssetIcon =
  | 'espada'
  | 'escudo'
  | 'habilidade'
  | 'item'
  | 'fuga'
  | 'pergunta';

export const BATTLE_ASSET_ICONS: Record<BattleAssetIcon, string> = {
  espada: espadaIcon,
  escudo: escudoIcon,
  habilidade: habilidadeIcon,
  item: itemIcon,
  fuga: fugaIcon,
  pergunta: perguntaIcon,
};

export const getBattleAssetIcon = (icon: BattleAssetIcon): string => {
  return BATTLE_ASSET_ICONS[icon];
}

export const ALL_BATTLE_ASSET_ICONS = Object.values(BATTLE_ASSET_ICONS);

export const getIconByAction = (action: string) => {
  switch (action) {
    case 'attack': return espadaIcon;
    case 'defend': return escudoIcon;
    case 'skill': return habilidadeIcon;
    case 'quiz-icon': return perguntaIcon;
      default: return '';
    }
  }