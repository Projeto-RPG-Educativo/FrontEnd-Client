import React from 'react';
import { type Monster } from '../../../../../types';
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
}

const EnemyHUD: React.FC<EnemyHUDProps> = ({ monster }) => {
  const monsterHpPercentage = (monster.hp / monster.maxHp) * 100;
  const nomeMonstro = monster.name || "????";

  return (
    <EnemyHudContainer>
      <EnemyHud>
        <EnemyHudStats>

          <EnemyHudBarContainer>
            <EnemyHudBar width={`${monsterHpPercentage}%`} />
            <EnemyHudHpText>{monster.hp} / { monster.maxHp }</EnemyHudHpText>
          </EnemyHudBarContainer>

          <EnemyHudName>{nomeMonstro}</EnemyHudName>
          
        </EnemyHudStats>
      </EnemyHud>
    </EnemyHudContainer>

  );
};
export default EnemyHUD;