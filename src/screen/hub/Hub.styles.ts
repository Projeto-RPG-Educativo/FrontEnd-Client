import styled, { keyframes } from 'styled-components';

// 1. Animação de Brilho sutil para os Hotspots
export const pulse = keyframes`
  0% { box-shadow: 0 0 5px 3px rgba(255, 255, 0, 0.5); }
  50% { box-shadow: 0 0 10px 5px rgba(255, 255, 0, 0.8); }
  100% { box-shadow: 0 0 5px 3px rgba(255, 255, 0, 0.5); }
`;

// 2. Container principal 
export const HubContainer = styled.div`
  position: relative;
  width: 100vw; 
  height: 100vh;
  overflow: hidden;
`;

export const StretchedImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%; /* Ocupa 100% da largura */
  height: 100%; /* Ocupa 100% da altura */
  object-fit: fill; /* <--- ESSA PROPRIEDADE DISTORCE PARA PREENCHER */
  z-index: 1; /* Garante que fique no fundo */
`;

// 3. Estilo para os Pontos Clicáveis (Hotspots)
export const Hotspot = styled.button<{ $top: string; $left: string }>`
  position: absolute;
  top: ${props => props.$top};
  left: ${props => props.$left};
  
  padding: 10px 15px;
  background: rgba(0, 0, 0, 0.8);
  color: gold;
  border: 2px solid gold;
  border-radius: 5px;
  cursor: pointer;
  z-index: 10; /* Garante que fique acima de StretchedImage (z-index: 1) */
  white-space: nowrap; 
  /* ... (Restante dos estilos) ... */
`;

// 4. Painel Central de Informações/Loja (Componente sobreposto)
export const CentralPanel = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 60%;
    max-width: 800px;
    height: 70%;
    background: rgba(30, 30, 30, 0.95);
    border: 5px solid #4a4a4a;
    border-radius: 10px;
    padding: 20px;
    z-index: 20;
    color: white;
    box-shadow: 0 0 30px rgba(0, 0, 0, 0.7);
    display: flex;
    flex-direction: column;
`;