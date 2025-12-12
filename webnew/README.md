# 3DAgentWorldLab 官方网站

> **渐变流线视觉风格 + 数据驱动架构**  
> 整合版本 v1.0 | 创建日期: 2025-10-29

## 🎨 项目概述

这是 3DAgentWorldLab 实验室的官方网站，采用现代化的渐变流线视觉风格和数据驱动架构。网站展示实验室的研究成果、团队成员和最新活动。

### 核心特性

- ✨ **渐变流线视觉风格**：科技感十足的深色主题，流动的线条和粒子动画
- 📊 **数据驱动架构**：通过JSON文件管理内容，无需修改HTML代码
- 📱 **完全响应式**：适配桌面、平板和移动设备
- 🚀 **高性能**：纯静态网站，加载速度快
- 🎯 **易于维护**：清晰的目录结构和详细的文档

## 📁 项目结构

```
webnew/
├── index.html              # 首页（渐变流线风格）
├── members.html            # 团队成员页面
├── research.html           # 研究成果页面
├── activity.html           # 活动新闻页面
├── styles.css              # 全局样式（整合风格）
├── script.js               # 交互脚本和数据加载
│
├── data/                   # 数据文件目录（JSON）
│   ├── config.json         # 网站配置
│   ├── members.json        # 成员信息
│   ├── papers.json         # 论文和项目
│   ├── activities.json     # 活动和新闻
│   └── README.md           # 数据维护指南
│
├── members/                # 成员详情页模板
│   ├── member-template.html
│   ├── member-styles.css
│   └── README.md
│
├── papers/                 # 论文详情页模板
│   ├── paper-template.html
│   ├── paper-styles.css
│   └── README.md
│
├── svg/                    # SVG图标（可选）
└── README.md               # 本文档
```

## 🚀 快速开始

### 1. 部署网站

**本地预览：**

使用任何本地服务器工具，例如：

```bash
# 使用 Python
python -m http.server 8000

# 使用 Node.js (http-server)
npx http-server

# 使用 VS Code Live Server 插件
右键 index.html -> "Open with Live Server"
```

然后访问：`http://localhost:8000`

**在线部署：**

- GitHub Pages
- Netlify
- Vercel
- 任何静态网站托管服务

### 2. 更新内容

所有内容都通过 JSON 文件管理，无需修改 HTML：

#### 添加新成员

编辑 `data/members.json`：

```json
{
  "phd_students": [
    {
      "name": "Zhang San",
      "position": "PhD Student",
      "group": "3D 小组",
      "research_direction": "3D Vision",
      "email": "zhang@hkust.edu.cn",
      "joined_year": "2024"
    }
  ]
}
```

#### 添加新论文

编辑 `data/papers.json`：

```json
{
  "papers": [
    {
      "title": "Paper Title",
      "authors": ["Author 1", "Author 2"],
      "venue": "CVPR 2024",
      "year": "2024",
      "status": "published",
      "abstract": "摘要内容...",
      "pdf_url": "papers/paper.pdf"
    }
  ]
}
```

#### 添加新活动

编辑 `data/activities.json`：

```json
{
  "activities": [
    {
      "title": "研讨会",
      "date": "2024-11-01",
      "location": "HKUST(GZ)",
      "description": "活动描述..."
    }
  ]
}
```

详细的数据维护指南请查看：[data/README.md](data/README.md)

## 🎨 设计风格

### 视觉特点

- **深色主题**：深邃的太空蓝（#1A1D35）为主色调
- **渐变效果**：柔和的径向渐变背景
- **流动线条**：SVG动画线条模拟数据流动
- **粒子系统**：轻微浮动的光点营造科技感
- **几何框架**：抽象的3D线框装饰
- **玻璃态效果**：模糊背景和半透明卡片

### 色彩系统

```css
--bg-dark: #1A1D35;       /* 主背景 */
--bg-mid: #2D3156;        /* 次背景 */
--primary: #5B5F97;       /* 主题色 */
--accent: #7B83C5;        /* 强调色 */
--text-primary: #FFFFFF;  /* 主文字 */
--text-secondary: #C8CCDE;/* 次文字 */
```

