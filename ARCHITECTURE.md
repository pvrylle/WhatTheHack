# WhatTheHack - Architecture Documentation

## Overview

WhatTheHack is built using **Next.js 16** with a **feature-driven, domain-oriented architecture**. This document explains the design decisions and structure.

## 🏛️ Architectural Patterns

### 1. Feature-Based Module Organization

Instead of organizing by technical layer (components, services, etc.), we organize by **feature/domain**:

```
src/features/
├── auth/          # Everything authentication-related
├── challenges/    # All challenge functionality
├── achievements/  # Achievement system
└── dashboard/     # Dashboard-specific code
```

**Benefits**:

- Easy to understand which files relate to which feature
- Simple to add/remove entire features
- Clear dependencies between features
- Teams can work independently on features

### 2. Domain-Driven Types

Types are organized by business domain, not technical layer:

```
src/types/
├── domains/
│   ├── auth.ts           # User, LoginRequest, AuthResponse
│   ├── challenges.ts     # Challenge, Mission, Submission
│   └── achievements.ts   # Achievement, Badge
├── api.ts                # ApiResponse<T>, PaginatedResponse<T>
└── common.ts             # Shared types (Difficulty, Rarity)
```

**Why?**

- Types live where they're semantically relevant
- Reduces circular dependencies
- Easy to find related types
- Clear business context

### 3. Atomic Design for Components

Component hierarchy follows atomic design:

```
src/components/
├── atomic/
│   ├── atoms/            # Button, Text, Icon
│   ├── molecules/        # Card, Badge, Input Field
│   └── organisms/        # List, Grid, Form
├── templates/            # Page layouts
└── ui/                   # Shadcn UI primitives
```

### 4. Service Layer Architecture

Each feature has its own service layer:

```
features/auth/
├── api/                  # HTTP client methods (authApi.login, authApi.register)
├── services/             # Business logic (authService)
├── hooks/                # React hooks (useLogin, useRegister)
└── types/                # Auth types

Shared:
services/
├── http.service.ts       # HTTP abstraction layer
└── mock.service.ts       # Mock data provider
```

**Data Flow**:

```
Component
  ↓ (calls)
Hook (useLogin)
  ↓ (calls)
API Client (authApi)
  ↓ (calls)
HTTP Service (http.service)
  ↓ (calls)
Backend API or Mock Service
  ↓ (returns)
Typed Response
```

## 📊 Request/Response Flow

### Successful Login Flow

```
1. User fills form in AuthPage
2. Clicks submit
3. useLogin() hook is called
4. Hook calls authApi.login(credentials)
5. authApi makes HTTP request via httpService
6. Response is typed with AuthResponse
7. Tokens stored in localStorage
8. React Query cache updated
9. User redirected to dashboard
```

### Type Safety Throughout

```typescript
// authApi.login expects LoginRequest
async login(credentials: LoginRequest): Promise<AuthResponse>

// httpService.post is generic
post<T>(endpoint: string, data?: any): Promise<ApiResponse<T>>

// Response is properly typed
{
  data?: AuthResponse
  results?: AuthResponse[]
  status?: number
}
```

## 🔐 Authentication Pattern

```
app/layout.tsx
  ↓ wraps with
Providers (AuthProvider, QueryProvider, ThemeProvider)
  ↓
AuthProvider manages auth state
  ↓
useAuth() hook provides auth context
  ↓
Protected routes check isLoggedIn
  ↓
Redirects to /auth if not logged in
```

## 🎯 Feature Implementation Pattern

When adding a new feature, follow this structure:

```
src/features/newfeature/
├── api/
│   └── newfeature.api.ts      # API client
├── hooks/
│   ├── use-newfeature.ts
│   └── index.ts               # Barrel export
├── services/
│   ├── newfeature.service.ts
│   └── index.ts
├── types/
│   └── index.ts               # Type exports
├── components/                # Optional: feature-specific UI
│   └── index.ts
└── index.ts                   # Main export barrel
```

Then use it:

```typescript
import { useNewFeature } from '@/features/newfeature/hooks'
import type { NewFeatureData } from '@/features/newfeature/types'
```

## 🔄 State Management

**React Query** handles server state:

- Cache management
- Background refetching
- Automatic invalidation
- Optimistic updates

```typescript
const { data, isLoading } = useQuery({
  queryKey: ['challenges'],
  queryFn: () => challengesService.getChallenges(),
})
```

**Context API** handles UI state:

- Auth context (user, isLoggedIn)
- Theme context (dark/light mode)
- Never store API data in context

## 📦 Shared vs Feature-Specific

### Shared (Available to all features)

- `src/components/atomic/` - Basic UI components
- `src/components/ui/` - Shadcn UI
- `src/services/` - HTTP, Mock service
- `src/hooks/` - useToast, useMobile
- `src/lib/` - Utilities (cn, logger)
- `src/types/` - Global types

### Feature-Specific

- Feature's own hooks (useLogin, useChallenges)
- Feature's own API client
- Feature-specific types
- Feature-specific components (if not reusable)

## 🛣️ Routing Structure

Next.js App Router with route groups:

```
app/
├── (public)/          # Public routes
│   └── auth/
├── (dashboard)/       # Protected routes
│   ├── dashboard/
│   ├── challenges/
│   ├── achievements/
│   └── settings/
└── layout.tsx         # Root layout
```

**Route Groups** ([Next.js Docs](https://nextjs.org/docs/app/building-your-application/routing/route-groups)):

- `(public)` - No auth required
- `(dashboard)` - Auth required
- Don't affect URL structure

## 🔒 Type Safety

- **Strict TypeScript**: Types throughout the codebase
- **Domain Types**: Business context in type definitions
- **Generic Services**: Reusable, type-safe HTTP client
- **Validation**: Zod for runtime validation

```typescript
// Generic API service
post<T>(endpoint: string, data?: any): Promise<ApiResponse<T>>

// Usage with type
const response = await authApi.login<AuthResponse>(credentials)

// Type-safe response
if (response.data?.access) {
  // TypeScript knows response.data is AuthResponse
}
```

## 🚀 Performance Optimizations

1. **Code Splitting**: Dynamic imports for heavy components
2. **Caching**: React Query with stale-time strategy
3. **Lazy Loading**: Images, components
4. **Static Generation**: Where possible
5. **Request Deduplication**: React Query handles it

## 🧪 Testing Strategy

### Unit Tests

- Utility functions in `src/lib/`
- Type validation
- Service logic

### Integration Tests

- API clients with mock service
- Hooks with React Query
- Provider setup

### E2E Tests

- User flows
- Authentication
- Navigation

## 📋 Configuration

- **TypeScript**: `tsconfig.json`
- **Next.js**: `next.config.js`
- **Tailwind**: `tailwind.config.ts`
- **ESLint**: `eslint.config.js`
- **Prettier**: `.prettierrc`
- **Environment**: `.env.local` (git-ignored)

## 🎓 Learning Resources

- [Next.js App Router](https://nextjs.org/docs/app)
- [React Query](https://tanstack.com/query)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [Atomic Design](https://bradfrost.com/blog/post/atomic-web-design)
- [Domain-Driven Design](https://martinfowler.com/bliki/DomainDrivenDesign.html)

## 📞 Support

For questions about the architecture, refer to:

1. This document
2. README.md
3. Code comments in features
4. Type definitions (self-documenting)

---

**Last Updated**: November 2025  
**Next.js Version**: 16.0.3  
**Architecture Pattern**: Feature-Based Domain-Driven Design
