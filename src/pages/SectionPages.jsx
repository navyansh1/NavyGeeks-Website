import React from 'react';
import Seo from '../components/Seo';
import Breadcrumbs from '../components/Breadcrumbs';
import CertDetails from '../components/CertDetails';
import Experience from '../components/Experience';
import Education from '../components/Education';
import Certifications from '../components/Certifications';
import Skills from '../components/Skills';
import Contact from '../components/Contact';
import { certifications } from '../data/certifications';
import { SITE_NAME, SITE_URL, absoluteUrl, personRef, breadcrumbSchema } from '../data/site';

const PageFrame = ({ crumbs, children }) => (
    <div className="pt-20 md:pt-24">
        <div className="max-w-[1000px] mx-auto px-6">
            <Breadcrumbs items={crumbs} />
        </div>
        {children}
    </div>
);

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
            </PageFrame>
        </>
    );
}

export function CertificationsPage() {
    const crumbs = [{ name: 'Home', path: '/' }, { name: 'Certifications', path: '/certifications' }];
    const description =
        'Certifications of Navyansh Kothari: Claude Certified Architect (Anthropic), AWS AI and Cloud Practitioner, OpenAI Technical and ChatGPT Deployment Practitioner, and more.';
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
        'Skills of Navyansh Kothari: Python, scikit-learn, LangChain, LangGraph, RAG, FastAPI, React Native, Swift, AWS, GCP and Firebase across data science, Gen AI and mobile.';
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
            </PageFrame>
        </>
    );
}

export function AboutPage() {
    const crumbs = [{ name: 'Home', path: '/' }, { name: 'About & Contact', path: '/about' }];
    const description =
        'About Navyansh Kothari: AI/ML engineer, backend and mobile developer, and creator of the NavyGeeks YouTube channel. Get in touch for projects and collaborations.';
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
