/**
 * Dot Pattern Background
 * Ported from shadcn.io 
 * Interactive dot matrix with mouse-reactive glow effects and ambient wave animation
 */

(function () {
    const CONFIG = {
        dotSize: 2,
        gap: 24,
        baseColor: "#404040",
        glowColor: "#22d3ee",
        proximity: 120,
        glowIntensity: 1,
        waveSpeed: 0.5,
    };

    let canvas, ctx, container;
    let dots = [];
    let startTime = Date.now();
    let mouse = { x: -1000, y: -1000 };

    function hexToRgb(hex) {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16),
        } : { r: 0, g: 0, b: 0 };
    }

    const baseRgb = hexToRgb(CONFIG.baseColor);
    const glowRgb = hexToRgb(CONFIG.glowColor);

    function buildGrid() {
        if (!canvas || !container) return;
        const rect = container.getBoundingClientRect();
        const dpr = window.devicePixelRatio || 1;

        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
        canvas.style.width = `${rect.width}px`;
        canvas.style.height = `${rect.height}px`;

        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

        const cellSize = CONFIG.dotSize + CONFIG.gap;
        const cols = Math.ceil(rect.width / cellSize) + 1;
        const rows = Math.ceil(rect.height / cellSize) + 1;

        const offsetX = (rect.width - (cols - 1) * cellSize) / 2;
        const offsetY = (rect.height - (rows - 1) * cellSize) / 2;

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
        if (!ctx) return;
        const rect = container.getBoundingClientRect();
        ctx.clearRect(0, 0, rect.width, rect.height);

        ctx.fillStyle = "#0a0a0a"; // Match neutral-950/bg-primary
        ctx.fillRect(0, 0, rect.width, rect.height);

        const proxSq = CONFIG.proximity * CONFIG.proximity;
        const time = (Date.now() - startTime) * 0.001 * CONFIG.waveSpeed;

        dots.forEach(dot => {
            const dx = dot.x - mouse.x;
            const dy = dot.y - mouse.y;
            const distSq = dx * dx + dy * dy;

            const wave = Math.sin(dot.x * 0.02 + dot.y * 0.02 + time) * 0.5 + 0.5;
            const waveOpacity = dot.baseOpacity + wave * 0.15;
            const waveScale = 1 + wave * 0.2;

            let opacity = waveOpacity;
            let scale = waveScale;
            let r = baseRgb.r, g = baseRgb.g, b = baseRgb.b;
            let glow = 0;

            if (distSq < proxSq) {
                const dist = Math.sqrt(distSq);
                const t = 1 - dist / CONFIG.proximity;
                const easedT = t * t * (3 - 2 * t);

                r = Math.round(baseRgb.r + (glowRgb.r - baseRgb.r) * easedT);
                g = Math.round(baseRgb.g + (glowRgb.g - baseRgb.g) * easedT);
                b = Math.round(baseRgb.b + (glowRgb.b - baseRgb.b) * easedT);

                opacity = Math.min(1, waveOpacity + easedT * 0.7);
                scale = waveScale + easedT * 0.8;
                glow = easedT * CONFIG.glowIntensity;
            }

            const radius = (CONFIG.dotSize / 2) * scale;

            if (glow > 0) {
                const gradient = ctx.createRadialGradient(dot.x, dot.y, 0, dot.x, dot.y, radius * 4);
                gradient.addColorStop(0, `rgba(${glowRgb.r}, ${glowRgb.g}, ${glowRgb.b}, ${glow * 0.4})`);
                gradient.addColorStop(0.5, `rgba(${glowRgb.r}, ${glowRgb.g}, ${glowRgb.b}, ${glow * 0.1})`);
                gradient.addColorStop(1, `rgba(${glowRgb.r}, ${glowRgb.g}, ${glowRgb.b}, 0)`);
                ctx.beginPath();
                ctx.arc(dot.x, dot.y, radius * 4, 0, Math.PI * 2);
                ctx.fillStyle = gradient;
                ctx.fill();
            }

            ctx.beginPath();
            ctx.arc(dot.x, dot.y, radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${opacity})`;
            ctx.fill();
        });

        requestAnimationFrame(draw);
    }

    function init() {
        canvas = document.getElementById('dot-pattern-canvas');
        if (!canvas) return;
        container = document.body;
        ctx = canvas.getContext('2d');

        window.addEventListener('resize', buildGrid);
        window.addEventListener('mousemove', (e) => {
            const rect = canvas.getBoundingClientRect();
            mouse.x = e.clientX - rect.left;
            mouse.y = e.clientY - rect.top;
        });
        window.addEventListener('mouseleave', () => {
            mouse.x = -1000;
            mouse.y = -1000;
        });

        buildGrid();
        draw();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
