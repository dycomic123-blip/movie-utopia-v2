// Navigation Logic
function hideAllViews() {
    document.querySelectorAll('.view-section').forEach(el => el.classList.remove('active'));
}

function updateNavbar(state) {
    const navLanding = document.getElementById('nav-landing');
    const navApp = document.getElementById('nav-app');

    if (state === 'landing') {
        navLanding.classList.remove('hidden');
        navApp.classList.add('hidden');
    } else {
        navLanding.classList.add('hidden');
        navApp.classList.remove('hidden');
        navApp.classList.add('flex');
    }
}

function setBodyState(state) {
    document.body.classList.remove('state-landing', 'state-input', 'state-result', 'state-editor');
    document.body.classList.add(`state-${state}`);

    // Maintain legacy class for compatibility if needed, or remove if migrated
    if (state === 'landing') {
        document.body.classList.add('on-landing');
        document.body.style.overflow = 'auto';
    } else if (state === 'result' || state === 'editor') {
        document.body.classList.remove('on-landing');
        document.body.style.overflow = 'hidden'; // Lock body scroll on app pages
    } else {
        document.body.classList.remove('on-landing');
        document.body.style.overflow = 'auto';
    }
}


// Utility for typing animation
function typeMessage(element, message, speed = 20, callback) {
    let i = 0;
    element.classList.add('typing-cursor');
    element.textContent = '';

    function type() {
        if (i < message.length) {
            element.textContent += message.charAt(i);
            i++;
            setTimeout(type, speed);
        } else {
            element.classList.remove('typing-cursor');
            if (callback) callback();
        }
    }
    type();
}

function goHome() {
    hideAllViews();
    document.getElementById('view-landing').classList.add('active');
    updateNavbar('landing');
    setBodyState('landing');
    window.scrollTo(0, 0);
}

function startApp() {
    hideAllViews();
    const inputView = document.getElementById('view-input');

    // Smooth Entrance Logic (Phase 69)
    inputView.classList.add('active');
    inputView.classList.add('view-entrance');

    // Force reflow
    inputView.offsetHeight;

    requestAnimationFrame(() => {
        inputView.classList.add('active-entrance');
    });

    updateNavbar('app');
    setBodyState('input');

    // Trigger dialog glow shortly after entrance (Phase 76)
    setTimeout(() => {
        const dialog = document.getElementById('main-dialog-container');
        if (dialog) dialog.classList.add('active-glow');
    }, 800);

    // Cleanup transition class after completion
    setTimeout(() => {
        inputView.classList.remove('view-entrance', 'active-entrance');
    }, 2200);
}

function generateVideo() {
    const btn = document.getElementById('btn-generate');
    const btnText = btn.querySelector('.btn-text');
    const icon = btn.querySelector('svg');

    let originalText = btnText.innerText;
    btnText.innerText = "Processing";
    if (icon) icon.classList.add('animate-spin');

    setTimeout(() => {
        // Collect tags for final prompt
        const text = document.getElementById('prompt-input').value;
        const finalPrompt = [...selectedTags, text].filter(Boolean).join(', ');
        console.log("Final Prompt:", finalPrompt);

        // Reset tags after generation
        selectedTags = [];
        updateGenerateButtonText();

        btnText.innerText = originalText;
        if (icon) icon.classList.remove('animate-spin');

        // Navigate to result view
        hideAllViews();
        document.getElementById('view-result').classList.add('active');
        setBodyState('result');

        // Update the prompt display in the parameter panel
        const promptDisplay = document.getElementById('current-prompt-display');
        if (promptDisplay) {
            promptDisplay.textContent = `"${finalPrompt}"`;
        }

        // Add user prompt to chat history
        addPromptToChatHistory(finalPrompt);

        // Start particle animation for video generation
        startVideoGeneration();

        // Add to history sidebar (Initial Video)
        // Use a random seed for the demo or pass a real one if available
        const initialSeed = Math.floor(Math.random() * 900000) + 100000;
        addToHistorySidebar('initial', finalPrompt, initialSeed);
    }, 1500);
}

// Make available globally
window.openProEditor = function () {
    console.log("Navigating to Pro Editor...");
    const editorView = document.getElementById('view-editor');
    if (!editorView) {
        console.error("Critical Error: #view-editor element not found in DOM!");
        alert("System Error: Editor View undefined. Please refresh.");
        return;
    }

    hideAllViews();
    editorView.classList.remove('hidden'); // Ensure it's not hidden via utility
    editorView.classList.add('active'); // Add standard active class
    // Force flex display if css classes are fighting
    editorView.style.display = 'flex';

    setBodyState('editor');

    // Safety check for layout
    requestAnimationFrame(() => {
        window.dispatchEvent(new Event('resize'));
    });
};

