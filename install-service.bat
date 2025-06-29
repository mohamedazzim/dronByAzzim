@echo off
REM Windows Service Script for SkyVision Pro

echo Installing SkyVision Pro as Windows Service...

REM Install as Windows service using nssm (if available)
REM nssm install SkyVisionPro "C:\Program Files\nodejs\node.exe" "C:\path\to\your\app\server.js"
REM nssm set SkyVisionPro AppDirectory "C:\path\to\your\app"
REM nssm start SkyVisionPro

echo Service installation completed!
pause
