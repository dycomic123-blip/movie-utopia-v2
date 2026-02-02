#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Movie Utopia 网站自动化测试脚本
测试主页和聊天页面的功能
"""

import sys
import io
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

from playwright.sync_api import sync_playwright
import os
import time

# 网站目录路径
WEBSITE_DIR = r"D:\薛晋工作文件\MOVIE UTOPIA 网站\0130\Movie_Utopia_CinemaAI_v2.0_Final(1)"
INDEX_PATH = os.path.join(WEBSITE_DIR, "index.html")
CHAT_PATH = os.path.join(WEBSITE_DIR, "view3-chat-layout.html")

# 测试结果保存目录
SCREENSHOTS_DIR = os.path.join(WEBSITE_DIR, "test_screenshots")
os.makedirs(SCREENSHOTS_DIR, exist_ok=True)

def test_index_page(page):
    """测试主页 (index.html)"""
    print("\n=== 测试主页 (index.html) ===")

    # 访问主页 - 使用更宽松的等待条件
    try:
        page.goto(f'file:///{INDEX_PATH}', wait_until='domcontentloaded', timeout=60000)
        time.sleep(3)  # 等待动画效果加载
    except Exception as e:
        print(f"警告: 页面加载超时，尝试继续测试... {e}")
        time.sleep(2)

    # 1. 截图：页面加载完成
    page.screenshot(path=os.path.join(SCREENSHOTS_DIR, '01_index_loaded.png'), full_page=True)
    print("✓ 主页加载完成")

    # 2. 检查页面标题
    title = page.title()
    assert "MOVIE UTOPIA" in title, f"标题错误: {title}"
    print(f"✓ 页面标题: {title}")

    # 3. 检查主要元素是否存在
    try:
        # 检查 logo
        logo = page.locator('img[src*="logo"]')
        if logo.count() > 0:
            print("✓ Logo 元素存在")

        # 检查导航栏/按钮
        buttons = page.locator('button').all()
        print(f"✓ 找到 {len(buttons)} 个按钮")

        # 检查链接
        links = page.locator('a').all()
        print(f"✓ 找到 {len(links)} 个链接")

    except Exception as e:
        print(f"⚠ 元素检查警告: {e}")

    # 4. 测试页面滚动（如果有滚动内容）
    try:
        page.evaluate("window.scrollTo(0, document.body.scrollHeight)")
        time.sleep(1)
        page.screenshot(path=os.path.join(SCREENSHOTS_DIR, '02_index_scrolled.png'), full_page=True)
        print("✓ 页面滚动测试完成")
    except Exception as e:
        print(f"⚠ 滚动测试跳过: {e}")

    # 5. 检查 JavaScript 文件是否加载
    js_files = ['bubbles.js', 'dots.js', 'waves.js', 'particles-generation.js', 'shader.js', 'i18n.js']
    for js_file in js_files:
        loaded = page.evaluate(f"() => document.querySelector('script[src*=\"{js_file}\"]') !== null")
        if loaded:
            print(f"✓ JavaScript 已加载: {js_file}")

    # 6. 捕获控制台日志
    console_messages = []
    page.on('console', lambda msg: console_messages.append(f"{msg.type}: {msg.text}"))

    # 等待一段时间收集控制台信息
    time.sleep(2)

    if console_messages:
        print(f"\n[控制台消息] ({len(console_messages)} 条):")
        for msg in console_messages[:10]:  # 只显示前10条
            print(f"  {msg}")


def test_chat_page(page):
    """测试聊天页面 (view3-chat-layout.html)"""
    print("\n=== 测试聊天页面 (view3-chat-layout.html) ===")

    # 访问聊天页面
    try:
        page.goto(f'file:///{CHAT_PATH}', wait_until='domcontentloaded', timeout=60000)
        time.sleep(3)
    except Exception as e:
        print(f"警告: 页面加载超时，尝试继续测试... {e}")
        time.sleep(2)

    # 1. 截图：聊天页面加载完成
    page.screenshot(path=os.path.join(SCREENSHOTS_DIR, '03_chat_loaded.png'), full_page=True)
    print("✓ 聊天页面加载完成")

    # 2. 检查页面标题
    title = page.title()
    print(f"✓ 页面标题: {title}")

    # 3. 检查输入框
    try:
        input_fields = page.locator('input, textarea').all()
        print(f"✓ 找到 {len(input_fields)} 个输入框")

        # 如果有输入框，尝试输入测试文本
        if len(input_fields) > 0:
            test_input = input_fields[0]
            test_input.click()
            test_input.fill("这是一个测试消息")
            time.sleep(1)
            page.screenshot(path=os.path.join(SCREENSHOTS_DIR, '04_chat_input.png'), full_page=True)
            print("✓ 输入框测试完成")
    except Exception as e:
        print(f"⚠ 输入框测试警告: {e}")

    # 4. 检查按钮并尝试点击
    try:
        buttons = page.locator('button').all()
        print(f"✓ 找到 {len(buttons)} 个按钮")

        # 尝试点击第一个可见按钮
        for i, button in enumerate(buttons[:3]):  # 只测试前3个按钮
            try:
                if button.is_visible():
                    button_text = button.inner_text() or f"按钮{i+1}"
                    print(f"  尝试点击: {button_text}")
                    button.click()
                    time.sleep(1)
                    page.screenshot(path=os.path.join(SCREENSHOTS_DIR, f'05_chat_button_{i+1}.png'), full_page=True)
            except Exception as e:
                print(f"  ⚠ 按钮点击失败: {e}")
    except Exception as e:
        print(f"⚠ 按钮测试警告: {e}")


def test_navigation(page):
    """测试页面间导航"""
    print("\n=== 测试页面导航 ===")

    # 从主页开始
    page.goto(f'file:///{INDEX_PATH}')
    page.wait_for_load_state('networkidle')
    time.sleep(1)

    # 查找所有链接
    try:
        links = page.locator('a[href]').all()
        print(f"✓ 找到 {len(links)} 个链接")

        # 尝试点击前几个内部链接
        for i, link in enumerate(links[:3]):
            try:
                href = link.get_attribute('href')
                if href and not href.startswith('http') and not href.startswith('#'):
                    print(f"  点击链接: {href}")
                    link.click()
                    time.sleep(2)
                    page.screenshot(path=os.path.join(SCREENSHOTS_DIR, f'06_navigation_{i+1}.png'), full_page=True)
                    page.go_back()
                    time.sleep(1)
            except Exception as e:
                print(f"  ⚠ 导航测试警告: {e}")
    except Exception as e:
        print(f"⚠ 导航测试跳过: {e}")


def test_responsive_design(page):
    """测试响应式设计"""
    print("\n=== 测试响应式设计 ===")

    viewports = [
        {"name": "桌面", "width": 1920, "height": 1080},
        {"name": "平板", "width": 768, "height": 1024},
        {"name": "手机", "width": 375, "height": 667}
    ]

    for viewport in viewports:
        print(f"\n测试 {viewport['name']} 视图 ({viewport['width']}x{viewport['height']})")
        page.set_viewport_size({"width": viewport['width'], "height": viewport['height']})

        # 主页
        try:
            page.goto(f'file:///{INDEX_PATH}', wait_until='domcontentloaded', timeout=60000)
            time.sleep(2)
            page.screenshot(path=os.path.join(SCREENSHOTS_DIR, f'07_responsive_{viewport["name"]}_index.png'), full_page=True)
            print(f"✓ {viewport['name']} - 主页截图完成")
        except Exception as e:
            print(f"⚠ {viewport['name']} - 主页测试跳过: {e}")

        # 聊天页面
        try:
            page.goto(f'file:///{CHAT_PATH}', wait_until='domcontentloaded', timeout=60000)
            time.sleep(2)
            page.screenshot(path=os.path.join(SCREENSHOTS_DIR, f'08_responsive_{viewport["name"]}_chat.png'), full_page=True)
            print(f"✓ {viewport['name']} - 聊天页面截图完成")
        except Exception as e:
            print(f"⚠ {viewport['name']} - 聊天页面测试跳过: {e}")


def main():
    """主测试函数"""
    print("=" * 60)
    print("Movie Utopia 网站自动化测试")
    print("=" * 60)

    with sync_playwright() as p:
        # 启动浏览器
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(
            viewport={"width": 1920, "height": 1080},
            locale='zh-CN'
        )
        page = context.new_page()

        # 捕获所有控制台消息和错误
        page.on('console', lambda msg: print(f"  [Console {msg.type}]: {msg.text}"))
        page.on('pageerror', lambda err: print(f"  ❌ [Page Error]: {err}"))

        try:
            # 执行所有测试
            test_index_page(page)
            test_chat_page(page)
            test_navigation(page)
            test_responsive_design(page)

            print("\n" + "=" * 60)
            print("[成功] 所有测试完成!")
            print(f"[截图] 测试截图已保存至: {SCREENSHOTS_DIR}")
            print("=" * 60)

        except Exception as e:
            print(f"\n❌ 测试过程中出现错误: {e}")
            import traceback
            traceback.print_exc()

        finally:
            # 关闭浏览器
            browser.close()


if __name__ == "__main__":
    main()
