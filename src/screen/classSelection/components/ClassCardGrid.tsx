import React, { useState } from 'react';
import { type ClassName, type FullClassData } from '../../../types/Character';
import * as S from '../Class.styles';
import { CHARACTER_IMAGES, classNameToImageType } from '../../../constants/CharacterAssets';

interface ClassCardGridProps {
  classes: FullClassData[];
  selectedClassName: ClassName | null;
  onClassClick: (cls: FullClassData) => void;
}

// Animações para melhor UX
const gridVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      staggerChildren: 0.1,
      delayChildren: 0.2
    } 
  }
};

const cardVariants = {
  hidden: { 
    scale: 0.8, 
    opacity: 0,
    y: 20 
  },
  visible: { 
    scale: 1, 
    opacity: 1,
    y: 0,
    transition: { 
      type: 'spring' as const, 
      stiffness: 120,
      damping: 10
    } 
  },
};

const ClassCardGrid: React.FC<ClassCardGridProps> = ({ 
  classes, 
  selectedClassName, 
  onClassClick 
}) => {
  // Estado para rastrear imagens que já tentaram carregar e falharam
  const [failedImages, setFailedImages] = useState<Set<string>>(new Set());
  const [hiddenImages, setHiddenImages] = useState<Set<string>>(new Set());

  // Função para lidar com erro de imagem - TENTA APENAS UMA VEZ
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>, className: string) => {
    const currentSrc = e.currentTarget.src;
    console.warn(`❌ Imagem não encontrada para ${className}:`, currentSrc);
    
    // Adiciona à lista de falhas
    setFailedImages(prev => new Set([...prev, currentSrc]));
    
    // Esconde a imagem (não tenta fallback)
    setHiddenImages(prev => new Set([...prev, className]));
    
    // Esconde o elemento img
    e.currentTarget.style.display = 'none';
  };

  // Função para obter a imagem da classe (tenta apenas uma vez)
  const getClassImageSafe = (cls: FullClassData): string | null => {
    // Se já falhou, não retorna imagem
    if (hiddenImages.has(cls.name)) {
      return null;
    }
    
    // Primeiro tenta usar a imagem que vem da API/dados combinados
    if (cls.image && cls.image !== '' && !failedImages.has(cls.image)) {
      return cls.image;
    }
    
    // Fallback: usa o sistema de assets tipado
    const imageType = classNameToImageType(cls.name);
    const assetImage = CHARACTER_IMAGES[imageType];
    
    // Se essa imagem também está na lista de falhas, não retorna
    if (failedImages.has(assetImage)) {
      return null;
    }
    
    return assetImage;
  };

  // Função para determinar dificuldade baseada nos stats
  const getClassDifficulty = (cls: FullClassData): 'easy' | 'medium' | 'hard' => {
    const totalStats = cls.hp + cls.stamina + cls.strength + cls.intelligence;
    if (totalStats <= 100) return 'easy';
    if (totalStats <= 150) return 'medium';
    return 'hard';
  };

  // Função para renderizar cada card
  const renderClassCard = (cls: FullClassData) => {
    const imageUrl = getClassImageSafe(cls);
    const isImageHidden = hiddenImages.has(cls.name);
    
    return (
      <S.ClassCard
        key={cls.name}
        $isSelected={selectedClassName === cls.name}
        onClick={() => onClassClick(cls)}
        variants={cardVariants}
        whileHover={{ 
          scale: 1.05,
          rotateY: 5,
          transition: { duration: 0.2 }
        }}
        whileTap={{ scale: 0.95 }}
        layout
      >
        <S.CardImageWrapper>
          {/* Só renderiza a imagem se tiver URL e não estiver escondida */}
          {imageUrl && !isImageHidden ? (
            <S.ClassImage 
              src={imageUrl}
              alt={`${cls.name} - Classe de RPG`}
              onError={(e) => handleImageError(e, cls.name)}
            />
          ) : (
            // Placeholder visual quando não há imagem
            <S.ImagePlaceholder>
              <S.PlaceholderIcon>🎭</S.PlaceholderIcon>
              <S.PlaceholderText>{cls.name}</S.PlaceholderText>
            </S.ImagePlaceholder>
          )}
          
          {/* Badge de dificuldade baseada nos stats */}
          <S.DifficultyBadge $difficulty={getClassDifficulty(cls)}>
            {getClassDifficulty(cls) === 'easy' && '🟢'}
            {getClassDifficulty(cls) === 'medium' && '🟡'}
            {getClassDifficulty(cls) === 'hard' && '🔴'}
          </S.DifficultyBadge>
        </S.CardImageWrapper>
        
        <S.CardContent>
          <S.ClassNameTag>{cls.name}</S.ClassNameTag>
          
          <S.ClassDescription>
            {cls.description}
          </S.ClassDescription>
          
          <S.ClassStats>
            <S.StatItem>
              <span>⚔️</span>
              {cls.strength}
            </S.StatItem>
            <S.StatItem>
              <span>🛡️</span>
              {cls.stamina}
            </S.StatItem>
            <S.StatItem>
              <span>❤️</span>
              {cls.hp}
            </S.StatItem>
            <S.StatItem>
              <span>🧠</span>
              {cls.intelligence}
            </S.StatItem>
          </S.ClassStats>
        </S.CardContent>
      </S.ClassCard>
    );
  };

  return (
    <S.ClassGrid
      initial="hidden"
      animate="visible"
      variants={gridVariants}
    >
      {classes.map(renderClassCard)}
    </S.ClassGrid>
  );
};

export default ClassCardGrid;
