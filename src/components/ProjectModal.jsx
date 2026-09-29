import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Github, Apple, Play, Lock, ArrowRight } from 'lucide-react';
import Flow from './Flow';
import { pagePath } from '../data/site';

const btn = 'flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition duration-300';

// Quick view of a project; the full write-up lives on its own page.
const ProjectModal = ({ project, onClose }) => {
    useEffect(() => {
        if (!project) return undefined;
        const onKey = (e) => e.key === 'Escape' && onClose();
        const y = window.scrollY;
        document.documentElement.style.overflow = 'hidden';
        document.body.style.overflow = 'hidden';
        window.addEventListener('keydown', onKey);
        return () => {
            document.documentElement.style.overflow = '';
            document.body.style.overflow = '';
            window.removeEventListener('keydown', onKey);
            window.scrollTo(0, y);
        };
    }, [project, onClose]);

    return (
        <AnimatePresence>
            {project && (
                <motion.div
                    className='fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[1001] p-3 md:p-4'
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15 }}
                    onClick={onClose}
                >
                    <motion.div
                        role="dialog"
                        aria-modal="true"
                        aria-label={project.title}
                        className='bg-gray-900 border border-gray-700 rounded-2xl max-w-[760px] w-full max-h-[90vh] overflow-y-auto shadow-2xl'
                        initial={{ opacity: 0, scale: 0.96, y: 16 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.96, y: 16 }}
                        transition={{ duration: 0.2, ease: 'easeOut' }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className='relative'>
                            <img src={project.img} alt={`${project.title} preview`} className='w-full aspect-video max-h-[32vh] object-cover object-top rounded-t-2xl' />
                            <button
                                onClick={onClose}
                                aria-label="Close"
                                className='absolute top-3 right-3 w-9 h-9 flex items-center justify-center bg-black/60 text-white rounded-full hover:bg-black/80 transition-colors'
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <div className='p-4 md:p-6 flex flex-col gap-5'>
                            <div>
                                <h3 className='text-xl md:text-2xl font-bold text-gray-100 leading-snug'>{project.title}</h3>
                                <span className='text-xs uppercase tracking-wide font-medium text-gray-400'>{project.kind}</span>
                            </div>

                            <ul className='list-disc list-outside pl-5 space-y-1.5 text-gray-300 text-sm md:text-base leading-relaxed'>
                                <li>{project.summary}</li>
                                {(project.highlights || []).slice(0, 3).map((h) => <li key={h}>{h}</li>)}
                            </ul>

                            {project.flow && <Flow steps={project.flow} />}

                            {project.tags && (
                                <ul className='flex flex-wrap gap-1.5' aria-label="Tags">
                                    {project.tags.slice(0, 6).map((t) => (
                                        <li key={t} className='text-[11px] font-medium text-yellow-400 bg-yellow-500/10 border border-yellow-500/30 rounded-full px-2.5 py-1'>{t}</li>
                                    ))}
                                </ul>
                            )}

                            <div className='flex flex-wrap gap-2'>
                                <Link to={pagePath(`projects/${project.slug}`)} onClick={onClose} className={`${btn} bg-yellow-600 text-white hover:bg-yellow-700`}>
                                    Read full write-up <ArrowRight size={16} />
                                </Link>
                                {project.links.site && (
                                    <a href={project.links.site} target="_blank" rel="noopener noreferrer" className={`${btn} border border-yellow-500 text-gray-100 hover:bg-yellow-500 hover:text-gray-900`}>
                                        <ExternalLink size={16} /> {project.type === 'CreativeWork' ? 'View' : 'Live demo'}
                                    </a>
                                )}
                                {project.links.ios && (
                                    <a href={project.links.ios} target="_blank" rel="noopener noreferrer" className={`${btn} bg-slate-700 text-gray-200 hover:bg-slate-600`}><Apple size={16} /> App Store</a>
                                )}
                                {project.links.android && (
                                    <a href={project.links.android} target="_blank" rel="noopener noreferrer" className={`${btn} bg-slate-700 text-gray-200 hover:bg-slate-600`}><Play size={16} /> Google Play</a>
                                )}
                                {project.links.github && (
                                    <a href={project.links.github} target="_blank" rel="noopener noreferrer" className={`${btn} bg-slate-700 text-gray-200 hover:bg-slate-600`}><Github size={16} /> GitHub</a>
                                )}
                            </div>

                            {project.isPrivate && (
                                <span className='flex items-center gap-1.5 text-xs text-gray-400'><Lock size={12} /> Private code</span>
                            )}
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default ProjectModal;
