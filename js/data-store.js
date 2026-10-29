/**
 * SFI Dakshina Kannada - Central Data Store & Synchronization Layer
 * Students' Federation of India - Dakshina Kannada District Committee
 */

const SFI_DATA_KEYS = {
  SITE_CONTENT: 'sfi_dk_site_content',
  TICKER: 'sfi_dk_ticker',
  NEWS: 'sfi_dk_news',
  CAMPAIGNS: 'sfi_dk_campaigns',
  STATEMENTS: 'sfi_dk_statements',
  MARTYRS: 'sfi_dk_martyrs',
  LEADERS: 'sfi_dk_leaders',
  GALLERY: 'sfi_dk_gallery',
  BLOOD_DONORS: 'sfi_dk_blood_donors',
  MESSAGES: 'sfi_dk_messages',
  AUTH: 'sfi_dk_admin_auth',
  DISTRICTS: 'sfi_dk_districts',
  ACTIVITIES: 'sfi_dk_activities'
};

const DEFAULT_SFI_DATA = {
  "siteContent": {
    "heroTitle_en": "Organize for Free Public Education, Struggle for Student Rights!",
    "heroTitle_kn": "ಉಚಿತ ಸಾರ್ವಜನಿಕ ಶಿಕ್ಷಣಕ್ಕಾಗಿ ಸಂಘಟಿತರಾಗಿ, ವಿದ್ಯಾರ್ಥಿ ಹಕ್ಕುಗಳಿಗಾಗಿ ಹೋರಾಡಿ!",
    "heroSub_en": "Students' Federation of India (SFI) Dakshina Kannada District Committee — Mobilizing progressive students across Mangaluru, Bantwal, Puttur, Belthangady, Sullia, Moodbidri, and Kadaba against commercialization and injustice.",
    "heroSub_kn": "ಭಾರತ ವಿದ್ಯಾರ್ಥಿ ಫೆಡರೇಷನ್ (ಎಸ್.ಎಫ್.ಐ) ದಕ್ಷಿಣ ಕನ್ನಡ ಜಿಲ್ಲಾ ಸಮಿತಿ — ಮಂಗಳೂರು, ಬಂಟ್ವಾಳ, ಪುತ್ತೂರು, ಬೆಳ್ತಂಗಡಿ, ಸುಳ್ಯ, ಮೂಡುಬಿದರೆ, ಕಡಬದಾದ್ಯಂತ ವಿದ್ಯಾರ್ಥಿ ಸಮುದಾಯದ ಸಮರಶೀಲ ಧ್ವನಿ.",
    "quoteText_en": "Study & Struggle! Independence, Democracy, Socialism!",
    "quoteText_kn": "ಅಧ್ಯಯನ ಮತ್ತು ಹೋರಾಟ! ಸ್ವಾತಂತ್ರ್ಯ, ಪ್ರಜಾಪ್ರಭುತ್ವ, ಸಮಾಜವಾದ!",
    "quoteAuthor": "SFI Motto",
    "officeAddress_en": "SFI Dakshina Kannada District Committee, First Floor, Vikas Building, Near State Bank, Mangaluru - 575001.",
    "officeAddress_kn": "ಎಸ್.ಎಫ್.ಐ ದಕ್ಷಿಣ ಕನ್ನಡ ಜಿಲ್ಲಾ ಸಮಿತಿ, 1ನೇ ಮಹಡಿ, ವಿಕಾಸ್ ಕಟ್ಟಡ, ಸ್ಟೇಟ್ ಬ್ಯಾಂಕ್ ಹತ್ತಿರ, ಮಂಗಳೂರು - 575001.",
    "phone1": "+91 9480112233",
    "phone2": "+91 9480000000",
    "landline": "+91 824 2420000",
    "email": "sfidk19@gmail.com",
    "socialFb": "https://facebook.com/sfidakshinakannada",
    "socialInsta": "https://instagram.com/sfi_dakshina_kannada",
    "socialYt": "https://youtube.com/@sfidakshinakannada",
    "socialX": "https://twitter.com/sfidk"
  },
  "ticker": [
    {
      "id": "t1",
      "text_en": "SFI Dakshina Kannada 19th District Conference Resolutions & 24x7 Student Helpline Active!",
      "text_kn": "ಎಸ್.ಎಫ್.ಐ ದಕ್ಷಿಣ ಕನ್ನಡ 19ನೇ ಜಿಲ್ಲಾ ಸಮ್ಮೇಳನದ ನಿರ್ಣಯಗಳು ಹಾಗೂ 24x7 ವಿದ್ಯಾರ್ಥಿ ಸಹಾಯವಾಣಿ ಸಕ್ರಿಯ!",
      "active": true
    },
    {
      "id": "t2",
      "text_en": "Demanding special KSRTC student buses and prompt digital bus pass verification across all rural taluks.",
      "text_kn": "ಗ್ರಾಮೀಣ ಭಾಗದ ವಿದ್ಯಾರ್ಥಿಗಳಿಗೆ ವಿಶೇಷ ಕೆ.ಎಸ್.ಆರ್.ಟಿ.ಸಿ ಬಸ್ ಸೌಲಭ್ಯ ಹಾಗೂ ಉಚಿತ ಬಸ್ ಪಾಸ್ ವಿತರಣೆಗೆ ಆಗ್ರಹ.",
      "active": true
    }
  ],
  "news": [
    {
      "id": "n1",
      "title_en": "SFI Dakshina Kannada District Convention Resolves to Fight for Free Public Education",
      "title_kn": "ಉಚಿತ ಗುಣಮಟ್ಟದ ಸಾರ್ವಜನಿಕ ಶಿಕ್ಷಣಕ್ಕಾಗಿ ಬೃಹತ್ ಹೋರಾಟಕ್ಕೆ ಎಸ್.ಎಫ್.ಐ ದಕ್ಷಿಣ ಕನ್ನಡ ಜಿಲ್ಲಾ ಸಮಾವೇಶ ಕರೆ",
      "category": "Convention",
      "date": "2026-10-18",
      "image": "images/Conference.png",
      "desc_en": "Student delegates from colleges across Mangaluru, Puttur, and Bantwal resolved to resist fee hikes and privatization.",
      "desc_kn": "ಮಂಗಳೂರು, ಪುತ್ತೂರು, ಬಂಟ್ವಾಳ ಸೇರಿದಂತೆ ಜಿಲ್ಲೆಯ ಎಲ್ಲಾ ಕಾಲೇಜುಗಳಿಂದ ಆಗಮಿಸಿದ ವಿದ್ಯಾರ್ಥಿ ಪ್ರತಿನಿಧಿಗಳಿಂದ ಶಿಕ್ಷಣದ ವ್ಯಾಪಾರೀಕರಣದ ವಿರುದ್ಧ ಸಮರಶೀಲ ನಿರ್ಣಯ."
    },
    {
      "id": "n2",
      "title_en": "Protest March in Mangaluru Against Inadequate KSRTC Buses for Rural Students",
      "title_kn": "ಗ್ರಾಮೀಣ ಕಾಲೇಜು ವಿದ್ಯಾರ್ಥಿಗಳಿಗೆ ಸಮರ್ಪಕ ಕೆಎಸ್‌ಆರ್‌ಟಿಸಿ ಬಸ್ ವ್ಯವಸ್ಥೆಗೆ ಆಗ್ರಹಿಸಿ ಮಂಗಳೂರಿನಲ್ಲಿ ಬೃಹತ್ ಪ್ರತಿಭಟನೆ",
      "category": "Protest",
      "date": "2026-10-09",
      "image": "images/protest.png",
      "desc_en": "SFI delegation submitted an urgent memorandum to KSRTC Divisional Controller demanding additional bus trips during college hours.",
      "desc_kn": "ಕಾಲೇಜು ವೇಳೆಯಲ್ಲಿ ವಿದ್ಯಾರ್ಥಿಗಳಿಗೆ ತೊಂದರೆಯಾಗದಂತೆ ಹೆಚ್ಚುವರಿ ಬಸ್ ನಿಯೋಜಿಸಲು ಕೆಎಸ್‌ಆರ್‌ಟಿಸಿ ವಿಭಾಗೀಯ ನಿಯಂತ್ರಣಾಧಿಕಾರಿಗಳಿಗೆ ಮನವಿ ಸಲ್ಲಿಕೆ."
    },
    {
      "id": "n3",
      "title_en": "24x7 SFI Student Help Desk and Grievance Portal Launched",
      "title_kn": "ಎಸ್.ಎಫ್.ಐ 24x7 ವಿದ್ಯಾರ್ಥಿ ಸಹಾಯವಾಣಿ ಹಾಗೂ ಆನ್‌ಲೈನ್ ದೂರು ಪರಿಹಾರ ಪೋರ್ಟಲ್ ಆರಂಭ",
      "category": "Helpline",
      "date": "2026-09-30",
      "image": "images/sfi_hero_bg.png",
      "desc_en": "Helping students with university exam issues, scholarship delays, hostel admissions, and academic grievances.",
      "desc_kn": "ಪರೀಕ್ಷಾ ಅಕ್ರಮಗಳು, ಸ್ಕಾಲರ್‌ಶಿಪ್ ವಿಳಂಬ ಹಾಗೂ ಹಾಸ್ಟೆಲ್ ಸಮಸ್ಯೆಗಳಿಗೆ ಸ್ಪಂದಿಸಲು ಜಿಲ್ಲಾಮಟ್ಟದ ನಿರಂತರ ಸಹಾಯವಾಣಿ."
    }
  ],
  "campaigns": [
    {
      "id": "c1",
      "title_en": "Student Bus Pass & Rural Transport Rights",
      "title_kn": "ವಿದ್ಯಾರ್ಥಿ ಬಸ್ ಪಾಸ್ ಹಾಗೂ ಗ್ರಾಮೀಣ ಸಾರಿಗೆ ಹಕ್ಕುಗಳ ಹೋರಾಟ",
      "category": "Transport Rights",
      "progress": 90,
      "desc_en": "Demanding student concession buses across Sullia, Belthangady, Bantwal, and Kadaba rural routes.",
      "desc_kn": "ಸುಳ್ಯ, ಬೆಳ್ತಂಗಡಿ, ಬಂಟ್ವಾಳ ಹಾಗೂ ಕಡಬದ ಗ್ರಾಮೀಣ ಭಾಗಗಳ ವಿದ್ಯಾರ್ಥಿಗಳಿಗೆ ರಿಯಾಯಿತಿ ದರದ ಸಮರ್ಪಕ ಬಸ್ ಸೌಲಭ್ಯಕ್ಕೆ ನಿರಂತರ ಹೋರಾಟ.",
      "status": "Active"
    },
    {
      "id": "c2",
      "title_en": "Save Public Education — Stop University Fee Hikes",
      "title_kn": "ಸಾರ್ವಜನಿಕ ಶಿಕ್ಷಣ ಉಳಿಸಿ — ಮಂಗಳೂರು ವಿವಿ ಶುಲ್ಕ ಹೆಚ್ಚಳ ವಿರೋಧಿಸಿ",
      "category": "Education Policy",
      "progress": 85,
      "desc_en": "Continuous resistance against commercialization of education, syllabus dilution, and unscientific examination fees.",
      "desc_kn": "ಮಂಗಳೂರು ವಿಶ್ವವಿದ್ಯಾಲಯದ ಪರೀಕ್ಷಾ ಶುಲ್ಕ ಏರಿಕೆ ಹಾಗೂ ಶಿಕ್ಷಣದ ವ್ಯಾಪಾರೀಕರಣದ ವಿರುದ್ಧ ವಿದ್ಯಾರ್ಥಿಗಳ ಪ್ರತಿರೋಧ.",
      "status": "Active"
    },
    {
      "id": "c3",
      "title_en": "Government Hostels & Scholarships for SC/ST/OBC Students",
      "title_kn": "ಸರ್ಕಾರಿ ಹಾಸ್ಟೆಲ್ ಮೂಲಸೌಕರ್ಯ & ವಿದ್ಯಾರ್ಥಿ ವೇತನ ಬಿಡುಗಡೆಗೆ ಆಗ್ರಹ",
      "category": "Student Welfare",
      "progress": 80,
      "desc_en": "Inspecting government hostels across DK district to ensure hygienic food, clean water, and prompt scholarship disbursement.",
      "desc_kn": "ಜಿಲ್ಲೆಯ ಎಲ್ಲಾ ಸರ್ಕಾರಿ ವಿದ್ಯಾರ್ಥಿನಿಲಯಗಳಲ್ಲಿ ಶುದ್ಧ ಕುಡಿಯುವ ನೀರು, ಪೌಷ್ಟಿಕ ಆಹಾರ ಹಾಗೂ ಬಾಕಿ ಇರುವ ವಿದ್ಯಾರ್ಥಿ ವೇತನ ತಕ್ಷಣ ಬಿಡುಗಡೆಗೆ ಆಗ್ರಹ.",
      "status": "Active"
    }
  ],
  "statements": [
    {
      "id": "st1",
      "title_en": "SFI DK Statement Condemning Mangalore University Exam Fee Hike and Results Delay",
      "title_kn": "ಮಂಗಳೂರು ವಿವಿಯ ಅಕ್ರಮ ಪರೀಕ್ಷಾ ಶುಲ್ಕ ಏರಿಕೆ ಹಾಗೂ ಫಲಿತಾಂಶ ವಿಳಂಬವನ್ನು ಖಂಡಿಸಿ ಎಸ್.ಎಫ್.ಐ ಹೇಳಿಕೆ",
      "refNo": "SFI-DK-ST-2026/01",
      "date": "2026-10-15",
      "category": "University Issues",
      "fileUrl": "#"
    },
    {
      "id": "st2",
      "title_en": "Press Release: SFI DK Demands Immediate Sanction of Rural Student Special Buses",
      "title_kn": "ಪತ್ರಿಕಾ ಪ್ರಕಟಣೆ: ಗ್ರಾಮೀಣ ವಿದ್ಯಾರ್ಥಿಗಳಿಗೆ ತಕ್ಷಣ ವಿಶೇಷ ಬಸ್ ಸೌಲಭ್ಯ ಕಲ್ಪಿಸಲು ಎಸ್.ಎಫ್.ಐ ಆಗ್ರಹ",
      "refNo": "SFI-DK-PR-2026/07",
      "date": "2026-10-05",
      "category": "Transport Rights",
      "fileUrl": "#"
    }
  ],
  "martyrs": [
    {
      "id": "m1",
      "name_en": "Comrade Lekhraj",
      "name_kn": "ಕಾಮ್ರೇಡ್ ಲೇಖ್‌ರಾಜ್",
      "role_en": "Immortal SFI Student Martyr",
      "role_kn": "ಅಮರ ವಿದ್ಯಾರ್ಥಿ ಹುತಾತ್ಮ",
      "date": "1974-08-14",
      "place_en": "Campus Rights Struggle",
      "place_kn": "ಕ್ಯಾಂಪಸ್ ಹಕ್ಕುಗಳ ಹೋರಾಟ",
      "photo": "images/che-guevara.jpg",
      "bio_en": "Laid down his life bravely defending student rights and democratic representation.",
      "bio_kn": "ವಿದ್ಯಾರ್ಥಿ ಹಕ್ಕುಗಳು ಹಾಗೂ ಪ್ರಜಾಸತ್ತಾತ್ಮಕ ಕ್ಯಾಂಪಸ್ ವಾತಾವರಣಕ್ಕಾಗಿ ಹುತಾತ್ಮರಾದ ಧೀರ ಹೋರಾಟಗಾರ."
    }
  ],
  "leaders": [
    {
      "id": "l1",
      "name_en": "Comrade Vinayak S I",
      "name_kn": "ಕಾಮ್ರೇಡ್ ವಿನಾಯಕ ಎಸ್.ಐ",
      "role_en": "District Secretary",
      "role_kn": "ಜಿಲ್ಲಾ ಕಾರ್ಯದರ್ಶಿ",
      "tier": "district",
      "region": "SFI Dakshina Kannada",
      "phone": "+91 9480112233",
      "photo": "https://res.cloudinary.com/avytjxre/image/upload/v1788021848/photo.jpg"
    },
    {
      "id": "l2",
      "name_en": "Comrade Hazlan",
      "name_kn": "ಕಾಮ್ರೇಡ್ ಹಜ್ಲಾನ್",
      "role_en": "District President",
      "role_kn": "ಜಿಲ್ಲಾಧ್ಯಕ್ಷರು",
      "tier": "district",
      "region": "SFI Dakshina Kannada",
      "phone": "+91 9480112234",
      "photo": "https://res.cloudinary.com/avytjxre/image/upload/v1788021809/hazlan.jpg"
    },
    {
      "id": "l3",
      "name_en": "Comrade Shivappa",
      "name_kn": "ಕಾಮ್ರೇಡ್ ಶಿವಪ್ಪ",
      "role_en": "District Vice President",
      "role_kn": "ಜಿಲ್ಲಾ ಉಪಾಧ್ಯಕ್ಷರು",
      "tier": "district",
      "region": "SFI Dakshina Kannada",
      "phone": "+91 9480112235",
      "photo": "https://res.cloudinary.com/avytjxre/image/upload/v1788021817/shivappa.jpg"
    },
    {
      "id": "l4",
      "name_en": "Comrade Vijay",
      "name_kn": "ಕಾಮ್ರೇಡ್ ವಿಜಯ್",
      "role_en": "District Joint Secretary",
      "role_kn": "ಜಿಲ್ಲಾ ಜೊತೆ ಕಾರ್ಯದರ್ಶಿ",
      "tier": "district",
      "region": "SFI Dakshina Kannada",
      "phone": "+91 9480112236",
      "photo": "https://res.cloudinary.com/avytjxre/image/upload/v1788021819/vijay.png"
    },
    {
      "id": "l5",
      "name_en": "Comrade Adarsh M Saji",
      "name_kn": "ಕಾಮ್ರೇಡ್ ಆದರ್ಶ್ ಎಂ. ಸಾಜಿ",
      "role_en": "District Joint Secretary",
      "role_kn": "ಜಿಲ್ಲಾ ಜೊತೆ ಕಾರ್ಯದರ್ಶಿ",
      "tier": "district",
      "region": "SFI Dakshina Kannada",
      "phone": "+91 9480112237",
      "photo": "https://res.cloudinary.com/avytjxre/image/upload/v1788021809/Adarsh-m-saji-sfi.avif"
    }
  ],
  "gallery": [
    {
      "id": "g1",
      "title_en": "SFI DK District Conference 2026",
      "title_kn": "ಎಸ್.ಎಫ್.ಐ ದಕ್ಷಿಣ ಕನ್ನಡ ಜಿಲ್ಲಾ ಸಮಾವೇಶ 2026",
      "category": "Conferences",
      "image": "images/Conference.png",
      "caption": "Hundreds of student delegates gathered at Mangaluru."
    },
    {
      "id": "g2",
      "title_en": "Mass Student Protest at DC Office",
      "title_kn": "ಜಿಲ್ಲಾಧಿಕಾರಿ ಕಚೇರಿ ಎದುರು ಬೃಹತ್ ವಿದ್ಯಾರ್ಥಿ ಪ್ರತಿಭಟನೆ",
      "category": "Rallies",
      "image": "images/protest.png",
      "caption": "Demanding student bus pass rights and proper college infrastructure."
    },
    {
      "id": "g3",
      "title_en": "Study & Struggle Campus Jatha",
      "title_kn": "ಅಧ್ಯಯನ ಮತ್ತು ಹೋರಾಟ ಕ್ಯಾಂಪಸ್ ಜಥಾ",
      "category": "Rallies",
      "image": "images/sfi_hero_bg.png",
      "caption": "SFI flag raised high across coastal campuses."
    }
  ],
  "bloodDonors": [
    {
      "id": "bd1",
      "name": "Comrade Vinayak",
      "bloodGroup": "O+",
      "district": "Dakshina Kannada",
      "phone": "9480112233",
      "lastDonated": "2026-08-15"
    },
    {
      "id": "bd2",
      "name": "Comrade Nihal",
      "bloodGroup": "B+",
      "district": "Dakshina Kannada",
      "phone": "9480112234",
      "lastDonated": "2026-07-20"
    }
  ],
  "districts": [
    { "name": "Mangaluru City", "taluk": "Mangaluru", "leader": "Comrade Sinan", "phone": "9480112233" },
    { "name": "Mangaluru Rural", "taluk": "Mangaluru", "leader": "Comrade Nihal", "phone": "9480112234" },
    { "name": "Bantwal", "taluk": "Bantwal", "leader": "Comrade Kaushik", "phone": "9480112235" },
    { "name": "Puttur", "taluk": "Puttur", "leader": "Comrade Suhas", "phone": "9480112236" },
    { "name": "Belthangady", "taluk": "Belthangady", "leader": "Comrade Anusha", "phone": "9480112237" },
    { "name": "Sullia", "taluk": "Sullia", "leader": "Comrade Yathish", "phone": "9480112238" },
    { "name": "Moodbidri", "taluk": "Moodbidri", "leader": "Comrade Pranav", "phone": "9480112239" },
    { "name": "Kadaba", "taluk": "Kadaba", "leader": "Comrade Chethan", "phone": "9480112240" }
  ],
  "activities": [
    {
      "id": "a1",
      "title_en": "Mangaluru City College Campus Unit Meet",
      "title_kn": "ಮಂಗಳೂರು ನಗರ ಕಾಲೇಜುಗಳ ಘಟಕ ಸಭೆ",
      "date": "2026-10-20",
      "desc_en": "Formulating semester student helpline committees in University College & GFGC Carstreet.",
      "desc_kn": "ವಿಶ್ವವಿದ್ಯಾನಿಲಯ ಕಾಲೇಜು ಹಾಗೂ ಕಾರ್‌ಸ್ಟ್ರೀಟ್ ಕಾಲೇಜಿನಲ್ಲಿ ವಿದ್ಯಾರ್ಥಿ ಸಹಾಯವಾಣಿ ಘಟಕ ರಚನೆ."
    },
    {
      "id": "a2",
      "title_en": "Campus Cleanliness & Book Donation Drive",
      "title_kn": "ಕ್ಯಾಂಪಸ್ ಸ್ವಚ್ಛತೆ ಹಾಗೂ ಉಚಿತ ಪುಸ್ತಕ ವಿತರಣಾ ಅಭಿಯಾನ",
      "date": "2026-10-12",
      "desc_en": "Distributing textbooks and question banks to underprivileged college students.",
      "desc_kn": "ಬಡ ವಿದ್ಯಾರ್ಥಿಗಳಿಗೆ ಪಠ್ಯಪುಸ್ತಕ ಹಾಗೂ ಹಳೆಯ ಪ್ರಶ್ನೆಪತ್ರಿಕೆಗಳ ಉಚಿತ ವಿತರಣೆ."
    }
  ],
  "messages": []
};