## 🛠️ 技术栈

- **HTML5**：语义化标签
- **CSS3**：
  - CSS Variables（自定义属性）
  - Flexbox & Grid 布局
  - CSS动画和过渡
  - Backdrop-filter（背景模糊）
- **JavaScript (ES6+)**：
  - Fetch API（数据加载）
  - Async/Await
  - 类和模块化
  - DOM操作

**无依赖**：纯原生技术，无需框架或库

## 📝 维护指南

### 日常更新

1. **修改文本内容**：编辑对应的 JSON 文件
2. **添加新页面**：使用 `members/` 或 `papers/` 中的模板
3. **调整样式**：修改 `styles.css`
4. **修改交互**：编辑 `script.js`

### 注意事项

- ✅ 修改JSON前先备份
- ✅ 使用 [JSONLint](https://jsonlint.com/) 验证格式
- ✅ 测试不同浏览器兼容性
- ✅ 检查响应式布局（手机/平板/桌面）
- ❌ 不要直接修改HTML中的内容
- ❌ 避免破坏JSON结构

### 添加新功能

1. 在 `script.js` 中添加新的类或函数
2. 在 `styles.css` 中添加对应样式
3. 更新相关的 HTML 文件
4. 测试功能正常工作
5. 更新文档

## 🔧 常见问题

### Q: 页面显示空白或加载失败？

**A:** 检查：
1. 是否使用本地服务器（而不是直接打开HTML文件）
2. 浏览器控制台是否有错误（F12）
3. JSON文件格式是否正确
4. 文件路径是否正确

### Q: 如何修改网站配色？

**A:** 编辑 `styles.css` 中的 `:root` 部分：

```css
:root {
    --bg-dark: #YOUR_COLOR;
    --primary: #YOUR_COLOR;
    /* ... */
}
```

### Q: 如何禁用动画效果？

**A:** 在 `styles.css` 中注释掉动画相关代码，或添加：

```css
* {
    animation: none !important;
    transition: none !important;
}
```

### Q: 数据没有显示？

**A:** 检查：
1. JSON文件路径正确
2. JSON格式有效
3. 浏览器控制台查看错误信息
4. 网络请求是否成功（Network标签）

## 📊 性能优化

已实施的优化：

- ✅ 最小化DOM操作
- ✅ CSS动画使用 `transform` 和 `opacity`
- ✅ 使用 `will-change` 提示浏览器
- ✅ 图片懒加载（可选）
- ✅ 响应式图片（可选）

建议的优化：

- 压缩CSS和JavaScript
- 启用Gzip压缩
- 使用CDN加速
- 添加图片优化

## 🌐 浏览器支持

- ✅ Chrome/Edge 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ⚠️ IE 11 不支持（需polyfill）

## 📚 相关文档

- [数据维护指南](data/README.md)
- [成员页面模板说明](members/README.md)
- [论文页面模板说明](papers/README.md)

## 👥 贡献指南

如需贡献代码或报告问题：

1. Fork 本项目
2. 创建功能分支
3. 提交代码并测试
4. 发起 Pull Request

## 📄 许可证

本项目遵循 MIT 许可证。

## 🔗 联系方式

- **实验室主页**：[https://3dagentworld.lab](https://3dagentworld.lab)
- **Email**：info@3dagentworld.lab
- **GitHub**：[github.com/3dagentworld](https://github.com/3dagentworld)

---

## 🎯 版本历史

### v1.0 (2025-10-29)
- ✨ 初始版本发布
- ✨ 整合渐变流线视觉风格
- ✨ 实现数据驱动架构
- ✨ 完整的响应式设计
- ✨ 成员和论文模板系统

---

**开发团队**: AI Cursor + 3DAgentWorldLab  
**最后更新**: 2025-10-29  
**架构版本**: 渐变流线风格 + 数据驱动 v1.0

