import React, { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { FolderOpen, ArrowRight } from 'lucide-react';
import ShinyEffect from './ShinyEffect';
import ProjectGrid from './ProjectGrid';
import MoreProjects from './MoreProjects';
import ProjectModal from './ProjectModal';
import { featuredProjects } from '../data/projects';
import { pagePath } from '../data/site';

const Portfolio = () => {
    const [open, setOpen] = useState(null);
    const close = useCallback(() => setOpen(null), []);
    return (
    <div className='max-w-[1100px] mx-auto p-4 md:p-6 md:my-20 relative' id="portfolio">
        <h2 className='text-3xl md:text-5xl font-bold text-yellow-500 mb-8 flex items-center justify-center gap-3'>
            <FolderOpen size={28} className='md:w-10 md:h-10' /> Projects
        </h2>
        <ShinyEffect left={0} top={0} size={1900} />

        <ProjectGrid projects={featuredProjects} onOpen={setOpen} />

        <MoreProjects onOpen={setOpen} />

        <div className='mt-8 text-center'>
            <Link to={pagePath('projects')} className='inline-flex items-center gap-2 text-yellow-400 hover:text-yellow-300 font-semibold'>
                See all projects <ArrowRight size={18} />
            </Link>
        </div>

        <ProjectModal project={open} onClose={close} />
    </div>
    );
};

export default Portfolio;
