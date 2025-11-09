import styled from 'styled-components';

// ============================================
// CONTAINER PRINCIPAL
// ============================================

export const ReceptionContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.85);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  animation: fadeIn 0.3s ease-in;

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

// ============================================
// LIVRO/PERGAMINHO PRINCIPAL
// ============================================

export const BookContainer = styled.div`
  position: relative;
  width: 90vw;
  max-width: 1200px;
  height: 85vh;
  max-height: 800px;
  background: linear-gradient(135deg, #8b7355 0%, #6b5644 100%);
  border-radius: 8px;
  box-shadow: 
    0 20px 60px rgba(0, 0, 0, 0.6),
    inset 0 0 20px rgba(0, 0, 0, 0.3);
  display: flex;
  padding: 30px;
  gap: 20px;
  border: 3px solid #4a3728;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: 
      repeating-linear-gradient(
        0deg,
        transparent,
        transparent 2px,
        rgba(0, 0, 0, 0.03) 2px,
        rgba(0, 0, 0, 0.03) 4px
      );
    pointer-events: none;
    border-radius: 8px;
  }
`;

// ============================================
// PÁGINA ESQUERDA (Ilustração/Info)
// ============================================

export const LeftPage = styled.div`
  flex: 1;
  background: linear-gradient(to bottom, #f4e8d0 0%, #e8d4b0 100%);
  border-radius: 4px;
  padding: 30px;
  box-shadow: 
    inset 2px 2px 8px rgba(0, 0, 0, 0.15),
    inset -2px -2px 8px rgba(255, 255, 255, 0.3);
  position: relative;
  border: 2px solid #c4a875;
  
  /* Efeito de papel antigo */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><filter id="noise"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" stitchTiles="stitch"/></filter><rect width="100" height="100" filter="url(%23noise)" opacity="0.05"/></svg>');
    pointer-events: none;
    border-radius: 4px;
  }
`;

export const IllustrationArea = styled.div`
  width: 100%;
  height: 300px;
  background: linear-gradient(135deg, #d4c5a9 0%, #c4b59d 100%);
  border: 3px solid #8b7355;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  box-shadow: inset 0 2px 8px rgba(0, 0, 0, 0.2);
  position: relative;
  overflow: hidden;

  &::after {
    content: '🏰';
    font-size: 120px;
    opacity: 0.3;
  }
`;

export const WelcomeText = styled.div`
  text-align: center;
  font-family: 'Georgia', serif;
  color: #3a2817;
  margin-top: 20px;
`;

export const WelcomeTitle = styled.h1`
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 10px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
  color: #2a1810;
`;

export const WelcomeSubtitle = styled.p`
  font-size: 16px;
  line-height: 1.6;
  margin-bottom: 20px;
  color: #4a3728;
  font-style: italic;
`;

export const StatsBox = styled.div`
  background: rgba(139, 115, 85, 0.2);
  border: 2px solid #8b7355;
  border-radius: 4px;
  padding: 15px;
  margin-top: 20px;
`;

export const StatItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  border-bottom: 1px dashed #c4a875;
  font-family: 'Georgia', serif;
  color: #3a2817;

  &:last-child {
    border-bottom: none;
  }
`;

export const StatLabel = styled.span`
  font-weight: bold;
  font-size: 14px;
`;

export const StatValue = styled.span`
  font-size: 14px;
  color: #6b5644;
`;

// ============================================
// PÁGINA DIREITA (Lista de Quests)
// ============================================

export const RightPage = styled.div`
  flex: 1;
  background: linear-gradient(to bottom, #f4e8d0 0%, #e8d4b0 100%);
  border-radius: 4px;
  padding: 30px;
  box-shadow: 
    inset 2px 2px 8px rgba(0, 0, 0, 0.15),
    inset -2px -2px 8px rgba(255, 255, 255, 0.3);
  position: relative;
  border: 2px solid #c4a875;
  display: flex;
  flex-direction: column;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><filter id="noise"><feTurbulance type="fractalNoise" baseFrequency="0.9" numOctaves="4" stitchTiles="stitch"/></filter><rect width="100" height="100" filter="url(%23noise)" opacity="0.05"/></svg>');
    pointer-events: none;
    border-radius: 4px;
  }
