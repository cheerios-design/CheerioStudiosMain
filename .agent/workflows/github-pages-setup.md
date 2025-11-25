# GitHub Pages Configuration Guide

## ✅ Files Created
I've created the following files to enable automatic deployment:

1. **`.github/workflows/deploy.yml`** - GitHub Actions workflow that:
   - Automatically builds your site from the `cheerio-studio` folder
   - Deploys to GitHub Pages whenever you push to the `main` branch
   
2. **`cheerio-studio/public/CNAME`** - Custom domain configuration
   - Ensures your custom domain (www.cheeriostudios.com) is preserved during deployment

## 🔧 Required GitHub Settings

You need to change one setting in your GitHub repository:

### Step 1: Change GitHub Pages Source to GitHub Actions

1. Go to your repository: https://github.com/cheerios-design/CheerioStudiosMain
2. Click on **Settings** (top menu)
3. In the left sidebar, click **Pages** (under "Code and automation")
4. Under **Build and deployment** → **Source**:
   - Change from **"Deploy from a branch"** 
   - To **"GitHub Actions"**
5. Click **Save** (if there's a save button)

### Step 2: Wait for Deployment

Once you change the source to GitHub Actions:

1. Go to the **Actions** tab in your repository
2. You should see a workflow running called "Deploy to GitHub Pages"
3. Wait for it to complete (usually takes 2-3 minutes)
4. Once complete, your site will be live at https://www.cheeriostudios.com

## 🎯 How It Works

**Before (Not Working):**
- GitHub Pages tried to serve from repository root
- But your website is in the `cheerio-studio` subfolder
- Result: Empty site or 404 errors

**After (Working):**
- GitHub Actions automatically runs when you push code
- It navigates to `cheerio-studio` folder
- Runs `npm ci` to install dependencies
- Runs `npm run build` to create production files
- Deploys the `dist` folder to GitHub Pages
- Your custom domain is preserved via the CNAME file

## 🔄 Future Updates

Whenever you make changes to your website:

1. Make your changes in the `cheerio-studio` folder
2. Commit and push to GitHub:
   ```bash
   git add .
   git commit -m "Your update message"
   git push origin main
   ```
3. GitHub Actions will automatically rebuild and redeploy your site
4. Wait 2-3 minutes for the deployment to complete

## 🐛 Troubleshooting

### Site still not showing?
1. Check the Actions tab - is the workflow running successfully?
2. Make sure you changed the Pages source to "GitHub Actions"
3. Check if the CNAME file is in the deployed site (it should be in the root of the deployed site)

### Workflow failing?
1. Go to Actions tab
2. Click on the failed workflow
3. Check the error logs
4. Common issues:
   - Node version mismatch
   - Missing dependencies
   - Build errors (we already fixed these!)

### Custom domain not working?
1. Make sure DNS is configured correctly in GoDaddy
2. Check that CNAME file contains: `www.cheeriostudios.com`
3. In GitHub Pages settings, verify the custom domain is set

## 📝 Summary

**What I did:**
✅ Created GitHub Actions workflow for automatic deployment
✅ Copied CNAME file to the public folder
✅ Committed and pushed changes to GitHub

**What you need to do:**
1. Go to GitHub repository Settings → Pages
2. Change Source from "Deploy from a branch" to "GitHub Actions"
3. Wait for the workflow to complete
4. Visit https://www.cheeriostudios.com

That's it! Your site should be live within a few minutes.
