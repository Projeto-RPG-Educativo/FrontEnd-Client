# 🚀 Guia Rápido - Sistema de Missões

## ⚡ Início Rápido (5 minutos)

### 1. Importar os Componentes

```typescript
// Telas completas
import { QuestJournal, QuestBoard } from './screen/quests';

// Componente de HUD
import { QuestTracker } from './screen/quests/components';
```

### 2. Usar nas suas Telas

#### Opção A: Diário de Missões
```tsx
function JournalScreen() {
  return <QuestJournal />;
}
```

#### Opção B: Mural de Missões
```tsx
function TowerScreen() {
  return <QuestBoard />;
}
```

#### Opção C: Tracker no HUD
```tsx
function Game() {
  return (
    <div>
      <QuestTracker maxQuests={5} collapsible={true} />
      {/* Resto do jogo */}
    </div>
  );
}
```

---

## 📋 O Que Cada Tela Faz

| Componente | Onde Usar | O Que Faz |
|------------|-----------|-----------|
| `QuestJournal` | Menu do jogador | Ver todas as missões (ativas, completas, todas) |
| `QuestBoard` | Torre/NPC | Aceitar novas missões disponíveis |
| `QuestTracker` | HUD do jogo | Mostrar 3-5 missões ativas no canto da tela |

---

## 🎯 Como Funciona (Conceitos)

### API Calls (Buscar/Modificar Dados)
```typescript
// Buscar TODAS as quests
questService.getAllQuests(characterId)

// Buscar APENAS ativas (otimizado para HUD)
questService.getActiveQuests(characterId)

// Aceitar uma quest
questService.acceptQuest(questId, characterId)

// Abandonar uma quest
questService.abandonQuest(questId, characterId)
```

### Helpers (Processar Dados Localmente)
```typescript
// Adicionar informações de UI
questService.enrichQuestInfo(quest)
// Retorna: { ...quest, percentComplete, isActive, typeIcon, typeLabel }

// Filtrar por status
questService.filterQuests(quests, 'active')     // Apenas ativas
questService.filterQuests(quests, 'completed')  // Apenas completas
questService.filterQuests(quests, 'available')  // Apenas disponíveis

// Ordenar por prioridade
questService.sortQuestsByPriority(quests)
// Ordem: Ativas → Disponíveis → Completadas

// Formatar progresso
questService.formatProgressMessage(quest)
// Ex: "5/10 monstros derrotados (50.0%)"

// Verificar se está quase completo
questService.isNearCompletion(quest)
// Retorna true se >= 80%
```

---

## 🍳 Receitas Prontas

### Receita 1: Diário de Missões

```typescript
// 1. Buscar dados
const data = await questService.getAllQuests(characterId);

// 2. Enriquecer
const enriched = data.map(q => questService.enrichQuestInfo(q));

// 3. Ordenar
const sorted = questService.sortQuestsByPriority(enriched);

// 4. Filtrar (baseado na aba)
const filtered = questService.filterQuests(sorted, selectedTab);

// 5. Renderizar
{filtered.map(quest => <QuestCard {...quest} />)}
```

### Receita 2: Mural de Missões

```typescript
// 1. Buscar dados
const allQuests = await questService.getAllQuests(characterId);

// 2. Filtrar disponíveis
const available = questService.filterQuests(allQuests, 'available');

// 3. Enriquecer
const enriched = available.map(q => questService.enrichQuestInfo(q));

// 4. Renderizar
{enriched.map(quest => <QuestCard {...quest} />)}

// 5. Ao aceitar
await questService.acceptQuest(questId, characterId);
// Re-buscar dados
```

### Receita 3: Tracker de Missões

