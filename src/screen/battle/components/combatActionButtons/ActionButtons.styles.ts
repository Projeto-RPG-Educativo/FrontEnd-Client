import styled from "styled-components";
import { getIconByAction } from "../../../../constants/assets/icons/IconsBattleAssets";

// Botões de ação
export const AbilityIconsContainer = styled.div`
  background: rgba(0, 0, 0, 0.5);
  border: 2px solid #5d4037;
  border-radius: 5px;
  display: flex;
  gap: 8px;
  padding: 5px;
`;

export const ActionIconButton = styled.button<{ 
  $action: 'skill' | 'attack' | 'defend' | 'quiz-icon';
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

  background-color: transparent;
  background-image: ${props => `url(${getIconByAction(props.$action)})`};

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