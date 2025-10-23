import styled, { keyframes } from 'styled-components';

// ==================== Animations ====================

const slowGlow = keyframes`
  0%, 100% { 
    box-shadow: 0 0 5px rgba(255, 255, 255, 0.2);
  }
  50% { 
    box-shadow: 0 0 10px rgba(255, 255, 255, 0.6);
  }
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

export const TrainerIcon = styled.span`
    font-size: 2em;
`;

// ==================== Modal ====================

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

export const ModalDescription = styled.p`
    text-align: center;
    color: #ccc;
    margin-bottom: 20px;
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

// ==================== Filters ====================

export const FiltersContainer = styled.div`
    display: flex;
    gap: 10px;
    justify-content: center;
    margin-bottom: 20px;
`;

// ==================== Skills Grid ====================

export const SkillsGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 15px;
    max-height: 60vh;
    overflow-y: auto;
    padding: 10px;
    
    &::-webkit-scrollbar {
        width: 8px;
    }
    
    &::-webkit-scrollbar-track {
        background: rgba(0, 0, 0, 0.3);
    }
    
    &::-webkit-scrollbar-thumb {
        background: #4682b4;
        border-radius: 4px;
    }
`;

export const SkillCard = styled.div<{ $owned?: boolean }>`
    background: ${props => props.$owned ? 'rgba(50, 100, 50, 0.9)' : 'rgba(30, 30, 50, 0.9)'};
    border: 2px solid ${props => props.$owned ? '#90ee90' : '#6495ed'};
    border-radius: 8px;
    padding: 15px;
    margin: 10px;
    cursor: ${props => props.$owned ? 'default' : 'pointer'};
    transition: all 0.3s;
    min-width: 200px;
    
    &:hover {
        ${props => !props.$owned && `
            transform: scale(1.05);
            box-shadow: 0 0 15px rgba(100, 149, 237, 0.7);
        `}
    }

    h3 {
        color: #fff;
        margin: 0 0 10px 0;
        font-size: 1.1em;
    }

    p {
        color: #ccc;
        font-size: 0.9em;
        margin: 5px 0;
    }

    .skill-cost {
        color: #ffd700;
        font-weight: bold;
        margin-top: 10px;
    }
`;

export const SkillTypeContainer = styled.div`
    margin-top: 10px;
`;

export const SkillTypeBadge = styled.p<{ $type: 'active' | 'passive' }>`
    color: ${props => props.$type === 'active' ? '#ff6347' : '#90ee90'};
    font-size: 0.9em;
    margin: 0;
`;

export const SkillRequirement = styled.p`
    color: #ccc;
    font-size: 0.85em;
    margin-top: 5px;
`;

export const SkillOwnedBadge = styled.p`
    color: #90ee90;
    font-weight: bold;
    margin-top: 10px;
`;

export const SkillSpecialEffect = styled.p`
    color: #ffd700;
    margin: 5px 0;
`;

// ==================== Skill Details ====================

export const SkillIconContainer = styled.div`
    text-align: center;
    font-size: 3em;
    margin: 20px 0;
`;

export const SkillDetailsContent = styled.div`
    text-align: left;
    margin-bottom: 20px;
`;

export const SkillDetailDescription = styled.p`
    font-size: 1.1em;
    margin-bottom: 15px;
    text-align: center;
`;

export const EffectsSection = styled.div`
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

export const RequirementsSection = styled.div<{ $canAfford?: boolean }>`
    background: ${props => props.$canAfford 
        ? 'rgba(0, 100, 0, 0.2)' 
        : 'rgba(100, 0, 0, 0.2)'};
    padding: 15px;
    border-radius: 8px;

    h3 {
        color: #ffd700;
        margin: 0 0 10px 0;
    }

    p {
        margin: 5px 0;
    }
`;

export const RequirementStatus = styled.span<{ $met?: boolean }>`
    color: ${props => props.$met ? '#90ee90' : '#ff6347'};
`;

export const ButtonsContainer = styled.div`
    display: flex;
    gap: 10px;
    justify-content: center;
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
