# Optimized Production Cleanup - Reduce 180MB Project

## Critical Issues Found:

### 1. **DUPLICATE FOLDER STRUCTURE** (Major Issue!)
Your layout.pug references:
- `/css/css/` files (nested duplicate folder)
- `/js/js/` files (nested duplicate folder)

This means you have TWO copies of everything!

### 2. **Files Currently Used (Keep These)**

**CSS Files (in use):**
- `/css/style1.css`
- `/css/style2.css`
- `/css/css/animate.min.css`
- `/css/css/swiper-bundle.min.css`
- `/css/css/flaticon_mycollection.css`
- `/css/css/remixicon.css`
- `/css/css/scrollCue.min.css`
- `/css/css/style.css`

**JS Files (in use):**
- `/js/jquery.min.js`
- `/js/bootstrap.bundle.min.js`
- `/js/custom.js`
- `/js/jquery.form.min.js`
- `/js/js/main.js`

### 3. **Files to DELETE (Not Used)**

**Unused JS Files:**
- `/js/addtoany.js`
- `/js/aos.js`
- `/js/drupal.js`
- `/js/drupal.init.js`
- `/js/drupalSettingsLoader.js`
- `/js/form-submit.js`
- `/js/formValidations.js`
- `/js/global.js`
- `/js/gsap.min.js`
- `/js/jquery.floatit.js`
- `/js/jquery.lazy.min.js`
- `/js/jquery.min_1.js` (duplicate)
- `/js/lottie-player.js`
- `/js/once.min.js`
- `/js/page.js`
- `/js/popper.min.js`
- `/js/scon.js`
- `/js/ScrollTrigger.min.js`
- `/js/slick.min.js`

**Unused CSS Files:**
- `/css/bootstrap-icons.css` (not referenced)

**Duplicate JS folder contents:**
- `/js/js/bootstrap.bundle.min.js` (duplicate)
- `/js/js/email-decode.min.js`
- `/js/js/fslightbox.min.js`
- `/js/js/gsap.min.js`
- `/js/js/jquery.min.js` (duplicate)
- `/js/js/scrollCue.min.js`
- `/js/js/ScrollTrigger.min.js`
- `/js/js/simpleParallax.min.js`
- `/js/js/SplitText.min.js`
- `/js/js/swiper-bundle.min.js`

## Step-by-Step Cleanup:

### STEP 1: Backup First!
```cmd
xcopy /E /I /Y . ..\mamo-backup
```

### STEP 2: Move CSS files out of nested folder
```cmd
move public\css\css\*.css public\css\
```

### STEP 3: Move JS main.js out of nested folder
```cmd
move public\js\js\main.js public\js\
```

### STEP 4: Delete duplicate folders
```cmd
rmdir /s /q public\css\css
rmdir /s /q public\js\js
```

### STEP 5: Delete unused JS files
```cmd
cd public\js
del addtoany.js aos.js drupal.js drupal.init.js drupalSettingsLoader.js
del form-submit.js formValidations.js global.js gsap.min.js
del jquery.floatit.js jquery.lazy.min.js jquery.min_1.js
del lottie-player.js once.min.js page.js popper.min.js
del scon.js ScrollTrigger.min.js slick.min.js
cd ..\..
```

### STEP 6: Delete unused CSS
```cmd
del public\css\bootstrap-icons.css
```

### STEP 7: Delete documentation files
```cmd
del CHECKLIST.md CONVERSION_GUIDE.md CONVERSION_SUMMARY.md
del REFACTORING_SUMMARY.md STRUCTURE_COMPARISON.md
del PUG_QUICK_REFERENCE.md QUICK_START.md
del convert-helper.js test-server.js update-routes.ps1
```

### STEP 8: Delete unused views
```cmd
del views\blog2.pug views\blog3.pug
```

### STEP 9: Update layout.pug references
Change:
```pug
link(rel="stylesheet" href="/css/css/animate.min.css")
```
To:
```pug
link(rel="stylesheet" href="/css/animate.min.css")
```

Do this for ALL `/css/css/` and `/js/js/` references.

### STEP 10: Production npm cleanup
```cmd
npm prune --production
```

## Expected Results:

- **Before:** 180MB+
- **After:** 50-80MB
- **Reduction:** ~100MB (55% smaller!)

## What Takes Up Space:

1. **node_modules:** ~80-100MB (necessary)
2. **public/images:** ~20-40MB (optimize these!)
3. **public/css:** ~5-10MB
4. **public/js:** ~5-10MB
5. **Everything else:** <5MB

## Image Optimization (Additional 20-30MB savings):

```cmd
npm install -g sharp-cli
sharp -i public/images/*.png -o public/images/ --quality 80
sharp -i public/images/*.jpg -o public/images/ --quality 80
```

## Final Production Checklist:

- [ ] Backup project
- [ ] Run cleanup steps 1-8
- [ ] Update layout.pug (step 9)
- [ ] Test website thoroughly
- [ ] Run npm prune --production
- [ ] Optimize images
- [ ] Remove .git folder if deploying (saves 10-20MB)
- [ ] Create .env for sensitive data
- [ ] Update MongoDB connection string for production

## Deployment Size:

**Exclude from deployment:**
- `node_modules/` (install on server)
- `.git/`
- `*.md` files
- Development dependencies

**Final deployment size: 20-30MB** (without node_modules)