`;

export const PageHeader = styled.div`
  text-align: center;
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 3px double #8b7355;
`;

export const PageTitle = styled.h2`
  font-family: 'Georgia', serif;
  font-size: 28px;
  color: #2a1810;
  margin-bottom: 5px;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
`;

export const PageSubtitle = styled.p`
  font-family: 'Georgia', serif;
  font-size: 14px;
  color: #6b5644;
  font-style: italic;
`;

// ============================================
// ABAS DE FILTRO
// ============================================

export const TabsContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  padding: 0 5px;
`;

interface TabButtonProps {
  $isActive: boolean;
}

export const TabButton = styled.button<TabButtonProps>`
  flex: 1;
  padding: 10px 15px;
  background: ${props => props.$isActive 
    ? 'linear-gradient(to bottom, #d4c5a9 0%, #c4b59d 100%)' 
    : 'linear-gradient(to bottom, #a89880 0%, #98886f 100%)'};
  border: 2px solid ${props => props.$isActive ? '#8b7355' : '#6b5644'};
  border-radius: 4px;
  font-family: 'Georgia', serif;
  font-size: 13px;
  font-weight: bold;
  color: ${props => props.$isActive ? '#2a1810' : '#4a3728'};
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: ${props => props.$isActive 
    ? 'inset 0 2px 4px rgba(0, 0, 0, 0.15)' 
    : '0 2px 4px rgba(0, 0, 0, 0.2)'};

  &:hover {
    transform: ${props => props.$isActive ? 'none' : 'translateY(-2px)'};
    box-shadow: ${props => props.$isActive 
      ? 'inset 0 2px 4px rgba(0, 0, 0, 0.15)' 
      : '0 4px 8px rgba(0, 0, 0, 0.3)'};
  }

  &:active {
    transform: translateY(0);
  }
`;

// ============================================
// LISTA DE QUESTS
// ============================================

export const QuestList = styled.div`
  flex: 1;
  overflow-y: auto;
  padding-right: 10px;
  
  /* Scrollbar customizada */
  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(139, 115, 85, 0.2);
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: #8b7355;
    border-radius: 4px;
    
    &:hover {
      background: #6b5644;
    }
  }
`;

// ============================================
// CARD DE QUEST
// ============================================

interface QuestCardProps {
  $status: 'available' | 'active' | 'completed';
}

export const QuestCard = styled.div<QuestCardProps>`
  background: ${props => {
    switch (props.$status) {
      case 'active':
        return 'linear-gradient(135deg, #fff8e1 0%, #ffe082 100%)';
      case 'completed':
        return 'linear-gradient(135deg, #e8f5e9 0%, #a5d6a7 100%)';
      default:
        return 'linear-gradient(135deg, #fafafa 0%, #eeeeee 100%)';
    }
  }};
  border: 2px solid ${props => {
    switch (props.$status) {
      case 'active':
        return '#f57c00';
      case 'completed':
        return '#66bb6a';
      default:
        return '#8b7355';
    }
  }};
  border-radius: 6px;
  padding: 15px;
  margin-bottom: 15px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
  transition: all 0.2s ease;
  position: relative;
  cursor: pointer;

  &:hover {
    transform: translateX(5px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.25);
  }

  &:last-child {
    margin-bottom: 0;
  }
`;

export const QuestHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
`;

export const QuestIcon = styled.span`
  font-size: 24px;
  flex-shrink: 0;
`;

export const QuestTitle = styled.h3`
  font-family: 'Georgia', serif;
  font-size: 16px;
  font-weight: bold;
  color: #2a1810;
  margin: 0;
  flex: 1;
`;

export const QuestType = styled.span`
  font-size: 11px;
  padding: 4px 8px;
  background: rgba(139, 115, 85, 0.3);
  border: 1px solid #8b7355;
  border-radius: 3px;
  color: #3a2817;
  font-family: 'Georgia', serif;
  font-weight: bold;
  text-transform: uppercase;
`;

export const QuestDescription = styled.p`
  font-family: 'Georgia', serif;
  font-size: 13px;
  color: #4a3728;
  margin: 0 0 10px 0;
  line-height: 1.5;
  font-style: italic;
