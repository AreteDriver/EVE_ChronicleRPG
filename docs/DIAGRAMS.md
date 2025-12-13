# UML and Game Flow Diagrams

This document contains UML diagrams and visual representations of the EVE Chronicle RPG game structure and flow.

## Class Diagram

### Core Module Classes

```
┌─────────────────────────────────────────┐
│           <<abstract>>                  │
│           GameState                     │
├─────────────────────────────────────────┤
│ # Methods:                              │
│ + handle_event(event) -> None           │
│ + update(dt: float) -> None             │
│ + draw(screen) -> None                  │
└──────────────▲──────────────────────────┘
               │
               │ extends
               │
    ┌──────────┴─────────┬─────────────┬──────────────┐
    │                    │             │              │
┌───▼──────────┐  ┌──────▼─────┐  ┌───▼──────┐  ┌───▼──────────┐
│ MenuState    │  │ WorldState │  │ DialogState│ │ CombatState  │
├──────────────┤  ├────────────┤  ├───────────┤  ├──────────────┤
│              │  │            │  │           │  │              │
└──────────────┘  └────────────┘  └───────────┘  └──────────────┘


┌─────────────────────────────────────────┐
│       GameStateManager                  │
├─────────────────────────────────────────┤
│ - stack: List[GameState]                │
├─────────────────────────────────────────┤
│ + push(state: GameState) -> None        │
│ + pop() -> None                         │
│ + switch(state: GameState) -> None      │
│ + current() -> GameState | None         │
│ + handle_event(event) -> None           │
│ + update(dt: float) -> None             │
│ + draw(screen) -> None                  │
└──────────────┬──────────────────────────┘
               │
               │ manages
               │
               ▼
       [Stack of GameState]
```

### Systems Module Classes

```
┌─────────────────────────────────────────┐
│      QuestManager                       │
├─────────────────────────────────────────┤
│ - chronicles: Dict[str,                 │
│                ChronicleProgress]       │
├─────────────────────────────────────────┤
│ + start_chronicle(id, stage) -> None    │
│ + get_progress(id) -> ChronicleProgress?│
│ + complete_chronicle(id) -> None        │
│ + set_flag(id, flag, value) -> None     │
│ + advance_stage(id, stage) -> None      │
└──────────────┬──────────────────────────┘
               │
               │ uses
               ▼
┌─────────────────────────────────────────┐
│   <<dataclass>>                         │
│   ChronicleProgress                     │
├─────────────────────────────────────────┤
│ + chronicle_id: str                     │
│ + current_stage: str                    │
│ + completed: bool                       │
│ + flags: Dict[str, Any]                 │
└─────────────────────────────────────────┘


┌─────────────────────────────────────────┐
│      DialogueTree                       │
├─────────────────────────────────────────┤
│ - path: Path                            │
│ - nodes: Dict[str, Dict[str, Any]]      │
│ - start_id: str                         │
│ - current_id: Optional[str]             │
│ - game_state: Dict[str, Any]            │
├─────────────────────────────────────────┤
│ + reset() -> None                       │
│ + current_node() -> Dict[str, Any]?     │
│ + choices() -> List[Dict[str, Any]]     │
│ + check_condition(cond: str) -> bool    │
│ + advance(choice_idx: int) -> Dict?     │
│ + apply_effect(effect: Dict) -> None    │
│ + is_finished() -> bool                 │
└─────────────────────────────────────────┘
```

### World Module Classes

```
┌─────────────────────────────────────────┐
│         MapData                         │
├─────────────────────────────────────────┤
│ + name: str                             │
│ + width: int                            │
│ + height: int                           │
│ + tile_size: int                        │
│ + layers: Optional[List[Dict]]          │
│ + collision_mask: Optional[List[List]]  │
│ + collision_rects: List[pygame.Rect]    │
│ + npcs: List[Dict[str, Any]]            │
│ + interactables: List[Dict[str, Any]]   │
│ + events: List[Dict[str, Any]]          │
├─────────────────────────────────────────┤
│ + world_pos(grid_pos) -> pygame.Rect    │
│ + is_blocked(grid_pos) -> bool          │
└─────────────────────────────────────────┘
```

## Sequence Diagrams

### Player Initiates Dialogue Sequence

