/**
 * NPC - Non-player character class
 */
class NPC extends Entity {
    constructor(x, y, npcType = 'neutral') {
        super(x, y, 'npc');
        
        this.npcType = npcType;
        this.dialogue = null;
        this.aiState = 'idle';
        this.patrolPoints = [];
        this.currentPatrolIndex = 0;
        this.detectRadius = 150;
        this.attackRadius = 50;
        
        this.setupNPCType();
    }

    setupNPCType() {
        switch(this.npcType) {
            case 'friendly':
                this.color = '#0f0';
                this.nameColor = '#0f0';
                this.isHostile = false;
                this.canInteract = true;
                break;
                
            case 'hostile':
                this.color = '#f00';
                this.nameColor = '#f00';
                this.isHostile = true;
                this.canInteract = false;
                this.maxHealth = 80;
                this.health = 80;
                break;
                
            case 'rogue_drone':
                this.name = 'Rogue Drone';
                this.color = '#f80';
                this.nameColor = '#f80';
                this.isHostile = true;
                this.maxHealth = 60;
                this.health = 60;
                this.speed = 1.5;
                break;
                
            case 'pirate':
                this.name = 'Pirate';
                this.color = '#800';
                this.nameColor = '#800';
                this.isHostile = true;
                this.maxHealth = 100;
                this.health = 100;
                this.maxShield = 50;
                this.shield = 50;
                this.speed = 2;
                break;
                
            case 'quest_giver':
                this.name = 'Agent';
                this.color = '#ff0';
                this.nameColor = '#ff0';
                this.isHostile = false;
                this.canInteract = true;
                break;
                
            case 'merchant':
                this.name = 'Merchant';
                this.color = '#0af';
                this.nameColor = '#0af';
                this.isHostile = false;
                this.canInteract = true;
                break;
                
            default:
                this.color = '#888';
                this.nameColor = '#888';
                this.isHostile = false;
                this.canInteract = false;
        }
    }

    update(deltaTime, player) {
        super.update(deltaTime);
        
        if (!this.isAlive) return;
        
        // AI behavior
        if (this.isHostile && player) {
            const distToPlayer = this.getDistanceTo(player);
            
            if (distToPlayer <= this.detectRadius) {
                this.aiState = 'combat';
                
                if (distToPlayer > this.attackRadius) {
                    // Move towards player
                    const direction = player.position.subtract(this.position).normalize();
                    this.move(direction);
                } else {
                    // In attack range
                    this.stop();
                }
            } else {
                this.aiState = 'idle';
                this.stop();
            }
        } else if (this.patrolPoints.length > 0) {
            // Patrol behavior
            this.patrol();
        }
    }

    patrol() {
        if (this.patrolPoints.length === 0) return;
        
        const target = this.patrolPoints[this.currentPatrolIndex];
        const targetPos = new Vector2D(target.x, target.y);
        const distance = this.position.distance(targetPos);
        
        if (distance < 10) {
            // Reached patrol point
            this.currentPatrolIndex = (this.currentPatrolIndex + 1) % this.patrolPoints.length;
        } else {
            // Move towards patrol point
            const direction = targetPos.subtract(this.position).normalize();
            this.move(direction);
        }
    }

    setPatrolRoute(points) {
        this.patrolPoints = points;
        this.currentPatrolIndex = 0;
    }

    setDialogue(dialogueTree) {
        this.dialogue = dialogueTree;
    }

    attack(target) {
        if (this.isNear(target, this.attackRadius)) {
            const damage = 5 + Math.random() * 10;
            target.takeDamage(damage);
            return true;
        }
        return false;
    }
}
