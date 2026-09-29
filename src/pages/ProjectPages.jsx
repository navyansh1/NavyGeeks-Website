import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { Github, ExternalLink, Apple, Play, ArrowLeft } from 'lucide-react';
import Seo, { breadcrumbSchema } from '../components/Seo';
import Breadcrumbs from '../components/Breadcrumbs';
import NotFound from './NotFound';
import { projects, getProject } from '../data/projects';
import { PERSON_ID, SITE_NAME, absoluteUrl, imageUrl, pagePath } from '../data/site';

const linkClass = 'flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold transition duration-300';

const projectSchema = (project, path) => {
    const base = {
        '@type': project.type,
        name: project.title,
        description: project.metaDescription,
        image: imageUrl(project.img),
        mainEntityOfPage: absoluteUrl(path),
        author: { '@id': PERSON_ID },
    };
    const { site, github, ios, android } = project.links;

    if (project.type === 'MobileApplication' || project.type === 'WebApplication') {
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
    return { ...base, url: site, keywords: project.stack.join(', ') || undefined };
};

export function ProjectsIndexPage() {
    const crumbs = [{ name: 'Home', path: '/' }, { name: 'Projects', path: '/projects' }];
    const description =
        'Projects by Navyansh Kothari: VedicFlow Hindu calendar app, Bill Sonic POS, ML demand forecasting and fraud detection, NextForms, an AI quiz generator and iOS apps.';

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
        <div className="pt-20 md:pt-24 max-w-[1000px] mx-auto px-6 pb-8">
            <Seo title={`Projects | ${SITE_NAME}`} description={description} path="/projects" schema={schema} />
            <Breadcrumbs items={crumbs} />
            <h1 className="text-3xl md:text-5xl font-bold text-yellow-500 mb-3">Projects</h1>
            <p className="text-base md:text-lg text-gray-300 mb-8 max-w-[750px]">
                Mobile apps, machine learning case studies, web apps and design work.
            </p>

            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {projects.map((project) => (
                    <li key={project.slug} className="bg-gray-800/50 rounded-lg border border-gray-700 hover:border-yellow-500/50 transition-colors overflow-hidden">
                        <Link to={pagePath(`projects/${project.slug}`)} className="block p-3 md:p-4 group">
                            <div className="aspect-video mb-3 overflow-hidden rounded-lg">
                                <img
                                    src={project.img}
                                    alt={`${project.title} screenshot`}
                                    loading="lazy"
                                    decoding="async"
                                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                />
                            </div>
                            <h2 className="text-base md:text-lg font-semibold text-gray-200 leading-tight group-hover:text-yellow-400 transition-colors">
                                {project.title}
                            </h2>
                            <p className="mt-2 text-sm text-gray-400 line-clamp-3">{project.metaDescription}</p>
                        </Link>
                    </li>
                ))}
            </ul>
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
        { name: project.title, path },
    ];
    const { site, github, ios, android } = project.links;
    const related = projects.filter((p) => p.slug !== project.slug).slice(0, 4);

    return (
        <article className="pt-20 md:pt-24 max-w-[900px] mx-auto px-6 pb-8">
            <Seo
                title={`${project.title} | ${SITE_NAME}`}
                description={project.metaDescription}
                path={path}
                image={imageUrl(project.img)}
                schema={[projectSchema(project, path), breadcrumbSchema(crumbs)]}
            />
            <Breadcrumbs items={crumbs} />

            <h1 className="text-2xl md:text-4xl font-bold text-yellow-500 leading-tight mb-5">{project.title}</h1>

            <img
                src={project.img}
                alt={`${project.title} screenshot`}
                className="w-full aspect-video object-cover rounded-xl border border-gray-700"
            />

            <p className="mt-6 text-base md:text-lg text-gray-300 leading-relaxed">
                {project.title.split(' - ')[0]} is a {project.kind} by Navyansh Kothari.
            </p>
            <p className="mt-3 text-base md:text-lg text-gray-300 leading-relaxed">{project.description}</p>

            {(project.stack.length > 0 || project.platforms) && (
                <>
                    <h2 className="text-xl md:text-2xl font-semibold text-gray-100 mt-8 mb-3">
                        {project.platforms ? 'Platforms & tech' : 'Built with'}
                    </h2>
                    <ul className="flex flex-wrap gap-2">
                        {[...(project.platforms || []), ...project.stack].map((tech) => (
                            <li key={tech} className="text-sm font-medium text-yellow-400 bg-yellow-500/10 border border-yellow-500/30 rounded-full px-3 py-1">
                                {tech}
                            </li>
                        ))}
                    </ul>
                </>
            )}

            <div className="mt-8 flex flex-wrap gap-3">
                {site && (
                    <a href={site} target="_blank" rel="noopener noreferrer" className={`${linkClass} bg-yellow-600 text-white hover:bg-yellow-700`}>
                        <ExternalLink size={18} /> View Demo
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

            <h2 className="text-xl md:text-2xl font-semibold text-gray-100 mt-12 mb-3">More projects</h2>
            <ul className="space-y-2">
                {related.map((p) => (
                    <li key={p.slug}>
                        <Link to={pagePath(`projects/${p.slug}`)} className="text-base text-gray-300 hover:text-yellow-400 transition-colors">
                            {p.title}
                        </Link>
                    </li>
                ))}
            </ul>

            <Link to={pagePath('projects')} className="mt-8 inline-flex items-center gap-2 text-yellow-400 hover:text-yellow-300 font-semibold">
                <ArrowLeft size={18} /> All projects
            </Link>
        </article>
    );
}
