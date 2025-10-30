import React from 'react';
import { AbilityIconsContainer, ActionIconButton } from './ActionButtons.styles';


interface CombatActionButtonsProps {
  onOpenQuiz: () => void;
  onCombatAction: (actionName: 'attack' | 'defend' | 'skill' ) => void;
}


const CombatActionButtons: React.FC<CombatActionButtonsProps> = ({ 
  onOpenQuiz, 
  onCombatAction 
}) => {
  return (
      <AbilityIconsContainer>
      
      <ActionIconButton 
        $action="quiz-icon" 
        title="Quiz: Responda a pergunta para restaurar energia." 
        onClick={onOpenQuiz} />

      <ActionIconButton 
      $action="attack" 
      title="Ataque: Causa dano ao inimigo." 
      onClick={() => onCombatAction('attack')} />

      <ActionIconButton 
      $action="defend" 
      title="Defesa: Reduz o dano recebido." 
      onClick={() => onCombatAction('defend')} />

      <ActionIconButton
       $action="skill" 
       title="Habilidade: Usa uma habilidade especial." 
       onClick={() => onCombatAction('skill')} />
      
    
    </AbilityIconsContainer>
  );
};

export default CombatActionButtons;