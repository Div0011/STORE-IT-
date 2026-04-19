# 🚀 GitHub Pages Deployment Guide

## Overview
This guide ensures your STORE IT! website deploys successfully to GitHub Pages.

---

## ✅ Prerequisites Checklist

- [ ] Repository is public (check Settings)
- [ ] Main branch exists and is up to date
- [ ] GitHub Actions is enabled (check Actions tab)
- [ ] `.github/workflows/deploy.yml` exists
- [ ] `vite.config.js` has `base: '/STORE-IT-/'`
- [ ] `.nojekyll` file exists in root

---

## 📋 Current Configuration

### 1. Vite Base Path (`vite.config.js`)
```javascript
export default defineConfig({
    base: '/STORE-IT-/',  // ← Required for subdirectory deployment
    plugins: [react(), tailwindcss()],
})
```

**Why?** GitHub Pages deploys to `https://username.github.io/repo-name/`, not root.

---

### 2. GitHub Actions Workflow (`.github/workflows/deploy.yml`)

Your workflow does:
1. ✅ Checks out code
2. ✅ Installs Node.js 18
3. ✅ Installs npm dependencies
4. ✅ Runs `npm run build`
5. ✅ Uploads `dist/` as artifact
6. ✅ Deploys to GitHub Pages

**Location:** `.github/workflows/deploy.yml`

---

### 3. Jekyll Disable (`.nojekyll`)

This file tells GitHub Pages **not** to process your site with Jekyll.

**Why?** Jekyll can interfere with asset loading and routing.

---

## 🔧 Deployment Process

### Step 1: Make Changes Locally
```bash
# Make your code changes
npm run dev  # Test locally at http://localhost:5173

# Commit your changes
git add .
git commit -m "feat: your feature description"
```

### Step 2: Push to GitHub
```bash
git push origin main
```

### Step 3: Monitor Deployment
1. Go to: **https://github.com/Div0011/STORE-IT-/actions**
2. Click the latest workflow (should say your commit message)
3. Wait for both jobs to complete:
   - **build** ← Runs npm build
   - **deploy** ← Uploads to GitHub Pages

### Step 4: Verify Deployment
- Check if workflow shows ✅ green checkmarks
- Visit: **https://div0011.github.io/STORE-IT-/**
- Hard refresh browser (Cmd+Shift+R or Ctrl+Shift+R)

---

## ⚠️ Common Issues & Fixes

### Issue 1: White/Blank Page
**Cause:** Browser cache or asset path wrong
**Fix:**
```bash
# Hard refresh in browser
Cmd+Shift+R (Mac) or Ctrl+Shift+R (Windows)

# Or clear site data in DevTools:
# F12 → Application → Storage → Clear Site Data
```

### Issue 2: Workflow Fails at "Build"
**Cause:** npm build has errors
**Fix:**
```bash
# Test build locally first
npm run build

# Check for errors
npm run build 2>&1 | tail -20

# Fix any errors shown
```

### Issue 3: Assets Return 404
**Cause:** Vite base path not set correctly
**Fix:** Verify `vite.config.js` has:
```javascript
base: '/STORE-IT-/',
```

### Issue 4: Old Version Still Showing
**Cause:** Browser cache or deployment incomplete
**Fix:**
```bash
# 1. Force hard refresh
Cmd+Shift+R

# 2. Check deployment status
# Go to: Settings → Pages → see deployment status

# 3. Clear CloudFlare cache (if used)
# Or wait 5 minutes for CDN refresh

# 4. If still not working, trigger new deployment:
git commit --allow-empty -m "trigger deployment"
git push origin main
```

### Issue 5: Permissions Error in Actions
**Cause:** Workflow lacks `pages: write` permission
**Fix:** Verify `.github/workflows/deploy.yml` has:
```yaml
permissions:
  contents: read
  pages: write
  id-token: write
```

---

## 🔍 Verification Checklist

After deployment, verify:

- [ ] **URL responds:** `curl https://div0011.github.io/STORE-IT-/`
- [ ] **Has HTML content:** Check page source (not blank)
- [ ] **Assets load:** Check DevTools Network tab (no 404s)
- [ ] **No CORS errors:** Check DevTools Console
- [ ] **Page is interactive:** Can click buttons, toggle dark mode

---

## 📊 Deployment Status Page

**Repository:** https://github.com/Div0011/STORE-IT-/
**Settings → Pages:** Shows current deployment

Look for:
- ✅ "Your site is live at: https://div0011.github.io/STORE-IT-/"
- Source: "Deploy from a branch" → Branch: `gh-pages` or `main` (depends on action)

---

## 🎯 Quick Redeploy

If you need to force a new deployment:

```bash
# Option 1: Empty commit (triggers workflow)
git commit --allow-empty -m "trigger: force redeploy"
git push origin main

# Option 2: Update .nojekyll (triggers workflow)
touch .nojekyll
git add .nojekyll
git commit -m "refresh: nojekyll"
git push origin main

# Option 3: Clear GitHub Pages cache (via Settings)
# Go to Settings → Pages → Deploy from → Change and Save → Change back
```

---

## 📱 Testing the Deployed Site

```bash
# Test from command line
curl -I https://div0011.github.io/STORE-IT-/

# Should return:
# HTTP/2 200
# Content-Type: text/html
```

---

## 🚨 Emergency: Force Complete Rebuild

If nothing works:

```bash
# 1. Clean local build
rm -rf dist/
npm run build

# 2. Verify build
ls -lh dist/index.html

# 3. Force push (only if desperate)
git add -A
git commit -m "rebuild: force complete deployment"
git push origin main

# 4. Then manually trigger Actions
# Go to: Actions → Deploy to GitHub Pages → Run workflow
```

---

## 📞 Help Resources

- **GitHub Pages Docs:** https://docs.github.com/pages
- **Vite Deployment:** https://vitejs.dev/guide/static-deploy.html#github-pages
- **React on GitHub Pages:** https://create-react-app.dev/docs/deployment/#github-pages

---

## ✨ Current Setup Status

| Component | Status |
|-----------|--------|
| Repository | Public ✅ |
| Vite Config | `/STORE-IT-/` base ✅ |
| Workflow File | `.github/workflows/deploy.yml` ✅ |
| Jekyll Disable | `.nojekyll` present ✅ |
| Permissions | `pages: write` set ✅ |
| Node Version | 18.x ✅ |
| Build Script | `npm run build` ✅ |

---

## 🎉 Success Indicators

When deployment is working correctly:

1. ✅ Workflow runs automatically on push to main
2. ✅ Build completes in 1-2 minutes
3. ✅ Deploy job shows deployment URL
4. ✅ Site loads at `https://div0011.github.io/STORE-IT-/`
5. ✅ No 404 errors in console
6. ✅ Styling and JavaScript work
7. ✅ Interactive features respond

---

**Last Updated:** April 20, 2026  
**Workflow Version:** GitHub Actions with official deploy-pages@v4
