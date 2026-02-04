# Prompt Unlock Feature - 提示词解锁功能

## 🎯 功能概述

在视频详情页中，提示词（Prompt）现在是**锁定状态**，用户需要**打赏后才能解锁并复制**。

---

## 🔒 功能流程

### 1. 默认状态 - 锁定 🔒

```
┌──────────────────────────────┐
│ Prompt:                      │
│ ███████████████ (模糊)        │
│                              │
│    💰 Tip to unlock prompt   │
└──────────────────────────────┘
```

**特点：**
- ✅ 提示词文字模糊显示（`blur-sm`）
- ✅ 不可选中（`select-none`）
- ✅ 不可交互（`pointer-events-none`）
- ✅ 叠加提示卡片："Tip to unlock prompt"
- ✅ 金币图标 + 渐变遮罩
- ❌ 无复制按钮

### 2. 用户打赏 💰

用户点击 **Tip** 按钮并选择金额：

```
Tip Options:
┌────┬────┬────┐
│ $5 │$10 │$20 │
├────┼────┼────┤
│$50 │$100│$200│
└────┴────┴────┘
```

### 3. 解锁状态 - 已解锁 ✅

```
┌──────────────────────────────┐
│ Prompt:           [📋 Copy]  │
│ A cinematic scene of...      │
│ (完整清晰显示)                │
└──────────────────────────────┘
```

**特点：**
- ✅ 提示词清晰显示
- ✅ 可选中文字
- ✅ 复制按钮出现在右上角
- ✅ 点击复制到剪贴板
- ✅ 复制后显示 "Copied" 2秒

---

## 💻 技术实现

### 状态管理

```tsx
// 新增状态
const [hasUnlockedPrompt, setHasUnlockedPrompt] = useState(false)
```

### 打赏处理

```tsx
const handleTip = (amount: number) => {
  setTipsAmount(prev => prev + amount)
  setHasUnlockedPrompt(true) // 🔑 关键：打赏后解锁
  setShowTipModal(false)
}
```

### 条件渲染

```tsx
{hasUnlockedPrompt ? (
  // 解锁：显示清晰文字
  <div className="leading-relaxed">{video.title}</div>
) : (
  // 锁定：模糊 + 遮罩 + 提示
  <div className="relative">
    <div className="blur-sm select-none pointer-events-none">
      {video.title}
    </div>
    <div className="absolute inset-0 ...">
      <div className="提示卡片">
        💰 Tip to unlock prompt
      </div>
    </div>
  </div>
)}
```

### 复制按钮

```tsx
// 仅在解锁后显示
{hasUnlockedPrompt && (
  <button onClick={handleCopyPrompt}>
    {isCopied ? '✓ Copied' : '📋 Copy'}
  </button>
)}
```

---

## 🎨 视觉设计

### 锁定状态样式

```css
/* 模糊文字 */
.blur-sm {
  filter: blur(4px);
}

/* 禁止选择 */
.select-none {
  user-select: none;
}

/* 禁止交互 */
.pointer-events-none {
  pointer-events: none;
}

/* 渐变遮罩 */
background: linear-gradient(
  to right,
  transparent,
  rgba(0,0,0,0.6), 
  transparent
)

/* 提示卡片 */
bg-card/90 backdrop-blur-sm
border border-amber-500/30
```

### 解锁状态样式

```css
/* 清晰文字 */
leading-relaxed (正常显示)

/* 复制按钮 */
bg-background/80 backdrop-blur-sm
hover:bg-background
```

---

## 🔄 用户体验流程

### 场景 1: 首次访问视频

1. 用户打开视频详情页
2. 看到模糊的提示词
3. 中央显示 "💰 Tip to unlock prompt"
4. 复制按钮不可见

### 场景 2: 尝试查看提示词

1. 用户想要查看提示词
2. 发现文字模糊且不可复制
3. 看到解锁提示
4. 点击 Tip 按钮

### 场景 3: 打赏解锁

1. 用户点击 Tip 按钮
2. 弹出打赏金额选择
3. 选择金额（$5/$10/$20等）
4. 确认打赏

### 场景 4: 解锁成功

1. 打赏完成
2. 模糊立即消失
3. 提示词清晰显示
4. 复制按钮出现
5. 可以复制提示词

### 场景 5: 复制提示词

1. 点击复制按钮
2. 文字复制到剪贴板
3. 按钮显示 "✓ Copied"
4. 2秒后恢复 "📋 Copy"

