# EVE Chronicle RPG - Examples

This directory contains example files demonstrating how to use the EVE Chronicle RPG framework.

## Files

### `demo_dialogue.json`
A complete example of a dialogue tree with:
- Multiple conversation nodes
- Branching dialogue paths
- Faction reputation effects
- Looping conversations

**Usage:**
```python
from systems.dialogue_engine import DialogueTree

game_state = {
    "inventory": [],
    "flags": {},
    "factions": {"Caldari": 0, "Gallente": 0, "Amarr": 0, "Minmatar": 0}
}

dialogue = DialogueTree("examples/demo_dialogue.json", game_state)
```

### `example_map.json`
A sample map data file showing:
- Map dimensions and tile configuration
- NPC placement with dialogue references
- Interactive objects (terminals, doors)
- Event triggers for chronicles

**Usage:**
```python
from world.maps.map_data import MapData

map_data = MapData("examples/example_map.json")
```

## Dialogue System

### Structure
```json
{
  "start": "node_id",
  "nodes": {
    "node_id": {
      "text": "NPC dialogue text",
      "choices": [
        {
          "text": "Player response option",
          "next": "next_node_id",
          "condition": "optional_condition",
          "effect": {
            "faction": {"FactionName": delta_value}
          }
        }
      ]
    }
  }
}
```

### Conditions
- `has_<item>` - Check if player has item in inventory
- `flag_<name>` - Check if game flag is set
- `null` - No condition (always available)

### Effects
- `"faction": {"FactionName": delta}` - Modify faction standing
- Can be extended for inventory, flags, etc.

## Map System

### Structure
```json
{
  "name": "Map Name",
  "width": 20,
  "height": 15,
  "tile_size": 32,
  "npcs": [
    {
      "id": "unique_id",
      "name": "NPC Name",
      "position": [x, y],
      "dialogue": "path/to/dialogue.json"
    }
  ],
  "interactables": [
    {
      "id": "unique_id",
      "position": [x, y],
      "type": "object_type",
      "action": "action_name"
    }
  ],
  "events": [
    {
      "id": "unique_id",
      "position": [x, y],
      "trigger": "on_enter",
      "action": "start_chronicle",
      "one_time": true
    }
  ]
}
```

## Creating Your Own Content

### 1. Custom Dialogue
1. Copy `demo_dialogue.json` as a template
2. Modify the nodes and choices
3. Add your own story branches
4. Include conditions and effects as needed

### 2. Custom Maps
1. Copy `example_map.json` as a template
2. Set your map dimensions
3. Add NPCs with dialogue references
4. Place interactive objects
5. Set up event triggers

### 3. Integration
Reference your custom files in your game state or map loader:
```python
# Load custom dialogue
dialogue = DialogueTree("my_content/my_dialogue.json", game_state)

# Load custom map
map_data = MapData("my_content/my_map.json")
```

## Tips

- **Plan your story**: Map out dialogue branches on paper first
- **Test incrementally**: Test each dialogue path as you create it
- **Use meaningful IDs**: Name nodes and NPCs descriptively
- **Balance effects**: Don't make faction changes too extreme
- **Add variety**: Include multiple conversation paths
- **Consider consequences**: Make player choices feel meaningful

## Advanced Features

### Conditional Dialogues
Create different dialogue paths based on player state:
```json
{
  "text": "Special dialogue for players with the data chip",
  "condition": "has_data_chip"
}
```

### Multi-stage Conversations
Link back to previous nodes for complex conversations:
```json
{
  "text": "Want to hear about something else?",
  "choices": [
    {"text": "Tell me again about...", "next": "previous_node"}
  ]
}
```

### Event Chains
Use one_time events to create progressive story reveals:
```json
{
  "id": "first_visit",
  "trigger": "on_enter",
  "one_time": true,
  "action": "set_flag",
  "flag": "visited_station"
}
```

## Resources

- Main README: [../README.md](../README.md)
- Setup Guide: [../SETUP.md](../SETUP.md)
- Dialogue Engine: [../systems/dialogue_engine.py](../systems/dialogue_engine.py)
- Map System: [../world/maps/map_data.py](../world/maps/map_data.py)