// Page 4 Interaction Logic
window.showClipMenu = function (e, title) {
    if (e) e.preventDefault(); // Stop native context menu

    const menu = document.getElementById('clip-context-menu');
    const titleEl = document.getElementById('menu-clip-title');

    if (menu && titleEl) {
        titleEl.textContent = title || "Clip Options";
        menu.classList.remove('hidden');

        // Calculate Position (Floating Popover)
        let x = e.clientX;
        let y = e.clientY;

        // Adjust if too close to right edge
        if (x + 350 > window.innerWidth) { // 350 is approx width
            x = x - 350;
        }

        // Adjust if too close to bottom
        if (y + 300 > window.innerHeight) {
            y = y - 300; // Shift up
        } else {
            y = y - 50; // Slight shift up for better visibility
        }

        menu.style.left = `${x}px`;
        menu.style.top = `${y}px`;

        // Animation
        requestAnimationFrame(() => {
            menu.classList.remove('opacity-0');
        });
    }
};

window.closeClipMenu = function () {
    const menu = document.getElementById('clip-context-menu');
    if (menu) {
        menu.classList.add('opacity-0');
        setTimeout(() => {
            menu.classList.add('hidden');
        }, 200);
    }
};

// Global Menu Dismissal
document.addEventListener('mousedown', function (e) {
    const menu = document.getElementById('clip-context-menu');
    if (menu && !menu.classList.contains('hidden')) {
        // If click is outside the menu panel, close it
        if (!menu.contains(e.target)) {
            closeClipMenu();
        }
    }
});

document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
        closeClipMenu();
        hideLoginModal();
    }
});

window.goBackToResult = function () {
    hideAllViews();

    // Hide Editor specifically ensuring display reset
    const editorView = document.getElementById('view-editor');
    if (editorView) {
        editorView.style.display = 'none';
        editorView.classList.remove('active');
    }

    const resultView = document.getElementById('view-result');
    if (resultView) {
        resultView.classList.add('active');
        resultView.style.display = ''; // Reset inline style
        setBodyState('result');
    } else {
        console.error("#view-result not found");
        startApp(); // Fallback
    }
};

function goBackToInput() {
    hideAllViews();
    const inputView = document.getElementById('view-input');
    inputView.classList.add('active');
    updateNavbar('app');
    setBodyState('input');
}

function goBackToResult() {
    hideAllViews();
    document.getElementById('view-result').classList.add('active');
    setBodyState('result');
}

// History Management Functions
function clearChatHistory() {
    const historyPanel = document.getElementById('chat-history-panel');
    if (historyPanel) {
        // Confirm before clearing
        if (confirm('确定要清除所有历史对话吗？')) {
            historyPanel.innerHTML = '<div class="text-center text-zinc-500 text-sm py-12">暂无历史记录</div>';
        }
    }
}

function toggleHistoryPanel() {
    const historyPanel = document.getElementById('chat-history-panel');
    if (historyPanel) {
        if (historyPanel.classList.contains('hidden')) {
            historyPanel.classList.remove('hidden');
        } else {
            historyPanel.classList.add('hidden');
        }
    }
}

// Add user prompt to chat history
function addPromptToChatHistory(prompt) {
    const historyPanel = document.getElementById('chat-history-panel');
    if (!historyPanel || !prompt) return;

    // Create user message bubble
    const messageGroup = document.createElement('div');
    messageGroup.className = 'flex flex-col gap-2';

    const userBubble = document.createElement('div');
    userBubble.className = 'self-end bg-white/5 border border-white/5 rounded-2xl rounded-tr-sm px-4 py-3 max-w-[90%]';
    userBubble.innerHTML = `<p class="text-xs font-light text-zinc-300 leading-relaxed">"${prompt}"</p>`;

    // Create AI response bubble (generating state)
    const aiBubble = document.createElement('div');
    aiBubble.className = 'self-start bg-orange-500/10 border border-orange-500/20 rounded-2xl rounded-tl-sm px-4 py-3 max-w-[90%]';

    // Initial content with typing placeholder
    aiBubble.innerHTML = `
        <div class="flex items-center gap-2 mb-2">
            <div class="w-4 h-4 rounded-full bg-orange-500 flex items-center justify-center text-[8px] font-bold text-black">AI</div>
            <span class="text-[10px] text-orange-400 font-medium">${translations[currentLang]?.ai_assistant || 'AI 助手'}</span>
        </div>
        <div class="ai-response-content flex flex-col gap-2">
            <div class="typing-target text-[10px] text-zinc-300"></div>
        </div>
    `;

    messageGroup.appendChild(userBubble);
    messageGroup.appendChild(aiBubble);

    const typingTarget = aiBubble.querySelector('.typing-target');
    const responseContent = aiBubble.querySelector('.ai-response-content');

    // Type out the initial response
    typeMessage(typingTarget, '正在为你构思场景...', 30, () => {
        // Once typed, show the loading state
        setTimeout(() => {
            const loadingHtml = `
                <div class="flex items-center gap-2 mt-2 pt-2 border-t border-white/5">
                    <div class="w-3 h-3 border-2 border-orange-500/30 border-t-orange-500 rounded-full animate-spin"></div>
                    <span class="text-[10px] text-zinc-500">正在生成视频...</span>
                </div>
            `;
            const div = document.createElement('div');
            div.innerHTML = loadingHtml;
            responseContent.appendChild(div.firstElementChild);
        }, 500);
    });

    // Append to history panel
    historyPanel.appendChild(messageGroup);

    // Scroll to bottom
    historyPanel.scrollTop = historyPanel.scrollHeight;
}

