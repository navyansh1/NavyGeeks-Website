import React from 'react';
import { FaGithubSquare, FaInstagram, FaYoutube, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <div className='max-w-[1300px] mx-auto flex justify-between p-6 pb-20 md:p-20 text-sm md:text-lg mt-12'>
        <div className='space-y-4'>

            
            {/* <h3 className='text-2xl text-yellow-400 font-semibold'>Navyansh Kothari</h3> */}
            <div className='flex flex-row gap-4 md:gap-6 text-yellow-500 text-3xl md:text-4xl'> {/* Adjusted sizes */}
                <a href="https://github.com/navyansh1" className='hover:text-yellow-400 transition'>
                    <FaGithubSquare />
                </a>
                <a href="https://www.instagram.com/navygeeks/" className='hover:text-yellow-400 transition'>
                    <FaInstagram />
                </a>
                <a href="https://www.youtube.com/@navygeeks" className='hover:text-yellow-400 transition'>
                    <FaYoutube />
                </a>
                <a href="https://www.linkedin.com/in/navyansh/" className='hover:text-yellow-400 transition'>
                    <FaLinkedin />
                </a>
            </div>
        </div>

        <p className='text-yellow-500 italic text-xs md:text-xl mt-3'> {}
            @2026 NavyGeeks
        </p>
    </div>
  );
}

export default Footer;
