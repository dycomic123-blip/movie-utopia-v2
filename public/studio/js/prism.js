/**
 * Prism Background Effect
 * Floating particles with spectral colors to mimic light dispersion
 */

(function () {
    const CONFIG = {
        starCount: 40,
        speed: 0.15,
        colors: ["#2dd4bf", "#8b5cf6", "#f472b6", "#fbbf24"] // Cyan, Violet, Pink, Amber (Spectral vibes)
    };

    let canvas, ctx;
    let width, height;
    let particles = [];
    let animationId;

    class Particle {
        constructor() {
            this.init();
        }

        init() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            // Triangularprism-ish shapes
            this.size = Math.random() * 80 + 20;
            this.vx = (Math.random() - 0.5) * CONFIG.speed;
            this.vy = (Math.random() - 0.5) * CONFIG.speed;
            this.rotation = Math.random() * Math.PI * 2;
            this.rotationSpeed = (Math.random() - 0.5) * 0.002;
            this.color = CONFIG.colors[Math.floor(Math.random() * CONFIG.colors.length)];
            this.opacity = Math.random() * 0.15 + 0.05;
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;
            this.rotation += this.rotationSpeed;

            // Wrap around screen
            if (this.x < -100) this.x = width + 100;
            if (this.x > width + 100) this.x = -100;
            if (this.y < -100) this.y = height + 100;
            if (this.y > height + 100) this.y = -100;
        }

        draw() {
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(this.rotation);
            ctx.globalAlpha = this.opacity;
            ctx.fillStyle = this.color;

            // Draw Triangle
            ctx.beginPath();
            ctx.moveTo(0, -this.size / 2);
            ctx.lineTo(this.size / 2, this.size / 2);
            ctx.lineTo(-this.size / 2, this.size / 2);
            ctx.closePath();
            ctx.fill();

            // Add a subtle border for "refraction" look
            ctx.strokeStyle = "rgba(255,255,255,0.1)";
            ctx.lineWidth = 1;
            ctx.stroke();

            ctx.restore();
        }
    }

    function initParticles() {
        particles = [];
        for (let i = 0; i < CONFIG.starCount; i++) {
            particles.push(new Particle());
        }
    }

    function draw() {
        // Clear with trail effect for smoothness
        ctx.fillStyle = "rgba(6, 0, 16, 1)"; // Very dark purple/black background from React Bits Prism
        ctx.fillRect(0, 0, width, height);

        // Add a central glow
        const gradient = ctx.createRadialGradient(width / 2, height / 2, 0, width / 2, height / 2, width * 0.8);
        gradient.addColorStop(0, "rgba(45, 20, 85, 0.2)");
        gradient.addColorStop(1, "transparent");
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);

        ctx.globalCompositeOperation = "screen"; // Additive blending for light effect

        particles.forEach(p => {
            p.update();
            p.draw();
        });

        ctx.globalCompositeOperation = "source-over"; // Reset

        animationId = requestAnimationFrame(draw);
    }

    function resize() {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
        initParticles();
    }

    function init() {
        canvas = document.getElementById('prism-canvas');
        if (!canvas) {
            console.error("Prism canvas not found");
            return;
        }
        ctx = canvas.getContext('2d');

        window.addEventListener('resize', resize);
        resize();
        draw();
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
