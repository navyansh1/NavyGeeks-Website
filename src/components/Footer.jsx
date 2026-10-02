import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Instagram, Youtube, Linkedin, GraduationCap } from 'lucide-react';
import { OrcidIcon } from './ScholarProfiles';
import { SOCIAL_LINKS, pagePath } from '../data/site';

const exploreLinks = [
    { to: 'skills', label: 'Skills' },
    { to: 'experience', label: 'Experience' },
    { to: 'education', label: 'Education' },
    { to: 'projects', label: 'Projects' },
    { to: 'research', label: 'Research' },
    { to: 'certifications', label: 'Certifications' },
    { to: 'about', label: 'About' },
];

const socials = [
    { href: SOCIAL_LINKS.github, label: 'GitHub', Icon: Github },
    { href: SOCIAL_LINKS.instagram, label: 'Instagram', Icon: Instagram },
    { href: SOCIAL_LINKS.youtube, label: 'YouTube', Icon: Youtube },
    { href: SOCIAL_LINKS.linkedin, label: 'LinkedIn', Icon: Linkedin },
    { href: SOCIAL_LINKS.googleScholar, label: 'Google Scholar', Icon: GraduationCap },
    { href: SOCIAL_LINKS.orcid, label: 'ORCID', Icon: (props) => <OrcidIcon {...props} size={28} /> },
];

const Footer = () => {
    return (
        <footer className='max-w-[1300px] mx-auto flex flex-col gap-6 xl:flex-row xl:items-center xl:justify-between p-6 pb-20 md:px-12 md:py-12 text-sm md:text-lg mt-12'>
            <div>
                <div className='flex flex-row gap-4 md:gap-5 text-yellow-500'>
                    {socials.map(({ href, label, Icon }) => (
                        <a
                            key={label}
                            href={href}
                            aria-label={label}
                            target="_blank"
                            rel="noopener noreferrer me"
                            className='hover:text-yellow-400 transition'
                        >
                            <Icon size={28} className="md:w-8 md:h-8" />
                        </a>
                    ))}
                </div>
            </div>

            <nav aria-label="Explore" className='flex flex-wrap gap-x-6 gap-y-2 xl:flex-nowrap xl:gap-x-7'>
                {exploreLinks.map((link) => (
                    <Link
                        key={link.to}
                        to={pagePath(link.to)}
                        className='text-sm md:text-base text-gray-300 hover:text-yellow-400 transition whitespace-nowrap'
                    >
                        {link.label}
                    </Link>
                ))}
            </nav>

            <p className='text-yellow-500 text-sm md:text-base whitespace-nowrap'>
                © 2026 NavyGeeks
            </p>
        </footer>
    );
}

export default Footer;
