// src/pages/QuestBoardScreen/QuestBoardScreen.tsx

import React from 'react';
import styled from 'styled-components';

// --- Importe a imagem do Quadro Recortado ---
import QuestBoardImage from '../../../../../../public/Construction/QuadroCorte.png'; // Use o caminho real

// --- Estilos ---
const FullScreenContainer = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.95); /* Fundo escuro total */
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    z-index: 999; 
    color: white;
`;

const BoardImage = styled.img`
    /* Ajusta a imagem para caber na tela sem ser muito grande */
    max-width: 70%;
    max-height: 80vh;
    width: auto;
    height: auto;
    display: block;
    position: relative; /* Para posicionar o conteúdo ABSOLUTAMENTE sobre ela */
`;

const QuestOverlay = styled.div`
    position: absolute;
    /* Posições relativas ao tamanho da imagem do quadro! Ajuste se necessário */
    width: 50%;
    height: 60%;
    top: 30%;
    left: 25%;
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 10px;
    background: rgba(0, 0, 0, 0.5); /* Fundo sutil para legibilidade */
    border-radius: 5px;
    overflow-y: auto;
`;

const QuestItem = styled.div`
    background: rgba(255, 255, 255, 0.1);
    padding: 10px;
    border-left: 5px solid gold;
    cursor: pointer;
    transition: background 0.2s;

    &:hover {
        background: rgba(255, 255, 255, 0.2);
    }
`;

const CloseButton = styled.button`
marginTop: '20px',
padding: '10px 30px', 
background: 'darkred',
color: 'white', 
border: 'none', 
borderRadius: '5px'
`;

// --- Componente ---

interface QuestBoardScreenProps {
    onClose: () => void;
    // Dados reais das quests viriam aqui
    quests: { title: string, status: string }[];
}

const QuestBoardScreen: React.FC<QuestBoardScreenProps> = ({ onClose, quests = [] }) => {
    
    // Usando a imagem da própria tela para posicionamento
    return (
        <FullScreenContainer>
            
            <BoardImage src={QuestBoardImage} alt="Quadro de Missões" />
            
            {/* O conteúdo interativo é posicionado sobre a imagem */}
            <QuestOverlay>
                <h2>Missões Disponíveis:</h2>
                {quests.length === 0 ? (
                    <p>Nenhuma missão disponível no momento. Fale com o Mentor!</p>
                ) : (
                    quests.map((quest, index) => (
                        <QuestItem key={index}>
                            <strong>{quest.title}</strong> - Status: {quest.status}
                        </QuestItem>
                    ))
                )}
            </QuestOverlay>
            
            <CloseButton onClick={onClose} >
                [ Fechar Quadro ]
            </CloseButton>
        
        </FullScreenContainer>
    );
};

export default QuestBoardScreen;