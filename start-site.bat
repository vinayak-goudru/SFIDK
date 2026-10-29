@echo off
title SFI Dakshina Kannada Web Portal
cd /d "%~dp0"
echo ========================================================
echo   Starting SFI Dakshina Kannada Web Portal...
echo ========================================================
echo.
start "" "http://localhost:3000"
"C:\Program Files\nodejs\node.exe" serve.js
if %ERRORLEVEL% NEQ 0 (
    echo Node.js not found in default path, trying fallback...
    node serve.js
)
pause
