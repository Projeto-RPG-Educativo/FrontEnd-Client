import { useCallback } from 'react';
import { useGame } from '../../../contexts';
import { useBattleScreen } from '../../../hooks';
import type { Difficulty } from '../../../contexts/GameContext';

export const useArena = () => {
    const { setHubState, setGameState } = useGame();
    const { startBattle } = useBattleScreen();

    const goToHubCentral = useCallback(() => {
        console.log('🏛️ Indo para hub central');
        setHubState('CENTRAL');
    }, [setHubState]);

    const choiceBattle = useCallback((monsterp: number, difficultyp: Difficulty, playerp: number) => {
        const Monster = monsterp;
        const Difficulty = difficultyp;
        const Player = playerp;

        startBattle(Monster, Difficulty, Player)
        setGameState('BATTLE');
    }, [setGameState, startBattle,]);

    return {
        choiceBattle,
        goToHubCentral,
    };
};