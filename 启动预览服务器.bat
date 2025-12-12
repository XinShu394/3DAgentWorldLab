@echo off
chcp 65001 >nul
echo.
echo ===================================
echo   3DAgentWorldLab 网站预览服务器
echo ===================================
echo.
echo 正在启动服务器...
echo.

cd /d "%~dp0"

echo 3秒后将自动打开浏览器...
echo 如果没有自动打开，请手动访问：http://localhost:8000/index.html
echo.

REM 启动浏览器（延迟3秒）
start "" cmd /c "timeout /t 3 /nobreak >nul && start http://localhost:8000/index.html"

echo 服务器正在运行...
echo.
echo 按 Ctrl+C 停止服务器
echo.

python -m http.server 8000

pause

