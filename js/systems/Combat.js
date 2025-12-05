/**
 * Combat - Combat system for handling battles
 */
class Combat {
    constructor() {
        this.activeEffects = [];
        this.combatLog = [];
        this.maxLogEntries = 10;
    }

    attack(attacker, defender) {
        if (!attacker.isAlive || !defender.isAlive) return null;

        // Calculate base damage
        let damage = 10 + Math.random() * 15;
        
        // Apply skill modifiers
        if (attacker instanceof Player) {
            damage *= (1 + attacker.skills.gunnery * 0.1);
        }
        
        // Critical hit chance
        const critChance = 0.15;
        const isCrit = Math.random() < critChance;
        if (isCrit) {
            damage *= 2;
        }

        // Apply damage
        defender.takeDamage(damage);

        // Log the attack
        const logEntry = {
            attacker: attacker.name || 'Unknown',
            defender: defender.name || 'Unknown',
            damage: Math.floor(damage),
            isCrit: isCrit,
            timestamp: Date.now()
        };

        this.addToLog(logEntry);

        return logEntry;
    }

    addToLog(entry) {
        this.combatLog.unshift(entry);
        if (this.combatLog.length > this.maxLogEntries) {
            this.combatLog.pop();
        }
    }

    getLog() {
        return this.combatLog;
    }

    clearLog() {
        this.combatLog = [];
    }

    // Apply a temporary effect
    applyEffect(entity, effectType, duration, strength) {
        const effect = {
            entity: entity,
            type: effectType,
            duration: duration,
            strength: strength,
            startTime: Date.now()
        };

        this.activeEffects.push(effect);
        
        // Apply immediate effect
        this.applyEffectToEntity(effect);
    }

    applyEffectToEntity(effect) {
        switch(effect.type) {
            case 'slow':
                effect.entity.speed *= (1 - effect.strength);
                break;
            case 'damage_over_time':
                effect.entity.takeDamage(effect.strength);
                break;
            case 'heal_over_time':
                effect.entity.heal(effect.strength);
                break;
        }
    }

    updateEffects(deltaTime) {
        const now = Date.now();
        
        // Update and remove expired effects
        this.activeEffects = this.activeEffects.filter(effect => {
            const elapsed = (now - effect.startTime) / 1000;
            
            if (elapsed >= effect.duration) {
                // Remove effect
                return false;
            }
            
            // Apply damage/heal over time effects at 1 second intervals
            if (effect.type === 'damage_over_time' || effect.type === 'heal_over_time') {
                if (!effect.lastTick || (now - effect.lastTick) >= 1000) {
                    this.applyEffectToEntity(effect);
                    effect.lastTick = now;
                }
            }
            
            return true;
        });
    }

    calculateRange(attacker, target) {
        return attacker.position.distance(target.position);
    }

    isInRange(attacker, target, weaponRange = 100) {
        return this.calculateRange(attacker, target) <= weaponRange;
    }
}
