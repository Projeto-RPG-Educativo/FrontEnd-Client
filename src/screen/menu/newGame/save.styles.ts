import styled, { css } from 'styled-components';

export const PanelContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

export const OptionGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export const ContentTitle = styled.h3`
  font-size: 16px;
  color: #ffcc00;
  text-shadow: 1px 1px #000;
  margin: 0;
  padding-bottom: 10px;
  border-bottom: 2px solid #5d4037;
`;

export const HorizontalButtonsWrapper = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
`;

export const OptionButton = styled.button<{ $isActive?: boolean }>`
  padding: 10px 15px;
  font-size: 12px;
  cursor: pointer;
  border: 3px solid #5d4037;
  border-radius: 5px;
  text-transform: uppercase;
  font-family: 'Press Start 2P', cursive;
  transition: all 0.2s;

  ${props => props.$isActive ?
    css`
      background-color: #4a1f1f;
      color: #ffcc00;
      border-color: #ffcc00;
    ` :
    css`
      background-color: #1a1a1a;
      color: #fff;
      &:hover {
        background-color: #2c2c2c;
        border-color: #fff;
      }
    `
  }
`;

export const OptionDescription = styled.p`
  font-family: 'Press Start 2P', cursive;
  font-size: 10px;
  color: #b0b0b0;
  text-align: center;
  margin: 8px 0 16px 0;
  line-height: 1.4;
  max-width: 400px;
  margin-left: auto;
  margin-right: auto;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.7);
`;

export const ConfirmButtonWrapper = styled.div`
  margin-top: 20px;
  width: 100%;
`;

export const ConfirmButton = styled.button`
  width: 100%;
  padding: 15px;
  font-size: 14px;
  cursor: pointer;
  border-radius: 5px;
  text-transform: uppercase;
  font-family: 'Press Start 2P', cursive;
  transition: all 0.2s;
  
  &:disabled {
    background-color: #3e3e3e;
    border: 3px solid #5a5a5a;
    color: #777;
    cursor: not-allowed;
  }
  
  &:not(:disabled) {
    background-color: #4a1f1f;
    border: 3px solid #5d4037;
    color: #fff;
    &:hover {
      filter: brightness(1.2);
    }
  }
`;

export const ErrorMessage = styled.p`
  color: red;
  text-align: center;
`;
