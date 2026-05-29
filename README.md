# 🚀 LearnX Student Dashboard

A modern and futuristic Student Learning Dashboard built using **Next.js 15**, **TypeScript**, **Tailwind CSS**, **Framer Motion**, and **Supabase**. The application features a Bento Grid layout, dynamic course management, animated progress tracking, and a premium dark-themed user interface.

---

## 📌 Project Overview

LearnX is designed as a modern educational dashboard that provides students with an engaging learning experience. The dashboard displays active courses, learning progress, activity metrics, and navigation tools through a clean and responsive interface.

This project was developed as part of a Frontend Development Challenge focusing on:

- Modern UI/UX Design
- Server-side Data Fetching
- Database Integration
- Framer Motion Animations
- Responsive Design
- Clean Architecture

---

## ✨ Features

### 🎨 Premium Dashboard UI
- Modern dark theme
- Bento Grid layout
- Glassmorphism-inspired design
- Gradient accents
- Fully responsive design

### 📚 Course Management
- Dynamic course fetching from Supabase
- Course progress tracking
- Dynamic Lucide icons
- Animated progress bars

### ⚡ Performance Optimized
- Built with Next.js App Router
- Server-side rendering
- Optimized data fetching
- Minimal client-side state

### 🎭 Smooth Animations
- Framer Motion integration
- Staggered card loading
- Hover interactions
- Animated progress indicators
- Spring-based transitions

### 📱 Responsive Design
- Desktop Layout
- Tablet Layout
- Mobile Layout

---

# 🛠️ Tech Stack

| Technology | Purpose |
|------------|----------|
| Next.js 15 | React Framework |
| TypeScript | Type Safety |
| Tailwind CSS | Styling |
| Framer Motion | Animations |
| Supabase | PostgreSQL Database |
| Lucide React | Icons |
| PNPM | Package Manager |

---

# 📂 Folder Structure

```bash
student_dashboard
│
├── public
│
├── src
│   │
│   ├── app
│   │   │
│   │   ├── (dashboard)
│   │   │   │
│   │   │   ├── dashboard
│   │   │   │   └── page.tsx
│   │   │   │
│   │   │   ├── courses
│   │   │   │   └── page.tsx
│   │   │   │
│   │   │   ├── profile
│   │   │   │   └── page.tsx
│   │   │   │
│   │   │   ├── settings
│   │   │   │   └── page.tsx
│   │   │   │
│   │   │   └── layout.tsx
│   │   │
│   │   ├── api
│   │   │   └── courses
│   │   │       └── route.ts
│   │   │
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   │
│   ├── components
│   │   ├── Sidebar.tsx
│   │
│   ├── lib
│   │   ├── supabase.ts
│   │   └── supabase-server.ts
│   │
│   └── types
│       └── course.ts
│
├── .env.local
├── package.json
└── README.md
```

---

# 🗄️ Database Schema

## Table: courses

| Column | Type |
|----------|----------|
| id | UUID |
| title | TEXT |
| progress | INTEGER |
| icon_name | TEXT |
| created_at | TIMESTAMP |

---

## SQL Table Creation

```sql
create table courses (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  progress integer not null,
  icon_name text not null,
  created_at timestamp default now()
);
```

---

## Sample Data

```sql
insert into courses (title, progress, icon_name)
values
('TypeScript Essentials', 70, 'FileCode'),
('Node.js Backend Development', 55, 'Server'),
('MongoDB Fundamentals', 40, 'Database'),
('Cyber Security Basics', 85, 'Shield'),
('Docker & Containerization', 30, 'Cloud'),
('Git & GitHub Mastery', 95, 'GitBranch');
```

---

# 🔌 Supabase Setup

### 1. Create a Supabase Project

Visit:

https://supabase.com

Create a new project.

---

### 2. Create Database Table

Open SQL Editor and run the SQL schema provided above.

---

### 3. Insert Sample Data

Run the sample insert query.

---

### 4. Get Project Credentials

Navigate to:

```txt
Project Settings
→ Data API
```

Copy:

- Project URL
- Anon Key

---

### 5. Create Environment Variables

Create:

```txt
.env.local
```

Add:

```env
NEXT_PUBLIC_SUPABASE_URL=your_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_project_anon_key
```

---

# ⚙️ Installation

## Clone Repository

```bash
git clone https://github.com/Karthik1409-R/student_dashboard.git
```

```bash
cd student_dashboard
```

---

## Install Dependencies

```bash
pnpm install
```

---

## Run Development Server

```bash
pnpm dev
```

Visit:

```txt
http://localhost:3000
```

---

# 📦 Required Packages

Install required packages:

```bash
pnpm add framer-motion
pnpm add lucide-react
pnpm add @supabase/supabase-js
pnpm add @supabase/ssr
```

---

# 📡 API Route

## GET /api/courses

Fetches all course data from Supabase.

Example Response:

```json
{
  "data": [
    {
      "id": "123",
      "title": "TypeScript Essentials",
      "progress": 70,
      "icon_name": "FileCode"
    }
  ],
  "error": null
}
```

---

# 🎭 Animation Features

## Staggered Loading

Dashboard cards appear sequentially using Framer Motion.

---

## Hover Interactions

Cards:
- Scale slightly
- Glow effect
- Smooth spring transitions

---

## Animated Progress Bars

Progress bars animate from:

```txt
0% → Actual Progress
```

---

# 📱 Responsive Design

## Desktop (>1024px)

- Full Sidebar
- Bento Grid Layout

---

## Tablet (768px - 1024px)

- Compact Sidebar
- Two-column Grid

---

## Mobile (<768px)

- Mobile Navigation
- Single-column Layout

---

# 🏗️ Architecture

## Why Next.js?

- App Router support
- Server Components
- Better performance
- Improved SEO

## Why Supabase?

- PostgreSQL database
- Easy integration
- Free tier
- Scalable backend

## Why Framer Motion?

- Smooth animations
- Spring physics
- Layout transitions

---

# ⚡ Performance Optimizations

- Component modularity
- Optimized rendering
- Dynamic imports
- Lightweight animations
- Minimal client-side state

---

# 🔒 Environment Variables

Never commit:

```txt
.env.local
```

Instead include:

```txt
.env.example
```

Example:

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

---

# 🚀 Deployment

## Deploy to Vercel

Build project:

```bash
pnpm build
```

Push code to GitHub.

Import repository into Vercel.

Add environment variables.

Deploy.

---

# 🔮 Future Enhancements

- Authentication System
- Real Learning Streak Tracking
- User Profiles
- Notifications
- Course Categories
- Search & Filtering
- Analytics Dashboard
- Dark/Light Theme Toggle

---

# 👨‍💻 Author

### Karthik R

B.E. Computer Science and Engineering (Cyber Security)

SA Engineering College, Chennai

### Skills

- HTML
- CSS
- JavaScript
- TypeScript
- React.js
- Next.js
- Tailwind CSS
- Java
- SQL
- Supabase

---

# 📄 License

This project is developed for educational and portfolio purposes as part of a Frontend Development Internship Challenge.

---

⭐ If you like this project, consider giving it a star on GitHub.