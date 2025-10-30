import React from 'react';
import { AnimatePresence } from 'framer-motion';
import * as S from '../Class.styles';
import type { FullClassData } from '../../../types';

interface ClassDetailsPanelProps {
  selectedClass: FullClassData | null;
  onConfirm: () => void;
  onCancel: () => void;
}

const ClassDetailPanel: React.FC<ClassDetailsPanelProps> = ({
  selectedClass,
  onConfirm,
  onCancel,
}) => {
  // Função para calcular o total de stats
  const getTotalStats = (cls: FullClassData) => {
    return (cls.hp || 0) + (cls.stamina || 0) + (cls.strength || 0) + (cls.intelligence || 0);
  };

  // Função para determinar o ranking da classe
  const getClassRank = (totalStats: number) => {
    if (totalStats >= 180) return { rank: 'S', color: '#ffcc00' };
    if (totalStats >= 150) return { rank: 'A', color: '#4caf50' };
    if (totalStats >= 120) return { rank: 'B', color: '#2196f3' };
    return { rank: 'C', color: '#9e9e9e' };
  };

  // Estado vazio quando nenhuma classe está selecionada
  const renderEmptyState = () => (
    <S.DetailsPanel
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50 }}
      transition={{ duration: 0.3 }}
    >
      <S.EmptyDetailsState>
        <S.EmptyDetailsIcon>🎭</S.EmptyDetailsIcon>
        <S.EmptyDetailsText>Selecione um Herói</S.EmptyDetailsText>
        <S.EmptyDetailsSubtext>
          Clique em um dos heróis acima para ver seus detalhes e habilidades
        </S.EmptyDetailsSubtext>
      </S.EmptyDetailsState>
    </S.DetailsPanel>
  );

  return (
    <AnimatePresence mode="wait">
      {selectedClass ? (
        <S.DetailsPanel
          key={selectedClass.name}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 50 }}
          transition={{ duration: 0.3 }}
        >
          <S.DetailsBox>
            {/* Header com imagem e nome */}
            <S.DetailsHeader>
              <S.DetailsImage 
               // src={selectedClass.image} 
                alt={selectedClass.name}
              />
              <S.DetailsNameWrapper>
                <S.DetailsName>{selectedClass.name}</S.DetailsName>
                <S.ClassRankBadge $color={getClassRank(getTotalStats(selectedClass)).color}>
                  Rank {getClassRank(getTotalStats(selectedClass)).rank}
                </S.ClassRankBadge>
              </S.DetailsNameWrapper>
            </S.DetailsHeader>

            <S.DetailsContent>
              {/* Descrição */}
              <S.DetailsSection>
                <S.SectionTitle>📖 HISTÓRIA</S.SectionTitle>
                <S.DetailsDescription>
                  {/* {selectedClass.description} */}
                </S.DetailsDescription>
              </S.DetailsSection>

              {/* Efeito especial */}
              <S.DetailsSection>
                <S.SectionTitle>✨ HABILIDADE ESPECIAL</S.SectionTitle>
                <S.DetailsEffect>
                  {/* {selectedClass.effect} */}
                </S.DetailsEffect>
              </S.DetailsSection>

              {/* Stats detalhados */}
              <S.DetailsSection>
                <S.SectionTitle>📊 ATRIBUTOS</S.SectionTitle>
                <S.DetailedStats>
                  <S.StatRow>
                    <S.StatLabel>
                      <span>❤️</span>
                      Pontos de Vida
                    </S.StatLabel>
                    <S.StatBarWrapper>
                      <S.StatBar $value={selectedClass.hp || 0} $maxValue={100} />
                      <S.StatValue>{selectedClass.hp || 0}</S.StatValue>
                    </S.StatBarWrapper>
                  </S.StatRow>

                  <S.StatRow>
                    <S.StatLabel>
                      <span>🔋</span>
                      Resistência
                    </S.StatLabel>
                    <S.StatBarWrapper>
                      <S.StatBar $value={selectedClass.stamina || 0} $maxValue={100} />
                      <S.StatValue>{selectedClass.stamina || 0}</S.StatValue>
                    </S.StatBarWrapper>
                  </S.StatRow>

                  <S.StatRow>
                    <S.StatLabel>
                      <span>⚔️</span>
                      Força Física
                    </S.StatLabel>
                    <S.StatBarWrapper>
                      <S.StatBar $value={selectedClass.strength || 0} $maxValue={100} />
                      <S.StatValue>{selectedClass.strength || 0}</S.StatValue>
                    </S.StatBarWrapper>
                  </S.StatRow>

                  <S.StatRow>
                    <S.StatLabel>
                      <span>🧠</span>
                      Inteligência
                    </S.StatLabel>
                    <S.StatBarWrapper>
                      <S.StatBar $value={selectedClass.intelligence || 0} $maxValue={100} />
                      <S.StatValue>{selectedClass.intelligence || 0}</S.StatValue>
                    </S.StatBarWrapper>
                  </S.StatRow>

                  <S.TotalStatsRow>
                    <S.TotalStatsLabel>📈 TOTAL</S.TotalStatsLabel>
                    <S.TotalStatsValue>{getTotalStats(selectedClass)}</S.TotalStatsValue>
                  </S.TotalStatsRow>
                </S.DetailedStats>
              </S.DetailsSection>

              {/* Botões de ação */}
              <S.DetailsButtons>
                <S.ConfirmButton onClick={onConfirm}>
                  🚀 ESCOLHER HERÓI
                </S.ConfirmButton>
                <S.CancelButton onClick={onCancel}>
                  ↩️ VOLTAR
                </S.CancelButton>
              </S.DetailsButtons>
            </S.DetailsContent>
          </S.DetailsBox>
        </S.DetailsPanel>
      ) : (
        renderEmptyState()
      )}
    </AnimatePresence>
  );
};

export default ClassDetailPanel;
