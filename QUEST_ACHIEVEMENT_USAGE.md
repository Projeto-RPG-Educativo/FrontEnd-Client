# 🎯 Sistema de Quests e Achievements - Frontend

Este README contém exemplos práticos de como usar os DTOs e Services implementados.

## 📦 Estrutura Criada

```
src/
├── types/dto/
│   ├── Quest.ts                    # DTOs de quests
│   └── Achievement.ts              # DTOs de achievements
├── constants/
│   └── QuestAchievementMetadata.ts # Metadados (ícones, labels, etc)
├── services/
│   ├── quest/
│   │   └── QuestService.ts         # Service de quests
│   └── achievement/
│       └── AchievementService.ts   # Service de achievements
└── hooks/services/
    ├── useQuest.ts                 # Hook customizado de quests
    └── useAchievement.ts           # Hook customizado de achievements
```

---

## 🚀 Exemplos de Uso

### 1️⃣ Usando o Hook `useQuest`

```tsx
import { useQuest } from '../../hooks/services';
import { useGameContext } from '../../contexts/GameContext';

function QuestsPage() {
  const { character } = useGameContext();
  const {
    activeQuest,
    availableQuests,
    completedQuests,
    loading,
    error,
    acceptQuest,
    abandonQuest,
    refreshQuests
  } = useQuest(character?.id || null);

  const handleAccept = async (questId: number) => {
    const response = await acceptQuest(questId);
    if (response) {
      console.log(response.message); // "Quest aceita com sucesso!"
    }
  };

  const handleAbandon = async (questId: number) => {
    const success = await abandonQuest(questId);
    if (success) {
      console.log('Quest abandonada!');
    }
  };

  if (loading) return <div>Carregando quests...</div>;
  if (error) return <div>Erro: {error}</div>;

  return (
    <div>
      {/* Quest Ativa */}
      {activeQuest && (
        <div>
          <h2>Quest Ativa</h2>
          <h3>{activeQuest.typeIcon} {activeQuest.title}</h3>
          <p>{activeQuest.description}</p>
          <progress value={activeQuest.progress} max={activeQuest.targetValue} />
          <p>{activeQuest.progress}/{activeQuest.targetValue} ({activeQuest.percentComplete.toFixed(1)}%)</p>
          <button onClick={() => handleAbandon(activeQuest.id)}>
            Abandonar Quest
          </button>
        </div>
      )}

      {/* Quests Disponíveis */}
      <h2>Quests Disponíveis</h2>
      {availableQuests.map(quest => (
        <div key={quest.id}>
          <h3>{quest.typeIcon} {quest.title}</h3>
          <p>{quest.description}</p>
          <p>Recompensa: {quest.xpReward} XP, {quest.goldReward} Gold</p>
          <button onClick={() => handleAccept(quest.id)}>
            Aceitar Quest
          </button>
        </div>
      ))}

      {/* Quests Completadas */}
      <h2>Quests Completadas</h2>
      {completedQuests.map(quest => (
        <div key={quest.id}>
          <h3>✅ {quest.title}</h3>
        </div>
      ))}
    </div>
  );
}
```

---

### 2️⃣ Usando o Hook `useAchievement`

```tsx
import { useAchievement } from '../../hooks/services';
import { useGameContext } from '../../contexts/GameContext';

function AchievementsPage() {
  const { character } = useGameContext();
  const {
    achievementsByCategory,
    completion,
    recentAchievements,
    almostCompleted,
    loading,
    error,
    refreshAchievements
  } = useAchievement(character?.id || null);

  if (loading) return <div>Carregando conquistas...</div>;
  if (error) return <div>Erro: {error}</div>;

  return (
    <div>
      {/* Percentual de Conclusão */}
      {completion && (
        <div>
          <h2>Progresso Geral</h2>
          <progress value={completion.completedCount} max={completion.totalCount} />
          <p>{completion.completedCount}/{completion.totalCount} ({completion.percentage.toFixed(1)}%)</p>
        </div>
      )}

      {/* Conquistas Recentes */}
      {recentAchievements.length > 0 && (
        <div>
          <h2>🎉 Desbloqueadas Recentemente</h2>
          {recentAchievements.map(ach => (
            <div key={ach.id}>
              <span>{ach.metadata.icon}</span>
              <h3>{ach.metadata.name}</h3>
              <p>{ach.metadata.description}</p>
            </div>
          ))}
        </div>
      )}

      {/* Quase Completas */}
      {almostCompleted.length > 0 && (
        <div>
          <h2>⏳ Quase Lá!</h2>
          {almostCompleted.map(ach => (
            <div key={ach.id}>
              <h3>{ach.metadata.icon} {ach.metadata.name}</h3>
              <progress value={ach.progress} max={ach.metadata.targetValue} />
              <p>{ach.progress}/{ach.metadata.targetValue} ({ach.percentComplete.toFixed(1)}%)</p>
            </div>
          ))}
        </div>
      )}

      {/* Por Categoria */}
      {achievementsByCategory.map(category => (
        <div key={category.category}>
          <h2>{category.categoryIcon} {category.categoryLabel}</h2>
          <p>{category.completedCount}/{category.totalCount} completadas</p>
          
          {category.achievements.map(ach => (
            <div key={ach.id}>
              <span>{ach.metadata.icon}</span>
              <h3>{ach.metadata.name}</h3>
              <p>{ach.metadata.description}</p>
              
              {ach.isCompleted ? (
                <p>✅ Desbloqueada em {ach.unlockedDate?.toLocaleDateString('pt-BR')}</p>
              ) : (
                <>
                  <progress value={ach.progress} max={ach.metadata.targetValue} />
                  <p>{ach.progress}/{ach.metadata.targetValue}</p>
                </>
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
```

