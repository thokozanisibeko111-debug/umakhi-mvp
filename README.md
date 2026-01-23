# uMakhi MVP

This repository contains a very simple **Minimum Viable Product (MVP)** for the uMakhi project.  The goal of this codebase is to provide a working foundation that you can deploy to Supabase and Vercel and iterate upon.  It is intentionally minimal so that you can focus on your own features and content without having to write all of the boilerplate from scratch.

## Features

### Learner experience

- **Authentication** using Supabase.  Users can sign up and log in using email and password.
- **Topic list**.  Once logged in, learners see a list of topics stored in the `topics` table of your Supabase database.  Each topic links to a detail page.
- **Topic detail page**.  This page fetches the topic from Supabase and lists any videos attached to it.  It also includes a form where learners can ask a question (handled via an API route) and a link to a simple quiz for the topic.
- **Quiz page**.  Displays multiple choice questions pulled from the `questions` table via `quizzes`.

### Admin experience

- A very rudimentary admin page at `/admin` allows you to create new topics and view existing ones.  You can extend this page to upload videos to Supabase storage and author quizzes.  Access control is not enforced in this scaffold; you should implement your own role-based checks using row‑level security (RLS) policies and the `profiles` table.

### API routes

- `app/api/ask/route.ts` accepts a JSON payload with a `prompt` and optional `language` property.  It uses OpenAI to generate a response.  You can adapt this to integrate more advanced logic (e.g. translation between English and isiZulu) by changing the prompt or using a different model.  Be sure to set `OPENAI_API_KEY` and `OPENAI_MODEL` in your `.env.local`.

## Setup instructions

1. **Create a Supabase project.**  Go to https://supabase.com/ and create a new project.  Copy your project URL and anon key into `.env.local` (see `.env.local.example` for guidance).

2. **Run the schema.**  In the Supabase dashboard, open the SQL editor and run the contents of `supabase/schema.sql`.  This creates the tables used by the MVP.

3. **Seed Grade 12 content (recommended).** Once your Supabase credentials are configured, open the `/admin` page and click **Seed Grade 12 Content** to populate Paper 1 and Paper 2 topics with starter notes, visuals, videos, and quizzes.

4. **Set up storage.**  In the Supabase dashboard, create a storage bucket called `videos`.  For a quick MVP you can set it to `public`, but you should enforce RLS on buckets in production.

5. **Install dependencies and run the dev server.**  In your terminal, run:

   ```bash
   npm install
   npm run dev
   ```

   The application should now be running at http://localhost:3000.

6. **Deploy.**  Once you have verified that the app works locally, you can push it to GitHub and deploy to Vercel.  Vercel will detect that this is a Next.js application and build it automatically.  Make sure to set your environment variables on Vercel (SUPABASE URL, SUPABASE anon key, OPENAI keys, etc.).

## Extending this scaffold

This codebase is designed to be a starting point.  You can extend it in the following ways:

- **Role‑based access control (RLS)** – create a `profiles` table and use Supabase policies to restrict access to admin routes.
- **Video management** – add pages to upload videos into your `videos` storage bucket, and render them on topic pages using a video player component.
- **Assessments** – build a more sophisticated quiz engine with scoring, progress tracking and analytics.
- **Localization** – integrate translation logic into the `ask` API route so that learners can receive answers in isiZulu or English.

Feel free to modify, extend or replace any part of this scaffold to meet the needs of your project.

## Content system prompt

If you need a ready-to-use master prompt for generating CAPS-aligned Grade 12 Mathematics content, see `docs/vibe-master-prompt.md`.
