/**
 * Renderer - Handles all drawing operations
 */
class Renderer {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.tileSize = 32;
        this.camera = new Vector2D(0, 0);
    }

    clear() {
        this.ctx.fillStyle = '#000';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    setCamera(position) {
        // Center camera on position
        this.camera.x = position.x - this.canvas.width / 2;
        this.camera.y = position.y - this.canvas.height / 2;
    }

    worldToScreen(worldPos) {
        return new Vector2D(
            worldPos.x - this.camera.x,
            worldPos.y - this.camera.y
        );
    }

    drawRect(x, y, width, height, color) {
        this.ctx.fillStyle = color;
        this.ctx.fillRect(x, y, width, height);
    }

    drawCircle(x, y, radius, color) {
        this.ctx.fillStyle = color;
        this.ctx.beginPath();
        this.ctx.arc(x, y, radius, 0, Math.PI * 2);
        this.ctx.fill();
    }

    drawText(text, x, y, color = '#0ff', size = 12, align = 'left') {
        this.ctx.fillStyle = color;
        this.ctx.font = `${size}px 'Courier New', monospace`;
        this.ctx.textAlign = align;
        this.ctx.fillText(text, x, y);
    }

    drawTile(x, y, type) {
        const screenPos = this.worldToScreen(new Vector2D(x * this.tileSize, y * this.tileSize));
        
        let color;
        switch(type) {
            case 'floor':
                color = '#111';
                break;
            case 'wall':
                color = '#444';
                break;
            case 'door':
                color = '#080';
                break;
            case 'terminal':
                color = '#00f';
                break;
            case 'space':
                color = '#000';
                break;
            default:
                color = '#222';
        }

        this.drawRect(screenPos.x, screenPos.y, this.tileSize, this.tileSize, color);
        
        // Draw grid lines
        this.ctx.strokeStyle = '#333';
        this.ctx.strokeRect(screenPos.x, screenPos.y, this.tileSize, this.tileSize);
    }

    drawEntity(entity) {
        const screenPos = this.worldToScreen(entity.position);
        
        // Draw entity
        this.drawCircle(screenPos.x, screenPos.y, entity.radius, entity.color);
        
        // Draw health bar if not full
        if (entity.health < entity.maxHealth) {
            const barWidth = entity.radius * 2;
            const barHeight = 4;
            const barX = screenPos.x - entity.radius;
            const barY = screenPos.y - entity.radius - 10;
            
            // Background
            this.drawRect(barX, barY, barWidth, barHeight, '#333');
            
            // Health
            const healthWidth = (entity.health / entity.maxHealth) * barWidth;
            this.drawRect(barX, barY, healthWidth, barHeight, '#0f0');
        }

        // Draw name
        if (entity.name) {
            this.drawText(entity.name, screenPos.x, screenPos.y - entity.radius - 15, entity.nameColor || '#0ff', 10, 'center');
        }
    }

    drawParticle(particle) {
        const screenPos = this.worldToScreen(particle.position);
        this.ctx.globalAlpha = particle.alpha;
        this.drawCircle(screenPos.x, screenPos.y, particle.size, particle.color);
        this.ctx.globalAlpha = 1.0;
    }

    drawStarfield(stars) {
        stars.forEach(star => {
            this.ctx.fillStyle = `rgba(255, 255, 255, ${star.brightness})`;
            this.ctx.fillRect(star.x, star.y, star.size, star.size);
        });
    }
}
