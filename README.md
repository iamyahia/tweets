# 🐦 Tweets

A small full-stack messaging playground built with **React Router v7 / Remix v3**, featuring user-to-user letter sending, emoji support, themeable message design, authentication, and route protection.

> ⚡ Built with learning in mind – especially around Remix v3 & full-stack React Router 7 architecture.

---

## ✨ Project Idea

Imagine a social messaging system with 10 users logged in. Each user can:

- Click on another user’s profile
- Send a custom message (text + emoji)
- Choose background and text color for each message

Think of it as a lightweight "letter" app with creative freedom ✍️

---

## 🎯 Project Goals

This repo isn't just a project – it's a learning journey to master modern full-stack web dev with Remix v3/React Router 7.

Here’s what I aimed to learn and showcase:

1. **Authentication & Session Handling**

   - Login/logout flow using cookie-based session storage
   - Handling authenticated & protected routes
   - Storing user sessions securely in full-stack React Router

2. **Prisma ORM Integration**

   - Modeling relationships and interacting with a real database

3. **Route Protection & User Permissions**

   - Ensuring users can only access allowed data
   - Using loaders/actions smartly with Remix/React Router’s architecture

4. **Improving My Full-Stack Game**
   - Building everything from routing to data flow to styling in one repo
   - Going deeper into advanced React Router v7 features

---

## 🧱 Tech Stack

- **Front-end**: React + React Router v7 (full stack mode)
- **Back-end**: Full-stack logic powered by RR7 architecture
- **Database**: PostgreSQL + Prisma ORM
- **Authentication**: Custom logic using sessions + cookies
- **Styling**: Tailwind CSS (with themeable messages)
- **Dev Tools**: TypeScript, ESLint, Prettier, Vite

---


## 🚀 Getting Started

```bash
git clone https://github.com/iamyahia/tweets.git
cd tweets
yarn install
yarn dev
```

Make sure you have a `.env` file at the root directory with your database credentials and session secret.

```
DATABASE_URL="your-postgres-url"
SESSION_SECRET="a-random-secret-string"
```

Then run:

```bash
npx prisma migrate dev --name init
```

---

## 🛡️ Authentication Overview

This project uses:

- Cookie-based sessions.
- Auth route loaders to protect pages.
- User redirection if not logged in.
- Backend checks on mutations to prevent abuse

## 🧠 Why This Repo Might Help You

- You're learning Remix v3 or React Router v7 in full-stack mode
- You want to integrate Prisma with authentication
- You’re curious about cookie sessions and protected routing
- You like building small yet functional apps to grow your stack skills

## 🤝 Contributions

This is a personal learning project – but if you find it helpful or have feedback, feel free to open issues or PRs!

---

> Made with 🔥 by Yahia — just a dev who’s hungry to kill the projects.
