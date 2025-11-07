/**
 * ============================================
 * TUTORIAL CUTSCENE STYLES - PIXEL ART
 * ============================================
 * Estilos adaptados do sistema legado com visual pixel art
 */

import styled, { keyframes } from 'styled-components';

// ==================== PIXEL ART COLORS ====================

const PIXEL_BORDER_COLOR = '#4a2512';
const DIALOGUE_BG_COLOR = 'rgba(15, 5, 0, 0.9)'; // Fundo quase preto, ligeiramente marrom
const TEXT_COLOR = '#e8d4ae'; // Cor de texto clara, levemente amarelada
const SPEAKER_NAME_BG_COLOR = '#6b2f0a'; // Fundo do nome do falante
const BUTTON_BG_COLOR = '#7a3e1f'; // Cor do botão
const BUTTON_HOVER_BG_COLOR = '#9c5a3d'; // Cor do botão ao passar o mouse
const BORDER_THICKNESS = '3px'; // Grossura da borda de pixel

// ==================== ANIMATIONS ====================

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
    opacity: 1;
  }
  50% {
    opacity: 0.6;
  }
`;

// ==================== OVERLAY ====================

export const CutsceneOverlay = styled.div<{ $isOverlay?: boolean }>`
  position: ${props => props.$isOverlay ? 'absolute' : 'fixed'};
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: ${props => props.$isOverlay ? 'transparent' : 'rgba(0, 0, 0, 0.5)'}; /* Transparente para overlay */
  display: flex;
  flex-direction: column;
  justify-content: ${props => props.$isOverlay ? 'flex-start' : 'flex-end'}; /* Topo para overlay, bottom para tela cheia */
  align-items: center;
  z-index: ${props => props.$isOverlay ? 10000 : 1000};
  font-family: 'Press Start 2P', cursive; /* Ideal para pixel art */
  color: ${TEXT_COLOR};
  box-sizing: border-box;
  padding: ${props => props.$isOverlay ? '10% 5vw 2vh 5vw' : '2vh 5vw'}; /* 10% do topo quando overlay */
  animation: ${fadeIn} 0.3s ease-out;
  pointer-events: ${props => props.$isOverlay ? 'none' : 'auto'}; /* Permite cliques através do overlay */
`;

// ==================== CONTAINER ====================

export const CutsceneContainer = styled.div<{ $backgroundImage?: string; $isOverlay?: boolean }>`
  position: relative;
  width: 100%;
  height: ${props => props.$isOverlay ? 'auto' : '100%'}; /* Auto para overlay, 100% para tela cheia */
  display: flex;
  flex-direction: column;
  justify-content: flex-start; /* Sempre começa do topo */
  background: ${props => 
    props.$backgroundImage 
      ? `url(${props.$backgroundImage})`
      : 'transparent' /* Transparente para overlays */
  };
  background-size: cover;
  background-position: center;
  image-rendering: pixelated; /* Garante que a imagem não seja suavizada */
  pointer-events: ${props => props.$isOverlay ? 'none' : 'auto'}; /* Permite cliques através do container */
`;

// ==================== CHARACTERS ====================

export const CharactersContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 1200px;
  flex-grow: 1;
  align-items: flex-end;
  padding-bottom: 20px;
  pointer-events: none;

  @media (max-width: 768px) {
    justify-content: center;
    gap: 10px;
  }
`;

export const CharacterImage = styled.img<{ 
  $isActive: boolean;
  $position: 'left' | 'right';
}>`
  width: auto;
  height: clamp(150px, 35vh, 400px);
  object-fit: contain;
  image-rendering: pixelated; /* Garante que a imagem não seja suavizada */
  transition: opacity 0.2s ease-out, filter 0.2s ease-out, transform 0.2s ease-out;
  
  /* Estilo para personagem ativo/inativo */
  opacity: ${props => props.$isActive ? 1 : 0.6};
  filter: ${props => props.$isActive ? 'drop-shadow(0 0 5px rgba(255,255,255,0.4))' : 'brightness(0.7) grayscale(50%)'};
  transform: translateY(${props => props.$isActive ? '0' : '10px'});
`;

// ==================== DIALOGUE BOX ====================

export const DialogueBox = styled.div`
  position: relative;
  background-color: ${DIALOGUE_BG_COLOR};
  border: ${BORDER_THICKNESS} solid ${PIXEL_BORDER_COLOR};
  /* Borda pixelada */
  border-image: url("data:image/svg+xml,%3Csvg width='10' height='10' viewBox='0 0 10 10' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 3H3V0H0V3Z' fill='%234a2512'/%3E%3Cpath d='M7 0H10V3H7V0Z' fill='%234a2512'/%3E%3Cpath d='M0 7H3V10H0V7Z' fill='%234a2512'/%3E%3Cpath d='M7 7H10V10H7V7Z' fill='%234a2512'/%3E%3C/svg%3E") 3 repeat;
    
  padding: 15px 20px;
  width: 100%;
  max-width: 1000px;
  min-height: 120px;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  animation: ${slideUp} 0.4s ease-out;
  pointer-events: auto; /* DialogueBox sempre recebe cliques */
`;

