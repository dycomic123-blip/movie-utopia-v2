/**
 * Interactive Bubble Background (Gooey Effect)
 * Replaces Light Waves
 */

(function () {
    const CONFIG = {
        color: "139, 92, 246", // Purple-500 equivalent in RGB
        bubbleCount: 5,
        speed: 2
    };

    let canvas, ctx;
    let width, height;
    let particles = [];
    let animationId;
    let mouse = { x: -100, y: -100 };
    let currentMouse = { x: -100, y: -100 };

    class Particle {
        constructor(x, y, isMouse = false) {
            this.x = x || Math.random() * width;
            this.y = y || Math.random() * height;
            this.radius = isMouse ? 120 : 40 + Math.random() * 60;
            this.vx = isMouse ? 0 : (Math.random() - 0.5) * CONFIG.speed;
            this.vy = isMouse ? 0 : (Math.random() - 0.5) * CONFIG.speed;
            this.isMouse = isMouse;
            this.baseRadius = this.radius;
        }

        update() {
            // Move
            if (this.isMouse) {
                // Smooth follow
                this.x += (currentMouse.x - this.x) * 0.1;
                this.y += (currentMouse.y - this.y) * 0.1;
            } else {
                this.x += this.vx;
                this.y += this.vy;

                // Bounce off edges
                if (this.x < -this.radius) this.x = width + this.radius;
                if (this.x > width + this.radius) this.x = -this.radius;
                if (this.y < -this.radius) this.y = height + this.radius;
                if (this.y > height + this.radius) this.y = -this.radius;
            }
        }

        draw() {
            ctx.beginPath();
            const gradient = ctx.createRadialGradient(
                this.x, this.y, this.radius * 0.01,
                this.x, this.y, this.radius
            );

            // Interactive color mixing
            if (this.isMouse) {
                gradient.addColorStop(0, `rgba(236, 72, 153, 0.9)`); // Pink
                gradient.addColorStop(1, `rgba(236, 72, 153, 0)`);
            } else {
                gradient.addColorStop(0, `rgba(${CONFIG.color}, 0.8)`);
                gradient.addColorStop(1, `rgba(${CONFIG.color}, 0)`);
            }

            ctx.fillStyle = gradient;
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function initParticles() {
        particles = [];
        // Add floating bubbles
        for (let i = 0; i < CONFIG.bubbleCount; i++) {
            particles.push(new Particle());
        }
        // Add mouse bubble
        particles.push(new Particle(0, 0, true));
    }

    let isPaused = false;
    function checkVisibility() {
        const isOpacityZero = window.getComputedStyle(canvas).opacity === "0";
        isPaused = document.hidden || isOpacityZero;
    }

    function draw() {
        if (!isPaused) {
            ctx.clearRect(0, 0, width, height);

            // Dark background
            ctx.fillStyle = "rgb(10, 10, 12)"; // Very dark zinc
            ctx.fillRect(0, 0, width, height);

            // Draw particles
            particles.forEach(p => {
                p.update();
                p.draw();
            });
        }

        animationId = requestAnimationFrame(draw);
    }

    function resize() {
        const dpr = window.PerfManager ? window.PerfManager.dpr : 1;
        width = window.innerWidth * dpr;
        height = window.innerHeight * dpr;
        canvas.width = width;
        canvas.height = height;

        // Disable heavy blur filter in Lite Mode for performance
        if (window.PerfManager && window.PerfManager.isLiteMode) {
            canvas.style.filter = "none";
        } else {
            canvas.style.filter = "url('#goo-filter')";
        }

        initParticles();
    }

    function onMouseMove(e) {
        // Handle DPR scaling for mouse coordinates
        const dpr = window.PerfManager ? window.PerfManager.dpr : 1;
        currentMouse.x = e.clientX * dpr;
        currentMouse.y = e.clientY * dpr;
    }

    function init() {
        canvas = document.getElementById('bubbles-canvas');
        if (!canvas) return;
        ctx = canvas.getContext('2d', { alpha: false });

        // Add SVG filter to container dynamically if not present
        if (!document.getElementById('goo-filter')) {
            const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            svg.setAttribute("style", "position: absolute; width: 0; height: 0;");
            svg.innerHTML = `
                <defs>
                    <filter id="goo-filter">
                        <feGaussianBlur in="SourceGraphic" stdDeviation="30" result="blur" />
                        <feColorMatrix in="blur" mode="matrix" values="
                            1 0 0 0 0  
                            0 1 0 0 0  
                            0 0 1 0 0  
                            0 0 0 25 -10" result="goo" />
                        <feComposite in="SourceGraphic" in2="goo" operator="atop"/>
                    </filter>
                </defs>
            `;
            document.body.appendChild(svg);
        }

        window.addEventListener('resize', resize);
        window.addEventListener('perfModeChanged', resize);
        window.addEventListener('mousemove', onMouseMove);

        resize();
        setInterval(checkVisibility, 2000);
        draw();
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
