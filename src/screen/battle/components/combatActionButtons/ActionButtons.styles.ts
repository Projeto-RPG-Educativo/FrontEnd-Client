import styled, { keyframes, css } from "styled-components";
import { getIconByAction } from "../../../../constants/assets/icons/IconsBattleAssets";

const pulse = keyframes`
  0%, 100% {
    box-shadow: 0 0 0 0 rgba(255, 215, 0, 0.7), inset 0 0 5px rgba(0, 0, 0, 0.5);
    border-color: #FFD700;
  }
  50% {
    box-shadow: 0 0 0 15px rgba(255, 215, 0, 0), inset 0 0 5px rgba(0, 0, 0, 0.5);
    border-color: #FFA500;
  }
`;

const highlightedStyle = css`
  animation: ${pulse} 2s ease-in-out infinite;
  border-color: #FFD700;
  position: relative;
  z-index: 10000;
  filter: brightness(1.3);
`;

// Botões de ação
export const AbilityIconsContainer = styled.div`
  background: rgba(0, 0, 0, 0.5);
  border: 2px solid #5d4037;
  border-radius: 5px;
  display: flex;
  gap: 8px;
  padding: 5px;
  position: relative;
  z-index: 9999; /* Garante que os botões fiquem acima do overlay do tutorial */
`;

export const ActionIconButton = styled.button<{ 
  $action: 'skill' | 'attack' | 'defend' | 'quiz-icon';
  $isHighlighted?: boolean;
  title?: string;
}>`
  background-color: #444;
  background-position: center;
  background-repeat: no-repeat;
  background-size: 80%;
  border: 2px solid #5d4037;
  border-radius: 5px;
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.5);
  cursor: pointer;
  height: 60px;
  text-indent: -9999px;
  width: 60px;
  transition: all 0.3s ease;

  background-color: transparent;
  background-image: ${props => `url(${getIconByAction(props.$action)})`};

  /* Animação de destaque para tutorial */
  ${props => props.$isHighlighted && highlightedStyle}

  &:hover {
    transform: scale(1.1);
    border-color: #FFD700;
  }

  &:active {
    transform: scale(0.95);
  }

  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
    filter: grayscale(100%);
    
    &:hover {
      transform: none;
      border-color: #5d4037;
    }
  }

  &:hover::after {
    background-color: rgba(0, 0, 0, 0.8);
    border-radius: 5px;
    color: #fff;
    content: attr(title);
    font-size: 0.8em;
    padding: 8px 12px;
    pointer-events: none;
    position: absolute;
    transform: translateX(-50%);
    white-space: nowrap;
    z-index: 10;
  }
`;