# NavyGeeks-Website

Portfolio of **Navyansh Kothari**, AI/ML Engineer: experience, projects and IEEE research.

🔗 Live: https://www.navygeeks.in
🔗 Repo: https://github.com/navyansh1/NavyGeeks-Website

---

## 🧑‍💻 Tech Stack

- React + Vite 6 + Tailwind CSS
- vite-react-ssg + React Router: every route is pre-rendered to static HTML (SEO)
- framer-motion (respects the OS "reduce motion" setting)
- Vercel hosting (deploys on every push to `main`) + Vercel Web Analytics
- Node.js 24 (`engines.node` in `package.json`; Vercel stopped building with Node 20)
- sharp for generated images (thumbnails, diagrams, link-preview card)

---

## ⚙️ Setup

```bash
git clone https://github.com/navyansh1/NavyGeeks-Website.git
cd NavyGeeks-Website
npm install
npm run dev        # local dev server
npm run build      # static site in dist/ (+ sitemap.xml, 404.html)
npx vite preview   # serve the build
```

---

## 🗂️ Pages

| Route | What it shows |
|---|---|
| `/` | Home: top 6 projects, research, experience, skills, certifications, contact |
| `/projects/` and `/projects/<slug>/` | All projects; each has its own page |
| `/research/` and `/research/<slug>/` | All papers; each has its own page |
| `/experience/`, `/education/`, `/skills/`, `/certifications/`, `/about/` | One page per section |

Project and paper pages use the same blocks (`src/components/DetailBlocks.jsx`), with no paragraphs:

- **At a glance** table (problem, idea, result, tech)
- **Flow**: a flowchart that is a row on desktop and a column on phones (`Flow.jsx`)
- **Key points**: bullet list
- **Results**: comparison tables
- **Architecture**: SVG diagram, which opens full size when tapped
- Collapsed **details** for the extras, then tags

---

## ✏️ Adding or editing content

All content lives in `src/data/`. Adding an entry there creates its page, sitemap entry and structured data.

| File | Holds |
|---|---|
| `projects.js` | Projects. `featured` projects show first; the home page shows the first 6. `isPrivate` hides links; `repoName` names a private repo without linking it; `demo` adds a live-demo row. |
| `research.js` | Papers (newest first): venue, DOI, IEEE link, facts, flow, key points, results tables, diagram, details. `authors` feeds Google Scholar tags only; pages don't print it. A paper without `link` hides the IEEE button. |
| `certifications.js` | Certificates |
| `site.js` | Domain (`https://www.navygeeks.in`), name, socials, schema helpers. Keep `vite.config.js` in sync if the domain changes. |

---

## 🖼️ Generated images

| Command | Makes |
|---|---|
| `node scripts/make-diagrams.mjs` | Architecture diagrams in `src/assets/diagrams/` (projects and papers `paper-*.svg`) |
| `node scripts/make-thumbnails.mjs` | Project thumbnails: the diagram, or a screenshot from `scripts/thumb-sources/` in a browser or phone frame. No project name on the image. |
| open `scripts/og-image/og-image.html` at 1200×630 and screenshot | Link-preview card `public/og-image.jpg` (keep under ~250 KB for WhatsApp) |

`scripts/thumb-data.mjs` lists which projects get which thumbnail style. `frame: "none"` uses the screenshot as it is (VedicFlow, Bill Sonic).

---

## 🔎 SEO

- Every route is pre-rendered at build time (`dist/<route>/index.html`), plus `sitemap.xml` and `404.html`.
- `src/components/Seo.jsx` sets the title, description, keywords, canonical URL, Open Graph and Twitter tags, and JSON-LD for each page.
- Browser-tab and Google titles lead with "Navyansh Kothari"; headings on the page stay short ("Experience", "Projects"). Schemas: Person, WebSite, ProfilePage, CollectionPage/ItemList, BreadcrumbList, ScholarlyArticle for papers, and SoftwareApplication, WebApplication, MobileApplication or CreativeWork for projects.
- Paper pages also carry Google Scholar `citation_*` meta tags. The Person schema links ORCID (`0009-0002-1467-8595`, also as `identifier`) and the Google Scholar profile in `sameAs`; both appear on the research sections and in the footer.
- Canonical domain is **www**; the bare domain redirects to it. Submit `https://www.navygeeks.in/sitemap.xml` in Google Search Console.

---

## 🌌 Background

A looping aurora video sits behind every page (`src/components/AuroraBackground.jsx`, styles in `src/index.css` under `.aurora-bg`).

