// 1º Andar - Recepção: Quadro de Missões (Quests)

import React, { useState, useEffect } from 'react';
import { type Player } from '../../../../../types';
import { 
    HotspotArea,
    StairIcon,
    FloorModal, 
    QuestCard,
    QuestsContainer,
    QuestMetadata,
    DifficultyBadge,
    TypeBadge,
    StatusBadge,
    QuestDetailsContent,
    QuestDescription,
    RewardsSection,
    RequirementsSection,
    ProgressSection,
    ProgressText,
    ProgressBarContainer,
    ProgressBarFill,
    ButtonsContainer,
    ActionButton,
    ResourceDisplay,
    QuestBoardVisual,
    QuestBoardHoverImage
} from './Reception.styles';

import Quadro from '../../../../../assets/Images/background/hub/tower/QuadroCorte.png'; 

// Interface para Quests (temporária até ter o service do backend)
interface Quest {
    id: string;
    title: string;
    description: string;
    type: 'daily' | 'story' | 'special';
    difficulty: 'easy' | 'medium' | 'hard';
    rewards: {
        exp: number;
        gold: number;
        items?: string[];
    };
    requirements?: {
        level?: number;
        previousQuest?: string;
    };
    progress?: {
        current: number;
        total: number;
    };
    status: 'available' | 'active' | 'completed';
}

interface F1ReceptionProps {
    player: Player | null;
    onGoToNextFloor: () => void;
}

