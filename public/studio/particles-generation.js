// Particle Animation System for Video Generation
// Creates a dynamic particle network effect during video generation

class ParticleSystem {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) {
            console.error(`Canvas with id "${canvasId}" not found`);
            return;
        }

        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.animationId = null;
        this.isRunning = false;

        // Configuration
        this.config = {
            particleCount: 80,
            particleSize: 2,
            particleColor: 'rgba(255, 107, 53, 0.8)', // Orange
            connectionColor: 'rgba(255, 107, 53, 0.15)',
            connectionDistance: 120,
            particleSpeed: 0.3,
            glowColor: 'rgba(255, 107, 53, 0.4)'
        };

        this.resize();
        window.addEventListener('resize', () => this.resize());
    }

    resize() {
        if (!this.canvas) return;
        this.canvas.width = this.canvas.offsetWidth;
        this.canvas.height = this.canvas.offsetHeight;
    }

    createParticles() {
        this.particles = [];
        for (let i = 0; i < this.config.particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * this.config.particleSpeed,
                vy: (Math.random() - 0.5) * this.config.particleSpeed,
                size: Math.random() * this.config.particleSize + 1
            });
        }
    }

    updateParticles() {
        this.particles.forEach(particle => {
            // Update position
            particle.x += particle.vx;
            particle.y += particle.vy;

            // Bounce off edges
            if (particle.x < 0 || particle.x > this.canvas.width) {
                particle.vx *= -1;
            }
            if (particle.y < 0 || particle.y > this.canvas.height) {
                particle.vy *= -1;
            }

            // Keep particles within bounds
            particle.x = Math.max(0, Math.min(this.canvas.width, particle.x));
            particle.y = Math.max(0, Math.min(this.canvas.height, particle.y));
        });
    }

    drawParticles() {
        this.particles.forEach(particle => {
            // Draw glow
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size * 3, 0, Math.PI * 2);
            this.ctx.fillStyle = this.config.glowColor;
            this.ctx.fill();

            // Draw particle
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fillStyle = this.config.particleColor;
            this.ctx.fill();
        });
    }

    drawConnections() {
        for (let i = 0; i < this.particles.length; i++) {
            for (let j = i + 1; j < this.particles.length; j++) {
                const dx = this.particles[i].x - this.particles[j].x;
                const dy = this.particles[i].y - this.particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < this.config.connectionDistance) {
                    const opacity = 1 - (distance / this.config.connectionDistance);
                    this.ctx.beginPath();
                    this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
                    this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
                    this.ctx.strokeStyle = this.config.connectionColor.replace('0.15', opacity * 0.15);
                    this.ctx.lineWidth = 1;
                    this.ctx.stroke();
                }
            }
        }
    }

    animate() {
        if (!this.isRunning) return;

        // Clear canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Update and draw
        this.updateParticles();
        this.drawConnections();
        this.drawParticles();

        // Continue animation
        this.animationId = requestAnimationFrame(() => this.animate());
    }

    start() {
        if (this.isRunning) return;
        this.isRunning = true;
        this.createParticles();
        this.animate();
    }

    stop() {
        this.isRunning = false;
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
            this.animationId = null;
        }
        if (this.ctx) {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        }
    }

    destroy() {
        this.stop();
        window.removeEventListener('resize', () => this.resize());
    }
}

// Global particle system instance
let generationParticleSystem = null;

// Initialize particle system for video generation
function initGenerationParticles() {
    if (!generationParticleSystem) {
        generationParticleSystem = new ParticleSystem('generation-particles-canvas');
    }
}

// Show particle animation
function showParticleAnimation() {
    const container = document.getElementById('generation-particle-container');
    if (container) {
        container.classList.remove('hidden');
        container.classList.add('flex');
    }

    initGenerationParticles();
    if (generationParticleSystem) {
        generationParticleSystem.start();
    }
}

// Hide particle animation
function hideParticleAnimation() {
    const container = document.getElementById('generation-particle-container');
    if (container) {
        container.classList.add('hidden');
        container.classList.remove('flex');
    }

    if (generationParticleSystem) {
        generationParticleSystem.stop();
    }
}

// Update generation progress
function updateGenerationProgress(percentage, estimatedMinutes) {
    const progressText = document.getElementById('generation-progress-text');
    const timeText = document.getElementById('generation-time-text');

    if (progressText) {
        progressText.textContent = `${percentage}%`;
    }

    if (timeText && estimatedMinutes) {
        timeText.textContent = `预计等待: ${estimatedMinutes} 分钟`;
    }
}

// Simulate generation progress (for demo purposes)
function simulateGenerationProgress() {
    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 10;
        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
            setTimeout(() => {
                hideParticleAnimation();
            }, 500);
        }

        const estimatedTime = Math.max(1, Math.ceil((100 - progress) / 50 * 3));
        updateGenerationProgress(Math.floor(progress), estimatedTime);
    }, 800);
}
