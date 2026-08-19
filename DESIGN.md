# DESIGN.md - 林下之风科技 UI 设计规范

## 设计理念

"林下之风" —— 传达清雅、扎实、从容的做事态度。设计上遵循极简扁平化风格，呼应"林下清风"的舒展感，体现"可靠、高效、清朗"的品牌气质。

核心原则：
- 极简留白，不堆砌装饰
- 纯矢量图形，视觉语言统一
- 低饱和度配色，稳重科技感
- 大面积留白，呼吸感强

## 配色方案

### 主色调（对应品牌意象）

| 变量名 | 色值 | 用途 |
|--------|------|------|
| `--color-primary` | `#1F3D30` | 主色（深墨绿），对应"林"，传递沉稳可靠 |
| `--color-secondary` | `#7CB8B0` | 辅助色（雾青蓝），对应"风"，体现灵动高效 |
| `--color-accent` | `#4A8F86` | 强调色，次要交互元素 |

### 文字色彩

| 变量名 | 浅色模式 | 深色模式 | 用途 |
|--------|----------|----------|------|
| `--color-text-heading` | `#1A1A1A` | `#FFFFFF` | 标题文字 |
| `--color-text` | `#333333` | `#C0C4CC` | 正文文字 |
| `--color-text-secondary` | `#666666` | `#909399` | 次要文字 |
| `--color-text-muted` | `#999999` | `#606266` | 辅助说明 |

### 背景色彩

| 变量名 | 浅色模式 | 深色模式 | 用途 |
|--------|----------|----------|------|
| `--color-bg` | `#FFFFFF` | `#161C19` | 主背景 |
| `--color-bg-secondary` | `#F8F9FA` | `#1C2420` | 次级背景 |
| `--color-bg-card` | `#FFFFFF` | `#1C2420` | 卡片背景 |

### 边框与阴影

| 变量名 | 色值 | 用途 |
|--------|------|------|
| `--color-border` | `#E5E7EB` / `#2D3530` | 主要边框 |
| `--color-border-light` | `#F0F2F4` / `#232C28` | 浅色边框 |
| `--color-shadow` | `rgba(31, 61, 48, 0.08)` / `rgba(0, 0, 0, 0.3)` | 卡片阴影 |

## 字体规范

### 字体族

```css
--font-sans: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif;
```

### 字号层级

| 变量名 | 字号 | 用途 |
|--------|------|------|
| `--font-size-4xl` | 64px | Hero 主标题 |
| `--font-size-3xl` | 48px | 大标题、页面标题 |
| `--font-size-2xl` | 32px | 板块标题 |
| `--font-size-xl` | 24px | 卡片标题 |
| `--font-size-lg` | 18px | 副标题、重要文字 |
| `--font-size-base` | 16px | 正文 |
| `--font-size-sm` | 14px | 次要文字 |
| `--font-size-xs` | 12px | 标签、辅助信息 |

### 字重

| 变量名 | 值 | 用途 |
|--------|------|------|
| `--font-weight-normal` | 400 | 正文 |
| `--font-weight-medium` | 500 | 次要标题、按钮 |
| `--font-weight-semibold` | 600 | 标题 |
| `--font-weight-bold` | 700 | Hero 标题 |

## 间距系统

### 间距变量

| 变量名 | 值 | 用途 |
|--------|------|------|
| `--spacing-xs` | 4px | 紧凑间距 |
| `--spacing-sm` | 8px | 小间距 |
| `--spacing-md` | 16px | 标准间距 |
| `--spacing-lg` | 24px | 中等间距 |
| `--spacing-xl` | 32px | 大间距 |
| `--spacing-2xl` | 48px | 特大间距 |
| `--spacing-3xl` | 64px | 板块间距 |
| `--spacing-4xl` | 96px | 超大间距 |

### 布局间距

- 页面板块内边距：`--spacing-4xl` (96px)
- 板块标题与内容间距：`--spacing-2xl` (48px)
- 卡片内边距：`--spacing-xl` (32px)
- 组件元素间距：`--spacing-md` (16px)

## 圆角规范

| 变量名 | 值 | 用途 |
|--------|------|------|
| `--radius-sm` | 4px | 标签、小按钮 |
| `--radius-md` | 8px | 按钮、输入框 |
| `--radius-lg` | 16px | 卡片 |
| `--radius-xl` | 24px | 大容器（预留） |

## 组件规范

### 按钮

**主按钮（btn-primary）**
- 背景：`--color-primary`
- 文字：#FFFFFF
- Hover：`--color-primary-light`
- 用于主要操作：提交、咨询、确认

**次按钮（btn-secondary）**
- 背景：透明
- 边框：`--color-primary`
- 文字：`--color-primary`
- Hover：填充主色
- 用于次要操作：查看更多、了解详情

### 卡片

- 背景：`--color-bg-card`
- 边框：`--color-border-light`
- 圆角：`--radius-lg`
- Hover：轻微上浮 + 边框变辅助色

### 输入框

- 背景：`--color-bg-secondary`
- 边框：`--color-border`
- Focus：边框变为 `--color-primary`
- 圆角：`--radius-md`

### 导航链接

- 文字：`--color-text`
- Hover/Active：`--color-primary`
- Active 状态：底部显示 `--color-secondary` 色条

## 视觉元素规则

### 图标风格
- 使用纯 SVG 矢量图形
- 线条风格：stroke 宽度 2px
- 圆角端点：stroke-linecap: round
- 填充风格：currentColor 继承颜色
- **禁止** 使用 Emoji 图标
- **禁止** 使用渐变图标

### 装饰元素
- 抽象线条：细线条（1px），低透明度
- 几何图形：圆形、矩形，低透明度
- 数据流线条：配合动画，暗合"林风"意象
- **禁止** 使用写实竹林、树木、风景插画
- **禁止** 使用复杂的纹理和图案

### 动效规范
- 过渡时间：150ms / 250ms / 350ms
- 缓动函数：ease / ease-in-out
- 保持克制，不喧宾夺主
- 仅用于：hover 状态、页面切换、关键数据展示

## 响应式设计

### 断点

| 断点 | 宽度 | 布局 |
|------|------|------|
| 桌面端 | ≥ 1024px | 多列网格，完整展示 |
| 平板 | 768px - 1024px | 两列网格，适度缩放 |
| 移动端 | < 768px | 单列垂直布局 |

### 适配要点
- 导航栏：移动端折叠为汉堡菜单
- 网格布局：移动端全部改为单列
- 字号：移动端标题适当缩小
- 间距：移动端间距适当紧凑

## Logo 使用规范

Logo 由纯几何图形构成，象征"森林的数据柱"：
- 四个高低不同的矩形，形成数据可视化效果
- 透明度渐变，层次分明
- 主色：`--color-primary`

**使用规则**：
- 保持清晰可识别性
- 最小尺寸：32px
- 颜色必须使用 `currentColor` 继承
- **禁止** 对 Logo 添加阴影、渐变等效果

## 品牌调性关键词

- 清雅 / Elegant
- 扎实 / Solid
- 从容 / Unhurried
- 可靠 / Reliable
- 高效 / Efficient
- 清朗 / Clear

## 禁止事项

1. ❌ 禁止使用写实风景图（竹林、山水等）
2. ❌ 禁止使用 Emoji 作为图标
3. ❌ 禁止过度使用渐变和阴影
4. ❌ 禁止多种设计语言混用
5. ❌ 禁止堆砌装饰元素
6. ❌ 禁止使用花哨的动画效果
7. ❌ 禁止文字拥挤压抑
