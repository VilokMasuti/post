
## Overview
PostVerse is a modern, responsive React application for managing and exploring posts.

## Features
-  Fully responsive design
-  Modern UI with smooth animations
-  Real-time search functionality

-   Comment system
-  Optimized performance

## Tech Stack
- **Framework**: React + Vite
- **Styling**: Tailwind CSS + shadcn/ui
- **State Management**: React Query
- **Routing**: React Router
- **HTTP Client**: Axios
- **Animations**: Framer Motion
- **Icons**: Lucide React

## Project Structure
```
src/
├── components/         # Reusable UI components
│   ├── ui/            # shadcn/ui components
│   ├── PostCard       # Post display component
│   ├── PostSkeleton   # Loading state component
│   └── ...
├── pages/             # Route pages
│   ├── Index         # Home page with post listing
│   ├── PostDetail    # Individual post view
│   └── ...
├── services/          # API and data services
├── hooks/             # Custom React hooks
└── utils/            # Helper functions
```

## Design System
- **Typography**:
  - Headings: Playfair Display
  - Body: Inter
- **Color Palette**:
  - Primary: Purple (#9b87f5)
  - Accent: Deep Purple (#7856ff)
  - Background: Pure White (#ffffff)
  - Text: Rich Black (#1a1f2c)

## Performance Optimizations
- Lazy loading of routes
- Image optimization
- Debounced search
- Skeleton loading states
- Optimistic updates for post actions

## Development Practices
- TypeScript for type safety
- Component-based architecture
- Custom hooks for reusable logic
- Consistent code formatting with ESLint/Prettier
- Modular and maintainable code structure

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## Best Practices
- Clean and modular code organization
- Reusable components and hooks
- Proper TypeScript typing
- Responsive design principles
- Accessibility considerations
- Performance optimization
