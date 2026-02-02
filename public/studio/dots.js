/**
 * Dot Pattern Background
 * Ported from shadcn.io React component to Vanilla JS
 */

(function () {
    const CONFIG = {
        dotSize: 2,
        gap: 24,
        baseColor: "#404040",
        glowColor: "#22d3ee",
        proximity: 120, // Mouse proximity radius
        glowIntensity: 1,
        waveSpeed: 0.5
    };

    let canvas, ctx;
    let width, height;
    let dots = [];
    let animationId;
    let mouse = { x: -1000, y: -1000 };
    let startTime = Date.now();
    let baseRgb, glowRgb;

    function hexToRgb(hex) {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result
            ? {
                r: parseInt(result[1], 16),
                g: parseInt(result[2], 16),
                b: parseInt(result[3], 16),
            }
            : { r: 0, g: 0, b: 0 };
    }

    function initColors() {
        baseRgb = hexToRgb(CONFIG.baseColor);
        glowRgb = hexToRgb(CONFIG.glowColor);
    }

    let isPaused = false;
    function checkVisibility() {
        const isOpacityZero = window.getComputedStyle(canvas).opacity === "0";
        isPaused = document.hidden || isOpacityZero;
    }

    function buildGrid() {
        if (!canvas) return;

        const dpr = window.PerfManager ? window.PerfManager.dpr : (window.devicePixelRatio || 1);
        width = window.innerWidth;
        height = window.innerHeight;

        canvas.width = width * dpr;
        canvas.height = height * dpr;
        canvas.style.width = width + 'px';
        canvas.style.height = height + 'px';

        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

        const cellSize = CONFIG.dotSize + (window.PerfManager && window.PerfManager.isLiteMode ? CONFIG.gap * 1.5 : CONFIG.gap);
        const cols = Math.ceil(width / cellSize) + 1;
        const rows = Math.ceil(height / cellSize) + 1;

        const offsetX = (width - (cols - 1) * cellSize) / 2;
        const offsetY = (height - (rows - 1) * cellSize) / 2;

        dots = [];
        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                dots.push({
                    x: offsetX + col * cellSize,
                    y: offsetY + row * cellSize,
                    baseOpacity: 0.3 + Math.random() * 0.2,
                });
            }
        }
    }

    function draw() {
        if (!ctx || isPaused) {
            animationId = requestAnimationFrame(draw);
            return;
        }

        // Clear canvas
        ctx.clearRect(0, 0, width, height);

        // Dark background (Neutral-950 equivalent)
        ctx.fillStyle = "#0a0a0a";
        ctx.fillRect(0, 0, width, height);

        const { x: mx, y: my } = mouse;
        const proxSq = CONFIG.proximity * CONFIG.proximity;
        const time = (Date.now() - startTime) * 0.001 * CONFIG.waveSpeed;

        const isLite = window.PerfManager && window.PerfManager.isLiteMode;

        for (const dot of dots) {
            const dx = dot.x - mx;
            const dy = dot.y - my;
            const distSq = dx * dx + dy * dy;

            // Wave animation (simplified in Lite Mode)
            const wave = Math.sin(dot.x * 0.02 + dot.y * 0.02 + time) * 0.5 + 0.5;
            const waveOpacity = dot.baseOpacity + wave * 0.15;
            const waveScale = 1 + wave * 0.2;

            let opacity = waveOpacity;
            let scale = waveScale;
            let r = baseRgb.r;
            let g = baseRgb.g;
            let b = baseRgb.b;
            let glow = 0;

            // Mouse proximity effect
            if (distSq < proxSq) {
                const dist = Math.sqrt(distSq);
                const t = 1 - dist / CONFIG.proximity;
                const easedT = t * t * (3 - 2 * t); // smoothstep

                // Interpolate color
                r = Math.round(baseRgb.r + (glowRgb.r - baseRgb.r) * easedT);
                g = Math.round(baseRgb.g + (glowRgb.g - baseRgb.g) * easedT);
                b = Math.round(baseRgb.b + (glowRgb.b - baseRgb.b) * easedT);

                opacity = Math.min(1, waveOpacity + easedT * 0.7);
                scale = waveScale + easedT * 0.8;
                glow = easedT * CONFIG.glowIntensity;
            }

            const radius = (CONFIG.dotSize / 2) * scale;

            // Draw glow (skipped in Lite Mode)
            if (glow > 0 && !isLite) {
                const gradient = ctx.createRadialGradient(
                    dot.x, dot.y, 0,
                    dot.x, dot.y, radius * 4
                );
                gradient.addColorStop(0, `rgba(${glowRgb.r}, ${glowRgb.g}, ${glowRgb.b}, ${glow * 0.4})`);
                gradient.addColorStop(0.5, `rgba(${glowRgb.r}, ${glowRgb.g}, ${glowRgb.b}, ${glow * 0.1})`);
                gradient.addColorStop(1, `rgba(${glowRgb.r}, ${glowRgb.g}, ${glowRgb.b}, 0)`);

                ctx.beginPath();
                ctx.arc(dot.x, dot.y, radius * 4, 0, Math.PI * 2);
                ctx.fillStyle = gradient;
                ctx.fill();
            }

            // Draw dot
            ctx.beginPath();
            ctx.arc(dot.x, dot.y, radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${opacity})`;
            ctx.fill();
        }

        animationId = requestAnimationFrame(draw);
    }

    function init() {
        canvas = document.getElementById('dots-canvas');
        if (!canvas) return;
        ctx = canvas.getContext('2d', { alpha: false });

        initColors();

        window.addEventListener('resize', buildGrid);
        window.addEventListener('perfModeChanged', buildGrid);

        window.addEventListener('mousemove', (e) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        });

        window.addEventListener('mouseleave', () => {
            mouse.x = -1000;
            mouse.y = -1000;
        });

        buildGrid();
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
