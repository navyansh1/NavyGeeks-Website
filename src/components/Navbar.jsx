import React, { useState, useEffect } from 'react';
import { Menu, X, Home, Settings, Briefcase, GraduationCap, FolderOpen, Award, BookOpen, AtSign } from 'lucide-react';
import { Link as ScrollLink } from 'react-scroll';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

// On the home page links scroll to a section; on other pages they navigate.
const pageRoutes = {
    hero: '/',
    skills: '/#skills',
    experience: '/experience/',
    education: '/education/',
    portfolio: '/projects/',
    certifications: '/certifications/',
    research: '/research/',
    contact: '/#contact',
};

const pageSections = {
    experience: 'experience',
    education: 'education',
    projects: 'portfolio',
    certifications: 'certifications',
    research: 'research',
};

const NavLink = ({ isHome, to, offset = -80, ...props }) =>
    isHome
        ? <ScrollLink to={to} smooth={true} offset={offset} duration={500} {...props} />
        : <RouterLink to={pageRoutes[to]} {...props} />;

const sectionLabels = { hero: 'About', portfolio: 'Projects', certifications: 'Licenses' };

const Navbar = () => {
    const [nav, setNav] = useState(false);
    const [scrolledSection, setScrolledSection] = useState('hero');
    const { pathname } = useLocation();
    const isHome = pathname === '/';
    const activeSection = isHome ? scrolledSection : (pageSections[pathname.split('/')[1]] || '');

    const toggleNav = () => {
        setNav(!nav);
    };

    const closeNav = () => {
        setNav(false);
    };

    // Handle scrolling and active section detection
    useEffect(() => {
        if (!isHome) return undefined;
        const handleScroll = () => {
            const sections = ['hero', 'skills', 'experience', 'portfolio', 'education', 'certifications', 'research', 'contact'];

            const scrollPosition = window.scrollY + 200; // Adding offset for better accuracy

            for (let i = sections.length - 1; i >= 0; i--) {
                const section = document.getElementById(sections[i]);
                if (section && section.offsetTop <= scrollPosition) {
                    setScrolledSection(sections[i]);
                    break;
                }
            }
        };

        handleScroll();
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isHome]);

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
        { to: 'research', label: 'Research', icon: <BookOpen size={22} /> },
        { to: 'contact', label: 'Contact', icon: <AtSign size={22} /> },
    ];

    return (
        <>
            {/* Desktop Navbar at top */}
            <nav aria-label="Primary" className='fixed top-0 left-0 w-full bg-opacity-70 backdrop-blur-md z-50 hidden md:block'>
                <div className='max-w-[1300px] mx-auto flex justify-center items-center px-4 h-14 text-gray-200 text-lg'>
                    <ul className='flex gap-4 lg:gap-12 z-10 cursor-pointer'>
                        <li className={isActive('hero') ? 'text-yellow-400' : ''}><NavLink isHome={isHome} to="hero" offset={-80}>About</NavLink></li>
                        <li className={isActive('skills') ? 'text-yellow-400' : ''}><NavLink isHome={isHome} to="skills" offset={-80}>Skills</NavLink></li>
                        <li className={isActive('experience') ? 'text-yellow-400' : ''}><NavLink isHome={isHome} to="experience" offset={-80}>Experience</NavLink></li>
                        <li className={isActive('education') ? 'text-yellow-400' : ''}><NavLink isHome={isHome} to="education" offset={-80}>Education</NavLink></li>
                        <li className={isActive('portfolio') ? 'text-yellow-400' : ''}><NavLink isHome={isHome} to="portfolio" offset={-80}>Projects</NavLink></li>
                        <li className={isActive('certifications') ? 'text-yellow-400' : ''}><NavLink isHome={isHome} to="certifications" offset={-80}>Licenses</NavLink></li>
                        <li className={isActive('research') ? 'text-yellow-400' : ''}><NavLink isHome={isHome} to="research" offset={-80}>Research</NavLink></li>
                        <li className={isActive('contact') ? 'text-yellow-400' : ''}><NavLink isHome={isHome} to="contact" offset={-160}>Contact</NavLink></li>
                    </ul>
                </div>
            </nav>

            {/* Mobile Navigation */}
            <div className="md:hidden">
                {/* Mobile nav toggle button */}
                <motion.button
                    onClick={toggleNav}
                    aria-label={nav ? 'Close menu' : 'Open menu'}
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
                    <span className="text-yellow-400">{sectionLabels[activeSection] || (activeSection ? activeSection.charAt(0).toUpperCase() + activeSection.slice(1) : 'Menu')}</span>
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
                                    <NavLink
                                        isHome={isHome}
                                        key={link.to}
                                        to={link.to}
                                        offset={link.to === 'contact' ? -160 : -80}
                                        className={`flex items-center w-full ${isActive(link.to) ? 'text-yellow-400' : 'text-white'}`}
                                        onClick={closeNav}
                                    >
                                        <span className="w-10 flex justify-center">
                                            {link.icon}
                                        </span>
                                        <span className="text-xl ml-3">{link.label}</span>
                                    </NavLink>
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
