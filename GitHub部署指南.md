# GitHub Pages 部署指南

## 🎯 部署目标

将 3DAgentWorldLab 网站部署到 GitHub Pages，实现免费公开访问。

## 📋 前期准备

### 1. 确认环境

- ✅ Git 已安装（检查：在终端运行 `git --version`）
- ✅ GitHub 账号已创建
- ✅ 网站文件已准备好（位于 `webnew/webnew/` 目录）

### 2. 网站文件清单

```
webnew/webnew/
├── index.html          # 首页
├── members.html        # 成员页面
├── research.html       # 研究页面
├── activity.html       # 活动页面
├── styles.css          # 样式文件
├── script.js           # 脚本文件
├── data/              # 数据文件（已更新真实成员信息）
├── images/            # 图片目录（需要添加照片）
└── ...
```

---

## 🚀 部署步骤

### 步骤 1: 创建 GitHub 仓库

1. **登录 GitHub**
   - 访问：https://github.com
   - 登录您的账号

2. **创建新仓库**
   - 点击右上角 `+` → `New repository`
   - 仓库名称：`3dagentworld-lab`（或您喜欢的名称）
   - 描述：`3DAgentWorldLab Official Website`
   - 可见性：选择 `Public`（公开）
   - **不要**勾选 "Initialize this repository with a README"
   - 点击 `Create repository`

3. **复制仓库地址**
   - 在新建的仓库页面，复制 HTTPS 地址
   - 格式：`https://github.com/您的用户名/3dagentworld-lab.git`

---

### 步骤 2: 初始化本地 Git 仓库

打开终端（PowerShell），在项目根目录执行以下命令：

```powershell
# 1. 进入 webnew/webnew 目录
cd webnew\webnew

# 2. 初始化 Git 仓库
git init

# 3. 配置 Git 用户信息（如果之前没配置过）
git config user.name "您的名字"
git config user.email "您的邮箱@example.com"

# 4. 添加所有文件到暂存区
git add .

# 5. 提交到本地仓库
git commit -m "Initial commit: 3DAgentWorldLab website"
```

---

### 步骤 3: 推送到 GitHub

```powershell
# 1. 关联远程仓库（替换成您的仓库地址）
git remote add origin https://github.com/您的用户名/3dagentworld-lab.git

# 2. 设置主分支名称为 main
git branch -M main

# 3. 推送到 GitHub
git push -u origin main
```

**可能遇到的问题：**

- **需要登录**：Windows 会弹出 GitHub 登录窗口，输入用户名和密码
- **使用 Token**：如果密码无法使用，需要创建 Personal Access Token
  - 访问：https://github.com/settings/tokens
  - 点击 `Generate new token (classic)`
  - 勾选 `repo` 权限
  - 生成后复制 Token，作为密码使用

---

### 步骤 4: 启用 GitHub Pages

1. **进入仓库设置**
   - 访问您的 GitHub 仓库页面
   - 点击 `Settings`（设置）

2. **配置 Pages**
   - 在左侧菜单找到 `Pages`
   - **Source**（来源）：选择 `Deploy from a branch`
   - **Branch**（分支）：
     - 选择 `main`
     - 目录选择 `/ (root)`
   - 点击 `Save`（保存）

3. **等待部署**
   - GitHub 会自动构建和部署网站
   - 通常需要 1-3 分钟
   - 页面顶部会显示：`Your site is live at https://您的用户名.github.io/3dagentworld-lab/`

---

### 步骤 5: 访问网站

部署成功后，您的网站地址为：

```
https://您的用户名.github.io/3dagentworld-lab/
```

**示例**：
- 如果您的 GitHub 用户名是 `john-doe`
- 仓库名是 `3dagentworld-lab`
- 网站地址就是：`https://john-doe.github.io/3dagentworld-lab/`

---

## 🔄 日常更新流程

网站部署后，每次修改内容的流程：

```powershell
# 1. 修改文件（比如更新 data/members.json）

# 2. 查看修改内容
git status

# 3. 添加修改到暂存区
git add .

# 4. 提交修改
git commit -m "更新成员信息"

# 5. 推送到 GitHub
git push

# 6. 等待 1-2 分钟，GitHub 会自动更新网站
```

