# Building iOS App for The Cater Planner

This guide will help you build an iOS app for your iPhone/iPad using Xcode on your Mac.

## Prerequisites

1. **macOS** - Required for iOS development
2. **Xcode** - Download from Mac App Store (free)
3. **Apple ID** - Free! Use your existing Apple ID for device testing
4. **Git** - To clone this project

**Note:** A free Apple ID is sufficient for installing on your own iPhone/iPad. The paid Apple Developer Program ($99/year) is only required for App Store distribution.

## Step-by-Step Instructions

### 1. Clone the Repository (if not already done)

```bash
git clone <your-replit-git-url>
cd <your-repo-name>
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Build the Web Application

**Important:** Make sure this build completes successfully before proceeding.

```bash
npm run build
```

You should see `dist/public` directory created with your built web assets.

### 4. Add iOS Platform

If this is your first time, add the iOS platform:

```bash
npx cap add ios
```

If you already have the iOS platform, just sync:

```bash
npx cap sync ios
```

### 5. Open in Xcode

```bash
npx cap open ios
```

This will launch Xcode with your project.

### 6. Configure Signing (First Time Only)

1. In Xcode, select your project in the left sidebar
2. Select the **"App"** target
3. Go to **"Signing & Capabilities"** tab
4. Check **"Automatically manage signing"**
5. Select your **Team** (you'll need to sign in with your Apple ID)
6. Xcode will automatically create a development certificate

### 7. Build and Run

#### Option A: Run on Simulator (No Apple Developer Account Needed)
1. At the top of Xcode, select a simulator (e.g., "iPhone 15 Pro")
2. Click the **Play** button (▶️) or press `Cmd + R`
3. Wait for the simulator to launch and your app to install

#### Option B: Run on Real Device (Requires Apple Developer Account)
1. Connect your iPhone/iPad via USB
2. Trust the computer on your device if prompted
3. In Xcode, select your device from the top dropdown
4. Click the **Play** button (▶️) or press `Cmd + R`
5. On your iPhone: Go to **Settings > General > VPN & Device Management**
6. Trust your developer certificate
7. Open the app on your device

### 8. Archive for Distribution (App Store or TestFlight)

**Note:** Requires paid Apple Developer Account ($99/year)

1. In Xcode, select **Product** → **Archive**
2. Wait for the archive to complete
3. In the Archives window, click **Distribute App**
4. Choose:
   - **App Store Connect** (for TestFlight or App Store)
   - **Ad Hoc** (for limited device testing)
   - **Development** (for your own devices)
5. Follow the wizard to upload or export

## Troubleshooting

### "No signing certificate found"
**Solution:**
1. Go to Xcode → **Settings** → **Accounts**
2. Sign in with your Apple ID
3. Select your team and click **Manage Certificates**
4. Click **+** → **Apple Development**

### "Unable to install app"
**Solution:**
- Make sure your iPhone is unlocked
- Trust the computer on your device
- Check that the device is compatible with your deployment target

### Build Errors
**Solution:**
1. Clean the build: **Product** → **Clean Build Folder** (Shift + Cmd + K)
2. Delete derived data: **Xcode → Settings → Locations → Derived Data** → Click arrow and delete folder
3. Rebuild

## App Store Submission Checklist

Before submitting to App Store:

- [ ] Update version in `ios/App/App/Info.plist`
- [ ] Add app icons (all sizes required)
- [ ] Add launch screen
- [ ] Test on multiple devices/simulators
- [ ] Create App Store listing in App Store Connect
- [ ] Prepare screenshots
- [ ] Write app description
- [ ] Archive and upload to App Store Connect

## Quick Commands Reference

```bash
# Build web assets
npm run build

# Sync Capacitor (after web build)
npx cap sync ios

# Open in Xcode
npx cap open ios

# Copy web assets only (no dependency updates)
npx cap copy ios
```

## Important Notes

- **Always build web assets first** (`npm run build`) before syncing to iOS
- **Don't edit files** in the `ios/App/App/public` directory - they're auto-generated
- **Keep Xcode updated** for best compatibility
- **iOS simulators** are free, but **real device testing** requires Apple Developer Account

## Need Help?

- [Capacitor iOS Documentation](https://capacitorjs.com/docs/ios)
- [Apple Developer Documentation](https://developer.apple.com/documentation/)
- [Xcode Help](https://developer.apple.com/xcode/)
