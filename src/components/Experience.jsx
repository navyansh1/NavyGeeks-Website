import React from 'react';
import { motion } from 'framer-motion';
import Reveal from './Reveal';

import youtubeimg from '/src/assets/youtube.png';
import microsoftimg from '/src/assets/microsoft.png';
import hackclubimg from '/src/assets/hackclub.png';
import ethnusimg from '/src/assets/ethnus.png';
import ec_cellimg from '/src/assets/e-cell.png';
import hitwicketimg from '/src/assets/hitwicket.png';

const experiences = [
    {
        company: 'Hitwicket',
        period: 'Dec 2024 - Present',
        description: "Growth Analyst intern at Hitwicket.",
        icon: hitwicketimg,
        link: 'https://hitwicket.com/',
    },
  {
      company: 'YouTube: NavyGeeks',
      period: '2021 - Present',
      description: 'Tech channel with 70 videos and 4Lakh+ views & counting!',
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
                            <img src={experience.icon} alt={`${experience.company} icon`} className={`rounded-full ${experience.company === 'Hitwicket' ? 'w-24 h-12' : 'w-12 h-12'}`} />
                        </div>
                    </div>
                    <p className='text-gray-300 text-sm mb-2 font-medium'>{experience.period}</p>
                    <p className='text-gray-400 mt-2 text-base leading-relaxed'>{experience.description}</p>
                    {experience.link && (
                        <a 
                            href={experience.link} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className='mt-4 inline-block px-4 py-2 border-2 border-yellow-500 text-white font-semibold rounded-lg hover:bg-yellow-500 hover:text-gray-900 transition duration-300'
                        >
                            {experience.company === 'YouTube: NavyGeeks' ? 'View Channel' : experience.company === 'Hitwicket' ? 'View Website' : 'View Works'}
                        </a>
                    )}
                </div>
                </Reveal>
            ))}
        </div>
    </div>
  );
}

export default Experience;
