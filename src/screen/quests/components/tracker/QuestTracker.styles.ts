import styled from 'styled-components';

export const TrackerContainer = styled.div<{ $collapsed: boolean }>`
  position: fixed;
  top: 20px;
  right: 20px;
  width: 350px;
  max-height: ${props => props.$collapsed ? 'auto' : '70vh'};
  background: rgba(26, 26, 46, 0.95);
  border: 2px solid rgba(255, 215, 0, 0.5);
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(10px);
  overflow: hidden;
  z-index: 100;
  transition: all 0.3s ease;

  @media (max-width: 768px) {
    width: 280px;
    top: 10px;
    right: 10px;
  }
`;

export const TrackerHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.2rem;
  background: rgba(0, 0, 0, 0.3);
  border-bottom: 1px solid rgba(255, 215, 0, 0.3);
  cursor: pointer;
  user-select: none;
  transition: background 0.2s ease;

  &:hover {
    background: rgba(0, 0, 0, 0.4);
  }
`;

export const TrackerTitle = styled.h3`
  font-size: 1rem;
  color: #ffd700;
  margin: 0;
  font-weight: 600;
`;

export const ToggleButton = styled.button<{ $collapsed: boolean }>`
  background: transparent;
  border: none;
  color: #ffd700;
  font-size: 1rem;
  cursor: pointer;
  padding: 0.2rem;
  transition: transform 0.3s ease;
  transform: ${props => props.$collapsed ? 'rotate(0deg)' : 'rotate(180deg)'};

  &:hover {
    transform: ${props => props.$collapsed ? 'rotate(0deg) scale(1.2)' : 'rotate(180deg) scale(1.2)'};
  }
`;

export const QuestList = styled.div`
  padding: 0.5rem;
  max-height: calc(70vh - 60px);
  overflow-y: auto;

  /* Scrollbar personalizada */
  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.2);
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(255, 215, 0, 0.5);
    border-radius: 3px;

    &:hover {
      background: rgba(255, 215, 0, 0.7);
    }
  }
`;

export const QuestItem = styled.div`
  padding: 1rem;
  margin: 0.5rem;
  background: rgba(42, 42, 78, 0.6);
  border-left: 3px solid #4a90e2;
  border-radius: 8px;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(42, 42, 78, 0.8);
    transform: translateX(-3px);
    border-left-color: #ffd700;
  }
`;

export const QuestItemHeader = styled.div`
  margin-bottom: 0.5rem;
`;

export const QuestItemTitle = styled.h4<{ nearComplete: boolean }>`
  font-size: 0.9rem;
  color: ${props => props.nearComplete ? '#ffd700' : '#fff'};
  margin: 0;
  font-weight: 600;
  animation: ${props => props.nearComplete ? 'pulse 2s ease-in-out infinite' : 'none'};

  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.7; }
  }
`;

export const QuestProgress = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
`;

export const ProgressBarMini = styled.div`
  width: 100%;
  height: 8px;
  background: rgba(0, 0, 0, 0.4);
  border-radius: 4px;
  overflow: hidden;
`;

export const ProgressFillMini = styled.div<{
  percent: number;
  nearComplete: boolean;
  completed: boolean;
}>`
  height: 100%;
  width: ${props => Math.min(props.percent, 100)}%;
  background: ${props => {
    if (props.completed) return 'linear-gradient(90deg, #50c878 0%, #3da35d 100%)';
    if (props.nearComplete) return 'linear-gradient(90deg, #ffd700 0%, #ffed4e 100%)';
    return 'linear-gradient(90deg, #4a90e2 0%, #357abd 100%)';
  }};
  transition: width 0.5s ease;
  box-shadow: ${props => props.nearComplete ? '0 0 8px rgba(255, 215, 0, 0.6)' : 'none'};
`;

export const ProgressTextMini = styled.p<{ nearComplete: boolean }>`
  font-size: 0.75rem;
  color: ${props => props.nearComplete ? '#ffd700' : '#aaa'};
  margin: 0;
  font-weight: ${props => props.nearComplete ? '600' : 'normal'};
`;

export const EmptyMessage = styled.div`
  padding: 2rem 1rem;
  text-align: center;
  color: #888;
  font-size: 0.9rem;

  small {
    display: block;
    margin-top: 0.5rem;
    font-size: 0.8rem;
    color: #666;
  }
`;

export const CollapsedIndicator = styled.div`
  padding: 0.5rem 1.2rem;
  text-align: center;
  color: #aaa;
  font-size: 0.85rem;
  background: rgba(0, 0, 0, 0.2);
`;
