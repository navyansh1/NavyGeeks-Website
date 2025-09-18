import React, { useState } from "react";
import profilepic from "../assets/profpic.png";
import resume from "../assets/resume.pdf"; // Import your resume PDF
import { TypeAnimation } from "react-type-animation";
import ShinyEffect from "./ShinyEffect";

import resumeImage from "../assets/resumeImage.png"; // Import your resume image
import {
  AiOutlineGithub,
  AiOutlineInstagram,
  AiOutlineLink,
  AiOutlineLinkedin,
  AiOutlineYoutube,
  AiOutlineClose, // Import close icon
} from "react-icons/ai";
import {
  DiCss3,
  DiHtml5,
  DiJavascript1,
  DiNodejsSmall,
  DiReact,
} from "react-icons/di";
import { SiMongodb, SiSwift, SiXcode, SiAmazonaws, SiGooglecloud } from "react-icons/si"; // Import AWS and GCP icons
import { motion } from "framer-motion";

const Hero = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const [resumeVisible, setResumeVisible] = useState(false); // State to control resume visibility

  const toggleResume = () => {
      setResumeVisible(!resumeVisible);
  };

  return (
    <div className="mt-24 max-w-[1200px] mx-auto relative px-6 md:px-0">
        <div className={`grid md:grid-cols-2 place-items-center gap-8 ${modalOpen && 'blur-sm'}`}>
            <motion.div
            initial={{ opacity: 0, y: -50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            >
                <TypeAnimation
                    sequence={[
                        "Fullstack Dev",
                        1000,
                        "Web Developer",
                        1000,
                        "Cloud Developer",
                        1000,
                        "Tech-Youtuber",
                        1000,
                    ]}
                    speed={35}
                    repeat={Infinity}
                    className="font-bold text-gray-100 text-2xl md:text-5xl italic mb-4"
                />

                <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.5 }}
                className="text-gray-200 md:text-2xl text-2xl tracking-tight mb-4 mt-12 pt-6"
                >
                    hello, I am <br/>
                    <span className="text-yellow-500 text-5xl font-bold">Navyansh Kothari</span>
                </motion.p>

                <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 1 }}
                className="text-gray-100 max-w-[300px] md:max-w-[500px] md:text-3xl text-lg mb-6 font-light pt-6 "
                >
                    A geek with proficiency in  Data Engineering, Backend devlopment, Web Development, Tech Content Creation
                </motion.p>
                {resumeVisible && (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
        <div className="relative bg-white p-6 rounded-lg w-[90%] md:w-[60%] lg:w-[50%]">
            <button 
                className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 bg-transparent border-none"
                onClick={toggleResume}
            >
                <AiOutlineClose size={30}/>
            </button>
            <img 
                src={resumeImage} 
                className="w-full h-auto max-h-[80vh] object-contain" // Adjust the size here
                alt="Resume" 
            />
            <div className="mt-4 text-center md:hidden">
                <a href={resumeImage} download className="text-blue-500 underline">Download Resume</a>
            </div>
        </div>
    </div>
)}

                <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 1.5 }}
                className="flex flex-row items-center gap-6 my-4 md:mb-0"
                >
                    <motion.button 
                        whileHover={{ scale: 1.1, boxShadow: "0px 0px 8px rgba(0, 0, 0, 0.3)" }}
                        className="z-10 cursor-pointer font-bold text-gray-200 text-sm md:text-base md:w-auto px-3 py-2 md:p-4 border border-yellow-400 rounded-xl"
                        onClick={toggleResume}
                    >
                        View Resume
                    </motion.button>

                    <div className="flex gap-6 flex-row text-4xl md:text-6xl text-yellow-400 z-20">
                        <motion.a whileHover={{ scale: 1.4 }} href="https://github.com/navyansh1">
                            <AiOutlineGithub/>
                        </motion.a>

                        <motion.a whileHover={{ scale: 1.4 }} href="https://www.linkedin.com/in/navyansh/">
                            <AiOutlineLinkedin/>
                        </motion.a>

                        <motion.a whileHover={{ scale: 1.4 }} href="https://www.instagram.com/navygeeks/">
                            <AiOutlineInstagram/>
                        </motion.a>
                        <motion.a whileHover={{ scale: 1.4 }} href="https://www.youtube.com/@navygeeks"> 
                            <AiOutlineYoutube/> 
                        </motion.a>
                    </div>
                </motion.div>
            </motion.div>

            <motion.img 
                src={profilepic}
                className="w-[250px] md:w-[350px] rounded-xl"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
            />

        </div>

        <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 1 }}
            className="flex flex-col items-center py-24 md:flex-row md:text-7xl md:px-12 md:justify-center"
        >
            <p className="text-gray-200 mb-4 md:mr-6 md:mb-0 text-3xl md:text-4xl">My Tech Stack:</p>
            <div className="flex flex-wrap justify-center">
                <DiHtml5 className="text-orange-500 mx-2 text-6xl md:text-7xl" />
                <DiCss3 className="text-blue-600 mx-2 text-6xl md:text-7xl" />
                <DiJavascript1 className="text-yellow-500 mx-2 text-6xl md:text-7xl" />
                <DiReact className="text-blue-500 mx-2 text-6xl md:text-7xl" />
                <DiNodejsSmall className="text-green-600 mx-2 text-6xl md:text-7xl" />
                <SiMongodb className="text-green-500 mx-2 text-6xl md:text-7xl" /> 
                <AiOutlineYoutube className="text-red-500 mx-2 text-6xl md:text-7xl" /> 
                <SiSwift className="text-orange-500 mx-2 text-5xl md:text-6xl mt-2" /> 
                <SiXcode className="text-blue-600 mx-2 text-6xl md:text-7xl" /> 
                <SiAmazonaws className="text-yellow-500 mx-2 text-6xl md:text-7xl" /> 
                <SiGooglecloud className="text-blue-500 mx-2 text-6xl md:text-7xl" /> 
            </div>
        </motion.div>

        <div className="absolute inset-0 hidden md:block">
            <ShinyEffect left={0} top={0} size={1900} />
        </div>

        {modalOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
                <div className="relative bg-white p-6 rounded-lg w-[90%] md:w-[70%]">
                    <button 
                        className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 bg-transparent border-none"
                        onClick={toggleModal}
                    >
                        <AiOutlineClose size={30}/>
                    </button>
                    <iframe 
                        src={resume} 
                        className="w-full h-[80vh] border-none"
                        title="Resume" 
                        style={{ border: "none" }} // Remove borders
                    />
                    <div className="mt-4 text-center md:hidden">
                        <a href={resume} download className="text-blue-500 underline">Download Resume</a>
                    </div>
                </div>
            </div>
        )}
    </div>
    
  )
}

export default Hero;
