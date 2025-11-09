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

// ==================== Quest Book Components ====================

export const QuestBookOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.85);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    animation: fadeIn 0.3s ease-in;

    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
`;

export const QuestBookContainer = styled.div`
    position: relative;
    width: 90vw;
    max-width: 1200px;
    height: 85vh;
    max-height: 800px;
    background: linear-gradient(135deg, #8b7355 0%, #6b5644 100%);
    border-radius: 8px;
    box-shadow: 
        0 20px 60px rgba(0, 0, 0, 0.6),
        inset 0 0 20px rgba(0, 0, 0, 0.3);
    padding: 30px;
    border: 3px solid #4a3728;
`;

export const QuestBookPage = styled.div`
    display: flex;
    gap: 20px;
    height: 100%;
`;

export const LeftPage = styled.div`
    flex: 1;
    background: linear-gradient(to bottom, #f4e8d0 0%, #e8d4b0 100%);
    border-radius: 4px;
    padding: 20px;
    box-shadow: 
        inset 2px 2px 8px rgba(0, 0, 0, 0.15),
        inset -2px -2px 8px rgba(255, 255, 255, 0.3);
    border: 2px solid #c4a875;
    overflow-y: auto;
    
    &::-webkit-scrollbar {
        width: 8px;
    }

    &::-webkit-scrollbar-track {
        background: rgba(139, 115, 85, 0.2);
        border-radius: 4px;
    }

    &::-webkit-scrollbar-thumb {
        background: #8b7355;
        border-radius: 4px;
        
        &:hover {
            background: #6b5644;
        }
    }
`;

export const RightPage = styled.div`
    flex: 1;
    background: linear-gradient(to bottom, #f4e8d0 0%, #e8d4b0 100%);
    border-radius: 4px;
    padding: 20px;
    box-shadow: 
        inset 2px 2px 8px rgba(0, 0, 0, 0.15),
        inset -2px -2px 8px rgba(255, 255, 255, 0.3);
    border: 2px solid #c4a875;
    overflow-y: auto;

    &::-webkit-scrollbar {
        width: 8px;
    }

    &::-webkit-scrollbar-track {
        background: rgba(139, 115, 85, 0.2);
        border-radius: 4px;
    }

    &::-webkit-scrollbar-thumb {
        background: #8b7355;
        border-radius: 4px;
        
        &:hover {
            background: #6b5644;
        }
    }
`;

export const PageTitle = styled.h2`
    font-family: 'Georgia', serif;
    font-size: 24px;
    color: #2a1810;
    margin-bottom: 20px;
    text-align: center;
    padding-bottom: 15px;
    border-bottom: 3px double #8b7355;
`;

export const QuestList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

export const QuestItem = styled.div<{ 
    $isActive?: boolean;
    $isAvailable?: boolean;
    $isCompleted?: boolean;
    $isSelected?: boolean;
}>`
    background: ${props => {
        if (props.$isActive) return 'linear-gradient(135deg, #fff8e1 0%, #ffe082 100%)';
        if (props.$isCompleted) return 'linear-gradient(135deg, #e8f5e9 0%, #a5d6a7 100%)';
        return 'linear-gradient(135deg, #fafafa 0%, #eeeeee 100%)';
    }};
    border: 2px solid ${props => {
        if (props.$isActive) return '#f57c00';
        if (props.$isCompleted) return '#66bb6a';
        return '#8b7355';
    }};
    border-radius: 6px;
    padding: 12px;
    cursor: pointer;
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    gap: 10px;
    box-shadow: ${props => props.$isSelected ? '0 4px 8px rgba(0, 0, 0, 0.25)' : '0 2px 4px rgba(0, 0, 0, 0.15)'};
    transform: ${props => props.$isSelected ? 'scale(1.02)' : 'scale(1)'};

    &:hover {
        transform: scale(1.02);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.25);
    }

    .quest-icon {
        font-size: 24px;
        flex-shrink: 0;
    }

    .quest-info {
        flex: 1;
        font-family: 'Georgia', serif;
    }

    .quest-name {
        font-size: 14px;
        font-weight: bold;
        color: #2a1810;
        margin-bottom: 4px;
    }

    .quest-type,
    .quest-progress-mini {
        font-size: 11px;
        color: #6b5644;
    }
`;

export const QuestDetails = styled.div`
    font-family: 'Georgia', serif;
    color: #3a2817;
`;

export const QuestTitle = styled.h3`
    font-size: 20px;
    color: #2a1810;
    margin-bottom: 15px;
    text-align: center;
    padding-bottom: 10px;
    border-bottom: 2px solid #8b7355;
`;

export const QuestProgress = styled.div`
    margin: 15px 0;
    padding: 12px;
    background: rgba(139, 115, 85, 0.1);
    border-radius: 5px;

    .progress-header {
        display: flex;
        justify-content: space-between;
        margin-bottom: 8px;
        font-size: 13px;
        font-weight: bold;
        color: #3a2817;
    }

    .progress-bar {
        width: 100%;
        height: 8px;
        background: rgba(139, 115, 85, 0.3);
        border-radius: 4px;
        overflow: hidden;
        margin-bottom: 5px;
    }

    .progress-fill {
        height: 100%;
        background: linear-gradient(90deg, #f57c00 0%, #ffa726 100%);
        transition: width 0.3s ease;
        box-shadow: 0 0 8px rgba(245, 124, 0, 0.6);
    }

    .progress-percent {
        text-align: right;
        font-size: 11px;
        color: #6b5644;
        font-weight: bold;
    }
`;

export const QuestRewards = styled.div`
    margin-top: 15px;
    padding: 12px;
    background: rgba(139, 115, 85, 0.1);
    border-radius: 5px;

    .rewards-title {
        font-weight: bold;
        margin-bottom: 8px;
        color: #2a1810;
    }

    .rewards-list {
        display: flex;
        gap: 15px;
    }

    .reward-item {
        display: flex;
        align-items: center;
        gap: 5px;
        font-size: 13px;
        color: #3a2817;
        font-weight: bold;
    }

    .reward-icon {
        font-size: 16px;
    }
`;

export const QuestStatusBadge = styled.span<{ $status: 'active' | 'available' | 'completed' }>`
    padding: 4px 8px;
    border-radius: 50%;
    font-size: 12px;
    font-weight: bold;
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    background: ${props => {
        switch (props.$status) {
            case 'active': return '#f57c00';
            case 'completed': return '#66bb6a';
            default: return '#8b7355';
        }
    }};
    color: white;
`;

export const QuestTypeBadge = styled.span`
    display: inline-block;
    padding: 4px 10px;
    background: rgba(139, 115, 85, 0.3);
    border: 1px solid #8b7355;
    border-radius: 3px;
    font-size: 11px;
    font-weight: bold;
    color: #3a2817;
`;

export const ActionButtons = styled.div`
    display: flex;
    gap: 10px;
    margin-top: 20px;
    justify-content: center;
`;

export const BookButton = styled.button<{ $variant?: 'primary' | 'danger' }>`
    flex: 1;
    padding: 10px 20px;
    background: ${props => props.$variant === 'danger' 
        ? 'linear-gradient(to bottom, #ef5350 0%, #e53935 100%)'
        : 'linear-gradient(to bottom, #66bb6a 0%, #43a047 100%)'
    };
    border: 2px solid ${props => props.$variant === 'danger' ? '#c62828' : '#2e7d32'};
    border-radius: 4px;
    color: white;
    font-family: 'Georgia', serif;
    font-size: 13px;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.2s ease;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);

    &:hover:not(:disabled) {
        transform: translateY(-2px);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
    }

    &:active {
        transform: translateY(0);
    }

    &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
        transform: none;
    }
`;

export const CloseButton = styled.button`
    position: absolute;
    top: 15px;
    right: 15px;
    width: 40px;
    height: 40px;
    background: linear-gradient(to bottom, #ef5350 0%, #e53935 100%);
    border: 2px solid #c62828;
    border-radius: 50%;
    color: white;
    font-size: 20px;
    font-weight: bold;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s ease;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
    z-index: 10;

    &:hover {
        transform: rotate(90deg) scale(1.1);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.4);
    }

    &:active {
        transform: rotate(90deg) scale(1);
    }
`;

export const LoadingSpinner = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 40px;
    font-family: 'Georgia', serif;
    color: #3a2817;

    .spinner {
        width: 50px;
        height: 50px;
        border: 4px solid rgba(139, 115, 85, 0.3);
        border-top: 4px solid #8b7355;
        border-radius: 50%;
        animation: spin 1s linear infinite;
        margin-bottom: 15px;
    }

    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }

    p {
        font-size: 16px;
        font-style: italic;
    }
`;

export const ErrorMessage = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 40px;
    font-family: 'Georgia', serif;
    text-align: center;

    p {
        font-size: 16px;
        color: #c62828;
        margin-bottom: 10px;
    }

    small {
        color: #8b7355;
        display: block;
        margin-bottom: 20px;
    }
`;

// ==================== Loading & Label Styles ====================

export const LoadingLabel = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #8b7355;
    font-size: 1.2em;
    text-align: center;
`;

export const DiaryLabel = styled.div`
    position: absolute;
    top: 45%;
    left: 75%;
    transform: translate(-50%, -50%);
    font-size: 1.5em;
    font-weight: bold;
    color: #8b7355;
    text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
    cursor: pointer;
    pointer-events: none;
    text-align: center;
    user-select: none;
`;
