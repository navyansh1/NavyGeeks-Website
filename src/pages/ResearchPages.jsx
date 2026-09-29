import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { ExternalLink, ArrowLeft } from 'lucide-react';
import Seo from '../components/Seo';
import Breadcrumbs from '../components/Breadcrumbs';
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
        'Peer-reviewed IEEE research by Navyansh Kothari on RAG vector databases, deep learning for otitis media and diabetic retinopathy, and insider threat mitigation.';

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
            <Seo title={`Research & Publications | ${SITE_NAME}`} description={description} path="/research" schema={schema} />
            <Breadcrumbs items={crumbs} />
            <h1 className="text-3xl md:text-5xl font-bold text-yellow-500 mb-8">Research & Publications</h1>

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
    const title = paper.title.length > 55 ? paper.title : `${paper.title} | ${SITE_NAME}`;

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

    const related = papers.filter((p) => p.slug !== paper.slug);

    return (
        <article className="pt-20 md:pt-24 max-w-[900px] mx-auto px-6 pb-8">
            <Seo title={title} description={paper.metaDescription} path={path} type="article" schema={schema} meta={meta} />
            <Breadcrumbs items={crumbs} />

            <h1 className="text-2xl md:text-4xl font-bold text-yellow-500 leading-tight mb-5">{paper.title}</h1>

            <table className="w-full text-left text-sm md:text-base border-collapse">
                <tbody>
                    {[
                        ['Author', (
                            <>
                                {paper.authors.map((name, i) => (
                                    <React.Fragment key={name}>
                                        {i > 0 && ', '}
                                        {name === SITE_NAME ? (
                                            <Link to="/" rel="author" className="text-yellow-400 hover:text-yellow-300 underline underline-offset-2">{name}</Link>
                                        ) : name}
                                    </React.Fragment>
                                ))}
                            </>
                        )],
                        ['Conference', paper.venue],
                        ['Where & when', paper.date],
                        ['Publisher', `IEEE (${year})`],
                        ['Topics', <Tags key="t" tags={paper.tags} />],
                        ...(paper.doi ? [['DOI', paper.doi]] : []),
                    ].map(([label, value]) => (
                        <tr key={label} className="block sm:table-row border-b border-gray-700/70 py-2 sm:py-0">
                            <th scope="row" className="block sm:table-cell align-top font-semibold text-yellow-400 sm:py-3 sm:pr-6 sm:w-40 whitespace-nowrap">{label}</th>
                            <td className="block sm:table-cell align-top text-gray-300 leading-relaxed sm:py-3">{value}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <h2 className="text-xl md:text-2xl font-semibold text-gray-100 mt-8 mb-3">Key points</h2>
            <ul className="list-disc list-outside pl-5 space-y-2 text-gray-300 text-base leading-relaxed">
                {paper.abstract.map((point) => (
                    <li key={point}>{point}</li>
                ))}
            </ul>

            <div className="mt-8 flex flex-wrap items-center gap-4">
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

            <h2 className="text-xl md:text-2xl font-semibold text-gray-100 mt-12 mb-3">More publications</h2>
            <ul className="space-y-2">
                {related.map((p) => (
                    <li key={p.slug}>
                        <Link to={pagePath(`research/${p.slug}`)} className="text-base text-gray-300 hover:text-yellow-400 transition-colors">
                            {p.title}
                        </Link>
                    </li>
                ))}
            </ul>

            <Link to={pagePath('research')} className="mt-8 inline-flex items-center gap-2 text-yellow-400 hover:text-yellow-300 font-semibold">
                <ArrowLeft size={18} /> All publications
            </Link>
        </article>
    );
}
