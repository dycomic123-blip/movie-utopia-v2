@echo off
echo.
echo ==========================================
echo GitHub Deployment - Movie Utopia v2
echo ==========================================
echo.
echo I've opened GitHub in your browser.
echo.
echo Please:
echo   1. Review the repository details
echo   2. Make sure "Initialize with README" is UNCHECKED
echo   3. Click "Create repository"
echo.
echo After creating the repository, press any key here...
pause > nul
echo.
echo Pushing your code to GitHub...
echo.
git push -u origin main
echo.
if %ERRORLEVEL% EQU 0 (
    echo ==========================================
    echo SUCCESS! Your code is now on GitHub!
    echo ==========================================
    echo.
    echo View your repository at:
    echo https://github.com/dycomic123/movie-utopia-v2
    echo.
) else (
    echo ==========================================
    echo Push failed. Possible reasons:
    echo ==========================================
    echo 1. Repository not created yet?
    echo 2. Authentication needed?
    echo.
    echo Try running this command manually:
    echo   git push -u origin main
    echo.
)
pause