const Reception: React.FC<F1ReceptionProps> = ({ player, onGoToNextFloor }) => {
    const [showQuestBoard, setShowQuestBoard] = useState(false);
    const [selectedQuest, setSelectedQuest] = useState<Quest | null>(null);
    const [hasNewQuest, setHasNewQuest] = useState(true);
    
    // Mock de quests - substituir pelo service quando disponível
    const [quests, setQuests] = useState<Quest[]>([
        {
            id: '1',
            title: 'Dominando o Present Perfect',
            description: 'Complete 10 questões sobre Present Perfect em batalhas.',
            type: 'daily',
            difficulty: 'easy',
            rewards: { exp: 500, gold: 100 },
            progress: { current: 3, total: 10 },
            status: 'active'
        },
        {
            id: '2',
            title: 'Mestre dos Verbos Modais',
            description: 'Vença 3 batalhas consecutivas acertando questões de verbos modais.',
            type: 'daily',
            difficulty: 'medium',
            rewards: { exp: 800, gold: 200 },
            status: 'available'
        },
        {
            id: '3',
            title: 'A Saga dos Phrasal Verbs',
            description: 'Uma jornada épica através dos phrasal verbs mais complexos.',
            type: 'story',
            difficulty: 'hard',
            rewards: { exp: 2000, gold: 500, items: ['Tomo do Conhecimento'] },
            requirements: { level: 5 },
            status: 'available'
        }
    ]);

    useEffect(() => {
        // Aqui você chamaria o service para buscar quests
        // fetchQuests().then(data => setQuests(data));
    }, []);

    const handleAcceptQuest = (quest: Quest) => {
        if (quest.requirements?.level && player && player.level < quest.requirements.level) {
            alert(`Você precisa ser nível ${quest.requirements.level} para aceitar esta missão!`);
            return;
        }

        // Aqui você chamaria o service para aceitar a quest
        console.log('Aceitando quest:', quest.id);
        
        setQuests(quests.map(q => 
            q.id === quest.id ? { ...q, status: 'active' as const, progress: { current: 0, total: q.progress?.total || 1 } } : q
        ));
        
        setSelectedQuest(null);
        alert(`Missão "${quest.title}" aceita!`);
    };

    return (
        <>

            {/* Quadro de Missões Visual */}
            <QuestBoardVisual
                $top="35%" 
                $left="10%" 
                $width="20%" 
                $height="40%"
                onClick={() => setShowQuestBoard(true)}
                title="Ver Quadro de Missões"
                $hasNewQuest={hasNewQuest}
            />

            <QuestBoardHoverImage
                src={Quadro}
                alt="Quadro de Missões"
                $top="25.1%" 
                $left="6%" 
                $width="30%" 
                $height="58%"
                onClick={() => setShowQuestBoard(true)}
                title="Ver Quadro de Missões"
                $hasNewQuest={hasNewQuest}
            />

            {/* Modal: Quadro de Missões */}
            {showQuestBoard && (
                <FloorModal>
                    <h2>📜 Quadro de Missões</h2>
                    
                    <ResourceDisplay>
                        <div className="resource-item">
                            <span className="resource-icon">⭐</span>
                            <div>
                                <div className="resource-label">Nível</div>
                                <div className="resource-value">{player?.level || 1}</div>
                            </div>
                        </div>
                        <div className="resource-item">
                            <span className="resource-icon">💰</span>
                            <div>
                                <div className="resource-label">Moedas</div>
                                <div className="resource-value">{player?.coins || 0}</div>
                            </div>
                        </div>
                        <div className="resource-item">
                            <span className="resource-icon">✅</span>
                            <div>
                                <div className="resource-label">Ativas</div>
                                <div className="resource-value">
                                    {quests.filter(q => q.status === 'active').length}
                                </div>
                            </div>
                        </div>
                    </ResourceDisplay>

                    <QuestsContainer>
                        {quests.map(quest => (
                            <QuestCard
                                key={quest.id}
                                $completed={quest.status === 'completed'}
                                onClick={() => setSelectedQuest(quest)}
                            >
                                <h3>{quest.title}</h3>
                                <p>{quest.description}</p>
                                
                                <QuestMetadata>
                                    <DifficultyBadge $difficulty={quest.difficulty}>
                                        {quest.difficulty.toUpperCase()}
                                    </DifficultyBadge>
                                    <TypeBadge>
                                        {quest.type === 'daily' ? '📅 Diária' : 
                                         quest.type === 'story' ? '📖 História' : '⭐ Especial'}
                                    </TypeBadge>
                                    <StatusBadge>
                                        {quest.status === 'active' ? '✅ Ativa' : 
                                         quest.status === 'completed' ? '✔️ Completa' : '🔓 Disponível'}
                                    </StatusBadge>
                                </QuestMetadata>

                                {quest.progress && (
                                    <div className="quest-progress">
                                        Progresso: {quest.progress.current}/{quest.progress.total}
                                    </div>
                                )}

                                <div className="quest-reward">
                                    💎 {quest.rewards.exp} EXP | 💰 {quest.rewards.gold} Gold
                                    {quest.rewards.items && ` | 🎁 ${quest.rewards.items.join(', ')}`}
                                </div>
                            </QuestCard>
                        ))}
                    </QuestsContainer>

                    <ActionButton onClick={() => {
                        setShowQuestBoard(false);
                        setHasNewQuest(false);
                    }}>
                        Fechar
                    </ActionButton>
                </FloorModal>
            )}

            {/* Modal: Detalhes da Quest Selecionada */}
            {selectedQuest && (
                <FloorModal>
                    <h2>{selectedQuest.title}</h2>
                    
                    <QuestDetailsContent>
                        <QuestDescription>
                            {selectedQuest.description}
                        </QuestDescription>

                        <RewardsSection>
                            <h3>Recompensas:</h3>
                            <p>💎 {selectedQuest.rewards.exp} Experiência</p>
                            <p>💰 {selectedQuest.rewards.gold} Moedas</p>
                            {selectedQuest.rewards.items && (
                                <p>🎁 {selectedQuest.rewards.items.join(', ')}</p>
                            )}
                        </RewardsSection>

                        {selectedQuest.requirements && (
                            <RequirementsSection>
                                <h3>Requisitos:</h3>
                                {selectedQuest.requirements.level && (
                                    <p>⭐ Nível mínimo: {selectedQuest.requirements.level}</p>
                                )}
                            </RequirementsSection>
                        )}

                        {selectedQuest.progress && (
                            <ProgressSection>
                                <ProgressText>
                                    Progresso: {selectedQuest.progress.current}/{selectedQuest.progress.total}
                                </ProgressText>
                                <ProgressBarContainer>
                                    <ProgressBarFill 
                                        $progress={(selectedQuest.progress.current / selectedQuest.progress.total) * 100}
                                    />
                                </ProgressBarContainer>
                            </ProgressSection>
                        )}
                    </QuestDetailsContent>

                    <ButtonsContainer>
                        {selectedQuest.status === 'available' && (
                            <ActionButton 
                                $variant="success"
                                onClick={() => handleAcceptQuest(selectedQuest)}
                            >
                                Aceitar Missão
                            </ActionButton>
                        )}
                        {selectedQuest.status === 'active' && (
                            <ActionButton $variant="warning" disabled>
                                Em Andamento
                            </ActionButton>
                        )}
                        <ActionButton onClick={() => setSelectedQuest(null)}>
                            Voltar
                        </ActionButton>
                    </ButtonsContainer>
                </FloorModal>
            )}
        </>
    );
};

export default Reception;