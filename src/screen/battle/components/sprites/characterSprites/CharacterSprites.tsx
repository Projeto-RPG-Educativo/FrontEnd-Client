// src/screens/battle/components/CharacterSprites/CharacterSprites.tsx
import React from 'react';
import { type Player, type Monster} from '../../../../../types';
import { MINION_IMAGES, type MinionImage } from '../../../../../constants/assets/enemy/MinionAssets';
import * as S from './CharacterSprites.styles';

interface CharacterSpritesProps {
  player: Player;
  enemy: Monster;
}

const CharacterSprites: React.FC<CharacterSpritesProps> = ({
  player,
  enemy,
}) => {
  // Lógica para determinar sprite do inimigo baseado no tipo
  const getEnemySprite = () => {
    
    return MINION_IMAGES[ enemy.type as MinionImage ] || MINION_IMAGES.Diabrete; // tem que ter certeza que enemy.type e igual MinionImage depois
  };

  return (
    <S.SpritesContainer>
      {/* <S.PlayerSprite backgroundImage={player.image} /> */}
      <S.EnemySprite backgroundImage={getEnemySprite()} />
    </S.SpritesContainer>
  );
};

export default CharacterSprites;