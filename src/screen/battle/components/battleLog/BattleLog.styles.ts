import styled, { keyframes } from 'styled-components';

const slideIn = keyframes`
  from {
    opacity: 0;
    transform: translateX(-10px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

export const BattleLogContainer = styled.div`
  background: linear-gradient(135deg, rgba(20, 20, 40, 0.95) 0%, rgba(30, 30, 50, 0.95) 100%);
  border: 2px solid rgba(100, 100, 150, 0.5);
  border-radius: 12px;
  width: 320px;
  height: 100%;
  display: flex;
  flex-direction: column;
  box-shadow: 
    0 4px 20px rgba(0, 0, 0, 0.5),
    inset 0 0 20px rgba(100, 100, 200, 0.1);
  backdrop-filter: blur(10px);
`;

export const LogHeader = styled.div`
  background: linear-gradient(135deg, rgba(50, 50, 80, 0.8) 0%, rgba(40, 40, 70, 0.8) 100%);
  padding: 12px 16px;
  border-bottom: 2px solid rgba(100, 100, 150, 0.5);
  border-radius: 10px 10px 0 0;
`;

export const LogTitle = styled.h3`
  margin: 0;
  font-size: 18px;
  font-weight: bold;
  color: #ffd700;
  text-shadow: 
    0 0 10px rgba(255, 215, 0, 0.6),
    1px 1px 2px rgba(0, 0, 0, 0.8);
  text-align: center;
`;

export const LogContent = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;

  /* Custom scrollbar */
  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(20, 20, 40, 0.5);
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(100, 100, 150, 0.6);
    border-radius: 4px;
    
    &:hover {
      background: rgba(100, 100, 150, 0.8);
    }
  }
`;

export const EmptyLog = styled.div`
  color: rgba(200, 200, 220, 0.6);
  text-align: center;
  padding: 40px 20px;
  font-style: italic;
  font-size: 14px;
`;

interface LogEntryProps {
  $actor: 'player' | 'monster' | 'system';
  $type: string;
}

export const LogEntry = styled.div<LogEntryProps>`
  display: flex;
  gap: 10px;
  padding: 10px 12px;
  border-radius: 8px;
  background: ${({ $actor }) => {
    if ($actor === 'player') return 'rgba(50, 100, 200, 0.15)';
    if ($actor === 'monster') return 'rgba(200, 50, 50, 0.15)';
    return 'rgba(100, 100, 100, 0.1)';
  }};
  border-left: 3px solid ${({ $actor }) => {
    if ($actor === 'player') return '#4a90e2';
    if ($actor === 'monster') return '#e74c3c';
    return '#95a5a6';
  }};
  animation: ${slideIn} 0.3s ease-out;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ $actor }) => {
      if ($actor === 'player') return 'rgba(50, 100, 200, 0.25)';
      if ($actor === 'monster') return 'rgba(200, 50, 50, 0.25)';
      return 'rgba(100, 100, 100, 0.2)';
    }};
    transform: translateX(2px);
  }
`;

export const LogIcon = styled.span`
  font-size: 18px;
  flex-shrink: 0;
  line-height: 1.4;
`;

export const LogMessage = styled.div`
  flex: 1;
  font-size: 13px;
  line-height: 1.5;
  color: #e0e0e0;
  word-wrap: break-word;
`;

interface LogActorProps {
  $actor: 'player' | 'monster' | 'system';
}

export const LogActor = styled.span<LogActorProps>`
  font-weight: bold;
  color: ${({ $actor }) => {
    if ($actor === 'player') return '#4a90e2';
    if ($actor === 'monster') return '#e74c3c';
    return '#95a5a6';
  }};
  text-shadow: 0 0 5px ${({ $actor }) => {
    if ($actor === 'player') return 'rgba(74, 144, 226, 0.3)';
    if ($actor === 'monster') return 'rgba(231, 76, 60, 0.3)';
    return 'rgba(149, 165, 166, 0.3)';
  }};
`;

interface LogValueProps {
  $type: 'damage' | 'heal' | 'energy';
}

export const LogValue = styled.span<LogValueProps>`
  font-weight: bold;
  color: ${({ $type }) => {
    if ($type === 'damage') return '#ff4444';
    if ($type === 'heal') return '#4caf50';
    if ($type === 'energy') return '#ffd700';
    return '#ffffff';
  }};
  text-shadow: 0 0 8px ${({ $type }) => {
    if ($type === 'damage') return 'rgba(255, 68, 68, 0.6)';
    if ($type === 'heal') return 'rgba(76, 175, 80, 0.6)';
    if ($type === 'energy') return 'rgba(255, 215, 0, 0.6)';
    return 'rgba(255, 255, 255, 0.6)';
  }};
`;
