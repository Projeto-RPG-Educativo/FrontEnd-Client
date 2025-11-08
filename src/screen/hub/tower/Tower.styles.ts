import styled, { keyframes, css } from 'styled-components';

// --- Estilos de Layout ---

export const FloorContainer = styled.div<{ $backgroundImage: string }>`
  position: relative;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  
  /* Usa a imagem do andar atual como background, esticando para preencher */
  background-image: url(${props => props.$backgroundImage});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const NavArrow = styled.button<{ $position: 'top' | 'bottom' }>`
  position: absolute;
  ${props => props.$position === 'top' ? 'top: 20px;' : 'bottom: 20px;'}
  right: 50%;
  transform: translateX(50%);
  
  background: rgba(0, 0, 0, 0.6);
  color: white;
  border: 2px solid gold;
  padding: 15px 25px;
  font-size: 1.5em;
  cursor: pointer;
  z-index: 50;
  
  &:hover {
    background: rgba(0, 0, 0, 0.9);
  }

  &:disabled {
    opacity: 0.4;
    cursor: default;
  }
`;

export const QuestBoardHoverImage = styled.img<{ 
    $top: string; 
    $left: string; 
    $width: string; 
    $height: string; 
    $hasNewQuest?: boolean; 
}>`
    position: absolute;
    top: ${props => props.$top};
    left: ${props => props.$left};
    width: ${props => props.$width};
    height: ${props => props.$height};
    
    object-fit: cover; /* Garante que a imagem se ajuste sem distorção */
    cursor: pointer;
    z-index: 20; /* Acima da imagem de fundo */

    opacity: 0; /* Começa invisível */
    transform: scale(1); /* Posição inicial sem expansão */
    box-shadow: 0 0 0 rgba(255, 255, 255, 0); /* Sem contorno inicial */

    /* Transições para suavizar os efeitos */
    transition: opacity 0.3s ease-out, 
                transform 0.3s ease-out, 
                box-shadow 0.3s ease-out;

    /* A imagem só aparece e se anima no hover */
    &:hover {
        opacity: 1; /* Torna a imagem visível */
        transform: scale(1.03); /* Leve expansão */
        box-shadow: 0 0 25px 8px rgba(255, 255, 255, 0.8); /* Contorno branco e brilho mais forte */
    }

    /* Se houver uma nova missão, podemos dar um pulso extra quando visível */
    ${props => props.$hasNewQuest && css`
        &:hover {
            animation: ${boardPulse} 2s infinite ease-in-out forwards; /* Anima o pulso ao hover */
            /* Garante que ele fique visível e com brilho no final da animação de hover */
            opacity: 1; 
            box-shadow: 0 0 25px 8px rgba(255, 215, 0, 0.9); /* Brilho dourado forte */
        }
    `}
`;

export const BackButton = styled(NavArrow)`
    left: 20px;
    right: auto;
    transform: none;
`;

export const InfoBox = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: rgba(10, 10, 30, 0.9);
    border: 3px solid #6495ed;
    padding: 30px;
    width: 90%;
    max-width: 600px;
    text-align: center;
    color: white;
    z-index: 40;
    box-shadow: 0 0 15px rgba(100, 149, 237, 0.5);
    display: flex;
    flex-direction: column;
    gap: 15px;
`;

export const SimpleActionButton = styled.button`
    padding: 10px 20px;
    background: #4682b4;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1em;
    transition: background 0.2s;
    
    &:hover {
        background: #5f9ea0;
    }

    &:disabled {
      opacity: 0.6;
    }
`;

export const slowGlow = keyframes`
  0%, 100% { 
    box-shadow: 0 0 5px rgba(255, 255, 255, 0.2); /* Brilho branco fraco */
  }
  50% { 
    box-shadow: 0 0 10px rgba(255, 255, 255, 0.6); /* Brilho branco mais forte */
  }
`;

// RECEPTION
const boardPulse = keyframes`
  0% {
    transform: scale(1);
    box-shadow: 0 0 5px rgba(255, 255, 255, 0.4);
  }
  50% {
    transform: scale(1.02); /* Levemente maior */
    box-shadow: 0 0 20px rgba(255, 255, 255, 0.8); /* Brilho mais intenso */
  }
  100% {
    transform: scale(1);
    box-shadow: 0 0 5px rgba(255, 255, 255, 0.4);
  }
`;

// ... (seus outros styled components, como HotspotArea) ...

