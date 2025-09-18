import React, { useState, useRef, useEffect } from 'react';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';
import { Link } from 'react-scroll';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
    const [nav, setNav] = useState(false);
    const [activeSection, setActiveSection] = useState('hero');
    const navbarRef = useRef(null);

    const toggleNav = () => {
        setNav(!nav);
    };

    const closeNav = () => {
        setNav(false);
    };

    // Handle scrolling and active section detection
    useEffect(() => {
        const handleScroll = () => {
            const sections = ['hero', 'skills', 'experience', 'portfolio', 'education', 'certifications', 'contact'];
            
            const scrollPosition = window.scrollY + 200; // Adding offset for better accuracy
            
            for (let i = sections.length - 1; i >= 0; i--) {
                const section = document.getElementById(sections[i]);
                if (section && section.offsetTop <= scrollPosition) {
                    setActiveSection(sections[i]);
                    break;
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const menuVariants = {
        open: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 200,
                damping: 25,
                mass: 0.8
            },
        },
        closed: {
            y: '100%',
            opacity: 0,
            transition: {
                type: "spring",
                stiffness: 200,
                damping: 25,
                mass: 0.8
            },
        },
    };

    // Function to determine if section is active
    const isActive = (section) => activeSection === section;

    return (
        <>
            {/* Desktop Navbar at top */}
            <div className='fixed top-0 left-0 w-full bg-opacity-70 backdrop-blur-md z-50 hidden md:block'>
                <div className='max-w-[1300px] mx-auto flex justify-between items-center px-4 h-20 text-gray-200 text-xl'>
                    <a href="#" className="text-lg font-semibold">Navy's Portfolio</a>
                    <ul className='flex gap-12 z-10 cursor-pointer'>
                        <li className={isActive('hero') ? 'text-yellow-400' : ''}><Link to="hero" smooth={true} offset={-80} duration={500}>About</Link></li>
                        <li className={isActive('skills') ? 'text-yellow-400' : ''}><Link to="skills" smooth={true} offset={-80} duration={500}>Skills</Link></li>
                        <li className={isActive('experience') ? 'text-yellow-400' : ''}><Link to="experience" smooth={true} offset={-80} duration={500}>Experience</Link></li>
                        <li className={isActive('education') ? 'text-yellow-400' : ''}><Link to="education" smooth={true} offset={-80} duration={500}>Education</Link></li>
                        <li className={isActive('portfolio') ? 'text-yellow-400' : ''}><Link to="portfolio" smooth={true} offset={-80} duration={500}>Projects</Link></li>
                        <li className={isActive('certifications') ? 'text-yellow-400' : ''}><Link to="certifications" smooth={true} offset={-80} duration={500}>Licenses</Link></li>
                        <li className={isActive('contact') ? 'text-yellow-400' : ''}><Link to="contact" smooth={true} offset={-160} duration={500}>Contact</Link></li>
                    </ul>
                </div>
            </div>

            {/* Mobile Navigation */}
            <div className="md:hidden">
                {/* Mobile nav toggle button - Fixed dimensions and layout to prevent jitter */}
                <motion.button
                    onClick={toggleNav}
                    className="fixed bottom-10 right-6 z-[1000] p-3 bg-yellow-400 bg-opacity-60 backdrop-blur-sm rounded-full shadow-lg text-slate-900 w-12 h-12 flex items-center justify-center"
                    whileTap={{ scale: 0.95 }}
                    layout
                >
                    <motion.div
                        initial={false}
                        animate={{ rotate: nav ? 90 : 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        {nav ? <AiOutlineClose size={24} /> : <AiOutlineMenu size={24} />}
                    </motion.div>
                </motion.button>

                {/* Current section indicator bubble */}
                <div className="fixed bottom-10 left-6 z-[999] bg-slate-800 bg-opacity-60 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium shadow-lg">
                    <span className="text-yellow-400">{activeSection.charAt(0).toUpperCase() + activeSection.slice(1)}</span>
                </div>
                
                {/* Fullscreen mobile menu */}
                <AnimatePresence mode="wait">
                    {nav && (
                        <motion.div
                            className="fixed inset-0 z-[998] bg-slate-900 bg-opacity-85 backdrop-blur-md flex flex-col justify-center items-center"
                            initial={{ opacity: 0, y: '100%' }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: '100%' }}
                            transition={{
                                type: "spring",
                                stiffness: 200,
                                damping: 25,
                                mass: 0.8
                            }}
                        >
                            <div className="flex flex-col gap-6 items-start w-64 mx-auto">
                                <Link 
                                    to="hero" 
                                    smooth={true} 
                                    offset={-80} 
                                    duration={500} 
                                    className={`flex items-center w-full ${isActive('hero') ? 'text-yellow-400' : 'text-white'}`}
                                    onClick={closeNav}
                                >
                                    <span className="w-10 flex justify-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                                            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                                        </svg>
                                    </span>
                                    <span className="text-xl ml-3">About</span>
                                </Link>
                                
                                <Link 
                                    to="skills" 
                                    smooth={true} 
                                    offset={-80} 
                                    duration={500} 
                                    className={`flex items-center w-full ${isActive('skills') ? 'text-yellow-400' : 'text-white'}`}
                                    onClick={closeNav}
                                >
                                    <span className="w-10 flex justify-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                                        </svg>
                                    </span>
                                    <span className="text-xl ml-3">Skills</span>
                                </Link>
                                
                                <Link 
                                    to="experience" 
                                    smooth={true} 
                                    offset={-80} 
                                    duration={500} 
                                    className={`flex items-center w-full ${isActive('experience') ? 'text-yellow-400' : 'text-white'}`}
                                    onClick={closeNav}
                                >
                                    <span className="w-10 flex justify-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
                                            <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
                                        </svg>
                                    </span>
                                    <span className="text-xl ml-3">Experience</span>
                                </Link>
                                
                                <Link 
                                    to="education" 
                                    smooth={true} 
                                    offset={-80} 
                                    duration={500} 
                                    className={`flex items-center w-full ${isActive('education') ? 'text-yellow-400' : 'text-white'}`}
                                    onClick={closeNav}
                                >
                                    <span className="w-10 flex justify-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                                            <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                                        </svg>
                                    </span>
                                    <span className="text-xl ml-3">Education</span>
                                </Link>
                                
                                <Link 
                                    to="portfolio" 
                                    smooth={true} 
                                    offset={-80} 
                                    duration={500} 
                                    className={`flex items-center w-full ${isActive('portfolio') ? 'text-yellow-400' : 'text-white'}`}
                                    onClick={closeNav}
                                >
                                    <span className="w-10 flex justify-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                                            <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
                                        </svg>
                                    </span>
                                    <span className="text-xl ml-3">Projects</span>
                                </Link>
                                
                                <Link 
                                    to="certifications" 
                                    smooth={true} 
                                    offset={-80} 
                                    duration={500} 
                                    className={`flex items-center w-full ${isActive('certifications') ? 'text-yellow-400' : 'text-white'}`}
                                    onClick={closeNav}
                                >
                                    <span className="w-10 flex justify-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                    </span>
                                    <span className="text-xl ml-3">Licenses</span>
                                </Link>
                                
                                <Link 
                                    to="contact" 
                                    smooth={true} 
                                    offset={-160} 
                                    duration={500} 
                                    className={`flex items-center w-full ${isActive('contact') ? 'text-yellow-400' : 'text-white'}`}
                                    onClick={closeNav}
                                >
                                    <span className="w-10 flex justify-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M14.243 5.757a6 6 0 10-.986 9.284 1 1 0 111.087 1.678A8 8 0 1118 10a3 3 0 01-4.8 2.401A4 4 0 1114 10a1 1 0 102 0c0-1.537-.586-3.07-1.757-4.243zM12 10a2 2 0 10-4 0 2 2 0 004 0z" clipRule="evenodd" />
                                        </svg>
                                    </span>
                                    <span className="text-xl ml-3">Contact</span>
                                </Link>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </>
    );
};

export default Navbar;
