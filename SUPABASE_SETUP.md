# Supabase Setup & iOS Deployment Guide

This guide will help you configure Supabase database connection for the backend and prepare your app for iOS deployment.

## 📋 Prerequisites

1. **Supabase Account**: Sign up at [supabase.com](https://supabase.com) if you don't have one
2. **Supabase Project**: Create a new project or use an existing one
3. **Database Connection String**: Get your database URL from your project dashboard

## 🔑 Step 1: Get Your Supabase Database URL

1. Go to your Supabase project dashboard: [https://supabase.com/dashboard](https://supabase.com/dashboard)
2. Select your project
3. Navigate to **Settings** → **Database**
4. Under "Connection string", select **URI**
5. Copy the connection string (it looks like: `postgresql://postgres:[YOUR-PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres`)
6. Replace `[YOUR-PASSWORD]` with your actual database password

## 🔧 Step 2: Create Environment File

1. Create a `.env` file in the root directory (same level as `package.json`)

2. Add your Supabase database connection:

   ```env
   # Supabase Database URL (for backend database connection)
   SUPABASE_DATABASE_URL=postgresql://postgres:your-password@db.project-id.supabase.co:5432/postgres
   ```

3. **Important**: Replace with your actual database connection string!

## ✅ Step 3: Verify Configuration

1. Make sure your `.env` file is in the root directory (same level as `package.json`)
2. The `.env` file is already in `.gitignore`, so it won't be committed to git
3. The `SUPABASE_DATABASE_URL` is used only on the server-side (backend)

## 📱 Step 4: Build for iOS

### 4.1 Build the Web Application

First, build your web application with the environment variables:

```bash
npm run build
```

This will:
- Bundle your app with the Supabase keys from `.env`
- Create the `dist/public` directory with production-ready files
- Include environment variables in the build (they're baked into the JavaScript)

### 4.2 Sync with Capacitor

Sync your built app with the iOS platform:

```bash
npx cap sync ios
```

This copies your web build to the iOS app directory.

### 4.3 Open in Xcode

Open your project in Xcode:

```bash
npx cap open ios
```

## 🚀 Step 5: Deploy to iOS

Follow the instructions in `BUILD_IOS_APP.md` for detailed iOS deployment steps. Here's a quick summary:

### For Development (Testing on Your Device):

1. In Xcode:
   - Select your project → **App** target
   - Go to **Signing & Capabilities**
   - Enable **Automatically manage signing**
   - Select your **Team** (your Apple ID)

2. Connect your iPhone via USB
3. Select your device in Xcode's device dropdown
4. Click **Run** (▶️) or press `Cmd + R`

### For Distribution:

Follow the guide in `BUILD_IOS_DISTRIBUTION.md` for:
- Ad-Hoc distribution (for friends)
- TestFlight distribution (requires Apple Developer account)
- App Store distribution

## 🔒 Security Notes

- `SUPABASE_DATABASE_URL` - **NEVER expose this in client code!**
- This is only used in `server/` files and is not included in the client build
- The frontend doesn't connect to Supabase directly - only the backend does

## 🧪 Testing Your Configuration

After setting up your `.env` file, test that everything works:

1. **Start the development server:**
   ```bash
   npm run dev
   ```

2. **Test database connection** - The backend should connect to Supabase database automatically
3. **Check server logs** - There should be no database connection errors

## 🐛 Troubleshooting

### "Database credentials must be set"
- Make sure your `.env` file exists in the root directory
- Verify `SUPABASE_DATABASE_URL` is set correctly
- Check that the password in the connection string is correct
- Restart your dev server after creating/modifying `.env`

### Database connection fails
- Verify your Supabase database is running
- Check the connection string format
- Ensure your IP is allowed in Supabase (check Supabase dashboard → Settings → Database → Connection pooling)

### Build fails
- Make sure `SUPABASE_DATABASE_URL` is set in `.env`
- Check for typos in your `.env` file
- Try deleting `node_modules` and `dist` folders, then run `npm install` again

## 📝 Environment Variables Reference

| Variable | Description | Required | Client/Server |
|----------|-------------|----------|---------------|
| `SUPABASE_DATABASE_URL` | Database connection string | ✅ Yes | Server Only |

## 🔄 Updating Database URL

If you need to update your database connection:

1. Edit `.env` file with new `SUPABASE_DATABASE_URL`
2. Restart your development server (no rebuild needed for server-side changes)
3. For production builds: Rebuild: `npm run build`, then resync iOS: `npx cap sync ios`

## 📚 Additional Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Capacitor iOS Documentation](https://capacitorjs.com/docs/ios)
- [Environment Variables in Vite](https://vitejs.dev/guide/env-and-mode.html)

---

**Note**: Never commit your `.env` file to git! It contains sensitive keys. The `.env` file is already in `.gitignore`.
