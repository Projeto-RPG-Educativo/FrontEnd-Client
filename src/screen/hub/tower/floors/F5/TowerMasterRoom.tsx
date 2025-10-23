// 5º Andar - Sala do Mestre da Guilda: Missões Especiais

import React, { useState, useEffect } from 'react';
import { type Player } from '../../../../../types';
import { 
    HotspotArea,
    StairIcon,
    GuildMasterIcon,
    AchievementsIcon,
    FloorModal,
    ModalDescription,
    EmptyMessage,
    ResourceDisplay,
    FiltersContainer,
    QuestsContainer,
    QuestCard,
    QuestHeader,
    QuestInfo,
    QuestDescription,
    QuestStatusIcon,
    QuestBadges,
    QuestBadge,
    DifficultyBadge,
    ProgressSection,
    ProgressHeader,
    ProgressBarContainer,
    ProgressBarFill,
    QuestDetailsHeader,
    QuestTypeIcon,
    QuestDifficultyBadge,
    QuestDetailsDescription,
    RequirementsSection,
    RequirementStatus,
    ObjectivesSection,
    ProgressDetailsSection,
    ProgressStats,
    ProgressBarLarge,
    ProgressBarLargeFill,
    RewardsSection,
    SpecialReward,
    TitleReward,
    ButtonsContainer,
    CurrentTitleSection,
    TitleIcon,
    TitleLabel,
    CurrentTitle,
    AchievementsContainer,
    AchievementCard,
    AchievementTitle,
    AchievementDescription,
    ProgressSummary,
    ActionButton
} from './TowerMasterRoom.styles';

// Interface para Missões Especiais
interface SpecialQuest {
    id: string;
    title: string;
    description: string;
    type: 'boss' | 'challenge' | 'epic' | 'legendary';
    difficulty: 'hard' | 'extreme' | 'nightmare';
    requirements: {
        level: number;
        completedQuests?: number;
        specificQuest?: string;
    };
    rewards: {
        coins: number;
        experience: number;
        specialItem?: string;
        title?: string;
    };
    objectives: string[];
    status: 'locked' | 'available' | 'in-progress' | 'completed';
    progress?: number;
    maxProgress?: number;
}

interface F5GuildMasterRoomProps {
    player: Player | null;
    onGoToPreviousFloor: () => void;
}

