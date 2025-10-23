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

export const HealingIcon = styled.span`
    font-size: 2em;
`;

export const PotionIcon = styled.span`
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

// Healing Station Components
export const StatusContainer = styled.div`
    background: rgba(0, 0, 0, 0.3);
    padding: 20px;
    border-radius: 12px;
    margin-bottom: 20px;
`;

export const StatusTitle = styled.h3`
    color: #ffd700;
    margin-bottom: 15px;
    text-align: center;
`;

export const StatBar = styled.div`
    margin-bottom: 15px;

    &:last-child {
        margin-bottom: 0;
    }
`;

export const StatBarHeader = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 5px;
`;

export const StatBarContainer = styled.div<{ $borderColor: string }>`
    width: 100%;
    height: 25px;
    background: rgba(0, 0, 0, 0.5);
    border-radius: 12px;
    overflow: hidden;
    border: 2px solid ${props => props.$borderColor};
`;

export const StatBarFill = styled.div<{ $percentage: number; $color: string }>`
    width: ${props => props.$percentage}%;
    height: 100%;
    background: ${props => props.$color};
    transition: width 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    color: ${props => props.$percentage > 50 ? '#000' : '#fff'};
`;

export const HealingOptionsContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 15px;
    margin-bottom: 20px;
`;

export const HealingOption = styled.div<{ $borderColor: string }>`
    background: rgba(${props => {
        if (props.$borderColor === '#4682b4') return '70, 130, 180';
        if (props.$borderColor === '#90ee90') return '144, 238, 144';
        return '255, 255, 255';
    }}, 0.2);
    padding: 15px;
    border-radius: 8px;
    border: 2px solid ${props => props.$borderColor};
`;

export const HealingOptionTitle = styled.h3<{ $color: string }>`
    color: ${props => props.$color};
    margin-bottom: 10px;
`;

export const HealingOptionDescription = styled.p`
    font-size: 0.9em;
    margin-bottom: 10px;
`;

// Consumables Components
export const FiltersContainer = styled.div`
    display: flex;
    gap: 10px;
    justify-content: center;
    margin-bottom: 20px;
    flex-wrap: wrap;
`;

export const ConsumablesGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 20px;
    margin-bottom: 20px;
`;

export const ConsumableCard = styled.div<{ $owned: boolean }>`
    background: ${props => props.$owned 
        ? 'linear-gradient(135deg, rgba(0, 100, 0, 0.3), rgba(0, 150, 0, 0.2))'
        : 'linear-gradient(135deg, rgba(50, 50, 80, 0.5), rgba(30, 30, 60, 0.5))'
    };
    border: 2px solid ${props => props.$owned ? '#90ee90' : '#4682b4'};
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
        margin-bottom: 10px;
        color: #ffd700;
    }

    .skill-cost {
        margin-top: 10px;
        padding-top: 10px;
        border-top: 1px solid rgba(255, 255, 255, 0.2);
        text-align: center;
        color: #ffd700;
        font-weight: bold;
    }
`;

export const ConsumableIcon = styled.div`
    font-size: 3em;
    text-align: center;
    margin-bottom: 10px;
`;

export const ConsumableDescription = styled.p`
    font-size: 0.9em;
    margin-bottom: 10px;
`;

export const ConsumableEffect = styled.p`
    margin: 5px 0;
`;

export const ConsumableSpecialEffect = styled.p`
    color: #ffd700;
    margin: 5px 0;
`;

export const ConsumableBuffEffect = styled.p`
    color: #90ee90;
    font-size: 0.85em;
    margin: 5px 0;
`;

export const ConsumableOwnedBadge = styled.p`
    color: #90ee90;
    font-weight: bold;
    margin-top: 10px;
    text-align: center;
`;

// Consumable Details Modal Components
export const ConsumableDetailsIcon = styled.div`
    font-size: 4em;
    text-align: center;
    margin-bottom: 20px;
`;

export const ConsumableDetailsDescription = styled.p`
    text-align: center;
    font-size: 1.1em;
    margin-bottom: 20px;
    color: #ccc;
`;

export const EffectsSection = styled.div`
    background: rgba(0, 0, 0, 0.3);
    padding: 15px;
    border-radius: 8px;
    margin-bottom: 20px;

    h3 {
        color: #ffd700;
        margin-bottom: 10px;
    }

    p {
        font-size: 1.1em;
        margin: 5px 0;
    }
`;

export const EffectText = styled.p<{ $color?: string }>`
    color: ${props => props.$color || 'inherit'};
`;

export const OwnedSection = styled.div`
    background: rgba(0, 100, 0, 0.2);
    padding: 15px;
    border-radius: 8px;
    margin-bottom: 20px;
    text-align: center;

    p {
        font-size: 1.2em;
        color: #90ee90;

        strong {
            font-weight: bold;
        }
    }
`;

export const PriceSection = styled.div<{ $canAfford: boolean }>`
    background: ${props => props.$canAfford 
        ? 'rgba(0, 100, 0, 0.2)' 
        : 'rgba(100, 0, 0, 0.2)'
    };
    padding: 15px;
    border-radius: 8px;
    margin-bottom: 20px;

    h3 {
        color: #ffd700;
        margin-bottom: 10px;
        text-align: center;
    }
`;

export const PlayerCoinsText = styled.p<{ $canAfford: boolean }>`
    text-align: center;
    color: ${props => props.$canAfford ? '#90ee90' : '#ff6347'};
`;

export const ButtonsContainer = styled.div`
    display: flex;
    gap: 10px;
    justify-content: center;
    flex-wrap: wrap;
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
