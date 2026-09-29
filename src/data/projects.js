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
import cctvIqImg from "../assets/projects/cctv-iq.jpg";
import discountImg from "../assets/projects/discount-optimization.jpg";
import ocrImg from "../assets/projects/ocr-benchmark.jpg";
import referoImg from "../assets/projects/refero.jpg";
import quickCommerceImg from "../assets/projects/quick-commerce.jpg";
import multiOwnerImg from "../assets/projects/multi-owner-shop.jpg";
import promptHubImg from "../assets/projects/prompt-hub.jpg";
import shopInventoryImg from "../assets/projects/kothari-electric.jpg";
import cricketPlayablesImg from "../assets/projects/cricket-playables.jpg";

import geoscoutDiagram from "../assets/diagrams/geoscout-iq.svg";
import cctvIqDiagram from "../assets/diagrams/cctv-iq.svg";
import maskerDiagram from "../assets/diagrams/masker-pii-redaction.svg";
import discountDiagram from "../assets/diagrams/discount-optimization.svg";
import ocrDiagram from "../assets/diagrams/ocr-benchmark.svg";

/*
 * Projects. Each one gets its own page at /projects/<slug>/.
 *
 * featured    shown in the main grid; the rest sit in a collapsed "More projects" list
 * isPrivate   code is in a private repo: no GitHub link, the page says so
 * summary     one line, shown as the first row of the "At a glance" table
 * repoName    optional repository name to mention (never linked)
 * flow        [step, note] pairs drawn as a flowchart
 * facts       [label, value] rows for the "At a glance" table
 * highlights  "Key points" bullets
 * tables      optional result tables ({ title, head, rows })
 * details     optional bullets inside the collapsed "Technical details" section
 * diagram     optional architecture diagram
 * tags        keywords: shown as chips and used for meta keywords / structured data
 * type        schema.org type: MobileApplication | WebApplication | SoftwareApplication | SoftwareSourceCode | CreativeWork
 */
