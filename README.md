# EVE Chronicle RPG

🎮 **[Play in Browser](https://AreteDriver.github.io/EVE_ChronicleRPG/)** | 📖 [Documentation](#documentation) | 🚀 [Getting Started](#getting-started)

A flexible RPG framework inspired by EVE Online's rich narrative universe. Build your own space-themed adventures with branching dialogues, quest systems, and faction mechanics.

## ✨ Features

- **🗣️ Dialogue System** - JSON-driven branching conversations with conditions and effects
- **📜 Quest Management** - Track player progress through chronicles and missions
- **⚖️ Faction Reputation** - Dynamic standing system with multiple factions
- **🎭 State Management** - Stack-based state machine for game scenes and menus
- **🗺️ Map System** - Support for tile-based maps with NPCs, events, and collision detection
- **🌐 Browser Playable** - Web version available via GitHub Pages (no installation required!)

## 🎮 Play Now

### Browser Version
Visit **[https://AreteDriver.github.io/EVE_ChronicleRPG/](https://AreteDriver.github.io/EVE_ChronicleRPG/)** to play the demo directly in your browser!

- No installation required
- Runs on any modern browser with WebAssembly support
- First load may take 10-30 seconds

### Local Installation

```bash
# Clone the repository
git clone https://github.com/AreteDriver/EVE_ChronicleRPG.git
cd EVE_ChronicleRPG

# Install dependencies
pip install -r requirements.txt

# Run the game
python main.py
```

## 🎯 Controls

| Key | Action |
|-----|--------|
| ↑ / ↓ | Navigate menus and dialogue options |
| ENTER / SPACE | Confirm selection / Advance dialogue |
| Any Key | Continue from instructions |

## 📚 Documentation

### Framework Components

#### 1. State Manager (`core/state_manager.py`)
Stack-based state management for different game scenes:
```python
from core.state_manager import GameState, GameStateManager

# Create custom game states
class MyGameState(GameState):
    def handle_event(self, event): pass
    def update(self, dt): pass
    def draw(self, screen): pass

# Use the state manager
manager = GameStateManager()
manager.push(MyGameState())
```

#### 2. Dialogue Engine (`systems/dialogue_engine.py`)
JSON-driven dialogue system with branching paths:
```python
from systems.dialogue_engine import DialogueTree

# Load dialogue from JSON
game_state = {"inventory": [], "flags": {}, "factions": {}}
dialogue = DialogueTree("path/to/dialogue.json", game_state)

# Navigate dialogue
choices = dialogue.choices()
dialogue.advance(choice_index)
```

#### 3. Quest Manager (`systems/quest_manager.py`)
Track player progress through chronicles:
```python
from systems.quest_manager import QuestManager

manager = QuestManager()
manager.start_chronicle("chronicle_id", "start_stage")
manager.advance_stage("chronicle_id", "next_stage")
manager.set_flag("chronicle_id", "flag_name", True)
```

#### 4. Map System (`world/maps/map_data.py`)
Load and manage tile-based maps:
```python
from world.maps.map_data import MapData

map_data = MapData("path/to/map.json")
is_blocked = map_data.is_blocked((x, y))
```

### Creating Custom Dialogues

Create a JSON file with dialogue nodes:

```json
{
  "start": "greeting",
  "nodes": {
    "greeting": {
      "text": "Welcome, capsuleer!",
      "choices": [
        {
          "text": "Tell me about your faction.",
          "next": "faction_info",
          "condition": null
        },
        {
          "text": "I have this data chip for you.",
          "next": "give_item",
          "condition": "has_data_chip",
          "effect": {"faction": {"Caldari": 5}}
        }
      ]
    },
    "faction_info": {
      "text": "We are proud members of the Caldari State...",
      "choices": [...]
    }
  }
}
```

**Supported Conditions:**
- `has_<item>` - Check if player has item in inventory
- `flag_<name>` - Check if game flag is set

**Supported Effects:**
- `{"faction": {"FactionName": delta}}` - Modify faction standing

## 🚀 Getting Started

### For Players

1. **Browser**: Visit the [GitHub Pages demo](https://AreteDriver.github.io/EVE_ChronicleRPG/)
2. **Local**: Clone the repo and run `python main.py`
3. Follow the in-game instructions
4. Experiment with different dialogue choices
5. Try to balance or maximize faction standings

### For Developers

1. **Fork the repository**
2. **Study the framework components** in `core/` and `systems/`
3. **Create custom content**:
   - Write dialogue JSON files
   - Design map data structures
   - Implement new game states
4. **Extend the framework**:
   - Add combat systems
   - Implement trading mechanics
   - Create character progression
   - Design skill trees
5. **Test locally** with `python main.py`
6. **Deploy to GitHub Pages** via the included workflow

## 🎨 Fun Experimentation Ideas

### For Players
- **Faction Diplomat**: Maintain neutral standing with all factions
- **Faction Loyalist**: Maximize one faction, minimize others
- **Speed Runner**: Complete dialogues as fast as possible
- **Completionist**: Explore every dialogue branch

### For Developers
- Create a complete story arc with multiple chapters
- Design a faction war system with consequences
- Implement a trading/economy minigame
- Add combat mechanics with skills and equipment
- Create procedurally generated missions
- Build a character creation system
- Design a star map for sector navigation

## 🔧 Technical Details

### Technologies
- **Python 3.11+** - Core programming language
- **Pygame 2.5+** - Game framework
- **Pygbag** - WebAssembly compiler for browser deployment
- **GitHub Pages** - Free web hosting
- **GitHub Actions** - Automated build and deployment

### Project Structure
```
EVE_ChronicleRPG/
├── main.py                    # Main game entry point
├── core/
│   └── state_manager.py       # State management system
├── systems/
│   ├── dialogue_engine.py     # Dialogue system
│   └── quest_manager.py       # Quest tracking
├── world/
│   └── maps/
│       └── map_data.py        # Map data structures
├── docs/
│   └── index.html            # GitHub Pages site
├── .github/
│   └── workflows/
│       └── deploy.yml        # Auto-deployment workflow
├── requirements.txt          # Python dependencies
└── README.md                # This file
```

### Browser Compatibility
The web version requires a modern browser with WebAssembly support:
- Chrome/Edge 57+
- Firefox 52+
- Safari 11+
- Opera 44+

## 🤝 Contributing

Contributions are welcome! Ideas for contributions:
- Additional dialogue examples
- Map templates and assets
- New game mechanics
- Documentation improvements
- Bug fixes and optimizations

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

## ⚠️ Disclaimer

This is a fan project not affiliated with CCP Games. EVE Online™ is a trademark of CCP hf.

## 🙏 Acknowledgments

- Inspired by the rich narrative universe of EVE Online
- Built with Pygame and deployed with Pygbag
- Hosted on GitHub Pages

---

**Ready to begin your journey through New Eden?** [Start Playing Now](https://AreteDriver.github.io/EVE_ChronicleRPG/) 🚀