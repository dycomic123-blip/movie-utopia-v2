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
        "pricing": "价格",
        "showcase": "案例展厅",
        "welcome_to_app": "欢迎使用 MOVIE UTOPIA",
        "welcome_greeting": "Welcome to",
        "brand_name": "MOVIE UTOPIA",
        "login_subtitle": "输入您的凭据以继续",
        "email": "电子邮箱",
        "password": "密码",
        "sign_in": "登录",
        "or_continue_with": "或者使用以下方式登录",
        "no_account": "还没有账号？",
        "sign_up": "立即注册",
        "access_key": "通行密钥",
        "enter_key": "输入您的通行密钥",
        "use_key_login": "使用密钥登录",
        "use_standard_login": "返回常规登录",
        "upload_file": "上传文件",
        "drag_drop": "拖拽文件到这里 或",
        "browse": "浏览文件",
        "start_now": "立即开始",
        "ready_to_create": "准备好了吗？",
        "pro_license": "专业版",
        "new_engine": "新引擎 V2.0 上线",
        "start_now_btn": "立即开始",
        "start_creation": "开始创作",
        "input_title": "工业级电影AI制片从这里开始",
        "generate": "Create",
        "tag_Inspirational": "励志",
        "tag_Passionate": "热血",
        "tag_Tragic": "悲剧",
        "tag_Healing": "治愈",
        "tag_Soft": "柔和",
        "tag_Mind-bending": "烧脑",
        "tag_Twisty": "反转",
        "tag_Epic": "宏大",
        "tag_Absurd": "荒诞",
        "tag_Dark": "黑暗",
        "tag_Depressing": "压抑",
        "tag_Humor": "幽默",
        "tag_Detached": "疏离",
        "tag_Romantic": "浪漫",
        "tag_Grotesque": "怪诞",
        "generation_result": "生成结果",
        "regenerate": "Create",
        "pro_editor": "专业编辑器",
        "timeline_video_1": "视频轨道 1",
        "timeline_video_2": "视频轨道 2",
        "timeline_audio": "音频轨道",
        "timeline_effects": "特效轨道",
        "prop_transform": "变换",
        "prop_color": "调色",
        "prop_fx": "特效",
        "history": "历史记录",
        "today": "今天",
        "yesterday": "昨天",
        "failed": "失败",
        "buy_more": "购买更多",
        "back_to_create": "返回创作",
        "export": "导出",
        "export_video": "导出视频",
        "back_text": "返回",
        "edit_in_pro": "专业编辑",
        "prompt_label": "提示词",
        "model_label": "MODEL",
        "dimensions": "RESOLUTION",
        "seed_label": "种子",
        "related_variations": "相关变体",
        "grid_view": "网格",
        "list_view": "列表",
        "target_image": "参考图",
        "create_variation": "创建变体",
        "credits": "点数",
        "spatial_gen": "空间视频生成",
        "spatial_desc": "Vision Pro / VR 格式",
        "version_history": "版本历史",
        "current_ver": "当前",
        "color_adj": "色彩微调...",
        "open_options": "打开选项",
        "close_btn": "关闭"
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

