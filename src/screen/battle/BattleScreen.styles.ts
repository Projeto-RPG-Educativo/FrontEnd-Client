// src/screens/battle/BattleScreen.styles.ts
import styled from 'styled-components';

// ✅ Container principal da tela de batalha (renomeado para evitar conflito)
export const BattleScreenContainer = styled.div`
  border: 4px solid #5d4037;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  background-color: #2a2a2a;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  gap: 0;
  width: 100%;
  height: 100%;
  position: relative;
  font-family: 'Press Start 2P', cursive;

  background-image: url('/assets/castle2.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

export const BattleMainArea = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
  height: 100%;
`;

export const BattleLogArea = styled.div<{ $isVisible: boolean }>`
  width: ${props => props.$isVisible ? '320px' : '0'};
  height: 100%;
  position: relative;
  background: rgba(0, 0, 0, 0.3);
  border-left: ${props => props.$isVisible ? '3px solid rgba(100, 100, 150, 0.5)' : 'none'};
  overflow: hidden;
  transition: width 0.3s ease-in-out;
  opacity: ${props => props.$isVisible ? 1 : 0};
`;

// Header da batalha
export const BattleHeader = styled.div`
  align-items: flex-start;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  left: 0;
  padding: 10px 20px;
  position: absolute;
  top: 0;
  width: 100%;
  z-index: 9999; /* Acima do overlay do tutorial */
`;

// Área central da batalha
export const BattleCenter = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center; 
  gap: 20px;
  width: 100%;
  padding: 20px 0;
  box-sizing: border-box;
`;

// ✅ Mensagem de combate
export const GameMessage = styled.div`
  background: rgba(0, 0, 0, 0.8);
  border: 2px solid #ffd700;
  border-radius: 8px;
  color: #fff;
  font-size: 14px;
  padding: 15px 25px;
  text-align: center;
  max-width: 600px;
  animation: fadeIn 0.3s ease-in;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

export const TurnIndicator = styled.button<{ $isPlayerTurn: boolean }>`
  background: ${props => props.$isPlayerTurn 
    ? 'linear-gradient(135deg, #4CAF50 0%, #45a049 100%)' 
    : 'linear-gradient(135deg, #f44336 0%, #d32f2f 100%)'};
  border: 3px solid ${props => props.$isPlayerTurn ? '#FFD700' : '#FF6B6B'};
  border-radius: 12px;
  color: #fff;
  font-size: 16px;
  font-weight: bold;
  padding: 12px 30px;
  text-align: center;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.4);
  animation: pulse 1.5s ease-in-out infinite;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  z-index: 9999; /* Acima do overlay do tutorial */

  &::after {
    content: '📜';
    margin-left: 10px;
    font-size: 14px;
    opacity: 0.8;
  }

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.6);
    border-width: 4px;
  }

  &:active {
    transform: scale(0.98);
  }

  @keyframes pulse {
    0%, 100% {
      transform: scale(1);
      opacity: 1;
    }
    50% {
      transform: scale(1.05);
      opacity: 0.9;
    }
  }
`;

// Barra de ação inferior
export const BattleActionBar = styled.div`
  align-items: center;
  background: rgba(62, 39, 35, 0.95);
  border-top: 4px solid #5d4037;
  border-radius: 15px 15px 0 0;
  box-shadow: 0 -4px 6px rgba(0, 0, 0, 0.3);
  box-sizing: border-box;
  bottom: 0;
  display: flex;
  height: 150px;
  justify-content: space-between;
  left: 0;
  padding: 0 30px;
  position: absolute;
  width: 100%;
  z-index: 9999; /* Acima do overlay do tutorial */
`;