---

### 3️⃣ Usando Diretamente os Services (sem hooks)

#### Quest Service

```typescript
import { questService } from '../../services';

// Listar todas as quests
const allQuests = await questService.getAllQuests(characterId);

// Listar apenas ativas
const activeQuests = await questService.getActiveQuests(characterId);

// Aceitar quest
const response = await questService.acceptQuest(questId, characterId);
console.log(response.message);

// Abandonar quest
await questService.abandonQuest(questId, characterId);

// Enriquecer quest com info de UI
const enrichedQuest = questService.enrichQuestInfo(quest);
console.log(enrichedQuest.typeIcon); // 🎯
console.log(enrichedQuest.percentComplete); // 33.33

// Filtrar quests
const available = questService.filterQuests(quests, 'available');
const completed = questService.filterQuests(quests, 'completed');

// Ordenar por prioridade
const sorted = questService.sortQuestsByPriority(quests);

// Verificar se está quase completa
const nearCompletion = questService.isNearCompletion(quest, 80); // threshold 80%

// Formatar mensagem de progresso
const message = questService.formatProgressMessage(quest);
// "5/15 perguntas acertadas (33.3%)"
```

#### Achievement Service

```typescript
import { achievementService } from '../../services';

// Listar todas as conquistas
const all = await achievementService.getAllAchievements(characterId);

// Apenas completadas
const completed = await achievementService.getCompletedAchievements(characterId);

// Em progresso
const inProgress = await achievementService.getInProgressAchievements(characterId);

// Recentes
const recent = await achievementService.getRecentAchievements(characterId);

// Percentual de conclusão
const completion = await achievementService.getCompletionPercentage(characterId);
console.log(completion.percentage); // 23.81

// Enriquecer achievement
const enriched = achievementService.enrichAchievementInfo(achievement);
console.log(enriched.metadata.name); // "Primeira Vitória"
console.log(enriched.metadata.icon); // 🎉
console.log(enriched.percentComplete); // 100

// Agrupar por categoria
const byCategory = achievementService.groupByCategory(achievements);

// Filtrar recentes (24h)
const recentUnlocked = achievementService.filterRecentUnlocked(achievements);

// Quase completas (>80%)
const almostDone = achievementService.getAlmostCompleted(achievements);

// Calcular estatísticas
const stats = achievementService.calculateStats(achievements);
console.log(stats);
// {
//   total: 21,
//   completed: 5,
//   inProgress: 10,
//   notStarted: 6,
//   percentage: 23.81
// }

// Formatar mensagem
const message = achievementService.formatProgressMessage(achievement);
// "5/10 (50.0%)" ou "✅ Completado em 08/11/2025"
```

---

### 4️⃣ Usando Metadados

```typescript
import { 
  QUEST_TYPE_INFO, 
  ACHIEVEMENT_METADATA,
  CATEGORY_LABELS,
  CATEGORY_ICONS 
} from '../../constants/QuestAchievementMetadata';

// Info de tipos de quest
const questInfo = QUEST_TYPE_INFO['ANSWER_QUESTIONS'];
console.log(questInfo.icon);  // 🎯
console.log(questInfo.label); // "Conhecimento"

// Metadados de achievement
const achievementMeta = ACHIEVEMENT_METADATA['WIN_FIRST_BATTLE'];
console.log(achievementMeta.name);        // "Primeira Vitória"
console.log(achievementMeta.description); // "Vença sua primeira batalha"
console.log(achievementMeta.icon);        // 🎉
console.log(achievementMeta.targetValue); // 1
console.log(achievementMeta.category);    // "BATTLE"

// Labels de categorias
console.log(CATEGORY_LABELS['BATTLE']); // "Batalha"
console.log(CATEGORY_ICONS['MONSTERS']); // 🐉
```

