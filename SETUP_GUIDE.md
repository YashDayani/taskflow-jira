# TaskFlow Setup Guide

This guide will help you set up and deploy the TaskFlow project management application.

## 🚀 Quick Start (Local Development)

### 1. Prerequisites
- Node.js v18+ installed
- A Supabase account ([supabase.com](https://supabase.com))

### 2. Create Supabase Project

1. Go to [supabase.com](https://supabase.com) and create a new project
2. Wait for the project to be provisioned
3. Go to **Project Settings** > **API**
4. Copy your **Project URL** and **anon/public key**

### 3. Set Up Database

1. Go to **SQL Editor** in your Supabase dashboard
2. Copy the entire contents of `supabase-schema.sql`
3. Paste and run it in the SQL Editor
4. Verify tables are created in **Table Editor**

### 4. Configure Environment

Create a `.env` file in the project root:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

### 5. Install & Run

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

### 6. Create Test User (Optional)

To bypass email verification for testing:

1. Get your **Service Role Key** from Supabase (Settings > API)
2. Add to `.env`:
   ```env
   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
   ```
3. Run seed script:
   ```bash
   npx tsx scripts/seed-user.ts
   ```

Test credentials:
- Email: `yashdayani0@gmail.com`
- Password: `password123`

## 📦 Production Deployment

### Option 1: Vercel (Recommended)

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Set Environment Variables** (if tokens available)
   ```bash
   # Login with token
   vercel --token "$VERCEL_TOKEN"

   # Add environment variables
   vercel env add VITE_SUPABASE_URL production --token "$VERCEL_TOKEN"
   vercel env add VITE_SUPABASE_ANON_KEY production --token "$VERCEL_TOKEN"
   ```

3. **Deploy**
   ```bash
   vercel --prod --token "$VERCEL_TOKEN" --yes
   ```

### Option 2: Manual Deployment

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Deploy the `dist` folder** to any static hosting:
   - Netlify: Drag and drop `dist` folder
   - Cloudflare Pages: Connect Git repo
   - AWS S3: Upload `dist` contents

3. **Set environment variables** in your hosting platform:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`

## 🔐 GitHub Setup (Optional)

If you have `GH_TOKEN`:

```bash
echo "$GH_TOKEN" | gh auth login --with-token
gh repo create taskflow --public --source=. --remote=origin
git push -u origin main
```

## 🎯 Features Checklist

After deployment, verify these features work:

- [ ] User signup/login
- [ ] Create a new project
- [ ] View project board
- [ ] Create tasks (To Do, In Progress, Done, Blocked)
- [ ] Edit task details (title, description, priority, type)
- [ ] Assign tasks to users
- [ ] Add comments to tasks
- [ ] Delete tasks

## 🐛 Troubleshooting

### "Failed to sign up" error
- Check email confirmation is disabled in Supabase (or use seed script)
- Verify database schema is applied correctly

### Tasks not showing
- Check RLS policies are created in Supabase
- Verify user is added as project member

### Build fails
- Clear `node_modules` and reinstall: `rm -rf node_modules package-lock.json && npm install`
- Check Node.js version: `node --version` (should be v18+)

### Environment variables not working
- Restart dev server after changing `.env`
- Verify variable names start with `VITE_`
- Check for typos in variable names

## 📚 Architecture

```
Frontend (React + TypeScript)
    ↓
Supabase Client (supabase-js)
    ↓
Supabase Backend
    ├── Authentication
    ├── PostgreSQL Database
    ├── Row Level Security
    └── Real-time Subscriptions
```

## 🔒 Security Notes

- **RLS Policies**: All tables have Row Level Security enabled
- **Authentication**: Handled by Supabase Auth
- **API Keys**: Only public `anon` key is exposed in frontend
- **Service Role Key**: Keep secret, never commit to Git

## 📝 Database Tables

- `profiles` - User profiles
- `projects` - Project information
- `project_members` - Team membership
- `tasks` - Task details
- `comments` - Task comments
- `sprints` - Sprint planning (for future use)

## 🎨 Customization

### Change App Name
Edit these files:
- `src/pages/Login.tsx` - Line 30
- `src/pages/SignUp.tsx` - Line 30
- `src/components/Layout.tsx` - Line 27

### Change Colors
Edit `tailwind.config.js` theme colors

### Add Features
- Refer to Supabase docs: [supabase.com/docs](https://supabase.com/docs)
- React Router docs: [reactrouter.com](https://reactrouter.com)

## 📞 Support

For issues:
1. Check this guide first
2. Review error messages in browser console
3. Check Supabase logs
4. Open GitHub issue

## 🎉 Success!

If you can create projects, tasks, and comments - you're all set!

Happy project managing! 🚀
