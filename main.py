#!/usr/bin/env python3
"""
EVE Chronicle RPG - Main Game Entry Point
A demonstration of the EVE-themed RPG framework with dialogue and quest systems.
"""
import asyncio
import pygame
import sys
from pathlib import Path
from core.state_manager import GameState, GameStateManager
from systems.dialogue_engine import DialogueTree
from systems.quest_manager import QuestManager

# Game Constants
SCREEN_WIDTH = 800
SCREEN_HEIGHT = 600
FPS = 60
TITLE = "EVE Chronicle RPG - Demo"

class DemoGameState(GameState):
    """Demo game state showcasing the EVE Chronicle RPG framework."""
    
    def __init__(self, state_manager: GameStateManager) -> None:
        self.state_manager = state_manager
        self.game_state = {
            "inventory": [],
            "flags": {},
            "factions": {"Caldari": 0, "Gallente": 0, "Amarr": 0, "Minmatar": 0}
        }
        self.quest_manager = QuestManager()
        self.dialogue_tree = None
        
        # UI State
        self.font = None
        self.title_font = None
        self.menu_selection = 0
        self.in_dialogue = False
        self.show_instructions = True
        
        # Start a demo quest
        self.quest_manager.start_chronicle("welcome_chronicle", "introduction")
        
    def init_fonts(self):
        """Initialize fonts if not already done."""
        if self.font is None:
            pygame.font.init()
            self.font = pygame.font.Font(None, 32)
            self.title_font = pygame.font.Font(None, 48)
    
    def start_demo_dialogue(self):
        """Start a demo dialogue conversation."""
        # Create a simple demo dialogue
        demo_dialogue_data = {
            "start": "greeting",
            "nodes": {
                "greeting": {
                    "text": "Greetings, capsuleer. Welcome to New Eden. I represent the diplomatic corps. How may I assist you today?",
                    "choices": [
                        {
                            "text": "Tell me about the factions.",
                            "next": "factions"
                        },
                        {
                            "text": "I'd like to explore the galaxy.",
                            "next": "explore"
                        },
                        {
                            "text": "Farewell.",
                            "next": None
                        }
                    ]
                },
                "factions": {
                    "text": "The four major empires shape New Eden: Caldari (corporate efficiency), Gallente (democracy and freedom), Amarr (religious devotion), and Minmatar (freedom fighters). Each offers unique opportunities.",
                    "choices": [
                        {
                            "text": "I support the Caldari cause.",
                            "next": "caldari_support",
                            "effect": {"faction": {"Caldari": 5}}
                        },
                        {
                            "text": "The Gallente ideals resonate with me.",
                            "next": "gallente_support",
                            "effect": {"faction": {"Gallente": 5}}
                        },
                        {
                            "text": "Tell me more about exploration.",
                            "next": "explore"
                        }
                    ]
                },
                "caldari_support": {
                    "text": "An excellent choice. The State values your loyalty. Your standing with Caldari has increased.",
                    "choices": [
                        {
                            "text": "Thank you.",
                            "next": "greeting"
                        }
                    ]
                },
                "gallente_support": {
                    "text": "The Federation welcomes all who cherish liberty. Your standing with Gallente has increased.",
                    "choices": [
                        {
                            "text": "Thank you.",
                            "next": "greeting"
                        }
                    ]
                },
                "explore": {
                    "text": "New Eden is vast with countless star systems to discover. Chronicles await brave capsuleers willing to forge their own destiny.",
                    "choices": [
                        {
                            "text": "I'm ready for adventure.",
                            "next": None
                        },
                        {
                            "text": "Tell me about the factions first.",
                            "next": "factions"
                        }
                    ]
                }
            }
        }
        
        # Save temporary dialogue file
        import json
        temp_dialogue_path = Path("/tmp/demo_dialogue.json")
        temp_dialogue_path.parent.mkdir(parents=True, exist_ok=True)
        with open(temp_dialogue_path, "w") as f:
            json.dump(demo_dialogue_data, f)
        
        self.dialogue_tree = DialogueTree(temp_dialogue_path, self.game_state)
        self.in_dialogue = True
        self.menu_selection = 0
    
    def handle_event(self, event) -> None:
        if event.type == pygame.KEYDOWN:
            if self.show_instructions:
                self.show_instructions = False
                return
            
            if self.in_dialogue:
                if event.key == pygame.K_UP:
                    choices = self.dialogue_tree.choices()
                    if choices:
                        self.menu_selection = (self.menu_selection - 1) % len(choices)
                elif event.key == pygame.K_DOWN:
                    choices = self.dialogue_tree.choices()
                    if choices:
                        self.menu_selection = (self.menu_selection + 1) % len(choices)
                elif event.key == pygame.K_RETURN or event.key == pygame.K_SPACE:
                    self.dialogue_tree.advance(self.menu_selection)
                    self.menu_selection = 0
                    if self.dialogue_tree.is_finished():
                        self.in_dialogue = False
            else:
                # Main menu
                if event.key == pygame.K_UP:
                    self.menu_selection = (self.menu_selection - 1) % 3
                elif event.key == pygame.K_DOWN:
                    self.menu_selection = (self.menu_selection + 1) % 3
                elif event.key == pygame.K_RETURN or event.key == pygame.K_SPACE:
                    if self.menu_selection == 0:
                        self.start_demo_dialogue()
                    elif self.menu_selection == 1:
                        self.show_instructions = True
                    elif self.menu_selection == 2:
                        pygame.event.post(pygame.event.Event(pygame.QUIT))
    
    def update(self, dt: float) -> None:
        pass
    
    def draw(self, screen) -> None:
        self.init_fonts()
        screen.fill((10, 10, 30))  # Dark space background
        
        if self.show_instructions:
            self.draw_instructions(screen)
        elif self.in_dialogue:
            self.draw_dialogue(screen)
        else:
            self.draw_main_menu(screen)
    
    def draw_instructions(self, screen):
        """Draw the instructions screen."""
        y = 50
        title = self.title_font.render("EVE Chronicle RPG - Instructions", True, (100, 200, 255))
        screen.blit(title, (SCREEN_WIDTH // 2 - title.get_width() // 2, y))
        y += 80
        
        instructions = [
            "Welcome to the EVE Chronicle RPG Framework Demo!",
            "",
            "CONTROLS:",
            "  UP/DOWN ARROWS - Navigate menus and dialogue choices",
            "  ENTER/SPACE - Select menu option or advance dialogue",
            "",
            "FEATURES DEMONSTRATED:",
            "  - State Management System (core/state_manager.py)",
            "  - Dialogue Engine with branching conversations",
            "  - Quest/Chronicle tracking system",
            "  - Faction reputation system",
            "",
            "This demo showcases the EVE Chronicle RPG framework",
            "that can be extended with custom stories, maps,",
            "characters, and game mechanics.",
            "",
            "Press any key to continue..."
        ]
        
        for line in instructions:
            if line.startswith("  "):
                text = self.font.render(line, True, (180, 180, 180))
            elif line == "":
                y += 20
                continue
            else:
                text = self.font.render(line, True, (255, 255, 255))
            screen.blit(text, (50, y))
            y += 35
    
    def draw_main_menu(self, screen):
        """Draw the main menu."""
        y = 100
        title = self.title_font.render("EVE Chronicle RPG", True, (100, 200, 255))
        screen.blit(title, (SCREEN_WIDTH // 2 - title.get_width() // 2, y))
        y += 100
        
        menu_items = [
            "Start Dialogue Demo",
            "View Instructions",
            "Exit"
        ]
        
        for i, item in enumerate(menu_items):
            color = (255, 255, 100) if i == self.menu_selection else (200, 200, 200)
            prefix = "> " if i == self.menu_selection else "  "
            text = self.font.render(f"{prefix}{item}", True, color)
            screen.blit(text, (SCREEN_WIDTH // 2 - 150, y))
            y += 50
        
        # Show current quest status
        y = SCREEN_HEIGHT - 120
        status_text = self.font.render("Current Quest Status:", True, (150, 150, 150))
        screen.blit(status_text, (50, y))
        y += 40
        
        progress = self.quest_manager.get_progress("welcome_chronicle")
        if progress:
            quest_info = f"Chronicle: {progress.chronicle_id} - Stage: {progress.current_stage}"
            text = self.font.render(quest_info, True, (180, 180, 180))
            screen.blit(text, (50, y))
    
    def draw_dialogue(self, screen):
        """Draw the dialogue interface."""
        if not self.dialogue_tree:
            return
        
        node = self.dialogue_tree.current_node()
        if not node:
            self.in_dialogue = False
            return
        
        # Draw dialogue box background
        dialogue_rect = pygame.Rect(50, 50, SCREEN_WIDTH - 100, 150)
        pygame.draw.rect(screen, (20, 20, 50), dialogue_rect)
        pygame.draw.rect(screen, (100, 150, 255), dialogue_rect, 2)
        
        # Draw NPC text
        text = node.get("text", "...")
        wrapped_text = self.wrap_text(text, SCREEN_WIDTH - 140)
        y = 70
        for line in wrapped_text:
            rendered = self.font.render(line, True, (255, 255, 255))
            screen.blit(rendered, (70, y))
            y += 35
        
        # Draw choices
        y = 250
        choices = self.dialogue_tree.choices()
        if choices:
            label = self.font.render("Choose your response:", True, (150, 200, 255))
            screen.blit(label, (50, y))
            y += 50
            
            for i, choice in enumerate(choices):
                color = (255, 255, 100) if i == self.menu_selection else (200, 200, 200)
                prefix = "> " if i == self.menu_selection else "  "
                text = f"{prefix}{choice['text']}"
                rendered = self.font.render(text, True, color)
                screen.blit(rendered, (70, y))
                y += 40
        
        # Draw faction standings
        y = SCREEN_HEIGHT - 80
        faction_text = self.font.render("Faction Standings:", True, (150, 150, 150))
        screen.blit(faction_text, (50, y))
        y += 35
        
        factions_str = " | ".join([f"{k}: {v:+d}" for k, v in self.game_state["factions"].items()])
        standings = self.font.render(factions_str, True, (180, 180, 180))
        screen.blit(standings, (50, y))
    
    def wrap_text(self, text, max_width):
        """Wrap text to fit within max_width pixels."""
        words = text.split()
        lines = []
        current_line = []
        
        for word in words:
            test_line = ' '.join(current_line + [word])
            test_surface = self.font.render(test_line, True, (255, 255, 255))
            if test_surface.get_width() <= max_width:
                current_line.append(word)
            else:
                if current_line:
                    lines.append(' '.join(current_line))
                current_line = [word]
        
        if current_line:
            lines.append(' '.join(current_line))
        
        return lines


async def main():
    """Main game loop with async support for Pygbag."""
    pygame.init()
    
    # Create display
    screen = pygame.display.set_mode((SCREEN_WIDTH, SCREEN_HEIGHT))
    pygame.display.set_caption(TITLE)
    
    # Create state manager and initial state
    state_manager = GameStateManager()
    demo_state = DemoGameState(state_manager)
    state_manager.push(demo_state)
    
    # Game loop
    clock = pygame.time.Clock()
    running = True
    
    while running:
        dt = clock.tick(FPS) / 1000.0  # Delta time in seconds
        
        # Event handling
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                running = False
            else:
                state_manager.handle_event(event)
        
        # Update
        state_manager.update(dt)
        
        # Draw
        state_manager.draw(screen)
        pygame.display.flip()
        
        # Yield control for Pygbag (browser compatibility)
        await asyncio.sleep(0)
    
    pygame.quit()
    sys.exit()


if __name__ == "__main__":
    asyncio.run(main())
