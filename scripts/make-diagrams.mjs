// Generates the architecture diagrams in src/assets/diagrams/ (SVG). Run: node scripts/make-diagrams.mjs
import fs from 'node:fs'

const C = { bg: '#162121', box: '#213130', line: '#3E5654', text: '#E5E7EB', muted: '#9CA3AF', accent: '#EAB308', accentBg: '#3A3314' }
const FONT = "DejaVu Sans, Helvetica, Arial, sans-serif"
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;')

// box with a bold title and wrapped sub-lines
function box(x, y, w, h, title, lines = [], hot = false) {
  const t = lines.map((l, i) => `<text x="${x + 16}" y="${y + 52 + i * 20}" font-size="15" fill="${C.muted}">${esc(l)}</text>`).join('')
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="12" fill="${hot ? C.accentBg : C.box}" stroke="${hot ? C.accent : C.line}" stroke-width="${hot ? 2 : 1.5}"/>
  <text x="${x + 16}" y="${y + 28}" font-size="17" font-weight="bold" fill="${hot ? C.accent : C.text}">${esc(title)}</text>${t}`
}
const arrow = (x1, y1, x2, y2) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${C.muted}" stroke-width="2" marker-end="url(#a)"/>`
const label = (x, y, s, size = 13, color = C.muted, weight = 'normal') => `<text x="${x}" y="${y}" font-size="${size}" fill="${color}" font-weight="${weight}" letter-spacing="1">${esc(s)}</text>`

function svg(title, subtitle, body) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1280" height="720" viewBox="0 0 1280 720" font-family="${FONT}">
  <defs><marker id="a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="${C.muted}"/></marker></defs>
  <rect width="1280" height="720" fill="${C.bg}"/>
  <text x="48" y="64" font-size="30" font-weight="bold" fill="${C.text}">${esc(title)}</text>
  <text x="48" y="94" font-size="16" fill="${C.muted}">${esc(subtitle)}</text>
  ${body}</svg>`
}

// GeoScout IQ uses its own app theme (from its styles.css): light panels, Ganit indigo and orange.
const G = { bg: '#f6f7fb', panel: '#ffffff', border: '#c2c8d6', text: '#1a1d2b', muted: '#6b7390', blue: '#1a00d9', blueBg: '#eeebfd', orange: '#fe6e06', orangeBg: '#fff1e6' }
function gbox(x, y, w, h, title, lines = [], tone) {
  const stroke = tone === 'blue' ? G.blue : tone === 'orange' ? G.orange : G.border
  const fill = tone === 'blue' ? G.blueBg : tone === 'orange' ? G.orangeBg : G.panel
  const head = tone === 'blue' ? G.blue : tone === 'orange' ? G.orange : G.text
  const t = lines.map((l, i) => `<text x="${x + 16}" y="${y + 52 + i * 20}" font-size="15" fill="${G.muted}">${esc(l)}</text>`).join('')
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="12" fill="${fill}" stroke="${stroke}" stroke-width="${tone ? 2 : 1.5}"/>
  <text x="${x + 16}" y="${y + 28}" font-size="17" font-weight="bold" fill="${head}">${esc(title)}</text>${t}`
}
const garrow = (x1, y1, x2, y2) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${G.muted}" stroke-width="2" marker-end="url(#g)"/>`
const glabel = (x, y, s) => `<text x="${x}" y="${y}" font-size="13" fill="${G.orange}" font-weight="bold" letter-spacing="1">${esc(s)}</text>`
function gsvg(subtitle, body) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1280" height="720" viewBox="0 0 1280 720" font-family="${FONT}">
  <defs><marker id="g" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="${G.muted}"/></marker></defs>
  <rect width="1280" height="720" fill="${G.bg}"/>
  <text x="48" y="64" font-size="30" font-weight="bold"><tspan fill="${G.blue}">GeoScout </tspan><tspan fill="${G.orange}">IQ</tspan></text>
  <text x="48" y="94" font-size="16" fill="${G.muted}">${esc(subtitle)}</text>
  ${body}</svg>`
}

const diagrams = {
  'discount-optimization': svg('Discount Spend Optimization', 'One config-driven pipeline on Databricks, from raw data to a P&L simulator', `
    <rect x="48" y="128" width="1184" height="50" rx="12" fill="${C.accentBg}" stroke="${C.accent}" stroke-dasharray="6 6"/>
    ${label(72, 159, 'ONE EXCEL CONFIG', 13, C.accent, 'bold')}
    <text x="232" y="159" font-size="16" fill="${C.text}">drives every stage: product lines, queries, features, sweep range. Change a cell, not the code.</text>
    ${box(48, 206, 216, 190, '1. Data pull', ['SQL warehouse', 'sales, discounts, price', 'retail audit', 'search share', 'household reach'])}
    ${arrow(264, 301, 290, 301)}
    ${box(292, 206, 216, 190, '2. Merge', ['one table per product', 'state × pack × channel', 'by month', '+ weather, festivals'])}
    ${arrow(508, 301, 534, 301)}
    ${box(536, 206, 216, 190, '3. Model', ['DTW clusters', 'feature sweep', 'XGBoost per cluster', 'SHAP explanations', 'saturation curves'], true)}
    ${arrow(752, 301, 778, 301)}
    ${box(780, 206, 216, 190, '4. Simulate', ['reuses saved models', '±0.5 pt elasticity', 'Low / Medium / High', 'full what-if sweep'], true)}
    ${arrow(996, 301, 1022, 301)}
    ${box(1024, 206, 208, 190, '5. Dashboards', ['Databricks Apps', 'EDA, model results', 'P&L simulator runs', 'the real models'])}
    ${box(48, 424, 580, 116, 'Two-model track for packs that compete', ['model 1: how sales split between small and large packs', 'model 2: total sales, the headline (R² 0.81-0.97)'])}
    ${box(652, 424, 580, 116, 'Tracked and stored', ['MLflow: nested run per product, a model per cluster', 'Azure Blob: one folder per quarterly data release'])}
    <rect x="48" y="568" width="1184" height="96" rx="12" fill="none" stroke="${C.line}" stroke-dasharray="6 6"/>
    ${label(72, 604, 'SCALE', 13, C.accent, 'bold')}
    <text x="200" y="604" font-size="16" fill="${C.text}">18 product lines through one pipeline, refreshed every quarter.</text>
    <text x="200" y="632" font-size="16" fill="${C.text}">Before: separate hand-edited notebooks per product. Re-run only the stage that changed.</text>
  `),

  'ocr-benchmark': svg('OCR for Indian Loan Documents', 'The pipeline the benchmark recommended', `
    ${label(48, 140, 'TEXT PAGES')}
    ${box(48, 152, 240, 96, 'Page image', ['trim blank margins'])}
    ${arrow(288, 200, 336, 200)}
    ${box(338, 152, 330, 96, 'Tesseract on AWS Lambda', ['English + Indian scripts', 'OMP_THREAD_LIMIT=1: 2.5-2.9× faster'], true)}
    ${arrow(668, 200, 716, 200)}
    ${box(718, 152, 514, 96, 'Text with a box per word', ['103/108 values (Textract 104/108), ₹4.90 vs ₹142.50', 'per 1,000 pages'])}
    ${label(48, 300, 'TABLE PAGES')}
    ${box(48, 312, 240, 188, 'Page image', ['erase table lines', '(word detection 89% → 98%)'])}
    ${arrow(288, 340, 336, 340)}
    ${box(338, 312, 330, 76, 'Tesseract', ['every word and its position'])}
    ${arrow(288, 440, 336, 440)}
    ${box(338, 404, 330, 96, 'Qwen3-VL on Amazon Bedrock', ['reads tables as rows and', 'columns (30 s timeout, 1 retry)'], true)}
    ${arrow(668, 350, 716, 400)}
    ${arrow(668, 452, 716, 420)}
    ${box(718, 350, 250, 110, 'Match', ['rows to OCR lines,', 'cells to words'])}
    ${arrow(968, 405, 1016, 405)}
    ${box(1018, 350, 214, 110, 'Table cells', ['model text +', 'page position'])}
    ${label(48, 560, 'ON 30 UNSEEN TABLE PAGES', 13, C.accent, 'bold')}
    <text x="48" y="588" font-size="16" fill="${C.text}">178/183 values right vs AWS Textract Tables 163/183, at ~₹225-450 instead of ₹1,425 per 1,000 pages.</text>
    <text x="48" y="614" font-size="16" fill="${C.text}">Trade-off: ~17 s per table page instead of 6.5 s, so it suits batch work.</text>
  `),

  'cctv-iq': svg('CCTV IQ: Face ID Attendance', 'Two doorway cameras, one attendance record per person per day', `
    ${box(48, 140, 200, 118, 'Doorway cameras', ['entry cam: inside,', 'looking out', 'lobby cam: looking in'])}
    ${arrow(248, 199, 284, 199)}
    ${box(286, 140, 200, 118, 'Capture threads', ['one per camera', 'stall watchdog', 'auto camera reboot'])}
    ${arrow(486, 199, 522, 199)}
    ${box(524, 140, 200, 118, 'Ignore zones', ['desks and the clear', 'glass strip masked', 'before any AI runs'])}
    ${arrow(724, 199, 760, 199)}
    ${box(762, 140, 220, 118, 'Detect + embed', ['SCRFD + antelopev2', 'both on the Intel iGPU', '(OpenVINO)'], true)}
    ${arrow(982, 199, 1018, 199)}
    ${box(1020, 140, 212, 118, 'Gallery match', ['182 people', 'score floor 0.41', 'runner-up margin'], true)}
    ${arrow(1126, 258, 1126, 300)}
    ${box(860, 302, 372, 124, 'Attendance logic', ['clock in = first sighting, either camera', 'clock out = last sighting, either camera', 'time inside = span minus breaks seen'], true)}
    ${arrow(860, 364, 808, 364)}
    ${box(560, 302, 246, 124, 'Storage', ['SQLite on local disk', 'face photo at every', 'clock-in and clock-out'])}
    ${arrow(560, 364, 508, 364)}
    ${box(48, 302, 458, 124, 'Outputs', ['live dashboard + one Excel file per day', 'Ask Iris: plain-English questions; Claude', 'Haiku 4.5 on Bedrock writes one SQL query'])}
    ${label(48, 480, 'WHAT THE MEASUREMENTS SHOWED', 13, C.accent, 'bold')}
    ${box(48, 496, 370, 136, '9.86 → 0.31 s per frame', ['both models moved from the CPU', 'to the idle Intel iGPU,', 'with identical scores'])}
    ${box(442, 496, 370, 136, 'Threshold from real data', ['a day checked by hand: 0.41', 'removed all 24 false rows', 'and lost no real person'])}
    ${box(836, 496, 396, 136, 'Built to keep running', ['a supervisor restarts it in ~15 s', 'switching the cameras to H.264', 'fixed 60-73% broken frames'])}
  `),

  'masker-pii-redaction': svg('Masker: PII Redaction', 'Pixel-accurate redaction of medical documents', `
    ${box(48, 200, 220, 110, 'Upload', ['image (JPG, PNG)', 'or PDF, any pages'])}
    ${arrow(268, 255, 316, 255)}
    ${box(318, 200, 260, 110, 'Google Vision OCR', ['exact pixel box for', 'every word'], true)}
    ${arrow(578, 255, 626, 255)}
    ${box(628, 200, 280, 110, 'Gemini 2.5 Flash-Lite', ['reads the word list (text', 'only) and flags the PII'], true)}
    ${arrow(908, 255, 956, 255)}
    ${box(958, 200, 274, 110, 'Black out', ['fill the OCR box of each', 'flagged word, every page'])}
    ${arrow(1095, 310, 1095, 380)}
    ${box(958, 382, 274, 110, 'Redacted file', ['same format out as in', '(PDF in, PDF out)'])}
    ${box(48, 382, 860, 110, 'Why split the job', ['A vision LLM reads documents well but its bounding boxes drift between runs, which can leave a field', 'partly exposed. OCR owns the geometry, the LLM only decides which words are PII, so the redaction', 'lands on the exact pixels every time.'])}
    ${label(48, 560, 'DETECTS', 13, C.accent, 'bold')}
    <text x="48" y="588" font-size="16" fill="${C.text}">names · addresses · phone numbers · emails · dates of birth · patient IDs · Aadhaar / SSN · insurance numbers · signatures</text>
    ${label(48, 640, 'RUNS ON', 13, C.accent, 'bold')}
    <text x="48" y="668" font-size="16" fill="${C.text}">Firebase Hosting + Cloud Functions</text>
  `),

  'geoscout-iq': gsvg('Where to open the next ATM, branch, store or warehouse in India', `
    ${gbox(48, 150, 200, 150, 'Ask', ['a place in India', 'the industry', 'your company', '(optional)'])}
    ${garrow(248, 225, 284, 225)}
    ${gbox(286, 150, 260, 300, 'Data sources', ['Google Places: competitors', 'WorldPop: population', 'NASA night lights: activity', 'OpenStreetMap: malls,', 'transit, schools, land', 'you cannot build on', 'Property listings: rents', 'Google Search: upcoming', 'metro, roads, projects'])}
    ${garrow(546, 245, 582, 245)}
    ${gbox(584, 150, 300, 190, 'H3 hex scoring', ['~0.7 sq km tiles, each scored', 'demand 45% · access 25%', 'open space 15% · growth 15%', 'water and no-build land removed', 'same input, same score'], 'blue')}
    ${garrow(734, 340, 734, 368)}
    ${gbox(584, 370, 300, 80, 'Gemini grounding agents', ['nearby context and the summary'], 'orange')}
    ${garrow(884, 245, 920, 245)}
    ${garrow(884, 410, 920, 410)}
    ${gbox(922, 150, 310, 300, 'Answer', ['colour-coded hex heatmap', 'competitor and own-store pins', 'what is nearby, per tile', 'property listings for sale', 'summary with a star rating', 'GO / CAUTION / AVOID'])}
    ${glabel(48, 510, 'WHY IT WORKS')}
    ${gbox(48, 526, 370, 136, 'About 30 seconds', ['from a place name to a', 'scored map and a decision'])}
    ${gbox(442, 526, 370, 136, 'Scores you can check', ['the weights and maths are shown,', 'nothing is a black box'])}
    ${gbox(836, 526, 396, 136, 'Built for banks and FMCG', ['ATMs and branches,', 'stores and warehouses'])}
  `),
  'paper-odm-rag': svg('On-Demand Multimodal RAG', 'Search text cheaply, then show the LLM only the pages that matter', `
    ${label(48, 140, 'ONCE PER DOCUMENT')}
    ${box(48, 152, 220, 96, 'PDF', ['165-page manual', 'diagrams, tables'])}
    ${arrow(268, 200, 306, 200)}
    ${box(308, 152, 220, 96, 'Text + page no.', ['PyMuPDF'])}
    ${arrow(528, 200, 566, 200)}
    ${box(568, 152, 220, 96, 'Chunks', ['1000 chars', '200 overlap'])}
    ${arrow(788, 200, 826, 200)}
    ${box(828, 152, 404, 96, 'FAISS index', ['Google embedding-001, 768-dim', 'every chunk keeps its page number'])}
    ${label(48, 296, 'PER QUESTION')}
    ${box(48, 308, 220, 110, 'Question', ['from Streamlit', 'via FastAPI'])}
    ${arrow(268, 363, 306, 363)}
    ${box(308, 308, 220, 110, 'Search', ['top 3 chunks', 'L2 distance'])}
    ${arrow(528, 363, 566, 363)}
    ${box(568, 308, 220, 110, 'Pick pages', ['unique page', 'numbers only'])}
    ${arrow(788, 363, 826, 363)}
    ${box(828, 308, 190, 110, 'Render', ['those pages', 'only, 150 DPI'], true)}
    ${arrow(1018, 363, 1040, 363)}
    ${box(1042, 308, 190, 110, 'Gemini 2.0', ['Flash reads the', 'page images'], true)}
    ${label(48, 480, 'RESULTS ON 50 QUESTIONS', 13, C.accent, 'bold')}
    ${box(48, 496, 280, 136, '94.2% accuracy', ['whole-document: 96.8%', 'text-only RAG: 67.4%'])}
    ${box(348, 496, 280, 136, '$0.014 per query', ['97.3% cheaper than', 'sending the whole PDF'])}
    ${box(648, 496, 280, 136, '2.8 s per answer', ['89.5% faster than', 'OCR pipelines (26.7 s)'])}
    ${box(948, 496, 284, 136, '0.8 MB sent', ['instead of 28.4 MB', 'cost nearly flat up', 'to 2,000 pages'])}
  `),

  'paper-selective-rag': svg('Selective Embedding Update for RAG', 'Replace only the changed document, never the whole index', `
    ${box(48, 150, 200, 110, 'Upload PDF', ['Streamlit UI'])}
    ${arrow(248, 205, 286, 205)}
    ${box(288, 150, 220, 110, 'Already in S3?', ['one HEAD request', 'O(1) check'], true)}
    ${arrow(508, 205, 546, 205)}
    ${label(512, 190, 'yes', 12)}
    ${box(548, 150, 220, 110, 'Delete old chunks', ['1 delete-by-query', 'instead of 250'], true)}
    ${arrow(398, 260, 398, 300)}
    ${label(408, 288, 'no: new file', 12)}
    ${arrow(768, 205, 806, 205)}
    ${box(808, 150, 200, 110, 'Save to S3', ['versioned,', 'so it can roll back'])}
    ${arrow(1008, 205, 1030, 205)}
    ${box(1032, 150, 200, 110, 'Extract + chunk', ['PyPDF', '1000 / 200'])}
    ${arrow(1132, 260, 1132, 300)}
    ${box(288, 302, 220, 100, 'Process new', ['same steps, no delete'])}
    ${box(912, 302, 320, 100, 'Titan embeddings', ['Bedrock, 1536-dim, batched'])}
    ${arrow(912, 352, 830, 352)}
    ${box(548, 302, 280, 100, 'OpenSearch', ['kNN (HNSW), 1 bulk insert'], true)}
    ${label(48, 440, 'QUESTIONS KEEP WORKING DURING AN UPDATE')}
    <text x="48" y="468" font-size="16" fill="${C.text}">question → Titan embedding → kNN search in OpenSearch → Claude 3 Haiku on Bedrock → answer</text>
    ${label(48, 510, 'RESULTS (50 PDFs, 5-150 PAGES)', 13, C.accent, 'bold')}
    ${box(48, 526, 370, 140, '84.9% faster updates', ['150 pages: 625.8 s → 94.3 s'])}
    ${box(442, 526, 370, 140, '99.6% fewer calls', ['500 requests → 2'])}
    ${box(836, 526, 396, 140, 'Same answer quality', ['Recall@5 0.87, Precision@5 0.82', '~40% less memory'])}
  `),

  'paper-otitis': svg('Otitis Media Ensemble', 'Four CNNs and the patient history, combined into one diagnosis', `
    ${box(48, 150, 240, 110, 'Otoscope image', ['224×224, ImageNet', 'normalised, augmented'])}
    ${box(48, 300, 240, 110, 'Patient details', ['age, symptoms,', 'history, treatments'])}
    ${arrow(288, 205, 356, 290)}
    ${arrow(288, 355, 356, 300)}
    ${box(358, 140, 300, 62, 'RegNet-X 16GF', ['fine texture and colour'])}
    ${box(358, 212, 300, 62, 'RegNet-X 3.2GF', ['accurate and efficient'])}
    ${box(358, 284, 300, 62, 'MobileNetV2', ['fast, 15 ms per image'])}
    ${box(358, 356, 300, 62, 'ResNeXt50 32×4d', ['subtle look-alike patterns'])}
    ${arrow(658, 280, 716, 280)}
    ${box(718, 214, 240, 132, 'Weighted vote', ['weights learned', 'on validation data'], true)}
    ${arrow(958, 280, 1016, 280)}
    ${box(1018, 214, 214, 132, 'Diagnosis', ['acute otitis media', 'chronic otitis media', 'normal / earwax'], true)}
    ${label(48, 480, 'RESULTS', 13, C.accent, 'bold')}
    ${box(48, 496, 280, 136, '92.56% accuracy', ['best single model:', 'ResNeXt50 at 91.5%'])}
    ${box(348, 496, 280, 136, '96.12% sensitivity', ['few missed infections', 'specificity 87.78%'])}
    ${box(648, 496, 280, 136, 'Earwax errors', ['12.8% → 4.2%', 'fewer needless', 'antibiotics'])}
    ${box(948, 496, 284, 136, 'Agrees with ENTs', ['κ = 0.85 on 200 cases', '2.1 GB, 180 images/min'])}
  `),

  'paper-efficientnet-dr': svg('EfficientNet-DR', 'A small CNN that grades diabetic retinopathy on low-end devices', `
    ${box(48, 150, 200, 120, 'Retina scans', ['IDRiD dataset', 'Indian population'])}
    ${arrow(248, 210, 286, 210)}
    ${box(288, 150, 200, 120, 'Clean', ['drop blurry and', 'too-dark scans'])}
    ${arrow(488, 210, 526, 210)}
    ${box(528, 150, 200, 120, 'Preprocess', ['224×224, contrast', 'rotate, flip, zoom,', 'brightness'])}
    ${arrow(728, 210, 766, 210)}
    ${box(768, 150, 240, 120, 'EfficientNet-B0', ['MBConv blocks with', 'squeeze-and-excitation', 'ImageNet weights'], true)}
    ${arrow(1008, 210, 1030, 210)}
    ${box(1032, 150, 200, 120, 'Grade 0-4', ['healthy → mild →', 'moderate → severe', '→ proliferative'], true)}
    ${label(48, 320, 'WHY IT FITS CHEAP HARDWARE')}
    <text x="48" y="350" font-size="16" fill="${C.text}">Compound scaling grows depth, width and image size together, so accuracy comes with few parameters.</text>
    <text x="48" y="378" font-size="16" fill="${C.text}">Training: batch 32 · Adam 0.001 · early stopping · learning rate halves when validation loss stalls.</text>
    ${label(48, 480, 'RESULTS', 13, C.accent, 'bold')}
    ${box(48, 496, 280, 136, '84.2% accuracy', ['on the test set,', 'all 5 stages'])}
    ${box(348, 496, 280, 136, '5.3 M parameters', ['others: 9.2 M to', '15.7 M'])}
    ${box(648, 496, 280, 136, '20 ms per image', ['others: 25 to 40 ms'])}
    ${box(948, 496, 284, 136, '20 MB model', ['runs with 4 GB RAM', 'and 2 GB storage'])}
  `),

  'paper-insider-threat': svg('Insider Threat Mitigation', 'A file that opens only on the company network', `
    ${label(48, 140, 'BUILD THE PROTECTED FILE (FLUTTER WINDOWS APP)')}
    ${box(48, 152, 210, 110, 'Allowed IPs', ['typed into the app'])}
    ${arrow(258, 207, 290, 207)}
    ${box(292, 152, 210, 110, 'Pick the file', ['name and path'])}
    ${arrow(502, 207, 534, 207)}
    ${box(536, 152, 210, 110, 'Checker script', ['IPs and path written', 'into Python code'])}
    ${arrow(746, 207, 778, 207)}
    ${box(780, 152, 210, 110, 'Standalone .exe', ['PyInstaller, no', 'installs needed'])}
    ${arrow(990, 207, 1020, 207)}
    ${box(1022, 152, 210, 110, 'Hide in file', ['self-extracting', 'archive: .exe runs', 'first'], true)}
    ${label(48, 320, 'WHEN SOMEONE OPENS IT')}
    ${box(48, 332, 300, 110, 'Checker runs first', ['reads this machine’s IP'])}
    ${arrow(348, 387, 396, 387)}
    ${box(398, 332, 300, 110, 'On an allowed network?', ['office LAN or', 'company VPN'], true)}
    ${arrow(698, 360, 776, 340)}
    ${arrow(698, 414, 776, 434)}
    ${box(778, 300, 454, 70, 'Yes: the file opens normally')}
    ${box(778, 404, 454, 70, 'No: the file’s contents are erased', [], true)}
    ${label(48, 520, 'PART OF A WIDER PLAN', 13, C.accent, 'bold')}
    <text x="48" y="552" font-size="16" fill="${C.text}">Behaviour analytics and anomaly detection · access reviews · security culture · staff training</text>
    <text x="48" y="584" font-size="16" fill="${C.text}">Next: pack the file inside the app itself, and alert the security team when an open is blocked.</text>
  `),
}

for (const [name, s] of Object.entries(diagrams)) {
  fs.writeFileSync(`src/assets/diagrams/${name}.svg`, s)
}
console.log('diagrams written')
