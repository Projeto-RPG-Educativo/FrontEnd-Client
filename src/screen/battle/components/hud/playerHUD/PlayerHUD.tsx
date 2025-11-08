import React from 'react';
import { type Player, type BattleStateResponse } from '../../../../../types';
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
  battleState?: BattleStateResponse | null;
}

const PlayerHUD: React.FC<PlayerHUDProps> = ({ player, battleState }) => {

  const playerClassImage = getCharacterImage(classNameToImageType(player.className as CharacterImage) ?? 'Mage');
  const staminaMaxima = player.maxStamina;
  const playerHpPercentage = (player.hp / player.maxHp) * 100;
  const playerStaminaPercentage = (player.stamina / staminaMaxima) * 100;
  
  const activeEffects = battleState?.characterActiveEffects || [];
  
  return (
    <PlayerHudPanel>

      <PlayerPortrait 
        style={{ backgroundImage: `url(${playerClassImage})` }}
        $isDefending={player.isDefending}
      />
      
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

        {activeEffects.length > 0 && (
          <div style={{ display: 'flex', gap: '4px', marginTop: '5px', flexWrap: 'wrap' }}>
            {activeEffects.map((effect, index) => (
              <span
                key={index}
                title={effect.description}
                style={{
                  backgroundColor: getEffectColor(effect.type),
                  color: '#fff',
                  fontSize: '10px',
                  padding: '2px 6px',
                  borderRadius: '4px',
                  fontWeight: 'bold',
                }}
              >
                {getEffectIcon(effect.type)} {effect.duration}
              </span>
            ))}
          </div>
        )}

      </PlayerStats>
    </PlayerHudPanel>
  );
};

function getEffectIcon(type: string): string {
  const icons: Record<string, string> = {
    STUN: '😵',
    DISABLE_SKILL: '🚫',
    BLOCK_ENERGY_RECOVERY: '⚡',
    CORRUPTION: '☠️',
    SCRAMBLE_QUESTION: '🌀',
    EXTRA_QUESTION: '⏱️',
    HIDE_QUESTION: '👁️',
  };
  return icons[type] || '❓';
}

function getEffectColor(type: string): string {
  const colors: Record<string, string> = {
    STUN: '#9C27B0',
    DISABLE_SKILL: '#F44336',
    BLOCK_ENERGY_RECOVERY: '#FF9800',
    CORRUPTION: '#4A148C',
    SCRAMBLE_QUESTION: '#2196F3',
    EXTRA_QUESTION: '#00BCD4',
    HIDE_QUESTION: '#607D8B',
  };
  return colors[type] || '#757575';
}

export default PlayerHUD;