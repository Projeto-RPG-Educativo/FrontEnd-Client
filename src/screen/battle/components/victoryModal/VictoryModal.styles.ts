import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const slideUp = keyframes`
  from {
    transform: translateY(50px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

const pulse = keyframes`
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
`;

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  animation: ${fadeIn} 0.3s ease-out;
`;

export const ModalContainer = styled.div`
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  border: 3px solid #ffd700;
  border-radius: 20px;
  padding: 40px;
  max-width: 500px;
  width: 90%;
  box-shadow: 
    0 0 30px rgba(255, 215, 0, 0.4),
    inset 0 0 20px rgba(255, 215, 0, 0.1);
  animation: ${slideUp} 0.4s ease-out;
`;

export const ModalHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 30px;
`;

export const VictoryIcon = styled.div`
  font-size: 80px;
  margin-bottom: 15px;
  animation: ${pulse} 1.5s ease-in-out infinite;
  filter: drop-shadow(0 0 10px rgba(255, 215, 0, 0.6));
`;

export const VictoryTitle = styled.h1`
  font-size: 48px;
  font-weight: bold;
  color: #ffd700;
  text-shadow: 
    0 0 10px rgba(255, 215, 0, 0.8),
    2px 2px 4px rgba(0, 0, 0, 0.8);
  margin: 0;
  letter-spacing: 3px;
`;

export const ModalContent = styled.div`
  text-align: center;
  margin-bottom: 30px;
`;

export const VictoryMessage = styled.p`
  font-size: 20px;
  color: #ffffff;
  margin-bottom: 15px;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8);
`;

export const QuestionText = styled.p`
  font-size: 18px;
  color: #b8b8d1;
  margin-top: 20px;
  font-style: italic;
`;

export const ButtonContainer = styled.div`
  display: flex;
  gap: 15px;
  justify-content: center;
  flex-wrap: wrap;
`;

interface ActionButtonProps {
  $variant: 'continue' | 'return';
}

export const ActionButton = styled.button<ActionButtonProps>`
  flex: 1;
  min-width: 180px;
  padding: 15px 25px;
  font-size: 18px;
  font-weight: bold;
  border: 2px solid;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8);
  
  ${({ $variant }) => $variant === 'continue' ? `
    background: linear-gradient(135deg, #d32f2f 0%, #8b0000 100%);
    border-color: #ff4444;
    color: #ffffff;
    
    &:hover {
      background: linear-gradient(135deg, #ff4444 0%, #d32f2f 100%);
      transform: translateY(-2px);
      box-shadow: 
        0 5px 15px rgba(211, 47, 47, 0.4),
        0 0 20px rgba(255, 68, 68, 0.3);
    }
  ` : `
    background: linear-gradient(135deg, #2e7d32 0%, #1b5e20 100%);
    border-color: #4caf50;
    color: #ffffff;
    
    &:hover {
      background: linear-gradient(135deg, #4caf50 0%, #2e7d32 100%);
      transform: translateY(-2px);
      box-shadow: 
        0 5px 15px rgba(46, 125, 50, 0.4),
        0 0 20px rgba(76, 175, 80, 0.3);
    }
  `}
  
  &:active {
    transform: translateY(0);
  }
`;
