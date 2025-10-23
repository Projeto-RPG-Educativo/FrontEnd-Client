// 3º Andar - Sala de Pesquisa: Evoluir Skills

import React, { useState, useEffect } from 'react';
import { type Player } from '../../../../../types';
import { 
    HotspotArea,
    StairIcon,
    LabIcon,
    FloorModal,
    ModalDescription,
    EmptyMessage,
    SkillCard,
    SkillsGrid,
    SkillHeader,
    SkillTypeBadge,
    SkillLevelBadge,
    SkillDescription,
    SkillSpecialEffect,
    NextLevelSection,
    NextLevelLabel,
    NextLevelStat,
    MaxLevelBadge,
    SkillIconContainer,
    LevelProgressContainer,
    CurrentLevelText,
    ProgressBarContainer,
    ProgressBarFill,
    SkillDetailsContent,
    CurrentEffectsSection,
    NextLevelEffectsSection,
    StatBonus,
    RequirementsSection,
    RequirementStatus,
    ButtonsContainer,
    MaxLevelMessage,
    FiltersContainer,
    ActionButton,
    ResourceDisplay
} from './ClassRoom.styles';

// Interface para Skills com evolução
interface Skill {
    id: string;
    name: string;
    level: number;
    maxLevel: number;
    description: string;
    type: 'active' | 'passive';
    owned: boolean;
    upgradeCost: number;
    upgradeRequirements: {
        level: number;
        coins: number;
    };
    currentEffects: {
        damage?: number;
        defense?: number;
        healing?: number;
        special?: string;
    };
    nextLevelEffects?: {
        damage?: number;
        defense?: number;
        healing?: number;
        special?: string;
    };
}

interface F3SearchRoomProps {
    player: Player | null;
    onGoToNextFloor: () => void;
    onGoToPreviousFloor: () => void;
}

