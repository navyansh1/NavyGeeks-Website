import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Github, FolderOpen, ExternalLink, X, MousePointerClick, Apple, Play, ArrowRight } from 'lucide-react';
import Reveal from './Reveal';
import ShinyEffect from './ShinyEffect';
import { motion, AnimatePresence } from 'framer-motion';
import { projects } from '../data/projects';
import { pagePath } from '../data/site';

const Portfolio = () => {
    const [selectedProject, setSelectedProject] = useState(null);
    const scrollPosRef = useRef(0);

    // Lock body scroll when modal is open
    useEffect(() => {
        if (selectedProject) {
            scrollPosRef.current = window.scrollY;
            document.documentElement.style.overflow = 'hidden';
            document.body.style.overflow = 'hidden';
        } else {
            document.documentElement.style.overflow = '';
            document.body.style.overflow = '';
            window.scrollTo(0, scrollPosRef.current);
        }
        return () => {
            document.documentElement.style.overflow = '';
            document.body.style.overflow = '';
        };
    }, [selectedProject]);

    return (
        <div className='max-w-[1000px] mx-auto p-6 md:my-20 relative' id="portfolio">
            <h2 className='text-3xl md:text-5xl font-bold text-yellow-500 mb-8 flex items-center justify-center gap-3'><FolderOpen size={28} className='md:w-10 md:h-10' /> Projects</h2>
            <ShinyEffect left={0} top={0} size={1900} />

            {/* Grid - all cards are uniform height */}
            <div className='grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-6'>
                {projects.map((project) => (
                    <Reveal key={project.slug}>
                        <div
                            className='bg-gray-800/50 backdrop-blur-sm rounded-lg shadow-lg border border-gray-700 
                            hover:border-yellow-500/50 hover:shadow-yellow-500/10 hover:shadow-xl
                            transition-all duration-300 overflow-hidden cursor-pointer group'
                            onClick={() => setSelectedProject(project)}
                        >
                            <div className='p-2 md:p-4'>
                                <div className='aspect-video mb-3 overflow-hidden rounded-lg'>
                                    <img
                                        src={project.img}
                                        alt={`${project.title} screenshot`}
                                        loading="lazy"
                                        decoding="async"
                                        className='w-full h-full object-cover transition-transform duration-300 group-hover:scale-105'
                                    />
                                </div>
                                <div className='flex items-center justify-between'>
                                    <h3 className='text-base md:text-lg font-semibold text-gray-200 leading-tight min-h-[2.5rem] flex items-center pr-2'>
                                        {project.title}
                                    </h3>
                                    <div className='text-yellow-500 bg-yellow-500/10 p-1.5 rounded-md flex-shrink-0'>
                                        <MousePointerClick size={20} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Reveal>
                ))}
            </div>

            <div className='mt-8 text-center'>
                <Link to={pagePath('projects')} className='inline-flex items-center gap-2 text-yellow-400 hover:text-yellow-300 font-semibold'>
                    See all projects <ArrowRight size={18} />
                </Link>
            </div>

            {/* Modal Overlay */}
            <AnimatePresence>
                {selectedProject && (
                    <motion.div
                        className='fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4'
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        onClick={() => setSelectedProject(null)}
                    >
                        <motion.div
                            className='bg-gray-900 border border-gray-700 rounded-2xl max-w-[700px] w-full max-h-[90vh] overflow-y-auto shadow-2xl'
                            initial={{ opacity: 0, scale: 0.9, y: 30 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 30 }}
                            transition={{ duration: 0.25, ease: 'easeOut' }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Modal Image */}
                            <div className='relative'>
                                <img
                                    src={selectedProject.img}
                                    alt={selectedProject.title}
                                    className='w-full aspect-video object-cover rounded-t-2xl'
                                />
                                <button
                                    onClick={() => setSelectedProject(null)}
                                    className='absolute top-3 right-3 w-9 h-9 flex items-center justify-center 
                                    bg-black/60 backdrop-blur-sm text-white rounded-full 
                                    hover:bg-black/80 transition-colors'
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            {/* Modal Content */}
                            <div className='p-6'>
                                <h3 className='text-2xl md:text-3xl font-bold text-gray-100 mb-4'>
                                    {selectedProject.title}
                                </h3>
                                <p className='text-gray-300 leading-relaxed text-base md:text-lg mb-6'>
                                    {selectedProject.description}
                                </p>
                                <div className='flex flex-wrap gap-3 justify-center'>
                                    <Link
                                        to={pagePath(`projects/${selectedProject.slug}`)}
                                        className='flex items-center gap-2 px-5 py-2.5 border border-yellow-500 text-gray-100 rounded-lg
                                        font-semibold hover:bg-yellow-500 hover:text-gray-900 transition duration-300'
                                    >
                                        Project details
                                    </Link>
                                    {selectedProject.links.site && (
                                        <a
                                            href={selectedProject.links.site}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className='flex items-center gap-2 px-5 py-2.5 bg-yellow-600 text-white rounded-lg 
                                            font-semibold hover:bg-yellow-700 transition duration-300'
                                        >
                                            <ExternalLink size={18} />
                                            View Demo
                                        </a>
                                    )}
                                    {selectedProject.links.ios && (
                                        <a
                                            href={selectedProject.links.ios}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className='flex items-center gap-2 px-5 py-2.5 bg-slate-700 text-gray-200 rounded-lg 
                                            font-semibold hover:bg-slate-600 transition duration-300'
                                        >
                                            <Apple size={18} />
                                            App Store
                                        </a>
                                    )}
                                    {selectedProject.links.android && (
                                        <a
                                            href={selectedProject.links.android}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className='flex items-center gap-2 px-5 py-2.5 bg-slate-700 text-gray-200 rounded-lg 
                                            font-semibold hover:bg-slate-600 transition duration-300'
                                        >
                                            <Play size={18} />
                                            Google Play
                                        </a>
                                    )}
                                    {selectedProject.links.github && (
                                        <a
                                            href={selectedProject.links.github}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className='flex items-center gap-2 px-5 py-2.5 bg-slate-700 text-gray-200 rounded-lg 
                                            font-semibold hover:bg-slate-600 transition duration-300'
                                        >
                                            <Github size={18} />
                                            GitHub
                                        </a>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default Portfolio;
