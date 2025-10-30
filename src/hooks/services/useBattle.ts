import { useState } from 'react';
import {
  startBattle,
  performBattleAction,
  submitAnswer,
  saveBattleProgress,
} from '../../services/';


import type {
  BattleStateResponse, 
  StartBattleRequest,
  BattleActionRequest,
  SubmitAnswerRequest,
  BattleSaveProgressRequestlegado,
  BattleSaveProgressResponseLegado,
} from '../../types'; 

interface UseBattleReturn {
  battle: BattleStateResponse | null; 
  loading: boolean;
  error: Error | null;
  startBattle: (data: StartBattleRequest) => Promise<BattleStateResponse | null>;
  executeAction: (data: BattleActionRequest) => Promise<BattleStateResponse | null>; 
  answerQuestion: (data: SubmitAnswerRequest) => Promise<BattleStateResponse | null>; 
  saveProgress: (data: BattleSaveProgressRequestlegado) => Promise<BattleSaveProgressResponseLegado | null>; 
  clearBattle: () => void;
  clearError: () => void;
  submitAnswer: (data: SubmitAnswerRequest) => Promise<BattleStateResponse | null>; 
}

/**
 * Hook para gerenciar batalhas
 */
export const useBattle = (): UseBattleReturn => {
  const [battle, setBattle] = useState<BattleStateResponse | null>(null); 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const handleStartBattle = async (
    data: StartBattleRequest
  ): Promise<BattleStateResponse | null> => {
    setLoading(true);
    setError(null);
    try {
      
      const newBattle = await startBattle(data);
      setBattle(newBattle);
      return newBattle;
    } catch (err) {
      setError(err as Error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const handleExecuteAction = async (
    data: BattleActionRequest
  ): Promise<BattleStateResponse | null> => {
    setLoading(true);
    setError(null);
    try {
      const updatedBattle = await performBattleAction(data);
      setBattle(updatedBattle);
      return updatedBattle;
    } catch (err) {
      setError(err as Error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  
  const handleAnswerQuestion = async (
    data: SubmitAnswerRequest
  ): Promise<BattleStateResponse | null> => {
    setLoading(true);
    setError(null);
    try {
      const updatedBattleState = await submitAnswer(data); 
      setBattle(updatedBattleState); 
      return updatedBattleState;
    } catch (err) {
      setError(err as Error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const handleSaveProgress = async (
    data: BattleSaveProgressRequestlegado
  ): Promise<BattleSaveProgressResponseLegado | null> => {
    setLoading(true);
    setError(null);
    try {
      const response = await saveBattleProgress(data);
      return response;
    } catch (err) {
      setError(err as Error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const clearBattle = () => {
    setBattle(null);
  };

  const clearError = () => {
    setError(null);
  };

  return {
    battle,
    loading,
    error,
    startBattle: handleStartBattle,
    executeAction: handleExecuteAction,
    answerQuestion: handleAnswerQuestion,
    saveProgress: handleSaveProgress,
    clearBattle,
    clearError,
    submitAnswer: handleAnswerQuestion,
  };
};