- **Colours:** traditional Japanese colours: mint (Byakuroku), teal (Seiheki), blue (Ruri) and a soft pink glow (Momo, Nadeshiko, Toki) on a dark navy base. Yellow stays the only accent colour for text and buttons.
- **Loop:** 3.5 s forward then 3.5 s in reverse (7 s total), eased at each end, so it never jumps. Two versions in `src/assets/bg/`: portrait for phones and landscape for wider screens, each as WebM plus MP4 (Safari), 60 to 480 KB.
- **Loading:** a still poster frame is set in CSS, so it shows instantly. The video loads only after the page has finished loading, so it doesn't slow the page down. If the video can't autoplay (e.g. iPhone Low Power Mode), the poster stays.
- **Grain:** a still noise tile (`grain.png`) on top at 10% opacity. It isn't baked into the video, because noise compresses badly; it also hides colour banding.
- **Reduce motion:** visitors with "reduce motion" turned on get the still poster only.
- **iPhone (Safari, Chrome, Google app):** all use Apple's WebKit engine. The video gets the `muted` attribute set directly (React only sets the property, and iOS won't autoplay without the attribute) and has no `autoplay` attribute (in Low Power Mode iOS always draws a play button on videos that have it, and CSS can't hide it). It is started with `play()` instead; if iOS refuses, the video is removed and the still poster with grain stays. It stays hidden until it is actually playing, and the background sits in layer 0 with the page in layer 1 (`.page-layer`) instead of a negative z-index, which iOS could draw over the page. iOS 26 Safari clips `position: fixed` elements to the area between its toolbars (a bare band showed when the toolbar shrank), so the aurora is not fixed: `.aurora-track` is an absolute layer over the whole page and `.aurora-bg` inside it is `position: sticky`, overshooting the screen by 80px at each end, which Safari draws behind its toolbars like normal content (the approach React Spectrum and MUI use). Keep `viewport-fit=cover` in `index.html`. Bottom-fixed controls add `env(safe-area-inset-bottom)` to stay clear of the home indicator. Safari 26 ignores `theme-color`; where it can't show the page behind its bars it uses the `html`/`body` background (the aurora's edge tone `#2F3D42`). Never give the full-screen aurora layer or any fixed element at the screen edges a background-color: Safari paints its bars with it (that made them black, and a 1px tint strip showed as a visible line). Video, images and absolutely positioned children are ignored for tinting. The page declares `color-scheme: dark` (meta tag and CSS) so in-app browsers such as the Google app don't recolour the text.
- **Between pages:** it lives in the shared `Layout`, so it keeps playing without restarting as you move between pages.
- **Re-rendering:** the videos were rendered from an HTML/CSS aurora (headless Chromium, 30 fps) and encoded with ffmpeg (H.264 CRF 19, VP9 CRF 30). Keep the ping-pong loop and the posters in sync if you change them.

---

## 🧭 Navigation behaviour

- **Back links** (top and bottom of every page except home) always go **up one level**: paper or project page → Research or Projects → Home, labelled "Back to …". When the previous step in the tab's history is that parent page, they step back in history (keeping your scroll position there); otherwise they link to the parent. `src/navTrail.js` records which path sits at each history step, and the decision is made at click time. (An earlier version could loop between a paper and Research when a paper was opened directly.)

- Home project cards open a quick-view modal; the modal links to the full page.
- Home paper cards go straight to the paper page.
- **Back** returns to where you were: the page's Back button uses browser history when you came from inside the site, and both it and the browser back button restore the previous scroll position (`src/Layout.jsx`). Visitors arriving from Google see "All projects" or "All publications" instead.

---

## ⚡ Performance notes

- **Font:** Space Grotesk is self-hosted via `@fontsource-variable/space-grotesk` (imported in `src/main.jsx`), not Google Fonts, whose stylesheet blocked the first paint on phones for about a second. `Layout` preloads only the Latin file; `vite.config.js` strips vite-react-ssg's automatic preloads of the Vietnamese and Latin Extended files.
- **Hero photo:** served through `<picture>` as AVIF, then WebP (400/700/900 px wide, `src/assets/profile/profpic-*.{avif,webp}`), with the JPG as fallback. Phones download about 50 KB instead of 101 KB. If you change the photo, regenerate those sizes.

---

## 📝 Recent changes

- **Background:** new animated aurora video background with film grain on every page (see Background). Removed the old purple glow.
- **Certifications:** added AWS Certified Solutions Architect - Associate (Nov 2026). All certification cards are now the same size.
- **Back button:** a Back link at the top and bottom of every page except home.
- **SEO:** crawlable nav links, shorter paper titles, all descriptions within 160 characters, `public/llms.txt` for AI search tools, a faster-loading hero photo, and smaller logos.
- **Content:** an "About this project" section on 11 smaller project pages, a results table for the fraud project, "Where these skills are used" on Skills and "Beyond the classroom" on Education.

- **Research pages:** each of the 5 papers has an architecture diagram, a flowchart, results tables and plain-language key points. Added the IECS 2026 paper *On-Demand Multimodal RAG*.
- **CCTV IQ:** updated for the two-camera setup: first and last sighting on either camera, time inside minus breaks, a glass-zone mask, a score floor fitted to real data, a process supervisor, and *Ask Iris* (plain-English questions answered with Claude on AWS Bedrock). New diagram.
- **Discount Spend Optimization:** updated for the Databricks pipeline: one Excel config, 18 product lines, elasticity buckets, a two-model track for competing packs, MLflow tracking and a P&L simulator. New diagram.
- **Thumbnails:** VedicFlow and Bill Sonic back to their original images; GeoScout IQ uses its architecture diagram, drawn in the GeoScout app's own colours (light theme, Ganit indigo and orange).
- **Back navigation:** fixed returning to the top of the home page. The Certifications section was scrolling to the top on load.
