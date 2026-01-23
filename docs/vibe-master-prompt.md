# VIBE Master Prompt: uMakhi CAPS Grade 12 Mathematics Content System

Below is a **copy-and-paste master prompt** you can send to your VIBE coding platform to build CAPS-aligned Grade 12 Mathematics content for **Paper 1 and Paper 2**, with a topic-first structure, notes (with visuals), quizzes (easy→medium→hard), scoring, feedback, and an admin video-link feature.

You can use it as-is. It is written so that an AI coding agent can implement the full content pipeline and the app structure without needing extra explanations.

---

## MASTER PROMPT FOR VIBE (uMakhi CAPS Maths Content System)

You are an expert South African CAPS curriculum content designer and a senior full-stack engineer. Build a CAPS-supported Grade 12 Mathematics content system for uMakhi that covers all topics required for **Mathematics Paper 1** and **Mathematics Paper 2**.

### 1) Curriculum Scope and Accuracy Requirements

* The content must be aligned to the **South African CAPS** curriculum for **Grade 12 Mathematics**.
* Topics must be grouped and displayed as:
  * **Paper 1 Topics**
  * **Paper 2 Topics**
* Include subtopics in each topic, and ensure the set is complete enough for a Grade 12 learner to revise the entire year (CAPS coverage).
* If any topic is uncertain, include it but label it “verify against CAPS doc” in the admin-only view. Learner view must not show uncertainty labels.

### 2) Learner Experience (UI Structure)

Create the learner navigation flow:

**Home → Grade 12 → Mathematics →**

* **Paper 1**
  * List of topics (cards)
* **Paper 2**
  * List of topics (cards)

When a learner opens a topic:

* Show **Topic Overview page** with tabs/sections:
  1. **Introduction**
  2. **Notes**
  3. **Worked Examples**
  4. **Quizzes**
  5. **Videos**
  6. **Progress/Score**

### 3) Notes and Visual Learning Requirements

For every topic/subtopic, generate:

* A short **Introduction** (plain English, simple, beginner-friendly)
* High-quality **Notes** with:
  * Clear definitions
  * Step-by-step methods
  * Key formulas
  * Common mistakes and exam tips
  * Summary section (bullet points)
* Include **visuals** inside the notes:
  * Use diagrams, graphs, tables, number lines, and simple illustrations where relevant
  * Visuals must be generated as:
    * Either **SVG** (preferred) or a simple **canvas-based diagram spec**, or
    * A structured “visual JSON” format the frontend can render (example below)
* Visuals must be directly tied to the concept being taught (not decorative).
* Ensure visuals are mobile-friendly and load quickly.

**Example visual JSON schema (you may improve it):**

```json
{
  "type": "graph",
  "title": "Parabola y = x^2",
  "xLabel": "x",
  "yLabel": "y",
  "data": [
    {"x": -2, "y": 4},
    {"x": -1, "y": 1},
    {"x": 0, "y": 0},
    {"x": 1, "y": 1},
    {"x": 2, "y": 4}
  ],
  "annotations": [{"x": 0, "y": 0, "label": "Vertex"}]
}
```

### 4) Worked Examples

For each topic:

* Provide at least:
  * **3 easy** worked examples
  * **3 medium** worked examples
  * **3 hard** worked examples
* Each worked example must include:
  * Question
  * Full step-by-step solution
  * Final answer
  * Short explanation of why the method works

### 5) Quizzes and Adaptive Difficulty

Each topic must include a quiz bank with:

* **Easy**, **Medium**, **Hard** levels
* At least **10 questions per level** per topic (30 total per topic)
* Each quiz question must include:
  * Question statement
  * Multiple choice OR short answer (mix both)
  * Correct answer
  * Step-by-step solution
  * Feedback message if incorrect
  * Tags: topic, subtopic, difficulty, skills tested

Quiz behaviour:

* Learner selects difficulty OR starts from easy and progresses.
* App tracks:
  * Score %
  * Time taken
  * Attempts
  * Weak areas (by tag)
* Provide feedback at the end:
  * Strengths
  * Weaknesses
  * Recommended revision section (deep link to notes)
  * Suggested next difficulty level

