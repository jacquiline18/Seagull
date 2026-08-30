@echo off
title Git Push - Seagull Project
cd /d "%~dp0"
set "PATH=%PATH%;C:\Program Files\Git\cmd;C:\Program Files\Git\bin"

echo Staging all changes...
git add .

echo Committing changes...
git commit -m "Configure Netlify deployment with netlify.toml and SPA redirects"

echo Pushing to GitHub / remote...
git push

echo.
echo ===========================================
echo  Git Push Completed! Netlify will redeploy.
echo ===========================================
pause
