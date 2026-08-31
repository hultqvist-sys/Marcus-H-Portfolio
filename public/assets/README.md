# Assets Directory

Add your project assets here:

## `/svg/` - SVG Graphics
- `logo.svg` - Your logo (will be colored dynamically in LoadingScreen)
- Any other SVG icons or graphics

**Example usage in React:**
```jsx
<svg className="w-32 h-32 fill-current text-white">
  <use href="/assets/svg/logo.svg" />
</svg>
```

## `/images/` - Static Images
- `profile.jpg` - Your profile/headshot image
- Any PNG/JPEG images for the site

**Example usage:**
```jsx
<img src="/assets/images/profile.jpg" alt="Profile" className="rounded-lg" />
```

## `/lottie/` - Lottie Animations
- Add `.json` Lottie animation files here
- Export from Figma, Adobe XD, or Lottie Files

**Example usage:**
```jsx
import Lottie from 'lottie-react'
import animation from '/assets/lottie/animation.json'

<Lottie animationData={animation} />
```

## `/video/` - Video Files
- Add `.mp4` or `.webm` videos here
- Use for background videos or hero content

**Example usage:**
```jsx
<video autoPlay muted loop className="w-full h-full">
  <source src="/assets/video/hero.mp4" type="video/mp4" />
</video>
```

## File Size Guidelines
- Images: Optimize with ImageOptim, TinyPNG, or similar
- Videos: Keep under 10MB, use H.264 codec for MP4s
- Lottie: Keep animations under 100KB when possible
- SVG: Minify SVG files before adding
