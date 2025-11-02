import React from 'react';
import { type Monster, type BattleStateResponse } from '../../../../../types';
import { 
  EnemyHudStats, 
  EnemyHudBarContainer, 
  EnemyHudBar, 
  EnemyHudHpText, 
  EnemyHudName,
  EnemyHudContainer,
  EnemyHud,
} from './Enemy.styles';

interface EnemyHUDProps {
  monster: Monster;
  battleState?: BattleStateResponse | null;
}

const EnemyHUD: React.FC<EnemyHUDProps> = ({ monster, battleState }) => {
  const monsterHpPercentage = (monster.hp / monster.maxHp) * 100;
  const nomeMonstro = monster.name || "????";
  
  const activeEffects = battleState?.monsterActiveEffects || [];
  const guaranteedAttacks = battleState?.monsterGuaranteedAttacks || 0;
  const isDefending = monster.isDefending || false;

  return (
    <EnemyHudContainer>
      <EnemyHud $isDefending={isDefending}>
        <EnemyHudStats>

          <EnemyHudBarContainer>
            <EnemyHudBar width={`${monsterHpPercentage}%`} />
            <EnemyHudHpText>{monster.hp} / {monster.maxHp}</EnemyHudHpText>
          </EnemyHudBarContainer>

          <EnemyHudName>{nomeMonstro}</EnemyHudName>
          
          {isDefending && (
            <div style={{ 
              color: '#4CAF50', 
              fontSize: '12px', 
              fontWeight: 'bold',
              textAlign: 'center',
              marginTop: '5px',
            }}>
              🛡️ DEFENDENDO
            </div>
          )}

          {guaranteedAttacks > 0 && (
            <div style={{ 
              color: '#FF5722', 
              fontSize: '12px', 
              fontWeight: 'bold',
              textAlign: 'center',
              marginTop: '5px',
            }}>
              ⚔️ {guaranteedAttacks} Ataques Garantidos
            </div>
          )}

          {activeEffects.length > 0 && (
            <div style={{ 
              display: 'flex', 
              gap: '4px', 
              marginTop: '5px', 
              flexWrap: 'wrap',
              justifyContent: 'center',
            }}>
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
          
        </EnemyHudStats>
      </EnemyHud>
    </EnemyHudContainer>

  );
};

function getEffectIcon(type: string): string {
  const icons: Record<string, string> = {
    DAMAGE_BUFF: '💪',
    DAMAGE_REDUCTION: '🛡️',
  };
  return icons[type] || '❓';
}

function getEffectColor(type: string): string {
  const colors: Record<string, string> = {
    DAMAGE_BUFF: '#F44336',
    DAMAGE_REDUCTION: '#2196F3',
  };
  return colors[type] || '#757575';
}

export default EnemyHUD;