# Sistema de Telas de Missões (Quests)

## 📋 Visão Geral

Este sistema implementa três telas principais para gerenciamento de missões no jogo:

1. **Diário de Missões** - Visualizar todas as missões (ativas, completas, todas)
2. **Mural de Missões** - Aceitar novas missões disponíveis
3. **Tracker de Missões** - HUD compacto com resumo das missões ativas

---

## 📚 Documentação Disponível

Escolha o guia apropriado para sua necessidade:

- **[QUICKSTART.md](./QUICKSTART.md)** - ⚡ Comece aqui! Guia rápido de 5 minutos
- **[README.md](./README.md)** - 📖 Você está aqui! Documentação detalhada
- **[ARCHITECTURE.md](./ARCHITECTURE.md)** - 🏗️ Arquitetura e fluxo de dados
- **[API_REFERENCE.md](./API_REFERENCE.md)** - 📚 Referência completa de API
- **[ROUTING.md](./ROUTING.md)** - 🛣️ Integração com React Router
- **[QUEST_ACHIEVEMENT_USAGE.md](../../QUEST_ACHIEVEMENT_USAGE.md)** - 🎯 Guia de uso geral do sistema

---

## 🎯 1. Diário de Missões (`QuestJournal`)

### Objetivo
Tela completa onde o jogador visualiza todas as suas missões, podendo filtrar entre ativas, completas e todas.

### Funcionalidades
- ✅ Sistema de abas (Ativas, Completas, Todas)
- ✅ Exibição de progresso com barra visual
- ✅ Botão para abandonar missões ativas
- ✅ Recompensas visíveis (XP e Ouro)
- ✅ Ordenação por prioridade

### "Receita" de Implementação

#### API Calls
```typescript
// Busca todos os dados de uma vez (fonte da verdade)
const data = await questService.getAllQuests(character.id);
```

#### Helpers Utilizados
```typescript
// Enriquece cada quest com informações de UI
const enrichedQuests = data.map(quest => 
  questService.enrichQuestInfo(quest)
);

// Ordena por prioridade (ativas primeiro)
const sortedQuests = questService.sortQuestsByPriority(enrichedQuests);

// Filtra baseado na aba selecionada
const filteredQuests = questService.filterQuests(quests, selectedTab);
```

#### Ações do Usuário
```typescript
// Abandonar uma missão
await questService.abandonQuest(questId, characterId);
// Após sucesso, re-busca os dados
await loadQuests();
```

### Como Usar
```tsx
import { QuestJournal } from './screen/quests';

function GameScreen() {
  return (
    <div>
      <QuestJournal />
    </div>
  );
}
```

---

## 📌 2. Mural de Missões (`QuestBoard`)

### Objetivo
Tela onde o jogador vê apenas missões disponíveis e pode aceitar novas missões.

### Funcionalidades
- ✅ Grid de cards com missões disponíveis
- ✅ Modal de detalhes ao clicar
- ✅ Indicador de dificuldade (Fácil, Média, Difícil)
- ✅ Botão para aceitar missão
- ✅ Atualização automática após aceitar

### "Receita" de Implementação

#### API Calls
```typescript
// Busca todas as quests
const allQuests = await questService.getAllQuests(characterId);
```

#### Helpers Utilizados
```typescript
// Filtra apenas as disponíveis
const available = questService.filterQuests(allQuests, 'available');

// Enriquece com informações de UI
const enrichedQuests = available.map(quest =>
  questService.enrichQuestInfo(quest)
);
```

#### Ações do Usuário
```typescript
// Aceitar uma missão
const response = await questService.acceptQuest(questId, characterId);
// Após sucesso, re-busca os dados
await loadAvailableQuests();
```

### Como Usar
```tsx
import { QuestBoard } from './screen/quests';

function TowerScreen() {
  return (
    <div>
      <QuestBoard />
    </div>
  );
}
```

---

## 🎮 3. Tracker de Missões (`QuestTracker`)

### Objetivo
Componente de HUD que exibe um resumo compacto das 3-5 missões ativas no canto da tela.

### Funcionalidades
- ✅ Lista compacta de missões ativas
- ✅ Progresso formatado de forma amigável
- ✅ Barra de progresso mini
- ✅ Destaque visual quando próximo de completar
- ✅ Colapsável (expansível/retrátil)
- ✅ Atualização automática a cada 30 segundos

### "Receita" de Implementação

#### API Calls
```typescript
// Chamada OTIMIZADA - busca apenas quests ativas
const data = await questService.getActiveQuests(characterId);
```

#### Helpers Utilizados
```typescript
// Enriquece com informações de UI
const enrichedQuests = limitedQuests.map(quest =>
  questService.enrichQuestInfo(quest)
);

// Formata progresso de forma amigável
questService.formatProgressMessage(quest);
// Exemplo: "5/10 monstros derrotados (50.0%)"

// Verifica se está próximo de completar
questService.isNearCompletion(quest);
// Retorna true se >= 80% completo
```

### Como Usar
```tsx
import { QuestTracker } from './screen/quests/components';

function GameHUD() {
  return (
    <div>
      {/* Outros elementos do HUD */}
      
      {/* Tracker de Missões (canto superior direito) */}
      <QuestTracker 
        maxQuests={5}           // Máximo de missões exibidas
        collapsible={true}      // Permite colapsar/expandir
        initialCollapsed={false} // Estado inicial
      />
    </div>
  );
}
```

