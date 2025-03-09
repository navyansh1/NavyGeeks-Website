import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Reveal from './Reveal';
import classXIIImage from '/src/assets/classxiimarksheet.png';
import classXImage from '/src/assets/classxmarksheet.png';
import vitImage from '/src/assets/vit-logo.png'; // Path to VIT image 🏫
import chinmayaImage from '/src/assets/chinmaya-logo.png'; // Path to Chinmaya Vidyalaya image 🏫

// Experience data
const experiences = [
    {
        company: 'Vellore Institute of Technology, Chennai 🏛️',
        period: 'Sept 2021 - Aug 2025',
        description: [
            'BTech in Computer Science & Engineering 💻',
            'CGPA: 8.3'
        ],
        image: vitImage, // Image for VIT
    },
    {
        company: 'Chinmaya Vidyalaya 🏫',
        period: 'Class XII - CBSE | Mar 2020 - Apr 2021ㅤㅤㅤ',
        description: [
            'Score: 94.8%',
            'School Topper in Physics 🥇'
        ],
        marksheet: classXIIImage,
        image: chinmayaImage, // Image for Chinmaya Vidyalaya
    },
    {
        company: 'Chinmaya Vidyalaya 🏫',
        period: 'Class X - CBSE  | Mar 2018 - Apr 2019ㅤㅤㅤㅤ',
        description: [
            'Score: 91.5%'
        ],
        marksheet: classXImage,
        image: chinmayaImage, // Same image for Class X
    },
];

const Experience = () => {
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
            <h1 className='text-5xl text-yellow-500 font-bold text-center mb-12'>Education 📚</h1>
            <motion.div
                className='space-y-8 flex flex-col items-center'
                initial="hidden"
                animate="visible"
            >
                {experiences.map((experience, index) => (
                    <Reveal key={index}>
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: false, amount: 0.3 }}
                            transition={{ duration: 1 }}
                            className='border-4 border-yellow-500 p-6 rounded-lg shadow-md
                            hover:shadow-xl transition-shadow duration-300 bg-purple-800/30 shadow-lg w-full flex items-center'
                        >
                            <div className='flex-1'>
                                <h2 className='text-gray-100 text-2xl font-semibold'>{experience.company}</h2>
                                <p className='text-gray-300'>{experience.period}</p>
                                <ul className='text-gray-400 mt-4 list-disc list-inside'>
                                    {experience.description.map((point, idx) => (
                                        <li key={idx}>{point}</li>
                                    ))}
                                </ul>
                                {experience.marksheet && (
                                    <div className='flex justify-start mt-4'>
                                        <button
                                            onClick={() => openModal(experience.marksheet)}
                                            className='px-4 py-2 bg-yellow-500 text-gray-800 rounded hover:bg-yellow-600 transition'
                                        >
                                            View Marksheet
                                        </button>
                                    </div>
                                )}
                            </div>
                            {experience.image && (
                                <img 
                                    src={experience.image} 
                                    alt={`${experience.company} logo`} 
                                    className='w-16 h-16 ml-4 rounded-lg' // Adjust size and add corner radius
                                />
                            )}
                        </motion.div>
                    </Reveal>
                ))}
            </motion.div>

            {isModalOpen && (
                <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
                    <div className='relative p-4'>
                        <button
                            onClick={closeModal}
                            className='absolute top-2 right-2 text-white text-2xl z-50'
                        >
                            ✖️
                        </button>
                        <img 
                            src={currentMarksheet} 
                            alt="Marksheet" 
                            className='max-w-[90%] max-h-[90vh] rounded-lg' 
                        />
                    </div>
                </div>
            )}
        </div>
    );
}

export default Experience;