---

### 5️⃣ Popup de Nova Conquista Desbloqueada

```tsx
import { useEffect } from 'react';
import { useAchievement } from '../../hooks/services';
import { useGameContext } from '../../contexts/GameContext';

function AchievementPopup() {
  const { character } = useGameContext();
  const { recentAchievements } = useAchievement(character?.id || null);

  useEffect(() => {
    // Mostrar popup para conquistas recentes
    recentAchievements.forEach(ach => {
      // Aqui você pode usar sua biblioteca de toast/modal favorita
      showToast({
        title: `🏆 ${ach.metadata.name}`,
        description: ach.metadata.description,
        icon: ach.metadata.icon,
        duration: 5000
      });
    });
  }, [recentAchievements]);

  return null; // Componente invisible, apenas lógica
}
```

---

### 6️⃣ Integração com Batalha (Mostrar Progresso)

```tsx
import { useQuest } from '../../hooks/services';
import { useGameContext } from '../../contexts/GameContext';

function BattleHUD() {
  const { character } = useGameContext();
  const { activeQuest } = useQuest(character?.id || null);

  return (
    <div className="battle-hud">
      {/* Outros elementos do HUD */}
      
      {/* Quest Ativa */}
      {activeQuest && (
        <div className="active-quest-indicator">
          <span>{activeQuest.typeIcon}</span>
          <div>
            <p>{activeQuest.title}</p>
            <progress 
              value={activeQuest.progress} 
              max={activeQuest.targetValue} 
            />
            <small>{activeQuest.progress}/{activeQuest.targetValue}</small>
          </div>
        </div>
      )}
    </div>
  );
}
```

---

## 🎨 Tipos Disponíveis

### Quest Types
- `ANSWER_QUESTIONS` 🎯 - Acertar perguntas
- `DEFEAT_MONSTER` 🐉 - Derrotar monstro específico
- `WIN_BATTLES` ⚔️ - Vencer batalhas
- `REACH_LEVEL` ⬆️ - Alcançar nível
- `DEAL_DAMAGE` 💥 - Causar dano

### Achievement Categories
- `BATTLE` ⚔️ - Batalhas vencidas
- `DAMAGE` 💥 - Dano causado
- `QUESTIONS` 📚 - Questões acertadas
- `QUESTS` 📜 - Quests completadas
- `LEVEL` ⬆️ - Níveis alcançados
- `MONSTERS` 🐉 - Monstros derrotados

---

## 🔄 Próximos Passos

1. **Criar componentes de UI:**
   - `QuestsPage.tsx` - Tela principal de quests
   - `AchievementsPage.tsx` - Tela de conquistas
   - `QuestCard.tsx` - Card individual de quest
   - `AchievementCard.tsx` - Card de conquista

2. **Adicionar ao HUB:**
   - Integrar link para Torre do Conhecimento (quests)
   - Adicionar botão de conquistas no menu

3. **Notificações:**
   - Toast ao aceitar/completar quest
   - Modal de conquista desbloqueada
   - Som de notificação

4. **Indicadores visuais:**
   - Badge de quest ativa no HUD de batalha
   - Contador de conquistas no perfil
   - Barra de progresso geral

---

## 📝 Notas Importantes

- ✅ Todos os services usam a instância `api` configurada (com JWT)
- ✅ Hooks gerenciam loading e error states automaticamente
- ✅ Services possuem métodos utilitários (filtrar, ordenar, formatar)
- ✅ Metadados prontos para uso (ícones, labels, descrições)
- ✅ TypeScript strict mode compatível

---

## 🐛 Troubleshooting

### Quest não aparece como ativa após aceitar
```typescript
// Forçar reload das quests
await refreshQuests();
```

### Conquista não atualiza
```typescript
// Forçar reload das conquistas
await refreshAchievements();
```

### Erro de autenticação
```typescript
// Verificar se token está presente
const token = localStorage.getItem('token');
if (!token) {
  // Redirecionar para login
}
```

---

**Pronto para uso!** 🚀
