import React, { useState } from 'react';
import { useFullscreen } from '.././../../contexts/FullscreenContext';
import * as S from '../main/Menu.styles';

// --- Componentes Filhos Refatorados ---

const AudioSettings: React.FC = () => {
  const [musicVolume, setMusicVolume] = useState(50);
  const [effectsVolume, setEffectsVolume] = useState(70);
  const [isMuted, setIsMuted] = useState(false);

  return (
    <S.SettingsContentSection>
      <S.ContentTitle>🔊 ÁUDIO</S.ContentTitle>

      <S.SettingOption>
        <S.SettingLabel>Volume da Música: {musicVolume}%</S.SettingLabel>
        <S.VolumeSlider
          type="range"
          min="0"
          max="100"
          value={musicVolume}
          onChange={(e) => setMusicVolume(Number(e.target.value))}
          disabled={isMuted}
        />
      </S.SettingOption>

      <S.SettingOption>
        <S.SettingLabel>Volume de Efeitos: {effectsVolume}%</S.SettingLabel>
        <S.VolumeSlider
          type="range"
          min="0"
          max="100"
          value={effectsVolume}
          onChange={(e) => setEffectsVolume(Number(e.target.value))}
          disabled={isMuted}
        />
      </S.SettingOption>

      <S.SettingOption>
        <S.SettingLabel>Silenciar Tudo</S.SettingLabel>
        <S.ToggleButton 
          $isActive={isMuted} 
          onClick={() => setIsMuted(!isMuted)}
        >
          {isMuted ? '🔇 MUDO' : '🔊 ATIVO'}
        </S.ToggleButton>
      </S.SettingOption>
    </S.SettingsContentSection>
  );
};

interface VideoSettingsProps {
  toggleFullScreen: () => void;
}

const VideoSettings: React.FC<VideoSettingsProps> = ({ toggleFullScreen }) => {
  const [vsync, setVsync] = useState(true);
  const [quality, setQuality] = useState('medium');

  const qualityOptions = [
    { value: 'low', label: 'BAIXA', description: 'Melhor performance' },
    { value: 'medium', label: 'MÉDIA', description: 'Equilibrado' },
    { value: 'high', label: 'ALTA', description: 'Melhor qualidade' },
  ];

  return (
    <S.SettingsContentSection>
      <S.ContentTitle>🖥️ VÍDEO</S.ContentTitle>

      <S.SettingOption>
        <S.SettingLabel>Modo de Tela</S.SettingLabel>
        <S.SettingsButton onClick={toggleFullScreen}>
          📺 ALTERNAR TELA CHEIA
        </S.SettingsButton>
      </S.SettingOption>

      <S.SettingOption>
        <S.SettingLabel>Qualidade Gráfica</S.SettingLabel>
        <S.QualityButtonGroup>
          {qualityOptions.map(({ value, label, description }) => (
            <S.QualityButton
              key={value}
              $isActive={quality === value}
              onClick={() => setQuality(value)}
              title={description}
            >
              {label}
            </S.QualityButton>
          ))}
        </S.QualityButtonGroup>
      </S.SettingOption>

      <S.SettingOption>
        <S.SettingLabel>Sincronização Vertical (V-Sync)</S.SettingLabel>
        <S.ToggleButton 
          $isActive={vsync} 
          onClick={() => setVsync(!vsync)}
        >
          {vsync ? '✅ ATIVO' : '❌ INATIVO'}
        </S.ToggleButton>
      </S.SettingOption>
    </S.SettingsContentSection>
  );
};

const GameSettings: React.FC = () => {
  const [autoSave, setAutoSave] = useState(true);
  const [notifications, setNotifications] = useState(true);

  return (
    <S.SettingsContentSection>
      <S.ContentTitle>🎮 JOGO</S.ContentTitle>

      <S.SettingOption>
        <S.SettingLabel>Salvamento Automático</S.SettingLabel>
        <S.ToggleButton 
          $isActive={autoSave} 
          onClick={() => setAutoSave(!autoSave)}
        >
          {autoSave ? '💾 ATIVO' : '💾 INATIVO'}
        </S.ToggleButton>
      </S.SettingOption>

      <S.SettingOption>
        <S.SettingLabel>Notificações do Sistema</S.SettingLabel>
        <S.ToggleButton 
          $isActive={notifications} 
          onClick={() => setNotifications(!notifications)}
        >
          {notifications ? '🔔 ATIVO' : '🔕 INATIVO'}
        </S.ToggleButton>
      </S.SettingOption>

      <S.SettingOption>
        <S.SettingLabel>Controles</S.SettingLabel>
        <S.SettingsButton onClick={() => alert('Em desenvolvimento!')}>
          ⌨️ REMAPEAR TECLAS
        </S.SettingsButton>
      </S.SettingOption>
    </S.SettingsContentSection>
  );
};

// --- Componente Principal ---

type SettingsSection = 'audio' | 'video' | 'actions';

const Settings: React.FC = () => {
  const { toggleFullScreen } = useFullscreen();
  const [activeSettingsSection, setActiveSettingsSection] = useState<SettingsSection>('audio');

  const settingsTabs = [
    { key: 'audio' as const, label: '🔊 Áudio', component: <AudioSettings /> },
    { key: 'video' as const, label: '🖥️ Vídeo', component: <VideoSettings toggleFullScreen={toggleFullScreen} /> },
    { key: 'actions' as const, label: '🎮 Jogo', component: <GameSettings /> },
  ];

  const activeTab = settingsTabs.find(tab => tab.key === activeSettingsSection);

  return (
    <S.PanelContainer>
      <S.HorizontalTabsMenu>
        {settingsTabs.map(({ key, label }) => (
          <S.TabItem 
            key={key}
            $isActive={activeSettingsSection === key} 
            onClick={() => setActiveSettingsSection(key)}
          >
            {label}
          </S.TabItem>
        ))}
      </S.HorizontalTabsMenu>
      
      <S.SettingsContentArea>
        {activeTab?.component}
      </S.SettingsContentArea>
    </S.PanelContainer>
  );
};

export default Settings;