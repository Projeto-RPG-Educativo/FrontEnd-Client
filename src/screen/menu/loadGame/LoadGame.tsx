import React, { useEffect } from 'react';
import * as S from '../main/Menu.styles';
import { useLoadGame } from '../../../hooks/screen/menu/useLoadGame';

import type { DisplaySlot, SaveData } from '../../../types/dto/Save';

interface LoadGameProps {
  slots: DisplaySlot[];
  isLoading: boolean;
  error: string | null;
  fetchSaves: () => void;
  onLoadGame: (saveData: SaveData | null) => void;
}

const LoadGame: React.FC<LoadGameProps> = ({
  slots: propsSlots,
  isLoading: propsIsLoading,
  error: propsError,
  fetchSaves,
  onLoadGame
}) => {
  
  const {
    formatDate,
  } = useLoadGame();

  useEffect(() => {
    fetchSaves();
  }, []);

  const handleLoadGameClick = async (slotId: number) => {
    const slot = propsSlots.find(s => s.id === slotId);
    if (slot?.saveData) {
      console.log('✅ Jogo carregado:', slot.saveData);
      onLoadGame(slot.saveData);
    }
  };


  const renderEmptyState = () => (
    <S.EmptyStateContainer>
      <S.EmptyStateIcon>💾</S.EmptyStateIcon>
      <S.EmptyStateText>Nenhum save encontrado</S.EmptyStateText>
      <S.EmptyStateSubtext>
        Comece um novo jogo para criar seu primeiro save!
      </S.EmptyStateSubtext>
    </S.EmptyStateContainer>
  );

  const renderSlot = (slot: typeof propsSlots[0]) => (
    <S.SaveSlot
      key={slot.id}
      $hasData={!!slot.saveData}
      onClick={() => slot.saveData && handleLoadGameClick(slot.id)}
      disabled={!slot.saveData || propsIsLoading}
    >
      {slot.saveData ? (
        <>
          <S.SlotHeader>
            <S.SlotName>{slot.name}</S.SlotName>
            <S.SlotDate>{formatDate(slot.saveData.createdAt)}</S.SlotDate>
          </S.SlotHeader>
          
          <S.SlotDetails>
            <S.SlotProgress>
              <span>📊</span>
              {slot.progress}
            </S.SlotProgress>
            
            <S.SlotLevel>
              <span>⭐</span>
              Nível {slot.saveData.playerLevel || 1}
            </S.SlotLevel>
            
            <S.SlotLocation>
              <span>📍</span>
              {slot.name || 'Jogo Salvo'}
            </S.SlotLocation>
          </S.SlotDetails>
        </>
      ) : (
        <S.EmptySlot>
          <S.EmptySlotIcon>💾</S.EmptySlotIcon>
          <S.EmptySlotText>Slot Vazio</S.EmptySlotText>
        </S.EmptySlot>
      )}
    </S.SaveSlot>
  );

  return (
    <S.MenuContentArea>
      <S.SaveDataHeader>
        <h2>
          CARREGAR JOGO 
          {propsIsLoading && <S.LoadingIndicator>⏳</S.LoadingIndicator>}
        </h2>
        
        <S.RefreshButton onClick={fetchSaves} disabled={propsIsLoading}>
          🔄 Atualizar
        </S.RefreshButton>
      </S.SaveDataHeader>
      
      {propsError && (
        <div>
          ⚠️ {propsError}
        </div>
      )}
      
      <S.SaveSlotsList>
        {propsIsLoading ? (
          <S.LoadingContainer>
            <S.LoadingSpinner>⏳</S.LoadingSpinner>
            <S.LoadingText>Carregando saves...</S.LoadingText>
          </S.LoadingContainer>
        ) : propsSlots.length === 0 ? (
          renderEmptyState()
        ) : (
          propsSlots.map(renderSlot)
        )}
      </S.SaveSlotsList>
    </S.MenuContentArea>
  );
};

export default LoadGame;