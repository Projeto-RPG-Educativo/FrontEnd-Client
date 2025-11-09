# 🗂️ Estrutura de Arquivos - Sistema de Missões Integrado

## 📁 Arquivos Modificados

```
FrontEnd-Client/
│
├── src/
│   ├── screen/
│   │   │
│   │   ├── hub/
│   │   │   ├── central/
│   │   │   │   └── Central.tsx                    ✅ MODIFICADO
│   │   │   │       └── + QuestTracker integrado
│   │   │   │
│   │   │   └── tower/
│   │   │       └── floors/
│   │   │           └── F1/
│   │   │               └── Reception.tsx          ✅ MODIFICADO
│   │   │                   ├── + QuestBoard
│   │   │                   └── + QuestJournal
│   │   │
│   │   └── quests/                                ✅ NOVOS COMPONENTES
│   │       ├── QuestBoard.tsx                     ✨ NOVO
│   │       ├── QuestBoard.styles.ts               ✨ NOVO
│   │       ├── QuestJournal.tsx                   ✨ NOVO
│   │       ├── QuestJournal.styles.ts             ✨ NOVO
│   │       ├── index.ts                           ✨ NOVO
│   │       │
│   │       ├── components/
│   │       │   ├── QuestTracker.tsx               ✨ NOVO
│   │       │   ├── QuestTracker.styles.ts         ✨ NOVO
│   │       │   └── index.ts                       ✨ NOVO
│   │       │
│   │       └── docs/                              📚 DOCUMENTAÇÃO
│   │           ├── README.md                      ✅ EXISTENTE
│   │           ├── QUICKSTART.md                  ✅ EXISTENTE
│   │           ├── INTEGRATION.md                 ✨ NOVO
│   │           └── QUEST_ACHIEVEMENT_USAGE.md     ✅ EXISTENTE
│   │
│   └── hooks/
│       └── services/
│           └── useQuest.ts                        ⚠️ NECESSÁRIO
│
└── package.json
```

---

## 🎯 Mapa de Localização Visual

### Hub Central (Central.tsx)
```
┌─────────────────────────────────────────────┐
│ 🎮 Hub Central da Universidade              │
│                                             │
│  ┌──────────────┐                          │
│  │ QuestTracker │ ← ✨ NOVO (canto sup. esq.)
│  │ 📋 Missão 1  │                          │
│  │ ⚔️ Missão 2  │                          │
│  └──────────────┘                          │
│                                             │
│              🏛️                             │
│        [Palco Retórica]                     │
│                                             │
│    🏰                    📚                 │
│ [Torre]              [Biblioteca]           │
│                                             │
│       🏪                                    │
│    [Sebo]                                   │
│                                             │
└─────────────────────────────────────────────┘
```

### Torre - 1º Andar (Reception.tsx)
```
┌─────────────────────────────────────────────┐
│ 🏰 Torre do Conhecimento - 1º Andar         │
│                                             │
│                                             │
│  📋 [Quadro]              📖 [Diário]       │
│     ↓                         ↓             │
│  ✨ QuestBoard            ✨ QuestJournal   │
│  (Aceitar Novas)          (Gerenciar)       │
│                                             │
│  Lado Esquerdo            Lado Direito      │
│  - Ver disponíveis        - Ver ativas      │
│  - Ler detalhes           - Ver completas   │
│  - Aceitar missão         - Abandonar       │
│                                             │
│                                             │
│            [▲ Subir para 2º Andar]          │
│            [▼ Voltar ao Central]            │
└─────────────────────────────────────────────┘
```

---

## 🔄 Fluxo de Dados

