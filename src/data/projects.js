import project1 from "../assets/projects/project1.png";
import project2 from "../assets/projects/project2.png";
import project4 from "../assets/projects/project4.png";
import project5 from "../assets/projects/project5.png";
import portfolioimg from "../assets/projects/portfolio.png";
import mcqQuizImg from "../assets/projects/mcq-quiz.png";
import nextformsImg from "../assets/projects/nextforms.png";
import fmcg from "../assets/projects/fmcg.png";
import bfsi from "../assets/projects/bfsi.png";
import billsonicImg from "../assets/projects/billsonic.png";
import vedicflowImg from "../assets/projects/vedicflow.jpg";
import maskerImg from "../assets/projects/masker.jpg";
import geoscoutImg from "../assets/projects/geoscout.jpg";
import guardnoteImg from "../assets/projects/guardnote.jpg";
import mlClassifierImg from "../assets/projects/ml-classifier.jpg";
import cctvIqImg from "../assets/projects/cctv-iq.jpg";
import btlImg from "../assets/projects/btl-optimization.jpg";
import cricketPlayablesImg from "../assets/projects/cricket-playables.jpg";

import geoscoutDiagram from "../assets/diagrams/geoscout-iq.svg";
import cctvIqDiagram from "../assets/diagrams/cctv-iq.svg";
import maskerDiagram from "../assets/diagrams/masker-pii-redaction.svg";
import btlDiagram from "../assets/diagrams/btl-optimization.svg";

