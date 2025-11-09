# 🏆 Sistema de Quests e Achievements - RPG Educativo

> **Documentação Técnica Completa**  
> **Versão**: 1.0  
> **Última atualização**: 08/11/2025  
> **Status**: ✅ Implementado (Não está no frontend ainda)

---

## 📋 Índice

1. [Visão Geral](#visão-geral)
2. [Sistema de Quests](#sistema-de-quests)
3. [Sistema de Achievements](#sistema-de-achievements)
4. [Endpoints da API](#endpoints-da-api)
5. [DTOs e Estruturas de Dados](#dtos-e-estruturas-de-dados)
6. [Arquivos e Componentes](#arquivos-e-componentes)
7. [Integração com Batalhas](#integração-com-batalhas)
8. [Exemplos de Uso](#exemplos-de-uso)

---

## 🎯 Visão Geral

O sistema de **Quests** e **Achievements** adiciona camadas de progressão, recompensas e motivação ao jogo educativo. Ambos os sistemas estão **completamente implementados no backend** mas **ainda não foram integrados ao frontend**.

### Características Principais

#### Quests (Missões)
- ✅ Sistema de missões com objetivos variados
- ✅ Rastreamento automático de progresso
- ✅ Recompensas em XP e ouro
- ✅ Limite de 1 quest ativa por personagem
- ✅ Integração com sistema de batalhas
- ✅ 5 tipos diferentes de objetivos

#### Achievements (Conquistas)
- ✅ 21 conquistas diferentes
- ✅ Desbloqueio automático ao atingir objetivos
- ✅ Rastreamento de progresso em tempo real
- ✅ Sistema de níveis (primeira vitória → 100 vitórias)
- ✅ Categorias: Batalha, Dano, Questões, Quests, Level, Monstros

---

## 🎯 Sistema de Quests

### O que são Quests?

Quests são **missões temáticas** que o jogador pode aceitar na **Torre do Conhecimento**. Cada quest tem:
- Um objetivo claro (derrotar monstros, acertar perguntas, etc.)
- Valor alvo a atingir
- Recompensas em XP e ouro
- Rastreamento automático de progresso

### Tipos de Quests (QuestType)

```java
public enum QuestType {
    ANSWER_QUESTIONS,    // Acertar X perguntas em batalhas
    DEFEAT_MONSTER,      // Derrotar um monstro específico X vezes
    WIN_BATTLES,         // Vencer X batalhas (qualquer monstro)
    REACH_LEVEL,         // Alcançar um nível específico
    DEAL_DAMAGE          // Causar X de dano total
}
```

### Estados de uma Quest

| Status | Descrição | Ações Permitidas |
|--------|-----------|------------------|
| `null` | Quest disponível, não aceita | Aceitar |
| `"in_progress"` | Quest ativa, em andamento | Abandonar, Progredir |
| `"completed"` | Quest finalizada com sucesso | Ver histórico |
| `"failed"` | Quest abandonada pelo jogador | Aceitar novamente |

### Regras de Negócio

#### Aceitação de Quests
1. ✅ Personagem só pode ter **1 quest ativa** por vez
2. ✅ Não pode aceitar quest já completada
3. ✅ Não pode aceitar quest já em progresso
4. ✅ Deve validar que personagem pertence ao usuário

#### Progresso Automático
O progresso é **atualizado automaticamente** quando:
- ✅ Jogador acerta uma pergunta em batalha → `ANSWER_QUESTIONS`
- ✅ Jogador derrota um monstro → `DEFEAT_MONSTER` (se for o monstro alvo)
- ✅ Jogador vence uma batalha → `WIN_BATTLES`
- ✅ Jogador causa dano → `DEAL_DAMAGE`
- ✅ Jogador sobe de nível → `REACH_LEVEL`

#### Conclusão de Quests
Quando `progress >= targetValue`:
1. ✅ Status muda para `"completed"`
2. ✅ XP é adicionado ao personagem
3. ✅ Ouro é adicionado ao personagem
4. ✅ Conquistas relacionadas são atualizadas (`COMPLETE_FIRST_QUEST`, `COMPLETE_10_QUESTS`, etc.)

---

## 🏆 Sistema de Achievements

### O que são Achievements?

Achievements são **conquistas permanentes** que rastreiam marcos importantes na progressão do jogador. Diferente das quests:
- ✅ São **automáticas** (não precisam ser aceitas)
- ✅ São **permanentes** (não podem ser abandonadas)
- ✅ Rastreiam progresso **cumulativo** (não resetam)
- ✅ Não dão recompensas materiais (são troféus de prestígio)

### Categorias de Achievements

#### 🗡️ Batalha (4 conquistas)
```
WIN_FIRST_BATTLE    - Vença sua primeira batalha (1)
WIN_10_BATTLES      - Vença 10 batalhas
WIN_50_BATTLES      - Vença 50 batalhas  
WIN_100_BATTLES     - Vença 100 batalhas
```

#### 💥 Dano (3 conquistas)
```
DEAL_1000_DAMAGE    - Cause 1000 de dano total
DEAL_5000_DAMAGE    - Cause 5000 de dano total
DEAL_10000_DAMAGE   - Cause 10000 de dano total
```

#### 📚 Questões (3 conquistas)
```
ANSWER_10_QUESTIONS   - Acerte 10 questões
ANSWER_50_QUESTIONS   - Acerte 50 questões
ANSWER_100_QUESTIONS  - Acerte 100 questões
```

#### 📜 Quests (3 conquistas)
```
COMPLETE_FIRST_QUEST - Complete sua primeira quest (1)
COMPLETE_10_QUESTS   - Complete 10 quests
COMPLETE_25_QUESTS   - Complete 25 quests
```

#### ⬆️ Level (3 conquistas)
```
REACH_LEVEL_5  - Alcance o nível 5
REACH_LEVEL_10 - Alcance o nível 10
REACH_LEVEL_20 - Alcance o nível 20
```

#### 🐉 Monstros (3 conquistas)
```
DEFEAT_GOBLIN       - Derrote um Goblin (1)
DEFEAT_DRAGON       - Derrote um Dragão (1)
DEFEAT_10_MONSTERS  - Derrote 10 monstros
```

### Como Funcionam

#### Criação Automática
Quando um personagem é criado ou realiza uma ação pela primeira vez, o sistema **cria automaticamente** os registros de achievement no banco de dados.

#### Atualização de Progresso
Sempre que uma ação relevante ocorre (vitória, dano, etc.), o `AchievementService` é chamado para atualizar o progresso:

```java
achievementService.updateAchievementProgress(
    characterId,
    AchievementType.WIN_10_BATTLES,
    1  // incremento
);
```

#### Desbloqueio Automático
Quando `progress >= targetValue`:
1. ✅ `isCompleted` vira `true`
2. ✅ `unlockedAt` recebe timestamp atual
3. ✅ Conquista aparece na lista de "Recently Unlocked"

---

## 🌐 Endpoints da API

### Base URL
```
http://localhost:8000
```

Todas as rotas requerem autenticação JWT (header `Authorization: Bearer {token}`).

---

### 📜 Quests Endpoints

#### 1. Listar Todas as Quests Disponíveis
```http
GET /api/hub/tower/quests?characterId={characterId}
```

**Query Params:**
- `characterId` (Integer, obrigatório) - ID do personagem

**Retorna:**
```json
[
  {
    "id": 1,
    "title": "Domínio do Conhecimento",
    "description": "Demonstre seu conhecimento acertando 15 perguntas em batalhas.",
    "xpReward": 500,
    "goldReward": 100,
    "type": "ANSWER_QUESTIONS",
    "targetValue": 15,
    "targetId": null,
    "targetName": null,
    "progress": 0,
    "status": null
  },
  {
    "id": 2,
    "title": "A Ameaça Errônea",
    "description": "Derrote o Diabrete Errôneo 3 vezes.",
    "xpReward": 300,
    "goldReward": 75,
    "type": "DEFEAT_MONSTER",
    "targetValue": 3,
    "targetId": 1,
    "targetName": "Diabrete Errôneo",
    "progress": 0,
    "status": null
  }
]
```

**Observações:**
- Retorna **todas** as quests do jogo
- `progress` e `status` mostram o progresso atual do personagem
- `status: null` = quest disponível para aceitar
- `status: "in_progress"` = quest ativa
- `status: "completed"` = quest já finalizada

---

#### 2. Listar Quests Ativas
```http
GET /api/hub/tower/quests/active?characterId={characterId}
```

**Query Params:**
- `characterId` (Integer, obrigatório) - ID do personagem

**Retorna:**
```json
[
  {
    "id": 1,
    "title": "Domínio do Conhecimento",
    "description": "Demonstre seu conhecimento acertando 15 perguntas em batalhas.",
    "xpReward": 500,
    "goldReward": 100,
    "type": "ANSWER_QUESTIONS",
    "targetValue": 15,
    "targetId": null,
    "targetName": null,
    "progress": 5,
    "status": "in_progress"
  }
]
```

**Observações:**
- Retorna **apenas** quests com `status: "in_progress"`
- Máximo de 1 quest ativa por personagem

---

#### 3. Aceitar uma Quest
```http
POST /api/hub/tower/quests/accept
```

**Body:**
```json
{
  "questId": 1,
  "characterId": 1
}
```

**Retorna:**
```json
{
  "characterId": 1,
  "characterName": "Gandalf",
  "questId": 1,
  "questTitle": "Domínio do Conhecimento",
  "questDescription": "Demonstre seu conhecimento acertando 15 perguntas em batalhas.",
  "status": "in_progress",
  "progress": 0,
  "targetValue": 15,
  "message": "Quest aceita com sucesso! Boa sorte na sua jornada!"
}
```

**Validações:**
- ✅ Personagem pertence ao usuário autenticado
- ✅ Personagem não tem quest ativa
- ✅ Quest não foi completada anteriormente
- ✅ Quest não está já em progresso

**Erros Possíveis:**
```json
// 400 - Já tem quest ativa
{
  "message": "Você já tem uma quest ativa. Complete-a antes de aceitar outra."
}

// 400 - Quest já completada
{
  "message": "Você já completou essa quest."
}

// 404 - Quest não encontrada
{
  "message": "Quest não encontrada"
}
```

---

#### 4. Abandonar uma Quest
```http
DELETE /api/hub/tower/quests/{questId}/abandon?characterId={characterId}
```

**Path Params:**
- `questId` (Integer) - ID da quest a abandonar

**Query Params:**
- `characterId` (Integer, obrigatório) - ID do personagem

**Retorna:**
```json
"Quest abandonada com sucesso"
```

**Efeitos:**
- ✅ Status muda para `"failed"`
- ✅ Progresso é resetado para 0
- ✅ Personagem pode aceitar outra quest
- ❌ Recompensas não são concedidas

---

### 🏆 Achievements Endpoints

#### 1. Listar Todas as Conquistas do Personagem
```http
GET /api/achievements/character/{characterId}
```

**Path Params:**
- `characterId` (Long) - ID do personagem

**Retorna:**
```json
[
  {
    "id": 1,
    "character": { "id": 1, "name": "Gandalf", ... },
    "type": "WIN_FIRST_BATTLE",
    "progress": 1,
    "isCompleted": true,
    "unlockedAt": "2025-11-08T14:30:00"
  },
  {
    "id": 2,
    "character": { "id": 1, "name": "Gandalf", ... },
    "type": "WIN_10_BATTLES",
    "progress": 5,
    "isCompleted": false,
    "unlockedAt": null
  }
]
```

**Observações:**
- Retorna **todas** as conquistas (completadas e em progresso)
- `isCompleted: true` = conquista desbloqueada
- `unlockedAt != null` = data de desbloqueio

---

#### 2. Listar Conquistas Completadas
```http
GET /api/achievements/character/{characterId}/completed
```

**Retorna:**
```json
[
  {
    "id": 1,
    "type": "WIN_FIRST_BATTLE",
    "progress": 1,
    "isCompleted": true,
    "unlockedAt": "2025-11-08T14:30:00"
  }
]
```

**Observações:**
- Filtro: `isCompleted = true`

---

#### 3. Listar Conquistas em Progresso
```http
GET /api/achievements/character/{characterId}/in-progress
```

**Retorna:**
```json
[
  {
    "id": 2,
    "type": "WIN_10_BATTLES",
    "progress": 5,
    "isCompleted": false,
    "unlockedAt": null
  }
]
```

**Observações:**
- Filtro: `isCompleted = false`

---

#### 4. Listar Conquistas Recentes
```http
GET /api/achievements/character/{characterId}/recent
```

**Retorna:**
```json
[
  {
    "id": 15,
    "type": "DEFEAT_GOBLIN",
    "progress": 1,
    "isCompleted": true,
    "unlockedAt": "2025-11-08T15:45:00"
  }
]
```

**Observações:**
- Ordena por `unlockedAt DESC`
- Útil para mostrar popup de "Nova Conquista Desbloqueada!"

---

#### 5. Obter Percentual de Conclusão
```http
GET /api/achievements/character/{characterId}/completion
```

**Retorna:**
```json
{
  "percentage": 23.81,
  "completedCount": 5,
  "totalCount": 21
}
```

**Observações:**
- `percentage` = (completedCount / totalCount) × 100
- Útil para barra de progresso no perfil

---

## 📦 DTOs e Estruturas de Dados

### Request DTOs

#### AcceptQuestRequest
```java
{
  "questId": Integer,      // Obrigatório
  "characterId": Integer   // Obrigatório
}
```

### Response DTOs

#### QuestDto
```java
{
  "id": Integer,
  "title": String,
  "description": String,
  "xpReward": Integer,
  "goldReward": Integer,
  "type": QuestType,        // ANSWER_QUESTIONS, DEFEAT_MONSTER, etc.
  "targetValue": Integer,   // Valor alvo (ex: 15 perguntas)
  "targetId": Integer,      // ID do monstro (apenas DEFEAT_MONSTER)
  "targetName": String,     // Nome do monstro (apenas DEFEAT_MONSTER)
  "progress": Integer,      // Progresso atual
  "status": String          // null, "in_progress", "completed", "failed"
}
```

#### AcceptQuestResponse
```java
{
  "characterId": Integer,
  "characterName": String,
  "questId": Integer,
  "questTitle": String,
  "questDescription": String,
  "status": String,         // Sempre "in_progress"
  "progress": Integer,      // Sempre 0
  "targetValue": Integer,
  "message": String
}
```

#### AchievementCompletionResponse
```java
{
  "percentage": Double,      // 0-100
  "completedCount": Long,
  "totalCount": Long
}
```

---

## 📁 Arquivos e Componentes

### Controllers
```
src/main/java/com/game/rpgbackend/controller/
├── achievement/
│   └── AchievementController.java    # Endpoints de conquistas
└── hub/
    └── HubController.java            # Endpoints de quests (torre)
```

### Services
```
src/main/java/com/game/rpgbackend/service/
├── achievement/
│   └── AchievementService.java       # Lógica de conquistas
└── hub/
    └── QuestService.java             # Lógica de quests
```

### Entities (Domain)
```
src/main/java/com/game/rpgbackend/domain/
├── Quest.java                        # Entidade de quest
├── CharacterQuest.java               # Tabela de junção (progresso)
├── CharacterQuestId.java             # Chave composta
└── Achievement.java                  # Entidade de conquista
```

### Enums
```
src/main/java/com/game/rpgbackend/enums/
├── QuestType.java                    # 5 tipos de quests
└── AchievementType.java              # 21 tipos de conquistas
```

### DTOs
```
src/main/java/com/game/rpgbackend/dto/
├── request/hub/
│   └── AcceptQuestRequest.java
└── response/
    ├── achievement/
    │   └── AchievementCompletionResponse.java
    ├── hub/
    │   ├── QuestDto.java
    │   └── AcceptQuestResponse.java
    └── battle/
        └── QuestProgressDto.java     # Usado em batalhas
```

### Repositories
```
src/main/java/com/game/rpgbackend/repository/
├── QuestRepository.java
├── CharacterQuestRepository.java
└── AchievementRepository.java
```

---

## ⚔️ Integração com Batalhas

### Como Quests São Atualizadas em Batalhas

O `BattleService` integra automaticamente com `QuestService` para atualizar progresso:

#### 1. Ao Responder Pergunta Corretamente
```java
// BattleService.java - linha ~643
questService.updateQuestionProgressForAllActiveQuests(character.getId());
```

#### 2. Ao Vencer Batalha
```java
// BattleService.java - linha ~724
questService.updateMonsterDefeatProgress(character.getId(), monster.getId());
questService.updateBattleWinProgress(character.getId());
```

#### 3. Ao Causar Dano
```java
// BattleService.java - linha ~933
questService.updateDamageProgress(character.getId(), damage);
```

### Como Achievements São Atualizados

Achievements são atualizados automaticamente em várias partes do código:

#### No Completion de Quests
```java
// QuestService.java - completeQuest()
achievementService.updateAchievementProgress(
    characterId,
    AchievementType.COMPLETE_FIRST_QUEST,
    1
);
```

#### Em Batalhas
```java
// BattleService.java
achievementService.updateAchievementProgress(
    characterId,
    AchievementType.WIN_FIRST_BATTLE,
    1
);
```

### Retorno de Progresso nas Batalhas

O `BattleStateResponse` **pode incluir** informações de progresso de quests (se implementado):

```json
{
  "battleId": 123,
  "character": { ... },
  "monster": { ... },
  "currentQuestion": { ... },
  "questProgress": {
    "questId": 1,
    "questTitle": "Domínio do Conhecimento",
    "currentProgress": 6,
    "targetValue": 15,
    "justCompleted": false,
    "progressMessage": "Progresso: 6/15 perguntas acertadas"
  }
}
```

---

## 💡 Exemplos de Uso no Frontend

### 1. Listar Quests Disponíveis na Torre

```javascript
const token = localStorage.getItem('token');
const characterId = 1; // ID do personagem ativo

const response = await fetch(
  `http://localhost:8000/api/hub/tower/quests?characterId=${characterId}`,
  {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  }
);

const quests = await response.json();

// Filtrar por disponibilidade
const available = quests.filter(q => q.status === null);
const active = quests.filter(q => q.status === 'in_progress');
const completed = quests.filter(q => q.status === 'completed');
```

### 2. Aceitar uma Quest

```javascript
const token = localStorage.getItem('token');

const response = await fetch(
  'http://localhost:8000/api/hub/tower/quests/accept',
  {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      questId: 1,
      characterId: 1
    })
  }
);

const result = await response.json();
console.log(result.message); // "Quest aceita com sucesso! Boa sorte na sua jornada!"
```

### 3. Mostrar Progresso da Quest Ativa

```javascript
const token = localStorage.getItem('token');
const characterId = 1;

const response = await fetch(
  `http://localhost:8000/api/hub/tower/quests/active?characterId=${characterId}`,
  {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  }
);

const activeQuests = await response.json();

if (activeQuests.length > 0) {
  const quest = activeQuests[0];
  console.log(`${quest.title}: ${quest.progress}/${quest.targetValue}`);
  
  // Calcular percentual
  const percentage = (quest.progress / quest.targetValue) * 100;
  console.log(`Progresso: ${percentage.toFixed(1)}%`);
}
```

### 4. Listar Conquistas com Percentual

```javascript
const token = localStorage.getItem('token');
const characterId = 1;

// Buscar todas as conquistas
const achievementsRes = await fetch(
  `http://localhost:8000/api/achievements/character/${characterId}`,
  {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  }
);

const achievements = await achievementsRes.json();

// Buscar percentual de conclusão
const completionRes = await fetch(
  `http://localhost:8000/api/achievements/character/${characterId}/completion`,
  {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  }
);

const completion = await completionRes.json();

console.log(`Conquistas: ${completion.completedCount}/${completion.totalCount}`);
console.log(`Percentual: ${completion.percentage.toFixed(1)}%`);

// Mostrar cada conquista
achievements.forEach(ach => {
  const type = AchievementType[ach.type]; // Buscar informações do enum
  console.log(`${type.name}: ${ach.progress}/${type.targetValue}`);
  if (ach.isCompleted) {
    console.log(`✅ Desbloqueada em ${new Date(ach.unlockedAt).toLocaleDateString()}`);
  }
});
```

### 5. Popup de Nova Conquista Desbloqueada

```javascript
// Buscar conquistas recentes
const token = localStorage.getItem('token');
const characterId = 1;

const response = await fetch(
  `http://localhost:8000/api/achievements/character/${characterId}/recent`,
  {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  }
);

const recentAchievements = await response.json();

// Mostrar popup para conquistas recentes (últimas 24h)
const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);

recentAchievements.forEach(ach => {
  const unlockedDate = new Date(ach.unlockedAt);
  
  if (unlockedDate > oneDayAgo) {
    // Mostrar popup/toast
    const type = AchievementType[ach.type];
    showAchievementPopup({
      title: type.name,
      description: type.description,
      icon: '🏆'
    });
  }
});
```

---

## 🎨 Sugestões de UI/UX

### Tela de Quests (Torre do Conhecimento)

#### Layout Sugerido
```
┌──────────────────────────────────────┐
│  TORRE DO CONHECIMENTO               │
├──────────────────────────────────────┤
│  Quest Ativa:                        │
│  ┌────────────────────────────────┐  │
│  │ 🎯 Domínio do Conhecimento     │  │
│  │ ━━━━━━━━━━━━━━━━━━━━━━━━━━━  │  │
│  │ 5/15 perguntas (33%)           │  │
│  │ Recompensa: 500 XP, 100 Gold   │  │
│  │ [Abandonar Quest]              │  │
│  └────────────────────────────────┘  │
│                                      │
│  Quests Disponíveis:                 │
│  ┌────────────────────────────────┐  │
│  │ ⚔️ A Ameaça Errônea            │  │
│  │ Derrote Diabrete Errôneo 3x    │  │
│  │ 300 XP, 75 Gold                │  │
│  │ [Aceitar]                      │  │
│  └────────────────────────────────┘  │
└──────────────────────────────────────┘
```

#### Indicadores Visuais
- 🎯 Quest de perguntas (ANSWER_QUESTIONS)
- ⚔️ Quest de batalha (WIN_BATTLES, DEFEAT_MONSTER)
- 💪 Quest de dano (DEAL_DAMAGE)
- ⬆️ Quest de nível (REACH_LEVEL)

### Tela de Conquistas

#### Layout Sugerido
```
┌──────────────────────────────────────┐
│  CONQUISTAS                          │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━   │
│  5/21 (23.8%)                        │
├──────────────────────────────────────┤
│  🏆 Batalha                          │
│  ┌────────────────────────────────┐  │
│  │ ✅ Primeira Vitória            │  │
│  │    Desbloqueada: 08/11/2025    │  │
│  └────────────────────────────────┘  │
│  ┌────────────────────────────────┐  │
│  │ ⏳ Guerreiro Iniciante         │  │
│  │    5/10 batalhas (50%)         │  │
│  └────────────────────────────────┘  │
├──────────────────────────────────────┤
│  💥 Dano                             │
│  ┌────────────────────────────────┐  │
│  │ ⏳ Destruidor                  │  │
│  │    450/1000 dano (45%)         │  │
│  └────────────────────────────────┘  │
└──────────────────────────────────────┘
```

#### Estados Visuais
- ✅ **Verde** = Conquista desbloqueada
- ⏳ **Amarelo** = Em progresso
- 🔒 **Cinza** = Não iniciada

---

## 🚀 Próximos Passos para Integração no Frontend

### 1. Criar Tela de Quests
- [ ] Componente `QuestsPage.tsx` / `QuestsPage.jsx`
- [ ] Listar quests disponíveis
- [ ] Mostrar quest ativa com progresso
- [ ] Botão "Aceitar Quest"
- [ ] Botão "Abandonar Quest"

### 2. Criar Tela de Conquistas
- [ ] Componente `AchievementsPage.tsx` / `AchievementsPage.jsx`
- [ ] Listar todas as conquistas
- [ ] Filtros: Todas / Completadas / Em Progresso
- [ ] Barra de progresso geral
- [ ] Categorias (Batalha, Dano, etc.)

### 3. Indicadores de Progresso
- [ ] Mostrar quest ativa no HUD de batalha
- [ ] Atualizar progresso em tempo real durante batalha
- [ ] Badge de "Quest Completa!" após vitória

### 4. Popup de Conquistas
- [ ] Toast/Modal ao desbloquear conquista
- [ ] Animação de comemoração
- [ ] Som de conquista desbloqueada

### 5. Integração com Perfil
- [ ] Mostrar conquistas no perfil do usuário
- [ ] Mostrar percentual de conclusão
- [ ] Conquistas recentes

---

## ⚠️ Considerações Importantes

### Performance
- ✅ Usar índices no banco (`character_id`, `type`, `status`)
- ✅ Cachear lista de quests disponíveis (não muda com frequência)
- ✅ Atualizar progresso de forma assíncrona

### Segurança
- ✅ Sempre validar que personagem pertence ao usuário
- ✅ Não permitir manipulação de progresso no frontend
- ✅ Usar transações para evitar race conditions

### UX
- ✅ Feedback imediato ao aceitar/abandonar quest
- ✅ Notificações de progresso durante batalha
- ✅ Celebração ao completar quest/conquista
- ✅ Tutoriais para explicar sistema de quests

---

## 📞 Suporte

Para dúvidas ou problemas na implementação:
- Verificar logs do Spring Boot
- Verificar tabelas no banco: `quest`, `character_quest`, `achievements`
- Testar endpoints via Postman/Insomnia primeiro

---

**Fim da Documentação** 🎉
