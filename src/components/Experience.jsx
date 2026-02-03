import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Reveal from './Reveal';
import TestimonialsModal from './TestimonialsModal';

import youtubeimg from '/src/assets/youtube.png';
import microsoftimg from '/src/assets/microsoft.png';
import microsoftaward from '/src/assets/microsoft_award.png';
import hackclubimg from '/src/assets/hackclub.png';
import ethnusimg from '/src/assets/ethnus.png';
import ec_cellimg from '/src/assets/e-cell.png';
import hitwicketimg from '/src/assets/hitwicket.png';
import ganitimg from '/src/assets/ganit.png';

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
        period: 'Dec 2022 - Dec 2024ㅤ||ㅤ2yrs',
        description: 'Social Media Head, Podcaster, Video Editor, Content Lead',
        icon: microsoftimg,
    },
    {
        company: 'HackClub VIT Chennai',
        period: 'Jun 2023 - Nov 2024ㅤ||ㅤ1yr 6mos',
        description: 'iOS App Developer. Tech Stack: SwiftUI, UIKit, Xcode',
        icon: hackclubimg,
    },
    {
        company: 'Ethnus Codemithra',
        period: 'Aug 2023 - Nov 2023ㅤ||ㅤ4mos',
        description: 'Full Stack Web Development internship. Tech Stack: MERN (MongoDB, ExpressJS, React, NodeJS)',
        icon: ethnusimg,
    },
    {
        company: 'E-Cell VIT Chennai',
        period: 'Aug 2022 - Nov 2023ㅤ||ㅤ8mos',
        description: 'Videographer & Video Editor ',
        icon: ec_cellimg,
        link: 'https://navyworks.vercel.app/',
    },

];

const Experience = () => {
    const [isTestimonialsOpen, setIsTestimonialsOpen] = useState(false);
    const [isAwardModalOpen, setIsAwardModalOpen] = useState(false);

    return (
        <div className='p-8 max-w-[600px] mx-auto'>
            <h1 className='text-5xl text-yellow-500 font-bold text-center mb-12'>Experience:</h1>
            <div className='space-y-8 flex flex-col items-center'>
                {experiences.map((experience, index) => (
                    <Reveal key={index}>
                        <div
                            className='border-4 border-yellow-500 p-6 rounded-2xl shadow-md
                    hover:shadow-xl transition-shadow duration-300 bg-purple-800/30 shadow-lg mx-auto'
                            style={{ width: '350px' }}
                        >
                            <div className='flex items-center justify-between mb-3'>
                                <h2 className='text-gray-100 text-2xl font-semibold'>{experience.company}</h2>
                                <div className="flex-shrink-0">
                                    <img src={experience.icon} alt={`${experience.company} icon`} className={`rounded-full ${experience.company === 'Hitwicket' ? 'w-24 h-12' : experience.company === 'Ganit Inc' ? 'w-20 h-16' : 'w-12 h-12'}`} />
                                </div>
                            </div>
                            <p className='text-gray-300 text-sm mb-2 font-medium'>{experience.period}</p>
                            {Array.isArray(experience.description) ? (
                                <ul className='text-gray-400 mt-2 text-base leading-relaxed list-disc pl-4 space-y-1'>
                                    {experience.description.map((point, idx) => (
                                        <li key={idx}>{point}</li>
                                    ))}
                                </ul>
                            ) : (
                                <p className='text-gray-400 mt-2 text-base leading-relaxed'>{experience.description}</p>
                            )}
                            <div className="flex gap-4 flex-wrap">
                                {experience.link && experience.company !== 'YouTube: NavyGeeks' && experience.company !== 'E-Cell VIT Chennai' && (
                                    <a
                                        href={experience.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className='mt-4 inline-block px-3 py-1.5 border-2 border-yellow-500 text-white text-sm font-semibold rounded-lg hover:bg-yellow-500 hover:text-gray-900 transition duration-300'
                                    >
                                        {experience.company === 'Hitwicket' ? 'View Website' : experience.company === 'Ganit Inc' ? 'View Website' : 'View Works'}
                                    </a>
                                )}
                                {experience.portfolioLink && (
                                    <a
                                        href={experience.portfolioLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className='mt-4 inline-block px-3 py-1.5 border-2 border-yellow-500 text-white text-sm font-semibold rounded-lg hover:bg-yellow-500 hover:text-gray-900 transition duration-300'
                                    >
                                        View Playable Ads
                                    </a>
                                )}
                            </div>
                            {experience.company === 'YouTube: NavyGeeks' && experience.link && (
                                <div className="w-full mt-4">
                                    <a
                                        href={experience.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className='w-full px-4 py-2 border-2 border-yellow-500 text-white text-sm font-semibold rounded-lg hover:bg-yellow-500 hover:text-gray-900 transition duration-300 inline-block text-center'
                                    >
                                        View Channel
                                    </a>
                                </div>
                            )}
                            {experience.company === 'E-Cell VIT Chennai' && experience.link && (
                                <div className="w-full mt-4">
                                    <a
                                        href={experience.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className='w-full px-4 py-2 border-2 border-yellow-500 text-white text-sm font-semibold rounded-lg hover:bg-yellow-500 hover:text-gray-900 transition duration-300 inline-block text-center'
                                    >
                                        View Works
                                    </a>
                                </div>
                            )}
                            {experience.company === 'Hitwicket' && (
                                <div className="w-full mt-4">
                                    <button
                                        onClick={() => setIsTestimonialsOpen(true)}
                                        className='w-full px-4 py-2 border-2 border-yellow-500 text-white text-sm font-semibold rounded-lg hover:bg-yellow-500 hover:text-gray-900 transition duration-300'
                                    >
                                        View Testimonials
                                    </button>
                                </div>
                            )}
                            {experience.company === 'Microsoft Innovations Club VIT Chennai' && (
                                <div className="w-full mt-4">
                                    <button
                                        onClick={() => setIsAwardModalOpen(true)}
                                        className='w-full px-4 py-2 border-2 border-yellow-500 text-white text-sm font-semibold rounded-lg hover:bg-yellow-500 hover:text-gray-900 transition duration-300'
                                    >
                                        View Award
                                    </button>
                                </div>
                            )}
                        </div>
                    </Reveal>
                ))}
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
