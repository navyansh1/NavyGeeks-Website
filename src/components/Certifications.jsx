import React from 'react';
import project1 from "../assets/certi1.png";
import project2 from "../assets/certi2.png";
import project4 from "../assets/certi3.png";
import project5 from "../assets/project5.png";
import project6 from "../assets/project6.png";
import forestCert from "../assets/forest_cert.png";
import iitKanpurImg from "../assets/iit_kanpur.png"; // Import IIT Kanpur image
import { AiFillGithub, AiOutlineGithub } from 'react-icons/ai';
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
      description: "Issued: Sep 2023 | 🌟 Top 5% in the course offered by IIT Kharagpur",
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
            <li>🦌 Wildlife Ecology - Scored 98%</li>
          </ul>
        </>
      ),
      links: {
        site: "https://drive.google.com/drive/folders/1H-yG8Td1Qk_Tcxfgqa4XV4WyXCRiIDc1?usp=sharing",
        
      },
    },
];

const Portfolio = () => {
  return (
    <div className='max-w-[1000px] mx-auto p-6 md:my-20 relative' id="portfolio">
        <div className='ShinyEffect'></div> {/* Shiny effect div */}
        <h2 className='text-5xl font-bold text-yellow-500 mb-8'>Certifications & Licenses 📜:</h2>
        {projects.map((project, index) => (
            <Reveal key={index}>
                <div 
                  className={`flex flex-col md:flex-row ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''} mb-12`}
                >
                    <div className='w-full md:w-1/2 p-4'>
                        <img
                            src={project.img}
                            alt={project.title}
                            className='w-full h-full object-cover rounded-lg shadow-lg'
                        />
                    </div>
                    <div className='w-full md:w-1/2 p-4 flex flex-col justify-center'>
                        <h3 className='text-2xl font-semibold text-gray-200 mb-4'>{project.title}</h3>
                        <p className='text-gray-300 mb-4'>{project.description}</p>
                        <div className='flex space-x-4'>
                            {project.links.site && (
                                <a 
                                    href={project.links.site}
                                    className='px-4 py-2 bg-slate-500 text-gray-200 rounded-lg hover:bg-slate-700 transition duration-300'
                                >
                                    View Credentials
                                </a>
                            )}
                            {project.links.certificate && (
                                <a 
                                    href={project.links.certificate}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className='px-4 py-2 bg-slate-500 text-gray-200 rounded-lg hover:bg-slate-700 transition duration-300'
                                >
                                    🖼️ View Certificates
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
