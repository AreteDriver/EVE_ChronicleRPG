# Contributing to EVE Chronicle RPG

Thank you for your interest in contributing to the EVE Chronicle RPG framework! This document provides guidelines and ideas for contributions.

## 🎯 Ways to Contribute

### 1. Code Contributions
- Bug fixes
- New features
- Performance improvements
- Code refactoring
- Type hint improvements

### 2. Content Contributions
- Example dialogues
- Sample maps
- NPC templates
- Quest/chronicle templates
- Story arcs

### 3. Documentation
- Tutorial improvements
- API documentation
- Example code
- Best practices guides
- Video tutorials

### 4. Testing
- Bug reports
- Feature testing
- Cross-browser testing
- Performance testing

## 🚀 Getting Started

### Prerequisites
- Python 3.11 or higher
- Git
- Basic understanding of Pygame
- (Optional) Pygbag for web deployment

### Setting Up Development Environment

```bash
# Fork the repository on GitHub

# Clone your fork
git clone https://github.com/YOUR-USERNAME/EVE_ChronicleRPG.git
cd EVE_ChronicleRPG

# Create a virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Install development dependencies (optional)
pip install pygbag  # For web deployment testing

# Run the demo
python main.py
```

## 📝 Development Workflow

### 1. Create a Branch

```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/bug-description
```

### 2. Make Your Changes

Follow the coding style:
- Use type hints for function parameters and returns
- Follow PEP 8 style guidelines
- Keep functions focused and small
- Add docstrings to classes and public methods
- Use meaningful variable names

Example:
```python
def calculate_faction_standing(
    current_standing: int, 
    change: int, 
    max_standing: int = 100
) -> int:
    """
    Calculate new faction standing with bounds checking.
    
    Args:
        current_standing: Current reputation value
        change: Amount to modify standing by
        max_standing: Maximum allowed standing value
        
    Returns:
        New standing value, clamped to valid range
    """
    new_standing = current_standing + change
    return max(-100, min(new_standing, max_standing))
```

### 3. Test Your Changes

```bash
# Run the game locally
python main.py

# Test imports
python -c "
from core.state_manager import GameStateManager
from systems.dialogue_engine import DialogueTree
from systems.quest_manager import QuestManager
print('All imports successful')
"

# Test Pygbag build (optional)
pygbag main.py
# Visit http://localhost:8000
```

### 4. Commit Your Changes

```bash
git add .
git commit -m "Brief description of changes

Detailed explanation of what changed and why.
Fixes #issue_number (if applicable)"
```

### 5. Push and Create Pull Request

```bash
git push origin feature/your-feature-name
```

Then create a Pull Request on GitHub with:
- Clear title describing the change
- Description of what changed and why
- Any relevant issue numbers
- Screenshots/GIFs for UI changes

## 🎨 Contribution Ideas

### Easy (Good First Issues)
- [ ] Add more example dialogue files
- [ ] Create additional map templates
- [ ] Improve error messages
- [ ] Add more keyboard shortcuts
- [ ] Create gameplay screenshots
- [ ] Write beginner tutorials

### Medium
- [ ] Implement save/load system
- [ ] Add combat mechanics
- [ ] Create inventory system
- [ ] Implement character stats
- [ ] Add sound effects support
- [ ] Create map editor
- [ ] Add more faction interactions

### Advanced
- [ ] Implement multiplayer support
- [ ] Add procedural content generation
- [ ] Create visual dialogue editor
- [ ] Implement AI-driven NPCs
- [ ] Add modding support
- [ ] Optimize rendering performance
- [ ] Create mobile-friendly version

## 🎮 Adding New Game Features

### Adding a New Game State

1. Create a new class inheriting from `GameState`:

```python
from core.state_manager import GameState

class CombatState(GameState):
    def __init__(self):
        self.player_hp = 100
        self.enemy_hp = 50
    
    def handle_event(self, event):
        # Handle user input
        pass
    
    def update(self, dt: float):
        # Update game logic
        pass
    
    def draw(self, screen):
        # Render the state
        pass
```

2. Integrate it in `main.py` or your game flow

### Adding Dialogue Features

1. Extend the condition checking in `dialogue_engine.py`:

```python
def check_condition(self, condition: str) -> bool:
    # Existing conditions...
    
    # Add new condition type
    if condition.startswith("level_"):
        required_level = int(condition[6:])
        return self.game_state.get("level", 0) >= required_level
    
    return False
```

2. Add effect handlers:

```python
def apply_effect(self, effect: Dict[str, Any]) -> None:
    # Existing effects...
    
    # Add new effect type
    if "add_item" in effect:
        item = effect["add_item"]
        self.game_state.setdefault("inventory", []).append(item)
```

### Creating New Map Features

1. Add new interactable types in your game logic
2. Update the map JSON schema documentation
3. Implement handlers in `MapData` or game state

## 📚 Content Creation Guidelines

### Writing Dialogues

**Good dialogue example:**
```json
{
  "text": "Captain! Hostile ships detected on scanners. They're demanding our cargo.",
  "choices": [
    {
      "text": "Prepare for combat. We don't negotiate with pirates.",
      "next": "combat_initiate",
      "effect": {"faction": {"Pirates": -5}}
    },
    {
      "text": "Offer them half our cargo to avoid bloodshed.",
      "next": "negotiation",
      "condition": "has_cargo"
    },
    {
      "text": "Flee at maximum warp speed!",
      "next": "escape_attempt"
    }
  ]
}
```

**Best practices:**
- Make choices meaningful with consequences
- Use faction effects to create long-term impact
- Add conditions to create branching paths
- Keep dialogue concise and engaging
- Maintain EVE Online's sci-fi atmosphere

### Designing Maps

**Map structure:**
```json
{
  "name": "Descriptive Location Name",
  "width": 20,
  "height": 15,
  "tile_size": 32,
  "npcs": [
    {
      "id": "unique_npc_id",
      "name": "NPC Display Name",
      "position": [x, y],
      "dialogue": "path/to/dialogue.json"
    }
  ]
}
```

**Best practices:**
- Use descriptive IDs
- Balance NPC density
- Create logical layouts
- Include interactive elements
- Test collision boundaries

## 🔍 Code Review Process

Pull requests will be reviewed for:
- Code quality and style
- Functionality and correctness
- Performance implications
- Documentation completeness
- Test coverage (if applicable)
- Compatibility with existing features

## 🐛 Reporting Bugs

When reporting bugs, include:
- Python version
- Operating system
- Steps to reproduce
- Expected behavior
- Actual behavior
- Error messages/stack traces
- Screenshots (if applicable)

Use the GitHub issue template and label as `bug`.

## 💡 Suggesting Features

Feature suggestions should include:
- Clear description of the feature
- Use cases and benefits
- Implementation ideas (optional)
- Mockups or examples (optional)

Label as `enhancement` or `feature-request`.

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

## 🙏 Recognition

Contributors will be recognized in:
- README.md contributors section
- Release notes
- Project documentation

## 📞 Questions?

- Open a discussion on GitHub
- Comment on relevant issues
- Check existing documentation

Thank you for contributing to EVE Chronicle RPG! 🚀
