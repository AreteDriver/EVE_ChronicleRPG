/**
 * Quest - Individual quest/mission system
 */
class Quest {
    constructor(id, title, description) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.objectives = [];
        this.isActive = false;
        this.isCompleted = false;
        this.rewards = {
            experience: 0,
            items: [],
            reputation: {}
        };
    }

    addObjective(id, text, completionCondition) {
        this.objectives.push({
            id: id,
            text: text,
            completed: false,
            condition: completionCondition
        });
    }

    updateObjective(objectiveId, completed = true) {
        const objective = this.objectives.find(obj => obj.id === objectiveId);
        if (objective) {
            objective.completed = completed;
            this.checkCompletion();
        }
    }

    checkCompletion() {
        // Check if all objectives are completed
        const allCompleted = this.objectives.every(obj => obj.completed);
        if (allCompleted && !this.isCompleted) {
            this.complete();
        }
    }

    complete() {
        this.isCompleted = true;
        this.isActive = false;
        console.log(`Quest completed: ${this.title}`);
    }

    activate() {
        this.isActive = true;
        console.log(`Quest activated: ${this.title}`);
    }

    setRewards(experience, items = [], reputation = {}) {
        this.rewards.experience = experience;
        this.rewards.items = items;
        this.rewards.reputation = reputation;
    }

    getProgress() {
        const completed = this.objectives.filter(obj => obj.completed).length;
        return {
            completed: completed,
            total: this.objectives.length,
            percentage: (completed / this.objectives.length) * 100
        };
    }

    getCurrentObjectiveText() {
        const current = this.objectives.find(obj => !obj.completed);
        return current ? current.text : 'All objectives complete!';
    }
}
