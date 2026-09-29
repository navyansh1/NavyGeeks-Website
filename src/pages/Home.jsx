import React from 'react';
import Seo from '../components/Seo';
import Hero from '../components/Hero';
import Skills from '../components/Skills';
import Experience from '../components/Experience';
import Education from '../components/Education';
import Portfolio from '../components/Portfolio';
import Certifications from '../components/Certifications';
import Research from '../components/Research';
import Contact from '../components/Contact';
import { SITE_NAME, SITE_TAGLINE, SITE_URL, personSchema } from '../data/site';

const homeSchema = {
    '@graph': [
        {
            '@type': 'WebSite',
            '@id': `${SITE_URL}/#website`,
            url: `${SITE_URL}/`,
            name: SITE_NAME,
            description: SITE_TAGLINE,
            inLanguage: 'en',
            publisher: { '@id': personSchema['@id'] },
        },
        {
            '@type': 'ProfilePage',
            '@id': `${SITE_URL}/#profile`,
            url: `${SITE_URL}/`,
            name: `${SITE_NAME} | ${SITE_TAGLINE}`,
            isPartOf: { '@id': `${SITE_URL}/#website` },
            mainEntity: personSchema,
        },
    ],
};

export default function Home() {
    return (
        <>
            <Seo
                title={`${SITE_NAME} | ${SITE_TAGLINE}`}
                description="Navyansh Kothari is a Data Scientist and Gen AI Engineer at Ganit Inc, IEEE-published researcher, app developer and creator of the NavyGeeks tech channel."
                path="/"
                schema={homeSchema}
            />

            <div id="hero">
                <Hero />
            </div>

            <Skills />

            <div id="experience" className="md:pt-4 pt-2">
                <Experience />
            </div>

            <div id="education" className="md:pt-4 pt-2">
                <Education />
            </div>

            <Portfolio />

            <Certifications />

            <div className="md:pt-4 pt-2">
                <Research />
            </div>

            <Contact />
        </>
    );
}
