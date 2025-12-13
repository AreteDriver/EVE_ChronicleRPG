# EVE Chronicle RPG - Architecture Documentation

## System Architecture

This document provides detailed technical information about the EVE Chronicle RPG architecture, design patterns, and implementation details.

## Table of Contents
1. [High-Level Architecture](#high-level-architecture)
2. [Module Design](#module-design)
3. [Data Flow](#data-flow)
4. [Design Patterns](#design-patterns)
5. [Extension Points](#extension-points)

## High-Level Architecture

EVE Chronicle RPG follows a modular, layered architecture:

```
┌─────────────────────────────────────────────────────┐
│                  Presentation Layer                 │
│            (Pygame rendering & input)               │
└───────────────────┬─────────────────────────────────┘
                    │
┌───────────────────▼─────────────────────────────────┐
│                  Game State Layer                   │
│         (Scene management, game loop)               │
└───────┬───────────────────────────────┬─────────────┘
        │                               │
┌───────▼────────┐             ┌────────▼────────────┐
│  Game Systems  │             │   World Systems     │
│   - Quests     │             │   - Maps            │
│   - Dialogue   │             │   - NPCs            │
│   - Combat     │             │   - Events          │
└────────┬───────┘             └──────────┬──────────┘
         │                                │
         └────────────┬───────────────────┘
                      │
         ┌────────────▼────────────┐
         │   Data/State Storage    │
         │  - Player progress      │
         │  - Game flags           │
         │  - Faction standings    │
         └─────────────────────────┘
```

## Module Design

### Core Module (`core/`)

#### state_manager.py
**Purpose**: Manages game scenes and states using a stack-based approach.

**Classes**:
- `GameState`: Abstract base class for all game states
  - Methods: `handle_event()`, `update()`, `draw()`
  - Subclassed by: MenuState, WorldState, DialogueState, etc.

- `GameStateManager`: Manages the state stack
  - `push()`: Add a new state on top
  - `pop()`: Remove the current state
  - `switch()`: Replace current state
  - `current()`: Get active state

**Design Pattern**: Stack-based State Pattern

**Usage Flow**:
```
Main Menu State
    ↓ (push)
World State
    ↓ (push)
Dialogue State
    ↓ (pop)
World State (resumed)
```

### Systems Module (`systems/`)

#### quest_manager.py
**Purpose**: Tracks player progress through chronicles (story arcs).

**Data Model**:
```
ChronicleProgress
├── chronicle_id: str
├── current_stage: str
├── completed: bool
└── flags: Dict[str, Any]
```

**Key Operations**:
- Start a new chronicle
- Advance through stages
- Set and check story flags
- Mark chronicles complete

**State Transitions**:
```
Not Started → Started (stage 1) → Stage 2 → ... → Completed
                ↑                     ↑
                └─────────────────────┘
              (can set flags at any stage)
```

#### dialogue_engine.py
**Purpose**: Manages branching conversations with NPCs.

**Data Structure** (JSON):
```json
{
  "start": "node_1",
  "nodes": {
    "node_1": {
      "text": "NPC dialogue text",
      "speaker": "NPC Name",
      "choices": [
        {
          "text": "Player response",
          "next": "node_2",
          "condition": "has_item_datapad",
          "effect": {
            "faction": {"Caldari": 1},
            "flags": {"helped_npc": true}
          }
        }
      ]
    }
  }
}
```

**Condition System**:
- `has_<item>`: Check inventory for item
- `flag_<name>`: Check if story flag is set
- Extensible: Add more condition types as needed

**Effect System**:
- Modify faction standings
- Set story flags
- Add/remove inventory items
- Trigger game events

**Processing Flow**:
```
Load Dialogue Tree
    ↓
Display Current Node
    ↓
Filter Choices (by conditions)
    ↓
Player Selects Choice
    ↓
Apply Effects
    ↓
Advance to Next Node
    ↓
Repeat or End
```

### World Module (`world/`)

#### map_data.py
**Purpose**: Loads and manages game maps, collision, and world objects.

**Map Structure**:
```json
{
  "name": "Station Interior",
  "width": 50,
  "height": 50,
  "tile_size": 32,
  "layers": [...],
  "collisions": [[x, y], ...],
  "npcs": [
    {
      "id": "merchant_1",
      "name": "Station Merchant",
      "position": [10, 15],
      "dialogue": "path/to/dialogue.json"
    }
  ],
  "interactables": [
    {
      "id": "terminal_1",
      "type": "terminal",
      "position": [5, 5],
      "action": "open_market"
    }
  ],
  "events": [
    {
      "trigger": "enter_zone",
      "zone": [[x1, y1], [x2, y2]],
      "condition": "flag_quest_active",
      "action": "start_encounter"
    }
  ]
}
```

**Collision Detection**:
1. Grid-based: Check collision mask array
2. Rect-based: Check against collision rectangles
3. Efficient O(1) lookup for grid positions

## Data Flow

### Player Interaction Flow
```
┌──────────────┐
│ User Input   │
└──────┬───────┘
       │
       v
┌──────────────┐
│ Event System │ (Pygame events)
└──────┬───────┘
       │
       v
┌────────────────────┐
│ GameStateManager   │
│ .handle_event()    │
└──────┬─────────────┘
       │
       v
┌────────────────────┐
│ Current GameState  │
│ .handle_event()    │
└──────┬─────────────┘
       │
       ├─────────────────┬─────────────────┐
       v                 v                 v
┌──────────┐      ┌──────────┐     ┌──────────┐
│  Quest   │      │ Dialogue │     │   Map    │
│ Manager  │      │  Engine  │     │  Data    │
└──────┬───┘      └─────┬────┘     └────┬─────┘
       │                │               │
       └────────────────┼───────────────┘
                        │
                        v
                 ┌──────────────┐
                 │  Game State  │
                 │   Updated    │
                 └──────────────┘
```

### Update Loop Flow
```
┌──────────────┐
│ Main Loop    │
└──────┬───────┘
       │
       v
┌──────────────────┐
│ Calculate Delta  │ (time since last frame)
└──────┬───────────┘
       │
       v
┌────────────────────┐
│ GameStateManager   │
│ .update(dt)        │
└──────┬─────────────┘
       │
       v
┌────────────────────┐
│ Current GameState  │
│ .update(dt)        │
└──────┬─────────────┘
       │
       v
┌────────────────────┐
│ Update animations, │
│ AI, physics, etc.  │
└────────────────────┘
```

### Render Flow
```
┌──────────────┐
│ Main Loop    │
└──────┬───────┘
       │
       v
┌────────────────────┐
│ GameStateManager   │
│ .draw(screen)      │
└──────┬─────────────┘
       │
       v
┌────────────────────┐
│ Current GameState  │
│ .draw(screen)      │
└──────┬─────────────┘
       │
       v
┌────────────────────┐
│ Render to screen:  │
│ - Background       │
│ - Tiles            │
│ - Entities         │
│ - UI               │
└──────┬─────────────┘
       │
       v
┌────────────────────┐
│ pygame.display     │
│ .flip()            │
└────────────────────┘
```

## Design Patterns

### 1. State Pattern (GameStateManager)
**Intent**: Allow game to change behavior based on current state.

**Benefits**:
- Clean separation of game scenes
- Easy state transitions
- Pausable/resumable states

**Implementation**:
```python
class GameState:
    def handle_event(self, event) -> None: pass
    def update(self, dt: float) -> None: pass
    def draw(self, screen) -> None: pass
```

### 2. Data-Driven Design
**Intent**: Separate game logic from game content.

**Benefits**:
- Easy content creation (JSON files)
- No code changes for new content
- Designer-friendly workflow

**Examples**:
- Dialogue trees (JSON)
- Map definitions (JSON)
- Quest data (JSON)

### 3. Component Pattern (Implicit)
**Intent**: Modular game systems that can be combined.

**Current Components**:
- Quest management
- Dialogue system
- Map/world data
- State management

**Future Extensions**:
- Inventory system
- Combat system
- Skill/progression system

### 4. Observer Pattern (Event System)
**Intent**: Decouple event sources from handlers.

**Implementation**: Through Pygame's event system
- Events posted to queue
- States handle relevant events
- Loose coupling between systems

## Extension Points

### Adding New Game States
1. Create class extending `GameState`
2. Implement `handle_event()`, `update()`, `draw()`
3. Use with `GameStateManager`

Example:
```python
class CombatState(GameState):
    def __init__(self, enemies, player):
        self.enemies = enemies
        self.player = player
    
    def handle_event(self, event):
        # Handle combat input
        pass
    
    def update(self, dt: float):
        # Update combat logic, AI
        pass
    
    def draw(self, screen):
        # Render combat UI
        pass
```

### Adding New Dialogue Conditions
In `dialogue_engine.py`, extend `check_condition()`:

```python
def check_condition(self, condition: str) -> bool:
    if condition.startswith("has_"):
        # existing code
    elif condition.startswith("flag_"):
        # existing code
    elif condition.startswith("faction_"):
        # NEW: check faction standing
        parts = condition.split("_", 2)
        if len(parts) >= 3:
            faction = parts[1]
            try:
                min_standing = int(parts[2])
                return self.game_state.get("factions", {}).get(faction, 0) >= min_standing
            except ValueError:
                return False
    return False
```

### Adding New Effects
In `dialogue_engine.py`, extend `apply_effect()`:

```python
def apply_effect(self, effect: Dict[str, Any]) -> None:
    # Existing faction handling
    if "faction" in effect:
        # ...
    
    # NEW: Add items to inventory
    if "add_item" in effect:
        self.game_state.setdefault("inventory", []).append(effect["add_item"])
    
    # NEW: Set quest flags
    if "quest_flag" in effect:
        quest_flag_value = effect["quest_flag"]
        if ":" in quest_flag_value:
            chronicle_id, flag_name = quest_flag_value.split(":", 1)
            # Update quest manager
        else:
            # Handle invalid format gracefully
            pass
```

### Adding New Systems
1. Create module in `systems/` directory
2. Follow existing patterns (type hints, clean interfaces)
3. Integrate with `GameState` classes as needed

Example system structure:
```python
from typing import Dict, List, Optional

class NewSystem:
    def __init__(self):
        self.data: Dict[str, Any] = {}
    
    def update(self, dt: float) -> None:
        """Called each frame."""
        pass
    
    def process_event(self, event) -> None:
        """Handle game events."""
        pass
```

## Performance Considerations

### Map Collision
- Use grid-based collision mask for O(1) lookups
- Avoid checking all collision rects every frame
- Pre-compute collision data on map load

### Dialogue System
- Cache filtered choices to avoid recomputing conditions
- Lazy load dialogue trees (only when needed)
- Unload inactive dialogue data

### State Management
- Only update/draw active state (top of stack)
- Consider caching rendered frames for paused states
- Efficient state transitions (minimal object creation)

## Future Enhancements

### Planned Features
1. **Save/Load System**: Serialize game state to JSON/pickle
2. **Combat System**: Turn-based or real-time combat mechanics
3. **Inventory Management**: Full item system with equipment
4. **Skill System**: Character progression and abilities
5. **Networking**: Multiplayer or online features

### Architecture Improvements
1. **Event Bus**: Centralized event system for better decoupling
2. **Entity Component System**: More flexible entity management
3. **Resource Manager**: Centralized asset loading and caching
4. **Audio System**: Background music and sound effects

## Conclusion

EVE Chronicle RPG is built on a solid, extensible foundation that demonstrates modern game development practices. The modular architecture makes it easy to add new features, modify existing systems, and maintain code quality as the project grows.

For questions or contributions, see [CONTRIBUTING.md](../CONTRIBUTING.md).
