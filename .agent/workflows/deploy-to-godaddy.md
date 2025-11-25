---
description: Deploy Cheerio Studios to GoDaddy
---

# Deploying Cheerio Studios to GoDaddy (cheeriostudios.com)

This guide will walk you through deploying your Cheerio Studios website to your GoDaddy domain.

## Prerequisites

- GoDaddy account with access to cheeriostudios.com
- FTP/SFTP credentials from GoDaddy
- Node.js installed locally (already have this)

## Step 1: Build Your Production Bundle

First, we need to create an optimized production build of your website.

```bash
cd g:\CheerioStudios\cheerio-studio
npm run build
```

This will create a `dist` folder containing all your production-ready files (HTML, CSS, JavaScript, images, etc.).

## Step 2: Get Your GoDaddy Hosting Credentials

You'll need to access your GoDaddy hosting control panel:

1. Log in to your GoDaddy account at https://www.godaddy.com
2. Go to **My Products** → **Web Hosting**
3. Click **Manage** next to your hosting plan
4. Look for **FTP/SFTP** credentials or **File Manager** access

You'll need:
- **FTP Host**: Usually `ftp.cheeriostudios.com` or similar
- **Username**: Your FTP username
- **Password**: Your FTP password
- **Port**: Usually 21 for FTP or 22 for SFTP

## Step 3: Choose Your Upload Method

### Option A: Using GoDaddy File Manager (Easiest)

1. In your GoDaddy hosting control panel, find **File Manager**
2. Navigate to the `public_html` folder (or `www` folder - this is your web root)
3. **Delete or backup** any existing files in this folder
4. Upload all files from `g:\CheerioStudios\cheerio-studio\dist\` to the `public_html` folder
5. Make sure `index.html` is in the root of `public_html`

### Option B: Using FTP Client (Recommended for larger sites)

**Using FileZilla (Free FTP Client):**

1. Download FileZilla from https://filezilla-project.org/
2. Install and open FileZilla
3. Enter your FTP credentials:
   - Host: `ftp.cheeriostudios.com` (or your specific FTP host)
   - Username: Your FTP username
   - Password: Your FTP password
   - Port: 21
4. Click **Quickconnect**
5. On the left side (Local), navigate to `g:\CheerioStudios\cheerio-studio\dist\`
6. On the right side (Remote), navigate to `public_html` or `www`
7. **Delete or backup** existing files in `public_html`
8. Select all files in the `dist` folder and drag them to `public_html`

### Option C: Using Command Line FTP (Windows)

```bash
# Navigate to your dist folder
cd g:\CheerioStudios\cheerio-studio\dist

# Connect via FTP
ftp ftp.cheeriostudios.com

# Enter your username and password when prompted
# Then run these commands:
cd public_html
mput *
```

## Step 4: Configure Domain Settings (If Needed)

If your domain isn't pointing to your hosting yet:

1. In GoDaddy, go to **My Products** → **Domains**
2. Click **Manage** next to cheeriostudios.com
3. Go to **DNS** settings
4. Ensure the A record points to your hosting server IP
5. Wait for DNS propagation (can take up to 48 hours, usually much faster)

## Step 5: Verify Deployment

1. Open your browser and go to https://cheeriostudios.com
2. Check that your site loads correctly
3. Test all pages and functionality
4. Check mobile responsiveness

## Step 6: Set Up SSL Certificate (HTTPS)

GoDaddy usually provides free SSL certificates:

1. In your GoDaddy hosting control panel
2. Look for **SSL Certificates** or **Security**
3. Enable/Install the free SSL certificate
4. This may take a few minutes to activate

## Troubleshooting

### Site shows 404 or blank page
- Ensure `index.html` is in the root of `public_html`
- Check that all files were uploaded correctly
- Clear your browser cache

### Images or CSS not loading
- Check that the `assets` folder was uploaded
- Verify file permissions (should be 644 for files, 755 for folders)
- Check browser console for errors

### Domain not resolving
- Check DNS settings in GoDaddy
- Wait for DNS propagation (up to 48 hours)
- Try accessing via direct hosting URL first

## Future Updates

Whenever you make changes to your site:

1. Run `npm run build` to create a new production bundle
2. Upload the contents of the `dist` folder to `public_html`
3. Clear your browser cache to see changes

## Alternative: Automated Deployment

For easier future deployments, consider:
- **GitHub Pages** (free, but requires public repo)
- **Netlify** (free tier, can point to your GoDaddy domain)
- **Vercel** (free tier, can point to your GoDaddy domain)

These services can auto-deploy when you push to GitHub and offer better performance with CDN.
