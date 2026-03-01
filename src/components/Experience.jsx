import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Briefcase } from 'lucide-react';
import Reveal from './Reveal';
import TestimonialsModal from './TestimonialsModal';

import youtubeimg from '/src/assets/experience/youtube.png';
import microsoftimg from '/src/assets/experience/microsoft.png';
import microsoftaward from '/src/assets/certifications/microsoft_award.png';
import hackclubimg from '/src/assets/experience/hackclub.png';
import ethnusimg from '/src/assets/experience/ethnus.png';
import ec_cellimg from '/src/assets/experience/e-cell.png';
import hitwicketimg from '/src/assets/experience/hitwicket.png';
import ganitimg from '/src/assets/experience/ganit.png';

const experiences = [
    {
        company: 'Ganit Inc',
        period: 'Sep 2025 - Present',
        description: [
            'Data Scientist | Gen AI Engineer',
            'Worked on FMCG and BFSI domain datasets, performing data cleaning, feature engineering, and exploratory data analysis (EDA) using Pandas and NumPy, and built machine learning models on financial data leveraging PostgreSQL for analytics',
            'Developed production-grade GenAI applications using FastAPI, LangChain, LangGraph, and AWS, supporting scalable data ingestion and retrieval pipelines'
        ],
        icon: ganitimg,
        link: 'https://www.ganitinc.com',
    },
    {
        company: 'Hitwicket',
        period: 'Dec 2024 - Aug 2025',
        description: [
            "Technical Growth Analyst at Hitwicket",
            "Built and optimized interactive HTML5 playables (cricket-themed) for mobile ad campaigns on Unity Ads, AppLovin, and Google Ads",
            "Managed end-to-end pipeline: design, video editing, compression, encoding, compliance, and deployment",
            "Ad Campaigns delivered 7M+ impressions"
        ],
        icon: hitwicketimg,
        link: 'https://hitwicket.com/',
        portfolioLink: 'https://navyansh1.github.io/playable-portfolio/'
    },
    {
        company: 'YouTube: NavyGeeks',
        period: '2021 - Present',
        description: 'Tech channel with 70 videos and 400k + views & counting!',
        icon: youtubeimg,
        link: 'https://www.youtube.com/@Navygeeks',
    },
    {
        company: 'Microsoft Innovations Club VIT Chennai',
        period: 'Dec 2022 - Dec 2024 || 2yrs',
        description: 'Social Media Head, Podcaster, Video Editor, Content Lead',
        icon: microsoftimg,
    },
    {
        company: 'HackClub VIT Chennai',
        period: 'Jun 2023 - Nov 2024 || 1yr 6mos',
        description: 'iOS App Developer. Tech Stack: SwiftUI, UIKit, Xcode',
        icon: hackclubimg,
    },
    {
        company: 'Ethnus Codemithra',
        period: 'Aug 2023 - Nov 2023 || 4mos',
        description: 'Full Stack Web Development internship. Tech Stack: MERN (MongoDB, ExpressJS, React, NodeJS)',
        icon: ethnusimg,
    },
    {
        company: 'E-Cell VIT Chennai',
        period: 'Aug 2022 - Nov 2023 || 8mos',
        description: 'Videographer & Video Editor ',
        icon: ec_cellimg,
        link: 'https://navyworks.vercel.app/',
    },

];

