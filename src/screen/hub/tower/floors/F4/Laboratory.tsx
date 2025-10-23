// 4º Andar - Sala de Poções: Cura e Consumíveis

import React, { useState, useEffect } from 'react';
import { type Player } from '../../../../../types';
import { 
    HotspotArea,
    StairIcon,
    HealingIcon,
    PotionIcon,
    FloorModal,
    ModalDescription,
    ResourceDisplay,
    StatusContainer,
    StatusTitle,
    StatBar,
    StatBarHeader,
    StatBarContainer,
    StatBarFill,
    HealingOptionsContainer,
    HealingOption,
    HealingOptionTitle,
    HealingOptionDescription,
    FiltersContainer,
    ConsumablesGrid,
    ConsumableCard,
    ConsumableIcon,
    ConsumableDescription,
    ConsumableEffect,
    ConsumableSpecialEffect,
    ConsumableBuffEffect,
    ConsumableOwnedBadge,
    ConsumableDetailsIcon,
    ConsumableDetailsDescription,
    EffectsSection,
    EffectText,
    OwnedSection,
    PriceSection,
    PlayerCoinsText,
    ButtonsContainer,
    ActionButton
} from './Laboratory.styles';

// Interface para Consumíveis
interface Consumable {
    id: string;
    name: string;
    description: string;
    type: 'potion' | 'elixir' | 'buff' | 'food';
    icon: string;
    cost: number;
    effects: {
        hpRestore?: number;
        staminaRestore?: number;
        buffDuration?: number;
        buffType?: string;
        special?: string;
    };
    owned: number; // Quantidade possuída
}

interface F4PotionRoomProps {
    player: Player | null;
    onGoToNextFloor: () => void;
    onGoToPreviousFloor: () => void;
}

