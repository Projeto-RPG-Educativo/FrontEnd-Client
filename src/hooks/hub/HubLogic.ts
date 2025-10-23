import { useCallback } from 'react';
import { useGame } from '../../contexts';
import { useHub } from './useHub';
import { usePlayer } from '../player/usePlayer';

/**
 * Hook para gerenciar navegação no Hub
 */
export const HubLogic = () => {
  const { hubState, setHubState, } = useGame();
  
  // Hooks de serviços (caso precise usar funções de API no futuro)
    const hub = useHub();
    const player = usePlayer();

  const goToHubCentral = useCallback(() => {
    console.log('🏛️ Indo para hub central');
    setHubState('CENTRAL');
  }, [setHubState]);

  const goToHubZone = useCallback((zone: string) => {
    console.log('🗺️ Indo para zona:', zone);
    
    const zoneMap: Record<string, { 
      hubState: 'TOWER' | 'ARENA' | 'LIBRARY' | 'SHOP',  
    }> = {
      TOWER: { hubState: 'TOWER' },
      ARENA: { hubState: 'ARENA' },
      LIBRARY: { hubState: 'LIBRARY'},
      SHOP: { hubState: 'SHOP'},
    };

    const targetZone = zoneMap[zone];
    if (targetZone) {
      setHubState(targetZone.hubState);
    } else {
      console.warn('⚠️ Zona inválida:', zone);
      goToHubCentral();
    }
  }, [setHubState, goToHubCentral]);

  return {
    hubState,
    goToHubCentral,
    goToHubZone,
  };
};

