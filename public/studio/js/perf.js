/**
 * Performance Manager
 * Handles Lite Mode state, resolution scaling, and global render settings.
 */

(function () {
    // Persistent state
    const PERF_KEY = 'utopia_perf_mode';
    let isLiteMode = localStorage.getItem(PERF_KEY) === 'true';

    const state = {
        get isLiteMode() { return isLiteMode; },
        set isLiteMode(val) {
            isLiteMode = val;
            localStorage.setItem(PERF_KEY, val);
            this.applyMode();
        },

        // Resolution multiplier
        get dpr() {
            return isLiteMode ? 0.5 : (window.devicePixelRatio || 1);
        },

        applyMode() {
            if (isLiteMode) {
                document.body.classList.add('lite-mode');
            } else {
                document.body.classList.remove('lite-mode');
            }

            // Dispatch event for other scripts to respond
            window.dispatchEvent(new CustomEvent('perfModeChanged', { detail: { isLiteMode } }));
            this.updateButtonUI();
        },

        updateButtonUI() {
            const btn = document.getElementById('perf-toggle-text');
            if (btn) {
                btn.textContent = isLiteMode ? (window.currentLang === 'en' ? 'SPEED' : '流畅') : (window.currentLang === 'en' ? 'HIGH' : '高质');
            }
        },

        toggle() {
            this.isLiteMode = !this.isLiteMode;
        }
    };

    // Expose globally
    window.PerfManager = state;

    // Initial apply
    document.addEventListener('DOMContentLoaded', () => {
        state.applyMode();
    });
})();
