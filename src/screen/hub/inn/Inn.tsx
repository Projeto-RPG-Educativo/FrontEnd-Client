// src/Screen/Hub/components/Home/HomeScreen.tsx
import React, { useState } from 'react';
import { type Player } from '../../../types';
import { 
  InnContainer, 
  InnPanel, 
  InnTitle, 
  InnDescription,
  SaveSlotsContainer,
  SaveSlot,
  SlotHeader,
  SlotName,
  SlotInfo,
  SaveButton,
  BackButton,
  SuccessMessage,
  ErrorMessage,
  LoadingSpinner,
  WelcomeMessage,
} from './Inn.styles';

import {INN_IMAGES } from '../../../constants/assets/InnAssets';

interface InnProps {
  player: Player | null;
  onBack: () => void;
  onSaveGame: (slotName: string) => Promise<boolean>;
  isLoading: boolean;
}

const Inn: React.FC<InnProps> = ({ 
  player, 
  onBack, 
  onSaveGame,
  isLoading 
}) => {
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const SAVE_SLOTS = [
    { id: 1, name: 'Slot 1' },
    { id: 2, name: 'Slot 2' },
    { id: 3, name: 'Slot 3' },
    { id: 4, name: 'Slot 4' },
    { id: 5, name: 'Slot 5' },
  ];

  const handleSaveClick = async (slotName: string) => {
    if (!player) {
      setMessage({ type: 'error', text: 'Nenhum personagem carregado!' });
      return;
    }

    setSelectedSlot(slotName);
    setMessage(null);

    try {
      const success = await onSaveGame(slotName);
      
      if (success) {
        setMessage({ 
          type: 'success', 
          text: `✅ Jogo salvo em ${slotName} com sucesso!` 
        });
        
        // Limpar mensagem após 3 segundos
        setTimeout(() => setMessage(null), 3000);
      } else {
        setMessage({ 
          type: 'error', 
          text: '❌ Erro ao salvar o jogo. Tente novamente.' 
        });
      }
    } catch (error) {
      console.error('Erro ao salvar:', error);
      setMessage({ 
        type: 'error', 
        text: '❌ Erro inesperado ao salvar.' 
      });
    } finally {
      setSelectedSlot(null);
    }
  };

  return (
    <InnContainer $backgroundImage={INN_IMAGES.Room}>
      <BackButton onClick={onBack}>
        🏛️ Voltar ao Hub Central
      </BackButton>

      <InnPanel>
        <InnTitle>🏠 Casa do Aventureiro</InnTitle>

        {player && (
          <InnDescription>
            Bem-vindo à sua casa, <strong>{player.name}</strong>! <br />
            Aqui você pode salvar seu progresso com segurança.
          </InnDescription>
        )}

        {!player && (
          <InnDescription>
            ⚠️ Nenhum personagem carregado. Volte ao menu principal.
          </InnDescription>
        )}

        {/* Mensagens de Feedback */}
        {message && (
          message.type === 'success' 
            ? <SuccessMessage>{message.text}</SuccessMessage>
            : <ErrorMessage>{message.text}</ErrorMessage>
        )}

        {/* Loading Spinner */}
        {isLoading && (
          <LoadingSpinner>💾 Salvando...</LoadingSpinner>
        )}

        {/* Slots de Save */}
        {player && !isLoading && (
          <>
           <WelcomeMessage>
              💾 Escolha um Slot para Salvar:
            </WelcomeMessage>
            
            <SaveSlotsContainer>
              {SAVE_SLOTS.map((slot) => (
                <SaveSlot 
                  key={slot.id}
                  $isSelected={selectedSlot === slot.name}
                >
                  <SlotHeader>
                    <SlotName>💾 {slot.name}</SlotName>
                  </SlotHeader>
                  
                  <SlotInfo>
                    {player.name} - Nível {player.level} <br />
                    {player.className} | {player.coins} 💰
                  </SlotInfo>

                  <SaveButton 
                    onClick={() => handleSaveClick(slot.name)}
                    disabled={isLoading}
                  >
                    {selectedSlot === slot.name ? 'Salvando...' : 'Salvar Aqui'}
                  </SaveButton>
                </SaveSlot>
              ))}
            </SaveSlotsContainer>
          </>
        )}
      </InnPanel>
    </InnContainer>
  );
};

export default Inn;