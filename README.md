# Movie Utopia v2 - Foundation

Premium AI-powered video platform built with Next.js 15, TypeScript, and Tailwind CSS v4.

## 🎨 Visual System: Premium Vibrant

The platform features a carefully designed "Premium Vibrant" visual system:

### Color Palette
- **Background**: `#141414` (Dark cinema mode)
- **Primary**: `#8b5cf6` (Violet)
- **Accent**: `#f59e0b` (Amber)
- **Text**: `#ffffff` (White) with `#a1a1aa` (Muted gray)

### Typography
- **Headers**: Playfair Display (serif)
- **Body**: Inter (sans-serif)

### Visual Features
- ✨ Noise texture overlay (opacity 0.03) for premium feel
- 🪟 Custom Mac-style scrollbar with violet tint
- 🌫️ Glassmorphism effects with backdrop blur
- 🎭 Cinema mode background (#141414)
- 🎨 Gradient text utilities

## 🚀 Tech Stack

### Core
- **Next.js 15** (App Router, React Server Components)
- **TypeScript** (Type-safe development)
- **Tailwind CSS v4** (Utility-first styling)

### UI Libraries
- **shadcn/ui** (Composable component system)
- **Framer Motion** (Smooth animations)
- **Lucide React** (Icon library)

### State & Utilities
- **Zustand** (Global state management)
- **React Masonry CSS** (Gallery layouts)
- **Sonner** (Toast notifications)
- **cmdk** (Command palette)
- **Vaul** (Mobile drawer)
- **clsx + tailwind-merge** (Conditional styling)

## 📁 Project Structure

```
movie-utopia-v2/
├── app/
│   ├── globals.css          # Visual system styles
│   ├── layout.tsx            # Root layout with fonts
│   └── page.tsx              # Demo homepage
├── components/
│   ├── ui/                   # shadcn/ui components
│   ├── layout/               # Layout components (Header, Footer)
│   ├── features/             # Feature components (VideoPlayer, Gallery)
│   └── shared/               # Shared utilities
├── lib/
│   └── utils.ts              # Utility functions
├── .claudecode/
│   └── SKILL.md              # Design constitution
└── package.json
```

## 🎯 The Constitution

The `.claudecode/SKILL.md` file defines immutable design and development rules:

### [cinema-mode]
- Background: Always `#141414`
- Noise overlay: Fixed, opacity 0.03, z-index 9999
- Glassmorphism: `backdrop-filter: blur(24px)`

### [masonry-logic]
- Never crop images (use `aspect-ratio`)
- Use `object-fit: contain` (not `cover`)
- Responsive grid breakpoints

### [a11y-check]
- All images have `alt` attributes
- Icon buttons have `aria-label`
- WCAG AA color contrast (4.5:1 minimum)
- Keyboard navigation support
- Semantic HTML structure

### [motion-principles]
- Default duration: 0.3s
- Respect `prefers-reduced-motion`
- Use Framer Motion for animations

## 🛠️ Development

### Install Dependencies
```bash
npm install
```

### Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the demo.

### Build for Production
```bash
npm run build
```

### Add shadcn/ui Components
```bash
npx shadcn@latest add <component-name>
```

Example:
```bash
npx shadcn@latest add card
npx shadcn@latest add dialog
npx shadcn@latest add input
```

## 📦 Installed Dependencies

### Core
```json
{
  "next": "^16.1.6",
  "react": "^19.0.0",
  "react-dom": "^19.0.0",
  "typescript": "^5"
}
```

### UI & Animation
```json
{
  "framer-motion": "^12.29.2",
  "lucide-react": "^0.563.0",
  "sonner": "^2.0.7",
  "cmdk": "^1.1.1",
  "vaul": "^1.1.2"
}
```

### State & Utilities
```json
{
  "zustand": "^5.0.11",
  "clsx": "^2.1.1",
  "tailwind-merge": "^3.4.0",
  "react-masonry-css": "^1.0.16"
}
```

## 🎨 Tailwind Configuration

The project uses Tailwind CSS v4 with inline theme configuration in `app/globals.css`:

```css
@theme inline {
  --color-background: #141414;
  --color-primary: #8b5cf6;
  --color-accent: #f59e0b;
  --font-sans: 'Inter', sans-serif;
  --font-serif: 'Playfair Display', serif;
}
```

### Utility Classes

**Cinema Mode**
```html
<div className="cinema-mode">...</div>
```

**Glassmorphism**
```html
<div className="glass">...</div>
```

**Text Gradient**
```html
<h1 className="text-gradient">Movie Utopia</h1>
```

## 🌟 Features Demo

The homepage (`app/page.tsx`) demonstrates:
- Typography system (Playfair Display + Inter)
- Color palette visualization
- Glassmorphism cards
- Button variants
- Visual features list

## 📋 Pre-Delivery Checklist

Before committing code:
- [ ] All images have `alt` attributes
- [ ] Icon buttons have `aria-label`
- [ ] Form inputs have labels
- [ ] Color contrast meets WCAG AA
- [ ] Keyboard navigation works
- [ ] Glassmorphism uses `backdrop-filter: blur(24px)`
- [ ] Background is `#141414`
- [ ] Noise overlay is present
- [ ] Images respect aspect ratios
- [ ] Animations respect `prefers-reduced-motion`

## ❌ Anti-Patterns

Never use:
- `bg-black` (use `bg-background`)
- `object-fit: cover` (use `contain`)
- Emoji as icons (use `lucide-react`)
- Hardcoded colors (use Tailwind utilities)
- Inline styles (use Tailwind classes)

## 🔄 Next Steps

1. Build feature components (VideoPlayer, Gallery, Search)
2. Implement authentication system
3. Create API routes for video processing
4. Add state management with Zustand
5. Build responsive layouts
6. Implement animations with Framer Motion
7. Add command palette (cmdk)
8. Create mobile drawer (vaul)
9. Implement toast notifications (sonner)

## 📝 License

Proprietary - Movie Utopia Platform

## 🤝 Contributing

Follow the rules in `.claudecode/SKILL.md` for consistent development.
