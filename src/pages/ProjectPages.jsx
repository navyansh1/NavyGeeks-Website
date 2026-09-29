import React, { useState, useCallback } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Github, ExternalLink, Apple, Play, ArrowLeft, Lock, ChevronDown } from 'lucide-react';
import Seo from '../components/Seo';
import Breadcrumbs from '../components/Breadcrumbs';
import ProjectGrid from '../components/ProjectGrid';
import Flow from '../components/Flow';
import MoreProjects from '../components/MoreProjects';
import ProjectModal from '../components/ProjectModal';
import NotFound from './NotFound';
import { projects, featuredProjects, getProject } from '../data/projects';
import { PERSON_ID, SITE_NAME, absoluteUrl, imageUrl, pagePath, breadcrumbSchema } from '../data/site';

const linkClass = 'flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold transition duration-300';
const h2Class = 'text-xl md:text-2xl font-semibold text-gray-100 mt-10 mb-3';

const shortName = (title) => title.split(' - ')[0];

const projectSchema = (project, path) => {
    const base = {
        '@type': project.type,
        name: project.title,
        description: project.metaDescription,
        image: imageUrl(project.img),
        mainEntityOfPage: absoluteUrl(path),
        author: { '@id': PERSON_ID },
        keywords: project.tags?.join(', '),
    };
    const { site, github, ios, android } = project.links;

    if (['MobileApplication', 'WebApplication', 'SoftwareApplication'].includes(project.type)) {
        return {
            ...base,
            url: site,
            operatingSystem: project.platforms?.join(', '),
            downloadUrl: ios || android,
        };
    }
    if (project.type === 'SoftwareSourceCode') {
        return { ...base, codeRepository: github, url: github };
    }
    return { ...base, url: site };
};

export function ProjectsIndexPage() {
    const [open, setOpen] = useState(null);
    const close = useCallback(() => setOpen(null), []);
    const crumbs = [{ name: 'Home', path: '/' }, { name: 'Projects', path: '/projects' }];
    const description =
        'Projects by Navyansh Kothari: GeoScout IQ, CCTV IQ face-ID attendance, an OCR benchmark, Masker PII redaction, discount optimization, VedicFlow and more.';

    const schema = [
        {
            '@type': 'CollectionPage',
            name: 'Projects',
            description,
            url: absoluteUrl('/projects'),
            about: { '@id': PERSON_ID },
            mainEntity: {
                '@type': 'ItemList',
                itemListElement: projects.map((p, i) => ({
                    '@type': 'ListItem',
                    position: i + 1,
                    url: absoluteUrl(`/projects/${p.slug}`),
                    name: p.title,
                })),
            },
        },
        breadcrumbSchema(crumbs),
    ];

    return (
        <div className="pt-20 md:pt-24 max-w-[1100px] mx-auto px-4 md:px-6 pb-8">
            <Seo title={`Projects | ${SITE_NAME}`} description={description} path="/projects" schema={schema} />
            <Breadcrumbs items={crumbs} />
            <h1 className="text-3xl md:text-5xl font-bold text-yellow-500 mb-8">Projects</h1>

            <ProjectGrid projects={featuredProjects} onOpen={setOpen} headingLevel="h2" />

            <MoreProjects onOpen={setOpen} />

            <ProjectModal project={open} onClose={close} />
        </div>
    );
}

// Two-column label/value table; on phones each row stacks label above value.
const FactsTable = ({ rows }) => (
    <table className="w-full text-left text-sm md:text-base border-collapse">
        <tbody>
            {rows.map(([label, value]) => (
                <tr key={label} className="block sm:table-row border-b border-gray-700/70 py-2 sm:py-0">
                    <th scope="row" className="block sm:table-cell align-top font-semibold text-yellow-400 sm:py-3 sm:pr-6 sm:w-44 whitespace-nowrap">
                        {label}
                    </th>
                    <td className="block sm:table-cell align-top text-gray-300 leading-relaxed sm:py-3">{value}</td>
                </tr>
            ))}
        </tbody>
    </table>
);

