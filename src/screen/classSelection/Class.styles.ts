import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';

export const Container = styled.div`
  align-items: center;
  background-color: #2a2a2a;
  border: 4px solid #5d4037;
  border-radius: 10px;
  box-sizing: border-box;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  color: #fff;
  display: flex;
  flex-direction: column;
  font-family: 'Press Start 2P', cursive;
  gap: 20px;
  height: 100vh;
  margin: auto;
  overflow: hidden;
  padding: 20px;
  width: 100vw;
`;

export const Title = styled.h1`
  color: #ffcc00;
  font-size: clamp(1rem, 4vw, 2.5rem);
  margin: 0;
  text-align: center;
  text-shadow: 2px 2px 0px #000;
  text-transform: uppercase;
`;

export const DetailsPanel = styled(motion.div)`
  background-color: #3e2723;
  border: 3px solid #5d4037;
  border-radius: 10px;
  height: 100%;
  overflow-y: auto;
  padding: 0;
  position: relative;
`;

export const DetailsBox = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export const DetailsHeader = styled.div`
  background: linear-gradient(135deg, #5d4037 0%, #3e2723 100%);
  border-bottom: 3px solid #8d6e63;
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 15px;
`;

export const DetailsImage = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  border: 3px solid #ffcc00;
  object-fit: cover;
  box-shadow: 0 0 15px rgba(255, 204, 0, 0.3);
`;

export const DetailsNameWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const DetailsName = styled.h2`
  color: #ffcc00;
  font-family: 'Press Start 2P', cursive;
  font-size: 16px;
  margin: 0;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
  text-transform: uppercase;
`;

export const ClassRankBadge = styled.span<{ $color: string }>`
  background-color: ${props => props.$color};
  color: #000;
  font-family: 'Press Start 2P', cursive;
  font-size: 10px;
  font-weight: bold;
  padding: 4px 8px;
  border-radius: 12px;
  width: fit-content;
  text-shadow: none;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
`;

export const DetailsContent = styled.div`
  flex: 1;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const DetailsSection = styled.div`
  background-color: rgba(42, 42, 42, 0.3);
  border: 2px solid #5d4037;
  border-radius: 8px;
  padding: 15px;
`;

export const SectionTitle = styled.h3`
  color: #ffcc00;
  font-family: 'Press Start 2P', cursive;
  font-size: 11px;
  margin: 0 0 10px 0;
  text-transform: uppercase;
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const DetailsDescription = styled.p`
  color: #e0e0e0;
  font-family: 'Press Start 2P', cursive;
  font-size: 9px;
  line-height: 1.4;
  margin: 0;
  text-align: justify;
`;

export const DetailsEffect = styled.p`
  color: #4caf50;
  font-family: 'Press Start 2P', cursive;
  font-size: 9px;
  line-height: 1.4;
  margin: 0;
  text-align: justify;
  background-color: rgba(76, 175, 80, 0.1);
  padding: 10px;
  border-radius: 5px;
  border-left: 4px solid #4caf50;
`;

export const DetailedStats = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const StatRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
`;

export const StatLabel = styled.div`
  color: #fff;
  font-family: 'Press Start 2P', cursive;
  font-size: 8px;
  display: flex;
  align-items: center;
  gap: 6px;
  min-width: 120px;
  
  span {
    font-size: 12px;
  }
`;

export const StatBarWrapper = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  gap: 8px;
  position: relative;
`;

export const StatBar = styled.div<{ $value: number; $maxValue: number }>`
  background-color: #2a2a2a;
  border: 1px solid #5d4037;
  border-radius: 10px;
  height: 12px;
  flex: 1;
  position: relative;
  overflow: hidden;
  
  &::after {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: ${props => (props.$value / props.$maxValue) * 100}%;
    background: linear-gradient(90deg, 
      ${props => {
        const percentage = (props.$value / props.$maxValue) * 100;
        if (percentage >= 80) return '#4caf50, #8bc34a';
        if (percentage >= 60) return '#ff9800, #ffc107';
        if (percentage >= 40) return '#ff5722, #ff9800';
        return '#f44336, #e57373';
      }}
    );
    border-radius: 9px;
    transition: width 0.5s ease-in-out;
    box-shadow: inset 0 1px 2px rgba(255, 255, 255, 0.2);
  }
