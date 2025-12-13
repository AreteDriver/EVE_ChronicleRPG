# EVE Chronicle RPG - User Guide

Welcome to EVE Chronicle RPG! This guide will help you get started with the game and understand its mechanics.

## Table of Contents
1. [Getting Started](#getting-started)
2. [Game Concepts](#game-concepts)
3. [Controls](#controls)
4. [Gameplay Guide](#gameplay-guide)
5. [Tips & Strategies](#tips--strategies)
6. [Troubleshooting](#troubleshooting)

## Getting Started

### First Time Setup
1. Follow the installation instructions in [README.md](../README.md)
2. Ensure all dependencies are installed
3. Launch the game using `python main.py` (when available)

### Understanding the Interface
*(To be updated when UI is implemented)*

The game interface consists of:
- **Main viewport**: Shows the game world, characters, and environments
- **Dialogue window**: Displays conversations and choices
- **Status bar**: Shows character info, faction standings
- **Menu bar**: Access to inventory, quests, map, and settings

## Game Concepts

### Chronicles
Chronicles are the main storylines in EVE Chronicle RPG. Each chronicle:
- Tells a unique story within the EVE universe
- Has multiple stages of progression
- Features branching paths based on your choices
- Affects your faction relationships
- Can unlock new chronicles and content

**Types of Chronicles**:
- **Main Chronicles**: Core storylines advancing the overall narrative
- **Side Chronicles**: Optional stories providing additional lore and rewards
- **Faction Chronicles**: Stories specific to each major faction

### Factions
Your actions affect your standing with the four major factions of New Eden:

#### Caldari State
- **Philosophy**: Meritocracy, corporate efficiency, technological advancement
- **Characteristics**: Practical, disciplined, business-oriented
- **Rewards**: Advanced shield technology, corporate contracts

#### Gallente Federation
- **Philosophy**: Democracy, individual freedom, cultural diversity
- **Characteristics**: Liberal, artistic, diplomatic
- **Rewards**: Drone technology, democratic support networks

#### Amarr Empire
- **Philosophy**: Religious devotion, traditional hierarchy, expansion
- **Characteristics**: Spiritual, authoritarian, advanced energy weapons
- **Rewards**: Laser technology, religious artifacts

#### Minmatar Republic
- **Philosophy**: Freedom, resilience, independence
- **Characteristics**: Resourceful, determined, tribal unity
- **Rewards**: Projectile technology, guerrilla tactics

### Faction Standings
- Standings range from -10 (hated) to +10 (revered)
- Choices in dialogues and quests affect faction standings
- High standings unlock faction-specific content
- Low standings may close off certain options
- Some factions are naturally opposed (helping one may hurt another)

### Game State & Flags
The game tracks various flags and states:
- **Story Flags**: Track major decisions and progress
- **Inventory**: Items you've collected
- **Quest Flags**: Chronicle-specific progress markers
- **Reputation**: How NPCs view you based on past actions

## Controls

### Keyboard Controls
*(Default controls - may be customizable)*

**Movement**:
- `Arrow Keys` or `W/A/S/D`: Move character
- `Shift + Movement`: Run/Sprint

**Interaction**:
- `E` or `Enter`: Interact with objects/NPCs
- `Space`: Continue dialogue
- `ESC`: Cancel/Back

**Menus**:
- `I`: Inventory
- `Q`: Quest log
- `M`: Map
- `C`: Character sheet
- `ESC`: Main menu

**Combat** (if applicable):
- `1-9`: Use abilities/items
- `Tab`: Cycle targets
- `Space`: Confirm action

### Mouse Controls
- `Left Click`: Select options, interact
- `Right Click`: Context menu, alternative actions
- `Mouse Wheel`: Scroll through text/menus

## Gameplay Guide

### Starting a Chronicle

1. From the main menu, select "Chronicles"
2. Choose an available chronicle (some require prerequisites)
3. Read the chronicle introduction
4. Accept to begin

### Navigating the World

1. Use movement keys to explore
2. Approach NPCs or objects to see interaction prompts
3. Press `E` to interact
4. Follow waypoints to reach quest objectives

### Engaging in Dialogue

1. When speaking with NPCs, read the dialogue text
2. Available response options are listed below
3. Some options may be grayed out (requirements not met)
4. Hover over options to see potential effects
5. Select your choice using number keys or mouse
6. Your choice may affect faction standings, unlock items, or change the story

**Dialogue Choice Indicators**:
- `[Caldari]`: Favors Caldari faction
- `[Aggressive]`: May lead to combat
- `[Technical]`: Requires technical knowledge or items
- `[Locked]`: Requirements not met (hover for details)

### Managing Quests

**Quest Log** (`Q` key):
- View active chronicles and current objectives
- Track progress through chronicle stages
- See quest rewards and descriptions
- Abandoned or failed quests

**Completing Objectives**:
1. Read objective description in quest log
2. Navigate to the objective location (check map)
3. Complete required actions (talk to NPC, find item, etc.)
4. Objective updates automatically
5. Return to quest giver or proceed to next stage

### Inventory Management

**Accessing Inventory** (`I` key):
- View all items in your possession
- Examine item details and descriptions
- Use, equip, or discard items
- Organize items by type or value

**Item Types**:
- **Quest Items**: Required for specific quests, cannot be discarded
- **Datapads**: Contain lore, logs, or information
- **Consumables**: Single-use items providing temporary effects
- **Equipment**: Weapons, armor, or tools you can equip

### Progression System

**Chronicle Progression**:
1. Complete objectives to advance chronicle stages
2. Each stage may have multiple solutions
3. Some stages branch based on previous choices
4. Chronicles end with a conclusion based on your decisions

**Character Development** (if implemented):
- Gain experience through quest completion
- Unlock new abilities or dialogue options
- Improve skills related to your playstyle
- Reputation grows with successful quest completion

## Tips & Strategies

### Making Choices

**Consider Long-Term Consequences**:
- A choice benefiting one faction may harm another
- Some decisions lock you out of certain content
- NPCs remember your past choices
- There's no single "right" path - role-play your character

**Save Before Important Decisions** (when save system is implemented):
- Major story branches should be saved before
- Experiment with different choices if desired
- Some choices are irreversible

### Faction Management

**Balanced Approach**:
- Try to maintain neutral or positive standings with most factions
- Focus on one or two "main" factions for benefits
- Be aware that some quests require choosing sides

**Roleplay Approach**:
- Commit to a faction and make aligned choices
- Accept that some content may be locked out
- Enjoy faction-specific storylines and rewards

### Exploration

**Talk to Everyone**:
- NPCs may offer side quests or valuable information
- Some dialogues unlock based on your progress
- Return to NPCs as the story progresses

**Examine Everything**:
- Interact with terminals, datapads, and objects
- Lore and backstory are hidden in the environment
- Some items trigger optional content

### Quest Strategies

**Read Carefully**:
- Quest descriptions often hint at solutions
- NPC dialogue may contain clues
- Pay attention to character names and locations

**Check Requirements**:
- Some quests need specific items or faction standings
- Prepare before starting challenging chronicles
- Return later if you can't complete a quest now

**Multiple Solutions**:
- Many quests have different approaches
- Try diplomatic, technical, or aggressive solutions
- Your choices affect the outcome and rewards

## Troubleshooting

### Common Issues

**Game Won't Start**:
- Check that Python 3.10+ is installed
- Verify all dependencies: `pip install -r requirements.txt`
- Ensure you're in the correct directory
- Check for error messages in the console

**Performance Issues**:
- Close other applications to free resources
- Update graphics drivers
- Lower game settings (if available)
- Ensure your system meets minimum requirements

**Dialogue Options Not Appearing**:
- Check that you meet the requirements (hover over locked options)
- Progress further in the related chronicle
- Improve faction standing if needed
- Ensure you have required items

**Quest Not Progressing**:
- Re-read the objective carefully
- Check quest log for updated information
- Ensure you're in the correct location
- Try interacting with quest-related NPCs again
- Check if there's a prerequisite you missed

**Save/Load Issues** (when implemented):
- Ensure save directory has write permissions
- Don't modify save files manually
- Keep backup saves of important progress
- Report corruption bugs to developers

### Getting Help

**In-Game Resources**:
- Tutorial chronicle (recommended for new players)
- Help section in main menu
- NPC hints and dialogue

**Community Resources**:
- GitHub Issues: Report bugs or ask questions
- Project Wiki: Community-maintained guides
- Contributing: See [CONTRIBUTING.md](../CONTRIBUTING.md)

### Reporting Bugs

When reporting bugs, please include:
1. Description of the issue
2. Steps to reproduce
3. Expected vs. actual behavior
4. System information (OS, Python version)
5. Screenshots or error messages if applicable

Submit bug reports on the GitHub Issues page.

## Advanced Topics

### Understanding Game Data Files

**Dialogue Files** (`assets/dialogues/*.json`):
- JSON format defining NPC conversations
- Can be edited to create custom dialogues
- See existing files for structure examples

**Map Files** (`assets/maps/*.json`):
- Define world layout, collisions, NPCs
- Can be extended with custom maps
- Tile-based grid system

**Modding** (if supported):
- Create custom chronicles
- Add new NPCs and dialogues
- Design new maps and locations
- Share creations with the community

### Speedrunning

For players interested in speedrunning:
- Learn optimal dialogue paths
- Memorize faction-optimal choices
- Plan quest order for efficiency
- Track completion times
- Share strategies with the community

### Completionist Guide

**100% Completion Checklist**:
- Complete all main chronicles
- Complete all side chronicles
- Reach maximum standing with at least one faction
- Collect all unique items and datapads
- Discover all map locations
- Read all lore entries

## Conclusion

EVE Chronicle RPG offers a rich narrative experience in the EVE universe. Take your time, explore the stories, and make choices that reflect your vision of your character. Every playthrough can be different based on your decisions.

Enjoy your journey through New Eden!

---

For technical documentation, see [ARCHITECTURE.md](ARCHITECTURE.md).

For installation and setup, see [README.md](../README.md).
