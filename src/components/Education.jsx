import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Reveal from './Reveal';
import classXIIImage from '/src/assets/classxiimarksheet.png';
import classXImage from '/src/assets/classxmarksheet.png';
import vitImage from '/src/assets/vit-logo.png'; // Path to VIT image 🏫
import chinmayaImage from '/src/assets/chinmaya-logo.png'; // Path to Chinmaya Vidyalaya image 🏫
import collegeSheetImage from '/src/assets/collegesheet.png'; // Path to college degree certificate

// Education data
const educations = [
    {
        institution: 'Vellore Institute of Technology 🏛️ ㅤㅤ',
        period: 'Aug 2021 - Aug 2025',
        description: 'BTech in Computer Science & Engineering | CGPA: 8.3',
        icon: vitImage,
        degree: collegeSheetImage,
        graduationVideo: 'https://youtu.be/OOzMpIGSRWs',
    },
    {
        institution: 'Chinmaya Vidyalaya 🏫ㅤㅤㅤㅤㅤ',
        period: 'Class XII - CBSE | Mar 2020 - Apr 2021',
        description: 'Score: 94.8% | School Topper in Physics 🥇ㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤ',
        icon: chinmayaImage,
        marksheet: classXIIImage,
    },
    {
        institution: 'Chinmaya Vidyalaya 🏫ㅤㅤㅤㅤㅤ',
        period: 'Class X - CBSE | Mar 2018 - Apr 2019',
        description: 'Score: 91.5%ㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤ',
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
        <div className='p-8 max-w-[600px] mx-auto'>
            <h1 className='text-5xl text-yellow-500 font-bold text-center mb-12'>Education:</h1>
            <motion.div
                className='space-y-8'
                initial="hidden"
                animate="visible"
            >
                {educations.map((education, index) => (
                    <Reveal key={index}>
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: false, amount: 0.3}}
                            transition={{ duration: 1}}
                            className='border-4 border-yellow-500 p-6 rounded-2xl shadow-md
                            hover:shadow-xl transition-shadow duration-300 bg-purple-800/30 shadow-lg w-full'
                        >
                            <div className='flex items-center justify-between mb-3'>
                                <h2 className='text-gray-100 text-2xl font-semibold'>{education.institution}</h2>
                                <img src={education.icon} alt={`${education.institution} icon`} className='w-14 h-14 rounded-full' />
                            </div>
                            <p className='text-gray-300 text-base mb-2 font-medium'>{education.period}</p>
                            <p className='text-gray-400 mt-2 text-lg leading-relaxed'>{education.description}</p>
                            
                            <div className='mt-4 flex flex-wrap gap-3'>
                                {education.marksheet && (
                                    <button 
                                        onClick={() => openModal(education.marksheet)}
                                        className='px-4 py-2 border-2 border-yellow-500 text-white font-semibold rounded-lg hover:bg-yellow-500 hover:text-gray-900 transition duration-300'
                                    >
                                        View Marksheet
                                    </button>
                                )}
                                
                                {education.degree && (
                                    <button 
                                        onClick={() => openModal(education.degree)}
                                        className='px-4 py-2 border-2 border-yellow-500 text-white font-semibold rounded-lg hover:bg-yellow-500 hover:text-gray-900 transition duration-300 w-full sm:w-auto sm:min-w-[200px]'
                                    >
                                        View Degree
                                    </button>
                                )}
                                
                                {education.graduationVideo && (
                                    <button 
                                        onClick={() => window.open(education.graduationVideo, '_blank')}
                                        className='px-4 py-2 border-2 border-yellow-500 text-white font-semibold rounded-lg hover:bg-yellow-500 hover:text-gray-900 transition duration-300 w-full sm:w-auto sm:min-w-[200px]'
                                    >
                                        View Graduation Video ▶️ 
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
                            ✖️
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