```typescript
// 1. Buscar dados (OTIMIZADO)
const active = await questService.getActiveQuests(characterId);

// 2. Limitar quantidade
const limited = active.slice(0, 5);

// 3. Enriquecer
const enriched = limited.map(q => questService.enrichQuestInfo(q));

// 4. Renderizar
{enriched.map(quest => (
  <QuestItem>
    <Title>{quest.title}</Title>
    <Progress>{questService.formatProgressMessage(quest)}</Progress>
    <Bar nearComplete={questService.isNearCompletion(quest)} />
  </QuestItem>
))}
```

---

## 🎨 Customizações Rápidas

### Mudar Cores
Edite os arquivos `.styles.ts`:
```typescript
// Dourado principal
#ffd700 → #SUA_COR

// Azul de progresso
#4a90e2 → #SUA_COR

// Verde de completado
#50c878 → #SUA_COR
```

### Mudar Posição do Tracker
```typescript
// QuestTracker.styles.ts
export const TrackerContainer = styled.div`
  position: fixed;
  top: 20px;     // ← Ajuste
  right: 20px;   // ← Ajuste
  // ou: left: 20px; bottom: 20px;
```

### Mudar Threshold de "Quase Completo"
```typescript
// Padrão: 80%
questService.isNearCompletion(quest, 80)

// Personalizado: 90%
questService.isNearCompletion(quest, 90)
```

---

## 🔧 Troubleshooting

### Problema: "character is undefined"
**Solução:** Verifique se o `GameContext` está provido:
```tsx
<GameContextProvider>
  <App />
</GameContextProvider>
```

### Problema: "Failed to fetch quests"
**Solução:** Verifique:
1. API está rodando
2. Endpoint correto em `api.ts`
3. Token de autenticação válido

### Problema: "Tracker não aparece"
**Solução:** Verifique:
1. Personagem tem ID válido
2. CSS `z-index` não está conflitando
3. Componente está dentro do DOM

---

## 📚 Documentação Completa

Para detalhes completos, consulte:
- [`README.md`](./README.md) - Documentação detalhada de cada tela
- [`ARCHITECTURE.md`](./ARCHITECTURE.md) - Arquitetura e fluxo de dados

---

## ✅ Checklist de Implementação

### Fase 1: Básico
- [ ] Importar `QuestJournal` e testar
- [ ] Importar `QuestBoard` e testar
- [ ] Importar `QuestTracker` e adicionar ao HUD

### Fase 2: Integração
- [ ] Adicionar rotas/navegação
- [ ] Conectar botões "Ver Missões" → `QuestJournal`
- [ ] Conectar NPC/Torre → `QuestBoard`
- [ ] Verificar `QuestTracker` visível no jogo

### Fase 3: Customização
- [ ] Ajustar cores ao tema do jogo
- [ ] Ajustar posição do `QuestTracker`
- [ ] Testar responsividade mobile
- [ ] Adicionar sons/efeitos (opcional)

### Fase 4: Testes
- [ ] Aceitar uma missão no `QuestBoard`
- [ ] Ver missão aceita no `QuestJournal` (aba Ativas)
- [ ] Ver missão no `QuestTracker` (HUD)
- [ ] Completar missão (fazer progresso)
- [ ] Abandonar missão
- [ ] Completar missão 100%

---

## 🎯 Exemplo Mínimo Funcional

```tsx
// App.tsx
import { GameContextProvider } from './contexts';
import { QuestTracker } from './screen/quests/components';
import { QuestJournal, QuestBoard } from './screen/quests';

function App() {
  const [screen, setScreen] = useState('hub');

  return (
    <GameContextProvider>
      {/* HUD sempre visível */}
      <QuestTracker maxQuests={5} />

      {/* Navegação */}
      {screen === 'hub' && (
        <div>
          <button onClick={() => setScreen('journal')}>Diário</button>
          <button onClick={() => setScreen('board')}>Mural</button>
        </div>
      )}

      {screen === 'journal' && <QuestJournal />}
      {screen === 'board' && <QuestBoard />}
    </GameContextProvider>
  );
}
```

---

**Pronto! Agora você tem tudo que precisa para começar.** 🎉

