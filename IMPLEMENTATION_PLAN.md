# Portfolio Site - Implementation Plan

## 📋 Overview
Single-page React application using Vite with advanced typography, animations, and a loading sequence. The site starts with an animated loader, then reveals a cover section with staggered animations that matches your Figma design.

---

## Phase 1: Project Setup & Configuration

### 1.1 Dependencies
```
Core Framework:
  - vite
  - react
  - react-dom

Styling & Theming:
  - tailwindcss
  - postcss
  - autoprefixer

Animation Libraries:
  - framer-motion
  - lottie-react
  - lucide-react
```

### 1.2 Typography Configuration
**Fonts to Import:** Chivo (display, weights: 400/700/900) & Sora (body, weights: 400/500/600)

**Custom Font Size System (Tailwind):**
| Name | Size | Font Family | Use Case |
|------|------|-------------|----------|
| `display` | 80px | Chivo, bold | Hero/largest text |
| `h1` | 48px | Chivo | Main headings |
| `h2` | 32px | Chivo | Section headings |
| `h3` | 16px | Chivo + uppercase tracking | Small headings |
| `body-lg` | 24px | Sora | Large body text |
| `body-reg` | 20px | Sora | Regular body text |
| `body-sm` | 14px | Sora | Small text/captions |

### 1.3 Asset Organization
```
public/
├── assets/
│   ├── lottie/          (Lottie JSON animations)
│   ├── video/           (MP4/WebM videos)
│   ├── svg/             (SVG graphics including logo.svg)
│   └── images/          (PNG/JPEG profile image, etc.)
```

---

## Phase 2: Loading Screen Component (`LoadingScreen.jsx`)

### 2.1 Structure & Behavior
- **Container:** Full-screen fixed overlay (z-50)
- **Duration:** 2.5 seconds total
- **Animation Type:** 3D X-axis rotation with continuous perspective

