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
| `node scripts/make-og-image.mjs` | Link-preview card `public/og-image.png` |

`scripts/thumb-data.mjs` lists which projects get which thumbnail style. `frame: "none"` uses the screenshot as it is (VedicFlow, Bill Sonic, GeoScout IQ).

---

## 🔎 SEO

- Every route is pre-rendered at build time (`dist/<route>/index.html`), plus `sitemap.xml` and `404.html`.
- `src/components/Seo.jsx` sets the title, description, keywords, canonical URL, Open Graph and Twitter tags, and JSON-LD for each page.
- Browser-tab and Google titles lead with "Navyansh Kothari"; headings on the page stay short ("Experience", "Projects"). Schemas: Person, WebSite, ProfilePage, CollectionPage/ItemList, BreadcrumbList, ScholarlyArticle for papers, and SoftwareApplication, WebApplication, MobileApplication or CreativeWork for projects.
- Paper pages also carry Google Scholar `citation_*` meta tags.
- Canonical domain is **www**; the bare domain redirects to it. Submit `https://www.navygeeks.in/sitemap.xml` in Google Search Console.

---

## 🧭 Navigation behaviour

- Home project cards open a quick-view modal; the modal links to the full page.
- Home paper cards go straight to the paper page.
- **Back** returns to where you were: the page's Back button uses browser history when you came from inside the site, and both it and the browser back button restore the previous scroll position (`src/Layout.jsx`). Visitors arriving from Google see "All projects" or "All publications" instead.

---

## 📝 Recent changes

- **Research pages:** each of the 5 papers has an architecture diagram, a flowchart, results tables and plain-language key points. Added the IECS 2026 paper *On-Demand Multimodal RAG*.
- **CCTV IQ:** updated for the two-camera setup: first and last sighting on either camera, time inside minus breaks, a glass-zone mask, a score floor fitted to real data, a process supervisor, and *Ask Iris* (plain-English questions answered with Claude on AWS Bedrock). New diagram.
- **Discount Spend Optimization:** updated for the Databricks pipeline: one Excel config, 18 product lines, elasticity buckets, a two-model track for competing packs, MLflow tracking and a P&L simulator. New diagram.
- **Thumbnails:** VedicFlow and Bill Sonic back to their original images; GeoScout IQ uses a real app screenshot.
- **Back navigation:** fixed returning to the top of the home page. The Certifications section was scrolling to the top on load.
