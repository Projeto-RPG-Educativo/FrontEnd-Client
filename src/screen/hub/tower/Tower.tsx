// src/components/Hub/Zones/TowerScreen.tsx (ATUALIZADO)

import React, { useState } from 'react';
import { type Player } from '../../..//types';
import { FloorContainer, NavArrow, BackButton } from './Tower.styles';
import { TOWER_IMAGES, type TowerImages} from '../../../constants/assets/TowerAssets'; // ✅ Usar sistema de assets

// --- Importa os Componentes de Andar ---
import Reception from './floors/F1/Reception'; 
import Training from './floors/F2/Training'; 
import ClassRoom from './floors/F3/ClassRoom'; 
import Laboratory from './floors/F4/Laboratory'; 
import TowerMasterRoom from './floors/F5/TowerMasterRoom'; 

// Mapeamento FINAL de Imagens e Conteúdo usando o sistema de assets
const FLOOR_DATA = [
    { 
        name: 'Sala de Pesquisa (1º Andar)', 
        image: TOWER_IMAGES.Reception,  // ✅ Usando sistema tipado
        component: 'RECEPTION' as const 
    }, 
    { 
        name: 'Laboratório de Expressões (2º Andar)', 
        image: TOWER_IMAGES.Training,  // ✅ Usando sistema tipado
        component: 'TRAINING' as const 
    }, 
    { 
        name: 'Câmara de Upgrades (3º Andar)', 
        image: TOWER_IMAGES.ClassRoom,     // ✅ Usando sistema tipado
        component: 'SEARCH' as const 
    }, 
    { 
        name: 'Sala de Recuperação (4º Andar)', 
        image: TOWER_IMAGES.Laboratory,    // ✅ Usando sistema tipado
        component: 'POTION' as const 
    }, 
    { 
        name: 'Câmara do Mestre (5º Andar)', 
        image: TOWER_IMAGES.TowerMasterRoom, // ✅ Usando sistema tipado
        component: 'GUILD_MASTER' as const 
    }, 
];

type FloorComponentType = typeof FLOOR_DATA[number]['component'];

// --- Interfaces de Props ---
interface TowerScreenProps {
    onBack: () => void;
    player: Player | null;
    onUpgradeStat: (stat: 'intelligence' | 'vigor') => void;
    onRecoverStatus: (cost: number) => void;
    onLearnAbility: (abilityId: string) => void; 
}

const Tower: React.FC<TowerScreenProps> = ({ 
    onBack, 
    player, 
    onUpgradeStat, 
    onRecoverStatus, 
    onLearnAbility 
}) => {
    
    const [currentFloorIndex, setCurrentFloorIndex] = useState(0);
    const totalFloors = FLOOR_DATA.length;
    const currentFloor = FLOOR_DATA[currentFloorIndex];

    const goToFloor = (direction: 'up' | 'down') => {
        let newIndex = currentFloorIndex;
        if (direction === 'up') {
            newIndex = Math.min(currentFloorIndex + 1, totalFloors - 1);
        } else {
            newIndex = Math.max(currentFloorIndex - 1, 0);
        }
        setCurrentFloorIndex(newIndex);
    };
    
    // Props comuns e de ação que serão espalhadas para os andares
    const commonProps = { player };
    const actionProps = { onUpgradeStat, onRecoverStatus, onLearnAbility };

    // Função para lidar com erros de carregamento das imagens
    const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
        console.warn('❌ Falha ao carregar imagem do andar:', currentFloor.image);
        // Fallback para recepção
        e.currentTarget.src = TOWER_IMAGES.Reception;
    };

    // RENDERIZAÇÃO DO COMPONENTE REAL DE CADA ANDAR
    const renderFloorComponent = (componentType: FloorComponentType) => {
        switch (componentType) {
            case 'RECEPTION': 
                return <Reception {...commonProps} onGoToNextFloor={() => goToFloor('up')} />;
            case 'TRAINING': 
                return <Training {...commonProps} {...actionProps} onGoToNextFloor={() => goToFloor('up')} onGoToPreviousFloor={() => goToFloor('down')} />;
            case 'SEARCH': 
                return <ClassRoom {...commonProps} {...actionProps} onGoToNextFloor={() => goToFloor('up')} onGoToPreviousFloor={() => goToFloor('down')} />;
            case 'POTION': 
                return <Laboratory {...commonProps} {...actionProps}  onGoToNextFloor={() => goToFloor('up')} onGoToPreviousFloor={() => goToFloor('down')}/>;
            case 'GUILD_MASTER': 
                return <TowerMasterRoom {...commonProps} onGoToPreviousFloor={() => goToFloor('down')}/>;
            default:
                return <h2>Andar em Construção.</h2>;
        }
    };

    return (
        <FloorContainer $backgroundImage={currentFloor.image}>
            
            {/* Botão de Voltar ao Hub Central */}
            <BackButton $position="bottom" onClick={onBack}>
                [ Voltar ao Central ]
            </BackButton>

            {/* Renderiza o componente específico do andar */}
            {renderFloorComponent(currentFloor.component)}

            {/* Seta para Cima */}
            {currentFloorIndex < totalFloors - 1  && (
                <NavArrow $position="top" onClick={() => goToFloor('up')}>
                    ▲ Subir para o {FLOOR_DATA[currentFloorIndex + 1].name}
                </NavArrow>
            )}

            {/* Seta para Baixo */}
            {currentFloorIndex > 0 && (
                <NavArrow $position="bottom" onClick={() => goToFloor('down')}>
                    ▼ Descer para o {FLOOR_DATA[currentFloorIndex - 1].name}
                </NavArrow>
            )}
            
        </FloorContainer>
    );
};

export default Tower;