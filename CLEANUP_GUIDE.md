# Project Cleanup Guide - Reduce from 180MB+

## Issues Found:

### 1. DUPLICATE FOLDERS
- `public/css/css/` - Duplicate CSS folder inside CSS
- `public/js/js/` - Duplicate JS folder inside JS

### 2. DUPLICATE FILES
- `jquery.min.js` appears TWICE (in js/ and js/js/)
- `bootstrap.bundle.min.js` appears TWICE
- `gsap.min.js` appears TWICE
- `ScrollTrigger.min.js` appears TWICE

### 3. UNUSED DOCUMENTATION FILES (Safe to delete)
- `CHECKLIST.md`
- `CONVERSION_GUIDE.md`
- `CONVERSION_SUMMARY.md`
- `REFACTORING_SUMMARY.md`
- `STRUCTURE_COMPARISON.md`
- `PUG_QUICK_REFERENCE.md`
- `QUICK_START.md`
- `convert-helper.js`
- `test-server.js`
- `update-routes.ps1`
- `kill-port.cmd`

### 4. UNUSED VIEW FILES
- `views/blog2.pug` (you're using Blog.pug)
- `views/blog3.pug` (you're using Blog.pug)

### 5. DRUPAL FILES (Not needed for Express)
- `public/js/drupal.js`
- `public/js/drupal.init.js`
- `public/js/drupalSettingsLoader.js`

### 6. POTENTIALLY UNUSED JS
- `public/js/addtoany.js` (social sharing - check if used)
- `public/js/aos.js` (animation library - check if used)
- `public/js/jquery.floatit.js`
- `public/js/jquery.lazy.min.js`
- `public/js/lottie-player.js`
- `public/js/once.min.js`
- `public/js/page.js`
- `public/js/scon.js`
- `public/js/slick.min.js`

## Cleanup Steps:

### Step 1: Remove Duplicate Folders
```cmd
rmdir /s /q public\css\css
rmdir /s /q public\js\js
```

### Step 2: Remove Documentation Files
```cmd
del CHECKLIST.md
del CONVERSION_GUIDE.md
del CONVERSION_SUMMARY.md
del REFACTORING_SUMMARY.md
del STRUCTURE_COMPARISON.md
del PUG_QUICK_REFERENCE.md
del QUICK_START.md
del convert-helper.js
del test-server.js
del update-routes.ps1
del kill-port.cmd
```

### Step 3: Remove Unused Views
```cmd
del views\blog2.pug
del views\blog3.pug
```

### Step 4: Remove Drupal Files
```cmd
del public\js\drupal.js
del public\js\drupal.init.js
del public\js\drupalSettingsLoader.js
```

### Step 5: Remove Duplicate jQuery
```cmd
del public\js\jquery.min_1.js
```

## Expected Size Reduction:

- Duplicate folders: ~20-30MB
- Documentation files: ~1MB
- Unused JS libraries: ~5-10MB
- **Total Expected Reduction: 25-40MB**

## After Cleanup - Update layout.pug

Remove references to deleted files in `views/layout.pug`:
- Remove duplicate CSS/JS references
- Remove Drupal script references

## Production Optimization:

### 1. Minify Images
```cmd
npm install -g imagemin-cli
imagemin public/images/* --out-dir=public/images
```

### 2. Remove node_modules for production
```cmd
npm prune --production
```

### 3. Create .gitignore for large files
```
node_modules/
public/uploads/
*.log
.env
```

### 4. Use CDN for libraries
Instead of hosting jQuery, Bootstrap locally, use CDN:
```html
<script src="https://cdn.jsdelivr.net/npm/jquery@3.6.0/dist/jquery.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
```

## Final Checklist:

- [ ] Backup your project first!
- [ ] Run cleanup commands
- [ ] Test your website thoroughly
- [ ] Update layout.pug references
- [ ] Remove unused CSS files
- [ ] Optimize images
- [ ] Use CDN for common libraries
- [ ] Run `npm prune --production`

## Estimated Final Size: 50-80MB (from 180MB)
