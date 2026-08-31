# Portfolio Site - Setup & Implementation Guide

## ✅ What's Implemented

### 1. **LoadingScreen.jsx** - Hybrid Loading Strategy
The loading screen implements a sophisticated hybrid approach:

**Features:**
- ✅ **Enforced Minimum Animation Time**: 2.5-second baseline timer
- ✅ **3D Rotating Square**: X-axis rotation with perspective(150px)
- ✅ **5-Color Sequence**: #AE2E24 → #FCA700 → #803FA5 → #669DF1 → #292A2E
- ✅ **Logo Alternation**: Uses your `logo-light.svg` and `logo-dark.svg`
- ✅ **Sync Color Swaps**: Occurs at 90°/270° rotation angles (edge-on)
- ✅ **Critical Asset Checking**:
  - Waits for `document.fonts.ready` (Google Fonts)
  - Waits for `window.load` event (DOM elements)
  - Only exits when BOTH 2.5s timer completes AND assets are ready
- ✅ **Smooth Exit**: Fade-out animation before revealing Cover section

### 2. **Cover.jsx** - Staggered Animation Sequence
Fully responsive cover section matching your Figma design:

**Layout:**
- Header: Logo, Title, Subtitle (centered)
- Main Content: 3-column grid (Left Info | Profile Image | Right Info)
- Responsive: Single column on mobile, full 3-column on desktop

**Staggered Animations (each 0.25s apart, starting after 0.2s):**
1. **Title & Subtitle** - Fade in + slide up
2. **Profile Image** - Fade in + scale
3. **Left Section** - Fade in + slide from left
4. **Right Section** - Fade in + slide from right

**Content Sections:**
- **Left Column**: About Me, Education, Contact
- **Center**: Profile image (SVG) with decorative badges
- **Right Column**: Years of Experience (prominent "7"), Current Employment, Strengths