const Laboratory: React.FC<F4PotionRoomProps> = ({ 
    player, 
    onGoToNextFloor, 
    onGoToPreviousFloor 
}) => {
    const [showPotionShop, setShowPotionShop] = useState(false);
    const [showHealingStation, setShowHealingStation] = useState(false);
    const [selectedConsumable, setSelectedConsumable] = useState<Consumable | null>(null);
    const [filter, setFilter] = useState<'all' | 'potion' | 'elixir' | 'buff' | 'food'>('all');
    
    // Mock de consumíveis - substituir pelo service quando disponível
    const [consumables, setConsumables] = useState<Consumable[]>([
        {
            id: 'cons_001',
            name: 'Poção de Vida Menor',
            description: 'Restaura 30% da HP máxima instantaneamente.',
            type: 'potion',
            icon: '🧪',
            cost: 50,
            effects: { hpRestore: 30 },
            owned: 0
        },
        {
            id: 'cons_002',
            name: 'Poção de Vida Maior',
            description: 'Restaura 60% da HP máxima instantaneamente.',
            type: 'potion',
            icon: '⚗️',
            cost: 150,
            effects: { hpRestore: 60 },
            owned: 0
        },
        {
            id: 'cons_003',
            name: 'Elixir de Energia',
            description: 'Restaura 50% da energia máxima.',
            type: 'elixir',
            icon: '💧',
            cost: 100,
            effects: { staminaRestore: 50 },
            owned: 0
        },
        {
            id: 'cons_004',
            name: 'Elixir Completo',
            description: 'Restaura 100% de HP e Energia.',
            type: 'elixir',
            icon: '✨',
            cost: 300,
            effects: { hpRestore: 100, staminaRestore: 100 },
            owned: 0
        },
        {
            id: 'cons_005',
            name: 'Poção de Força',
            description: 'Aumenta o dano em 25% por 3 batalhas.',
            type: 'buff',
            icon: '💪',
            cost: 200,
            effects: { buffDuration: 3, buffType: 'Dano +25%' },
            owned: 0
        },
        {
            id: 'cons_006',
            name: 'Poção de Resistência',
            description: 'Reduz o dano recebido em 20% por 3 batalhas.',
            type: 'buff',
            icon: '🛡️',
            cost: 200,
            effects: { buffDuration: 3, buffType: 'Defesa +20%' },
            owned: 0
        },
        {
            id: 'cons_007',
            name: 'Pão de Batalha',
            description: 'Restaura 15% de HP. Pode ser usado em combate.',
            type: 'food',
            icon: '🍞',
            cost: 30,
            effects: { hpRestore: 15, special: 'Usável em batalha' },
            owned: 0
        },
        {
            id: 'cons_008',
            name: 'Banquete do Guerreiro',
            description: 'Restaura 40% de HP e 30% de Energia.',
            type: 'food',
            icon: '🍖',
            cost: 120,
            effects: { hpRestore: 40, staminaRestore: 30 },
            owned: 0
        }
    ]);

    useEffect(() => {
        // Aqui você chamaria o service para buscar consumíveis do jogador
        // getPlayerConsumables().then(data => setConsumables(data));
    }, []);

    const handlePurchaseConsumable = (consumable: Consumable, quantity: number = 1) => {
        if (!player) return;

        const totalCost = consumable.cost * quantity;

        if (player.coins < totalCost) {
            alert(`Você precisa de ${totalCost} moedas! (Você tem: ${player.coins})`);
            return;
        }

        // Aqui você chamaria o service para comprar o consumível
        console.log('Comprando consumível:', consumable.id, 'Quantidade:', quantity);
        
        setConsumables(consumables.map(c => 
            c.id === consumable.id ? { ...c, owned: c.owned + quantity } : c
        ));
        
        alert(`${quantity}x ${consumable.name} adquirido(s) com sucesso!`);
        setSelectedConsumable(null);
    };

    const handleHealPlayer = (type: 'partial' | 'full') => {
        if (!player) return;

        const cost = type === 'partial' ? 50 : 100;
        
        if (player.coins < cost) {
            alert(`Você precisa de ${cost} moedas! (Você tem: ${player.coins})`);
            return;
        }

        // Aqui você chamaria o service para curar o jogador
        console.log('Curando jogador:', type);
        
        if (type === 'partial') {
            alert('Você foi curado em 50% de HP e Energia!');
        } else {
            alert('Você foi completamente curado!');
        }
    };

    const filteredConsumables = consumables.filter(consumable => {
        if (filter === 'all') return true;
        return consumable.type === filter;
    });

    const canAfford = (consumable: Consumable, quantity: number = 1) => {
        if (!player) return false;
        return player.coins >= consumable.cost * quantity;
    };

    const totalConsumables = consumables.reduce((sum, c) => sum + c.owned, 0);
    const hpPercentage = player ? Math.floor((player.hp / player.maxHp) * 100) : 0;
    const staminaPercentage = player ? Math.floor((player.stamina / player.maxStamina) * 100) : 0;

    return (
        <>

            {/* Área da Estação de Cura */}
            <HotspotArea
                $top="30%" 
                $left="10%" 
                $width="30%" 
                $height="40%"
                onClick={() => setShowHealingStation(true)}
                title="Estação de Cura Rápida"
            >
                <HealingIcon>💚</HealingIcon>
            </HotspotArea>

            {/* Área da Loja de Poções */}
            <HotspotArea
                $top="30%" 
                $left="50%" 
                $width="30%" 
                $height="40%"
                onClick={() => setShowPotionShop(true)}
                title="Loja de Poções e Consumíveis"
            >
                <PotionIcon>🧪</PotionIcon>
            </HotspotArea>

            {/* Modal: Estação de Cura */}
            {showHealingStation && (
                <FloorModal>
                    <h2>💚 Estação de Cura</h2>
                    <ModalDescription>
                        Recupere sua saúde e energia instantaneamente
                    </ModalDescription>

                    <StatusContainer>
                        <StatusTitle>Status Atual</StatusTitle>
                        
                        {/* HP Bar */}
                        <StatBar>
                            <StatBarHeader>
                                <span>❤️ HP</span>
                                <span>{player?.hp || 0} / {player?.maxHp || 100}</span>
                            </StatBarHeader>
                            <StatBarContainer $borderColor="#ff6347">
                                <StatBarFill
                                    $percentage={hpPercentage}
                                    $color={hpPercentage > 50 ? '#90ee90' : hpPercentage > 25 ? '#ffd700' : '#ff6347'}
                                >
                                    {hpPercentage}%
                                </StatBarFill>
                            </StatBarContainer>
                        </StatBar>

                        {/* Stamina Bar */}
                        <StatBar>
                            <StatBarHeader>
                                <span>⚡ Energia</span>
                                <span>{player?.stamina || 0} / {player?.maxStamina || 100}</span>
                            </StatBarHeader>
                            <StatBarContainer $borderColor="#4682b4">
                                <StatBarFill
                                    $percentage={staminaPercentage}
                                    $color={staminaPercentage > 50 ? '#4682b4' : staminaPercentage > 25 ? '#ffd700' : '#ff6347'}
                                >
                                    {staminaPercentage}%
                                </StatBarFill>
                            </StatBarContainer>
                        </StatBar>
                    </StatusContainer>

                    <HealingOptionsContainer>
                        <HealingOption $borderColor="#4682b4">
                            <HealingOptionTitle $color="#4682b4">
                                💧 Cura Parcial
                            </HealingOptionTitle>
                            <HealingOptionDescription>
                                Restaura 50% de HP e Energia
                            </HealingOptionDescription>
                            <ActionButton 
                                $variant="primary"
                                onClick={() => handleHealPlayer('partial')}
                                disabled={!player || player.coins < 50}
                            >
                                💰 50 moedas
                            </ActionButton>
                        </HealingOption>

                        <HealingOption $borderColor="#90ee90">
                            <HealingOptionTitle $color="#90ee90">
                                ✨ Cura Completa
                            </HealingOptionTitle>
                            <HealingOptionDescription>
                                Restaura 100% de HP e Energia
                            </HealingOptionDescription>
                            <ActionButton 
                                $variant="success"
                                onClick={() => handleHealPlayer('full')}
                                disabled={!player || player.coins < 100}
                            >
                                💰 100 moedas
                            </ActionButton>
                        </HealingOption>
                    </HealingOptionsContainer>

                    <ResourceDisplay>
                        <div className="resource-item">
                            <span className="resource-icon">💰</span>
                            <div>
                                <div className="resource-label">Moedas</div>
                                <div className="resource-value">{player?.coins || 0}</div>
                            </div>
                        </div>
                    </ResourceDisplay>

                    <ActionButton onClick={() => setShowHealingStation(false)}>
                        Fechar
                    </ActionButton>
                </FloorModal>
            )}

            {/* Modal: Loja de Poções */}
            {showPotionShop && (
                <FloorModal>
                    <h2>🧪 Loja de Poções</h2>
                    <ModalDescription>
                        Adquira consumíveis para usar em batalha
                    </ModalDescription>

                    <ResourceDisplay>
                        <div className="resource-item">
                            <span className="resource-icon">💰</span>
                            <div>
                                <div className="resource-label">Moedas</div>
                                <div className="resource-value">{player?.coins || 0}</div>
                            </div>
                        </div>
                        <div className="resource-item">
                            <span className="resource-icon">🎒</span>
                            <div>
                                <div className="resource-label">Itens</div>
                                <div className="resource-value">{totalConsumables}</div>
                            </div>
                        </div>
                    </ResourceDisplay>

                    {/* Filtros */}
                    <FiltersContainer>
                        <ActionButton 
                            $variant={filter === 'all' ? 'success' : 'primary'}
                            onClick={() => setFilter('all')}
                        >
                            Todos
                        </ActionButton>
                        <ActionButton 
                            $variant={filter === 'potion' ? 'success' : 'primary'}
                            onClick={() => setFilter('potion')}
                        >
                            🧪 Poções
                        </ActionButton>
                        <ActionButton 
                            $variant={filter === 'elixir' ? 'success' : 'primary'}
                            onClick={() => setFilter('elixir')}
                        >
                            ⚗️ Elixires
                        </ActionButton>
                        <ActionButton 
                            $variant={filter === 'buff' ? 'success' : 'primary'}
                            onClick={() => setFilter('buff')}
                        >
                            💪 Buffs
                        </ActionButton>
                        <ActionButton 
                            $variant={filter === 'food' ? 'success' : 'primary'}
                            onClick={() => setFilter('food')}
                        >
                            🍖 Comida
                        </ActionButton>
                    </FiltersContainer>

                    <ConsumablesGrid>
                        {filteredConsumables.map(consumable => (
                            <ConsumableCard
                                key={consumable.id}
                                $owned={consumable.owned > 0}
                                onClick={() => setSelectedConsumable(consumable)}
                            >
                                <ConsumableIcon>
                                    {consumable.icon}
                                </ConsumableIcon>
                                <h3>{consumable.name}</h3>
                                <ConsumableDescription>
                                    {consumable.description}
                                </ConsumableDescription>

                                {consumable.effects.hpRestore && (
                                    <ConsumableEffect>❤️ HP: +{consumable.effects.hpRestore}%</ConsumableEffect>
                                )}
                                {consumable.effects.staminaRestore && (
                                    <ConsumableEffect>⚡ Energia: +{consumable.effects.staminaRestore}%</ConsumableEffect>
                                )}
                                {consumable.effects.buffDuration && (
                                    <ConsumableEffect>⏱️ Duração: {consumable.effects.buffDuration} batalhas</ConsumableEffect>
                                )}
                                {consumable.effects.buffType && (
                                    <ConsumableSpecialEffect>✨ {consumable.effects.buffType}</ConsumableSpecialEffect>
                                )}
                                {consumable.effects.special && (
                                    <ConsumableBuffEffect>
                                        ⭐ {consumable.effects.special}
                                    </ConsumableBuffEffect>
                                )}

                                <div className="skill-cost">
                                    💰 {consumable.cost} moedas
                                </div>

                                {consumable.owned > 0 && (
                                    <ConsumableOwnedBadge>
                                        🎒 Você tem: {consumable.owned}
                                    </ConsumableOwnedBadge>
                                )}
                            </ConsumableCard>
                        ))}
                    </ConsumablesGrid>

                    <ActionButton onClick={() => setShowPotionShop(false)}>
                        Fechar
                    </ActionButton>
                </FloorModal>
            )}

            {/* Modal: Detalhes do Consumível */}
            {selectedConsumable && (
                <FloorModal>
                    <ConsumableDetailsIcon>
                        {selectedConsumable.icon}
                    </ConsumableDetailsIcon>

                    <h2>{selectedConsumable.name}</h2>
                    
                    <ConsumableDetailsDescription>
                        {selectedConsumable.description}
                    </ConsumableDetailsDescription>

                    <EffectsSection>
                        <h3>📊 Efeitos:</h3>
                        {selectedConsumable.effects.hpRestore && (
                            <p>❤️ Restaura {selectedConsumable.effects.hpRestore}% de HP</p>
                        )}
                        {selectedConsumable.effects.staminaRestore && (
                            <p>⚡ Restaura {selectedConsumable.effects.staminaRestore}% de Energia</p>
                        )}
                        {selectedConsumable.effects.buffDuration && (
                            <p>⏱️ Duração: {selectedConsumable.effects.buffDuration} batalhas</p>
                        )}
                        {selectedConsumable.effects.buffType && (
                            <EffectText $color="#ffd700">
                                ✨ Efeito: {selectedConsumable.effects.buffType}
                            </EffectText>
                        )}
                        {selectedConsumable.effects.special && (
                            <EffectText $color="#90ee90">
                                ⭐ {selectedConsumable.effects.special}
                            </EffectText>
                        )}
                    </EffectsSection>

                    {selectedConsumable.owned > 0 && (
                        <OwnedSection>
                            <p>
                                🎒 Você possui: <strong>{selectedConsumable.owned}</strong>
                            </p>
                        </OwnedSection>
                    )}

                    <PriceSection $canAfford={canAfford(selectedConsumable)}>
                        <h3>
                            💰 Preço: {selectedConsumable.cost} moedas
                        </h3>
                        <PlayerCoinsText $canAfford={player ? player.coins >= selectedConsumable.cost : false}>
                            Você tem: {player?.coins || 0} moedas
                        </PlayerCoinsText>
                    </PriceSection>

                    <ButtonsContainer>
                        <ActionButton 
                            $variant="success"
                            onClick={() => handlePurchaseConsumable(selectedConsumable, 1)}
                            disabled={!canAfford(selectedConsumable)}
                        >
                            Comprar 1x
                        </ActionButton>
                        <ActionButton 
                            $variant="success"
                            onClick={() => handlePurchaseConsumable(selectedConsumable, 5)}
                            disabled={!canAfford(selectedConsumable, 5)}
                        >
                            Comprar 5x
                        </ActionButton>
                        <ActionButton 
                            $variant="success"
                            onClick={() => handlePurchaseConsumable(selectedConsumable, 10)}
                            disabled={!canAfford(selectedConsumable, 10)}
                        >
                            Comprar 10x
                        </ActionButton>
                        <ActionButton onClick={() => setSelectedConsumable(null)}>
                            Voltar
                        </ActionButton>
                    </ButtonsContainer>
                </FloorModal>
            )}
        </>
    );
};

export default Laboratory;