export const projects = [
    // ---------------------------------------------------------------- featured
    {
        slug: "geoscout-iq",
        featured: true,
        kind: "location intelligence web app",
        img: geoscoutImg,
        title: "GeoScout IQ - Location Decision Intelligence",
        type: "WebApplication",
        stack: ["Google Maps", "H3", "Gemini", "Firebase"],
        metaDescription:
            "GeoScout IQ recommends where banks should open ATMs or branches and where retailers should open stores in India, using maps, web data and Gemini agents.",
        summary: "A location intelligence tool that tells banks and retailers where in India to open their next ATM, branch, store or warehouse.",
        facts: [
            ["Problem", "Picking a new site means checking footfall, competitors, rent and access by hand, one area at a time."],
            ["What it does", "Type a location, pick an industry and company, and get a scored map with a GO / CAUTION / AVOID call in about 30 seconds."],
            ["How it works", "The area is split into small hexagon tiles. Each tile is scored on demand, open space, access and growth, and Gemini writes the summary."],
            ["Built for", "Banks (ATMs, branches) and FMCG companies (stores, warehouses)"],
            ["Tech", "Google Maps Platform, H3 hex grid, Gemini, Firebase Hosting, Cloud Functions, Firestore"],
        ],
        highlights: [
            "Colour-coded hex heatmap: strong tiles stand out, weak ones fade",
            "Competitor pins with brand names, plus your own existing locations",
            "Knows what is nearby for each tile, like \"320 m from a metro\", and picks the amenities by use case",
            "Real property listings for sale at each tile",
            "Executive summary with a star rating and GO / CAUTION / AVOID",
        ],
        tables: [
            {
                title: "Data it uses",
                head: ["Source", "What it adds", "How fresh"],
                rows: [
                    ["Google Places", "Competitor stores, ratings, closures", "Live"],
                    ["WorldPop", "Population around the site (drives demand)", "Yearly"],
                    ["NASA night lights", "How busy an area is at night, and if it is growing", "Monthly"],
                    ["OpenStreetMap", "Malls, schools, transit, parking, land you cannot build on", "Live"],
                    ["Property listings", "Rent and property rates for payback", "Live"],
                    ["Google Search", "Upcoming metro, roads and projects, with sources", "Live"],
                ],
            },
        ],
        details: [
            "Each hex is about 0.7 sq km; the same input always gives the same score, and the maths is visible",
            "Nearby amenities change by use case: ATMs look at footfall and transit, warehouses at ports, railheads and highways, groceries at schools and housing",
            "Gemini grounding agents add the written narrative on top of the scores",
            "Google Elevation stops the map from suggesting a site on water",
        ],
        diagram: geoscoutDiagram,
        flow: [
            ["Pick a place", "location, industry, company"],
            ["Pull data", "places, population, night lights, maps, rents"],
            ["Score hex tiles", "~0.7 sq km each"],
            ["Gemini writes", "context and summary"],
            ["Answer", "heatmap + GO / CAUTION / AVOID"],
        ],
        tags: ["location intelligence", "site selection", "geospatial analytics", "H3 hexagons", "Google Maps API", "Gemini", "retail expansion", "ATM placement", "BFSI", "FMCG"],
        links: {
            site: "https://toursensi-ganit-71c77.web.app",
            github: "https://github.com/navyansh1/TourSensi-Scout-ganit",
        },
    },
    {
        slug: "cctv-iq-face-attendance",
        featured: true,
        isPrivate: true,
        kind: "computer vision system",
        img: cctvIqImg,
        title: "CCTV IQ - Face ID Attendance",
        type: "SoftwareApplication",
        stack: ["Python", "InsightFace", "OpenVINO", "ONNX Runtime"],
        metaDescription:
            "CCTV IQ recognises enrolled people on office CCTV and logs arrivals. Moving both face models to the Intel iGPU cut processing from 9.86 to 0.31 s per frame.",
        summary: "A face-recognition attendance system that runs on an office's existing CCTV cameras and logs who arrived and when.",
        facts: [
            ["Problem", "Track office arrivals automatically, using the cameras that are already on the wall."],
            ["What it does", "Recognises enrolled people in the live feed, logs each arrival once, and writes a daily attendance register with a live dashboard."],
            ["How it works", "Detect faces, turn each face into an embedding, compare it with a gallery of 182 people, and accept a name only when it clearly beats the runner-up."],
            ["Result", "0.31 s per frame, down from 9.86 s, on an ordinary laptop. A verified test run logged 3 arrivals, all correct, with no false positives."],
            ["Tech", "Python, InsightFace (SCRFD + antelopev2), OpenVINO on the Intel iGPU, ONNX Runtime, RTSP"],
        ],
        highlights: [
            "Both face models run on the laptop's idle Intel graphics chip: about 30× faster, same scores",
            "Refuses a name when two people look too alike, because a wrong name on an attendance record is worse than none",
            "Counts an arrival only after someone has been away, so one person is never logged twice",
            "Ignore zones mask desks so the same seated people are not re-scanned all day (2-3× faster)",
        ],
        tables: [
            {
                title: "Speed: where the models run",
                head: ["Setup", "Seconds per frame"],
                rows: [
                    ["Both models on CPU", "9.86"],
                    ["Recogniser on iGPU, detector on CPU", "0.69"],
                    ["Both on iGPU", "0.31"],
                ],
            },
            {
                title: "Accuracy: face size matters most (17,842 real sightings)",
                head: ["Distance between the eyes", "Share of sightings", "Identified"],
                rows: [
                    ["0-20 px", "26%", "15.8%"],
                    ["20-32 px", "54%", "18.1%"],
                    ["32-48 px", "20%", "38.9%"],
                    ["48 px +", "0.3%", "44.4%"],
                ],
            },
        ],
        details: [
            "Compared four recognition models (antelopev2, AdaFace IR-101, buffalo_l, AuraFace): all tied within noise, so camera placement matters more than the model",
            "AdaFace was exported to ONNX just to test it (torch vs ONNX cosine 1.000000); it beat antelopev2 by only 0.009",
            "A bigger detector input found fewer usable faces, and GPU batching was slower (28 s per frame), so both were rejected",
            "Real phone photos matched about 9.5 points better than AI-edited directory photos",
            "Recognition runs in its own thread; the dashboard only reads snapshots, so closing the browser changes nothing",
            "Regression tests cover the arrival logic (9 scenarios) and the ignore-zone geometry",
        ],
        diagram: cctvIqDiagram,
        flow: [
            ["CCTV stream", "2560×1440"],
            ["Mask desks", "ignore zones"],
            ["Find faces", "SCRFD on iGPU"],
            ["Match face", "antelopev2 + margin check"],
            ["Log arrival once", "after an absence"],
            ["Register", "Excel, CSV, dashboard"],
        ],
        tags: ["computer vision", "face recognition", "CCTV analytics", "attendance system", "InsightFace", "OpenVINO", "edge AI", "Intel iGPU", "ONNX", "Python"],
        links: {},
    },
    {
        slug: "ocr-engine-benchmark",
        featured: true,
        isPrivate: true,
        repoName: "OCR_Research",
        kind: "OCR research study",
        img: ocrImg,
        title: "OCR Engine Benchmark for Indian Loan Documents",
        type: "CreativeWork",
        stack: ["Tesseract", "AWS Textract", "Qwen3-VL", "AWS Lambda"],
        metaDescription:
            "A benchmark of OCR engines on Indian education-loan documents: Tesseract on AWS Lambda matched AWS Textract at about 3% of the cost and read 4 Indian scripts.",
        summary: "A research study to choose the OCR engine for reading education-loan paperwork, measuring accuracy, Indian scripts, tables, speed and cost on real documents.",
        facts: [
            ["Question", "Build on a managed service like AWS Textract, or on open-source OCR?"],
            ["What I measured", "4 engines on 108 checked values across 11 documents, 4 Indian scripts, and table values on 12 + 30 unseen pages."],
            ["Answer for text", "Tesseract on AWS Lambda: 103/108 values vs Textract's 104/108, at ₹4.90 instead of ₹142.50 per 1,000 pages."],
            ["Answer for tables", "Tesseract + Qwen3-VL: 178/183 values on unseen pages vs Textract Tables' 163/183, at a third of the cost or less."],
            ["Trade-off", "Table pages take about 17 s instead of 6.5 s, so it suits batch work."],
            ["Tech", "Python, Tesseract 5.4, AWS Textract, RapidOCR, PaddleOCR, Qwen3-VL on Amazon Bedrock, AWS Lambda"],
        ],
        highlights: [
            "Tesseract was the only engine that read Telugu, Tamil, Devanagari and Kannada; the others returned nothing, without an error",
            "Deployed and timed on AWS Lambda (Mumbai), not estimated",
            "Self-hosting came out about 10× cheaper at every volume",
            "Erasing table lines before OCR raised word detection inside tables from 89% to 98%",
        ],
        tables: [
            {
                title: "General text: 108 values, 11 documents",
                head: ["Engine", "Values found", "Sec / page", "Indian scripts"],
                rows: [
                    ["AWS Textract", "104/108", "3.3", "None"],
                    ["Tesseract 5.4", "103/108", "1.9", "All four"],
                    ["RapidOCR", "101/108", "5.1", "None"],
                    ["PaddleOCR PP-OCRv5", "99/108", "17.7", "None"],
                ],
            },
            {
                title: "Tables: 30 unseen pages",
                head: ["Method", "Values right", "₹ per 1,000 pages"],
                rows: [
                    ["Tesseract + Qwen3-VL", "178/183", "~225-450"],
                    ["Qwen3-VL alone", "178/183", "~445"],
                    ["AWS Textract Tables", "163/183", "1,425"],
                ],
            },
        ],
        details: [
            "Setting OMP_THREAD_LIMIT=1 made Tesseract 2.5-2.9× faster on Lambda; without it Lambda was slower than a 2019 laptop",
            "Tesseract with six language packs fits in a 14 MB Lambda zip",
            "How the table hybrid works: erase lines, Tesseract finds every word and its box, Qwen3-VL reads rows and columns, then each cell is matched to its words",
            "The unseen-page answer key was written before either system ran, and those pages were not used for tuning",
            "Things that did not work: asking the model for word ids, and splitting pages into strips (slower and less accurate)",
        ],
        diagram: ocrDiagram,
        flow: [
            ["Page image", "loan document"],
            ["Clean up", "trim margins, erase table lines"],
            ["Tesseract on Lambda", "every word + its box"],
            ["Qwen3-VL", "reads tables as rows and columns"],
            ["Match", "cells to words"],
            ["Output", "text and table cells with positions"],
        ],
        tags: ["OCR", "document AI", "Tesseract", "AWS Textract", "Qwen3-VL", "Amazon Bedrock", "AWS Lambda", "Indic OCR", "table extraction", "cost optimization"],
        links: {},
    },
    {
        slug: "masker-pii-redaction",
        featured: true,
        kind: "AI web app",
        img: maskerImg,
        title: "Masker - PII Redaction for Medical Documents",
        type: "WebApplication",
        stack: ["Google Vision OCR", "Gemini 2.5 Flash-Lite", "Firebase"],
        metaDescription:
            "Masker blacks out personal and health information in medical images and PDFs, using Google Vision OCR for exact boxes and Gemini to decide what is PII.",
        summary: "Upload a medical document and Masker blacks out every piece of personal information on every page, then gives the file back.",
        facts: [
            ["Problem", "Medical reports must be shared without names, IDs or contact details, and hand redaction is slow and easy to get wrong."],
            ["What it does", "Finds personal and health information in images and PDFs and covers it with solid black boxes."],
            ["How it works", "OCR gives the exact position of every word. Gemini reads only the text and decides which words are personal data. Those boxes get blacked out."],
            ["Why this design", "AI vision models read well but their boxes drift between runs. Letting OCR own the positions makes the redaction land on the exact pixels every time."],
            ["Tech", "Google Vision OCR, Gemini 2.5 Flash-Lite, Firebase Hosting, Cloud Functions"],
        ],
        highlights: [
            "Handles JPG, PNG and multi-page PDFs",
            "Detects names, addresses, phone numbers, emails, dates of birth, patient IDs, Aadhaar / SSN, insurance numbers and signatures",
            "Returns the same format it received: PDF in, PDF out",
            "Shows the original and the redacted version side by side",
        ],
        diagram: maskerDiagram,
        flow: [
            ["Upload", "image or PDF"],
            ["Vision OCR", "exact box per word"],
            ["Gemini", "flags which words are PII"],
            ["Black out", "every flagged box"],
            ["Download", "same format as uploaded"],
        ],
        tags: ["PII redaction", "PHI", "data privacy", "healthcare AI", "document AI", "OCR", "Google Vision API", "Gemini", "Firebase"],
        links: {
            site: "https://masker-ganit.web.app",
            github: "https://github.com/navyansh1/PII-Masker-Ganit",
        },
    },
    {
        slug: "discount-spend-optimization",
        featured: true,
        isPrivate: true,
        kind: "machine learning pipeline",
        img: discountImg,
        title: "Discount Spend Optimization",
        type: "SoftwareApplication",
        stack: ["Python", "pandas", "XGBoost", "SHAP", "Streamlit"],
        metaDescription:
            "An ML pipeline for an FMCG company that shows where trade discounts lift sales and simulates the sales and P&L impact of changing them, by state, pack and channel.",
        summary: "A modelling pipeline for an FMCG company that shows where trade discounts actually lift sales, and what happens to sales and profit if they change.",
        facts: [
            ["Problem", "Discount budgets are spread across states, packs and channels, and it is hard to see which ones pay back."],
            ["What I built", "One config-driven pipeline, two dashboards, and a simulator to test discount changes before spending."],
            ["How it works", "Merge sales, discounts, retail audit, weather and festival data. Group similar segments, model each group, then draw elasticity and saturation curves."],
            ["Result", "Separate hand-edited notebooks per product became one pipeline that runs for any product by editing a config. Mature products reached 11-22% wMAPE."],
            ["Tech", "Python, pandas, DTW clustering, XGBoost, SHAP, Streamlit, Docker, Hugging Face Spaces"],
        ],
        highlights: [
            "Clusters State × Pack × Channel segments by the shape of their sales over time (dynamic time warping)",
            "Explains every cluster model with SHAP and feature importance",
            "Saturation curves show where extra discount stops paying",
            "Simulator: type a discount % per segment and watch sales and P&L recompute live",
        ],
        details: [
            "Replaced Spark and cloud-storage code with pure pandas that runs locally",
            "Added weather features (temperature, humidity, rain) and one flag per festival, and dropped an old seasonality index",
            "Each segment is filled to continuous months so gaps do not distort the models",
            "Model quality is tracked per cluster with r², MAPE and wMAPE",
            "Dashboards run in Docker on Hugging Face Spaces; the data stays in a private repository",
        ],
        diagram: discountDiagram,
        flow: [
            ["Raw data", "sales, discounts, audit, weather, festivals"],
            ["Merge", "one config per product"],
            ["Cluster", "DTW on sales shapes"],
            ["Model", "XGBoost + SHAP per cluster"],
            ["Curves", "elasticity and saturation"],
            ["Simulate", "sales and P&L what-if"],
        ],
        tags: ["discount optimization", "trade promotion", "price elasticity", "marketing mix modelling", "time series clustering", "DTW", "XGBoost", "SHAP", "Streamlit", "FMCG analytics"],
        links: {},
    },
    {
        slug: "vedicflow",
        featured: true,
        isPrivate: true,
        kind: "mobile app on the App Store and Google Play",
        img: vedicflowImg,
        title: "VedicFlow - Hindu Calendar & Panchang",
        type: "MobileApplication",
        platforms: ["iOS", "Android"],
        stack: ["React Native", "Expo", "TypeScript", "Firebase"],
        metaDescription:
            "VedicFlow is a Hindu calendar and Panchang app for iOS and Android with Tithi, Choghadiya, Rahu Kaal, muhurat and Kundli matching, computed on-device.",
        summary: "A Hindu calendar and Panchang app that works out daily timings on your phone from your location, live on the App Store and Google Play.",
        facts: [
            ["What it does", "Daily Panchang, Choghadiya, Rahu Kaal alerts, festivals, muhurat, Kundli matching, horoscope and a 108-bead mala."],
            ["How it works", "Timings are calculated on-device from GPS and local sunrise, sunset and moonrise, so it works offline."],
            ["AI features", "Ask the Stars and palm reading, powered by Gemini through Firebase (no API key inside the app)."],
            ["Languages", "English, Hindi, Gujarati, Kannada, Tamil and Telugu"],
            ["Tech", "Expo SDK 54, React Native, TypeScript, Firebase, astronomy-engine, TanStack Query, EAS updates"],
        ],
        highlights: [
            "Daily Tithi, Nakshatra, Yoga, Karana and Vaara from your own location",
            "Nine notification types you can switch on or off",
            "Shareable image cards for Panchang, Choghadiya and horoscopes",
            "Fixes ship over the air without an app store release",
        ],
        details: [
            "Sankatahara Chaturthi is worked out at moonrise, not sunrise; every 2026 date was checked against Drik Panchang",
            "Follows classical rules, for example no Abhijit Muhurta alert on Wednesdays",
            "Palm reading uses the camera with flash and zoom controls",
        ],
        flow: [
            ["Your location", "GPS"],
            ["On-device maths", "sunrise, sunset, moonrise"],
            ["Panchang", "Tithi, Choghadiya, Rahu Kaal"],
            ["Alerts", "9 types, on or off"],
            ["Share", "image cards"],
        ],
        tags: ["Hindu calendar", "Panchang app", "Choghadiya", "Rahu Kaal", "muhurat", "astrology app", "React Native", "Expo", "Firebase", "Gemini"],
        links: {
            site: "https://www.vedicflow.co.in/",
            ios: "https://apps.apple.com/in/app/vedic-flow-hindu-calendar-2026/id6760628104",
            android: "https://play.google.com/store/apps/details?id=com.vedicflow.app",
        },
    },
    {
        slug: "bill-sonic",
        featured: true,
        isPrivate: true,
        kind: "point-of-sale app",
        img: billsonicImg,
        title: "Bill Sonic - Mobile POS App",
        type: "MobileApplication",
        platforms: ["iOS", "Android", "Web"],
        stack: ["React Native", "Expo", "Firebase"],
        metaDescription:
            "Bill Sonic is a React Native and Firebase point-of-sale app with barcode scanning, GST-compliant PDF billing, inventory tracking, analytics and cloud sync.",
        summary: "A point-of-sale app for small shops: scan, bill and track stock from a phone, on Android, iOS and the web from one codebase.",
        facts: [
            ["Problem", "Small retailers need fast billing and stock tracking without a costly billing machine."],
            ["What it does", "Barcode scanning, GST-ready PDF bills, bulk product import from Excel or CSV, stock tracking and sales analytics."],
            ["Who uses it", "Shop owners (admin) and cashiers, each with their own access and a PIN"],
            ["Languages", "English, Hindi, Spanish and Portuguese"],
            ["Tech", "React Native, Expo SDK 54, Expo Router, Firebase Auth and Firestore, EAS builds"],
        ],
        highlights: [
            "Sign in with email, Google or Apple, plus a PIN lock for staff",
            "Real-time cloud sync across devices",
            "Import hundreds of products at once from a spreadsheet",
            "Works in the browser as well as on phones",
        ],
        flow: [
            ["Sign in", "email, Google, Apple + staff PIN"],
            ["Add items", "scan barcode or search"],
            ["Bill", "GST-ready PDF"],
            ["Stock updates", "synced to the cloud"],
            ["Analytics", "sales reports"],
        ],
        tags: ["POS app", "billing software", "GST invoice", "inventory management", "barcode scanner", "retail app", "React Native", "Expo", "Firebase"],
        links: {
            site: "https://billsonic.vercel.app/",
        },
    },
    {
        slug: "refero",
        featured: true,
        isPrivate: true,
        kind: "mobile app",
        img: referoImg,
        title: "Refero - Job Referral Marketplace",
        type: "MobileApplication",
        platforms: ["iOS", "Android", "Web"],
        stack: ["Expo", "TypeScript", "Firebase", "Gemini"],
        metaDescription:
            "Refero connects people who can give job referrals with candidates. Gemini parses resumes and scores each applicant, with real-time chat and push alerts.",
        summary: "A referral marketplace that connects people who can give job referrals with candidates who need one, with AI resume matching.",
        facts: [
            ["Problem", "Referrals get jobs, but finding someone willing to refer you, and sorting many requests, is hard."],
            ["What it does", "Givers post referrals, takers apply with a resume, and Gemini scores how well each applicant fits."],
            ["How it works", "Gemini parses the resume (PDF, image or Word), scores the match with a short reason, and sorts new referrals into categories to notify the right people."],
            ["Tech", "Expo SDK 54, React Native, Expo Router, TypeScript, Firebase (Auth, Firestore, Storage, Cloud Functions), Gemini on Vertex AI, Skia"],
        ],
        highlights: [
            "AI match score and summary, visible only to the person giving the referral",
            "Real-time chat with read receipts, opened automatically on approval",
            "Push notifications on iOS and Android",
            "Givers stay anonymous with usernames and generated avatars",
        ],
        details: [
            "Firestore security rules check ownership on every query, for example only a referral's giver can list its applicants",
            "Liquid, animated colour bands drawn with Skia, and native tab bars on iOS",
            "Resumes open in the system browser sheet, which works in every build",
        ],
        flow: [
            ["Giver posts", "a referral"],
            ["Gemini tags", "category, alerts matching takers"],
            ["Taker applies", "with a resume"],
            ["Gemini scores", "parse resume, match score"],
            ["Giver approves", ""],
            ["Chat opens", "real time"],
        ],
        tags: ["job referral app", "recruitment", "resume parsing", "AI matching", "Gemini", "React Native", "Expo", "Firebase", "TypeScript"],
        links: {},
    },
    {
        slug: "prompt-hub",
        featured: true,
        isPrivate: true,
        kind: "web app for teams",
        img: promptHubImg,
        title: "Prompt Hub - Version Control for AI Prompts",
        type: "WebApplication",
        stack: ["JavaScript", "Firebase", "Firestore"],
        metaDescription:
            "Prompt Hub is a web app for teams to write, version, compare and share LLM prompts, with diffs, a shared prompt library and Word export.",
        summary: "A web app where a team can write, version, compare and share the prompts they use with AI models.",
        facts: [
            ["Problem", "Prompts live in chat threads and docs, so nobody knows which version is current or what changed."],
            ["What it does", "Projects hold prompt groups, groups hold versions, and every change is saved as a new version with a comment."],
            ["Tech", "Vanilla JavaScript, Firebase Hosting, Cloud Firestore, jsdiff, docx export"],
        ],
        highlights: [
            "Major and minor versions with required change notes",
            "Side-by-side diff with synced scrolling",
            "Share projects by link, with live presence and an access log",
            "Organisation-wide prompt library with search and model badges",
        ],
        flow: [
            ["Project", ""],
            ["Prompt group", "with its source LLM"],
            ["New version", "with a change note"],
            ["Compare", "side-by-side diff"],
            ["Share or export", "link, Word file"],
        ],
        tags: ["prompt management", "prompt engineering", "LLM ops", "version control", "Firebase", "JavaScript"],
        links: {},
    },
    {
        slug: "quick-commerce-app",
        featured: true,
        isPrivate: true,
        kind: "mobile app",
        img: quickCommerceImg,
        title: "Quick Commerce Delivery App",
        type: "MobileApplication",
        platforms: ["iOS", "Android"],
        stack: ["React Native", "Expo", "Firebase"],
        metaDescription:
            "A quick-commerce delivery app with five roles: customers, drivers, inventory admins, store admins and a super admin, with live order tracking and analytics.",
        summary: "A delivery business in one app, with five roles from customer to super admin, all updating in real time.",
        facts: [
            ["Roles", "Customer, driver, inventory admin, store admin and super admin"],
            ["What it does", "Ordering, live tracking, deliveries, stock, barcode-checked picking, support chat and sales reports."],
            ["Tech", "React Native, Expo, Firebase (Auth, Firestore), React Navigation, react-native-maps"],
        ],
        highlights: [
            "Live order status and support chat with Firestore listeners",
            "Barcode scanning to verify items while picking",
            "Low-stock alerts and PDF sales reports",
            "Driver earnings and delivery performance tracking",
        ],
        flow: [
            ["Customer orders", ""],
            ["Store picks", "barcode check"],
            ["Driver delivers", "status updates"],
            ["Customer tracks", "live"],
            ["Admin reports", "analytics, PDF"],
        ],
        tags: ["quick commerce", "delivery app", "grocery delivery", "order tracking", "React Native", "Expo", "Firebase"],
        links: {},
    },
    {
        slug: "multi-owner-shopping-platform",
        featured: true,
        isPrivate: true,
        kind: "e-commerce platform",
        img: multiOwnerImg,
        title: "Multi-Owner Shopping Platform",
        type: "SoftwareApplication",
        platforms: ["iOS", "Android", "Web"],
        stack: ["Expo", "React", "Firebase", "PWA"],
        metaDescription:
            "An e-commerce platform where each shop owner runs their store from a mobile admin app and gets their own installable online store with GST-ready checkout.",
        summary: "An e-commerce platform where each shop owner runs their business from a phone and gets their own online store.",
        facts: [
            ["For shop owners", "A mobile admin app for products and variants, orders, PDF invoices, stock, GST and shipping settings, and sales charts."],
            ["For customers", "A fast store website for each shop, installable as an app, with filters, size and colour choice, and guest checkout."],
            ["Tech", "React Native + Expo (admin app), React + Vite PWA (store), Firebase (Firestore, Storage, Cloud Functions)"],
        ],
        highlights: [
            "Every shop gets its own store link and theme colours",
            "Stock goes down automatically when an order is placed",
            "Order status from pending to delivered, with shareable PDF invoices",
            "Works offline with service-worker caching",
        ],
        flow: [
            ["Owner sets up shop", "admin app"],
            ["Adds products", "sizes, colours, stock"],
            ["Store goes live", "own link, installable"],
            ["Customer checks out", "GST breakdown"],
            ["Order handled", "stock, invoice, tracking"],
        ],
        tags: ["e-commerce", "online store builder", "PWA", "shop management app", "GST invoice", "React", "React Native", "Firebase"],
        links: {},
    },

    // ---------------------------------------------------------------- more projects
    {
        slug: "fmcg-demand-forecasting",
        kind: "data science case study",
        img: fmcg,
        title: "Demand Forecasting Analysis",
        type: "CreativeWork",
        stack: ["Python", "Time-series models", "Machine learning"],
        metaDescription:
            "FMCG demand forecasting project: seasonality and sales-pattern analysis, statistical and machine learning models, and forecasts turned into business decisions.",
        summary: "An FMCG demand forecasting case study that turns sales history into forecasts a business can act on.",
        highlights: [
            "Analyses seasonality and sales patterns",
            "Compares statistical and machine learning models",
            "Turns forecasts into business recommendations",
        ],
        flow: [
            ["Sales history", ""],
            ["Find patterns", "seasonality, trends"],
            ["Model", "statistical + ML"],
            ["Forecast", ""],
            ["Business actions", ""],
        ],
        tags: ["demand forecasting", "time series", "FMCG", "machine learning", "Python"],
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
        summary: "A fraud detection case study for banking that flags suspicious credit card transactions.",
        highlights: [
            "Studies transaction patterns",
            "Handles heavily imbalanced data",
            "Builds interpretable models",
        ],
        flow: [
            ["Transactions", ""],
            ["Balance classes", "rare fraud cases"],
            ["Train models", "interpretable"],
            ["Flag fraud", ""],
        ],
        tags: ["fraud detection", "BFSI", "imbalanced data", "credit risk", "machine learning"],
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
        summary: "A customisable alternative to Google Forms with response tracking and email notifications.",
        flow: [
            ["Build a form", ""],
            ["Share link", ""],
            ["Collect responses", ""],
            ["Track + email alerts", ""],
        ],
        tags: ["form builder", "Google Forms alternative", "web app"],
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
        summary: "Mini cricket games that run inside mobile ads, built at Hitwicket.",
        facts: [
            ["Result", "7M+ impressions and 40K+ installs"],
            ["Ad networks", "Unity Ads, AppLovin, Google Ads"],
            ["Tech", "HTML5 Canvas, JavaScript"],
        ],
        highlights: [
            "PvP match, team building, a timed Australia vs England challenge and a special-powers mode",
            "Small, compressed builds for fast ad loading",
            "Touch controls tuned for phones",
        ],
        flow: [
            ["Ad appears", "in another app"],
            ["Play a mini match", "tap to bat or bowl"],
            ["Call to action", "install"],
            ["App install", "40K+ in total"],
        ],
        tags: ["playable ads", "HTML5 games", "mobile advertising", "user acquisition", "Unity Ads", "AppLovin"],
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
        summary: "A handwriting notebook that runs in the browser and syncs through your own private GitHub Gists.",
        highlights: [
            "Saved on your device by default; cloud sync is optional",
            "Pen, eraser, and plain, ruled or grid pages",
            "Export a whole notebook as a PDF",
            "No tracking or analytics",
        ],
        flow: [
            ["Write or draw", ""],
            ["Saved on device", ""],
            ["Optional sync", "your private Gist"],
            ["Export", "PDF"],
        ],
        tags: ["note taking app", "privacy", "local-first", "GitHub Gists", "JavaScript"],
        links: {
            site: "https://guardnote.vercel.app",
            github: "https://github.com/navyansh1/writing-pad",
        },
    },
    {
        slug: "shop-inventory-web-app",
        isPrivate: true,
        kind: "inventory web app",
        img: shopInventoryImg,
        title: "Shop Inventory Web App",
        type: "WebApplication",
        stack: ["JavaScript", "Firestore"],
        metaDescription:
            "A simple stock-in and stock-out web app for an electrical shop, with search, quantity controls and a live product list on Firestore.",
        summary: "A simple stock-in and stock-out app for an electrical shop.",
        highlights: [
            "Add stock or reduce it with quick plus and minus buttons",
            "Search products by name and brand as you type",
            "Live stock list stored in Firestore",
        ],
        flow: [
            ["Search product", "name or brand"],
            ["Add or reduce stock", "+ / − buttons"],
            ["Saved", "Firestore"],
            ["Live stock list", ""],
        ],
        tags: ["inventory management", "stock tracking", "small business", "Firestore", "JavaScript"],
        links: {},
    },
    {
        slug: "mcq-quiz-generator-ai",
        kind: "AI-powered web app",
        img: mcqQuizImg,
        title: "MCQ Quiz Generator using AI",
        type: "WebApplication",
        stack: ["Python", "Flask", "Google Generative AI"],
        metaDescription:
            "An AI quiz generator that reads PDFs, Word files and text files and turns them into multiple-choice quizzes you can download as text or PDF.",
        summary: "Upload a PDF, Word or text file and get multiple-choice questions generated by AI.",
        flow: [
            ["Upload", "PDF, DOCX or TXT"],
            ["Extract text", ""],
            ["Gemini writes MCQs", ""],
            ["Download", "text or PDF"],
        ],
        tags: ["AI quiz generator", "MCQ generator", "Flask", "Gemini", "education"],
        links: {
            site: "https://mcqgen.vercel.app/",
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
        summary: "A TicTacToe game for iPhone built with SwiftUI and UIKit.",
        flow: [
            ["Tap a square", ""],
            ["Check win or draw", ""],
            ["Show result", "restart"],
        ],
        tags: ["iOS", "SwiftUI", "game"],
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
        summary: "A lottery that runs on a Solidity smart contract, with a React front end.",
        flow: [
            ["Enter", "React front end"],
            ["Entry recorded", "Solidity contract"],
            ["Winner picked", "by the contract"],
            ["Payout", ""],
        ],
        tags: ["blockchain", "Solidity", "smart contract", "dApp", "React"],
        links: {
            site: "https://drive.google.com/file/d/1mwgChln8-jExcFmfVdADh5mv4pUMKU9W/view",
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
        summary: "A cleaner Instagram-style social app concept designed in Figma.",
        tags: ["UI design", "UX design", "Figma", "social media app"],
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
        summary: "A card game app for iPhone, designed in Figma and built with SwiftUI.",
        tags: ["iOS", "SwiftUI", "card game"],
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
        stack: ["React", "Vite", "Tailwind CSS", "Framer Motion"],
        metaDescription:
            "The source of this portfolio website, built with React, Tailwind CSS and Framer Motion and pre-rendered for search engines.",
        summary: "This website: React and Tailwind CSS, pre-rendered to static pages so search engines can read every page.",
        flow: [
            ["React pages", ""],
            ["Pre-render", "every route to HTML"],
            ["Sitemap + SEO tags", ""],
            ["Deploy", "Vercel"],
        ],
        tags: ["React", "Vite", "Tailwind CSS", "SEO", "static site generation"],
        links: {
            github: "https://github.com/navyansh1/NavyGeeks-Website",
        },
    },
];

export const featuredProjects = projects.filter((p) => p.featured);
export const moreProjects = projects.filter((p) => !p.featured);

export const getProject = (slug) => projects.find((p) => p.slug === slug);
