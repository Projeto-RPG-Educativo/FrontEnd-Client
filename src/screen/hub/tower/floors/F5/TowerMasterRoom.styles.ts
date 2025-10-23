import styled, { keyframes } from 'styled-components';

// Animations
const pulse = keyframes`
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.1); }
`;

// Hotspot & Navigation Components
export const HotspotArea = styled.div<{ 
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
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
    border-radius: 12px;

    &:hover {
        background: rgba(255, 255, 255, 0.1);
        transform: scale(1.05);
    }
`;

export const StairIcon = styled.span`
    font-size: 2em;
`;

export const GuildMasterIcon = styled.span`
    font-size: 2em;
`;

export const AchievementsIcon = styled.span`
    font-size: 2em;
`;

// Modal Components
export const FloorModal = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: rgba(20, 20, 40, 0.98);
    border: 3px solid #4682b4;
    border-radius: 20px;
    padding: 30px;
    max-width: 90%;
    max-height: 85vh;
    overflow-y: auto;
    z-index: 1000;
    box-shadow: 0 0 30px rgba(70, 130, 180, 0.5);

    h2 {
        text-align: center;
        color: #ffd700;
        margin-bottom: 20px;
        font-size: 2em;
        text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
    }

    h3 {
        margin-bottom: 10px;
    }
`;

export const ModalDescription = styled.p`
    text-align: center;
    color: #ccc;
    margin-bottom: 20px;
`;

export const EmptyMessage = styled.p`
    text-align: center;
    color: #ccc;
    padding: 40px;
`;

// Resource Display
export const ResourceDisplay = styled.div`
    display: flex;
    justify-content: center;
    gap: 30px;
    margin-bottom: 20px;
    padding: 15px;
    background: rgba(0, 0, 0, 0.3);
    border-radius: 12px;
    flex-wrap: wrap;

    .resource-item {
        display: flex;
        align-items: center;
        gap: 10px;
    }

    .resource-icon {
        font-size: 1.5em;
    }

    .resource-label {
        font-size: 0.9em;
        color: #ccc;
    }

    .resource-value {
        font-size: 1.2em;
        font-weight: bold;
        color: #ffd700;
    }
`;

// Filters
export const FiltersContainer = styled.div`
    display: flex;
    gap: 10px;
    justify-content: center;
    margin-bottom: 20px;
    flex-wrap: wrap;
`;

// Quest List
export const QuestsContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 15px;
    max-height: 400px;
    overflow-y: auto;
    padding: 10px;
`;

export const QuestCard = styled.div`
    background: linear-gradient(135deg, rgba(50, 50, 80, 0.5), rgba(30, 30, 60, 0.5));
    border: 2px solid #4682b4;
    border-radius: 12px;
    padding: 20px;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
        transform: translateY(-5px);
        box-shadow: 0 5px 20px rgba(70, 130, 180, 0.3);
        border-color: #ffd700;
    }

    h3 {
        color: #ffd700;
        margin-bottom: 10px;
    }
`;

export const QuestHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
`;

export const QuestInfo = styled.div`
    flex: 1;
`;

export const QuestDescription = styled.p`
    font-size: 0.9em;
    margin-bottom: 10px;
`;

export const QuestStatusIcon = styled.div`
    font-size: 2.5em;
    margin-left: 15px;
`;

export const QuestBadges = styled.div`
    display: flex;
    gap: 10px;
    margin-top: 10px;
`;

export const QuestBadge = styled.span`
    padding: 5px 10px;
    border-radius: 5px;
    background: rgba(0, 0, 0, 0.3);
    font-size: 0.85em;
`;

export const DifficultyBadge = styled.span<{ $difficulty: string }>`
    padding: 5px 10px;
    border-radius: 5px;
    background: ${props => {
        switch (props.$difficulty) {
            case 'hard': return '#ffd700';
            case 'extreme': return '#ff6347';
            case 'nightmare': return '#8b008b';
            default: return '#fff';
        }
    }};
    color: #000;
    font-size: 0.85em;
    font-weight: bold;
`;

export const ProgressSection = styled.div`
    margin-top: 10px;
`;

export const ProgressHeader = styled.div`
    display: flex;
    justify-content: space-between;
    font-size: 0.85em;
    margin-bottom: 5px;
`;

export const ProgressBarContainer = styled.div`
    width: 100%;
    height: 8px;
    background: rgba(0, 0, 0, 0.5);
    border-radius: 4px;
    overflow: hidden;
`;

export const ProgressBarFill = styled.div<{ $progress: number }>`
    width: ${props => props.$progress}%;
    height: 100%;
    background: #ffd700;
    transition: width 0.3s ease;
`;

// Quest Details Modal Components
export const QuestDetailsHeader = styled.div`
    text-align: center;
    margin-bottom: 20px;
`;

export const QuestTypeIcon = styled.div`
    font-size: 4em;
    margin-bottom: 10px;
`;

export const QuestDifficultyBadge = styled.span<{ $difficulty: string }>`
    padding: 8px 15px;
    border-radius: 8px;
    background: ${props => {
        switch (props.$difficulty) {
            case 'hard': return '#ffd700';
            case 'extreme': return '#ff6347';
            case 'nightmare': return '#8b008b';
            default: return '#fff';
        }
    }};
    color: #000;
    font-size: 0.9em;
    font-weight: bold;
    display: inline-block;
    margin-top: 10px;
`;

export const QuestDetailsDescription = styled.p`
    text-align: center;
    font-size: 1.1em;
    margin-bottom: 20px;
    color: #ccc;
`;

