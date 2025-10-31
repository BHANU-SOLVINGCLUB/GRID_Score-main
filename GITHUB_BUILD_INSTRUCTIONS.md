# How to Get Your APK Using GitHub Actions (Cloud Build - FREE!)

This is the easiest way to get your APK without installing anything on your computer!

## Quick Steps

### 1. Push Your Code to GitHub

If you haven't already connected this Repl to GitHub:

1. In Replit, click the **Version Control** icon (looks like a branch)
2. Click **Create a Git Repo**
3. Click **Connect to GitHub**
4. Follow the prompts to create a new repository

### 2. Enable GitHub Actions

1. Go to your GitHub repository in your browser
2. Click on the **Actions** tab
3. If prompted, click **"I understand my workflows, go ahead and enable them"**

### 3. Trigger the Build

**Option A: Automatic (Recommended)**
- Just push any change to your code
- GitHub Actions will automatically build the APK

**Option B: Manual Trigger**
1. Go to **Actions** tab in your GitHub repo
2. Click on **"Build Android APK"** workflow on the left
3. Click **"Run workflow"** button
4. Click the green **"Run workflow"** button again

### 4. Download Your APK

1. Wait 5-10 minutes for the build to complete (you'll see a green checkmark when done)
2. Click on the completed workflow run
3. Scroll down to **Artifacts** section
4. Download **"app-debug"** - this is your APK!
5. Extract the ZIP file to get `app-debug.apk`

### 5. Install on Your Android Phone

**Option A: Direct Transfer**
1. Transfer the APK to your phone (via USB, Google Drive, email, etc.)
2. Open the APK file on your phone
3. Allow "Install from unknown sources" if prompted
4. Install and enjoy!

**Option B: QR Code**
1. Upload the APK to a file sharing service (Google Drive, Dropbox, etc.)
2. Get a shareable link
3. Create a QR code from the link (using qr-code-generator.com)
4. Scan the QR code with your phone
5. Download and install

## What Gets Built?

- **App Name**: The Cater Planner
- **Package**: com.caterplanner.app
- **Icon**: Your beautiful orange gradient platter design
- **Type**: Debug APK (works on any Android device)

## Troubleshooting

### Build Fails
- Check the Actions tab for error messages
- Make sure all files were committed and pushed
- Try running the workflow again (sometimes it's just a temporary issue)

### Can't Install APK
- Make sure you enabled "Install from unknown sources" in your Android settings
- Try uninstalling any previous version first
- Restart your phone and try again

### Want a Signed Release APK?
- The current build creates a debug APK (works for testing)
- For publishing to Google Play Store, you'll need to create a signed release APK
- See `BUILD_ANDROID_APK.md` for instructions on creating a signing key

## Updates

Every time you push changes to GitHub, a new APK will be automatically built!

Just go to the Actions tab, wait for the build, and download the latest version.

## Cost

**100% FREE!** GitHub Actions gives you 2,000 free minutes per month for public repositories.

Building an APK typically takes 5-10 minutes, so you can build about 200+ APKs per month for free!
