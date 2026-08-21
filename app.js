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
        siteContent: {}
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
        whatsapp: "918951565792",
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

        // 2. Apply theme and language
        document.documentElement.setAttribute("data-theme", STATE.theme);
        applyLanguage();

        // 3. Setup SPA Router
        handleRouting();
        window.addEventListener("hashchange", handleRouting);

        // 4. Render initial elements
        renderNewsCarousel();
        renderCampaigns();
        renderGallery();
        setupCounterAnimations();

        // Save back mock data if local storage was empty
        saveState();
    }

    function saveState() {
        localStorage.setItem("sfi_news", JSON.stringify(STATE.news));
        localStorage.setItem("sfi_campaigns", JSON.stringify(STATE.campaigns));
        localStorage.setItem("sfi_members", JSON.stringify(STATE.members));
        localStorage.setItem("sfi_grievances", JSON.stringify(STATE.grievances));
        // Gallery is always loaded from DEFAULT_GALLERY, no need to persist it
        localStorage.setItem("sfi_theme", STATE.theme);
        localStorage.setItem("sfi_lang", STATE.language);
        localStorage.setItem("sfi_dk_site_content", JSON.stringify(STATE.siteContent));
    }

    // --- Theme Switcher ---
    themeToggleBtn.addEventListener("click", () => {
        STATE.theme = STATE.theme === "dark" ? "light" : "dark";
        document.documentElement.setAttribute("data-theme", STATE.theme);
        saveState();
    });

    // --- Language Switcher ---
    if (langToggleBtn) {
        langToggleBtn.addEventListener("click", () => {
            STATE.language = STATE.language === "en" ? "kn" : "en";
            saveState();
            applyLanguage();
        });
    }

    // --- Mobile Menu Toggle ---
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
            card.innerHTML = `
                <div class="news-header">
                    <span class="news-tag">${item.category}</span>
                    <span class="news-date">${item.date}</span>
                </div>
                <div>
                    <h3>${item.title}</h3>
                    <p>${item.content}</p>
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

        STATE.news.forEach(newsItem => {
            const card = document.createElement("div");
            card.className = "article-card";
            card.style.borderLeft = "4px solid #e91e63";

            card.innerHTML = `
                <div class="article-tag" style="background: #e91e63;">${newsItem.category}</div>
                <h3 class="article-title">${newsItem.title}</h3>
                <p class="article-meta">ಪ್ರಕಟಣೆ: ${newsItem.date}</p>
                <p class="article-excerpt">${newsItem.content}</p>
                <button class="btn btn-secondary btn-sm" onclick="alert('ಪತ್ರಿಕಾ ವರದಿ ಓಪನ್ ಆಗುತ್ತಿದೆ...')">🖼️ ಪೇಪರ್ ಕಟಿಂಗ್ ವೀಕ್ಷಿಸಿ</button>
            `;
            
            newsContainer.appendChild(card);
        });
    }

    // --- Dynamic Site Content (Hero, About, Footer) ---
    function renderSiteContent() {
        const sc = STATE.siteContent;

        // Update Hero
        const heroTitle = document.getElementById("dynamic-hero-title");
        const heroSubtitle = document.getElementById("dynamic-hero-subtitle");
        if (heroTitle) heroTitle.innerText = sc.heroTitle;
        if (heroSubtitle) heroSubtitle.innerText = sc.heroSubtitle;

        // Update About History
        const hist1 = document.getElementById("dynamic-about-history1");
        const hist2 = document.getElementById("dynamic-about-history2");
        if (hist1) hist1.innerText = sc.history1;
        if (hist2) hist2.innerText = sc.history2;

        // Update WhatsApp Floating Button
        const waBtn = document.getElementById("whatsapp-float-btn");
        if (waBtn) {
            waBtn.href = `https://wa.me/${sc.whatsapp}?text=Hello%20SFI%20DK%20Helpdesk,%20I%20need%20assistance%20regarding:`;
        }
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

            // 3. Save to state and localStorage
            STATE.grievances.push(newGrievance);
            saveState();

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
                id: memberId,
                name: `Comrade ${name}`,
                rawName: name,
                dob,
                phone,
                email,
                college,
                taluk,
                course,
                year,
                fullCourse: `${course} (${year})`,
                date: formattedDate
            };

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

            // Save to State and LocalStorage
            STATE.members.push({
                id: pendingMemberData.id,
                name: pendingMemberData.name,
                college: pendingMemberData.college,
                taluk: pendingMemberData.taluk,
                course: pendingMemberData.fullCourse,
                phone: pendingMemberData.phone,
                date: pendingMemberData.date
            });
            saveState();

            // Populate Ticket Card
            if (ticketName) ticketName.innerText = pendingMemberData.name;
            if (ticketId) ticketId.innerText = `#${pendingMemberData.id}`;
            if (ticketCollege) ticketCollege.innerText = pendingMemberData.college;
            if (ticketTaluk) ticketTaluk.innerText = pendingMemberData.taluk;
            if (ticketCourse) ticketCourse.innerText = pendingMemberData.fullCourse;
            if (ticketDate) ticketDate.innerText = pendingMemberData.date;

            // Trigger Brevo Email via backend API
            try {
                fetch("http://localhost:3000/api/send-membership", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        name: pendingMemberData.name,
                        email: pendingMemberData.email,
                        memberId: pendingMemberData.id,
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

            downloadTicketBtn.innerText = "⏳ Generating PNG...";
            html2canvas(ticketElement, { scale: 2, useCORS: true, backgroundColor: null }).then(canvas => {
                const link = document.createElement("a");
                const memberId = pendingMemberData ? pendingMemberData.id : "DK";
                link.download = `SFI_Membership_Card_${memberId}.png`;
                link.href = canvas.toDataURL("image/png");
                link.click();
                downloadTicketBtn.innerText = "📥 Download Membership Card (PNG)";
            }).catch(err => {
                console.error("PNG download error:", err);
                downloadTicketBtn.innerText = "📥 Download Membership Card (PNG)";
                window.print();
            });
        });
    }

    // --- College & Taluk Unit Directory System ---
    const DEFAULT_UNITS = [
        { college: "University College Mangaluru", taluk: "Mangaluru", leader: "Comrade Nihal", phone: "8951565792" },
        { college: "Government First Grade College Carstreet", taluk: "Mangaluru", leader: "Comrade Sinan", phone: "8951565792" },
        { college: "GFGC Siddakatte (Bantwal)", taluk: "Bantwal", leader: "Comrade Kaushik", phone: "8951565792" },
        { college: "Government College Puttur", taluk: "Puttur", leader: "Comrade Suhas", phone: "8951565792" },
        { college: "GFGC Belthangady", taluk: "Belthangady", leader: "Comrade Anusha", phone: "8951565792" },
        { college: "GFGC Sullia", taluk: "Sullia", leader: "Comrade Yathish", phone: "8951565792" }
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
                <div class="leader-name">👤 Unit Convener: ${u.leader}</div>
                <div class="unit-contact-btns">
                    <a href="tel:+91${u.phone}" class="unit-contact-btn call">📞 Call</a>
                    <a href="https://wa.me/91${u.phone}?text=Hello%20${encodeURIComponent(u.leader)},%20I%20am%20a%20student%20from%20${encodeURIComponent(u.college)}" target="_blank" class="unit-contact-btn wa">💬 WhatsApp</a>
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
    document.querySelectorAll(".faq-question").forEach(q => {
        q.addEventListener("click", () => {
            const item = q.closest(".faq-item");
            if (item) item.classList.toggle("active");
        });
    });

    // --- SFI Struggle Songs Audio Player Widget ---
    const audioToggleBtn = document.getElementById("audio-toggle-btn");
    const audioPanel = document.getElementById("audio-panel");
    const audioClose = document.getElementById("audio-close");
    const audioPlayBtn = document.getElementById("audio-play-btn");
    const sfiAudioElement = document.getElementById("sfi-audio-element");

    if (audioToggleBtn && audioPanel) {
        audioToggleBtn.addEventListener("click", () => {
            audioPanel.classList.toggle("hidden");
        });
    }

    if (audioClose && audioPanel) {
        audioClose.addEventListener("click", () => {
            audioPanel.classList.add("hidden");
        });
    }

    if (audioPlayBtn && sfiAudioElement) {
        audioPlayBtn.addEventListener("click", () => {
            if (sfiAudioElement.paused) {
                sfiAudioElement.play();
                audioPlayBtn.innerText = "⏸️ Pause";
            } else {
                sfiAudioElement.pause();
                audioPlayBtn.innerText = "▶️ Play";
            }
        });
    }

    // --- Event RSVP Reminder Logic ---
    document.querySelectorAll(".rsvp-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            const eventName = btn.dataset.event || "Event";
            alert(`🎉 Reminder set for "${eventName}"! We look forward to your participation in Dakshina Kannada.`);
        });
    });

    // --- Student Issue Opinion Poll Logic ---
    const pollOptions = document.querySelectorAll(".poll-option-btn");
    const pollVotedMsg = document.getElementById("poll-voted-msg");
    let hasVoted = localStorage.getItem("sfi_dk_poll_voted") === "true";

    if (hasVoted) {
        if (pollVotedMsg) pollVotedMsg.classList.remove("hidden");
        pollOptions.forEach(opt => opt.classList.add("disabled"));
        const userVote = localStorage.getItem("sfi_dk_poll_choice");
        if (userVote) {
            const selectedOpt = document.querySelector(`.poll-option-btn[data-opt="${userVote}"]`);
            if (selectedOpt) selectedOpt.classList.add("voted");
        }
    } else {
        pollOptions.forEach(btn => {
            btn.addEventListener("click", () => {
                if (hasVoted) return;
                
                const opt = btn.dataset.opt;
                localStorage.setItem("sfi_dk_poll_voted", "true");
                localStorage.setItem("sfi_dk_poll_choice", opt);
                hasVoted = true;

                btn.classList.add("voted");
                if (pollVotedMsg) pollVotedMsg.classList.remove("hidden");
                
                // Simulate vote count update
                const countEl = btn.querySelector(".vote-count");
                if (countEl) {
                    const currentVotes = parseInt(countEl.innerText);
                    countEl.innerText = `${currentVotes + 1} votes`;
                }
            });
        });
    }

    // --- Taluk Explorer Logic ---
    const talukData = {
        "mangaluru": {
            name: "Mangaluru Taluk Unit",
            desc: "District headquarters with active units in University College Mangaluru, GFGC Carstreet, St. Aloysius, and Canara College. Leading struggles for bus passes and democratic student elections.",
            units: "18 Colleges",
            members: "2,400+ Members",
            leader: "Comrade Nihal"
        },
        "bantwal": {
            name: "Bantwal Taluk Unit",
            desc: "Active units in GFGC Siddakatte, SVS College, and Carmel College. Spearheading the movement for dedicated KSRTC student buses in rural routes.",
            units: "8 Colleges",
            members: "850+ Members",
            leader: "Comrade Kaushik"
        },
        "puttur": {
            name: "Puttur Taluk Unit",
            desc: "Strong presence in Government College Puttur and Vivekananda College. Organizing students against saffronization of campuses.",
            units: "12 Colleges",
            members: "1,200+ Members",
            leader: "Comrade Suhas"
        },
        "belthangady": {
            name: "Belthangady Taluk Unit",
            desc: "Units across GFGC Belthangady and SDM College. Leading campaigns for better infrastructure in government hostels and SC/ST scholarships.",
            units: "6 Colleges",
            members: "600+ Members",
            leader: "Comrade Anusha"
        },
        "sullia": {
            name: "Sullia Taluk Unit",
            desc: "Organizing students in KVG and NMC. Focusing on student welfare, library facilities, and protesting irregular fee collections.",
            units: "5 Colleges",
            members: "450+ Members",
            leader: "Comrade Yathish"
        },
        "moodbidri": {
            name: "Moodbidri Taluk Unit",
            desc: "Coordinating student activities in Alva's and Mahavira College. Defending student rights in private educational institutions.",
            units: "7 Colleges",
            members: "750+ Members",
            leader: "Comrade Ritesh"
        },
        "kadaba": {
            name: "Kadaba Taluk Unit",
            desc: "The newest taluk unit. Raising demands for new degree colleges and better transport connectivity for rural students.",
            units: "3 Colleges",
            members: "300+ Members",
            leader: "Comrade Sandesh"
        }
    };

    const talukBtns = document.querySelectorAll(".taluk-map-btn");
    const tdName = document.getElementById("td-name");
    const tdDesc = document.getElementById("td-desc");
    const tdUnits = document.getElementById("td-units");
    const tdMembers = document.getElementById("td-members");
    const tdLeader = document.getElementById("td-leader");

    talukBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            talukBtns.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            
            const talukKey = btn.dataset.talukInfo;
            if (talukData[talukKey]) {
                const data = talukData[talukKey];
                if (tdName) tdName.innerText = data.name;
                if (tdDesc) tdDesc.innerText = data.desc;
                if (tdUnits) tdUnits.innerText = data.units;
                if (tdMembers) tdMembers.innerText = data.members;
                if (tdLeader) tdLeader.innerText = data.leader;
            }
        });
    });

    // --- Membership Verification Search Portal ---
    const verifyInput = document.getElementById("verify-input");
    const verifyBtn = document.getElementById("verify-btn");
    const verifyResult = document.getElementById("verify-result");
    const verifyStatus = document.getElementById("verify-status");
    const vdName = document.getElementById("vd-name");
    const vdCollege = document.getElementById("vd-college");
    const vdTaluk = document.getElementById("vd-taluk");
    const vdDate = document.getElementById("vd-date");

    if (verifyBtn && verifyInput && verifyResult) {
        verifyBtn.addEventListener("click", () => {
            const memberId = verifyInput.value.trim().toUpperCase();
            if (!memberId) {
                alert("Please enter a Membership ID to verify.");
                return;
            }

            verifyResult.classList.remove("hidden");
            
            // Mock Verification Logic
            if (memberId.startsWith("SFIDK-")) {
                verifyStatus.className = "verify-status valid";
                verifyStatus.innerHTML = "✅ ACTIVE & VERIFIED MEMBER";
                
                // If it's a known recent registration from LocalStorage
                const recentId = pendingMemberData ? pendingMemberData.id : null;
                
                if (memberId === recentId) {
                    vdName.innerText = pendingMemberData.name;
                    vdCollege.innerText = pendingMemberData.college;
                    vdTaluk.innerText = pendingMemberData.taluk;
                    vdDate.innerText = pendingMemberData.date;
                } else {
                    // Random mock data for other valid IDs
                    vdName.innerText = "Comrade Verified";
                    vdCollege.innerText = "University College, Mangaluru";
                    vdTaluk.innerText = "Mangaluru";
                    vdDate.innerText = "15-06-2025";
                }
            } else {
                verifyStatus.className = "verify-status invalid";
                verifyStatus.innerHTML = "❌ INVALID MEMBERSHIP ID";
                vdName.innerText = "N/A";
                vdCollege.innerText = "N/A";
                vdTaluk.innerText = "N/A";
                vdDate.innerText = "N/A";
            }
        });
    }

    // --- Anonymous Grievance Form Logic ---
    const anonForm = document.getElementById("anonymous-report-form");
    const anonSuccessMsg = document.getElementById("anon-success-msg");
    const anonSubmitBtn = anonForm ? anonForm.querySelector('button[type="submit"]') : null;

    if (anonForm) {
        anonForm.addEventListener("submit", (e) => {
            e.preventDefault();
            if (anonSubmitBtn) anonSubmitBtn.disabled = true;
            
            // Show fake success
            if (anonSuccessMsg) {
                anonSuccessMsg.classList.remove("hidden");
                // Reset form fields
                anonForm.reset();
                setTimeout(() => {
                    anonSuccessMsg.classList.add("hidden");
                    if (anonSubmitBtn) anonSubmitBtn.disabled = false;
                }, 5000);
            }
        });
    }

    // --- Blood Donation Form Logic ---
    const bloodDonorForm = document.getElementById("blood-donor-form");
    if (bloodDonorForm) {
        bloodDonorForm.addEventListener("submit", (e) => {
            e.preventDefault();
            alert("Thank you! Your details have been added to the SFI DK Blood Donor Registry. We will contact you during emergencies.");
            bloodDonorForm.reset();
        });
    }

    // --- Admin Authentication & Dashboard Logic ---
    if (adminLoginForm) {
        adminLoginForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const password = adminPasswordInput.value;

            // Password check
            if (password === "SFIDKadmin") {
                adminAuthCard.classList.add("hidden");
                adminDashboardView.classList.remove("hidden");
                adminPasswordInput.value = "";
                adminAuthError.classList.add("hidden");

                // Load Dashboard Lists
                loadAdminDashboardData();
            } else {
                adminAuthError.classList.remove("hidden");
            }
        });
    }

    if (adminLogoutBtn) {
        adminLogoutBtn.addEventListener("click", () => {
            adminDashboardView.classList.add("hidden");
            adminAuthCard.classList.remove("hidden");
        });
    }

    // Admin Tabs Switching
    adminDashTabs.forEach(tabBtn => {
        tabBtn.addEventListener("click", () => {
            adminDashTabs.forEach(b => b.classList.remove("active"));
            tabBtn.classList.add("active");

            const paneId = `pane-${tabBtn.getAttribute("data-dash-tab")}`;
            adminDashPanes.forEach(pane => {
                if (pane.id === paneId) {
                    pane.classList.add("active");
                } else {
                    pane.classList.remove("active");
                }
            });
        });
    });

    function loadAdminDashboardData() {
        if (!adminMembersTbody || !adminGrievancesTbody) return;

        // 1. Populate Members Directory
        adminMembersTbody.innerHTML = "";
        STATE.members.forEach(member => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td><strong>${member.id}</strong></td>
                <td>${member.name}</td>
                <td>${member.college}</td>
                <td>${member.taluk}</td>
                <td>${member.course}</td>
                <td><a href="tel:${member.phone}">${member.phone}</a></td>
                <td>${member.date}</td>
            `;
            adminMembersTbody.appendChild(tr);
        });
        countMembers.innerText = STATE.members.length;

        // 2. Populate Grievance List
        adminGrievancesTbody.innerHTML = "";
        STATE.grievances.forEach(grievance => {
            const tr = document.createElement("tr");
            const displayStudent = grievance.anonymous
                ? `<span style="color: var(--text-muted)">Confidential (Anonymous)</span>`
                : `<strong>${grievance.name}</strong>`;

            const displayPhone = grievance.anonymous
                ? `<span>-</span>`
                : `<a href="tel:${grievance.phone}">${grievance.phone}</a>`;

            tr.innerHTML = `
                <td><strong>${grievance.ticketId}</strong></td>
                <td>${displayStudent}</td>
                <td>${displayPhone}</td>
                <td>${grievance.college}</td>
                <td>${grievance.taluk}</td>
                <td><span style="color: var(--primary); font-weight: 600;">${grievance.category}</span></td>
                <td><div style="max-width: 250px; white-space: normal; line-height: 1.4;">${grievance.description}</div></td>
                <td><span class="status-badge status-pending">${grievance.status}</span></td>
            `;
            adminGrievancesTbody.appendChild(tr);
        });
        countGrievances.innerText = STATE.grievances.length;

        // 3. Load gallery manager preview
        loadAdminGalleryPreview();

        // 4. Populate Site Content Form
        const scForm = document.getElementById("site-content-form");
        if (scForm) {
            document.getElementById("admin-hero-title").value = STATE.siteContent.heroTitle || "";
            document.getElementById("admin-hero-subtitle").value = STATE.siteContent.heroSubtitle || "";
            document.getElementById("admin-whatsapp-number").value = STATE.siteContent.whatsapp || "";
            document.getElementById("admin-history1").value = STATE.siteContent.history1 || "";
            document.getElementById("admin-history2").value = STATE.siteContent.history2 || "";
        }
    }

    // Reset Buttons in Admin Panel
    if (clearMembersBtn) {
        clearMembersBtn.addEventListener("click", () => {
            if (confirm("Are you sure you want to reset the Member Directory to original defaults? This will erase new submissions.")) {
                STATE.members = [...DEFAULT_MEMBERS];
                saveState();
                loadAdminDashboardData();
            }
        });
    }

    if (clearGrievancesBtn) {
        clearGrievancesBtn.addEventListener("click", () => {
            if (confirm("Are you sure you want to clear all Student Grievance submissions?")) {
                STATE.grievances = [];
                saveState();
                loadAdminDashboardData();
            }
        });
    }

    // News Publisher Form Submission
    if (newsPublishForm) {
        newsPublishForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const title = document.getElementById("news-title").value;
            const date = document.getElementById("news-date").value;
            const category = document.getElementById("news-category").value;
            const content = document.getElementById("news-content").value;

            if (!title || !date || !category || !content) {
                alert("Please fill in all announcement fields.");
                return;
            }

            const newAnn = {
                title,
                date,
                category: category.toUpperCase(),
                content
            };

            // Prepend new announcement so it shows first on Home Carousel
            STATE.news.unshift(newAnn);
            saveState();

            // Clear inputs
            newsPublishForm.reset();

            // Force homepage news re-render (both sections)
            renderDailyNews();
            renderNewsCarousel();

            // Display success alert inside admin dashboard
            newsPublishSuccess.classList.remove("hidden");
            setTimeout(() => {
                newsPublishSuccess.classList.add("hidden");
            }, 4000);
        });
    }

    // Site Content Manager Form Submission
    const siteContentForm = document.getElementById("site-content-form");
    if (siteContentForm) {
        siteContentForm.addEventListener("submit", (e) => {
            e.preventDefault();
            
            STATE.siteContent = {
                heroTitle: document.getElementById("admin-hero-title").value,
                heroSubtitle: document.getElementById("admin-hero-subtitle").value,
                whatsapp: document.getElementById("admin-whatsapp-number").value,
                history1: document.getElementById("admin-history1").value,
                history2: document.getElementById("admin-history2").value
            };
            
            saveState();
            renderSiteContent();
            
            const successMsg = document.getElementById("site-content-success");
            successMsg.classList.remove("hidden");
            setTimeout(() => {
                successMsg.classList.add("hidden");
            }, 4000);
        });
    }

    // --- Admin Secret Access Link (double-click copyright in footer) ---
    const footerLink = document.getElementById("footer-admin-link");
    const footerBottomContainer = document.querySelector(".footer-bottom");
    if (footerBottomContainer) {
        footerBottomContainer.addEventListener("dblclick", () => {
            window.location.hash = "#admin";
        });
    }

    // --- Gallery and Lightbox Functions ---
    function renderGallery() {
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
            const card = document.createElement("div");
            card.className = "gallery-item";
            const isVideo = item.category === "video" && item.src;

            const mediaHTML = isVideo
                ? `<img src="${item.img}" alt="${item.title}" style="width:100%;display:block;">
                   <div class="gallery-video-play-icon">▶</div>`
                : `<img src="${item.img}" alt="${item.title}" loading="lazy">`;

            const shareText = encodeURIComponent(`Check out SFI DK: ${item.title} — ${window.location.origin}/#gallery`);
            const whatsappLink = `https://wa.me/?text=${shareText}`;

            card.innerHTML = `
                ${mediaHTML}
                <button class="gallery-share-btn" title="Share on WhatsApp" onclick="event.stopPropagation(); window.open('${whatsappLink}','_blank')">📤</button>
                <div class="gallery-item-overlay">
                    <span class="gallery-item-category">${isVideo ? "🎬 VIDEO" : item.category.toUpperCase()}</span>
                    <h3 class="gallery-item-title">${item.title}</h3>
                    <p class="gallery-item-desc">${item.desc}</p>
                </div>
            `;
            card.addEventListener("click", () => {
                openLightbox(item, index, filteredItems);
            });
            galleryGrid.appendChild(card);
        });
    }

    // Filter Buttons Listeners
    if (galleryFilterBtns) {
        galleryFilterBtns.forEach(btn => {
            btn.addEventListener("click", () => {
                galleryFilterBtns.forEach(b => b.classList.remove("active"));
                btn.classList.add("active");
                STATE.activeGalleryFilter = btn.getAttribute("data-filter");
                renderGallery();
            });
        });
    }

    // Lightbox Controls
    let lightboxCurrentList = [];

    function openLightbox(item, index, list) {
        if (!galleryLightbox) return;
        STATE.activeLightboxIndex = index;
        lightboxCurrentList = list;
        updateLightboxContent();
        galleryLightbox.classList.remove("hidden");
        document.body.style.overflow = "hidden";
    }

    function closeLightbox() {
        if (!galleryLightbox) return;
        // Pause any playing video
        if (lightboxVideo) {
            lightboxVideo.pause();
            lightboxVideo.src = "";
        }
        // Reset zoom
        if (lightboxImg) lightboxImg.classList.remove("zoomed");
        galleryLightbox.classList.add("hidden");
        document.body.style.overflow = "";
    }

    function updateLightboxContent() {
        if (lightboxCurrentList.length === 0) return;

        const item = lightboxCurrentList[STATE.activeLightboxIndex];
        const isVideo = item.category === "video" && item.src;

        // Update counter
        if (lightboxCounter) {
            lightboxCounter.textContent = `${STATE.activeLightboxIndex + 1} / ${lightboxCurrentList.length}`;
        }

        // Reset zoom on navigation
        if (lightboxImg) lightboxImg.classList.remove("zoomed");

        // Animate fade
        if (lightboxContentWrapper) {
            lightboxContentWrapper.style.opacity = "0";
            setTimeout(() => {
                lightboxContentWrapper.style.opacity = "1";
            }, 100);
        }

        if (isVideo) {
            // Show video, hide image
            if (lightboxImg) lightboxImg.classList.add("hidden");
            if (lightboxVideo) {
                lightboxVideo.classList.remove("hidden");
                lightboxVideo.src = item.src;
                lightboxVideo.poster = item.img;
            }
        } else {
            // Show image, hide video
            if (lightboxVideo) {
                lightboxVideo.pause();
                lightboxVideo.src = "";
                lightboxVideo.classList.add("hidden");
            }
            if (lightboxImg) {
                lightboxImg.classList.remove("hidden");
                lightboxImg.src = item.img;
            }
        }

        // Update caption
        if (lightboxCaption) {
            lightboxCaption.innerHTML = `
                <span style="color: var(--primary); font-size: 0.8rem; font-weight: 700; text-transform: uppercase; display: block; margin-bottom: 5px; letter-spacing: 1px;">${isVideo ? "🎬 VIDEO" : item.category.toUpperCase()}</span>
                <strong style="font-size: 1.15rem; display: block; margin-bottom: 3px; font-family: var(--font-heading);">${item.title}</strong>
                <span style="color: var(--text-secondary); font-size: 0.9rem;">${item.desc}</span>
            `;
        }

        // Update share button
        if (lightboxShareBtn) {
            const shareText = encodeURIComponent(`SFI DK: ${item.title} — ${window.location.origin}/#gallery`);
            lightboxShareBtn.onclick = () => window.open(`https://wa.me/?text=${shareText}`, "_blank");
        }
    }

    function navigateLightbox(dir) {
        if (lightboxCurrentList.length === 0) return;
        STATE.activeLightboxIndex += dir;
        if (STATE.activeLightboxIndex < 0) {
            STATE.activeLightboxIndex = lightboxCurrentList.length - 1;
        } else if (STATE.activeLightboxIndex >= lightboxCurrentList.length) {
            STATE.activeLightboxIndex = 0;
        }
        updateLightboxContent();
    }

    if (lightboxClose) lightboxClose.addEventListener("click", closeLightbox);
    if (lightboxPrev) lightboxPrev.addEventListener("click", () => navigateLightbox(-1));
    if (lightboxNext) lightboxNext.addEventListener("click", () => navigateLightbox(1));

    // Zoom on click
    if (lightboxImg) {
        lightboxImg.addEventListener("click", () => {
            lightboxImg.classList.toggle("zoomed");
        });
    }
    if (lightboxZoomBtn) {
        lightboxZoomBtn.addEventListener("click", () => {
            if (lightboxImg) lightboxImg.classList.toggle("zoomed");
        });
    }

    // Click outside image to close
    if (galleryLightbox) {
        galleryLightbox.addEventListener("click", (e) => {
            if (e.target === galleryLightbox) closeLightbox();
        });
    }

    // Keyboard Navigation
    document.addEventListener("keydown", (e) => {
        if (!galleryLightbox || galleryLightbox.classList.contains("hidden")) return;
        if (e.key === "Escape") closeLightbox();
        else if (e.key === "ArrowLeft") navigateLightbox(-1);
        else if (e.key === "ArrowRight") navigateLightbox(1);
    });

    // Touch/Swipe Navigation
    if (galleryLightbox) {
        let touchStartX = 0;
        let touchEndX = 0;

        galleryLightbox.addEventListener("touchstart", (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        galleryLightbox.addEventListener("touchend", (e) => {
            touchEndX = e.changedTouches[0].screenX;
            const diff = touchStartX - touchEndX;
            if (Math.abs(diff) > 50) { // threshold 50px
                if (diff > 0) navigateLightbox(1);  // swipe left = next
                else navigateLightbox(-1);            // swipe right = prev
            }
        }, { passive: true });
    }

    // --- Admin Gallery Upload Manager ---
    const galleryUploadForm = document.getElementById("gallery-upload-form");
    const galleryFileInput = document.getElementById("gallery-file-input");
    const galleryFilePreview = document.getElementById("gallery-file-preview");
    const galleryUploadSuccess = document.getElementById("gallery-upload-success");
    const adminGalleryPreview = document.getElementById("admin-gallery-preview");
    const galleryItemCount = document.getElementById("gallery-item-count");

    // File preview on selection
    if (galleryFileInput) {
        galleryFileInput.addEventListener("change", () => {
            const file = galleryFileInput.files[0];
            if (!file || !galleryFilePreview) return;
            const url = URL.createObjectURL(file);
            if (file.type.startsWith("video/")) {
                galleryFilePreview.innerHTML = `<video src="${url}" controls style="max-height:150px; border-radius:8px; max-width:100%;"></video>`;
            } else {
                galleryFilePreview.innerHTML = `<img src="${url}" style="max-height:150px; border-radius:8px; max-width:100%;">`;
            }
        });
    }

    function loadAdminGalleryPreview() {
        if (!adminGalleryPreview) return;
        const uploads = JSON.parse(localStorage.getItem("sfi_gallery_uploads")) || [];
        if (galleryItemCount) galleryItemCount.textContent = STATE.gallery.length;

        adminGalleryPreview.innerHTML = "";
        // Show all gallery items (defaults + uploads), uploads are deletable
        const allItems = STATE.gallery;
        allItems.forEach((item, idx) => {
            const isUpload = idx >= DEFAULT_GALLERY.length + 2; // +2 for the 2 video defaults
            const thumb = document.createElement("div");
            thumb.className = "admin-gallery-thumb";
            const isVideo = item.category === "video" && item.src;
            thumb.innerHTML = `
                ${isVideo ? `<video src="${item.src}" poster="${item.img}"></video>` : `<img src="${item.img}" alt="${item.title}">`}
                <div class="thumb-label">${item.title}</div>
                ${isUpload ? `<button class="thumb-delete-btn" data-idx="${idx}" title="Delete">✕</button>` : ""}
            `;
            adminGalleryPreview.appendChild(thumb);
        });

        // Delete handlers
        adminGalleryPreview.querySelectorAll(".thumb-delete-btn").forEach(btn => {
            btn.addEventListener("click", () => {
                const totalDefaults = DEFAULT_GALLERY.length + 2;
                const uploadIdx = parseInt(btn.dataset.idx) - totalDefaults;
                const uploads = JSON.parse(localStorage.getItem("sfi_gallery_uploads")) || [];
                uploads.splice(uploadIdx, 1);
                localStorage.setItem("sfi_gallery_uploads", JSON.stringify(uploads));
                STATE.gallery = [...DEFAULT_GALLERY, ...uploads];
                renderGallery();
                loadAdminGalleryPreview();
            });
        });
    }

    if (galleryUploadForm) {
        galleryUploadForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const file = galleryFileInput ? galleryFileInput.files[0] : null;
            const title = document.getElementById("gallery-upload-title")?.value?.trim();
            const category = document.getElementById("gallery-upload-category")?.value;
            const desc = document.getElementById("gallery-upload-desc")?.value?.trim() || "";

            if (!file || !title || !category) {
                alert("Please fill in all required fields and select a file.");
                return;
            }

            const reader = new FileReader();
            reader.onload = (ev) => {
                const dataUrl = ev.target.result;
                const isVideo = file.type.startsWith("video/");

                const newItem = {
                    img: isVideo ? "assets/protest.png" : dataUrl, // Use thumbnail for video
                    src: isVideo ? dataUrl : null,
                    category,
                    title,
                    desc,
                    uploadedAt: Date.now()
                };
                if (isVideo) newItem.img = dataUrl.startsWith("data:video") ? "assets/protest.png" : dataUrl;

                const uploads = JSON.parse(localStorage.getItem("sfi_gallery_uploads")) || [];
                uploads.unshift(newItem);
                localStorage.setItem("sfi_gallery_uploads", JSON.stringify(uploads));

                STATE.gallery = [...DEFAULT_GALLERY, ...uploads];

                galleryUploadForm.reset();
                if (galleryFilePreview) galleryFilePreview.innerHTML = "";
                renderGallery();
                loadAdminGalleryPreview();

                if (galleryUploadSuccess) {
                    galleryUploadSuccess.classList.remove("hidden");
                    setTimeout(() => galleryUploadSuccess.classList.add("hidden"), 4000);
                }
            };
            reader.readAsDataURL(file);
        });
    }

    // --- Translation System ---
    const TRANSLATIONS = {
        en: {
            nav_home: "Home",
            nav_about: "About Us",
            nav_campaigns: "Campaigns",
            nav_grievance: "Help Desk",
            nav_gallery: "Gallery",
            nav_join: "Join SFI",

            hero_badge: "STUDY & STRUGGLE",
            hero_title: "Independence. Democracy. Socialism.",
            hero_lead: "Students' Federation of India (SFI) is the vanguard organization of progressive, democratic students fighting for equality, education, and student rights in Dakshina Kannada.",
            hero_join_btn: "Become a Member",
            hero_about_btn: "Learn Our Ideology",

            news_header: "Latest Updates & News",
            news_subtitle: "Stay informed about SFI Dakshina Kannada's recent events, protests, and news.",

            stat_members: "Active Members",
            stat_colleges: "Colleges Covered",
            stat_campaigns: "Campaigns Conducted",
            stat_grievances: "Grievances Solved",

            cta_title: "Ready to stand up for student rights?",
            cta_subtitle: "Join SFI Dakshina Kannada and become part of a historic movement ensuring quality, affordable, and equal education for all.",
            cta_btn: "Join SFI Today",

            about_hero_title: "About SFI Dakshina Kannada",
            about_hero_subtitle: "Empowering the student community of the coastal district to fight for educational justice and progressive values.",
            about_tab_history: "Our History",
            about_tab_ideology: "Our Ideology",
            about_tab_leadership: "Leadership Team",
            about_tab_structure: "Organizational Structure",

            campaigns_hero_title: "Active Campaigns",
            campaigns_hero_subtitle: "We believe in action. SFI DK is actively fighting against policies that discriminate, commercialize, or dilute education.",

            grievance_hero_title: "Student Help Desk & Grievance Cell",
            grievance_hero_subtitle: "Facing issues with college fees, hostel facilities, scholarships, or transportation? Report your grievance to us. SFI DK will take it up with relevant authorities.",
            grievance_form_title: "Submit a Grievance",
            grievance_form_desc: "Fill out this form and our student representative team will contact you to assist.",
            label_name: "Your Full Name",
            label_phone: "Phone Number",
            label_email: "Email Address",
            label_taluk: "Taluk / Area",
            label_college: "College / Institution",
            label_category: "Category",
            label_description: "Grievance Description",
            label_anonymous: "Keep my name confidential when representing this issue to the management/authorities.",
            btn_submit_grievance: "Submit Grievance",

            join_hero_title: "Join the Movement",
            join_hero_subtitle: "In SFI, every member is an activist. Join India's largest progressive student organisation and build a better future.",
            join_form_title: "Membership Application Form",
            join_form_desc: "Fill out this form to register as a member of SFI Dakshina Kannada. Annual membership fee is ₹2.",
            label_dob: "Date of Birth",
            label_course: "Course of Study",
            label_year: "Year of Study",
            label_declaration: "I agree to abide by the constitution of the Students' Federation of India and fight for Independence, Democracy, and Socialism.",
            btn_submit_join: "Submit Application",

            gallery_hero_title: "SFI DK Photo Gallery",
            gallery_hero_subtitle: "Visual records of our struggles, student assemblies, educational seminars, and progressive cultural campaigns in Dakshina Kannada.",
            filter_all: "All Events",
            filter_protest: "Protests & Rallies",
            filter_seminar: "Seminars & Forums",
            filter_meet: "Student Conferences",
            filter_cultural: "Cultural Campaigns",
            filter_video: "🎬 Videos",

            // About - History (inline content is static, but structure is translated via JS keys)
            about_history_p1: "The Students' Federation of India (SFI) was formed in 1970, out of the need to unite the student community on a national scale to resist anti-student policies, commercialization, and privatization of education. Over the last five decades, SFI has grown into India's largest progressive student organisation, with millions of members.",
            about_history_p2: "In the Dakshina Kannada district, SFI has a rich legacy of leading struggles. Being an educational hub with hundreds of professional, degree, and pre-university colleges, Mangaluru and its surrounding taluks have witnessed historical student movements led by SFI demanding fair bus passes, well-equipped government hostels, transparent evaluation processes, and democratic representation within educational institutions.",

            // About - Ideology
            ideology_intro: "These three words form the core ideology of SFI and are represented on our white flag with its five-pointed red star.",
            ideology1_title: "Independence",
            ideology1_desc: "An education system free from imperialist influences and commercial interests. Promoting scientific temper and rational, progressive thinking among students.",
            ideology2_title: "Democracy",
            ideology2_desc: "The right of students to organize, speak, and vote. SFI demands the restoration of democratic student union elections in all colleges and universities.",
            ideology3_title: "Socialism",
            ideology3_desc: "Fighting for a society free from exploitation. We believe that quality education is not a commodity for sale, but a fundamental human right available to all, regardless of caste or economic status.",

            // About - Leadership
            leadership_intro: "Meet the office bearers steering the student movement from the district of Dakshina Kannada to the national committee.",
            leader1_title: "District Secretary, Dakshina Kannada",
            leader1_desc: "Leading the local campaigns and organizing protests against infrastructure gaps, bus pass issues, and fee regulations across Mangaluru.",
            leader2_title: "District President, Dakshina Kannada",
            leader2_desc: "Coordinating the state-level student struggles, representation in education boards, and statewide policy interventions.",
            leader3_title: "Karnataka State President",
            leader3_desc: "Coordinating the state-level student struggles, representation in education boards, and statewide policy interventions.",
            leader4_title: "Karnataka State Secretary",
            leader4_desc: "Orchestrating state campaigns, building organizations across districts, and leading delegations to the state education department.",
            leader5_title: "All India President",
            leader5_desc: "Leading the nationwide campaigns for student rights, education budget expansion, and resistance against central education policies.",

            // About - Structure
            structure_intro: "SFI operates on democratic centralism. Decisions are taken collectively after open discussions. Our structure ensures representation from the grassroots college level to the national executive.",
            struct_unit_title: "Primary / Unit Committee",
            struct_unit_desc: "Formed within individual colleges and high schools. The direct link to the student body.",
            struct_taluk_title: "Local / Taluk Committee",
            struct_taluk_desc: "Coordinates unit activities in specific taluks (e.g., Mangaluru, Bantwal, Puttur, Sullia, Belthangady).",
            struct_district_title: "District Committee (SFI DK)",
            struct_district_desc: "The governing body for Dakshina Kannada district, directing the local taluk committees and student struggles.",
            struct_state_title: "State Committee",
            struct_state_desc: "Coordinates all district committees within Karnataka, headquartered in Bengaluru.",
            struct_central_title: "Central Executive Committee (CEC)",
            struct_central_desc: "The apex national body representing SFI across all states of India.",

            // Grievance success
            grievance_success_title: "Grievance Submitted Successfully",
            grievance_success_msg1: "Thank you for reaching out. We have logged your complaint under ticket:",
            grievance_success_msg2: "Our district student coordination team will review the issue and contact you within 24-48 hours. Stay strong!",
            grievance_another_btn: "Submit Another Complaint",

            // Join / Ticket
            ticket_title: "SFI MEMBERSHIP CARD",
            ticket_subtitle: "Dakshina Kannada District Unit",
            ticket_label_name: "MEMBER NAME",
            ticket_label_id: "MEMBERSHIP NO.",
            ticket_label_college: "COLLEGE",
            ticket_label_taluk: "TALUK",
            ticket_label_course: "COURSE & YEAR",
            ticket_label_date: "REGISTRATION DATE",
            ticket_footer: "\"Study and Struggle!\"",
            join_success_congrats: "🎉 Congratulations, you are registered! Screenshot this membership card.",
            join_success_info: "A representative from your college unit will contact you shortly to complete the physical verification and collect the ₹5 annual membership fee.",
            join_register_another: "Register Another Student",

            // Step labels & Payment
            step1_label: "Member Details",
            step2_label: "Pay ₹2 Fee",
            step3_label: "Membership Card",

            btn_next_payment: "Next: Proceed to Payment (₹2) →",
            payment_badge: "SECURE UPI PAYMENT",
            payment_title: "Scan QR & Pay Membership Fee (₹2)",
            payment_desc: "Scan using any UPI app (GPay, PhonePe, Paytm, BHIM) to complete your SFI membership registration.",
            upi_label: "UPI ID:",
            timer_title: "Session Expires In",
            timer_note: "Please complete payment before the timer expires to get your instant membership card.",
            btn_confirm_payment: "✅ I Have Completed Payment (₹2)",
            btn_back_form: "← Back to Application Form",

            join_form_desc: "Fill out this form to register as a member of SFI Dakshina Kannada. Annual membership fee is ₹2.",
            join_success_congrats: "🎉 Congratulations, your payment is verified & registered! Membership card sent to your email.",
            join_success_info: "A representative from your college unit will contact you shortly. Keep a screenshot of this card.",

            // Select Options & Helpline
            opt_select_taluk: "Select Taluk",
            opt_select_year: "Select Year",
            opt_y1: "1st Year",
            opt_y2: "2nd Year",
            opt_y3: "3rd Year",
            opt_y4: "4th Year / Above",
            opt_pu1: "PU - 1st Year (11th)",
            opt_pu2: "PU - 2nd Year (12th)",

            helpline_title: "SFI DK Student Helpline",
            helpline_desc: "For immediate assistance or emergencies, you can directly reach out to our representatives:",
            office_mangaluru: "District Office (Mangaluru)",
            office_email: "Email Address",
            office_address_title: "District Office Address",
            office_address: "First Floor, Vikas, Near State Bank, Mangaluru, Dakshina Kannada - 575001",
            resources_title: "Important Student Resources",
            resources_desc: "Frequently accessed resources for students in Dakshina Kannada:",
            res_mu: "Mangalore University Portal",
            res_ssp: "State Scholarship Portal (SSP)",
            res_bus: "KSRTC Student Bus Pass Portal",

            footer_org_name: "Students' Federation of India",
            footer_motto: "\"Study & Struggle. Independence, Democracy, Socialism.\"",
            footer_admin_link: "Admin Portal",
            footer_copyright: "© 2026 SFI Dakshina Kannada. Built for progressive student activism. All rights reserved.",
            footer_sub_text: "SFI is affiliated with the All India Committee. Active in Mangaluru, Bantwal, Puttur, Sullia, Belthangady, Moodbidri, and Kadaba.",

            // Admin Panel
            admin_portal_title: "Admin Portal Access",
            admin_portal_desc: "Enter the administrator password to view registrations, grievances, and post news updates.",
            admin_password_label: "Password",
            admin_auth_btn: "Authenticate",
            admin_auth_error: "Incorrect password. Please try again.",
            admin_dashboard_title: "Admin Dashboard",
            admin_dashboard_subtitle: "SFI Dakshina Kannada Management Hub",
            admin_logout_btn: "Log Out",
            admin_tab_members: "Members Directory",
            admin_tab_grievances: "Student Grievances",
            admin_tab_news: "News Publisher",
            admin_news_title: "Publish New Update",
            admin_news_desc: "Post a news item, campaign announcement, or protest details. This will immediately display on the homepage news carousel."
        },
        kn: {
            nav_home: "ಮುಖಪುಟ",
            nav_about: "ನಮ್ಮ ಬಗ್ಗೆ",
            nav_campaigns: "ಹೋರಾಟಗಳು",
            nav_grievance: "ಸಹಾಯ ಕೇಂದ್ರ",
            nav_gallery: "ಚಿತ್ರಸಂಪುಟ",
            nav_join: "SFI ಸೇರಿ",

            hero_badge: "ಓದು ಮತ್ತು ಹೋರಾಟ",
            hero_title: "ಸ್ವಾತಂತ್ರ್ಯ. ಪ್ರಜಾಪ್ರಭುತ್ವ. ಸಮಾಜವಾದ.",
            hero_lead: "ಭಾರತ ವಿದ್ಯಾರ್ಥಿ ಫೆಡರೇಶನ್ (SFI) ದಕ್ಷಿಣ ಕನ್ನಡ ಜಿಲ್ಲೆಯ ಸಮಾನತೆ, ಶಿಕ್ಷಣ ಮತ್ತು ವಿದ್ಯಾರ್ಥಿ ಹಕ್ಕುಗಳಿಗಾಗಿ ಹೋರಾಡುವ ಪ್ರಗತಿಪರ, ಪ್ರಜಾಸತ್ತಾತ್ಮಕ ವಿದ್ಯಾರ್ಥಿಗಳ ಪ್ರಮುಖ ಸಂಘಟನೆಯಾಗಿದೆ.",
            hero_join_btn: "ಸದಸ್ಯರಾಗಿ",
            hero_about_btn: "ನಮ್ಮ ಸಿದ್ಧಾಂತ ತಿಳಿಯಿರಿ",

            news_header: "ಇತ್ತೀಚಿನ ಸುದ್ದಿಗಳು",
            news_subtitle: "ಎಸ್.ಎಫ್.ಐ ದಕ್ಷಿಣ ಕನ್ನಡದ ಇತ್ತೀಚಿನ ಹೋರಾಟಗಳು, ಪ್ರತಿಭಟನೆಗಳು ಮತ್ತು ಸುದ್ದಿಗಳ ಬಗ್ಗೆ ಮಾಹಿತಿ ಪಡೆಯಿರಿ.",

            stat_members: "ಸಕ್ರಿಯ ಸದಸ್ಯರು",
            stat_colleges: "ಒಳಪಟ್ಟ ಕಾಲೇಜುಗಳು",
            stat_campaigns: "ನಡೆಸಿದ ಹೋರಾಟಗಳು",
            stat_grievances: "ಪರಿಹರಿಸಿದ ಸಮಸ್ಯೆಗಳು",

            cta_title: "ವಿದ್ಯಾರ್ಥಿ ಹಕ್ಕುಗಳಿಗಾಗಿ ಹೋರಾಡಲು ಸಿದ್ಧರಿದ್ದೀರಾ?",
            cta_subtitle: "ಎಸ್.ಎಫ್.ಐ ದಕ್ಷಿಣ ಕನ್ನಡ ಸೇರಿ ಮತ್ತು ಎಲ್ಲರಿಗೂ ಗುಣಮಟ್ಟದ, ಕೈಗೆಟುಕುವ ಮತ್ತು ಸಮಾನ ಶಿಕ್ಷಣವನ್ನು ಖಚಿತಪಡಿಸುವ ಐತಿಹಾಸಿಕ ಚಳುವಳಿಯ ಭಾಗವಾಗಿ.",
            cta_btn: "ಇಂದೇ ಎಸ್.ಎಫ್.ಐ ಸೇರಿ",

            about_hero_title: "ಎಸ್.ಎಫ್.ಐ ದಕ್ಷಿಣ ಕನ್ನಡದ ಬಗ್ಗೆ",
            about_hero_subtitle: "ಕರಾವಳಿ ಜಿಲ್ಲೆಯ ವಿದ್ಯಾರ್ಥಿ ಸಮುದಾಯವನ್ನು ಶೈಕ್ಷಣಿಕ ನ್ಯಾಯ ಮತ್ತು ಪ್ರಗತಿಪರ ಮೌಲ್ಯಗಳಿಗಾಗಿ ಹೋರಾಡಲು ಸಶಕ್ತಗೊಳಿಸುವುದು.",
            about_tab_history: "ನಮ್ಮ ಇತಿಹಾಸ",
            about_tab_ideology: "ನಮ್ಮ ಸಿದ್ಧಾಂತ",
            about_tab_leadership: "ನಾಯಕತ್ವ ತಂಡ",
            about_tab_structure: "ಸಾಂಸ್ಥಿಕ ರಚನೆ",

            campaigns_hero_title: "ಸಕ್ರಿಯ ಹೋರಾಟಗಳು",
            campaigns_hero_subtitle: "ನಾವು ಕ್ರಿಯೆಯಲ್ಲಿ ನಂಬಿಕೆ ಇಟ್ಟಿದ್ದೇವೆ. ಶಿಕ್ಷಣದ ಖಾಸಗೀಕರಣ, ವಾಣಿಜ್ಯೀಕರಣ ಅಥವಾ ತಾರತಮ್ಯದ ನೀತಿಗಳ ವಿರುದ್ಧ SFI DK ಸಕ್ರಿಯವಾಗಿ ಹೋರಾಡುತ್ತಿದೆ.",

            grievance_hero_title: "ವಿದ್ಯಾರ್ಥಿ ಸಹಾಯ ಕೇಂದ್ರ ಮತ್ತು ಕುಂದುಕೊರತೆ ವಿಭಾಗ",
            grievance_hero_subtitle: "ಕಾಲೇಜು ಶುಲ್ಕ, ಹಾಸ್ಟೆಲ್ ಸೌಲಭ್ಯ, ವಿದ್ಯಾರ್ಥಿವೇತನ ಅಥವಾ ಸಾರಿಗೆ ಸಮಸ್ಯೆಗಳನ್ನು ಎದುರಿಸುತ್ತಿದ್ದೀರಾ? ನಿಮ್ಮ ಸಮಸ್ಯೆಯನ್ನು ನಮಗೆ ವರದಿ ಮಾಡಿ. SFI DK ಸಂಬಂಧಪಟ್ಟ ಅಧಿಕಾರಿಗಳೊಂದಿಗೆ ಚರ್ಚಿಸಲಿದೆ.",
            grievance_form_title: "ಕುಂದುಕೊರತೆ ಸಲ್ಲಿಸಿ",
            grievance_form_desc: "ಈ ಫಾರ್ಮ್ ಅನ್ನು ಭರ್ತಿ ಮಾಡಿ ಮತ್ತು ನಮ್ಮ ವಿದ್ಯಾರ್ಥಿ ಪ್ರತಿನಿಧಿ ತಂಡವು ನಿಮಗೆ ಸಹಾಯ ಮಾಡಲು ಸಂಪರ್ಕಿಸುತ್ತದೆ.",
            label_name: "ನಿಮ್ಮ ಪೂರ್ಣ ಹೆಸರು",
            label_phone: "ದೂರವಾಣಿ ಸಂಖ್ಯೆ",
            label_email: "ಇಮೇಲ್ ವಿಳಾಸ",
            label_taluk: "ತಾಲೂಕು / ಪ್ರದೇಶ",
            label_college: "ಕಾಲೇಜು / ಸಂಸ್ಥೆ",
            label_category: "ವರ್ಗ",
            label_description: "ಸಮಸ್ಯೆಯ ವಿವರಣೆ",
            label_anonymous: "ಅಧಿಕಾರಿಗಳ ಮುಂದೆ ಪ್ರತಿನಿಧಿಸುವಾಗ ನನ್ನ ಹೆಸರನ್ನು ಗೌಪ್ಯವಾಗಿಡಿ.",
            btn_submit_grievance: "ಸಮಸ್ಯೆ ಸಲ್ಲಿಸಿ",

            join_hero_title: "ಚಳುವಳಿಗೆ ಸೇರಿಕೊಳ್ಳಿ",
            join_hero_subtitle: "ಎಸ್.ಎಫ್.ಐ ನಲ್ಲಿ ಪ್ರತಿ ಸದಸ್ಯನೂ ಹೋರಾಟಗಾರ. ಭಾರತದ ಅತಿ ದೊಡ್ಡ ಪ್ರಗತಿಪರ ವಿದ್ಯಾರ್ಥಿ ಸಂಘಟನೆಗೆ ಸೇರಿ ಮತ್ತು ಉತ್ತಮ ಭವಿಷ್ಯವನ್ನು ನಿರ್ಮಿಸಿ.",
            join_form_title: "ಸದಸ್ಯತ್ವ ಅರ್ಜಿ ನಮೂನೆ",
            join_form_desc: "ಎಸ್.ಎಫ್.ಐ ದಕ್ಷಿಣ ಕನ್ನಡದ ಸದಸ್ಯರಾಗಿ ನೋಂದಾಯಿಸಿಕೊಳ್ಳಲು ಈ ಫಾರ್ಮ್ ಅನ್ನು ಭರ್ತಿ ಮಾಡಿ. ವಾರ್ಷಿಕ ಸದಸ್ಯತ್ವ ಶುಲ್ಕ ₹2.",
            label_dob: "ಹುಟ್ಟಿದ ದಿನಾಂಕ",
            label_course: "ಅಭ್ಯಾಸ ಮಾಡುವ ಕೋರ್ಸ್",
            label_year: "ಅಭ್ಯಾಸ ಮಾಡುವ ವರ್ಷ",
            label_declaration: "ನಾನು ಭಾರತ ವಿದ್ಯಾರ್ಥಿ ಫೆಡರೇಶನ್‌ನ ಸಂವಿಧಾನಕ್ಕೆ ಬದ್ಧನಾಗಿರಲು ಮತ್ತು ಸ್ವಾತಂತ್ರ್ಯ, ಪ್ರಜಾಪ್ರಭುತ್ವ ಮತ್ತು ಸಮಾಜವಾದಕ್ಕಾಗಿ ಹೋರಾಡಲು ಒಪ್ಪುತ್ತೇನೆ.",
            btn_submit_join: "ಅರ್ಜಿ ಸಲ್ಲಿಸಿ",

            gallery_hero_title: "ಎಸ್.ಎಫ್.ಐ ದಕ್ಷಿಣ ಕನ್ನಡ ಚಿತ್ರಸಂಪುಟ",
            gallery_hero_subtitle: "ದಕ್ಷಿಣ ಕನ್ನಡದಲ್ಲಿ ನಮ್ಮ ಹೋರಾಟಗಳು, ವಿದ್ಯಾರ್ಥಿ ಸಮಾವೇಶಗಳು, ಶೈಕ್ಷಣಿಕ ಸೆಮಿನಾರ್‌ಗಳು ಮತ್ತು ಪ್ರಗತಿಪರ ಸಾಂಸ್ಕೃತಿಕ ಚಳುವಳಿಗಳ ದೃಶ್ಯ ದಾಖಲೆಗಳು.",
            filter_all: "ಎಲ್ಲಾ ಚಿತ್ರಗಳು",
            filter_protest: "ಪ್ರತಿಭಟನೆ ಮತ್ತು ರ‍್ಯಾಲಿಗಳು",
            filter_seminar: "ಸೆಮಿನಾರ್ ಮತ್ತು ವೇದಿಕೆಗಳು",
            filter_meet: "ವಿದ್ಯಾರ್ಥಿ ಸಮ್ಮೇಳನಗಳು",
            filter_cultural: "ಸಾಂಸ್ಕೃತಿಕ ಚಳುವಳಿಗಳು",

            // About - History
            about_history_p1: "ಭಾರತ ವಿದ್ಯಾರ್ಥಿ ಫೆಡರೇಶನ್ (SFI) 1970 ರಲ್ಲಿ ಸ್ಥಾಪಿಸಲ್ಪಟ್ಟಿತು. ಶಿಕ್ಷಣದ ವಾಣಿಜ್ಯೀಕರಣ ಮತ್ತು ಖಾಸಗೀಕರಣವನ್ನು ವಿರೋಧಿಸಿ ರಾಷ್ಟ್ರ ಮಟ್ಟದಲ್ಲಿ ವಿದ್ಯಾರ್ಥಿ ಸಮುದಾಯವನ್ನು ಒಂದುಗೂಡಿಸಲು ಇದನ್ನು ರಚಿಸಲಾಯಿತು. ಐದು ದಶಕಗಳಲ್ಲಿ SFI ಭಾರತದ ಅತಿ ದೊಡ್ಡ ಪ್ರಗತಿಪರ ವಿದ್ಯಾರ್ಥಿ ಸಂಘಟನೆಯಾಗಿ ಬೆಳೆದಿದೆ.",
            about_history_p2: "ದಕ್ಷಿಣ ಕನ್ನಡ ಜಿಲ್ಲೆಯಲ್ಲಿ SFI ಹೋರಾಟಗಳ ಶ್ರೀಮಂತ ಇತಿಹಾಸ ಹೊಂದಿದೆ. ಶೈಕ್ಷಣಿಕ ಕೇಂದ್ರವಾದ ಮಂಗಳೂರು ಮತ್ತು ಸುತ್ತಲಿನ ತಾಲೂಕುಗಳಲ್ಲಿ SFI ಬಸ್ ಪಾಸ್, ಸರ್ಕಾರಿ ಹಾಸ್ಟೆಲ್‌ಗಳ ಸೌಲಭ್ಯ, ಮತ್ತು ಪ್ರಜಾಸತ್ತಾತ್ಮಕ ಪ್ರಾತಿನಿಧ್ಯಕ್ಕಾಗಿ ಹೋರಾಟ ನಡೆಸಿದೆ.",

            // About - Ideology
            ideology_intro: "ಈ ಮೂರು ಪದಗಳು SFI ಯ ಮೂಲ ಸಿದ್ಧಾಂತವನ್ನು ಪ್ರತಿನಿಧಿಸುತ್ತವೆ. ಬಿಳಿ ಬಾವುಟದ ಮೇಲಿನ ಐದು ತೊಟ್ಟಿನ ಕೆಂಪು ನಕ್ಷತ್ರದಲ್ಲಿ ಅವು ಸಂಕೇತಿಸಲ್ಪಟ್ಟಿವೆ.",
            ideology1_title: "ಸ್ವಾತಂತ್ರ್ಯ",
            ideology1_desc: "ಸಾಮ್ರಾಜ್ಯಶಾಹಿ ಪ್ರಭಾವ ಮತ್ತು ವಾಣಿಜ್ಯ ಹಿತಾಸಕ್ತಿಗಳಿಂದ ಮುಕ್ತವಾದ ಶಿಕ್ಷಣ ವ್ಯವಸ್ಥೆ. ವಿದ್ಯಾರ್ಥಿಗಳಲ್ಲಿ ವೈಜ್ಞಾನಿಕ ಮನೋಭಾವ ಮತ್ತು ಪ್ರಗತಿಪರ ಚಿಂತನೆಯನ್ನು ಬೆಳೆಸುವುದು.",
            ideology2_title: "ಪ್ರಜಾಪ್ರಭುತ್ವ",
            ideology2_desc: "ವಿದ್ಯಾರ್ಥಿಗಳ ಸಂಘಟಿಸುವ, ಮಾತನಾಡುವ ಮತ್ತು ಮತ ಚಲಾಯಿಸುವ ಹಕ್ಕು. ಎಲ್ಲ ಕಾಲೇಜು ಮತ್ತು ವಿಶ್ವವಿದ್ಯಾಲಯಗಳಲ್ಲಿ ಪ್ರಜಾಸತ್ತಾತ್ಮಕ ವಿದ್ಯಾರ್ಥಿ ಸಂಘ ಚುನಾವಣೆಗಳನ್ನು ಮರುಸ್ಥಾಪಿಸಲು SFI ಆಗ್ರಹಿಸುತ್ತದೆ.",
            ideology3_title: "ಸಮಾಜವಾದ",
            ideology3_desc: "ಶೋಷಣೆ ಮುಕ್ತ ಸಮಾಜಕ್ಕಾಗಿ ಹೋರಾಡುವುದು. ಗುಣಮಟ್ಟದ ಶಿಕ್ಷಣ ಮಾರಾಟದ ಸರಕಲ್ಲ, ಬದಲಾಗಿ ಜಾತಿ ಅಥವಾ ಆರ್ಥಿಕ ಸ್ಥಿತಿ ಏನೇ ಆಗಿರಲಿ ಎಲ್ಲರಿಗೂ ಲಭ್ಯವಾಗಬೇಕಾದ ಮೂಲಭೂತ ಮಾನವ ಹಕ್ಕು ಎಂದು ನಾವು ನಂಬುತ್ತೇವೆ.",

            // About - Leadership
            leadership_intro: "ದಕ್ಷಿಣ ಕನ್ನಡ ಜಿಲ್ಲೆಯಿಂದ ರಾಷ್ಟ್ರ ಸಮಿತಿಯವರೆಗೆ ವಿದ್ಯಾರ್ಥಿ ಚಳುವಳಿಯನ್ನು ಮುನ್ನಡೆಸುವ ಹುದ್ದೆ ಪ್ರತಿನಿಧಿಗಳನ್ನು ಭೇಟಿ ಮಾಡಿ.",
            leader1_title: "ಜಿಲ್ಲಾ ಕಾರ್ಯದರ್ಶಿ, ದಕ್ಷಿಣ ಕನ್ನಡ",
            leader1_desc: "ಮಂಗಳೂರಿನಾದ್ಯಂತ ಮೂಲಸೌಕರ್ಯ ಕೊರತೆ, ಬಸ್ ಪಾಸ್ ಸಮಸ್ಯೆ ಮತ್ತು ಶುಲ್ಕ ನಿಯಂತ್ರಣಕ್ಕಾಗಿ ಸ್ಥಳೀಯ ಹೋರಾಟಗಳನ್ನು ಮುನ್ನಡೆಸುವುದು ಮತ್ತು ಪ್ರತಿಭಟನೆ ಆಯೋಜಿಸುವುದು.",
            leader2_title: "ಜಿಲ್ಲಾ ಅಧ್ಯಕ್ಷ, ದಕ್ಷಿಣ ಕನ್ನಡ",
            leader2_desc: "ರಾಜ್ಯ ಮಟ್ಟದ ವಿದ್ಯಾರ್ಥಿ ಹೋರಾಟಗಳ ಸಮನ್ವಯ, ಶಿಕ್ಷಣ ಮಂಡಳಿಗಳಲ್ಲಿ ಪ್ರಾತಿನಿಧ್ಯ ಮತ್ತು ರಾಜ್ಯ ವ್ಯಾಪಿ ನೀತಿ ಮಧ್ಯಸ್ಥಿಕೆ.",
            leader3_title: "ಕರ್ನಾಟಕ ರಾಜ್ಯ ಅಧ್ಯಕ್ಷ",
            leader3_desc: "ರಾಜ್ಯ ಮಟ್ಟದ ವಿದ್ಯಾರ್ಥಿ ಹೋರಾಟಗಳ ಸಮನ್ವಯ, ಶಿಕ್ಷಣ ಮಂಡಳಿಗಳಲ್ಲಿ ಪ್ರಾತಿನಿಧ್ಯ ಮತ್ತು ರಾಜ್ಯ ವ್ಯಾಪಿ ನೀತಿ ಮಧ್ಯಸ್ಥಿಕೆ.",
            leader4_title: "ಕರ್ನಾಟಕ ರಾಜ್ಯ ಕಾರ್ಯದರ್ಶಿ",
            leader4_desc: "ರಾಜ್ಯ ಹೋರಾಟಗಳ ಆಯೋಜನೆ, ಜಿಲ್ಲೆಗಳಾದ್ಯಂತ ಸಂಘಟನೆ ನಿರ್ಮಾಣ ಮತ್ತು ರಾಜ್ಯ ಶಿಕ್ಷಣ ಇಲಾಖೆಗೆ ನಿಯೋಗ ಕಳುಹಿಸುವುದು.",
            leader5_title: "ಅಖಿಲ ಭಾರತ ಅಧ್ಯಕ್ಷ",
            leader5_desc: "ವಿದ್ಯಾರ್ಥಿ ಹಕ್ಕುಗಳು, ಶಿಕ್ಷಣ ಬಜೆಟ್ ವಿಸ್ತರಣೆ ಮತ್ತು ಕೇಂದ್ರ ಶಿಕ್ಷಣ ನೀತಿಗಳ ವಿರುದ್ಧ ರಾಷ್ಟ್ರ ಮಟ್ಟದ ಹೋರಾಟಗಳ ನೇತೃತ್ವ.",

            // About - Structure
            structure_intro: "SFI ಪ್ರಜಾಸತ್ತಾತ್ಮಕ ಕೇಂದ್ರೀಕರಣದ ಆಧಾರದ ಮೇಲೆ ಕಾರ್ಯನಿರ್ವಹಿಸುತ್ತದೆ. ಮುಕ್ತ ಚರ್ಚೆಗಳ ನಂತರ ಸಾಮೂಹಿಕ ನಿರ್ಧಾರ ತೆಗೆದುಕೊಳ್ಳಲಾಗುತ್ತದೆ. ನಮ್ಮ ರಚನೆ ತಳಮಟ್ಟದ ಕಾಲೇಜು ಮಟ್ಟದಿಂದ ರಾಷ್ಟ್ರೀಯ ಕಾರ್ಯಕಾರಿ ಮಂಡಳಿವರೆಗೆ ಪ್ರಾತಿನಿಧ್ಯ ಖಾತ್ರಿಪಡಿಸುತ್ತದೆ.",
            struct_unit_title: "ಪ್ರಾಥಮಿಕ / ಘಟಕ ಸಮಿತಿ",
            struct_unit_desc: "ಪ್ರತ್ಯೇಕ ಕಾಲೇಜು ಮತ್ತು ಹೈಸ್ಕೂಲ್‌ಗಳಲ್ಲಿ ರಚಿಸಲಾಗಿದೆ. ವಿದ್ಯಾರ್ಥಿ ಸಮುದಾಯದ ನೇರ ಸಂಪರ್ಕ.",
            struct_taluk_title: "ಸ್ಥಳೀಯ / ತಾಲೂಕು ಸಮಿತಿ",
            struct_taluk_desc: "ನಿರ್ದಿಷ್ಟ ತಾಲೂಕುಗಳಲ್ಲಿ (ಮಂಗಳೂರು, ಬಂಟ್ವಾಳ, ಪುತ್ತೂರು, ಸುಳ್ಯ, ಬೆಳ್ತಂಗಡಿ) ಘಟಕ ಚಟುವಟಿಕೆಗಳನ್ನು ಸಮನ್ವಯಗೊಳಿಸುತ್ತದೆ.",
            struct_district_title: "ಜಿಲ್ಲಾ ಸಮಿತಿ (SFI DK)",
            struct_district_desc: "ದಕ್ಷಿಣ ಕನ್ನಡ ಜಿಲ್ಲೆಯ ಆಡಳಿತ ಮಂಡಳಿ, ಸ್ಥಳೀಯ ತಾಲೂಕು ಸಮಿತಿಗಳ ಮತ್ತು ವಿದ್ಯಾರ್ಥಿ ಹೋರಾಟಗಳ ನಿರ್ದೇಶನ.",
            struct_state_title: "ರಾಜ್ಯ ಸಮಿತಿ",
            struct_state_desc: "ಕರ್ನಾಟಕದ ಎಲ್ಲ ಜಿಲ್ಲಾ ಸಮಿತಿಗಳನ್ನು ಸಮನ್ವಯಗೊಳಿಸುತ್ತದೆ, ಬೆಂಗಳೂರಿನಲ್ಲಿ ಮುಖ್ಯ ಕಾರ್ಯಾಲಯ.",
            struct_central_title: "ಕೇಂದ್ರ ಕಾರ್ಯಕಾರಿ ಸಮಿತಿ (CEC)",
            struct_central_desc: "ಭಾರತದ ಎಲ್ಲ ರಾಜ್ಯಗಳಲ್ಲಿ SFI ಯನ್ನು ಪ್ರತಿನಿಧಿಸುವ ಅತ್ಯುನ್ನತ ರಾಷ್ಟ್ರೀಯ ಮಂಡಳಿ.",

            // Grievance success
            grievance_success_title: "ಸಮಸ್ಯೆ ಯಶಸ್ವಿಯಾಗಿ ಸಲ್ಲಿಸಲಾಗಿದೆ",
            grievance_success_msg1: "ಸಂಪರ್ಕಿಸಿದ್ದಕ್ಕಾಗಿ ಧನ್ಯವಾದ. ನಿಮ್ಮ ಕುಂದುಕೊರತೆಯನ್ನು ಟಿಕೆಟ್ ಅಡಿ ನೋಂದಾಯಿಸಲಾಗಿದೆ:",
            grievance_success_msg2: "ನಮ್ಮ ಜಿಲ್ಲಾ ವಿದ್ಯಾರ್ಥಿ ಸಮನ್ವಯ ತಂಡ 24-48 ಗಂಟೆಗಳಲ್ಲಿ ಸಮಸ್ಯೆ ಪರಿಶೀಲಿಸಿ ಸಂಪರ್ಕಿಸಲಿದೆ. ಹೋರಾಡಿ!",
            grievance_another_btn: "ಮತ್ತೊಂದು ಸಮಸ್ಯೆ ಸಲ್ಲಿಸಿ",

            // Join / Ticket & Payment
            step1_label: "ಸದಸ್ಯ ವಿವರಗಳು",
            step2_label: "₹2 ಶುಲ್ಕ ಪಾವತಿಸಿ",
            step3_label: "ಸದಸ್ಯತ್ವ ಕಾರ್ಡ್",

            btn_next_payment: "ಮುಂದೆ: ಪಾವತಿಗೆ ತೆರಳಿ (₹2) →",
            payment_badge: "ಸುರಕ್ಷಿತ UPI ಪಾವತಿ",
            payment_title: "QR ಸ್ಕ್ಯಾನ್ ಮಾಡಿ ₹2 ಸದಸ್ಯತ್ವ ಶುಲ್ಕ ಪಾವತಿಸಿ",
            payment_desc: "ನಿಮ್ಮ SFI ಸದಸ್ಯತ್ವ ನೋಂದಣಿಯನ್ನು ಪೂರ್ಣಗೊಳಿಸಲು ಯಾವುದೇ UPI ಆಪ್ (GPay, PhonePe, Paytm, BHIM) ಬಳಸಿ ಸ್ಕ್ಯಾನ್ ಮಾಡಿ.",
            upi_label: "UPI ID:",
            timer_title: "ಸಮಯ ಮುಕ್ತಾಯಗೊಳ್ಳುತ್ತದೆ",
            timer_note: "ನಿಮ್ಮ ತಕ್ಷಣದ ಸದಸ್ಯತ್ವ ಕಾರ್ಡ್ ಪಡೆಯಲು ಸಮಯ ಮುಕ್ತಾಯಗೊಳ್ಳುವ ಮೊದಲು ಪಾವತಿ ಪೂರ್ಣಗೊಳಿಸಿ.",
            btn_confirm_payment: "✅ ನಾನು ಪಾವತಿ ಪೂರ್ಣಗೊಳಿಸಿದ್ದೇನೆ (₹2)",
            btn_back_form: "← ಅರ್ಜಿ ಫಾರ್ಮ್‌ಗೆ ಹಿಂತಿರುಗಿ",

            ticket_title: "SFI ಸದಸ್ಯತ್ವ ಪತ್ರ",
            ticket_subtitle: "ದಕ್ಷಿಣ ಕನ್ನಡ ಜಿಲ್ಲಾ ಘಟಕ",
            ticket_label_name: "ಸದಸ್ಯರ ಹೆಸರು",
            ticket_label_id: "ಸದಸ್ಯತ್ವ ಸಂಖ್ಯೆ",
            ticket_label_college: "ಕಾಲೇಜು",
            ticket_label_taluk: "ತಾಲೂಕು",
            ticket_label_course: "ಕೋರ್ಸ್ ಮತ್ತು ವರ್ಷ",
            ticket_label_date: "ನೋಂದಣಿ ದಿನಾಂಕ",
            ticket_footer: "\"ಓದು ಮತ್ತು ಹೋರಾಟ!\"",
            join_success_congrats: "🎉 ಅಭಿನಂದನೆಗಳು, ನಿಮ್ಮ ಪಾವತಿ ದೃಢೀಕರಿಸಲಾಗಿದೆ & ನೋಂದಾಯಿಸಲ್ಪಟ್ಟಿದ್ದೀರಿ! ಸದಸ್ಯತ್ವ ಕಾರ್ಡ್ ಇಮೇಲ್‌ಗೆ ಕಳುಹಿಸಲಾಗಿದೆ.",
            join_success_info: "ನಿಮ್ಮ ಕಾಲೇಜು ಘಟಕದ ಪ್ರತಿನಿಧಿ ಶೀಘ್ರದಲ್ಲೇ ಸಂಪರ್ಕಿಸಲಿದ್ದಾರೆ. ಈ ಕಾರ್ಡ್‌ನ ಸ್ಕ್ರೀನ್‌ಶಾಟ್ ಇಟ್ಟುಕೊಳ್ಳಿ.",
            join_register_another: "ಮತ್ತೊಬ್ಬ ವಿದ್ಯಾರ್ಥಿ ನೋಂದಾಯಿಸಿ",

            // Select Options & Helpline
            opt_select_taluk: "ತಾಲೂಕು ಆಯ್ಕೆಮಾಡಿ",
            opt_select_year: "ವರ್ಷ ಆಯ್ಕೆಮಾಡಿ",
            opt_y1: "1ನೇ ವರ್ಷ",
            opt_y2: "2ನೇ ವರ್ಷ",
            opt_y3: "3ನೇ ವರ್ಷ",
            opt_y4: "4ನೇ ವರ್ಷ / ಮೇಲ್ಪಟ್ಟು",
            opt_pu1: "PU - 1ನೇ ವರ್ಷ (11ನೇ)",
            opt_pu2: "PU - 2ನೇ ವರ್ಷ (12ನೇ)",

            helpline_title: "SFI DK ವಿದ್ಯಾರ್ಥಿ ಸಹಾಯವಾಣಿ",
            helpline_desc: "ತಕ್ಷಣದ ಸಹಾಯ ಅಥವಾ ತುರ್ತು ಪರಿಸ್ಥಿತಿಗಾಗಿ, ನಮ್ಮ ಪ್ರತಿನಿಧಿಗಳನ್ನು ನೇರವಾಗಿ ಸಂಪರ್ಕಿಸಬಹುದು:",
            office_mangaluru: "ಜಿಲ್ಲಾ ಕಛೇರಿ (ಮಂಗಳೂರು)",
            office_email: "ಇಮೇಲ್ ವಿಳಾಸ",
            office_address_title: "ಜಿಲ್ಲಾ ಕಛೇರಿ ವಿಳಾಸ",
            office_address: "1ನೇ ಮಹಡಿ, ವಿಕಾಸ್, ಸ್ಟೇಟ್ ಬ್ಯಾಂಕ್ ಹತ್ತಿರ, ಮಂಗಳೂರು, ದಕ್ಷಿಣ ಕನ್ನಡ - 575001",
            resources_title: "ಪ್ರಮುಖ ವಿದ್ಯಾರ್ಥಿ ಸಂಪನ್ಮೂಲಗಳು",
            resources_desc: "ದಕ್ಷಿಣ ಕನ್ನಡದ ವಿದ್ಯಾರ್ಥಿಗಳು ಹೆಚ್ಚಾಗಿ ಬಳಸುವ ವೆಬ್‌ಸೈಟ್‌ಗಳು:",
            res_mu: "ಮಂಗಳೂರು ವಿಶ್ವವಿದ್ಯಾಲಯ ವೆಬ್‌ಸೈಟ್",
            res_ssp: "ರಾಜ್ಯ ವಿದ್ಯಾರ್ಥಿವೇತನ ಪೋರ್ಟಲ್ (SSP)",
            res_bus: "KSRTC ವಿದ್ಯಾರ್ಥಿ ಬಸ್ ಪಾಸ್ ಪೋರ್ಟಲ್",

            footer_org_name: "ಭಾರತ ವಿದ್ಯಾರ್ಥಿ ಫೆಡರೇಶನ್",
            footer_motto: "\"ಓದು ಮತ್ತು ಹೋರಾಟ. ಸ್ವಾತಂತ್ರ್ಯ, ಪ್ರಜಾಪ್ರಭುತ್ವ, ಸಮಾಜವಾದ.\"",
            footer_admin_link: "ನಿರ್ವಾಹಕ ಪ್ರವೇಶ ದ್ವಾರ",
            footer_copyright: "© 2026 SFI ದಕ್ಷಿಣ ಕನ್ನಡ. ಪ್ರಗತಿಪರ ವಿದ್ಯಾರ್ಥಿ ಚಳುವಳಿಗಾಗಿ ನಿರ್ಮಿಸಲಾಗಿದೆ. ಸರ್ವ ಹಕ್ಕುಗಳನ್ನು ಕಾಯ್ದಿರಿಸಲಾಗಿದೆ.",
            footer_sub_text: "SFI ಅಖಿಲ ಭಾರತ ಸಮಿತಿಯೊಂದಿಗೆ ಸಂಯೋಜಿತವಾಗಿದೆ. ಮಂಗಳೂರು, ಬಂಟ್ವಾಳ, ಪುತ್ತೂರು, ಸುಳ್ಯ, ಬೆಳ್ತಂಗಡಿ, ಮೂಡುಬಿದಿರೆ ಮತ್ತು ಕಡಬದಲ್ಲಿ ಸಕ್ರಿಯವಾಗಿದೆ.",

            // Admin Panel
            admin_portal_title: "ನಿರ್ವಾಹಕ ಪ್ರವೇಶ ದ್ವಾರ",
            admin_portal_desc: "ನೋಂದಣಿ, ಕುಂದುಕೊರತೆ ಮತ್ತು ಸುದ್ದಿ ಪ್ರಕಟಿಸಲು ನಿರ್ವಾಹಕ ಪಾಸ್‌ವರ್ಡ್ ನಮೂದಿಸಿ.",
            admin_password_label: "ಪಾಸ್‌ವರ್ಡ್",
            admin_auth_btn: "ದೃಢೀಕರಿಸಿ",
            admin_auth_error: "ತಪ್ಪಾದ ಪಾಸ್‌ವರ್ಡ್. ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ.",
            admin_dashboard_title: "ನಿರ್ವಾಹಕ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್",
            admin_dashboard_subtitle: "SFI ದಕ್ಷಿಣ ಕನ್ನಡ ನಿರ್ವಹಣಾ ಕೇಂದ್ರ",
            admin_logout_btn: "ಹೊರಗೆ ಹೋಗಿ",
            admin_tab_members: "ಸದಸ್ಯ ನಿರ್ದೇಶಿಕೆ",
            admin_tab_grievances: "ವಿದ್ಯಾರ್ಥಿ ಸಮಸ್ಯೆಗಳು",
            admin_tab_news: "ಸುದ್ದಿ ಪ್ರಕಾಶಕ",
            admin_news_title: "ಹೊಸ ಅಪ್ಡೇಟ್ ಪ್ರಕಟಿಸಿ",
            admin_news_desc: "ಸುದ್ದಿ, ಹೋರಾಟದ ಘೋಷಣೆ ಅಥವಾ ಪ್ರತಿಭಟನೆ ವಿವರ ಪ್ರಕಟಿಸಿ. ಇದು ತಕ್ಷಣ ಮುಖಪುಟ ಸುದ್ದಿ ಕ್ಯಾರೋಸೆಲ್‌ನಲ್ಲಿ ತೋರಿಸುತ್ತದೆ."
        }
    };

    function applyLanguage() {
        const lang = STATE.language;

        // Update toggle button text to show the option they can switch TO
        const langTextLabel = document.getElementById("lang-text-label");
        if (langTextLabel) {
            langTextLabel.innerText = lang === "en" ? "ಕನ್ನಡ" : "EN";
        }

        // Update all standard nodes with data-i18n
        const i18nElements = document.querySelectorAll("[data-i18n]");
        i18nElements.forEach(el => {
            const key = el.getAttribute("data-i18n");
            if (TRANSLATIONS[lang] && TRANSLATIONS[lang][key]) {
                // If element has a child with class 'required', preserve it
                const reqSpan = el.querySelector(".required");
                if (reqSpan) {
                    el.childNodes[0].textContent = TRANSLATIONS[lang][key] + " ";
                } else {
                    el.innerText = TRANSLATIONS[lang][key];
                }
            }
        });
        
        const storedSiteContent = localStorage.getItem("sfi_dk_site_content");
        if (storedSiteContent) {
            STATE.siteContent = JSON.parse(storedSiteContent);
        } else {
            STATE.siteContent = { ...DEFAULT_SITE_CONTENT };
        }

        // Apply translations, placeholders, and dynamic DOM injection dynamically
        const placeholderMappings = {
            "grievance-name": "Enter your name",
            "grievance-phone": "10-digit mobile number",
            "grievance-email": "student@example.com",
            "grievance-college": "College name and location",
            "grievance-description": "Please describe the issue in detail, mentioning dates, locations, or specific grievances...",
            "member-name": "Your full name",
            "member-phone": "10-digit number",
            "member-email": "your.email@gmail.com",
            "member-college": "Name of your institution",
            "member-course": "e.g., B.A, B.Sc, B.Com, B.E, PU, etc.",
        };

        const knPlaceholders = {
            "grievance-name": "ನಿಮ್ಮ ಹೆಸರನ್ನು ನಮೂದಿಸಿ",
            "grievance-phone": "10-ಅಂಕಿಯ ಮೊಬೈಲ್ ಸಂಖ್ಯೆ",
            "grievance-email": "student@example.com",
            "grievance-college": "ಕಾಲೇಜಿನ ಹೆಸರು ಮತ್ತು ಸ್ಥಳ",
            "grievance-description": "ದಯವಿಟ್ಟು ಸಮಸ್ಯೆಯನ್ನು ವಿವರವಾಗಿ ಬರೆಯಿರಿ, ದಿನಾಂಕ ಮತ್ತು ಸ್ಥಳಗಳನ್ನು ಉಲ್ಲೇಖಿಸಿ...",
            "member-name": "ನಿಮ್ಮ ಪೂರ್ಣ ಹೆಸರು",
            "member-phone": "10-ಅಂಕಿಯ ಸಂಖ್ಯೆ",
            "member-email": "your.email@gmail.com",
            "member-college": "ನಿಮ್ಮ ಕಾಲೇಜಿನ ಹೆಸರು",
            "member-course": "ಉದಾಹರಣೆಗೆ: B.A, B.Sc, B.Com, B.E, PU, ಇತ್ಯಾದಿ",
        };

        for (const id in placeholderMappings) {
            const el = document.getElementById(id);
            if (el) {
                el.placeholder = lang === "en" ? placeholderMappings[id] : knPlaceholders[id];
            }
        }

        // Re-render dynamically translated campaigns and daily news
        renderCampaigns();
        renderDailyNews();
        renderSiteContent();
    }

    // --- Init Webapp ---
    init();
});
