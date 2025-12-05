/**
 * AssetManager - Manages game assets and resources
 */
class AssetManager {
    constructor() {
        this.assets = {
            items: {},
            weapons: {},
            modules: {},
            ships: {}
        };
        
        this.loadDefaultAssets();
    }

    loadDefaultAssets() {
        // EVE-themed items
        this.assets.items = {
            'tritanium': { name: 'Tritanium', description: 'Basic mineral used in ship construction', stackable: true },
            'pyerite': { name: 'Pyerite', description: 'Common mineral found in asteroids', stackable: true },
            'mexallon': { name: 'Mexallon', description: 'Refined mineral used in advanced components', stackable: true },
            'isogen': { name: 'Isogen', description: 'Rare mineral used in hull plating', stackable: true },
            'datacores': { name: 'Datacores', description: 'Research data from scientific experiments', stackable: true },
            'nanite_paste': { name: 'Nanite Repair Paste', description: 'Emergency hull repairs', stackable: true },
            'chronicle_datapad': { name: 'Chronicle Datapad', description: 'Contains a historical record', stackable: false }
        };

        // Weapons
        this.assets.weapons = {
            'blaster_i': { name: 'Light Electron Blaster I', damage: 15, range: 100, energy: 5 },
            'railgun_i': { name: '75mm Railgun I', damage: 20, range: 200, energy: 8 },
            'missile_i': { name: 'Light Missile Launcher I', damage: 25, range: 150, energy: 10 }
        };

        // Ship modules
        this.assets.modules = {
            'shield_booster_i': { name: 'Small Shield Booster I', shieldBoost: 50, energy: 15 },
            'armor_rep_i': { name: 'Small Armor Repairer I', armorRep: 40, energy: 12 },
            'afterburner_i': { name: '1MN Afterburner I', speedBoost: 1.5, energy: 20 }
        };

        // Ship types
        this.assets.ships = {
            'corvette': { name: 'Corvette', hull: 100, shield: 100, speed: 3 },
            'frigate': { name: 'Frigate', hull: 150, shield: 150, speed: 2.5 },
            'destroyer': { name: 'Destroyer', hull: 200, shield: 200, speed: 2 }
        };
    }

    getItem(itemId) {
        return this.assets.items[itemId] || null;
    }

    getWeapon(weaponId) {
        return this.assets.weapons[weaponId] || null;
    }

    getModule(moduleId) {
        return this.assets.modules[moduleId] || null;
    }

    getShip(shipId) {
        return this.assets.ships[shipId] || null;
    }

    getAllItems() {
        return Object.keys(this.assets.items);
    }
}