**Styling:**
- Background: Custom gradient (171deg, #FCFAF8 → #F9F6F0)
- Typography: Exact spacing & sizing from Figma
- Colors: #1558BC accents, #292A2E main text, decorative elements

### 3. **Lazy Loading Infrastructure**
Non-blocking heavy media loading:

**useLazyLoadMedia Hook** - Custom hook using IntersectionObserver:
- Detects when elements scroll into view
- 10% threshold + 50px margin for smooth loading
- Only fetches/renders media when needed

**LazyVideo Component:**
- `preload="metadata"` - Only loads video metadata, not full file
- `poster` attribute - Shows thumbnail until video loads
- Loads on-demand when scrolled into view
- No blocking of initial page load

**LazyLottie Component:**
- Suspense fallback while animation loads
- Code-split with React.lazy()
- Only fetches JSON file when in viewport
- Smooth loading transition

## 🚀 Installation & Running

### Step 1: Complete npm Install
```bash
npm install
```
(If you get OpenSSL errors on macOS, use: `OPENSSL_CONF= npm install`)

### Step 2: Start Dev Server
```bash
npm run dev
```
This opens http://localhost:5173 with hot reload.

### Step 3: Build for Production
```bash
npm run build
```
Creates optimized production build in `/dist`

## 📁 File Structure

```
src/
├── components/
│   ├── LoadingScreen.jsx      ✅ 3D loader with hybrid strategy
│   ├── Cover.jsx              ✅ Hero section with staggered anims
│   ├── LazyVideo.jsx          ✅ Lazy-load video component
│   └── LazyLottie.jsx         ✅ Lazy-load Lottie component
├── hooks/
│   └── useLazyLoadMedia.js    ✅ IntersectionObserver hook
├── pages/
│   └── HomePage.jsx           ✅ Main page (Cover + future sections)
├── styles/
│   └── index.css              ✅ Google Fonts + Tailwind
├── App.jsx                    ✅ Root component
└── main.jsx                   ✅ Entry point

public/assets/
├── images/
│   ├── logo-dark.svg          ✅ Dark logo (for loader)
│   ├── logo-light.svg         ✅ Light logo (for loader)
│   ├── profile.svg            ✅ Your profile image
│   └── Grid/                  ✅ Work screenshots
├── lottie/
│   ├── Designed_for_all_devices.lottie
│   └── Mix_and_match.lottie
├── svg/
│   └── component board.svg
└── video/
    └── Gamification.mp4
```

## 🎯 Usage Examples

### Using LazyVideo
```jsx
<LazyVideo
  src="/assets/video/Gamification.mp4"
  poster="/assets/video/poster.jpg"
  className="w-full h-96"
/>
```

### Using LazyLottie
```jsx
import animationData from '/assets/lottie/Mix_and_match.lottie'

<LazyLottie
  animationData={animationData}
  className="w-full h-96"
  autoplay={true}
  loop={true}
/>
```

### Using Custom Media Hook
```jsx
import { useLazyLoadMedia } from '../hooks/useLazyLoadMedia'

function MyMediaComponent() {
  const { ref, isInView } = useLazyLoadMedia()

  return (
    <div ref={ref}>
      {isInView && <ExpensiveComponent />}
    </div>
  )
}
```

## ⚙️ Configuration

### Tailwind Customization
Edit `tailwind.config.js` to adjust:
- Font sizes (display, h1-h3, body-lg/reg/sm)
- Font families (Chivo for display, Sora for body)
- Brand colors and accent colors

### Loading Animation Timing
Edit `src/components/LoadingScreen.jsx`:
- `ANIMATION_DURATION` - Total animation time (currently 2.5s)
- `COLORS` - Color sequence and logo variants
- Rotation amount - Currently 1080° (3 full rotations)

### IntersectionObserver Settings
Edit `src/hooks/useLazyLoadMedia.js`:
- `threshold` - Currently 0.1 (10% visible)
- `rootMargin` - Currently '50px' (load 50px before entering viewport)

## 🔍 Next Steps

### Additional Sections to Build:
1. **Work Grid Section** - Display your Grid screenshots with filtering
2. **Skills/Services Section** - Highlight your expertise
3. **Case Studies/Projects** - Deep dive into your work
4. **Contact/CTA Section** - Call to action
5. **Footer** - Navigation and links

### Performance Optimizations:
- Image optimization (convert to WebP)
- Code splitting per section
- PWA setup for offline support
- Analytics integration

### Enhancements:
- Scroll animations for other sections
- Parallax effects
- Scroll-to-top button
- Navigation menu/drawer

## 📝 Asset Requirements

**Your current assets are ready!**
- ✅ Logo variations (dark & light)
- ✅ Profile image (SVG)
- ✅ Lottie animations (2 files)
- ✅ Work grid (24 screenshots)
- ✅ Video (Gamification.mp4)
- ✅ SVG components

**Future assets needed (for additional sections):**
- Project preview images
- Case study images
- Any animations for other sections

## 🚨 Troubleshooting

### npm install fails with OpenSSL error
```bash
# Try with this workaround:
OPENSSL_CONF= npm install
```

### Fonts not loading
- Verify Google Fonts URL is correct in `src/styles/index.css`
- Check network tab in browser DevTools
- Ensure fonts are imported before Tailwind

### Animations not smooth
- Check browser DevTools Performance tab
- Reduce animation duration for testing
- Use Chrome Lighthouse for performance metrics

### Media not lazy loading
- Verify hook ref is attached to DOM element
- Check IntersectionObserver support (all modern browsers support it)
- Look in DevTools Network tab to confirm media loads on scroll

## 📚 Resources

- [Framer Motion Docs](https://www.framer.com/motion/)
- [Lottie React Docs](https://lottie-react.js.org/)
- [Tailwind CSS Docs](https://tailwindcss.com/)
- [MDN IntersectionObserver](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)

---

**Ready to launch!** 🚀 Run `npm install && npm run dev` and start building.
