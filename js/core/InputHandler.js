/**
 * InputHandler - Handles keyboard and mouse input
 */
class InputHandler {
    constructor() {
        this.keys = {};
        this.mousePos = new Vector2D(0, 0);
        this.mouseClick = false;
        
        this.setupListeners();
    }

    setupListeners() {
        // Keyboard events
        document.addEventListener('keydown', (e) => {
            this.keys[e.key.toLowerCase()] = true;
            
            // Prevent default for game controls
            if (['w', 'a', 's', 'd', 'arrowup', 'arrowdown', 'arrowleft', 'arrowright', 'i', 'e', ' '].includes(e.key.toLowerCase())) {
                e.preventDefault();
            }
        });

        document.addEventListener('keyup', (e) => {
            this.keys[e.key.toLowerCase()] = false;
        });

        // Mouse events
        document.addEventListener('mousemove', (e) => {
            this.mousePos.set(e.clientX, e.clientY);
        });

        document.addEventListener('mousedown', () => {
            this.mouseClick = true;
        });

        document.addEventListener('mouseup', () => {
            this.mouseClick = false;
        });
    }

    isKeyPressed(key) {
        return this.keys[key.toLowerCase()] === true;
    }

    getMousePosition() {
        return this.mousePos.clone();
    }

    isMouseClicked() {
        const clicked = this.mouseClick;
        this.mouseClick = false; // Reset after checking
        return clicked;
    }

    getMovementVector() {
        const movement = new Vector2D(0, 0);

        if (this.isKeyPressed('w') || this.isKeyPressed('arrowup')) {
            movement.y -= 1;
        }
        if (this.isKeyPressed('s') || this.isKeyPressed('arrowdown')) {
            movement.y += 1;
        }
        if (this.isKeyPressed('a') || this.isKeyPressed('arrowleft')) {
            movement.x -= 1;
        }
        if (this.isKeyPressed('d') || this.isKeyPressed('arrowright')) {
            movement.x += 1;
        }

        return movement.magnitude() > 0 ? movement.normalize() : movement;
    }

    reset() {
        this.keys = {};
        this.mouseClick = false;
    }

    resetKey(key) {
        this.keys[key.toLowerCase()] = false;
    }
}
