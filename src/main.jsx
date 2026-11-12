import { ViteReactSSG } from 'vite-react-ssg'
import { routes } from './routes.jsx'
// Space Grotesk is bundled with the site instead of loaded from Google Fonts, which
// blocked the first paint on phones for about a second.
import '@fontsource-variable/space-grotesk/wght.css'
import './index.css'

export const createRoot = ViteReactSSG({ routes })