export const RequirementsSection = styled.div<{ $locked: boolean }>`
    background: ${props => props.$locked 
        ? 'rgba(100, 0, 0, 0.2)' 
        : 'rgba(0, 100, 0, 0.2)'
    };
    padding: 15px;
    border-radius: 8px;
    margin-bottom: 15px;

    h3 {
        color: #ffd700;
        margin-bottom: 10px;
    }

    p {
        margin: 5px 0;
    }
`;

export const RequirementStatus = styled.span<{ $met: boolean }>`
    color: ${props => props.$met ? '#90ee90' : '#ff6347'};
    margin-left: 10px;
`;

export const ObjectivesSection = styled.div`
    background: rgba(70, 130, 180, 0.2);
    padding: 15px;
    border-radius: 8px;
    margin-bottom: 15px;

    h3 {
        color: #4682b4;
        margin-bottom: 10px;
    }

    p {
        margin-left: 10px;
        font-size: 0.95em;
    }
`;

export const ProgressDetailsSection = styled.div`
    background: rgba(255, 215, 0, 0.2);
    padding: 15px;
    border-radius: 8px;
    margin-bottom: 15px;

    h3 {
        color: #ffd700;
        margin-bottom: 10px;
    }
`;

export const ProgressStats = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
`;

export const ProgressBarLarge = styled.div`
    width: 100%;
    height: 20px;
    background: rgba(0, 0, 0, 0.5);
    border-radius: 10px;
    overflow: hidden;
`;

export const ProgressBarLargeFill = styled.div<{ $progress: number }>`
    width: ${props => props.$progress}%;
    height: 100%;
    background: linear-gradient(90deg, #ffd700, #ff6347);
    transition: width 0.3s ease;
`;

export const RewardsSection = styled.div`
    background: rgba(255, 215, 0, 0.2);
    padding: 15px;
    border-radius: 8px;
    margin-bottom: 20px;

    h3 {
        color: #ffd700;
        margin-bottom: 10px;
    }

    p {
        margin: 5px 0;
    }
`;

export const SpecialReward = styled.p`
    color: #90ee90;
`;

export const TitleReward = styled.p`
    color: #ffd700;
    font-weight: bold;
`;

export const ButtonsContainer = styled.div`
    display: flex;
    gap: 10px;
    justify-content: center;
`;

// Achievements Components
export const CurrentTitleSection = styled.div`
    background: rgba(255, 215, 0, 0.2);
    padding: 20px;
    border-radius: 12px;
    margin-bottom: 20px;
    text-align: center;
`;

export const TitleIcon = styled.div`
    font-size: 3em;
    margin-bottom: 10px;
`;

export const TitleLabel = styled.h3`
    color: #ffd700;
    margin-bottom: 10px;
`;

export const CurrentTitle = styled.p`
    font-size: 1.2em;
    font-weight: bold;
`;

export const AchievementsContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    max-height: 400px;
    overflow-y: auto;
    padding: 10px;
`;

export const AchievementCard = styled.div<{ $unlocked: boolean }>`
    background: ${props => props.$unlocked 
        ? 'rgba(0, 100, 0, 0.2)' 
        : 'rgba(50, 50, 50, 0.3)'
    };
    padding: 15px;
    border-radius: 8px;
    border: 2px solid ${props => props.$unlocked ? '#90ee90' : '#666'};
    opacity: ${props => props.$unlocked ? 1 : 0.6};
`;

export const AchievementTitle = styled.p`
    font-size: 1.5em;
    margin-bottom: 5px;
`;

export const AchievementDescription = styled.p`
    font-size: 0.9em;
    color: #ccc;
`;

export const ProgressSummary = styled.div`
    margin-top: 20px;
    text-align: center;
    padding: 15px;
    background: rgba(0, 0, 0, 0.3);
    border-radius: 8px;

    p {
        font-size: 1.2em;
        color: #ffd700;
    }
`;

// Action Button
export const ActionButton = styled.button<{ $variant?: 'primary' | 'success' | 'danger'; disabled?: boolean }>`
    padding: 12px 24px;
    font-size: 1em;
    font-weight: bold;
    border: 2px solid;
    border-radius: 8px;
    cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
    transition: all 0.3s ease;
    opacity: ${props => props.disabled ? 0.5 : 1};

    ${props => {
        if (props.$variant === 'success') {
            return `
                background: linear-gradient(135deg, #228b22, #32cd32);
                border-color: #90ee90;
                color: white;

                &:hover:not(:disabled) {
                    background: linear-gradient(135deg, #32cd32, #228b22);
                    box-shadow: 0 0 15px rgba(144, 238, 144, 0.5);
                    transform: translateY(-2px);
                }
            `;
        } else if (props.$variant === 'danger') {
            return `
                background: linear-gradient(135deg, #dc143c, #ff6347);
                border-color: #ff6347;
                color: white;

                &:hover:not(:disabled) {
                    background: linear-gradient(135deg, #ff6347, #dc143c);
                    box-shadow: 0 0 15px rgba(255, 99, 71, 0.5);
                    transform: translateY(-2px);
                }
            `;
        } else {
            return `
                background: linear-gradient(135deg, #1e3a5f, #4682b4);
                border-color: #4682b4;
                color: white;

                &:hover:not(:disabled) {
                    background: linear-gradient(135deg, #4682b4, #1e3a5f);
                    box-shadow: 0 0 15px rgba(70, 130, 180, 0.5);
                    transform: translateY(-2px);
                }
            `;
        }
    }}
`;
