import api from "../api/api";

import type {
    ApiDialogueResponse,
    DialogueLine,
    Speaker
} from "../../types/dto/Tutorial.types"; 


const mapApiToDialogue = (apiData: ApiDialogueResponse): DialogueLine => {

    if (!apiData.npc) {
        throw new Error("Dados do diálogo incompletos: NPC não encontrado na resposta.");
    }

    // Transforma o 'npc' em 'speaker'
    const speaker: Speaker = {
        id: apiData.npc.id,
        name: apiData.npc.name,
        description: apiData.npc.description,
        type: apiData.npc.type, 
        location: apiData.npc.location
    };

    // Retorna o objeto "limpo" que o app vai usar
    return {
        id: apiData.id,
        content: apiData.content,
        response: apiData.response,
        speaker: speaker 
    };
};


/**
 * Busca um diálogo de tutorial pelo ID.
 */

export const getDialogueById = async (
    dialogueId: number
): Promise<DialogueLine> => {
    try {
        // 1. FAZ A REQUISIÇÃO
        const response = await api.get<ApiDialogueResponse>(
            `/tutorial-dialog/${dialogueId}`
        );
        
        // 2. TRANSFORMA A RESPOSTA
        return mapApiToDialogue(response.data);

    } catch (error: any) {
        console.error('❌ [TutorialService] Erro ao buscar diálogo:', {
            status: error.response?.status,
            message: error.response?.data?.message || error.message,
        });
        throw new Error(error.response?.data?.message || 'Erro ao buscar diálogo');
    }
};