// Hub Stats (mesmas que PlayerStats, mas focadas no Hub)
export interface HubStats {
  userId: string;
  characterId: string;
  stats: {
    totalBattles: number;
    victories: number;
    defeats: number;
    questionsAnswered: number;
    correctAnswers: number;
  };
}

// Skills (Torre do Conhecimento)
export interface Skill {
  id: string;
  name: string;
  description: string;
  type: 'passive' | 'active';
  cost: number;
  level: number;
  maxLevel: number;
  unlocked: boolean;
  requirements?: {
    level?: number;
    goldCost?: number;
    prerequisiteSkills?: string[];
  };
  effects: {
    stat: string;
    value: number;
    type: 'flat' | 'percentage';
  }[];
}

export interface SkillsResponse {
  skills: Skill[];
  availablePoints: number;
  totalSpent: number;
}

export interface PurchaseSkillRequest {
  skillId: string;
}

export interface PurchaseSkillResponse {
  success: boolean;
  message: string;
  updatedSkill: Skill;
  remainingPoints: number;
}

// Books (Biblioteca Silenciosa)
export interface Book {
  id: string;
  title: string;
  author: string;
  description: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
  pages: number;
  read: boolean;
  rewards?: {
    exp?: number;
    gold?: number;
    statBonus?: {
      stat: string;
      value: number;
    };
  };
}

export interface BookDetails extends Book {
  content: string;
  chapters: {
    id: string;
    title: string;
    summary: string;
  }[];
}

export interface BooksResponse {
  books: Book[];
  totalRead: number;
  totalAvailable: number;
}

// Professors (Palco da Retórica)
export interface Professor {
  id: string;
  name: string;
  title: string;
  specialty: string;
  avatar: string;
  description: string;
  available: boolean;
}

export interface ProfessorDialogue {
  id: string;
  professorId: string;
  text: string;
  choices?: {
    id: string;
    text: string;
    nextDialogueId?: string;
    rewards?: {
      exp?: number;
      gold?: number;
      item?: string;
    };
  }[];
}

export interface ProfessorsResponse {
  professors: Professor[];
}

export interface ProfessorDialoguesResponse {
  dialogues: ProfessorDialogue[];
  currentDialogue: ProfessorDialogue;
}

// Store (Sebo da Linguística)
export interface StoreItem {
  id: string;
  name: string;
  description: string;
  type: 'weapon' | 'armor' | 'consumable' | 'book' | 'misc';
  price: number;
  stock: number;
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
  effects?: {
    stat: string;
    value: number;
  }[];
}

export interface StoresResponse {
  items: StoreItem[];
  playerGold: number;
}

export interface PurchaseItemRequest {
  itemId: string;
  quantity: number;
}

export interface PurchaseItemResponse {
  success: boolean;
  message: string;
  item: StoreItem;
  remainingGold: number;
}
