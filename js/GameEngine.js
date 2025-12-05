/**
 * GameEngine - Main game engine that coordinates all systems
 */
class GameEngine {
    constructor() {
        this.canvas = document.getElementById('game-canvas');
        this.renderer = new Renderer(this.canvas);
        this.input = new InputHandler();
        this.assetManager = new AssetManager();
        this.combat = new Combat();
        this.dialogue = new Dialogue();
        this.inventory = new Inventory();
        
        this.player = null;
        this.map = null;
        this.npcs = [];
        this.campaign = null;
        
        this.isRunning = false;
        this.lastTime = 0;
        this.deltaTime = 0;
        
        // Particle effects
        this.particles = [];
        
        // Stars for background
        this.stars = this.generateStarfield();
        
        // Setup dialogue callbacks
        this.setupDialogueCallbacks();
        
        // Setup inventory
        this.inventory.setupEventListeners();
    }

    generateStarfield() {
        const stars = [];
        for (let i = 0; i < 100; i++) {
            stars.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                size: Math.random() * 2,
                brightness: 0.3 + Math.random() * 0.7
            });
        }
        return stars;
    }

    setupDialogueCallbacks() {
        this.dialogue.registerCallback('accept_quest', (npc) => {
            console.log('Quest accepted from', npc.name);
            if (this.campaign) {
                this.campaign.start();
                this.updateQuestDisplay();
            }
        });
    }

    startNewGame(faction = 'caldari') {
        console.log('Starting new game with faction:', faction);
        
        // Create map
        this.map = new Map(40, 30);
        this.map.generateStationMap();
        
        // Create player
        this.player = new Player(320, 320, faction);
        this.player.name = 'Capsuleer';
        
        // Add starting items
        this.player.addItem('tritanium');
        this.player.addItem('nanite_paste');
        
        // Start first campaign (before creating NPCs so dialogue is available)
        this.campaign = new Campaign('rogue_drones');
        
        // Create NPCs
        this.createNPCs();
        
        // Update UI
        this.updateHUD();
        this.updateQuestDisplay();
        
        // Start game loop
        this.isRunning = true;
        this.lastTime = performance.now();
        this.gameLoop();
    }

    createNPCs() {
        // Quest giver agent
        const agent = new NPC(320, 200, 'quest_giver');
        agent.name = 'Agent Korvin';
        const agentDialogue = this.campaign ? 
            this.campaign.getCharacterDialogue('agent') : 
            exampleDialogueTree;
        agent.setDialogue(agentDialogue || exampleDialogueTree);
        this.npcs.push(agent);
        
        // Hostile drones
        for (let i = 0; i < 3; i++) {
            const drone = new NPC(
                500 + i * 100,
                400 + Math.random() * 100,
                'rogue_drone'
            );
            drone.setPatrolRoute([
                { x: 500 + i * 100, y: 400 },
                { x: 500 + i * 100, y: 500 },
                { x: 600 + i * 100, y: 500 },
                { x: 600 + i * 100, y: 400 }
            ]);
            this.npcs.push(drone);
        }
        
        // Friendly merchant
        const merchant = new NPC(800, 320, 'merchant');
        merchant.name = 'Merchant';
        merchant.setDialogue({
            start: {
                text: "Welcome, capsuleer. I have various supplies for sale.",
                options: [
                    { text: "Show me your wares.", next: "shop" },
                    { text: "Maybe later.", next: null }
                ]
            },
            shop: {
                text: "Here's what I have available. Credits talk, capsuleer.",
                options: null
            }
        });
        this.npcs.push(merchant);
    }

    gameLoop(currentTime = 0) {
        if (!this.isRunning) return;
        
        // Calculate delta time
        this.deltaTime = (currentTime - this.lastTime) / 16.67; // Normalize to 60fps
        this.lastTime = currentTime;
        
        // Update
        this.update(this.deltaTime);
        
        // Render
        this.render();
        
        // Continue loop
        requestAnimationFrame((time) => this.gameLoop(time));
    }

    update(deltaTime) {
        if (this.dialogue.isDialogueActive()) {
            // Don't update game state during dialogue
            return;
        }
        
        // Handle input
        this.handleInput();
        
        // Update player
        this.player.update(deltaTime);
        
        // Check collision with map
        this.checkMapCollision();
        
        // Update NPCs
        this.npcs.forEach(npc => {
            npc.update(deltaTime, this.player);
            
            // NPC combat AI
            if (npc.isHostile && npc.aiState === 'combat' && npc.isAlive) {
                if (Math.random() < 0.02 * deltaTime) { // Attack chance
                    npc.attack(this.player);
                }
            }
        });
        
        // Update combat effects
        this.combat.updateEffects(deltaTime);
        
        // Update particles
        this.updateParticles(deltaTime);
        
        // Update HUD
        this.updateHUD();
    }

    handleInput() {
        // Movement
        const movement = this.input.getMovementVector();
        if (movement.magnitude() > 0) {
            this.player.move(movement);
        } else {
            this.player.stop();
        }
        
        // Inventory
        if (this.input.isKeyPressed('i')) {
            this.inventory.toggle(this.player, this.assetManager);
            this.input.resetKey('i'); // Prevent repeated toggling
        }
        
        // Interaction
        if (this.input.isKeyPressed('e')) {
            this.tryInteract();
            this.input.resetKey('e');
        }
        
        // Attack (space bar)
        if (this.input.isKeyPressed(' ')) {
            this.tryAttack();
        }
    }

    checkMapCollision() {
        const nextPos = this.player.position.clone();
        
        // Check if next position is walkable
        if (!this.map.isWalkable(nextPos.x, nextPos.y)) {
            // Stop movement if hitting wall
            this.player.stop();
        }
    }

    tryInteract() {
        const interactRange = 50;
        
        for (let npc of this.npcs) {
            if (npc.canInteract && this.player.isNear(npc, interactRange)) {
                if (npc.dialogue) {
                    this.dialogue.start(npc.dialogue, npc);
                }
                break;
            }
        }
    }

    tryAttack() {
        const attackRange = 80;
        let attacked = false;
        
        for (let npc of this.npcs) {
            if (npc.isHostile && npc.isAlive && this.player.isNear(npc, attackRange)) {
                const result = this.combat.attack(this.player, npc);
                if (result) {
                    this.createHitParticles(npc.position);
                    attacked = true;
                    
                    // Check if NPC died
                    if (!npc.isAlive) {
                        this.onNPCDeath(npc);
                    }
                }
                break;
            }
        }
        
        if (attacked && this.player.useEnergy(10)) {
            // Energy used for attack
        }
    }

    onNPCDeath(npc) {
        console.log(`${npc.name} defeated!`);
        
        // Check quest objectives
        if (this.campaign && npc.npcType === 'rogue_drone') {
            // Update drone kill count
            const quest = this.campaign.getCurrentQuest();
            if (quest) {
                const dronesKilled = this.npcs.filter(n => 
                    n.npcType === 'rogue_drone' && !n.isAlive
                ).length;
                
                if (dronesKilled >= 3) {
                    this.campaign.updateObjective('defeat_drones');
                    this.updateQuestDisplay();
                }
            }
        }
        
        // Experience reward
        this.player.gainExperience(20);
    }

    createHitParticles(position) {
        for (let i = 0; i < 5; i++) {
            this.particles.push({
                position: position.clone(),
                velocity: new Vector2D(
                    (Math.random() - 0.5) * 4,
                    (Math.random() - 0.5) * 4
                ),
                color: '#ff0',
                size: 3,
                alpha: 1.0,
                life: 20
            });
        }
    }

    updateParticles(deltaTime) {
        this.particles = this.particles.filter(particle => {
            particle.position = particle.position.add(particle.velocity);
            particle.alpha -= 0.05 * deltaTime;
            particle.life -= deltaTime;
            return particle.life > 0 && particle.alpha > 0;
        });
    }

    render() {
        // Clear canvas
        this.renderer.clear();
        
        // Draw starfield
        this.renderer.drawStarfield(this.stars);
        
        // Set camera to follow player
        this.renderer.setCamera(this.player.position);
        
        // Render map
        this.map.render(this.renderer);
        
        // Render NPCs
        this.npcs.forEach(npc => {
            if (npc.isAlive) {
                this.renderer.drawEntity(npc);
            }
        });
        
        // Render player
        this.renderer.drawEntity(this.player);
        
        // Render particles
        this.particles.forEach(particle => {
            this.renderer.drawParticle(particle);
        });
    }

    updateHUD() {
        // Update health bars
        this.updateStatBar('hull', this.player.health, this.player.maxHealth);
        this.updateStatBar('shield', this.player.shield, this.player.maxShield);
        this.updateStatBar('energy', this.player.energy, this.player.maxEnergy);
        
        // Update faction info
        const factionData = getFaction(this.player.faction);
        document.getElementById('faction-name').textContent = factionData ? factionData.name : 'Unknown';
    }

    updateStatBar(statName, current, max) {
        const bar = document.getElementById(`${statName}-bar`);
        const value = document.getElementById(`${statName}-value`);
        
        if (bar && value) {
            const percentage = (current / max) * 100;
            bar.style.width = percentage + '%';
            value.textContent = `${Math.floor(current)}/${max}`;
        }
    }

    updateQuestDisplay() {
        const questElement = document.getElementById('current-quest');
        if (this.campaign && this.campaign.isActive) {
            const progress = this.campaign.getProgress();
            questElement.textContent = `${this.campaign.chronicle.title} - ${progress.currentObjective}`;
        } else {
            questElement.textContent = 'No active mission';
        }
    }

    stop() {
        this.isRunning = false;
    }
}
