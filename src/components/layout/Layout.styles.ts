import styled, { createGlobalStyle } from 'styled-components';

// ✅ Estilos globais (equivalente ao html, body, #root)
export const GlobalLayoutStyles = createGlobalStyle`
  html, body, #root {
    height: 100%;
    width: 100%;
    margin: 0;
    padding: 0;
    overflow: hidden; /* Evita barras de rolagem que podem quebrar o layout */
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

// ✅ Container principal do jogo
export const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #2a2a2a;
  color: #fff;
  width: 100vw;
  height: 100vh;
  box-sizing: border-box;
`;

// ✅ Wrapper para o conteúdo do jogo
export const LayoutContentWrapper = styled.div`
  display: flex;
  flex-grow: 1;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

// ✅ Área principal do jogo
export const LayoutMain = styled.main`
  width: 100%;
  height: 100%;
  
  /* A chave para a responsividade: define a proporção e o tamanho máximo */
  aspect-ratio: 16 / 9;
  max-width: 1920px;
  max-height: 1080px;
  object-fit: contain; /* Redimensiona o conteúdo para caber, mantendo a proporção */
  overflow: hidden; /* Importante para evitar que o conteúdo interno transborde */
  position: relative;
  
  /* Estilos de borda e sombra para o visual do jogo */
  border: 4px solid #5d4037;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
`;