```
Player    GameLoop    StateManager   DialogueState   DialogueTree   GameState
  │           │            │              │               │            │
  │ Press E   │            │              │               │            │
  ├──────────>│            │              │               │            │
  │           │ Event      │              │               │            │
  │           ├───────────>│              │               │            │
  │           │            │ handle_event │               │            │
  │           │            ├─────────────>│               │            │
  │           │            │              │ current_node()│            │
  │           │            │              ├──────────────>│            │
  │           │            │              │<──────────────┤            │
  │           │            │              │  node data    │            │
  │           │            │              │               │            │
  │           │            │              │  choices()    │            │
  │           │            │              ├──────────────>│            │
  │           │            │              │               │            │
  │           │            │              │  check_condition()         │
  │           │            │              │<──────────────┤            │
  │           │            │              │ filtered list │            │
  │           │            │              │               │            │
  │           │            │   Display dialogue & choices │            │
  │<──────────┴────────────┴──────────────┤               │            │
  │                                       │               │            │
  │ Choose option                         │               │            │
  ├──────────────────────────────────────>│               │            │
  │                                       │  advance(idx) │            │
  │                                       ├──────────────>│            │
  │                                       │               │            │
  │                                       │  apply_effect()            │
  │                                       │               │            │
  │                                       │  Update game_state         │
  │                                       │               ├───────────>│
  │                                       │               │            │
  │                                       │<──────────────┤            │
  │                                       │ next node     │            │
  │<──────────────────────────────────────┤               │            │
```

### Quest Progression Sequence

```
Player   GameLoop   WorldState   QuestManager   DialogueTree   GameState
  │         │           │              │              │            │
  │ Complete objective  │              │              │            │
  ├────────>│           │              │              │            │
  │         │  update() │              │              │            │
  │         ├──────────>│              │              │            │
  │         │           │ advance_stage()             │            │
  │         │           ├─────────────>│              │            │
  │         │           │              │              │            │
  │         │           │              │ set_flag()   │            │
  │         │           │              ├──────────────┼───────────>│
  │         │           │              │              │  update    │
  │         │           │              │              │            │
  │         │           │<─────────────┤              │            │
  │         │           │   updated    │              │            │
  │         │           │              │              │            │
  │         │  Show notification       │              │            │
  │<────────┴───────────┤              │              │            │
  │                     │              │              │            │
```

### State Transition Flow

```
┌─────────────┐  push(World)   ┌─────────────┐
│  MainMenu   │───────────────>│ WorldState  │
│   State     │                │             │
└─────────────┘                └──────┬──────┘
                                      │
                              push(Dialogue)
                                      │
                                      ▼
                              ┌─────────────┐
                              │ DialogueState│
                              └──────┬──────┘
                                     │
                                pop()│
                                     │
                                     ▼
                              ┌─────────────┐
                              │ WorldState  │
                              │  (resumed)  │
                              └──────┬──────┘
                                     │
                           switch(Combat)
                                     │
                                     ▼
                              ┌─────────────┐
                              │ CombatState │
                              └──────┬──────┘
                                     │
                           switch(World)
                                     │
                                     ▼
                              ┌─────────────┐
                              │ WorldState  │
                              └─────────────┘
```

## Component Interaction Diagram

```
┌────────────────────────────────────────────────────────────────┐
│                        Game Application                        │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │                  GameStateManager                        │  │
│  │                 (Coordinates all states)                 │  │
│  └────────┬─────────────────────────────────────────┬───────┘  │
│           │                                         │           │
│  ┌────────▼─────────┐                    ┌─────────▼────────┐  │
│  │   MenuState      │                    │   WorldState     │  │
│  │                  │                    │                  │  │
│  │  - New Game      │                    │  ┌────────────┐ │  │
│  │  - Load Game     │                    │  │  MapData   │ │  │
│  │  - Settings      │                    │  └─────┬──────┘ │  │
│  └──────────────────┘                    │        │        │  │
│                                          │        │        │  │
│                                          │  ┌─────▼──────┐ │  │
│                                          │  │ Player Ent │ │  │
│                                          │  └────────────┘ │  │
│                                          └─────────┬────────┘  │
│                                                    │           │
│                                          ┌─────────▼────────┐  │
│                                          │  DialogueState   │  │
│                                          │                  │  │
│                                          │  ┌────────────┐ │  │
│                                          │  │ Dialogue   │ │  │
│                                          │  │   Tree     │ │  │
│                                          │  └────────────┘ │  │
│                                          └──────────────────┘  │
│                                                                │
│  ┌──────────────────────────────────────────────────────────┐ │
│  │                     Shared Systems                       │ │
│  │                                                          │ │
│  │  ┌─────────────┐    ┌──────────────┐   ┌────────────┐  │ │
│  │  │   Quest     │    │   Dialogue   │   │  Faction   │  │ │
│  │  │  Manager    │    │   Engine     │   │  System    │  │ │
│  │  └─────────────┘    └──────────────┘   └────────────┘  │ │
│  │                                                          │ │
│  └──────────────────────────────────────────────────────────┘ │
│                                                                │
│  ┌──────────────────────────────────────────────────────────┐ │
│  │                      Game State                          │ │
│  │  - inventory: List[str]                                  │ │
│  │  - flags: Dict[str, bool]                                │ │
│  │  - factions: Dict[str, int]                              │ │
│  │  - position: Tuple[int, int]                             │ │
│  └──────────────────────────────────────────────────────────┘ │
└────────────────────────────────────────────────────────────────┘
```

