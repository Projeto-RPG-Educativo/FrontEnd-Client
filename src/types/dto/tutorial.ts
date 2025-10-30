// --- ViewModels ---
export interface Speaker {
    id: number;
    name: string;
    description: string;
    type: 'npc' | 'player';
    location: string;
}

export interface DialogueLine {
    id: number;
    content: string;
    response: string;
    speaker: Speaker; 
}


// --- API Responses ---

interface ApiSpeakerResponse {
    id: number;
    name: string;
    description: string;
    type: 'npc' | 'player'; 
    location: string;
}

export interface ApiDialogueResponse {
    id: number;
    content: string;
    response: string;
    npc: ApiSpeakerResponse | null; 
}