# 7to14

![Next.js](https://img.shields.io/badge/Next.js-black?style=for-the-badge&logo=next.js&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-181818?style=for-the-badge&logo=supabase&logoColor=3ECF8E)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white)

This project is a private, couple-focused website created to preserve shared memories and mark time together in a calm, aesthetic, and meaningful way. Unlike public social platforms, this website is designed only for personal use, emphasizing privacy, simplicity, and long-term usability.

The website functions as a digital memory space securely accessible via a secret code. Built primarily for mobile devices but responsive across all screens, it offers a minimal experience free from unnecessary distractions.

## Purpose

The goal of this project is to provide a personal and private space where a couple can:
- **Visually track** their time together.
- **Store and revisit** shared memories.
- **Maintain a structured, organized gallery** that grows over time.

## Gallery

| Home Page | Memories Gallery | Kichku's Den |
|:---:|:---:|:---:|
| ![Home Page](./public/screenshots/home-placeholder.png) | ![Gallery](./public/screenshots/gallery-placeholder.png) | ![Kichku](./public/screenshots/kichku-placeholder.png) |

> *Note: Place your screenshots in `public/screenshots` folder.*

## Website Structure

### Project Tree
```
src/
├── app/
│   ├── kichku/       # Pushkar's Personal Page
│   ├── memories/     # Shared Gallery
│   ├── tanu/         # Tanu's Personal Page
│   ├── layout.tsx    # Root Layout
│   └── page.tsx      # Home / Landing Page
├── components/
│   ├── ui/           # Reusable UI components
│   ├── Aurora.tsx    # Aesthetic Backgrounds
│   ├── MagicBento.tsx# Bento Grid Components
│   └── ...
└── lib/
    └── supabase.ts   # Database Configuration
```

### Home Page (Landing Page)
The emotional entry point of the website, designed to feel calm and welcoming.
- **Path**: `src/app/page.tsx`
- **Key Elements**:
    - A simple personal logo.
    - Live relationship counter (years, months, days, hours, minutes, seconds).
    - Reference text: "Since 7 Jan 2020".
    - Aesthetic visual elements (Aurora backgrounds).
    - Primary action button to navigate to the gallery.

### Ours Page (Shared Gallery)
The main gallery of shared memories, designed for a distraction-free viewing experience.
- **Path**: `src/app/memories/page.tsx`
- **Key Features**:
    - Single couple gallery with infinite scrolling.
    - Photos grouped by month and year.
    - Support for large image collections (>50 images).
    - **Admin Mode**: Upload and delete functionality is restricted to admin access via a secret code.

### Personal Pages
Dedicated sections for individual expression within the shared space.
- **Kichku's Page**: `src/app/kichku/page.tsx`
    - Features a "Magic Bento" layout showcasing favorites (food, music, movies) and a personal age counter.
- **Tanu's Page**: `src/app/tanu/page.tsx`
    - Reserved for future scope, following the same aesthetic principles.

## Features & Privacy

- **Privacy First**: No user accounts or emails. Access is protected by a secret code stored locally on the device.
- **Image Management**: 
    - Admin-only uploads with manual month/year selection for organized timelines.
    - Uses Supabase Storage for secure image hosting.
- **Aesthetic Design**: 
    - Technologies like **Framer Motion** and **Aurora backgrounds** create a "soft, calm, cute" vibe.
    - Responsive design optimized for mobile but functional on desktop.

## Technology Stack

- **Frontend**: [Next.js](https://nextjs.org/) (React)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Backend/Database**: [Supabase](https://supabase.com/) (PostgreSQL & Storage)

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Environment Variables

This project requires a `.env` file with Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```
