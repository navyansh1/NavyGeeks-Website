import React from 'react';
import { Link } from 'react-router-dom';
import Seo from '../components/Seo';
import Breadcrumbs from '../components/Breadcrumbs';
import CertDetails from '../components/CertDetails';
import Experience from '../components/Experience';
import Education from '../components/Education';
import Certifications from '../components/Certifications';
import Skills from '../components/Skills';
import Contact from '../components/Contact';
import { certifications } from '../data/certifications';
import { SITE_NAME, SITE_URL, absoluteUrl, personRef, breadcrumbSchema, pagePath } from '../data/site';

const PageFrame = ({ crumbs, children }) => (
    <div className="pt-20 md:pt-24">
        <div className="max-w-[1000px] mx-auto px-6">
            <Breadcrumbs items={crumbs} />
        </div>
        {children}
    </div>
);

// Extra written context shown under a section on its own page (not on the home page).
const NoteLink = ({ to, children }) => (
    <Link to={pagePath(to)} className="text-yellow-400 hover:text-yellow-300 underline underline-offset-2">{children}</Link>
);

const PageNotes = ({ title, items }) => (
    <section className="max-w-[860px] mx-auto px-6 pb-6 mt-10">
        <h2 className="text-xl md:text-2xl font-semibold text-gray-100 mb-4">{title}</h2>
        <div className="space-y-4">
            {items.map(([heading, body]) => (
                <div key={heading}>
                    <h3 className="text-base md:text-lg font-semibold text-yellow-400">{heading}</h3>
                    <p className="text-gray-300 text-base leading-relaxed">{body}</p>
                </div>
            ))}
        </div>
    </section>
);

const skillsInPractice = [
    ['Gen AI and RAG', <>Two IEEE papers on making RAG cheaper and faster: <NoteLink to="/research/on-demand-multimodal-rag-selective-page-rendering">on-demand multimodal RAG</NoteLink> and <NoteLink to="/research/selective-embedding-update-rag-vector-database">selective embedding updates</NoteLink>. Gemini also powers the summaries in <NoteLink to="/projects/geoscout-iq">GeoScout IQ</NoteLink> and the PII detection in <NoteLink to="/projects/masker-pii-redaction">Masker</NoteLink>.</>],
    ['Machine learning', <>XGBoost and SHAP in the <NoteLink to="/projects/discount-spend-optimization">discount spend optimization</NoteLink> pipeline for 18 FMCG product lines, ARIMA and exponential smoothing in <NoteLink to="/projects/fmcg-demand-forecasting">demand forecasting</NoteLink>, and a <NoteLink to="/projects/credit-card-fraud-detection-bfsi">fraud model</NoteLink> that catches 93%+ of fraud in heavily imbalanced data.</>],
    ['Computer vision and document AI', <>Face recognition with InsightFace and OpenVINO in <NoteLink to="/projects/cctv-iq-face-attendance">CCTV IQ</NoteLink>, an <NoteLink to="/projects/ocr-engine-benchmark">OCR benchmark</NoteLink> of Tesseract, AWS Textract and Qwen3-VL on Indian loan documents, and deep learning papers on <NoteLink to="/research/efficientnet-dr-diabetic-retinopathy-detection">diabetic retinopathy</NoteLink> and <NoteLink to="/research/otitis-media-diagnosis-deep-neural-networks">otitis media</NoteLink> diagnosis.</>],
    ['Mobile apps', <>React Native and Expo apps <NoteLink to="/projects/vedicflow">VedicFlow</NoteLink> (a Hindu calendar and Panchang app) and <NoteLink to="/projects/bill-sonic">Bill Sonic</NoteLink> (a point-of-sale app), plus native iOS apps in SwiftUI.</>],
    ['Cloud', <>AWS Certified Solutions Architect - Associate and AWS Certified AI Practitioner (see <NoteLink to="/certifications">certifications</NoteLink>). Projects use AWS Lambda, Textract and Bedrock, Google Cloud and Firebase.</>],
];

const beyondClassroom = [
    ['Research', <>Published <NoteLink to="/research">IEEE papers</NoteLink> on RAG systems, medical imaging and cybersecurity, starting with an insider-threat paper presented in 2024 while at VIT.</>],
    ['Clubs and leadership at VIT', <>iOS app developer at HackClub VIT (SwiftUI, UIKit), social media head, podcaster and video editor at Microsoft Innovations Club, and videographer at E-Cell VIT. See <NoteLink to="/experience">experience</NoteLink>.</>],
    ['Courses alongside the degree', <>NPTEL Google Cloud Computing Foundations (IIT Kharagpur, top 5%), NPTEL courses from IIT Kanpur scored 97% and 100%, and Spoken Tutorial training from IIT Bombay. See <NoteLink to="/certifications">certifications</NoteLink>.</>],
];

const collectionSchema = (name, path, description) => ({
    '@type': 'CollectionPage',
    name,
    description,
    url: absoluteUrl(path),
    isPartOf: { '@id': `${SITE_URL}/#website` },
    about: personRef,
});