// Projects. `slug` becomes the URL: /projects/<slug>/
// `gist` (optional) is a few one-line highlights shown as "At a glance" on the project page.
// `diagram` (optional) is an architecture diagram shown on the project page.
// `type` picks the schema.org type: MobileApplication | WebApplication | SoftwareSourceCode | CreativeWork
export const projects = [
    {
        slug: "geoscout-iq",
        kind: "location intelligence web app",
        img: geoscoutImg,
        title: "GeoScout IQ - Location Decision Intelligence",
        type: "WebApplication",
        stack: ["Google Maps", "H3 hex grid", "Gemini", "Firebase"],
        metaDescription:
            "GeoScout IQ recommends where banks should open ATMs or branches and where retailers should open stores in India, using maps, web data and Gemini agents.",
        description:
            "Type any Indian location, pick an industry and a company, and in about 30 seconds GeoScout IQ scores the neighbourhood on a colour-coded H3 hex heatmap. It maps competitors and your own locations, checks what is nearby (metro, malls, schools, highways), pulls property listings, and writes an executive summary with a GO / CAUTION / AVOID recommendation. Built for BFSI and FMCG site selection with Google Maps, multi-source web data and Gemini grounding agents.",
        gist: [
            "Recommends where to open ATMs, branches, stores and warehouses anywhere in India",
            "Scores ~0.7 sq km H3 hex tiles on demand, open space, access and growth",
            "Blends Google Places, WorldPop, NASA night lights, OpenStreetMap and property data",
            "Gemini grounding agents write a GO / CAUTION / AVOID executive summary in about 30 seconds",
        ],
        diagram: geoscoutDiagram,
        links: {
            site: "https://toursensi-ganit-71c77.web.app",
            github: "https://github.com/navyansh1/TourSensi-Scout-ganit",
        },
    },
    {
        slug: "cctv-iq-face-attendance",
        kind: "computer vision system",
        img: cctvIqImg,
        title: "CCTV IQ - Face ID Attendance",
        type: "SoftwareApplication",
        stack: ["Python", "InsightFace", "OpenVINO", "ONNX Runtime"],
        metaDescription:
            "CCTV IQ recognises enrolled people on office CCTV and logs arrivals. Moving both face models to the Intel iGPU cut processing from 9.86 to 0.31 s per frame.",
        description:
            "A face-recognition attendance system that identifies enrolled people on existing office CCTV and logs their arrivals, built with accuracy as the priority. Faces are detected with SCRFD and embedded with antelopev2, both running on the Intel integrated GPU through OpenVINO, then matched against a 182-person gallery. A match is only accepted when it clearly beats the runner-up, and arrivals are debounced on absence rather than a timer, so the register does not log wrong names or duplicates. Measured over 17,842 real sightings, face size turned out to decide accuracy far more than the model: four recognition models tied within noise, while faces 32-48 px between the eyes were identified twice as often as faces at 20-32 px.",
        gist: [
            "Identifies enrolled people on existing office CCTV and writes a daily attendance register",
            "9.86 → 0.31 s per frame by moving detection and recognition to the idle Intel iGPU with OpenVINO",
            "Refuses a match when the runner-up is too close, so it never logs a confident wrong name",
            "Benchmarked 4 face-recognition models on 17,842 real sightings: camera placement mattered more than the model",
        ],
        diagram: cctvIqDiagram,
        links: {},
    },
    {
        slug: "masker-pii-redaction",
        kind: "AI web app",
        img: maskerImg,
        title: "Masker - PII Redaction for Medical Documents",
        type: "WebApplication",
        stack: ["Google Vision OCR", "Gemini 2.5 Flash-Lite", "Firebase"],
        metaDescription:
            "Masker blacks out personal and health information in medical images and PDFs, using Google Vision OCR for exact boxes and Gemini to decide what is PII.",
        description:
            "Upload a medical image or PDF and Masker finds every piece of personal information on every page and blacks it out: names, addresses, phone numbers, dates of birth, patient IDs, Aadhaar and insurance numbers. Google Vision OCR gives the exact pixel box of every word, and Gemini 2.5 Flash-Lite reads the word list and decides which words are PII, so the redaction is pixel-accurate every time. Returns the file in the same format it received. Deployed on Firebase Hosting and Cloud Functions.",
        gist: [
            "Redacts names, IDs, phone numbers, addresses and other PII from medical images and PDFs",
            "Google Vision OCR owns the pixel geometry, Gemini only decides which words are PII",
            "Pixel-accurate every run, because LLM bounding boxes are never used",
            "Returns the same format it received, on Firebase Hosting and Cloud Functions",
        ],
        diagram: maskerDiagram,
        links: {
            site: "https://masker-ganit.web.app",
            github: "https://github.com/navyansh1/PII-Masker-Ganit",
        },
    },
    {
        slug: "btl-spend-optimization",
        kind: "marketing mix modelling pipeline",
        img: btlImg,
        title: "BTL Spend Optimization",
        type: "SoftwareApplication",
        stack: ["Python", "pandas", "DTW clustering", "SHAP", "Streamlit"],
        metaDescription:
            "An ML pipeline for an FMCG company that measures how below-the-line trade spend drives sales and simulates the P&L impact of changing it, per state, pack and channel.",
        description:
            "A modelling pipeline for an FMCG company that measures how below-the-line (BTL) trade spend drives sales, and what happens to sales and P&L if it changes. Separate per-product notebooks were rebuilt as one config-driven, local-pandas pipeline: a data merge that adds weather and festival features, dynamic time warping clustering of State × Pack × Channel segments, per-cluster ML models explained with SHAP, and BTL elasticity and saturation curves. The results feed two Streamlit dashboards, including a simulator where you type a BTL % per segment and see sales and P&L recompute live, deployed on Hugging Face Spaces with the data kept in a private repo.",
        gist: [
            "Measures where below-the-line trade spend actually lifts sales, per state, pack and channel",
            "Rebuilt per-product notebooks into one config-driven pandas pipeline that runs for any product",
            "DTW clustering + per-cluster ML models with SHAP, then elasticity and saturation curves",
            "Streamlit simulator: change BTL % per segment and see sales and P&L recompute live",
        ],
        diagram: btlDiagram,
        links: {},
    },
    {
        slug: "vedicflow",
        kind: "mobile app (iOS and Android)",
        img: vedicflowImg,
        title: "VedicFlow - Hindu Calendar & Panchang",
        type: "MobileApplication",
        platforms: ["iOS", "Android"],
        stack: [],
        metaDescription:
            "VedicFlow is an offline Hindu calendar and Panchang app for iOS and Android with Tithi, Choghadiya, Rahu Kaal, muhurat and Kundli matching, computed on-device.",
        description:
            "A Hindu calendar and Panchang app that computes Vedic timekeeping on-device from your GPS location — no syndicated content. Features daily Tithi, Nakshatra, Yoga, Karana and Vaara, hour-by-hour Choghadiya derived from local sunrise and sunset, Rahu Kaal alerts, muhurat guidance, Kundli matching, and a 108-bead Naam Jaap mala with haptics. Works offline and ships on both iOS and Android.",
        links: {
            site: "https://www.vedicflow.co.in/",
            ios: "https://apps.apple.com/in/app/vedic-flow-hindu-calendar-2026/id6760628104",
            android: "https://play.google.com/store/apps/details?id=com.vedicflow.app",
        },
    },
    {
        slug: "bill-sonic",
        kind: "mobile point-of-sale app",
        img: billsonicImg,
        title: "Bill Sonic - Mobile POS App",
        type: "MobileApplication",
        stack: ["React Native", "Firebase"],
        metaDescription:
            "Bill Sonic is a React Native and Firebase point-of-sale app with barcode scanning, GST-compliant PDF billing, inventory tracking, analytics and cloud sync.",
        description:
            "A smart, full-featured Point of Sale (POS) mobile app for modern retailers. Features barcode scanning, GST-compliant PDF billing, bulk product import from Excel/CSV, real-time inventory tracking, sales analytics, Admin/Cashier role management with PIN auth, and cloud sync. Built with React Native & Firebase.",
        links: {
            site: "https://billsonic.vercel.app/",
        },
    },
    {
        slug: "fmcg-demand-forecasting",
        kind: "data science case study",
        img: fmcg,
        title: "Demand Forecasting Analysis",
        type: "CreativeWork",
        stack: ["Python", "Time-series models", "Machine learning"],
        metaDescription:
            "FMCG demand forecasting project: seasonality and sales-pattern analysis, statistical and machine learning models, and forecasts turned into business decisions.",
        description:
            "A comprehensive FMCG demand forecasting project that analyzes seasonality and sales patterns, applies statistical and machine learning models, and converts accurate forecasts into actionable business decisions.",
        links: {
            site: "https://navyansh1.github.io/ML_Demand_Forecasting_FMCG/",
        },
    },
    {
        slug: "credit-card-fraud-detection-bfsi",
        kind: "machine learning case study",
        img: bfsi,
        title: "Credit Card Modelling - BFSI Domain",
        type: "CreativeWork",
        stack: ["Python", "Machine learning"],
        metaDescription:
            "BFSI credit card fraud detection: analyses transaction patterns, handles heavily imbalanced data and builds interpretable models to flag fraudulent activity.",
        description:
            "A machine learning–based fraud detection system for the BFSI domain that analyzes transaction patterns, handles highly imbalanced data, and builds interpretable predictive models to identify fraudulent activities.",
        links: {
            site: "https://navyansh1.github.io/ML_Fraud_Detection_BFSI/",
        },
    },
    {
        slug: "nextforms",
        kind: "web app",
        img: nextformsImg,
        title: "NextForms",
        type: "WebApplication",
        stack: [],
        metaDescription:
            "NextForms is a fully customizable alternative to Google Forms with seamless response tracking and advanced email notifications.",
        description:
            "A fully customizable alternative to Google Forms with seamless response tracking and advanced email notifications.",
        links: {
            site: "https://nextforms.in",
        },
    },
    {
        slug: "cricket-playable-ads",
        kind: "set of HTML5 playable ads",
        img: cricketPlayablesImg,
        title: "Cricket Playable Ads",
        type: "CreativeWork",
        stack: ["HTML5 Canvas", "JavaScript"],
        metaDescription:
            "Cricket-themed HTML5 playable ads built at Hitwicket for Unity Ads, AppLovin and Google Ads, with 7M+ impressions and 40K+ installs.",
        description:
            "Interactive cricket-themed HTML5 playable ads built at Hitwicket: PvP matches, team building, a timed Australia vs England challenge and a special-powers mode. Optimized for fast loading and mobile touch controls and compliant with Unity Ads, AppLovin and Google Ads. The campaigns delivered 7M+ impressions and 40K+ installs.",
        links: {
            site: "https://navyansh1.github.io/playable-portfolio/",
            github: "https://github.com/navyansh1/playable-portfolio",
        },
    },
    {
        slug: "guardnote",
        kind: "privacy-first web app",
        img: guardnoteImg,
        title: "GuardNote - Private Digital Notebook",
        type: "WebApplication",
        stack: ["JavaScript", "GitHub Gists"],
        metaDescription:
            "GuardNote is a privacy-first digital notebook that runs in the browser, with drawing tools, PDF export and optional sync through your own private GitHub Gists.",
        description:
            "A secure digital notebook that runs entirely in the browser. Notes are saved locally by default, and optional cloud sync uses your own private GitHub Gists, so data never touches a third-party server. Includes pen and eraser tools, unlimited notebooks and pages, plain, ruled or grid paper, and PDF export, with no tracking.",
        links: {
            site: "https://guardnote.vercel.app",
            github: "https://github.com/navyansh1/writing-pad",
        },
    },
    {
        slug: "ml-classification-web-app",
        kind: "browser-based machine learning tool",
        img: mlClassifierImg,
        title: "ML Classification Web App",
        type: "WebApplication",
        stack: ["JavaScript", "ml.js", "Papa Parse"],
        metaDescription:
            "A browser-based ML tool: upload a CSV, clean missing values, and compare Logistic Regression, KNN, Decision Tree, Random Forest and Naive Bayes accuracy.",
        description:
            "Upload a CSV and train classifiers entirely in the browser. The app cleans missing values (interpolation for numbers, mode for categories), lets you pick features and a target, and compares Logistic Regression, K-Nearest Neighbors, Decision Tree, Random Forest and Naive Bayes on a chart. No server required.",
        links: {
            github: "https://github.com/navyansh1/Classification-Web-ML",
        },
    },
    {
        slug: "tictactoe-ios-app",
        kind: "iOS game app",
        img: project1,
        title: "TicTacToe iOS App",
        type: "SoftwareSourceCode",
        platforms: ["iOS"],
        stack: ["SwiftUI", "UIKit"],
        metaDescription:
            "A TicTacToe iOS game app built with SwiftUI and UIKit, with source code on GitHub.",
        description:
            "An iOS game app using SwiftUI and UIKit for a fun, interactive experience.",
        links: {
            github: "https://github.com/navyansh1/TickTacToe",
        },
    },
    {
        slug: "blockchain-lottery-dapp",
        kind: "blockchain dApp",
        img: project2,
        title: "Blockchain Lottery dApp",
        type: "CreativeWork",
        stack: ["Solidity", "React"],
        metaDescription:
            "A decentralized lottery system built with Solidity smart contracts and a React front end, leveraging blockchain technology.",
        description:
            "A decentralized lottery system built with Solidity and React, leveraging blockchain technology.",
        links: {
            site: "https://drive.google.com/file/d/1mwgChln8-jExcFmfVdADh5mv4pUMKU9W/view",
        },
    },
    {
        slug: "mcq-quiz-generator-ai",
        kind: "AI-powered web app",
        img: mcqQuizImg,
        title: "MCQ Quiz Generator using AI",
        type: "WebApplication",
        stack: ["Gemini Pro 1.5"],
        metaDescription:
            "An AI quiz generator that uses Gemini Pro 1.5 to read PDFs and text files and turn them into multiple-choice quizzes.",
        description:
            "An intelligent quiz generator that uses Gemini Pro 1.5 to access PDFs, text files, etc., and create MCQ quizzes.",
        links: {
            site: "https://mcqgen.vercel.app/",
        },
    },
    {
        slug: "instasnap-ui-redesign",
        kind: "UI/UX design concept",
        img: project4,
        title: "InstaSnap UI Redesign",
        type: "CreativeWork",
        stack: ["Figma"],
        metaDescription:
            "InstaSnap: a refined Instagram UI/UX concept designed in Figma for a sleek, user-friendly social media experience.",
        description:
            "A refined Instagram UI concept designed in Figma for a sleek and user-friendly experience.",
        links: {
            site: "https://www.figma.com/design/4GnyQrrTZ7yhLqAFTm9Mmi/Social-Media-App-UI-UX-Project",
        },
    },
    {
        slug: "playing-cards-ios-app",
        kind: "iOS card game app",
        img: project5,
        title: "Playing Cards iOS App",
        type: "SoftwareSourceCode",
        platforms: ["iOS"],
        stack: ["SwiftUI", "UIKit", "Figma"],
        metaDescription:
            "A playing cards iOS app built with SwiftUI, UIKit and Figma that brings card games to your fingertips. Source on GitHub.",
        description:
            "An iOS app using SwiftUI, UIKit, and Figma that brings card games to your fingertips.",
        links: {
            github: "https://github.com/navyansh1/cards-Game",
        },
    },
    {
        slug: "portfolio-website",
        kind: "portfolio website",
        img: portfolioimg,
        title: "Portfolio Website",
        type: "SoftwareSourceCode",
        stack: ["React", "Tailwind CSS", "Framer Motion"],
        metaDescription:
            "The source of this portfolio website, built with React, Tailwind CSS and Framer Motion and pre-rendered for search engines.",
        description:
            "A portfolio built using React, Tailwind CSS, and Framer Motion to showcase my projects and skills.",
        links: {
            github: "https://github.com/navyansh1/NavyGeeks-Website",
        },
    },
];

export const getProject = (slug) => projects.find((p) => p.slug === slug);
