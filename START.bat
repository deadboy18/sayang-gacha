@echo off
title For My Sayang
echo.
echo  =============================
echo    Starting For My Sayang...
echo  =============================
echo.

where node >nul 2>nul
if %errorlevel% neq 0 (
    echo  [!] Node.js is not installed.
    echo  [!] Download it from https://nodejs.org
    echo.
    pause
    exit /b
)

echo  Found Node.js:
node -v
echo.

cd /d "%~dp0"

echo  Installing dependencies (first run takes ~30s)...
call npm install --silent
echo.

echo  Starting the app...
echo  Browser will open at http://localhost:5173
echo  Press Ctrl+C in this window to stop.
echo.
start "" http://localhost:5173
call npm run dev
pause
