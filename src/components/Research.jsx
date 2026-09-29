import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, ChevronDown, ChevronUp, ExternalLink, CalendarDays, Building2, ArrowRight } from 'lucide-react';
import Reveal from './Reveal';
import { papers } from '../data/research';
import { pagePath } from '../data/site';

const Research = () => {
  const [expandedCard, setExpandedCard] = useState(null);

  const toggleCard = (index) => {
    setExpandedCard(expandedCard === index ? null : index);
  };

  return (
    <div className='max-w-[1000px] mx-auto p-6 md:my-20 relative' id="research">
      <h2 className='text-2xl md:text-5xl font-bold text-yellow-500 mb-8 flex items-center justify-center text-center gap-2 whitespace-nowrap'>
        <BookOpen size={22} className='md:w-10 md:h-10 flex-shrink-0' /> Research & Publications:
      </h2>

      <div className='space-y-4'>
        {papers.map((paper, index) => (
          <Reveal key={paper.slug} width="100%">
            <div className='bg-gray-800/50 backdrop-blur-sm rounded-lg shadow-lg border border-gray-700 hover:border-yellow-500/50 transition-all duration-300 overflow-hidden max-w-[750px] w-full mx-auto'>
              <div
                className='cursor-pointer p-4 md:p-5'
                onClick={() => toggleCard(index)}
              >
                <h3 className='text-base md:text-lg font-semibold text-gray-200 leading-snug'>{paper.title}</h3>

                <div className='mt-2 flex flex-col gap-1'>
                  <p className='flex items-center gap-1.5 text-xs md:text-sm text-gray-400'>
                    <CalendarDays size={14} className='text-yellow-500/70 flex-shrink-0' /> {paper.venue} &middot; {paper.date}
                  </p>
                  <p className='flex items-center gap-1.5 text-xs md:text-sm text-gray-400'>
                    <Building2 size={14} className='text-yellow-500/70 flex-shrink-0' /> Publisher: IEEE
                  </p>
                </div>

                <div className='mt-3 flex flex-wrap gap-1.5'>
                  {paper.tags.map((tag) => (
                    <span
                      key={tag}
                      className='text-[11px] leading-none font-medium text-yellow-400 bg-yellow-500/10 border border-yellow-500/30 rounded-full px-2.5 py-1'
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className='mt-3 flex items-center justify-center relative'>
                  <a
                    href={paper.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className='px-4 py-1.5 bg-yellow-600 text-white text-sm rounded-lg font-semibold text-center hover:bg-yellow-700 transition duration-300 flex items-center gap-2'
                    onClick={(e) => e.stopPropagation()}
                  >
                    View Publication <ExternalLink size={14} />
                  </a>
                  <div className='absolute right-0 text-yellow-500'>
                    {expandedCard === index ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </div>
                </div>
              </div>

              <div className={`transition-all duration-300 ease-in-out overflow-hidden ${expandedCard === index ? 'max-h-[40rem] opacity-100' : 'max-h-0 opacity-0'
                }`}>
                <div className='px-4 md:px-5 pb-4 md:pb-5 border-t border-gray-700/50'>
                  <ul className='list-disc list-outside pl-4 space-y-1.5 text-gray-300 mb-3 mt-4 leading-relaxed text-sm'>
                    {paper.abstract.map((point, i) => (
                      <li key={i}>{point}</li>
                    ))}
                  </ul>
                  <div className='flex flex-wrap items-center justify-between gap-2'>
                    {paper.doi && (
                      <p className='text-gray-500 text-xs'>DOI: {paper.doi}</p>
                    )}
                    <Link
                      to={pagePath(`research/${paper.slug}`)}
                      className='text-yellow-400 hover:text-yellow-300 text-sm font-semibold inline-flex items-center gap-1'
                    >
                      Read full summary <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      <div className='mt-8 text-center'>
        <Link to={pagePath('research')} className='inline-flex items-center gap-2 text-yellow-400 hover:text-yellow-300 font-semibold'>
          See all publications <ArrowRight size={18} />
        </Link>
      </div>
    </div>
  );
}

export default Research;
