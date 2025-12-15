@echo off
echo ========================================
echo Ivan's Universe 个人网站启动脚本
echo ========================================
echo.

:: 检查是否已安装Node.js
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo 错误: 未检测到Node.js，请先安装Node.js
    echo 下载地址: https://nodejs.org/
    pause
    exit /b 1
)

echo 正在启动前端服务器...
start "前端服务器" cmd /k "cd %~dp0 && npm run dev"

:: 等待一下让前端服务器先启动
timeout /t 3 >nul

echo 正在检查后端依赖...
if not exist "node_modules" (
    echo 正在安装后端依赖...
    xcopy /y /i server-package.json package.json
    npm install
)

echo 正在启动后端API服务器...
start "后端API服务器" cmd /k "cd %~dp0 && node server.js"

echo.
echo ========================================
echo 服务器启动中...
echo.
echo 前端地址: http://localhost:3000
echo 后端API: http://localhost:5000
echo.
echo 请等待几秒钟后访问前端地址
echo ========================================
pause