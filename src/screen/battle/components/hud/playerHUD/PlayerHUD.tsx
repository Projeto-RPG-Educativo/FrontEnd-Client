import React from 'react';
import { type Player } from '../../../../../types';
import { getCharacterImage, classNameToImageType, type CharacterImage } from '../../../../../constants/assets/CharacterAssets';
import {
  PlayerHudPanel,
  PlayerPortrait,
  PlayerStats,
  PlayerStatsName,
  PlayerStatsText,
  PlayerStatsBarContainer,
  HpBar,
  StaminaBar
} from './Player.styles';

interface PlayerHUDProps {
  player: Player;
}

const PlayerHUD: React.FC<PlayerHUDProps> = ({ player }) => {

  const playerClassImage = getCharacterImage(classNameToImageType(player.className as CharacterImage) ?? 'Mage');
  const staminaMaxima = player.maxStamina;
  const playerHpPercentage = (player.hp / player.maxHp) * 100;
  const playerStaminaPercentage = (player.stamina / staminaMaxima) * 100;
  return (
    <PlayerHudPanel>

      <PlayerPortrait style={{ backgroundImage: `url(${playerClassImage})` }} />
      
      <PlayerStats>

        <PlayerStatsName> {player.nome} </PlayerStatsName>
        <PlayerStatsText>HP: {player.hp} / {player.maxHp} </PlayerStatsText>

        <PlayerStatsBarContainer>
          <HpBar width={`${playerHpPercentage}%`} />
        </PlayerStatsBarContainer>

        <PlayerStatsText>Energia: {player.stamina} / {staminaMaxima}</PlayerStatsText>

        <PlayerStatsBarContainer>
          <StaminaBar width={`${playerStaminaPercentage}%`} />
        </PlayerStatsBarContainer>

      </PlayerStats>
    </PlayerHudPanel>
  );
};

export default PlayerHUD;