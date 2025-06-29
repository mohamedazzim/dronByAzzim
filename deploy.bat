@echo off
REM Deployment script for SkyVision Pro (Windows)

echo Starting deployment...

REM Pull latest changes (if using git)
REM git pull origin main

REM Install dependencies
call npm install

REM Build the application
call npm run build

REM Run database migrations (if needed)
REM mysql -u root -p < scripts/database-setup-windows.sql

REM Start the application
echo Starting application...
call npm start

echo Deployment completed!
pause
