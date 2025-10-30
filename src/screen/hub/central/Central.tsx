import React from 'react';
import { type Player } from '../../../types';
import { HubContainer, Hotspot, StretchedImage } from '../Hub.styles'; 
import { HUB_IMAGES } from '../../../constants/assets/background/HubAssets';
import { HubLogic } from '../../../hooks/screen/hub/useHubScreen';

// --- Tipagem ---
type HubZone = 'TOWER' | 'ARENA' | 'LIBRARY' | 'SHOP' | 'EXIT';

interface CentralProps {
  player: Player | null; 
}

const Central: React.FC<CentralProps> = ({ player }) => {
  // ✅ Usar o hook diretamente
  const { goToHubZone, goToExit } = HubLogic();
  
  // ✅ Handler unificado
  const handleZoneClick = (zone: HubZone) => {
    if (zone === 'EXIT') {
      console.log('🚪 Saindo do hub');
      goToExit();
    } else {
      console.log('🗺️ Indo para zona:', zone);
      goToHubZone(zone);
    }
  };
  
  // Função para lidar com erro de carregamento da imagem
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    console.warn('❌ Falha ao carregar imagem do Hub Central:', e.currentTarget.src);
    e.currentTarget.style.display = 'none';
  };
  
  return (
    <HubContainer>
      <StretchedImage 
        src={HUB_IMAGES.central}
        alt="Hub Central da Universidade" 
        onError={handleImageError}
        loading="lazy"
      />
    
      {/* 1. O Palco da Retórica (ARENA) */}
      <Hotspot 
        $top="36%" 
        $left="22.8%" 
        onClick={() => handleZoneClick('ARENA')}
      >
        Palco da Retórica
      </Hotspot>

      {/* 2. A Torre do Conhecimento (TOWER) */}
      <Hotspot 
        $top="35%" 
        $left="44.8%" 
        onClick={() => handleZoneClick('TOWER')}
      >
        Torre do Conhecimento
      </Hotspot>

      {/* 3. O Sebo de Linguística (SHOP) */}
      <Hotspot 
        $top="82%" 
        $left="30.3%" 
        onClick={() => handleZoneClick('SHOP')}
      >
        Sebo de Linguística 
      </Hotspot>
      
      {/* 4. A Biblioteca Silenciosa (LIBRARY) */}
      <Hotspot 
        $top="62%" 
        $left="76.2%" 
        onClick={() => handleZoneClick('LIBRARY')}
      >
        Biblioteca Silenciosa
      </Hotspot>

      {/* 5. Saída */}
      <Hotspot 
        $top="2%" 
        $left="70%" 
        onClick={() => handleZoneClick('EXIT')}
      >
        SAÍDA
      </Hotspot>

    </HubContainer>
  );
};

export default Central;