// Particle Animation Control (integrates with particles-generation.js)
function startVideoGeneration() {
    // Show particle animation with delay to ensure DOM is visible/sized
    setTimeout(() => {
        showParticleAnimation();
        if (generationParticleSystem) {
            generationParticleSystem.resize();
        }
    }, 100);

    // Update progress bar
    const progressBar = document.getElementById('generation-progress-bar');
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

        if (progressBar) {
            progressBar.style.width = `${progress}%`;
        }

        const estimatedTime = Math.max(1, Math.ceil((100 - progress) / 50 * 3));
        updateGenerationProgress(Math.floor(progress), estimatedTime);
    }, 800);
}

// Generate new video from Result page (Page 3)
function generateVideoFromResult() {
    const promptInput = document.getElementById('prompt-input-result');
    const prompt = promptInput.value.trim();

    if (!prompt) {
        alert('请输入提示词');
        return;
    }

    // Collect tags for final prompt
    const finalPrompt = [...selectedTags, prompt].filter(Boolean).join(', ');

    // Add prompt to chat history
    addPromptToChatHistory(finalPrompt);

    // Create new video generation card
    createNewVideoCard(finalPrompt);

    // Reset tags after generation
    selectedTags = [];
    updateGenerateButtonText();

    // Clear input
    promptInput.value = '';
}

