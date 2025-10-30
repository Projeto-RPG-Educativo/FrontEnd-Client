// src/screens/battle/components/EnemySprite/EnemySprite.tsx
import React from 'react';
import { type Monster } from '../../../../../types';
import { getEnemyImageByName } from '../../../../../constants/assets/enemy/EnemyHelper';
import styled from 'styled-components';

interface EnemySpriteProps {
  enemy: Monster;
  className?: string;
}

const EnemySprite: React.FC<EnemySpriteProps> = ({ enemy, className }) => {
  // ✅ LÓGICA INTELIGENTE: Prioridade de imagem
  const getEnemySpriteImage = (): string => {
    // 1. Se o enemy já tem imagem definida, usar ela
    if (enemy.image) {
      console.log(`🖼️ Usando imagem manual do enemy: ${enemy.image}`);
      return enemy.image;
    }

    // 2. Usar o sistema de barrel baseado no nome
    const barrelImage = getEnemyImageByName(enemy.name);
    console.log(`🎯 Imagem do barrel para "${enemy.name}": ${barrelImage}`);
    return barrelImage;
  };

  const spriteImage = getEnemySpriteImage();

  // Debug logs
  console.log(`👹 Enemy Sprite Debug:`, {
    name: enemy.name,
    type: enemy.type,
    isBoss: enemy.isBoss,
    manualImage: enemy.image,
    finalImage: spriteImage
  });

  return (
    <EnemyStyle
      backgroundImage={spriteImage}
      className={className}
      onError={(e) => {
        console.warn(`❌ Falha ao carregar imagem do enemy: ${spriteImage}`);
        // Fallback: esconder ou usar imagem padrão
        e.currentTarget.style.display = 'none';
      }}
      onLoad={() => {
        console.log(`✅ Imagem do enemy carregada: ${spriteImage}`);
      }}
    />
  );
};

export const EnemyStyle = styled.div<{ backgroundImage: string }>`
  width: 300px;
  height: 340px;
  background-image: url(${props => props.backgroundImage});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  border: 4px solid #5d4037;
  border-radius: 10px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.5);
  transition: all 0.3s ease;

  /* Animação quando carrega */
  &:hover {
    transform: scale(1.02);
    box-shadow: 0 0 15px rgba(255, 0, 0, 0.3);
  }

  /* Estado de erro */
  &[data-error="true"] {
    background-color: #333;
    background-image: none;
    display: flex;
    align-items: center;
    justify-content: center;
    
    &::after {
      content: "🤖";
      font-size: 48px;
    }
  }
`;

export default EnemySprite;