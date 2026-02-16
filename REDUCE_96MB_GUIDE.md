# Reduce Public Folder from 96.72MB

## Current Size Breakdown:
- **Total Project:** ~117MB
- **node_modules:** 19.28MB (necessary)
- **public folder:** 96.72MB ⚠️ (MAIN ISSUE!)
- **views:** 0.88MB (fine)

## Problem: Public Folder = 96.72MB

Based on your file structure:
- **public/images:** ~119 files (likely 80-90MB) ⚠️
- **public/js:** Duplicate folders + unused files (~5-8MB)
- **public/css:** Duplicate folders (~2-3MB)
- **public/fonts:** (~1-2MB)

## 🎯 REDUCTION PLAN - Get to 20-30MB

### STEP 1: Optimize Images (Save 60-70MB!)

Your images are the biggest problem. Here's how to fix:

#### Option A: Online Compression (Easiest)
1. Go to https://tinypng.com or https://compressor.io
2. Upload all images from `public/images/`
3. Download compressed versions
4. Replace originals

**Expected savings: 60-70MB (70-80% reduction)**

#### Option B: Automated Compression
```cmd
# Install sharp-cli
npm install -g sharp-cli

# Compress PNG images
cd public/images
sharp -i *.png -o compressed/ --quality 80

# Compress JPG images
sharp -i *.jpg -o compressed/ --quality 80
sharp -i *.jpeg -o compressed/ --quality 80

# Compress WebP images
sharp -i *.webp -o compressed/ --quality 80

# Replace originals
move compressed\* .
rmdir compressed
cd ..\..
```

#### Option C: Convert to WebP (Best compression)
```cmd
# Install imagemagick or use online converter
# Convert all images to WebP format
# WebP is 25-35% smaller than PNG/JPG
```

### STEP 2: Remove Duplicate Folders (Save 5-10MB)

You have duplicate CSS and JS folders:

```cmd
# Move files out of nested folders
move public\css\css\*.css public\css\
move public\js\js\main.js public\js\

# Delete duplicate folders
rmdir /s /q public\css\css
rmdir /s /q public\js\js
```

**Already updated layout.pug for you!**

### STEP 3: Delete Unused Files (Save 5-8MB)

```cmd
# Delete unused JavaScript
cd public\js
del addtoany.js aos.js drupal.js drupal.init.js drupalSettingsLoader.js
del form-submit.js formValidations.js global.js gsap.min.js
del jquery.floatit.js jquery.lazy.min.js jquery.min_1.js
del lottie-player.js once.min.js page.js popper.min.js
del scon.js ScrollTrigger.min.js slick.min.js
cd ..\..

# Delete unused CSS
del public\css\bootstrap-icons.css

# Delete CDN cache
rmdir /s /q public\cdn-cgi
```

### STEP 4: Use CDN for Libraries (Save 3-5MB)

Instead of hosting jQuery, Bootstrap locally, use CDN.

Update `views/layout.pug`:

**Replace:**
```pug
script(src="/js/jquery.min.js")
script(src="/js/bootstrap.bundle.min.js")
```

**With:**
```pug
script(src="https://cdn.jsdelivr.net/npm/jquery@3.6.0/dist/jquery.min.js")
script(src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js")
```

Then delete local files:
```cmd
del public\js\jquery.min.js
del public\js\bootstrap.bundle.min.js
```

### STEP 5: Remove Unused Images (Manual Review)

Check which images are actually used:
1. Search your views for image references
2. Delete unused images
3. Keep only what's needed

**Potential savings: 10-20MB**

## 📊 Expected Results:

| Action | Savings | New Size |
|--------|---------|----------|
| Start | - | 96.72MB |
| Image optimization | -60MB | 36.72MB |
| Remove duplicates | -8MB | 28.72MB |
| Delete unused files | -5MB | 23.72MB |
| Use CDN | -3MB | 20.72MB |
| **TOTAL REDUCTION** | **-76MB** | **~20MB** |

## 🚀 AUTOMATED SCRIPT

I'll create a script that does everything except image optimization:

```cmd
# Run this after backing up
auto-cleanup.cmd
```

## ⚡ QUICK WIN - Do This First!

### Immediate 5-10MB Reduction (2 minutes):

```cmd
# 1. Delete duplicate folders
rmdir /s /q public\css\css
rmdir /s /q public\js\js

# 2. Delete CDN cache
rmdir /s /q public\cdn-cgi

# 3. Delete unused JS
cd public\js
del drupal.js drupal.init.js drupalSettingsLoader.js jquery.min_1.js
cd ..\..
```

## 🖼️ IMAGE OPTIMIZATION PRIORITY

Focus on these image types (biggest files):
1. **PNG files** - Usually largest, compress to 80% quality
2. **JPG files** - Compress to 80% quality
3. **WebP files** - Already compressed but can optimize further
4. **SVG files** - Minify using SVGO

## 📦 Production Deployment Size

After all optimizations:
- **public:** ~20MB
- **node_modules:** 19MB (install on server)
- **views + models + app.js:** ~1MB
- **Total deployment:** ~20MB (without node_modules)

## 🎯 FINAL CHECKLIST

- [ ] Backup project first!
- [ ] Compress all images (biggest impact!)
- [ ] Run auto-cleanup.cmd
- [ ] Delete duplicate folders
- [ ] Remove unused files
- [ ] Switch to CDN for libraries
- [ ] Test website thoroughly
- [ ] Run npm prune --production
- [ ] Deploy optimized version

## 🔥 CRITICAL: Image Optimization

**This is your #1 priority!** Images are 80-90% of your public folder size.

### Recommended Tools:
1. **TinyPNG** - https://tinypng.com (easiest)
2. **Squoosh** - https://squoosh.app (Google's tool)
3. **ImageOptim** - Desktop app for Mac
4. **Sharp-CLI** - Command line tool (npm)

### Target Compression:
- PNG: 80% quality (60-70% size reduction)
- JPG: 80% quality (50-60% size reduction)
- WebP: 80% quality (already efficient)

## 📈 Progress Tracking

| Step | Status | Size After |
|------|--------|------------|
| Start | ✅ | 96.72MB |
| Image optimization | ⏳ | ~36MB |
| Remove duplicates | ⏳ | ~28MB |
| Delete unused | ⏳ | ~23MB |
| Use CDN | ⏳ | ~20MB |

---

**Start with image optimization - it will give you the biggest reduction!**
