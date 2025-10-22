import { useState } from 'react';
import NewGame from '../newGame/NewGame';
import LoadGame from '../loadGame/LoadGame';
import Settings from '../settings/Settings';
import * as S from './Menu.styles'; 

import type { DisplaySlot, SaveData } from '../../../types/Save';

interface MainMenuProps {
  onStartNewGame: (difficulty: 'facil' | 'medio' | 'dificil', withTutorial: boolean) => void;
  onGoToSettings: () => void;
  onLogout: () => void;
  slots: DisplaySlot[];
  isLoadingSaves: boolean;
  errorSaves: string | null;
  onFetchSaves: () => void;
  onLoadGame: (saveData: SaveData | null) => void;
}

type ActiveMenu = 'newGame' | 'loadGame' | 'settings';

export default function MainMenu({ 
  onStartNewGame, 
  onLogout,
  slots,
  isLoadingSaves,
  errorSaves,
  onFetchSaves,
  onLoadGame
}: MainMenuProps) {

  const [activeMenu, setActiveMenu] = useState<ActiveMenu>('newGame');
  
  // Mapeamento de menus para melhor manutenibilidade
  const menuItems = [
    { key: 'newGame' as const, label: 'Novo Jogo', icon: '⚔️' },
    { key: 'loadGame' as const, label: 'Carregar Jogo', icon: '💾' },
    { key: 'settings' as const, label: 'Configurações', icon: '⚙️' },
  ];
  
  const renderContent = () => {
    switch (activeMenu) {
      case 'newGame':
        return <NewGame onStartNewGame={onStartNewGame} />;
      case 'loadGame':
        return (
          <LoadGame
            slots={slots} 
            isLoading={isLoadingSaves} 
            error={errorSaves}
            fetchSaves={onFetchSaves}
            onLoadGame={onLoadGame}
          />
        );
      case 'settings':
        return <Settings />;
      default:
        return <NewGame onStartNewGame={onStartNewGame} />;
    }
  };
  
  return (
    <S.Container>
      <S.MainContentWrapper>
        <S.MenuSidebar>
          <S.GameTitleWrapper>
            <S.GameTitle>RPG Educativo</S.GameTitle>
          </S.GameTitleWrapper>

          <S.SidebarList>
            {menuItems.map(({ key, label, icon }) => (
              <S.SidebarItem 
                key={key}
                $isActive={activeMenu === key} 
                onClick={() => setActiveMenu(key)}
              >
                <span>{icon}</span>
                {label}
              </S.SidebarItem>
            ))}

            <S.SidebarItem onClick={onLogout}>
              <span>🚪</span>
              Sair do Jogo
            </S.SidebarItem>
          </S.SidebarList>
        </S.MenuSidebar>

        <S.MenuContentArea>
          {renderContent()}
        </S.MenuContentArea>
      </S.MainContentWrapper>
    </S.Container>
  );
}