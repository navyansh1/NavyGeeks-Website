import React, { useState, useEffect, useRef } from 'react';
import { Award, X, MousePointerClick } from 'lucide-react';
import Reveal from './Reveal';
import CertDetails from './CertDetails';
import { certifications as projects } from '../data/certifications';
import { motion, AnimatePresence } from 'framer-motion';

const Certifications = ({ pageHeading = false }) => {
  const Heading = pageHeading ? 'h1' : 'h2';
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
      <Heading className='text-2xl md:text-5xl font-bold text-yellow-500 mb-8 flex items-center justify-center text-center gap-2 whitespace-nowrap'><Award size={22} className='md:w-10 md:h-10 flex-shrink-0' /> Certifications & Licenses:</Heading>

      <div className='grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-6'>
        {projects.map((project) => (
          <Reveal key={project.title}>
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
                    alt={`${project.title} certificate`}
                    loading="lazy"
                    decoding="async"
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
                  <CertDetails cert={selectedCert} />
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
