# Movie Utopia - The Constitution

This file defines the immutable design and development rules for the Movie Utopia platform.

## Visual System Rules

### [cinema-mode]
**Background Color**: Always use `#141414` (not black `#000000` or lighter grays).

**Noise Overlay**:
- Fixed positioning
- Opacity: `0.03`
- SVG fractal noise texture
- Z-index: `9999` (always on top)

**Glassmorphism**:
- Use `backdrop-filter: blur(24px)` for overlays
- Card backgrounds: `bg-white/5` (5% white opacity)
- Borders: `border-white/10` (10% white opacity)

**Color Palette**:
- Primary: `#8b5cf6` (Violet)
- Accent: `#f59e0b` (Amber)
- Background: `#141414`
- Text: `#ffffff` (white) and `#a1a1aa` (muted)

**Typography**:
- Headers: `font-serif` (Playfair Display)
- Body: `font-sans` (Inter)
- Never mix fonts within a single text block

### [masonry-logic]
**Image Handling**:
- Never crop images
- Use `aspect-ratio` property to respect original content dimensions
- Use `react-masonry-css` for gallery layouts
- Always provide `object-fit: contain` (not `cover`)

**Grid Configuration**:
```tsx
<Masonry
  breakpointCols={{
    default: 4,
    1280: 3,
    768: 2,
    640: 1
  }}
  className="masonry-grid"
  columnClassName="masonry-column"
>
```

### [a11y-check]
**Accessibility Requirements** (CRITICAL):

1. **Images**: All `<img>` tags must have descriptive `alt` attributes
   ```tsx
   <img src="/poster.jpg" alt="Movie poster for Inception (2010)" />
   ```

2. **Buttons**: Icon-only buttons must have `aria-label`
   ```tsx
   <button aria-label="Play video">
     <Play className="w-6 h-6" />
   </button>
   ```

3. **Forms**: All inputs must have associated labels
   ```tsx
   <label htmlFor="search">Search</label>
   <input id="search" type="text" />
   ```

4. **Color Contrast**: Minimum 4.5:1 ratio for normal text (WCAG AA)
   - White on `#141414`: ✅ 15.3:1
   - Violet `#8b5cf6` on `#141414`: ✅ 4.6:1
   - Amber `#f59e0b` on `#141414`: ✅ 5.2:1

5. **Keyboard Navigation**:
   - All interactive elements must be keyboard accessible
   - Visible focus states with `focus-visible:ring-2 focus-visible:ring-primary`

6. **Screen Readers**: Use semantic HTML
   - `<header>`, `<nav>`, `<main>`, `<footer>`, `<article>`, `<section>`

## Animation Rules

### [motion-principles]
- Use `framer-motion` for all animations
- Default duration: `0.3s` (300ms)
- Easing: `ease-in-out` or `cubic-bezier(0.4, 0, 0.2, 1)`
- Respect `prefers-reduced-motion`

```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.3 }}
>
```

## Component Rules

### [component-structure]
1. **File Naming**: PascalCase for components (`VideoCard.tsx`)
2. **Directory Structure**:
   ```
   components/
   ├── ui/           # shadcn/ui components
   ├── layout/       # Layout components (Header, Footer)
   ├── features/     # Feature-specific components (VideoPlayer, Gallery)
   └── shared/       # Shared utilities (Button, Input)
   ```

3. **Props Interface**: Always define TypeScript interfaces
   ```tsx
   interface VideoCardProps {
     title: string
     thumbnail: string
     duration: number
   }
   ```

### [state-management]
- Use `zustand` for global state
- Use React `useState` for local component state
- Store structure:
  ```typescript
  interface AppStore {
    user: User | null
    videos: Video[]
    isLoading: boolean
  }
  ```

## Pre-Delivery Checklist

Before committing any code, verify:

- [ ] All images have `alt` attributes
- [ ] All icon buttons have `aria-label`
- [ ] Form inputs have associated labels
- [ ] Color contrast meets WCAG AA (4.5:1)
- [ ] Keyboard navigation works (Tab, Enter, Escape)
- [ ] Glassmorphism uses `backdrop-filter: blur(24px)`
- [ ] Background color is `#141414`
- [ ] Noise overlay is present
- [ ] No cropped images (use `aspect-ratio`)
- [ ] All animations respect `prefers-reduced-motion`

## Anti-Patterns (FORBIDDEN)

❌ **Never** use `bg-black` (use `bg-background` or `#141414`)
❌ **Never** crop images with `object-fit: cover`
❌ **Never** use emoji as icons (use `lucide-react`)
❌ **Never** hardcode colors (use Tailwind utilities)
❌ **Never** use inline styles (use Tailwind classes)
❌ **Never** forget `alt` text on images
❌ **Never** use `className="text-white"` (use semantic color tokens)