export const SpeakerNameBox = styled.div`
  position: absolute;
  top: -25px;
  left: 10px;
  background-color: ${SPEAKER_NAME_BG_COLOR};
  border: ${BORDER_THICKNESS} solid ${PIXEL_BORDER_COLOR};
  /* Borda pixelada */
  border-image: url("data:image/svg+xml,%3Csvg width='10' height='10' viewBox='0 0 10 10' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 3H3V0H0V3Z' fill='%234a2512'/%3E%3Cpath d='M7 0H10V3H7V0Z' fill='%234a2512'/%3E%3Cpath d='M0 7H3V10H0V7Z' fill='%234a2512'/%3E%3Cpath d='M7 7H10V10H7V7Z' fill='%234a2512'/%3E%3C/svg%3E") 3 repeat;
  
  padding: 5px 12px;
  font-size: clamp(0.7rem, 1.5vw, 0.9rem);
  color: ${TEXT_COLOR};
  white-space: nowrap;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.4);
`;

export const SpeakerName = styled.div`
  font-family: 'Press Start 2P', cursive;
  font-size: clamp(0.7rem, 1.5vw, 0.9rem);
  color: ${TEXT_COLOR};
`;

export const DialogueText = styled.p`
  margin: 0;
  flex-grow: 1;
  font-family: 'Press Start 2P', cursive;
  font-size: clamp(0.8rem, 1.8vw, 1rem);
  line-height: 1.5;
  color: ${TEXT_COLOR};
`;

export const ProgressIndicator = styled.div`
  position: absolute;
  top: 15px;
  right: 20px;
  font-family: 'Press Start 2P', cursive;
  font-size: clamp(0.6rem, 1.2vw, 0.75rem);
  color: rgba(232, 212, 174, 0.6);
`;

// ==================== BUTTONS ====================

export const AdvanceButton = styled.button`
  background-color: ${BUTTON_BG_COLOR};
  border: ${BORDER_THICKNESS} solid ${PIXEL_BORDER_COLOR};
  /* Borda pixelada */
  border-image: url("data:image/svg+xml,%3Csvg width='10' height='10' viewBox='0 0 10 10' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 3H3V0H0V3Z' fill='%234a2512'/%3E%3Cpath d='M7 0H10V3H7V0Z' fill='%234a2512'/%3E%3Cpath d='M0 7H3V10H0V7Z' fill='%234a2512'/%3E%3Cpath d='M7 7H10V10H7V7Z' fill='%234a2512'/%3E%3C/svg%3E") 3 repeat;
  
  color: ${TEXT_COLOR};
  font-family: 'Press Start 2P', cursive;
  font-size: clamp(0.6rem, 1.2vw, 0.8rem);
  padding: 8px 15px;
  cursor: pointer;
  align-self: flex-end;
  margin-top: 10px;
  transition: background-color 0.1s ease, transform 0.1s ease;

  &:hover {
    background-color: ${BUTTON_HOVER_BG_COLOR};
    transform: translateY(-2px);
  }
  
  &:active {
    transform: translateY(0);
  }
`;

// ==================== LOADING & ERROR ====================

export const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
`;

export const LoadingText = styled.div`
  font-family: 'Press Start 2P', cursive;
  font-size: clamp(0.8rem, 1.5vw, 1.2rem);
  color: ${TEXT_COLOR};
  animation: ${pulse} 1.5s ease-in-out infinite;
`;

export const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  padding: 40px;
  background: ${DIALOGUE_BG_COLOR};
  border: ${BORDER_THICKNESS} solid #8b0000;
  border-image: url("data:image/svg+xml,%3Csvg width='10' height='10' viewBox='0 0 10 10' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 3H3V0H0V3Z' fill='%238b0000'/%3E%3Cpath d='M7 0H10V3H7V0Z' fill='%238b0000'/%3E%3Cpath d='M0 7H3V10H0V7Z' fill='%238b0000'/%3E%3Cpath d='M7 7H10V10H7V7Z' fill='%238b0000'/%3E%3C/svg%3E") 3 repeat;
`;

export const ErrorText = styled.div`
  font-family: 'Press Start 2P', cursive;
  font-size: clamp(0.7rem, 1.3vw, 1rem);
  color: #ff6b6b;
  text-align: center;
  line-height: 1.6;
`;

export const ErrorButton = styled.button`
  background-color: ${BUTTON_BG_COLOR};
  border: ${BORDER_THICKNESS} solid ${PIXEL_BORDER_COLOR};
  border-image: url("data:image/svg+xml,%3Csvg width='10' height='10' viewBox='0 0 10 10' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 3H3V0H0V3Z' fill='%234a2512'/%3E%3Cpath d='M7 0H10V3H7V0Z' fill='%234a2512'/%3E%3Cpath d='M0 7H3V10H0V7Z' fill='%234a2512'/%3E%3Cpath d='M7 7H10V10H7V7Z' fill='%234a2512'/%3E%3C/svg%3E") 3 repeat;
  
  color: ${TEXT_COLOR};
  font-family: 'Press Start 2P', cursive;
  font-size: clamp(0.6rem, 1.2vw, 0.8rem);
  padding: 8px 15px;
  cursor: pointer;
  transition: background-color 0.1s ease, transform 0.1s ease;

  &:hover {
    background-color: ${BUTTON_HOVER_BG_COLOR};
    transform: translateY(-2px);
  }
`;

// ==================== SPOTLIGHT ====================

/**
 * Overlay escuro com um círculo transparente (spotlight)
 * Usado para destacar áreas específicas durante o tutorial do Hub
 */
export const SpotlightOverlay = styled.div<{ 
  $x: number; 
  $y: number; 
  $radius: number;
}>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 9998; /* Abaixo do diálogo (10000) mas acima de tudo mais */
  
  /* Cria o efeito de spotlight usando radial-gradient */
  background: radial-gradient(
    circle ${props => props.$radius}px at ${props => props.$x}% ${props => props.$y}%,
    transparent 0%,
    rgba(0, 0, 0, 0.85) 100%
  );
  
  animation: ${fadeIn} 0.5s ease-out;
`;
