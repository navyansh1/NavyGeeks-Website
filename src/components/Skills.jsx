import React from "react"
import {
  DiReact,
  DiNodejsSmall,
  DiMongodb,
  DiGithubBadge,
  DiPython,
  DiAndroid,
} from "react-icons/di"
import {
  SiSwift,
  SiXcode,
  SiAmazonaws,
  SiGooglecloud,
  SiScikitlearn,
  SiNumpy,
  SiPandas,
  SiFastapi,
  SiExpo,
  SiFirebase,
} from "react-icons/si"
import { BiLogoPostgresql } from "react-icons/bi"
import { TbBrandReactNative } from "react-icons/tb"
import { Wrench } from "lucide-react"

import Reveal from "./Reveal"

const skills = [
  {
    category: 'Data Science',
    technologies: [
      { name: 'Python', icon: <DiPython className='text-blue-400' /> },
      { name: 'NumPy', icon: <SiNumpy className='text-blue-500' /> },
      { name: 'Pandas', icon: <SiPandas className='text-purple-500' /> },
      { name: 'SQL', icon: <BiLogoPostgresql className='text-blue-600' /> },
      { name: 'MongoDB', icon: <DiMongodb className='text-green-600' /> },
    ],
  },
  {
    category: 'Machine Learning',
    technologies: [
      { name: 'Scikit-learn', icon: <SiScikitlearn className='text-orange-500' /> },
      { name: 'Demand Forecasting (FMCG)', icon: <DiPython className='text-green-500' /> },
      { name: 'Time-Series Models (ARIMA, SARIMA)', icon: <DiPython className='text-green-400' /> },
      { name: 'Credit Risk & Fraud Modeling (BFSI)', icon: <DiPython className='text-red-400' /> },
    ],
  },
  {
    category: 'Gen AI & Backend',
    technologies: [
      { name: 'LangChain', icon: <DiPython className='text-yellow-400' /> },
      { name: 'LangGraph', icon: <DiPython className='text-green-400' /> },
      { name: 'RAG Pipelines', icon: <DiPython className='text-purple-400' /> },
      { name: 'FastAPI', icon: <SiFastapi className='text-teal-400' /> },
      { name: 'Node.js', icon: <DiNodejsSmall className='text-green-500' /> },
    ],
  },
  {
    category: 'Mobile Development',
    technologies: [
      { name: 'React Native', icon: <TbBrandReactNative className='text-blue-500' /> },
      { name: 'Expo', icon: <SiExpo className='text-black bg-white rounded' /> },
      { name: 'iOS (Swift)', icon: <SiSwift className='text-orange-600' /> },
      { name: 'Android', icon: <DiAndroid className='text-green-500' /> },
      { name: 'Xcode', icon: <SiXcode className='text-blue-600' /> },
    ],
  },
  {
    category: 'Cloud & Tools',
    technologies: [
      { name: 'AWS', icon: <SiAmazonaws className='text-yellow-600' /> },
      { name: 'Google Cloud (GCP)', icon: <SiGooglecloud className='text-blue-600' /> },
      { name: 'Firebase', icon: <SiFirebase className='text-yellow-500' /> },
      { name: 'React', icon: <DiReact className='text-blue-500' /> },
      { name: 'GitHub', icon: <DiGithubBadge className='text-gray-400' /> },
    ],
  },
]

const Skills = () => {
  return (
    <div className="max-w-[1200px] mx-auto flex flex-col justify-center px-4 text-gray-200 pb-8 md:py-12" id="skills">
      <Reveal width="100%">
        <h2 className="text-5xl mb-8 text-center text-yellow-500 font-bold flex items-center justify-center gap-3">
          <Wrench size={40} /> Skills
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {skills.map((skill, index) => (
            <div key={index} className="border-2 border-yellow-500/60 p-5 rounded-xl bg-purple-800/20 shadow-lg
              hover:border-yellow-400 hover:shadow-yellow-500/10 hover:shadow-xl transition-all duration-300">
              <h3 className="text-lg mb-4 text-center text-yellow-400 font-semibold">{skill.category}</h3>
              <div className="space-y-3">
                {skill.technologies.map((tech, idx) => (
                  <div key={idx} className="flex items-center space-x-2.5">
                    <span className="text-xl flex-shrink-0">{tech.icon}</span>
                    <span className="text-sm">{tech.name}</span>
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
