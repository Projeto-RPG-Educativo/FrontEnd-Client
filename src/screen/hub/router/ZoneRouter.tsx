// src/components/Hub/HubZoneRouter.tsx

import React from 'react';
import { type HubState } from '../../../contexts/GameContext';
import { type Player } from '../../../types';
import Central from '../central/Central';
import PlaceholderZoneScreen from '../PlaceHolderZoneScreen'; 
import TowerScreen from '../tower/Tower';

// --- Interfaces de Props ---
interface HubZoneRouterProps {
  hubState: HubState;
  onGoToCentral: () => void;
  onGoToZone: (zone: 'TOWER' | 'ARENA' | 'LIBRARY' | 'SHOP' | 'EXIT') => void;
  player: Player | null;
  onRest: (cost: number) => void;
  onBuyItem: (itemId: string, cost: number) => void;
  onStartQuizBattle: () => void;
  onBack: () => void;
  setGameState: (state: 'HUB' | 'BATTLE' | 'MENU') => void;
    startBattle: (monsterId: number, difficulty: "facil" | "medio" | "dificil") => Promise<void>;
}

const HubZoneRouter: React.FC<HubZoneRouterProps> = (props) => {
  // ✅ Switch corrigido com valores HUB_*
  switch (props.hubState) {
    case 'TOWER':
      return (
        <TowerScreen 
          onBack={props.onGoToCentral}
          player={props.player}
          onUpgradeStat={(stat: 'intelligence' | 'vigor') => {
            console.log(`📈 Melhorando atributo: ${stat}`);
            // TODO: Implementar lógica de upgrade
          }}
          onRecoverStatus={(cost: number) => {
            console.log(`💊 Recuperando status por ${cost} moedas`);
            props.onRest(cost);
          }}
          onLearnAbility={(abilityId: string) => {
            console.log(`📚 Aprendendo habilidade: ${abilityId}`);
            // TODO: Implementar aprendizado de habilidades
          }}
        />
      );
    
    case 'ARENA':
      return (
        <PlaceholderZoneScreen 
          zone="ARENA" 
          onBack={props.onGoToCentral} 
          player={props.player}
          onStartQuizBattle={props.onStartQuizBattle}
          onRest={props.onRest} 
          onBuyItem={props.onBuyItem}
        />
      );
    
    case 'LIBRARY':
      return (
        <PlaceholderZoneScreen 
          zone="LIBRARY" 
          onBack={props.onGoToCentral} 
          player={props.player}
          onStartQuizBattle={props.onStartQuizBattle}
          onRest={props.onRest} 
          onBuyItem={props.onBuyItem}
        />
      );
      
    case 'SHOP':
      return (
        <PlaceholderZoneScreen 
          zone="SHOP" 
          onBack={props.onGoToCentral} 
          player={props.player}
          onStartQuizBattle={props.onStartQuizBattle}
          onRest={props.onRest} 
          onBuyItem={props.onBuyItem}
        />
      ); 

    case 'EXIT':
      props.startBattle && props.startBattle(1, 'facil');
      props.setGameState('BATTLE');
      return null;

    case 'CENTRAL':
    default:
      return (
        <Central
          player={props.player}
        />
      );
  }
};

export default HubZoneRouter;