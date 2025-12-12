# 论文详情页模板系统

> **版本**：v1.0  
> **创建日期**：2025-10-31  
> **风格**：学术简洁风格

---

## 📚 快速导航

- [文件说明](#文件说明)
- [快速开始](#快速开始)
- [模板特性](#模板特性)
- [使用文档](#使用文档)
- [示例页面](#示例页面)

---

## 文件说明

本目录包含完整的论文详情页模板系统：

```
papers/
├── paper-detail-template.html         # HTML模板（主文件）★
├── paper-detail.css                   # CSS样式文件 ★
├── paper-detail.js                    # JavaScript交互 ★
├── 论文详情页模板使用指南.md           # 完整使用文档 ★★★
├── README-论文详情页模板.md            # 本文档
├── example-opengs-slam.html           # 示例页面（带占位图）
└── images/                            # 图片目录（用户创建）
```

**★ 标记说明：**
- ★★★ 必读文档
- ★ 核心文件

---

## 快速开始

### 3分钟创建论文页面

**步骤1：复制模板**
```bash
cp paper-detail-template.html your-paper.html
```

**步骤2：准备图片**
```bash
mkdir -p images
# 将论文图片放入 images/ 目录
```

**步骤3：修改内容**
- 打开 `your-paper.html`
- 按照注释修改论文标题、作者、摘要等
- 替换图片路径
- 保存

**步骤4：预览**
```bash
# 使用本地服务器
python -m http.server 8000
# 访问 http://localhost:8000/papers/your-paper.html
```

**完成！🎉**

---

## 模板特性

### 🎨 设计特点

- ✅ **学术风格**：白色背景，简洁专业
- ✅ **信息清晰**：标题、作者、摘要分区明确
- ✅ **交互友好**：图片轮播、平滑滚动
- ✅ **完全响应式**：适配桌面、平板、手机
- ✅ **无障碍访问**：支持键盘导航和屏幕阅读器

### 🚀 核心功能

#### 1. 图片轮播系统
- 左右导航按钮
- 轮播指示器（自动生成）
- 键盘导航（←→箭头）
- 触摸滑动（移动端）
- 可选自动播放

#### 2. 论文信息展示
- 标题和会议/期刊
- 作者列表（支持上标标注）
- 机构信息
- arXiv/GitHub/Project链接
- Abstract摘要

#### 3. 方法和结果
- 方法流程图
- 结果对比表格
- 轨迹对比图
- 支持多个子章节

#### 4. BibTeX引用
- 格式化代码块
- 一键复制功能
- 状态提示

### 🛠️ 技术栈

- **HTML5**：语义化标签
- **Bulma CSS**：响应式框架（CDN）
- **Font Awesome**：图标库（CDN）
- **原生JavaScript**：无依赖

---

## 使用文档

### 完整文档

请查看：**[论文详情页模板使用指南.md](论文详情页模板使用指南.md)**

包含内容：
- 📋 模板概述
- 📁 文件说明
- 🚀 快速开始
- ✏️ 内容定制（详细）
- 🖼️ 图片资源管理
- ⚙️ 高级功能
- ❓ 常见问题
- 💡 最佳实践

### 快速参考

#### 修改论文标题
```html
<h1 class="title is-1 publication-title">
    您的论文标题
</h1>
```

#### 修改作者列表
```html
<h3 class="title is-5 authors-list">
    Author1<sup>*</sup>, 
    <a href="url">Author2</a><sup>✉</sup>
</h3>
```

#### 添加轮播图片
```html
<div class="carousel-item">
    <figure class="image">
        <img src="./images/your-image.png" alt="描述">
    </figure>
</div>
```

#### 修改论文链接
```html
<a href="https://arxiv.org/abs/xxx" class="button is-dark">
    <span class="icon"><i class="fas fa-file-pdf"></i></span>
    <span>arXiv</span>
</a>
```

---

## 示例页面

### 在线预览（示例）

查看 `example-opengs-slam.html` 获取完整示例。

**包含功能：**
- ✅ 完整的页面结构
- ✅ 图片轮播（使用占位图）
- ✅ 所有交互功能
- ✅ BibTeX引用

### 示例截图

```
┌─────────────────────────────────────┐
│  [← 返回研究页面]                    │
└─────────────────────────────────────┘

    RGB-Only Gaussian Splatting SLAM
           for Unbounded Outdoor Scenes
    
             ICRA 2025
    
    Author1*, Author2*, Author3✉
    HKUST(GZ)
    
    [arXiv] [Code] [Project]

─────────────────────────────────────

          Abstract
          
    论文摘要内容...
    
─────────────────────────────────────

    Novel View Rendering
    
    [← 图片轮播区域 →]
    ● ○ ○ ○ ○
    
─────────────────────────────────────

    SLAM System Pipeline
    
    [方法流程图]
    
    Comparison with Other Methods
    
    [结果对比表]
```

---

## 常见问题

### Q: 如何修改主题颜色？

**A:** 编辑 `paper-detail.css`：
```css
.conference-name {
    color: #3273dc;  /* 改为您的颜色 */
}
```

### Q: 图片不显示？

**A:** 检查：
1. 图片路径是否正确（相对路径）
2. 是否使用本地服务器预览
3. 图片文件名是否匹配（注意大小写）

### Q: 如何添加更多图片？

**A:** 复制 `<div class="carousel-item">` 结构：
```html
<div class="carousel-item">
    <figure class="image">
        <img src="./images/new-image.png" alt="描述">
    </figure>
</div>
```

### Q: 如何禁用自动播放？

**A:** 在 `paper-detail.js` 中：
```javascript
const autoPlay = false;  // 已默认关闭
```

### Q: 移动端显示异常？

**A:** 确保：
1. 已添加 viewport meta 标签（模板已包含）
2. 图片使用相对单位
3. 清除浏览器缓存（Ctrl+F5）

### 更多问题？

请查看完整文档：[论文详情页模板使用指南.md](论文详情页模板使用指南.md)

---

## 浏览器支持

| 浏览器 | 最低版本 | 状态 |
|--------|---------|------|
| Chrome | 90+ | ✅ 完全支持 |
| Firefox | 88+ | ✅ 完全支持 |
| Edge | 90+ | ✅ 完全支持 |
| Safari | 14+ | ✅ 完全支持 |
| 移动浏览器 | 最新版 | ✅ 完全支持 |
| IE 11 | - | ❌ 不支持 |

---

## 许可证

本模板基于以下项目创建：
- [Nerfies](https://github.com/nerfies/nerfies.github.io)
- [Marigold](https://marigoldmonodepth.github.io)

遵循 [CC-BY-SA-4.0](http://creativecommons.org/licenses/by-sa/4.0/) 许可证。

---

## 更新日志

### v1.0 (2025-10-31)
- ✨ 初始版本发布
- ✨ 完整的图片轮播系统
- ✨ 响应式设计
- ✨ BibTeX复制功能
- ✨ 详细的使用文档

---

## 技术支持

### 相关资源

- **Bulma文档**：https://bulma.io/documentation/
- **Font Awesome**：https://fontawesome.com/
- **MDN Web Docs**：https://developer.mozilla.org/

### 问题反馈

遇到问题时：
1. 查看浏览器控制台（F12）
2. 参考[常见问题](#常见问题)章节
3. 查阅完整使用文档
4. 检查代码注释

---

## 总结

本模板提供了一套**完整、专业、易用**的学术论文展示解决方案：

- ✅ **3分钟**即可创建论文页面
- ✅ **600+行**详细使用文档
- ✅ **完整示例**可直接参考
- ✅ **响应式设计**适配所有设备
- ✅ **无障碍访问**符合标准

**开始使用：**
1. 阅读[快速开始](#快速开始)
2. 查看[示例页面](#示例页面)
3. 参考[使用文档](#使用文档)

**祝您使用愉快！🎉**

---

*最后更新：2025-10-31*

