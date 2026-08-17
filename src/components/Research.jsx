import React, { useState } from 'react';
import { BookOpen, ChevronDown, ChevronUp, ExternalLink, Users, CalendarDays } from 'lucide-react';
import Reveal from './Reveal';

const papers = [
  {
    title: "Efficient Vector Database Management in Retrieval-Augmented Generation Systems: A Selective Embedding Update Approach",
    authors: "Navyansh Kothari",
    venue: "2026 International Conference on Recent Advances in Electrical, Electronics, Ubiquitous Communication, and Computational Intelligence (RAEEUCCI)",
    date: "April 2026 · Chennai, India",
    doi: "10.1109/RAEEUCCI67649.2026.11504894",
    link: "https://ieeexplore.ieee.org/document/11504894",
    abstract:
      "Question-answering over large document corpora RAG systems have become viable and potent solutions to such applications. Nevertheless, classic RAG implementations are computationally inefficient in case of document updates and modification, where one has to entirely re-embed whole document collections. In this paper, we introduce an efficient RAG chatbot system that uses intelligent document versioning and differential processing for selective embedding updates. We use AWS OpenSearch to store vectors, Amazon Bedrock to provide embeddings and inference of language models, and a pipeline of smart PDF treatment which augments the difference between new documents and their modifications. Comparative analysis shows the processing time, cost of computation, and scalability of the system are much more improved. The experimental outcomes demonstrate a reduction of up to 85 percent of the overhead on embedding generation when a document is updated, while retrieval accuracy is maintained. The proposed system has a query response time of less than a second and supports real-time document updates without loss of service availability.",
  },
  {
    title: "Leveraging Deep Neural Networks for Enhanced Otitis Media Diagnosis",
    authors: "Navyansh Kothari",
    venue: "IEEE",
    date: "2026",
    link: "https://ieeexplore.ieee.org/document/11495855",
    abstract:
      "Otitis media (OM) is a prevalent spectrum of middle ear inflammatory conditions and one of the most prevalent medical conditions, particularly in children. The majority of it is diagnosed through otoscopic images — a subjective and error-inclined process. Specialized diagnostic apparatuses are costly, with limited availability and reproducibility. This paper proposes a novel approach to eardrum infection diagnosis through deep learning and multimodal data analysis. It employs a scalable ensemble of four state-of-the-art models: RegNet-X 16GF and 3.2GF for high-resolution feature extraction, MobileNetV2 for light-weight real-time processing, and ResNeXt50 32×4d for advanced pattern recognition. Trained on heterogeneous otoscopic images augmented with demographics, symptoms, and medical histories, the ensemble achieved 92.56% accuracy — higher than single models (MobileNetV2: 89.2%, ResNeXt50: 91.5%, RegNet-X 16GF: 90.8%, RegNet-X 3.2GF: 90.1%) and benchmarks like VGG16 and DenseNet121. It demonstrated 96.12% sensitivity, 87.78% specificity, and an F1 score of 87.94%, distinguishing conditions with overlapping visual features and decreasing false positives, especially in chronic OM and earwax blockage. With computational efficiency, scalability, and clinical practicability, the model presents a trustworthy diagnostic tool for early treatment and improved outcomes, especially in resource-scarce environments.",
  },
  {
    title: "EfficientNet-DR: A Deep Learning Approach for Diabetic Retinopathy Detection and Classification",
    authors: "Navyansh Kothari, Aryan Anand, Sandeep Kumar Satapathy, Shruti Mishra",
    venue: "2026 International Conference on Emerging Systems and Intelligent Computing (ESIC)",
    date: "February 2026 · Bhubaneswar, India",
    doi: "10.1109/ESIC68176.2026.11495823",
    link: "https://ieeexplore.ieee.org/document/11495823",
    abstract:
      "Diabetic Retinopathy (DR) is one of the main causes of preventable vision loss, especially among working-age populations. In this paper, an automated detection and multiclass classification system for DR is proposed, optimized for deployment on low-end devices with confined hardware and limited software capabilities. We relied on the first published dataset representing the Indian population, IDRiD, which comprises pixel-level annotations of DR lesions and normal retinal structures. Images are classified by DR severity, ranging from 0 (no DR) to 4 (proliferative DR), essential for precise diagnosis and determining the need for intervention. Preprocessing techniques including data cleaning, resizing, normalization, transformations, and data augmentation form an integral part of the methodology to significantly improve model performance. The trained and validated EfficientNet-B0 model achieved a testing accuracy of 84.2% across all DR stages, highlighting the clinical utility of applying deep learning to ophthalmology for more adequate DR screening and improved patient outcomes.",
  },
  {
    title: "Towards Insider Threat Resilience: A Proposed Mitigation Model",
    authors: "Navyansh Kothari, Chanakya Bhardwaj, Shruti Mishra, Sandeep Kumar Satapathy, Sung-Bae Cho, Pradeep Kumar Mallick",
    venue: "2024 International Conference on Emerging Systems and Intelligent Computing (ESIC)",
    date: "February 2024 · Bhubaneswar, India",
    doi: "10.1109/ESIC60604.2024.10481615",
    link: "https://ieeexplore.ieee.org/document/10481615",
    abstract:
      "Businesses are increasingly concerned about insider threats, which highlights the need for effective mitigation strategies. This paper examines the variety of insider threats and provides a thorough plan for lowering this risk. Examining different internal threat types and their motives may help organizations identify possible weak points. This paper also looks at technological advancements like user behavior analytics and anomaly detection, as well as organizational practices like security culture promotion and employee training. It advises creating a comprehensive framework for preventing insider threats that incorporates technology controls, organizational procedures, and human factors. In the implementation, a Windows application developed with Flutter and Dart takes user-input IP addresses to modify a Python script file using file handling, handles file name and path changes, converts it into an executable file, and stores it with a data file. The application includes pages for inputting IP addresses, selecting files, and protecting the script; the resulting executable can be further converted into a steganography file. This research focuses on evaluating the file's behaviour on different networks to enhance security.",
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

                <div className='mt-2 flex flex-col gap-1 text-xs md:text-sm text-gray-400'>
                  <span className='flex items-center gap-1.5'>
                    <Users size={14} className='text-yellow-500/70 flex-shrink-0' /> {paper.authors}
                  </span>
                  <span className='flex items-center gap-1.5'>
                    <CalendarDays size={14} className='text-yellow-500/70 flex-shrink-0' /> {paper.venue} &middot; {paper.date}
                  </span>
                </div>
              </div>

              <div className={`transition-all duration-300 ease-in-out overflow-hidden ${expandedCard === index ? 'max-h-[40rem] opacity-100' : 'max-h-0 opacity-0'
                }`}>
                <div className='px-4 md:px-5 pb-4 md:pb-5 border-t border-gray-700/50'>
                  <p className='text-gray-300 mb-4 mt-4 leading-relaxed text-sm'>{paper.abstract}</p>
                  {paper.doi && (
                    <p className='text-gray-500 mb-4 text-xs'>DOI: {paper.doi}</p>
                  )}
                  <div className='flex justify-center'>
                    <a
                      href={paper.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className='px-4 py-2 bg-yellow-600 text-white rounded-lg font-semibold text-center hover:bg-yellow-700 transition duration-300 flex items-center gap-2'
                      onClick={(e) => e.stopPropagation()}
                    >
                      View on IEEE Xplore <ExternalLink size={16} />
                    </a>
                  </div>
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
