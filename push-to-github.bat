@echo off
echo ====================================
echo Pushing to GitHub
echo ====================================
echo.
git push -u origin main
echo.
if %ERRORLEVEL% EQU 0 (
    echo ====================================
    echo SUCCESS! Repository deployed to:
    echo https://github.com/dycomic123/movie-utopia-v2
    echo ====================================
) else (
    echo ====================================
    echo Push failed. Please check:
    echo 1. Repository created on GitHub?
    echo 2. Correct authentication?
    echo ====================================
)
pause
