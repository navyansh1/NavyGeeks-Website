import React, { useState } from 'react';
import { BookOpen, ChevronDown, ChevronUp, ExternalLink, User, CalendarDays, Building2 } from 'lucide-react';
import Reveal from './Reveal';

const papers = [
  {
    title: "Efficient Vector Database Management in Retrieval-Augmented Generation Systems: A Selective Embedding Update Approach",
    venue: "2026 International Conference on Recent Advances in Electrical, Electronics, Ubiquitous Communication, and Computational Intelligence (RAEEUCCI)",
    date: "April 2026 · Chennai, India",
    tags: ["Generative AI", "RAG", "Vector Databases", "Cloud Computing"],
    doi: "10.1109/RAEEUCCI67649.2026.11504894",
    link: "https://ieeexplore.ieee.org/document/11504894",
    abstract: [
      "Classic RAG systems re-embed entire document collections on every update — slow and computationally wasteful.",
      "Introduces a RAG chatbot with intelligent document versioning and differential processing for selective embedding updates.",
      "Built on AWS OpenSearch for vector storage, Amazon Bedrock for embeddings and inference, and a smart PDF-diffing pipeline.",
      "Cuts embedding-update overhead by up to 85% while keeping retrieval accuracy intact.",
      "Delivers sub-second query response with real-time document updates and no downtime.",
    ],
  },
  {
    title: "Leveraging Deep Neural Networks for Enhanced Otitis Media Diagnosis",
    venue: "2026 International Conference on Emerging Systems and Intelligent Computing (ESIC)",
    date: "February 2026 · Bhubaneswar, India",
    tags: ["Deep Learning", "Computer Vision", "Healthcare AI"],
    link: "https://ieeexplore.ieee.org/document/11495855",
    abstract: [
      "Otitis media is common, especially in children, but diagnosis from otoscopic images is subjective, error-prone, and specialized equipment is costly.",
      "Proposes a 4-model ensemble: RegNet-X 16GF & 3.2GF for high-res features, MobileNetV2 for lightweight speed, ResNeXt50 32×4d for pattern recognition.",
      "Trained on otoscopic images enriched with demographics, symptoms, and medical history.",
      "Reaches 92.56% accuracy, beating every individual model and benchmarks like VGG16/DenseNet121, with 96.12% sensitivity.",
      "Cuts false positives on tricky cases like chronic OM and earwax blockage — a practical tool for resource-scarce clinics.",
    ],
  },
  {
    title: "EfficientNet-DR: A Deep Learning Approach for Diabetic Retinopathy Detection and Classification",
    venue: "2026 International Conference on Emerging Systems and Intelligent Computing (ESIC)",
    date: "February 2026 · Bhubaneswar, India",
    tags: ["Deep Learning", "Computer Vision", "Healthcare AI"],
    doi: "10.1109/ESIC68176.2026.11495823",
    link: "https://ieeexplore.ieee.org/document/11495823",
    abstract: [
      "Diabetic Retinopathy (DR) is a leading cause of preventable vision loss, especially among working-age adults.",
      "Builds an automated DR detector and severity classifier (grades 0-4), optimized to run on low-end hardware.",
      "Trained on IDRiD, the first Indian-population DR dataset, using cleaning, normalization, and augmentation.",
      "EfficientNet-B0 reaches 84.2% testing accuracy across all severity stages.",
      "Shows deep learning can meaningfully improve DR screening where specialist access is limited.",
    ],
  },
  {
    title: "Towards Insider Threat Resilience: A Proposed Mitigation Model",
    venue: "2024 International Conference on Emerging Systems and Intelligent Computing (ESIC)",
    date: "February 2024 · Bhubaneswar, India",
    tags: ["Cybersecurity", "Machine Learning", "Anomaly Detection"],
    doi: "10.1109/ESIC60604.2024.10481615",
    link: "https://ieeexplore.ieee.org/document/10481615",
    abstract: [
      "Insider threats are a growing business risk, requiring both technical and human-side mitigation.",
      "Surveys threat types and motives, proposing a framework combining behavior analytics, security culture, and employee training.",
      "Implements a Windows tool (Flutter + Dart) that takes a target IP, modifies and protects a Python script, then packages it as a standalone executable.",
      "Evaluates the resulting executable's behavior across different networks to test its security posture.",
    ],
  },
];

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
          <Reveal key={index} width="100%">
            <div className='bg-gray-800/50 backdrop-blur-sm rounded-lg shadow-lg border border-gray-700 hover:border-yellow-500/50 transition-all duration-300 overflow-hidden max-w-[750px] w-full mx-auto'>
              <div
                className='cursor-pointer p-4 md:p-5'
                onClick={() => toggleCard(index)}
              >
                <div className='flex items-start justify-between gap-3'>
                  <h3 className='text-base md:text-lg font-semibold text-gray-200 leading-snug'>{paper.title}</h3>
                  <div className='text-yellow-500 flex-shrink-0 mt-1'>
                    {expandedCard === index ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </div>
                </div>

                <div className='mt-2 flex flex-col gap-1'>
                  <p className='flex items-center gap-1.5 text-xs md:text-sm text-gray-400'>
                    <User size={14} className='text-yellow-500/70 flex-shrink-0' /> Navyansh Kothari
                  </p>
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

                <div className='mt-3 flex justify-center'>
                  <a
                    href={paper.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className='px-4 py-1.5 bg-yellow-600 text-white text-sm rounded-lg font-semibold text-center hover:bg-yellow-700 transition duration-300 flex items-center gap-2'
                    onClick={(e) => e.stopPropagation()}
                  >
                    View Publication <ExternalLink size={14} />
                  </a>
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
                  {paper.doi && (
                    <p className='text-gray-500 text-xs'>DOI: {paper.doi}</p>
                  )}
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}

export default Research;
