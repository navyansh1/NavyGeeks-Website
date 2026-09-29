import thumb_geoscout_iq from "../assets/projects/thumbs/geoscout-iq.jpg";
import thumb_cctv_iq_face_attendance from "../assets/projects/thumbs/cctv-iq-face-attendance.jpg";
import thumb_ocr_engine_benchmark from "../assets/projects/thumbs/ocr-engine-benchmark.jpg";
import thumb_masker_pii_redaction from "../assets/projects/thumbs/masker-pii-redaction.jpg";
import thumb_discount_spend_optimization from "../assets/projects/thumbs/discount-spend-optimization.jpg";
import thumb_vedicflow from "../assets/projects/thumbs/vedicflow.jpg";
import thumb_bill_sonic from "../assets/projects/thumbs/bill-sonic.jpg";
import thumb_fmcg_demand_forecasting from "../assets/projects/thumbs/fmcg-demand-forecasting.jpg";
import thumb_credit_card_fraud_detection_bfsi from "../assets/projects/thumbs/credit-card-fraud-detection-bfsi.jpg";
import thumb_nextforms from "../assets/projects/thumbs/nextforms.jpg";
import thumb_cricket_playable_ads from "../assets/projects/thumbs/cricket-playable-ads.jpg";
import thumb_guardnote from "../assets/projects/thumbs/guardnote.jpg";
import thumb_mcq_quiz_generator_ai from "../assets/projects/thumbs/mcq-quiz-generator-ai.jpg";
import thumb_tictactoe_ios_app from "../assets/projects/thumbs/tictactoe-ios-app.jpg";
import thumb_blockchain_lottery_dapp from "../assets/projects/thumbs/blockchain-lottery-dapp.jpg";
import thumb_instasnap_ui_redesign from "../assets/projects/thumbs/instasnap-ui-redesign.jpg";
import thumb_playing_cards_ios_app from "../assets/projects/thumbs/playing-cards-ios-app.jpg";
import thumb_portfolio_website from "../assets/projects/thumbs/portfolio-website.jpg";

import geoscoutDiagram from "../assets/diagrams/geoscout-iq.svg";
import cctvIqDiagram from "../assets/diagrams/cctv-iq.svg";
import maskerDiagram from "../assets/diagrams/masker-pii-redaction.svg";
import discountDiagram from "../assets/diagrams/discount-optimization.svg";
import ocrDiagram from "../assets/diagrams/ocr-benchmark.svg";

/*
 * Projects. Each one gets its own page at /projects/<slug>/.
 *
 * featured    shown in the main grid; the rest sit in a collapsed "More projects" list
 * demo        show the live site as a "Live demo" row in the table
 * isPrivate   code is in a private repo: no GitHub link, the page says so
 * summary     one line, shown as the first row of the "At a glance" table
 * repoName    optional repository name to mention (never linked)
 * flow        [step, note] pairs drawn as a flowchart
 * facts       [label, value] rows for the "At a glance" table
 * highlights  "Key points" bullets
 * tables      optional result tables ({ title, head, rows })
 * details     optional bullets inside the collapsed "Technical details" section
 * diagram     optional architecture diagram
 * thumbIsDiagram  the thumbnail is that diagram, so the page does not repeat it at the top
 * tags        keywords: shown as chips and used for meta keywords / structured data
 * type        schema.org type: MobileApplication | WebApplication | SoftwareApplication | SoftwareSourceCode | CreativeWork
 */