// NOVO COMPONENTE ESTILIZADO PARA O QUADRO VISUAL
export const QuestBoardVisual = styled.div<{ 
    $top: string; 
    $left: string; 
    $width: string; 
    $height: string; 
    $hasNewQuest?: boolean; 
}>`
    position: absolute;
    top: ${props => props.$top};
    left: ${props => props.$left};
    width: ${props => props.$width};
    height: ${props => props.$height};
    
    background-color: transparent; /* Será invisível, mas o efeito será visível */
    border-radius: 5px; /* Para suavizar os cantos do contorno */
    cursor: pointer;
    z-index: 20; /* Garante que ele esteja acima da imagem de fundo */

    display: flex; /* Para centralizar o conteúdo, se houver */
    justify-content: center;
    align-items: center;

    /* Transições para suavizar o hover */
    transition: transform 0.3s ease-in-out, 
                box-shadow 0.3s ease-in-out,
                background-color 0.3s ease-in-out;

    /* Efeito de pulso suave constante, como se estivesse "vivo" */
    animation: ${boardPulse} 3s infinite ease-in-out;

    /* Efeito de hover: expansão e contorno branco */
    &:hover {
        transform: scale(1.03); /* Aumenta o próprio quadro um pouco mais */
        box-shadow: 0 0 25px 8px rgba(255, 255, 255, 0.8); /* Contorno branco e brilho mais forte */
        background-color: rgba(255, 255, 255, 0.05); /* Um leve preenchimento translúcido para o hover */
    }

    /* Se houver uma nova missão, podemos mudar a animação ou adicionar um brilho extra */
    ${props => props.$hasNewQuest && css`
        animation: ${boardPulse} 2s infinite ease-in-out; /* Pulso mais rápido */
        box-shadow: 0 0 20px 5px rgba(255, 215, 0, 0.7); /* Brilho dourado para indicar nova missão */
    `}
`;

export const HotspotArea = styled.button<{ $top: string; $left: string; $width: string; $height: string; }>`
    position: absolute;
    top: ${props => props.$top};
    left: ${props => props.$left};
    width: ${props => props.$width};
    height: ${props => props.$height};
    
    background: transparent;
    border: 2px solid transparent; 
    cursor: pointer;
    z-index: 20; 
    
    /* Adiciona uma transição suave para todas as propriedades que vamos alterar */
    transition: transform 0.3s ease-in-out, 
                box-shadow 0.3s ease-in-out, 
                background-color 0.2s;

    animation: ${slowGlow} 3s infinite ease-in-out; 

    &:hover {
        background: rgba(255, 255, 255, 0.1);
        border-color: white; /* Mantemos a borda para um feedback extra */

        /* --- NOVAS LINHAS --- */
        /* Aumenta o tamanho do hotspot em 5% */
        transform: scale(1.05); 
        
        /* Adiciona um brilho/contorno branco ao redor */
        box-shadow: 0 0 15px 5px rgba(255, 255, 255, 0.7); 
    }


    /* Garante que o conteúdo (como ícones) fique centralizado */
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    font-weight: bold;
`;

export const ReceptionInfoBox = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: rgba(10, 10, 30, 0.9);
    border: 3px solid #6495ed;
    padding: 30px;
    width: 90%;
    max-width: 500px; /* Um pouco menor */
    text-align: center;
    color: white;
    z-index: 40;
    box-shadow: 0 0 15px rgba(100, 149, 237, 0.5);
    display: flex;
    flex-direction: column;
    gap: 15px;
`;

export const ReceptionActionButton = styled.button`
    padding: 10px 20px;
    background: #4682b4;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1em;
    transition: background 0.2s;
    
    &:hover {
        background: #5f9ea0;
    }

    &:disabled {
      opacity: 0.6;
    }
`;

// ==================== Estilos para Skills e Upgrade ====================

export const SkillCard = styled.div<{ $owned?: boolean; $canUpgrade?: boolean }>`
    background: ${props => props.$owned ? 'rgba(50, 100, 50, 0.9)' : 'rgba(30, 30, 50, 0.9)'};
    border: 2px solid ${props => props.$canUpgrade ? '#ffd700' : props.$owned ? '#90ee90' : '#6495ed'};
    border-radius: 8px;
    padding: 15px;
    margin: 10px;
    cursor: ${props => props.$owned && !props.$canUpgrade ? 'default' : 'pointer'};
    transition: all 0.3s;
    min-width: 200px;
    
    &:hover {
        ${props => (!props.$owned || props.$canUpgrade) && css`
            transform: scale(1.05);
            box-shadow: 0 0 15px rgba(100, 149, 237, 0.7);
        `}
    }

    h3 {
        color: ${props => props.$canUpgrade ? '#ffd700' : '#fff'};
        margin: 0 0 10px 0;
        font-size: 1.1em;
    }

    p {
        color: #ccc;
        font-size: 0.9em;
        margin: 5px 0;
    }

    .skill-cost {
        color: #ffd700;
        font-weight: bold;
        margin-top: 10px;
    }

    .skill-level {
        color: #90ee90;
        font-size: 0.9em;
    }