export function ExperiencePage() {
    const crumbs = [{ name: 'Home', path: '/' }, { name: 'Experience', path: '/experience' }];
    const description =
        'Work experience of Navyansh Kothari: AI/ML Engineer at Ganit Inc, Technical Growth Analyst at Hitwicket, and the NavyGeeks YouTube channel.';
    return (
        <>
            <Seo
                title={`${SITE_NAME} – Experience | AI/ML Engineer at Ganit`}
                description={description}
                path="/experience"
                schema={[collectionSchema('Experience', '/experience', description), breadcrumbSchema(crumbs)]}
            />
            <PageFrame crumbs={crumbs}>
                <Experience pageHeading />
            </PageFrame>
        </>
    );
}

export function EducationPage() {
    const crumbs = [{ name: 'Home', path: '/' }, { name: 'Education', path: '/education' }];
    const description =
        'Education of Navyansh Kothari: B.Tech in Computer Science & Engineering (CGPA 8.3) from VIT Vellore, and CBSE Class X and XII from Chinmaya Vidyalaya.';
    return (
        <>
            <Seo
                title={`${SITE_NAME} – Education | B.Tech CSE, VIT`}
                description={description}
                path="/education"
                schema={[collectionSchema('Education', '/education', description), breadcrumbSchema(crumbs)]}
            />
            <PageFrame crumbs={crumbs}>
                <Education pageHeading />
                <PageNotes title="Beyond the classroom" items={beyondClassroom} />
            </PageFrame>
        </>
    );
}

export function CertificationsPage() {
    const crumbs = [{ name: 'Home', path: '/' }, { name: 'Certifications', path: '/certifications' }];
    const description =
        'Certifications of Navyansh Kothari: AWS Solutions Architect - Associate, Claude Certified Architect, AWS AI Practitioner, OpenAI certifications and more.';
    const itemList = {
        '@type': 'ItemList',
        itemListElement: certifications.map((cert, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            item: {
                '@type': 'EducationalOccupationalCredential',
                name: cert.title,
                credentialCategory: 'certificate',
                recognizedBy: { '@type': 'Organization', name: cert.issuer },
            },
        })),
    };
    return (
        <>
            <Seo
                title={`${SITE_NAME} – Certifications | Anthropic, AWS, OpenAI`}
                description={description}
                path="/certifications"
                schema={[collectionSchema('Certifications & Licenses', '/certifications', description), itemList, breadcrumbSchema(crumbs)]}
            />
            <PageFrame crumbs={crumbs}>
                <Certifications pageHeading />

                <section className="max-w-[1000px] mx-auto px-6 pb-8" aria-labelledby="credential-details">
                    <h2 id="credential-details" className="text-2xl md:text-3xl font-bold text-yellow-500 mb-4">Credential details</h2>
                    <ul className="space-y-5">
                        {certifications.map((cert) => (
                            <li key={cert.title} className="border border-gray-700 rounded-lg p-4 bg-gray-800/40 text-gray-300 text-base">
                                <h3 className="text-lg font-semibold text-gray-100 mb-1">{cert.title}</h3>
                                <CertDetails cert={cert} />
                            </li>
                        ))}
                    </ul>
                </section>
            </PageFrame>
        </>
    );
}

export function SkillsPage() {
    const crumbs = [{ name: 'Home', path: '/' }, { name: 'Skills', path: '/skills' }];
    const description =
        'Skills of Navyansh Kothari: Python, scikit-learn, XGBoost, LangChain, LangGraph, RAG, FastAPI, React Native, Swift, AWS and GCP, with real projects.';
    return (
        <>
            <Seo
                title={`${SITE_NAME} – Skills | AI/ML, Gen AI, Mobile`}
                description={description}
                path="/skills"
                schema={[collectionSchema('Skills', '/skills', description), breadcrumbSchema(crumbs)]}
            />
            <PageFrame crumbs={crumbs}>
                <Skills pageHeading />
                <PageNotes title="Where these skills are used" items={skillsInPractice} />
            </PageFrame>
        </>
    );
}

export function AboutPage() {
    const crumbs = [{ name: 'Home', path: '/' }, { name: 'About & Contact', path: '/about' }];
    const description =
        'About Navyansh Kothari: AI/ML engineer, backend and mobile developer, and creator of the NavyGeeks YouTube channel. Get in touch to collaborate.';
    return (
        <>
            <Seo
                title={`${SITE_NAME} – About & Contact`}
                description={description}
                path="/about"
                schema={[
                    {
                        '@type': ['AboutPage', 'ContactPage'],
                        name: `About ${SITE_NAME}`,
                        description,
                        url: absoluteUrl('/about'),
                        isPartOf: { '@id': `${SITE_URL}/#website` },
                        mainEntity: personRef,
                    },
                    breadcrumbSchema(crumbs),
                ]}
            />
            <PageFrame crumbs={crumbs}>
                <Contact pageHeading />
            </PageFrame>
        </>
    );
}