---

## 🎨 添加照片后更新

1. **下载照片**
   - 根据 `images/students/README-照片说明.md` 下载照片
   - 重命名并放入 `images/students/` 目录

2. **提交更新**
   ```powershell
   git add images/students/*.jpg
   git commit -m "添加学生照片"
   git push
   ```

3. **验证**
   - 等待部署完成
   - 访问网站查看照片是否显示

---

## 🛠️ 常见问题

### Q1: 推送时要求输入用户名密码

**A**: GitHub 已不支持密码登录，需要使用 Personal Access Token：

1. 访问：https://github.com/settings/tokens
2. 点击 `Generate new token (classic)`
3. 勾选 `repo` 权限
4. 复制生成的 Token
5. 在推送时，用户名输入 GitHub 用户名，密码输入这个 Token

### Q2: 网站显示 404 错误

**A**: 检查：
1. GitHub Pages 是否已启用（Settings → Pages）
2. 分支和目录是否选择正确（main 分支，/ root 目录）
3. 是否等待了足够的部署时间（3-5分钟）
4. URL 是否正确（注意仓库名）

### Q3: 网页样式或数据不显示

**A**: 检查：
1. 浏览器按 F12 打开开发者工具，查看 Console 错误
2. 确认 JSON 文件格式正确（https://jsonlint.com/）
3. 确认文件路径正确（区分大小写）
4. 清除浏览器缓存后刷新

### Q4: 修改后网站没有更新

**A**: 
1. 确认已成功推送到 GitHub（访问仓库页面查看）
2. 在 Actions 标签查看部署状态
3. 等待 2-3 分钟
4. 强制刷新浏览器（Ctrl + F5）

### Q5: 想使用自定义域名

**A**: 
1. 购买域名（如 `3dagentworld.com`）
2. 在 GitHub Pages 设置中添加自定义域名
3. 在域名服务商处添加 DNS 记录：
   - CNAME 记录：`www` → `您的用户名.github.io`
   - A 记录：`@` → GitHub Pages IP 地址

---

## 📊 部署状态检查

### 查看部署历史

1. 进入仓库页面
2. 点击 `Actions` 标签
3. 查看 `pages build and deployment` 工作流
4. 绿色勾表示部署成功，红色叉表示失败

### 查看网站状态

1. Settings → Pages
2. 查看 "Your site is published at ..." 消息
3. 点击 `Visit site` 访问

---

## 🎯 进阶配置（可选）

### 1. 添加自定义 404 页面

创建 `404.html` 文件，当访问不存在的页面时显示。

### 2. 启用 HTTPS

GitHub Pages 自动提供 HTTPS，在设置中勾选 `Enforce HTTPS`。

### 3. 添加 Google Analytics

在 `index.html` 等页面添加 Google Analytics 跟踪代码。

### 4. 配置 robots.txt

创建 `robots.txt` 控制搜索引擎爬取。

---

## ✅ 部署检查清单

部署完成后，请检查：

- [ ] 网站可以正常访问
- [ ] 首页显示正常
- [ ] 导航链接可以跳转
- [ ] 成员页面显示所有成员
- [ ] 研究页面显示论文（如果有）
- [ ] 活动页面显示活动（如果有）
- [ ] 响应式设计在手机上正常
- [ ] 所有链接可以点击
- [ ] 照片正常显示（或显示占位图）

---

## 📞 需要帮助？

- GitHub Pages 文档：https://docs.github.com/pages
- Git 教程：https://git-scm.com/book/zh/v2
- 问题反馈：在仓库中创建 Issue

---

## 🎉 完成！

恭喜您成功部署了 3DAgentWorldLab 网站！

现在您可以：
1. 分享网站链接给团队成员
2. 添加照片并更新内容
3. 继续完善网站功能

**网站地址**：`https://您的用户名.github.io/仓库名/`

---

**创建日期**：2025-12-03  
**文档版本**：v1.0  
**维护者**：3DAgentWorldLab

