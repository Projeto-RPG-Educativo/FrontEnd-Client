import styled from 'styled-components';

// Cores e tamanhos que remetem a pixel art
const PIXEL_BORDER_COLOR = '#4a2512';
const DIALOGUE_BG_COLOR = 'rgba(15, 5, 0, 0.9)'; // Fundo quase preto, ligeiramente marrom
const TEXT_COLOR = '#e8d4ae'; // Cor de texto clara, levemente amarelada
const SPEAKER_NAME_BG_COLOR = '#6b2f0a'; // Fundo do nome do falante
const BUTTON_BG_COLOR = '#7a3e1f'; // Cor do botão
const BUTTON_HOVER_BG_COLOR = '#9c5a3d'; // Cor do botão ao passar o mouse
const BORDER_THICKNESS = '3px'; // Grossura da borda de pixel

export const DialogueOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column; /* Para alinhar caixa embaixo e personagens em cima */
  justify-content: flex-end; /* Alinha tudo à parte inferior */
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5); /* Semi-transparente, para escurecer o fundo */
  z-index: 1000;
  font-family: 'Press Start 2P', cursive; /* Ideal para pixel art */
  color: ${TEXT_COLOR};
  box-sizing: border-box;
  padding: 2vh 5vw; /* Espaçamento das bordas */

  /* Animação simples de fade in */
  animation: fadeIn 0.3s ease-out;
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
`;

export const TopCharactersContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 1200px; /* Limita a largura dos personagens */
  flex-grow: 1; /* Permite que ocupe o espaço disponível */
  align-items: flex-end; /* Alinha os personagens na base */
  padding-bottom: 20px; /* Espaço entre personagens e caixa de diálogo */
  pointer-events: none; /* Não interfere com cliques */

  @media (max-width: 768px) {
    justify-content: center;
    gap: 10px;
  }
`;

interface CharacterImageProps {
  $isActive: boolean; // Transient prop para styled-components
  $position: 'left' | 'right';
}

export const CharacterImage = styled.img<CharacterImageProps>`
  width: auto;
  height: clamp(150px, 35vh, 400px); /* Tamanho responsivo */
  object-fit: contain;
  image-rendering: pixelated; /* Garante que a imagem não seja suavizada */
  transition: opacity 0.2s ease-out, filter 0.2s ease-out, transform 0.2s ease-out;

  /* Estilo para personagem ativo/inativo */
  opacity: ${props => props.$isActive ? 1 : 0.6};
  filter: ${props => props.$isActive ? 'drop-shadow(0 0 5px rgba(255,255,255,0.4))' : 'brightness(0.7) grayscale(50%)'};
  transform: translateY(${props => props.$isActive ? '0' : '10px'});
`;

export const DialogueBox = styled.div`
  position: relative;
  background-color: ${DIALOGUE_BG_COLOR};
  border: ${BORDER_THICKNESS} solid ${PIXEL_BORDER_COLOR};
  /* Borda pixelada */
  border-image: url("data:image/svg+xml,%3Csvg width='10' height='10' viewBox='0 0 10 10' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 3H3V0H0V3Z' fill='%234a2512'/%3E%3Cpath d='M7 0H10V3H7V0Z' fill='%234a2512'/%3E%3Cpath d='M0 7H3V10H0V7Z' fill='%234a2512'/%3E%3Cpath d='M7 7H10V10H7V7Z' fill='%234a2512'/%3E%3C/svg%3E") 3 repeat;
  
  padding: 15px 20px;
  width: 100%;
  max-width: 1000px; /* Largura máxima da caixa de diálogo */
  min-height: 120px; /* Altura mínima para o texto */
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  animation: slideUp 0.4s ease-out;

  @keyframes slideUp {
    from { transform: translateY(50px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }
`;

export const SpeakerNameBox = styled.div`
  position: absolute;
  top: -25px; /* Posição acima da caixa de diálogo */
  left: 10px;
  background-color: ${SPEAKER_NAME_BG_COLOR};
  border: ${BORDER_THICKNESS} solid ${PIXEL_BORDER_COLOR};
   /* Borda pixelada */
  border-image: url("data:image/svg+xml,%3Csvg width='10' height='10' viewBox='0 0 10 10' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 3H3V0H0V3Z' fill='%234a2512'/%3E%3Cpath d='M7 0H10V3H7V0Z' fill='%234a2512'/%3E%3Cpath d='M0 7H3V10H0V7Z' fill='%234a2512'/%3E%3Cpath d='M7 7H10V10H7V7Z' fill='%234a2512'/%3E%3C/svg%3E") 3 repeat;
  
  padding: 5px 12px;
  font-size: clamp(0.7rem, 1.5vw, 0.9rem);
  color: ${TEXT_COLOR};
  white-space: nowrap; /* Impede que o nome quebre a linha */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.4); /* Sombra sutil */
`;

export const DialogueText = styled.p`
  margin: 0;
  flex-grow: 1; /* Ocupa o espaço restante */
  font-size: clamp(0.8rem, 1.8vw, 1rem);
  line-height: 1.5;
  color: ${TEXT_COLOR};
`;

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
  align-self: flex-end; /* Alinha o botão à direita */
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