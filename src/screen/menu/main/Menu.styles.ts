import styled, { css } from 'styled-components';

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #2a2a2a;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'Press Start 2P', cursive;
  color: #fff;
  padding: 20px;
  box-sizing: border-box;
`;

export const MainContentWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  max-width: 1200px;
  max-height: 800px;
  background-color: #3e3e3e;
  border: 4px solid #5d4037;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
`;

export const MenuSidebar = styled.div`
  width: 250px;
  border-right: 4px solid #5d4037;
  padding: 20px;
  display: flex;
  flex-direction: column;
`;

export const GameTitleWrapper = styled.div`
    padding-bottom: 40px;
    margin-bottom: 20px;
    border-bottom: 2px solid #5d4037;
    text-align: center;
`;

export const GameTitle = styled.h1`
  font-size: 24px;
  color: #ffcc00;
  text-shadow: 2px 2px #000;
  margin: 0;
`;

export const SidebarList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  width: 100%;
`;

export const SidebarItem = styled.li<{ $isActive?: boolean }>`
  padding: 15px 20px;
  font-size: 14px;
  cursor: pointer;
  text-transform: uppercase;
  transition: background-color 0.2s, color 0.2s;
  border-radius: 5px;
  margin-bottom: 10px;
  text-align: center;

  ${props => props.$isActive ?
    css`
      background-color: #4a1f1f;
      color: #ffcc00;
      font-weight: bold;
    ` :
    css`
      background-color: transparent;
      &:hover {
        background-color: rgba(255, 255, 255, 0.1);
      }
    `
  }
`;

export const MenuContentArea = styled.div`
  flex: 1;
  padding: 40px;
  overflow-y: auto;
`;


// LOAD GAME PANEL STYLES

export const SaveDataHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  flex-wrap: wrap;
  gap: 10px;
`;

export const LoadingIndicator = styled.span`
  margin-left: 10px;
  animation: pulse 1.5s infinite;
  
  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }
`;

export const RefreshButton = styled.button`
  background-color: #2c5530;
  border: 2px solid #4caf50;
  color: #fff;
  padding: 8px 16px;
  font-family: 'Press Start 2P', cursive;
  font-size: 10px;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover:not(:disabled) {
    background-color: #4caf50;
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const SaveSlotsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  max-height: 400px;
  overflow-y: auto;
  padding-right: 10px;
`;

export const SaveSlot = styled.button<{ $hasData: boolean }>`
  background-color: ${props => props.$hasData ? '#3a3a3a' : '#2a2a2a'};
  border: 2px solid ${props => props.$hasData ? '#5d4037' : '#404040'};
  border-radius: 8px;
  padding: 15px;
  cursor: ${props => props.$hasData ? 'pointer' : 'default'};
  transition: all 0.2s;
  text-align: left;
  width: 100%;

  &:hover:not(:disabled) {
    ${props => props.$hasData && `
      border-color: #8d6e63;
      transform: translateY(-2px);
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
    `}
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const SlotHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

export const SlotName = styled.span`
  font-family: 'Press Start 2P', cursive;
  font-size: 12px;
  color: #fff;
  font-weight: bold;
`;

export const SlotDate = styled.span`
  font-family: 'Press Start 2P', cursive;
  font-size: 8px;
  color: #b0b0b0;
`;

export const SlotDetails = styled.div`
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
`;

export const SlotProgress = styled.div`
  font-family: 'Press Start 2P', cursive;
  font-size: 10px;
  color: #4caf50;
  display: flex;
  align-items: center;
  gap: 5px;
`;

export const SlotLevel = styled.div`
  font-family: 'Press Start 2P', cursive;
  font-size: 10px;
  color: #ffc107;
  display: flex;
  align-items: center;
  gap: 5px;
`;

export const SlotLocation = styled.div`
  font-family: 'Press Start 2P', cursive;
  font-size: 10px;
  color: #2196f3;
  display: flex;
  align-items: center;
  gap: 5px;
`;

export const EmptySlot = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 20px;
  opacity: 0.6;
`;

export const EmptySlotIcon = styled.span`
  font-size: 24px;
  opacity: 0.5;
`;

export const EmptySlotText = styled.span`
  font-family: 'Press Start 2P', cursive;
  font-size: 10px;
  color: #888;
`;

export const EmptyStateContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  text-align: center;
`;

export const EmptyStateIcon = styled.span`
  font-size: 48px;
  margin-bottom: 20px;
  opacity: 0.6;