### Props Disponíveis
```typescript
interface QuestTrackerProps {
  maxQuests?: number;        // Padrão: 5
  collapsible?: boolean;     // Padrão: true
  initialCollapsed?: boolean; // Padrão: false
}
```

---

## 🛠️ Estrutura de Arquivos

```
src/screen/quests/
├── QuestJournal.tsx              # Tela: Diário de Missões
├── QuestJournal.styles.ts        # Estilos do Diário
├── QuestBoard.tsx                # Tela: Mural de Missões
├── QuestBoard.styles.ts          # Estilos do Mural
├── index.ts                      # Exports principais
└── components/
    ├── QuestTracker.tsx          # Componente: Tracker HUD
    ├── QuestTracker.styles.ts    # Estilos do Tracker
    └── index.ts                  # Exports dos componentes
```

---

## 📊 Fluxo de Dados

### Diário de Missões
```
1. getAllQuests() → Busca todos os dados
2. enrichQuestInfo() → Adiciona informações de UI
3. sortQuestsByPriority() → Ordena por prioridade
4. filterQuests() → Filtra por aba selecionada
5. Renderiza → Exibe na tela
```

### Mural de Missões
```
1. getAllQuests() → Busca todos os dados
2. filterQuests('available') → Filtra apenas disponíveis
3. enrichQuestInfo() → Adiciona informações de UI
4. Renderiza → Grid de cards
5. Usuário clica → Modal de detalhes
6. acceptQuest() → Aceita missão
7. getAllQuests() → Re-busca dados atualizados
```

### Tracker de Missões
```
1. getActiveQuests() → Busca APENAS ativas (otimizado)
2. Limita → maxQuests (ex: 5)
3. enrichQuestInfo() → Adiciona informações de UI
4. Para cada quest:
   - formatProgressMessage() → Progresso amigável
   - isNearCompletion() → Destaque visual
5. Renderiza → HUD compacto
6. Auto-atualiza → A cada 30 segundos
```

---

## 🎨 Características Visuais

### Diário de Missões
- Tema escuro com gradientes roxos
- Abas com destaque dourado
- Cards com borda colorida por status
- Barra de progresso com cores dinâmicas

### Mural de Missões
- Grid responsivo de cards
- Modal centralizado com animação
- Badges de dificuldade coloridos
- Recompensas em destaque

### Tracker de Missões
- Posicionado fixo (canto superior direito)
- Fundo semi-transparente com blur
- Borda dourada
- Animação de pulse quando próximo de completar
- Scrollbar personalizada
- Colapsável com animação suave

---

## 🔧 Personalização

### Alterar Posição do Tracker
Edite `QuestTracker.styles.ts`:
```typescript
export const TrackerContainer = styled.div`
  position: fixed;
  top: 20px;    // ← Ajuste aqui
  right: 20px;  // ← Ajuste aqui
  // ou use: left, bottom
```

### Alterar Cores
Todas as cores estão centralizadas nos arquivos `.styles.ts`:
- `#ffd700` - Dourado (títulos, destaques)
- `#4a90e2` - Azul (progresso normal)
- `#50c878` - Verde (completado)
- `#e74c3c` - Vermelho (abandonar, difícil)

### Alterar Threshold de "Próximo de Completar"
```typescript
// QuestService.ts
isNearCompletion(quest, threshold = 80); // ← Altere de 80% para outro valor
```

---

## 📱 Responsividade

Todas as telas são responsivas:

- **Desktop**: Layout completo
- **Tablet**: Adapta larguras
- **Mobile**: 
  - Tracker reduz para 280px
  - Grid vira coluna única
  - Modal ocupa 90% da tela

---

## ⚡ Performance

### Otimizações Implementadas
1. **Tracker usa `getActiveQuests()`** - API otimizada
2. **Atualização automática a cada 30s** - Não sobrecarrega
3. **useMemo para filtragem** - Evita re-cálculos
4. **Limite de quests no Tracker** - Apenas 5 por padrão

---

## 🚀 Próximos Passos

1. Integre o `QuestTracker` no seu componente principal de HUD
2. Adicione rotas para `QuestJournal` e `QuestBoard`
3. Teste a navegação entre as telas
4. Customize as cores conforme o tema do seu jogo

---

## 📝 Exemplo Completo de Integração

```tsx
// App.tsx ou seu componente principal
import { QuestTracker } from './screen/quests/components';
import { QuestJournal, QuestBoard } from './screen/quests';

function Game() {
  const [currentScreen, setCurrentScreen] = useState('hub');

  return (
    <div className="game-container">
      {/* HUD sempre visível */}
      <QuestTracker maxQuests={5} collapsible={true} />

      {/* Navegação entre telas */}
      {currentScreen === 'hub' && <HubScreen />}
      {currentScreen === 'journal' && <QuestJournal />}
      {currentScreen === 'board' && <QuestBoard />}
    </div>
  );
}
```

---

## ✅ Checklist de Implementação

- [x] Diário de Missões criado
- [x] Mural de Missões criado
- [x] Tracker de Missões criado
- [ ] Integrar Tracker no HUD principal
- [ ] Adicionar rotas/navegação
- [ ] Testar com dados reais da API
- [ ] Ajustar cores ao tema do jogo
- [ ] Testar responsividade

---

**Desenvolvido seguindo as melhores práticas de arquitetura de componentes React + TypeScript** 🚀
