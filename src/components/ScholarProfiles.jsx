import React from 'react';
import { GraduationCap } from 'lucide-react';
import { SOCIAL_LINKS, ORCID_ID } from '../data/site';

// ORCID iD mark. `color` keeps the official green badge; otherwise it follows the text colour.
export const OrcidIcon = ({ size = 16, color = false, className = '' }) => (
    <svg width={size} height={size} viewBox="0 0 256 256" className={className} aria-hidden="true">
        <circle cx="128" cy="128" r="120" fill={color ? '#A6CE39' : 'none'} stroke={color ? 'none' : 'currentColor'} strokeWidth="16" />
        <g fill={color ? '#fff' : 'currentColor'}>
            <rect x="70" y="102" width="20" height="96" />
            <circle cx="80" cy="76" r="12" />
            <path d="M109 102h46c34 0 50 24 50 48s-17 48-50 48h-46zm20 18v60h25c26 0 32-18 32-30 0-15-9-30-32-30z" />
        </g>
    </svg>
);

// "Profiles: ORCID · Google Scholar" line for the research sections.
const ScholarProfiles = ({ className = '' }) => (
    <p className={`flex flex-wrap items-center gap-x-5 gap-y-2 text-sm md:text-base text-gray-300 ${className}`}>
        <a
            href={SOCIAL_LINKS.orcid}
            target="_blank"
            rel="me noopener noreferrer"
            className="inline-flex items-center gap-2 hover:text-yellow-400 transition-colors"
        >
            <OrcidIcon size={18} color /> ORCID {ORCID_ID}
        </a>
        <a
            href={SOCIAL_LINKS.googleScholar}
            target="_blank"
            rel="me noopener noreferrer"
            className="inline-flex items-center gap-2 hover:text-yellow-400 transition-colors"
        >
            <GraduationCap size={18} className="text-yellow-500" /> Google Scholar
        </a>
    </p>
);

export default ScholarProfiles;
