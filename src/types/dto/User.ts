// --- REQUESTS (Envio para API) ---

export interface UpdateProfileRequest {
  nome?: string;
  email?: string;
  senhaAtual?: string;
  novaSenha?: string;
}

// --- RESPONSES (Recebimento da API) ---

export interface UserProfileResponse {
  id: number;
  nome: string;
  email: string;
  dataCriacao: string;
  totalPersonagens: number;
}

export interface UserStatsResponse {
  level: number;
  totalBatalhasVencidas: number;
  totalBatalhasPerdidas: number;
  totalQuestoesCorretas: number;
  totalQuestoesErradas: number;
  taxaAcerto: number;
  xpTotal: number;
}