// Create a new video generation card and prepend it to the container
function createNewVideoCard(prompt) {
    const container = document.getElementById('video-list-container');
    if (!container) return;

    // Generate random ID
    const videoId = '#' + Math.random().toString(36).substr(2, 5).toUpperCase();
    const seed = Math.floor(Math.random() * 1000000);

    // Create the video card HTML
    const videoCard = document.createElement('div');
    videoCard.id = `video-card-${videoId}`; // Assign ID for scrolling
    videoCard.className = 'w-[95%] max-w-5xl mb-12 unified-video-card generating snap-center shrink-0 rounded-3xl overflow-hidden';
    videoCard.innerHTML = `
        <div class="ambient-glow"></div>

        <div class="relative z-10 flex flex-col h-full">
            <!-- Top Status Bar -->
            <div class="card-status-bar flex items-center justify-between p-4 border-b border-white/5 bg-white/5 backdrop-blur-md">
                <!-- Left: Status as Orange Capsule -->
                <div class="px-3 py-1 rounded-full bg-orange-500 text-black text-[10px] font-bold uppercase tracking-wider shadow-[0_0_15px_rgba(249,115,22,0.4)] flex items-center gap-2 animate-pulse">
                    <div class="w-1.5 h-1.5 rounded-full bg-black"></div>
                    Generating ${videoId}
                </div>

                <!-- Right: Actions -->
                <div class="flex gap-2">
                    <button class="px-3 py-1.5 rounded-lg border border-white/5 bg-white/5 text-[10px] font-medium text-zinc-400 hover:text-white hover:bg-white/10 transition-all flex items-center gap-1.5 backdrop-blur-md">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                        <span data-i18n="export">Export</span>
                    </button>
                <button onclick="openProEditor()" class="px-3 py-1.5 rounded-lg bg-orange-500/10 border border-orange-500/20 text-[10px] font-bold text-orange-400 hover:bg-orange-500/20 hover:text-orange-300 transition-all flex items-center gap-1.5 backdrop-blur-md">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
                    <span data-i18n="edit_in_pro">Professional Editor</span>
                </button>
                </div>
            </div>

            <!-- Video Player / Generation Area -->
            <div class="flex-grow aspect-video relative overflow-hidden bg-black group">
                <div id="generation-particle-container-${videoId}" class="absolute inset-0 z-10 bg-black/80 backdrop-blur-sm">
                    <!-- 胶片动画 - 屏幕居中 -->
                    <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <div class="queueing-container" style="min-height: auto;">
                            <div class="film-frame" style="width: 240px; height: 153px;">
                                <!-- 顶部齿孔带 -->
                                <div class="sprocket-top" style="height: 9px;">
                                    <div class="sprocket-hole" style="width: 15px; height: 5px;"></div>
                                    <div class="sprocket-hole" style="width: 15px; height: 5px;"></div>
                                    <div class="sprocket-hole" style="width: 15px; height: 5px;"></div>
                                    <div class="sprocket-hole" style="width: 15px; height: 5px;"></div>
                                    <div class="sprocket-hole" style="width: 15px; height: 5px;"></div>
                                    <div class="sprocket-hole" style="width: 15px; height: 5px;"></div>
                                    <div class="sprocket-hole" style="width: 15px; height: 5px;"></div>
                                    <div class="sprocket-hole" style="width: 15px; height: 5px;"></div>
                                    <div class="sprocket-hole" style="width: 15px; height: 5px;"></div>
                                    <div class="sprocket-hole" style="width: 15px; height: 5px;"></div>
                                    <div class="sprocket-hole" style="width: 15px; height: 5px;"></div>
                                    <div class="sprocket-hole" style="width: 15px; height: 5px;"></div>
                                </div>
                                <!-- 中央画面区域 -->
                                <div class="film-aperture" style="width: 240px; height: 135px; border-width: 3px;">
                                    <div class="grid-overlay"></div>
                                    <div class="scan-line"></div>
                                    <div class="light-sweep"></div>
                                    <div class="status-label top-left" style="font-size: 10px;">RENDERING</div>
                                    <div class="status-label bottom-right" style="font-size: 10px;">16:9</div>
                                </div>
                                <!-- 底部齿孔带 -->
                                <div class="sprocket-bottom" style="height: 9px;">
                                    <div class="sprocket-hole" style="width: 15px; height: 5px;"></div>
                                    <div class="sprocket-hole" style="width: 15px; height: 5px;"></div>
                                    <div class="sprocket-hole" style="width: 15px; height: 5px;"></div>
                                    <div class="sprocket-hole" style="width: 15px; height: 5px;"></div>
                                    <div class="sprocket-hole" style="width: 15px; height: 5px;"></div>
                                    <div class="sprocket-hole" style="width: 15px; height: 5px;"></div>
                                    <div class="sprocket-hole" style="width: 15px; height: 5px;"></div>
                                    <div class="sprocket-hole" style="width: 15px; height: 5px;"></div>
                                    <div class="sprocket-hole" style="width: 15px; height: 5px;"></div>
                                    <div class="sprocket-hole" style="width: 15px; height: 5px;"></div>
                                    <div class="sprocket-hole" style="width: 15px; height: 5px;"></div>
                                    <div class="sprocket-hole" style="width: 15px; height: 5px;"></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- 底部信息区域 - 左下角 -->
                    <div class="absolute bottom-12 left-12 flex flex-col gap-3 z-20">
                        <!-- 进度状态 -->
                        <div class="flex items-center gap-2 text-white" style="font-size: 12px; font-weight: 500;">
                            <span style="color: #888;">排队中</span>
                            <span style="color: #FF8800;" class="animate-pulse">>>>>>></span>
                            <span style="color: #FF8800; font-weight: 600;">创作</span>
                            <span style="color: #666;" class="animate-pulse">>>>>>></span>
                        </div>

                        <!-- 提示文案 -->
                        <div style="font-size: 10px; color: #999; font-weight: 400;">
                            创作中,预计等待 1 分钟
                        </div>

                        <!-- 通知提示 -->
                        <div class="flex items-center gap-1 mt-1" style="font-size: 8px; color: #666;">
                            <svg width="11" height="11" viewBox="0 0 20 20" fill="none" class="flex-shrink-0">
                                <path d="M10 2C6.68629 2 4 4.68629 4 8V11.5858L2.29289 13.2929C1.90237 13.6834 2.17811 14.5 2.70711 14.5H17.2929C17.8219 14.5 18.0976 13.6834 17.7071 13.2929L16 11.5858V8C16 4.68629 13.3137 2 10 2Z" fill="#FF8800" opacity="0.5"/>
                                <path d="M8 16C8 17.1046 8.89543 18 10 18C11.1046 18 12 17.1046 12 16" stroke="#FF8800" stroke-width="2" stroke-linecap="round"/>
                            </svg>
                            <span>打开通知,我们将在任务完成后通过浏览器通知您。</span>
                        </div>
                    </div>

                    <!-- 右上角状态信息 -->
                    <div class="absolute top-8 right-12 text-right" style="font-family: monospace; font-size: 12px; color: #666;">
                        <div>QUEUE STATUS: ACTIVE</div>
                        <div class="mt-2" style="color: #FF8800;">
                            RENDERING...
                        </div>
                    </div>
                </div>
            </div>

            <!-- Bottom Metadata Bar (Swapped Layout) -->
            <div class="glass-metadata-bar flex items-center justify-between px-5 py-3 border-t border-white/5 bg-zinc-900/40 backdrop-blur-md">
                <!-- Left: Metadata (Seed, Model, Scale) -->
                <div class="flex gap-6 border-r border-white/5 pr-6">
                    <div class="flex flex-col">
                        <span class="text-[8px] font-bold text-zinc-600 tracking-widest uppercase" data-i18n="seed_label">Seed</span>
                        <span class="text-[10px] text-zinc-400 font-mono">${seed}</span>
                    </div>
                    <div class="flex flex-col">
                        <span class="text-[8px] font-bold text-zinc-600 tracking-widest uppercase" data-i18n="model_label">MODEL</span>
                        <span class="text-[10px] text-zinc-400 font-mono">UTOPIA-V1</span>
                    </div>
                    <div class="flex flex-col">
                        <span class="text-[8px] font-bold text-zinc-600 tracking-widest uppercase" data-i18n="dimensions">RESOLUTION</span>
                        <span class="text-[10px] text-zinc-400 font-mono">4K</span>
                    </div>
                </div>

                <!-- Right: Prompt -->
                <div class="flex items-center gap-3 flex-1 justify-end overflow-hidden pl-4">
                    <div class="text-right overflow-hidden">
                        <span class="block text-[8px] font-bold text-zinc-600 tracking-widest uppercase mb-0.5" data-i18n="prompt_label">Prompt</span>
                        <p class="text-[11px] text-zinc-300 font-light truncate max-w-[350px] italic">"${prompt}"</p>
                    </div>
                    <div class="w-1.5 h-1.5 rounded-full bg-orange-500"></div>
                </div>
            </div>
        </div>
    `;

    // Prepend the new card (add it at the top)
    container.insertBefore(videoCard, container.firstChild);

    // Add to Side History (Right Sidebar)
    addToHistorySidebar(videoId, prompt, seed);

    // Show queueing animation for this new card
    const particleContainer = document.getElementById(`generation-particle-container-${videoId}`);
    if (particleContainer) {
        particleContainer.classList.remove('hidden');

        // Simulate video generation (hide animation after completion)
        setTimeout(() => {
            // Hide animation container after generation completes
            particleContainer.classList.add('hidden');
        }, 60000); // Hide after 60 seconds (adjust as needed)
    }

    // Scroll to the new card
    safeScrollToCard(`video-card-${videoId}`);

    // Refresh translations for the new card
    setLanguage(currentLang);
}



