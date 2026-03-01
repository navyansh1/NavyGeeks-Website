import React from 'react';
import { Github, Instagram, Youtube, Linkedin } from 'lucide-react';

const Footer = () => {
    return (
        <div className='max-w-[1300px] mx-auto flex justify-between p-6 pb-20 md:p-20 text-sm md:text-lg mt-12'>
            <div className='space-y-4'>


                {/* <h3 className='text-2xl text-yellow-400 font-semibold'>Navyansh Kothari</h3> */}
                <div className='flex flex-row gap-4 md:gap-6 text-yellow-500'> {/* Adjusted sizes */}
                    <a href="https://github.com/navyansh1" className='hover:text-yellow-400 transition'>
                        <Github size={28} className="md:w-8 md:h-8" />
                    </a>
                    <a href="https://www.instagram.com/navygeeks/" className='hover:text-yellow-400 transition'>
                        <Instagram size={28} className="md:w-8 md:h-8" />
                    </a>
                    <a href="https://www.youtube.com/@navygeeks" className='hover:text-yellow-400 transition'>
                        <Youtube size={28} className="md:w-8 md:h-8" />
                    </a>
                    <a href="https://www.linkedin.com/in/navyansh/" className='hover:text-yellow-400 transition'>
                        <Linkedin size={28} className="md:w-8 md:h-8" />
                    </a>
                </div>
            </div>

            <p className='text-yellow-500 text-xs md:text-xl mt-3'> { }
                @2026 NavyGeeks
            </p>
        </div>
    );
}

export default Footer;