`;

export const SkillsGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 15px;
    max-height: 60vh;
    overflow-y: auto;
    padding: 10px;
    
    &::-webkit-scrollbar {
        width: 8px;
    }
    
    &::-webkit-scrollbar-track {
        background: rgba(0, 0, 0, 0.3);
    }
    
    &::-webkit-scrollbar-thumb {
        background: #4682b4;
        border-radius: 4px;
    }
`;

export const FloorModal = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: rgba(10, 10, 30, 0.95);
    border: 3px solid #6495ed;
    border-radius: 10px;
    padding: 30px;
    width: 90%;
    max-width: 800px;
    max-height: 80vh;
    overflow-y: auto;
    color: white;
    z-index: 40;
    box-shadow: 0 0 25px rgba(100, 149, 237, 0.5);
    
    h2 {
        color: #ffd700;
        text-align: center;
        margin-bottom: 20px;
        font-size: 1.8em;
    }

    &::-webkit-scrollbar {
        width: 10px;
    }
    
    &::-webkit-scrollbar-track {
        background: rgba(0, 0, 0, 0.3);
        border-radius: 5px;
    }
    
    &::-webkit-scrollbar-thumb {
        background: #4682b4;
        border-radius: 5px;
    }
`;

export const QuestCard = styled.div<{ $completed?: boolean }>`
    background: ${props => props.$completed ? 'rgba(50, 100, 50, 0.9)' : 'rgba(30, 30, 50, 0.9)'};
    border: 2px solid ${props => props.$completed ? '#90ee90' : '#6495ed'};
    border-radius: 8px;
    padding: 20px;
    margin: 15px 0;
    cursor: pointer;
    transition: all 0.3s;
    
    &:hover {
        transform: translateX(5px);
        box-shadow: 0 0 15px rgba(100, 149, 237, 0.7);
    }

    h3 {
        color: #ffd700;
        margin: 0 0 10px 0;
    }

    .quest-reward {
        color: #ffd700;
        font-weight: bold;
        margin-top: 10px;
    }

    .quest-progress {
        color: #90ee90;
        font-size: 0.9em;
    }
`;

export const ItemSlot = styled.div<{ $isEmpty?: boolean }>`
    background: ${props => props.$isEmpty ? 'rgba(30, 30, 50, 0.5)' : 'rgba(30, 30, 50, 0.9)'};
    border: 2px solid ${props => props.$isEmpty ? '#555' : '#6495ed'};
    border-radius: 8px;
    padding: 15px;
    text-align: center;
    cursor: ${props => props.$isEmpty ? 'default' : 'pointer'};
    transition: all 0.3s;
    min-height: 100px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    
    ${props => !props.$isEmpty && css`
        &:hover {
            transform: scale(1.05);
            box-shadow: 0 0 15px rgba(100, 149, 237, 0.7);
        }
    `}

    .item-name {
        color: #ffd700;
        font-weight: bold;
        margin-bottom: 5px;
    }

    .item-quantity {
        color: #90ee90;
        font-size: 0.9em;
    }
`;

export const ActionButton = styled.button<{ $variant?: 'primary' | 'success' | 'danger' | 'warning' }>`
    padding: 12px 24px;
    background: ${props => {
        switch (props.$variant ) {
            case 'success': return '#28a745';
            case 'danger': return '#dc3545';
            case 'warning': return '#ffc107';
            default: return '#4682b4';
        }
    }};
    color: ${props => props.$variant === 'warning' ? '#000' : '#fff'};
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1em;
    font-weight: bold;
    transition: all 0.2s;
    margin: 5px;
    
    &:hover:not(:disabled) {
        transform: translateY(-2px);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
        filter: brightness(1.2);
    }

    &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }
`;

export const ResourceDisplay = styled.div`
    display: flex;
    justify-content: space-around;
    padding: 15px;
    background: rgba(0, 0, 0, 0.3);
    border-radius: 8px;
    margin-bottom: 20px;
    
    .resource-item {
        display: flex;
        align-items: center;
        gap: 8px;
        
        .resource-icon {
            font-size: 1.5em;
        }
        
        .resource-label {
            color: #ccc;
            font-size: 0.9em;
        }
        
        .resource-value {
            color: #ffd700;
            font-weight: bold;
            font-size: 1.1em;
        }
    }
`;