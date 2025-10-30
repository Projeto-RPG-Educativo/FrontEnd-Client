import styled from 'styled-components';

// HUD do inimigo
export const EnemyHudContainer = styled.div`
  align-items: center;
  background-color: transparent;
  border: none;
  box-shadow: none;
  display: flex;
  flex-direction: column;
  gap: 5px;
  justify-content: center;
  margin-top: 10px;
  max-width: 900px;
  padding: 0;
  width: 80%;
`;

export const EnemyHud = styled.div`
  background-color: transparent;
  border: none;
  box-shadow: none;
  padding: 0;
  width: 100%;
`;

export const EnemyHudStats = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 5px; 
`;

export const EnemyHudName = styled.h3`
  font-size: 0.8em;
  color: #fff;
  text-transform: uppercase;
  text-shadow: 2px 2px 4px #000;
  margin: 0;
  padding-left: 5px;
  align-self: flex-start; 
  position: relative; 
  left: auto;
  top: auto;
  transform: none;
  z-index: auto;
`;

export const EnemyHudBarContainer = styled.div`
  align-items: center;
  background-color: rgba(0, 0, 0, 0.7);
  border: 2px solid #555;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  display: flex;
  height: 25px;
  justify-content: center;
  overflow: hidden;
  position: relative;
  width: 100%;
`;

export const EnemyHudBar = styled.div<{ width: string }>`
  background-color: #e74c3c;
  height: 100%;
  left: 0;
  position: absolute;
  top: 0;
  transition: width 0.3s ease-in-out;
  z-index: 0;
  width: ${props => props.width};
`;

export const EnemyHudHpText = styled.p`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #fff;
  font-size: 0.8em;
  text-shadow: 1px 1px 2px #000;
  margin: 0;
  z-index: 1; 
`;