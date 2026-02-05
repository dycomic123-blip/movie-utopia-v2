/**
 * Light Waves Background Effect
 * Ported from shadcn.io React component to Vanilla JS
 */

(function () {
    const CONFIG = {
        colors: ["#0ea5e9", "#8b5cf6", "#06b6d4", "#a855f7", "#0284c7"],
        speed: 1,
        intensity: 0.6
    };

    let canvas, ctx;
    let width, height;
    let waves = [];
    let animationId;
    let startTime = Date.now();

    function hexToRgb(hex) {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        if (!result) return { r: 255, g: 255, b: 255 };
        return {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16),
        };
    }

    function initWaves(h) {
        waves = [];
        const waveCount = 5;

        for (let i = 0; i < waveCount; i++) {
            waves.push({
                y: h * (0.3 + (i / waveCount) * 0.5),
                amplitude: h * (0.15 + Math.random() * 0.15),
                frequency: 0.002 + Math.random() * 0.002,
                speed: (0.2 + Math.random() * 0.3) * (i % 2 === 0 ? 1 : -1),
                phase: Math.random() * Math.PI * 2,
                color: CONFIG.colors[i % CONFIG.colors.length],
                opacity: 0.15 + Math.random() * 0.1,
            });
        }
    }

    let isPaused = false;
    function checkVisibility() {
        const isOpacityZero = window.getComputedStyle(canvas).opacity === "0";
        isPaused = document.hidden || isOpacityZero;
    }

    function draw() {
        if (!isPaused) {
            const time = (Date.now() - startTime) * 0.001 * CONFIG.speed;

            // Dark gradient background
            const bgGradient = ctx.createLinearGradient(0, 0, 0, height);
            bgGradient.addColorStop(0, "#030712");
            bgGradient.addColorStop(0.5, "#0a0f1a");
            bgGradient.addColorStop(1, "#030712");
            ctx.fillStyle = bgGradient;
            ctx.fillRect(0, 0, width, height);

            // Draw ambient glow spots
            ctx.globalCompositeOperation = "lighter";

            const glowSpots = [
                { x: width * 0.2, y: height * 0.3, radius: Math.min(width, height) * 0.4, color: CONFIG.colors[0] },
                { x: width * 0.8, y: height * 0.6, radius: Math.min(width, height) * 0.35, color: CONFIG.colors[1] },
                { x: width * 0.5, y: height * 0.8, radius: Math.min(width, height) * 0.3, color: CONFIG.colors[2] },
            ];

            for (const spot of glowSpots) {
                const rgb = hexToRgb(spot.color);
                const gradient = ctx.createRadialGradient(
                    spot.x + Math.sin(time * 0.3) * 50,
                    spot.y + Math.cos(time * 0.2) * 30,
                    0,
                    spot.x + Math.sin(time * 0.3) * 50,
                    spot.y + Math.cos(time * 0.2) * 30,
                    spot.radius
                );
                gradient.addColorStop(0, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${0.08 * CONFIG.intensity})`);
                gradient.addColorStop(0.5, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${0.03 * CONFIG.intensity})`);
                gradient.addColorStop(1, "transparent");
                ctx.fillStyle = gradient;
                ctx.fillRect(0, 0, width, height);
            }

            // Draw flowing waves
            for (const wave of waves) {
                const rgb = hexToRgb(wave.color);

                ctx.beginPath();
                ctx.moveTo(0, height);

                // Create wave path
                for (let x = 0; x <= width; x += (window.PerfManager && window.PerfManager.isLiteMode ? 10 : 5)) {
                    const y =
                        wave.y +
                        Math.sin(x * wave.frequency + time * wave.speed + wave.phase) * wave.amplitude +
                        Math.sin(x * wave.frequency * 0.5 + time * wave.speed * 0.7 + wave.phase * 1.3) * wave.amplitude * 0.5;

                    if (x === 0) {
                        ctx.moveTo(x, y);
                    } else {
                        ctx.lineTo(x, y);
                    }
                }

                // Complete the shape
                ctx.lineTo(width, height);
                ctx.lineTo(0, height);
                ctx.closePath();

                // Fill with gradient
                const waveGradient = ctx.createLinearGradient(0, wave.y - wave.amplitude, 0, height);
                waveGradient.addColorStop(0, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${wave.opacity * CONFIG.intensity})`);
                waveGradient.addColorStop(0.3, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${wave.opacity * 0.5 * CONFIG.intensity})`);
                waveGradient.addColorStop(1, "transparent");

                ctx.fillStyle = waveGradient;
                ctx.fill();
            }

            // Add subtle top glow
            ctx.globalCompositeOperation = "source-over";
            const topGlow = ctx.createLinearGradient(0, 0, 0, height * 0.4);
            const color0 = hexToRgb(CONFIG.colors[0]);
            topGlow.addColorStop(0, `rgba(${color0.r}, ${color0.g}, ${color0.b}, ${0.05 * CONFIG.intensity})`);
            topGlow.addColorStop(1, "transparent");
            ctx.fillStyle = topGlow;
            ctx.fillRect(0, 0, width, height * 0.4);
        }

        animationId = requestAnimationFrame(draw);
    }

    function resize() {
        const dpr = window.PerfManager ? window.PerfManager.dpr : 1;
        width = window.innerWidth * dpr;
        height = window.innerHeight * dpr;
        canvas.width = width;
        canvas.height = height;
        initWaves(height);
    }

    function init() {
        canvas = document.getElementById('waves-canvas');
        if (!canvas) return;
        ctx = canvas.getContext('2d', { alpha: false }); // Performance hint

        window.addEventListener('resize', resize);
        window.addEventListener('perfModeChanged', resize);
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
