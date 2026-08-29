@echo off
title Seagull General Supply Limited - Full-Stack Launcher
cd /d "%~dp0"

echo ====================================================
echo  SEAGULL GENERAL SUPPLY LIMITED
echo  "Services Beyond Measure!"
echo  Starting Frontend Website and Backend API...
echo ====================================================
echo.

:: Start Backend in its own window
start "Seagull Backend API (Port 5000)" cmd /k "cd /d ""%~dp0server"" && npm run dev"

:: Start Frontend in its own window
start "Seagull React Frontend (Port 3000)" cmd /k "cd /d ""%~dp0client"" && npm run dev"

echo.
echo Both servers are starting up!
echo Frontend Website will open at: http://localhost:3000
echo Backend API is running at:      http://localhost:5000
echo.

timeout /t 4 >nul
start http://localhost:3000
