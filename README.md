<div align="center">

# 🔗 Linkbase

**The modern, high-performance link-in-bio platform for creators and professionals.**

[![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3-38bdf8?logo=tailwindcss)](https://tailwindcss.com/)
[![tRPC](https://img.shields.io/badge/tRPC-11-398CCB?logo=trpc)](https://trpc.io/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

[Demo](https://linkbase.com) · [Report a Bug](https://github.com/your-username/linkbase/issues) · [Request a Feature](https://github.com/your-username/linkbase/issues)

</div>

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Database Setup](#database-setup)
- [Available Scripts](#available-scripts)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

---

## 📖 Overview

Linkbase is a full-stack, production-ready link-in-bio platform built with the [T3 Stack](https://create.t3.gg/). It lets anyone — creators, developers, and businesses — consolidate all their important links into a single, beautiful, shareable page at `linkbase.com/yourname`.

---

## ✨ Features

- 🔗 **Personalized URL** — Claim your unique handle at `linkbase.com/yourname`.
- 🖊️ **Dynamic Link Management** — Add, edit, reorder links with drag-and-drop from a real-time dashboard.
- 📊 **Analytics Dashboard** — Monitor profile views and per-link click metrics.
- 🎨 **Custom Themes** — Choose from multiple visual themes to reflect your brand.
- 🌐 **Social Media Integration** — One-click support for Instagram, Twitter, LinkedIn, and more.
- 📱 **Fully Responsive** — Pixel-perfect on mobile, tablet, and desktop.
- 🔒 **Secure Authentication** — Email/password and OAuth flows powered by Better-auth.
- ⚡ **High Performance** — Built on Next.js App Router with server components for optimal speed.
- 📤 **File Uploads** — Avatar and media uploads handled via UploadThing.

---

## 🛠️ Tech Stack

| Category | Technology |
|---|---|
| Framework | [Next.js 15](https://nextjs.org) (App Router) |
| Language | [TypeScript 5](https://www.typescriptlang.org/) |
| Authentication | [Better-auth](https://better-auth.com/) |
| Database | [PostgreSQL](https://www.postgresql.org/) |
| ORM | [Drizzle ORM](https://orm.drizzle.team/) |
| API Layer | [tRPC v11](https://trpc.io/) |
| Styling | [Tailwind CSS v3](https://tailwindcss.com/) |
| Components | [shadcn/ui](https://ui.shadcn.com/) + [Radix UI](https://www.radix-ui.com/) |
| File Uploads | [UploadThing](https://uploadthing.com/) |
| Icons | [Lucide React](https://lucide.dev/) |
| Drag & Drop | [dnd-kit](https://dndkit.com/) |

---

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages & layouts
│   ├── [username]/         # Public user profile pages
│   ├── dashboard/          # Authenticated user dashboard
│   ├── api/                # API routes (tRPC, auth, uploadthing)
│   └── _components/        # Shared page-level components
├── components/ui/          # Reusable UI primitives (shadcn/ui)
├── server/
│   ├── api/routers/        # tRPC routers
│   ├── better-auth/        # Auth configuration
│   └── db/                 # Drizzle schema & database client
├── styles/                 # Global CSS
└── trpc/                   # tRPC client setup
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** v18.17.0 or higher
- **pnpm** v8+ (recommended) — `npm install -g pnpm`
- **PostgreSQL** database (local or hosted)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/raghavdwd/linkbase.git
   cd linkbase
   ```

2. **Install dependencies:**
   ```bash
   pnpm install
   ```

### Environment Variables

Create a `.env` file in the root, based on the required fields in `src/env.js`:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/linkbase"

# Authentication
BETTER_AUTH_SECRET="your-32-character-secret"
BETTER_AUTH_URL="http://localhost:3000"

# UploadThing
UPLOADTHING_SECRET="sk_live_..."
UPLOADTHING_APP_ID="your-app-id"
```

### Database Setup

**Option A — Docker (recommended for local dev):**
```bash
./start-database.sh
```

**Option B — Push schema to an existing database:**
```bash
pnpm db:push
```

Then start the development server:
```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📜 Available Scripts

| Script | Description |
|---|---|
| `pnpm dev` | Start the development server with Turbopack |
| `pnpm build` | Build the application for production |
| `pnpm start` | Start the production server |
| `pnpm lint` | Run ESLint |
| `pnpm typecheck` | Run TypeScript type checking |
| `pnpm format:write` | Format all files with Prettier |
| `pnpm db:push` | Push schema changes directly to the database |
| `pnpm db:generate` | Generate new migration files |
| `pnpm db:migrate` | Run pending migrations |
| `pnpm db:studio` | Open Drizzle Studio (visual DB explorer) |

---

## ☁️ Deployment

The easiest way to deploy Linkbase is on **[Vercel](https://vercel.com)**:

1. Push your code to a GitHub repository.
2. Import the project on Vercel.
3. Add all environment variables from your `.env` file to the Vercel dashboard.
4. Deploy.

For self-hosting with Docker or other providers, refer to the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying).

---

## 🤝 Contributing

Contributions are welcome and appreciated!

1. Fork the repository.
2. Create a feature branch: `git checkout -b feat/amazing-feature`
3. Commit your changes: `git commit -m 'feat: add amazing feature'`
4. Push to the branch: `git push origin feat/amazing-feature`
5. Open a Pull Request.

Please make sure your code passes linting (`pnpm lint`) and type checks (`pnpm typecheck`) before submitting.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

<div align="center">
Made with ❤️ using the T3 Stack
</div>
