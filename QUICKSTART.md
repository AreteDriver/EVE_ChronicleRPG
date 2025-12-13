# Quick Start Guide

Get started with EVE Chronicle RPG in under 5 minutes!

## 🎮 For Players

### Play in Browser (Easiest)
1. Visit **[https://AreteDriver.github.io/EVE_ChronicleRPG/](https://AreteDriver.github.io/EVE_ChronicleRPG/)**
2. Click "Launch Game"
3. Wait for WebAssembly to load (10-30 seconds first time)
4. Use arrow keys and ENTER to navigate

### Play Locally
```bash
# Quick install
git clone https://github.com/AreteDriver/EVE_ChronicleRPG.git
cd EVE_ChronicleRPG
pip install pygame
python main.py
```

## 🛠️ For Developers

### Run the Demo
```bash
# Clone and run
git clone https://github.com/AreteDriver/EVE_ChronicleRPG.git
cd EVE_ChronicleRPG
pip install -r requirements.txt
python main.py
```

### Create Your First Dialogue

1. **Copy the example:**
```bash
cp examples/demo_dialogue.json my_dialogue.json
```

2. **Edit the JSON:**
```json
{
  "start": "my_node",
  "nodes": {
    "my_node": {
      "text": "Your dialogue here",
      "choices": [
        {"text": "Player choice", "next": "next_node"}
      ]
    }
  }
}
```

3. **Load in game:**
```python
from systems.dialogue_engine import DialogueTree

game_state = {"inventory": [], "flags": {}, "factions": {}}
dialogue = DialogueTree("my_dialogue.json", game_state)
```

### Create Your First Map

1. **Copy the example:**
```bash
cp examples/example_map.json my_map.json
```

2. **Edit the JSON:**
```json
{
  "name": "My Location",
  "width": 20,
  "height": 15,
  "tile_size": 32,
  "npcs": [
    {
      "id": "npc1",
      "name": "Station Officer",
      "position": [10, 7],
      "dialogue": "my_dialogue.json"
    }
  ]
}
```

3. **Load in game:**
```python
from world.maps.map_data import MapData

map_data = MapData("my_map.json")
```

## 📦 Deploy to GitHub Pages

### One-Time Setup
1. Fork the repository
2. Go to Settings → Pages
3. Set Source to "GitHub Actions"

### Deploy Updates
```bash
# Make your changes
git add .
git commit -m "Your changes"
git push origin main

# GitHub Actions automatically builds and deploys!
# Visit https://YOUR-USERNAME.github.io/EVE_ChronicleRPG/
```

## 🎯 Next Steps

### Learn the Framework
- Read [README.md](README.md) for complete documentation
- Check [examples/README.md](examples/README.md) for content creation
- Review [CONTRIBUTING.md](CONTRIBUTING.md) for development guidelines

### Try These Experiments
- Modify dialogue choices in `examples/demo_dialogue.json`
- Add new faction standings
- Create a multi-stage conversation
- Design a custom map with multiple NPCs
- Build a complete story arc

### Get Help
- Check documentation in the repository
- Open an issue on GitHub
- Read the inline code documentation

## ⚡ Common Commands

```bash
# Run the game
python main.py

# Test Pygbag build locally
pygbag main.py
# Then visit http://localhost:8000

# Validate code
python -m py_compile main.py

# Check imports
python -c "from core.state_manager import *; print('OK')"
```

## 🎊 You're Ready!

Start creating your own EVE-themed RPG adventures. The framework handles the technical details so you can focus on storytelling and gameplay.

**Happy developing! 🚀**
