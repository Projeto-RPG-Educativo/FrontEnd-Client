import styled from 'styled-components';
import type { QuestStatus } from '../../../../types';

export const JournalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.85);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  overflow-y: auto;
  padding: 1rem;
  box-sizing: border-box;
`;

export const JournalContainer = styled.div`
  width: 95%;
  max-width: 1100px;
  max-height: 85vh;
  margin: auto;
  padding: 2rem;
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  border-radius: 12px;
  border: 2px solid rgba(255, 215, 0, 0.3);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.8);
  position: relative;
  overflow-y: auto;
  box-sizing: border-box;
  
  /* Scrollbar personalizada */
  &::-webkit-scrollbar {
    width: 8px;
  }
  
  &::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.3);
    border-radius: 4px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: rgba(255, 215, 0, 0.6);
    border-radius: 4px;
    
    &:hover {
      background: rgba(255, 215, 0, 0.8);
    }
  }
`;

export const JournalHeader = styled.div`
  text-align: center;
  margin-bottom: 2rem;
  position: relative;
  padding-top: 1rem;
`;

export const JournalTitle = styled.h1`
  font-size: 2.5rem;
  color: #ffd700;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  margin: 0;
`;

export const HeaderCloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(200, 50, 50, 0.9);
  border: 2px solid rgba(255, 215, 0, 0.5);
  color: #ffd700;
  font-size: 1.5rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10001;

  &:hover {
    background: rgba(200, 50, 50, 1);
    border-color: #ffd700;
    transform: scale(1.1);
    box-shadow: 0 4px 12px rgba(255, 215, 0, 0.4);
  }

  &:active {
    transform: scale(0.95);
  }
`;

export const TabContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  border-bottom: 2px solid #2a2a4e;
`;

export const Tab = styled.button<{ active: boolean }>`
  padding: 1rem 2rem;
  background: ${props => props.active ? '#4a4a8e' : 'transparent'};
  color: ${props => props.active ? '#fff' : '#aaa'};
  border: none;
  border-bottom: 3px solid ${props => props.active ? '#ffd700' : 'transparent'};
  font-size: 1.1rem;
  font-weight: ${props => props.active ? 'bold' : 'normal'};
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #3a3a6e;
    color: #fff;
  }
`;

export const QuestListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const QuestCard = styled.div<{ status: QuestStatus | null }>`
  background: linear-gradient(135deg, #2a2a4e 0%, #1f1f3e 100%);
  border-radius: 12px;
  padding: 1.5rem;
  border-left: 4px solid ${props => {
    if (props.status === 'in_progress') return '#4a90e2';
    if (props.status === 'completed') return '#50c878';
    return '#ffd700';
  }};
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.4);
  }
`;

export const QuestHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
`;

export const QuestTitle = styled.h2`
  font-size: 1.5rem;
  color: #ffd700;
  margin: 0 0 0.5rem 0;
`;

export const QuestType = styled.span`
  display: inline-block;
  padding: 0.3rem 0.8rem;
  background: rgba(74, 144, 226, 0.2);
  color: #4a90e2;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 500;
`;

export const QuestBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const QuestDescription = styled.p`
  color: #ccc;
  line-height: 1.6;
  margin: 0;
`;

export const ProgressBar = styled.div`
  width: 100%;
  height: 20px;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  overflow: hidden;
  margin-top: 0.5rem;
`;

export const ProgressFill = styled.div<{ percent: number; isNearComplete: boolean }>`
  height: 100%;
  width: ${props => props.percent}%;
  background: ${props => {
    if (props.percent >= 100) return 'linear-gradient(90deg, #50c878 0%, #3da35d 100%)';
    if (props.isNearComplete) return 'linear-gradient(90deg, #ffd700 0%, #ffed4e 100%)';
    return 'linear-gradient(90deg, #4a90e2 0%, #357abd 100%)';
  }};
  transition: width 0.5s ease;
  box-shadow: ${props => props.isNearComplete ? '0 0 10px rgba(255, 215, 0, 0.5)' : 'none'};
`;

export const ProgressText = styled.p`
  color: #aaa;
  font-size: 0.9rem;
  margin: 0.5rem 0 0 0;
  text-align: right;
`;

export const RewardSection = styled.div`
  display: flex;
  gap: 1.5rem;
  padding-top: 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
`;

export const RewardItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #ffd700;
  font-weight: 600;

  span {
    font-size: 1.2rem;
  }
`;

export const QuestActions = styled.div`
  display: flex;
  gap: 1rem;
`;

export const ActionButton = styled.button<{ variant?: 'primary' | 'danger' }>`
  padding: 0.6rem 1.2rem;
  background: ${props => props.variant === 'danger' ? '#e74c3c' : '#4a90e2'};
  color: white;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${props => props.variant === 'danger' ? '#c0392b' : '#357abd'};
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.98);
  }
`;

export const EmptyState = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  color: #888;
  font-size: 1.2rem;
`;

export const LoadingState = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  color: #ffd700;
  font-size: 1.2rem;
  animation: pulse 1.5s ease-in-out infinite;

  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }
`;
