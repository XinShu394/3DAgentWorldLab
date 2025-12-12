# 论文图片资源目录

本目录用于存放论文详情页的所有图片资源。

## 📁 目录说明

将您的论文相关图片放在此目录下，HTML文件通过相对路径引用：

```html
<img src="./images/your-image.png" alt="描述">
```

## 🖼️ 图片命名规范

建议使用清晰的命名方式：

```
images/
├── rendering1.png              # 渲染结果-场景1
├── rendering2.png              # 渲染结果-场景2
├── rendering3.png              # 渲染结果-场景3
├── pipeline.png                # 方法流程图
├── comparison-table.png        # 数值对比表
├── comparison-visual.png       # 视觉对比图
├── trajectory.png              # 轨迹对比
└── architecture.png            # 网络架构图
```

## 📊 图片规格建议

| 用途 | 建议尺寸 | 格式 | 文件大小 |
|------|---------|------|---------|
| 轮播图 | 1920×1080 或 1600×900 | PNG/JPG | < 2MB |
| 流程图 | 1200×600 | PNG | < 1MB |
| 对比表格 | 800×600 | PNG | < 500KB |
| 轨迹图 | 1200×800 | PNG | < 1MB |

## 🎨 图片优化

### 推荐工具

- **在线压缩**：https://tinypng.com/
- **Google Squoosh**：https://squoosh.app/
- **Photoshop**：导出为Web格式

### 优化建议

- ✅ 使用 PNG 格式保存图表和截图（保持清晰度）
- ✅ 使用 JPG 格式保存照片（减小文件大小）
- ✅ 确保图片分辨率适中（不要过高）
- ✅ 压缩后文件大小控制在合理范围
- ✅ 考虑使用 WebP 格式（更小的文件）

## 📝 使用示例

### 在HTML中引用图片

```html
<!-- 轮播图 -->
<div class="carousel-item">
    <figure class="image">
        <img src="./images/rendering1.png" 
             alt="Novel view rendering comparison">
    </figure>
</div>

<!-- 方法流程图 -->
<figure class="image">
    <img src="./images/pipeline.png" 
         alt="System pipeline diagram">
</figure>

<!-- 对比表格（60%宽度） -->
<figure class="image comparison-table">
    <img src="./images/comparison-table.png" 
         alt="Performance comparison table">
</figure>
```

## ⚠️ 注意事项

1. **文件路径**：使用相对路径 `./images/xxx.png`
2. **文件名**：避免使用中文和特殊字符
3. **Alt属性**：必须为所有图片添加描述（无障碍访问）
4. **文件大小**：保持合理以提升加载速度
5. **版权**：确保拥有图片使用权

## 📦 批量处理

### 使用命令行批量压缩（macOS/Linux）

```bash
# 安装 ImageMagick
brew install imagemagick  # macOS
# sudo apt install imagemagick  # Ubuntu

# 批量压缩PNG（保持原比例，质量90%）
for file in *.png; do
    convert "$file" -quality 90 "compressed_$file"
done

# 批量转换为WebP
for file in *.png; do
    cwebp -q 85 "$file" -o "${file%.png}.webp"
done
```

### 使用Python批量重命名

```python
import os

# 批量添加前缀
for i, filename in enumerate(os.listdir('.')):
    if filename.endswith('.png'):
        new_name = f"rendering{i+1}.png"
        os.rename(filename, new_name)
```

## 📚 更多资源

- [图片优化最佳实践](https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images)
- [WebP格式介绍](https://developers.google.com/speed/webp)
- [无障碍图片Alt文本指南](https://www.w3.org/WAI/tutorials/images/)

---

**提示**：本目录下的 `README.md` 文件可以删除，不会影响网站功能。

