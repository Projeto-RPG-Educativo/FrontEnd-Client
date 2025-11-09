
// 1º Andar - Recepção: Quadro de Missões (Quests)

import React, { useState } from 'react';
import { type Player } from '../../../../../types';
import { 
    QuestBoardVisual,
    QuestBoardHoverImage,
    LoadingLabel,
    DiaryLabel
} from './Reception.styles';

import Quadro from '../../../../../assets/Images/background/hub/tower/QuadroCorte.png';
import QuestBoard from '../../../../quests/components/board/QuestBoard';
import QuestJournal from '../../../../quests/components/jornal/QuestJournal';

interface F1ReceptionProps {
    player: Player | null;
    onGoToNextFloor: () => void;
}

const Reception: React.FC<F1ReceptionProps> = ({ player }) => {
    const [showQuestBoard, setShowQuestBoard] = useState(false);
    const [showQuestJournal, setShowQuestJournal] = useState(false);

    if (!player) {
        return (
            <LoadingLabel>
                Carregando informações do jogador...
            </LoadingLabel>
        );
    }

    return (
        <>
            {/* Quadro de Missões Visual - Clique para ver missões disponíveis */}
            <QuestBoardVisual
                $top="35%" 
                $left="10%" 
                $width="20%" 
                $height="40%"
                onClick={() => setShowQuestBoard(true)}
                title="Ver Quadro de Missões (Aceitar Novas)"
            />

            <QuestBoardHoverImage
                src={Quadro}
                alt="Quadro de Missões"
                $top="25.1%" 
                $left="6%" 
                $width="30%" 
                $height="58%"
                onClick={() => setShowQuestBoard(true)}
                title="Ver Quadro de Missões (Aceitar Novas)"
            />

            {/* Área do Diário - Lado direito */}
            <QuestBoardVisual
                $top="35%" 
                $left="70%" 
                $width="20%" 
                $height="40%"
                onClick={() => setShowQuestJournal(true)}
                title="Abrir Diário de Missões"
            />
            
            {/* Texto estilizado para o Diário */}
            <DiaryLabel>
                📖<br/>Diário
            </DiaryLabel>

            {/* Mural de Missões - Aceitar novas missões */}
            {showQuestBoard && (
                <QuestBoard
                    characterId={player.id}
                    onClose={() => setShowQuestBoard(false)}
                />
            )}

            {/* Diário de Missões - Ver todas as missões */}
            {showQuestJournal && (
                <QuestJournal
                    characterId={player.id}
                    onClose={() => setShowQuestJournal(false)}
                />
            )}
        </>
    );
};

export default Reception;