// Tab Switching Logic (Result View)
function switchTab(btn, tabId) {
    // Reset buttons
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active', 'text-white', 'border-white'));
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.add('text-zinc-400', 'border-transparent'));

    // Activate button
    btn.classList.remove('text-zinc-400', 'border-transparent');
    btn.classList.add('active', 'text-white', 'border-white');

    // Switch content
    document.querySelectorAll('.tab-content').forEach(c => {
        c.classList.remove('active');
    });
    const activeContent = document.getElementById(tabId);
    activeContent.classList.add('active');
}

// Editor Interactions
function closeClipWindow() {
    document.getElementById('clip-window')?.classList.add('hidden');
}

// Login Modal Logic
// Login Modal Logic
function showLoginModal() {
    const modal = document.getElementById('login-modal');
    const content = document.getElementById('login-modal-content');
    if (!modal) return;

    modal.classList.remove('hidden');
    // Force reflow for transitions if needed
    modal.offsetHeight;

    setTimeout(() => {
        if (content) {
            content.classList.add('opacity-100', 'scale-100');
            content.classList.remove('opacity-0', 'scale-90');
        }
    }, 10);
}

function hideLoginModal() {
    const modal = document.getElementById('login-modal');
    const content = document.getElementById('login-modal-content');
    if (!modal) return;

    if (content) {
        content.classList.add('opacity-0', 'scale-90');
        content.classList.remove('opacity-100', 'scale-100');
    }

    setTimeout(() => {
        modal.classList.add('hidden');
    }, 500); // Wait for transition
}

function toggleStandardLogin() {
    const fields = document.getElementById('standard-login-fields');
    const social = document.getElementById('social-login-section');
    if (!fields || !social) return;

    if (fields.classList.contains('hidden')) {
        fields.classList.remove('hidden');
        social.classList.remove('hidden');
        setTimeout(() => {
            fields.classList.remove('max-h-0');
            fields.classList.add('max-h-40', 'mt-4');
        }, 10);
    } else {
        fields.classList.add('max-h-0');
        fields.classList.remove('max-h-40', 'mt-4');
        setTimeout(() => {
            fields.classList.add('hidden');
            social.classList.add('hidden');
        }, 500);
    }
}

function updateKeyDots(val) {
    const dots = document.querySelectorAll('#key-dots-container [data-dot]');
    const container = document.getElementById('key-component-container');
    const len = val.length;

    dots.forEach((dot, index) => {
        if (index < len) {
            dot.classList.remove('bg-orange-950/50', 'border-orange-500/10');
            dot.classList.add('bg-white', 'shadow-[0_0_10px_#fff]', 'border-white');
        } else {
            dot.classList.add('bg-orange-950/50', 'border-orange-500/10');
            dot.classList.remove('bg-white', 'shadow-[0_0_10px_#fff]', 'border-white');
        }
    });

    // Trigger Energy Pulse and Auto-Submit on 6th character
    if (len === 6 && container) {
        container.classList.add('energy-active');
        // Auto-submit after a tiny delay to let the dot light up
        setTimeout(() => {
            container.classList.remove('energy-active');
            handleLoginSubmit();
        }, 300);
    }
}

