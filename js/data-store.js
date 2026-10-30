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
    {
        "id": "dakshina-kannada",
        "name_kn": "ದಕ್ಷಿಣ ಕನ್ನಡ (Dakshina Kannada)",
        "name_en": "Dakshina Kannada",
        "zone": "coastal",
        "zone_kn": "ಕರಾವಳಿ ಮತ್ತು ಮಲೆನಾಡು",
        "zone_en": "Coastal & Malnad",
        "president_kn": "ಕಾಂ|| ಹಜ್ಲಾನ್",
        "president_en": "Comrade Hazlan",
        "president_post_kn": "ಜಿಲ್ಲಾಧ್ಯಕ್ಷರು",
        "president_post_en": "District President",
        "president_phone": "+91 9480112234",
        "president_photo": "images/hazlan.jpg",
        "secretary_kn": "ಕಾಂ|| ವಿನಾಯಕ್ ಎಸ್ ಐ",
        "secretary_en": "Comrade Vinayak S I",
        "secretary_post_kn": "ಜಿಲ್ಲಾ ಕಾರ್ಯದರ್ಶಿ",
        "secretary_post_en": "District Secretary",
        "secretary_phone": "+91 9480112233",
        "secretary_photo": "images/vinayak.jpg",
        "office_kn": "ಎಸ್.ಎಫ್.ಐ ದಕ್ಷಿಣ ಕನ್ನಡ ಜಿಲ್ಲಾ ಸಮಿತಿ ಕಾರ್ಯಾಲಯ, ವಿಕಾಸ್ ಬಿಲ್ಡಿಂಗ್, ಸ್ಟೇಟ್ ಬ್ಯಾಂಕ್ ಬಳಿ, ಮಂಗಳೂರು - 575001.",
        "office_en": "SFI Dakshina Kannada District Committee Office, Vikas Building, Near State Bank, Mangaluru - 575001.",
        "phone": "+91 9480112233",
        "conference_date": "",
        "taluks_count": 8,
        "units_count": 98,
        "taluks_kn": [
            "ಮಂಗಳೂರು ನಗರ",
            "ಮಂಗಳೂರು ಗ್ರಾಮಾಂತರ & ಉಳ್ಳಾಲ",
            "ಬಂಟ್ವಾಳ",
            "ಪುತ್ತೂರು",
            "ಬೆಳ್ತಂಗಡಿ",
            "ಸುಳ್ಯ",
            "ಮೂಡುಬಿದರೆ",
            "ಕಡಬ"
        ],
        "taluks_en": [
            "Mangaluru City",
            "Mangaluru Rural & Ullal",
            "Bantwal",
            "Puttur",
            "Belthangady",
            "Sullia",
            "Moodbidri",
            "Kadaba"
        ],
        "taluks_data": [
            {
                "name_kn": "ಮಂಗಳೂರು ನಗರ (Mangaluru City)",
                "name_en": "Mangaluru City",
                "president_kn": "",
                "president_en": "",
                "secretary_kn": "",
                "secretary_en": "",
                "date": "",
                "units": "18 ಸಕ್ರಿಯ ಘಟಕಗಳು",
                "areas": "Hampankatta, Car Street, Kadri, Lalbagh, Mannagudda, Bunder, Urwa, University College, St. Aloysius Campus Zone, Canara College",
                "phone": ""
            },
            {
                "name_kn": "ಮಂಗಳೂರು ಗ್ರಾಮಾಂತರ & ಉಳ್ಳಾಲ (Mangaluru Rural & Ullal)",
                "name_en": "Mangaluru Rural & Ullal",
                "president_kn": "",
                "president_en": "",
                "secretary_kn": "",
                "secretary_en": "",
                "date": "",
                "units": "14 ಸಕ್ರಿಯ ಘಟಕಗಳು",
                "areas": "Ullal, Konaje (Mangalore University Campus), Deralakatte, Mudipu, Bajal, Kavoor, Surathkal (NITK Zone)",
                "phone": ""
            },
            {
                "name_kn": "ಬಂಟ್ವಾಳ (Bantwal)",
                "name_en": "Bantwal",
                "president_kn": "",
                "president_en": "",
                "secretary_kn": "",
                "secretary_en": "",
                "date": "",
                "units": "12 ಸಕ್ರಿಯ ಘಟಕಗಳು",
                "areas": "B.C. Road, Bantwal Town, Panemangalore, Melkar, Mani, Kalladka, Vittal",
                "phone": ""
            },
            {
                "name_kn": "ಪುತ್ತೂರು (Puttur)",
                "name_en": "Puttur",
                "president_kn": "",
                "president_en": "",
                "secretary_kn": "",
                "secretary_en": "",
                "date": "",
                "units": "11 ಸಕ್ರಿಯ ಘಟಕಗಳು",
                "areas": "Puttur Town, Darbe, Uppinangady, Kombettu, Tingalady, Bettampady",
                "phone": ""
            },
            {
                "name_kn": "ಬೆಳ್ತಂಗಡಿ (Belthangady)",
                "name_en": "Belthangady",
                "president_kn": "",
                "president_en": "",
                "secretary_kn": "",
                "secretary_en": "",
                "date": "",
                "units": "13 ಸಕ್ರಿಯ ಘಟಕಗಳು",
                "areas": "Belthangady Town, Ujire (SDM Campus), Dharmasthala, Guruvayanakere, Madanthyar, Kokkada",
                "phone": ""
            },
            {
                "name_kn": "ಸುಳ್ಯ (Sullia)",
                "name_en": "Sullia",
                "president_kn": "",
                "president_en": "",
                "secretary_kn": "",
                "secretary_en": "",
                "date": "",
                "units": "9 ಸಕ್ರಿಯ ಘಟಕಗಳು",
                "areas": "Sullia Town, Bellare, Panja, Jalsoor, Subrahmanya, Aranthodu",
                "phone": ""
            },
            {
                "name_kn": "ಮೂಡುಬಿದಿರೆ (Moodbidri)",
                "name_en": "Moodbidri",
                "president_kn": "",
                "president_en": "",
                "secretary_kn": "",
                "secretary_en": "",
                "date": "",
                "units": "10 ಸಕ್ರಿಯ ಘಟಕಗಳು",
                "areas": "Moodbidri Town, Alva's Campus Zone, Vidyagiri, Mijar, Kinnigoli",
                "phone": ""
            },
            {
                "name_kn": "ಕಡಬ (Kadaba)",
                "name_en": "Kadaba",
                "president_kn": "",
                "president_en": "",
                "secretary_kn": "",
                "secretary_en": "",
                "date": "",
                "units": "7 ಸಕ್ರಿಯ ಘಟಕಗಳು",
                "areas": "Kadaba Town, Mardhala, Alankaru, Bilinele, Ramakunja, Kutrupady",
                "phone": ""
            }
        ],
        "area_units_kn": "ದಕ್ಷಿಣ ಕನ್ನಡ ಜಿಲ್ಲೆಯ ಮಂಗಳೂರು, ಬಂಟ್ವಾಳ, ಪುತ್ತೂರು, ಬೆಳ್ತಂಗಡಿ, ಸುಳ್ಯ, ಮೂಡುಬಿದಿರೆ, ಕಡಬ ತಾಲ್ಲೂಕುಗಳ ಎಲ್ಲಾ ಸರ್ಕಾರಿ ಮತ್ತು ಅನುದಾನಿತ ಕಾಲೇಜುಗಳಲ್ಲಿ ವಿದ್ಯಾರ್ಥಿ ಸಹಾಯವಾಣಿ ಮತ್ತು ಎಸ್.ಎಫ್.ಐ ಘಟಕಗಳು ಕಾರ್ಯಾಚರಿಸುತ್ತಿವೆ.",
        "area_units_en": "Active college campus units and 24x7 student helplines operational across all major colleges and rural centers of Dakshina Kannada."
    },
    {
        "id": "udupi",
        "name_kn": "ಉಡುಪಿ (Udupi)",
        "name_en": "Udupi",
        "zone": "coastal",
        "zone_kn": "ಕರಾವಳಿ ಮತ್ತು ಮಲೆನಾಡು",
        "zone_en": "Coastal & Malnad",
        "president_kn": "ಕಾಂ|| ಗಣೇಶ್",
        "president_en": "Comrade Ganesh",
        "secretary_kn": "ಕಾಂ|| ಸುಪ್ರಿತಾ",
        "secretary_en": "Comrade Supritha",
        "office_kn": "ಎಸ್.ಎಫ್.ಐ ಉಡುಪಿ ಜಿಲ್ಲಾ ಸಮಿತಿ ಕಾರ್ಯಾಲಯ, ಉಡುಪಿ",
        "office_en": "SFI Udupi District Committee Office, Udupi",
        "phone": "+91 9480112250",
        "conference_date": "",
        "taluks_count": 5,
        "units_count": 42,
        "taluks_kn": [
            "ಉಡುಪಿ",
            "ಕುಂದಾಪುರ",
            "ಕಾರ್ಕಳ",
            "ಬ್ರಹ್ಮಾವರ",
            "ಬೈಂದೂರು"
        ],
        "taluks_en": [
            "Udupi",
            "Kundapura",
            "Karkala",
            "Brahmavara",
            "Byndoor"
        ],
        "taluks_data": [
            {
                "name_kn": "ಉಡುಪಿ (Udupi)",
                "name_en": "Udupi",
                "president_kn": "",
                "secretary_kn": "",
                "date": "",
                "units": "12 ಘಟಕಗಳು",
                "areas": "Udupi Town, Malpe, Manipal Campus Zone",
                "phone": ""
            },
            {
                "name_kn": "ಕುಂದಾಪುರ (Kundapura)",
                "name_en": "Kundapura",
                "president_kn": "",
                "secretary_kn": "",
                "date": "",
                "units": "10 ಘಟಕಗಳು",
                "areas": "Kundapura Town, Basrur, Koteshwara",
                "phone": ""
            },
            {
                "name_kn": "ಕಾರ್ಕಳ (Karkala)",
                "name_en": "Karkala",
                "president_kn": "",
                "secretary_kn": "",
                "date": "",
                "units": "8 ಘಟಕಗಳು",
                "areas": "Karkala Town, Nitte Campus, Hebri",
                "phone": ""
            },
            {
                "name_kn": "ಬ್ರಹ್ಮಾವರ (Brahmavara)",
                "name_en": "Brahmavara",
                "president_kn": "",
                "secretary_kn": "",
                "date": "",
                "units": "6 ಘಟಕಗಳು",
                "areas": "Brahmavara, Barkur, Saligrama",
                "phone": ""
            },
            {
                "name_kn": "ಬೈಂದೂರು (Byndoor)",
                "name_en": "Byndoor",
                "president_kn": "",
                "secretary_kn": "",
                "date": "",
                "units": "6 ಘಟಕಗಳು",
                "areas": "Byndoor, Shiroor, Uppunda",
                "phone": ""
            }
        ]
    },
    {
        "id": "uttara-kannada",
        "name_kn": "ಉತ್ತರ ಕನ್ನಡ (Uttara Kannada)",
        "name_en": "Uttara Kannada",
        "zone": "coastal",
        "zone_kn": "ಕರಾವಳಿ ಮತ್ತು ಮಲೆನಾಡು",
        "zone_en": "Coastal & Malnad",
        "president_kn": "ಕಾಂ|| ಮಂಜುನಾಥ",
        "president_en": "Comrade Manjunath",
        "secretary_kn": "ಕಾಂ|| ಪ್ರಕಾಶ್",
        "secretary_en": "Comrade Prakash",
        "office_kn": "ಎಸ್.ಎಫ್.ಐ ಜಿಲ್ಲಾ ಸಮಿತಿ, ಕಾರವಾರ",
        "office_en": "SFI District Committee, Karwar",
        "phone": "+91 9480112260",
        "conference_date": "",
        "taluks_count": 6,
        "units_count": 36,
        "taluks_kn": [
            "ಕಾರವಾರ",
            "ಅಂಕೋಲಾ",
            "ಕುಮಟಾ",
            "ಹೊನ್ನಾವರ",
            "ಭಟ್ಕಳ",
            "ಶಿರಸಿ"
        ],
        "taluks_en": [
            "Karwar",
            "Ankola",
            "Kumta",
            "Honnavar",
            "Bhatkal",
            "Sirsi"
        ]
    },
    {
        "id": "chikkamagaluru",
        "name_kn": "ಚಿಕ್ಕಮಗಳೂರು (Chikkamagaluru)",
        "name_en": "Chikkamagaluru",
        "zone": "coastal",
        "zone_kn": "ಕರಾವಳಿ ಮತ್ತು ಮಲೆನಾಡು",
        "zone_en": "Coastal & Malnad",
        "president_kn": "ಕಾಂ|| ಸಚಿನ್",
        "president_en": "Comrade Sachin",
        "secretary_kn": "ಕಾಂ|| ಕವಿತಾ",
        "secretary_en": "Comrade Kavitha",
        "office_kn": "ಎಸ್.ಎಫ್.ಐ ಜಿಲ್ಲಾ ಸಮಿತಿ, ಚಿಕ್ಕಮಗಳೂರು",
        "office_en": "SFI District Committee, Chikkamagaluru",
        "phone": "+91 9480112270",
        "conference_date": "",
        "taluks_count": 5,
        "units_count": 30,
        "taluks_kn": [
            "ಚಿಕ್ಕಮಗಳೂರು",
            "ತರೀಕೆರೆ",
            "ಕಡೂರು",
            "ಮೂಡಿಗೆರೆ",
            "ಕೊಪ್ಪ"
        ],
        "taluks_en": [
            "Chikkamagaluru",
            "Tarikere",
            "Kadur",
            "Mudigere",
            "Koppa"
        ]
    },
    {
        "id": "kodagu",
        "name_kn": "ಕೊಡಗು (Kodagu)",
        "name_en": "Kodagu",
        "zone": "coastal",
        "zone_kn": "ಕರಾವಳಿ ಮತ್ತು ಮಲೆನಾಡು",
        "zone_en": "Coastal & Malnad",
        "president_kn": "ಕಾಂ|| ರಾಜೇಶ್",
        "president_en": "Comrade Rajesh",
        "secretary_kn": "ಕಾಂ|| ಬಿಂದು",
        "secretary_en": "Comrade Bindu",
        "office_kn": "ಎಸ್.ಎಫ್.ಐ ಜಿಲ್ಲಾ ಸಮಿತಿ, ಮಡಿಕೇರಿ",
        "office_en": "SFI District Committee, Madikeri",
        "phone": "+91 9480112280",
        "conference_date": "",
        "taluks_count": 3,
        "units_count": 22,
        "taluks_kn": [
            "ಮಡಿಕೇರಿ",
            "ವಿರಾಜಪೇಟೆ",
            "ಸೋಮವಾರಪೇಟೆ"
        ],
        "taluks_en": [
            "Madikeri",
            "Virajpet",
            "Somwarpet"
        ]
    },
    {
        "id": "bengaluru-urban",
        "name_kn": "ಬೆಂಗಳೂರು ನಗರ (Bengaluru Urban)",
        "name_en": "Bengaluru Urban",
        "zone": "bengaluru",
        "zone_kn": "ಬೆಂಗಳೂರು ವಿಭಾಗ",
        "zone_en": "Bengaluru Division",
        "president_kn": "ಕಾಂ|| ಕಿರಣ್",
        "president_en": "Comrade Kiran",
        "secretary_kn": "ಕಾಂ|| ರಕ್ಷಿತ್",
        "secretary_en": "Comrade Rakshith",
        "office_kn": "ಎಸ್.ಎಫ್.ಐ ರಾಜ್ಯ ಕಾರ್ಯಾಲಯ, ಸಂಪಂಗಿರಾಮನಗರ, ಬೆಂಗಳೂರು",
        "office_en": "SFI State Committee Office, Bengaluru",
        "phone": "+91 80 2287 4521",
        "conference_date": "",
        "taluks_count": 5,
        "units_count": 65,
        "taluks_kn": [
            "ಬೆಂಗಳೂರು ದಕ್ಷಿಣ",
            "ಬೆಂಗಳೂರು ಉತ್ತರ",
            "ಬೆಂಗಳೂರು ಕೇಂದ್ರ",
            "ಆನೇಕಲ್",
            "ಯಲಹಂಕ"
        ],
        "taluks_en": [
            "Bengaluru South",
            "Bengaluru North",
            "Bengaluru Central",
            "Anekal",
            "Yelahanka"
        ]
    },
    {
        "id": "mysuru",
        "name_kn": "ಮೈಸೂರು (Mysuru)",
        "name_en": "Mysuru",
        "zone": "mysuru",
        "zone_kn": "ಮೈಸೂರು ವಿಭಾಗ",
        "zone_en": "Mysuru Division",
        "president_kn": "ಕಾಂ|| ಜಗದೀಶ್",
        "president_en": "Comrade Jagadish",
        "secretary_kn": "ಕಾಂ|| ಪ್ರಿಯಾಂಕಾ",
        "secretary_en": "Comrade Priyanka",
        "office_kn": "ಎಸ್.ಎಫ್.ಐ ಜಿಲ್ಲಾ ಸಮಿತಿ, ಮೈಸೂರು",
        "office_en": "SFI District Committee, Mysuru",
        "phone": "+91 9480112290",
        "conference_date": "",
        "taluks_count": 7,
        "units_count": 48,
        "taluks_kn": [
            "ಮೈಸೂರು ನಗರ",
            "ಹುಣಸೂರು",
            "ನಂಜನಗೂಡು",
            "ಟಿ.ನರಸೀಪುರ",
            "ಪಿರಿಯಾಪಟ್ಟಣ",
            "ಕೆ.ಆರ್.ನಗರ",
            "ಸರಗೂರು"
        ],
        "taluks_en": [
            "Mysuru City",
            "Hunsur",
            "Nanjangud",
            "T. Narasipura",
            "Piriyapatna",
            "K.R. Nagar",
            "Saragur"
        ]
    },
    {
        "id": "kalaburagi",
        "name_kn": "ಕಲಬುರಗಿ (Kalaburagi)",
        "name_en": "Kalaburagi",
        "zone": "kalyana",
        "zone_kn": "ಕಲ್ಯಾಣ ಕರ್ನಾಟಕ",
        "zone_en": "Kalyana Karnataka",
        "president_kn": "ಕಾಂ|| ಮಲ್ಲಿಕಾರ್ಜುನ್",
        "president_en": "Comrade Mallikarjun",
        "secretary_kn": "ಕಾಂ|| ಶರಣು",
        "secretary_en": "Comrade Sharanu",
        "office_kn": "ಎಸ್.ಎಫ್.ಐ ಜಿಲ್ಲಾ ಸಮಿತಿ, ಕಲಬುರಗಿ",
        "office_en": "SFI District Committee, Kalaburagi",
        "phone": "+91 9480112300",
        "conference_date": "",
        "taluks_count": 7,
        "units_count": 44,
        "taluks_kn": [
            "ಕಲಬುರಗಿ ನಗರ",
            "ಆಳಂದ",
            "ಅಫಜಲಪುರ",
            "ಜೇವರ್ಗಿ",
            "ಸೇಡಂ",
            "ಚಿತ್ತಾಪುರ",
            "ಚಿಂಚೋಳಿ"
        ],
        "taluks_en": [
            "Kalaburagi City",
            "Aland",
            "Afzalpur",
            "Jevargi",
            "Sedam",
            "Chittapur",
            "Chincholi"
        ]
    },
    {
        "id": "dharwad",
        "name_kn": "ಧಾರವಾಡ (Dharwad)",
        "name_en": "Dharwad",
        "zone": "kittur",
        "zone_kn": "ಕಿತ್ತೂರು ಕರ್ನಾಟಕ",
        "zone_en": "Kittur Karnataka",
        "president_kn": "ಕಾಂ|| ಬಸವರಾಜ್",
        "president_en": "Comrade Basavaraj",
        "secretary_kn": "ಕಾಂ|| ರವಿ",
        "secretary_en": "Comrade Ravi",
        "office_kn": "ಎಸ್.ಎಫ್.ಐ ಜಿಲ್ಲಾ ಸಮಿತಿ, ಧಾರವಾಡ",
        "office_en": "SFI District Committee, Dharwad",
        "phone": "+91 9480112310",
        "conference_date": "",
        "taluks_count": 5,
        "units_count": 40,
        "taluks_kn": [
            "ಧಾರವಾಡ",
            "ಹುಬ್ಬಳ್ಳಿ ನಗರ",
            "ಹುಬ್ಬಳ್ಳಿ ಗ್ರಾಮೀಣ",
            "ಕುಂದಗೋಳ",
            "ನವಲಗುಂದ"
        ],
        "taluks_en": [
            "Dharwad",
            "Hubballi City",
            "Hubballi Rural",
            "Kundgol",
            "Navalgund"
        ]
    }
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

      // Automatic Cloud Synchronization with Firebase Firestore
      if (typeof window !== 'undefined' && window.SfiFirebase && window.SfiFirebase.db) {
        try {
          window.SfiFirebase.db.collection('site_data').doc(key).set({
            data: value,
            updatedAt: (typeof firebase !== 'undefined' && firebase.firestore && firebase.firestore.FieldValue) 
              ? firebase.firestore.FieldValue.serverTimestamp() 
              : new Date().toISOString()
          }).catch(err => {
            console.info('Firebase sync offline fallback:', err.message);
          });
        } catch (e) {
          // silent fallback
        }
      }
      return true;
    } catch (e) {
      console.warn("Error setting localStorage for", key, e);
      return false;
    }
  }

  static syncFromCloud() {
    if (typeof window !== 'undefined' && window.SfiFirebase && window.SfiFirebase.db) {
      window.SfiFirebase.db.collection('site_data').get().then(snapshot => {
        if (!snapshot.empty) {
          snapshot.forEach(doc => {
            const docKey = doc.id;
            const docVal = doc.data();
            if (docVal && docVal.data) {
              localStorage.setItem(docKey, JSON.stringify(docVal.data));
            }
          });
          if (typeof renderDynamicDataStoreContent === 'function') {
            renderDynamicDataStoreContent();
          }
        }
      }).catch(err => {
        console.info('Using local cache:', err.message);
      });
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

    // Initialize Firebase Database & Cloud Sync
    if (typeof window !== 'undefined' && window.SfiFirebase && typeof window.SfiFirebase.init === 'function') {
      window.SfiFirebase.init();
      setTimeout(() => {
        this.syncFromCloud();
      }, 500);
    }
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
