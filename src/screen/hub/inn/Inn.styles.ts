// src/Screen/Hub/components/Home/HomeStyle.ts
import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(-20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const pulse = keyframes`
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.02); }
`;

export const InnContainer = styled.div<{ $backgroundImage: string }>`
  position: relative;
  width: 100vw;
  height: 100vh;
  background-image: url(${props => props.$backgroundImage});
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  /* Overlay escuro */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    z-index: 1;
  }
`;

export const BackButton = styled.button`
  position: absolute;
  top: 20px;
  left: 20px;
  padding: 12px 24px;
  background: rgba(0, 0, 0, 0.8);
  color: #fff;
  border: 2px solid #8b4513;
  border-radius: 8px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 100;

  &:hover {
    background: rgba(139, 69, 19, 0.9);
    border-color: #d2691e;
    transform: scale(1.05);
    box-shadow: 0 0 15px rgba(139, 69, 19, 0.5);
  }
`;

export const InnPanel = styled.div`
  position: relative;
  z-index: 10;
  background: rgba(10, 10, 30, 0.95);
  border: 4px solid #8b4513;
  border-radius: 15px;
  padding: 40px;
  max-width: 900px;
  width: 90%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 0 30px rgba(139, 69, 19, 0.7);
  animation: ${fadeIn} 0.5s ease-out;

  /* Scrollbar personalizada */
  &::-webkit-scrollbar {
    width: 10px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.3);
    border-radius: 5px;
  }

  &::-webkit-scrollbar-thumb {
    background: #8b4513;
    border-radius: 5px;
  }
`;

export const InnTitle = styled.h1`
  color: #ffd700;
  font-size: 36px;
  text-align: center;
  text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.8);
  margin-bottom: 20px;
`;

export const InnDescription = styled.p`
  color: #ccc;
  font-size: 18px;
  text-align: center;
  line-height: 1.6;
  margin-bottom: 30px;

  strong {
    color: #ffd700;
  }
`;

export const SaveSlotsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-top: 20px;
`;

export const SaveSlot = styled.div<{ $isSelected: boolean }>`
  background: ${props => props.$isSelected 
    ? 'rgba(74, 144, 226, 0.2)' 
    : 'rgba(0, 0, 0, 0.6)'};
  border: 3px solid ${props => props.$isSelected ? '#4a90e2' : '#555'};
  border-radius: 12px;
  padding: 20px;
  transition: all 0.3s ease;
  animation: ${props => props.$isSelected ? pulse : 'none'} 1s infinite;

  &:hover {
    border-color: #4a90e2;
    background: rgba(74, 144, 226, 0.1);
    transform: translateY(-5px);
    box-shadow: 0 5px 20px rgba(74, 144, 226, 0.3);
  }
`;

export const SlotHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
`;

export const SlotName = styled.h3`
  color: #ffd700;
  font-size: 20px;
  margin: 0;
`;

export const SlotInfo = styled.p`
  color: #ccc;
  font-size: 14px;
  line-height: 1.5;
  margin-bottom: 15px;
`;

export const SaveButton = styled.button`
  width: 100%;
  padding: 12px;
  background: linear-gradient(135deg, #4a90e2, #357abd);
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover:not(:disabled) {
    background: linear-gradient(135deg, #357abd, #2d5f8d);
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(74, 144, 226, 0.4);
  }

  &:disabled {
    background: #555;
    cursor: not-allowed;
    opacity: 0.6;
  }
`;

export const SuccessMessage = styled.div`
  background: rgba(76, 175, 80, 0.2);
  border: 2px solid #4caf50;
  border-radius: 8px;
  padding: 15px;
  color: #4caf50;
  text-align: center;
  margin: 20px 0;
  font-weight: bold;
  animation: ${fadeIn} 0.3s ease-out;
`;

export const ErrorMessage = styled.div`
  background: rgba(244, 67, 54, 0.2);
  border: 2px solid #f44336;
  border-radius: 8px;
  padding: 15px;
  color: #f44336;
  text-align: center;
  margin: 20px 0;
  font-weight: bold;
  animation: ${fadeIn} 0.3s ease-out;
`;

export const LoadingSpinner = styled.div`
  text-align: center;
  color: #4a90e2;
  font-size: 24px;
  font-weight: bold;
  padding: 30px;
  animation: ${pulse} 1s infinite;
`;

export const WelcomeMessage = styled.h3`
 color: '#ffd700', 
 marginTop: '20px'
`;