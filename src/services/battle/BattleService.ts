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
 * Executa o turno do monstro
 */
export const executeMonsterTurn = async (): Promise<BattleStateResponse> => {
  console.log('👹 [BattleService] Executando turno do monstro');
  
  try {
    const response = await api.post<BattleStateResponse>('/battle/monster-turn');
    console.log('✅ [BattleService] Turno do monstro executado:', response.data);
    return response.data;
  } catch (error: any) {
    console.error('❌ [BattleService] Erro ao executar turno do monstro:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
    });
    throw error;
  }
};

/**
 * Passa o turno quando o jogador está atordoado
 */
export const skipTurn = async (): Promise<BattleStateResponse> => {
  console.log('⏭️ [BattleService] Passando turno (atordoado)');
  
  try {
    const response = await api.post<BattleStateResponse>('/battle/skip-turn');
    console.log('✅ [BattleService] Turno passado:', response.data);
    return response.data;
  } catch (error: any) {
    console.error('❌ [BattleService] Erro ao passar turno:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
    });
    throw error;
  }
};

/**
 * Consulta o estado atual da batalha
 */
export const getCurrentBattle = async (): Promise<BattleStateResponse | null> => {
  console.log('🔍 [BattleService] Consultando batalha atual');
  
  try {
    const response = await api.get<BattleStateResponse>('/battle/current');
    console.log('✅ [BattleService] Batalha atual:', response.data);
    return response.data;
  } catch (error: any) {
    if (error.response?.status === 204) {
      console.log('ℹ️ [BattleService] Nenhuma batalha ativa');
      return null;
    }
    console.error('❌ [BattleService] Erro ao consultar batalha atual:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
    });
    throw error;
  }
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
  executeMonsterTurn,
  skipTurn,
  getCurrentBattle,
  saveBattleProgress,
};
