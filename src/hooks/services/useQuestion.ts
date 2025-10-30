import { useState } from 'react';
import {
  getRandomQuestion,
  checkAnswer as checkAnswerService,
} from '../../services';
import type {
  QuestionFromBackend,
  QuestionRandomRequest,
  CheckAnswerRequest,
  CheckAnswerResponse,
} from '../../types';

interface UseQuestionReturn {
  question: QuestionFromBackend | null;
  loading: boolean;
  error: Error | null;
  fetchRandomQuestion: (
    data: QuestionRandomRequest
  ) => Promise<QuestionFromBackend | null>;
  checkAnswer: (
    data: CheckAnswerRequest
  ) => Promise<CheckAnswerResponse | null>;
  clearQuestion: () => void;
  clearError: () => void;
}

export const useQuestion = (): UseQuestionReturn => {
  const [question, setQuestion] = useState<QuestionFromBackend | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchRandomQuestion = async (
    data: QuestionRandomRequest
  ): Promise<QuestionFromBackend | null> => {
    setLoading(true);
    setError(null);
    try {
      const newQuestion = await getRandomQuestion(data);
      setQuestion(newQuestion);
      return newQuestion;
    } catch (err) {
      setError(err as Error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const clearQuestion = () => {
    setQuestion(null);
  };

  const clearError = () => {
    setError(null);
  };


  const checkAnswer = async (
    data: CheckAnswerRequest
  ): Promise<CheckAnswerResponse | null> => {
    setLoading(true);
    setError(null);
    try {
      const result = await checkAnswerService(data);
      return result;
    } catch (err) {
      console.error('❌ [useQuestion] Falha ao buscar pergunta. Erro:', err);
      setError(err as Error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    question,
    loading,
    error,
    fetchRandomQuestion,
    clearQuestion,
    clearError,
    checkAnswer, 
  };
};