```
┌──────────────────────────────────────────────────────────────┐
│                     SISTEMA DE MISSÕES                        │
└──────────────────────────────────────────────────────────────┘
                              │
                              ▼
        ┌─────────────────────────────────────────┐
        │         Backend API (Java)               │
        │  • getAllQuests()                        │
        │  • getActiveQuests()                     │
        │  • acceptQuest(id, charId)               │
        │  • abandonQuest(id, charId)              │
        │  • updateQuestProgress(id, progress)     │
        └─────────────────────────────────────────┘
                              │
                              ▼
        ┌─────────────────────────────────────────┐
        │    Hook: useQuest (src/hooks/services)   │
        │  • Gerencia estado                       │
        │  • Chama APIs                            │
        │  • Processa dados com helpers            │
        │  • Retorna dados enriquecidos            │
        └─────────────────────────────────────────┘
                              │
                ┌─────────────┴─────────────┐
                │                           │
                ▼                           ▼
    ┌───────────────────┐       ┌───────────────────┐
    │   QuestTracker    │       │  Torre - 1º Andar │
    │   (Central Hub)   │       │    (Reception)    │
    │                   │       │                   │
    │ • Usa:            │       │ • Usa:            │
    │   getActiveQuests │       │   getAllQuests    │
    │                   │       │                   │
    │ • Exibe:          │       ├─────────┬─────────┤
    │   5 missões       │       │         │         │
    │   ativas          │       ▼         ▼         │
    └───────────────────┘   ┌─────┐   ┌─────────┐  │
                            │ QB  │   │   QJ    │  │
                            └─────┘   └─────────┘  │
                            QuestBoard QuestJournal │
                                                    │
                            • Aceitar  • Gerenciar │
                            • Ver      • Abandonar │
                              detalhes   missões   │
                            └───────────────────────┘
```

---

## 📦 Componentes por Tela

### 🎮 Central Hub (Gameplay Principal)
**Arquivo:** `src/screen/hub/central/Central.tsx`

```tsx
import QuestTracker from '../../quests/components/QuestTracker';

// Renderização
return (
  <HubContainer>
    <StretchedImage src={HUB_IMAGES.central} />
    
    {/* ✨ NOVO: Quest Tracker */}
    {player && <QuestTracker characterId={player.id} />}
    
    {/* Hotspots existentes */}
    <Hotspot onClick={() => goToZone('TOWER')}>Torre</Hotspot>
    {/* ... outros hotspots ... */}
  </HubContainer>
);
```

**Responsabilidades:**
- ✅ Exibir QuestTracker no HUD
- ✅ Passar `player.id` para o tracker
- ✅ Manter navegação para outras áreas

---

### 🏰 Torre - 1º Andar (Recepção)
**Arquivo:** `src/screen/hub/tower/floors/F1/Reception.tsx`

```tsx
import QuestBoard from '../../../../quests/QuestBoard';
import QuestJournal from '../../../../quests/QuestJournal';

// Estado
const [showQuestBoard, setShowQuestBoard] = useState(false);
const [showQuestJournal, setShowQuestJournal] = useState(false);

// Renderização
return (
  <>
    {/* Área clicável do Quadro */}
    <QuestBoardVisual onClick={() => setShowQuestBoard(true)} />
    
    {/* Área clicável do Diário */}
    <QuestBoardVisual onClick={() => setShowQuestJournal(true)} />
    
    {/* ✨ NOVO: Mural de Missões */}
    {showQuestBoard && (
      <QuestBoard 
        characterId={player.id}
        onClose={() => setShowQuestBoard(false)}
      />
    )}
    
    {/* ✨ NOVO: Diário de Missões */}
    {showQuestJournal && (
      <QuestJournal 
        characterId={player.id}
        onClose={() => setShowQuestJournal(false)}
      />
    )}
  </>
);
```

**Responsabilidades:**
- ✅ Exibir áreas clicáveis para Quadro e Diário
- ✅ Controlar estado de abertura/fechamento
- ✅ Passar `player.id` para os componentes
- ✅ Gerenciar callbacks de fechamento

---

## 🧩 Componentes Novos

