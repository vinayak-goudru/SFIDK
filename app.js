/* ==========================================================================
   SFI Dakshina Kannada Web Portal - Application Logic
   Handles routing, local state, local storage operations, & interactive features.
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
    // --- Application State ---
    const STATE = {
        theme: "dark",
        activeTab: "home",
        language: "en",
        news: [],
        campaigns: [],
        members: [],
        grievances: [],
        gallery: [],
        activeGalleryFilter: "all",
        activeLightboxIndex: 0,
        carouselIndex: 0,
        siteContent: {},
        activeTaluk: "mangaluru"
    };

    // --- Global Localized Alert Helper ---
    window.showLocalizedAlert = function (key) {
        const lang = STATE.language;
        const alerts = {
            download_pr: {
                en: "Downloading Official Statement PDF...",
                kn: "ಅಧಿಕೃತ ಹೇಳಿಕೆ PDF ಡೌನ್‌ಲೋಡ್ ಆಗುತ್ತಿದೆ..."
            },
            download_mu: {
                en: "Downloading Mangalore University Question Papers PDF...",
                kn: "ಮಂಗಳೂರು ವಿವಿ ಪ್ರಶ್ನೆ ಪತ್ರಿಕೆಗಳ PDF ಡೌನ್‌ಲೋಡ್ ಆಗುತ್ತಿದೆ..."
            },
            download_puc: {
                en: "Downloading PUC Notes PDF...",
                kn: "ಪಿಯುಸಿ ನೋಟ್ಸ್ PDF ಡೌನ್‌ಲೋಡ್ ಆಗುತ್ತಿದೆ..."
            },
            download_comp: {
                en: "Downloading Competitive Exams Study Material PDF...",
                kn: "ಸ್ಪರ್ಧಾತ್ಮಕ ಪರೀಕ್ಷೆಯ ಅಧ್ಯಯನ ಸಾಮಗ್ರಿ PDF ಡೌನ್‌ಲೋಡ್ ಆಗುತ್ತಿದೆ..."
            },
            coach_register: {
                en: "Registration Successful! We will notify you about the next batch.",
                kn: "ನೋಂದಣಿ ಯಶಸ್ವಿಯಾಗಿದೆ! ಮುಂದಿನ ಬ್ಯಾಚ್ ಬಗ್ಗೆ ನಾವು ನಿಮಗೆ ತಿಳಿಸುತ್ತೇವೆ."
            },
            open_article: {
                en: "Opening Article...",
                kn: "ಲೇಖನವನ್ನು ತೆರೆಯಲಾಗುತ್ತಿದೆ..."
            },
            submit_article: {
                en: "Opening Article Submission Form...",
                kn: "ಲೇಖನ ಸಲ್ಲಿಕೆ ಫಾರ್ಮ್ ಅನ್ನು ತೆರೆಯಲಾಗುತ್ತಿದೆ..."
            },
            apply_ambassador: {
                en: "Opening Campus Ambassador Application Form...",
                kn: "ಕ್ಯಾಂಪಸ್ ರಾಯಭಾರಿ ಅರ್ಜಿ ಫಾರ್ಮ್ ಅನ್ನು ತೆರೆಯಲಾಗುತ್ತಿದೆ..."
            }
        };
        if (alerts[key]) {
            alert(alerts[key][lang] || alerts[key]['en']);
        } else {
            alert(key);
        }
    };

    // --- DOM Elements ---
    const appContainer = document.getElementById("app-container");
    const navLinks = document.querySelectorAll(".nav-link, .nav-btn");
    const mobileMenuBtn = document.getElementById("mobile-menu-btn");
    const mainNav = document.getElementById("main-nav");
    const themeToggleBtn = document.getElementById("theme-toggle-btn");
    const langToggleBtn = document.getElementById("lang-toggle-btn");

    // News Elements
    const newsCarousel = document.getElementById("news-carousel");
    const newsPrev = document.getElementById("news-prev");
    const newsNext = document.getElementById("news-next");
    const newsDots = document.getElementById("news-dots");

    // About Elements
    const aboutTabButtons = document.querySelectorAll(".about-tab-btn");
    const aboutPanes = document.querySelectorAll(".about-pane");

    // Campaigns Element
    const campaignsList = document.getElementById("campaigns-list");

    // Gallery Elements
    const galleryGrid = document.getElementById("gallery-grid");
    const galleryFilterBtns = document.querySelectorAll(".gallery-filters .filter-btn");
    const galleryLightbox = document.getElementById("gallery-lightbox");
    const lightboxImg = document.getElementById("lightbox-img");
    const lightboxVideo = document.getElementById("lightbox-video");
    const lightboxCaption = document.getElementById("lightbox-caption");
    const lightboxCounter = document.getElementById("lightbox-counter");
    const lightboxClose = document.getElementById("lightbox-close");
    const lightboxPrev = document.getElementById("lightbox-prev");
    const lightboxNext = document.getElementById("lightbox-next");
    const lightboxZoomBtn = document.getElementById("lightbox-zoom-btn");
    const lightboxShareBtn = document.getElementById("lightbox-share-btn");
    const lightboxContentWrapper = document.getElementById("lightbox-content-wrapper");

    // Grievance Form Elements
    const grievanceForm = document.getElementById("grievance-form");
    const grievanceSuccess = document.getElementById("grievance-success");
    const resetGrievanceBtn = document.getElementById("reset-grievance-btn");
    const ticketNumberSpan = document.getElementById("ticket-number");

    // Membership Form Elements
    const membershipForm = document.getElementById("membership-form");
    const joinFormWrapper = document.getElementById("join-form-wrapper");
    const joinSuccess = document.getElementById("join-success");
    const resetJoinBtn = document.getElementById("reset-join-btn");
    const ticketName = document.getElementById("ticket-name");
    const ticketId = document.getElementById("ticket-id");
    const ticketCollege = document.getElementById("ticket-college");
    const ticketTaluk = document.getElementById("ticket-taluk");
    const ticketCourse = document.getElementById("ticket-course");
    const ticketDate = document.getElementById("ticket-date");

    // Admin Elements
    const adminAuthCard = document.getElementById("admin-auth-card");
    const adminDashboardView = document.getElementById("admin-dashboard-view");
    const adminLoginForm = document.getElementById("admin-login-form");
    const adminPasswordInput = document.getElementById("admin-password");
    const adminAuthError = document.getElementById("admin-auth-error");
    const adminLogoutBtn = document.getElementById("admin-logout-btn");

    const adminMembersTbody = document.getElementById("admin-members-tbody");
    const adminGrievancesTbody = document.getElementById("admin-grievances-tbody");
    const countMembers = document.getElementById("count-members");
    const countGrievances = document.getElementById("count-grievances");
    const clearMembersBtn = document.getElementById("clear-members-btn");
    const clearGrievancesBtn = document.getElementById("clear-grievances-btn");

    const newsPublishForm = document.getElementById("news-publish-form");
    const newsPublishSuccess = document.getElementById("news-publish-success");

    const adminDashTabs = document.querySelectorAll(".dash-tab-btn");
    const adminDashPanes = document.querySelectorAll(".dash-pane");

    // --- State Persistence & Seeding ---
    const DEFAULT_NEWS = [
        {
            title: "ಮಂಗಳೂರು ವಿವಿ ಪರೀಕ್ಷಾ ಶುಲ್ಕ ಏರಿಕೆ ಖಂಡಿಸಿ SFI ಪ್ರತಿಭಟನೆ",
            date: "07 ಆಗಸ್ಟ್ 2026 • ಮಂಗಳೂರು ಬ್ಯೂರೋ",
            category: "ಉದಯವಾಣಿ (UDAYAVANI)",
            content: "ಮಂಗಳೂರು ವಿಶ್ವವಿದ್ಯಾನಿಲಯವು ಪದವಿ ವಿದ್ಯಾರ್ಥಿಗಳ ಸೆಮಿಸ್ಟರ್ ಪರೀಕ್ಷಾ ಶುಲ್ಕವನ್ನು ಶೇ.30 ರಷ್ಟು ದಿಢೀರ್ ಏರಿಕೆ ಮಾಡಿದ್ದನ್ನು ಖಂಡಿಸಿ ಎಸ್‌ಎಫ್‌ಐ ಜಿಲ್ಲಾ ಸಮಿತಿಯು ತೀವ್ರ ಆಕ್ರೋಶ ವ್ಯಕ್ತಪಡಿಸಿದೆ."
        },
        {
            title: "ಬಿಸಿ ರೋಡ್ ಸರ್ಕಾರಿ ಕಾಲೇಜಿನಲ್ಲಿ ಮೂಲಸೌಕರ್ಯ ಕೊರತೆ: SFI ಆಕ್ರೋಶ",
            date: "05 ಆಗಸ್ಟ್ 2026 • ಬಂಟ್ವಾಳ ವರದಿಗಾರರು",
            category: "ಪ್ರಜಾವಾಣಿ (PRAJAVANI)",
            content: "ಬಂಟ್ವಾಳ ತಾಲೂಕಿನ ಸರ್ಕಾರಿ ಪ್ರಥಮ ದರ್ಜೆ ಕಾಲೇಜಿನಲ್ಲಿ ತರಗತಿ ಕೊಠಡಿಗಳ ಕೊರತೆಯಿದ್ದು, ತಕ್ಷಣ ನೂತನ ಕಟ್ಟಡ ನಿರ್ಮಾಣಕ್ಕೆ ಆಗ್ರಹಿಸಿ ಎಸ್‌ಎಫ್‌ಐ ನೇತೃತ್ವದಲ್ಲಿ ನೂರಾರು ವಿದ್ಯಾರ್ಥಿಗಳು ತರಗತಿ ಬಹಿಷ್ಕರಿಸಿ ಪ್ರತಿಭಟನೆ ನಡೆಸಿದರು."
        },
        {
            title: "ವಿದ್ಯಾರ್ಥಿ ಬಸ್ ಪಾಸ್ ಸಮಸ್ಯೆ: ಆಗಸ್ಟ್ 12 ರಂದು ಬೃಹತ್ ಮುಷ್ಕರಕ್ಕೆ ಕರೆ",
            date: "02 ಆಗಸ್ಟ್ 2026 • ರಾಜ್ಯ ಸಮಿತಿ ಕರೆ",
            category: "ವಾರ್ತಾ ಭಾರತಿ (VARTHA BHARATI)",
            content: "ಗ್ರಾಮೀಣ ಭಾಗದ ವಿದ್ಯಾರ್ಥಿಗಳಿಗೆ KSRTC ಬಸ್ ಪಾಸ್ ನೀಡುವಲ್ಲಿ ಆಗುತ್ತಿರುವ ವಿಳಂಬ ಮತ್ತು ಖಾಸಗಿ ಬಸ್‌ಗಳ ದಬ್ಬಾಳಿಕೆ ವಿರೋಧಿಸಿ ದ.ಕ ಜಿಲ್ಲೆಯಾದ್ಯಂತ ವಿದ್ಯಾರ್ಥಿ ಮುಷ್ಕರಕ್ಕೆ ಕರೆ ನೀಡಲಾಗಿದೆ."
        }
    ];

    const DEFAULT_CAMPAIGNS = [
        {
            id: "camp-fees",
            title: "Stop Commercialization of Education",
            desc: "Campaigning against private college fee hikes, unregulated donation charges, and advocating for strict adherence to government-mandated fee caps in professional courses.",
            signatures: 8420,
            targetSignatures: 10000,
            signed: false
        },
        {
            id: "camp-hostels",
            title: "Safe & Clean Student Hostels",
            desc: "A district-wide audit and mobilization campaign requesting safety regulations, hygienic kitchen conditions, clean drinking water, and functional security systems in all SC/ST/BCM student hostels.",
            signatures: 3840,
            targetSignatures: 5000,
            signed: false
        },
        {
            id: "camp-representation",
            title: "Restore College Democratic Unions",
            desc: "Struggling to restore democratic student body elections in colleges and universities in Dakshina Kannada, protecting the student right to organize, represent, and debate.",
            signatures: 6210,
            targetSignatures: 8000,
            signed: false
        }
    ];

    const DEFAULT_MEMBERS = [
        {
            id: "SFIDK-01054",
            name: "Comrade Shreya Shetty",
            college: "St. Aloysius College, Mangaluru",
            taluk: "Mangaluru",
            course: "B.Sc (Comp Science)",
            phone: "9876500123",
            date: "2026-08-01"
        },
        {
            id: "SFIDK-01055",
            name: "Comrade Prajwal K. R.",
            college: "Govt. First Grade College, Bantwal",
            taluk: "Bantwal",
            course: "B.A (History)",
            phone: "9988776655",
            date: "2026-08-03"
        }
    ];

    const DEFAULT_GRIEVANCES = [
        {
            ticketId: "DK-G042",
            name: "Lokesh M.",
            phone: "9448822110",
            email: "lokesh.m@example.com",
            college: "SDM College, Ujire",
            taluk: "Belthangady",
            category: "Bus Pass / Transport",
            description: "No KSRTC student special buses are running from Utre to Kokkada during college hours (8:30 AM and 4:30 PM). Rural students are missing initial periods.",
            anonymous: false,
            status: "Pending Investigation"
        }
    ];

    // Gallery Seed Data
    const DEFAULT_GALLERY = [
        {
            img: "assets/sfi.png",
            category: "meet",
            title: "Students Federation of India (SFI) Dakshina Kannada District Assembly",
            desc: "Students Federation of India (SFI) Dakshina Kannada District Conference held at Don-Bosco Hall, Near Jyothi circle Mangaluru."
        },
        {
            img: "assets/Conference.png",
            category: "meet",
            title: "SFI DK District Conference",
            desc: "Annual district conference discussing education policies, student rights, and local unit struggles."
        },
        {
            img: "assets/protest.png",
            category: "protest",
            title: "NEET Exam Corruption Protest",
            desc: "Student demonstration held in Mangaluru protesting against national exam paper leaks."
        },

        {
            img: "assets/seminar.png",
            category: "seminar",
            title: "Public Education Seminar",
            desc: "District level student discussion forum on the commercialization of higher education."
        },
        {
            img: "assets/meet.png",
            category: "meet",
            title: "SFI DK District Secretariat Meet",
            desc: "Student committee meeting to outline local issues, bus passes, and student hostels campaign."
        },
        {
            img: "assets/cultural.png",
            category: "cultural",
            title: "Save Public Education Street Play",
            desc: "Street play (Nukkad Natak) cultural campaign conducted by SFI volunteers across colleges."
        },
        {
            img: "assets/protest.png",
            src: "assets/sfi_flag.mp4",
            category: "video",
            title: "NEET Protest Student March — Video",
            desc: "SFI Dakshina Kannada district demonstration at Jyothi Circle, Mangaluru."
        },
        {
            img: "assets/Conference.png",
            src: "assets/sfi_flag.mp4",
            category: "video",
            title: "District Conference Address — Video",
            desc: "Keynote speech on public education defense at Don-Bosco Hall, Mangaluru."
        }
    ];

    const DEFAULT_SITE_CONTENT = {
        heroTitle: "Independence. Democracy. Socialism.",
        heroSubtitle: "Students' Federation of India (SFI) is the vanguard organization of progressive, democratic students fighting for equality, education, and student rights in Dakshina Kannada.",
        whatsapp: "",
        history1: "The Students' Federation of India (SFI) was formed in 1970, out of the need to unite the student community on a national scale to resist anti-student policies, commercialization, and privatization of education. Over the last five decades, SFI has grown into India's largest progressive student organisation, with millions of members.",
        history2: "In the Dakshina Kannada district, SFI has a rich legacy of leading struggles. Being an educational hub with hundreds of professional, degree, and pre-university colleges, Mangaluru and its surrounding taluks have witnessed historical student movements led by SFI demanding fair bus passes, well-equipped government hostels, transparent evaluation processes, and democratic representation within educational institutions."
    };

    // Core Initialization
    function init() {
        // 1. Load data from local storage or set defaults
        // Clear cached gallery data to refresh corrected image paths
        localStorage.removeItem("sfi_gallery");

        STATE.news = JSON.parse(localStorage.getItem("sfi_news")) || DEFAULT_NEWS;
        STATE.campaigns = JSON.parse(localStorage.getItem("sfi_campaigns")) || DEFAULT_CAMPAIGNS;
        STATE.members = JSON.parse(localStorage.getItem("sfi_members")) || DEFAULT_MEMBERS;
        STATE.grievances = JSON.parse(localStorage.getItem("sfi_grievances")) || DEFAULT_GRIEVANCES;
        // Load gallery: merge defaults + admin uploads
        const savedUploads = JSON.parse(localStorage.getItem("sfi_gallery_uploads")) || [];
        STATE.gallery = [...DEFAULT_GALLERY, ...savedUploads];
        STATE.theme = localStorage.getItem("sfi_theme") || "dark";
        STATE.language = localStorage.getItem("sfi_lang") || "en";
        try {
            const savedContent = JSON.parse(localStorage.getItem("sfi_dk_site_content"));
            STATE.siteContent = (savedContent && typeof savedContent === "object") ? savedContent : Object.assign({}, DEFAULT_SITE_CONTENT);
            if (STATE.siteContent) {
                STATE.siteContent.whatsapp = "";
            }
        } catch (e) {
            STATE.siteContent = Object.assign({}, DEFAULT_SITE_CONTENT);
        }

        // 2. Apply theme and language
        document.documentElement.setAttribute("data-theme", STATE.theme);
        if (typeof applyLanguage === "function") applyLanguage();

        // 3. Setup SPA Router
        handleRouting();
        window.addEventListener("hashchange", handleRouting);

        // 4. Render initial elements
        renderNewsCarousel();
        renderDailyNews();
        renderCampaigns();
        renderGallery();
        setupCounterAnimations();
        initHeroBgSlider();
        initScrollAnimations();

        // 5. Fetch live data from Firestore
        if (window.db) {
            window.db.collection("news").orderBy("createdAt", "desc").get().then((snapshot) => {
                if (!snapshot.empty) {
                    const fetchedNews = [];
                    snapshot.forEach(doc => {
                        const data = doc.data();
                        fetchedNews.push({
                            title: data.title,
                            date: data.createdAt ? data.createdAt.toDate().toLocaleDateString('kn-IN') + ' • Live Update' : 'New Update',
                            category: "SFI Updates",
                            content: data.content,
                            image: data.imageUrl || null
                        });
                    });
                    
                    // Replace STATE.news with fetched news
                    STATE.news = fetchedNews;
                    renderNewsCarousel();
                    renderDailyNews();
                    saveState();
                }
            }).catch(e => console.error("Firestore Error:", e));

            // Fetch Gallery
            window.db.collection("gallery").orderBy("createdAt", "desc").get().then((snapshot) => {
                if (!snapshot.empty) {
                    const fetchedGallery = [];
                    snapshot.forEach(doc => {
                        const data = doc.data();
                        fetchedGallery.push({
                            img: data.url,
                            category: data.category,
                            title: data.title,
                            desc: data.desc || ""
                        });
                    });
                    STATE.gallery = fetchedGallery;
                    renderGallery();
                }
            });

            // Fetch Events/Campaigns
            window.db.collection("events").orderBy("createdAt", "desc").get().then((snapshot) => {
                if (!snapshot.empty) {
                    const fetchedEvents = [];
                    snapshot.forEach(doc => {
                        const data = doc.data();
                        fetchedEvents.push({
                            id: doc.id,
                            title: data.title,
                            desc: data.desc,
                            targetSignatures: data.targetSignatures || 0,
                            signatures: 0,
                            signed: false
                        });
                    });
                    STATE.campaigns = fetchedEvents;
                    renderCampaigns();
                    saveState();
                }
            });
        }

        // Save back mock data if local storage was empty
        saveState();
    }

    // Save State Helper
    function saveState() {
        localStorage.setItem("sfi_news", JSON.stringify(STATE.news));
        localStorage.setItem("sfi_campaigns", JSON.stringify(STATE.campaigns));
        localStorage.setItem("sfi_members", JSON.stringify(STATE.members));
        localStorage.setItem("sfi_grievances", JSON.stringify(STATE.grievances));
        localStorage.setItem("sfi_theme", STATE.theme);
        localStorage.setItem("sfi_lang", STATE.language);
        localStorage.setItem("sfi_dk_site_content", JSON.stringify(STATE.siteContent));
    }

    // --- Theme Switcher ---
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener("click", () => {
            STATE.theme = STATE.theme === "dark" ? "light" : "dark";
            document.documentElement.setAttribute("data-theme", STATE.theme);
            saveState();
        });
    }

    // --- Language Switcher ---
    if (langToggleBtn) {
        langToggleBtn.addEventListener("click", () => {
            STATE.language = STATE.language === "en" ? "kn" : "en";
            saveState();
            applyLanguage();
        });
    }

    // --- Mobile Menu Toggle ---
    if (mobileMenuBtn && mainNav) {
        mobileMenuBtn.addEventListener("click", () => {
            mobileMenuBtn.classList.toggle("active");
            mainNav.classList.toggle("mobile-active");
        });

        // Close mobile menu on clicking links
        mainNav.addEventListener("click", (e) => {
            if (e.target.classList.contains("nav-link") || e.target.classList.contains("nav-btn")) {
                mobileMenuBtn.classList.remove("active");
                mainNav.classList.remove("mobile-active");
            }
        });
    }

    // --- Global Translations Dictionary & Switcher ---
    const TRANSLATIONS = {
        en: {
                logo_title: "SFI",
                logo_subtitle: "D.K. District",
                nav_home: "Home",
                nav_about: "About Us",
                nav_campaigns: "Campaigns",
                nav_grievance: "Help Desk",
                nav_gallery: "Gallery",
                nav_join: "Join SFI",
                audio_btn: "SFI Songs",
                audio_panel_title: "SFI Struggle Songs",
                top_bar_badge: "DISTRICT CONVENTION 2026",
                top_bar_text: "SFI Dakshina Kannada 19th District Conference — Be Part of the Change",
                top_bar_link: "Get Digital Membership Now →",
                hero_badge: "STUDY & STRUGGLE",
                hero_title: "Independence. Democracy. Socialism.",
                hero_lead: "Students' Federation of India (SFI) is the vanguard organization of progressive, democratic students fighting for equality, education, and student rights in Dakshina Kannada.",
                home_leaders_view_all: "View All Leaders",
                leader1_title: "District President",
                leader1_desc: "Leading campaigns against fee hikes, representing students at state level.",
                leader2_title: "District Secretary",
                leader2_desc: "Coordinating state-level student movements and policy advocacy.",
                leader3_title: "District Treasurer",
                leader3_desc: "Coordinating statewide student welfare programs.",
                leader4_title: "Joint Secretary",
                leader4_desc: "Organizing rallies, seminars, and student awareness programs.",
                leader5_title: "Cultural Secretary",
                leader5_desc: "Promoting art, literature, and cultural programs among students.",
                leadership_intro: "Our district leadership is committed to student welfare and social justice.",
                stat_members: "Active Members",
                stat_colleges: "Colleges",
                stat_campaigns: "Campaigns",
                stat_grievances: "Grievances Resolved",
                about_hero_title: "About SFI",
                about_hero_subtitle: "Students' Federation of India — Fighting for Equal Education",
                about_tab_history: "History",
                about_tab_ideology: "Ideology",
                about_tab_leadership: "Leadership",
                about_tab_structure: "Structure",
                about_tab_articles: "Articles",
                about_tab_taluk_explorer: "Taluk Explorer",
                about_history_p1: "The Students' Federation of India (SFI) was founded in 1970 as the student wing of the Communist Party of India (Marxist). It has been at the forefront of progressive student movements across India.",
                about_history_p2: "In Dakshina Kannada, SFI has a rich history of fighting for students' rights, free education, and social justice. The district unit has been instrumental in raising voice against fee hikes and discrimination.",
                history_t1_title: "1970 — Foundation",
                history_t1_desc: "SFI was established as a national student organization committed to progressive education and student rights.",
                history_t2_title: "1985 — DK Unit",
                history_t2_desc: "Dakshina Kannada district unit was formally established, growing into one of the strongest units.",
                history_t3_title: "2024 — Today",
                history_t3_desc: "Continuing to fight for students across 7 taluks with digital tools and grassroots activism.",
                ideology1_title: "Scientific Outlook",
                ideology1_desc: "Promoting rational, scientific thinking and evidence-based education.",
                ideology2_title: "Secularism",
                ideology2_desc: "Upholding the secular values of the Indian constitution in campus life.",
                ideology3_title: "Social Justice",
                ideology3_desc: "Fighting for equal access to education for all students regardless of background.",
                ideology_intro: "SFI's ideology is rooted in Marxist principles of equality, scientific temper, and social justice.",
                struct_central_title: "Central Committee",
                struct_central_desc: "The apex body of SFI at the national level, guiding policy and direction.",
                struct_state_title: "State Committee",
                struct_state_desc: "Karnataka state-level committee coordinating district units.",
                struct_district_title: "District Committee",
                struct_district_desc: "Dakshina Kannada District Committee — our primary operational unit.",
                struct_taluk_title: "Taluk Unit",
                struct_taluk_desc: "Seven taluk-level units covering all of Dakshina Kannada.",
                struct_unit_title: "Campus Unit",
                struct_unit_desc: "Active units in every college and school in the district.",
                structure_intro: "SFI follows a democratic centralist structure from campus to national level.",
                articles_title: "Student Articles",
                articles_subtitle: "Voices from the student community",
                art1_title: "The Crisis in Public Education",
                art1_tag: "Education",
                art1_meta: "May 2025 · 5 min read",
                art1_excerpt: "Analyzing the systematic undermining of government colleges and the push for privatization.",
                art2_title: "Student Rights in the Digital Age",
                art2_tag: "Technology",
                art2_meta: "April 2025 · 4 min read",
                art2_excerpt: "How digital literacy and access to technology is becoming a new dimension of student rights.",
                btn_read_article: "Read Article",
                btn_submit_article: "Submit Your Article",
                taluk_exp_title: "Taluk Explorer",
                taluk_exp_desc: "Explore SFI units and activities across Dakshina Kannada taluks.",
                taluk_all: "All Taluks",
                taluk_mangaluru: "Mangaluru",
                taluk_bantwal: "Bantwal",
                taluk_puttur: "Puttur",
                taluk_sullia: "Sullia",
                taluk_belthangady: "Belthangady",
                tbtn_mangaluru: "Mangaluru",
                tbtn_bantwal: "Bantwal",
                tbtn_puttur: "Puttur",
                tbtn_sullia: "Sullia",
                tbtn_belthangady: "Belthangady",
                tbtn_kadaba: "Kadaba",
                tbtn_moodbidri: "Moodbidri",
                campaigns_hero_title: "Campaigns & Events",
                campaigns_hero_subtitle: "Our ongoing battles for student rights",
                tab_buspass: "Bus Pass Rights",
                tab_helpline: "Student Helpline",
                tab_leadership: "Leadership Programs",
                tab_resources: "Study Resources",
                mm_history_title: "History & Ideology",
                mm_history_desc: "Our struggle for free, equal education",
                mm_leadership_title: "District Leadership",
                mm_leadership_desc: "Meet our District Committee",
                mm_bus_title: "Student Bus Pass Rights",
                mm_bus_desc: "Demanding special KSRTC buses across DK",
                mm_study_title: "Save Public Education",
                mm_study_desc: "Fighting commercialization and fee hikes",
                events_title: "Upcoming Events",
                events_subtitle: "Join us in our upcoming programs",
                events_badge: "EVENTS",
                e1_title: "District Convention 2026",
                e1_desc: "The 19th SFI DK District Convention — A gathering of student voices.",
                e2_title: "Fee Hike Protest March",
                e2_desc: "Statewide protest against university fee hikes and commercialization.",
                e3_title: "Campus Leadership Workshop",
                e3_desc: "A workshop for campus unit leaders on organizing and advocacy.",
                etag_assembly: "Assembly",
                etag_buspass: "Bus Pass",
                etag_seminar: "Seminar",
                stack_title: "Student Campaigns",
                stack_subtitle: "Sign petitions and support our causes",
                stack_badge: "CAMPAIGNS",
                btn_remind_me: "Set Reminder",
                news_title: "Latest News",
                news_subtitle: "Stay updated with SFI DK",
                news_header: "Student News",
                news_badge: "NEWS",
                press_title: "Press Releases",
                press_subtitle: "Official statements and media releases",
                press_badge: "PRESS",
                pr1_title: "SFI DK Statement on KSRTC Bus Pass Issue",
                pr1_desc: "Official statement demanding restoration of student bus pass benefits.",
                pr2_title: "District Convention Announcement",
                pr2_desc: "SFI DK announces the 19th District Convention for 2026.",
                btn_download_statement: "Download Statement PDF",
                grievance_hero_title: "Help Desk",
                grievance_hero_subtitle: "Submit your grievance — we are here to help",
                grievance_form_title: "Submit a Grievance",
                grievance_form_desc: "Fill in the form below and our team will respond within 48 hours.",
                anon_title: "Anonymous Complaint Box",
                anon_subtitle: "Report without revealing your identity",
                anon_desc: "Your anonymity is fully protected. No personal data is collected.",
                anon_badge: "ANONYMOUS",
                anon_type_label: "Type of Issue",
                anon_desc_label: "Describe your issue",
                anon_college_label: "College (Optional)",
                label_name: "Full Name",
                label_phone: "Phone Number",
                label_email: "Email Address",
                label_college: "College / Institution",
                label_course: "Course",
                label_year: "Year",
                label_taluk: "Taluk",
                label_dob: "Date of Birth",
                label_category: "Category",
                label_description: "Description",
                label_anonymous: "Submit Anonymously",
                label_declaration: "I declare that the information provided is true and correct.",
                opt_select_taluk: "-- Select Taluk --",
                opt_select_year: "-- Select Year --",
                opt_y1: "1st Year",
                opt_y2: "2nd Year",
                opt_y3: "3rd Year",
                opt_y4: "4th Year / Final Year",
                opt_pu1: "PUC 1",
                opt_pu2: "PUC 2",
                btn_submit_grievance: "Submit Grievance",
                grievance_success_title: "Grievance Submitted!",
                grievance_success_msg1: "Your grievance has been successfully registered.",
                grievance_success_msg2: "Our team will review and respond within 48 hours.",
                grievance_another_btn: "Submit Another Grievance",
                helpline_title: "Student Helpline",
                helpline_desc: "Call our helpline for immediate assistance with any student issues.",
                res_bus: "Bus Pass Guide",
                res_mu: "MU Question Papers",
                res_ssp: "Scholarship Guide",
                resources_title: "Study Resources",
                resources_desc: "Free educational resources for all students",
                lib_title: "Student Library",
                lib_subtitle: "Access free study materials",
                lib_badge: "LIBRARY",
                lib_card1_title: "MU Question Papers",
                lib_card1_desc: "Previous year question papers for Mangalore University.",
                lib_card2_title: "PUC Notes",
                lib_card2_desc: "Comprehensive notes for PUC students.",
                lib_card3_title: "Competitive Exams",
                lib_card3_desc: "Study material for UPSC, banking and other competitive exams.",
                lib_btn_download_pdf: "Download PDF",
                lib_btn_download_zip: "Download ZIP",
                lib_btn_download_material: "Download Material",
                btn_download_statement: "Download PDF",
                coach_title: "Free Coaching",
                coach_subtitle: "SFI's free coaching program for students",
                coach_badge: "COACHING",
                coach_name: "Your Name",
                coach_phone: "Phone Number",
                coach_course: "Select Course",
                opt_coach_select: "-- Select Course --",
                opt_coach_general: "General Studies",
                opt_coach_upsc: "UPSC / KAS",
                opt_coach_banking: "Banking Exams",
                opt_coach_net: "NET / GATE",
                btn_register_coach: "Register for Coaching",
                blood_title: "Blood Donor Network",
                blood_subtitle: "Connect with blood donors across DK",
                blood_badge: "BLOOD DONORS",
                gallery_hero_title: "Photo Gallery",
                gallery_hero_subtitle: "Moments from our campaigns and events",
                filter_all: "All",
                filter_protest: "Protests",
                filter_seminar: "Seminars",
                filter_cultural: "Cultural",
                filter_meet: "Meetings",
                filter_video: "Videos",
                video_section_title: "Video Gallery",
                video_section_subtitle: "Watch our campaigns in action",
                v1_title: "Fee Hike Protest March",
                v1_desc: "Students march against university fee hikes.",
                v2_title: "District Convention Highlights",
                v2_desc: "Highlights from the 18th District Convention.",
                vtag_protest: "Protest",
                vtag_conference: "Conference",
                join_hero_title: "Join SFI",
                join_hero_subtitle: "Become part of the movement for student rights",
                join_form_title: "Membership Application",
                join_form_desc: "Fill in the form below to join SFI Dakshina Kannada.",
                step1_label: "Personal Details",
                step2_label: "Payment",
                step3_label: "Membership Card",
                payment_title: "Membership Fee Payment",
                payment_desc: "Pay ₹50 membership fee via UPI to complete your registration.",
                payment_badge: "PAYMENT",
                upi_label: "UPI ID",
                timer_title: "Payment Timer",
                timer_note: "Complete payment within the given time.",
                btn_confirm_payment: "I Have Paid — Confirm",
                btn_next_payment: "Proceed to Payment",
                btn_back_form: "← Go Back",
                verify_title: "Verify Payment",
                verify_subtitle: "Enter your transaction ID to verify payment.",
                verify_badge: "VERIFY",
                verify_btn: "Verify & Get Card",
                ticket_title: "Membership Card",
                ticket_subtitle: "SFI DK Digital Membership",
                ticket_label_name: "Name",
                ticket_label_id: "Member ID",
                ticket_label_college: "College",
                ticket_label_course: "Course",
                ticket_label_taluk: "Taluk",
                ticket_label_date: "Date of Joining",
                ticket_footer: "Students' Federation of India — Dakshina Kannada",
                join_success_congrats: "Congratulations! You are now a member of SFI DK.",
                join_success_info: "Your digital membership card is ready. Download it below.",
                join_download_card: "Download Membership Card",
                join_register_another: "Register Another Member",
                poll_title: "Student Poll",
                poll_subtitle: "Your opinion matters",
                poll_badge: "POLL",
                poll_q1: "What is the most important student issue in DK?",
                poll_o1: "Bus Pass Rights",
                poll_o2: "Fee Hike",
                poll_voted: "Thank you for voting!",
                faq_title: "Frequently Asked Questions",
                faq_subtitle: "Answers to common questions about SFI and membership",
                faq_badge: "FAQ",
                faq_q1: "How do I join SFI?",
                faq_a1: "You can join SFI by filling out the membership form in the 'Join SFI' section and paying the nominal membership fee of ₹50 via UPI.",
                faq_q2: "Is there any age limit to join?",
                faq_a2: "SFI membership is open to all students between 14 and 28 years of age who are enrolled in a recognized educational institution.",
                faq_q3: "How can I submit a grievance?",
                faq_a3: "Go to the 'Help Desk' section and fill out the grievance form. You can also submit anonymously. Our team responds within 48 hours.",
                faq_q4: "What activities does SFI DK organize?",
                faq_a4: "We organize protest marches, seminars, leadership workshops, free coaching programs, cultural events, and blood donation drives.",
                cta_title: "Join the Movement",
                cta_subtitle: "Be part of the change — fight for student rights with SFI DK",
                cta_btn: "Join SFI Today",
                achieve_title: "Our Achievements",
                achieve_subtitle: "What we have accomplished together",
                achieve_badge: "ACHIEVEMENTS",
                wa_title: "WhatsApp Community",
                wa_desc: "Join our WhatsApp community for updates and announcements.",
                wa_tooltip: "Join WhatsApp Group",
                amb_title: "Campus Ambassador",
                amb_subtitle: "Represent SFI in your college",
                btn_apply_ambassador: "Apply as Ambassador",
                vulcan_title: "Vulcan Shield",
                vulcan_desc: "SFI's anti-ragging and campus safety initiative.",
                vulcan_badge: "SAFE CAMPUS",
                vulcan_btn: "Report Ragging",
                unit_dir_title: "Unit Directory",
                unit_dir_subtitle: "Find SFI units in your college",
                admin_portal_title: "Admin Portal",
                admin_portal_desc: "Manage SFI DK website content",
                admin_auth_btn: "Login",
                admin_auth_error: "Invalid password. Please try again.",
                admin_password_label: "Admin Password",
                admin_dashboard_title: "Admin Dashboard",
                admin_dashboard_subtitle: "Manage all site content",
                admin_logout_btn: "Logout",
                admin_news_title: "Manage News",
                admin_news_desc: "Add, edit or remove news articles",
                admin_tab_news: "News",
                admin_tab_members: "Members",
                admin_tab_grievances: "Grievances",
                office_address_title: "District Office",
                office_address: "SFI DK District Office, Mangaluru",
                office_email: "sfidkdistrict@gmail.com",
                office_mangaluru: "Mangaluru",
                footer_org_name: "SFI Dakshina Kannada",
                footer_motto: "Study. Struggle. Progress.",
                footer_copyright: "© 2025 SFI Dakshina Kannada. All rights reserved.",
                footer_sub_text: "Students' Federation of India — Building a better tomorrow through student power.",
                anon_title: "Anonymous Complaint Box",
                anon_desc: "Your identity is completely protected.",
            },
            kn: {
                logo_title: "ಎಸ್‌ಎಫ್‌ಐ",
                logo_subtitle: "ದ.ಕ. ಜಿಲ್ಲೆ",
                nav_home: "ಮುಖಪುಟ",
                nav_about: "ನಮ್ಮ ಬಗ್ಗೆ",
                nav_campaigns: "ಅಭಿಯಾನಗಳು",
                nav_grievance: "ಸಹಾಯ ಕೇಂದ್ರ",
                nav_gallery: "ಗ್ಯಾಲರಿ",
                nav_join: "ಎಸ್‌ಎಫ್‌ಐ ಸೇರಿ",
                audio_btn: "ಎಸ್‌ಎಫ್‌ಐ ಹಾಡುಗಳು",
                audio_panel_title: "ಎಸ್‌ಎಫ್‌ಐ ಹೋರಾಟದ ಹಾಡುಗಳು",
                top_bar_badge: "ಜಿಲ್ಲಾ ಸಮ್ಮೇಳನ 2026",
                top_bar_text: "ಎಸ್‌ಎಫ್‌ಐ ದಕ್ಷಿಣ ಕನ್ನಡ 19ನೇ ಜಿಲ್ಲಾ ಅಧಿವೇಶನ — ಬದಲಾವಣೆಯ ಭಾಗವಾಗಿ",
                top_bar_link: "ಡಿಜಿಟಲ್ ಸದಸ್ಯತ್ವ ಪಡೆಯಿರಿ →",
                hero_badge: "ಅಭ್ಯಾಸ ಮತ್ತು ಹೋರಾಟ",
                hero_title: "ಸ್ವಾತಂತ್ರ್ಯ. ಪ್ರಜಾಪ್ರಭುತ್ವ. ಸಮಾಜವಾದ.",
                hero_lead: "ಸ್ಟೂಡೆಂಟ್ಸ್ ಫೆಡರೇಷನ್ ಆಫ್ ಇಂಡಿಯಾ — ನಾಳಿನ ನಾಯಕರನ್ನು ಇಂದು ರೂಪಿಸುತ್ತಿದ್ದೇವೆ",
                home_leaders_view_all: "ಎಲ್ಲಾ ನಾಯಕರನ್ನು ನೋಡಿ",
                leader1_title: "ಜಿಲ್ಲಾ ಅಧ್ಯಕ್ಷ",
                leader1_desc: "ಶುಲ್ಕ ಏರಿಕೆ ವಿರುದ್ಧ ಅಭಿಯಾನ ನಡೆಸುತ್ತಿದ್ದಾರೆ, ರಾಜ್ಯ ಮಟ್ಟದಲ್ಲಿ ವಿದ್ಯಾರ್ಥಿಗಳ ಪ್ರತಿನಿಧಿ.",
                leader2_title: "ಜಿಲ್ಲಾ ಕಾರ್ಯದರ್ಶಿ",
                leader2_desc: "ರಾಜ್ಯ ಮಟ್ಟದ ವಿದ್ಯಾರ್ಥಿ ಚಳವಳಿ ಸಂಘಟನೆ ಮತ್ತು ನೀತಿ ಪ್ರತಿಪಾದನೆ.",
                leader3_title: "ಜಿಲ್ಲಾ ಖಜಾಂಚಿ",
                leader3_desc: "ರಾಜ್ಯಾದ್ಯಂತ ವಿದ್ಯಾರ್ಥಿ ಕಲ್ಯಾಣ ಕಾರ್ಯಕ್ರಮ ಸಂಘಟನೆ.",
                leader4_title: "ಜಂಟಿ ಕಾರ್ಯದರ್ಶಿ",
                leader4_desc: "ಸಮಾವೇಶ, ವಿಚಾರ ಸಂಕಿರಣ ಮತ್ತು ವಿದ್ಯಾರ್ಥಿ ಜಾಗೃತಿ ಕಾರ್ಯಕ್ರಮ ಆಯೋಜನೆ.",
                leader5_title: "ಸಾಂಸ್ಕೃತಿಕ ಕಾರ್ಯದರ್ಶಿ",
                leader5_desc: "ವಿದ್ಯಾರ್ಥಿಗಳಲ್ಲಿ ಕಲೆ, ಸಾಹಿತ್ಯ ಮತ್ತು ಸಾಂಸ್ಕೃತಿಕ ಕಾರ್ಯಕ್ರಮಗಳ ಉತ್ತೇಜನ.",
                leadership_intro: "ನಮ್ಮ ಜಿಲ್ಲಾ ನಾಯಕತ್ವ ವಿದ್ಯಾರ್ಥಿ ಕಲ್ಯಾಣ ಮತ್ತು ಸಾಮಾಜಿಕ ನ್ಯಾಯಕ್ಕೆ ಬದ್ಧವಾಗಿದೆ.",
                stat_members: "ಸಕ್ರಿಯ ಸದಸ್ಯರು",
                stat_colleges: "ಕಾಲೇಜುಗಳು",
                stat_campaigns: "ಅಭಿಯಾನಗಳು",
                stat_grievances: "ದೂರು ಪರಿಹಾರ",
                about_hero_title: "ಎಸ್‌ಎಫ್‌ಐ ಬಗ್ಗೆ",
                about_hero_subtitle: "ಸ್ಟೂಡೆಂಟ್ಸ್ ಫೆಡರೇಷನ್ ಆಫ್ ಇಂಡಿಯಾ — ಸಮಾನ ಶಿಕ್ಷಣಕ್ಕಾಗಿ ಹೋರಾಟ",
                about_tab_history: "ಇತಿಹಾಸ",
                about_tab_ideology: "ಸಿದ್ಧಾಂತ",
                about_tab_leadership: "ನಾಯಕತ್ವ",
                about_tab_structure: "ರಚನೆ",
                about_tab_articles: "ಲೇಖನಗಳು",
                about_tab_taluk_explorer: "ತಾಲೂಕು ಅನ್ವೇಷಣೆ",
                about_history_p1: "ಸ್ಟೂಡೆಂಟ್ಸ್ ಫೆಡರೇಷನ್ ಆಫ್ ಇಂಡಿಯಾ (ಎಸ್‌ಎಫ್‌ಐ) 1970ರಲ್ಲಿ ಕಮ್ಯುನಿಸ್ಟ್ ಪಾರ್ಟಿ ಆಫ್ ಇಂಡಿಯಾ (ಮಾರ್ಕ್ಸ್‌ವಾದಿ) ವಿದ್ಯಾರ್ಥಿ ವಿಭಾಗವಾಗಿ ಸ್ಥಾಪನೆಯಾಯಿತು.",
                about_history_p2: "ದಕ್ಷಿಣ ಕನ್ನಡದಲ್ಲಿ ಎಸ್‌ಎಫ್‌ಐ ವಿದ್ಯಾರ್ಥಿ ಹಕ್ಕುಗಳು, ಉಚಿತ ಶಿಕ್ಷಣ ಮತ್ತು ಸಾಮಾಜಿಕ ನ್ಯಾಯಕ್ಕಾಗಿ ಹೋರಾಡಿದ ಶ್ರೀಮಂತ ಇತಿಹಾಸ ಹೊಂದಿದೆ.",
                history_t1_title: "1970 — ಸ್ಥಾಪನೆ",
                history_t1_desc: "ಎಸ್‌ಎಫ್‌ಐ ರಾಷ್ಟ್ರೀಯ ವಿದ್ಯಾರ್ಥಿ ಸಂಘಟನೆಯಾಗಿ ಸ್ಥಾಪನೆ.",
                history_t2_title: "1985 — ದ.ಕ. ಘಟಕ",
                history_t2_desc: "ದಕ್ಷಿಣ ಕನ್ನಡ ಜಿಲ್ಲಾ ಘಟಕ ಅಧಿಕೃತವಾಗಿ ಸ್ಥಾಪನೆ.",
                history_t3_title: "2024 — ಇಂದು",
                history_t3_desc: "7 ತಾಲೂಕುಗಳಲ್ಲಿ ವಿದ್ಯಾರ್ಥಿಗಳಿಗಾಗಿ ಹೋರಾಟ ಮುಂದುವರೆಯುತ್ತಿದೆ.",
                ideology1_title: "ವೈಜ್ಞಾನಿಕ ದೃಷ್ಟಿ",
                ideology1_desc: "ವೈಚಾರಿಕ, ವೈಜ್ಞಾನಿಕ ಚಿಂತನೆ ಮತ್ತು ಸಾಕ್ಷ್ಯ ಆಧಾರಿತ ಶಿಕ್ಷಣ.",
                ideology2_title: "ಜಾತ್ಯತೀತತೆ",
                ideology2_desc: "ಕ್ಯಾಂಪಸ್ ಜೀವನದಲ್ಲಿ ಭಾರತ ಸಂವಿಧಾನದ ಜಾತ್ಯತೀತ ಮೌಲ್ಯಗಳ ಎತ್ತಿಹಿಡಿಯುವಿಕೆ.",
                ideology3_title: "ಸಾಮಾಜಿಕ ನ್ಯಾಯ",
                ideology3_desc: "ಎಲ್ಲ ವಿದ್ಯಾರ್ಥಿಗಳಿಗೆ ಸಮಾನ ಶಿಕ್ಷಣ ಪ್ರವೇಶಕ್ಕಾಗಿ ಹೋರಾಟ.",
                ideology_intro: "ಎಸ್‌ಎಫ್‌ಐ ಸಿದ್ಧಾಂತ ಸಮಾನತೆ, ವೈಜ್ಞಾನಿಕ ಮನೋಭಾವ ಮತ್ತು ಸಾಮಾಜಿಕ ನ್ಯಾಯದ ಮಾರ್ಕ್ಸ್‌ವಾದಿ ತತ್ವಗಳಲ್ಲಿ ಬೇರೂರಿದೆ.",
                struct_central_title: "ಕೇಂದ್ರ ಸಮಿತಿ",
                struct_central_desc: "ರಾಷ್ಟ್ರ ಮಟ್ಟದಲ್ಲಿ ಎಸ್‌ಎಫ್‌ಐ ಸರ್ವೋಚ್ಚ ಸಂಸ್ಥೆ.",
                struct_state_title: "ರಾಜ್ಯ ಸಮಿತಿ",
                struct_state_desc: "ಕರ್ನಾಟಕ ರಾಜ್ಯ ಮಟ್ಟದ ಸಮಿತಿ.",
                struct_district_title: "ಜಿಲ್ಲಾ ಸಮಿತಿ",
                struct_district_desc: "ದಕ್ಷಿಣ ಕನ್ನಡ ಜಿಲ್ಲಾ ಸಮಿತಿ — ನಮ್ಮ ಪ್ರಾಥಮಿಕ ಕಾರ್ಯಾಚರಣಾ ಘಟಕ.",
                struct_taluk_title: "ತಾಲೂಕು ಘಟಕ",
                struct_taluk_desc: "ದಕ್ಷಿಣ ಕನ್ನಡವನ್ನು ಒಳಗೊಂಡ ಏಳು ತಾಲೂಕು ಘಟಕಗಳು.",
                struct_unit_title: "ಕ್ಯಾಂಪಸ್ ಘಟಕ",
                struct_unit_desc: "ಜಿಲ್ಲೆಯ ಪ್ರತಿ ಕಾಲೇಜು ಮತ್ತು ಶಾಲೆಯಲ್ಲಿ ಸಕ್ರಿಯ ಘಟಕಗಳು.",
                structure_intro: "ಎಸ್‌ಎಫ್‌ಐ ಕ್ಯಾಂಪಸ್‌ನಿಂದ ರಾಷ್ಟ್ರ ಮಟ್ಟದವರೆಗೆ ಪ್ರಜಾಸತ್ತಾತ್ಮಕ ಕೇಂದ್ರೀಯ ರಚನೆ ಅನುಸರಿಸುತ್ತದೆ.",
                articles_title: "ವಿದ್ಯಾರ್ಥಿ ಲೇಖನಗಳು",
                articles_subtitle: "ವಿದ್ಯಾರ್ಥಿ ಸಮುದಾಯದ ಧ್ವನಿಗಳು",
                art1_title: "ಸಾರ್ವಜನಿಕ ಶಿಕ್ಷಣದಲ್ಲಿ ಬಿಕ್ಕಟ್ಟು",
                art1_tag: "ಶಿಕ್ಷಣ",
                art1_meta: "ಮೇ 2025 · 5 ನಿಮಿಷ ಓದು",
                art1_excerpt: "ಸರ್ಕಾರಿ ಕಾಲೇಜುಗಳ ಯೋಜನಾಬದ್ಧ ದುರ್ಬಲಗೊಳಿಸುವಿಕೆ ಮತ್ತು ಖಾಸಗೀಕರಣದ ವಿಶ್ಲೇಷಣೆ.",
                art2_title: "ಡಿಜಿಟಲ್ ಯುಗದಲ್ಲಿ ವಿದ್ಯಾರ್ಥಿ ಹಕ್ಕುಗಳು",
                art2_tag: "ತಂತ್ರಜ್ಞಾನ",
                art2_meta: "ಏಪ್ರಿಲ್ 2025 · 4 ನಿಮಿಷ ಓದು",
                art2_excerpt: "ಡಿಜಿಟಲ್ ಸಾಕ್ಷರತೆ ಮತ್ತು ತಂತ್ರಜ್ಞಾನ ಪ್ರವೇಶ ವಿದ್ಯಾರ್ಥಿ ಹಕ್ಕಿನ ಹೊಸ ಆಯಾಮವಾಗಿದೆ.",
                btn_read_article: "ಲೇಖನ ಓದಿ",
                btn_submit_article: "ಲೇಖನ ಸಲ್ಲಿಸಿ",
                taluk_exp_title: "ತಾಲೂಕು ಅನ್ವೇಷಣೆ",
                taluk_exp_desc: "ದಕ್ಷಿಣ ಕನ್ನಡ ತಾಲೂಕುಗಳಲ್ಲಿ ಎಸ್‌ಎಫ್‌ಐ ಘಟಕಗಳು ಮತ್ತು ಚಟುವಟಿಕೆಗಳನ್ನು ಅನ್ವೇಷಿಸಿ.",
                taluk_all: "ಎಲ್ಲ ತಾಲೂಕುಗಳು",
                taluk_mangaluru: "ಮಂಗಳೂರು",
                taluk_bantwal: "ಬಂಟ್ವಾಳ",
                taluk_puttur: "ಪುತ್ತೂರು",
                taluk_sullia: "ಸುಳ್ಯ",
                taluk_belthangady: "ಬೆಳ್ತಂಗಡಿ",
                tbtn_mangaluru: "ಮಂಗಳೂರು",
                tbtn_bantwal: "ಬಂಟ್ವಾಳ",
                tbtn_puttur: "ಪುತ್ತೂರು",
                tbtn_sullia: "ಸುಳ್ಯ",
                tbtn_belthangady: "ಬೆಳ್ತಂಗಡಿ",
                tbtn_kadaba: "ಕಡಬ",
                tbtn_moodbidri: "ಮೂಡುಬಿದಿರೆ",
                campaigns_hero_title: "ಅಭಿಯಾನಗಳು & ಕಾರ್ಯಕ್ರಮಗಳು",
                campaigns_hero_subtitle: "ವಿದ್ಯಾರ್ಥಿ ಹಕ್ಕುಗಳಿಗಾಗಿ ನಮ್ಮ ನಿರಂತರ ಹೋರಾಟ",
                tab_buspass: "ಬಸ್ ಪಾಸ್ ಹಕ್ಕು",
                tab_helpline: "ವಿದ್ಯಾರ್ಥಿ ಸಹಾಯವಾಣಿ",
                tab_leadership: "ನಾಯಕತ್ವ ಕಾರ್ಯಕ್ರಮ",
                tab_resources: "ಅಧ್ಯಯನ ಸಂಪನ್ಮೂಲ",
                mm_history_title: "ಇತಿಹಾಸ & ಸಿದ್ಧಾಂತ",
                mm_history_desc: "ಉಚಿತ, ಸಮಾನ ಶಿಕ್ಷಣಕ್ಕಾಗಿ ನಮ್ಮ ಹೋರಾಟ",
                mm_leadership_title: "ಜಿಲ್ಲಾ ನಾಯಕತ್ವ",
                mm_leadership_desc: "ನಮ್ಮ ಜಿಲ್ಲಾ ಸಮಿತಿ ಭೇಟಿ",
                mm_bus_title: "ವಿದ್ಯಾರ್ಥಿ ಬಸ್ ಪಾಸ್ ಹಕ್ಕು",
                mm_bus_desc: "ದ.ಕ. ಉದ್ದಕ್ಕೂ ವಿಶೇಷ KSRTC ಬಸ್‌ಗಳ ಬೇಡಿಕೆ",
                mm_study_title: "ಸಾರ್ವಜನಿಕ ಶಿಕ್ಷಣ ಉಳಿಸಿ",
                mm_study_desc: "ವ್ಯಾಪಾರೀಕರಣ ಮತ್ತು ಶುಲ್ಕ ಏರಿಕೆ ವಿರುದ್ಧ ಹೋರಾಟ",
                events_title: "ಮುಂಬರುವ ಕಾರ್ಯಕ್ರಮಗಳು",
                events_subtitle: "ನಮ್ಮ ಮುಂಬರುವ ಕಾರ್ಯಕ್ರಮಗಳಲ್ಲಿ ಭಾಗವಹಿಸಿ",
                events_badge: "ಕಾರ್ಯಕ್ರಮಗಳು",
                e1_title: "ಜಿಲ್ಲಾ ಅಧಿವೇಶನ 2026",
                e1_desc: "19ನೇ ಎಸ್‌ಎಫ್‌ಐ ದ.ಕ. ಜಿಲ್ಲಾ ಅಧಿವೇಶನ.",
                e2_title: "ಶುಲ್ಕ ಏರಿಕೆ ಪ್ರತಿಭಟನಾ ಮೆರವಣಿಗೆ",
                e2_desc: "ವಿಶ್ವವಿದ್ಯಾಲಯ ಶುಲ್ಕ ಏರಿಕೆ ವಿರುದ್ಧ ರಾಜ್ಯಾದ್ಯಂತ ಪ್ರತಿಭಟನೆ.",
                e3_title: "ಕ್ಯಾಂಪಸ್ ನಾಯಕತ್ವ ಕಾರ್ಯಾಗಾರ",
                e3_desc: "ಕ್ಯಾಂಪಸ್ ಘಟಕ ನಾಯಕರಿಗೆ ಸಂಘಟನೆ ಮತ್ತು ಪ್ರತಿಪಾದನೆ ಕಾರ್ಯಾಗಾರ.",
                etag_assembly: "ಸಭೆ",
                etag_buspass: "ಬಸ್ ಪಾಸ್",
                etag_seminar: "ವಿಚಾರ ಸಂಕಿರಣ",
                stack_title: "ವಿದ್ಯಾರ್ಥಿ ಅಭಿಯಾನಗಳು",
                stack_subtitle: "ಅರ್ಜಿಗಳಿಗೆ ಸಹಿ ಹಾಕಿ ಮತ್ತು ನಮ್ಮ ಕಾರ್ಯಗಳನ್ನು ಬೆಂಬಲಿಸಿ",
                stack_badge: "ಅಭಿಯಾನಗಳು",
                btn_remind_me: "ನೆನಪೂಟ ಹೊಂದಿಸಿ",
                news_title: "ಇತ್ತೀಚಿನ ಸುದ್ದಿ",
                news_subtitle: "ಎಸ್‌ಎಫ್‌ಐ ದ.ಕ. ಜೊತೆ ನವೀಕೃತರಾಗಿ",
                news_header: "ವಿದ್ಯಾರ್ಥಿ ಸುದ್ದಿ",
                news_badge: "ಸುದ್ದಿ",
                press_title: "ಪತ್ರಿಕಾ ಪ್ರಕಟಣೆಗಳು",
                press_subtitle: "ಅಧಿಕೃತ ಹೇಳಿಕೆಗಳು ಮತ್ತು ಮಾಧ್ಯಮ ಪ್ರಕಟಣೆಗಳು",
                press_badge: "ಪತ್ರಿಕಾ",
                pr1_title: "KSRTC ಬಸ್ ಪಾಸ್ ವಿಷಯದ ಕುರಿತು ಎಸ್‌ಎಫ್‌ಐ ದ.ಕ. ಹೇಳಿಕೆ",
                pr1_desc: "ವಿದ್ಯಾರ್ಥಿ ಬಸ್ ಪಾಸ್ ಸೌಲಭ್ಯ ಮರುಸ್ಥಾಪನೆ ಬೇಡಿಕೆ ಅಧಿಕೃತ ಹೇಳಿಕೆ.",
                pr2_title: "ಜಿಲ್ಲಾ ಅಧಿವೇಶನ ಘೋಷಣೆ",
                pr2_desc: "ಎಸ್‌ಎಫ್‌ಐ ದ.ಕ. 2026ಕ್ಕೆ 19ನೇ ಜಿಲ್ಲಾ ಅಧಿವೇಶನ ಘೋಷಿಸಿದೆ.",
                btn_download_statement: "ಹೇಳಿಕೆ PDF ಡೌನ್‌ಲೋಡ್",
                grievance_hero_title: "ಸಹಾಯ ಕೇಂದ್ರ",
                grievance_hero_subtitle: "ನಿಮ್ಮ ದೂರು ಸಲ್ಲಿಸಿ — ನಾವು ಸಹಾಯ ಮಾಡಲಿದ್ದೇವೆ",
                grievance_form_title: "ದೂರು ಸಲ್ಲಿಸಿ",
                grievance_form_desc: "ಕೆಳಗಿನ ಫಾರ್ಮ್ ತುಂಬಿ, ನಮ್ಮ ತಂಡ 48 ಗಂಟೆಯಲ್ಲಿ ಪ್ರತಿಕ್ರಿಯಿಸುತ್ತದೆ.",
                anon_title: "ಅನಾಮಧೇಯ ದೂರು ಪೆಟ್ಟಿಗೆ",
                anon_subtitle: "ಗುರುತು ಬಹಿರಂಗಪಡಿಸದೆ ವರದಿ ಮಾಡಿ",
                anon_desc: "ನಿಮ್ಮ ಅನಾಮಧೇಯತೆ ಸಂಪೂರ್ಣ ರಕ್ಷಿತ. ವ್ಯಕ್ತಿಗತ ಮಾಹಿತಿ ಸಂಗ್ರಹಿಸಲಾಗುವುದಿಲ್ಲ.",
                anon_badge: "ಅನಾಮಧೇಯ",
                anon_type_label: "ಸಮಸ್ಯೆ ವಿಧ",
                anon_desc_label: "ನಿಮ್ಮ ಸಮಸ್ಯೆ ವಿವರಿಸಿ",
                anon_college_label: "ಕಾಲೇಜು (ಐಚ್ಛಿಕ)",
                label_name: "ಪೂರ್ಣ ಹೆಸರು",
                label_phone: "ದೂರವಾಣಿ ಸಂಖ್ಯೆ",
                label_email: "ಇ-ಮೇಲ್ ವಿಳಾಸ",
                label_college: "ಕಾಲೇಜು / ಸಂಸ್ಥೆ",
                label_course: "ಕೋರ್ಸ್",
                label_year: "ವರ್ಷ",
                label_taluk: "ತಾಲೂಕು",
                label_dob: "ಜನ್ಮ ದಿನಾಂಕ",
                label_category: "ವರ್ಗ",
                label_description: "ವಿವರಣೆ",
                label_anonymous: "ಅನಾಮಧೇಯವಾಗಿ ಸಲ್ಲಿಸಿ",
                label_declaration: "ಒದಗಿಸಿದ ಮಾಹಿತಿ ನಿಜ ಮತ್ತು ಸರಿ ಎಂದು ಘೋಷಿಸುತ್ತೇನೆ.",
                opt_select_taluk: "-- ತಾಲೂಕು ಆಯ್ಕೆ --",
                opt_select_year: "-- ವರ್ಷ ಆಯ್ಕೆ --",
                opt_y1: "1ನೇ ವರ್ಷ",
                opt_y2: "2ನೇ ವರ್ಷ",
                opt_y3: "3ನೇ ವರ್ಷ",
                opt_y4: "4ನೇ ವರ್ಷ / ಅಂತಿಮ ವರ್ಷ",
                opt_pu1: "ಪಿಯುಸಿ 1",
                opt_pu2: "ಪಿಯುಸಿ 2",
                btn_submit_grievance: "ದೂರು ಸಲ್ಲಿಸಿ",
                grievance_success_title: "ದೂರು ಸಲ್ಲಿಸಲಾಗಿದೆ!",
                grievance_success_msg1: "ನಿಮ್ಮ ದೂರು ಯಶಸ್ವಿಯಾಗಿ ನೋಂದಾಯಿಸಲಾಗಿದೆ.",
                grievance_success_msg2: "ನಮ್ಮ ತಂಡ ಪರಿಶೀಲಿಸಿ 48 ಗಂಟೆಯಲ್ಲಿ ಪ್ರತಿಕ್ರಿಯಿಸುತ್ತದೆ.",
                grievance_another_btn: "ಮತ್ತೊಂದು ದೂರು ಸಲ್ಲಿಸಿ",
                helpline_title: "ವಿದ್ಯಾರ್ಥಿ ಸಹಾಯವಾಣಿ",
                helpline_desc: "ಯಾವುದೇ ವಿದ್ಯಾರ್ಥಿ ಸಮಸ್ಯೆಗೆ ತಕ್ಷಣ ಸಹಾಯಕ್ಕಾಗಿ ನಮ್ಮ ಸಹಾಯವಾಣಿ ಕರೆ ಮಾಡಿ.",
                res_bus: "ಬಸ್ ಪಾಸ್ ಮಾರ್ಗದರ್ಶಿ",
                res_mu: "ಮಂಗಳೂರು ವಿಶ್ವ ಪ್ರಶ್ನೆ ಪತ್ರಿಕೆಗಳು",
                res_ssp: "ವಿದ್ಯಾರ್ಥಿ ವೇತನ ಮಾರ್ಗದರ್ಶಿ",
                resources_title: "ಅಧ್ಯಯನ ಸಂಪನ್ಮೂಲ",
                resources_desc: "ಎಲ್ಲ ವಿದ್ಯಾರ್ಥಿಗಳಿಗೆ ಉಚಿತ ಶೈಕ್ಷಣಿಕ ಸಂಪನ್ಮೂಲ",
                lib_title: "ವಿದ್ಯಾರ್ಥಿ ಗ್ರಂಥಾಲಯ",
                lib_subtitle: "ಉಚಿತ ಅಧ್ಯಯನ ಸಾಮಗ್ರಿ ಪಡೆಯಿರಿ",
                lib_badge: "ಗ್ರಂಥಾಲಯ",
                lib_card1_title: "ಮಂಗಳೂರು ವಿ.ವಿ. ಪ್ರಶ್ನೆ ಪತ್ರಿಕೆಗಳು",
                lib_card1_desc: "ಮಂಗಳೂರು ವಿಶ್ವವಿದ್ಯಾಲಯದ ಹಿಂದಿನ ವರ್ಷದ ಪ್ರಶ್ನೆ ಪತ್ರಿಕೆಗಳು.",
                lib_card2_title: "ಪಿಯುಸಿ ನೋಟ್ಸ್",
                lib_card2_desc: "ಪಿಯುಸಿ ವಿದ್ಯಾರ್ಥಿಗಳಿಗೆ ಸಮಗ್ರ ನೋಟ್ಸ್.",
                lib_card3_title: "ಸ್ಪರ್ಧಾತ್ಮಕ ಪರೀಕ್ಷೆಗಳು",
                lib_card3_desc: "UPSC, ಬ್ಯಾಂಕಿಂಗ್ ಮತ್ತು ಇತರ ಸ್ಪರ್ಧಾತ್ಮಕ ಪರೀಕ್ಷೆಗಳ ಅಧ್ಯಯನ ಸಾಮಗ್ರಿ.",
                lib_btn_download_pdf: "PDF ಡೌನ್‌ಲೋಡ್",
                lib_btn_download_zip: "ZIP ಡೌನ್‌ಲೋಡ್",
                lib_btn_download_material: "ಸಾಮಗ್ರಿ ಡೌನ್‌ಲೋಡ್",
                coach_title: "ಉಚಿತ ತರಬೇತಿ",
                coach_subtitle: "ವಿದ್ಯಾರ್ಥಿಗಳಿಗೆ ಎಸ್‌ಎಫ್‌ಐ ಉಚಿತ ತರಬೇತಿ ಕಾರ್ಯಕ್ರಮ",
                coach_badge: "ತರಬೇತಿ",
                coach_name: "ನಿಮ್ಮ ಹೆಸರು",
                coach_phone: "ದೂರವಾಣಿ ಸಂಖ್ಯೆ",
                coach_course: "ಕೋರ್ಸ್ ಆಯ್ಕೆ",
                opt_coach_select: "-- ಕೋರ್ಸ್ ಆಯ್ಕೆ --",
                opt_coach_general: "ಸಾಮಾನ್ಯ ಅಧ್ಯಯನ",
                opt_coach_upsc: "UPSC / KAS",
                opt_coach_banking: "ಬ್ಯಾಂಕಿಂಗ್ ಪರೀಕ್ಷೆಗಳು",
                opt_coach_net: "NET / GATE",
                btn_register_coach: "ತರಬೇತಿಗೆ ನೋಂದಣಿ",
                blood_title: "ರಕ್ತದಾನಿ ಜಾಲ",
                blood_subtitle: "ದ.ಕ. ಉದ್ದಕ್ಕೂ ರಕ್ತದಾನಿಗಳ ಜೊತೆ ಸಂಪರ್ಕ",
                blood_badge: "ರಕ್ತದಾನಿಗಳು",
                gallery_hero_title: "ಫೋಟೋ ಗ್ಯಾಲರಿ",
                gallery_hero_subtitle: "ನಮ್ಮ ಅಭಿಯಾನ ಮತ್ತು ಕಾರ್ಯಕ್ರಮಗಳ ಕ್ಷಣಗಳು",
                filter_all: "ಎಲ್ಲ",
                filter_protest: "ಪ್ರತಿಭಟನೆ",
                filter_seminar: "ವಿಚಾರ ಸಂಕಿರಣ",
                filter_cultural: "ಸಾಂಸ್ಕೃತಿಕ",
                filter_meet: "ಸಭೆಗಳು",
                filter_video: "ವೀಡಿಯೋ",
                video_section_title: "ವೀಡಿಯೋ ಗ್ಯಾಲರಿ",
                video_section_subtitle: "ನಮ್ಮ ಅಭಿಯಾನಗಳನ್ನು ಕ್ರಿಯೆಯಲ್ಲಿ ನೋಡಿ",
                v1_title: "ಶುಲ್ಕ ಏರಿಕೆ ಪ್ರತಿಭಟನಾ ಮೆರವಣಿಗೆ",
                v1_desc: "ವಿಶ್ವವಿದ್ಯಾಲಯ ಶುಲ್ಕ ಏರಿಕೆ ವಿರುದ್ಧ ವಿದ್ಯಾರ್ಥಿ ಮೆರವಣಿಗೆ.",
                v2_title: "ಜಿಲ್ಲಾ ಅಧಿವೇಶನ ಮುಖ್ಯಾಂಶಗಳು",
                v2_desc: "18ನೇ ಜಿಲ್ಲಾ ಅಧಿವೇಶನದ ಮುಖ್ಯಾಂಶಗಳು.",
                vtag_protest: "ಪ್ರತಿಭಟನೆ",
                vtag_conference: "ಅಧಿವೇಶನ",
                join_hero_title: "ಎಸ್‌ಎಫ್‌ಐ ಸೇರಿ",
                join_hero_subtitle: "ವಿದ್ಯಾರ್ಥಿ ಹಕ್ಕುಗಳ ಚಳವಳಿಯ ಭಾಗವಾಗಿ",
                join_form_title: "ಸದಸ್ಯತ್ವ ಅರ್ಜಿ",
                join_form_desc: "ಎಸ್‌ಎಫ್‌ಐ ದಕ್ಷಿಣ ಕನ್ನಡ ಸೇರಲು ಕೆಳಗಿನ ಫಾರ್ಮ್ ತುಂಬಿ.",
                step1_label: "ವ್ಯಕ್ತಿಗತ ವಿವರ",
                step2_label: "ಪಾವತಿ",
                step3_label: "ಸದಸ್ಯತ್ವ ಕಾರ್ಡ್",
                payment_title: "ಸದಸ್ಯತ್ವ ಶುಲ್ಕ ಪಾವತಿ",
                payment_desc: "ನೋಂದಣಿ ಪೂರ್ಣಗೊಳಿಸಲು UPI ಮೂಲಕ ₹50 ಸದಸ್ಯತ್ವ ಶುಲ್ಕ ಪಾವತಿ ಮಾಡಿ.",
                payment_badge: "ಪಾವತಿ",
                upi_label: "UPI ID",
                timer_title: "ಪಾವತಿ ಟೈಮರ್",
                timer_note: "ನಿಗದಿತ ಸಮಯದಲ್ಲಿ ಪಾವತಿ ಪೂರ್ಣಗೊಳಿಸಿ.",
                btn_confirm_payment: "ಪಾವತಿ ಮಾಡಿದ್ದೇನೆ — ಖಚಿತಪಡಿಸಿ",
                btn_next_payment: "ಪಾವತಿಗೆ ಮುಂದುವರಿ",
                btn_back_form: "← ಹಿಂದಕ್ಕೆ",
                verify_title: "ಪಾವತಿ ಪರಿಶೀಲನೆ",
                verify_subtitle: "ಪಾವತಿ ಪರಿಶೀಲಿಸಲು ನಿಮ್ಮ ವ್ಯವಹಾರ ID ನಮೂದಿಸಿ.",
                verify_badge: "ಪರಿಶೀಲನೆ",
                verify_btn: "ಪರಿಶೀಲಿಸಿ & ಕಾರ್ಡ್ ಪಡೆಯಿರಿ",
                ticket_title: "ಸದಸ್ಯತ್ವ ಕಾರ್ಡ್",
                ticket_subtitle: "ಎಸ್‌ಎಫ್‌ಐ ದ.ಕ. ಡಿಜಿಟಲ್ ಸದಸ್ಯತ್ವ",
                ticket_label_name: "ಹೆಸರು",
                ticket_label_id: "ಸದಸ್ಯ ID",
                ticket_label_college: "ಕಾಲೇಜು",
                ticket_label_course: "ಕೋರ್ಸ್",
                ticket_label_taluk: "ತಾಲೂಕು",
                ticket_label_date: "ಸೇರ್ಪಡೆ ದಿನಾಂಕ",
                ticket_footer: "ಸ್ಟೂಡೆಂಟ್ಸ್ ಫೆಡರೇಷನ್ ಆಫ್ ಇಂಡಿಯಾ — ದಕ್ಷಿಣ ಕನ್ನಡ",
                join_success_congrats: "ಅಭಿನಂದನೆ! ನೀವು ಈಗ ಎಸ್‌ಎಫ್‌ಐ ದ.ಕ. ಸದಸ್ಯರಾಗಿದ್ದೀರಿ.",
                join_success_info: "ನಿಮ್ಮ ಡಿಜಿಟಲ್ ಸದಸ್ಯತ್ವ ಕಾರ್ಡ್ ಸಿದ್ಧ. ಕೆಳಗೆ ಡೌನ್‌ಲೋಡ್ ಮಾಡಿ.",
                join_download_card: "ಸದಸ್ಯತ್ವ ಕಾರ್ಡ್ ಡೌನ್‌ಲೋಡ್",
                join_register_another: "ಮತ್ತೊಬ್ಬ ಸದಸ್ಯ ನೋಂದಣಿ",
                poll_title: "ವಿದ್ಯಾರ್ಥಿ ಸಮೀಕ್ಷೆ",
                poll_subtitle: "ನಿಮ್ಮ ಅಭಿಪ್ರಾಯ ಮುಖ್ಯ",
                poll_badge: "ಸಮೀಕ್ಷೆ",
                poll_q1: "ದ.ಕ.ದಲ್ಲಿ ಪ್ರಮುಖ ವಿದ್ಯಾರ್ಥಿ ಸಮಸ್ಯೆ ಯಾವುದು?",
                poll_o1: "ಬಸ್ ಪಾಸ್ ಹಕ್ಕು",
                poll_o2: "ಶುಲ್ಕ ಏರಿಕೆ",
                poll_voted: "ಮತ ಹಾಕಿದ್ದಕ್ಕೆ ಧನ್ಯವಾದ!",
                faq_title: "ಪದೇ ಪದೇ ಕೇಳಲಾಗುವ ಪ್ರಶ್ನೆಗಳು",
                faq_subtitle: "ಎಸ್‌ಎಫ್‌ಐ ಮತ್ತು ಸದಸ್ಯತ್ವ ಬಗ್ಗೆ ಸಾಮಾನ್ಯ ಪ್ರಶ್ನೆಗಳಿಗೆ ಉತ್ತರ",
                faq_badge: "FAQ",
                faq_q1: "ಎಸ್‌ಎಫ್‌ಐ ಹೇಗೆ ಸೇರಬೇಕು?",
                faq_a1: "'ಎಸ್‌ಎಫ್‌ಐ ಸೇರಿ' ವಿಭಾಗದಲ್ಲಿ ಸದಸ್ಯತ್ವ ಫಾರ್ಮ್ ತುಂಬಿ ₹50 UPI ಮೂಲಕ ಶುಲ್ಕ ಪಾವತಿ ಮಾಡಿ.",
                faq_q2: "ಸೇರಲು ವಯಸ್ಸಿನ ಮಿತಿ ಇದೆಯೇ?",
                faq_a2: "ಮಾನ್ಯ ಶಿಕ್ಷಣ ಸಂಸ್ಥೆಯಲ್ಲಿ ನೋಂದಾಯಿತ 14 ರಿಂದ 28 ವರ್ಷದ ಎಲ್ಲ ವಿದ್ಯಾರ್ಥಿಗಳಿಗೆ ಎಸ್‌ಎಫ್‌ಐ ಸದಸ್ಯತ್ವ ಮುಕ್ತ.",
                faq_q3: "ದೂರು ಹೇಗೆ ಸಲ್ಲಿಸಬೇಕು?",
                faq_a3: "'ಸಹಾಯ ಕೇಂದ್ರ' ವಿಭಾಗಕ್ಕೆ ಹೋಗಿ ದೂರು ಫಾರ್ಮ್ ತುಂಬಿ. ಅನಾಮಧೇಯವಾಗಿಯೂ ಸಲ್ಲಿಸಬಹುದು. ನಮ್ಮ ತಂಡ 48 ಗಂಟೆಯಲ್ಲಿ ಪ್ರತಿಕ್ರಿಯಿಸುತ್ತದೆ.",
                faq_q4: "ಎಸ್‌ಎಫ್‌ಐ ದ.ಕ. ಯಾವ ಕಾರ್ಯಕ್ರಮ ಆಯೋಜಿಸುತ್ತದೆ?",
                faq_a4: "ಪ್ರತಿಭಟನಾ ಮೆರವಣಿಗೆ, ವಿಚಾರ ಸಂಕಿರಣ, ನಾಯಕತ್ವ ಕಾರ್ಯಾಗಾರ, ಉಚಿತ ತರಬೇತಿ, ಸಾಂಸ್ಕೃತಿಕ ಕಾರ್ಯಕ್ರಮ ಮತ್ತು ರಕ್ತದಾನ ಶಿಬಿರ.",
                cta_title: "ಚಳವಳಿಯಲ್ಲಿ ಭಾಗವಹಿಸಿ",
                cta_subtitle: "ಬದಲಾವಣೆಯ ಭಾಗವಾಗಿ — ಎಸ್‌ಎಫ್‌ಐ ದ.ಕ. ಜೊತೆ ವಿದ್ಯಾರ್ಥಿ ಹಕ್ಕುಗಳಿಗಾಗಿ ಹೋರಾಡಿ",
                cta_btn: "ಇಂದೇ ಎಸ್‌ಎಫ್‌ಐ ಸೇರಿ",
                achieve_title: "ನಮ್ಮ ಸಾಧನೆಗಳು",
                achieve_subtitle: "ನಾವು ಒಟ್ಟಾಗಿ ಸಾಧಿಸಿದ್ದು",
                achieve_badge: "ಸಾಧನೆಗಳು",
                wa_title: "ವಾಟ್ಸಾಪ್ ಸಮುದಾಯ",
                wa_desc: "ಅಪ್‌ಡೇಟ್ ಮತ್ತು ಪ್ರಕಟಣೆಗಳಿಗಾಗಿ ನಮ್ಮ ವಾಟ್ಸಾಪ್ ಸಮುದಾಯಕ್ಕೆ ಸೇರಿ.",
                wa_tooltip: "ವಾಟ್ಸಾಪ್ ಗ್ರೂಪ್ ಸೇರಿ",
                amb_title: "ಕ್ಯಾಂಪಸ್ ರಾಯಭಾರಿ",
                amb_subtitle: "ನಿಮ್ಮ ಕಾಲೇಜಿನಲ್ಲಿ ಎಸ್‌ಎಫ್‌ಐ ಪ್ರತಿನಿಧಿ",
                btn_apply_ambassador: "ರಾಯಭಾರಿ ಅರ್ಜಿ ಸಲ್ಲಿಸಿ",
                vulcan_title: "ವಲ್ಕನ್ ಶೀಲ್ಡ್",
                vulcan_desc: "ಎಸ್‌ಎಫ್‌ಐ ರ‍್ಯಾಗಿಂಗ್ ವಿರೋಧಿ ಮತ್ತು ಕ್ಯಾಂಪಸ್ ಸುರಕ್ಷತಾ ಉಪಕ್ರಮ.",
                vulcan_badge: "ಸುರಕ್ಷಿತ ಕ್ಯಾಂಪಸ್",
                vulcan_btn: "ರ‍್ಯಾಗಿಂಗ್ ವರದಿ",
                unit_dir_title: "ಘಟಕ ನಿರ್ದೇಶಿಕೆ",
                unit_dir_subtitle: "ನಿಮ್ಮ ಕಾಲೇಜಿನಲ್ಲಿ ಎಸ್‌ಎಫ್‌ಐ ಘಟಕ ಹುಡುಕಿ",
                admin_portal_title: "ನಿರ್ವಾಹಕ ಪೋರ್ಟಲ್",
                admin_portal_desc: "ಎಸ್‌ಎಫ್‌ಐ ದ.ಕ. ವೆಬ್‌ಸೈಟ್ ವಿಷಯ ನಿರ್ವಹಿಸಿ",
                admin_auth_btn: "ಲಾಗಿನ್",
                admin_auth_error: "ತಪ್ಪಾದ ಪಾಸ್‌ವರ್ಡ್. ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ.",
                admin_password_label: "ನಿರ್ವಾಹಕ ಪಾಸ್‌ವರ್ಡ್",
                admin_dashboard_title: "ನಿರ್ವಾಹಕ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್",
                admin_dashboard_subtitle: "ಎಲ್ಲ ಸೈಟ್ ವಿಷಯ ನಿರ್ವಹಿಸಿ",
                admin_logout_btn: "ಲಾಗ್‌ಔಟ್",
                admin_news_title: "ಸುದ್ದಿ ನಿರ್ವಹಣೆ",
                admin_news_desc: "ಸುದ್ದಿ ಲೇಖನ ಸೇರಿಸಿ, ಸಂಪಾದಿಸಿ ಅಥವಾ ತೆಗೆದುಹಾಕಿ",
                admin_tab_news: "ಸುದ್ದಿ",
                admin_tab_members: "ಸದಸ್ಯರು",
                admin_tab_grievances: "ದೂರುಗಳು",
                office_address_title: "ಜಿಲ್ಲಾ ಕಚೇರಿ",
                office_address: "ಎಸ್‌ಎಫ್‌ಐ ದ.ಕ. ಜಿಲ್ಲಾ ಕಚೇರಿ, ಮಂಗಳೂರು",
                office_email: "sfidkdistrict@gmail.com",
                office_mangaluru: "ಮಂಗಳೂರು",
                footer_org_name: "ಎಸ್‌ಎಫ್‌ಐ ದಕ್ಷಿಣ ಕನ್ನಡ",
                footer_motto: "ಓದು. ಹೋರಾಟ. ಪ್ರಗತಿ.",
                footer_copyright: "© 2025 ಎಸ್‌ಎಫ್‌ಐ ದಕ್ಷಿಣ ಕನ್ನಡ. ಎಲ್ಲ ಹಕ್ಕುಗಳು ಕಾಯ್ದಿರಿಸಲಾಗಿದೆ.",
                footer_sub_text: "ಸ್ಟೂಡೆಂಟ್ಸ್ ಫೆಡರೇಷನ್ ಆಫ್ ಇಂಡಿಯಾ — ವಿದ್ಯಾರ್ಥಿ ಶಕ್ತಿಯ ಮೂಲಕ ಉತ್ತಮ ನಾಳೆ ನಿರ್ಮಿಸುತ್ತಿದ್ದೇವೆ.",
            }
    };

    function renderSiteContent() {
        const sc = Object.assign({}, DEFAULT_SITE_CONTENT, STATE.siteContent || {});
        const lang = STATE.language || "en";
        const t = (typeof TRANSLATIONS !== "undefined" && TRANSLATIONS[lang]) ? TRANSLATIONS[lang] : null;

        function isCustom(val, defaultVal) {
            return val && typeof val === "string" && val.trim() !== "" && val !== "undefined" && val !== "null" && val !== defaultVal;
        }

        // Update Hero
        const heroTitle = document.getElementById("dynamic-hero-title");
        const heroSubtitle = document.getElementById("dynamic-hero-subtitle");

        if (heroTitle) {
            if (isCustom(sc.heroTitle, DEFAULT_SITE_CONTENT.heroTitle)) {
                heroTitle.innerText = sc.heroTitle;
            } else if (t && t["hero_title"]) {
                heroTitle.innerText = t["hero_title"];
            } else {
                heroTitle.innerText = DEFAULT_SITE_CONTENT.heroTitle;
            }
        }

        if (heroSubtitle) {
            if (isCustom(sc.heroSubtitle, DEFAULT_SITE_CONTENT.heroSubtitle)) {
                heroSubtitle.innerText = sc.heroSubtitle;
            } else if (t && t["hero_lead"]) {
                heroSubtitle.innerText = t["hero_lead"];
            } else {
                heroSubtitle.innerText = DEFAULT_SITE_CONTENT.heroSubtitle;
            }
        }

        // Update About History
        const hist1 = document.getElementById("dynamic-about-history1");
        const hist2 = document.getElementById("dynamic-about-history2");
        if (hist1) {
            if (isCustom(sc.history1, DEFAULT_SITE_CONTENT.history1)) {
                hist1.innerText = sc.history1;
            } else if (t && t["about_history_p1"]) {
                hist1.innerText = t["about_history_p1"];
            } else {
                hist1.innerText = DEFAULT_SITE_CONTENT.history1;
            }
        }
        if (hist2) {
            if (isCustom(sc.history2, DEFAULT_SITE_CONTENT.history2)) {
                hist2.innerText = sc.history2;
            } else if (t && t["about_history_p2"]) {
                hist2.innerText = t["about_history_p2"];
            } else {
                hist2.innerText = DEFAULT_SITE_CONTENT.history2;
            }
        }

        // Update WhatsApp Floating Button
        const waBtn = document.getElementById("whatsapp-float-btn");
        if (waBtn) {
            const phone = (sc && sc.whatsapp && sc.whatsapp !== "undefined") ? sc.whatsapp.replace(/[^0-9]/g, "") : "";
            if (phone) {
                waBtn.href = `https://wa.me/${phone}?text=Hello%20SFI%20DK%20Helpdesk,%20I%20need%20assistance%20regarding:`;
            } else {
                waBtn.href = `https://wa.me/?text=Hello%20SFI%20DK%20Helpdesk,%20I%20need%20assistance%20regarding:`;
            }
        }
    }

    function applyLanguage() {
        const lang = STATE.language || "en";
        const t = TRANSLATIONS[lang] || TRANSLATIONS["en"];

        // 1. Translate all [data-i18n] elements
        document.querySelectorAll("[data-i18n]").forEach(el => {
            const key = el.getAttribute("data-i18n");
            if (t && t[key] !== undefined) {
                if (el.tagName === "INPUT" || el.tagName === "TEXTAREA") {
                    el.placeholder = t[key];
                } else if (el.tagName === "OPTION") {
                    el.textContent = t[key];
                } else {
                    el.textContent = t[key];
                }
            }
        });

        // 2. Update language toggle button label
        const langLabel = document.getElementById("lang-text-label");
        const langBtn = document.getElementById("lang-toggle-btn");
        if (langLabel) {
            langLabel.textContent = lang === "en" ? "ಕನ್ನಡ" : "English";
        } else if (langBtn) {
            langBtn.textContent = lang === "en" ? "ಕನ್ನಡ" : "English";
        }

        // 3. Update HTML lang attribute
        document.documentElement.lang = lang;

        // 4. Re-render dynamic elements that use language strings
        if (typeof renderCampaigns === "function") renderCampaigns();
        if (typeof renderDailyNews === "function") renderDailyNews();
        if (typeof renderNewsCarousel === "function") renderNewsCarousel();
        if (typeof renderSiteContent === "function") renderSiteContent();
    }

    // --- SPA Client-Side Router ---
    function handleRouting() {
        const hash = window.location.hash.substring(1) || "home";

        // Hide all tabs, show matching tab
        const tabs = document.querySelectorAll(".tab-content");
        let tabFound = false;

        tabs.forEach(tab => {
            if (tab.id === hash) {
                tab.classList.add("active");
                tabFound = true;
            } else {
                tab.classList.remove("active");
            }
        });

        // Fallback to home if unknown hash
        if (!tabFound) {
            document.getElementById("home").classList.add("active");
            STATE.activeTab = "home";
        } else {
            STATE.activeTab = hash;
        }

        // Sync Nav Links
        navLinks.forEach(link => {
            const tabName = link.getAttribute("data-tab");
            if (tabName === STATE.activeTab) {
                link.classList.add("active");
            } else {
                link.classList.remove("active");
            }
        });

        // Trigger animations if active tab is Home
        if (STATE.activeTab === "home") {
            setupCounterAnimations();
            renderNewsCarousel(); // Re-render to ensure layout matches container
        }

        if (STATE.activeTab === "gallery") {
            renderGallery();
        }

        // Scroll page to top on route change
        window.scrollTo(0, 0);
    }

    // --- About Us Tabbed Interface ---
    aboutTabButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            // Remove active class from buttons
            aboutTabButtons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            // Show corresponding pane
            const targetPaneId = `about-${btn.getAttribute("data-about-tab")}`;
            aboutPanes.forEach(pane => {
                if (pane.id === targetPaneId) {
                    pane.classList.add("active");
                } else {
                    pane.classList.remove("active");
                }
            });
        });
    });

    // --- Dynamic News Carousel rendering & slider ---
    function renderNewsCarousel() {
        if (!newsCarousel) return;

        newsCarousel.innerHTML = "";
        newsDots.innerHTML = "";

        STATE.news.forEach((item, index) => {
            const card = document.createElement("div");
            card.className = "news-card";

            const btnText = STATE.language === 'kn' ? 'ಮತ್ತಷ್ಟು ಓದಿ' : 'Read Full Summary';

            card.innerHTML = `
                <div class="news-header">
                    <span class="news-tag">${item.category}</span>
                    <span class="news-date">${item.date}</span>
                </div>
                <div class="news-card-body">
                    <h3>${item.title}</h3>
                    <p class="news-excerpt">${item.content}</p>
                </div>
                <div class="news-card-actions" style="margin-top: 14px; padding-top: 12px; border-top: 1px solid rgba(255,255,255,0.06);">
                    <button class="btn btn-secondary btn-xs flex-align-center gap-xs" onclick="window.openNewsModal(${index})">
                        <i data-lucide="book-open" class="icon-xs"></i>
                        <span>${btnText}</span> &rarr;
                    </button>
                </div>
            `;
            newsCarousel.appendChild(card);

            // Render Dot
            const dot = document.createElement("div");
            dot.className = `dot ${index === STATE.carouselIndex ? "active" : ""}`;
            dot.addEventListener("click", () => {
                goToSlide(index);
            });
            newsDots.appendChild(dot);
        });

        // Update Slider Position
        updateCarouselPosition();
    }

    function goToSlide(index) {
        if (index < 0) {
            STATE.carouselIndex = STATE.news.length - 1;
        } else if (index >= STATE.news.length) {
            STATE.carouselIndex = 0;
        } else {
            STATE.carouselIndex = index;
        }

        // Update dots active class
        const dots = document.querySelectorAll("#news-dots .dot");
        dots.forEach((dot, idx) => {
            if (idx === STATE.carouselIndex) {
                dot.classList.add("active");
            } else {
                dot.classList.remove("active");
            }
        });

        updateCarouselPosition();
    }

    function updateCarouselPosition() {
        const cardWidth = newsCarousel.querySelector(".news-card") ? newsCarousel.querySelector(".news-card").clientWidth : 0;
        const gap = 30; // Matches style.css gap of 30px
        const offset = -STATE.carouselIndex * (cardWidth + gap);
        newsCarousel.style.transform = `translateX(${offset}px)`;
    }

    // Carousel Button Listeners
    if (newsPrev) {
        newsPrev.addEventListener("click", () => goToSlide(STATE.carouselIndex - 1));
    }
    if (newsNext) {
        newsNext.addEventListener("click", () => goToSlide(STATE.carouselIndex + 1));
    }

    // Auto-scroll Carousel - assign to carouselTimer so it can be cleared on hover
    let carouselTimer;
    carouselTimer = setInterval(() => {
        if (STATE.activeTab === "home") {
            goToSlide(STATE.carouselIndex + 1);
        }
    }, 6000);

    // Pause on hover
    if (newsCarousel) {
        newsCarousel.addEventListener("mouseenter", () => clearInterval(carouselTimer));
        newsCarousel.addEventListener("mouseleave", () => {
            clearInterval(carouselTimer);
            carouselTimer = setInterval(() => {
                if (STATE.activeTab === "home") {
                    goToSlide(STATE.carouselIndex + 1);
                }
            }, 6000);
        });
    }

    // Adjust slide spacing on window resize
    window.addEventListener("resize", () => {
        if (STATE.activeTab === "home") {
            updateCarouselPosition();
        }
    });

    // --- Statistics Counters ---
    function setupCounterAnimations() {
        const statNums = document.querySelectorAll(".stat-num");

        statNums.forEach(num => {
            const target = parseInt(num.getAttribute("data-val"));
            num.innerText = "0";

            let count = 0;
            const speed = Math.ceil(target / 40); // Runs transition in ~40 steps

            const counter = setInterval(() => {
                count += speed;
                if (count >= target) {
                    num.innerText = target.toLocaleString() + "+";
                    clearInterval(counter);
                } else {
                    num.innerText = count.toLocaleString() + "+";
                }
            }, 30);
        });
    }

    // --- Campaigns List & Signatures Simulator ---
    function renderCampaigns() {
        if (!campaignsList) return;

        campaignsList.innerHTML = "";

        const lang = STATE.language;

        const campTranslations = {
            "camp-fees": {
                titleKn: "ಶಿಕ್ಷಣದ ವಾಣಿಜ್ಯೀಕರಣ ತಡೆಯಿರಿ",
                descKn: "ಖಾಸಗಿ ಕಾಲೇಜುಗಳ ಶುಲ್ಕ ಏರಿಕೆ, ಅಕ್ರಮ ದೇಣಿಗೆ ವಸೂಲಿ ವಿರುದ್ಧ ಹೋರಾಟ ಮತ್ತು ವೃತ್ತಿಪರ ಕೋರ್ಸ್‌ಗಳಲ್ಲಿ ಸರ್ಕಾರದ ಶುಲ್ಕ ಮಿತಿ ಪಾಲನೆಗೆ ಒತ್ತಾಯ.",
                sigsLabel: lang === "kn" ? "ಸಂಗ್ರಹಿಸಿದ ಸಹಿಗಳು" : "Signatures Collected",
                signedBadge: lang === "kn" ? "✓ ಸಹಿ ಮಾಡಿ ಬೆಂಬಲಿಸಲಾಗಿದೆ" : "✓ Signed & Supported",
                btnSign: lang === "kn" ? "ಅರ್ಜಿಗೆ ಸಹಿ ಮಾಡಿ" : "Sign Petition"
            },
            "camp-hostels": {
                titleKn: "ಸುರಕ್ಷಿತ ಮತ್ತು ಸ್ವಚ್ಛ ವಿದ್ಯಾರ್ಥಿ ಹಾಸ್ಟೆಲ್‌ಗಳು",
                descKn: "ಎಲ್ಲಾ ಎಸ್‌ಸಿ/ಎಸ್‌ಟಿ/ಬಿಸಿಎಂ ವಿದ್ಯಾರ್ಥಿ ನಿಲಯಗಳಲ್ಲಿ ಶೌಚಾಲಯ, ಸ್ವಚ್ಛ ಕುಡಿಯುವ ನೀರು ಮತ್ತು ಸುರಕ್ಷತಾ ವ್ಯವಸ್ಥೆಗಳಿಗೆ ಒತ್ತಾಯಿಸಿ ಜಿಲ್ಲಾವ್ಯಾಪಿ ಜಾಗೃತಿ.",
                sigsLabel: lang === "kn" ? "ಸಂಗ್ರಹಿಸಿದ ಸಹಿಗಳು" : "Signatures Collected",
                signedBadge: lang === "kn" ? "✓ ಸಹಿ ಮಾಡಿ ಬೆಂಬಲಿಸಲಾಗಿದೆ" : "✓ Signed & Supported",
                btnSign: lang === "kn" ? "ಅರ್ಜಿಗೆ ಸಹಿ ಮಾಡಿ" : "Sign Petition"
            },
            "camp-representation": {
                titleKn: "ಪ್ರಜಾಸತ್ತಾತ್ಮಕ ವಿದ್ಯಾರ್ಥಿ ಸಂಘಗಳ ಮರುಸ್ಥಾಪನೆ",
                descKn: "ದಕ್ಷಿಣ ಕನ್ನಡದ ಕಾಲೇಜು ಮತ್ತು ವಿಶ್ವವಿದ್ಯಾಲಯಗಳಲ್ಲಿ ವಿದ್ಯಾರ್ಥಿ ಸಂಘದ ಚುನಾವಣೆಗಳನ್ನು ಮರುಸ್ಥಾಪಿಸಲು ಮತ್ತು ವಿದ್ಯಾರ್ಥಿ ಪ್ರಾತಿನಿಧ್ಯದ ಹಕ್ಕಿಗಾಗಿ ಹೋರಾಟ.",
                sigsLabel: lang === "kn" ? "ಸಂಗ್ರಹಿಸಿದ ಸಹಿಗಳು" : "Signatures Collected",
                signedBadge: lang === "kn" ? "✓ ಸಹಿ ಮಾಡಿ ಬೆಂಬಲಿಸಲಾಗಿದೆ" : "✓ Signed & Supported",
                btnSign: lang === "kn" ? "ಅರ್ಜಿಗೆ ಸಹಿ ಮಾಡಿ" : "Sign Petition"
            }
        };

        STATE.campaigns.forEach(camp => {
            const card = document.createElement("div");
            card.className = "card campaign-card";

            const pct = Math.min(100, Math.round((camp.signatures / camp.targetSignatures) * 100));
            const tData = campTranslations[camp.id] || {
                titleKn: camp.title,
                descKn: camp.desc,
                sigsLabel: lang === "kn" ? "ಸಂಗ್ರಹಿಸಿದ ಸಹಿಗಳು" : "Signatures Collected",
                signedBadge: lang === "kn" ? "✓ ಸಹಿ ಮಾಡಿ ಬೆಂಬಲಿಸಲಾಗಿದೆ" : "✓ Signed & Supported",
                btnSign: lang === "kn" ? "ಅರ್ಜಿಗೆ ಸಹಿ ಮಾಡಿ" : "Sign Petition"
            };

            const displayTitle = lang === "kn" ? tData.titleKn : camp.title;
            const displayDesc = lang === "kn" ? tData.descKn : camp.desc;

            card.innerHTML = `
                <div>
                    <h3 class="camp-title">${displayTitle}</h3>
                    <p class="camp-desc">${displayDesc}</p>
                    <div class="camp-tracker">
                        <div class="camp-tracker-label">
                            <span>${tData.sigsLabel}</span>
                            <span>${camp.signatures.toLocaleString()} / ${camp.targetSignatures.toLocaleString()} (${pct}%)</span>
                        </div>
                        <div class="progress-bar-bg">
                            <div class="progress-bar-fill" style="width: ${pct}%"></div>
                        </div>
                    </div>
                </div>
                <div class="camp-actions">
                    ${camp.signed
                    ? `<span class="sig-badge">${tData.signedBadge}</span>`
                    : `<button class="btn btn-primary btn-sm sign-petition-btn" data-camp-id="${camp.id}">${tData.btnSign}</button>`
                }
                </div>
            `;
            campaignsList.appendChild(card);
        });

        // Add Listeners
        const signButtons = document.querySelectorAll(".sign-petition-btn");
        signButtons.forEach(btn => {
            btn.addEventListener("click", (e) => {
                const id = btn.getAttribute("data-camp-id");
                signPetition(id);
            });
        });
    }

    function signPetition(id) {
        const camp = STATE.campaigns.find(c => c.id === id);
        if (camp && !camp.signed) {
            camp.signatures += 1;
            camp.signed = true;
            saveState();
            renderCampaigns();
        }
    }

    // --- Dynamic Daily News Updates ---
    function renderDailyNews() {
        const newsContainer = document.getElementById("dynamic-news-container");
        if (!newsContainer) return;

        newsContainer.innerHTML = "";
        const lang = STATE.language;
        const readMoreText = lang === "kn" ? "ಮತ್ತಷ್ಟು ಓದಿ" : "Read Full Article";
        const pressClipText = lang === "kn" ? "ಪೇಪರ್ ಕಟಿಂಗ್ ವೀಕ್ಷಿಸಿ" : "View Press Clipping";
        const alertMsg = lang === "kn" ? "ಪತ್ರಿಕಾ ವರದಿ ಓಪನ್ ಆಗುತ್ತಿದೆ..." : "Opening press clipping...";
        const pubText = lang === "kn" ? "ಪ್ರಕಟಣೆ" : "Published";

        STATE.news.forEach((newsItem, index) => {
            const card = document.createElement("div");
            card.className = "article-card";
            card.style.borderLeft = "4px solid #e53935";

            card.innerHTML = `
                <div>
                    <div class="article-tag" style="background: #e53935;">${newsItem.category}</div>
                    <h3 class="article-title">${newsItem.title}</h3>
                    <p class="article-meta">${pubText}: ${newsItem.date}</p>
                    <p class="article-excerpt">${newsItem.content}</p>
                </div>
                <div class="article-card-actions flex-align-center gap-xs flex-wrap" style="margin-top: 14px; padding-top: 12px; border-top: 1px solid rgba(255,255,255,0.06);">
                    <button class="btn btn-primary btn-sm flex-align-center gap-xs" onclick="window.openNewsModal(${index})">
                        <i data-lucide="book-open" class="icon-sm"></i> <span>${readMoreText}</span> &rarr;
                    </button>
                    <button class="btn btn-secondary btn-sm flex-align-center gap-xs" onclick="alert('${alertMsg}')">
                        <i data-lucide="image" class="icon-sm"></i> <span>${pressClipText}</span>
                    </button>
                </div>
            `;

            newsContainer.appendChild(card);
        });
        if (window.lucide) lucide.createIcons();
    }


    // --- Student Grievance Submission ---
    if (grievanceForm) {
        grievanceForm.addEventListener("submit", (e) => {
            e.preventDefault();

            // 1. Collect inputs
            const name = document.getElementById("grievance-name").value;
            const phone = document.getElementById("grievance-phone").value;
            const email = document.getElementById("grievance-email").value;
            const taluk = document.getElementById("grievance-taluk").value;
            const college = document.getElementById("grievance-college").value;
            const category = document.getElementById("grievance-type").value;
            const description = document.getElementById("grievance-description").value;
            const anonymous = document.getElementById("grievance-anonymous").checked;

            // Simple validation check
            if (!name || !phone || !college || !category || !description || !taluk) {
                alert("Please fill all required fields.");
                return;
            }

            // Phone format check
            if (!/^\d{10}$/.test(phone.replace(/[\s-]/g, ""))) {
                alert("Please enter a valid 10-digit mobile number.");
                return;
            }

            // 2. Generate Grievance Ticket
            const randNo = Math.floor(100 + Math.random() * 900); // 3 digits
            const ticketId = `DK-G${randNo}`;

            const newGrievance = {
                ticketId,
                name,
                phone,
                email: email || "N/A",
                college,
                taluk,
                category,
                description,
                anonymous,
                status: "Pending Investigation"
            };

            // 3. Save to state, localStorage, and Firestore Database
            STATE.grievances.push(newGrievance);
            saveState();

            if (window.db) {
                window.db.collection("grievances").add({
                    ...newGrievance,
                    createdAt: (window.firebase && window.firebase.firestore) 
                        ? firebase.firestore.FieldValue.serverTimestamp() 
                        : new Date().toISOString()
                }).then(() => {
                    console.log("Grievance synced to Firebase database successfully.");
                }).catch(err => console.error("Error saving grievance to Firebase:", err));
            }

            // 4. Update UI Success Screen
            ticketNumberSpan.innerText = `#${ticketId}`;
            grievanceForm.classList.add("hidden");
            grievanceSuccess.classList.remove("hidden");
        });
    }

    if (resetGrievanceBtn) {
        resetGrievanceBtn.addEventListener("click", () => {
            grievanceForm.reset();
            grievanceSuccess.classList.add("hidden");
            grievanceForm.classList.remove("hidden");
        });
    }

    // --- Multi-Step Membership Application Flow & Payment Timer ---
    let paymentTimerInterval = null;
    let pendingMemberData = null;

    const joinStep1 = document.getElementById("join-step-1");
    const joinStep2 = document.getElementById("join-step-2");
    const joinStep3 = document.getElementById("join-step-3");

    const stepNode1 = document.getElementById("step-node-1");
    const stepNode2 = document.getElementById("step-node-2");
    const stepNode3 = document.getElementById("step-node-3");

    const stepLine1 = document.getElementById("step-line-1");
    const stepLine2 = document.getElementById("step-line-2");

    const confirmPaymentBtn = document.getElementById("confirm-payment-btn");
    const backToStep1Btn = document.getElementById("back-to-step1-btn");
    const paymentTimerDisplay = document.getElementById("payment-timer");

    function updateStepperUI(step) {
        stepNode1.classList.remove("active", "completed");
        stepNode2.classList.remove("active", "completed");
        stepNode3.classList.remove("active", "completed");
        stepLine1.classList.remove("completed");
        stepLine2.classList.remove("completed");

        if (step === 1) {
            stepNode1.classList.add("active");
        } else if (step === 2) {
            stepNode1.classList.add("completed");
            stepLine1.classList.add("completed");
            stepNode2.classList.add("active");
        } else if (step === 3) {
            stepNode1.classList.add("completed");
            stepLine1.classList.add("completed");
            stepNode2.classList.add("completed");
            stepLine2.classList.add("completed");
            stepNode3.classList.add("active", "completed");
        }
    }

    function startPaymentTimer(durationSeconds) {
        clearInterval(paymentTimerInterval);
        let timer = durationSeconds;

        function updateDisplay() {
            const minutes = parseInt(timer / 60, 10);
            const seconds = parseInt(timer % 60, 10);
            const formattedMin = minutes < 10 ? "0" + minutes : minutes;
            const formattedSec = seconds < 10 ? "0" + seconds : seconds;
            if (paymentTimerDisplay) {
                paymentTimerDisplay.textContent = `${formattedMin}:${formattedSec}`;
            }

            if (--timer < 0) {
                clearInterval(paymentTimerInterval);
                alert(STATE.language === "kn" ? "ಪಾವತಿ ಸಮಯ ಮುಕ್ತಾಯಗೊಂಡಿದೆ. ದಯವಿಟ್ಟು ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ." : "Payment session expired. Please submit application again.");
                goToStep1();
            }
        }

        updateDisplay();
        paymentTimerInterval = setInterval(updateDisplay, 1000);
    }

    function goToStep1() {
        clearInterval(paymentTimerInterval);
        if (joinStep1) joinStep1.classList.remove("hidden");
        if (joinStep2) joinStep2.classList.add("hidden");
        if (joinStep3) joinStep3.classList.add("hidden");
        updateStepperUI(1);
    }

    // Step 1: Submit Form -> Proceed to Payment (Step 2)
    if (membershipForm) {
        membershipForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const name = document.getElementById("member-name").value.trim();
            const dob = document.getElementById("member-dob").value;
            const phone = document.getElementById("member-phone").value.trim();
            const email = document.getElementById("member-email").value.trim();
            const college = document.getElementById("member-college").value.trim();
            const taluk = document.getElementById("member-taluk").value;
            const course = document.getElementById("member-course").value.trim();
            const year = document.getElementById("member-year").value;
            const declaration = document.getElementById("member-declaration").checked;

            if (!name || !dob || !phone || !email || !college || !taluk || !course || !year || !declaration) {
                alert(STATE.language === "kn" ? "ದಯವಿಟ್ಟು ಎಲ್ಲಾ ಅಗತ್ಯ ಕ್ಷೇತ್ರಗಳನ್ನು ಭರ್ತಿ ಮಾಡಿ." : "Please complete all required fields and accept the declaration.");
                return;
            }

            if (!/^\d{10}$/.test(phone.replace(/[\s-]/g, ""))) {
                alert(STATE.language === "kn" ? "ದಯವಿಟ್ಟು ಮಾನ್ಯವಾದ 10-ಅಂಕಿಯ ಮೊಬೈಲ್ ಸಂಖ್ಯೆಯನ್ನು ನಮೂದಿಸಿ." : "Please enter a valid 10-digit phone number.");
                return;
            }

            // Save pending applicant info
            const randId = Math.floor(10000 + Math.random() * 90000);
            const memberId = `SFIDK-${randId}`;

            const today = new Date();
            const formattedDate = `${String(today.getDate()).padStart(2, '0')}-${String(today.getMonth() + 1).padStart(2, '0')}-${today.getFullYear()}`;

            pendingMemberData = {
                memberId,
                name,
                dob,
                phone,
                email,
                college,
                taluk,
                course,
                year,
                date: formattedDate,
                status: "Pending",
                createdAt: new Date().toISOString()
            };

            if (window.db) {
                window.db.collection("members").add(pendingMemberData).then(() => {
                    console.log("Member application saved to Firebase.");
                }).catch(err => console.error("Error saving member:", err));
            }

            // Switch to Step 2
            if (joinStep1) joinStep1.classList.add("hidden");
            if (joinStep2) joinStep2.classList.remove("hidden");
            updateStepperUI(2);

            // Start 3-minute timer (180 seconds)
            startPaymentTimer(180);
        });
    }

    if (backToStep1Btn) {
        backToStep1Btn.addEventListener("click", () => {
            goToStep1();
        });
    }

    // Step 2: Confirm Payment -> Send Brevo Email & Generate Ticket Card (Step 3)
    if (confirmPaymentBtn) {
        confirmPaymentBtn.addEventListener("click", async () => {
            if (!pendingMemberData) return;

            clearInterval(paymentTimerInterval);

            STATE.members.push({
                id: pendingMemberData.memberId,
                name: pendingMemberData.name,
                college: pendingMemberData.college,
                taluk: pendingMemberData.taluk,
                course: pendingMemberData.course,
                phone: pendingMemberData.phone,
                date: pendingMemberData.date
            });
            saveState();

            // Populate Ticket Card
            if (ticketName) ticketName.innerText = pendingMemberData.name;
            if (ticketId) ticketId.innerText = `#${pendingMemberData.memberId}`;
            if (ticketCollege) ticketCollege.innerText = pendingMemberData.college;
            if (ticketTaluk) ticketTaluk.innerText = pendingMemberData.taluk;
            if (ticketCourse) ticketCourse.innerText = pendingMemberData.course;
            if (ticketDate) ticketDate.innerText = pendingMemberData.date;

            // Trigger Brevo Email via backend API
            try {
                fetch("http://localhost:3000/api/send-membership", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        name: pendingMemberData.name,
                        email: pendingMemberData.email,
                        memberId: pendingMemberData.memberId,
                        college: pendingMemberData.college,
                        taluk: pendingMemberData.taluk,
                        course: pendingMemberData.course,
                        year: pendingMemberData.year,
                        date: pendingMemberData.date
                    })
                }).catch(err => console.warn("Backend email dispatch error:", err));
            } catch (err) {
                console.warn("Could not dispatch email:", err);
            }

            // Switch to Step 3
            if (joinStep2) joinStep2.classList.add("hidden");
            if (joinStep3) joinStep3.classList.remove("hidden");
            updateStepperUI(3);
        });
    }

    if (resetJoinBtn) {
        resetJoinBtn.addEventListener("click", () => {
            if (membershipForm) membershipForm.reset();
            pendingMemberData = null;
            goToStep1();
        });
    }

    const downloadTicketBtn = document.getElementById("download-ticket-btn");
    if (downloadTicketBtn) {
        downloadTicketBtn.addEventListener("click", () => {
            const ticketElement = document.querySelector("#join-success .ticket");
            if (!ticketElement) return;

            if (typeof html2canvas === "undefined") {
                window.print();
                return;
            }

            downloadTicketBtn.innerHTML = `<i data-lucide="loader" class="icon-sm spin"></i> <span>${STATE.language === "kn" ? "ಉತ್ಪಾದಿಸಲಾಗುತ್ತಿದೆ..." : "Generating PNG..."}</span>`; if (window.lucide) lucide.createIcons();
            html2canvas(ticketElement, { scale: 2, useCORS: true, backgroundColor: null }).then(canvas => {
                const link = document.createElement("a");
                const memberId = pendingMemberData ? pendingMemberData.id : "DK";
                link.download = `SFI_Membership_Card_${memberId}.png`;
                link.href = canvas.toDataURL("image/png");
                link.click();
                downloadTicketBtn.innerHTML = `<i data-lucide="download" class="icon-sm"></i> <span>${STATE.language === "kn" ? "ಸದಸ್ಯತ್ವ ಕಾರ್ಡ್ ಡೌನ್‌ಲೋಡ್ ಮಾಡಿ (PNG)" : "Download Membership Card (PNG)"}</span>`; if (window.lucide) lucide.createIcons();
            }).catch(err => {
                console.error("PNG download error:", err);
                downloadTicketBtn.innerHTML = `<i data-lucide="download" class="icon-sm"></i> <span>${STATE.language === "kn" ? "ಸದಸ್ಯತ್ವ ಕಾರ್ಡ್ ಡೌನ್‌ಲೋಡ್ ಮಾಡಿ (PNG)" : "Download Membership Card (PNG)"}</span>`; if (window.lucide) lucide.createIcons();
                window.print();
            });
        });
    }

    // --- College & Taluk Unit Directory System ---
    const DEFAULT_UNITS = [
        { college: "University College Mangaluru", taluk: "Mangaluru", leader: "Comrade Nihal", phone: "9480112233" },
        { college: "Government First Grade College Carstreet", taluk: "Mangaluru", leader: "Comrade Sinan", phone: "9480112234" },
        { college: "GFGC Siddakatte (Bantwal)", taluk: "Bantwal", leader: "Comrade Kaushik", phone: "9480112235" },
        { college: "Government College Puttur", taluk: "Puttur", leader: "Comrade Suhas", phone: "9480112236" },
        { college: "GFGC Belthangady", taluk: "Belthangady", leader: "Comrade Anusha", phone: "9480112237" },
        { college: "GFGC Sullia", taluk: "Sullia", leader: "Comrade Yathish", phone: "9480112238" }
    ];

    let activeTalukFilter = "all";
    const unitSearchInput = document.getElementById("unit-search-input");
    const unitGrid = document.getElementById("unit-grid");
    const unitTalukFilters = document.getElementById("unit-taluk-filters");

    function renderUnits() {
        if (!unitGrid) return;
        unitGrid.innerHTML = "";

        const searchTerm = unitSearchInput ? unitSearchInput.value.toLowerCase().trim() : "";

        const filtered = DEFAULT_UNITS.filter(u => {
            const matchesTaluk = activeTalukFilter === "all" || u.taluk.toLowerCase() === activeTalukFilter.toLowerCase();
            const matchesSearch = !searchTerm || u.college.toLowerCase().includes(searchTerm) || u.leader.toLowerCase().includes(searchTerm) || u.taluk.toLowerCase().includes(searchTerm);
            return matchesTaluk && matchesSearch;
        });

        if (filtered.length === 0) {
            unitGrid.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: var(--text-muted); padding: 20px;">No SFI units found matching your search.</p>`;
            return;
        }

        filtered.forEach(u => {
            const card = document.createElement("div");
            card.className = "unit-card";
            card.innerHTML = `
                <span class="unit-badge">${u.taluk} Taluk Unit</span>
                <h4>${u.college}</h4>
                <div class="leader-name flex-align-center gap-xs"><i data-lucide="user" class="icon-sm"></i> <span>Unit Convener: ${u.leader}</span></div>
                <div class="unit-contact-btns">
                    <a href="tel:+91${u.phone}" class="unit-contact-btn call flex-align-center gap-xs"><i data-lucide="phone" class="icon-xs"></i> <span>Call</span></a>
                    <a href="https://wa.me/91${u.phone}?text=Hello%20${encodeURIComponent(u.leader)},%20I%20am%20a%20student%20from%20${encodeURIComponent(u.college)}" target="_blank" class="unit-contact-btn wa flex-align-center gap-xs"><i data-lucide="message-square" class="icon-xs"></i> <span>WhatsApp</span></a>
                </div>
            `;
            unitGrid.appendChild(card);
        });
    }

    if (unitSearchInput) {
        unitSearchInput.addEventListener("input", renderUnits);
    }

    if (unitTalukFilters) {
        unitTalukFilters.addEventListener("click", (e) => {
            const btn = e.target.closest(".taluk-pill");
            if (!btn) return;

            document.querySelectorAll(".taluk-pill").forEach(p => p.classList.remove("active"));
            btn.classList.add("active");
            activeTalukFilter = btn.dataset.taluk || "all";
            renderUnits();
        });
    }

    renderUnits();

    // --- FAQ Accordion Logic ---
    document.addEventListener("click", (e) => {
        const header = e.target.closest(".faq-question");
        if (!header) return;
        const item = header.parentElement;
        if (!item || !item.classList.contains("faq-item")) return;
        
        const isActive = item.classList.contains("active");
        
        // Find all faq-items in the same container to close them
        const container = item.closest('.faq-container, .faq-accordion') || document.body;
        container.querySelectorAll(".faq-item").forEach(i => i.classList.remove("active"));
        
        if (!isActive) item.classList.add("active");
    });

    // --- Floating Ask SFI Assistant Widget Logic ---
    const floatingAskBtn = document.getElementById("floating-ask-btn");
    const askSfiModal = document.getElementById("ask-sfi-modal");
    const closeAskModal = document.getElementById("close-ask-modal");

    if (floatingAskBtn && askSfiModal) {
        floatingAskBtn.addEventListener("click", () => {
            askSfiModal.style.display = askSfiModal.style.display === "flex" ? "none" : "flex";
        });
    }
    if (closeAskModal && askSfiModal) {
        closeAskModal.addEventListener("click", () => {
            askSfiModal.style.display = "none";
        });
    }

    // --- Hero Background Auto Slider ---
    function initHeroBgSlider() {
        const slides = document.querySelectorAll(".hero-slide");
        if (!slides || slides.length < 2) return;
        let currentSlideIndex = 0;
        setInterval(() => {
            slides[currentSlideIndex].classList.remove("active");
            currentSlideIndex = (currentSlideIndex + 1) % slides.length;
            slides[currentSlideIndex].classList.add("active");
        }, 3000);
    }

    // --- IntersectionObserver Scroll Reveal Animations ---
    function initScrollAnimations() {
        if (!("IntersectionObserver" in window)) return;
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                }
            });
        }, { threshold: 0.1 });

        setTimeout(() => {
            document.querySelectorAll(".rz-leader-card, .vulcan-card, .news-card, .faq-item, .ideology-card, .cta-banner, .section-header").forEach(el => {
                el.classList.add("reveal-on-scroll");
                observer.observe(el);
            });
        }, 100);
    }

    // --- News Read More Detail Modal Handlers ---
    window.openNewsModal = function(index) {
        const item = STATE.news[index];
        if (!item) return;
        const modal = document.getElementById("news-detail-modal");
        if (!modal) return;

        const tagEl = document.getElementById("news-modal-tag");
        const titleEl = document.getElementById("news-modal-title");
        const dateEl = document.getElementById("news-modal-date");
        const bodyEl = document.getElementById("news-modal-body");

        if (tagEl) tagEl.textContent = item.category || "OFFICIAL STATEMENT";
        if (titleEl) titleEl.textContent = item.title || "";
        if (dateEl) dateEl.textContent = item.date || "";
        if (bodyEl) bodyEl.textContent = item.content || "";

        modal.style.display = "flex";
        if (window.lucide) lucide.createIcons();
    };

    window.closeNewsModal = function() {
        const modal = document.getElementById("news-detail-modal");
        if (modal) modal.style.display = "none";
    };


    // --- Blood Donor Form Submission ---
    const bloodDonorForm = document.getElementById("blood-donor-form");
    if (bloodDonorForm) {
        bloodDonorForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const name = document.getElementById("bd-name") ? document.getElementById("bd-name").value.trim() : "";
            const bloodGroup = document.getElementById("bd-group") ? document.getElementById("bd-group").value : "";
            const phone = document.getElementById("bd-phone") ? document.getElementById("bd-phone").value.trim() : "";

            if (!name || !bloodGroup || !phone) {
                alert(STATE.language === "kn" ? "ದಯವಿಟ್ಟು ಎಲ್ಲಾ ಅಗತ್ಯ ವಿವರಗಳನ್ನು ಭರ್ತಿ ಮಾಡಿ." : "Please fill in all required donor details.");
                return;
            }

            const donorData = {
                name,
                bloodGroup,
                phone,
                district: "Dakshina Kannada",
                lastDonated: "Available",
                createdAt: window.firebase ? firebase.firestore.FieldValue.serverTimestamp() : new Date()
            };

            const successMsg = STATE.language === "kn" ? "ರಕ್ತದಾನಿಯಾಗಿ ನೋಂದಾಯಿಸಿದ್ದಕ್ಕಾಗಿ ಧನ್ಯವಾದಗಳು! ನಿಮ್ಮ ವಿವರಗಳನ್ನು ಯಶಸ್ವಿಯಾಗಿ ಸೇರಿಸಲಾಗಿದೆ." : "Thank you for registering as a blood donor! Your details have been recorded.";

            if (window.db) {
                window.db.collection("blood_donors").add(donorData).then(() => {
                    alert(successMsg);
                    bloodDonorForm.reset();
                }).catch(err => {
                    console.error("Firestore blood donor error:", err);
                    alert(successMsg);
                    bloodDonorForm.reset();
                });
            } else {
                alert(successMsg);
                bloodDonorForm.reset();
            }
        });
    }

    // --- Init Webapp ---
    init();

    function renderGallery() {
        const galleryGrid = document.getElementById("gallery-grid");
        if (!galleryGrid) return;

        galleryGrid.innerHTML = "";

        const filteredItems = STATE.activeGalleryFilter === "all"
            ? STATE.gallery
            : STATE.gallery.filter(item => item.category === STATE.activeGalleryFilter);

        if (filteredItems.length === 0) {
            galleryGrid.innerHTML = `<p style="color:var(--text-muted); text-align:center; padding: 40px 0;">No items in this category yet.</p>`;
            return;
        }

        filteredItems.forEach((item, index) => {
            const el = document.createElement("div");
            el.className = "gallery-item";
            el.dataset.category = item.category;

            const isVideo = item.category === "video" || item.type === "video";
            const imageUrl = item.img || item.url || "";
            const videoUrl = item.src || item.url || "";

            if (!isVideo) {
                el.innerHTML = `<img src="${imageUrl}" alt="${item.title}" loading="lazy">`;
            } else {
                el.innerHTML = `
                    ${imageUrl ? `<img src="${imageUrl}" alt="${item.title}" class="video-poster">` : ""}
                    <video src="${videoUrl}" muted loop playsinline></video>
                    <div class="video-indicator"><i data-lucide="play-circle"></i></div>
                `;
            }

            const overlay = document.createElement("div");
            overlay.className = "gallery-overlay";
            overlay.innerHTML = `
                <div class="gallery-info">
                    <h3>${item.title}</h3>
                    <p>${item.category}</p>
                </div>
            `;

            el.appendChild(overlay);

            el.addEventListener("click", () => {
                openLightbox(index);
            });

            galleryGrid.appendChild(el);
        });

        if (window.lucide) {
            lucide.createIcons();
        }
    }
});
