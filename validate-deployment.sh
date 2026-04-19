#!/bin/bash
# Deployment Validation Script
# This script checks if your GitHub Pages deployment is configured correctly

echo "🔍 STORE IT! Deployment Configuration Check"
echo "==========================================="
echo ""

# Check 1: vite.config.js
echo "✓ Checking vite.config.js..."
if grep -q "base: '/STORE-IT-/'" vite.config.js; then
    echo "  ✅ Base path correctly set to '/STORE-IT-/'"
else
    echo "  ❌ Base path NOT set - should be '/STORE-IT-/'"
fi
echo ""

# Check 2: .nojekyll exists
echo "✓ Checking .nojekyll..."
if [ -f ".nojekyll" ]; then
    echo "  ✅ .nojekyll file exists"
else
    echo "  ❌ .nojekyll file missing - creating it..."
    touch .nojekyll
fi
echo ""

# Check 3: Workflow file exists
echo "✓ Checking GitHub Actions workflow..."
if [ -f ".github/workflows/deploy.yml" ]; then
    echo "  ✅ Workflow file exists"
    if grep -q "pages: write" .github/workflows/deploy.yml; then
        echo "  ✅ Permissions set correctly"
    else
        echo "  ❌ Missing 'pages: write' permission"
    fi
else
    echo "  ❌ Workflow file missing!"
fi
echo ""

# Check 4: Build test
echo "✓ Testing npm build..."
if npm run build > /tmp/build.log 2>&1; then
    echo "  ✅ Build successful"
    if [ -f "dist/index.html" ]; then
        echo "  ✅ dist/index.html created"
        if grep -q "/STORE-IT-/assets" dist/index.html; then
            echo "  ✅ Asset paths correct"
        else
            echo "  ⚠️  Asset paths might be incorrect"
        fi
    fi
else
    echo "  ❌ Build failed - check errors above"
    cat /tmp/build.log | tail -20
fi
echo ""

# Check 5: Git status
echo "✓ Checking git status..."
if [ -z "$(git status --porcelain)" ]; then
    echo "  ✅ All changes committed"
else
    echo "  ⚠️  Uncommitted changes detected:"
    git status --short
fi
echo ""

# Check 6: .gitignore
echo "✓ Checking .gitignore..."
if grep -q "^dist/" .gitignore; then
    echo "  ✅ dist/ is in .gitignore (correct for Actions)"
else
    echo "  ℹ️  dist/ not in .gitignore (GitHub Actions will build it)"
fi
echo ""

echo "==========================================="
echo "✨ Deployment check complete!"
echo ""
echo "📝 Next steps:"
echo "  1. If any ❌ errors above, fix them"
echo "  2. Commit all changes: git add . && git commit -m 'fix: deployment'"
echo "  3. Push to GitHub: git push origin main"
echo "  4. Check Actions: https://github.com/Div0011/STORE-IT-/actions"
echo "  5. Verify site: https://div0011.github.io/STORE-IT-/"
echo ""
