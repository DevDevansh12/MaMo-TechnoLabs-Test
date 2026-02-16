@echo off
echo ========================================
echo QUICK SIZE REDUCTION
echo Reduce 96.72MB public folder
echo ========================================
echo.
echo This will give you immediate 5-10MB reduction
echo Image optimization (60-70MB) must be done separately
echo.
pause

echo.
echo Creating backup...
if not exist "..\mamo-backup" (
    xcopy /E /I /Y . ..\mamo-backup >nul 2>&1
    echo Backup created at: ..\mamo-backup
) else (
    echo Backup already exists
)

echo.
echo [1/6] Removing duplicate CSS folder...
if exist "public\css\css" (
    move /Y "public\css\css\*.css" "public\css\" >nul 2>&1
    rmdir /s /q "public\css\css"
    echo Done: Removed duplicate CSS folder (~2MB saved)
) else (
    echo Skipped: Already removed
)

echo.
echo [2/6] Removing duplicate JS folder...
if exist "public\js\js" (
    if exist "public\js\js\main.js" move /Y "public\js\js\main.js" "public\js\" >nul 2>&1
    rmdir /s /q "public\js\js"
    echo Done: Removed duplicate JS folder (~3MB saved)
) else (
    echo Skipped: Already removed
)

echo.
echo [3/6] Removing CDN cache folder...
if exist "public\cdn-cgi" (
    rmdir /s /q "public\cdn-cgi"
    echo Done: Removed CDN cache (~1MB saved)
) else (
    echo Skipped: Already removed
)

echo.
echo [4/6] Removing unused JavaScript files...
cd public\js
del /q addtoany.js 2>nul
del /q aos.js 2>nul
del /q drupal.js 2>nul
del /q drupal.init.js 2>nul
del /q drupalSettingsLoader.js 2>nul
del /q form-submit.js 2>nul
del /q formValidations.js 2>nul
del /q global.js 2>nul
del /q gsap.min.js 2>nul
del /q jquery.floatit.js 2>nul
del /q jquery.lazy.min.js 2>nul
del /q jquery.min_1.js 2>nul
del /q lottie-player.js 2>nul
del /q once.min.js 2>nul
del /q page.js 2>nul
del /q popper.min.js 2>nul
del /q scon.js 2>nul
del /q ScrollTrigger.min.js 2>nul
del /q slick.min.js 2>nul
cd ..\..
echo Done: Removed unused JS (~3MB saved)

echo.
echo [5/6] Removing unused CSS files...
del /q "public\css\bootstrap-icons.css" 2>nul
echo Done: Removed unused CSS

echo.
echo [6/6] Cleaning documentation files...
del /q CHECKLIST.md 2>nul
del /q CONVERSION_GUIDE.md 2>nul
del /q CONVERSION_SUMMARY.md 2>nul
del /q REFACTORING_SUMMARY.md 2>nul
del /q STRUCTURE_COMPARISON.md 2>nul
del /q PUG_QUICK_REFERENCE.md 2>nul
del /q QUICK_START.md 2>nul
del /q convert-helper.js 2>nul
del /q test-server.js 2>nul
del /q update-routes.ps1 2>nul
del /q kill-port.cmd 2>nul
del /q views\blog2.pug 2>nul
del /q views\blog3.pug 2>nul
echo Done: Removed documentation

echo.
echo ========================================
echo QUICK CLEANUP COMPLETE!
echo ========================================
echo.
echo Estimated savings: 8-12MB
echo Current size: ~85-88MB (from 96.72MB)
echo.
echo ========================================
echo NEXT STEP: IMAGE OPTIMIZATION (CRITICAL!)
echo ========================================
echo.
echo Your images are taking 80-90MB!
echo.
echo Option 1 (Easiest):
echo   1. Go to https://tinypng.com
echo   2. Upload all images from public\images\
echo   3. Download compressed versions
echo   4. Replace originals
echo   Expected savings: 60-70MB!
echo.
echo Option 2 (Automated):
echo   1. Install: npm install -g sharp-cli
echo   2. Run: cd public\images
echo   3. Run: sharp -i *.png -o compressed\ --quality 80
echo   4. Run: sharp -i *.jpg -o compressed\ --quality 80
echo   5. Replace originals with compressed versions
echo.
echo After image optimization:
echo   Final size: 20-30MB (from 96.72MB)
echo   Total reduction: 70-75MB!
echo.
echo ========================================
echo.
pause
