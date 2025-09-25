import React, { useState } from 'react';
import project1 from "../assets/certi1.png";
import project2 from "../assets/certi2.png";
import project4 from "../assets/certi3.png";
import project5 from "../assets/project5.png";
import project6 from "../assets/project6.png";
import forestCert from "../assets/forest_cert.png";
import iitKanpurImg from "../assets/iit_kanpur.png"; // Import IIT Kanpur image
import { AiFillGithub, AiOutlineGithub, AiOutlineDown, AiOutlineUp } from 'react-icons/ai';
import Reveal from './Reveal';

const projects = [
    {
      img: project1,
      title: "AWS Certified Cloud Practitioner 🌐",
      description: "Issued: Dec 2023",
      links: {
        site: "https://cp.certmetrics.com/amazon/en/public/verify/credential/",
        github: "#",
      },
    },
    {
      img: project2,
      title: "Google Cloud Computing Foundations ☁️",
      description: (
        <>
          <p>Issued: Sep 2023</p>
          <ul className="list-disc list-inside text-gray-300">
            <li>🌟 Ranked in the top 5% of the course</li>
            <li>Offered by IIT Kharagpur</li>
          </ul>
        </>
      ),
      links: {
        site: "https://archive.nptel.ac.in/noc/Ecertificate/?q=NPTEL23CS90S73340588620273725",
      },
    },
    {
      img: project4,
      title: "Spoken Tutorial Training 🖥️",
      description: "Training in: MySQL, Python, Java, PHP by IIT Bombay",
      links: {
        site: "https://drive.google.com/drive/folders/1wyXBEZ--NbDvgRyYy-vmbBPdL3ewjTiN?usp=sharing",
      },
    },
    {
      img: project6,
      title: "Crash Course on Python 🐍",
      description: "Data Science course by Google on Coursera",
      links: {
        site: "https://www.coursera.org/account/accomplishments/verify/Y9KAPCPSKXXA?utm_source=ln&utm_medium=certificate&utm_content=cert_image&utm_campaign=sharing_cta&utm_product=course",
      },
    },
    {
      img: iitKanpurImg, // Use IIT Kanpur image as the thumbnail
      title: "NPTEL Certification - IIT Kanpur 🎓",
      description: (
        <>
          <p>Courses:</p>
          <ul className="list-disc list-inside text-gray-300">
            <li>🌲 Forest and its Management - Scored 97%</li>
            <li>🦌 Wildlife Ecology - Scored 100%</li>
          </ul>
        </>
      ),
      links: {
        site: "https://drive.google.com/drive/folders/1H-yG8Td1Qk_Tcxfgqa4XV4WyXCRiIDc1?usp=sharing",
        
      },
    },
];

const Certifications = () => {
    const [expandedCard, setExpandedCard] = useState(null);

    const toggleCard = (index) => {
        setExpandedCard(expandedCard === index ? null : index);
    };

    return (
        <div className='max-w-[1000px] mx-auto p-6 md:my-20 relative' id="certifications">
            <h2 className='text-5xl font-bold text-yellow-500 mb-8'>Certifications & Licenses 📜:</h2>
            
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
                                    <h3 className='text-base md:text-lg font-semibold text-gray-200 flex-1 leading-tight overflow-hidden' style={{display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical'}}>{project.title}</h3>
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
                                    <div className='text-gray-300 mb-3 md:mb-4 mt-3 md:mt-4 leading-relaxed text-sm md:text-base'>
                                        {typeof project.description === 'string' ? (
                                            <p>{project.description}</p>
                                        ) : (
                                            project.description
                                        )}
                                    </div>
                                    <div className='flex flex-col gap-2 md:flex-row'>
                                        {project.links.site && (
                                            <a 
                                                href={project.links.site}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className='px-4 py-2 bg-yellow-600 text-white rounded-lg font-semibold text-center hover:bg-yellow-700 transition duration-300'
                                                onClick={(e) => e.stopPropagation()}
                                            >
                                                View Credentials
                                            </a>
                                        )}
                                        {project.links.certificate && (
                                            <a 
                                                href={project.links.certificate}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className='px-4 py-2 bg-slate-600 text-gray-200 rounded-lg hover:bg-slate-700 transition duration-300 text-center'
                                                onClick={(e) => e.stopPropagation()}
                                            >
                                                🖼️ View Certificates
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

export default Certifications;
