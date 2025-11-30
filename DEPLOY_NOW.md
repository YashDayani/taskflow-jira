# 🚀 Deploy TaskFlow in 5 Minutes

## ✅ Already Done
- ✓ GitHub repository created: https://github.com/YashDayani/taskflow-jira
- ✓ Code pushed to GitHub
- ✓ Vercel CLI authenticated

## 📋 Quick Deployment Steps

### Step 1: Set Up Supabase (2 minutes)

1. Go to **https://supabase.com** and sign in
2. Click **"New Project"**
3. Fill in:
   - Project name: `taskflow` (or any name)
   - Database password: (create a strong password)
   - Region: Choose closest to you
4. Click **"Create new project"** and wait ~2 minutes

### Step 2: Configure Database (1 minute)

1. In your Supabase dashboard, go to **SQL Editor**
2. Click **"New query"**
3. Copy ALL contents from `supabase-schema.sql` and paste
4. Click **"Run"** - you should see "Success. No rows returned"

### Step 3: Get API Keys (30 seconds)

1. In Supabase, go to **Settings** > **API**
2. Copy these two values:
   - **Project URL** (looks like: `https://xxxxx.supabase.co`)
   - **anon/public key** (long string under "Project API keys")

### Step 4: Create .env File (30 seconds)

Create a file named `.env` in the `jira-clone` folder:

```env
VITE_SUPABASE_URL=paste-your-project-url-here
VITE_SUPABASE_ANON_KEY=paste-your-anon-key-here
```

### Step 5: Deploy to Vercel (1 minute)

Run this command in the terminal:

```bash
cd "/Users/yash/Desktop/untitled folder/jira-clone"
./deploy.sh
```

Or deploy manually:

```bash
# Deploy to Vercel
vercel

# Set environment variables (paste when prompted)
vercel env add VITE_SUPABASE_URL production
vercel env add VITE_SUPABASE_ANON_KEY production

# Deploy to production
vercel --prod
```

### Step 6: Create Test User (Optional - 30 seconds)

To create a test user that can login immediately:

1. Get your **Service Role Key** from Supabase (Settings > API > service_role)
2. Add to `.env`:
   ```env
   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
   ```
3. Run:
   ```bash
   npx tsx scripts/seed-user.ts
   ```

Test login:
- Email: `yashdayani0@gmail.com`
- Password: `password123`

## 🎉 Done!

Your app is now live! The Vercel deployment will give you a URL like:
`https://taskflow-jira.vercel.app`

## 🧪 Test Your Deployment

1. Open your Vercel URL
2. Click "Sign up"
3. Create an account
4. Create a project
5. Add some tasks
6. Invite team members

## 🐛 Troubleshooting

**"Failed to sign up"**
- Make sure you ran the database schema in Supabase SQL Editor
- Or use the seed script to create a test user

**"Tasks not loading"**
- Check that environment variables are set in Vercel
- Redeploy: `vercel --prod`

**"Build failed"**
- Check that `.env` file has correct format
- No spaces around `=` in environment variables

## 📊 What You've Built

- ✅ Full authentication system
- ✅ Project management
- ✅ Kanban board (To Do, In Progress, Done, Blocked)
- ✅ Task creation/editing/deletion
- ✅ Comments and collaboration
- ✅ Team member management
- ✅ Responsive design
- ✅ Deployed to production!

---

**Need help?** Check `SETUP_GUIDE.md` for detailed instructions.
