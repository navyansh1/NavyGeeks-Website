import React, { useState, useEffect, useRef } from 'react';
import project1 from "../assets/project1.png";
import project2 from "../assets/project2.png";
import project4 from "../assets/project4.png";
import project5 from "../assets/project5.png";
import portfolioimg from "../assets/portfolio.png";
import mcqQuizImg from "../assets/mcq-quiz.png";
import nextformsImg from "../assets/nextforms.png";
import fmcg from "../assets/fmcg.png";
import bfsi from "../assets/bfsi.png";
import billsonicImg from "../assets/billsonic.png";

import { Github, FolderOpen, ExternalLink, X, MousePointerClick } from 'lucide-react';
import Reveal from './Reveal';
import ShinyEffect from './ShinyEffect';
import { motion, AnimatePresence } from 'framer-motion';

const projects = [
    {
        img: billsonicImg,
        title: "Bill Sonic - Mobile POS App",
        description:
            "A smart, full-featured Point of Sale (POS) mobile app for modern retailers. Features barcode scanning, GST-compliant PDF billing, bulk product import from Excel/CSV, real-time inventory tracking, sales analytics, Admin/Cashier role management with PIN auth, and cloud sync. Built with React Native & Firebase.",
        links: {
            site: "https://billsonic.vercel.app/",
        },
    },
    {
        img: fmcg,
        title: "Demand Forecasting Analysis",
        description:
            "A comprehensive FMCG demand forecasting project that analyzes seasonality and sales patterns, applies statistical and machine learning models, and converts accurate forecasts into actionable business decisions.",
        links: {
            site: "https://navyansh1.github.io/ML_Demand_Forecasting_FMCG/",
        },
    },
    {
        img: bfsi,
        title: "Credit Card Modelling - BFSI Domain",
        description:
            "A machine learning–based fraud detection system for the BFSI domain that analyzes transaction patterns, handles highly imbalanced data, and builds interpretable predictive models to identify fraudulent activities.",
        links: {
            site: "https://navyansh1.github.io/ML_Fraud_Detection_BFSI/",
        },
    },
    {
        img: nextformsImg,
        title: "NextForms",
        description:
            "A fully customizable alternative to Google Forms with seamless response tracking and advanced email notifications.",
        links: {
            site: "https://nextforms.in",
        },
    },
    {
        img: project1,
        title: "TicTacToe iOS App",
        description:
            "An iOS game app using SwiftUI and UIKit for a fun, interactive experience.",
        links: {
            github: "https://github.com/navyansh1/TickTacToe",
        },
    },
    {
        img: project2,
        title: "Blockchain Lottery dApp",
        description:
            "A decentralized lottery system built with Solidity and React, leveraging blockchain technology.",
        links: {
            site: "https://drive.google.com/file/d/1mwgChln8-jExcFmfVdADh5mv4pUMKU9W/view",
        },
    },
    {
        img: mcqQuizImg,
        title: "MCQ Quiz Generator using AI",
        description:
            "An intelligent quiz generator that uses Gemini Pro 1.5 to access PDFs, text files, etc., and create MCQ quizzes.",
        links: {
            site: "https://mcqgen.vercel.app/",
        },
    },
    {
        img: project4,
        title: "InstaSnap UI Redesign",
        description:
            "A refined Instagram UI concept designed in Figma for a sleek and user-friendly experience.",
        links: {
            site: "https://www.figma.com/design/4GnyQrrTZ7yhLqAFTm9Mmi/Social-Media-App-UI-UX-Project",
        },
    },
    {
        img: project5,
        title: "Playing Cards iOS App",
        description:
            "An iOS app using SwiftUI, UIKit, and Figma that brings card games to your fingertips.",
        links: {
            github: "https://github.com/navyansh1/cards-Game",
        },
    },
    {
        img: portfolioimg,
        title: "Portfolio Website",
        description:
            "A portfolio built using React, Tailwind CSS, and Framer Motion to showcase my projects and skills.",
        links: {
            github: "https://github.com/navyansh1/NavyGeeks-Website",
        },
    },
];


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
            <h2 className='text-3xl md:text-5xl font-bold text-yellow-500 mb-8 flex items-center justify-center gap-3'><FolderOpen size={28} className='md:w-10 md:h-10' /> Projects:</h2>
            <ShinyEffect left={0} top={0} size={1900} />

            {/* Grid - all cards are uniform height */}
            <div className='grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-6'>
                {projects.map((project, index) => (
                    <Reveal key={index}>
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
                                        alt={project.title}
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
                                <div className='flex flex-wrap gap-3'>
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
