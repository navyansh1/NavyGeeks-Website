// Research papers. `slug` becomes the URL: /research/<slug>/
// `authors` lists every author in publication order - add co-authors here if the paper has any.
export const papers = [
  {
    slug: "selective-embedding-update-rag-vector-database",
    title: "Efficient Vector Database Management in Retrieval-Augmented Generation Systems: A Selective Embedding Update Approach",
    authors: ["Navyansh Kothari"],
    venue: "2026 International Conference on Recent Advances in Electrical, Electronics, Ubiquitous Communication, and Computational Intelligence (RAEEUCCI)",
    date: "April 2026 · Chennai, India",
    published: "2026-04",
    location: "Chennai, India",
    tags: ["Generative AI", "RAG", "Vector Databases", "Cloud Computing"],
    doi: "10.1109/RAEEUCCI67649.2026.11504894",
    link: "https://ieeexplore.ieee.org/document/11504894",
    metaDescription:
      "IEEE paper on cutting RAG embedding-update cost by up to 85% with document versioning and PDF diffing on AWS OpenSearch and Amazon Bedrock.",
    abstract: [
      "Classic RAG systems re-embed entire document collections on every update — slow and computationally wasteful.",
      "Introduces a RAG chatbot with intelligent document versioning and differential processing for selective embedding updates.",
      "Built on AWS OpenSearch for vector storage, Amazon Bedrock for embeddings and inference, and a smart PDF-diffing pipeline.",
      "Cuts embedding-update overhead by up to 85% while keeping retrieval accuracy intact.",
      "Delivers sub-second query response with real-time document updates and no downtime.",
    ],
  },
  {
    slug: "otitis-media-diagnosis-deep-neural-networks",
    title: "Leveraging Deep Neural Networks for Enhanced Otitis Media Diagnosis",
    authors: ["Navyansh Kothari"],
    venue: "2026 International Conference on Emerging Systems and Intelligent Computing (ESIC)",
    date: "February 2026 · Bhubaneswar, India",
    published: "2026-02",
    location: "Bhubaneswar, India",
    tags: ["Deep Learning", "Computer Vision", "Healthcare AI"],
    link: "https://ieeexplore.ieee.org/document/11495855",
    metaDescription:
      "IEEE paper: a 4-model deep learning ensemble (RegNet, MobileNetV2, ResNeXt) that reaches 92.56% accuracy diagnosing otitis media from otoscopic images.",
    abstract: [
      "Otitis media is common, especially in children, but diagnosis from otoscopic images is subjective, error-prone, and specialized equipment is costly.",
      "Proposes a 4-model ensemble: RegNet-X 16GF & 3.2GF for high-res features, MobileNetV2 for lightweight speed, ResNeXt50 32×4d for pattern recognition.",
      "Trained on otoscopic images enriched with demographics, symptoms, and medical history.",
      "Reaches 92.56% accuracy, beating every individual model and benchmarks like VGG16/DenseNet121, with 96.12% sensitivity.",
      "Cuts false positives on tricky cases like chronic OM and earwax blockage — a practical tool for resource-scarce clinics.",
    ],
  },
  {
    slug: "efficientnet-dr-diabetic-retinopathy-detection",
    title: "EfficientNet-DR: A Deep Learning Approach for Diabetic Retinopathy Detection and Classification",
    authors: ["Navyansh Kothari"],
    venue: "2026 International Conference on Emerging Systems and Intelligent Computing (ESIC)",
    date: "February 2026 · Bhubaneswar, India",
    published: "2026-02",
    location: "Bhubaneswar, India",
    tags: ["Deep Learning", "Computer Vision", "Healthcare AI"],
    doi: "10.1109/ESIC68176.2026.11495823",
    link: "https://ieeexplore.ieee.org/document/11495823",
    metaDescription:
      "IEEE paper: EfficientNet-B0 detects and grades diabetic retinopathy (0-4) on the IDRiD dataset with 84.2% accuracy, built to run on low-end hardware.",
    abstract: [
      "Diabetic Retinopathy (DR) is a leading cause of preventable vision loss, especially among working-age adults.",
      "Builds an automated DR detector and severity classifier (grades 0-4), optimized to run on low-end hardware.",
      "Trained on IDRiD, the first Indian-population DR dataset, using cleaning, normalization, and augmentation.",
      "EfficientNet-B0 reaches 84.2% testing accuracy across all severity stages.",
      "Shows deep learning can meaningfully improve DR screening where specialist access is limited.",
    ],
  },
  {
    slug: "insider-threat-resilience-mitigation-model",
    title: "Towards Insider Threat Resilience: A Proposed Mitigation Model",
    authors: ["Navyansh Kothari"],
    venue: "2024 International Conference on Emerging Systems and Intelligent Computing (ESIC)",
    date: "February 2024 · Bhubaneswar, India",
    published: "2024-02",
    location: "Bhubaneswar, India",
    tags: ["Cybersecurity", "Machine Learning", "Anomaly Detection"],
    doi: "10.1109/ESIC60604.2024.10481615",
    link: "https://ieeexplore.ieee.org/document/10481615",
    metaDescription:
      "IEEE paper proposing an insider threat mitigation model that combines behavior analytics, security culture and training, with a Flutter-based Windows tool.",
    abstract: [
      "Insider threats are a growing business risk, requiring both technical and human-side mitigation.",
      "Surveys threat types and motives, proposing a framework combining behavior analytics, security culture, and employee training.",
      "Implements a Windows tool (Flutter + Dart) that takes a target IP, modifies and protects a Python script, then packages it as a standalone executable.",
      "Evaluates the resulting executable's behavior across different networks to test its security posture.",
    ],
  },
];

export const getPaper = (slug) => papers.find((p) => p.slug === slug);
