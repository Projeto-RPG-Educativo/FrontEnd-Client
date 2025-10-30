import styled from 'styled-components';

export const PlayerHudPanel = styled.div`
  align-items: center;
  display: flex;
  gap: 15px;
`;

export const PlayerPortrait = styled.div`
  align-items: center;
  background-color: transparent;
  background-image: url('../../assets/GoblinEstudado.png');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  border: 3px solid #8d6e63;
  border-radius: 60%;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
  display: flex;
  height: 100px;
  justify-content: center;
  width: 100px;
`;

export const PlayerStats = styled.div`
  align-items: flex-start;
  color: #fff;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const PlayerStatsName = styled.h3`
  font-size: 16px;
  margin: 0;
`;

export const PlayerStatsText = styled.p`
  font-size: 13px;
  margin: 0;
`;

export const PlayerStatsBarContainer = styled.div`
  background-color: #555;
  border: 1px solid #333;
  border-radius: 3px;
  height: 14px;
  overflow: hidden;
  width: 200px;
`;

export const HpBar = styled.div<{ width: string }>`
  background-color: #e74c3c;
  height: 100%;
  width: ${props => props.width};
`;

export const ManaBar = styled.div<{ width: string }>`
  background-color: #3498db;
  height: 100%;
  width: ${props => props.width};
`;

export const StaminaBar = styled.div<{ width: string }>`
  background-color: #f1c40f;
  height: 100%;
  width: ${props => props.width};
`;
