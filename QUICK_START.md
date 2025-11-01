# Quick Start: Supabase Database & iOS Deployment

## 🚀 Quick Setup (2 minutes)

### 1. Create `.env` file

Create a `.env` file in the root directory with your Supabase database connection:

```env
SUPABASE_DATABASE_URL=postgresql://postgres:password@db.project-id.supabase.co:5432/postgres
```

**Where to find this:**
- Go to [supabase.com/dashboard](https://supabase.com/dashboard)
- Select your project → **Settings** → **Database**
- Copy the **Connection string** (URI format)
- Replace `[YOUR-PASSWORD]` with your actual database password

### 2. Build for iOS

```bash
# Install dependencies (if not done)
npm install

# Build the web app with your Supabase keys
npm run build

# Sync with iOS
npx cap sync ios

# Open in Xcode
npx cap open ios
```

### 3. Deploy in Xcode

1. In Xcode: **Signing & Capabilities** → Enable signing with your Apple ID
2. Connect your iPhone
3. Click **Run** (▶️)

That's it! Your app is ready for iOS.

---

📖 **Need more details?** See [SUPABASE_SETUP.md](./SUPABASE_SETUP.md) for complete guide.
