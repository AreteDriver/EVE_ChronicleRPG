# EVE Chronicle RPG

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Python](https://img.shields.io/badge/python-3.10+-blue.svg)
![Pygame](https://img.shields.io/badge/pygame-2.5.0+-green.svg)

**EVE Chronicle RPG** is a narrative-driven role-playing game set in the EVE Online universe. Experience the rich lore and storytelling of New Eden through an immersive RPG framework featuring dynamic dialogue systems, quest management, and real-time processing elements.

## 📖 Overview

EVE Chronicle RPG brings the vast narratives of the EVE Online universe to life in a classic RPG format. Players navigate through chronicles (story arcs) set in the dystopian sci-fi world of New Eden, making meaningful choices that affect faction relationships, story progression, and character development.

### Key Highlights
- **EVE Universe Lore**: Dive deep into the rich narratives of the four major empires (Caldari, Gallente, Amarr, Minmatar) and various corporations
- **Choice-Driven Narrative**: Every decision matters - dialogue choices affect faction standings and story outcomes
- **Modular Architecture**: Built with clean, extensible code showcasing modern game development patterns
- **Real-Time Processing**: Dynamic state management and event-driven gameplay mechanics

## ✨ Features

### Gameplay Mechanics

#### Story Progression System
- **Chronicle-Based Quests**: Progress through interconnected story arcs called "Chronicles"
- **Stage Tracking**: Each chronicle consists of multiple stages with unique objectives
- **Completion Flags**: Track player achievements and unlock new content based on progress
- **Dynamic Branching**: Story paths change based on player decisions

#### Interactive Dialogue System
- **Branching Conversations**: Complex dialogue trees with multiple choice outcomes
- **Conditional Responses**: Dialogue options that appear based on inventory, flags, or faction standings
- **Effect System**: Choices can modify game state, add items, change faction reputation, or set story flags
- **Context-Aware NPCs**: NPC interactions that remember previous choices and player actions

#### Game State Management
- **Stack-Based Scene System**: Seamless transitions between menus, maps, and dialogue screens
- **Event-Driven Architecture**: Responsive game loop with proper event handling
- **Persistent State**: Save/load capability for player progress and game world state

#### World & Map System
- **Tile-Based Maps**: Efficient grid-based world representation
- **Collision Detection**: Precise collision handling for player movement
- **Interactive Objects**: NPCs, items, and environmental triggers
- **Event Zones**: Location-based triggers for story events and encounters

### Technical Features
- **Type-Safe Code**: Full type hint coverage for better code quality and IDE support
- **Modular Design**: Separated concerns with core, systems, and world modules
- **JSON-Based Data**: Easy-to-edit dialogue trees, maps, and quest definitions
- **Extensible Framework**: Clean interfaces for adding new game systems

## 🚀 Installation

### Prerequisites
- Python 3.10 or higher
- pip (Python package manager)

### Setup Instructions

#### Windows
```bash
# Clone the repository
git clone https://github.com/AreteDriver/EVE_ChronicleRPG.git
cd EVE_ChronicleRPG

# Create virtual environment
python -m venv venv
venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt
```

#### macOS / Linux
```bash
# Clone the repository
git clone https://github.com/AreteDriver/EVE_ChronicleRPG.git
cd EVE_ChronicleRPG

# Create virtual environment
python3 -m venv venv
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt
```

### Running the Game
```bash
# Activate virtual environment first (if not already active)
# Windows: venv\Scripts\activate
# macOS/Linux: source venv/bin/activate

# Run the game (when main.py is added)
python main.py
```

## 📚 How to Play

### Game Concepts

#### Chronicles
Chronicles are the main story arcs in EVE Chronicle RPG. Each chronicle represents a significant storyline within the EVE universe, featuring:
- Multiple stages of progression
- Unique characters and locations
- Faction-specific narratives
- Moral choices and consequences

#### Faction System
Your actions affect your standing with the major factions:
- **Caldari State**: Meritocratic corporate society
- **Gallente Federation**: Democratic and freedom-loving
- **Amarr Empire**: Religious and traditional
- **Minmatar Republic**: Freedom fighters and survivors

### Controls
*(To be updated when game UI is implemented)*
- **Arrow Keys / WASD**: Movement
- **E / Enter**: Interact with objects/NPCs
- **ESC**: Open menu
- **Mouse**: Navigate UI elements

### Progression
1. Start a chronicle from the main menu
2. Explore the world and interact with NPCs
3. Engage in dialogue and make choices
4. Complete objectives to advance the story
5. Unlock new chronicles and content

## 💻 Examples

### Quest Management
```python
from systems.quest_manager import QuestManager

# Initialize quest manager
quest_mgr = QuestManager()

# Start a new chronicle
quest_mgr.start_chronicle("caldari_origins", "introduction")

# Check progress
progress = quest_mgr.get_progress("caldari_origins")
print(f"Current stage: {progress.current_stage}")

# Advance to next stage
quest_mgr.advance_stage("caldari_origins", "meet_contact")

# Set story flags
quest_mgr.set_flag("caldari_origins", "helped_refugee", True)

# Complete the chronicle
quest_mgr.complete_chronicle("caldari_origins")
```

### Dialogue System
```python
from systems.dialogue_engine import DialogueTree

# Initialize game state
game_state = {
    "inventory": ["datapad", "credentials"],
    "flags": {"met_agent": True},
    "factions": {"Caldari": 5, "Gallente": -2}
}

# Load dialogue tree
dialogue = DialogueTree("path/to/dialogue.json", game_state)

# Get current dialogue options
node = dialogue.current_node()
print(f"NPC: {node['text']}")

# Display available choices (filtered by conditions)
choices = dialogue.choices()
for i, choice in enumerate(choices):
    print(f"{i+1}. {choice['text']}")

# Player selects option 0
dialogue.advance(0)  # Applies effects and moves to next node
```

### State Management
```python
from core.state_manager import GameStateManager, GameState

class MainMenuState(GameState):
    def handle_event(self, event):
        # Handle menu input
        pass
    
    def update(self, dt: float):
        # Update menu animations
        pass
    
    def draw(self, screen):
        # Render menu
        pass

# Use the state manager
manager = GameStateManager()
manager.push(MainMenuState())

# Game loop integration
while running:
    for event in pygame.event.get():
        manager.handle_event(event)
    
    manager.update(delta_time)
    manager.draw(screen)
```

### Map Data Loading
```python
from world.maps.map_data import MapData

# Load a map
map_data = MapData("path/to/map.json")

# Check collision
player_pos = (5, 10)
if map_data.is_blocked(player_pos):
    print("Can't move there!")

# Get NPCs on the map
for npc in map_data.npcs:
    print(f"NPC: {npc['name']} at {npc['position']}")

# Process interactable objects
for obj in map_data.interactables:
    if obj['type'] == 'terminal':
        print(f"Found terminal: {obj['id']}")
```

## 🏗️ Architecture

### Project Structure
```
EVE_ChronicleRPG/
├── core/                   # Core game engine components
│   └── state_manager.py   # State/scene management system
├── systems/               # Game systems and mechanics
│   ├── dialogue_engine.py # Dialogue tree system with conditions/effects
│   └── quest_manager.py   # Chronicle and quest progression tracking
├── world/                 # World and environment
│   └── maps/
│       └── map_data.py    # Map loading and collision detection
├── assets/                # Game assets (to be added)
│   ├── dialogues/        # JSON dialogue trees
│   ├── maps/             # JSON map definitions
│   └── images/           # Sprites and graphics
├── requirements.txt       # Python dependencies
├── LICENSE               # MIT License
└── README.md            # This file
```

### Module Overview

#### Core Module
- **state_manager.py**: Implements stack-based state management for game scenes
  - `GameState`: Base class for all game states (menus, gameplay, dialogues)
  - `GameStateManager`: Manages state transitions and game loop delegation

#### Systems Module
- **quest_manager.py**: Handles story progression
  - `ChronicleProgress`: Data class for tracking quest state
  - `QuestManager`: Manages multiple concurrent chronicles and player progress
  
- **dialogue_engine.py**: Powers NPC interactions
  - `DialogueTree`: Loads and manages branching conversations
  - Supports conditional dialogue options based on game state
  - Applies effects to modify faction standings, inventory, and flags

#### World Module
- **map_data.py**: Manages game world representation
  - `MapData`: Loads maps from JSON with collision, NPCs, and events
  - Tile-based grid system with efficient collision detection
  - Support for layered rendering and interactive objects

### Game Flow Diagram
```
┌─────────────────┐
│   Game Start    │
└────────┬────────┘
         │
         v
┌─────────────────┐
│   Main Menu     │◄──────────┐
└────────┬────────┘           │
         │                    │
         v                    │
┌─────────────────┐           │
│ Chronicle Select│           │
└────────┬────────┘           │
         │                    │
         v                    │
┌─────────────────┐           │
│   Game World    │           │
│  (Map Explore)  │           │
└────────┬────────┘           │
         │                    │
    ┌────┴────┐              │
    │         │              │
    v         v              │
┌────────┐  ┌────────┐       │
│ Combat │  │ Dialog │       │
└────┬───┘  └───┬────┘       │
     │          │            │
     │      ┌───v────┐       │
     │      │Choices │       │
     │      └───┬────┘       │
     │          │            │
     │      ┌───v────┐       │
     │      │Effects │       │
     │      └───┬────┘       │
     │          │            │
     └────┬─────┘            │
          │                  │
          v                  │
    ┌──────────┐             │
    │  Quest   │             │
    │ Complete?│─────No──────┘
    └────┬─────┘
         │
        Yes
         │
         v
    ┌──────────┐
    │Chronicle │
    │ Complete │
    └──────────┘
```

### System Interaction Diagram
```
┌──────────────────────────────────────────────────┐
│              Game State Manager                  │
│  (Handles scene transitions and game loop)       │
└───────────┬──────────────────────────────────────┘
            │
            │ manages states
            │
    ┌───────┴──────┬──────────┬──────────────┐
    │              │          │              │
    v              v          v              v
┌────────┐   ┌─────────┐  ┌──────┐   ┌──────────┐
│  Menu  │   │ World   │  │Dialog│   │Quest Log │
│ State  │   │  State  │  │State │   │  State   │
└────────┘   └────┬────┘  └──┬───┘   └──────────┘
                  │          │
                  │          │
          ┌───────┴──────────┴────────┐
          │                           │
          v                           v
    ┌──────────┐              ┌──────────────┐
    │  Quest   │◄────────────►│  Dialogue    │
    │ Manager  │  updates     │   Engine     │
    └─────┬────┘   flags      └──────┬───────┘
          │                           │
          │                           │
          └───────────┬───────────────┘
                      │
                      │ modifies
                      v
              ┌──────────────┐
              │  Game State  │
              │  (inventory, │
              │   flags,     │
              │  factions)   │
              └──────────────┘
```

## 🤝 Contributing

We welcome contributions from the community! Whether you're fixing bugs, adding features, or improving documentation, your help is appreciated.

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for:
- Code of conduct
- Development setup
- Coding standards
- Pull request process

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by the rich lore and universe of EVE Online
- Built with Pygame for cross-platform game development
- Community contributors and testers

## 🔗 Resources

- **EVE Online Universe**: https://universe.eveonline.com/
- **Pygame Documentation**: https://www.pygame.org/docs/
- **Project Issues**: https://github.com/AreteDriver/EVE_ChronicleRPG/issues

---

*EVE Chronicle RPG is a fan project and is not affiliated with or endorsed by CCP Games.*