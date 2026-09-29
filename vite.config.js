import fs from 'node:fs'
import path from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer'

const SITE_URL = 'https://navygeeks.in'
// Keep in sync with TRAILING_SLASH in src/data/site.js
const TRAILING_SLASH = true

const toUrl = (route) => {
  const clean = route.replace(/^\/+|\/+$/g, '')
  if (!clean) return `${SITE_URL}/`
  return `${SITE_URL}/${clean}${TRAILING_SLASH ? '/' : ''}`
}

let renderedRoutes = []

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // Compress the (multi-MB) PNG/JPG screenshots and certificates at build time.
    ViteImageOptimizer({
      png: { quality: 75 },
      jpeg: { quality: 78 },
      jpg: { quality: 78 },
    }),
  ],
  ssgOptions: {
    // /research/index.html style output works on every static host.
    dirStyle: 'nested',
    includedRoutes(paths) {
      // drop the catch-all and the un-expanded /:slug templates - they are not real pages
      renderedRoutes = paths.filter((p) => !p.includes('*') && !p.includes(':'))
      return renderedRoutes
    },
    // vite-react-ssg preloads every imported image on every page (36 on each one, ~20 MB).
    // Drop them; images load lazily where they are actually used.
    onPageRendered(_route, html) {
      return html.replace(/<link rel="preload" as="image"[^>]*>/g, '')
    },
    onFinished(dir) {
      const today = new Date().toISOString().slice(0, 10)
      const urls = renderedRoutes.filter((p) => p.replace(/\//g, '') !== '404')

      const sitemap = [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
        ...urls.map((route) => {
          const isHome = route === '/' || route === ''
          return [
            '  <url>',
            `    <loc>${toUrl(route)}</loc>`,
            `    <lastmod>${today}</lastmod>`,
            `    <priority>${isHome ? '1.0' : '0.8'}</priority>`,
            '  </url>',
          ].join('\n')
        }),
        '</urlset>',
        '',
      ].join('\n')
      fs.writeFileSync(path.join(dir, 'sitemap.xml'), sitemap)

      // Static hosts (GitHub Pages, Netlify, Cloudflare Pages) serve /404.html for unknown URLs.
      const notFound = path.join(dir, '404', 'index.html')
      if (fs.existsSync(notFound)) fs.copyFileSync(notFound, path.join(dir, '404.html'))
    },
  },
})
