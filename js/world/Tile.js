/**
 * Tile - Represents a single tile in the game world
 */
class Tile {
    constructor(x, y, type = 'floor') {
        this.x = x;
        this.y = y;
        this.type = type;
        this.walkable = true;
        this.transparent = true;
        
        this.setupTileProperties();
    }

    setupTileProperties() {
        switch(this.type) {
            case 'wall':
                this.walkable = false;
                this.transparent = false;
                break;
            case 'door':
                this.walkable = true;
                this.transparent = true;
                break;
            case 'floor':
                this.walkable = true;
                this.transparent = true;
                break;
            case 'space':
                this.walkable = true;
                this.transparent = true;
                break;
            case 'terminal':
                this.walkable = true;
                this.transparent = true;
                break;
            default:
                this.walkable = true;
                this.transparent = true;
        }
    }

    isWalkable() {
        return this.walkable;
    }

    isTransparent() {
        return this.transparent;
    }
}