`;

export const EmptyStateText = styled.h3`
  font-family: 'Press Start 2P', cursive;
  font-size: 14px;
  color: #fff;
  margin: 0 0 10px 0;
`;

export const EmptyStateSubtext = styled.p`
  font-family: 'Press Start 2P', cursive;
  font-size: 10px;
  color: #b0b0b0;
  margin: 0;
  line-height: 1.4;
`;

export const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px;
  gap: 15px;
`;

export const LoadingSpinner = styled.span`
  font-size: 32px;
  animation: spin 2s linear infinite;
  
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
`;

export const LoadingText = styled.span`
  font-family: 'Press Start 2P', cursive;
  font-size: 12px;
  color: #b0b0b0;
`;

// SETTINGS PANEL STYLES

export const HorizontalTabsMenu = styled.div`
  display: flex;
  gap: 5px;
  margin-bottom: 25px;
  border-bottom: 2px solid #5d4037;
  padding-bottom: 10px;
`;

export const TabItem = styled.button<{ $isActive: boolean }>`
  background-color: ${props => props.$isActive ? '#5d4037' : '#3a3a3a'};
  border: 2px solid ${props => props.$isActive ? '#8d6e63' : '#5d4037'};
  color: #fff;
  padding: 10px 15px;
  font-family: 'Press Start 2P', cursive;
  font-size: 10px;
  border-radius: 5px 5px 0 0;
  cursor: pointer;
  transition: all 0.2s;
  position: relative;
  
  ${props => props.$isActive && `
    transform: translateY(-2px);
    border-bottom-color: transparent;
  `}

  &:hover:not(:disabled) {
    background-color: ${props => props.$isActive ? '#5d4037' : '#4a4a4a'};
  }
`;

export const SettingsContentArea = styled.div`
  min-height: 300px;
  width: 100%;
`;

export const SettingsContentSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const SettingOption = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 15px;
  background-color: #3a3a3a;
  border: 2px solid #5d4037;
  border-radius: 8px;
  transition: border-color 0.2s;

  &:hover {
    border-color: #8d6e63;
  }
`;

export const SettingLabel = styled.label`
  font-family: 'Press Start 2P', cursive;
  font-size: 11px;
  color: #fff;
  margin-bottom: 5px;
  display: block;
`;

export const VolumeSlider = styled.input`
  width: 100%;
  height: 6px;
  border-radius: 5px;
  background: #2a2a2a;
  outline: none;
  cursor: pointer;
  
  &::-webkit-slider-thumb {
    appearance: none;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: #5d4037;
    cursor: pointer;
    border: 2px solid #8d6e63;
    transition: all 0.2s;
    
    &:hover {
      background: #8d6e63;
      transform: scale(1.1);
    }
  }
  
  &::-moz-range-thumb {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: #5d4037;
    cursor: pointer;
    border: 2px solid #8d6e63;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const ToggleButton = styled.button<{ $isActive: boolean }>`
  background-color: ${props => props.$isActive ? '#2e7d32' : '#d32f2f'};
  border: 2px solid ${props => props.$isActive ? '#4caf50' : '#f44336'};
  color: #fff;
  padding: 10px 15px;
  font-family: 'Press Start 2P', cursive;
  font-size: 10px;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.2s;
  width: fit-content;

  &:hover {
    background-color: ${props => props.$isActive ? '#4caf50' : '#f44336'};
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }
`;

export const SettingsButton = styled.button`
  background-color: #3a3a3a;
  border: 2px solid #5d4037;
  color: #fff;
  padding: 10px 15px;
  font-family: 'Press Start 2P', cursive;
  font-size: 10px;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.2s;
  width: fit-content;

  &:hover {
    background-color: #5d4037;
    border-color: #8d6e63;
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }
`;

export const QualityButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
`;

export const QualityButton = styled.button<{ $isActive: boolean }>`
  background-color: ${props => props.$isActive ? '#5d4037' : '#3a3a3a'};
  border: 2px solid ${props => props.$isActive ? '#8d6e63' : '#5d4037'};
  color: #fff;
  padding: 8px 12px;
  font-family: 'Press Start 2P', cursive;
  font-size: 9px;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background-color: ${props => props.$isActive ? '#5d4037' : '#4a4a4a'};
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }
`;

export const PanelContainer = styled.div`
  background-color: #2a2a2a;
  border: 2px solid #5d4037;
  border-radius: 8px;
  padding: 15px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
`;

export const ContentTitle = styled.h2`
  font-family: 'Press Start 2P', cursive;
  font-size: 18px;
  color: #fff;
  margin-bottom: 10px;
`;