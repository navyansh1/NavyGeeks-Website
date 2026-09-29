import React from 'react';
import Layout from './Layout';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import { ExperiencePage, EducationPage, CertificationsPage } from './pages/SectionPages';
import { ResearchIndexPage, PaperPage } from './pages/ResearchPages';
import { ProjectsIndexPage, ProjectPage } from './pages/ProjectPages';
import { papers } from './data/research';
import { projects } from './data/projects';

// Every path listed here (plus the getStaticPaths of dynamic routes) is pre-rendered
// to static HTML at build time by vite-react-ssg.
export const routes = [
    {
        path: '/',
        element: <Layout />,
        entry: 'src/Layout.jsx',
        children: [
            { index: true, element: <Home /> },
            { path: 'experience', element: <ExperiencePage /> },
            { path: 'education', element: <EducationPage /> },
            { path: 'certifications', element: <CertificationsPage /> },
            { path: 'research', element: <ResearchIndexPage /> },
            {
                path: 'research/:slug',
                element: <PaperPage />,
                getStaticPaths: () => papers.map((p) => `research/${p.slug}`),
            },
            { path: 'projects', element: <ProjectsIndexPage /> },
            {
                path: 'projects/:slug',
                element: <ProjectPage />,
                getStaticPaths: () => projects.map((p) => `projects/${p.slug}`),
            },
            // Rendered to 404/index.html and copied to 404.html after the build.
            { path: '404', element: <NotFound /> },
            { path: '*', element: <NotFound /> },
        ],
    },
];