## Data Flow Diagram

```
┌─────────────┐
│  JSON Files │
│ (Dialogues, │
│   Maps,     │
│  Quests)    │
└──────┬──────┘
       │
       │ Load at runtime
       ▼
┌──────────────────┐
│  Data Loaders    │
│ - DialogueTree   │
│ - MapData        │
└────────┬─────────┘
         │
         │ Parse & Validate
         ▼
┌──────────────────┐      ┌──────────────┐
│  Game Systems    │◄────►│  Game State  │
│ - QuestManager   │      │  - inventory │
│ - DialogueEngine │      │  - flags     │
│ - MapSystem      │      │  - factions  │
└────────┬─────────┘      └──────────────┘
         │
         │ Process game logic
         ▼
┌──────────────────┐
│   Game States    │
│ - MenuState      │
│ - WorldState     │
│ - DialogueState  │
└────────┬─────────┘
         │
         │ Render
         ▼
┌──────────────────┐
│  Display Output  │
│ (Pygame screen)  │
└──────────────────┘
```

## State Machine Diagram

### Game State Transitions

```
        ┌──────────┐
        │  START   │
        └────┬─────┘
             │
             v
        ┌────────────┐
    ┌──►│ Main Menu  │◄───────┐
    │   └────┬───────┘        │
    │        │                │
    │        │ New Game       │ Quit
    │        v                │
    │   ┌────────────┐        │
    │   │  Intro     │        │
    │   └────┬───────┘        │
    │        │                │
    │        v                │
    │   ┌────────────┐        │
    ├───┤ World Map  │        │
    │   └────┬───┬───┘        │
    │        │   │            │
    │   NPC  │   │ Event      │
    │        v   v            │
    │   ┌────────────┐        │
    │   │  Dialogue  │        │
    │   └────┬───────┘        │
    │        │                │
    │        │ End/Continue   │
    │        v                │
    │   ┌────────────┐        │
    │   │ World Map  │        │
    │   └────┬───────┘        │
    │        │                │
    │        │ Combat trigger │
    │        v                │
    │   ┌────────────┐        │
    │   │  Combat    │        │
    │   └────┬───────┘        │
    │        │                │
    │        │ Victory/Flee   │
    │        v                │
    │   ┌────────────┐        │
    └───┤ World Map  │────────┘
        └────────────┘
```

### Dialogue State Flow

```
    ┌──────────────┐
    │ Start Node   │
    └──────┬───────┘
           │
           v
    ┌──────────────────┐
    │ Display Text     │
    └──────┬───────────┘
           │
           v
    ┌──────────────────┐
    │ Filter Choices   │
    │ (by conditions)  │
    └──────┬───────────┘
           │
           v
    ┌──────────────────┐
    │ Player Selects   │
    └──────┬───────────┘
           │
           v
    ┌──────────────────┐
    │ Apply Effects    │
    │ - Faction change │
    │ - Set flags      │
    │ - Add items      │
    └──────┬───────────┘
           │
           v
    ┌──────────────────┐
    │ Next Node?       │
    └──────┬───────┬───┘
           │       │
       Yes │       │ No
           │       v
           │  ┌────────────┐
           │  │    End     │
           │  └────────────┘
           │
           v
    ┌──────────────┐
    │ Display Text │
    └──────────────┘
         (loop)
```

## Module Dependency Graph

```
                    ┌─────────────┐
                    │   Main      │
                    │  (Game Loop)│
                    └──────┬──────┘
                           │
                           │ imports
                ┌──────────┼──────────┐
                │          │          │
                v          v          v
        ┌───────────┐ ┌────────┐ ┌───────┐
        │   core/   │ │systems/│ │world/ │
        │state_mgr  │ │        │ │       │
        └───────────┘ └────┬───┘ └───┬───┘
                           │          │
              ┌────────────┼──────────┤
              │            │          │
              v            v          v
        ┌──────────┐ ┌──────────┐ ┌─────────┐
        │ quest_   │ │ dialogue_│ │  map_   │
        │ manager  │ │  engine  │ │  data   │
        └──────────┘ └──────────┘ └─────────┘
              │            │          │
              └────────────┼──────────┘
                           │
                           v
                    ┌─────────────┐
                    │ Game State  │
                    │   (shared)  │
                    └─────────────┘

Legend:
─────> : Direct dependency
```

## Conclusion

These diagrams provide a visual overview of the EVE Chronicle RPG architecture. For detailed implementation information, see [ARCHITECTURE.md](ARCHITECTURE.md).

Key takeaways:
- **Modular design**: Clear separation between core, systems, and world
- **State-based**: Game flow managed through state stack
- **Data-driven**: Content defined in JSON files
- **Extensible**: Easy to add new systems and features
