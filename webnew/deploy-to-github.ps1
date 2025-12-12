# GitHub Pages 一键部署脚本
# 3DAgentWorldLab Website Deployment Script

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "   3DAgentWorldLab GitHub Pages 部署   " -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# 检查是否在正确的目录
if (-not (Test-Path "index.html")) {
    Write-Host "错误: 请在 webnew/webnew 目录下运行此脚本！" -ForegroundColor Red
    exit 1
}

# 检查 Git 是否安装
try {
    git --version | Out-Null
} catch {
    Write-Host "错误: 未检测到 Git，请先安装 Git！" -ForegroundColor Red
    Write-Host "下载地址: https://git-scm.com/download/win" -ForegroundColor Yellow
    exit 1
}

Write-Host "✓ Git 已安装" -ForegroundColor Green
Write-Host ""

# 询问 GitHub 信息
Write-Host "请输入以下信息：" -ForegroundColor Yellow
Write-Host ""

$githubUsername = Read-Host "1. 您的 GitHub 用户名"
$repoName = Read-Host "2. 仓库名称 (例如: 3dagentworld-lab)"
$userName = Read-Host "3. 您的名字 (用于 Git 配置)"
$userEmail = Read-Host "4. 您的邮箱 (用于 Git 配置)"

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "配置确认：" -ForegroundColor Cyan
Write-Host "  GitHub 用户名: $githubUsername" -ForegroundColor White
Write-Host "  仓库名称: $repoName" -ForegroundColor White
Write-Host "  Git 用户名: $userName" -ForegroundColor White
Write-Host "  Git 邮箱: $userEmail" -ForegroundColor White
Write-Host "  仓库地址: https://github.com/$githubUsername/$repoName.git" -ForegroundColor White
Write-Host "  网站地址: https://$githubUsername.github.io/$repoName/" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

$confirm = Read-Host "确认信息无误？(y/n)"
if ($confirm -ne "y") {
    Write-Host "已取消部署。" -ForegroundColor Yellow
    exit 0
}

Write-Host ""
Write-Host "开始部署..." -ForegroundColor Cyan
Write-Host ""

# 步骤 1: 初始化 Git 仓库
Write-Host "[1/6] 初始化 Git 仓库..." -ForegroundColor Yellow
if (Test-Path ".git") {
    Write-Host "  ✓ Git 仓库已存在" -ForegroundColor Green
} else {
    git init
    if ($LASTEXITCODE -eq 0) {
        Write-Host "  ✓ Git 仓库初始化成功" -ForegroundColor Green
    } else {
        Write-Host "  ✗ Git 仓库初始化失败" -ForegroundColor Red
        exit 1
    }
}

# 步骤 2: 配置 Git 用户信息
Write-Host "[2/6] 配置 Git 用户信息..." -ForegroundColor Yellow
git config user.name "$userName"
git config user.email "$userEmail"
Write-Host "  ✓ Git 用户信息配置成功" -ForegroundColor Green

# 步骤 3: 添加所有文件
Write-Host "[3/6] 添加文件到暂存区..." -ForegroundColor Yellow
git add .
if ($LASTEXITCODE -eq 0) {
    Write-Host "  ✓ 文件添加成功" -ForegroundColor Green
} else {
    Write-Host "  ✗ 文件添加失败" -ForegroundColor Red
    exit 1
}

# 步骤 4: 提交到本地仓库
Write-Host "[4/6] 提交到本地仓库..." -ForegroundColor Yellow
git commit -m "Initial commit: 3DAgentWorldLab website with real member data"
if ($LASTEXITCODE -eq 0) {
    Write-Host "  ✓ 提交成功" -ForegroundColor Green
} else {
    Write-Host "  ✗ 提交失败" -ForegroundColor Red
    exit 1
}

# 步骤 5: 关联远程仓库
Write-Host "[5/6] 关联 GitHub 远程仓库..." -ForegroundColor Yellow
$remoteUrl = "https://github.com/$githubUsername/$repoName.git"

# 检查是否已有 origin
$existingRemote = git remote get-url origin 2>$null
if ($existingRemote) {
    Write-Host "  ! 检测到已存在的远程仓库: $existingRemote" -ForegroundColor Yellow
    $updateRemote = Read-Host "  是否更新为新的仓库地址？(y/n)"
    if ($updateRemote -eq "y") {
        git remote set-url origin $remoteUrl
        Write-Host "  ✓ 远程仓库地址已更新" -ForegroundColor Green
    } else {
        Write-Host "  ✓ 使用现有远程仓库" -ForegroundColor Green
    }
} else {
    git remote add origin $remoteUrl
    Write-Host "  ✓ 远程仓库关联成功" -ForegroundColor Green
}

# 步骤 6: 推送到 GitHub
Write-Host "[6/6] 推送到 GitHub..." -ForegroundColor Yellow
Write-Host ""
Write-Host "  注意: 首次推送需要登录 GitHub" -ForegroundColor Cyan
Write-Host "  - 如果弹出登录窗口，请输入用户名和密码（或 Token）" -ForegroundColor Cyan
Write-Host "  - 如果需要 Personal Access Token，请访问:" -ForegroundColor Cyan
Write-Host "    https://github.com/settings/tokens" -ForegroundColor Cyan
Write-Host ""

git branch -M main
git push -u origin main

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "========================================" -ForegroundColor Green
    Write-Host "   🎉 部署成功！" -ForegroundColor Green
    Write-Host "========================================" -ForegroundColor Green
    Write-Host ""
    Write-Host "下一步操作：" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "1. 访问您的 GitHub 仓库：" -ForegroundColor White
    Write-Host "   https://github.com/$githubUsername/$repoName" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "2. 启用 GitHub Pages：" -ForegroundColor White
    Write-Host "   - 点击 Settings → Pages" -ForegroundColor White
    Write-Host "   - Source 选择: main 分支" -ForegroundColor White
    Write-Host "   - 目录选择: / (root)" -ForegroundColor White
    Write-Host "   - 点击 Save" -ForegroundColor White
    Write-Host ""
    Write-Host "3. 等待 1-3 分钟后，访问您的网站：" -ForegroundColor White
    Write-Host "   https://$githubUsername.github.io/$repoName/" -ForegroundColor Green
    Write-Host ""
    Write-Host "详细说明请查看: GitHub部署指南.md" -ForegroundColor Yellow
    Write-Host ""
} else {
    Write-Host ""
    Write-Host "========================================" -ForegroundColor Red
    Write-Host "   ✗ 推送失败" -ForegroundColor Red
    Write-Host "========================================" -ForegroundColor Red
    Write-Host ""
    Write-Host "可能的原因：" -ForegroundColor Yellow
    Write-Host "1. 仓库尚未在 GitHub 上创建" -ForegroundColor White
    Write-Host "   解决方法: 访问 https://github.com/new 创建仓库" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "2. 认证失败" -ForegroundColor White
    Write-Host "   解决方法: 使用 Personal Access Token" -ForegroundColor Cyan
    Write-Host "   访问: https://github.com/settings/tokens" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "3. 网络问题" -ForegroundColor White
    Write-Host "   解决方法: 检查网络连接后重试" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "查看详细说明: GitHub部署指南.md" -ForegroundColor Yellow
    Write-Host ""
    exit 1
}

Write-Host "按任意键退出..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")

