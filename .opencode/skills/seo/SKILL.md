---
name: "seo"
description: "为网站执行完整SEO检查与优化：meta标签、Open Graph、Twitter Card、JSON-LD结构化数据、sitemap、robots.txt、SPA动态路由SEO。当用户要求检查/优化SEO、提升搜索排名、配置社交分享预览或结构化数据时调用。"
---

# 网站 SEO 优化

本技能提供完整的网站 SEO 检查与优化工作流，适用于 Vue/React 等 SPA 站点及静态站点。

## 何时调用

当用户提出以下需求时调用：
- 检查网站 SEO 情况 / SEO 做得怎么样
- 优化 SEO、提升搜索排名、提升自然流量
- 配置社交分享预览（Open Graph / Twitter Card）
- 添加结构化数据（JSON-LD）
- 创建 sitemap.xml / robots.txt
- 处理 SPA 动态路由的 SEO（路由切换更新 meta）
- 多语言 SEO（hreflang / og:locale）

## SEO 检查清单

按以下清单逐项核对，缺失项即为待优化点。

### 1. 基础 meta 标签
- `<title>`：每个页面唯一、含核心关键词，建议 50-60 字符（中文 20-30 字）
- `<meta name="description">`：150-160 字符，含关键词，具吸引力
- `<meta name="keywords">`：相关关键词（中文搜索引擎仍参考）
- `<meta name="author">`
- `<meta name="robots" content="index, follow">`
- `<meta name="viewport" content="width=device-width, initial-scale=1.0">`
- `<html lang="...">` 与内容语言一致

### 2. canonical 与 hreflang
- `<link rel="canonical">`：每个页面指向自身规范 URL，避免重复内容
- `<link rel="alternate" hreflang="...">`：多语言版本（含 `x-default`）

### 3. Open Graph（社交分享预览）
- `og:title` / `og:description`
- `og:url` / `og:image`（建议 1200x630 或更大，≤8MB）
- `og:type`（website / article / profile）
- `og:site_name`
- `og:locale` / `og:locale:alternate`

### 4. Twitter Card
- `twitter:card = summary_large_image`
- `twitter:title` / `twitter:description` / `twitter:image`

### 5. 结构化数据（JSON-LD）
- `Organization`：公司信息（名称、logo、联系方式、地址）
- `WebSite`：网站信息（含 `inLanguage`）
- `BreadcrumbList`：多级页面面包屑
- `Service` / `Product`：服务或产品详情
- `FAQPage`：常见问题
- 验证：https://search.google.com/test/rich-results

### 6. 站点文件
- `public/robots.txt`：允许爬取 + 指向 sitemap
- `public/sitemap.xml`：列出所有可索引 URL + `lastmod` + `priority` + `hreflang`
- `public/site.webmanifest`：PWA manifest（含 `theme_color`、`icons`）
- `public/favicon.svg` + `apple-touch-icon`

### 7. SPA 动态 SEO（关键）
SPA（Vue/React history 模式）默认只在 `index.html` 有一套 meta，路由切换不更新 → 搜索引擎只看到首页。

必须实现：
- 创建 SEO composable（如 `src/composables/useSeo.ts`）：动态更新 `title` / `description` / `canonical` / `og:*` / `twitter:*`
- 路由 `meta.seo` 中为每个页面配置 title / description / keywords
- `router.afterEach` 中调用 SEO 更新函数
- 语言切换时重新应用 SEO（注意避免循环依赖）

### 8. 性能与可访问性（影响排名）
- `<link rel="preconnect">` / `dns-prefetch`
- 图片 `alt` 属性
- 语义化 HTML（`h1`-`h6`、`main`、`nav`、`footer`）
- 移动端适配
- `<noscript>` 兜底内容（JS 失效时仍可读）

## 优化工作流

1. 读取 `index.html`，按清单逐项补全缺失的 meta 标签
2. 创建 `src/composables/useSeo.ts`（动态 SEO 管理）
3. 在路由 `meta.seo` 中配置每页 title / description / keywords
4. `router.afterEach` 调用 `applyRouteSeo(to)`
5. 生成 `og-image`（品牌色，1200x630+，纯色块，不用渐变阴影）
6. 创建 `public/robots.txt` / `public/sitemap.xml` / `public/site.webmanifest`
7. 在 `index.html` 添加 JSON-LD（`Organization` + `WebSite`）
8. 添加 `<noscript>` 兜底、`theme-color`、`preconnect`
9. 构建验证：`pnpm build` 通过且无类型错误

## 验证方法

- **Lighthouse**：Chrome DevTools → Lighthouse → SEO 评分（目标 100）
- **Google Rich Results Test**：https://search.google.com/test/rich-results （验证 JSON-LD）
- **Open Graph 预览**：https://www.opengraph.xyz/
- **Twitter Card**：https://cards-dev.twitter.com/validator
- **手动查看**：浏览器 `view-source:` 查看 `index.html` 原始输出
- **路由切换**：切换路由后检查 `document.title` 与 meta 是否更新

## 注意事项

- 域名、邮箱、电话、地址等占位符必须替换为真实信息
- `sitemap.xml` 中 `lastmod` 保持与内容更新同步
- 多语言站点必须配置 `hreflang`，避免重复内容判罚
- SPA 首屏 HTML 是搜索引擎主要依据；若需更强 SEO，考虑 SSR/预渲染
- `og:image` 必须是绝对 URL（含 https://域名）
- 不要在 meta 中堆砌关键词，保持自然可读

## 参考实现

本项目（林下之风科技官网）已实现完整 SEO，可作为参考：
- `src/composables/useSeo.ts`：动态 SEO composable（`setSeo` / `applyRouteSeo`）
- `src/router/index.ts`：路由级 SEO 配置（`meta.seo`）
- `index.html`：完整 meta + Open Graph + Twitter Card + JSON-LD
- `public/robots.txt` / `public/sitemap.xml` / `public/site.webmanifest` / `public/og-image.jpg`
