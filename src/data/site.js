// Central site configuration used by the SEO components, sitemap and structured data.
export const SITE_URL = 'https://www.navygeeks.in';
export const SITE_NAME = 'Navyansh Kothari';
export const SITE_TAGLINE = 'AI/ML Engineer & App Developer';
export const DEFAULT_IMAGE = `${SITE_URL}/og-image.png`;

export const SOCIAL_LINKS = {
    github: 'https://github.com/navyansh1',
    linkedin: 'https://www.linkedin.com/in/navyansh/',
    instagram: 'https://www.instagram.com/navygeeks/',
    youtube: 'https://www.youtube.com/@navygeeks',
    orcid: 'https://orcid.org/0009-0002-1467-8595',
    googleScholar: 'https://scholar.google.com/citations?user=IwNd_zoAAAAJ',
};

export const ORCID_ID = '0009-0002-1467-8595';

// Static hosts differ on whether they prefer /research or /research/.
// Pages are pre-rendered as research/index.html, so the trailing slash form is the native one.
export const TRAILING_SLASH = true;

export const pagePath = (path = '/') => {
    const clean = path.replace(/^\/+|\/+$/g, '');
    if (!clean) return '/';
    return TRAILING_SLASH ? `/${clean}/` : `/${clean}`;
};

export const absoluteUrl = (path = '/') => `${SITE_URL}${pagePath(path)}`;

export const PERSON_ID = `${SITE_URL}/#person`;

export const personSchema = {
    '@type': 'Person',
    '@id': PERSON_ID,
    name: SITE_NAME,
    alternateName: 'NavyGeeks',
    url: `${SITE_URL}/`,
    image: `${SITE_URL}/profile.jpg`,
    jobTitle: 'AI/ML Engineer',
    description:
        'AI/ML engineer building Gen AI products, RAG systems, machine learning models and mobile apps, and creating tech content as NavyGeeks.',
    worksFor: { '@type': 'Organization', name: 'Ganit Inc', url: 'https://www.ganitinc.com' },
    alumniOf: { '@type': 'CollegeOrUniversity', name: 'Vellore Institute of Technology' },
    knowsAbout: [
        'Data Science',
        'Machine Learning',
        'Generative AI',
        'Retrieval-Augmented Generation',
        'LangChain',
        'LangGraph',
        'FastAPI',
        'AWS',
        'React Native',
        'iOS Development',
        'Deep Learning',
        'Claude',
        'AI Agents',
    ],
    hasCredential: {
        '@type': 'EducationalOccupationalCredential',
        name: 'Claude Certified Architect - Foundations',
        credentialCategory: 'certificate',
        recognizedBy: { '@type': 'Organization', name: 'Anthropic' },
        url: 'https://www.credly.com/badges/b355de73-3050-4373-bfb7-51e284cf262b',
    },
    identifier: { '@type': 'PropertyValue', propertyID: 'ORCID', value: ORCID_ID, url: SOCIAL_LINKS.orcid },
    sameAs: Object.values(SOCIAL_LINKS),
};

export const personRef = { '@id': PERSON_ID };

// Asset imports resolve to '/assets/x-hash.png' on build (or a data: URI for tiny files).
export const imageUrl = (img) =>
    typeof img === 'string' && img.startsWith('/') ? `${SITE_URL}${img}` : DEFAULT_IMAGE;

export const breadcrumbSchema = (items) => ({
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: item.name,
        item: item.path ? absoluteUrl(item.path) : `${SITE_URL}/`,
    })),
});
