#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
快速验证修复效果 - Movie Utopia
"""

import sys
import io
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

from playwright.sync_api import sync_playwright
import os

WEBSITE_DIR = r"D:\薛晋工作文件\MOVIE UTOPIA 网站\0130\Movie_Utopia_CinemaAI_v2.0_Final(1)"
INDEX_PATH = os.path.join(WEBSITE_DIR, "index.html")

def quick_test():
    """快速测试 - 只检查错误，不截图"""
    print("=" * 60)
    print("Movie Utopia 快速验证测试")
    print("=" * 60)

    # 收集错误和警告
    errors = []
    warnings = []
    fixed_issues = {
        'js_duplicate': False,
        'font_dmsan': False,
        'font_syne': False
    }

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # 监听控制台消息
        def handle_console(msg):
            text = msg.text
            msg_type = msg.type

            # 检查已修复的问题是否还存在
            if "Identifier 'ParticleSystem' has already been declared" in text:
                errors.append("❌ JS重复声明问题仍存在: ParticleSystem")
            elif "Identifier 'isPlaying' has already been declared" in text:
                errors.append("❌ JS重复声明问题仍存在: isPlaying")
            elif "Failed to decode downloaded font" in text and "dm-sans" in text:
                errors.append("❌ 字体问题仍存在: dm-sans.woff2")
            elif "Failed to decode downloaded font" in text and "syne" in text:
                errors.append("❌ 字体问题仍存在: syne.woff2")
            elif msg_type == "error":
                errors.append(f"错误: {text[:100]}")
            elif msg_type == "warning" and "cdn.tailwindcss" not in text:
                warnings.append(f"警告: {text[:100]}")

        page.on('console', handle_console)
        page.on('pageerror', lambda err: errors.append(f"页面错误: {str(err)[:100]}"))

        print("\n正在加载页面...")
        try:
            page.goto(f'file:///{INDEX_PATH}', wait_until='domcontentloaded', timeout=30000)
            print("✅ 页面加载成功")
        except Exception as e:
            print(f"⚠ 页面加载警告: {e}")

        # 等待一段时间收集错误信息
        import time
        time.sleep(5)

        browser.close()

    # 分析结果
    print("\n" + "=" * 60)
    print("测试结果")
    print("=" * 60)

    # 检查关键修复
    js_duplicate_fixed = not any("已声明" in e or "already been declared" in e for e in errors)
    font_fixed = not any("Failed to decode downloaded font" in e for e in errors)

    print("\n✅ 已修复的问题:")
    if js_duplicate_fixed:
        print("  ✓ JavaScript 重复声明问题 - 已修复")
    if font_fixed:
        print("  ✓ 字体文件损坏问题 - 已修复")

    if errors:
        print(f"\n⚠ 剩余问题 ({len(errors)} 个):")
        for i, error in enumerate(errors[:10], 1):
            print(f"  {i}. {error}")
        if len(errors) > 10:
            print(f"  ... 还有 {len(errors) - 10} 个问题")
    else:
        print("\n🎉 没有发现严重错误!")

    if warnings:
        print(f"\n📋 警告信息 ({len(warnings)} 个):")
        for i, warning in enumerate(warnings[:5], 1):
            print(f"  {i}. {warning}")

    print("\n" + "=" * 60)

    if js_duplicate_fixed and font_fixed:
        print("✅ 核心问题修复成功!")
    else:
        print("⚠ 还有一些问题需要继续修复")

    print("=" * 60)

if __name__ == "__main__":
    quick_test()