function handleLoginSubmit() {
    const keyInput = document.getElementById('login-access-key');
    const masterBtn = document.getElementById('btn-master-unlock');
    const modalContent = document.getElementById('login-modal-content');

    if (!keyInput) return;

    const key = keyInput.value.trim();

    // Specific validation requested by user: szy188
    if (key !== 'szy188') {
        const container = keyInput.closest('.group');
        const loginBtn = document.getElementById('btn-login-submit');
        const dots = document.querySelectorAll('#key-dots-container [data-dot]');

        // Apply Unified Shake Feedback
        if (container) container.classList.add('animate-shake');
        if (loginBtn) loginBtn.classList.add('animate-shake');

        // Turn dots red
        dots.forEach(dot => {
            dot.classList.add('bg-red-500', 'shadow-[0_0_15px_#ef4444]', 'border-red-500');
            dot.classList.remove('bg-white', 'shadow-[0_0_10px_#fff]');
        });

        setTimeout(() => {
            if (container) container.classList.remove('animate-shake');
            if (loginBtn) loginBtn.classList.remove('animate-shake');

            dots.forEach(dot => dot.classList.remove('bg-red-500', 'shadow-[0_0_15px_#ef4444]', 'border-red-500'));
            keyInput.value = '';
            updateKeyDots('');
        }, 600);
        return;
    }

    // Success Logic: Mechanical Unlock & Warp Transition
    if (masterBtn) masterBtn.classList.add('lock-unlocked');

    setTimeout(() => {
        if (modalContent) modalContent.classList.add('app-warp');

        setTimeout(() => {
            hideLoginModal();
            setTimeout(() => {
                startApp();
                // Reset state for next time
                if (masterBtn) masterBtn.classList.remove('lock-unlocked');
                if (modalContent) modalContent.classList.remove('app-warp');
                keyInput.value = '';
                updateKeyDots('');
            }, 400);
        }, 800);
    }, 400);
}

// File Upload Logic
function handleDirectFileSelect(input) {
    const files = input.files;
    if (files.length > 0) {
        console.log("Selected file:", files[0].name);
        // You can add logic here to display the filename in the UI if needed
        // For now, it just logs it and prepares for upload
    }
}

// Video Playback Controls
let isPlaying = false;
let isMuted = false;
let isLooped = false;
let playbackSpeed = 1;

const playBtn = document.getElementById('play-btn');
const playIcon = document.getElementById('play-icon');
const muteBtn = document.getElementById('mute-btn');
const loopBtn = document.getElementById('loop-btn');

// Toggle Play/Pause
if (playBtn) {
    playBtn.addEventListener('click', () => {
        isPlaying = !isPlaying;
        // SVG icon switching is more complex, for now we just toggle state
    });
}

// Toggle Mute
if (muteBtn) {
    muteBtn.addEventListener('click', () => {
        isMuted = !isMuted;
        if (isMuted) {
            muteBtn.classList.remove('text-zinc-500');
            muteBtn.classList.add('text-white');
        } else {
            muteBtn.classList.remove('text-white');
            muteBtn.classList.add('text-zinc-500');
        }
    });
}

// Toggle Loop
if (loopBtn) {
    loopBtn.addEventListener('click', () => {
        isLooped = !isLooped;
        if (isLooped) {
            loopBtn.classList.remove('text-zinc-500');
            loopBtn.classList.add('text-white');
        } else {
            loopBtn.classList.remove('text-white');
            loopBtn.classList.add('text-zinc-500');
        }
    });
}

// Speed buttons
const speedButtons = document.querySelectorAll('[class*="0.5x"], [class*="1x"], [class*="2x"]');
speedButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        speedButtons.forEach(b => {
            b.classList.remove('bg-zinc-800', 'text-white');
            b.classList.add('bg-zinc-900', 'text-zinc-300');
        });
        btn.classList.remove('bg-zinc-900', 'text-zinc-300');
        btn.classList.add('bg-zinc-800', 'text-white');
    });
});

// Progress bar interaction
const progressBar = document.querySelector('.h-2.bg-zinc-900');
if (progressBar) {
    progressBar.addEventListener('click', (e) => {
        const rect = progressBar.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const percentage = (clickX / rect.width) * 100;
        progressBar.innerHTML = `
        < div class="h-full bg-gradient-to-r from-orange-500 via-orange-400 to-blue-500 rounded-full relative" style = "width: ${percentage}%" >
            <div class="absolute -top-0.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white rounded-full shadow-lg ring-2 ring-orange-500/50"></div>
            </div >
        `;
    });
}

function selectClip(element) {
    document.querySelectorAll('.timeline-clip').forEach(el => el.classList.remove('selected'));
    element.classList.add('selected');
}

// Right-click context menu for clips
function showClipMenu(event, element) {
    event.preventDefault(); // Prevent default context menu

    // Select the clip
    document.querySelectorAll('.timeline-clip').forEach(el => el.classList.remove('selected'));
    element.classList.add('selected');

    const menu = document.getElementById('clip-window');
    const container = document.getElementById('timeline-container');

    // Position the menu
    menu.classList.remove('hidden');

    // Calculate position relative to the element
    const rect = element.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();

    // Position menu above the clip
    const menuTop = rect.top - containerRect.top - 10;
    const menuLeft = rect.left - containerRect.left;

    menu.style.top = menuTop + 'px';
    menu.style.left = menuLeft + 'px';
    menu.style.bottom = 'auto';
}

// Close menu when clicking outside
document.addEventListener('click', function (event) {
    const menu = document.getElementById('clip-window');
    // Check if menu exists
    if (!menu) return;

    const timelineContainer = document.getElementById('timeline-container');
    const isClickInsideMenu = menu.contains(event.target);
    const isClickOnClip = event.target.closest('.timeline-clip');

    if (!isClickInsideMenu && !isClickOnClip && !menu.classList.contains('hidden')) {
        closeClipWindow();
    }
});