### 2.2 Animated Square Logic
- **Base Style:** Perspective(150px), rotates on X-axis continuously
- **Color Sequence (5 steps, each ~500ms):**
  1. `#AE2E24` (Deep Red) → Logo: White (#FFFFFF)
  2. `#FCA700` (Orange) → Logo: Dark (#18181B)
  3. `#803FA5` (Purple) → Logo: White (#FFFFFF)
  4. `#669DF1` (Blue) → Logo: Dark (#18181B)
  5. `#292A2E` (Dark Gray) → Logo: White (#FFFFFF)

### 2.3 Sync Points
- **Color & Logo Swap Timing:** Occurs when the square rotates edge-on to screen (90°/270° rotation angles)
- **Transition:** Each color state lasts ~500ms
- **Exit Animation:** Smooth fade-out overlay after 2.5s, revealing Cover section

---

## Phase 3: Cover Section (`Cover.jsx`)

### 3.1 Design Reference
- **Figma Link:** https://www.figma.com/design/KzOX7vg2j1jllYDw0flcqt/Marcus-hultqvist---Atlassian-work-examples?node-id=317-19986&t=O0gJLWSITgJqHMRB-1
- **Background:** Linear gradient: `linear-gradient(171deg, #FCFAF8 1.51%, #F9F6F0 96.74%)`
- **Height:** Full viewport height (100vh)

### 3.2 Staggered Animation Sequence
The cover section animates in after the loader exits. Each element enters sequentially:

**Animation Order (each with ~200-300ms stagger):**
1. **Title & Subtitle** - Fade in + slide up
2. **Profile Image** - Fade in + scale
3. **Left Section (content)** - Fade in + slide from left, animate top-to-bottom
4. **Right Section (content)** - Fade in + slide from right, animate top-to-bottom

**Framer Motion Approach:**
- Use `containerVariants` with `staggerChildren`
- Individual elements use `itemVariants` with `initial` → `animate` states
- Delay calculations based on element index

### 3.3 Layout Structure
From Figma, the cover typically contains:
- Top area: Title + Subtitle
- Middle area: Profile image (centered or positioned)
- Bottom area: Left & right content sections with cards/text

---

## Phase 4: Component Architecture

```
src/
├── components/
│   ├── LoadingScreen.jsx        (3D animated loader)
│   ├── Cover.jsx                (Hero section with staggered anims)
│   ├── Navigation.jsx           (Future: nav bar/menu)
│   └── [...other sections]
├── pages/
│   └── HomePage.jsx             (Main page - Cover + other sections)
├── hooks/
│   └── useLoadingAnimation.js    (Loading state logic)
├── styles/
│   └── index.css                (Google Fonts import + globals)
├── App.jsx                      (Root component, LoadingScreen + Cover)
├── main.jsx                     (Entry point)
└── App.css                      (Global styles)
```

---

## Phase 5: Implementation Steps

### Step 1: Project Scaffolding
- [ ] Create Vite React project structure
- [ ] Install all dependencies
- [ ] Configure Tailwind CSS with custom typography
- [ ] Set up folder structure in `/public/assets/`

### Step 2: Typography & Styling
- [ ] Import Google Fonts in `index.css`
- [ ] Configure `tailwind.config.js` with custom font families
- [ ] Add custom font size utilities (display, h1-h3, body-lg/reg/sm)
- [ ] Define brand color palette in Tailwind config

### Step 3: LoadingScreen Component
- [ ] Build 3D rotating square with perspective
- [ ] Implement color cycling (5-color sequence)
- [ ] Sync logo color changes to 90°/270° rotation angles
- [ ] Add exit animation (fade out after 2.5s)
- [ ] Wire up loading state to trigger Cover reveal

### Step 4: Cover Section (Design Implementation)
- [ ] Review Figma design in detail
- [ ] Build static layout matching design
- [ ] Add staggered entry animations using Framer Motion
- [ ] Test animation timing and feel

### Step 5: App.jsx Integration
- [ ] Create main App component with conditional rendering
- [ ] Show LoadingScreen on mount
- [ ] Transition to Cover after loader completes
- [ ] Set up overall page layout and styling

### Step 6: Testing & Refinement
- [ ] Test loader animation timing (2.5s total)
- [ ] Verify stagger sequence and smoothness
- [ ] Test on different screen sizes
- [ ] Optimize animations for performance

---

## 🎨 Design System Summary

| Element | Font | Size | Color | Notes |
|---------|------|------|-------|-------|
| Display Text | Chivo 900 | 80px | Brand dependent | Hero text |
| H1 | Chivo 700 | 48px | Primary | Main headings |
| H2 | Chivo 700 | 32px | Primary | Section heads |
| H3 | Chivo 700 | 16px | Primary | `uppercase tracking-wider` |
| Body Large | Sora 400 | 24px | Text | Large paragraphs |
| Body Regular | Sora 400 | 20px | Text | Standard text |
| Body Small | Sora 400 | 14px | Text | Captions/metadata |

**Loader Colors:** `#AE2E24`, `#FCA700`, `#803FA5`, `#669DF1`, `#292A2E`

**Cover Gradient:** `linear-gradient(171deg, #FCFAF8 1.51%, #F9F6F0 96.74%)`

---

## ⚠️ Critical Implementation Notes

1. **Loader Exit Timing:** Must complete in exactly 2.5 seconds before fading out
2. **Color Sync:** Logo color swap should happen mid-rotation (90°/270°), not at start/end
3. **Stagger Timing:** 200-300ms between each cover element entry for smooth cascade
4. **SVG Logo:** Must be scalable and accept dynamic fill colors
5. **Performance:** Use Framer Motion's `will-change` and `GPU acceleration` for smooth 3D rotations

---

## 📦 Next Steps

1. ✅ Review this plan
2. ✅ Confirm Figma design interpretation
3. ⏳ Set up project structure
4. ⏳ Begin Phase 1 implementation (dependencies + config)
5. ⏳ Implement LoadingScreen component
6. ⏳ Implement Cover component with animations
