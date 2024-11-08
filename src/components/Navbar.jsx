import React, { useState } from 'react';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';
import { Link } from 'react-scroll';
import { motion } from 'framer-motion';

const Navbar = () => {
    const [nav, setNav] = useState(false);

    const toggleNav = () => {
        setNav(!nav);
    };

    const closeNav = () => {
        setNav(false);
    };

    const menuVariants = {
        open: {
            x: 0,
            transition: {
                stiffness: 20,
                damping: 15,
            },
        },
        closed: {
            x: '-100%',
            transition: {
                stiffness: 20,
                damping: 15,
            },
        },
    };

    return (
        <div className='fixed top-0 left-0 w-full bg-opacity-70 backdrop-blur-md z-50'>
            <div className='max-w-[1300px] mx-auto flex justify-between items-center px-4 h-20 text-gray-200 text-xl'>
                {/* Wrapper for title and hamburger icon to center them on mobile */}
                <div className='flex justify-between items-center w-full md:w-auto'>
                    <a href="#" className="text-lg font-semibold">Navy's Portfolio</a>
                    <div onClick={toggleNav} className='md:hidden text-gray-300 cursor-pointer'>
                        {nav ? <AiOutlineClose size={30} /> : <AiOutlineMenu size={30} />}
                    </div>
                </div>

                <ul className='hidden md:flex gap-12 z-10 cursor-pointer'>
                    <li><Link to="hero" smooth={true} offset={-80} duration={500}>About</Link></li>
                    <li><Link to="portfolio" smooth={true} offset={-80} duration={500}>Projects</Link></li>
                    <li><Link to="skills" smooth={true} offset={-80} duration={500}>Skills</Link></li>
                    <li><Link to="experience" smooth={true} offset={-80} duration={500}>Experience</Link></li>
                    <li><Link to="certifications" smooth={true} offset={-80} duration={500}>Licenses</Link></li>
                    <li><Link to="education" smooth={true} offset={-80} duration={500}>Education</Link></li>
                    <li><Link to="contact" smooth={true} offset={-160} duration={500}>Contact</Link></li>
                </ul>

                <motion.div
                    initial={false}
                    animate={nav ? 'open' : 'closed'}
                    variants={menuVariants}
                    className='fixed left-0 top-0 w-full min-h-screen bg-gradient-to-br from-yellow-500 via-slate-700 to-slate-900 z-40 md:hidden'
                >
                    {/* Cross button inside the menu for mobile */}
                    <div onClick={closeNav} className='absolute top-5 right-5 text-gray-300 cursor-pointer'>
                        <AiOutlineClose size={30} />
                    </div>
                    
                    <ul className='font-bold italic text-4xl space-y-10 mt-20 text-center px-3'>
                        <li><Link to="hero" onClick={closeNav} smooth={true} offset={-80} duration={500}>About</Link></li>
                        <li><Link to="portfolio" onClick={closeNav} smooth={true} offset={-80} duration={500}>Projects</Link></li>
                        <li><Link to="skills" onClick={closeNav} smooth={true} offset={-80} duration={500}>Skills</Link></li>
                        <li><Link to="experience" onClick={closeNav} smooth={true} offset={-80} duration={500}>Experience</Link></li>
                        <li><Link to="certifications" onClick={closeNav} smooth={true} offset={-80} duration={500}>Licenses</Link></li>
                        <li><Link to="education" onClick={closeNav} smooth={true} offset={-80} duration={500}>Education</Link></li>
                        <li><Link to="contact" onClick={closeNav} smooth={true} offset={500} duration={500}>Contact</Link></li>
                    </ul>

                    {/* Add the line at the bottom */}
                    <div className='absolute bottom-10 left-0 right-0 text-center text-gray-300'>
                        <p className='text-lg'>
                            A product of love by Navyansh 💛 
                        </p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Navbar;
