import styled from 'styled-components';

export const BoardOverlay = styled.div`
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

export const BoardContainer = styled.div`
  width: 95%;
  max-width: 1200px;
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

export const BoardHeader = styled.div`
  text-align: center;
  margin-bottom: 3rem;
  position: relative;
  padding-top: 1rem;

  p {
    color: #aaa;
    font-size: 1.1rem;
    margin-top: 0.5rem;
  }
`;

export const BoardTitle = styled.h1`
  font-size: 3rem;
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

export const QuestGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
`;

export const QuestCard = styled.div`
  background: linear-gradient(135deg, #2a2a4e 0%, #1f1f3e 100%);
  border-radius: 16px;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  border: 2px solid transparent;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);

  &:hover {
    transform: translateY(-5px);
    border-color: #ffd700;
    box-shadow: 0 8px 16px rgba(255, 215, 0, 0.3);
  }
`;

export const QuestIcon = styled.div`
  font-size: 4rem;
  margin-bottom: 0.5rem;
`;

export const QuestTitle = styled.h3`
  font-size: 1.3rem;
  color: #fff;
  text-align: center;
  margin: 0;
  min-height: 2.6rem;
`;

export const QuestDifficulty = styled.span<{ difficulty: string }>`
  padding: 0.4rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 600;
  background: ${props => {
    switch (props.difficulty) {
      case 'Difícil': return 'rgba(231, 76, 60, 0.2)';
      case 'Média': return 'rgba(241, 196, 15, 0.2)';
      case 'Fácil': return 'rgba(46, 204, 113, 0.2)';
      default: return 'rgba(149, 165, 166, 0.2)';
    }
  }};
  color: ${props => {
    switch (props.difficulty) {
      case 'Difícil': return '#e74c3c';
      case 'Média': return '#f1c40f';
      case 'Fácil': return '#2ecc71';
      default: return '#95a5a6';
    }
  }};
`;

export const QuestRewards = styled.div`
  display: flex;
  gap: 1rem;
  margin: 0.5rem 0;
`;

export const RewardBadge = styled.div`
  display: flex;
  align-items: center;
  gap: 0.3rem;
  padding: 0.4rem 0.8rem;
  background: rgba(255, 215, 0, 0.1);
  border: 1px solid rgba(255, 215, 0, 0.3);
  border-radius: 20px;
  color: #ffd700;
  font-weight: 600;
  font-size: 0.9rem;
`;

export const ViewDetailsButton = styled.button`
  width: 100%;
  padding: 0.8rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-top: auto;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
  }

  &:active {
    transform: scale(0.98);
  }
`;

export const LoadingState = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  color: #ffd700;
  font-size: 1.3rem;
  animation: pulse 1.5s ease-in-out infinite;

  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }
`;

export const EmptyState = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  color: #888;
  font-size: 1.3rem;
  line-height: 1.8;

  small {
    display: block;
    margin-top: 1rem;
    font-size: 1rem;
    color: #666;
  }
`;

// Modal Styles
export const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10100;
`;

export const ModalOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.9);
  backdrop-filter: blur(4px);
`;

export const ModalContent = styled.div`
  position: relative;
  width: 90%;
  max-width: 600px;
  max-height: 85vh;
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  border-radius: 12px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.9);
  border: 2px solid #ffd700;
  overflow-y: auto;
  max-height: 90vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  animation: slideIn 0.3s ease-out;

  @keyframes slideIn {
    from {
      opacity: 0;
      transform: scale(0.9);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 2rem;
  border-bottom: 2px solid rgba(255, 215, 0, 0.3);
  background: rgba(0, 0, 0, 0.2);
`;

export const ModalTitle = styled.h2`
  font-size: 1.8rem;
  color: #ffd700;
  margin: 0;
`;

export const CloseButton = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  border: none;
  color: #fff;
  font-size: 1.5rem;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: rotate(90deg);
  }
`;

export const ModalBody = styled.div`
  padding: 2rem;
  overflow-y: auto;
  flex: 1;
`;

export const QuestDetailSection = styled.div`
  margin-bottom: 2rem;

  &:last-child {
    margin-bottom: 0;
  }
`;

export const SectionTitle = styled.h3`
  font-size: 1.2rem;
  color: #4a90e2;
  margin: 0 0 1rem 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const QuestDescription = styled.p`
  color: #ccc;
  line-height: 1.8;
  margin: 0;
  font-size: 1rem;
`;

export const ProgressInfo = styled.p`
  color: #aaa;
  margin: 0.5rem 0;
  font-size: 1rem;

  strong {
    color: #fff;
    margin-right: 0.5rem;
  }
`;

export const RewardsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const RewardItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: rgba(255, 215, 0, 0.1);
  border-radius: 8px;
  border: 1px solid rgba(255, 215, 0, 0.3);

  span {
    font-size: 2rem;
  }

  div {
    display: flex;
    flex-direction: column;
    gap: 0.2rem;

    strong {
      color: #ffd700;
      font-size: 1.1rem;
    }

    small {
      color: #aaa;
      font-size: 0.9rem;
    }
  }
`;

export const ModalFooter = styled.div`
  display: flex;
  gap: 1rem;
  padding: 1.5rem 2rem;
  border-top: 2px solid rgba(255, 215, 0, 0.3);
  background: rgba(0, 0, 0, 0.2);
`;

export const CancelButton = styled.button`
  flex: 1;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: scale(1.05);
  }
`;

export const AcceptButton = styled.button`
  flex: 2;
  padding: 1rem;
  background: linear-gradient(135deg, #50c878 0%, #3da35d 100%);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover:not(:disabled) {
    transform: scale(1.05);
    box-shadow: 0 4px 12px rgba(80, 200, 120, 0.4);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  &:active:not(:disabled) {
    transform: scale(0.98);
  }
`;