document.addEventListener('mousemove', (e) => {
    const x = e.clientX;
    const y = e.clientY;
    document.documentElement.style.setProperty('--cursor-x', x + 'px');
    document.documentElement.style.setProperty('--cursor-y', y + 'px');
});

// Shader logic moved to shader.js
// Old shader removed
// Initialize State on Load
document.addEventListener('DOMContentLoaded', () => {
    // If we're on the landing page (which is default in HTML), set state
    if (document.getElementById('view-landing').classList.contains('active')) {
        setBodyState('landing');
    }
});

/**
 * JS-Controlled Draggable Marquee with Momentum & Loop
 */
function initDraggableMarquee(containerId = 'prompt-marquee', contentId = 'prompt-marquee-content') {
    const container = document.getElementById(containerId);
    const content = document.getElementById(contentId);
    if (!container || !content) return;

    let isDown = false;
    let startX;
    let scrollLeft;
    let velocity = 0.5; // Constant scroll speed
    let currentX = 0;
    let lastTime = Date.now();
    let isDragging = false;
    let dragStartX = 0;

    function update() {
        if (!isDown) {
            currentX -= velocity;

            // Loop logic (assuming content is duplicated)
            const halfWidth = content.offsetWidth / 2;
            if (Math.abs(currentX) >= halfWidth) {
                currentX = 0;
            }

            content.style.transform = `translateX(${currentX}px)`;
        }
        requestAnimationFrame(update);
    }

    container.addEventListener('mousedown', (e) => {
        isDown = true;
        isDragging = false;
        dragStartX = e.pageX;
        startX = e.pageX - currentX;
        velocity = 0; // Pause auto-scroll
    });

    window.addEventListener('mouseup', (e) => {
        if (!isDown) return;
        isDown = false;

        // Resume auto-scroll or keep momentum? 
        // Let's settle back to default velocity
        velocity = 0.5;
    });

    container.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();

        const x = e.pageX;
        const walk = (x - startX);
        currentX = walk;

        // Detection for drag vs click
        if (Math.abs(x - dragStartX) > 5) {
            isDragging = true;
        }

        // Loop while dragging
        const halfWidth = content.offsetWidth / 2;
        if (currentX > 0) currentX -= halfWidth;
        if (Math.abs(currentX) >= halfWidth) currentX += halfWidth;

        content.style.transform = `translateX(${currentX}px)`;
    });

    // Handle clicks on cards to prevent trigger during drag
    content.addEventListener('click', (e) => {
        if (isDragging) {
            e.preventDefault();
            e.stopPropagation();
        }
    }, true);

    requestAnimationFrame(update);
}

// Re-initialize or Add to existing DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    initDraggableMarquee();
});

let selectedTags = [];

function fillPrompt(text) {
    // Buttons on both Page 2 and Page 3
    const btn2 = document.getElementById('btn-generate');
    const btn3 = document.getElementById('btn-generate-result');

    // Single-choice logic
    if (selectedTags.includes(text)) {
        selectedTags = [];
    } else {
        selectedTags = [text];
    }

    // Update Highlight on Card Elements
    document.querySelectorAll('.prompt-card').forEach(card => {
        const tagKey = card.getAttribute('data-i18n')?.replace('tag_', '');
        if (selectedTags.includes(tagKey)) {
            card.classList.add('selected');
        } else {
            card.classList.remove('selected');
        }
    });

    // Update Button Text
    updateGenerateButtonText();

    // Feedback on buttons
    if (btn2) {
        btn2.classList.add('glow-pulse');
        setTimeout(() => btn2.classList.remove('glow-pulse'), 500);
    }
    if (btn3) {
        btn3.classList.add('glow-pulse');
        setTimeout(() => btn3.classList.remove('glow-pulse'), 500);
    }
}


function updateGenerateButtonText() {
    // Select both buttons and their components
    const btnText2 = document.querySelector('#btn-generate .btn-text');
    const tagHole2 = document.getElementById('btn-tag-hole');
    const btnText3 = document.querySelector('#btn-generate-result .btn-text');
    const tagHole3 = document.getElementById('btn-tag-hole-result');

    const updateBtn = (btnText, tagHole) => {
        if (!btnText || !tagHole) return;

        // Reset base text always
        btnText.innerText = translations[currentLang]?.generate || "Generate";

        if (selectedTags.length > 0) {
            const tagKey = 'tag_' + selectedTags[0];
            tagHole.innerText = translations[currentLang][tagKey] || selectedTags[0];
            tagHole.classList.remove('hidden');
            tagHole.classList.add('flex');
        } else {
            tagHole.innerText = '';
            tagHole.classList.add('hidden');
            tagHole.classList.remove('flex');
        }
    };

    updateBtn(btnText2, tagHole2);
    updateBtn(btnText3, tagHole3);
}

