# TaskFlow - Jira-like Project Management System

A modern, full-stack project management application built with React, TypeScript, Supabase, and TailwindCSS.

## Features

- **Authentication**: Secure user authentication with Supabase
- **Project Management**: Create and manage multiple projects
- **Kanban Board**: Visual task management with drag-and-drop (To Do, In Progress, Done, Blocked)
- **Task Management**:
  - Create, edit, and delete tasks
  - Task types: Task, Bug, Story, Epic
  - Priority levels: Low, Medium, High, Urgent
  - Assign tasks to team members
- **Collaboration**:
  - Add comments to tasks
  - Project members management
  - Activity tracking
- **Real-time Updates**: Powered by Supabase real-time subscriptions

## Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: TailwindCSS
- **State Management**: Zustand
- **Routing**: React Router v6
- **Backend**: Supabase (PostgreSQL, Authentication, Row Level Security)
- **Icons**: Lucide React
- **Data Fetching**: TanStack Query (React Query)

## Prerequisites

Before you begin, ensure you have:

- Node.js (v18 or higher)
- npm or yarn
- A Supabase account and project

## Setup Instructions

### 1. Clone the Repository

```bash
git clone <repository-url>
cd jira-clone
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Supabase

1. Create a new Supabase project at [supabase.com](https://supabase.com)
2. Run the database schema from `supabase-schema.sql` in your Supabase SQL editor
3. Copy your project URL and anon key from the Supabase dashboard

### 4. Configure Environment Variables

Create a `.env` file in the root directory:

```env
VITE_SUPABASE_URL=your-project-url
VITE_SUPABASE_ANON_KEY=your-anon-key
```

For seeding test data, you'll also need:

```env
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

### 5. Seed Test User (Optional)

To create a test user that bypasses email verification:

```bash
npx tsx scripts/seed-user.ts
```

This creates a user with:
- Email: yashdayani0@gmail.com
- Password: password123

### 6. Run the Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Building for Production

```bash
npm run build
```

The build output will be in the `dist` directory.

## Project Structure

```
jira-clone/
├── src/
│   ├── components/       # Reusable UI components
│   │   ├── Layout.tsx    # Main layout wrapper
│   │   └── TaskModal.tsx # Task create/edit modal
│   ├── pages/            # Page components
│   │   ├── Login.tsx
│   │   ├── SignUp.tsx
│   │   ├── Projects.tsx
│   │   └── ProjectBoard.tsx
│   ├── stores/           # Zustand stores
│   │   └── auth.ts
│   ├── lib/              # Utilities and configurations
│   │   ├── supabase.ts   # Supabase client
│   │   └── utils.ts      # Helper functions
│   ├── App.tsx           # Main app component with routing
│   └── main.tsx          # Entry point
├── scripts/              # Utility scripts
│   └── seed-user.ts      # Seed test user
├── supabase-schema.sql   # Database schema
└── README.md
```

## Database Schema

The application uses the following main tables:

- **profiles**: User profiles (extends auth.users)
- **projects**: Project information
- **tasks**: Individual tasks with status, priority, type
- **sprints**: Sprint management
- **comments**: Task comments
- **project_members**: Project team members with roles

Row Level Security (RLS) policies ensure users can only access data they're authorized to see.

## Deployment

### Vercel (Recommended)

1. Install Vercel CLI: `npm i -g vercel`
2. Set environment variables in Vercel dashboard
3. Deploy: `vercel --prod`

### Other Platforms

The built application (`npm run build`) can be deployed to any static hosting service:
- Netlify
- Cloudflare Pages
- AWS S3 + CloudFront
- GitHub Pages

Make sure to set the environment variables in your hosting platform.

## Environment Variables for Deployment

Required environment variables for production:

```
VITE_SUPABASE_URL=your-project-url
VITE_SUPABASE_ANON_KEY=your-anon-key
```

## Test Credentials

If you ran the seed script:

- Email: yashdayani0@gmail.com
- Password: password123

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License

## Support

For issues and questions, please open an issue on GitHub.
