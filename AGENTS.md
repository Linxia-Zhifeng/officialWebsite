# AGENTS.md - 林下之风科技官网项目说明

## 项目概述

林下之风科技官方网站，是一个基于 Vue 3 + TypeScript + Vite 构建的企业展示型网站。网站采用极简扁平化设计风格，体现"林下清风"的清雅意象，传达"可靠、高效、清朗"的专业品牌感知。

## 技术栈

- **框架**: Vue 3 (Composition API)
- **语言**: TypeScript
- **构建工具**: Vite
- **路由**: Vue Router 5
- **国际化**: Vue I18n 11
- **样式**: 原生 CSS (CSS Variables 实现主题系统)

## 项目结构

```
officialWebsite/
├── src/
│   ├── components/          # 通用组件
│   │   ├── Header.vue       # 顶部导航栏
│   │   ├── Footer.vue       # 页脚
│   │   ├── HeroSection.vue  # 首屏区域
│   │   ├── AdvantagesSection.vue  # 核心优势
│   │   ├── ServicesSection.vue    # 业务服务
│   │   ├── ProcessSection.vue     # 服务流程
│   │   ├── CasesSection.vue      # 客户案例
│   │   ├── AboutSection.vue      # 关于我们
│   │   └── ContactSection.vue    # 联系我们
│   ├── pages/               # 页面组件
│   │   ├── HomePage.vue
│   │   ├── ServicesPage.vue
│   │   ├── CapabilitiesPage.vue
│   │   ├── CasesPage.vue
│   │   ├── AboutPage.vue
│   │   └── ContactPage.vue
│   ├── composables/         # 组合式函数
│   │   └── useTheme.ts      # 主题管理
│   ├── locales/             # 国际化
│   │   ├── index.ts         # i18n 配置
│   │   ├── zh.ts            # 中文文案
│   │   └── en.ts            # 英文文案
│   ├── router/              # 路由
│   │   └── index.ts
│   ├── styles/              # 样式
│   │   └── variables.css   # CSS变量与主题
│   ├── App.vue
│   ├── main.ts
│   └── style.css
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## 功能特性

### 1. 主题切换
- 支持浅色/深色两种主题
- 通过 `data-theme` 属性在 `<html>` 上切换
- 用户选择持久化到 localStorage
- 使用 CSS Variables 实现无缝切换

### 2. 国际化
- 支持中文（zh）和英文（en）
- 用户选择持久化到 localStorage
- 可扩展更多语言

### 3. 页面路由
- `/` - 首页
- `/services` - 业务服务
- `/capabilities` - 技术能力
- `/cases` - 客户案例
- `/about` - 关于我们
- `/contact` - 联系我们

### 4. 响应式设计
- 桌面端 (1024px+)
- 平板 (768px - 1024px)
- 移动端 (< 768px)

## 开发命令

```bash
# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev

# 构建生产版本
pnpm build

# 预览生产版本
pnpm preview
```

## 设计规范

详见 [DESIGN.md](./DESIGN.md)

## 代码规范

### 组件编写
- 使用 `<script setup lang="ts">` 语法
- Props 和 emits 需要显式声明类型
- 组件名使用 PascalCase

### 样式编写
- 使用 CSS Variables 引用主题色
- 遵循 BEM 命名规范
- 响应式断点: 768px, 1024px

### 国际化
- 所有文案统一管理在 `locales/` 目录
- 嵌套结构组织翻译内容
- 使用 `$t()` 或 `t()` 调用

## 注意事项

1. 不要在组件中硬编码颜色值，应使用 CSS 变量
2. 新增页面需在 `router/index.ts` 中注册路由
3. 新增文案需同时添加到 `zh.ts` 和 `en.ts`
4. 保持 Logo 风格统一，使用纯 SVG 矢量图形
