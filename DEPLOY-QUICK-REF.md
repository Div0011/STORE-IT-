# ⚡ Quick Deployment Reference

## 📋 Before You Deploy

```bash
# 1. Make your changes
npm run dev          # Test locally

# 2. Run validation
bash validate-deployment.sh

# 3. Build locally
npm run build

# 4. Commit changes
git add .
git commit -m "feat: your feature"
```

## 🚀 Deploy to GitHub Pages

```bash
# One command does it all:
git push origin main
```

That's it! GitHub Actions automatically:
- ✅ Runs `npm install`
- ✅ Builds with `npm run build`
- ✅ Deploys to GitHub Pages
- ✅ Updates your live site

---

## 🔗 Important Links

| Task | Link |
|------|------|
| **Live Site** | https://div0011.github.io/STORE-IT-/ |
| **Repository** | https://github.com/Div0011/STORE-IT- |
| **Actions Status** | https://github.com/Div0011/STORE-IT-/actions |
| **Deployment Logs** | https://github.com/Div0011/STORE-IT-/actions (latest run) |
| **GitHub Pages Settings** | https://github.com/Div0011/STORE-IT-/settings/pages |

---

## 🔄 Monitor Deployment

After `git push`:

1. Go to **Actions** tab: https://github.com/Div0011/STORE-IT-/actions
2. Click latest workflow
3. Wait for ✅ green checkmarks on:
   - `build` job
   - `deploy` job
4. Takes ~1-2 minutes usually

---

## 🧹 Clear Cache (If Seeing Old Version)

In your browser:
- **Mac:** `Cmd + Shift + R`
- **Windows:** `Ctrl + Shift + R`

Or in DevTools (F12):
- Go to **Application** tab
- Click **Clear site data**
- Refresh page

---

## 🆘 If Deploy Fails

1. **Check build:** `npm run build` locally
2. **Check workflow:** Go to Actions → see error message
3. **Check git:** `git status` - make sure all changes committed
4. **Check config:** `grep -n "base" vite.config.js` should show `/STORE-IT-/`
5. **See full guide:** Read `DEPLOYMENT.md`

---

## 🎯 Deployment Checklist

Before pushing:
- [ ] Run `npm run build` locally - no errors
- [ ] Run `bash validate-deployment.sh` - all ✅
- [ ] All changes committed: `git status` shows clean
- [ ] Latest main branch: `git log --oneline -1`

After pushing:
- [ ] GitHub Actions workflow running: check Actions tab
- [ ] Workflow shows ✅ for both build & deploy
- [ ] Site loads: https://div0011.github.io/STORE-IT-/
- [ ] Hard refresh (Cmd/Ctrl+Shift+R) to clear cache
- [ ] Check DevTools Console for any errors

---

## 💡 Pro Tips

### Tip 1: Force Redeploy
```bash
git commit --allow-empty -m "trigger: redeploy"
git push origin main
```

### Tip 2: Check Deploy Logs
Go to: Actions → Latest Workflow → Deploy Job → Logs

### Tip 3: Verify Site Loads
```bash
# Check if site responds
curl -I https://div0011.github.io/STORE-IT-/

# Should return HTTP/2 200
```

### Tip 4: Monitor Build Size
Check Actions output to see if bundle is growing unexpectedly

---

## 📞 Common Commands

```bash
# Check if changes are committed
git status

# View recent commits
git log --oneline -5

# See what will be deployed
git show origin/main:src/App.jsx | head -10

# Force sync with GitHub
git fetch origin
git merge origin/main

# Check current branch
git branch

# View current vite config
grep -n "base" vite.config.js
```

---

## 🎉 Success!

Your site is live when:
- ✅ Workflow shows green checkmarks
- ✅ Page loads at deployed URL
- ✅ No 404 errors in console
- ✅ Styling and interactivity work

**Deployed URL:** https://div0011.github.io/STORE-IT-/

---

**For full troubleshooting:** See `DEPLOYMENT.md`  
**For validation:** Run `bash validate-deployment.sh`