`;

export const StatValue = styled.span`
  color: #fff;
  font-family: 'Press Start 2P', cursive;
  font-size: 10px;
  min-width: 25px;
  text-align: right;
`;

export const TotalStatsRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 12px;
  margin-top: 12px;
  border-top: 2px solid #5d4037;
`;

export const TotalStatsLabel = styled.div`
  color: #ffcc00;
  font-family: 'Press Start 2P', cursive;
  font-size: 10px;
  font-weight: bold;
`;

export const TotalStatsValue = styled.div`
  color: #ffcc00;
  font-family: 'Press Start 2P', cursive;
  font-size: 14px;
  font-weight: bold;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8);
`;

export const DetailsButtons = styled.div`
  display: flex;
  gap: 12px;
  margin-top: auto;
  padding-top: 20px;
`;

export const ConfirmButton = styled.button`
  background: linear-gradient(135deg, #2e7d32 0%, #4caf50 100%);
  border: 3px solid #4caf50;
  color: #fff;
  font-family: 'Press Start 2P', cursive;
  font-size: 10px;
  padding: 12px 16px;
  border-radius: 8px;
  cursor: pointer;
  flex: 1;
  transition: all 0.2s;
  text-transform: uppercase;

  &:hover {
    background: linear-gradient(135deg, #4caf50 0%, #66bb6a 100%);
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(76, 175, 80, 0.3);
  }

  &:active {
    transform: translateY(0);
  }
`;

export const CancelButton = styled.button`
  background: linear-gradient(135deg, #5d4037 0%, #8d6e63 100%);
  border: 3px solid #8d6e63;
  color: #fff;
  font-family: 'Press Start 2P', cursive;
  font-size: 10px;
  padding: 12px 16px;
  border-radius: 8px;
  cursor: pointer;
  flex: 0 0 auto;
  transition: all 0.2s;
  text-transform: uppercase;

  &:hover {
    background: linear-gradient(135deg, #8d6e63 0%, #a1887f 100%);
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(141, 110, 99, 0.3);
  }

  &:active {
    transform: translateY(0);
  }
`;

// === ESTADO VAZIO DO DETAILS PANEL ===

export const EmptyDetailsState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 40px 20px;
  text-align: center;
`;

export const EmptyDetailsIcon = styled.div`
  font-size: 64px;
  margin-bottom: 20px;
  opacity: 0.6;
`;

export const EmptyDetailsText = styled.h3`
  color: #ffcc00;
  font-family: 'Press Start 2P', cursive;
  font-size: 16px;
  margin: 0 0 15px 0;
  text-transform: uppercase;
`;

export const EmptyDetailsSubtext = styled.p`
  color: #b0b0b0;
  font-family: 'Press Start 2P', cursive;
  font-size: 9px;
  line-height: 1.4;
  margin: 0;
  max-width: 300px;
`;

// === NOVOS COMPONENTES ADICIONADOS ===

export const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
`;

export const Subtitle = styled.p`
  color: #b0b0b0;
  font-size: clamp(0.7rem, 2vw, 0.9rem);
  margin: 0;
  text-align: center;
  line-height: 1.4;
  max-width: 600px;
`;

export const ContentWrapper = styled.div`
  display: flex;
  gap: 30px;
  width: 100%;
  max-width: 1200px;
  height: calc(100vh - 200px);
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 20px;
  }
`;

export const ClassGridContainer = styled.div`
  flex: 2;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  overflow-y: auto;
  padding-right: 10px;
`;

export const DetailPanelContainer = styled.div`
  flex: 1;
  min-width: 300px;
  
  @media (max-width: 768px) {
    min-width: auto;
  }
`;

// === ESTADOS DE LOADING E ERRO ===

export const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  padding: 60px 20px;
`;

export const LoadingSpinner = styled.div`
  font-size: 48px;
  animation: bounce 1.5s infinite;
  
  @keyframes bounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-20px); }
  }
`;

export const LoadingText = styled.span`
  font-family: 'Press Start 2P', cursive;
  font-size: 14px;
  color: #b0b0b0;
  text-align: center;
