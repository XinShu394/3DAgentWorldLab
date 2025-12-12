# 成员详情页模板使用说明

本目录包含成员个人页面的模板文件。

## 📁 文件说明

- `member-template.html` - 成员详情页HTML模板
- `member-styles.css` - 成员详情页专用样式
- `README.md` - 本说明文档

## 🎨 模板特点

- **渐变流线视觉风格**：继承首页的科技感设计
- **响应式布局**：适配各种屏幕尺寸
- **模块化设计**：易于定制和扩展

## 💡 使用方法

### 1. 创建新成员页面

复制 `member-template.html` 并重命名，例如：
```bash
cp member-template.html wang-hao.html
```

### 2. 修改内容

编辑新文件，替换以下部分：
- **页面标题**：`<title>` 标签
- **成员姓名**：`.profile-name`
- **职位**：`.profile-position`
- **简介**：`.profile-description`
- **链接**：`.profile-links` 中的URL

### 3. 更新 members.json

在 `data/members.json` 中添加或更新成员信息，并设置 `website` 字段指向新创建的页面：

```json
{
  "name": "Wang Hao",
  "position": "Assistant Professor",
  "website": "members/wang-hao.html",
  ...
}
```

## 📝 自定义样式

如需添加自定义样式：
1. 在 `member-styles.css` 中添加样式
2. 确保不影响全局样式
3. 使用BEM命名规范保持一致性

## ⚠️ 注意事项

- 保持相对路径正确（`../` 返回上级目录）
- 图片路径使用 `../images/` 前缀
- 确保所有链接有效
- 测试响应式布局

---

**最后更新**: 2025-10-29  
**模板版本**: v1.0 - 渐变流线风格

