import React from 'react';
import ProjectCard from './ProjectCard';

// The one layout used for every list of projects on the site.
const ProjectGrid = ({ projects, onOpen, headingLevel }) => (
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6'>
        {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} onOpen={onOpen} headingLevel={headingLevel} />
        ))}
    </div>
);

export default ProjectGrid;
