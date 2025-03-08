import React from 'react';
import project1 from "../assets/project1.png";
import project2 from "../assets/project2.png";
import project4 from "../assets/project4.png";
import project5 from "../assets/project5.png";
import portfolioimg from "../assets/portfolio.png";
import mcqQuizImg from "../assets/mcq-quiz.png"; 
import nextformsImg from "../assets/nextforms.png"; 

import { AiOutlineGithub } from 'react-icons/ai';
import Reveal from './Reveal';
import ShinyEffect from './ShinyEffect';

const projects = [
    {
        img: nextformsImg,
        title: "📋 NextForms",
        description: "📝 A fully customizable alternative to Google Forms with seamless response tracking and advanced email notifications.",
        links: {
            site: "https://nextforms.in",
        },
    },
    {
        img: project1,
        title: "🎮 TicTacToe iOS App",
        description: "🎲 An iOS game app using SwiftUI and UIKit for a fun, interactive experience.",
        links: {
            github: "https://github.com/navyansh1/TickTacToe",
        },
    },
    {
        img: project2,
        title: "💰 Blockchain Lottery dApp",
        description: "🔗 A decentralized lottery system built with Solidity and React, leveraging blockchain technology.",
        links: {
            site: "https://drive.google.com/file/d/1mwgChln8-jExcFmfVdADh5mv4pUMKU9W/view?usp=sharing",
        },
    },
    {
        img: mcqQuizImg,
        title: "📝 MCQ Quiz Generator using AI",
        description: "📄 An intelligent quiz generator that uses Gemini Pro 1.5 to access PDFs, text files, etc., and create MCQ quizzes. Includes an option to download the quiz with answers.",
        links: {
            site:"https://mcqgen.vercel.app/",
        },
    },
    {
        img: project4,
        title: "📱 InstaSnap UI Redesign",
        description: "🎨 A refined Instagram UI concept designed in Figma for a sleek and user-friendly experience.",
        links: {
            site: "https://www.figma.com/design/4GnyQrrTZ7yhLqAFTm9Mmi/Social-Media-App-UI-UX-Project",
        },
    },
    {
        img: project5,
        title: "🃏 Playing Cards iOS App",
        description: "📲 An iOS app using SwiftUI, UIKit, and Figma that brings card games to your fingertips.",
        links: {
            github: "https://github.com/navyansh1/cards-Game",
        },
    },
    {
        img: portfolioimg,
        title: "🌐 Portfolio Website",
        description: "💻 A portfolio built using React, Tailwind CSS, and Framer Motion to showcase my projects and skills.",
        links: {
            github: "https://github.com/navyansh1/NavyGeeks-Website",
        },
    },
];

const Portfolio = () => {
    return (
        <div className='max-w-[1000px] mx-auto p-6 md:my-20 relative' id="portfolio">
            <h2 className='text-5xl font-bold text-yellow-500 mb-8'>Projects:</h2>
            <ShinyEffect left={0} top={0} size={1900} />

            {projects.map((project, index) => (
                <Reveal key={index}>
                    <div className={`flex flex-col md:flex-row ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''} mb-12`}>
                        <div className='w-full md:w-1/2 p-4'>
                            <img
                                src={project.img}
                                alt={project.title}
                                className='w-full h-full object-cover rounded-lg shadow-lg border-4 border-gray-400'
                            />
                        </div>
                        <div className='w-full md:w-1/2 p-4 flex flex-col justify-center'>
                            <h3 className='text-2xl font-semibold text-gray-200 mb-4'>{project.title}</h3>
                            <p className='text-gray-300 mb-4'>{project.description}</p>
                            <div className='flex space-x-4'>
                                {project.links.site && (
                                    <a href={project.links.site}
                                        className='px-4 py-4 mt-2 bg-slate-600 text-gray-200 rounded-lg font-semibold text-lg hover:bg-slate-700 transition duration-300'>
                                        View Demo
                                    </a>
                                )}
                                {project.links.github && (
                                    <a href={project.links.github}
                                        className='flex items-center px-4 py-3 bg-slate-600 text-gray-200 rounded-lg hover:bg-slate-700 transition duration-300'>
                                        <AiOutlineGithub style={{ fontSize: '2em' }} />
                                        <span className="ml-2">GitHub Link</span>
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                </Reveal>
            ))}
        </div>
    );
}

export default Portfolio;