### 1. QuestTracker
**Local:** `src/screen/quests/components/QuestTracker.tsx`
**Props:**
```tsx
interface QuestTrackerProps {
  characterId: number;
  maxQuests?: number; // default: 5
  position?: 'top-left' | 'top-right'; // default: 'top-left'
}
```
**Funcionalidade:**
- Busca missões ativas via `getActiveQuests()`
- Exibe progresso formatado
- Destaca quando próximo da conclusão
- Atualiza automaticamente

---

### 2. QuestBoard (Mural)
**Local:** `src/screen/quests/QuestBoard.tsx`
**Props:**
```tsx
interface QuestBoardProps {
  characterId: number;
  onClose: () => void;
}
```
**Funcionalidade:**
- Busca todas as missões via `getAllQuests()`
- Filtra apenas disponíveis
- Exibe detalhes ao clicar
- Permite aceitar missões
- Re-busca dados após aceitar

---

### 3. QuestJournal (Diário)
**Local:** `src/screen/quests/QuestJournal.tsx`
**Props:**
```tsx
interface QuestJournalProps {
  characterId: number;
  onClose: () => void;
}
```
**Funcionalidade:**
- Busca todas as missões via `getAllQuests()`
- Sistema de abas (Ativas, Completas, Todas)
- Filtra por status
- Permite abandonar missões ativas
- Re-busca dados após abandonar

---

## 🎨 Arquitetura de Estilos

```
quests/
├── QuestBoard.styles.ts
│   ├── QuestBoardOverlay (Modal overlay)
│   ├── QuestBoardContainer (Pergaminho)
│   ├── QuestList (Lista de missões)
│   └── QuestItem (Item individual)
│
├── QuestJournal.styles.ts
│   ├── JournalOverlay (Modal overlay)
│   ├── JournalBook (Livro aberto)
│   ├── JournalTabs (Abas superiores)
│   ├── JournalPage (Conteúdo da página)
│   └── ActionButton (Botões de ação)
│
└── components/
    └── QuestTracker.styles.ts
        ├── TrackerContainer (Container HUD)
        ├── TrackerQuest (Item de missão)
        ├── ProgressBar (Barra de progresso)
        └── NearCompletionPulse (Animação)
```

---

## 🔧 Configuração Necessária

### 1. Hook useQuest
**Localização esperada:** `src/hooks/services/useQuest.ts`

```tsx
export const useQuest = (characterId: number | null) => {
  // APIs
  const getAllQuests = () => { /* ... */ };
  const getActiveQuests = () => { /* ... */ };
  const acceptQuest = (questId: number) => { /* ... */ };
  const abandonQuest = (questId: number) => { /* ... */ };
  
  // Helpers
  const enrichQuestInfo = (quest) => { /* ... */ };
  const sortQuestsByPriority = (quests) => { /* ... */ };
  const filterQuests = (quests, filter) => { /* ... */ };
  const formatProgressMessage = (quest) => { /* ... */ };
  const isNearCompletion = (quest) => { /* ... */ };
  
  return {
    quests,
    activeQuests,
    loading,
    error,
    acceptQuest,
    abandonQuest,
    refreshQuests,
  };
};
```

---

## 📊 Resumo de Mudanças

| Arquivo | Tipo | Descrição |
|---------|------|-----------|
| `Central.tsx` | ✏️ Modificado | Adicionado QuestTracker |
| `Reception.tsx` | ✏️ Modificado | Adicionados QuestBoard e QuestJournal |
| `QuestTracker.tsx` | ✨ Novo | Tracker de missões no HUD |
| `QuestBoard.tsx` | ✨ Novo | Mural de missões (aceitar) |
| `QuestJournal.tsx` | ✨ Novo | Diário de missões (gerenciar) |
| `INTEGRATION.md` | ✨ Novo | Documentação de integração |
| `FILE_STRUCTURE.md` | ✨ Novo | Este arquivo |

---

**Total de arquivos novos:** 8
**Total de arquivos modificados:** 2
**Total de linhas de código:** ~1500+ linhas

---

**Criado em:** 8 de novembro de 2025
