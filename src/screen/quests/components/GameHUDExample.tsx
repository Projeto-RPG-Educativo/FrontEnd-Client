import React from 'react';
import { QuestTracker } from './tracker/QuestTracker';
import styled from 'styled-components';

/**
 * EXEMPLO DE INTEGRAÇÃO
 * 
 * Este é um exemplo de como integrar o QuestTracker no HUD do seu jogo.
 * Você pode copiar este código e adaptar ao seu componente principal.
 */

const HUDContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none; /* Permite cliques através do HUD */
  z-index: 50;

  /* Elementos interativos precisam de pointer-events: auto */
  & > * {
    pointer-events: auto;
  }
`;

const TopBar = styled.div`
  position: absolute;
  top: 20px;
  left: 20px;
  display: flex;
  gap: 1rem;
  background: rgba(0, 0, 0, 0.7);
  padding: 1rem;
  border-radius: 8px;
`;

const StatDisplay = styled.div`
  color: white;
  font-weight: 600;
  
  span {
    color: #ffd700;
  }
`;

interface GameHUDExampleProps {
  character?: {
    name: string;
    level: number;
    hp: number;
    maxHp: number;
    xp: number;
  };
}

/**
 * Exemplo de HUD do Jogo com QuestTracker integrado
 */
export const GameHUDExample: React.FC<GameHUDExampleProps> = ({ character }) => {
  return (
    <HUDContainer>
      {/* Barra superior com stats do personagem */}
      <TopBar>
        <StatDisplay>
          <span>⚔️</span> {character?.name || 'Jogador'}
        </StatDisplay>
        <StatDisplay>
          <span>Lv.</span> {character?.level || 1}
        </StatDisplay>
        <StatDisplay>
          <span>❤️</span> {character?.hp || 0}/{character?.maxHp || 100}
        </StatDisplay>
        <StatDisplay>
          <span>⭐</span> {character?.xp || 0} XP
        </StatDisplay>
      </TopBar>

      {/* 
        QuestTracker - Canto superior direito 
        
        Props disponíveis:
        - maxQuests: número máximo de quests exibidas (padrão: 5)
        - collapsible: permite colapsar/expandir (padrão: true)
        - initialCollapsed: estado inicial collapsed (padrão: false)
      */}
      <QuestTracker
        maxQuests={5}
        collapsible={true}
        initialCollapsed={false}
      />

      {/* Outros elementos do HUD podem ser adicionados aqui */}
    </HUDContainer>
  );
};

export default GameHUDExample;
