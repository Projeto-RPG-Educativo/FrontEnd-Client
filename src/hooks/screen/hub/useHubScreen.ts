import { useCallback } from 'react';
import { useGame } from '../../../contexts';
import { useBattleScreen } from '../battle/useBattle';

/**
 * Hook para gerenciar navegação no Hub
 */
export const HubLogic = () => {
  const { hubState, setHubState, setGameState, player, difficulty } = useGame();
  const { startBattle } = useBattleScreen();


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

  const goToExit = useCallback( () => {
    console.log('🚪 Saindo do hub e indo para batalha');
    
    if (!player?.id) {
      console.error('❌ Player não encontrado. Não é possível iniciar batalha.');
      return;
    }
    // monsterId padrão = 1 (pode ser alterado depois)
    const defaultMonsterId = 1;
    const defaultDifficulty = difficulty ?? "facil";
    console.log('⚔️ Iniciando batalha - Player:', player.id, 'Monster:', defaultMonsterId, 'Difficulty:', defaultDifficulty);
    startBattle(defaultMonsterId, defaultDifficulty, player.id);
    setGameState('BATTLE');
  }, [setGameState, startBattle, player]);

  return {
    hubState,
    goToHubCentral,
    goToHubZone,
    goToExit,
  };
};