const ResultTable = ({ table }) => (
    <figure className="mt-6">
        <figcaption className="text-base font-semibold text-gray-200 mb-2">{table.title}</figcaption>
        <div className="overflow-x-auto rounded-lg border border-gray-700">
            <table className="w-full text-left text-sm border-collapse">
                <thead className="bg-gray-800/80">
                    <tr>
                        {table.head.map((h) => (
                            <th key={h} scope="col" className="px-3 py-2 font-semibold text-yellow-400 whitespace-nowrap">{h}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {table.rows.map((row) => (
                        <tr key={row[0]} className="border-t border-gray-700/70">
                            {row.map((cell, i) => (
                                <td key={i} className={`px-3 py-2 text-gray-300 ${i === 0 ? 'font-medium text-gray-100' : 'whitespace-nowrap tabular-nums'}`}>{cell}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </figure>
);

export function ProjectPage() {
    const { slug } = useParams();
    const project = getProject(slug);
    if (!project) return <NotFound />;

    const path = `/projects/${project.slug}`;
    const crumbs = [
        { name: 'Home', path: '/' },
        { name: 'Projects', path: '/projects' },
        { name: shortName(project.title), path },
    ];
    const { site, github, ios, android } = project.links;
    const hasLinks = site || github || ios || android;

    // Default table for smaller projects that have no hand-written facts.
    const facts = [
        ['In short', project.summary],
        ...(project.facts || [
            ['Type', project.kind.charAt(0).toUpperCase() + project.kind.slice(1)],
            ...(project.platforms ? [['Platforms', project.platforms.join(', ')]] : []),
            ...(project.stack.length ? [['Built with', project.stack.join(', ')]] : []),
        ]),
        ...(project.demo && site ? [['Live demo', (
            <a key="demo" href={site} target="_blank" rel="noopener noreferrer" className="text-yellow-400 hover:text-yellow-300 underline underline-offset-2 break-all">
                {site.replace(/^https?:\/\//, '').replace(/\/$/, '')}
            </a>
        )]] : []),
        ...(project.repoName ? [['Code', `${project.repoName} (private repository)`]] : []),
    ];


    return (
        <article className="pt-20 md:pt-24 max-w-[860px] mx-auto px-4 md:px-6 pb-8">
            <Seo
                title={`${project.title} | ${SITE_NAME}`}
                description={project.metaDescription}
                path={path}
                image={imageUrl(project.img)}
                keywords={project.tags}
                schema={[projectSchema(project, path), breadcrumbSchema(crumbs)]}
            />
            <Breadcrumbs items={crumbs} />

            <h1 className="text-2xl md:text-4xl font-bold text-yellow-500 leading-tight">{project.title}</h1>

            <img
                src={project.img}
                alt={`${shortName(project.title)} preview`}
                className="mt-5 w-full aspect-video object-cover rounded-xl border border-gray-700"
            />

            <h2 className={h2Class}>At a glance</h2>
            <FactsTable rows={facts} />

            {project.flow && (
                <>
                    <h2 className={h2Class}>Flow</h2>
                    <Flow steps={project.flow} />
                </>
            )}

            {project.highlights && (
                <>
                    <h2 className={h2Class}>Key points</h2>
                    <ul className="list-disc list-outside pl-5 space-y-2 text-gray-300 text-base leading-relaxed">
                        {project.highlights.map((point) => <li key={point}>{point}</li>)}
                    </ul>
                </>
            )}

            {project.tables && (
                <>
                    <h2 className={h2Class}>Results</h2>
                    {project.tables.map((table) => <ResultTable key={table.title} table={table} />)}
                </>
            )}

            {project.diagram && (
                <>
                    <h2 className={h2Class}>Architecture</h2>
                    <img
                        src={project.diagram}
                        alt={`${shortName(project.title)} architecture diagram`}
                        width="1280"
                        height="720"
                        loading="lazy"
                        decoding="async"
                        className="w-full rounded-xl border border-gray-700"
                    />
                </>
            )}

            {project.details && (
                <details className="group mt-8 rounded-lg border border-gray-700 bg-gray-800/30">
                    <summary className="flex items-center justify-between gap-3 cursor-pointer list-none px-4 py-3 text-gray-200 font-semibold hover:text-yellow-400 transition-colors [&::-webkit-details-marker]:hidden">
                        <span className="text-base md:text-lg font-semibold text-inherit">Technical details</span>
                        <ChevronDown size={20} className="transition-transform group-open:rotate-180" />
                    </summary>
                    <ul className="list-disc list-outside pl-9 pr-4 pb-4 space-y-2 text-gray-300 text-sm md:text-base leading-relaxed">
                        {project.details.map((point) => <li key={point}>{point}</li>)}
                    </ul>
                </details>
            )}

            {project.tags && (
                <ul className="mt-8 flex flex-wrap gap-2" aria-label="Tags">
                    {project.tags.map((tag) => (
                        <li key={tag} className="text-xs md:text-sm font-medium text-yellow-400 bg-yellow-500/10 border border-yellow-500/30 rounded-full px-3 py-1">
                            {tag}
                        </li>
                    ))}
                </ul>
            )}

            {project.isPrivate && (
                <p className="mt-6 flex items-center gap-2 text-sm text-gray-400">
                    <Lock size={14} className="flex-shrink-0" /> The code for this project is private{hasLinks ? '.' : ', so there is no public link.'}
                </p>
            )}

            {hasLinks && (
                <div className="mt-6 flex flex-wrap gap-3">
                    {site && (
                        <a href={site} target="_blank" rel="noopener noreferrer" className={`${linkClass} bg-yellow-600 text-white hover:bg-yellow-700`}>
                            <ExternalLink size={18} /> {project.type === 'CreativeWork' ? 'View' : 'Live demo'}
                        </a>
                    )}
                    {ios && (
                        <a href={ios} target="_blank" rel="noopener noreferrer" className={`${linkClass} bg-slate-700 text-gray-200 hover:bg-slate-600`}>
                            <Apple size={18} /> App Store
                        </a>
                    )}
                    {android && (
                        <a href={android} target="_blank" rel="noopener noreferrer" className={`${linkClass} bg-slate-700 text-gray-200 hover:bg-slate-600`}>
                            <Play size={18} /> Google Play
                        </a>
                    )}
                    {github && (
                        <a href={github} target="_blank" rel="noopener noreferrer" className={`${linkClass} bg-slate-700 text-gray-200 hover:bg-slate-600`}>
                            <Github size={18} /> GitHub
                        </a>
                    )}
                </div>
            )}

            <Link to={pagePath('projects')} className="mt-8 inline-flex items-center gap-2 text-yellow-400 hover:text-yellow-300 font-semibold">
                <ArrowLeft size={18} /> All projects
            </Link>
        </article>
    );
}
