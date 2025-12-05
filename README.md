# EVE Chronicle RPG

A top-down RPG built inside the EVE Online universe, anchored in lore, and capable of running mini-campaigns based on EVE Chronicles.

## Overview

EVE Chronicle RPG is a browser-based, top-down role-playing game set in the rich universe of EVE Online. Players take on the role of a capsuleer, choosing from the four major factions (Caldari, Gallente, Minmatar, or Amarr) and embarking on chronicle-based campaigns that explore the deep lore of New Eden.

## Features

### Core Gameplay
- **Top-Down Exploration**: Navigate space stations and sectors in classic top-down RPG style
- **Faction System**: Choose from four EVE factions, each with unique bonuses and playstyles
- **Combat System**: Engage hostile NPCs with shield, armor, and hull mechanics true to EVE
- **Dialogue System**: Interact with NPCs through branching dialogue trees
- **Quest System**: Complete objectives as part of chronicle-based campaigns

### EVE Universe Integration
- **Authentic Lore**: Based on official EVE Online chronicles and fiction
- **Faction Mechanics**: Each faction has unique characteristics:
  - **Caldari State**: Shield bonuses, corporate efficiency
  - **Gallente Federation**: Armor bonuses, democracy and freedom
  - **Minmatar Republic**: Speed bonuses, tribal honor
  - **Amarr Empire**: Energy bonuses, theocratic power
- **EVE-Themed Items**: Minerals, datacores, nanite paste, and more
- **Ship Classes**: From corvettes to destroyers

### Campaign System
- **Chronicle-Based Missions**: Experience stories from EVE's rich history
- **Multiple Campaigns**: 
  - "The Rogue Drone Menace" - Investigate autonomous drones
  - "The Broker's Deal" - Navigate the information underground
  - "Echoes of the Empyrean Age" - Uncover wartime secrets
- **Progression System**: Level up, gain skills, and complete objectives
- **Dynamic NPCs**: Quest givers, merchants, hostile drones, and pirates

## Getting Started

### Running the Game

1. Clone this repository
2. Open `index.html` in a modern web browser
3. Click "Start Campaign"
4. Choose your faction
5. Begin your journey through New Eden!

No build process or dependencies required - it's pure HTML5, CSS3, and JavaScript.

### Controls

- **WASD** or **Arrow Keys**: Move your character
- **E**: Interact with NPCs and objects
- **Space**: Attack nearby enemies
- **I**: Open/close inventory

## Game Systems

### Character Progression
- Gain experience by completing quests and defeating enemies
- Level up to increase stats (hull, shield, energy)
- Unlock and improve skills (gunnery, navigation, engineering, etc.)
- Collect items and manage inventory

### Combat
- Real-time combat with shield and armor mechanics
- Energy management for attacks and abilities
- Critical hits and damage calculations
- Tactical positioning matters

### Dialogue & Quests
- Branching dialogue with meaningful choices
- Multi-act campaign structure
- Objective tracking and quest progression
- Rewards include experience, items, and reputation

## Project Structure

```
EVE_ChronicleRPG/
├── index.html              # Main HTML file
├── css/
│   └── style.css          # All styles and animations
├── js/
│   ├── core/              # Core engine components
│   │   ├── Vector2D.js    # 2D vector mathematics
│   │   ├── InputHandler.js # Keyboard/mouse input
│   │   ├── Renderer.js    # Canvas rendering
│   │   └── AssetManager.js # Asset/resource management
│   ├── systems/           # Game systems
│   │   ├── Entity.js      # Base entity class
│   │   ├── Player.js      # Player character
│   │   ├── NPC.js         # Non-player characters
│   │   ├── Combat.js      # Combat mechanics
│   │   ├── Dialogue.js    # Dialogue system
│   │   └── Inventory.js   # Inventory management
│   ├── world/             # World and maps
│   │   ├── Tile.js        # Individual tiles
│   │   └── Map.js         # Map generation
│   ├── lore/              # EVE universe content
│   │   ├── Factions.js    # Faction data
│   │   └── Chronicles.js  # Campaign stories
│   ├── campaign/          # Campaign system
│   │   ├── Quest.js       # Quest management
│   │   └── Campaign.js    # Campaign orchestration
│   ├── GameEngine.js      # Main game engine
│   └── main.js            # Entry point
└── README.md              # This file
```

## Technical Details

### Architecture
- **Modular Design**: Each system is self-contained and loosely coupled
- **Entity-Component Pattern**: Entities have properties and behaviors
- **Event-Driven**: Input and interactions trigger callbacks
- **Canvas Rendering**: HTML5 Canvas for all graphics

### Performance
- Optimized rendering with camera culling
- Efficient collision detection
- Particle system for visual effects
- 60 FPS target framerate

## Customization

### Adding New Chronicles

Edit `js/lore/Chronicles.js` to add new campaigns:

```javascript
const Chronicles = {
    your_chronicle: {
        id: 'your_chronicle',
        title: 'Your Chronicle Title',
        description: 'Brief description',
        background: 'Full background story',
        acts: [
            {
                id: 'act1',
                title: 'Act Title',
                objectives: [
                    { id: 'obj1', text: 'Objective description', completed: false }
                ]
            }
        ],
        rewards: {
            experience: 200,
            items: ['item_id']
        },
        characters: {
            // NPC definitions with dialogue
        }
    }
};
```

### Adding New Items

Edit `js/core/AssetManager.js` to add items, weapons, or modules:

```javascript
this.assets.items['new_item'] = {
    name: 'Item Name',
    description: 'Item description',
    stackable: true
};
```

## EVE Online Lore

This game is inspired by the rich universe of EVE Online:

- **New Eden**: A cluster of stars cut off from Earth millennia ago
- **Capsuleers**: Immortal pilots who transfer consciousness between clones
- **The Four Empires**: Caldari, Gallente, Minmatar, and Amarr each vie for power
- **Chronicles**: Short stories that explore the deep lore of New Eden

For more about EVE Online lore, visit the official [EVE Fiction Portal](https://fiction.eveonline.com/).

## Future Enhancements

Potential additions:
- Save/load game functionality
- More chronicles and campaigns
- Ship customization and fitting
- Trade and economy system
- Multiplayer co-op missions
- Procedurally generated missions
- Sound effects and music
- Additional factions and NPCs

## Credits

- **EVE Online Universe**: Created by CCP Games
- **Chronicles**: Inspired by official EVE Online fiction
- **Game Development**: Built with HTML5 Canvas and vanilla JavaScript

## License

This is a fan project based on the EVE Online universe. EVE Online and all associated logos and designs are the intellectual property of CCP Games. This project is not endorsed by or affiliated with CCP Games.

## Contributing

This is an open-source fan project. Contributions, suggestions, and improvements are welcome!

---

**Fly safe, capsuleer. o7**