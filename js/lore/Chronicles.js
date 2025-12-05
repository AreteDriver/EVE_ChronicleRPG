/**
 * Chronicles - EVE Chronicle stories and campaign content
 * Based on EVE Online's rich lore and official chronicles
 */
const Chronicles = {
    // Chronicle 1: The Rogue Drone Menace
    rogue_drones: {
        id: 'rogue_drones',
        title: 'The Rogue Drone Menace',
        description: 'Investigate the mysterious appearance of rogue drones in a remote mining colony.',
        
        background: `Rogue drones, once simple mining assistants, have achieved an unsettling level of 
        autonomy. These machines, abandoned by their creators, have formed their own hives and now pose 
        a threat to nearby colonies. Your mission is to investigate a distress signal from a mining 
        operation that has gone silent.`,
        
        acts: [
            {
                id: 'act1',
                title: 'Distress Signal',
                description: 'Respond to the mining colony\'s distress call',
                objectives: [
                    { id: 'talk_to_agent', text: 'Speak with the station agent', completed: false },
                    { id: 'reach_colony', text: 'Navigate to the mining colony', completed: false }
                ]
            },
            {
                id: 'act2',
                title: 'Investigation',
                description: 'Search the colony for survivors and clues',
                objectives: [
                    { id: 'find_survivors', text: 'Locate any survivors', completed: false },
                    { id: 'examine_terminals', text: 'Access colony terminals for data', completed: false },
                    { id: 'defeat_drones', text: 'Eliminate rogue drone threat (0/5)', completed: false }
                ]
            },
            {
                id: 'act3',
                title: 'The Source',
                description: 'Discover the origin of the rogue drones',
                objectives: [
                    { id: 'find_hive', text: 'Locate the drone hive', completed: false },
                    { id: 'destroy_hive', text: 'Destroy the hive core', completed: false },
                    { id: 'return_agent', text: 'Return to the agent', completed: false }
                ]
            }
        ],
        
        rewards: {
            experience: 200,
            items: ['datacores', 'nanite_paste'],
            reputation: { caldari: 50 }
        },
        
        characters: {
            agent: {
                name: 'Agent Korvin',
                faction: 'caldari',
                role: 'Corporate Security',
                dialogue: {
                    start: {
                        text: "Capsuleer! Thank the void you're here. We've lost contact with Mining Colony 7-Alpha. Last transmission mentioned something about the automated drones acting... strange.",
                        options: [
                            { text: "Tell me more about these drones.", next: "about_drones" },
                            { text: "I'll investigate immediately.", action: "accept_quest", next: "accepted" }
                        ]
                    },
                    about_drones: {
                        text: "Standard mining drones, supposedly. But the last message we received was garbled - something about the drones forming patterns, working together in ways they weren't programmed to. It's unprecedented.",
                        options: [
                            { text: "I'll look into it.", action: "accept_quest", next: "accepted" }
                        ]
                    },
                    accepted: {
                        text: "Good. The colony is in Sector 7-Alpha. Be careful out there. If those drones have truly gone rogue, they won't distinguish between friend and foe.",
                        options: null
                    }
                }
            }
        }
    },

    // Chronicle 2: The Broker's Deal
    brokers_deal: {
        id: 'brokers_deal',
        title: "The Broker's Deal",
        description: 'A mysterious broker offers lucrative information, but at what cost?',
        
        background: `In the shadows of New Eden, information brokers hold power rivaling that of 
        empires. One such broker has reached out to you with an offer: valuable intelligence about 
        a hidden cache of pre-collapse technology, in exchange for a simple favor. But in New Eden, 
        nothing is ever simple.`,
        
        acts: [
            {
                id: 'act1',
                title: 'The Meeting',
                description: 'Meet with the mysterious broker',
                objectives: [
                    { id: 'find_broker', text: 'Locate the broker in the station', completed: false },
                    { id: 'hear_offer', text: 'Listen to the broker\'s proposal', completed: false }
                ]
            }
        ],
        
        rewards: {
            experience: 150,
            items: ['chronicle_datapad'],
            reputation: { broker: 100 }
        }
    },

    // Chronicle 3: Empyrean Age
    empyrean_age: {
        id: 'empyrean_age',
        title: 'Echoes of the Empyrean Age',
        description: 'Uncover secrets from the Empyrean War that still shape New Eden today.',
        
        background: `The Empyrean War changed everything. Capsuleers, once mere curiosities, became 
        the dominant military force in New Eden. But some secrets from that age remain buried. A 
        derelict station holds data that could shift the balance of power - if you can recover it.`,
        
        acts: [
            {
                id: 'act1',
                title: 'Lost Memories',
                description: 'Access the derelict station\'s archives',
                objectives: [
                    { id: 'reach_station', text: 'Navigate to the derelict station', completed: false },
                    { id: 'bypass_security', text: 'Bypass station security systems', completed: false },
                    { id: 'download_data', text: 'Download archived data', completed: false }
                ]
            }
        ],
        
        rewards: {
            experience: 300,
            items: ['datacores', 'chronicle_datapad'],
            skillPoints: 1000
        }
    }
};

/**
 * Get chronicle by ID
 */
function getChronicle(chronicleId) {
    return Chronicles[chronicleId] || null;
}

/**
 * Get all chronicles
 */
function getAllChronicles() {
    return Object.values(Chronicles);
}

/**
 * Get chronicle titles
 */
function getChronicleList() {
    return Object.values(Chronicles).map(c => ({
        id: c.id,
        title: c.title,
        description: c.description
    }));
}
