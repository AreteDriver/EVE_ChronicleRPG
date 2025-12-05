/**
 * Player - Player character class
 */
class Player extends Entity {
    constructor(x, y, faction = 'caldari') {
        super(x, y, 'player');
        
        this.faction = faction;
        this.name = 'Capsuleer';
        this.color = '#0ff';
        this.radius = 14;
        
        // Player-specific stats
        this.level = 1;
        this.experience = 0;
        this.experienceToNext = 100;
        
        // Inventory
        this.inventory = [];
        this.maxInventorySize = 20;
        
        // Quests
        this.activeQuests = [];
        this.completedQuests = [];
        
        // Skills (EVE-themed)
        this.skills = {
            gunnery: 1,
            missiles: 1,
            navigation: 1,
            engineering: 1,
            shields: 1,
            armor: 1
        };

        // Faction-specific bonuses
        this.applyFactionBonuses();
    }

    applyFactionBonuses() {
        // Ensure stats are initialized before applying bonuses
        if (!this.maxHealth || !this.maxShield || !this.maxEnergy) {
            console.warn('Stats not initialized before applying faction bonuses');
            return;
        }
        
        switch(this.faction.toLowerCase()) {
            case 'caldari':
                this.maxShield = Math.floor(this.maxShield * 1.25);
                this.shield = this.maxShield;
                this.skills.shields += 1;
                break;
            case 'gallente':
                this.maxHealth = Math.floor(this.maxHealth * 1.2);
                this.health = this.maxHealth;
                this.skills.armor += 1;
                break;
            case 'minmatar':
                this.speed *= 1.2;
                this.skills.navigation += 1;
                break;
            case 'amarr':
                this.maxEnergy = Math.floor(this.maxEnergy * 1.3);
                this.energy = this.maxEnergy;
                this.skills.engineering += 1;
                break;
        }
    }

    addItem(itemId) {
        if (this.inventory.length < this.maxInventorySize) {
            this.inventory.push(itemId);
            return true;
        }
        return false;
    }

    removeItem(itemId) {
        const index = this.inventory.indexOf(itemId);
        if (index > -1) {
            this.inventory.splice(index, 1);
            return true;
        }
        return false;
    }

    hasItem(itemId) {
        return this.inventory.includes(itemId);
    }

    addQuest(quest) {
        if (!this.activeQuests.find(q => q.id === quest.id)) {
            this.activeQuests.push(quest);
            return true;
        }
        return false;
    }

    completeQuest(questId) {
        const index = this.activeQuests.findIndex(q => q.id === questId);
        if (index > -1) {
            const quest = this.activeQuests.splice(index, 1)[0];
            this.completedQuests.push(quest);
            this.gainExperience(quest.experienceReward || 50);
            return true;
        }
        return false;
    }

    gainExperience(amount) {
        this.experience += amount;
        
        while (this.experience >= this.experienceToNext) {
            this.levelUp();
        }
    }

    levelUp() {
        this.level++;
        this.experience -= this.experienceToNext;
        this.experienceToNext = Math.floor(this.experienceToNext * 1.5);
        
        // Increase stats
        this.maxHealth += 20;
        this.maxShield += 20;
        this.maxEnergy += 10;
        
        // Heal to full on level up
        this.health = this.maxHealth;
        this.shield = this.maxShield;
        this.energy = this.maxEnergy;
        
        console.log(`Level up! Now level ${this.level}`);
    }

    increaseSkill(skillName) {
        if (this.skills.hasOwnProperty(skillName)) {
            this.skills[skillName]++;
            return true;
        }
        return false;
    }

    getSkillLevel(skillName) {
        return this.skills[skillName] || 0;
    }
}
