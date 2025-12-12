# 学生照片说明

## 📸 照片需求

本目录用于存放学生照片。请按照以下规范添加照片。

## 📋 需要添加的照片

根据 `data/members.json` 的配置，需要以下照片：

### PhD 学生
1. `zhang_zheng.jpg` - 章政
2. `yu_sicheng.jpg` - 于思成

### MPhil 学生
1. `ding_guanzhi.jpg` - 丁冠智
2. `chen_junliang.jpg` - 陈俊良
3. `yin_ziran.jpg` - 殷梓然
4. `tang_yuxin.jpg` - 汤玉欣
5. `lu_yi.jpg` - 卢亿
6. `wen_shiqi.jpg` - 文诗琪
7. `chen_zhen.jpg` - 陈镇
8. `chen_tian.jpg` - 陈天

## 🎨 照片规格要求

- **格式**：JPG 或 PNG
- **尺寸**：建议 400x400 像素以上（正方形）
- **大小**：不超过 500KB
- **背景**：建议使用纯色或简洁背景
- **质量**：清晰、光线充足

## 📥 如何添加照片

### 方法1：从问卷下载（推荐）

1. 打开 CSV 文件中的照片下载链接
2. 下载每位成员的照片
3. 重命名为对应的文件名（如 `zhang_zheng.jpg`）
4. 复制到本目录

### 方法2：使用占位图（临时方案）

如果暂时没有照片，可以使用在线头像生成服务：

**UI Avatars（无需下载）**：
- 网址：https://ui-avatars.com/
- 示例：`https://ui-avatars.com/api/?name=Zhang+Zheng&size=400&background=5B5F97&color=fff`

只需在 `members.json` 中修改 `photo` 字段为上述URL即可。

### 方法3：使用默认头像

创建一个 `placeholder.jpg` 作为默认头像，所有缺失照片都使用这个。

## 🔄 批量下载脚本（可选）

如果需要批量下载问卷照片，可以创建脚本（需要Python环境）：

```python
import requests
import csv

# 读取CSV文件并下载照片
# （这里可以根据实际情况编写脚本）
```

## ✅ 检查清单

- [ ] 所有照片已下载
- [ ] 文件名与 members.json 中的配置一致
- [ ] 照片格式和尺寸符合要求
- [ ] 照片清晰可用
- [ ] 测试网页显示正常

## 📝 注意事项

1. **文件命名**：必须与 JSON 中的 `photo` 字段路径匹配
2. **文件扩展名**：统一使用小写（.jpg 或 .png）
3. **隐私保护**：确保已获得成员同意使用照片
4. **版权**：使用合法授权的照片

---

**创建日期**：2025-12-03  
**维护者**：实验室管理员

