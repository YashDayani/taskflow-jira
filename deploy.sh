#!/bin/bash

echo "🚀 TaskFlow Deployment Script"
echo "================================"
echo ""

# Check if .env file exists
if [ ! -f .env ]; then
    echo "⚠️  .env file not found!"
    echo ""
    echo "Please create a .env file with your Supabase credentials:"
    echo ""
    echo "VITE_SUPABASE_URL=your-project-url"
    echo "VITE_SUPABASE_ANON_KEY=your-anon-key"
    echo ""
    echo "Steps to get these:"
    echo "1. Go to https://supabase.com and create a new project"
    echo "2. Go to Settings > API"
    echo "3. Copy Project URL and anon/public key"
    echo ""
    read -p "Press Enter when you've created the .env file..."
fi

# Source environment variables
if [ -f .env ]; then
    export $(cat .env | grep -v '^#' | xargs)
    echo "✓ Environment variables loaded"
else
    echo "❌ .env file still not found. Exiting."
    exit 1
fi

# Check required variables
if [ -z "$VITE_SUPABASE_URL" ] || [ -z "$VITE_SUPABASE_ANON_KEY" ]; then
    echo "❌ Missing required environment variables in .env"
    exit 1
fi

echo ""
echo "📦 Deploying to Vercel..."
echo ""

# Deploy to Vercel
vercel --yes

echo ""
echo "🔧 Setting environment variables in Vercel..."
echo ""

# Set environment variables in Vercel
echo "$VITE_SUPABASE_URL" | vercel env add VITE_SUPABASE_URL production
echo "$VITE_SUPABASE_ANON_KEY" | vercel env add VITE_SUPABASE_ANON_KEY production

echo ""
echo "🚀 Deploying to production..."
echo ""

# Deploy to production
vercel --prod --yes

echo ""
echo "✅ Deployment complete!"
echo ""
echo "📝 Next steps:"
echo "1. Copy the production URL from above"
echo "2. Go to your Supabase dashboard"
echo "3. Run the SQL from supabase-schema.sql in the SQL Editor"
echo "4. (Optional) Run: npx tsx scripts/seed-user.ts to create test user"
echo ""
echo "🎉 Your app is live!"
