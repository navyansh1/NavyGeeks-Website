import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BookOpen, ExternalLink, CalendarDays, Building2, ArrowRight } from 'lucide-react';
import Reveal from './Reveal';
import ScholarProfiles from './ScholarProfiles';
import { papers } from '../data/research';
import { pagePath } from '../data/site';

// Each paper card opens that paper's own page; "View on IEEE" still goes to IEEE Xplore.
const Research = () => {
  const navigate = useNavigate();

  return (
    <div className='max-w-[1000px] mx-auto p-6 md:my-20 relative' id="research">
      <h2 className='text-2xl md:text-5xl font-bold text-yellow-500 mb-8 flex items-center justify-center text-center gap-2 whitespace-nowrap'>
        <BookOpen size={22} className='md:w-10 md:h-10 flex-shrink-0' /> Research & Publications:
      </h2>

      <ScholarProfiles className='justify-center mb-6 -mt-2' />

      <div className='space-y-4'>
        {papers.map((paper) => {
          const to = pagePath(`research/${paper.slug}`);
          return (
            <Reveal key={paper.slug} width="100%">
              <div
                className='group cursor-pointer bg-gray-800/50 backdrop-blur-sm rounded-lg shadow-lg border border-gray-700 hover:border-yellow-500/50 transition-all duration-300 overflow-hidden max-w-[750px] w-full mx-auto p-4 md:p-5'
                onClick={() => navigate(to)}
              >
                <h3 className='text-base md:text-lg font-semibold text-gray-200 leading-snug group-hover:text-yellow-400 transition-colors'>
                  <Link to={to} onClick={(e) => e.stopPropagation()}>{paper.title}</Link>
                </h3>

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

                <div className='mt-4 flex flex-wrap items-center justify-between gap-3'>
                  <span className='text-yellow-400 text-sm font-semibold inline-flex items-center gap-1'>
                    Read full summary <ArrowRight size={14} />
                  </span>
                  {paper.link && (
                    <a
                      href={paper.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className='px-4 py-1.5 bg-yellow-600 text-white text-sm rounded-lg font-semibold text-center hover:bg-yellow-700 transition duration-300 flex items-center gap-2'
                      onClick={(e) => e.stopPropagation()}
                    >
                      View on IEEE <ExternalLink size={14} />
                    </a>
                  )}
                </div>
              </div>
            </Reveal>
          );
        })}
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
