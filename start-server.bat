@echo off
echo Starting SFI DK Backend Server...
cd /d "%~dp0"
"C:\Program Files\nodejs\node.exe" server.js
pause
