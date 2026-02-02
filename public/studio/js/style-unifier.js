/**
 * Style Unifier
 * 自动统一 Studio 和主站的样式
 */

(function() {
  'use strict';

  // 等待 DOM 加载完成
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', applyUnifiedStyles);
  } else {
    applyUnifiedStyles();
  }

  function applyUnifiedStyles() {
    console.log('[Style Unifier] Applying unified styles...');

    // 1. 统一所有用户头像
    unifyAvatars();

    // 2. 统一所有按钮
    unifyButtons();

    // 3. 统一所有输入框
    unifyInputs();

    // 4. 统一所有卡片
    unifyCards();

    // 5. 统一导航栏
    unifyNavigation();

    console.log('[Style Unifier] Styles applied successfully');
  }

  function unifyAvatars() {
    // 统一头像样式
    const avatars = document.querySelectorAll('.w-7.h-7.rounded-full, .w-8.h-8.rounded-full');
    avatars.forEach(avatar => {
      avatar.classList.add('user-avatar');
    });

    // 统一用户名样式
    const userNames = document.querySelectorAll('.text-xs.font-medium.text-white');
    userNames.forEach(name => {
      if (name.textContent.includes('Alex') || name.closest('.text-right')) {
        name.classList.add('user-name');
      }
    });
  }

  function unifyButtons() {
    // 统一生成按钮
    const generateBtn = document.getElementById('btn-generate');
    if (generateBtn) {
      // 保持原有功能，只覆盖样式
      generateBtn.style.background = 'linear-gradient(to right, rgb(139 92 246), rgb(168 85 247))';
      generateBtn.style.boxShadow = '0 4px 12px rgba(139, 92, 246, 0.2)';
    }

    // 统一所有橙色按钮为紫色主题
    const orangeButtons = document.querySelectorAll('[class*="from-orange"]');
    orangeButtons.forEach(btn => {
      if (btn.tagName === 'BUTTON') {
        btn.style.background = 'linear-gradient(to right, rgb(139 92 246), rgb(168 85 247))';
        btn.style.boxShadow = '0 4px 12px rgba(139, 92, 246, 0.2)';
      }
    });

    // 统一返回按钮
    const backButtons = document.querySelectorAll('[onclick*="goBack"], [onclick*="Back"]');
    backButtons.forEach(btn => {
      btn.classList.add('btn-ghost');
    });
  }

  function unifyInputs() {
    // 统一所有 textarea
    const textareas = document.querySelectorAll('textarea');
    textareas.forEach(textarea => {
      textarea.classList.add('input-unified');
    });

    // 统一所有 input
    const inputs = document.querySelectorAll('input[type="text"], input[type="email"], input[type="password"]');
    inputs.forEach(input => {
      input.classList.add('input-unified');
    });
  }

  function unifyCards() {
    // 统一所有玻璃卡片
    const glassCards = document.querySelectorAll('.glass-premium');
    glassCards.forEach(card => {
      card.classList.add('card-unified');
    });
  }

  function unifyNavigation() {
    // 确保导航栏使用统一样式
    const nav = document.querySelector('nav');
    if (nav) {
      nav.classList.add('glass-unified');
    }

    // 统一导航链接
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
      link.style.transition = 'all 0.3s';
    });
  }

  // 监听动态添加的元素
  const observer = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
      if (mutation.addedNodes.length) {
        applyUnifiedStyles();
      }
    });
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true
  });

})();
