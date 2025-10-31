# iOS Distribution Guide - The Cater Planner

## Current Status
✅ iOS app successfully running on iPhone via USB

## Distribution Options

### Option 1: Ad-Hoc Distribution (Recommended for Friends)

This creates an `.ipa` file that friends can install on their iPhones.

#### Requirements:
- Friends' iPhone UDIDs (see how to get below)
- macOS with Xcode
- Apple ID (Free or Paid Developer Account)

#### Limitations with FREE Apple ID:
- ⏰ App expires after **7 days**
- 📱 Maximum **3 devices** at a time
- 🔄 Friends need to reinstall every 7 days

#### Limitations with PAID Developer Account ($99/year):
- ⏰ App valid for **1 year**
- 📱 Up to **100 devices**
- 🚀 Can use **TestFlight** for easy distribution

---

## Step 1: Get Friends' Device UDIDs

Your friends need to send you their iPhone's UDID. They can get it by:

### Method A: Using Finder (macOS Catalina or later)
1. Connect iPhone to Mac with USB cable
2. Open **Finder**
3. Click on the iPhone in the sidebar
4. Click on the device info under the iPhone name
5. It will cycle through: Serial Number → UDID → Model Number
6. Right-click the UDID and select **"Copy"**
7. Send this UDID to you

### Method B: Using iTunes (older macOS or Windows)
1. Connect iPhone to computer
2. Open iTunes
3. Click on the iPhone icon
4. Click on "Serial Number" - it will change to UDID
5. Right-click and copy
6. Send this UDID to you

---

## Step 2: Register Devices in Xcode

1. Open your project in Xcode:
   ```bash
   cd ~/Desktop/GRID_Score
   npx cap open ios
   ```

2. Go to **Xcode** → **Window** → **Devices and Simulators**

3. For each friend's device:
   - Click the **"+"** button at the bottom left
   - Enter a **Device Name** (e.g., "John's iPhone")
   - Paste the **UDID**
   - Click **"Register"**

---

## Step 3: Create Archive

1. In Xcode, select **"Any iOS Device (arm64)"** from the device dropdown (top-left)
   - Do NOT select your connected iPhone
   - Do NOT select a simulator

2. Go to **Product** → **Archive**

3. Wait for the build to complete (5-15 minutes)

4. The **Organizer** window will open automatically showing your archive

---

## Step 4: Export IPA File

1. In the **Organizer** window, select your archive

2. Click **"Distribute App"**

3. Select **"Ad Hoc"** → Click **"Next"**

4. Select **"Automatically manage signing"** → Click **"Next"**

5. Review the distribution options → Click **"Next"**

6. Review the App.ipa content → Click **"Export"**

7. Choose a location to save (e.g., Desktop) → Click **"Export"**

8. You'll get a folder containing **App.ipa**

---

## Step 5: Share IPA with Friends

### Method A: Using AltStore (FREE - No Computer Needed After Setup)

**Your friends need to:**

1. Download **AltStore** on their computer: https://altstore.io/
2. Install **AltServer** on their computer
3. Connect iPhone to computer
4. Install **AltStore** app to iPhone
5. You send them the **App.ipa** file
6. They open the IPA file in **AltStore** on their iPhone
7. AltStore installs the app

⚠️ **Important:** With free Apple ID, they need to refresh the app every 7 days using AltStore

---

### Method B: Using Apple Configurator 2 (Mac Only)

**Your friends need:**
1. A Mac computer
2. Download **Apple Configurator 2** from Mac App Store

**Steps for your friends:**
1. Connect iPhone to Mac
2. Open **Apple Configurator 2**
3. Double-click their device
4. Click **"Add"** → **"Apps"**
5. Select the **App.ipa** file you sent them
6. The app will install

---

### Method C: Using Xcode (Mac Only)

**Your friends need:**
1. A Mac with Xcode installed

**Steps for your friends:**
1. Connect iPhone to Mac
2. Open Xcode
3. Go to **Window** → **Devices and Simulators**
4. Select their iPhone
5. Click the **"+"** under "Installed Apps"
6. Select the **App.ipa** file
7. The app will install

---

## Step 6: TestFlight (If You Have Apple Developer Account)

If you purchase the **Apple Developer Program ($99/year)**, you can use TestFlight:

### Benefits:
- ✅ Friends just install from **TestFlight app** (like App Store)
- ✅ No computer needed for installation
- ✅ Automatic updates
- ✅ App valid for **90 days** per build
- ✅ Up to **10,000 testers**

### Setup:
1. Enroll in Apple Developer Program: https://developer.apple.com/programs/
2. Create app in **App Store Connect**
3. Archive and upload to **TestFlight**
4. Add friends' email addresses as testers
5. They get invitation via email
6. They download **TestFlight** app from App Store
7. They install your app from TestFlight

---

## Troubleshooting

### "Untrusted Developer" on Friend's iPhone
Your friend needs to:
1. Go to **Settings** → **General** → **VPN & Device Management**
2. Find your Apple ID/Developer name
3. Tap **"Trust"**

### App Expires After 7 Days
This is normal with free Apple ID. Options:
- Rebuild and redistribute every 7 days
- Upgrade to Apple Developer Program ($99/year)

### "Unable to Install"
- Make sure friend's UDID is registered in Xcode
- Rebuild the archive after adding new devices
- Check that friend's iOS version is compatible

---

## Summary

**For Testing with Friends (FREE):**
1. Get friends' UDIDs
2. Register devices in Xcode
3. Create archive
4. Export IPA
5. Share IPA via AltStore/Configurator/Xcode
6. ⚠️ Reinstall every 7 days

**For Long-term Distribution:**
1. Purchase Apple Developer Program ($99/year)
2. Use TestFlight
3. Friends install like any other app
4. No 7-day expiration

---

## Next Steps

Ready to create the IPA file? Let me know when you have your friends' UDIDs and I'll guide you through the archiving process!
