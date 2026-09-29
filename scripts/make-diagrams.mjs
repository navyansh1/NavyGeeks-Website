// Generates the architecture diagrams in src/assets/diagrams/ (SVG) and matching
// 1280x720 JPG thumbnails in src/assets/projects/. Run: node scripts/make-diagrams.mjs
import fs from 'node:fs'
import sharp from 'sharp'

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

const diagrams = {
  'discount-optimization': svg('Discount Spend Optimization', 'Config-driven pipeline from raw data to a discount what-if simulator', `
    ${label(48, 140, 'INPUTS')}
    ${box(48, 152, 250, 70, 'Sales & discounts', ['distributor level, monthly'])}
    ${box(48, 234, 250, 70, 'Retail audit data', ['Nielsen, by state & channel'])}
    ${box(48, 316, 250, 70, 'Media spend')}
    ${box(48, 398, 250, 70, 'Weather', ['temp, humidity, rain by state'])}
    ${box(48, 480, 250, 70, 'Festival calendar', ['one flag per festival'])}
    ${arrow(298, 351, 346, 351)}
    ${label(348, 140, 'DATA MERGE')}
    ${box(348, 152, 270, 240, 'Config-driven merge', ['one notebook for every product', 'pure pandas (no Spark)', 'monthly continuity per segment', 'weather + festival features'], true)}
    ${arrow(483, 392, 483, 440)}
    ${box(348, 442, 270, 108, 'Analytical dataset', ['State × Pack × Channel', 'segments by month'])}
    ${arrow(618, 496, 666, 300)}
    ${label(668, 140, 'MODELLING')}
    ${box(668, 152, 270, 130, 'DTW clustering', ['groups segments with similar', 'sales-over-time shapes'])}
    ${arrow(803, 282, 803, 312)}
    ${box(668, 314, 270, 110, 'XGBoost per cluster', ['r², MAPE, wMAPE per cluster'])}
    ${arrow(803, 424, 803, 454)}
    ${box(668, 456, 270, 94, 'Explainability', ['SHAP and feature importance'])}
    ${arrow(938, 369, 986, 300)}
    ${label(988, 140, 'SIMULATION')}
    ${box(988, 152, 244, 150, 'Discount elasticity', ['saturation curve per', 'segment: where extra', 'discount stops paying'])}
    ${arrow(1110, 302, 1110, 332)}
    ${box(988, 334, 244, 216, 'Sales & P&L simulator', ['type a discount % per', 'segment, see sales and', 'P&L recompute live,', 'segment and all-India', 'views'], true)}
    <rect x="48" y="590" width="1184" height="74" rx="12" fill="none" stroke="${C.line}" stroke-dasharray="6 6"/>
    ${label(72, 622, 'DELIVERY', 13, C.accent, 'bold')}
    <text x="200" y="622" font-size="16" fill="${C.text}">Two Streamlit dashboards: EDA, model performance, SHAP, elasticity, saturation and the simulator.</text>
    <text x="200" y="648" font-size="16" fill="${C.text}">Deployed on Hugging Face Spaces with Docker; the data stays in a private repo.</text>
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

  'cctv-iq': svg('CCTV IQ: Face ID Attendance', 'Recognise enrolled people on office CCTV and log arrivals, tuned for accuracy', `
    ${box(48, 150, 210, 96, 'RTSP camera', ['2560×1440 stream', 'threaded capture'])}
    ${arrow(258, 198, 296, 198)}
    ${box(298, 150, 210, 96, 'Ignore zones', ['desks masked before', 'embedding: 2-3× faster'])}
    ${arrow(508, 198, 546, 198)}
    ${box(548, 150, 210, 96, 'Face detection', ['SCRFD'])}
    ${arrow(758, 198, 796, 198)}
    ${box(798, 150, 210, 96, 'Face embedding', ['antelopev2'])}
    ${arrow(1008, 198, 1046, 198)}
    ${box(1048, 150, 184, 96, 'Gallery match', ['182 people'], true)}
    <rect x="538" y="136" width="480" height="124" rx="16" fill="none" stroke="${C.accent}" stroke-dasharray="6 6"/>
    ${label(548, 282, 'BOTH MODELS ON THE INTEL iGPU VIA OPENVINO', 13, C.accent, 'bold')}
    ${arrow(1140, 246, 1140, 330)}
    ${box(900, 332, 332, 110, 'Margin check', ['refuse a name when the runner-up', 'is too close: silence beats', 'a confident wrong name'], true)}
    ${arrow(900, 387, 842, 387)}
    ${box(560, 332, 280, 110, 'Arrival tracker', ['debounce on absence, not a', 'cooldown timer (regression-', 'tested across 9 scenarios)'])}
    ${arrow(560, 387, 502, 387)}
    ${box(48, 332, 452, 110, 'Outputs', ['daily attendance register (xlsx + csv)', 'live dashboard; recognition runs in its', 'own thread and never waits on the UI'])}
    ${label(48, 500, 'WHAT THE MEASUREMENTS SHOWED', 13, C.accent, 'bold')}
    ${box(48, 516, 370, 150, '9.86 → 0.31 s/frame', ['moving both models from the CPU', 'to the idle Intel iGPU, with', 'identical scores'])}
    ${box(442, 516, 370, 150, 'Face size decides accuracy', ['32-48 px between the eyes: 38.9%', '20-32 px: 18.1% identified', '(17,842 real sightings)'])}
    ${box(836, 516, 396, 150, '4 recognition models tied', ['antelopev2, AdaFace, buffalo_l and', 'AuraFace within noise: camera', 'placement matters more than the model'])}
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

  'geoscout-iq': svg('GeoScout IQ', 'Where to open the next ATM, branch, store or warehouse in India', `
    ${box(48, 150, 250, 130, 'Ask', ['any Indian location', 'industry and use case', 'your company (optional)'])}
    ${arrow(298, 215, 346, 215)}
    ${box(348, 150, 300, 300, 'Data sources', ['Google Places: competitors', 'WorldPop: population', 'NASA night lights: activity', 'OpenStreetMap: malls, transit,', '  schools, land you cannot use', 'Property listings: rents', 'Google Search: upcoming', '  metro, roads and projects'])}
    ${arrow(648, 300, 696, 300)}
    ${box(698, 150, 270, 140, 'H3 hex grid', ['~0.7 sq km tiles', 'demand · open space ·', 'access · growth'], true)}
    ${arrow(833, 290, 833, 320)}
    ${box(698, 322, 270, 128, 'Gemini grounding agents', ['nearby context and the', 'written narrative'], true)}
    ${arrow(968, 300, 1016, 300)}
    ${box(1018, 150, 214, 300, 'Answer in ~30 s', ['colour-coded hex', 'heatmap', 'competitor and own', 'store pins', 'property listings', 'executive summary:', 'GO / CAUTION / AVOID'])}
    ${label(48, 520, 'BUILT FOR', 13, C.accent, 'bold')}
    <text x="48" y="548" font-size="16" fill="${C.text}">BFSI (ATM and branch placement) and FMCG (stores and warehouses). Same input gives the same score, and the scoring maths is visible.</text>
    ${label(48, 610, 'STACK', 13, C.accent, 'bold')}
    <text x="48" y="638" font-size="16" fill="${C.text}">Google Maps · H3 · Gemini · Firebase (Hosting, Functions, Firestore)</text>
  `),
}

for (const [name, s] of Object.entries(diagrams)) {
  fs.writeFileSync(`src/assets/diagrams/${name}.svg`, s)
}
// the two private repos have no screenshots we can show, so their diagram is the thumbnail
for (const name of ['discount-optimization', 'cctv-iq']) {
  await sharp(Buffer.from(diagrams[name])).jpeg({ quality: 85, mozjpeg: true }).toFile(`src/assets/projects/${name}.jpg`)
}
console.log('diagrams written')
