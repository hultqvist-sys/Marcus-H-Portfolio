# Portfolio Site - Setup & Structure

## 📂 Project Structure

```
Review/
├── public/
│   └── assets/
│       ├── lottie/          ← Add Lottie animation JSON files here
│       ├── video/           ← Add MP4/WebM videos here
│       ├── svg/             ← Add SVG files here (logo.svg, etc.)
│       └── images/          ← Add PNG/JPEG images here (profile image, etc.)
│
├── src/
│   ├── components/
│   │   ├── LoadingScreen.jsx    (Animated 3D loader - TODO)
│   │   └── Cover.jsx            (Hero section with staggered anims - TODO)
│   │
│   ├── pages/
│   │   └── HomePage.jsx         (Main page container)
│   │
│   ├── hooks/
│   │   └── (utilities for animations - TODO)
│   │
│   ├── styles/
│   │   └── index.css            (Google Fonts + Tailwind setup)
│   │
│   ├── App.jsx                  (Root component)
│   └── main.jsx                 (Entry point)
│
├── index.html                   (HTML template)
├── package.json                 (Dependencies & scripts)
├── vite.config.js               (Vite configuration)
├── tailwind.config.js           (Tailwind + custom typography)
├── postcss.config.js            (PostCSS config)
├── .gitignore                   (Git ignore rules)
└── IMPLEMENTATION_PLAN.md       (Detailed implementation guide)
```

## 🚀 Getting Started

### 1. Add Your Assets
Before installing dependencies, prepare your assets:

**Required files in `public/assets/`:**
- `svg/logo.svg` - Your logo (will receive dynamic fill colors)
- `images/profile.jpg` - Your profile image
- Any other images, videos, or Lottie animations

### 2. Install Dependencies
Once assets are ready:
```bash
npm install
```

### 3. Development Server
```bash
npm run dev
```
The app will open at `http://localhost:5173`

### 4. Build for Production
```bash
npm run build
```

## 📋 Implementation Checklist

Review `IMPLEMENTATION_PLAN.md` for the complete breakdown.

**Phase 1 - Setup:** ✅ Complete (you're here)
**Phase 2 - LoadingScreen:** ⏳ Awaiting implementation
**Phase 3 - Cover Section:** ⏳ Awaiting Figma review + implementation
**Phase 4 - Full Integration:** ⏳ Pending

## 🎨 Typography System

| Use | Font | Size | Class |
|-----|------|------|-------|
| Hero Text | Chivo 900 | 80px | `text-display` |
| Main Heading | Chivo 700 | 48px | `text-h1` |
| Section Heading | Chivo 700 | 32px | `text-h2` |
| Small Heading | Chivo 700 | 16px | `text-h3` |
| Large Body | Sora 400 | 24px | `text-body-lg` |
| Regular Body | Sora 400 | 20px | `text-body-reg` |
| Small Body | Sora 400 | 14px | `text-body-sm` |

## 🔗 Figma Design Reference

Cover Section Design: https://www.figma.com/design/KzOX7vg2j1jllYDw0flcqt/Marcus-hultqvist---Atlassian-work-examples?node-id=317-19986

## 📝 Next Steps

1. ✅ Review `IMPLEMENTATION_PLAN.md`
2. ✅ Prepare your assets (logo, profile image, etc.)
3. ⏳ Confirm Figma design interpretation
4. ⏳ Run `npm install` once ready
5. ⏳ Begin Phase 2: LoadingScreen implementation