### 6) Rating and Progress Tracking

Implement a learner rating per topic:

* Use a 0–100 mastery score:
  * Easy questions contribute less than hard questions
  * Mastery increases on correct, decreases on repeated incorrect
* Track:
  * lastAttemptDate
  * bestScore
  * masteryScore
  * timeSpent
  * completedSections (intro/notes/examples/quizzes/videos)

### 7) Videos Section (Admin-Managed)

For each topic, include a **Videos** section:

* Admin can add videos by:
  * Pasting YouTube link or external link
  * Adding title, source, and short description
* Learners can:
  * View list of videos for the topic
  * Open video in embedded player if possible (YouTube embed)
  * Or open external links in a new tab

### 8) Data Model (Content + Users)

Design a database schema (Supabase) with tables:

**content structure**

* `subjects` (id, name)
* `grades` (id, grade_number)
* `papers` (id, subject_id, grade_id, paper_number, name)
* `topics` (id, paper_id, title, order_index, description)
* `subtopics` (id, topic_id, title, order_index)
* `notes` (id, topic_id, content_md, visuals_json)
* `worked_examples` (id, topic_id, difficulty, question_md, solution_md, final_answer)
* `quiz_questions` (id, topic_id, difficulty, question_type, question_md, options_json, correct_answer, solution_md, feedback_md, tags_json)
* `videos` (id, topic_id, title, url, source, description, created_by, created_at)

**user progress**

* `user_topic_progress` (id, user_id, topic_id, mastery_score, best_score, last_attempt_at, time_spent_seconds, completed_sections_json)
* `quiz_attempts` (id, user_id, topic_id, difficulty, score, total_questions, time_taken_seconds, answers_json, created_at)

Also:

* Add appropriate indexes and constraints.

### 9) Security and RLS Policies (Critical)

Implement Row Level Security:

* Content tables readable by all authenticated users (or public if required).
* Videos:
  * Learners can read
  * Only admin role can insert/update/delete
* Progress tables:
  * Users can read/write only their own rows (`auth.uid() = user_id`)

Create an `is_admin` role approach:

* Either a `profiles` table with `role` column, or JWT custom claim
* Ensure admin checks happen server-side.

### 10) Content Generation Pipeline

Because content is large, implement a content generation workflow:

* Seed Paper 1 and Paper 2 topic lists first
* Then generate notes/examples/quizzes per topic
* Use an “admin generation” screen to:
  * generate for one topic at a time
  * preview
  * approve/publish
  * re-generate a section if needed
* Store content in database in a structured, reusable format:
  * Markdown for notes/solutions
  * JSON for visuals/options/tags

### 11) Output Requirements

Deliver:

1. Complete list of Paper 1 topics and Paper 2 topics (CAPS Grade 12 Maths).
2. Database SQL (Supabase) to create tables + RLS policies.
3. Frontend pages:
   * Paper list page
   * Topic list page
   * Topic detail page with tabs
   * Quiz engine UI (easy/medium/hard)
   * Admin video management UI
   * Admin content generation UI
4. Basic styling: clean, mobile-first, easy to read.
5. Ensure build works on Vercel.

### 12) Quality Standards (Non-Negotiable)

* Content must be written in **simple English** suitable for township/rural learners.
* Explanations must be step-by-step and avoid skipping steps.
* Visuals must support comprehension.
* Quizzes must include correct solutions and feedback.
* No copyrighted textbook content verbatim; write original explanations.

---

## OPTIONAL: “Topic List” requirement (if the platform needs it explicitly)

If your VIBE platform needs you to explicitly request the CAPS topic list, add this line:

**“Start by generating a complete CAPS-aligned topic list for Grade 12 Mathematics Paper 1 and Paper 2, then build content under each topic.”**

---

## Recommended Add-on (makes your MVP much easier)

If you want this to work smoothly and not overload the AI platform, add this operational rule:

**“Do NOT generate all notes/quizzes at once. Generate per topic when an admin clicks ‘Generate’. Save to database. Allow incremental rollout.”**

---
