# GitHub Setup Guide - MoveMate Prototype

## Repository Name Suggestion

**Recommended:** `movemate-prototype` or `csc4620-movemate-prototype`

Choose one that's:
- Descriptive
- Lowercase
- Uses hyphens (not underscores or spaces)
- Easy to remember

---

## Step-by-Step: Setting Up GitHub Repository

### Step 1: Create Repository on GitHub.com

1. Go to **github.com** and sign in
2. Click the **"+"** icon in top right → **"New repository"**
3. **Repository name:** `movemate-prototype` (or your choice)
4. **Description:** "MoveMate - On-demand movers booking platform prototype for CSCI 4620U"
5. **Visibility:** 
   - ✅ **Private** (recommended - only you can see it)
   - Or Public (if you want to share)
6. **DO NOT** check "Initialize with README" (we already have files)
7. Click **"Create repository"**

---

### Step 2: Initialize Git in Your Project

Open Terminal/Command Prompt in your project folder and run:

```bash
# Initialize git repository
git init

# Add all files
git add .

# Make first commit
git commit -m "Initial commit - MoveMate prototype with all features"

# Add your GitHub repository as remote
git remote add origin https://github.com/YOUR_USERNAME/movemate-prototype.git

# Push to GitHub
git branch -M main
git push -u origin main
```

**Replace `YOUR_USERNAME`** with your actual GitHub username!

---

### Step 3: Create .gitignore File

We'll create this to exclude unnecessary files (but keep all your project files).

---

## What Gets Uploaded

✅ **These files will be in the repo:**
- index.html
- styles.css
- app.js
- README.md
- PROJECT_REPORT.md
- All documentation files (*.md)
- .gitignore (we'll create this)

✅ **All your work is safe and version controlled!**

---

## Accessing on Another Device

After pushing to GitHub:

1. Go to your repository on GitHub.com
2. Click **"Code"** button (green)
3. Copy the repository URL
4. On your other device, run:
   ```bash
   git clone https://github.com/YOUR_USERNAME/movemate-prototype.git
   ```
5. All your files will be there!

---

## Quick Commands Reference

```bash
# Check status
git status

# Add all changes
git add .

# Commit changes
git commit -m "Your message here"

# Push to GitHub
git push

# Pull from GitHub (on other device)
git pull
```

---

Let's set this up now! Follow the steps below.

