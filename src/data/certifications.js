import project1 from "../assets/certifications/certi1.png";
import project2 from "../assets/certifications/certi2.png";
import project4 from "../assets/certifications/certi3.png";
import project6 from "../assets/certifications/python-crash-course.png";
import iitKanpurImg from "../assets/experience/iit_kanpur.png";
import awsAiPractitioner from "../assets/certifications/aws_ai_practitioner.png";
import openaiTechnical from "../assets/certifications/openai_technical_practitioner.png";
import openaiDeployment from "../assets/certifications/openai_deployment_practitioner.png";
import openaiTechnicalPdf from "../assets/certifications/openai_technical_practitioner.pdf";
import openaiDeploymentPdf from "../assets/certifications/openai_deployment_practitioner.pdf";

// Plain-data certifications so they can be rendered in the modal, on the
// /certifications/ page, and in structured data.
export const certifications = [
  {
    img: openaiTechnical,
    title: "OpenAI Technical Practitioner",
    issuer: "OpenAI",
    issued: "Aug 2026",
    validThrough: "Aug 2027",
    links: { certificate: openaiTechnicalPdf },
  },
  {
    img: openaiDeployment,
    title: "ChatGPT Deployment Practitioner",
    issuer: "OpenAI",
    issued: "Aug 2026",
    validThrough: "Aug 2027",
    links: { certificate: openaiDeploymentPdf },
  },
  {
    img: awsAiPractitioner,
    title: "AWS Certified AI Practitioner",
    issuer: "Amazon Web Services",
    issued: "Jul 2026",
    expires: "Jul 2029",
    validation: "7eb079ec8429481f8e23157fb725c23e",
    links: { site: "https://aws.amazon.com/verification" },
  },
  {
    img: project1,
    title: "AWS Certified Cloud Practitioner",
    issuer: "Amazon Web Services",
    issued: "Dec 2023",
    links: { site: "https://cp.certmetrics.com/amazon/en/public/verify/credential/" },
  },
  {
    img: project2,
    title: "Google Cloud Computing Foundations",
    issuer: "NPTEL, IIT Kharagpur",
    issued: "Sep 2023",
    list: ["Ranked in the top 5% of the course", "Offered by IIT Kharagpur"],
    links: { site: "https://archive.nptel.ac.in/noc/Ecertificate/?q=NPTEL23CS90S73340588620273725" },
  },
  {
    img: project4,
    title: "Spoken Tutorial Training",
    issuer: "IIT Bombay",
    summary: "Training in: MySQL, Python, Java, PHP by IIT Bombay",
    links: { site: "https://drive.google.com/drive/folders/1wyXBEZ--NbDvgRyYy-vmbBPdL3ewjTiN?usp=sharing" },
  },
  {
    img: project6,
    title: "Crash Course on Python",
    issuer: "Google, on Coursera",
    summary: "Data Science course by Google on Coursera",
    links: {
      site: "https://www.coursera.org/account/accomplishments/verify/Y9KAPCPSKXXA?utm_source=ln&utm_medium=certificate&utm_content=cert_image&utm_campaign=sharing_cta&utm_product=course",
    },
  },
  {
    img: iitKanpurImg,
    title: "NPTEL Certification - IIT Kanpur",
    issuer: "NPTEL, IIT Kanpur",
    listTitle: "Courses:",
    list: ["Forest and its Management - Scored 97%", "Wildlife Ecology - Scored 100%"],
    links: { site: "https://drive.google.com/drive/folders/1H-yG8Td1Qk_Tcxfgqa4XV4WyXCRiIDc1?usp=sharing" },
  },
];
