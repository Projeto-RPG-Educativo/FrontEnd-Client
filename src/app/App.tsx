import React, { useContext, useEffect } from 'react';

// contexts
import {
  AuthProvider, AuthContext,
  FullscreenProvider, GameProvider, useGame,
} from '../contexts/index';

// components
import {
  Layout,
  ErrorBoundary,
} from '../components/index';

// screens
import { Auth, MainMenu, ClassSelection, ZoneRouter, BattleScreen, QuizScreen, TutorialOverlay } from '../screen/index';

// hooks 
import { SaveLogic, HubLogic, useBattleScreen, TutorialLogic } from '../hooks/index'

const App: React.FC = () => {
  const { isLoggedIn, logout } = useContext(AuthContext);

  const { gameState: gamestate, setGameState,
    hubState, player, enemy,
    currentQuestion,
    gameMessage,
  } = useGame();

  const {
    slots, isLoading, error,
    fetchSaves, handleLoadGame } = SaveLogic({ setPlayer: () => { }, setGameState });

  const { goToHubCentral, goToHubZone } = HubLogic();
  const { executeBattleAction, openQuiz, closeQuiz, answerQuestion, startBattle } = useBattleScreen();
  const {
    dialogueData,
    currentDialogueIndex,
    characterImages,
    advanceDialogue,
    isTutorialLoading
  } = TutorialLogic({ gamestate, setGameState });

  useEffect(() => {
    console.log('%c O ESTADO DO JOGO MUDOU PARA:', 'color: lightblue; font-size: 10px;', gamestate);
  }, [gamestate]);


  if (!isLoggedIn) {
    return <Auth />;
  }

  const renderGameContent = () => {
    switch (gamestate) {
      case 'MENU':
        return <MainMenu
          onLogout={logout}
          slots={slots}
          isLoadingSaves={isLoading}
          errorSaves={error}
          onFetchSaves={fetchSaves}
          onLoadGame={handleLoadGame}
        />;

      case 'CLASS_SELECTION':
        return <ClassSelection />;

      case 'HUB':
        return (
          <ZoneRouter
            hubState={hubState}
            player={player}
            onGoToCentral={goToHubCentral}
            onGoToZone={goToHubZone}
            onRest={() => { }}
            onBuyItem={() => { }}
            onStartQuizBattle={() => { }}
            onBack={goToHubCentral}
            setGameState={setGameState}
            startBattle={(monsterId, player, difficulty) => {
              if (!player) return Promise.resolve();
              return startBattle(monsterId, difficulty, player.id);  // arrumar depois essa presepada aqui hehe
            }}
          />
        );
      case 'BATTLE':
        if (!player || !enemy) return null;
        return (<BattleScreen
          player={player}
          monster={enemy}
          gameMessage={null}
          onGoToMenu={() => setGameState('MENU')}
          onPauseGame={() => setGameState('MENU')}
          onOpenQuiz={openQuiz}
          onCombatAction={(actionName) => executeBattleAction({ action: actionName })}
        />);


      case 'QUIZ':
        if (!currentQuestion) {
          console.warn('⚠️ Estado QUIZ sem pergunta disponível');
        }
        return (
          <QuizScreen
            currentQuestion={currentQuestion}
            gameMessage={gameMessage}
            onAnswer={answerQuestion}
            onCloseQuiz={closeQuiz}
          />
        );
        
      default:
        return null;
    }
  };

  return (
    <>
      {renderGameContent()}

      {dialogueData && (
        <TutorialOverlay
          dialogueData={dialogueData}
          currentDialogueIndex={currentDialogueIndex}
          onAdvanceDialogue={advanceDialogue}
          characterImages={characterImages}
        />
      )}
    </>
  )
};



const AppWrapper: React.FC = () => {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <FullscreenProvider>
          <GameProvider>
            <Layout>
              <App />
            </Layout>
          </GameProvider>
        </FullscreenProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
};

export default AppWrapper;