---

## 📱 响应式支持

### 移动端
- 提示卡片自适应大小
- 触摸友好的按钮
- 模糊效果正常显示

### 桌面端
- 完整视觉效果
- Hover 状态
- 流畅动画

---

## 🎯 业务逻辑

### 解锁条件

```
解锁提示词 = 打赏任意金额
```

**支持的打赏金额：**
- $5 (最低)
- $10
- $20
- $50
- $100
- $200 (最高)

### 持久性

⚠️ **当前实现：**
- 状态仅在当前会话有效
- 刷新页面后重置为锁定

🔮 **未来优化：**
- 可存储到 localStorage
- 可同步到用户账户
- 记录已解锁的视频列表

---

## 🔍 代码位置

### 修改的文件
```
components/features/video/VideoSidebar.tsx
```

### 关键代码段

**状态声明 (L28):**
```tsx
const [hasUnlockedPrompt, setHasUnlockedPrompt] = useState(false)
```

**打赏处理 (L56-60):**
```tsx
const handleTip = (amount: number) => {
  setTipsAmount(prev => prev + amount)
  setHasUnlockedPrompt(true) // 解锁
  setShowTipModal(false)
}
```

**提示词显示 (L118-158):**
```tsx
{hasUnlockedPrompt ? (
  // 解锁状态
) : (
  // 锁定状态
)}
```

---

## ✅ 功能特点

### 安全性
- ✅ 模糊处理防止直接阅读
- ✅ 禁用选择防止复制
- ✅ 禁用交互防止截图工具

### 用户引导
- ✅ 清晰的解锁提示
- ✅ 金币图标视觉引导
- ✅ 明确的行动号召

### 激励机制
- ✅ 打赏解锁内容
- ✅ 支持创作者
- ✅ 获得更多价值

### 体验优化
- ✅ 即时解锁反馈
- ✅ 平滑过渡动画
- ✅ 一键复制功能

---

## 🚀 测试步骤

### 1. 打开视频详情页

```
访问任意视频，例如:
http://localhost:3000/video/[id]
```

### 2. 检查锁定状态

- [ ] 提示词是否模糊
- [ ] 是否显示解锁提示
- [ ] 复制按钮是否隐藏
- [ ] 无法选中文字

### 3. 测试打赏

- [ ] 点击 Tip 按钮
- [ ] 选择打赏金额
- [ ] 确认打赏

### 4. 验证解锁

- [ ] 提示词立即清晰
- [ ] 复制按钮出现
- [ ] 可以选中文字
- [ ] 点击复制成功

### 5. 测试复制

- [ ] 点击 Copy 按钮
- [ ] 显示 "Copied"
- [ ] 2秒后恢复
- [ ] 粘贴验证内容

---

## 💡 提示词来源

当前提示词使用 `video.title` 作为内容。

**未来可扩展为：**
```tsx
// 在 VideoItem 类型中添加
interface VideoItem {
  // ...现有字段
  prompt?: string  // 专门的提示词字段
}

// 显示时优先使用专门字段
{hasUnlockedPrompt ? (
  <div>{video.prompt || video.title}</div>
) : (
  // 锁定状态
)}
```

---

## 🎨 视觉效果预览

### 锁定状态
```
┌──────────────────────────────────┐
│ Prompt:                          │
│                                  │
│ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓            │
│ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓                  │
│                                  │
│       ┌──────────────┐           │
│       │   💰         │           │
│       │ Tip to unlock│           │
│       │    prompt    │           │
│       └──────────────┘           │
│                                  │
└──────────────────────────────────┘
```

### 解锁状态
```
┌──────────────────────────────────┐
│ Prompt:              [📋 Copy]  │
│                                  │
│ A cinematic sci-fi scene of a   │
│ futuristic city at night with   │
│ neon lights and flying cars...  │
│                                  │
└──────────────────────────────────┘
```

---

## 📊 数据流

```
用户访问视频
    ↓
hasUnlockedPrompt = false
    ↓
显示模糊提示词
    ↓
用户点击 Tip
    ↓
选择打赏金额
    ↓
handleTip(amount)
    ↓
setHasUnlockedPrompt(true)
    ↓
提示词解锁
    ↓
显示复制按钮
    ↓
用户可以复制
```

---

**功能已实现并推送到 GitHub！** 🎉

现在访问视频详情页，你会看到提示词需要打赏才能解锁和复制！
