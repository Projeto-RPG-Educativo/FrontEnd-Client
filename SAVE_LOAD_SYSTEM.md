# 💾 Sistema de Save/Load - RPG Educativo

> **Documentação Técnica Completa**  
> **Versão**: 1.0  
> **Última atualização**: 08/11/2025  
> **Status**: ✅ Implementado (Não está no frontend ainda)

---

## 📋 Índice

1. [Visão Geral](#visão-geral)
2. [Como Funciona](#como-funciona)
3. [Estrutura de Dados](#estrutura-de-dados)
4. [Endpoints da API](#endpoints-da-api)
5. [DTOs e Formatos](#dtos-e-formatos)
6. [Arquivos e Componentes](#arquivos-e-componentes)
7. [Formato do JSON de Estado](#formato-do-json-de-estado)
8. [Exemplos de Uso](#exemplos-de-uso)
9. [Integração com Frontend](#integração-com-frontend)
10. [Boas Práticas](#boas-práticas)

---

## 🎯 Visão Geral

O sistema de **Save/Load** permite que jogadores salvem e carreguem o progresso de seus personagens em **slots de salvamento** nomeados. Cada save armazena o **estado completo** do personagem em formato **JSON** no banco de dados PostgreSQL (tipo `jsonb`).

### Características Principais

✅ **Múltiplos Slots**: Cada usuário pode ter vários saves em diferentes slots  
✅ **Formato JSON Flexível**: Estado armazenado como JSON para máxima flexibilidade  
✅ **Auto-Save e Manual Save**: Suporta tanto salvamentos automáticos quanto manuais  
✅ **Sobrescrita Inteligente**: Salvar no mesmo slot atualiza o save existente  
✅ **Validação de Propriedade**: Apenas o dono pode acessar/modificar seus saves  
✅ **Metadados Úteis**: Data, personagem, classe para preview rápido

### Casos de Uso

1. **Salvamento Manual**: Jogador clica em "Salvar Jogo" no menu
2. **Auto-Save**: Sistema salva automaticamente após batalhas/quests
3. **Quick Save**: Salvamento rápido em slot dedicado (F5)
4. **Carregar Jogo**: Jogador escolhe save e restaura todo o progresso
5. **Múltiplos Personagens**: Cada personagem pode ter seus próprios saves

---

## 🔄 Como Funciona

### Fluxo de Salvamento

```
1. Jogador clica "Salvar"
   ↓
2. Frontend coleta estado completo do jogo:
   - HP/XP/Ouro atual do personagem
   - Inventário completo
   - Progresso em quests ativas
   - Localização atual (hub, batalha, etc.)
   - Habilidades/Skills desbloqueadas
   ↓
3. Frontend envia POST /api/saves com JSON
   ↓
4. Backend valida propriedade do personagem
   ↓
5. Backend verifica se já existe save no slot
   ↓
6. Se existe: ATUALIZA save existente
   Se não: CRIA novo save
   ↓
7. Backend salva JSON no PostgreSQL (tipo jsonb)
   ↓
8. Retorna confirmação com ID do save
```

### Fluxo de Carregamento

```
1. Jogador abre tela "Carregar Jogo"
   ↓
2. Frontend busca GET /api/saves (lista todos os saves)
   ↓
3. Exibe preview de cada save:
   - Slot (Save 1, Save 2, Auto-Save)
   - Data/hora do salvamento
   - Nome do personagem
   - Classe do personagem
   ↓
4. Jogador seleciona um save
   ↓
5. Frontend busca GET /api/saves/slot/{slotName}
   ↓
6. Backend retorna JSON completo do estado
   ↓
7. Frontend parseia JSON e restaura:
   - HP/XP/Ouro do personagem
   - Inventário
   - Progresso em quests
   - Localização
   - Skills
   ↓
8. Jogo continua do ponto salvo
```

### Slots de Salvamento

O sistema usa **nome de slot** (string) em vez de número fixo, permitindo flexibilidade:

| Tipo de Slot | Nome Sugerido | Descrição |
|--------------|---------------|-----------|
| Save Manual | `"slot1"`, `"slot2"`, `"slot3"` | Saves manuais do jogador |
| Quick Save | `"quicksave"` | Salvamento rápido (F5) |
| Auto Save | `"autosave"` | Salvamento automático |
| Checkpoint | `"checkpoint-hub"`, `"checkpoint-battle"` | Checkpoints do sistema |

---

## 📊 Estrutura de Dados

### Entidade GameSave

```java
@Entity
@Table(name = "game_save")
public class GameSave {
    private Integer id;                    // PK auto-incremento
    private String slotName;               // Nome do slot (slot1, quicksave)
    private LocalDateTime savedAt;         // Data/hora do salvamento
    private String characterState;         // JSON completo do estado
    private User user;                     // ManyToOne - dono do save
    private Character character;           // ManyToOne - personagem salvo
}
```

### Constraint de Unicidade

```sql
UNIQUE(user_id, slot_name)
```

**Significado**: Cada usuário pode ter **apenas 1 save por slot**.  
Se salvar novamente no mesmo slot, o save anterior é **sobrescrito**.

---

## 🌐 Endpoints da API

### Base URL
```
http://localhost:8000/api/saves
```

Todas as rotas requerem autenticação JWT (header `Authorization: Bearer {token}`).

---

### 1. Criar ou Atualizar Save

```http
POST /api/saves
```

**Auth**: ✅ Requer token JWT

**Body**:
```json
{
  "characterId": 1,
  "slotName": "slot1",
  "currentState": {
    "hp": 85,
    "maxHp": 100,
    "xp": 1250,
    "gold": 350,
    "level": 5,
    "location": "hub",
    "inventory": [
      { "itemId": 1, "quantity": 3 },
      { "itemId": 5, "quantity": 1 }
    ],
    "activeQuests": [1, 3],
    "completedQuests": [2],
    "skills": [1, 2, 4],
    "lastSavedLocation": "biblioteca"
  }
}
```

**Retorna** (201 Created):
```json
{
  "id": 15,
  "slotName": "slot1",
  "savedAt": "2025-11-08T15:30:45",
  "characterState": "{\"hp\":85,\"maxHp\":100,...}",
  "userId": 1,
  "characterId": 1
}
```

**Validações**:
- ✅ Personagem existe
- ✅ Personagem pertence ao usuário autenticado
- ✅ `currentState` não pode ser null

**Comportamento**:
- Se já existe save em `slot1`: **ATUALIZA** o existente
- Se não existe: **CRIA** novo save
- `savedAt` é atualizado automaticamente

**Erros Possíveis**:
```json
// 404 - Personagem não encontrado
{
  "message": "Personagem não encontrado"
}

// 400 - Personagem não pertence ao usuário
{
  "message": "Personagem não pertence a este usuário."
}
```

---

### 2. Listar Todos os Saves do Usuário

```http
GET /api/saves
```

**Auth**: ✅ Requer token JWT

**Query Params**: Nenhum

**Retorna**:
```json
[
  {
    "id": 15,
    "slotName": "slot1",
    "savedAt": "2025-11-08T15:30:45",
    "characterId": 1,
    "characterName": "Gandalf",
    "characterClass": "Mago"
  },
  {
    "id": 18,
    "slotName": "quicksave",
    "savedAt": "2025-11-08T14:20:10",
    "characterId": 2,
    "characterName": "Aragorn",
    "characterClass": "Lutador"
  },
  {
    "id": 20,
    "slotName": "autosave",
    "savedAt": "2025-11-08T16:05:30",
    "characterId": 1,
    "characterName": "Gandalf",
    "characterClass": "Mago"
  }
]
```

**Observações**:
- Retorna **versão simplificada** sem o JSON completo (`characterState`)
- Ideal para tela de seleção de saves
- Ordenado por `savedAt DESC` (mais recente primeiro)
- Inclui informações de preview (nome, classe, data)

**Uso no Frontend**:
```javascript
// Exibir lista de saves na tela "Carregar Jogo"
const saves = await fetchUserSaves();
saves.forEach(save => {
  console.log(`${save.slotName}: ${save.characterName} (${save.characterClass})`);
  console.log(`Salvo em: ${new Date(save.savedAt).toLocaleString()}`);
});
```

---

### 3. Carregar Save por Slot

```http
GET /api/saves/slot/{slotName}
```

**Auth**: ✅ Requer token JWT

**Path Params**:
- `slotName` (String) - Nome do slot (ex: "slot1", "quicksave")

**Exemplo**:
```http
GET /api/saves/slot/slot1
```

**Retorna**:
```json
{
  "id": 15,
  "slotName": "slot1",
  "savedAt": "2025-11-08T15:30:45",
  "characterState": "{\"hp\":85,\"maxHp\":100,\"xp\":1250,\"gold\":350,\"level\":5,\"location\":\"hub\",\"inventory\":[{\"itemId\":1,\"quantity\":3}],\"activeQuests\":[1,3],\"completedQuests\":[2],\"skills\":[1,2,4],\"lastSavedLocation\":\"biblioteca\"}",
  "userId": 1,
  "characterId": 1
}
```

**Observações**:
- Retorna **save completo** com todo o JSON de estado
- `characterState` é uma **string JSON** que precisa ser parseada no frontend
- Usado quando jogador seleciona "Carregar" em um save específico

**Uso no Frontend**:
```javascript
// Carregar save e restaurar estado
const save = await fetchSaveBySlot('slot1');
const state = JSON.parse(save.characterState);

// Restaurar estado do jogo
character.hp = state.hp;
character.xp = state.xp;
character.gold = state.gold;
inventory.loadItems(state.inventory);
quests.loadProgress(state.activeQuests, state.completedQuests);
game.teleportTo(state.location);
```

**Erros Possíveis**:
```json
// 404 - Save não encontrado
{
  "message": "Save não encontrado"
}
```

---

### 4. Deletar Save

```http
DELETE /api/saves/{saveId}
```

**Auth**: ✅ Requer token JWT

**Path Params**:
- `saveId` (Integer) - ID do save a deletar

**Exemplo**:
```http
DELETE /api/saves/15
```

**Retorna**: Status 204 No Content (sem corpo)

**Observações**:
- Remove permanentemente o save do banco
- **Não há confirmação adicional** - frontend deve pedir confirmação ao usuário
- Libera o slot para ser usado novamente

**Erros Possíveis**:
```json
// 404 - Save não encontrado
{
  "message": "Save não encontrado"
}
```

**Uso no Frontend**:
```javascript
// Deletar save com confirmação
if (confirm('Tem certeza que deseja deletar este save?')) {
  await deleteSave(saveId);
  alert('Save deletado com sucesso!');
  refreshSavesList();
}
```

---

## 📦 DTOs e Formatos

### Request DTOs

#### SaveRequestDto
```java
{
  "userId": Long,          // Opcional (extraído do token)
  "characterId": Long,     // Obrigatório
  "slotName": String,      // Obrigatório (ex: "slot1")
  "currentState": JsonNode // Obrigatório - JSON com estado completo
}
```

**Validações**:
- `currentState` não pode ser null (`@NotNull`)

---

### Response DTOs

#### SaveResponseDto (Lista - Simplificado)
```java
{
  "id": Integer,
  "slotName": String,
  "savedAt": LocalDateTime,
  "characterId": Integer,
  "characterName": String,
  "characterClass": String
}
```

**Uso**: Listagem de saves (GET /api/saves)  
**Vantagem**: Leve, sem JSON completo

---

#### GameSaveDto (Completo)
```java
{
  "id": Integer,
  "slotName": String,
  "savedAt": LocalDateTime,
  "characterState": String,    // JSON serializado como string
  "userId": Integer,
  "characterId": Integer
}
```

**Uso**: Carregar save específico (GET /api/saves/slot/{slot})  
**Vantagem**: Contém estado completo para restauração

---

## 📁 Arquivos e Componentes

### Estrutura de Arquivos

```
src/main/java/com/game/rpgbackend/
├── controller/
│   └── save/
│       └── SaveController.java          # Endpoints de saves
├── service/
│   └── save/
│       └── SaveService.java             # Lógica de negócio
├── domain/
│   └── GameSave.java                    # Entidade JPA
├── repository/
│   └── GameSaveRepository.java          # Repository JPA
└── dto/
    ├── request/
    │   └── save/
    │       └── SaveRequestDto.java      # DTO de entrada
    └── response/
        └── save/
            ├── GameSaveDto.java         # DTO completo
            └── SaveResponseDto.java     # DTO simplificado
```

### Descrição dos Componentes

#### SaveController.java
**Responsabilidade**: Expor endpoints REST para saves  
**Endpoints**: POST, GET (lista), GET (por slot), DELETE  
**Validações**: Token JWT, propriedade de personagem

#### SaveService.java
**Responsabilidade**: Lógica de negócio de saves  
**Funções**:
- Criar ou atualizar save
- Buscar saves por usuário
- Buscar save por slot
- Deletar save
- Validar propriedade

#### GameSave.java (Entity)
**Responsabilidade**: Mapear tabela `game_save`  
**Relacionamentos**:
- ManyToOne com `User`
- ManyToOne com `Character`
**Constraints**: UNIQUE(user_id, slot_name)

#### GameSaveRepository.java
**Responsabilidade**: Acesso a dados (CRUD)  
**Queries Customizadas**:
- `findByUserId()`
- `findByUserIdAndSlotName()`

---

## 🗂️ Formato do JSON de Estado

### Estrutura Recomendada

O campo `characterState` deve conter um JSON com **todo o estado necessário** para restaurar o jogo:

```json
{
  // === ATRIBUTOS DO PERSONAGEM ===
  "hp": 85,
  "maxHp": 100,
  "energy": 45,
  "maxEnergy": 50,
  "xp": 1250,
  "level": 5,
  "gold": 350,
  
  // === LOCALIZAÇÃO ===
  "location": "hub",
  "lastSavedLocation": "biblioteca",
  "inBattle": false,
  
  // === INVENTÁRIO ===
  "inventory": [
    {
      "itemId": 1,
      "itemName": "Poção de Vida",
      "quantity": 3
    },
    {
      "itemId": 5,
      "itemName": "Espada de Fogo",
      "quantity": 1,
      "equipped": true
    }
  ],
  
  // === QUESTS ===
  "activeQuests": [
    {
      "questId": 1,
      "progress": 5,
      "targetValue": 15
    },
    {
      "questId": 3,
      "progress": 2,
      "targetValue": 10
    }
  ],
  "completedQuests": [2, 4, 7],
  
  // === SKILLS/HABILIDADES ===
  "skills": [1, 2, 4, 7],
  "equippedSkills": [1, 4],
  
  // === ACHIEVEMENTS ===
  "unlockedAchievements": [
    "WIN_FIRST_BATTLE",
    "ANSWER_10_QUESTIONS",
    "COMPLETE_FIRST_QUEST"
  ],
  
  // === BATALHA (se estava em batalha) ===
  "battleState": {
    "monsterId": 3,
    "monsterHp": 45,
    "difficulty": "medium",
    "turnNumber": 8
  },
  
  // === ESTATÍSTICAS ===
  "stats": {
    "totalBattles": 15,
    "battlesWon": 12,
    "questionsAnswered": 45,
    "questionsCorrect": 38,
    "totalDamageDealt": 1200
  },
  
  // === TUTORIAL ===
  "tutorialCompleted": true,
  "tutorialStep": 10,
  
  // === CONFIGURAÇÕES ===
  "settings": {
    "soundVolume": 0.7,
    "musicVolume": 0.5,
    "difficulty": "normal"
  },
  
  // === METADADOS ===
  "version": "1.0.0",
  "timestamp": "2025-11-08T15:30:45Z"
}
```

### Campos Essenciais (Mínimo)

```json
{
  "hp": 85,
  "xp": 1250,
  "gold": 350,
  "level": 5,
  "location": "hub"
}
```

### Campos Opcionais (Recomendados)

- `inventory`: Para restaurar itens
- `activeQuests`: Para continuar quests
- `skills`: Para habilidades desbloqueadas
- `battleState`: Se estava em batalha
- `stats`: Para estatísticas de perfil

---

## 💡 Exemplos de Uso no Frontend

### 1. Salvar Jogo Manualmente

```javascript
const token = localStorage.getItem('token');
const characterId = 1;

// Coletar estado completo do jogo
const gameState = {
  hp: character.hp,
  maxHp: character.maxHp,
  xp: character.xp,
  gold: character.gold,
  level: character.level,
  location: game.currentLocation,
  inventory: inventory.getAll(),
  activeQuests: quests.getActive(),
  completedQuests: quests.getCompleted(),
  skills: character.skills,
  settings: userSettings
};

// Salvar no slot1
const response = await fetch('http://localhost:8000/api/saves', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    characterId: characterId,
    slotName: 'slot1',
    currentState: gameState
  })
});

const save = await response.json();
console.log('Jogo salvo com sucesso!', save);
alert(`Jogo salvo no ${save.slotName}`);
```

### 2. Auto-Save Após Batalha

```javascript
// Após vencer uma batalha
async function autoSaveAfterBattle() {
  const gameState = collectGameState();
  
  await fetch('http://localhost:8000/api/saves', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      characterId: currentCharacter.id,
      slotName: 'autosave',
      currentState: gameState
    })
  });
  
  console.log('Auto-save concluído');
}
```

### 3. Listar Saves na Tela de Carregamento

```javascript
async function loadSaveScreen() {
  const token = localStorage.getItem('token');
  
  const response = await fetch('http://localhost:8000/api/saves', {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  
  const saves = await response.json();
  
  // Renderizar lista
  const saveList = document.getElementById('save-list');
  saveList.innerHTML = '';
  
  saves.forEach(save => {
    const saveDiv = document.createElement('div');
    saveDiv.className = 'save-slot';
    saveDiv.innerHTML = `
      <h3>${save.slotName}</h3>
      <p>${save.characterName} - ${save.characterClass}</p>
      <p>Salvo em: ${new Date(save.savedAt).toLocaleString()}</p>
      <button onclick="loadSave('${save.slotName}')">Carregar</button>
      <button onclick="deleteSave(${save.id})">Deletar</button>
    `;
    saveList.appendChild(saveDiv);
  });
}
```

### 4. Carregar Save Selecionado

```javascript
async function loadSave(slotName) {
  const token = localStorage.getItem('token');
  
  const response = await fetch(
    `http://localhost:8000/api/saves/slot/${slotName}`,
    {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }
  );
  
  const save = await response.json();
  
  // Parsear JSON de estado
  const state = JSON.parse(save.characterState);
  
  // Restaurar estado do jogo
  character.hp = state.hp;
  character.xp = state.xp;
  character.gold = state.gold;
  character.level = state.level;
  
  // Restaurar inventário
  inventory.clear();
  state.inventory.forEach(item => {
    inventory.addItem(item.itemId, item.quantity);
  });
  
  // Restaurar quests
  quests.loadActive(state.activeQuests);
  quests.markCompleted(state.completedQuests);
  
  // Restaurar localização
  game.teleportTo(state.location);
  
  console.log('Jogo carregado com sucesso!');
  alert(`Bem-vindo de volta, ${character.name}!`);
}
```

### 5. Quick Save (F5)

```javascript
// Atalho de teclado para quick save
document.addEventListener('keydown', async (e) => {
  if (e.key === 'F5') {
    e.preventDefault();
    
    const gameState = collectGameState();
    
    await fetch('http://localhost:8000/api/saves', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        characterId: currentCharacter.id,
        slotName: 'quicksave',
        currentState: gameState
      })
    });
    
    showNotification('Quick Save realizado!', 'success');
  }
});
```

### 6. Deletar Save com Confirmação

```javascript
async function deleteSave(saveId) {
  if (!confirm('Tem certeza que deseja deletar este save?')) {
    return;
  }
  
  const token = localStorage.getItem('token');
  
  await fetch(`http://localhost:8000/api/saves/${saveId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  
  alert('Save deletado com sucesso!');
  loadSaveScreen(); // Recarregar lista
}
```

---

## 🎨 Integração com Frontend

### Tela de Salvamento

```
┌──────────────────────────────────────┐
│  SALVAR JOGO                         │
├──────────────────────────────────────┤
│  Escolha um slot:                    │
│                                      │
│  ┌────────────────────────────────┐  │
│  │ 💾 Save 1                      │  │
│  │ Gandalf (Mago)                 │  │
│  │ Salvo: 08/11 15:30             │  │
│  │ [Sobrescrever]                 │  │
│  └────────────────────────────────┘  │
│                                      │
│  ┌────────────────────────────────┐  │
│  │ 💾 Save 2                      │  │
│  │ (Vazio)                        │  │
│  │ [Salvar Aqui]                  │  │
│  └────────────────────────────────┘  │
│                                      │
│  ┌────────────────────────────────┐  │
│  │ ⚡ Quick Save                  │  │
│  │ Aragorn (Lutador)              │  │
│  │ Salvo: 08/11 14:20             │  │
│  │ [Sobrescrever]                 │  │
│  └────────────────────────────────┘  │
│                                      │
│  [Cancelar]                          │
└──────────────────────────────────────┘
```

### Tela de Carregamento

```
┌──────────────────────────────────────┐
│  CARREGAR JOGO                       │
├──────────────────────────────────────┤
│  ┌────────────────────────────────┐  │
│  │ 💾 Save 1                      │  │
│  │ Gandalf (Mago) - Nível 5       │  │
│  │ 1250 XP, 350 Gold              │  │
│  │ Última loc: Biblioteca         │  │
│  │ Salvo: 08/11 15:30             │  │
│  │ [Carregar] [Deletar]           │  │
│  └────────────────────────────────┘  │
│                                      │
│  ┌────────────────────────────────┐  │
│  │ ⚡ Quick Save                  │  │
│  │ Aragorn (Lutador) - Nível 3    │  │
│  │ 450 XP, 120 Gold               │  │
│  │ Última loc: Torre              │  │
│  │ Salvo: 08/11 14:20             │  │
│  │ [Carregar] [Deletar]           │  │
│  └────────────────────────────────┘  │
│                                      │
│  [Voltar ao Menu]                    │
└──────────────────────────────────────┘
```

### Indicador de Auto-Save

```
┌─────────────────────┐
│ 💾 Salvando...     │  ← Aparece no canto
└─────────────────────┘

┌─────────────────────┐
│ ✅ Salvo!          │  ← Desaparece após 2s
└─────────────────────┘
```

---

## 🛡️ Boas Práticas

### Para o Backend

1. **Validar Propriedade**: Sempre verificar se personagem pertence ao usuário
2. **Usar Transações**: `@Transactional` para garantir consistência
3. **Limpar Dados Sensíveis**: Não salvar senhas ou tokens no JSON
4. **Limitar Tamanho**: Configurar limite de tamanho do JSON (ex: 1MB)
5. **Versionamento**: Incluir campo `version` no JSON para migração futura

### Para o Frontend

1. **Feedback Visual**: Mostrar loading ao salvar/carregar
2. **Confirmar Sobrescrita**: Avisar antes de sobrescrever save
3. **Confirmar Deleção**: Pedir confirmação antes de deletar
4. **Auto-Save Inteligente**: Salvar após eventos importantes (batalhas, quests)
5. **Throttle**: Limitar frequência de auto-saves (ex: no máximo 1 por minuto)
6. **Validar JSON**: Validar estrutura ao carregar para evitar corrupção

### Para Segurança

1. **Nunca confiar no cliente**: Sempre revalidar estado no servidor
2. **Sanitizar JSON**: Não permitir scripts ou código malicioso
3. **Rate Limiting**: Limitar número de saves por minuto
4. **Autenticação**: Sempre usar token JWT válido
5. **Logs**: Registrar salvamentos para auditoria

---

## 🚀 Próximos Passos para Integração

### 1. Criar Telas de Save/Load
- [ ] Componente `SaveGameScreen.tsx/jsx`
- [ ] Componente `LoadGameScreen.tsx/jsx`
- [ ] Componente `SaveSlot.tsx/jsx` (slot individual)
- [ ] Animações de salvando/carregando

### 2. Implementar Lógica de Estado
- [ ] Função `collectGameState()` - coleta todo estado do jogo
- [ ] Função `restoreGameState(state)` - restaura estado
- [ ] Validação de integridade do JSON
- [ ] Migração de versões antigas de save

### 3. Auto-Save
- [ ] Trigger após batalhas vitoriosas
- [ ] Trigger após completar quests
- [ ] Trigger ao sair do jogo
- [ ] Indicador visual de salvando

### 4. Quick Save/Load
- [ ] Atalho F5 para quick save
- [ ] Atalho F9 para quick load
- [ ] Slot dedicado `quicksave`

### 5. Melhorias de UX
- [ ] Preview do save (screenshot?)
- [ ] Tempo de jogo no save
- [ ] Porcentagem de conclusão
- [ ] Badge de conquistas no save

---

## ⚠️ Considerações Importantes

### Limitações Atuais

❌ **Sem Versionamento Automático**: Se estrutura do JSON mudar, saves antigos podem quebrar  
❌ **Sem Backup em Nuvem**: Saves são apenas locais no banco  
❌ **Sem Compressão**: JSON armazenado como texto puro (pode ser grande)  
❌ **Sem Criptografia**: Estado é armazenado em texto plano

### Melhorias Futuras

✅ **Versionamento de Schema**: Adicionar campo `schemaVersion` e migrar automaticamente  
✅ **Compressão**: Usar gzip/zlib para reduzir tamanho  
✅ **Backup em Nuvem**: Integrar com serviço de armazenamento  
✅ **Multiple Saves por Slot**: Permitir histórico de saves (save1-v1, save1-v2)  
✅ **Screenshots**: Capturar e salvar screenshot do momento do save

---

## 📊 Banco de Dados

### Estrutura da Tabela `game_save`

```sql
CREATE TABLE game_save (
    id SERIAL PRIMARY KEY,
    slot_name VARCHAR(50) NOT NULL,
    saved_at TIMESTAMP NOT NULL DEFAULT NOW(),
    character_state JSONB NOT NULL,
    user_id INTEGER NOT NULL REFERENCES "user"(id),
    character_id INTEGER NOT NULL REFERENCES character(id),
    CONSTRAINT uk_user_slot UNIQUE(user_id, slot_name)
);

CREATE INDEX idx_game_save_user ON game_save(user_id);
CREATE INDEX idx_game_save_slot ON game_save(user_id, slot_name);
```

### Queries Úteis

```sql
-- Buscar todos os saves de um usuário
SELECT * FROM game_save WHERE user_id = 1 ORDER BY saved_at DESC;

-- Buscar save específico por slot
SELECT * FROM game_save WHERE user_id = 1 AND slot_name = 'slot1';

-- Contar saves por usuário
SELECT user_id, COUNT(*) as save_count 
FROM game_save 
GROUP BY user_id;

-- Tamanho total de saves por usuário
SELECT user_id, SUM(LENGTH(character_state)) as total_size
FROM game_save
GROUP BY user_id;
```

---

## 🔍 Troubleshooting

### Problema: Save não aparece na lista

**Causa**: Save foi criado para outro usuário ou slot incorreto  
**Solução**: Verificar `userId` no token JWT e `slotName` usado

### Problema: Erro ao parsear JSON

**Causa**: JSON corrompido ou estrutura inválida  
**Solução**: Validar JSON no backend antes de salvar, adicionar try-catch no frontend

### Problema: Save não carrega estado completo

**Causa**: Campos faltando no JSON ou frontend não restaurando corretamente  
**Solução**: Verificar função `restoreGameState()` e logs de console

### Problema: "Personagem não pertence a este usuário"

**Causa**: Tentando salvar personagem de outro usuário  
**Solução**: Validar que `characterId` pertence ao usuário autenticado

---

## 📞 Suporte

Para dúvidas ou problemas:
- Verificar logs do Spring Boot
- Verificar tabela `game_save` no PostgreSQL
- Testar endpoints via Postman/Insomnia
- Validar JSON de estado no [jsonlint.com](https://jsonlint.com)

---

**Fim da Documentação** 💾✨
