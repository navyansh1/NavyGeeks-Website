import odmRagDiagram from "../assets/diagrams/paper-odm-rag.svg";
import selectiveRagDiagram from "../assets/diagrams/paper-selective-rag.svg";
import otitisDiagram from "../assets/diagrams/paper-otitis.svg";
import efficientnetDiagram from "../assets/diagrams/paper-efficientnet-dr.svg";
import insiderDiagram from "../assets/diagrams/paper-insider-threat.svg";

// Research papers, newest first. `slug` becomes the URL: /research/<slug>/
// `authors` feeds the Scholar meta tags and schema only; pages do not print it.
// Page blocks (all optional): facts [label, value], abstract (key points), flow [step, note],
// tables {title, head, rows}, diagram (SVG import), details (collapsed bullets).
export const papers = [
  {
    slug: "on-demand-multimodal-rag-selective-page-rendering",
    title: "On-Demand Multimodal RAG: A Cost-Efficient Approach to Document Analysis with Selective Page Rendering",
    authors: ["Navyansh Kothari"],
    venue: "2026 IEEE International Conference on Intelligent Electronics & Computational Systems (IECS)",
    date: "July 2026 · Bhopal, India",
    published: "2026-07",
    location: "Bhopal, India",
    tags: ["Generative AI", "Multimodal RAG", "Document AI", "LLM Cost Optimization", "Gemini", "FAISS"],
    metaDescription:
      "IEEE paper by Navyansh Kothari: On-Demand Multimodal RAG answers questions on diagram-heavy PDFs at 94.2% accuracy while cutting LLM cost 97.3% by rendering only the pages it needs.",
    facts: [
      ["Problem", "Technical PDFs keep key facts in diagrams, tables and equations. Text-only RAG loses them, OCR is slow, and sending the whole PDF to an LLM is very expensive."],
      ["Idea", "Search the text as usual, then turn only the few matching pages into images and send those to a multimodal LLM."],
      ["Result", "94.2% accuracy, 97.3% cheaper than sending the full document, 89.5% faster than OCR pipelines."],
      ["Tested on", "A 165-page metallurgy manual (47 diagrams, 23 tables) with 50 questions of 5 types"],
      ["Tech", "PyMuPDF, LangChain splitter, Google embedding-001, FAISS, Gemini 2.0 Flash, FastAPI, Streamlit, Docker"],
    ],
    abstract: [
      "Indexing stays cheap: only the text is embedded, but every chunk remembers its page number",
      "At question time the top 3 chunks point to a few pages; only those pages are rendered (150 DPI PNG)",
      "The multimodal LLM sees the real page, so it can read the diagram, table or equation itself",
      "Near full-document accuracy (94.2% vs 96.8%) at about 1/37th of the cost",
      "Cost stays almost flat as documents grow: $0.012 to $0.018 per query from 50 to 2,000 pages",
    ],
    flow: [
      ["PDF", "text extracted with PyMuPDF"],
      ["Chunk + embed", "1000 chars, 200 overlap, page tagged"],
      ["Search", "FAISS top-3 chunks"],
      ["Pick pages", "unique page numbers"],
      ["Render", "only those pages, 150 DPI"],
      ["Answer", "Gemini 2.0 Flash reads the images"],
    ],
    diagram: odmRagDiagram,
    tables: [
      {
        title: "Compared with other ways of doing it (50 questions)",
        head: ["Approach", "Accuracy", "Latency", "Cost per query"],
        rows: [
          ["On-Demand Multimodal RAG", "94.2%", "2.8 s", "$0.014"],
          ["Text-only RAG", "67.4%", "1.9 s", "$0.003"],
          ["OCR-based RAG", "78.6%", "26.7 s", "$0.048"],
          ["Whole document to the LLM", "96.8%", "52.3 s", "$0.516"],
          ["Hybrid", "88.2%", "31.4 s", "$0.124"],
        ],
      },
      {
        title: "Accuracy by question type",
        head: ["Question type", "Accuracy"],
        rows: [
          ["Text", "98%"],
          ["Diagram", "93%"],
          ["Table", "92%"],
          ["Equation", "91%"],
          ["Mixed (text + visuals)", "95%"],
        ],
      },
      {
        title: "Cost per query as the document grows",
        head: ["Pages", "This approach", "Whole document"],
        rows: [
          ["50", "$0.012", "$0.156"],
          ["2,000", "$0.018", "$6.250"],
        ],
      },
    ],
    details: [
      "Latency split: 0.4 s retrieval, 0.6 s page rendering, 1.8 s LLM",
      "Data sent per question: 0.8 MB instead of 28.4 MB for the whole document (97.2% less)",
      "10,000 questions on a 500-page document: about $160 instead of $15,630",
      "50 parallel questions finish in 8.4 s, against 142.7 s for the whole-document approach",
      "Served through FastAPI (/chat, /health) with a Streamlit UI, packaged in Docker",
      "Retrieval uses L2 distance in FAISS; embeddings are 768-dimensional",
    ],
  },
  {
    slug: "selective-embedding-update-rag-vector-database",
    title: "Efficient Vector Database Management in Retrieval-Augmented Generation Systems: A Selective Embedding Update Approach",
    authors: ["Navyansh Kothari"],
    venue: "2026 International Conference on Recent Advances in Electrical, Electronics, Ubiquitous Communication, and Computational Intelligence (RAEEUCCI)",
    date: "April 2026 · Chennai, India",
    published: "2026-04",
    location: "Chennai, India",
    tags: ["Generative AI", "RAG", "Vector Databases", "AWS OpenSearch", "Amazon Bedrock", "Cloud Computing"],
    doi: "10.1109/RAEEUCCI67649.2026.11504894",
    link: "https://ieeexplore.ieee.org/document/11504894",
    metaDescription:
      "IEEE paper by Navyansh Kothari: updating only the changed document in a RAG vector database cuts update time 84.9% and database calls 99.6% on AWS OpenSearch and Bedrock.",
    facts: [
      ["Problem", "When one PDF changes, many RAG systems re-embed and re-index everything. That is slow, costly and can cause downtime."],
      ["Idea", "Check if the file already exists. If it does, delete only its old vectors in one call and add the new ones in one bulk call."],
      ["Result", "84.9% faster updates, 99.6% fewer database calls, about 40% less memory, and the same answer quality."],
      ["Tested on", "50 PDFs of 5 to 150 pages, about 12,500 chunks"],
      ["Tech", "AWS S3, OpenSearch (kNN, HNSW), Bedrock Titan Embeddings, Claude 3 Haiku, Streamlit, Python"],
    ],
    abstract: [
      "A quick S3 existence check (one HEAD request) decides: replace an old document or add a new one",
      "Old chunks are removed with a single delete-by-query instead of hundreds of deletes",
      "New chunks are embedded in batches and written with one bulk insert",
      "The rest of the index is never touched, so users can keep asking questions during an update",
      "S3 versioning keeps every old copy, so any update can be rolled back",
    ],
    flow: [
      ["Upload PDF", "Streamlit UI"],
      ["Exists in S3?", "one HEAD request"],
      ["Delete old", "1 delete-by-query"],
      ["Extract + chunk", "1000 chars, 200 overlap"],
      ["Embed", "Titan, 1536-dim, batched"],
      ["Bulk insert", "1 call to OpenSearch"],
    ],
    diagram: selectiveRagDiagram,
    tables: [
      {
        title: "Time to update one document",
        head: ["Pages", "Full re-index", "Selective update"],
        rows: [
          ["10", "45.2 s", "6.8 s"],
          ["50", "203.7 s", "31.2 s"],
          ["100", "412.5 s", "62.1 s"],
          ["150", "625.8 s", "94.3 s"],
        ],
      },
      {
        title: "Database work per update (250-chunk document)",
        head: ["Operation", "Before", "After"],
        rows: [
          ["Delete calls", "250", "1"],
          ["Insert calls", "250", "1"],
          ["Network requests", "500", "2"],
        ],
      },
      {
        title: "Against other update methods (100 pages, 5% edited)",
        head: ["Method", "Time", "Faster than full re-index"],
        rows: [
          ["Selective update (this paper)", "62.1 s", "84.9%"],
          ["Hash-based incremental indexing", "98.4 s", "76.1%"],
          ["Line-diff selective update", "156.7 s", "62.0%"],
        ],
      },
    ],
    details: [
      "Answer quality is unchanged: Recall@5 0.87 and Precision@5 0.82 before and after",
      "Average query time 1.24 s before, 1.22 s after",
      "With 75% of the document edited, hash-based indexing falls to a 31.2% gain; this method stays at 84.9%",
      "Memory use drops by 40-42% during updates",
      "Result is statistically strong: t(49) = 28.73, p < 0.001, 95% CI 83.7% to 86.1%",
      "Three tiers: Streamlit front end, Python processing layer, AWS storage and AI services",
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
    tags: ["Deep Learning", "Ensemble Learning", "Computer Vision", "Healthcare AI", "Medical Imaging"],
    link: "https://ieeexplore.ieee.org/document/11495855",
    metaDescription:
      "IEEE paper by Navyansh Kothari: an ensemble of RegNet, MobileNetV2 and ResNeXt reaches 92.56% accuracy and 96.12% sensitivity diagnosing ear infections from otoscope images.",
    facts: [
      ["Problem", "Ear infections (otitis media) are common in children, but reading otoscope images is subjective and often wrong."],
      ["Idea", "Combine four different CNNs and add patient details (age, symptoms, history) to the image."],
      ["Result", "92.56% accuracy and 96.12% sensitivity, better than every single model and classic benchmarks."],
      ["Clinical check", "200 held-out cases compared with ENT specialists: strong agreement (κ = 0.85)"],
      ["Tech", "PyTorch, RegNet-X 16GF and 3.2GF, MobileNetV2, ResNeXt50 32×4d, AdamW"],
    ],
    abstract: [
      "Each model brings a different strength: fine texture (RegNet 16GF), efficiency (RegNet 3.2GF), speed (MobileNetV2), subtle patterns (ResNeXt)",
      "Their predictions are merged with learned weights tuned on validation data",
      "Patient metadata is encoded next to the image, the way a doctor uses both",
      "Earwax wrongly called an infection dropped from 12.8% to 4.2%, which avoids needless antibiotics",
      "Runs on a normal clinic PC: 2.1 GB memory, about 180 images a minute",
    ],
    flow: [
      ["Otoscope image", "+ patient details"],
      ["Preprocess", "224×224, augment"],
      ["4 CNNs", "run in parallel"],
      ["Weighted vote", "learned weights"],
      ["Diagnosis", "acute, chronic or normal"],
    ],
    diagram: otitisDiagram,
    tables: [
      {
        title: "Each model vs the ensemble",
        head: ["Model", "Accuracy", "Precision", "Recall", "F1"],
        rows: [
          ["Ensemble (this paper)", "92.56%", "90.3%", "90.1%", "90.2%"],
          ["ResNeXt50 32×4d", "91.5%", "89.6%", "89.4%", "89.5%"],
          ["RegNet-X 16GF", "90.8%", "89.0%", "88.7%", "88.9%"],
          ["MobileNetV2", "89.2%", "88.1%", "87.8%", "88.0%"],
        ],
      },
      {
        title: "Against well-known benchmarks",
        head: ["Model", "Accuracy", "Sensitivity", "Specificity"],
        rows: [
          ["Ensemble (this paper)", "92.56%", "96.12%", "87.78%"],
          ["ResNet-50", "88-91%", "89.2%", "85.1%"],
          ["DenseNet-121", "84-92%", "90.1%", "83.7%"],
          ["VGG16", "88-90%", "87.9%", "84.2%"],
          ["Inception V3", "85-90%", "88.5%", "82.3%"],
        ],
      },
    ],
    details: [
      "Acute vs chronic otitis media separated at 93% and 91% accuracy",
      "Missed urgent cases cut to 3.1%",
      "Training: ImageNet weights, AdamW (lr 0.001, weight decay 0.01), cosine schedule, label smoothing 0.1, dropout 0.3",
      "Augmentation: ±15° rotation, flips, ±20% brightness, ±15% contrast, 0.8-1.2× zoom",
      "Gains over single models are statistically significant (p < 0.001)",
      "MobileNetV2 alone takes about 15 ms per image",
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
    tags: ["Deep Learning", "EfficientNet", "Computer Vision", "Healthcare AI", "Edge AI"],
    doi: "10.1109/ESIC68176.2026.11495823",
    link: "https://ieeexplore.ieee.org/document/11495823",
    metaDescription:
      "IEEE paper by Navyansh Kothari: EfficientNet-B0 grades diabetic retinopathy (0-4) on the Indian IDRiD dataset at 84.2% accuracy, in a 20 MB model for low-end devices.",
    facts: [
      ["Problem", "Diabetic retinopathy is a top cause of preventable blindness, and many places lack eye specialists or costly equipment."],
      ["Idea", "Use EfficientNet-B0, a small but accurate CNN, to grade eye scans from 0 (healthy) to 4 (severe)."],
      ["Result", "84.2% test accuracy across all 5 stages, with only 5.3M parameters and 20 ms per image."],
      ["Data", "IDRiD, the first Indian-population retina dataset, with lesion-level labels"],
      ["Tech", "TensorFlow 2.8, Python 3.8, EfficientNet-B0 (ImageNet weights), Adam"],
    ],
    abstract: [
      "The whole model is about 20 MB, so it fits on phones and edge devices",
      "Runs with just 4 GB RAM and 2 GB storage",
      "Blurry and dark scans are removed first; the rest are resized to 224×224 and contrast-normalised",
      "Fewest parameters and fastest inference of the compared models",
      "Next step: a portable retina camera with the model built in, for remote areas",
    ],
    flow: [
      ["Retina scan", "IDRiD"],
      ["Clean", "drop blurry and dark"],
      ["Preprocess", "224×224, normalise, augment"],
      ["EfficientNet-B0", "transfer learning"],
      ["Grade 0-4", "no DR to proliferative"],
    ],
    diagram: efficientnetDiagram,
    tables: [
      {
        title: "Size and speed vs other published models",
        head: ["Model", "Accuracy", "Parameters", "Inference"],
        rows: [
          ["EfficientNet-B0 (this paper)", "84.7%", "5.3 M", "20 ms"],
          ["Hybrid-Net", "88.0%", "15.7 M", "35 ms"],
          ["EfficientNet (custom)", "91.8%", "11.5 M", "28 ms"],
          ["EDR-Net", "92.8%", "9.2 M", "25 ms"],
          ["U-Net + Inception", "90%", "10.3 M", "40 ms"],
        ],
      },
      {
        title: "The five grades",
        head: ["Grade", "Meaning"],
        rows: [
          ["0", "No retinopathy"],
          ["1", "Mild"],
          ["2", "Moderate"],
          ["3", "Severe"],
          ["4", "Proliferative (new abnormal vessels)"],
        ],
      },
    ],
    details: [
      "Other models report higher accuracy on different datasets, but need 2-3× the parameters",
      "Training: batch 32, Adam at 0.001, up to 100 epochs, early stopping after 10",
      "Learning rate halves after 5 flat epochs (ReduceLROnPlateau, floor 1e-7)",
      "Augmentation: 15° rotation, horizontal flip, 0.1 zoom, 0.2 brightness",
      "Evaluated with accuracy, precision, recall, F1, AUC and a confusion matrix",
      "EfficientNet scales depth, width and image size together, which keeps it small",
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
    tags: ["Cybersecurity", "Insider Threat", "Steganography", "Data Leak Prevention", "Flutter"],
    doi: "10.1109/ESIC60604.2024.10481615",
    link: "https://ieeexplore.ieee.org/document/10481615",
    metaDescription:
      "IEEE paper by Navyansh Kothari: a Flutter tool that hides a network check inside a file, so the file opens on the office network and erases itself anywhere else.",
    facts: [
      ["Problem", "Insiders already have access, so they can copy sensitive files out of the company."],
      ["Idea", "Bundle every protected file with a hidden check. The file opens only on approved networks."],
      ["Result", "On the office network the file opens normally. On any other network its contents are erased."],
      ["Built", "A Windows app in Flutter and Dart that generates the protected file"],
      ["Tech", "Flutter, Dart, Python, PyInstaller, self-extracting archive (steganography)"],
    ],
    abstract: [
      "Enter the allowed network IPs and pick the file to protect in the app",
      "The app writes those IPs and the file path into a Python checker script",
      "The script is turned into a standalone .exe, so the target PC needs nothing installed",
      "The .exe and the file are packed into one self-extracting file that runs the check first",
      "Works for remote staff too, as long as they connect through the company VPN",
    ],
    flow: [
      ["Enter allowed IPs", "Flutter app"],
      ["Pick file", "path saved in script"],
      ["Build .exe", "PyInstaller"],
      ["Hide in file", "self-extracting archive"],
      ["Opened", "IP allowed? open : erase"],
    ],
    diagram: insiderDiagram,
    tables: [
      {
        title: "What happens when the file is opened",
        head: ["Where it is opened", "Result"],
        rows: [
          ["Office network", "Opens normally"],
          ["Company VPN (remote staff)", "Opens normally"],
          ["Any other network", "Contents erased"],
        ],
      },
    ],
    details: [
      "The paper also covers the wider plan: behaviour analytics, anomaly detection, access reviews, security culture and training",
      "Steganography here means hiding the checker inside the file you share",
      "Next steps: build the packing step into the app, and alert the security team on a blocked open",
    ],
  },
];

export const getPaper = (slug) => papers.find((p) => p.slug === slug);