const Experience = () => {
    const [isTestimonialsOpen, setIsTestimonialsOpen] = useState(false);
    const [isAwardModalOpen, setIsAwardModalOpen] = useState(false);
    const [expandedCard, setExpandedCard] = useState(null);

    const toggleCard = (index) => {
        setExpandedCard(expandedCard === index ? null : index);
    };

    return (
        <div className='px-4 md:px-8 max-w-[1100px] mx-auto py-8 md:py-12'>
            <h1 className='text-4xl md:text-5xl text-yellow-500 font-bold text-center mb-8 md:mb-12 flex items-center justify-center gap-3'><Briefcase size={40} /> Experience</h1>

            {/* Timeline Layout */}
            <div className='relative'>
                {/* Center timeline line - desktop only */}
                <div className='hidden md:block absolute left-1/2 top-0 bottom-0 w-[2px] bg-yellow-500/30 -translate-x-1/2' />

                <div className='space-y-4 md:space-y-6'>
                    {experiences.map((experience, index) => (
                        <Reveal key={index} width="100%">
                            <div className={`flex flex-col md:flex-row items-center gap-2 md:gap-8 ${index % 2 === 0 ? '' : 'md:flex-row-reverse'}`}>
                                {/* Card */}
                                <div className='w-full md:w-[calc(50%-2rem)]'>
                                    <motion.div
                                        className='border-2 border-yellow-500/60 p-4 rounded-xl 
                                        hover:shadow-xl hover:border-yellow-400 transition-all duration-300 
                                        bg-purple-800/20 cursor-pointer'
                                        onClick={() => toggleCard(index)}
                                    >
                                        {/* Header row */}
                                        <div className='flex items-center gap-3'>
                                            <img
                                                src={experience.icon}
                                                alt={`${experience.company} icon`}
                                                className={`rounded-full flex-shrink-0 ${experience.company === 'Hitwicket' ? 'w-16 h-8 object-contain' :
                                                    experience.company === 'Ganit Inc' ? 'w-14 h-10 object-contain' :
                                                        'w-10 h-10'
                                                    }`}
                                            />
                                            <div className='flex-1 min-w-0'>
                                                <h2 className='text-gray-100 text-lg font-semibold leading-tight truncate'>{experience.company}</h2>
                                                <p className='text-gray-400 text-xs mt-0.5 font-medium'>{experience.period}</p>
                                            </div>
                                            <div className='text-yellow-500 text-sm flex-shrink-0'>
                                                {expandedCard === index ? '▲' : '▼'}
                                            </div>
                                        </div>

                                        {/* Brief description (always visible) */}
                                        <p className='text-gray-300 mt-2 text-sm leading-relaxed line-clamp-2'>
                                            {Array.isArray(experience.description) ? experience.description[0] : experience.description}
                                        </p>

                                        {/* Expandable content */}
                                        <div className={`transition-all duration-300 ease-in-out overflow-hidden ${expandedCard === index ? 'max-h-[500px] opacity-100 mt-2' : 'max-h-0 opacity-0'
                                            }`}>
                                            {Array.isArray(experience.description) && experience.description.length > 1 && (
                                                <ul className='text-gray-400 text-sm leading-relaxed list-disc pl-4 space-y-1 border-t border-yellow-500/20 pt-2'>
                                                    {experience.description.slice(1).map((point, idx) => (
                                                        <li key={idx}>{point}</li>
                                                    ))}
                                                </ul>
                                            )}

                                            {/* Action buttons */}
                                            <div className="flex gap-2 flex-wrap mt-3">
                                                {experience.link && experience.company !== 'YouTube: NavyGeeks' && experience.company !== 'E-Cell VIT Chennai' && (
                                                    <a
                                                        href={experience.link}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className='px-3 py-1.5 border border-yellow-500 text-white text-xs font-semibold rounded-lg hover:bg-yellow-500 hover:text-gray-900 transition duration-300'
                                                        onClick={(e) => e.stopPropagation()}
                                                    >
                                                        {experience.company === 'Hitwicket' ? 'View Website' : experience.company === 'Ganit Inc' ? 'View Website' : 'View Works'}
                                                    </a>
                                                )}
                                                {experience.portfolioLink && (
                                                    <a
                                                        href={experience.portfolioLink}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className='px-3 py-1.5 border border-yellow-500 text-white text-xs font-semibold rounded-lg hover:bg-yellow-500 hover:text-gray-900 transition duration-300'
                                                        onClick={(e) => e.stopPropagation()}
                                                    >
                                                        View Playable Ads
                                                    </a>
                                                )}
                                                {experience.company === 'YouTube: NavyGeeks' && experience.link && (
                                                    <a
                                                        href={experience.link}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className='px-3 py-1.5 border border-yellow-500 text-white text-xs font-semibold rounded-lg hover:bg-yellow-500 hover:text-gray-900 transition duration-300'
                                                        onClick={(e) => e.stopPropagation()}
                                                    >
                                                        View Channel
                                                    </a>
                                                )}
                                                {experience.company === 'E-Cell VIT Chennai' && experience.link && (
                                                    <a
                                                        href={experience.link}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className='px-3 py-1.5 border border-yellow-500 text-white text-xs font-semibold rounded-lg hover:bg-yellow-500 hover:text-gray-900 transition duration-300'
                                                        onClick={(e) => e.stopPropagation()}
                                                    >
                                                        View Works
                                                    </a>
                                                )}
                                                {experience.company === 'Hitwicket' && (
                                                    <button
                                                        onClick={(e) => { e.stopPropagation(); setIsTestimonialsOpen(true); }}
                                                        className='px-3 py-1.5 border border-yellow-500 text-white text-xs font-semibold rounded-lg hover:bg-yellow-500 hover:text-gray-900 transition duration-300'
                                                    >
                                                        View Testimonials
                                                    </button>
                                                )}
                                                {experience.company === 'Microsoft Innovations Club VIT Chennai' && (
                                                    <button
                                                        onClick={(e) => { e.stopPropagation(); setIsAwardModalOpen(true); }}
                                                        className='px-3 py-1.5 border border-yellow-500 text-white text-xs font-semibold rounded-lg hover:bg-yellow-500 hover:text-gray-900 transition duration-300'
                                                    >
                                                        View Award
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    </motion.div>
                                </div>

                                {/* Timeline dot - desktop only */}
                                <div className='hidden md:flex items-center justify-center flex-shrink-0'>
                                    <div className='w-3 h-3 rounded-full bg-yellow-500 ring-4 ring-yellow-500/20 z-10' />
                                </div>

                                {/* Empty spacer for alternating layout */}
                                <div className='hidden md:block w-[calc(50%-2rem)]' />
                            </div>
                        </Reveal>
                    ))}
                </div>
            </div>

            <TestimonialsModal
                isOpen={isTestimonialsOpen}
                onClose={() => setIsTestimonialsOpen(false)}
            />

            {/* Award Modal */}
            {isAwardModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-2 md:p-4" onClick={() => setIsAwardModalOpen(false)}>
                    <div className="bg-gray-800 rounded-2xl p-3 md:p-6 max-w-6xl w-full max-h-[95vh] overflow-y-auto border-2 border-yellow-500 relative" onClick={(e) => e.stopPropagation()}>
                        <button
                            onClick={() => setIsAwardModalOpen(false)}
                            className="absolute top-2 right-2 md:top-4 md:right-4 text-gray-400 hover:text-white text-2xl font-bold w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-700 transition-colors"
                        >
                            ×
                        </button>
                        <div className="flex justify-center mt-12 md:mt-8">
                            <img
                                src={microsoftaward}
                                alt="Microsoft Innovation Club Award"
                                className="w-full md:max-w-4xl h-auto rounded-lg shadow-lg object-contain"
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Experience;
