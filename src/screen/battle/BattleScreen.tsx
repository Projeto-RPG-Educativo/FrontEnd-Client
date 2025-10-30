import React from 'react';
import { type Player, type Monster } from '../../types'; 
import { useGame } from '../../contexts/GameContext';
import * as S from './BattleScreen.styles';
import {
  PlayerHUD,
  EnemyHUD,
  CombatActionButtons,
  CharacterSprites,
} from './components';
import { useBattleScreen } from '../../hooks';

// ✅ Interface de props completa e correta
interface BattleScreenProps {
  player: Player;
  monster: Monster;
  gameMessage: string | null;
  onGoToMenu: () => void;
  onPauseGame: () => void;
  onOpenQuiz: () => void;
  onCombatAction: (actionName: 'attack' | 'defend' | 'skill' ) => void;
}

// ✅ Componente principal BattleScreen
const BattleScreen: React.FC<BattleScreenProps> = ({
  gameMessage,
  onCombatAction,
  
}) => {
  const { enemy, player } = useGame();
  const { openQuiz } = useBattleScreen();

  return (
    <S.BattleScreenContainer>
      
      <S.BattleHeader>
        {enemy && <EnemyHUD monster={enemy} />}
      </S.BattleHeader>

      {/* Centro da batalha - Mensagens e Sprites */}
      <S.BattleCenter>
        {gameMessage && (
          <S.GameMessage>{gameMessage}</S.GameMessage>
        )}

        {/* {enemy && player ? (
          <CharacterSprites 
            player={player} 
            enemy={enemy}
          />
        ) : null} */}

      </S.BattleCenter>

      {/* Barra de ação - HUD do Jogador + Botões */}
      <S.BattleActionBar>
        {player && <PlayerHUD player={player} />}

        <CombatActionButtons 
          onOpenQuiz={openQuiz}
          onCombatAction={onCombatAction}
        />
      </S.BattleActionBar>
    </S.BattleScreenContainer>
  );
};

export default BattleScreen;