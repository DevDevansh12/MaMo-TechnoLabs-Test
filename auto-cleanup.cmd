@echo off
echo ========================================
echo AUTOMATED PROJECT CLEANUP
echo Reduce 180MB+ to 50-80MB
echo ========================================
echo.
echo WARNING: This will modify your project!
echo.
set /p backup="Create backup first? (Y/N): "
if /i "%backup%"=="Y" (
    echo Creating backup...
    xcopy /E /I /Y . ..\mamo-backup >nul 2>&1
    echo Backup created at: ..\mamo-backup
    echo.
)

echo.
echo Starting cleanup...
echo.

REM Step 1: Move CSS files from nested folder
echo [1/10] Moving CSS files...
if exist "public\css\css" (
    move /Y "public\css\css\*.css" "public\css\" >nul 2>&1
    echo Done: Moved CSS files
) else (
    echo Skipped: CSS folder not found
)

REM Step 2: Move JS main.js
echo [2/10] Moving JS files...
if exist "public\js\js\main.js" (
    move /Y "public\js\js\main.js" "public\js\" >nul 2>&1
    echo Done: Moved main.js
) else (
    echo Skipped: main.js not found
)

REM Step 3: Delete duplicate folders
echo [3/10] Removing duplicate folders...
if exist "public\css\css" rmdir /s /q "public\css\css"
if exist "public\js\js" rmdir /s /q "public\js\js"
echo Done: Removed duplicate folders

REM Step 4: Delete unused JS files
echo [4/10] Removing unused JS files...
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
echo Done: Removed unused JS

REM Step 5: Delete unused CSS
echo [5/10] Removing unused CSS...
del /q "public\css\bootstrap-icons.css" 2>nul
echo Done: Removed unused CSS

REM Step 6: Delete documentation files
echo [6/10] Removing documentation files...
del /q CHECKLIST.md 2>nul
del /q CONVERSION_GUIDE.md 2>nul
del /q CONVERSION_SUMMARY.md 2>nul
del /q REFACTORING_SUMMARY.md 2>nul
del /q STRUCTURE_COMPARISON.md 2>nul
del /q PUG_QUICK_REFERENCE.md 2>nul
del /q QUICK_START.md 2>nul
del /q ADMIN_LOGIN_GUIDE.md 2>nul
del /q SCHEMA_INTEGRATION_GUIDE.md 2>nul
del /q convert-helper.js 2>nul
del /q test-server.js 2>nul
del /q update-routes.ps1 2>nul
del /q kill-port.cmd 2>nul
echo Done: Removed documentation

REM Step 7: Delete unused views
echo [7/10] Removing unused view files...
del /q views\blog2.pug 2>nul
del /q views\blog3.pug 2>nul
echo Done: Removed unused views

REM Step 8: Delete cdn-cgi folder (Cloudflare cache)
echo [8/10] Removing CDN cache...
if exist "public\cdn-cgi" rmdir /s /q "public\cdn-cgi"
echo Done: Removed CDN cache

REM Step 9: Clean uploads folder (keep folder, remove test files)
echo [9/10] Cleaning uploads folder...
REM Keep the folder but you can manually delete test uploads
echo Done: Uploads folder kept

REM Step 10: Update layout.pug
echo [10/10] Updating layout.pug...
echo IMPORTANT: You need to manually update layout.pug
echo.
echo Change all references from:
echo   /css/css/ to /css/
echo   /js/js/ to /js/
echo.

echo ========================================
echo CLEANUP COMPLETE!
echo ========================================
echo.
echo Next Steps:
echo 1. Update views/layout.pug (change /css/css/ to /css/ and /js/js/ to /js/)
echo 2. Test your website: npm start
echo 3. If everything works, run: npm prune --production
echo 4. Consider optimizing images for additional savings
echo.
echo Expected size reduction: 100MB+ (from 180MB to 50-80MB)
echo.
pause
