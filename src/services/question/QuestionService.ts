import api from '../api/api';

import type {
  ApiQuestionResponse, 
  QuestionFromBackend,
  QuestionRandomRequest,
  CheckAnswerRequest,
  CheckAnswerResponse,
} from '../../types';

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

    const response = await api.get<ApiQuestionResponse>(
      `/questions/random?${params.toString()}`
    );

    const apiData = response.data;

    const formattedQuestion: QuestionFromBackend = {
      id: apiData.id,
      text: apiData.questionText,
      options: [apiData.optionA, apiData.optionB, apiData.optionC],
      correctAnswer: apiData.correctAnswer,
      difficulty: apiData.difficulty.toLowerCase() as 'facil' | 'medio' | 'dificil',
      category: apiData.questionContent,
      points: 10,
    };

    return formattedQuestion;
    
  } catch (error: any) {
    console.error('❌ [QuestionService] Erro ao buscar questão aleatória:', {
      status: error.response?.status,
      message: error.response?.data?.message || error.message,
    });
    throw new Error(error.response?.data?.message || 'Erro ao buscar questão');
  }
};

export const checkAnswer = async (
  data: CheckAnswerRequest
): Promise<CheckAnswerResponse> => {
  try {
    const response = await api.post<CheckAnswerResponse>('/questions/check', data);
    return response.data;
  } catch (error: any) {
    console.error('❌ [QuestionService] Erro ao verificar resposta:', {
      status: error.response?.status,
      message: error.response?.data?.message || error.message,
    });
    throw new Error(error.response?.data?.message || 'Erro ao verificar resposta');
  }
};

export default {
  getRandomQuestion,
  checkAnswer,
};