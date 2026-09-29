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

// Projects. `slug` becomes the URL: /projects/<slug>/
// `type` picks the schema.org type: MobileApplication | WebApplication | SoftwareSourceCode | CreativeWork
export const projects = [
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
