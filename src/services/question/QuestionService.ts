import api from '../api/api';

import type {
  // DTO de resposta (o wrapper)
  RandomQuestionResponse,
  // DTO da questão em si (a resposta da API)
  QuestionFromBackend,
  // Helper para construir a query string (estava correto)
  QuestionRandomRequest,
} from '../../types'; // <-- Caminho atualizado

export const getRandomQuestion = async (
  data: QuestionRandomRequest
): Promise<QuestionFromBackend> => { 
  try {

    const params = new URLSearchParams({
      difficulty: data.difficulty,
      playerLevel: data.playerLevel.toString(),
    });
    
    if (data.contentId) {
      params.append('contentId', data.contentId.toString());
    }


    const response = await api.get<RandomQuestionResponse>(
      `/questions/random?${params.toString()}`
    );

    // Retorna apenas a questão de dentro do wrapper, que é do tipo 'QuestionFromBackend'
    return response.data.question;

  } catch (error: any) {
    console.error('❌ [QuestionService] Erro ao buscar questão aleatória:', {
      status: error.response?.status,
      message: error.response?.data?.message || error.message,
    });
    throw new Error(error.response?.data?.message || 'Erro ao buscar questão');
  }
};

export default {
  getRandomQuestion,
};