`;

export const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  padding: 60px 20px;
  text-align: center;
`;

export const ErrorIcon = styled.div`
  font-size: 48px;
  color: #f44336;
`;

export const ErrorText = styled.span`
  font-family: 'Press Start 2P', cursive;
  font-size: 12px;
  color: #f44336;
  max-width: 400px;
  line-height: 1.4;
`;

export const RetryButton = styled.button`
  background-color: #2e7d32;
  border: 3px solid #4caf50;
  color: #fff;
  padding: 12px 20px;
  font-family: 'Press Start 2P', cursive;
  font-size: 10px;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: #4caf50;
    transform: translateY(-2px);
  }
`;

export const EmptyStateContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  padding: 60px 20px;
  text-align: center;
`;

export const EmptyStateIcon = styled.div`
  font-size: 64px;
  opacity: 0.6;
`;

export const EmptyStateText = styled.span`
  font-family: 'Press Start 2P', cursive;
  font-size: 14px;
  color: #b0b0b0;
`;

// === GRID E CARD DE CLASSES ===

export const ClassGrid = styled(motion.div)`
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  max-width: 800px;
  width: 100%;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

export const ClassCard = styled(motion.div)<{ $isSelected: boolean }>`
  background-color: #3e2723;
  border: 3px solid #5d4037;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  transition: all 0.2s;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
  }

  ${props => props.$isSelected && css`
    border-color: #ffcc00;
    box-shadow: 0 0 20px rgba(255, 204, 0, 0.5);
    transform: translateY(-4px);
  `}
`;

export const CardImageWrapper = styled.div`
  background-color: #555;
  border-bottom: 2px solid #5d4037;
  position: relative;
  overflow: hidden;
`;

export const ClassImage = styled.img`
  display: block;
  height: 150px;
  width: 100%;
  object-fit: cover;
  border-bottom: 2px solid #5d4037;
`;

export const ClassNameTag = styled.div`
  background-color: #2a2a2a;
  font-size: 10px;
  padding: 8px;
  text-align: center;
  text-transform: uppercase;
  color: #ffcc00;
  font-weight: bold;
  border-radius: 4px;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8);
`;

// === NOVOS ESTILOS PARA CLASSCARDGRID ===

export const DifficultyBadge = styled.div<{ $difficulty: 'easy' | 'medium' | 'hard' }>`
  position: absolute;
  top: 8px;
  right: 8px;
  background-color: rgba(0, 0, 0, 0.8);
  border-radius: 50%;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  border: 2px solid ${props => {
    switch (props.$difficulty) {
      case 'easy': return '#4caf50';
      case 'medium': return '#ff9800';
      case 'hard': return '#f44336';
      default: return '#ff9800';
    }
  }};
`;

export const CardContent = styled.div`
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
`;

export const ClassDescription = styled.p`
  font-family: 'Press Start 2P', cursive;
  font-size: 8px;
  color: #b0b0b0;
  line-height: 1.3;
  margin: 0;
  text-align: center;
  min-height: 32px;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

export const ClassStats = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: auto;
  padding-top: 8px;
  border-top: 1px solid #5d4037;
`;

export const StatItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  font-family: 'Press Start 2P', cursive;
  font-size: 8px;
  color: #fff;
  
  span {
    font-size: 12px;
    margin-bottom: 2px;
  }
`;

export const ImagePlaceholder = styled.div`
  width: 100%;
  height: 200px; // Ajuste conforme necessário
  background: linear-gradient(135deg, #4a4a4a 0%, #2a2a2a 100%);
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 2px dashed #666;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: repeating-linear-gradient(
      45deg,
      transparent,
      transparent 10px,
      rgba(255, 255, 255, 0.05) 10px,
      rgba(255, 255, 255, 0.05) 20px
    );
  }
`;

export const PlaceholderIcon = styled.div`
  font-size: 48px;
  margin-bottom: 12px;
  opacity: 0.7;
  z-index: 1;
`;

export const PlaceholderText = styled.div`
  color: #999;
  font-size: 14px;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 1px;
  z-index: 1;
`;