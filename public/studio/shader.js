const vertexShaderSource = `
    attribute vec2 position;
    void main() {
        gl_Position = vec4(position, 0.0, 1.0);
    }
`;

const fragmentShaderSource = `
    precision highp float;
    
    uniform vec2 iResolution;
    uniform float iTime;
    uniform float u_speed;
    uniform float u_intensity;
    uniform float u_complexity;
    uniform float u_colorShift;

    // Tonemapping (ACES Filmic Approximation)
    vec3 aces(vec3 color) {
        const mat3 M1 = mat3(
            0.59719, 0.07600, 0.02840,
            0.35458, 0.90834, 0.13383,
            0.04823, 0.01566, 0.83777
        );
        const mat3 M2 = mat3(
            1.60475, -0.10208, -0.00327,
           -0.53108,  1.10813, -0.07276,
           -0.07367, -0.00605,  1.07602
        );
        vec3 v = M1 * color;
        vec3 a = v * (v + 0.0245786) - 0.000090537;
        vec3 b = v * (0.983729 * v + 0.4329510) + 0.238081;
        return M2 * (a / b);
    }

    // Dot Noise
    float dot_noise(vec3 p) {
        const float PHI = 1.618033988;
        const mat3 GOLD = mat3(
            -0.571464913, +0.814921382, +0.096597072,
            -0.278044873, -0.303026659, +0.911518454,
            +0.772087367, +0.494042493, +0.399753815
        );
        return dot(cos(GOLD * p), sin(PHI * p * GOLD));
    }

    mat2 rot(float a) {
        float c = cos(a), s = sin(a);
        return mat2(c, -s, s,  c);
    }

    void main() {
        vec2 fragCoord = gl_FragCoord.xy;
        float t = -iTime * u_speed - 500.0;
        
        // Normalized device coords
        vec2 uv = (fragCoord.xy / iResolution.xy) * 2.0 - 1.0;
        uv.x *= iResolution.x / iResolution.y;

        vec3 d = normalize(vec3(2.0 * fragCoord - iResolution.xy, iResolution.y)); 
        // Correcting ray direction logic for standard GLSL from shadertoy style
        // The original code: vec3 d = normalize(vec3(2.0 * fragCoord, 0.0) - iResolution.xyy); 
        // This looks a bit odd for standard webgl without the implicit z setup of shadertoy, 
        // assuming standard full quad draw.
        // Let's stick closer to the extracted logic but ensure types are correct.
        
        vec3 d_orig = normalize(vec3(2.0 * fragCoord, 0.0) - vec3(iResolution.xy, 0.0));
        // Actually, let's use a standard UV based ray setup which is more robust
        d = normalize(vec3(uv, -1.0)); // Forward is -Z usually, but effects vary. 
        // Let's try to match the exact shadcn math:
        // shadcn: vec3 d = normalize(vec3(2.0 * fragCoord, 0.0) - iResolution.xyy);
        // iResolution.xyy is (w, h, h). 
        // 2*coord - (w,h,h) -> (2x-w, 2y-h, -h). 
        // So z is fixed at -h. 
        d = normalize(vec3((fragCoord.xy * 2.0 - iResolution.xy), -iResolution.y));      

        vec3 p = vec3(0.0, 0.0, t);
        vec3 l = vec3(0.0); 

        for (int i = 0; i < 150; i++) {
            if (float(i) >= 150.0 * u_complexity) break;

            vec3 rp = p;
            p.xy *= rot(p.z * 0.0001);

            float s = abs(dot_noise(rp) + (p.y)) * 0.1 + 0.015;

            p += d * s;

            l += (sin(p.z * 0.5 - vec3(0.5, 0.8, 0.9) * u_colorShift) /
                 (abs(s * 0.001) + 1e-6))
                 + 0.3 * vec3(7, 4, 1) /
                 (length(uv + vec2(-1.0 + 2.0 * smoothstep(-1.0, 1.0, sin(t * 0.50)),
                                   -0.4 + sin(t * 0.25) * 0.3))
                  * (1e-3 * abs(sin(t * 0.4) * 0.5 + 2.0)));
        }

        gl_FragColor = vec4(pow(aces(l * l * u_intensity / 3e12), vec3(1.0 / 2.2)), 1.0);
    }
`;

function initShader() {
    const canvas = document.getElementById('hero-canvas');
    if (!canvas) return;

    const gl = canvas.getContext('webgl');
    if (!gl) {
        console.error('WebGL not supported');
        return;
    }

    // Config (can be exposed or tweaked)
    const config = {
        speed: 1.0,
        intensity: 1.0,
        complexity: 1.0,
        colorShift: 1.0
    };

    function createShader(gl, type, source) {
        const shader = gl.createShader(type);
        gl.shaderSource(shader, source);
        gl.compileShader(shader);
        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            console.error('Shader compile error:', gl.getShaderInfoLog(shader));
            gl.deleteShader(shader);
            return null;
        }
        return shader;
    }

    const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);

    const program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.error('Program link error:', gl.getProgramInfoLog(program));
        return;
    }

    gl.useProgram(program);

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    // Full screen quad
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
        -1.0, -1.0,
        1.0, -1.0,
        -1.0, 1.0,
        1.0, 1.0,
    ]), gl.STATIC_DRAW);

    const positionLocation = gl.getAttribLocation(program, 'position');
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    const locations = {
        iResolution: gl.getUniformLocation(program, 'iResolution'),
        iTime: gl.getUniformLocation(program, 'iTime'),
        u_speed: gl.getUniformLocation(program, 'u_speed'),
        u_intensity: gl.getUniformLocation(program, 'u_intensity'),
        u_complexity: gl.getUniformLocation(program, 'u_complexity'),
        u_colorShift: gl.getUniformLocation(program, 'u_colorShift')
    };

    function resize() {
        const dpr = window.PerfManager ? window.PerfManager.dpr : (window.devicePixelRatio || 1);
        canvas.width = window.innerWidth * dpr;
        canvas.height = window.innerHeight * dpr;
        gl.viewport(0, 0, canvas.width, canvas.height);
    }

    window.addEventListener('resize', resize);
    window.addEventListener('perfModeChanged', resize);
    resize();

    const startTime = performance.now();
    let isPaused = false;

    function checkVisibility() {
        const rect = canvas.getBoundingClientRect();
        const isInView = (
            rect.bottom >= 0 &&
            rect.right >= 0 &&
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.left <= (window.innerWidth || document.documentElement.clientWidth)
        );
        const isOpacityZero = window.getComputedStyle(canvas).opacity === "0";
        isPaused = document.hidden || !isInView || isOpacityZero;
    }

    function render() {
        if (!isPaused) {
            const time = (performance.now() - startTime) / 1000.0;

            gl.uniform2f(locations.iResolution, canvas.width, canvas.height);
            gl.uniform1f(locations.iTime, time);
            gl.uniform1f(locations.u_speed, config.speed);
            gl.uniform1f(locations.u_intensity, config.intensity);
            gl.uniform1f(locations.u_complexity, window.PerfManager && window.PerfManager.isLiteMode ? 0.4 : config.complexity);
            gl.uniform1f(locations.u_colorShift, config.colorShift);

            gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
        }
        requestAnimationFrame(render);
    }

    // Performance polling
    setInterval(checkVisibility, 1000);
    render();
}

document.addEventListener('DOMContentLoaded', initShader);
