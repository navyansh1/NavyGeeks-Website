import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { ExternalLink } from 'lucide-react';
import Seo from '../components/Seo';
import Breadcrumbs from '../components/Breadcrumbs';
import Flow from '../components/Flow';
import { h2Class, FactsTable, ResultTable, Bullets, Diagram, Details, TagList, BackLink } from '../components/DetailBlocks';
import NotFound from './NotFound';
import { papers, getPaper } from '../data/research';
import { PERSON_ID, SITE_NAME, SITE_URL, absoluteUrl, pagePath, breadcrumbSchema } from '../data/site';

const Tags = ({ tags }) => (
    <div className="mt-3 flex flex-wrap gap-1.5">
        {tags.map((tag) => (
            <span key={tag} className="text-[11px] leading-none font-medium text-yellow-400 bg-yellow-500/10 border border-yellow-500/30 rounded-full px-2.5 py-1">
                {tag}
            </span>
        ))}
    </div>
);

const authorSchema = (name) =>
    name === SITE_NAME
        ? { '@type': 'Person', '@id': PERSON_ID, name, url: `${SITE_URL}/` }
        : { '@type': 'Person', name };

// "Kothari, Navyansh" - the form Google Scholar expects.
const scholarName = (name) => {
    const parts = name.trim().split(/\s+/);
    return parts.length > 1 ? `${parts[parts.length - 1]}, ${parts.slice(0, -1).join(' ')}` : name;
};

export function ResearchIndexPage() {
    const crumbs = [{ name: 'Home', path: '/' }, { name: 'Research', path: '/research' }];
    const description =
        'IEEE research by Navyansh Kothari: multimodal RAG, RAG vector database updates, deep learning for ear infections and diabetic retinopathy, and insider threat mitigation.';

    const schema = [
        {
            '@type': 'CollectionPage',
            name: 'Research & Publications',
            description,
            url: absoluteUrl('/research'),
            about: { '@id': PERSON_ID },
            mainEntity: {
                '@type': 'ItemList',
                itemListElement: papers.map((paper, i) => ({
                    '@type': 'ListItem',
                    position: i + 1,
                    url: absoluteUrl(`/research/${paper.slug}`),
                    name: paper.title,
                })),
            },
        },
        breadcrumbSchema(crumbs),
    ];

    return (
        <div className="pt-20 md:pt-24 max-w-[1000px] mx-auto px-6 pb-8">
            <Seo title={`${SITE_NAME} – Research & IEEE Publications`} description={description} path="/research" schema={schema} />
            <Breadcrumbs items={crumbs} />
            <h1 className="text-3xl md:text-5xl font-bold text-yellow-500 mb-8">{SITE_NAME}&apos;s Research & Publications</h1>

            <ul className="space-y-4">
                {papers.map((paper) => (
                    <li key={paper.slug} className="bg-gray-800/50 rounded-lg border border-gray-700 hover:border-yellow-500/50 transition-colors p-4 md:p-5 max-w-[750px]">
                        <h2 className="text-base md:text-lg font-semibold text-gray-200 leading-snug">
                            <Link to={pagePath(`research/${paper.slug}`)} className="hover:text-yellow-400 transition-colors">
                                {paper.title}
                            </Link>
                        </h2>
                        <p className="mt-2 text-sm text-gray-400">{paper.venue} &middot; {paper.date}</p>
                        <Tags tags={paper.tags} />
                    </li>
                ))}
            </ul>
        </div>
    );
}

export function PaperPage() {
    const { slug } = useParams();
    const paper = getPaper(slug);
    if (!paper) return <NotFound />;

    const path = `/research/${paper.slug}`;
    const crumbs = [
        { name: 'Home', path: '/' },
        { name: 'Research', path: '/research' },
        { name: paper.title, path },
    ];
    const year = paper.published.slice(0, 4);
    const title = `${SITE_NAME} – IEEE Paper: ${paper.title}`;

    const schema = [
        {
            '@type': 'ScholarlyArticle',
            headline: paper.title,
            name: paper.title,
            url: absoluteUrl(path),
            mainEntityOfPage: absoluteUrl(path),
            sameAs: paper.link,
            author: paper.authors.map(authorSchema),
            datePublished: paper.published,
            inLanguage: 'en',
            description: paper.metaDescription,
            keywords: paper.tags.join(', '),
            publisher: { '@type': 'Organization', name: 'IEEE' },
            identifier: paper.doi
                ? { '@type': 'PropertyValue', propertyID: 'DOI', value: paper.doi }
                : undefined,
            publication: {
                '@type': 'PublicationEvent',
                name: paper.venue,
                startDate: paper.published,
                location: { '@type': 'Place', name: paper.location },
            },
        },
        breadcrumbSchema(crumbs),
    ];

    // Highwire Press tags read by Google Scholar and other academic indexers.
    const meta = [
        { name: 'citation_title', content: paper.title },
        ...paper.authors.map((a) => ({ name: 'citation_author', content: scholarName(a) })),
        { name: 'citation_publication_date', content: paper.published.replace('-', '/') },
        { name: 'citation_conference_title', content: paper.venue },
        { name: 'citation_publisher', content: 'IEEE' },
        { name: 'citation_language', content: 'en' },
        { name: 'citation_abstract_html_url', content: absoluteUrl(path) },
        ...(paper.doi ? [{ name: 'citation_doi', content: paper.doi }] : []),
    ];

    const facts = [
        ...(paper.facts || []),
        ['Published in', paper.venue],
        ['Where & when', paper.date],
        ['Publisher', `IEEE (${year})`],
        ...(paper.doi ? [['DOI', paper.doi]] : []),
    ];

    return (
        <article className="pt-20 md:pt-24 max-w-[860px] mx-auto px-4 md:px-6 pb-8">
            <Seo title={title} description={paper.metaDescription} path={path} type="article" keywords={paper.tags} schema={schema} meta={meta} />
            <Breadcrumbs items={crumbs} />

            <h1 className="text-2xl md:text-4xl font-bold text-yellow-500 leading-tight">{paper.title}</h1>

            <h2 className={h2Class}>At a glance</h2>
            <FactsTable rows={facts} />

            {paper.flow && (
                <>
                    <h2 className={h2Class}>How it works</h2>
                    <Flow steps={paper.flow} />
                </>
            )}

            <h2 className={h2Class}>Key points</h2>
            <Bullets items={paper.abstract} />

            {paper.tables && (
                <>
                    <h2 className={h2Class}>Results</h2>
                    {paper.tables.map((table) => <ResultTable key={table.title} table={table} />)}
                </>
            )}

            {paper.diagram && (
                <>
                    <h2 className={h2Class}>Architecture</h2>
                    <Diagram src={paper.diagram} alt={`Architecture diagram: ${paper.title}`} />
                </>
            )}

            {paper.details && <Details title="More numbers and details" items={paper.details} />}

            <TagList tags={paper.tags} />

            {paper.link && (
                <div className="mt-6 flex flex-wrap items-center gap-4">
                    <a
                        href={paper.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-5 py-2.5 bg-yellow-600 text-white rounded-lg font-semibold hover:bg-yellow-700 transition duration-300 flex items-center gap-2"
                    >
                        View on IEEE Xplore <ExternalLink size={16} />
                    </a>
                    {paper.doi && (
                        <a
                            href={`https://doi.org/${paper.doi}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-gray-400 hover:text-yellow-400 underline"
                        >
                            DOI: {paper.doi}
                        </a>
                    )}
                </div>
            )}

            <BackLink to={pagePath('research')} label="All publications" />
        </article>
    );
}
