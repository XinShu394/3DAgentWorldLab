# Logo 文件说明

## 📍 当前目录

本目录用于存放网站的 logo 文件。

## 📁 需要放置的文件

请将您的 logo 文件命名为 `logo.png` 并放置在此目录：

```
webnew/images/logo.png
```

## 📐 Logo 规格建议

### 当前使用（临时）
- 格式：PNG
- 背景：黑色（临时可以）
- 尺寸：任意（会自动缩放）

### 未来优化
- 格式：PNG 或 SVG（推荐SVG）
- 背景：透明
- 尺寸建议：
  - PNG: 128×128px 或 256×256px
  - SVG: 矢量图（任意尺寸）
- 文件大小：< 100KB

## 🎯 Logo 使用位置

### 1. 论文详情页
- 文件：`papers/*.html`
- 位置：导航栏左侧
- 显示尺寸：36px × 36px（桌面）

### 2. 主站（future）
可以在主站的导航栏也使用相同的 logo。

## 🔄 更换 Logo

### 方法 1：直接替换
```bash
# 直接替换文件
cp your-new-logo.png webnew/images/logo.png

# 刷新浏览器
Ctrl + F5
```

### 方法 2：使用不同文件名
如果想使用不同的文件名（如 `logo-transparent.png`）：

1. 将文件放入 `webnew/images/`
2. 修改 HTML 文件中的路径：
   ```html
   <img src="../images/logo-transparent.png" ...>
   ```

## 📝 当前状态

- ✅ 论文详情页已集成logo
- ⏳ 等待透明背景版本
- 📋 主站logo待添加

---

**提示**：本 README 文件不会影响网站功能，可随时删除。

