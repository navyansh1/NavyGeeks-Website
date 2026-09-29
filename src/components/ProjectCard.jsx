import React from 'react';
import { Link } from 'react-router-dom';
import { Lock } from 'lucide-react';
import { pagePath } from '../data/site';

// Card linking to a project's own page (with `onOpen`, a click opens a quick view instead).
const ProjectCard = ({ project, headingLevel = 'h3', onOpen }) => {
    const Heading = headingLevel;
    return (
        <Link
            to={pagePath(`projects/${project.slug}`)}
            onClick={(e) => {
                // Plain click opens the quick view; ctrl/cmd/middle click still opens the page.
                if (!onOpen || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
                e.preventDefault();
                onOpen(project);
            }}
            className='group flex flex-col h-full bg-gray-800/50 rounded-lg border border-gray-700 hover:border-yellow-500/50 hover:shadow-xl hover:shadow-yellow-500/10 transition-all duration-300 overflow-hidden'
        >
            <div className='aspect-video overflow-hidden'>
                <img
                    src={project.img}
                    alt={`${project.title} thumbnail`}
                    loading="lazy"
                    decoding="async"
                    className='w-full h-full object-cover transition-transform duration-300 group-hover:scale-105'
                />
            </div>
            <div className={`flex flex-col gap-2 flex-1 p-4`}>
                <Heading className={`text-base md:text-lg font-semibold text-gray-100 leading-snug group-hover:text-yellow-400 transition-colors`}>
                    {project.title}
                </Heading>
                <span className='text-xs uppercase tracking-wide font-medium text-gray-400'>{project.kind}</span>
                <div className='mt-auto flex flex-wrap items-center gap-1.5 pt-1'>
                    {project.isPrivate && (
                        <span className='inline-flex items-center gap-1 text-[11px] leading-none font-medium text-gray-300 bg-gray-700/60 rounded-full px-2 py-1'>
                            <Lock size={11} /> Private code
                        </span>
                    )}
                    {project.stack.slice(0, 3).map((tech) => (
                        <span key={tech} className='text-[11px] leading-none font-medium text-yellow-400 bg-yellow-500/10 border border-yellow-500/30 rounded-full px-2 py-1'>
                            {tech}
                        </span>
                    ))}
                </div>
            </div>
        </Link>
    );
};

export default ProjectCard;
