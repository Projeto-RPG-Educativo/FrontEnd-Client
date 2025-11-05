import React, { useMemo } from 'react';
import { AbilityIconsContainer, ActionIconButton } from './ActionButtons.styles';
import { useTutorial } from '../../../../contexts';
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
  const { 
    isBattleTutorialActive, 
    isActionAllowed, 
    currentBattleStepConfig,
    registerPlayerAction
  } = useTutorial();
  
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
  const canAttack = canAct && playerEnergy >= ENERGY_COSTS.attack && isActionAllowed('ATTACK');
  const canDefend = canAct && playerEnergy >= ENERGY_COSTS.defend && isActionAllowed('DEFEND');
  const canUseSkill = canAct && playerEnergy >= ENERGY_COSTS.useskill && !isSkillDisabled && isActionAllowed('SKILLS');
  const canQuiz = canAct && isActionAllowed('QUIZ');

  // Handler para ações que avança o tutorial quando necessário
  const handleAction = (actionName: 'attack' | 'defend' | 'useskill', actionType: 'ATTACK' | 'DEFEND' | 'SKILLS') => {
    onCombatAction(actionName);
    
    // Registra ação no tutorial e ele decide se avança automaticamente
    if (isBattleTutorialActive) {
      console.log(`✅ [Tutorial] Ação ${actionType} executada`);
      registerPlayerAction(actionType);
    }
  };

  // Handler específico para Quiz
  const handleQuiz = () => {
    onOpenQuiz();
    
    // Registra ação no tutorial
    if (isBattleTutorialActive) {
      console.log(`✅ [Tutorial] Quiz aberto`);
      registerPlayerAction('QUIZ');
    }
  };

  return (
    <AbilityIconsContainer>
      
      <ActionIconButton 
        $action="quiz-icon"
        id="quiz-button"
        title={
          isBattleTutorialActive && !isActionAllowed('QUIZ')
            ? "⚠️ Aguarde a instrução do tutorial!"
            : !canAct 
            ? "Aguarde seu turno!" 
            : "Quiz: Responda a pergunta para restaurar energia."
        }
        onClick={handleQuiz}
        disabled={!canQuiz}
        $isHighlighted={isBattleTutorialActive && currentBattleStepConfig?.highlight === 'quiz-button'}
      />

      <ActionIconButton 
        $action="attack"
        id="attack-button"
        title={
          isBattleTutorialActive && !isActionAllowed('ATTACK')
            ? "⚠️ Aguarde a instrução do tutorial!"
            : !canAct 
            ? "Aguarde seu turno!" 
            : !canAttack 
            ? `Energia insuficiente! (${ENERGY_COSTS.attack} necessário)` 
            : "Ataque: Causa dano ao inimigo."
        }
        onClick={() => handleAction('attack', 'ATTACK')}
        disabled={!canAttack}
        $isHighlighted={isBattleTutorialActive && currentBattleStepConfig?.highlight === 'attack-button'}
      />

      <ActionIconButton 
        $action="defend"
        id="defend-button"
        title={
          isBattleTutorialActive && !isActionAllowed('DEFEND')
            ? "⚠️ Aguarde a instrução do tutorial!"
            : !canAct 
            ? "Aguarde seu turno!" 
            : !canDefend 
            ? `Energia insuficiente! (${ENERGY_COSTS.defend} necessário)` 
            : "Defesa: Reduz o dano recebido."
        }
        onClick={() => handleAction('defend', 'DEFEND')}
        disabled={!canDefend}
        $isHighlighted={isBattleTutorialActive && currentBattleStepConfig?.highlight === 'defend-button'}
      />

      <ActionIconButton
        $action="skill"
        id="skills-button"
        title={
          isBattleTutorialActive && !isActionAllowed('SKILLS')
            ? "⚠️ Aguarde a instrução do tutorial!"
            : !canAct 
            ? "Aguarde seu turno!" 
            : isSkillDisabled
            ? "Habilidades bloqueadas pelo monstro!"
            : !canUseSkill 
            ? `Energia insuficiente! (${ENERGY_COSTS.useskill} necessário)` 
            : "Habilidade: Usa uma habilidade especial."
        }
        onClick={() => handleAction('useskill', 'SKILLS')}
        disabled={!canUseSkill}
        $isHighlighted={isBattleTutorialActive && currentBattleStepConfig?.highlight === 'skills-button'}
      />
      
    </AbilityIconsContainer>
  );
};

export default CombatActionButtons;