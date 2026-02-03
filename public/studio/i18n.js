const translations = {
    en: {
        "pricing": "Pricing",
        "showcase": "Showcase",
        "welcome_to_app": "Welcome to MOVIE UTOPIA",
        "welcome_greeting": "Welcome to",
        "brand_name": "MOVIE UTOPIA",
        "login_subtitle": "Enter your credentials to continue",
        "email": "Email Address",
        "password": "Password",
        "sign_in": "Sign In",
        "or_continue_with": "Or continue with",
        "no_account": "Don't have an account?",
        "sign_up": "Sign Up",
        "access_key": "Access Key",
        "enter_key": "Enter your access key",
        "use_key_login": "Login with Key",
        "use_standard_login": "Back to Standard",
        "upload_file": "Upload File",
        "drag_drop": "Drag & drop files here or",
        "browse": "Browse",
        "start_now": "Start Now",
        "ready_to_create": "Ready?",
        "pro_license": "Pro License",
        "new_engine": "New Engine V2.0 Live",
        "start_now_btn": "Start Now",
        "start_creation": "Start Creation",
        "input_title": "Industrial AI Filmmaking Starts Here",
        "generate": "Create",
        "tag_Inspirational": "Inspirational",
        "tag_Passionate": "Passionate",
        "tag_Tragic": "Tragic",
        "tag_Healing": "Healing",
        "tag_Soft": "Soft",
        "tag_Mind-bending": "Mind-bending",
        "tag_Twisty": "Twisty",
        "tag_Epic": "Epic",
        "tag_Absurd": "Absurd",
        "tag_Dark": "Dark",
        "tag_Depressing": "Depressing",
        "tag_Humor": "Humor",
        "tag_Detached": "Detached",
        "tag_Romantic": "Romantic",
        "tag_Grotesque": "Grotesque",
        "generation_result": "Result View",
        "regenerate": "Create",
        "pro_editor": "Pro Editor",
        "timeline_video_1": "Video Track 1",
        "timeline_video_2": "Video Track 2",
        "timeline_audio": "Audio Track",
        "timeline_effects": "FX Track",
        "prop_transform": "Transform",
        "prop_color": "Color",
        "prop_fx": "Effects",
        "history": "History",
        "today": "TODAY",
        "yesterday": "YESTERDAY",
        "failed": "FAILED",
        "buy_more": "Buy More",
        "back_to_create": "Back to Create",
        "export": "Export",
        "export_video": "Export Video",
        "back_text": "Back",
        "edit_in_pro": "Edit in Pro",
        "prompt_label": "Prompt",
        "model_label": "MODEL",
        "dimensions": "RESOLUTION",
        "seed_label": "Seed",
        "related_variations": "Related Variations",
        "grid_view": "Grid",
        "list_view": "List",
        "target_image": "Target Image",
        "create_variation": "Create Variation",
        "credits": "Credits",
        "spatial_gen": "Spatial Video Gen",
        "spatial_desc": "Vision Pro / VR Format",
        "version_history": "Version History",
        "current_ver": "Current",
        "color_adj": "Color Adj...",
        "open_options": "Open Options",
        "close_btn": "Close"
    },
    zh: {
        "pricing": "Pricing",
        "showcase": "Showcase",
        "welcome_to_app": "Welcome to MOVIE UTOPIA",
        "welcome_greeting": "Welcome to",
        "brand_name": "MOVIE UTOPIA",
        "login_subtitle": "Enter your credentials to continue",
        "email": "Email Address",
        "password": "Password",
        "sign_in": "Sign In",
        "or_continue_with": "Or continue with",
        "no_account": "Don't have an account?",
        "sign_up": "Sign Up",
        "access_key": "Access Key",
        "enter_key": "Enter your access key",
        "use_key_login": "Login with Key",
        "use_standard_login": "Back to Standard",
        "upload_file": "Upload File",
        "drag_drop": "Drag & drop files here or",
        "browse": "Browse",
        "start_now": "Start Now",
        "ready_to_create": "Ready?",
        "pro_license": "Pro License",
        "new_engine": "New Engine V2.0 Live",
        "start_now_btn": "Start Now",
        "start_creation": "Start Creation",
        "input_title": "Industrial AI Filmmaking Starts Here",
        "generate": "Create",
        "tag_Inspirational": "Inspirational",
        "tag_Passionate": "Passionate",
        "tag_Tragic": "Tragic",
        "tag_Healing": "Healing",
        "tag_Soft": "Soft",
        "tag_Mind-bending": "Mind-bending",
        "tag_Twisty": "Twisty",
        "tag_Epic": "Epic",
        "tag_Absurd": "Absurd",
        "tag_Dark": "Dark",
        "tag_Depressing": "Depressing",
        "tag_Humor": "Humor",
        "tag_Detached": "Detached",
        "tag_Romantic": "Romantic",
        "tag_Grotesque": "Grotesque",
        "generation_result": "Result View",
        "regenerate": "Create",
        "pro_editor": "Pro Editor",
        "timeline_video_1": "Video Track 1",
        "timeline_video_2": "Video Track 2",
        "timeline_audio": "Audio Track",
        "timeline_effects": "FX Track",
        "prop_transform": "Transform",
        "prop_color": "Color",
        "prop_fx": "Effects",
        "history": "History",
        "today": "TODAY",
        "yesterday": "YESTERDAY",
        "failed": "FAILED",
        "buy_more": "Buy More",
        "back_to_create": "Back to Create",
        "export": "Export",
        "export_video": "Export Video",
        "back_text": "Back",
        "edit_in_pro": "Edit in Pro",
        "prompt_label": "Prompt",
        "model_label": "MODEL",
        "dimensions": "RESOLUTION",
        "seed_label": "Seed",
        "related_variations": "Related Variations",
        "grid_view": "Grid",
        "list_view": "List",
        "target_image": "Target Image",
        "create_variation": "Create Variation",
        "credits": "Credits",
        "spatial_gen": "Spatial Video Gen",
        "spatial_desc": "Vision Pro / VR Format",
        "version_history": "Version History",
        "current_ver": "Current",
        "color_adj": "Color Adj...",
        "open_options": "Open Options",
        "close_btn": "Close"
    }
};

let currentLang = 'en'; // Default to English

function setLanguage(lang) {
    currentLang = lang;
    document.documentElement.lang = lang;

    // Update all elements with class .lang-switcher-text
    const switchers = document.querySelectorAll('.lang-switcher-text');
    switchers.forEach(sw => {
        sw.textContent = lang === 'en' ? 'EN' : '中';
    });

    // Update all elements with data-i18n
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[lang] && translations[lang][key]) {
            el.textContent = translations[lang][key];
        }
    });

    // Handle special cases like Generate button which might have dynamic content
    if (typeof updateGenerateButtonText === 'function') {
        updateGenerateButtonText();
    }
}

function toggleLanguage() {
    const newLang = currentLang === 'en' ? 'zh' : 'en';
    setLanguage(newLang);
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // Determine initial language or set default
    setLanguage('en');
});

