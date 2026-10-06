import React, { useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { Github, ExternalLink, Apple, Play, Lock } from 'lucide-react';
import Seo from '../components/Seo';
import Breadcrumbs from '../components/Breadcrumbs';
import ProjectGrid from '../components/ProjectGrid';
import Flow from '../components/Flow';
import { h2Class, FactsTable, ResultTable, Bullets, Diagram, Details, TagList, BackLink } from '../components/DetailBlocks';
import MoreProjects from '../components/MoreProjects';
import ProjectModal from '../components/ProjectModal';
import GithubActivity from '../components/GithubActivity';
import NotFound from './NotFound';
import { projects, featuredProjects, getProject } from '../data/projects';
import { PERSON_ID, SITE_NAME, absoluteUrl, imageUrl, pagePath, breadcrumbSchema } from '../data/site';

const linkClass = 'flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold transition duration-300';

const shortName = (title) => title.split(' - ')[0];

// "<Project> by Navyansh Kothari", plus the project type when it still fits in ~60 characters.
const projectTitle = (project) => {
    const base = `${shortName(project.title)} by ${SITE_NAME}`;
    const k = project.kind;
    const kind = /^[a-z][a-z]/.test(k) ? k.charAt(0).toUpperCase() + k.slice(1) : k; // keeps "iOS"
    if (shortName(project.title).toLowerCase() === k.toLowerCase()) return base;
    return `${base} | ${kind}`.length <= 60 ? `${base} | ${kind}` : base;
};

// Descriptions carry the owner's name so name searches match every project page.
const withName = (text, name) => {
    if (text.startsWith(`${name} `)) return `${name}, by ${SITE_NAME},${text.slice(name.length)}`;
    return text.length <= 132 ? `${text} A project by ${SITE_NAME}.` : `By ${SITE_NAME}: ${text}`;
};

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
            <Seo title={`${SITE_NAME} – Projects | AI, ML & App Portfolio`} description={description} path="/projects" schema={schema} />
            <Breadcrumbs items={crumbs} />
            <h1 className="text-3xl md:text-5xl font-bold text-yellow-500 mb-8">Projects</h1>

            <GithubActivity compact />

            <ProjectGrid projects={featuredProjects} onOpen={setOpen} headingLevel="h2" />

            <MoreProjects onOpen={setOpen} />

            <ProjectModal project={open} onClose={close} />
        </div>
    );
}

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
                title={projectTitle(project)}
                description={withName(project.metaDescription, shortName(project.title))}
                path={path}
                image={imageUrl(project.img)}
                keywords={project.tags}
                schema={[projectSchema(project, path), breadcrumbSchema(crumbs)]}
            />
            <Breadcrumbs items={crumbs} />

            <h1 className="text-2xl md:text-4xl font-bold text-yellow-500 leading-tight">{project.title}</h1>

            {/* When the thumbnail is the diagram, it is shown under Architecture instead. */}
            {!project.thumbIsDiagram && (
                <img
                    src={project.img}
                    alt={`${shortName(project.title)} preview`}
                    className="mt-5 w-full aspect-video object-cover rounded-xl border border-gray-700"
                />
            )}

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
                    <Bullets items={project.highlights} />
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
                    <Diagram src={project.diagram} alt={`${shortName(project.title)} architecture diagram`} />
                </>
            )}

            {project.details && <Details items={project.details} />}

            {project.tags && <TagList tags={project.tags} />}

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

            <BackLink to={pagePath('projects')} label="All projects" />
        </article>
    );
}