export const projects = [
    // ---------------------------------------------------------------- featured
    {
        slug: "geoscout-iq",
        featured: true,
        demo: true,
        kind: "location intelligence web app",
        img: thumb_geoscout_iq,
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
        thumbIsDiagram: true,
        featured: true,
        isPrivate: true,
        kind: "computer vision system",
        img: thumb_cctv_iq_face_attendance,
        title: "CCTV IQ - Face ID Attendance",
        type: "SoftwareApplication",
        stack: ["Python", "InsightFace", "OpenVINO", "AWS Bedrock"],
        metaDescription:
            "CCTV IQ logs office attendance from two doorway cameras using face recognition on an Intel iGPU, and answers attendance questions in plain English with an LLM.",
        summary: "A face-recognition attendance system on two office doorway cameras. It logs clock-in, clock-out and time inside, and answers questions about attendance in plain English.",
        facts: [
            ["Problem", "Track office attendance automatically, using the cameras already at the door."],
            ["What it does", "Recognises enrolled people on two doorway cameras, records clock-in, clock-out and time inside with a face photo for each, and writes one Excel file per day."],
            ["How it works", "Find faces, turn each into an embedding, match it against 182 people. Clock-in is the first sighting of the day on either camera; clock-out is the last."],
            ["Ask Iris", "Type a question like \"who was late this week?\". Claude Haiku 4.5 on AWS Bedrock writes one SQL query, runs it, and answers from the rows."],
            ["Result", "0.31 s per frame (from 9.86 s) on an office PC. A score floor fitted to a hand-checked day removed every false name and lost no real person."],
            ["Tech", "Python, InsightFace (SCRFD + antelopev2), OpenVINO on the Intel iGPU, FastAPI, SQLite, AWS Bedrock"],
        ],
        highlights: [
            "Works with either door both ways: the first and last sighting on any camera decide the day",
            "Time inside = first to last seen, minus the breaks the cameras saw; a missed exit never docks an honest employee",
            "Masks the clear glass strip where the lobby camera could see people at their desks, which had cut about 1 in 8 long days short by 2.7 hours",
            "Refuses a name when two people look too alike: no name beats a confident wrong one",
            "Runs unattended: starts at login, a supervisor restarts it in about 15 s, and the dashboard never says it is recording when it is not",
            "Iris never sees staff data to decide what to fetch, only the table layout; it declines off-topic or destructive requests",
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
                title: "Picking the score floor from a hand-checked day",
                head: ["Floor", "Names kept", "Wrong names kept", "Real people lost"],
                rows: [
                    ["0.24", "70", "26", "0"],
                    ["0.35", "55", "11", "0"],
                    ["0.40", "47", "2", "0"],
                    ["0.41 (chosen)", "45", "0", "0"],
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
            "The older in/out pairing fully measured only 14% of person-days; the new span-minus-breaks rule gives every day a number and agrees with pairing within 15 minutes 94% of the time",
            "A break needs a lobby sighting, then 10+ minutes unseen, then proof of coming back in; days that could hide an early exit get a check flag instead",
            "Switching both cameras from H.265 to H.264 fixed 60-73% of frames arriving with a broken bottom band (ping and substream tests had ruled out WiFi)",
            "Found and fixed a 9-day silent outage: a thread that crashed quietly, a status flag set before the work started, and nothing watching the process",
            "A stalled camera is rebooted over HTTP, and reconnects back off instead of hammering it",
            "Iris retries a failed query with the database's own error; every checkable answer in the tests has hand-written SQL beside it",
            "Compared four recognition models (antelopev2, AdaFace, buffalo_l, AuraFace): all tied within noise, so camera placement matters more than the model",
            "Real phone photos matched about 9.5 points better than AI-edited directory photos",
            "Recognition runs in its own thread; the dashboard only reads snapshots, so closing the browser changes nothing",
            "Regression tests cover the visit logic, the arrival rules and the ignore-zone geometry",
        ],
        diagram: cctvIqDiagram,
        flow: [
            ["2 doorway cameras", "RTSP, H.264"],
            ["Mask zones", "desks, clear glass"],
            ["Find + embed faces", "SCRFD + antelopev2 on iGPU"],
            ["Match", "182 people, floor 0.41"],
            ["Build the day", "first in, last out, breaks"],
            ["Outputs", "dashboard, Excel, Ask Iris"],
        ],
        tags: ["computer vision", "face recognition", "CCTV analytics", "attendance system", "InsightFace", "OpenVINO", "edge AI", "Intel iGPU", "LLM text-to-SQL", "AWS Bedrock", "Claude", "Python"],
        links: {},
    },
    {
        slug: "vedicflow",
        featured: true,
        isPrivate: true,
        kind: "mobile app (iOS & Android)",
        img: thumb_vedicflow,
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
        slug: "ocr-engine-benchmark",
        thumbIsDiagram: true,
        featured: true,
        isPrivate: true,
        repoName: "OCR_Research",
        kind: "OCR research study",
        img: thumb_ocr_engine_benchmark,
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
        slug: "bill-sonic",
        featured: true,
        isPrivate: true,
        kind: "point-of-sale app",
        img: thumb_bill_sonic,
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
        slug: "discount-spend-optimization",
        thumbIsDiagram: true,
        featured: true,
        isPrivate: true,
        kind: "machine learning pipeline",
        img: thumb_discount_spend_optimization,
        title: "Discount Spend Optimization",
        type: "SoftwareApplication",
        stack: ["Python", "XGBoost", "SHAP", "Databricks", "MLflow"],
        metaDescription:
            "An ML pipeline on Databricks for an FMCG company: it measures where trade discounts lift sales across 18 product lines and simulates the sales and P&L impact of changes.",
        summary: "A modelling pipeline for an FMCG company that shows where trade discounts actually lift sales, and what happens to sales and profit if they change.",
        facts: [
            ["Problem", "Discount budgets are spread across states, packs and channels, and it is hard to see which ones pay back."],
            ["What I built", "One config-driven pipeline on Databricks for 18 product lines: data pull, merge, models, simulation and two dashboards."],
            ["How it works", "Group segments with similar sales patterns, train one model per group, then change only the discount and re-predict to measure the effect."],
            ["Result", "Separate hand-edited notebooks per product became one pipeline that runs for any product from an Excel config. Headline models reach R² 0.81-0.97; mature products 11-22% wMAPE."],
            ["Tech", "Python, pandas, DTW clustering, XGBoost, SHAP, MLflow, Databricks notebooks and Apps, Azure Blob, Streamlit"],
        ],
        highlights: [
            "One Excel workbook drives every stage: change a cell, not the code",
            "Elasticity: predict sales at today's discount and ±0.5 points, then rate each segment Low, Medium or High",
            "Saturation curves show where extra discount stops paying",
            "Packs that take sales from each other get two models: one for the split, one for total sales",
            "The P&L simulator loads the real models, so its numbers match the notebooks exactly",
            "Every run is tracked in MLflow, with a model registered per cluster",
        ],
        tables: [
            {
                title: "Elasticity buckets",
                head: ["Bucket", "Elasticity", "What it means"],
                rows: [
                    ["Low", "< 0.05", "discount barely moves sales"],
                    ["Medium", "0.05 - 0.5", "some response, watch it"],
                    ["High", "≥ 0.5", "strong response, worth funding"],
                ],
            },
            {
                title: "Pipeline stages",
                head: ["Stage", "Output"],
                rows: [
                    ["1. Data pull", "one file per product per source"],
                    ["2. Merge", "one model-ready table per product"],
                    ["3. Model", "clusters, models, SHAP, saturation curves"],
                    ["4. Simulate", "elasticity report and full what-if sweep"],
                    ["5. Dashboards", "model results and P&L simulator"],
                ],
            },
        ],
        details: [
            "Inputs: sales, discounts and price from the warehouse, retail audit, search share, household penetration, weather and a festival calendar",
            "Segments are State × Pack × Channel by month, filled to continuous months so gaps do not distort the models",
            "Features are picked per cluster by sweeping combinations; discount is always kept",
            "The what-if sweep covers the 5th to 95th percentile of past discount in 0.1-point steps",
            "Outputs are stored in Azure Blob by quarterly release, so only the stage that changed needs a re-run",
            "Model quality is tracked per cluster with r², MAPE and wMAPE",
            "The first version ran locally in pure pandas with Streamlit dashboards on Hugging Face Spaces",
        ],
        diagram: discountDiagram,
        flow: [
            ["Excel config", "drives every stage"],
            ["Data pull", "warehouse SQL"],
            ["Merge", "state × pack × channel"],
            ["Cluster + model", "DTW, XGBoost, SHAP"],
            ["Simulate", "elasticity, saturation"],
            ["Dashboards", "P&L simulator"],
        ],
        tags: ["discount optimization", "trade promotion", "price elasticity", "marketing mix modelling", "time series clustering", "DTW", "XGBoost", "SHAP", "MLflow", "Databricks", "FMCG analytics"],
        links: {},
    },
    {
        slug: "masker-pii-redaction",
        thumbIsDiagram: true,
        featured: true,
        demo: true,
        kind: "AI web app",
        img: thumb_masker_pii_redaction,
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

    // ---------------------------------------------------------------- more projects
    {
        slug: "fmcg-demand-forecasting",
        kind: "data science case study",
        img: thumb_fmcg_demand_forecasting,
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
        img: thumb_credit_card_fraud_detection_bfsi,
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
        img: thumb_nextforms,
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
        highlights: [
            "Custom themes and layouts for each form",
            "Response tracking with analytics",
            "Instant confirmation emails on submit",
            "Export responses to Excel or Google Sheets",
        ],
        tags: ["form builder", "Google Forms alternative", "web app"],
        links: {
            site: "https://nextforms.in",
        },
    },
    {
        slug: "cricket-playable-ads",
        kind: "set of HTML5 playable ads",
        img: thumb_cricket_playable_ads,
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
        img: thumb_guardnote,
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
        slug: "mcq-quiz-generator-ai",
        kind: "AI-powered web app",
        img: thumb_mcq_quiz_generator_ai,
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
        highlights: [
            "Reads PDF, Word and text files",
            "You choose how many questions to generate",
            "Download the quiz as text or PDF",
        ],
        tags: ["AI quiz generator", "MCQ generator", "Flask", "Gemini", "education"],
        links: {
            site: "https://mcqgen.vercel.app/",
        },
    },
    {
        slug: "tictactoe-ios-app",
        kind: "iOS game app",
        img: thumb_tictactoe_ios_app,
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
        highlights: [
            "Two-player game on one phone",
            "Detects wins and draws",
            "Built with SwiftUI",
        ],
        tags: ["iOS", "SwiftUI", "game"],
        links: {
            github: "https://github.com/navyansh1/TickTacToe",
        },
    },
    {
        slug: "blockchain-lottery-dapp",
        kind: "blockchain dApp",
        img: thumb_blockchain_lottery_dapp,
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
        highlights: [
            "Smart contract written in Solidity",
            "Deployed and tested in Remix",
            "React front end to join the lottery",
        ],
        tags: ["blockchain", "Solidity", "smart contract", "dApp", "React"],
        links: {
            site: "https://drive.google.com/file/d/1mwgChln8-jExcFmfVdADh5mv4pUMKU9W/view",
        },
    },
    {
        slug: "instasnap-ui-redesign",
        kind: "UI/UX design concept",
        img: thumb_instasnap_ui_redesign,
        title: "InstaSnap UI Redesign",
        type: "CreativeWork",
        stack: ["Figma"],
        metaDescription:
            "InstaSnap: a refined Instagram UI/UX concept designed in Figma for a sleek, user-friendly social media experience.",
        summary: "A cleaner Instagram-style social app concept designed in Figma.",
        highlights: [
            "Redesigned feed, comments, stories, search and activity screens",
            "Cleaner layout with more space for photos",
            "Designed in Figma",
        ],
        flow: [
            ["Comments", ""],
            ["Create story", ""],
            ["Story", ""],
            ["Search", ""],
            ["Activity", ""],
        ],
        tags: ["UI design", "UX design", "Figma", "social media app"],
        links: {
            site: "https://www.figma.com/design/4GnyQrrTZ7yhLqAFTm9Mmi/Social-Media-App-UI-UX-Project",
        },
    },
    {
        slug: "playing-cards-ios-app",
        kind: "iOS card game app",
        img: thumb_playing_cards_ios_app,
        title: "Playing Cards iOS App",
        type: "SoftwareSourceCode",
        platforms: ["iOS"],
        stack: ["SwiftUI", "UIKit", "Figma"],
        metaDescription:
            "A playing cards iOS app built with SwiftUI, UIKit and Figma that brings card games to your fingertips. Source on GitHub.",
        summary: "A card game app for iPhone, designed in Figma and built with SwiftUI.",
        highlights: [
            "Player vs CPU card game",
            "Tap Deal to draw cards; the higher card scores",
            "Screens designed in Figma, built in SwiftUI",
        ],
        flow: [
            ["Tap Deal", ""],
            ["Player and CPU draw", ""],
            ["Higher card scores", ""],
            ["Scores update", ""],
        ],
        tags: ["iOS", "SwiftUI", "card game"],
        links: {
            github: "https://github.com/navyansh1/cards-Game",
        },
    },
    {
        slug: "portfolio-website",
        kind: "portfolio website",
        img: thumb_portfolio_website,
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
        highlights: [
            "Every page pre-rendered to static HTML for search engines",
            "A page for each project and research paper",
            "Sitemap, structured data and link previews",
            "Deployed on Vercel from GitHub",
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
