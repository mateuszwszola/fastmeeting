# Fastmeeting

Easily create online meetings with video and text chat.

## Features

- Voice & Video
- Live chat
- No login required to join a meeting

## Tech Stack

- Frontend:
  - [Next.js](https://nextjs.org) the React Framework for Production
  - [Supabase.js](https://supabase.io/docs/library/getting-started) for user management and data
  - [Twilio](https://www.twilio.com) communication APIs for Voice, Video
- Backend:
  - [app.supabase.io](https://app.supabase.io/) hosted Postgres database with restful API for usage with Supabase.js

## Getting Started

Simply clone this repo locally and proceed to the next section.

### Required configuration

Copy the `.env.local.example` file into a file named `.env.local` in the root directory of the example:

```bash
cp .env.local.example .env.local
```

Set your Supabase details:

```bash
NEXT_PUBLIC_SUPABASE_URL=<replace-with-your-API-url>
NEXT_PUBLIC_SUPABASE_KEY=<replace-with-your-anon-key>
```

Change authentication settings if necessary

### Run the development server

Now install the dependencies and start the development server.

```bash
npm install
npm run dev
# or
yarn
yarn dev
```

Visit http://localhost:3000 and start meeting! 🥳
