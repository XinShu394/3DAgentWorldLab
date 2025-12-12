# 数据文件说明

这个目录包含网站的所有内容数据。修改这些 JSON 文件即可更新网站内容，无需修改HTML代码。

## 📁 文件说明

| 文件 | 用途 | 对应页面 |
|------|------|---------|
| `config.json` | 网站配置（站点信息、导航、联系方式） | 全站 |
| `members.json` | 成员信息（导师、博士生、硕士生、校友） | members.html |
| `papers.json` | 论文和项目信息 | research.html |
| `activities.json` | 活动和新闻 | activity.html |

## ✏️ 快速编辑指南

### 添加新成员

1. 打开 `members.json`
2. 在对应类别（`phd_students`、`mphil_students`）添加：

```json
{
  "id": "phd003",
  "name": "Zhang San",
  "name_zh": "张三",
  "position": "PhD Student",
  "group": "3D 小组",
  "research_direction": "3D Vision, Machine Learning",
  "photo": "images/students/zhang.jpg",
  "email": "zhang@hkust.edu.cn",
  "website": "",
  "joined_year": "2024"
}
```

### 添加新论文

1. 打开 `papers.json`
2. 在 `papers` 数组中添加：

```json
{
  "id": "paper003",
  "title": "Your Paper Title",
  "authors": ["Author 1", "Author 2"],
  "venue": "ICCV 2024",
  "year": "2024",
  "status": "published",
  "status_text": "已发表",
  "group": "3d",
  "abstract": "论文摘要...",
  "pdf_url": "papers/paper003.pdf",
  "code_url": "https://github.com/example/paper003"
}
```

### 添加新活动

1. 打开 `activities.json`
2. 在 `activities` 数组中添加：

```json
{
  "id": "activity003",
  "title": "活动标题",
  "title_en": "Event Title",
  "date": "2024-11-01",
  "location": "HKUST(GZ)",
  "description": "活动描述...",
  "type": "workshop",
  "images": [],
  "participants": ["Hao WANG"]
}
```

## ⚠️ 注意事项

1. **JSON 格式**：确保语法正确（逗号、引号、括号匹配）
2. **文件编码**：使用 UTF-8 编码保存
3. **备份**：修改前建议备份原文件
4. **验证**：使用 https://jsonlint.com/ 验证 JSON 格式
5. **图片路径**：确保图片文件存在于指定路径

## 🔍 调试技巧

如果页面显示异常：

1. 打开浏览器开发者工具（F12）
2. 查看 Console 标签中的错误信息
3. 使用 JSON 验证工具检查文件格式
4. 确认所有引号和逗号都正确

## 📋 字段说明

### members.json 字段

- `name`: 英文名（必填）
- `name_zh`: 中文名
- `position`: 职位（必填）
- `group`: 所属小组
- `research_direction`: 研究方向
- `photo`: 照片路径
- `email`: 邮箱
- `website`: 个人网站
- `joined_year`: 加入年份

### papers.json 字段

- `title`: 论文标题（必填）
- `authors`: 作者列表（必填）
- `venue`: 发表会议/期刊（必填）
- `year`: 年份（必填）
- `status`: 状态（published/submitted）
- `group`: 所属小组（3d/agent/world）
- `abstract`: 摘要
- `pdf_url`: PDF链接
- `code_url`: 代码链接
- `project_url`: 项目页面链接

### activities.json 字段

- `title`: 活动标题（必填）
- `date`: 日期（YYYY-MM-DD格式）
- `location`: 地点
- `description`: 描述
- `type`: 类型（workshop/publication/event）
- `images`: 图片路径数组
- `participants`: 参与者列表

---

**数据架构版本**: v1.0  
**最后更新**: 2025-10-29  
**整合方案**: 渐变流线视觉风格 + 数据驱动架构

