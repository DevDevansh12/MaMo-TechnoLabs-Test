@echo off
echo ========================================
echo Project Cleanup Script
echo ========================================
echo.
echo WARNING: This will delete files permanently!
echo Make sure you have a backup before proceeding.
echo.
pause

echo.
echo [1/5] Removing duplicate CSS folder...
if exist "public\css\css" (
    rmdir /s /q "public\css\css"
    echo Done: Removed public\css\css
) else (
    echo Skipped: Folder not found
)

echo.
echo [2/5] Removing duplicate JS folder...
if exist "public\js\js" (
    rmdir /s /q "public\js\js"
    echo Done: Removed public\js\js
) else (
    echo Skipped: Folder not found
)

echo.
echo [3/5] Removing documentation files...
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
echo Done: Removed documentation files

echo.
echo [4/5] Removing unused view files...
del /q views\blog2.pug 2>nul
del /q views\blog3.pug 2>nul
echo Done: Removed unused views

echo.
echo [5/5] Removing Drupal and duplicate files...
del /q public\js\drupal.js 2>nul
del /q public\js\drupal.init.js 2>nul
del /q public\js\drupalSettingsLoader.js 2>nul
del /q public\js\jquery.min_1.js 2>nul
del /q public\js\jquery.form.min.js 2>nul
del /q public\js\jquery.floatit.js 2>nul
del /q public\js\once.min.js 2>nul
del /q public\js\page.js 2>nul
del /q public\js\scon.js 2>nul
echo Done: Removed Drupal and unused JS files

echo.
echo ========================================
echo Cleanup Complete!
echo ========================================
echo.
echo Next steps:
echo 1. Test your website: npm start
echo 2. Check if everything works
echo 3. Update layout.pug if needed
echo 4. Run: npm prune --production
echo.
pause
