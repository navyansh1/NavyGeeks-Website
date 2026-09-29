import React from 'react';
import { ChevronDown } from 'lucide-react';
import ProjectGrid from './ProjectGrid';
import { moreProjects } from '../data/projects';

// Smaller and older projects, collapsed by default. The links stay in the HTML for crawlers.
const MoreProjects = ({ onOpen }) => (
    <details className='group mt-8 rounded-lg border border-gray-700 bg-gray-800/30'>
        <summary className='flex items-center justify-between gap-3 cursor-pointer list-none px-4 py-3 text-gray-200 font-semibold hover:text-yellow-400 transition-colors [&::-webkit-details-marker]:hidden'>
            <span className='text-base md:text-lg font-semibold text-inherit'>More projects ({moreProjects.length})</span>
            <ChevronDown size={20} className='transition-transform group-open:rotate-180' />
        </summary>
        <div className='p-4 pt-1'>
            <ProjectGrid projects={moreProjects} onOpen={onOpen} />
        </div>
    </details>
);

export default MoreProjects;