const ClassRoom: React.FC<F3SearchRoomProps> = ({ 
    player, 
    onGoToNextFloor, 
    onGoToPreviousFloor 
}) => {
    const [showEvolutionLab, setShowEvolutionLab] = useState(false);
    const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
    const [filter, setFilter] = useState<'all' | 'active' | 'passive' | 'maxed'>('all');
    
    // Mock de skills - substituir pelo service quando disponível
    const [skills, setSkills] = useState<Skill[]>([
        {
            id: 'skill_001',
            name: 'Golpe Devastador',
            level: 1,
            maxLevel: 5,
            description: 'Um ataque poderoso que causa dano massivo.',
            type: 'active',
            owned: true,
            upgradeCost: 300,
            upgradeRequirements: { level: 5, coins: 300 },
            currentEffects: { damage: 150 },
            nextLevelEffects: { damage: 200 }
        },
        {
            id: 'skill_002',
            name: 'Escudo Arcano',
            level: 2,
            maxLevel: 5,
            description: 'Reduz o dano recebido por vários turnos.',
            type: 'active',
            owned: true,
            upgradeCost: 400,
            upgradeRequirements: { level: 6, coins: 400 },
            currentEffects: { defense: 40 },
            nextLevelEffects: { defense: 50 }
        },
        {
            id: 'skill_003',
            name: 'Regeneração',
            level: 1,
            maxLevel: 5,
            description: 'Restaura HP instantaneamente.',
            type: 'active',
            owned: true,
            upgradeCost: 500,
            upgradeRequirements: { level: 7, coins: 500 },
            currentEffects: { healing: 20 },
            nextLevelEffects: { healing: 30 }
        },
        {
            id: 'skill_004',
            name: 'Maestria em Combate',
            level: 3,
            maxLevel: 5,
            description: 'Aumenta permanentemente o dano base.',
            type: 'passive',
            owned: true,
            upgradeCost: 600,
            upgradeRequirements: { level: 8, coins: 600 },
            currentEffects: { damage: 15, special: 'Passiva permanente' },
            nextLevelEffects: { damage: 20, special: 'Passiva permanente' }
        },
        {
            id: 'skill_005',
            name: 'Pele de Ferro',
            level: 5,
            maxLevel: 5,
            description: 'Reduz permanentemente o dano recebido.',
            type: 'passive',
            owned: true,
            upgradeCost: 0,
            upgradeRequirements: { level: 10, coins: 0 },
            currentEffects: { defense: 10, special: 'NÍVEL MÁXIMO' },
            nextLevelEffects: undefined
        },
        {
            id: 'skill_006',
            name: 'Foco Mental',
            level: 1,
            maxLevel: 3,
            description: 'Aumenta a chance de acerto em perguntas.',
            type: 'passive',
            owned: true,
            upgradeCost: 700,
            upgradeRequirements: { level: 9, coins: 700 },
            currentEffects: { special: 'Bônus em questões: +15%' },
            nextLevelEffects: { special: 'Bônus em questões: +25%' }
        }
    ]);

    useEffect(() => {
        // Aqui você chamaria o service para buscar skills do jogador
        // getPlayerSkills().then(data => setSkills(data));
    }, []);

    const handleUpgradeSkill = (skill: Skill) => {
        if (!player) return;

        if (skill.level >= skill.maxLevel) {
            alert('Esta habilidade já está no nível máximo!');
            return;
        }

        if (player.level < skill.upgradeRequirements.level) {
            alert(`Você precisa ser nível ${skill.upgradeRequirements.level} para evoluir esta habilidade!`);
            return;
        }

        if (player.coins < skill.upgradeRequirements.coins) {
            alert(`Você precisa de ${skill.upgradeRequirements.coins} moedas! (Você tem: ${player.coins})`);
            return;
        }

        // Aqui você chamaria o service para evoluir a skill
        console.log('Evoluindo skill:', skill.id);
        
        setSkills(skills.map(s => {
            if (s.id === skill.id) {
                return {
                    ...s,
                    level: s.level + 1,
                    currentEffects: s.nextLevelEffects || s.currentEffects,
                    nextLevelEffects: s.level + 1 < s.maxLevel ? calculateNextLevel(s) : undefined,
                    upgradeCost: Math.floor(s.upgradeCost * 1.5)
                };
            }
            return s;
        }));
        
        setSelectedSkill(null);
        alert(`Habilidade "${skill.name}" evoluída para nível ${skill.level + 1}!`);
    };

    const calculateNextLevel = (skill: Skill): typeof skill.nextLevelEffects => {
        // Lógica simples de progressão - ajustar conforme necessário
        const nextEffects = { ...skill.currentEffects };
        if (nextEffects.damage) nextEffects.damage += 10;
        if (nextEffects.defense) nextEffects.defense += 5;
        if (nextEffects.healing) nextEffects.healing += 10;
        return nextEffects;
    };

    const filteredSkills = skills.filter(skill => {
        if (!skill.owned) return false;
        if (filter === 'all') return true;
        if (filter === 'maxed') return skill.level >= skill.maxLevel;
        return skill.type === filter;
    });

    const canUpgrade = (skill: Skill) => {
        if (!player || skill.level >= skill.maxLevel) return false;
        return player.coins >= skill.upgradeRequirements.coins && 
               player.level >= skill.upgradeRequirements.level;
    };

    const ownedSkillsCount = skills.filter(s => s.owned).length;
    const maxedSkillsCount = skills.filter(s => s.level >= s.maxLevel).length;

    return (
        <>

            {/* Área do Laboratório de Pesquisa */}
            <HotspotArea
                $top="40%" 
                $left="30%" 
                $width="40%" 
                $height="40%"
                onClick={() => setShowEvolutionLab(true)}
                title="Acessar o Laboratório de Pesquisa"
            >
                <LabIcon>🔬</LabIcon>
            </HotspotArea>

            {/* Modal: Laboratório de Evolução */}
            {showEvolutionLab && (
                <FloorModal>
                    <h2>🔬 Laboratório de Pesquisa</h2>
                    <ModalDescription>
                        Evolua suas habilidades para torná-las mais poderosas
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
                            <span className="resource-icon">💰</span>
                            <div>
                                <div className="resource-label">Moedas</div>
                                <div className="resource-value">{player?.coins || 0}</div>
                            </div>
                        </div>
                        <div className="resource-item">
                            <span className="resource-icon">📚</span>
                            <div>
                                <div className="resource-label">Skills</div>
                                <div className="resource-value">{ownedSkillsCount}</div>
                            </div>
                        </div>
                        <div className="resource-item">
                            <span className="resource-icon">⚡</span>
                            <div>
                                <div className="resource-label">Maximizadas</div>
                                <div className="resource-value">{maxedSkillsCount}</div>
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
                            $variant={filter === 'active' ? 'success' : 'primary'}
                            onClick={() => setFilter('active')}
                        >
                            Ativas
                        </ActionButton>
                        <ActionButton 
                            $variant={filter === 'passive' ? 'success' : 'primary'}
                            onClick={() => setFilter('passive')}
                        >
                            Passivas
                        </ActionButton>
                        <ActionButton 
                            $variant={filter === 'maxed' ? 'success' : 'primary'}
                            onClick={() => setFilter('maxed')}
                        >
                            Maximizadas
                        </ActionButton>
                    </FiltersContainer>

                    <SkillsGrid>
                        {filteredSkills.map(skill => (
                            <SkillCard
                                key={skill.id}
                                $owned={true}
                                onClick={() => setSelectedSkill(skill)}
                            >
                                <h3>{skill.name}</h3>
                                <SkillHeader>
                                    <SkillTypeBadge $type={skill.type}>
                                        {skill.type === 'active' ? '⚡ Ativa' : '🛡️ Passiva'}
                                    </SkillTypeBadge>
                                    <SkillLevelBadge>
                                        Nível {skill.level}/{skill.maxLevel}
                                    </SkillLevelBadge>
                                </SkillHeader>

                                <SkillDescription>{skill.description}</SkillDescription>

                                {skill.currentEffects.damage && (
                                    <p>⚔️ Dano: +{skill.currentEffects.damage}%</p>
                                )}
                                {skill.currentEffects.defense && (
                                    <p>🛡️ Defesa: +{skill.currentEffects.defense}%</p>
                                )}
                                {skill.currentEffects.healing && (
                                    <p>💚 Cura: {skill.currentEffects.healing}% HP</p>
                                )}
                                {skill.currentEffects.special && (
                                    <SkillSpecialEffect>
                                        ✨ {skill.currentEffects.special}
                                    </SkillSpecialEffect>
                                )}

                                {skill.level < skill.maxLevel ? (
                                    <>
                                        <NextLevelSection>
                                            <NextLevelLabel>
                                                Próximo Nível:
                                            </NextLevelLabel>
                                            {skill.nextLevelEffects?.damage && (
                                                <NextLevelStat>⚔️ Dano: +{skill.nextLevelEffects.damage}%</NextLevelStat>
                                            )}
                                            {skill.nextLevelEffects?.defense && (
                                                <NextLevelStat>🛡️ Defesa: +{skill.nextLevelEffects.defense}%</NextLevelStat>
                                            )}
                                            {skill.nextLevelEffects?.healing && (
                                                <NextLevelStat>💚 Cura: {skill.nextLevelEffects.healing}% HP</NextLevelStat>
                                            )}
                                        </NextLevelSection>
                                        <div className="skill-cost">
                                            💰 {skill.upgradeCost} moedas
                                        </div>
                                    </>
                                ) : (
                                    <MaxLevelBadge>
                                        ⭐ NÍVEL MÁXIMO ⭐
                                    </MaxLevelBadge>
                                )}
                            </SkillCard>
                        ))}
                    </SkillsGrid>

                    {filteredSkills.length === 0 && (
                        <EmptyMessage>
                            {filter === 'maxed' 
                                ? 'Você ainda não tem habilidades maximizadas.'
                                : 'Você ainda não possui habilidades. Visite o 2º andar para adquirir!'}
                        </EmptyMessage>
                    )}

                    <ActionButton onClick={() => setShowEvolutionLab(false)}>
                        Fechar
                    </ActionButton>
                </FloorModal>
            )}

            {/* Modal: Detalhes da Evolução */}
            {selectedSkill && (
                <FloorModal>
                    <h2>{selectedSkill.name}</h2>
                    
                    <SkillIconContainer>
                        {selectedSkill.type === 'active' ? '⚡' : '🛡️'}
                    </SkillIconContainer>

                    <LevelProgressContainer>
                        <CurrentLevelText>
                            Nível Atual: {selectedSkill.level}/{selectedSkill.maxLevel}
                        </CurrentLevelText>
                        <ProgressBarContainer>
                            <ProgressBarFill 
                                $progress={(selectedSkill.level / selectedSkill.maxLevel) * 100}
                            />
                        </ProgressBarContainer>
                    </LevelProgressContainer>

                    <SkillDetailsContent>
                        <CurrentEffectsSection>
                            <h3>📊 Efeitos Atuais:</h3>
                            {selectedSkill.currentEffects.damage && (
                                <p>⚔️ Dano: +{selectedSkill.currentEffects.damage}%</p>
                            )}
                            {selectedSkill.currentEffects.defense && (
                                <p>🛡️ Defesa: +{selectedSkill.currentEffects.defense}%</p>
                            )}
                            {selectedSkill.currentEffects.healing && (
                                <p>💚 Cura: {selectedSkill.currentEffects.healing}% HP</p>
                            )}
                            {selectedSkill.currentEffects.special && (
                                <SkillSpecialEffect>✨ {selectedSkill.currentEffects.special}</SkillSpecialEffect>
                            )}
                        </CurrentEffectsSection>

                        {selectedSkill.level < selectedSkill.maxLevel && selectedSkill.nextLevelEffects && (
                            <NextLevelEffectsSection>
                                <h3>
                                    🚀 Próximo Nível ({selectedSkill.level + 1}):
                                </h3>
                                {selectedSkill.nextLevelEffects.damage && (
                                    <p>⚔️ Dano: +{selectedSkill.nextLevelEffects.damage}%
                                        <StatBonus>
                                            {' '}(+{selectedSkill.nextLevelEffects.damage - (selectedSkill.currentEffects.damage || 0)})
                                        </StatBonus>
                                    </p>
                                )}
                                {selectedSkill.nextLevelEffects.defense && (
                                    <p>🛡️ Defesa: +{selectedSkill.nextLevelEffects.defense}%
                                        <StatBonus>
                                            {' '}(+{selectedSkill.nextLevelEffects.defense - (selectedSkill.currentEffects.defense || 0)})
                                        </StatBonus>
                                    </p>
                                )}
                                {selectedSkill.nextLevelEffects.healing && (
                                    <p>💚 Cura: {selectedSkill.nextLevelEffects.healing}% HP
                                        <StatBonus>
                                            {' '}(+{selectedSkill.nextLevelEffects.healing - (selectedSkill.currentEffects.healing || 0)})
                                        </StatBonus>
                                    </p>
                                )}
                            </NextLevelEffectsSection>
                        )}

                        {selectedSkill.level < selectedSkill.maxLevel && (
                            <RequirementsSection $canAfford={canUpgrade(selectedSkill)}>
                                <h3>💎 Requisitos:</h3>
                            </RequirementsSection>
                        )}
                    </SkillDetailsContent>

                    <ButtonsContainer>
                        {selectedSkill.level < selectedSkill.maxLevel ? (
                            <ActionButton 
                                $variant="success"
                                onClick={() => handleUpgradeSkill(selectedSkill)}
                                disabled={!canUpgrade(selectedSkill)}
                            >
                                {canUpgrade(selectedSkill) 
                                    ? `⬆️ Evoluir para Nível ${selectedSkill.level + 1}` 
                                    : 'Requisitos não atendidos'}
                            </ActionButton>
                        ) : (
                            <MaxLevelMessage>
                                ⭐ Esta habilidade está no nível máximo! ⭐
                            </MaxLevelMessage>
                        )}
                        <ActionButton onClick={() => setSelectedSkill(null)}>
                            Voltar
                        </ActionButton>
                    </ButtonsContainer>
                </FloorModal>
            )}
        </>
    );
};

export default ClassRoom;