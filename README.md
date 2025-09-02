# Prerana Gowda – Portfolio & Blog

Static, fast, and accessible personal site showcasing projects, timeline, blog posts, and contact details. Built with vanilla HTML/CSS/JS (no bundler) for friction‑free hosting on GitHub Pages.

## ✨ Key Features
- Progressive enhancement: core content works without JavaScript; JS adds animation, filtering, theming.
- Data‑driven content: projects, blog posts, and timeline sourced from small ES module data files in `data/`.
- Accessible navigation: keyboard focus states, reduced‑motion awareness, ARIA attributes, semantic HTML.
- Responsive design: mobile‑first layout, adaptive grid tiles, collapsible timeline details.
- Theme toggle with persistence (prefers‑color‑scheme aware, localStorage fallback).
- Scroll quality of life: active section highlighting + scroll progress bar + reveal animations.
- Blog utilities: tag filtering, multi‑tag URL state (`?tag=a&tag=b&q=search&page=2`), pagination, reading‑time estimation.
- Contact form with client‑side validation (static-friendly; simulates send / mailto fallback when JS disabled).
- Lightweight interactions (tilt effect, hero reveal mode, lazy image loader, accessible timeline accordion).

## 📁 Structure Overview
```
index.html          # Landing page (hero, about, journey, featured projects, blog teasers, skills, contact)
projects.html       # All projects listing (tiles / filtering logic in assets/js/projects.js if extended)
blog.html           # Blog index page (filters, search, pagination, reading time)
tags.html           # (Optional) Tag-centric browsing (extendable)
blog/               # Individual blog post HTML (generated or hand-authored)
projects/           # Individual project detail pages
data/               # ES module content sources
	blogPosts.js      # Array of post metadata (slug, title, date, tags, summary)
	projects.js       # Array of project objects (slug, title, skills, highlight, links, etc.)
	timeline.js       # Array powering the journey/timeline section
assets/
	css/style.css     # Main styles (imported by root `style.css` if split) + design tokens
	js/               # Page-specific enhancement scripts
	img/              # Images (profile photo, placeholders)
	resume/           # Downloadable résumé PDF
script.js           # Site-wide enhancements (nav, theme, animations, filters, form, lazy load)
style.css           # Primary stylesheet (can aggregate or import from assets/css)
rss.xml             # Basic RSS feed skeleton (update when adding posts)
```

## 🧩 Content Model
Update site content via the `data/*.js` arrays instead of editing multiple HTML fragments:
- Add a blog post: create `blog/posts/<slug>.html`, then append an object to `data/blogPosts.js` with matching `slug`.
- Add a project: add an object to `data/projects.js`; create a detail page in `projects/` (optional). Set `highlight: true` for homepage feature.
- Update timeline: modify `data/timeline.js` (ordered newest → oldest or vice versa and adjust display logic if needed).

## 🚀 Local Preview
Because everything is static, you can open `index.html` directly. For proper ES module loading and future relative fetches, use a local server:

```bash
# Python 3
python3 -m http.server 8000
# or Node (if installed)
npx serve .
```
Then visit: http://localhost:8000

## 📦 Deployment (GitHub Pages)
1. Repository name: `<username>.github.io` (already structured for that) or enable Pages on a different repo (Root / `main`).
2. Push to the default branch (`main` or `develop`→`main`).
3. In Settings → Pages, set Source to the root. Save.
4. (Optional) Add a custom domain + enforce HTTPS.

## 🎨 Customization Guide
| Area | How to Customize |
|------|------------------|
| Colors / theme | Adjust CSS custom properties (variables block) in `style.css` or `assets/css/style.css` |
| Fonts | Modify Google Fonts link in `<head>` (`index.html` + others) |
| Metrics | Edit the `<ul class="metrics">` list in `index.html` |
| Technology badges | Update `.meta-badges` spans in hero or generate dynamically from `projects.js` |
| Timeline entries | Edit `data/timeline.js` (consider sorting logic if you change order) |
| Blog tags | Add `tags` arrays per post object in `data/blogPosts.js` |
| Animations | Tweak reveal/tilt thresholds & transforms in `script.js` and related CSS classes |
| Resume link | Replace file under `assets/resume/` and update anchor text |

## ♿ Accessibility & UX Notes
- Semantic headings, landmark regions (`<header>`, `<main>`, `<nav>`, `<footer>`).
- `prefers-reduced-motion` respected for smooth scrolling & animations fallbacks.
- Keyboard operable timeline (`<details>` + custom key handlers) & nav toggle.
- High contrast theme option via dark mode toggle; adapt variables for WCAG targets.
- Focus states preserved (avoid removing outline without replacement).

## ⚡ Performance Considerations
- No framework runtime; minimal blocking JS (single `script.js`).
- Lazy loading pattern for images using `IntersectionObserver` (progressive enhancement fallback).
- Avoids layout shift by reserving image dimensions where possible.
- Inline critical hero content is static; you can extract non-critical CSS to async load if size grows.

### Suggested Next Optimizations
1. Generate an optimized favicon + manifest (PWA metadata).
2. Add `<meta name="description">` and Open Graph / Twitter meta tags.
3. Preload critical font weights; subset fonts if CLS/FOIT becomes noticeable.
4. Add build script (optional) for minifying CSS/JS + generating RSS from `data/blogPosts.js`.
5. Integrate simple service worker for offline caching (opt-in).

## 🛠 Extending Functionality
| Goal | Idea |
|------|------|
| Automated RSS | Script to iterate `data/blogPosts.js` and template into `rss.xml` |
| Markdown posts | Add a tiny build step (e.g., `marked` in Node) to convert `.md` → `blog/posts/*.html` |
| Search | Precompute a JSON index (title + summary) for client-search without crawling DOM |
| Analytics | Add privacy-friendly analytics (e.g., Plausible) respecting DNT |
| Dark images | Provide `prefers-color-scheme` media queries or `picture` sources |

## 🧪 Testing (Manual Checklist)
- Navigation toggle works on mobile viewport.
- Timeline: only one entry expanded after interaction; keyboard Enter/Space toggles.
- Tag filters update URL parameters; refreshing preserves state.
- Contact form: validation errors appear; success message after simulated send.
- Theme toggle persists across reload (localStorage key: `theme`).
- Reduced motion: disable smooth scroll + remove highlight animation grace period if pref reduced.

## 🔐 Privacy / Security Notes
- No external analytics or trackers by default.
- Contact form doesn't send data server-side (static); modify to integrate with a form backend (e.g., Formspree) if desired.

## 🗺 Roadmap (Short List)
- [ ] Scripted RSS regeneration.
- [ ] Light build pipeline (minify, hash assets, generate sitemaps).
- [ ] Accessibility audit with axe + Lighthouse pass ≥ 95.
- [ ] Add alt text audit script for `assets/img/*`.
- [ ] Optional MD-based blog generation.

## 🤝 Contributing
Open an issue or submit a PR (small, focused changes preferred). For structural changes, outline rationale in the PR description.

## 📄 License
Personal portfolio content (text / images) © 2025 Prerana Gowda. Source code licensed under MIT unless otherwise noted. Replace project code licensing if you embed proprietary snippets.

---

Questions or ideas? Reach out via the contact section or open an issue.