class SfiDataStore {
  static get(key) {
    try {
      const val = localStorage.getItem(key);
      return val ? JSON.parse(val) : null;
    } catch (e) {
      console.warn("Error reading localStorage for", key, e);
      return null;
    }
  }

  static set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (e) {
      console.warn("Error setting localStorage for", key, e);
      return false;
    }
  }

  static init() {
    const keys = Object.keys(SFI_DATA_KEYS);
    keys.forEach(k => {
      const storageKey = SFI_DATA_KEYS[k];
      if (!localStorage.getItem(storageKey)) {
        switch (storageKey) {
          case SFI_DATA_KEYS.SITE_CONTENT: this.set(storageKey, DEFAULT_SFI_DATA.siteContent); break;
          case SFI_DATA_KEYS.TICKER: this.set(storageKey, DEFAULT_SFI_DATA.ticker); break;
          case SFI_DATA_KEYS.NEWS: this.set(storageKey, DEFAULT_SFI_DATA.news); break;
          case SFI_DATA_KEYS.CAMPAIGNS: this.set(storageKey, DEFAULT_SFI_DATA.campaigns); break;
          case SFI_DATA_KEYS.STATEMENTS: this.set(storageKey, DEFAULT_SFI_DATA.statements); break;
          case SFI_DATA_KEYS.MARTYRS: this.set(storageKey, DEFAULT_SFI_DATA.martyrs); break;
          case SFI_DATA_KEYS.LEADERS: this.set(storageKey, DEFAULT_SFI_DATA.leaders); break;
          case SFI_DATA_KEYS.GALLERY: this.set(storageKey, DEFAULT_SFI_DATA.gallery); break;
          case SFI_DATA_KEYS.BLOOD_DONORS: this.set(storageKey, DEFAULT_SFI_DATA.bloodDonors); break;
          case SFI_DATA_KEYS.MESSAGES: this.set(storageKey, DEFAULT_SFI_DATA.messages); break;
          case SFI_DATA_KEYS.DISTRICTS: this.set(storageKey, DEFAULT_SFI_DATA.districts); break;
          case SFI_DATA_KEYS.ACTIVITIES: this.set(storageKey, DEFAULT_SFI_DATA.activities); break;
        }
      }
    });

    // Always ensure SFI leaders and content are fresh
    this.set(SFI_DATA_KEYS.SITE_CONTENT, DEFAULT_SFI_DATA.siteContent);
    this.set(SFI_DATA_KEYS.LEADERS, DEFAULT_SFI_DATA.leaders);
    this.set(SFI_DATA_KEYS.CAMPAIGNS, DEFAULT_SFI_DATA.campaigns);
    this.set(SFI_DATA_KEYS.TICKER, DEFAULT_SFI_DATA.ticker);
  }

  static resetToDefaults() {
    this.set(SFI_DATA_KEYS.SITE_CONTENT, DEFAULT_SFI_DATA.siteContent);
    this.set(SFI_DATA_KEYS.TICKER, DEFAULT_SFI_DATA.ticker);
    this.set(SFI_DATA_KEYS.NEWS, DEFAULT_SFI_DATA.news);
    this.set(SFI_DATA_KEYS.CAMPAIGNS, DEFAULT_SFI_DATA.campaigns);
    this.set(SFI_DATA_KEYS.STATEMENTS, DEFAULT_SFI_DATA.statements);
    this.set(SFI_DATA_KEYS.MARTYRS, DEFAULT_SFI_DATA.martyrs);
    this.set(SFI_DATA_KEYS.LEADERS, DEFAULT_SFI_DATA.leaders);
    this.set(SFI_DATA_KEYS.GALLERY, DEFAULT_SFI_DATA.gallery);
    this.set(SFI_DATA_KEYS.BLOOD_DONORS, DEFAULT_SFI_DATA.bloodDonors);
    this.set(SFI_DATA_KEYS.MESSAGES, DEFAULT_SFI_DATA.messages);
    this.set(SFI_DATA_KEYS.DISTRICTS, DEFAULT_SFI_DATA.districts);
    this.set(SFI_DATA_KEYS.ACTIVITIES, DEFAULT_SFI_DATA.activities);
    return true;
  }
}

window.DyfiDataStore = SfiDataStore;
window.SfiDataStore = SfiDataStore;
window.DYFI_DATA_KEYS = SFI_DATA_KEYS;
window.SFI_DATA_KEYS = SFI_DATA_KEYS;
window.DEFAULT_DYFI_DATA = DEFAULT_SFI_DATA;
window.DEFAULT_SFI_DATA = DEFAULT_SFI_DATA;

if (typeof window !== 'undefined') {
  SfiDataStore.init();
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { SfiDataStore, SFI_DATA_KEYS, DEFAULT_SFI_DATA };
}
