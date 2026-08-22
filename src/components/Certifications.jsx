import React, { useState, useEffect, useRef } from 'react';
import project1 from "../assets/certifications/certi1.png";
import project2 from "../assets/certifications/certi2.png";
import project4 from "../assets/certifications/certi3.png";
import project5 from "../assets/projects/project5.png";
import project6 from "../assets/projects/project6.png";
import forestCert from "../assets/certifications/forest_cert.png";
import iitKanpurImg from "../assets/experience/iit_kanpur.png";
import awsAiPractitioner from "../assets/certifications/aws_ai_practitioner.png";
import openaiTechnical from "../assets/certifications/openai_technical_practitioner.png";
import openaiDeployment from "../assets/certifications/openai_deployment_practitioner.png";
import openaiTechnicalPdf from "../assets/certifications/openai_technical_practitioner.pdf";
import openaiDeploymentPdf from "../assets/certifications/openai_deployment_practitioner.pdf";
import { Award, X, MousePointerClick } from 'lucide-react';
import Reveal from './Reveal';
import { motion, AnimatePresence } from 'framer-motion';

const projects = [
  {
    img: openaiTechnical,
    title: "OpenAI Technical Practitioner",
    description: (
      <>
        <p>Issued: Aug 2026 &middot; Valid through: Aug 2027</p>
        <p className="mt-1 text-gray-400 text-sm">Issued by OpenAI</p>
      </>
    ),
    links: {
      certificate: openaiTechnicalPdf,
    },
  },
  {
    img: openaiDeployment,
    title: "ChatGPT Deployment Practitioner",
    description: (
      <>
        <p>Issued: Aug 2026 &middot; Valid through: Aug 2027</p>
        <p className="mt-1 text-gray-400 text-sm">Issued by OpenAI</p>
      </>
    ),
    links: {
      certificate: openaiDeploymentPdf,
    },
  },
  {
    img: awsAiPractitioner,
    title: "AWS Certified AI Practitioner",
    description: (
      <>
        <p>Issued: Jul 2026 &middot; Expires: Jul 2029</p>
        <p className="mt-1 text-gray-400 text-sm break-all">Validation #: 7eb079ec8429481f8e23157fb725c23e</p>
      </>
    ),
    links: {
      site: "https://aws.amazon.com/verification",
    },
  },
  {
    img: project1,
    title: "AWS Certified Cloud Practitioner",
    description: "Issued: Dec 2023",
    links: {
      site: "https://cp.certmetrics.com/amazon/en/public/verify/credential/",
      github: "#",
    },
  },
  {
    img: project2,
    title: "Google Cloud Computing Foundations",
    description: (
      <>
        <p>Issued: Sep 2023</p>
        <ul className="list-disc list-inside text-gray-300">
          <li>Ranked in the top 5% of the course</li>
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
    title: "Spoken Tutorial Training",
    description: "Training in: MySQL, Python, Java, PHP by IIT Bombay",
    links: {
      site: "https://drive.google.com/drive/folders/1wyXBEZ--NbDvgRyYy-vmbBPdL3ewjTiN?usp=sharing",
    },
  },
  {
    img: project6,
    title: "Crash Course on Python",
    description: "Data Science course by Google on Coursera",
    links: {
      site: "https://www.coursera.org/account/accomplishments/verify/Y9KAPCPSKXXA?utm_source=ln&utm_medium=certificate&utm_content=cert_image&utm_campaign=sharing_cta&utm_product=course",
    },
  },
  {
    img: iitKanpurImg,
    title: "NPTEL Certification - IIT Kanpur",
    description: (
      <>
        <p>Courses:</p>
        <ul className="list-disc list-inside text-gray-300">
          <li>Forest and its Management - Scored 97%</li>
          <li>Wildlife Ecology - Scored 100%</li>
        </ul>
      </>
    ),
    links: {
      site: "https://drive.google.com/drive/folders/1H-yG8Td1Qk_Tcxfgqa4XV4WyXCRiIDc1?usp=sharing",

    },
  },
];

const Certifications = () => {
  const [selectedCert, setSelectedCert] = useState(null);
  const scrollPosRef = useRef(0);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedCert) {
      scrollPosRef.current = window.scrollY;
      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';
    } else {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
      window.scrollTo(0, scrollPosRef.current);
    }
    return () => {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
    };
  }, [selectedCert]);

  return (
    <div className='max-w-[1000px] mx-auto p-6 md:my-20 relative' id="certifications">
      <h2 className='text-2xl md:text-5xl font-bold text-yellow-500 mb-8 flex items-center justify-center text-center gap-2 whitespace-nowrap'><Award size={22} className='md:w-10 md:h-10 flex-shrink-0' /> Certifications & Licenses:</h2>

      <div className='grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-6'>
        {projects.map((project, index) => (
          <Reveal key={index}>
            <div
              className='bg-gray-800/50 backdrop-blur-sm rounded-lg shadow-lg border border-gray-700
              hover:border-yellow-500/50 hover:shadow-yellow-500/10 hover:shadow-xl
              transition-all duration-300 overflow-hidden cursor-pointer group'
              onClick={() => setSelectedCert(project)}
            >
              <div className='p-2 md:p-4'>
                <div className='aspect-video mb-3 overflow-hidden rounded-lg'>
                  <img
                    src={project.img}
                    alt={project.title}
                    className='w-full h-full object-cover transition-transform duration-300 group-hover:scale-105'
                  />
                </div>
                <div className='flex items-center justify-between'>
                  <h3 className='text-base md:text-lg font-semibold text-gray-200 leading-tight min-h-[2.5rem] flex items-center pr-2'>
                    {project.title}
                  </h3>
                  <div className='text-yellow-500 bg-yellow-500/10 p-1.5 rounded-md flex-shrink-0'>
                    <MousePointerClick size={20} />
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      {/* Modal Overlay */}
      <AnimatePresence>
        {selectedCert && (
          <motion.div
            className='fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setSelectedCert(null)}
          >
            <motion.div
              className='bg-gray-900 border border-gray-700 rounded-2xl max-w-[700px] w-full max-h-[90vh] overflow-y-auto shadow-2xl'
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Image */}
              <div className='relative'>
                <img
                  src={selectedCert.img}
                  alt={selectedCert.title}
                  className='w-full aspect-video object-cover rounded-t-2xl'
                />
                <button
                  onClick={() => setSelectedCert(null)}
                  className='absolute top-3 right-3 w-9 h-9 flex items-center justify-center
                  bg-black/60 backdrop-blur-sm text-white rounded-full
                  hover:bg-black/80 transition-colors'
                >
                  <X size={20} />
                </button>
              </div>

              {/* Modal Content */}
              <div className='p-6'>
                <h3 className='text-2xl md:text-3xl font-bold text-gray-100 mb-4'>
                  {selectedCert.title}
                </h3>
                <div className='text-gray-300 leading-relaxed text-base md:text-lg mb-6'>
                  {typeof selectedCert.description === 'string' ? (
                    <p>{selectedCert.description}</p>
                  ) : (
                    selectedCert.description
                  )}
                </div>
                <div className='flex flex-wrap gap-3 justify-center'>
                  {selectedCert.links.site && (
                    <a
                      href={selectedCert.links.site}
                      target="_blank"
                      rel="noopener noreferrer"
                      className='px-5 py-2.5 bg-yellow-600 text-white rounded-lg font-semibold hover:bg-yellow-700 transition duration-300'
                    >
                      View Credentials
                    </a>
                  )}
                  {selectedCert.links.certificate && (
                    <a
                      href={selectedCert.links.certificate}
                      target="_blank"
                      rel="noopener noreferrer"
                      className='px-5 py-2.5 bg-slate-700 text-gray-200 rounded-lg font-semibold hover:bg-slate-600 transition duration-300'
                    >
                      View Certificates
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Certifications;
