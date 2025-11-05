import React, { useEffect } from 'react';
import { type Player, type Monster } from '../../types'; 
import { useGame } from '../../contexts/GameContext';
import * as S from './BattleScreen.styles';
import {
  PlayerHUD,
  EnemyHUD,
  CombatActionButtons,
  VictoryModal,
  BattleLog,
} from './components';
import { useBattleScreen } from '../../hooks';
import QuizScreen from '../quiz/QuizScreen';

// ✅ Interface de props completa e correta
interface BattleScreenProps {
  player: Player;
  monster: Monster;
  gameMessage: string | null;
  onGoToMenu: () => void;
  onPauseGame: () => void;
  onOpenQuiz: () => void;
  onCombatAction: (actionName: 'attack' | 'defend' | 'useskill' ) => void;
}

// ✅ Componente principal BattleScreen
const BattleScreen: React.FC<BattleScreenProps> = ({
  gameMessage,
  onCombatAction,
  
}) => {
  const { enemy, player } = useGame();
  const { 
    openQuiz, 
    battleState, 
    checkAndExecuteMonsterTurn,
    showVictoryModal,
    handleContinueBattle,
    handleReturnToHub,
    battleLogs,
    showBattleLog,
    toggleBattleLog,
    showQuiz,
    currentQuestion,
    answerQuestion,
    closeQuiz,
  } = useBattleScreen();

  useEffect(() => {
    if (battleState?.waitingForMonsterTurn) {
      console.log('🔄 [BattleScreen] Turno do monstro pendente, executando...');
      const timer = setTimeout(() => {
        checkAndExecuteMonsterTurn();
      }, 1500);
      
      return () => clearTimeout(timer);
    }
  }, [battleState?.waitingForMonsterTurn, checkAndExecuteMonsterTurn]);

  return (
    <S.BattleScreenContainer>
      <S.BattleMainArea>
        <S.BattleHeader>
          {enemy && <EnemyHUD monster={enemy} battleState={battleState} />}
        </S.BattleHeader>

        <S.BattleCenter>
          {gameMessage && (
            <S.GameMessage>{gameMessage}</S.GameMessage>
          )}

          {battleState && (
            <S.TurnIndicator 
              $isPlayerTurn={battleState.isPlayerTurn}
              onClick={toggleBattleLog}
              title="Clique para ver/ocultar o log de batalha"
            >
              {battleState.isPlayerTurn ? '⚔️ SEU TURNO' : '🛡️ TURNO DO MONSTRO'}
            </S.TurnIndicator>
          )}

          {/* {enemy && player ? (
            <CharacterSprites 
              player={player} 
              enemy={enemy}
            />
          ) : null} */}

        </S.BattleCenter>

        <S.BattleActionBar>
          {player && <PlayerHUD player={player} battleState={battleState} />}

          <CombatActionButtons 
            onOpenQuiz={openQuiz}
            onCombatAction={onCombatAction}
            battleState={battleState}
            playerEnergy={player?.stamina || 0}
          />
        </S.BattleActionBar>

        {showVictoryModal && (
          <VictoryModal
            onContinue={handleContinueBattle}
            onReturnToHub={handleReturnToHub}
          />
        )}

        {showQuiz && currentQuestion && (
          <QuizScreen
            currentQuestion={currentQuestion}
            gameMessage={null}
            onAnswer={answerQuestion}
            onCloseQuiz={closeQuiz}
            playerEnergy={player?.stamina}
            playerMaxEnergy={player?.maxStamina}
          />
        )}
      </S.BattleMainArea>

      <S.BattleLogArea $isVisible={showBattleLog}>
        <BattleLog logs={battleLogs} />
      </S.BattleLogArea>

      {/* Tutorial agora é gerenciado pelo TutorialCutscene no App.tsx */}
    </S.BattleScreenContainer>
  );
};

export default BattleScreen;