const TowerMasterRoom: React.FC<F5GuildMasterRoomProps> = ({ 
    player, 
    onGoToPreviousFloor 
}) => {
    const [showMissionBoard, setShowMissionBoard] = useState(false);
    const [showAchievements, setShowAchievements] = useState(false);
    const [selectedQuest, setSelectedQuest] = useState<SpecialQuest | null>(null);
    const [filter, setFilter] = useState<'all' | 'available' | 'in-progress' | 'completed'>('all');
    
    // Mock de missões especiais - substituir pelo service quando disponível
    const [specialQuests, setSpecialQuests] = useState<SpecialQuest[]>([
        {
            id: 'special_001',
            title: 'O Dragão da Gramática',
            description: 'Enfrente o lendário Dragão da Gramática em uma batalha épica de conhecimento.',
            type: 'boss',
            difficulty: 'extreme',
            requirements: {
                level: 10,
                completedQuests: 5
            },
            rewards: {
                coins: 1000,
                experience: 500,
                specialItem: 'Espada do Gramático',
                title: 'Matador de Dragões'
            },
            objectives: [
                'Derrote o Dragão da Gramática',
                'Acerte 10 questões consecutivas',
                'Complete sem usar itens de cura'
            ],
            status: 'available',
            progress: 0,
            maxProgress: 1
        },
        {
            id: 'special_002',
            title: 'Mestre das Palavras',
            description: 'Demonstre maestria absoluta respondendo 50 questões sem errar.',
            type: 'challenge',
            difficulty: 'extreme',
            requirements: {
                level: 8,
                completedQuests: 3
            },
            rewards: {
                coins: 800,
                experience: 400,
                title: 'Mestre das Palavras'
            },
            objectives: [
                'Responda 50 questões corretamente',
                'Não pode errar nenhuma',
                'Complete em menos de 30 minutos'
            ],
            status: 'available',
            progress: 23,
            maxProgress: 50
        },
        {
            id: 'special_003',
            title: 'Torre dos Sábios',
            description: 'Escale uma torre com 20 andares, cada um mais difícil que o anterior.',
            type: 'epic',
            difficulty: 'hard',
            requirements: {
                level: 7,
                completedQuests: 2
            },
            rewards: {
                coins: 600,
                experience: 350,
                specialItem: 'Capa do Sábio'
            },
            objectives: [
                'Complete todos os 20 andares',
                'Cada andar tem 3 questões',
                'Você tem 3 vidas no total'
            ],
            status: 'in-progress',
            progress: 8,
            maxProgress: 20
        },
        {
            id: 'special_004',
            title: 'O Guardião Ancião',
            description: 'Enfrente o Guardião Ancião, mestre de todos os tempos verbais.',
            type: 'boss',
            difficulty: 'nightmare',
            requirements: {
                level: 15,
                completedQuests: 10,
                specificQuest: 'special_001'
            },
            rewards: {
                coins: 2000,
                experience: 1000,
                specialItem: 'Coroa do Sábio',
                title: 'Lenda Viva'
            },
            objectives: [
                'Derrote o Guardião Ancião',
                'Complete todas as fases',
                'Prove sua maestria absoluta'
            ],
            status: 'locked',
            progress: 0,
            maxProgress: 1
        },
        {
            id: 'special_005',
            title: 'Maratona do Conhecimento',
            description: 'Responda 100 questões em sequência. Quanto mais acertar, maiores as recompensas.',
            type: 'challenge',
            difficulty: 'hard',
            requirements: {
                level: 6,
                completedQuests: 1
            },
            rewards: {
                coins: 500,
                experience: 300,
                specialItem: 'Medalha de Bronze'
            },
            objectives: [
                'Complete 100 questões',
                'Bronze: 60+ acertos',
                'Prata: 80+ acertos',
                'Ouro: 95+ acertos'
            ],
            status: 'available',
            progress: 0,
            maxProgress: 100
        },
        {
            id: 'special_006',
            title: 'A Biblioteca Proibida',
            description: 'Explore a Biblioteca Proibida e descubra segredos perdidos da linguagem.',
            type: 'epic',
            difficulty: 'extreme',
            requirements: {
                level: 12,
                completedQuests: 7
            },
            rewards: {
                coins: 1500,
                experience: 750,
                specialItem: 'Tomo do Conhecimento Proibido',
                title: 'Explorador de Segredos'
            },
            objectives: [
                'Explore todos os 5 setores',
                'Resolva 30 enigmas complexos',
                'Derrote o Guardião de cada setor'
            ],
            status: 'locked',
            progress: 0,
            maxProgress: 5
        }
    ]);

    useEffect(() => {
        // Aqui você chamaria o service para buscar missões especiais
        // getSpecialQuests().then(data => setSpecialQuests(data));
    }, []);

    const handleStartQuest = (quest: SpecialQuest) => {
        if (!player) return;

        if (quest.status === 'locked') {
            if (player.level < quest.requirements.level) {
                alert(`Você precisa ser nível ${quest.requirements.level}!`);
                return;
            }
            if (quest.requirements.completedQuests) {
                alert(`Você precisa completar ${quest.requirements.completedQuests} missões primeiro!`);
                return;
            }
            if (quest.requirements.specificQuest) {
                alert('Você precisa completar uma missão específica antes!');
                return;
            }
        }

        // Aqui você chamaria o service para iniciar a missão
        console.log('Iniciando missão especial:', quest.id);
        alert(`Missão "${quest.title}" iniciada! Boa sorte, aventureiro!`);
        setSelectedQuest(null);
    };

    const canStartQuest = (quest: SpecialQuest) => {
        if (!player) return false;
        if (quest.status === 'completed') return false;
        if (player.level < quest.requirements.level) return false;
        // Adicionar mais validações conforme necessário
        return true;
    };

    const getDifficultyColor = (difficulty: string) => {
        switch (difficulty) {
            case 'hard': return '#ffd700';
            case 'extreme': return '#ff6347';
            case 'nightmare': return '#8b008b';
            default: return '#fff';
        }
    };

    const getTypeIcon = (type: string) => {
        switch (type) {
            case 'boss': return '🐉';
            case 'challenge': return '🎯';
            case 'epic': return '⚔️';
            case 'legendary': return '👑';
            default: return '📜';
        }
    };

    const filteredQuests = specialQuests.filter(quest => {
        if (filter === 'all') return true;
        return quest.status === filter;
    });

    const completedCount = specialQuests.filter(q => q.status === 'completed').length;
    const inProgressCount = specialQuests.filter(q => q.status === 'in-progress').length;
    const availableCount = specialQuests.filter(q => q.status === 'available').length;

    return (
        <>

            {/* Área do Mestre da Guilda */}
            <HotspotArea
                $top="30%" 
                $left="25%" 
                $width="35%" 
                $height="40%"
                onClick={() => setShowMissionBoard(true)}
                title="Falar com o Mestre da Guilda"
            >
                <GuildMasterIcon>👑</GuildMasterIcon>
            </HotspotArea>

            {/* Área de Conquistas */}
            <HotspotArea
                $top="30%" 
                $left="65%" 
                $width="25%" 
                $height="40%"
                onClick={() => setShowAchievements(true)}
                title="Ver Conquistas e Títulos"
            >
                <AchievementsIcon>🏆</AchievementsIcon>
            </HotspotArea>

            {/* Modal: Quadro de Missões Especiais */}
            {showMissionBoard && (
                <FloorModal>
                    <h2>👑 Missões Especiais</h2>
                    <ModalDescription>
                        Desafios épicos com recompensas lendárias
                    </ModalDescription>

                    <ResourceDisplay>
                        <div className="resource-item">
                            <span className="resource-icon">⭐</span>
                            <div>
                                <div className="resource-label">Nível</div>
                                <div className="resource-value">{player?.level || 1}</div>
                            </div>
                        </div>
                        <div className="resource-item">
                            <span className="resource-icon">✅</span>
                            <div>
                                <div className="resource-label">Completadas</div>
                                <div className="resource-value">{completedCount}</div>
                            </div>
                        </div>
                        <div className="resource-item">
                            <span className="resource-icon">⏳</span>
                            <div>
                                <div className="resource-label">Em Progresso</div>
                                <div className="resource-value">{inProgressCount}</div>
                            </div>
                        </div>
                        <div className="resource-item">
                            <span className="resource-icon">🎯</span>
                            <div>
                                <div className="resource-label">Disponíveis</div>
                                <div className="resource-value">{availableCount}</div>
                            </div>
                        </div>
                    </ResourceDisplay>

                    {/* Filtros */}
                    <FiltersContainer>
                        <ActionButton 
                            $variant={filter === 'all' ? 'success' : 'primary'}
                            onClick={() => setFilter('all')}
                        >
                            Todas
                        </ActionButton>
                        <ActionButton 
                            $variant={filter === 'available' ? 'success' : 'primary'}
                            onClick={() => setFilter('available')}
                        >
                            Disponíveis
                        </ActionButton>
                        <ActionButton 
                            $variant={filter === 'in-progress' ? 'success' : 'primary'}
                            onClick={() => setFilter('in-progress')}
                        >
                            Em Progresso
                        </ActionButton>
                        <ActionButton 
                            $variant={filter === 'completed' ? 'success' : 'primary'}
                            onClick={() => setFilter('completed')}
                        >
                            Completadas
                        </ActionButton>
                    </FiltersContainer>

                    <QuestsContainer>
                        {filteredQuests.map(quest => (
                            <QuestCard
                                key={quest.id}
                                onClick={() => setSelectedQuest(quest)}
                            >
                                <QuestHeader>
                                    <QuestInfo>
                                        <h3>
                                            {getTypeIcon(quest.type)} {quest.title}
                                        </h3>
                                        <QuestDescription>
                                            {quest.description}
                                        </QuestDescription>
                                    </QuestInfo>
                                    <QuestStatusIcon>
                                        {quest.status === 'locked' && '🔒'}
                                        {quest.status === 'available' && '🎯'}
                                        {quest.status === 'in-progress' && '⏳'}
                                        {quest.status === 'completed' && '✅'}
                                    </QuestStatusIcon>
                                </QuestHeader>

                                <QuestBadges>
                                    <QuestBadge>
                                        ⭐ Nível {quest.requirements.level}+
                                    </QuestBadge>
                                    <DifficultyBadge $difficulty={quest.difficulty}>
                                        {quest.difficulty.toUpperCase()}
                                    </DifficultyBadge>
                                </QuestBadges>

                                {quest.status === 'in-progress' && quest.progress !== undefined && quest.maxProgress && (
                                    <ProgressSection>
                                        <ProgressHeader>
                                            <span>Progresso</span>
                                            <span>{quest.progress}/{quest.maxProgress}</span>
                                        </ProgressHeader>
                                        <ProgressBarContainer>
                                            <ProgressBarFill
                                                $progress={(quest.progress / quest.maxProgress) * 100}
                                            />
                                        </ProgressBarContainer>
                                    </ProgressSection>
                                )}
                            </QuestCard>
                        ))}
                    </QuestsContainer>

                    {filteredQuests.length === 0 && (
                        <EmptyMessage>
                            Nenhuma missão encontrada nesta categoria.
                        </EmptyMessage>
                    )}

                    <ActionButton onClick={() => setShowMissionBoard(false)}>
                        Fechar
                    </ActionButton>
                </FloorModal>
            )}

            {/* Modal: Detalhes da Missão Especial */}
            {selectedQuest && (
                <FloorModal>
                    <QuestDetailsHeader>
                        <QuestTypeIcon>
                            {getTypeIcon(selectedQuest.type)}
                        </QuestTypeIcon>
                        <h2>{selectedQuest.title}</h2>
                        <QuestDifficultyBadge $difficulty={selectedQuest.difficulty}>
                            DIFICULDADE: {selectedQuest.difficulty.toUpperCase()}
                        </QuestDifficultyBadge>
                    </QuestDetailsHeader>

                    <QuestDetailsDescription>
                        {selectedQuest.description}
                    </QuestDetailsDescription>

                    {/* Requisitos */}
                    <RequirementsSection $locked={selectedQuest.status === 'locked'}>
                        <h3>📋 Requisitos:</h3>
                        <p>⭐ Nível mínimo: {selectedQuest.requirements.level}
                            <RequirementStatus $met={player ? player.level >= selectedQuest.requirements.level : false}>
                                (Seu nível: {player?.level || 1})
                            </RequirementStatus>
                        </p>
                        {selectedQuest.requirements.completedQuests && (
                            <p>✅ Missões completadas: {selectedQuest.requirements.completedQuests}+</p>
                        )}
                        {selectedQuest.requirements.specificQuest && (
                            <p>🎯 Missão prévia requerida</p>
                        )}
                    </RequirementsSection>

                    {/* Objetivos */}
                    <ObjectivesSection>
                        <h3>🎯 Objetivos:</h3>
                        {selectedQuest.objectives.map((objective, index) => (
                            <p key={index}>
                                • {objective}
                            </p>
                        ))}
                    </ObjectivesSection>

                    {/* Progresso (se em progresso) */}
                    {selectedQuest.status === 'in-progress' && (
                        <ProgressDetailsSection>
                            <h3>⏳ Progresso Atual:</h3>
                            <ProgressStats>
                                <span>{selectedQuest.progress}/{selectedQuest.maxProgress}</span>
                                <span>{Math.floor(((selectedQuest.progress || 0) / (selectedQuest.maxProgress || 1)) * 100)}%</span>
                            </ProgressStats>
                            <ProgressBarLarge>
                                <ProgressBarLargeFill
                                    $progress={((selectedQuest.progress || 0) / (selectedQuest.maxProgress || 1)) * 100}
                                />
                            </ProgressBarLarge>
                        </ProgressDetailsSection>
                    )}

                    {/* Recompensas */}
                    <RewardsSection>
                        <h3>🎁 Recompensas:</h3>
                        <p>💰 {selectedQuest.rewards.coins} moedas</p>
                        <p>⭐ {selectedQuest.rewards.experience} XP</p>
                        {selectedQuest.rewards.specialItem && (
                            <SpecialReward>✨ {selectedQuest.rewards.specialItem}</SpecialReward>
                        )}
                        {selectedQuest.rewards.title && (
                            <TitleReward>
                                👑 Título: "{selectedQuest.rewards.title}"
                            </TitleReward>
                        )}
                    </RewardsSection>

                    <ButtonsContainer>
                        {selectedQuest.status === 'available' && (
                            <ActionButton 
                                $variant="success"
                                onClick={() => handleStartQuest(selectedQuest)}
                                disabled={!canStartQuest(selectedQuest)}
                            >
                                🚀 Iniciar Missão
                            </ActionButton>
                        )}
                        {selectedQuest.status === 'in-progress' && (
                            <ActionButton 
                                $variant="success"
                                onClick={() => handleStartQuest(selectedQuest)}
                            >
                                ▶️ Continuar Missão
                            </ActionButton>
                        )}
                        {selectedQuest.status === 'locked' && (
                            <ActionButton $variant="danger" disabled>
                                🔒 Missão Bloqueada
                            </ActionButton>
                        )}
                        {selectedQuest.status === 'completed' && (
                            <ActionButton $variant="success" disabled>
                                ✅ Missão Completada
                            </ActionButton>
                        )}
                        <ActionButton onClick={() => setSelectedQuest(null)}>
                            Voltar
                        </ActionButton>
                    </ButtonsContainer>
                </FloorModal>
            )}

            {/* Modal: Conquistas e Títulos */}
            {showAchievements && (
                <FloorModal>
                    <h2>🏆 Conquistas e Títulos</h2>
                    <ModalDescription>
                        Seus feitos lendários
                    </ModalDescription>

                    <CurrentTitleSection>
                        <TitleIcon>👑</TitleIcon>
                        <TitleLabel>Título Atual</TitleLabel>
                        <CurrentTitle>
                            {player?.level && player.level >= 10 ? 'Aventureiro Experiente' : 'Novato Promissor'}
                        </CurrentTitle>
                    </CurrentTitleSection>

                    <AchievementsContainer>
                        <AchievementCard $unlocked={true}>
                            <AchievementTitle>✅ Primeira Missão</AchievementTitle>
                            <AchievementDescription>Complete sua primeira missão</AchievementDescription>
                        </AchievementCard>

                        <AchievementCard $unlocked={false}>
                            <AchievementTitle>🔒 Matador de Dragões</AchievementTitle>
                            <AchievementDescription>Derrote o Dragão da Gramática</AchievementDescription>
                        </AchievementCard>

                        <AchievementCard $unlocked={false}>
                            <AchievementTitle>🔒 Mestre das Palavras</AchievementTitle>
                            <AchievementDescription>Acerte 50 questões sem errar</AchievementDescription>
                        </AchievementCard>

                        <AchievementCard $unlocked={false}>
                            <AchievementTitle>🔒 Lenda Viva</AchievementTitle>
                            <AchievementDescription>Complete todas as missões especiais</AchievementDescription>
                        </AchievementCard>
                    </AchievementsContainer>

                    <ProgressSummary>
                        <p>
                            📊 Progresso: {completedCount}/{specialQuests.length} Missões Especiais
                        </p>
                    </ProgressSummary>

                    <ActionButton onClick={() => setShowAchievements(false)}>
                        Fechar
                    </ActionButton>
                </FloorModal>
            )}
        </>
    );
};

export default TowerMasterRoom;