import React from "react"
import {
  DiReact,
  DiNodejsSmall,
  DiMongodb,
  DiGithubBadge,
  DiPython,
  DiAndroid,
  DiFirebase,
} from "react-icons/di"
import {
  SiSwift,
  SiXcode,
  SiAmazonaws,
  SiGooglecloud,
  SiPostgresql,
  SiFlask,
  SiScikitlearn,
  SiNumpy,
  SiPandas,
  SiFastapi,
  SiExpo,
  SiFirebase,
} from "react-icons/si"
import { BiLogoPostgresql } from "react-icons/bi"
import { TbBrandReactNative } from "react-icons/tb"

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
    category: 'GenAI & Software Engineering',
    technologies: [
      { name: 'LangChain', icon: <DiPython className='text-yellow-400' /> },
      { name: 'LangGraph', icon: <DiPython className='text-green-400' /> },
      { name: 'RAG Pipelines', icon: <DiPython className='text-purple-400' /> },
      { name: 'FastAPI', icon: <SiFastapi className='text-teal-400' /> },
      { name: 'Node.js', icon: <DiNodejsSmall className='text-green-500' /> },
      { name: 'React', icon: <DiReact className='text-blue-500' /> },
      { name: 'GitHub', icon: <DiGithubBadge className='text-gray-600' /> },
    ],
  },
  {
    category: 'Cloud Development',
    technologies: [
      { name: 'Amazon Web Services (AWS)', icon: <SiAmazonaws className='text-yellow-600' /> },
      { name: 'Google Cloud Platform (GCP)', icon: <SiGooglecloud className='text-blue-600' /> },
      { name: 'Firebase', icon: <SiFirebase className='text-yellow-500' /> },
      { name: 'divider', icon: null }, // Horizontal divider
      { name: 'section_title', title: 'Mobile Development', icon: null }, // Section title
      { name: 'React Native', icon: <TbBrandReactNative className='text-blue-500' /> },
      { name: 'Expo', icon: <SiExpo className='text-black bg-white rounded' /> },
      { name: 'iOS (Swift)', icon: <SiSwift className='text-orange-600' /> },
      { name: 'Android', icon: <DiAndroid className='text-green-500' /> },
      { name: 'Xcode', icon: <SiXcode className='text-blue-600' /> },
    ],
  },
]

const Skills = () => {
  return (
    <div className="max-w-[1400px] mx-auto flex flex-col justify-center px-4 text-gray-200 pb-8 md:py-12" id="skills">
      <Reveal>
        <h2 className="text-5xl mb-7 text-center ">Skills:</h2>

        <div className="flex flex-col md:flex-row justify-center space-y-8 md:space-y-0 md:space-x-4">
          {skills.map((skill, index) => (
            <div key={index} className="border-4 border-yellow-400 p-6 rounded-lg bg-purple-800/20 shadow-lg w-full md:w-1/4">
              <h3 className="text-xl mb-4 md-2 text-center text-yellow-400">{skill.category}</h3>
              <div className="grid grid-cols-1 gap-4">
                {skill.technologies.map((tech, idx) => {
                  if (tech.name === 'divider') {
                    return <div key={idx} className="border-t-2 border-yellow-400 my-2"></div>
                  } else if (tech.name === 'section_title') {
                    return <h4 key={idx} className="text-lg text-center text-yellow-400 my-2">{tech.title}</h4>
                  } else {
                    return (
                      <div key={idx} className="flex items-center space-x-2">
                        <span className="text-xl">{tech.icon}</span>
                        <span>{tech.name}</span>
                      </div>
                    )
                  }
                })}
              </div>
            </div>
          ))}
        </div>
      </Reveal>
    </div>
  )
}

export default Skills;
