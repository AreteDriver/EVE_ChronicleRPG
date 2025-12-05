/**
 * Dialogue - Dialogue system for NPC interactions
 */
class Dialogue {
    constructor() {
        this.currentDialogue = null;
        this.isActive = false;
        this.callbacks = {};
    }

    start(dialogueTree, npc) {
        this.currentDialogue = {
            tree: dialogueTree,
            currentNode: 'start',
            npc: npc
        };
        this.isActive = true;
        this.showDialogue();
    }

    showDialogue() {
        if (!this.isActive || !this.currentDialogue) return;

        const node = this.currentDialogue.tree[this.currentDialogue.currentNode];
        if (!node) {
            this.end();
            return;
        }

        const dialogueBox = document.getElementById('dialogue-box');
        const speakerName = document.getElementById('speaker-name');
        const dialogueText = document.getElementById('dialogue-text');
        const optionsContainer = document.getElementById('dialogue-options');

        dialogueBox.style.display = 'block';
        speakerName.textContent = this.currentDialogue.npc.name;
        dialogueText.textContent = node.text;

        // Clear previous options
        optionsContainer.innerHTML = '';

        // Add new options
        if (node.options) {
            node.options.forEach((option, index) => {
                const button = document.createElement('button');
                button.textContent = option.text;
                button.onclick = () => this.selectOption(option);
                optionsContainer.appendChild(button);
            });
        } else {
            // End dialogue if no options
            const button = document.createElement('button');
            button.textContent = '[End conversation]';
            button.onclick = () => this.end();
            optionsContainer.appendChild(button);
        }
    }

    selectOption(option) {
        // Execute any action associated with this option
        if (option.action) {
            this.executeAction(option.action);
        }

        // Move to next node or end
        if (option.next) {
            this.currentDialogue.currentNode = option.next;
            this.showDialogue();
        } else {
            this.end();
        }
    }

    executeAction(action) {
        if (this.callbacks[action]) {
            this.callbacks[action](this.currentDialogue.npc);
        }
    }

    registerCallback(actionName, callback) {
        this.callbacks[actionName] = callback;
    }

    end() {
        this.isActive = false;
        this.currentDialogue = null;
        const dialogueBox = document.getElementById('dialogue-box');
        dialogueBox.style.display = 'none';
    }

    isDialogueActive() {
        return this.isActive;
    }
}

// Example dialogue tree structure
const exampleDialogueTree = {
    start: {
        text: "Greetings, capsuleer. I have a mission for you, if you're interested.",
        options: [
            { text: "What kind of mission?", next: "mission_details" },
            { text: "I'm not interested.", next: null }
        ]
    },
    mission_details: {
        text: "Rogue drones have been spotted in the nearby sector. We need someone to clear them out.",
        options: [
            { text: "I'll do it.", action: "accept_quest", next: "accepted" },
            { text: "Maybe later.", next: null }
        ]
    },
    accepted: {
        text: "Excellent. Return to me when the job is done. Fly safe, capsuleer.",
        options: null
    }
};
