import React, { useMemo } from 'react';
import { AbilityIconsContainer, ActionIconButton } from './ActionButtons.styles';
import type { BattleStateResponse } from '../../../../types';

interface CombatActionButtonsProps {
  onOpenQuiz: () => void;
  onCombatAction: (actionName: 'attack' | 'defend' | 'useskill' ) => void;
  battleState: BattleStateResponse | null;
  playerEnergy: number;
}

const ENERGY_COSTS = {
  attack: 2,
  defend: 1,
  useskill: 3,
} as const;

const CombatActionButtons: React.FC<CombatActionButtonsProps> = ({ 
  onOpenQuiz, 
  onCombatAction,
  battleState,
  playerEnergy,
}) => {
  
  const isStunned = useMemo(() => {
    return battleState?.characterActiveEffects?.some(
      effect => effect.type === 'STUN'
    ) || false;
  }, [battleState?.characterActiveEffects]);

  const isSkillDisabled = useMemo(() => {
    return battleState?.characterActiveEffects?.some(
      effect => effect.type === 'DISABLE_SKILL'
    ) || false;
  }, [battleState?.characterActiveEffects]);

  const canAct = battleState?.isPlayerTurn && !isStunned;
  const canAttack = canAct && playerEnergy >= ENERGY_COSTS.attack;
  const canDefend = canAct && playerEnergy >= ENERGY_COSTS.defend;
  const canUseSkill = canAct && playerEnergy >= ENERGY_COSTS.useskill && !isSkillDisabled;

  return (
    <AbilityIconsContainer>
      
      <ActionIconButton 
        $action="quiz-icon" 
        title={
          !canAct 
            ? "Aguarde seu turno!" 
            : "Quiz: Responda a pergunta para restaurar energia."
        }
        onClick={onOpenQuiz}
        disabled={!canAct}
      />

      <ActionIconButton 
        $action="attack" 
        title={
          !canAct 
            ? "Aguarde seu turno!" 
            : !canAttack 
            ? `Energia insuficiente! (${ENERGY_COSTS.attack} necessário)` 
            : "Ataque: Causa dano ao inimigo."
        }
        onClick={() => onCombatAction('attack')}
        disabled={!canAttack}
      />

      <ActionIconButton 
        $action="defend" 
        title={
          !canAct 
            ? "Aguarde seu turno!" 
            : !canDefend 
            ? `Energia insuficiente! (${ENERGY_COSTS.defend} necessário)` 
            : "Defesa: Reduz o dano recebido."
        }
        onClick={() => onCombatAction('defend')}
        disabled={!canDefend}
      />

      <ActionIconButton
        $action="skill" 
        title={
          !canAct 
            ? "Aguarde seu turno!" 
            : isSkillDisabled
            ? "Habilidades bloqueadas pelo monstro!"
            : !canUseSkill 
            ? `Energia insuficiente! (${ENERGY_COSTS.useskill} necessário)` 
            : "Habilidade: Usa uma habilidade especial."
        }
        onClick={() => onCombatAction('useskill')}
        disabled={!canUseSkill}
      />
      
    </AbilityIconsContainer>
  );
};

export default CombatActionButtons;