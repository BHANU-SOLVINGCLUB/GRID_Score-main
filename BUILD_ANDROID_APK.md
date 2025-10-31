# Building Android APK for The Cater Planner

This guide will help you build a release APK for your Android phone.

## Prerequisites

1. **Android Studio** - Download from [https://developer.android.com/studio](https://developer.android.com/studio)
2. **Java Development Kit (JDK) 17** - Usually comes with Android Studio
3. **Git** - To clone this project

## Step-by-Step Instructions

### 1. Clone the Repository

```bash
git clone <your-replit-git-url>
cd <your-repo-name>  # Replace with your actual repository folder name
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Build the Web Application

**Important:** Make sure this build completes successfully before proceeding to the next step.

```bash
npm run build
```

You should see `dist/public` directory created with your built web assets.

### 4. Sync Assets to Android

```bash
npx cap sync android
```

### 5. Open in Android Studio

```bash
npx cap open android
```

This will launch Android Studio with your project.

### 6. Build the APK in Android Studio

1. In Android Studio, go to **Build** → **Build Bundle(s) / APK(s)** → **Build APK(s)**
2. Wait for the build to complete (this may take a few minutes the first time)
3. Once done, click "locate" in the notification at the bottom right
4. You'll find the APK at: `android/app/build/outputs/apk/debug/app-debug.apk`

### 7. Install on Your Phone

**Option A: Direct Transfer**
1. Copy the APK file to your phone
2. Open the APK file on your phone
3. Allow installation from unknown sources if prompted
4. Install the app

**Option B: ADB (Android Debug Bridge)**
```bash
# Connect your phone via USB with USB debugging enabled
adb install android/app/build/outputs/apk/debug/app-debug.apk
```

## Building a Release APK (For Publishing)

For a release version:

1. Generate a signing key:
```bash
cd android/app
keytool -genkey -v -keystore my-release-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000
```

2. Update `android/app/build.gradle` to add signing config

3. Build release APK:
```bash
cd android
./gradlew assembleRelease
```

4. Find APK at: `android/app/build/outputs/apk/release/app-release.apk`

## Troubleshooting

### SDK Location Error
If you get "SDK location not found" error:
1. Open Android Studio
2. Go to **File** → **Project Structure** → **SDK Location**
3. Make sure Android SDK location is set

### Missing Dependencies
Run in Android Studio:
1. **Tools** → **SDK Manager**
2. Install the latest SDK Platform and Build Tools

## App Configuration

- **App Name**: The Cater Planner
- **Package Name**: com.caterplanner.app
- **Icons**: Already configured with your orange gradient platter design
- **Scheme**: HTTPS

## Questions?

If you encounter any issues, please refer to the [Capacitor Android documentation](https://capacitorjs.com/docs/android).
