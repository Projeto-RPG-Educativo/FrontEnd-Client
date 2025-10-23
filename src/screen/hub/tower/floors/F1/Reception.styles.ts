import styled, { keyframes, css } from 'styled-components';

// ==================== Animations ====================

const boardPulse = keyframes`
  0% {
    transform: scale(1);
    box-shadow: 0 0 5px rgba(255, 255, 255, 0.4);
  }
  50% {
    transform: scale(1.02);
    box-shadow: 0 0 20px rgba(255, 255, 255, 0.8);
  }
  100% {
    transform: scale(1);
    box-shadow: 0 0 5px rgba(255, 255, 255, 0.4);
  }
`;

const slowGlow = keyframes`
  0%, 100% { 
    box-shadow: 0 0 5px rgba(255, 255, 255, 0.2);
  }
  50% { 
    box-shadow: 0 0 10px rgba(255, 255, 255, 0.6);
  }
`;

// ==================== Quest Board Components ====================

export const QuestBoardVisual = styled.div<{ 
    $top: string; 
    $left: string; 
    $width: string; 
    $height: string; 
    $hasNewQuest?: boolean; 
}>`
    position: absolute;
    top: ${props => props.$top};
    left: ${props => props.$left};
    width: ${props => props.$width};
    height: ${props => props.$height};
    
    background-color: transparent;
    border-radius: 5px;
    cursor: pointer;
    z-index: 20;

    display: flex;
    justify-content: center;
    align-items: center;

    transition: transform 0.3s ease-in-out, 
                box-shadow 0.3s ease-in-out,
                background-color 0.3s ease-in-out;

    animation: ${boardPulse} 3s infinite ease-in-out;

    &:hover {
        transform: scale(1.03);
        box-shadow: 0 0 25px 8px rgba(255, 255, 255, 0.8);
        background-color: rgba(255, 255, 255, 0.05);
    }

    ${props => props.$hasNewQuest && css`
        animation: ${boardPulse} 2s infinite ease-in-out;
        box-shadow: 0 0 20px 5px rgba(255, 215, 0, 0.7);
    `}
`;

export const QuestBoardHoverImage = styled.img<{ 
    $top: string; 
    $left: string; 
    $width: string; 
    $height: string; 
    $hasNewQuest?: boolean; 
}>`
    position: absolute;
    top: ${props => props.$top};
    left: ${props => props.$left};
    width: ${props => props.$width};
    height: ${props => props.$height};
    
    object-fit: cover;
    cursor: pointer;
    z-index: 20;

    opacity: 0;
    transform: scale(1);
    box-shadow: 0 0 0 rgba(255, 255, 255, 0);

    transition: opacity 0.3s ease-out, 
                transform 0.3s ease-out, 
                box-shadow 0.3s ease-out;

    &:hover {
        opacity: 1;
        transform: scale(1.03);
        box-shadow: 0 0 25px 8px rgba(255, 255, 255, 0.8);
    }

    ${props => props.$hasNewQuest && css`
        &:hover {
            animation: ${boardPulse} 2s infinite ease-in-out forwards;
            opacity: 1; 
            box-shadow: 0 0 25px 8px rgba(255, 215, 0, 0.9);
        }
    `}
`;

// ==================== Hotspot & Navigation ====================

export const HotspotArea = styled.button<{ 
    $top: string; 
    $left: string; 
    $width: string; 
    $height: string; 
}>`
    position: absolute;
    top: ${props => props.$top};
    left: ${props => props.$left};
    width: ${props => props.$width};
    height: ${props => props.$height};
    
    background: transparent;
    border: 2px solid transparent; 
    cursor: pointer;
    z-index: 20; 
    
    transition: transform 0.3s ease-in-out, 
                box-shadow 0.3s ease-in-out, 
                background-color 0.2s;

    animation: ${slowGlow} 3s infinite ease-in-out; 

    &:hover {
        background: rgba(255, 255, 255, 0.1);
        border-color: white;
        transform: scale(1.05); 
        box-shadow: 0 0 15px 5px rgba(255, 255, 255, 0.7); 
    }

    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    font-weight: bold;
`;

export const StairIcon = styled.span`
    font-size: 2em;
`;

// ==================== Modal & Cards ====================

export const FloorModal = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: rgba(10, 10, 30, 0.95);
    border: 3px solid #6495ed;
    border-radius: 10px;
    padding: 30px;
    width: 90%;
    max-width: 800px;
    max-height: 80vh;
    overflow-y: auto;
    color: white;
    z-index: 40;
    box-shadow: 0 0 25px rgba(100, 149, 237, 0.5);
    
    h2 {
        color: #ffd700;
        text-align: center;
        margin-bottom: 20px;
        font-size: 1.8em;
    }

    &::-webkit-scrollbar {
        width: 10px;
    }
    
    &::-webkit-scrollbar-track {
        background: rgba(0, 0, 0, 0.3);
        border-radius: 5px;
    }
    
    &::-webkit-scrollbar-thumb {
        background: #4682b4;
        border-radius: 5px;
    }
