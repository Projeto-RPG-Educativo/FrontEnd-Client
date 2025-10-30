import styled from 'styled-components';

// Container dos sprites dos personagens
export const CharacterSprites = styled.div`
  position: absolute;
  bottom: 180px; 
  width: 95%;
  max-width: 1200px; 
  height: 350px;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  left: 50%; 
  transform: translateX(-50%);
`;

// Sprite do jogador
export const PlayerSprite = styled.div<{ backgroundImage?: string }>`
  width: 300px;
  height: 340px;
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover; 
  background-image: ${props => props.backgroundImage ? `url(${props.backgroundImage})` : 'none'};
  
  border: 4px solid #5d4037;
  border-radius: 10px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.5);
`;

// Sprite do inimigo
export const EnemySprite = styled.div<{ backgroundImage?: string }>`
  width: 300px;
  height: 340px;
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  background-image: ${props => props.backgroundImage ? `url(${props.backgroundImage})` : 'none'};

  border: 4px solid #5d4037;
  border-radius: 10px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.5);
`;

// Container dos sprites
export const SpritesContainer = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center; 
  gap: 20px;
  width: 100%;
  padding: 20px 0;
  box-sizing: border-box;
`;