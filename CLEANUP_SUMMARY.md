# Project Cleanup - Complete Guide

## Current Status: 180MB+ → Target: 50-80MB

## ✅ What I've Done For You:

1. **Updated layout.pug** - Fixed all CSS/JS paths (removed `/css/css/` and `/js/js/`)
2. **Created cleanup scripts** - Automated cleanup process
3. **Identified all unnecessary files** - Detailed list below

## 🚀 Quick Start (3 Steps):

### Step 1: Run the automated cleanup
```cmd
auto-cleanup.cmd
```
This will:
- Create a backup (optional)
- Move files from duplicate folders
- Delete unused files
- Clean up documentation

### Step 2: Test your website
```cmd
npm start
```
Visit http://localhost:3001 and test all pages

### Step 3: Production optimization
```cmd
npm prune --production
```

## 📊 Size Breakdown:

### What's Taking Up Space:

| Item | Size | Action |
|------|------|--------|
| node_modules | ~80-100MB | Keep (needed) |
| public/images | ~20-40MB | Optimize |
| Duplicate folders | ~20-30MB | **DELETE** |
| Unused JS/CSS | ~10-15MB | **DELETE** |
| Documentation | ~1-2MB | **DELETE** |
| .git folder | ~10-20MB | Keep for dev |

### Files Being Deleted:

**Duplicate Folders:**
- `public/css/css/` (entire folder)
- `public/js/js/` (entire folder)

**Unused JavaScript (19 files):**
- addtoany.js
- aos.js
- drupal.js, drupal.init.js, drupalSettingsLoader.js
- form-submit.js, formValidations.js
- global.js, gsap.min.js
- jquery.floatit.js, jquery.lazy.min.js, jquery.min_1.js
- lottie-player.js, once.min.js, page.js
- popper.min.js, scon.js
- ScrollTrigger.min.js, slick.min.js

**Unused CSS:**
- bootstrap-icons.css

**Documentation (11 files):**
- CHECKLIST.md
- CONVERSION_GUIDE.md
- CONVERSION_SUMMARY.md
- REFACTORING_SUMMARY.md
- STRUCTURE_COMPARISON.md
- PUG_QUICK_REFERENCE.md
- QUICK_START.md
- ADMIN_LOGIN_GUIDE.md
- SCHEMA_INTEGRATION_GUIDE.md
- convert-helper.js
- test-server.js
- update-routes.ps1
- kill-port.cmd

**Unused Views:**
- blog2.pug
- blog3.pug

**CDN Cache:**
- public/cdn-cgi/ (entire folder)

## 🎯 Expected Results:

- **Before:** 180MB+
- **After Cleanup:** 80-100MB
- **After npm prune:** 50-80MB
- **Deployment (no node_modules):** 20-30MB

## 🖼️ Image Optimization (Optional - Additional 20-30MB):

### Option 1: Using online tools
- Upload images to tinypng.com or compressor.io
- Download optimized versions
- Replace originals

### Option 2: Using npm package
```cmd
npm install -g sharp-cli
cd public/images
sharp -i *.png -o optimized/ --quality 80
sharp -i *.jpg -o optimized/ --quality 80
```

## 📦 Production Deployment:

### What to Deploy:
```
✅ app.js
✅ package.json
✅ package-lock.json
✅ models/
✅ views/
✅ public/ (optimized)
✅ .env (create for production)
```

### What NOT to Deploy:
```
❌ node_modules/ (install on server)
❌ .git/
❌ *.md files
❌ cleanup scripts
❌ test files
```

### Deployment Steps:
```cmd
# 1. On your server
npm install --production

# 2. Set environment variables
# Create .env file with:
# PORT=3001
# MONGODB_URI=your_production_mongodb_url
# SESSION_SECRET=your_secret_key

# 3. Start with PM2 (recommended)
npm install -g pm2
pm2 start app.js --name mamo-blog
pm2 save
pm2 startup
```

## 🔒 Security for Production:

### 1. Create .env file:
```env
PORT=3001
MONGODB_URI=mongodb://your-production-db
SESSION_SECRET=your-very-long-random-secret-key
ADMIN_EMAIL=admin@gmail.com
ADMIN_PASSWORD=your-secure-password
```

### 2. Update app.js to use .env:
```javascript
require('dotenv').config();
const PORT = process.env.PORT || 3001;
const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
```

### 3. Install dotenv:
```cmd
npm install dotenv
```

## ✅ Final Checklist:

- [ ] Run `auto-cleanup.cmd`
- [ ] Test website thoroughly
- [ ] Check all pages load correctly
- [ ] Verify blog posts display properly
- [ ] Test admin login
- [ ] Run `npm prune --production`
- [ ] Optimize images (optional)
- [ ] Create .env file
- [ ] Update MongoDB connection for production
- [ ] Test on production server
- [ ] Set up PM2 for process management
- [ ] Configure nginx/Apache reverse proxy
- [ ] Set up SSL certificate

## 🆘 Troubleshooting:

### If website breaks after cleanup:
1. Restore from backup: `xcopy /E /I /Y ..\mamo-backup\* .`
2. Check browser console for missing file errors
3. Verify layout.pug paths are correct

### If images don't load:
- Check file paths in views
- Verify images exist in public/images/
- Check file permissions

### If styles are broken:
- Clear browser cache (Ctrl+Shift+Delete)
- Check CSS file paths in layout.pug
- Verify CSS files exist in public/css/

## 📞 Support:

If you encounter issues:
1. Check the backup at `..\mamo-backup`
2. Review browser console errors
3. Check server logs
4. Verify all file paths

## 🎉 Success Metrics:

After cleanup, you should have:
- ✅ 100MB+ smaller project
- ✅ Faster deployment times
- ✅ Cleaner codebase
- ✅ Production-ready structure
- ✅ Better performance

---

**Created:** February 2026
**Project:** MaMo TechnoLabs Blog System
**Status:** Ready for cleanup