`;

export const QuestProgressBar = styled.div`
  width: 100%;
  height: 8px;
  background: rgba(139, 115, 85, 0.3);
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 8px;
`;

interface ProgressFillProps {
  $percent: number;
}

export const ProgressFill = styled.div<ProgressFillProps>`
  height: 100%;
  width: ${props => props.$percent}%;
  background: linear-gradient(90deg, #f57c00 0%, #ffa726 100%);
  transition: width 0.3s ease;
  box-shadow: 0 0 8px rgba(245, 124, 0, 0.6);
`;

export const QuestProgressText = styled.span`
  font-family: 'Georgia', serif;
  font-size: 12px;
  color: #6b5644;
  font-weight: bold;
`;

export const QuestRewards = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 10px;
  padding-top: 10px;
  border-top: 1px dashed #c4a875;
`;

export const RewardItem = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  font-family: 'Georgia', serif;
  font-size: 13px;
  color: #3a2817;
  font-weight: bold;
`;

export const RewardIcon = styled.span`
  font-size: 16px;
`;

// ============================================
// BOTÕES DE AÇÃO
// ============================================

export const QuestActions = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 12px;
`;

export const ActionButton = styled.button<{ $variant?: 'accept' | 'abandon' | 'info' }>`
  flex: 1;
  padding: 8px 16px;
  background: ${props => {
    switch (props.$variant) {
      case 'accept':
        return 'linear-gradient(to bottom, #66bb6a 0%, #43a047 100%)';
      case 'abandon':
        return 'linear-gradient(to bottom, #ef5350 0%, #e53935 100%)';
      default:
        return 'linear-gradient(to bottom, #42a5f5 0%, #1e88e5 100%)';
    }
  }};
  border: 2px solid ${props => {
    switch (props.$variant) {
      case 'accept':
        return '#2e7d32';
      case 'abandon':
        return '#c62828';
      default:
        return '#1565c0';
    }
  }};
  border-radius: 4px;
  color: white;
  font-family: 'Georgia', serif;
  font-size: 13px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`;

// ============================================
// BOTÃO DE FECHAR
// ============================================

export const CloseButton = styled.button`
  position: absolute;
  top: 15px;
  right: 15px;
  width: 40px;
  height: 40px;
  background: linear-gradient(to bottom, #ef5350 0%, #e53935 100%);
  border: 2px solid #c62828;
  border-radius: 50%;
  color: white;
  font-size: 20px;
  font-weight: bold;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  z-index: 10;

  &:hover {
    transform: rotate(90deg) scale(1.1);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.4);
  }

  &:active {
    transform: rotate(90deg) scale(1);
  }
`;

// ============================================
// ESTADOS DE LOADING E ERRO
// ============================================

export const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px;
  font-family: 'Georgia', serif;
  color: #3a2817;
`;

export const LoadingSpinner = styled.div`
  width: 50px;
  height: 50px;
  border: 4px solid rgba(139, 115, 85, 0.3);
  border-top: 4px solid #8b7355;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 15px;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

export const LoadingText = styled.p`
  font-size: 16px;
  font-style: italic;
`;

export const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px;
  font-family: 'Georgia', serif;
`;

export const ErrorIcon = styled.div`
  font-size: 60px;
  margin-bottom: 15px;
`;

export const ErrorText = styled.p`
  font-size: 16px;
  color: #c62828;
  text-align: center;
  margin-bottom: 20px;
`;

export const RetryButton = styled.button`
  padding: 10px 20px;
  background: linear-gradient(to bottom, #42a5f5 0%, #1e88e5 100%);
  border: 2px solid #1565c0;
  border-radius: 4px;
  color: white;
  font-family: 'Georgia', serif;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  }
`;

// ============================================
// ESTADO VAZIO
// ============================================

export const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  font-family: 'Georgia', serif;
  text-align: center;
`;

export const EmptyIcon = styled.div`
  font-size: 80px;
  margin-bottom: 20px;
  opacity: 0.5;
`;

export const EmptyText = styled.p`
  font-size: 18px;
  color: #6b5644;
  font-style: italic;
  line-height: 1.6;
`;
