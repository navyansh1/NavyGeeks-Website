import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Trophy, Play } from 'lucide-react';
import Reveal from './Reveal';
import classXIIImage from '/src/assets/education/classxiimarksheet.png';
import classXImage from '/src/assets/education/classxmarksheet.png';
import vitImage from '/src/assets/education/vit-logo.png';
import chinmayaImage from '/src/assets/education/chinmaya-logo.png';
import collegeSheetImage from '/src/assets/education/collegesheet.png';

// Education data
const educations = [
    {
        institution: 'VIT',
        period: 'Aug 2021 - Aug 2025',
        description: 'BTech in Computer Science & Engineering | CGPA: 8.3',
        icon: vitImage,
        degree: collegeSheetImage,
        graduationVideo: 'https://youtu.be/OOzMpIGSRWs',
    },
    {
        institution: 'Chinmaya Vidyalaya',
        period: 'Class XII - CBSE | Mar 2020 - Apr 2021',
        description: 'Score: 94.8% | School Topper in Physics',
        highlight: true,
        icon: chinmayaImage,
        marksheet: classXIIImage,
    },
    {
        institution: 'Chinmaya Vidyalaya',
        period: 'Class X - CBSE | Mar 2018 - Apr 2019',
        description: 'Score: 91.5%',
        icon: chinmayaImage,
        marksheet: classXImage,
    },
];

const Education = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentMarksheet, setCurrentMarksheet] = useState('');

    const openModal = (marksheet) => {
        setCurrentMarksheet(marksheet);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setCurrentMarksheet('');
    };

    return (
        <div className='p-8 max-w-[1000px] mx-auto'>
            <h1 className='text-4xl md:text-5xl text-yellow-500 font-bold text-center mb-6 flex items-center justify-center gap-3'>
                <GraduationCap size={36} /> Education
            </h1>
            <motion.div
                className='space-y-4'
                initial="hidden"
                animate="visible"
            >
                {educations.map((education, index) => (
                    <Reveal key={index} width="100%">
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: false, amount: 0.3 }}
                            transition={{ duration: 1 }}
                            className='border-2 border-yellow-500/60 p-4 rounded-xl
                            hover:shadow-xl hover:border-yellow-400 transition-all duration-300 bg-purple-800/20 max-w-[550px] w-full mx-auto'
                        >
                            <div className='flex items-center justify-between mb-1'>
                                <h2 className='text-gray-100 text-lg font-semibold'>{education.institution}</h2>
                                <img src={education.icon} alt={`${education.institution} icon`} className='w-10 h-10 rounded-full' />
                            </div>
                            <p className='text-gray-400 text-sm mb-1 font-medium'>{education.period}</p>
                            <p className='text-gray-300 text-sm leading-relaxed flex items-center gap-1'>
                                {education.description}
                                {education.highlight && <Trophy size={16} className='text-yellow-400 ml-1' />}
                            </p>

                            <div className='mt-3 flex flex-wrap gap-2 justify-center'>
                                {education.marksheet && (
                                    <button
                                        onClick={() => openModal(education.marksheet)}
                                        className='px-3 py-1.5 border border-yellow-500 text-white text-xs font-semibold rounded-lg hover:bg-yellow-500 hover:text-gray-900 transition duration-300'
                                    >
                                        View Marksheet
                                    </button>
                                )}

                                {education.degree && (
                                    <button
                                        onClick={() => openModal(education.degree)}
                                        className='px-3 py-1.5 border border-yellow-500 text-white text-xs font-semibold rounded-lg hover:bg-yellow-500 hover:text-gray-900 transition duration-300'
                                    >
                                        View Degree
                                    </button>
                                )}

                                {education.graduationVideo && (
                                    <button
                                        onClick={() => window.open(education.graduationVideo, '_blank')}
                                        className='px-3 py-1.5 border border-yellow-500 text-white text-xs font-semibold rounded-lg hover:bg-yellow-500 hover:text-gray-900 transition duration-300 flex items-center gap-1'
                                    >
                                        Graduation Video <Play size={14} />
                                    </button>
                                )}
                            </div>
                        </motion.div>
                    </Reveal>
                ))}
            </motion.div>

            {isModalOpen && (
                <div className='fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4'>
                    <div className='relative max-w-4xl max-h-[90vh] bg-purple-900/90 p-4 rounded-xl border-2 border-yellow-500'>
                        <button
                            onClick={closeModal}
                            className='absolute top-2 right-2 w-8 h-8 flex items-center justify-center bg-red-500 text-white rounded-full hover:bg-red-600 transition'
                        >
                            <span className='text-lg font-bold'>×</span>
                        </button>
                        <img
                            src={currentMarksheet}
                            alt="Marksheet"
                            className='max-w-full max-h-[80vh] rounded-lg object-contain'
                        />
                    </div>
                </div>
            )}
        </div>
    );
}

export default Education;
