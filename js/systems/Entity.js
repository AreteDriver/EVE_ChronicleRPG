/**
 * Entity - Base class for all game entities
 */
class Entity {
    constructor(x, y, type = 'entity') {
        this.position = new Vector2D(x, y);
        this.velocity = new Vector2D(0, 0);
        this.radius = 12;
        this.color = '#0ff';
        this.nameColor = '#0ff';
        this.type = type;
        this.name = '';
        
        // Stats
        this.health = 100;
        this.maxHealth = 100;
        this.shield = 100;
        this.maxShield = 100;
        this.energy = 100;
        this.maxEnergy = 100;
        this.speed = 2;
        
        // Flags
        this.isAlive = true;
        this.isHostile = false;
        this.canInteract = false;
    }

    update(deltaTime) {
        // Update position
        this.position = this.position.add(this.velocity.multiply(deltaTime));
        
        // Regenerate shield slowly
        if (this.shield < this.maxShield) {
            this.shield = Math.min(this.maxShield, this.shield + 0.1 * deltaTime);
        }
        
        // Regenerate energy
        if (this.energy < this.maxEnergy) {
            this.energy = Math.min(this.maxEnergy, this.energy + 0.2 * deltaTime);
        }
    }

    move(direction) {
        this.velocity = direction.multiply(this.speed);
    }

    stop() {
        this.velocity = new Vector2D(0, 0);
    }

    takeDamage(amount) {
        // Shield absorbs damage first
        if (this.shield > 0) {
            this.shield -= amount;
            if (this.shield < 0) {
                this.health += this.shield; // Overflow damage to hull
                this.shield = 0;
            }
        } else {
            this.health -= amount;
        }

        if (this.health <= 0) {
            this.health = 0;
            this.isAlive = false;
        }
    }

    heal(amount) {
        this.health = Math.min(this.maxHealth, this.health + amount);
    }

    rechargeShield(amount) {
        this.shield = Math.min(this.maxShield, this.shield + amount);
    }

    useEnergy(amount) {
        if (this.energy >= amount) {
            this.energy -= amount;
            return true;
        }
        return false;
    }

    getDistanceTo(entity) {
        return this.position.distance(entity.position);
    }

    isNear(entity, range) {
        return this.getDistanceTo(entity) <= range;
    }
}
