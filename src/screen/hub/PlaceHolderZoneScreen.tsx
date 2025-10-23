// src/components/Hub/PlaceholderZoneScreen.tsx

import React from 'react';
import styled from 'styled-components';
import { type Player } from '../../types';

// Defina as zonas para evitar erros de digitação
type HubZoneName = 'TOWER' | 'ARENA' | 'LIBRARY' | 'SHOP';

// --- Estilos de Layout (Simulando o Zoom) ---

const ZoneContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.9); /* Fundo escuro para simular o foco */
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  z-index: 100;
`;

const ContentBox = styled.div`
  background: #2a2a2a;
  border: 4px solid gold;
  border-radius: 10px;
  padding: 40px;
  width: 80%;
  max-width: 900px;
  text-align: center;
`;

const ActionButton = styled.button`
  padding: 15px 30px;
  margin: 10px;
  font-size: 1.2em;
  cursor: pointer;
  background: #556b2f; /* Verde Escuro, tema acadêmico */
  color: white;
  border: none;
  border-radius: 5px;
  transition: background 0.2s;

  &:hover {
    background: #6b8e23;
  }
`;

// --- Interface de Props ---

interface PlaceholderZoneScreenProps {
    zone: HubZoneName;
    player: Player | null;
    onBack: () => void;
    onStartQuizBattle: () => void;
    onRest: (cost: number) => void;
    onBuyItem: (itemId: string, cost: number) => void;
}


const PlaceholderZoneScreen: React.FC<PlaceholderZoneScreenProps> = (props) => {

    const { zone, player, onBack, onStartQuizBattle, onRest, onBuyItem } = props;
    
    // Define os nomes e títulos amigáveis
    const zoneDetails = {
        TOWER: { title: "Torre do Conhecimento", description: "Consulte seu status, distribua pontos de XP e veja o progresso." },
        ARENA: { title: "Palco da Retórica", description: "Prepare-se para o combate. Enfrente um desafio de Quiz!" },
        LIBRARY: { title: "Biblioteca Silenciosa", description: "Um lugar de paz. Descanse para recuperar HP e Energia." },
        SHOP: { title: "Sebo de Linguística", description: "Compre itens consumíveis e upgrades permanentes." },
    };

    const details = zoneDetails[zone];

    // --- Lógica de Conteúdo Específico ---
    
    // 1. Ações da ARENA
    const renderArenaContent = () => (
        <>
            <h3>Desafie o Monstro da Dificuldade: {player?.level || 1}</h3>
            <p>Seu jogador tem {player?.stamina} / {player?.maxStamina} de Energia.</p>
            <ActionButton onClick={onStartQuizBattle}>
                Iniciar Batalha de Quiz!
            </ActionButton>
        </>
    );

    // 2. Ações da LIBRARY (Descanso)
    const renderLibraryContent = () => (
        <>
            <h3>Recuperação e Estudo</h3>
            <p>Seus status atuais são: HP: {player?.hp} / {player?.maxHp} | Moedas: {player?.coins || 0}</p>
            <ActionButton onClick={() => onRest(0)}> 
                Descansar e Curar (Grátis)
            </ActionButton>
        </>
    );
    
    // 3. Ações da SHOP (Loja)
    const renderShopContent = () => (
        <>
            <h3>Itens de Estudo e Upgrades</h3>
            <p>Moedas disponíveis: {player?.coins || 0}</p>
            <ActionButton onClick={() => onBuyItem('DICA_PODEROSA', 50)}>
                Comprar Dica Poderosa (50 Moedas)
            </ActionButton>
            <p style={{ marginTop: '10px' }}>*O estoque é limitado. Volte sempre.</p>
        </>
    );

    // 4. Ações da TOWER (Status/XP) - (Pode ser um placeholder simples)
    const renderTowerContent = () => (
        <>
            <h3>Status e Progressão</h3>
            <p>Nível atual: {player?.level || 1} | Moedas: {player?.coins || 0}</p>
            <p>Use este local para distribuir pontos de XP em Inteligência, se tiver um sistema de XP.</p>
        </>
    );

    // Mapeia a zona para a função de renderização
    const renderZoneAction = () => {
        switch (zone) {
            case 'ARENA': return renderArenaContent();
            case 'LIBRARY': return renderLibraryContent();
            case 'SHOP': return renderShopContent();
            case 'TOWER': return renderTowerContent();
            default: return <h2>Conteúdo não encontrado.</h2>;
        }
    };


    return (
        <ZoneContainer>
            <ContentBox>
                <h1>{details.title}</h1>
                <p style={{ marginBottom: '20px', color: '#ccc' }}>{details.description}</p>
                
                <hr style={{ borderTop: '1px solid #4a4a4a', margin: '20px 0' }} />

                {renderZoneAction()}
                
                <hr style={{ borderTop: '1px solid #4a4a4a', margin: '20px 0' }} />

                <ActionButton onClick={onBack} style={{ backgroundColor: '#444' }}>
                    Voltar ao Hub Central
                </ActionButton>
            </ContentBox>
        </ZoneContainer>
    );
};

export default PlaceholderZoneScreen;