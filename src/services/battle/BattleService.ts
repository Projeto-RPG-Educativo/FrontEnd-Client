import api from '../api/api';
import type {
  StartBattleRequest,
  BattleStateResponse,
  BattleActionRequest,
  SubmitAnswerRequest,
  BattleSaveProgressRequestlegado,
  BattleSaveProgressResponseLegado,
} from '../../types';

/**
 * Inicia uma nova batalha
 */
export const startBattle = async (
  data: StartBattleRequest
): Promise<BattleStateResponse> => {
  console.log('🎮 [BattleService] Iniciando batalha com dados:', data);

  try {
    const response = await api.post<BattleStateResponse>('/battle/start', data);
    console.log('✅ [BattleService] Resposta da API:', response.data);
    return response.data;
  } catch (error: any) {
    console.error('❌ [BattleService] Erro ao iniciar batalha:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
    });
    throw error;
  }
};

/**
 * Realiza uma ação de batalha (ataque, defesa, habilidade, item)
 */
export const performBattleAction = async (
  data: BattleActionRequest
): Promise<BattleStateResponse> => {
  const response = await api.post<BattleStateResponse>('/battle/action', data);
  return response.data;
};

/**
 * Submete a resposta de uma pergunta durante a batalha
 */
export const submitAnswer = async (
  data: SubmitAnswerRequest
): Promise<BattleStateResponse> => { 
  const response = await api.post<BattleStateResponse>('/battle/answer', data);
  return response.data;
};

/**
 * Salva o progresso da batalha
 */
export const saveBattleProgress = async (
  data: BattleSaveProgressRequestlegado
): Promise<BattleSaveProgressResponseLegado> => {
  const response = await api.post<BattleSaveProgressResponseLegado>(
    '/batalha/salvar-progresso',
    data
  );
  return response.data;
};

export default {
  startBattle,
  performBattleAction,
  submitAnswer,
  saveBattleProgress,
};
