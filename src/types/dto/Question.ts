// --- RESPONSE (Recebimento da API) ---

export interface QuestionInfo {
  id: number;
  texto: string;
  opcoes: string[];
  nivelMinimo: number;
  difficulty: string;
}

export interface CheckAnswerResponse {
  correct: boolean;
}

// --- REQUESTS ---

export interface CheckAnswerRequest {
  questionId: number;
  answer: string;
  battleId: string;
}


export interface QuestionRandomRequest {
  difficulty: string;
  playerLevel: number;
  contentId?: number;
}


// --- DOMAIN MODEL (Modelo de Domínio) ---

export type QuestionDifficulty = 'facil' | 'medio' | 'dificil';

export interface Question {
  id: number;
  text: string;
  options: string[];
  correctAnswer: string;
  difficulty: QuestionDifficulty;
  category?: string;
  points: number;
}

export interface QuestionReward {
  type: 'damage' | 'heal' | 'defense' | 'experience' | 'item';
  value: number;
  description: string;
}

export interface QuestionResult {
  isCorrect: boolean;
  timeSpent: number;
  pointsEarned: number;
  reward?: QuestionReward;
}


// extra pro service

export interface QuestionFromBackend {
  id: number;
  text: string;
  options: string[];
  correctAnswer: string;
  difficulty: 'facil' | 'medio' | 'dificil';
  category?: string;
  points: number;
}

export interface ApiQuestionResponse {
  id: number;
  questionText: string;
  optionA: string;
  optionB: string;
  optionC: string;
  correctAnswer: string;
  difficulty: 'Facil' | 'Medio' | 'Dificil';
  questionContent: string;
  minLevel: number;
  hint: string;
  contentID: number;
}