import React, { useState, useRef, useEffect } from 'react';
import { Menu, X, Home, Settings, Briefcase, GraduationCap, FolderOpen, Award, AtSign } from 'lucide-react';
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

    const mobileLinks = [
        { to: 'hero', label: 'About', icon: <Home size={22} /> },
        { to: 'skills', label: 'Skills', icon: <Settings size={22} /> },
        { to: 'experience', label: 'Experience', icon: <Briefcase size={22} /> },
        { to: 'education', label: 'Education', icon: <GraduationCap size={22} /> },
        { to: 'portfolio', label: 'Projects', icon: <FolderOpen size={22} /> },
        { to: 'certifications', label: 'Licenses', icon: <Award size={22} /> },
        { to: 'contact', label: 'Contact', icon: <AtSign size={22} /> },
    ];

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
                {/* Mobile nav toggle button */}
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
                        {nav ? <X size={24} /> : <Menu size={24} />}
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
                                {mobileLinks.map((link) => (
                                    <Link
                                        key={link.to}
                                        to={link.to}
                                        smooth={true}
                                        offset={link.to === 'contact' ? -160 : -80}
                                        duration={500}
                                        className={`flex items-center w-full ${isActive(link.to) ? 'text-yellow-400' : 'text-white'}`}
                                        onClick={closeNav}
                                    >
                                        <span className="w-10 flex justify-center">
                                            {link.icon}
                                        </span>
                                        <span className="text-xl ml-3">{link.label}</span>
                                    </Link>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </>
    );
};

export default Navbar;
