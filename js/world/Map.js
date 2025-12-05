/**
 * Map - Game world map system
 */
class Map {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.tiles = [];
        this.tileSize = 32;
        
        this.initializeTiles();
    }

    initializeTiles() {
        for (let y = 0; y < this.height; y++) {
            this.tiles[y] = [];
            for (let x = 0; x < this.width; x++) {
                this.tiles[y][x] = new Tile(x, y, 'floor');
            }
        }
    }

    getTile(x, y) {
        const tileX = Math.floor(x / this.tileSize);
        const tileY = Math.floor(y / this.tileSize);
        
        if (tileY >= 0 && tileY < this.height && tileX >= 0 && tileX < this.width) {
            return this.tiles[tileY][tileX];
        }
        return null;
    }

    setTile(x, y, type) {
        if (y >= 0 && y < this.height && x >= 0 && x < this.width) {
            this.tiles[y][x] = new Tile(x, y, type);
        }
    }

    isWalkable(x, y) {
        const tile = this.getTile(x, y);
        return tile ? tile.isWalkable() : false;
    }

    createRoom(x, y, width, height, fillType = 'floor') {
        for (let dy = 0; dy < height; dy++) {
            for (let dx = 0; dx < width; dx++) {
                const tileX = x + dx;
                const tileY = y + dy;
                
                // Create walls on borders
                if (dx === 0 || dx === width - 1 || dy === 0 || dy === height - 1) {
                    this.setTile(tileX, tileY, 'wall');
                } else {
                    this.setTile(tileX, tileY, fillType);
                }
            }
        }
    }

    createCorridor(x1, y1, x2, y2) {
        let x = x1;
        let y = y1;

        while (x !== x2) {
            this.setTile(x, y, 'floor');
            x += (x2 > x1) ? 1 : -1;
        }

        while (y !== y2) {
            this.setTile(x, y, 'floor');
            y += (y2 > y1) ? 1 : -1;
        }
    }

    createDoor(x, y) {
        this.setTile(x, y, 'door');
    }

    generateStationMap() {
        // Create a simple space station layout
        
        // Main room
        this.createRoom(5, 5, 15, 12, 'floor');
        
        // Side rooms
        this.createRoom(22, 5, 8, 6, 'floor');
        this.createRoom(22, 13, 8, 6, 'floor');
        
        // Corridors
        this.createCorridor(19, 10, 22, 10);
        this.createCorridor(19, 15, 22, 15);
        
        // Doors
        this.createDoor(20, 10);
        this.createDoor(21, 10);
        this.createDoor(20, 15);
        this.createDoor(21, 15);
        
        // Special tiles
        this.setTile(10, 8, 'terminal');
        this.setTile(25, 8, 'terminal');
        this.setTile(25, 16, 'terminal');
    }

    generateSpaceMap() {
        const ASTEROID_COUNT = 15;
        const MIN_ASTEROID_SIZE = 2;
        const MAX_ASTEROID_SIZE = 5;
        
        // Create an open space map
        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                this.setTile(x, y, 'space');
            }
        }
        
        // Add some asteroids (walls in space)
        for (let i = 0; i < ASTEROID_COUNT; i++) {
            const x = Math.floor(Math.random() * this.width);
            const y = Math.floor(Math.random() * this.height);
            const size = MIN_ASTEROID_SIZE + Math.floor(Math.random() * (MAX_ASTEROID_SIZE - MIN_ASTEROID_SIZE));
            
            for (let dy = 0; dy < size; dy++) {
                for (let dx = 0; dx < size; dx++) {
                    if (x + dx < this.width && y + dy < this.height) {
                        this.setTile(x + dx, y + dy, 'wall');
                    }
                }
            }
        }
    }

    render(renderer) {
        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                renderer.drawTile(x, y, this.tiles[y][x].type);
            }
        }
    }
}
