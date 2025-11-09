import styled from 'styled-components';

export const FloorContainer = styled.div<{ $backgroundImage: string }>`
  position: relative;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  
  /* Usa a imagem do andar atual como background, esticando para preencher */
  background-image: url(${props => props.$backgroundImage});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const NavArrow = styled.button<{ $position: 'top' | 'bottom' }>`
  position: absolute;
  ${props => props.$position === 'top' ? 'top: 20px;' : 'bottom: 20px;'}
  right: 50%;
  transform: translateX(50%);
  
  background: rgba(0, 0, 0, 0.6);
  color: white;
  border: 2px solid gold;
  padding: 15px 25px;
  font-size: 1.5em;
  cursor: pointer;
  z-index: 50;
  
  &:hover {
    background: rgba(0, 0, 0, 0.9);
  }

  &:disabled {
    opacity: 0.4;
    cursor: default;
  }
`;

export const BackButton = styled(NavArrow)`
    left: 20px;
    right: auto;
    transform: none;
`;

export const Monster = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 15px;
    max-height: 60vh;
    overflow-y: auto;
    padding: 10px;
    
    &::-webkit-scrollbar {
        width: 8px;
    }
    
    &::-webkit-scrollbar-track {
        background: rgba(0, 0, 0, 0.3);
    }
    
    &::-webkit-scrollbar-thumb {
        background: #4682b4;
        border-radius: 4px;
    }
`;
