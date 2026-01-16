import React, { useState } from 'react';
import project1 from "../assets/project1.png";
import project2 from "../assets/project2.png";
import project4 from "../assets/project4.png";
import project5 from "../assets/project5.png";
import portfolioimg from "../assets/portfolio.png";
import mcqQuizImg from "../assets/mcq-quiz.png"; 
import nextformsImg from "../assets/nextforms.png"; 
import fmcg from "../assets/fmcg.png";
import bfsi from "../assets/bfsi.png";

import { AiOutlineGithub, AiOutlineDown, AiOutlineUp } from 'react-icons/ai';
import Reveal from './Reveal';
import ShinyEffect from './ShinyEffect';

const projects = [
    {
        img: fmcg,
        title: "📈 Demand Forecasting Analysis",
        description:
            "📝 A comprehensive FMCG demand forecasting project that analyzes seasonality and sales patterns, applies statistical and machine learning models, and converts accurate forecasts into actionable business decisions.",
        links: {
            site: "https://navyansh1.github.io/ML_Demand_Forecasting_FMCG/",
        },
    },
    {
        img: bfsi,
        title: "💳 Credit Card Modelling - BFSI Domain",
        description:
            "📝 A machine learning–based fraud detection system for the BFSI domain that analyzes transaction patterns, handles highly imbalanced data, and builds interpretable predictive models to identify fraudulent activities.",
        links: {
            site: "https://navyansh1.github.io/ML_Fraud_Detection_BFSI/",
        },
    },
    {
        img: nextformsImg,
        title: "📋 NextForms",
        description:
            "📝 A fully customizable alternative to Google Forms with seamless response tracking and advanced email notifications.",
        links: {
            site: "https://nextforms.in",
        },
    },
    {
        img: project1,
        title: "🎮 TicTacToe iOS App",
        description:
            "🎲 An iOS game app using SwiftUI and UIKit for a fun, interactive experience.",
        links: {
            github: "https://github.com/navyansh1/TickTacToe",
        },
    },
    {
        img: project2,
        title: "💰 Blockchain Lottery dApp",
        description:
            "🔗 A decentralized lottery system built with Solidity and React, leveraging blockchain technology.",
        links: {
            site: "https://drive.google.com/file/d/1mwgChln8-jExcFmfVdADh5mv4pUMKU9W/view",
        },
    },
    {
        img: mcqQuizImg,
        title: "📝 MCQ Quiz Generator using AI",
        description:
            "📄 An intelligent quiz generator that uses Gemini Pro 1.5 to access PDFs, text files, etc., and create MCQ quizzes.",
        links: {
            site: "https://mcqgen.vercel.app/",
        },
    },
    {
        img: project4,
        title: "📱 InstaSnap UI Redesign",
        description:
            "🎨 A refined Instagram UI concept designed in Figma for a sleek and user-friendly experience.",
        links: {
            site: "https://www.figma.com/design/4GnyQrrTZ7yhLqAFTm9Mmi/Social-Media-App-UI-UX-Project",
        },
    },
    {
        img: project5,
        title: "🃏 Playing Cards iOS App",
        description:
            "📲 An iOS app using SwiftUI, UIKit, and Figma that brings card games to your fingertips.",
        links: {
            github: "https://github.com/navyansh1/cards-Game",
        },
    },
    {
        img: portfolioimg,
        title: "🌐 Portfolio Website",
        description:
            "💻 A portfolio built using React, Tailwind CSS, and Framer Motion to showcase my projects and skills.",
        links: {
            github: "https://github.com/navyansh1/NavyGeeks-Website",
        },
    },
];


const Portfolio = () => {
    const [expandedCard, setExpandedCard] = useState(null);

    const toggleCard = (index) => {
        setExpandedCard(expandedCard === index ? null : index);
    };

    return (
        <div className='max-w-[1000px] mx-auto p-6 md:my-20 relative' id="portfolio">
            <h2 className='text-5xl font-bold text-yellow-500 mb-8'>Projects:</h2>
            <ShinyEffect left={0} top={0} size={1900} />

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 items-start'>
                {projects.map((project, index) => (
                    <Reveal key={index}>
                        <div className='bg-gray-800/50 backdrop-blur-sm rounded-lg shadow-lg border border-gray-700 hover:border-yellow-500/50 transition-all duration-300 overflow-hidden h-fit'>
                            {/* Card Header - Always Visible */}
                            <div 
                                className='cursor-pointer p-3 md:p-4 h-auto'
                                onClick={() => toggleCard(index)}
                            >
                                <div className='aspect-video mb-2 md:mb-4 overflow-hidden rounded-lg'>
                                    <img
                                        src={project.img}
                                        alt={project.title}
                                        className='w-full h-full object-cover transition-transform duration-300 hover:scale-105'
                                    />
                                </div>
                                <div className='flex items-start justify-between gap-2 min-h-[3.5rem] md:min-h-[4rem]'>
                                    <h3 className='text-lg md:text-xl font-semibold text-gray-200 flex-1 leading-tight overflow-hidden' style={{display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical'}}>{project.title}</h3>
                                    <div className='text-yellow-500 text-lg md:text-xl flex-shrink-0 mt-1'>
                                        {expandedCard === index ? <AiOutlineUp /> : <AiOutlineDown />}
                                    </div>
                                </div>
                            </div>

                            {/* Expandable Content */}
                            <div className={`transition-all duration-300 ease-in-out overflow-hidden ${
                                expandedCard === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                            }`}>
                                <div className='px-3 md:px-4 pb-3 md:pb-4 border-t border-gray-700/50'>
                                    <p className='text-gray-300 mb-3 md:mb-4 mt-3 md:mt-4 leading-relaxed text-sm md:text-base'>{project.description}</p>
                                    <div className='flex flex-col gap-2 md:flex-row'>
                                        {project.links.site && (
                                            <a 
                                                href={project.links.site}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className='px-4 py-2 bg-yellow-600 text-white rounded-lg font-semibold text-center hover:bg-yellow-700 transition duration-300'
                                                onClick={(e) => e.stopPropagation()}
                                            >
                                                View Demo
                                            </a>
                                        )}
                                        {project.links.github && (
                                            <a 
                                                href={project.links.github}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className='flex items-center justify-center px-4 py-2 bg-slate-600 text-gray-200 rounded-lg hover:bg-slate-700 transition duration-300'
                                                onClick={(e) => e.stopPropagation()}
                                            >
                                                <AiOutlineGithub className="mr-2" />
                                                GitHub
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Reveal>
                ))}
            </div>
        </div>
    );
}

export default Portfolio;
