# Gamified RPG Life Tracker

A Next.js app that gamifies your life goals using RPG mechanics. Track daily, main, and side quests, manage character stats, and use Pomodoro focus sessions to defeat enemies.

**Data Source:** Notion databases (auto-synced in real-time)

## Features

✅ **Character System** - Choose from free/paid characters with expandable stats  
✅ **Quest Hierarchy** - Daily, Main, and Side quests with XP rewards  
✅ **Pomodoro Timer** - 25-minute focus sessions with enemy defeat mechanic  
✅ **Notion Integration** - All data pulled live from Notion  
✅ **Dark Mode UI** - RPG-themed dashboard with Tailwind CSS  

## Setup

### Prerequisites

- Node.js 18+
- Notion account with the databases set up

### Environment Variables

Create `.env.local`:

```
NEXT_PUBLIC_NOTION_TOKEN=your_token_here
NEXT_PUBLIC_CHARACTERS_DB=db_id
NEXT_PUBLIC_DAILY_QUESTS_DB=db_id
NEXT_PUBLIC_MAIN_QUESTS_DB=db_id
NEXT_PUBLIC_SIDE_QUESTS_DB=db_id
```

### Local Development

```bash
npm install
npm run dev
```

Visit `http://localhost:3000`

### Deploy to Vercel

```bash
vercel
```

Or connect GitHub repo and Vercel auto-deploys on push.

## Architecture

- **Frontend:** Next.js 15 + React + Tailwind CSS
- **API:** Notion SDK (client-side queries)
- **Data:** Notion databases
- **Hosting:** Vercel

## Updating

All changes go through:
1. Edit code locally
2. Push to GitHub
3. Vercel auto-deploys

## License

MIT
