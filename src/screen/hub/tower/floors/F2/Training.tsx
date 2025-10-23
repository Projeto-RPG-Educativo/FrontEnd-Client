// 2º Andar - Sala de Treinamento: Adquirir Skills

import React, { useState, useEffect } from 'react';
import { type Player } from '../../../../../types';
import { 
    HotspotArea,
    StairIcon,
    TrainerIcon,
    FloorModal,
    ModalDescription,
    SkillCard,
    SkillsGrid,
    SkillTypeContainer,
    SkillTypeBadge,
    SkillRequirement,
    SkillOwnedBadge,
    SkillSpecialEffect,
    SkillIconContainer,
    SkillDetailsContent,
    SkillDetailDescription,
    EffectsSection,
    RequirementsSection,
    RequirementStatus,
    ButtonsContainer,
    FiltersContainer,
    ActionButton,
    ResourceDisplay
} from './Training.styles';

// Interface para Skills
interface Skill {
    id: string;
    name: string;
    description: string;
    type: 'active' | 'passive';
    cost: number;
    requirements: {
        level: number;
        coins: number;
    };
    effects: {
        damage?: number;
        defense?: number;
        healing?: number;
        special?: string;
    };
    owned: boolean;
}

interface F2TrainingRoomProps {
    player: Player | null;
    onGoToNextFloor: () => void;
    onGoToPreviousFloor: () => void;
}