// Prevent scroll overflow from chat panel to parent page
function preventChatScrollOverflow() {
    // Apply to all scrollable panels on page 3
    const scrollablePanels = [
        'chat-history-panel',           // Left chat panel
        'video-generation-container'     // Center video container
    ];

    scrollablePanels.forEach(panelId => {
        const panel = document.getElementById(panelId);
        if (!panel) return;

        panel.addEventListener('wheel', function (e) {
            const scrollTop = this.scrollTop;
            const scrollHeight = this.scrollHeight;
            const height = this.clientHeight;
            const delta = e.deltaY;
            const isAtTop = scrollTop === 0;
            const isAtBottom = scrollTop + height >= scrollHeight;

            // Prevent scroll propagation when at boundaries
            if ((isAtTop && delta < 0) || (isAtBottom && delta > 0)) {
                e.preventDefault();
                e.stopPropagation();
            }
        }, { passive: false });
    });

    // Also handle right history panel (uses class selector)
    const rightPanel = document.querySelector('#view-result aside.w-60');
    if (rightPanel) {
        const scrollableDiv = rightPanel.querySelector('.overflow-y-auto');
        if (scrollableDiv) {
            scrollableDiv.addEventListener('wheel', function (e) {
                const scrollTop = this.scrollTop;
                const scrollHeight = this.scrollHeight;
                const height = this.clientHeight;
                const delta = e.deltaY;
                const isAtTop = scrollTop === 0;
                const isAtBottom = scrollTop + height >= scrollHeight;

                if ((isAtTop && delta < 0) || (isAtBottom && delta > 0)) {
                    e.preventDefault();
                    e.stopPropagation();
                }
            }, { passive: false });
        }
    }
}

// Helper to safely scroll within the container without affecting body
function safeScrollToCard(cardId) {
    const container = document.getElementById('video-list-container');
    const target = document.getElementById(cardId);

    if (container && target) {
        // Calculate position relative to container
        const containerRect = container.getBoundingClientRect();
        const targetRect = target.getBoundingClientRect();
        const offset = targetRect.top - containerRect.top + container.scrollTop;

        // Center alignment calculation
        const centeredScrollTop = offset - (container.clientHeight / 2) + (target.clientHeight / 2);

        container.scrollTo({
            top: centeredScrollTop,
            behavior: 'smooth'
        });

        // Highlight effect
        target.classList.add('ring-2', 'ring-orange-500', 'ring-offset-2', 'ring-offset-black');
        setTimeout(() => {
            target.classList.remove('ring-2', 'ring-orange-500', 'ring-offset-2', 'ring-offset-black');
        }, 1000);
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function () {
    preventChatScrollOverflow();
    initDraggableMarquee('prompt-marquee', 'prompt-marquee-content');
    initDraggableMarquee('prompt-marquee-result', 'prompt-marquee-content-result');
});

// History Sidebar Interaction
function addToHistorySidebar(videoId, prompt, seed) {
    const sidebarContainer = document.querySelector('#view-result aside.w-60 .overflow-y-auto');
    if (!sidebarContainer) return;

    // Create History Item
    const item = document.createElement('div');
    item.className = 'group cursor-pointer animate-fade-in';

    // Time String
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    item.innerHTML = `
        <div class="aspect-video w-full bg-black rounded-lg border border-white/5 hover:border-orange-500/50 relative overflow-hidden transition-all">
            <!-- Placeholder / Thumbnail (Ideally capture canvas later) -->
            <div class="w-full h-full bg-zinc-900 flex items-center justify-center">
                <div class="w-8 h-8 rounded-full border-2 border-orange-500/30 border-t-orange-500 animate-spin"></div>
            </div>
            
            <div class="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                <div class="w-full">
                    <div class="flex gap-1 mb-2">
                        <span class="px-1.5 py-0.5 rounded bg-orange-500/20 text-[9px] text-orange-300 border border-orange-500/20">GENERATING</span>
                        <span class="px-1.5 py-0.5 rounded bg-black/60 text-[9px] text-zinc-400">#${seed ? seed.toString().substr(0, 5) : '000'}</span>
                    </div>
                    <p class="text-[10px] text-zinc-300 line-clamp-2">"${prompt}"</p>
                </div>
            </div>
        </div>
        <div class="mt-2 text-[10px] text-zinc-600 font-mono">${timeStr}</div>
    `;

    // Add Click Interaction
    item.addEventListener('click', () => {
        safeScrollToCard(`video-card-${videoId}`);
    });

    // Prepend to list
    sidebarContainer.insertBefore(item, sidebarContainer.firstChild);
}

// Auto-fill prompt from URL parameters (for Remix functionality)
function fillRemixPrompt() {
    const urlParams = new URLSearchParams(window.location.search);
    const remixPrompt = urlParams.get('remix');
    
    if (remixPrompt) {
        const promptInput = document.getElementById('prompt-input');
        if (promptInput) {
            promptInput.value = remixPrompt;
        }
    }
}

// Execute on page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', fillRemixPrompt);
} else {
    fillRemixPrompt();
}
window.addEventListener('load', fillRemixPrompt);
