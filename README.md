
# NavyGeeks-Website

**React Portfolio Website for NavyGeeks**  
A modern, fast, and responsive personal portfolio built using **React**, **Vite**, and **Tailwind CSS**.

🔗 Live Website: https://navygeeks.in  
🔗 GitHub Repository: https://github.com/navyansh1/NavyGeeks-Website

---


## 🧑‍💻 Tech Stack

- React
- Vite
- Tailwind CSS
- vite-react-ssg + React Router (every route is pre-rendered to static HTML for SEO)
- JavaScript (ES6+)
- HTML5
- CSS3

---

## ⚙️ Setup & Installation

```bash
git clone https://github.com/navyansh1/NavyGeeks-Website.git
cd NavyGeeks-Website
npm install
npm run dev


---

## 🔎 SEO

- Each route is pre-rendered at build time (`npm run build` → `dist/<route>/index.html`), plus `sitemap.xml` and `404.html`.
- Content lives in `src/data/` (`research.js`, `projects.js`, `certifications.js`). Adding a paper or project there creates its page, sitemap entry and structured data automatically.
- `src/components/Seo.jsx` sets the title, description, canonical, Open Graph / Twitter tags and JSON-LD per page. Papers also get Google Scholar `citation_*` tags.
- Site-wide settings (domain, socials, trailing-slash style) are in `src/data/site.js`; keep `vite.config.js` in sync if you change the domain.
- Regenerate the link-preview card with `node scripts/make-og-image.mjs`.