const Training: React.FC<F2TrainingRoomProps> = ({ 
    player, 
    onGoToNextFloor, 
    onGoToPreviousFloor 
}) => {
    const [showSkillShop, setShowSkillShop] = useState(false);
    const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
    const [filter, setFilter] = useState<'all' | 'active' | 'passive'>('all');
    
    // Mock de skills - substituir pelo service quando disponível
    const [skills, setSkills] = useState<Skill[]>([
        {
            id: 'skill_001',
            name: 'Golpe Devastador',
            description: 'Um ataque poderoso que causa 150% de dano base.',
            type: 'active',
            cost: 500,
            requirements: { level: 3, coins: 500 },
            effects: { damage: 150 },
            owned: false
        },
        {
            id: 'skill_002',
            name: 'Escudo Arcano',
            description: 'Reduz o dano recebido em 30% por 3 turnos.',
            type: 'active',
            cost: 400,
            requirements: { level: 2, coins: 400 },
            effects: { defense: 30 },
            owned: false
        },
        {
            id: 'skill_003',
            name: 'Regeneração',
            description: 'Restaura 20% da HP máxima instantaneamente.',
            type: 'active',
            cost: 600,
            requirements: { level: 4, coins: 600 },
            effects: { healing: 20 },
            owned: false
        },
        {
            id: 'skill_004',
            name: 'Maestria em Combate',
            description: 'Aumenta permanentemente o dano base em 10%.',
            type: 'passive',
            cost: 800,
            requirements: { level: 5, coins: 800 },
            effects: { damage: 10, special: 'Passiva permanente' },
            owned: false
        },
        {
            id: 'skill_005',
            name: 'Pele de Ferro',
            description: 'Reduz permanentemente o dano recebido em 5%.',
            type: 'passive',
            cost: 700,
            requirements: { level: 4, coins: 700 },
            effects: { defense: 5, special: 'Passiva permanente' },
            owned: false
        },
        {
            id: 'skill_006',
            name: 'Foco Mental',
            description: 'Aumenta em 15% a chance de acerto em perguntas.',
            type: 'passive',
            cost: 900,
            requirements: { level: 6, coins: 900 },
            effects: { special: 'Bônus em questões' },
            owned: false
        }
    ]);

    useEffect(() => {
        // Aqui vai o service para buscar skills disponíveis
        // getSkills().then(data => setSkills(data));
    }, []);

    const handlePurchaseSkill = (skill: Skill) => {
        if (!player) return;

        if (player.level < skill.requirements.level) {
            alert(`Você precisa ser nível ${skill.requirements.level} para adquirir esta habilidade!`);
            return;
        }

        if (player.coins < skill.requirements.coins) {
            alert(`Você precisa de ${skill.requirements.coins} moedas! (Você tem: ${player.coins})`);
            return;
        }

        // Aqui vai o service para comprar a skill
        console.log('Comprando skill:', skill.id);
        
        setSkills(skills.map(s => 
            s.id === skill.id ? { ...s, owned: true } : s
        ));
        
        setSelectedSkill(null);
        alert(`Habilidade "${skill.name}" adquirida com sucesso!`);
    };

    const filteredSkills = skills.filter(skill => {
        if (filter === 'all') return true;
        return skill.type === filter;
    });

    const canAfford = (skill: Skill) => {
        if (!player) return false;
        return player.coins >= skill.requirements.coins && player.level >= skill.requirements.level;
    };

    return (
        <>

            {/* Área do Mestre de Treinamento */}
            <HotspotArea
                $top="40%" 
                $left="30%" 
                $width="40%" 
                $height="40%"
                onClick={() => setShowSkillShop(true)}
                title="Falar com o Mestre de Treinamento"
            >
                <TrainerIcon>🥋</TrainerIcon>
            </HotspotArea>

            {/* Modal: Loja de Skills */}
            {showSkillShop && (
                <FloorModal>
                    <h2>⚔️ Sala de Treinamento</h2>
                    <ModalDescription>
                        Adquira novas habilidades para usar em batalha
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
                                <div className="resource-value">
                                    {skills.filter(s => s.owned).length}/{skills.length}
                                </div>
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
                    </FiltersContainer>

                    <SkillsGrid>
                        {filteredSkills.map(skill => (
                            <SkillCard
                                key={skill.id}
                                $owned={skill.owned}
                                onClick={() => !skill.owned && setSelectedSkill(skill)}
                            >
                                <h3>{skill.name}</h3>
                                <p>{skill.description}</p>
                                
                                <SkillTypeContainer>
                                    <SkillTypeBadge $type={skill.type}>
                                        {skill.type === 'active' ? '⚡ Ativa' : '🛡️ Passiva'}
                                    </SkillTypeBadge>
                                </SkillTypeContainer>

                                {skill.effects.damage && (
                                    <p>⚔️ Dano: +{skill.effects.damage}%</p>
                                )}
                                {skill.effects.defense && (
                                    <p>🛡️ Defesa: +{skill.effects.defense}%</p>
                                )}
                                {skill.effects.healing && (
                                    <p>💚 Cura: {skill.effects.healing}% HP</p>
                                )}
                                {skill.effects.special && (
                                    <SkillSpecialEffect>✨ {skill.effects.special}</SkillSpecialEffect>
                                )}

                                {!skill.owned && (
                                    <>
                                        <div className="skill-cost">
                                            💰 {skill.cost} moedas
                                        </div>
                                        <SkillRequirement>
                                            Requer nível {skill.requirements.level}
                                        </SkillRequirement>
                                    </>
                                )}

                                {skill.owned && (
                                    <SkillOwnedBadge>
                                        ✅ Adquirida
                                    </SkillOwnedBadge>
                                )}
                            </SkillCard>
                        ))}
                    </SkillsGrid>

                    <ActionButton onClick={() => setShowSkillShop(false)}>
                        Fechar
                    </ActionButton>
                </FloorModal>
            )}

            {/* Modal: Detalhes da Skill Selecionada */}
            {selectedSkill && (
                <FloorModal>
                    <h2>{selectedSkill.name}</h2>
                    
                    <SkillIconContainer>
                        {selectedSkill.type === 'active' ? '⚡' : '🛡️'}
                    </SkillIconContainer>

                    <SkillDetailsContent>
                        <SkillDetailDescription>
                            {selectedSkill.description}
                        </SkillDetailDescription>

                        <EffectsSection>
                            <h3>Efeitos:</h3>
                            {selectedSkill.effects.damage && (
                                <p>⚔️ Dano: +{selectedSkill.effects.damage}%</p>
                            )}
                            {selectedSkill.effects.defense && (
                                <p>🛡️ Defesa: +{selectedSkill.effects.defense}%</p>
                            )}
                            {selectedSkill.effects.healing && (
                                <p>💚 Cura: {selectedSkill.effects.healing}% HP máxima</p>
                            )}
                            {selectedSkill.effects.special && (
                                <SkillSpecialEffect>✨ {selectedSkill.effects.special}</SkillSpecialEffect>
                            )}
                        </EffectsSection>

                        <RequirementsSection $canAfford={canAfford(selectedSkill)}>
                            <h3>Requisitos:</h3>
                         
                        </RequirementsSection>
                    </SkillDetailsContent>

                    <ButtonsContainer>
                        <ActionButton 
                            $variant="success"
                            onClick={() => handlePurchaseSkill(selectedSkill)}
                            disabled={!canAfford(selectedSkill)}
                        >
                            {canAfford(selectedSkill) ? 'Adquirir Habilidade' : 'Requisitos não atendidos'}
                        </ActionButton>
                        <ActionButton onClick={() => setSelectedSkill(null)}>
                            Voltar
                        </ActionButton>
                    </ButtonsContainer>
                </FloorModal>
            )}
        </>
    );
};

export default Training;