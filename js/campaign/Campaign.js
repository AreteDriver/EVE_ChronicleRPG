/**
 * Campaign - Campaign management system
 * Orchestrates quests, story progression, and chronicle-based missions
 */
class Campaign {
    constructor(chronicleId) {
        this.chronicle = getChronicle(chronicleId);
        this.currentAct = 0;
        this.quests = [];
        this.isActive = false;
        
        if (this.chronicle) {
            this.initializeCampaign();
        }
    }

    initializeCampaign() {
        console.log(`Starting campaign: ${this.chronicle.title}`);
        
        // Create quests for each act
        this.chronicle.acts.forEach((act, index) => {
            const quest = new Quest(
                `${this.chronicle.id}_act${index + 1}`,
                act.title,
                act.description
            );
            
            // Add objectives
            act.objectives.forEach(obj => {
                quest.addObjective(obj.id, obj.text, () => obj.completed);
            });
            
            // Set rewards
            if (index === this.chronicle.acts.length - 1) {
                // Final act gets full rewards
                quest.setRewards(
                    this.chronicle.rewards.experience,
                    this.chronicle.rewards.items || [],
                    this.chronicle.rewards.reputation || {}
                );
            } else {
                // Earlier acts get partial rewards
                quest.setRewards(Math.floor(this.chronicle.rewards.experience / this.chronicle.acts.length));
            }
            
            this.quests.push(quest);
        });
    }

    start() {
        this.isActive = true;
        if (this.quests.length > 0) {
            this.quests[0].activate();
        }
    }

    getCurrentQuest() {
        return this.quests[this.currentAct] || null;
    }

    getCurrentAct() {
        return this.chronicle.acts[this.currentAct] || null;
    }

    advanceAct() {
        if (this.currentAct < this.quests.length - 1) {
            this.currentAct++;
            this.quests[this.currentAct].activate();
            console.log(`Advanced to act ${this.currentAct + 1}: ${this.quests[this.currentAct].title}`);
            return true;
        }
        return false;
    }

    updateObjective(objectiveId) {
        const currentQuest = this.getCurrentQuest();
        if (currentQuest) {
            currentQuest.updateObjective(objectiveId);
            
            // Check if quest is complete and advance act
            if (currentQuest.isCompleted) {
                if (!this.advanceAct()) {
                    // Campaign completed
                    this.complete();
                }
            }
        }
    }

    complete() {
        this.isActive = false;
        console.log(`Campaign completed: ${this.chronicle.title}`);
    }

    getProgress() {
        const totalActs = this.quests.length;
        const completedActs = this.quests.filter(q => q.isCompleted).length;
        
        return {
            currentAct: this.currentAct + 1,
            totalActs: totalActs,
            completedActs: completedActs,
            percentage: (completedActs / totalActs) * 100,
            currentObjective: this.getCurrentQuest()?.getCurrentObjectiveText() || 'No active objectives'
        };
    }

    getCharacter(characterKey) {
        if (this.chronicle.characters && this.chronicle.characters[characterKey]) {
            return this.chronicle.characters[characterKey];
        }
        return null;
    }

    getCharacterDialogue(characterKey) {
        const character = this.getCharacter(characterKey);
        if (character && character.dialogue) {
            return character.dialogue;
        }
        return null;
    }

    getCampaignSummary() {
        return {
            title: this.chronicle.title,
            description: this.chronicle.description,
            background: this.chronicle.background,
            progress: this.getProgress(),
            isActive: this.isActive
        };
    }
}
