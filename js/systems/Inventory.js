/**
 * Inventory - Inventory management system
 */
class Inventory {
    constructor() {
        this.isOpen = false;
    }

    open(player, assetManager) {
        this.isOpen = true;
        const inventoryDiv = document.getElementById('inventory');
        const gridDiv = document.getElementById('inventory-grid');
        
        inventoryDiv.style.display = 'block';
        gridDiv.innerHTML = '';

        // Display all items in inventory
        player.inventory.forEach((itemId, index) => {
            const itemData = assetManager.getItem(itemId);
            if (itemData) {
                const itemDiv = document.createElement('div');
                itemDiv.className = 'inventory-item';
                itemDiv.innerHTML = `<div class="item-name">${itemData.name}</div>`;
                itemDiv.title = itemData.description;
                itemDiv.onclick = () => this.selectItem(itemId, itemData);
                gridDiv.appendChild(itemDiv);
            }
        });

        // Add empty slots
        const emptySlots = player.maxInventorySize - player.inventory.length;
        for (let i = 0; i < emptySlots; i++) {
            const emptyDiv = document.createElement('div');
            emptyDiv.className = 'inventory-item';
            emptyDiv.style.opacity = '0.3';
            emptyDiv.innerHTML = '<div class="item-name">Empty</div>';
            gridDiv.appendChild(emptyDiv);
        }
    }

    close() {
        this.isOpen = false;
        const inventoryDiv = document.getElementById('inventory');
        inventoryDiv.style.display = 'none';
    }

    toggle(player, assetManager) {
        if (this.isOpen) {
            this.close();
        } else {
            this.open(player, assetManager);
        }
    }

    selectItem(itemId, itemData) {
        console.log('Selected item:', itemData.name);
        // TODO: Implement item usage/interaction
    }

    setupEventListeners() {
        const closeButton = document.getElementById('close-inventory');
        if (closeButton) {
            closeButton.onclick = () => this.close();
        }
    }
}