`;

export const QuestsContainer = styled.div`
    margin-bottom: 15px;
`;

export const QuestCard = styled.div<{ $completed?: boolean }>`
    background: ${props => props.$completed ? 'rgba(50, 100, 50, 0.9)' : 'rgba(30, 30, 50, 0.9)'};
    border: 2px solid ${props => props.$completed ? '#90ee90' : '#6495ed'};
    border-radius: 8px;
    padding: 20px;
    margin: 15px 0;
    cursor: pointer;
    transition: all 0.3s;
    
    &:hover {
        transform: translateX(5px);
        box-shadow: 0 0 15px rgba(100, 149, 237, 0.7);
    }

    h3 {
        color: #ffd700;
        margin: 0 0 10px 0;
    }

    p {
        margin: 0;
    }

    .quest-reward {
        color: #ffd700;
        font-weight: bold;
        margin-top: 10px;
    }

    .quest-progress {
        color: #90ee90;
        font-size: 0.9em;
    }
`;

export const QuestMetadata = styled.div`
    margin-top: 10px;
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
`;

export const DifficultyBadge = styled.span<{ $difficulty: string }>`
    color: ${props => {
        switch (props.$difficulty) {
            case 'easy': return '#90ee90';
            case 'medium': return '#ffd700';
            case 'hard': return '#ff6347';
            default: return '#fff';
        }
    }};
    font-weight: bold;
    font-size: 0.9em;
`;

export const TypeBadge = styled.span`
    color: #6495ed;
    font-size: 0.9em;
`;

export const StatusBadge = styled.span`
    color: #fff;
    font-size: 0.9em;
`;

// ==================== Quest Details ====================

export const QuestDetailsContent = styled.div`
    text-align: left;
    margin-bottom: 20px;
`;

export const QuestDescription = styled.p`
    font-size: 1.1em;
    margin-bottom: 15px;
`;

export const RewardsSection = styled.div`
    background: rgba(0, 0, 0, 0.3);
    padding: 15px;
    border-radius: 8px;
    margin-bottom: 15px;

    h3 {
        color: #ffd700;
        margin: 0 0 10px 0;
    }

    p {
        margin: 5px 0;
    }
`;

export const RequirementsSection = styled.div`
    background: rgba(100, 100, 0, 0.2);
    padding: 15px;
    border-radius: 8px;
    margin-bottom: 15px;

    h3 {
        color: #ffd700;
        margin: 0 0 10px 0;
    }

    p {
        margin: 5px 0;
    }
`;

export const ProgressSection = styled.div`
    margin-top: 15px;
`;

export const ProgressText = styled.p`
    color: #90ee90;
    margin: 0 0 5px 0;
`;

export const ProgressBarContainer = styled.div`
    width: 100%;
    height: 20px;
    background: rgba(0, 0, 0, 0.5);
    border-radius: 10px;
    overflow: hidden;
`;

export const ProgressBarFill = styled.div<{ $progress: number }>`
    width: ${props => props.$progress}%;
    height: 100%;
    background: linear-gradient(90deg, #90ee90, #4682b4);
    transition: width 0.3s;
`;

export const ButtonsContainer = styled.div`
    display: flex;
    gap: 10px;
    justify-content: center;
`;

// ==================== Resource Display ====================

export const ResourceDisplay = styled.div`
    display: flex;
    justify-content: space-around;
    padding: 15px;
    background: rgba(0, 0, 0, 0.3);
    border-radius: 8px;
    margin-bottom: 20px;
    
    .resource-item {
        display: flex;
        align-items: center;
        gap: 8px;
        
        .resource-icon {
            font-size: 1.5em;
        }
        
        .resource-label {
            color: #ccc;
            font-size: 0.9em;
        }
        
        .resource-value {
            color: #ffd700;
            font-weight: bold;
            font-size: 1.1em;
        }
    }
`;

// ==================== Action Buttons ====================

export const ActionButton = styled.button<{ 
    $variant?: 'primary' | 'success' | 'danger' | 'warning' 
}>`
    padding: 12px 24px;
    background: ${props => {
        switch (props.$variant) {
            case 'success': return '#28a745';
            case 'danger': return '#dc3545';
            case 'warning': return '#ffc107';
            default: return '#4682b4';
        }
    }};
    color: ${props => props.$variant === 'warning' ? '#000' : '#fff'};
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1em;
    font-weight: bold;
    transition: all 0.2s;
    margin: 5px;
    
    &:hover:not(:disabled) {
        transform: translateY(-2px);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
        filter: brightness(1.2);
    }

    &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }
`;
