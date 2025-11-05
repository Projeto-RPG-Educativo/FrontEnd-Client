import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './LoadingScreen.css';
import { LOADING_IMAGES } from '../../constants/assets/loading/LoadingAssets';

// Lista de dicas para o jogo
const tips = [
  'Dica: Fique atento aos diálogos para descobrir mais sobre a história.',
  'Dica: Use suas habilidades especiais para causar mais dano.',
  'Dica: Respostas corretas não só derrotam o inimigo, como fortalecem o seu herói!',
  'Dica: Gerencie sua vida com cuidado! Uma resposta errada pode ser fatal.',
  'Dica: Cada classe tem suas próprias vantagens. Escolha com sabedoria!',
  'Dica: Explore diferentes estratégias para cada tipo de inimigo.',
  'Dica: A Torre do Conhecimento oferece upgrades valiosos para seu personagem.',
  'Dica: No Hub Central, você pode acessar diferentes áreas do jogo.',
];

interface LoadingScreenProps {
  onLoadingComplete: () => void;
  tutorialEnabled?: boolean;
}

const Loading = ({ onLoadingComplete, tutorialEnabled = false }: LoadingScreenProps) => {
  const [progress, setProgress] = useState(0);
  const [currentTip, setCurrentTip] = useState('');
  const [currentBgImage, setCurrentBgImage] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);

  console.log('🎮 Loading iniciado com tutorial:', tutorialEnabled);

  // Lógica para o progresso aleatório
  useEffect(() => {
    const totalDuration = 8000; 
    const updateInterval = 100;
    const totalUpdates = totalDuration / updateInterval;
    let updatesDone = 0;

    const interval = setInterval(() => {
      setProgress(prevProgress => {
        if (prevProgress >= 100) {
          clearInterval(interval);
          setIsLoaded(true);
          return 100;
        }

        updatesDone++;
        const progressLeft = 100 - prevProgress;
        const updatesLeft = totalUpdates - updatesDone;

        if (updatesLeft <= 0) {
          return 100;
        }
        const randomIncrement = Math.random() * (progressLeft / updatesLeft) * 2;
        return Math.min(100, prevProgress + randomIncrement);
      });
    }, updateInterval);

    return () => clearInterval(interval);
  }, []);

  // Lógica para trocar a imagem de fundo usando o sistema de assets
  useEffect(() => {
    // Pega todas as imagens de loading disponíveis
    const backgroundImages = Object.values(LOADING_IMAGES);
    // Define a primeira imagem
    setCurrentBgImage(backgroundImages[0]);
    let imageIndex = 0;
    const imageInterval = setInterval(() => {
      imageIndex = (imageIndex + 1) % backgroundImages.length;
      setCurrentBgImage(backgroundImages[imageIndex]);
    }, 30000); // Muda a cada 30 segundos
    return () => clearInterval(imageInterval);
  }, []);

  // Lógica para trocar as dicas
  useEffect(() => {
    setCurrentTip(tips[0]);
    let tipIndex = 0;
    const tipInterval = setInterval(() => {
      tipIndex = (tipIndex + 1) % tips.length;
      setCurrentTip(tips[tipIndex]);
    }, 30000); // Muda a cada 30 segundos
    
    return () => clearInterval(tipInterval);
  }, []);
  
  // Lógica para detectar o clique de qualquer tecla e avançar
  useEffect(() => {
    if (isLoaded) {
      const handleKeyPress = () => {
        onLoadingComplete();
      };
      const handleClick = () => {
        onLoadingComplete();
      };
      window.addEventListener('keydown', handleKeyPress);
      window.addEventListener('click', handleClick);
      return () => {
        window.removeEventListener('keydown', handleKeyPress);
        window.removeEventListener('click', handleClick);
      };
    }
  }, [isLoaded, onLoadingComplete]);

  // Função para lidar com erro de carregamento da imagem
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    console.warn('❌ Falha ao carregar imagem de loading:', currentBgImage);
    e.currentTarget.src = LOADING_IMAGES['loading1'];
  };

  return (
    <div 
      className="loading-container" 
      style={{ 
        backgroundImage: currentBgImage ? `url(${currentBgImage})` : 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Imagem oculta para preload */}
      {currentBgImage && (
        <img 
          src={currentBgImage} 
          alt="Loading background" 
          style={{ display: 'none' }} 
          onError={handleImageError}
        />
      )}
      
      <div className="overlay">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="tips-box"
        >
          {currentTip}
        </motion.div>
      </div>
      
      {isLoaded && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="continue-message"
        >
          {tutorialEnabled 
            ? '📚 PREPARANDO TUTORIAL... CLIQUE PARA CONTINUAR' 
            : 'CLIQUE QUALQUER TECLA OU MOUSE PARA CONTINUAR'}
        </motion.div>
      )}

      <div className="progress-bar-area">
        <div className="progress-bar-container">
          <div
            className="progress-bar"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <p className="progress-text">{Math.round(progress)}%</p>
      </div>
    </div>
  );
};

export default Loading;
