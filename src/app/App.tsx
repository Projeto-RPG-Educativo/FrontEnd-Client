import React, { useContext } from 'react';

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
import { Auth, MainMenu, ClassSelection, ZoneRouter } from '../screen/index';

// hooks 
import { MenuLogic, SaveLogic, HubLogic, NavigationLogic } from '../hooks/index'

const App: React.FC = () => {
  const { isLoggedIn, logout } = useContext(AuthContext);
  const { gameState: gamestate, setGameState, setDifficulty, hubState, setHubState, player } = useGame();
  const { handleStartNewGame, toggleSettings } = MenuLogic({ setGameState, setDifficulty });
  const { slots, isLoading, error, fetchSaves, handleLoadGame } = SaveLogic({ setPlayer: () => { }, setGameState });
  const {  goToHubCentral, goToHubZone } = HubLogic();
  if (!isLoggedIn) {
    return <Auth />;
  }

  const renderGameContent = () => {
    switch (gamestate) {
      case 'MENU':
        return <MainMenu
          onStartNewGame={handleStartNewGame}
          onGoToSettings={toggleSettings}
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
        onRest={() => {}}
        onBuyItem={() => {}}
        onStartQuizBattle={() => {}}
        onBack={goToHubCentral}
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