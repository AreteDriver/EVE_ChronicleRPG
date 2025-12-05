/**
 * Factions - EVE Online faction data and lore
 */
const Factions = {
    caldari: {
        name: 'Caldari State',
        description: 'A corporate dictatorship where mega-corporations rule. Masters of shield technology and missiles.',
        color: '#0088ff',
        bonuses: {
            shields: 1.25,
            missiles: 1.1
        },
        shipTypes: ['Griffin', 'Merlin', 'Corax', 'Caracal'],
        territory: ['The Forge', 'Lonetrek', 'The Citadel'],
        philosophy: 'Efficiency, discipline, and corporate loyalty above all.',
        history: 'Split from the Gallente Federation after the Gallente-Caldari War, the Caldari State rebuilt itself through ruthless corporate efficiency.'
    },
    
    gallente: {
        name: 'Gallente Federation',
        description: 'A liberal democracy valuing freedom and individual rights. Experts in armor tanking and drones.',
        color: '#00ff88',
        bonuses: {
            armor: 1.2,
            drones: 1.15
        },
        shipTypes: ['Atron', 'Tristan', 'Catalyst', 'Vexor'],
        territory: ['Essence', 'Verge Vendor', 'Sinq Laison'],
        philosophy: 'Freedom, democracy, and individual rights for all citizens.',
        history: 'The oldest of the major empires, the Gallente Federation champions democracy and personal freedom.'
    },
    
    minmatar: {
        name: 'Minmatar Republic',
        description: 'A tribal society recently freed from Amarr slavery. Known for speed and projectile weapons.',
        color: '#ff8800',
        bonuses: {
            speed: 1.2,
            projectiles: 1.1
        },
        shipTypes: ['Slasher', 'Breacher', 'Thrasher', 'Stabber'],
        territory: ['Heimatar', 'Metropolis', 'Molden Heath'],
        philosophy: 'Freedom, tribal honor, and revenge against oppressors.',
        history: 'After centuries of enslavement by the Amarr Empire, the Minmatar won their freedom through rebellion.'
    },
    
    amarr: {
        name: 'Amarr Empire',
        description: 'A theocratic empire believing in divine right to rule. Specialists in energy weapons and capacitor management.',
        color: '#ffdd00',
        bonuses: {
            energy: 1.3,
            lasers: 1.15
        },
        shipTypes: ['Punisher', 'Tormentor', 'Coercer', 'Maller'],
        territory: ['Domain', 'Devoid', 'The Bleak Lands'],
        philosophy: 'Divine mandate to bring order and enlightenment to the universe.',
        history: 'The largest of the empires, the Amarr believe they are chosen by God to reclaim humanity.'
    }
};

/**
 * Get faction data by name
 */
function getFaction(factionName) {
    return Factions[factionName.toLowerCase()] || null;
}

/**
 * Get all faction names
 */
function getAllFactionNames() {
    return Object.keys(Factions);
}
