/**
 * Main entry point for EVE Chronicle RPG
 */

let gameEngine = null;

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', () => {
    console.log('EVE Chronicle RPG - Initializing...');
    
    // Setup menu buttons
    const startButton = document.getElementById('start-game');
    const loadButton = document.getElementById('load-game');
    const aboutButton = document.getElementById('about');
    
    startButton.addEventListener('click', startGame);
    loadButton.addEventListener('click', showLoadGame);
    aboutButton.addEventListener('click', showAbout);
});

function startGame() {
    console.log('Starting game...');
    
    // Show faction selection dialog
    showFactionSelection();
}

function showFactionSelection() {
    const titleScreen = document.getElementById('title-screen');
    const menuOptions = document.getElementById('menu-options');
    
    // Replace menu with faction selection
    menuOptions.innerHTML = '<h2 style="color: #ff0; margin-bottom: 20px;">Choose Your Faction</h2>';
    
    const factions = getAllFactionNames();
    factions.forEach(factionName => {
        const factionData = getFaction(factionName);
        const button = document.createElement('button');
        button.textContent = factionData.name;
        button.title = factionData.description;
        button.style.color = factionData.color;
        button.style.borderColor = factionData.color;
        button.addEventListener('click', () => selectFaction(factionName));
        menuOptions.appendChild(button);
    });
}

function selectFaction(faction) {
    console.log('Selected faction:', faction);
    
    // Hide title screen
    document.getElementById('title-screen').style.display = 'none';
    
    // Show game screen
    document.getElementById('game-screen').style.display = 'flex';
    
    // Initialize game engine
    gameEngine = new GameEngine();
    gameEngine.startNewGame(faction);
    
    // Show intro message
    showIntroMessage(faction);
}

function showIntroMessage(faction) {
    const factionData = getFaction(faction);
    
    // Create a temporary overlay with intro text
    const overlay = document.createElement('div');
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.background = 'rgba(0, 0, 0, 0.9)';
    overlay.style.display = 'flex';
    overlay.style.flexDirection = 'column';
    overlay.style.justifyContent = 'center';
    overlay.style.alignItems = 'center';
    overlay.style.zIndex = '1000';
    overlay.style.padding = '40px';
    
    overlay.innerHTML = `
        <h1 style="color: ${factionData.color}; font-size: 3em; margin-bottom: 30px;">${factionData.name}</h1>
        <p style="color: #0ff; max-width: 600px; text-align: center; line-height: 1.8; margin-bottom: 20px;">
            ${factionData.history}
        </p>
        <p style="color: #88f; max-width: 600px; text-align: center; line-height: 1.6; margin-bottom: 40px;">
            ${factionData.philosophy}
        </p>
        <button id="begin-journey" style="padding: 15px 40px; font-size: 1.2em; background: rgba(0, 255, 255, 0.2); 
            border: 2px solid #0ff; color: #0ff; cursor: pointer; font-family: 'Courier New', monospace;">
            Begin Your Journey
        </button>
    `;
    
    document.body.appendChild(overlay);
    
    document.getElementById('begin-journey').addEventListener('click', () => {
        overlay.remove();
    });
}

function showLoadGame() {
    alert('Load game feature coming soon!\n\nFor now, start a new campaign.');
}

function showAbout() {
    const overlay = document.createElement('div');
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.background = 'rgba(0, 0, 0, 0.95)';
    overlay.style.display = 'flex';
    overlay.style.flexDirection = 'column';
    overlay.style.justifyContent = 'center';
    overlay.style.alignItems = 'center';
    overlay.style.zIndex = '1000';
    overlay.style.padding = '40px';
    
    overlay.innerHTML = `
        <h1 style="color: #0ff; font-size: 2.5em; margin-bottom: 30px;">EVE CHRONICLE RPG</h1>
        <div style="color: #0ff; max-width: 700px; text-align: center; line-height: 1.8;">
            <p style="margin-bottom: 20px;">
                A top-down RPG set in the EVE Online universe, featuring rich lore and chronicle-based campaigns.
            </p>
            <h3 style="color: #ff0; margin: 30px 0 15px 0;">Controls</h3>
            <p style="margin-bottom: 10px;">WASD or Arrow Keys - Move</p>
            <p style="margin-bottom: 10px;">E - Interact with NPCs</p>
            <p style="margin-bottom: 10px;">Space - Attack</p>
            <p style="margin-bottom: 10px;">I - Open Inventory</p>
            
            <h3 style="color: #ff0; margin: 30px 0 15px 0;">About EVE Online</h3>
            <p style="margin-bottom: 20px;">
                EVE Online is a massively multiplayer online game set 20,000 years in the future. 
                This RPG explores the rich chronicles and lore of New Eden.
            </p>
            
            <h3 style="color: #ff0; margin: 30px 0 15px 0;">Credits</h3>
            <p style="margin-bottom: 20px;">
                Based on the EVE Online universe by CCP Games<br>
                Chronicles and lore inspired by official EVE fiction
            </p>
        </div>
        <button id="close-about" style="margin-top: 30px; padding: 15px 40px; font-size: 1.2em; 
            background: rgba(0, 255, 255, 0.2); border: 2px solid #0ff; color: #0ff; cursor: pointer; 
            font-family: 'Courier New', monospace;">
            Close
        </button>
    `;
    
    document.body.appendChild(overlay);
    
    document.getElementById('close-about').addEventListener('click', () => {
        overlay.remove();
    });
}

// Handle window resize
window.addEventListener('resize', () => {
    if (gameEngine) {
        // Could add canvas resize logic here
    }
});

// Prevent context menu on canvas
document.addEventListener('contextmenu', (e) => {
    if (e.target.tagName === 'CANVAS') {
        e.preventDefault();
    }
});
