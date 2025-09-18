import React from "react"
import {
  DiHtml5,
  DiCss3,
  DiSass,
  DiBootstrap,
  DiJavascript1,
  DiReact,
  DiNodejsSmall,
  DiMongodb,
  DiGithubBadge,
} from "react-icons/di"
import { SiFigma, SiAdobephotoshop, SiSwift, SiXcode, SiAmazonaws, SiGooglecloud, SiPython, SiPostgresql, SiFlask } from "react-icons/si"  // Import AWS, GCP, Python, PostgreSQL, and Flask icons
import { BiLogoPostgresql } from "react-icons/bi"

import Reveal from "./Reveal"

const skills = [

    {
      category: 'Fullstack & Version Control',
      technologies: [
        { name: 'Node Js', icon: <DiNodejsSmall className='text-green-500' /> },
        { name: 'MongoDB', icon: <DiMongodb className='text-green-600' /> },
        { name: 'React', icon: <DiReact className='text-blue-500' /> },
        { name: 'Flask', icon: <SiFlask className='text-gray-400' /> },
        { name: 'GitHub', icon: <DiGithubBadge className='text-gray-600' /> },
      ],
    },
    {
      category: 'Data Engineering',
      technologies: [
        { name: 'Python', icon: <SiPython className='text-blue-400' /> },
        { name: 'SQL', icon: <BiLogoPostgresql className='text-blue-600' /> },
        { name: 'PostgreSQL', icon: <SiPostgresql className='text-blue-600' /> },
        { name: 'MongoDB', icon: <DiMongodb className='text-green-600' /> },
      ],
    },
    {
      category: 'Frontend & UI-UX',
      technologies: [
        { name: 'HTML', icon: <DiHtml5 className='text-orange-600' /> },
        { name: 'CSS', icon: <DiCss3 className='text-blue-600' /> },
        { name: 'JavaScript', icon: <DiJavascript1 className='text-yellow-500' /> },
        { name: 'React', icon: <DiReact className='text-blue-500' /> },
        { name: 'Figma', icon: <SiFigma className='text-red-600' /> },
        { name: 'Photoshop', icon: <SiAdobephotoshop className='text-blue-600' /> },
      ],
    },
    // {
    //   category: 'iOS Development',
    //   technologies: [
    //     { name: 'SwiftUI', icon: <SiSwift className='text-orange-600' /> },
    //     { name: 'Xcode', icon: <SiXcode className='text-blue-600' /> },
    //   ],
    // },
    {
      category: 'Cloud Development',
      technologies: [
        { name: 'Amazon Web Services -AWS', icon: <SiAmazonaws className='text-yellow-600' /> },
        { name: 'Google Cloud Computing -GCP', icon: <SiGooglecloud className='text-blue-600' /> },
      ],
    },
  ]

const Skills = () => {
  return (
    <div className="max-w-[1200px] mx-auto flex flex-col justify-center px-4 text-gray-200 pb-8 md:py-12" id="skills">
        <Reveal>
        <h2 className="text-5xl mb-7 text-center ">Skills:</h2>

        <div className="flex flex-col md:flex-row justify-center space-y-8 md:space-y-0 md:space-x-8">
            {skills.map((skill, index) => (
                <div key={index} className="border-4 border-yellow-400 p-6 rounded-lg bg-purple-800/20 shadow-lg w-full md:w-1/3">
                    <h3 className="text-xl mb-4 md-2 text-center">{skill.category}</h3> {/* Increased text size */}
                    <div className="grid grid-cols-1 gap-4">
                        {skill.technologies.map((tech, idx) => (
                            <div key={idx} className="flex items-center space-x-2">
                                <span className="text-xl">{tech.icon}</span>
                                <span>{tech.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
        </Reveal>
    </div>
  )
}

export default Skills;
