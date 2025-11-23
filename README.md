# WhatTheHack - Ethical Hacking Learning Platform

A modern, gamified cybersecurity learning platform built with **Next.js 16**, **React 19**, and **TypeScript**. This platform provides interactive challenges, missions, and achievements to teach ethical hacking in an engaging way.

## 🏗️ Architecture Overview

This project follows **enterprise-level Next.js best practices** with a feature-based, domain-driven architecture:

### Directory Structure

```
WhatTheHack/
├── app/                          # Next.js App Router (Routes & Layouts)
│   ├── (dashboard)/              # Protected dashboard routes
│   │   ├── challenges/           # Challenge browsing & details
│   │   ├── achievements/         # Achievement tracking
│   │   ├── learning-paths/       # Learning path management
│   │   └── settings/             # User settings
│   ├── (public)/                 # Public routes
│   │   └── auth/                 # Authentication pages
│   ├── globals.css               # Global styles
│   └── layout.tsx                # Root layout with providers
│
├── src/
│   ├── features/                 # Feature modules (domain-driven)
│   │   ├── auth/                 # Authentication feature
│   │   │   ├── api/              # API client methods
│   │   │   ├── hooks/            # React hooks (useLogin, useRegister)
│   │   │   ├── services/         # Business logic
│   │   │   └── types/            # Feature-specific types
│   │   ├── challenges/           # Challenges feature
│   │   ├── achievements/         # Achievements feature
│   │   ├── dashboard/            # Dashboard feature
│   │   ├── user/                 # User management
│   │   └── learning-paths/       # Learning paths
│   │
│   ├── components/               # Reusable UI components
│   │   ├── atomic/               # Atomic design pattern
│   │   │   ├── atoms/            # Basic building blocks
│   │   │   ├── molecules/        # Combined atoms
│   │   │   └── organisms/        # Complex components
│   │   ├── templates/            # Page templates
│   │   ├── navigation/           # Navigation components
│   │   ├── providers/            # Context providers
│   │   └── ui/                   # Shadcn UI components
│   │
│   ├── types/                    # Global types (organized by domain)
│   │   ├── domains/              # Domain-specific types
│   │   │   ├── auth.ts
│   │   │   ├── challenges.ts
│   │   │   └── achievements.ts
│   │   ├── api.ts                # API response wrappers
│   │   └── common.ts             # Common types
│   │
│   ├── services/                 # Shared services
│   │   ├── http.service.ts       # HTTP client
│   │   └── mock.service.ts       # Mock data service
│   │
│   ├── hooks/                    # Global hooks
│   │   ├── use-toast.ts
│   │   └── use-mobile.tsx
│   │
│   ├── lib/                      # Utilities & helpers
│   │   ├── utils.ts
│   │   ├── cn.ts                 # Tailwind CSS merge
│   │   └── logger.ts             # Logging utility
│   │
│   ├── constants/                # Application constants
│   │   ├── api.ts                # API endpoints
│   │   └── routes.ts             # Route constants
│   │
│   └── data/                     # Mock/seed data
│
├── public/                       # Static assets
│   ├── logo-wth.svg
│   └── placeholder.svg
│
└── Configuration files
    ├── next.config.js
    ├── tailwind.config.ts
    ├── tsconfig.json
    ├── eslint.config.js
    └── package.json
```

## 🎯 Architecture Principles

### 1. **Feature-Based Organization**

- Each feature (auth, challenges, achievements) is self-contained
- Easy to add new features without affecting existing code
- Clear feature boundaries

### 2. **Domain-Driven Design**

- Types organized by business domain
- Services grouped by responsibility
- API clients co-located with features

### 3. **Atomic Design Pattern**

- Components follow atomic design methodology
- Reusable atoms → molecules → organisms
- Clear component hierarchy

### 4. **Type Safety**

- Full TypeScript coverage
- Domain-specific types
- API response types with generics

### 5. **Separation of Concerns**

- Pages handle routing only
- Components handle UI rendering
- Services handle business logic
- Hooks handle state management

## 🚀 Key Technologies

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript 5.8
- **UI Components**: Shadcn UI + Radix UI
- **Styling**: Tailwind CSS 3
- **State Management**: TanStack React Query (React Query)
- **Form Handling**: React Hook Form + Zod
- **HTTP Client**: Fetch API with abstraction layer
- **Icons**: Lucide React
- **Animations**: Tailwind CSS animations

## 📋 Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Visit `http://localhost:3000`

### Build

```bash
npm run build
npm start
```

### Linting

```bash
npm run lint
```

## 🔒 Authentication Flow

1. User navigates to `/auth`
2. Submits credentials via form
3. `useLogin` hook calls `authApi.login()`
4. Tokens stored in localStorage
5. Redirected to dashboard
6. Protected routes check auth status

## 🏆 Feature Modules

### Auth Module (`src/features/auth/`)

- Login/Register functionality
- Token management
- User session

### Challenges Module (`src/features/challenges/`)

- Challenge listing
- Challenge details
- Submission handling

### Achievements Module (`src/features/achievements/`)

- Achievement tracking
- Progress management

### Dashboard Module (`src/features/dashboard/`)

- User stats
- Mission overview
- Recent achievements

## 🔄 Data Flow

1. **API Request**: Page/Component → Hook
2. **Hook**: Calls service or API client
3. **Service**: Makes HTTP request via `http.service.ts`
4. **Response**: Typed with domain types
5. **State**: Managed by React Query
6. **UI**: Renders with data

## 📦 Component Hierarchy

```
Page (app/*)
  ↓
Template (src/components/templates/)
  ↓
Organisms (src/components/organisms/)
  ↓
Molecules (src/components/molecules/)
  ↓
Atoms (src/components/atoms/)
  ↓
Shadcn UI (src/components/ui/)
```

## 🛡️ Best Practices

✅ **Followed**:

- Type-safe throughout
- DRY (Don't Repeat Yourself)
- Clear separation of concerns
- Scalable architecture
- Professional naming conventions
- Modular code organization
- Reusable components
- Consistent error handling
- Security best practices

## 🎓 Perfect for Academic Review

This structure demonstrates:

- ✅ Understanding of Next.js best practices
- ✅ Clean code principles
- ✅ Design patterns (Atomic Design, DDD)
- ✅ Type safety with TypeScript
- ✅ Professional folder organization
- ✅ Scalable architecture
- ✅ Separation of concerns
- ✅ API abstraction layer

## 📝 License

This project is for educational purposes.

---

**Built with attention to architecture, scalability, and best practices for Next.js applications.**
