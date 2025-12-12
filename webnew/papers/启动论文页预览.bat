@echo off
chcp 65001 >nul
echo.
echo ===================================
echo   论文详情页预览服务器
echo ===================================
echo.
echo 正在启动服务器...
echo.

cd /d "%~dp0"

start http://localhost:8000/example-opengs-slam.html

python -m http.server 8000

pause

