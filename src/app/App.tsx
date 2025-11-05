import React, { useContext, useEffect } from 'react';

// contexts
import {
  AuthProvider, AuthContext,
  FullscreenProvider, GameProvider, useGame,
  TutorialProvider, useTutorial,
} from '../contexts/index';

// components
import {
  Layout,
  ErrorBoundary,
} from '../components/index';
import { TutorialCutscene } from '../components/tutorial';

// screens
import { Auth, MainMenu, ClassSelection, ZoneRouter, BattleScreen, QuizScreen, Loading } from '../screen/index';

// hooks 
import { SaveLogic, HubLogic, useBattleScreen } from '../hooks/index'

const App: React.FC = () => {
  const { isLoggedIn, logout } = useContext(AuthContext);

  const { gameState: gamestate, setGameState,
    hubState, player, enemy,
    currentQuestion,
    gameMessage,
    tutorial,
  } = useGame();

  const {
    slots, isLoading, error,
    fetchSaves, handleLoadGame } = SaveLogic({ setPlayer: () => { }, setGameState });

  const { goToHubCentral, goToHubZone } = HubLogic();
  const { executeBattleAction, openQuiz, closeQuiz, answerQuestion, startBattle } = useBattleScreen();

  // Novo sistema de tutorial unificado
  const {
    currentCutscene,
    isOverlay,
    completeCutscene,
    tutorialState,
    startTutorial,
  } = useTutorial();

  useEffect(() => {
    console.log('%c O ESTADO DO JOGO MUDOU PARA:', 'color: lightblue; font-size: 10px;', gamestate);
  }, [gamestate]);

  // Inicia o tutorial automaticamente quando gameState é TUTORIAL e tutorial não foi iniciado
  useEffect(() => {
    if (gamestate === 'TUTORIAL' && tutorialState === 'NOT_STARTED') {
      console.log('🎮 [App] Iniciando tutorial automaticamente');
      startTutorial();
    }
  }, [gamestate, tutorialState, startTutorial]);


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

      case 'LOADING':
        return <Loading 
          onLoadingComplete={() => {
            if (tutorial) {
              setGameState('TUTORIAL');
            } else {
              setGameState('HUB');
            }
          }} 
          tutorialEnabled={tutorial ?? false}
        />;

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
        return (
          <>
            <BattleScreen
              player={player}
              monster={enemy}
              gameMessage={null}
              onGoToMenu={() => setGameState('MENU')}
              onPauseGame={() => setGameState('MENU')}
              onOpenQuiz={openQuiz}
              onCombatAction={(actionName) => executeBattleAction({ action: actionName })}
            />
            {/* Renderiza a cutscene como overlay se necessário */}
            {isOverlay && currentCutscene && (
              <TutorialCutscene
                cutscene={currentCutscene}
                selectedClass={player?.className ?? null}
                onComplete={completeCutscene}
                autoStart={true}
                isOverlay={true}
              />
            )}
          </>
        );
      
      

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
            playerEnergy={player?.stamina}
            playerMaxEnergy={player?.maxStamina}
          />
        );
      
      case 'TUTORIAL':
        if (!currentCutscene) return null;
        
        return (
          <TutorialCutscene
            cutscene={currentCutscene}
            selectedClass={player?.className ?? null}
            onComplete={completeCutscene}
            autoStart={true}
            isOverlay={false}
          />
        );

      default:
        return null;
    }
  };


  return (
    <>
      {renderGameContent()}
    </>
  )
};

const AppWrapper: React.FC = () => {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <FullscreenProvider>
          <GameProvider>
            <TutorialProvider>
              <Layout>
                <App />
              </Layout>
            </TutorialProvider>
          </GameProvider>
        </FullscreenProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
};

export default AppWrapper;