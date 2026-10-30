/**
 * DYFI KARNATAKA — STATE COMMITTEE OFFICIAL JAVASCRIPT
 * Students' Federation of India — Karnataka
 */

/* ========================================================
   1. DISTRICT UNITS DATABASE (Dynamic DataStore Sync)
   ======================================================== */
function getDistrictUnitsData() {
  if (typeof DyfiDataStore !== 'undefined' && typeof DYFI_DATA_KEYS !== 'undefined') {
    const list = DyfiDataStore.get(DYFI_DATA_KEYS.DISTRICTS);
    if (Array.isArray(list) && list.length > 0) {
      return list;
    }
  }
  return [];
}

let districtUnitsData = getDistrictUnitsData();

/* ========================================================
   2. BILINGUAL TRANSLATION DICTIONARY
   ======================================================== */
const i18nData = {
  en: {
    langBtn: 'ಕನ್ನಡ',
    brandTitle: 'SFI <span class="red-text">DAKSHINA KANNADA</span>',
    brandSubtitle: 'Dakshina Kannada District Committee',
    navHome: 'Home',
    navAbout: 'About Us',
    navHistory: 'History & Background',
    navIdeology: 'Ideology & Objectives',
    navLeadership: 'State Leadership',
    navDistricts: 'District Units',
    navCommittees: 'Committees & Units',
    navDistrictCommittees: '<i class="fa-solid fa-flag" style="color:var(--primary,#dc2626); font-size:0.85em; margin-right:4px;"></i> District Committees',
    navTalukCommittees: '<i class="fa-solid fa-landmark" style="font-size:0.85em; margin-right:4px;"></i> Taluk Committees',
    navAreaCommittees: '<i class="fa-solid fa-users" style="font-size:0.85em; margin-right:4px;"></i> Village & Area Units',
    navCampaigns: 'Campaigns',
    navActivities: 'Activities',
    navGallery: 'Gallery',
    navNews: 'News',
    navBlood: 'Blood Donation',
    navContactBtn: 'Contact Us',
    
    tickerTitle: 'Official Circular',
    tickerText: 'Statewide Youth Convention against Unemployment — All District Committees advised to mobilize.',
    tickerHelp: 'Emergency Blood Helpline:',
    
    heroTag: '<i class="fa-solid fa-star" style="color:var(--primary,#dc2626); font-size:0.8em; margin-right:4px;"></i> Students\' Federation of India — Karnataka',
    heroTitle: 'Study &amp; Struggle, <span class="highlight-red">Save Public Education</span> — SFI Dakshina Kannada',
    heroDesc: 'SFI Dakshina Kannada District Committee stands at the forefront of progressive youth and student struggles, advocating for equality, quality free public education, communal harmony, and social justice across Dakshina Kannada.',
    heroBtnJoin: 'Get Involved <i class="fa-solid fa-arrow-right"></i>',
    heroBtnMission: 'Our Ideology & Mission',
    
    aboutTag: '<i class="fa-solid fa-star" style="color:var(--primary,#dc2626); font-size:0.8em; margin-right:4px;"></i> STUDENTS\' FEDERATION OF INDIA',
    aboutHeadline: 'Independence, Democracy, <span class="highlight-red">Socialism</span> — Study &amp; Struggle',
    aboutSubtext: 'The Students\' Federation of India (SFI) is the vanguard democratic students\' organisation fighting for free, equal quality public education, secularism, and student rights in Dakshina Kannada.',
    btnReadMore: 'Read More <i class="fa-solid fa-arrow-up-right-from-square"></i>',
    
    stat1: 'Active Youth Members',
    stat2: 'District Committees',
    stat3: 'Blood Requests Met',
    stat4: 'State Campaigns',
    
    campSectionTitle: 'Our <span class="highlight-red">Campaigns</span>',
    btnViewAll: 'View All <i class="fa-solid fa-arrow-up-right-from-square"></i>',
    
    camp1Title: 'Student Bus Pass & Transport Rights Movement',
    camp1Desc: 'Demanding dedicated KSRTC student buses and prompt bus pass sanction across rural Mangaluru, Bantwal, Puttur, Belthangady, Sullia.',
    camp2Title: 'Save Public Education — Stop University Fee Hikes',
    camp2Desc: 'Continuous resistance against privatization of education, Mangalore University examination fee hikes, and commercialization.',
    camp3Title: 'Government Hostels & Scholarships for SC/ST/OBC Students',
    camp3Desc: 'Inspecting government student hostels in DK district to ensure hygienic facilities and timely scholarship disbursement.',
    
    quoteMain: 'True <span class="highlight-red">transformation</span> begins when the youth unite to challenge injustice and build equality.',
    quoteMotto: '“Struggle is our path, equality is our goal — Che Guevara”',
    btnMovement: 'Join the Movement <i class="fa-solid fa-hand-fist"></i>',
    
    actSectionTitle: 'Recent <span class="highlight-red">Activities</span>',
    act1Title: 'SFI Dakshina Kannada District Conference',
    act1Desc: 'Student delegates from colleges across Mangaluru, Puttur, and Bantwal resolved to resist fee hikes and privatization.',
    act2Title: 'Protest March at DC Office for Bus Passes',
    act2Desc: 'Students assembled at Mangaluru DC office demanding immediate bus routes for rural college commuters.',
    act3Title: 'Free Book & Study Material Distribution',
    act3Desc: 'Distributing textbooks, study notes, and running 24x7 student helpline across colleges in Dakshina Kannada.',
    
    annSectionTitle: 'Official <span class="highlight-red">Announcements</span>',
    ann1Title: 'Taluk Assembly Review Report Submission',
    ann1Text: 'All Local Unit committees must submit their youth survey reports to the respective taluk centers by September 15.',
    ann2Title: 'Monsoon Natural Disaster Task Force',
    ann2Text: 'Circular advising all coastal and river basin units to mobilize emergency volunteer groups for monsoon assistance.',
    
    districtsTag: '<i class="fa-solid fa-star" style="color:var(--primary,#dc2626); font-size:0.8em; margin-right:4px;"></i> Organizational Network across Karnataka',
    districtsSectionTitle: 'District, Taluk & Area <span class="highlight-red">Committees</span>',
    districtsSectionSub: 'Democratically elected District & Taluk Presidents, Secretaries, and local units leading struggles across Karnataka.',
    filterAllDistricts: 'All Districts',
    filterCoastal: 'Coastal & Malnad',
    filterBengaluru: 'Bengaluru Region',
    filterMysuru: 'Mysuru Region',
    filterKalyana: 'Kalyana Karnataka',
    filterKittur: 'Kittur Karnataka',
    
    bloodTitle: 'A drop of blood, a lifetime for someone!',
    bloodSub: 'Connecting patients in critical emergencies across Karnataka with voluntary youth blood donors round the clock.',
    bloodHelplineLabel: '24/7 State Emergency Blood Helpline',
    btnBloodReg: 'Register as Volunteer Donor <i class="fa-solid fa-heart"></i>',
    
    galleryTitle: 'Photo <span class="highlight-red">Gallery</span>',
    filterAll: 'All',
    filterRally: 'Rallies',
    filterConf: 'Conferences',
    filterRelief: 'Relief Work',
    filterHealth: 'Health Camps',
    
    newsSectionTitle: 'Latest <span class="highlight-red">News</span>',
    news1Title: 'SFI District Convention Resolves to Fight for Free Public Education',
    news1Desc: 'Student representatives from across Dakshina Kannada passed crucial resolutions defending public education.',
    news2Title: 'Protest March Demanding KSRTC Student Buses for Rural Colleges',
    news2Desc: 'SFI delegation submitted urgent memorandum demanding extra bus trips during morning and evening college hours.',
    news3Title: '24x7 SFI Student Help Desk and Grievance Cell Launched',
    news3Desc: 'Assisting students with university exam issues, delay in scholarship release, and campus grievances.',
    
    
    navStatements: 'Statements',
    navMartyrs: 'Martyrs',
    navJoinRev: 'Join The Revolution',
    stSectionTitle: 'Official <span class="highlight-red">Statements &amp; Press Notes</span>',
    martyrsSectionTitle: 'Immortal <span class="highlight-red">Martyrs of Struggle</span>',
    martyrsIntro: 'Revolutionary homage to the immortal comrades who laid down their lives fighting for secularism, employment, social justice, and student rights across Karnataka.',
    videoSectionTitle: 'Youth <span class="highlight-red">Rallies &amp; Video Streams</span>',
    videoMainTitle: 'Moments of Struggle: Highlights from State Youth Conventions',
    videoMainSub: 'Live footage capturing thousands of energetic youth, college students, and progressive citizens demanding employment guarantee and public welfare.',
    bloodSearchHeading: 'Emergency Blood Donor Finder',
    joinModalTitle: 'Join The Revolution (ಸದಸ್ಯತ್ವ)',
    joinModalSub: 'Become part of India\'s vanguard progressive democratic youth movement fighting for equality, education, and social harmony.',
    btnDownloadStatement: 'Download Statement PDF <i class="fa-solid fa-download"></i>',
    adminLink: 'Admin Portal',
    committeesHeroTitle: 'Karnataka <span class="highlight-red">Committees &amp; Units</span>',
    martyrsHeroTitle: 'Immortal <span class="highlight-red">Martyrs of Struggle</span>',
    btnPayHomage: 'Pay Floral Homage <i class="fa-solid fa-spa"></i>',
    leadSectionTitle: 'State <span class="highlight-red">Leadership</span>',
    nationalLeadTitle: '<i class="fa-solid fa-flag" style="color:var(--primary,#dc2626); font-size:0.85em; margin-right:4px;"></i> All India / National Leadership',
    stateLeadTitle: '<i class="fa-solid fa-flag" style="color:var(--primary,#dc2626); font-size:0.85em; margin-right:4px;"></i> Karnataka State Leadership',
    nl1Name: 'Comrade A. A. Rahim',
    nl1Role: 'All India President',
    nl2Name: 'Comrade Himagnoraj Bhattacharya',
    nl2Role: 'All India General Secretary',
    lead1Name: 'Comrade Vinayak S I',
    lead1Role: 'District Secretary',
    lead2Name: 'Comrade Hazlan',
    lead2Role: 'District President',
    lead3Name: 'Comrade Shivappa',
    lead3Role: 'District Vice President',
    
    contactTitle: 'Contact & <span class="highlight-red">District Network</span>',
    officeLabel: 'State Headquarters Address',
    officeVal: 'SFI-DYFI OFFICE, C/o: Amma Nilaya, #25, 1st Main Road, 11th Cross, Sampangiramanagara, Bengaluru - 560027.',
    phoneLabel: 'Phone / Helpline',
    phoneVal: '+91 9449225636 / +91 9481261229',
    emailLabel: 'Email Address',
    emailVal: 'dyfikar1980@gmail.com',
    formName: 'Your Full Name',
    formPhone: 'Mobile Number',
    formDistrict: 'Your District',
    formMsg: 'Your Message or Inquiry',
    formSubmit: 'Send Message <i class="fa-solid fa-paper-plane"></i>',
    
    footerDesc: 'Students\' Federation of India (SFI) — Leading the progressive student movement for education, equality, democracy, and socialism in Dakshina Kannada.',
    footerQuick: 'Quick Links',
    footerDistricts: 'Key Districts',
    footerLegal: 'State Secretariat',
    footerTerms: 'Sampangiramanagara, Bengaluru - 560027',
    footerRights: '© 2026 — SFI Dakshina Kannada State Committee. All Rights Reserved.',
    linkPrivacy: 'Privacy Policy',
    linkTerms: 'Terms & Conditions',
    legalModalBadge: 'Official Legal Charter',
    legalModalTitle: 'SFI Dakshina Kannada — Privacy Policy & Terms',
    tabPrivacy: 'Privacy Policy',
    tabTerms: 'Terms & Conditions'
  },
  
  kn: {
    langBtn: 'English',
    brandTitle: 'ಎಸ್.ಎಫ್.ಐ <span class="red-text">ಕರ್ನಾಟಕ</span>',
    brandSubtitle: 'ಕರ್ನಾಟಕ ರಾಜ್ಯ ಸಮಿತಿ',
    navHome: 'ಮುಖಪುಟ',
    navAbout: 'ನಮ್ಮ ಬಗ್ಗೆ',
    navHistory: 'ಇತಿಹಾಸ ಮತ್ತು ಹಿನ್ನೆಲೆ',
    navIdeology: 'ಧ್ಯೇಯ ಮತ್ತು ಸಂವಿಧಾನ',
    navLeadership: 'ರಾಜ್ಯ ನಾಯಕತ್ವ',
    navDistricts: 'ಜಿಲ್ಲಾ ಘಟಕಗಳು',
    navCommittees: 'ಸಮಿತಿಗಳು & ಘಟಕಗಳು',
    navDistrictCommittees: '<i class="fa-solid fa-flag" style="color:var(--primary,#dc2626); font-size:0.85em; margin-right:4px;"></i> ಜಿಲ್ಲಾ ಸಮಿತಿಗಳು',
    navTalukCommittees: '<i class="fa-solid fa-landmark" style="font-size:0.85em; margin-right:4px;"></i> ತಾಲ್ಲೂಕು ಸಮಿತಿಗಳು',
    navAreaCommittees: '<i class="fa-solid fa-users" style="font-size:0.85em; margin-right:4px;"></i> ಗ್ರಾಮ & ಏರಿಯಾ ಸಮಿತಿಗಳು',
    navCampaigns: 'ಅಭಿಯಾನಗಳು',
    navActivities: 'ಚಟುವಟಿಕೆಗಳು',
    navGallery: 'ಚಿತ್ರ ಗ್ಯಾಲರಿ',
    navNews: 'ಸುದ್ದಿಗಳು',
    navBlood: 'ರಕ್ತದಾನ ಸೇವೆ',
    navContactBtn: 'ಸಂಪರ್ಕಿಸಿ',
    
    tickerTitle: 'ಅಧಿಕೃತ ಸುತ್ತೋಲೆ',
    tickerText: 'ರಾಜ್ಯವ್ಯಾಪಿ ನಿರುದ್ಯೋಗ ವಿರುದ್ಧ ಬೃಹತ್ ಯುವ ಜಾಗೃತಿ ಸಮಾವೇಶ — ಎಲ್ಲಾ ಜಿಲ್ಲಾ ಘಟಕಗಳು ಸಿದ್ಧತೆ ಕೈಗೊಳ್ಳಲು ಕರೆ.',
    tickerHelp: 'ತುರ್ತು ರಕ್ತದಾನ ಸಹಾಯವಾಣಿ:',
    
    heroTag: '<i class="fa-solid fa-star" style="color:var(--primary,#dc2626); font-size:0.8em; margin-right:4px;"></i> ಭಾರತ ವಿದ್ಯಾರ್ಥಿ ಫೆಡರೇಶನ್ — ದಕ್ಷಿಣ ಕನ್ನಡ',
    heroTitle: 'ಅಧ್ಯಯನ ಮತ್ತು ಹೋರಾಟ, <span class="highlight-red">ಸಾರ್ವಜನಿಕ ಶಿಕ್ಷಣ ಉಳಿಸಿ</span> — ಎಸ್.ಎಫ್.ಐ ದಕ್ಷಿಣ ಕನ್ನಡ',
    heroDesc: 'ಎಸ್.ಎಫ್.ಐ ದಕ್ಷಿಣ ಕನ್ನಡ ಜಿಲ್ಲಾ ಸಮಿತಿ — ಉಚಿತ ಮತ್ತು ಗುಣಮಟ್ಟದ ಶಿಕ್ಷಣ, ವಿದ್ಯಾರ್ಥಿ ಹಕ್ಕುಗಳು ಹಾಗೂ ಸಾಮಾಜಿಕ ನ್ಯಾಯಕ್ಕಾಗಿ ಸಾಗುತ್ತಿರುವ ವಿದ್ಯಾರ್ಥಿ ಚಳುವಳಿಯ ಮುಂಚೂಣಿ ಧ್ವನಿ.',
    heroBtnJoin: 'ಹೋರಾಟದಲ್ಲಿ ಕೈಜೋಡಿಸಿ <i class="fa-solid fa-arrow-right"></i>',
    heroBtnMission: 'ನಮ್ಮ ಧ್ಯೇಯೋದ್ದೇಶಗಳು',
    
    aboutTag: '<i class="fa-solid fa-star" style="color:var(--primary,#dc2626); font-size:0.8em; margin-right:4px;"></i> ಭಾರತ ವಿದ್ಯಾರ್ಥಿ ಫೆಡರೇಶನ್ (SFI) — ದಕ್ಷಿಣ ಕನ್ನಡ',
    aboutHeadline: 'ಸ್ವಾತಂತ್ರ್ಯ, ಪ್ರಜಾಪ್ರಭುತ್ವ, <span class="highlight-red">ಸಮಾಜವಾದ</span> — ಅಧ್ಯಯನ ಮತ್ತು ಹೋರಾಟ',
    aboutSubtext: 'ಭಾರತ ವಿದ್ಯಾರ್ಥಿ ಫೆಡರೇಶನ್ (SFI) ಸಾಮ್ರಾಜ್ಯಶಾಹಿ ವಿರೋಧಿ, ಪ್ರಜಾಸತ್ತಾತ್ಮಕ ಮತ್ತು ಸಮಾಜವಾದಿ ಮೌಲ್ಯಗಳೊಂದಿಗೆ ಸರ್ವರಿಗೂ ಸಮಾನ ಉಚಿತ ಶಿಕ್ಷಣ ಹಾಗೂ ವಿದ್ಯಾರ್ಥಿ ಸಮುದಾಯದ ಏಳಿಗೆಗಾಗಿ ದಕ್ಷಿಣ ಕನ್ನಡ ಜಿಲ್ಲೆಯಲ್ಲಿ ಸತತವಾಗಿ ಹೋರಾಡುತ್ತಿದೆ.',
    btnReadMore: 'ಇನ್ನಷ್ಟು ತಿಳಿಯಿರಿ <i class="fa-solid fa-arrow-up-right-from-square"></i>',
    
    stat1: 'ಸಕ್ರಿಯ ಯುವ ಸದಸ್ಯರು',
    stat2: 'ಜಿಲ್ಲಾ ಸಮಿತಿಗಳು',
    stat3: 'ರಕ್ತದಾನ ನೆರವು ಪೂರೈಕೆ',
    stat4: 'ಸಾಮಾಜಿಕ ಚಳುವಳಿಗಳು',
    
    campSectionTitle: 'ನಮ್ಮ <span class="highlight-red">ಅಭಿಯಾನಗಳು</span>',
    btnViewAll: 'ಎಲ್ಲವನ್ನೂ ವೀಕ್ಷಿಸಿ <i class="fa-solid fa-arrow-up-right-from-square"></i>',
    
    camp1Title: 'ರಾಜ್ಯ ಯುವ ಉದ್ಯೋಗ ಹಕ್ಕು ಚಳುವಳಿ',
    camp1Desc: 'ಕರ್ನಾಟಕದ ಸರ್ಕಾರಿ ಇಲಾಖೆಗಳಲ್ಲಿ ಖಾಲಿ ಇರುವ 2.5 ಲಕ್ಷ ಹುದ್ದೆಗಳ ಭರ್ತಿ ಹಾಗೂ ಸ್ಥಳೀಯ ಯುವಕರಿಗೆ ಉದ್ಯೋಗ ಮೀಸಲಾತಿಗೆ ಆಗ್ರಹ.',
    camp2Title: 'ಕೋಮು ಸೌಹಾರ್ದ ಹಾಗೂ ಏಕತೆ ಅಭಿಯಾನ',
    camp2Desc: 'ದ್ವೇಷ ರಾಜಕಾರಣದ ವಿರುದ್ಧ ಶಾಂತಿ, ಸೌಹಾರ್ದತೆ ಮತ್ತು ಭ್ರಾತೃತ್ವ ಕಾಪಾಡಲು ರಾಜ್ಯದ ಎಲ್ಲಾ ಜಿಲ್ಲೆಗಳಲ್ಲಿ ಜಾಗೃತಿ ಜಾತಾಗಳು.',
    camp3Title: 'ಉಚಿತ ಮತ್ತು ಸಮಾನ ಗುಣಮಟ್ಟದ ಶಿಕ್ಷಣ',
    camp3Desc: 'ಶಿಕ್ಷಣದ ಖಾಸಗೀಕರಣ ತಡೆ, ವಿದ್ಯಾರ್ಥಿ ವೇತನ ಹಾಗೂ ಹಾಸ್ಟೆಲ್ ಸೌಲಭ್ಯಗಳ ಸಕಾಲಿಕ ಬಿಡುಗಡೆಗಾಗಿ ನಿರಂತರ ಪ್ರತಿಭಟನೆ.',
    
    quoteMain: 'ಯುವಜನರು ಅನ್ಯಾಯದ ವಿರುದ್ಧ ಒಗ್ಗೂಡಿ <span class="highlight-red">ಸಮಾನತೆ ಮತ್ತು ಸಾಮಾಜಿಕ ನ್ಯಾಯ</span> ಕಟ್ಟಲು ನಿಂತಾಗ ಮಾತ್ರ ಬದಲಾವಣೆ ಸಾಧ್ಯ.',
    quoteMotto: '“ಹೋರಾಟವೇ ನಮ್ಮ ಹಾದಿ, ಸಮಾನತೆಯೇ ನಮ್ಮ ಗುರಿ — ಚೇ ಗುವಾರಾ”',
    btnMovement: 'ಹೋರಾಟದಲ್ಲಿ ಕೈಜೋಡಿಸಿ <i class="fa-solid fa-hand-fist"></i>',
    
    actSectionTitle: 'ಇತ್ತೀಚಿನ <span class="highlight-red">ಚಟುವಟಿಕೆಗಳು</span>',
    act1Title: 'ಬೆಂಗಳೂರು ರಾಜ್ಯ ಮಟ್ಟದ ಯುವ ಸಮಾವೇಶ',
    act1Desc: 'ಕರ್ನಾಟಕದ 31 ಜಿಲ್ಲೆಗಳಿಂದ ಸಹಸ್ರಾರು ಯುವ ಪ್ರತಿನಿಧಿಗಳು ಪಾಲ್ಗೊಂಡು ಯುವ ನೀತಿ ಕುರಿತು ಚರ್ಚಿಸಿದ ಐತಿಹಾಸಿಕ ಸಮಾವೇಶ.',
    act2Title: 'ಪ್ರವಾಹ ಸಂತ್ರಸ್ತರ ಪುನರ್ವಸತಿ ನೆರವು',
    act2Desc: 'ಉತ್ತರ ಕರ್ನಾಟಕ ಮತ್ತು ಮಲೆನಾಡು ಭಾಗದ ಪ್ರವಾಹ ಪೀಡಿತ ಗ್ರಾಮಗಳಲ್ಲಿ ಎಸ್.ಎಫ್.ಐ ಸ್ವಯಂಸೇವಕರಿಂದ ಪರಿಹಾರ ಸಾಮಗ್ರಿ ವಿತರಣೆ.',
    act3Title: 'ಉಚಿತ ಸಾರ್ವಜನಿಕ ಆರೋಗ್ಯ ಮತ್ತು ತಪಾಸಣೆ ಶಿಬಿರ',
    act3Desc: 'ಹಿಂದುಳಿದ ಪ್ರದೇಶಗಳ ಜನರಿಗಾಗಿ ನುರಿತ ವೈದ್ಯರ ಸಹಯೋಗದೊಂದಿಗೆ ಉಚಿತ ತಪಾಸಣೆ ಹಾಗೂ ಔಷಧ ವಿತರಣಾ ಶಿಬಿರಗಳು.',
    
    annSectionTitle: 'ಅಧಿಕೃತ <span class="highlight-red">ಸುತ್ತೋಲೆಗಳು</span>',
    ann1Title: 'ರಾಜ್ಯ ವ್ಯಾಪಿ ತಾಲ್ಲೂಕು ಸಮಾವೇಶಗಳ ವರದಿ ಸಲ್ಲಿಕೆ',
    ann1Text: 'ಎಲ್ಲಾ ಜಿಲ್ಲಾ ಮತ್ತು ತಾಲ್ಲೂಕು ಘಟಕಗಳು ತಮ್ಮ ವಾರ್ಷಿಕ ಸದಸ್ಯತ್ವ ಹಾಗೂ ಹೋರಾಟದ ವರದಿಯನ್ನು ರಾಜ್ಯ ಕೇಂದ್ರಕ್ಕೆ ಸೆಪ್ಟೆಂಬರ್ 15ರೊಳಗೆ ಸಲ್ಲಿಸುವುದು.',
    ann2Title: 'ಮುಂಗಾರು ನೈಸರ್ಗಿಕ ವಿಕೋಪ ಪರಿಹಾರ ಕಾರ್ಯಪಡೆ ರಚನೆ',
    ann2Text: 'ಮಳೆ ಹಾನಿ ಪೀಡಿತ ಪ್ರದೇಶಗಳಲ್ಲಿ ತುರ್ತು ನೆರವಿಗಾಗಿ ಎಸ್.ಎಫ್.ಐ ಯುವ ಕಾರ್ಯಪಡೆಗಳನ್ನು ಸನ್ನದ್ಧ ಸ್ಥಿತಿಯಲ್ಲಿಡಲು ಸುತ್ತೋಲೆ.',
    
    districtsTag: '<i class="fa-solid fa-star" style="color:var(--primary,#dc2626); font-size:0.8em; margin-right:4px;"></i> ಕರ್ನಾಟಕ ರಾಜ್ಯಾದ್ಯಂತ ಸಾಂಘಿಕ ಜಾಲ',
    districtsSectionTitle: 'ಜಿಲ್ಲಾ, ತಾಲ್ಲೂಕು & ಏರಿಯಾ <span class="highlight-red">ಸಮಿತಿಗಳು</span>',
    districtsSectionSub: 'ಕರ್ನಾಟಕದ ಪ್ರತಿ ಜಿಲ್ಲೆ ಮತ್ತು ತಾಲ್ಲೂಕುಗಳಲ್ಲಿ ಯುವಜನ ಹೋರಾಟ ಮುನ್ನಡೆಸುತ್ತಿರುವ ಚುನಾಯಿತ ಅಧ್ಯಕ್ಷರು, ಕಾರ್ಯದರ್ಶಿಗಳು ಹಾಗೂ ಸಮಿತಿಗಳು.',
    filterAllDistricts: 'ಎಲ್ಲಾ ಜಿಲ್ಲೆಗಳು',
    filterCoastal: 'ಕರಾವಳಿ ಮತ್ತು ಮಲೆನಾಡು',
    filterBengaluru: 'ಬೆಂಗಳೂರು ವಿಭಾಗ',
    filterMysuru: 'ಮೈಸೂರು ವಿಭಾಗ',
    filterKalyana: 'ಕಲ್ಯಾಣ ಕರ್ನಾಟಕ',
    filterKittur: 'ಕಿತ್ತೂರು ಕರ್ನಾಟಕ',
    
    bloodTitle: 'ರಕ್ತದ ಹನಿ — ಜೀವದ ಚಿಗುರು!',
    bloodSub: 'ಕರ್ನಾಟಕ ರಾಜ್ಯಾದ್ಯಂತ ತುರ್ತು ರಕ್ತದ ಅಗತ್ಯವಿರುವ ರೋಗಿಗಳಿಗೆ ಉಚಿತವಾಗಿ ರಕ್ತ ಒದಗಿಸುವ ಎಸ್.ಎಫ್.ಐ ಯುವಜನ ರಕ್ತದಾನ ಜಾಲ.',
    bloodHelplineLabel: '24/7 ತುರ್ತು ರಾಜ್ಯ ರಕ್ತದಾನ ಸಹಾಯವಾಣಿ',
    btnBloodReg: 'ಸ್ವಯಂಸೇವಕ ರಕ್ತದಾನಿ ನೋಂದಣಿ <i class="fa-solid fa-heart"></i>',
    
    galleryTitle: 'ಚಿತ್ರ <span class="highlight-red">ಗ್ಯಾಲರಿ</span>',
    filterAll: 'ಎಲ್ಲವೂ',
    filterRally: 'ರ್ಯಾಲಿಗಳು',
    filterConf: 'ಸಮಾವೇಶಗಳು',
    filterRelief: 'ಪರಿಹಾರ ಕಾರ್ಯ',
    filterHealth: 'ಆರೋಗ್ಯ ಶಿಬಿರ',
    
    newsSectionTitle: 'ತಾಜಾ <span class="highlight-red">ಸುದ್ದಿಗಳು</span>',
    news1Title: 'ಕರ್ನಾಟಕದಲ್ಲಿ ನಿರುದ್ಯೋಗ ಸಮೀಕ್ಷೆ ಬಿಡುಗಡೆ ಮಾಡಿದ ಎಸ್.ಎಫ್.ಐ',
    news1Desc: 'ಗ್ರಾಮೀಣ ಹಾಗೂ ನಗರ ಪ್ರದೇಶದ ಯುವಕರ ನೈಜ ಸ್ಥಿತಿಗತಿ ಬಿಂಬಿಸುವ ಸಮಗ್ರ ಉದ್ಯೋಗ ಸಮೀಕ್ಷಾ ವರದಿ ಬಿಡುಗಡೆ.',
    news2Title: 'ಸರ್ಕಾರಿ ಆಸ್ಪತ್ರೆಗಳ ಉನ್ನತೀಕರಣಕ್ಕೆ ಆಗ್ರಹಿಸಿ ಜಿಲ್ಲಾಧಿಕಾರಿ ಕಚೇರಿ ಚಲೋ',
    news2Desc: 'ಬಡವರಿಗೆ ಗುಣಮಟ್ಟದ ಚಿಕಿತ್ಸೆ ದೊರೆಯುವಂತೆ ಜಿಲ್ಲಾ ಆಸ್ಪತ್ರೆಗಳಲ್ಲಿ ಸೌಲಭ್ಯ ಹೆಚ್ಚಿಸಲು ಆಗ್ರಹಿಸಿ ಹೋರಾಟ.',
    news3Title: 'ಯುವ ಜನೋತ್ಸವ ಮತ್ತು ಕ್ರೀಡಾ ಕೂಟ ಯಶಸ್ವಿ ಸಮಾರೋಪ',
    news3Desc: 'ಯುವಜನರಲ್ಲಿ ಕ್ರೀಡಾ ಮನೋಭಾವ ಮತ್ತು ಸಾಂಸ್ಕೃತಿಕ ಒಗ್ಗಟ್ಟು ಬೆಳೆಸಲು ರಾಜ್ಯವ್ಯಾಪಿ ಯುವ ಉತ್ಸವ.',
    
    
    navStatements: 'ಹೇಳಿಕೆಗಳು',
    navMartyrs: 'ಹುತಾತ್ಮರು',
    navJoinRev: 'ಕ್ರಾಂತಿಯಲ್ಲಿ ಕೈಜೋಡಿಸಿ',
    stSectionTitle: 'ಅಧಿಕೃತ <span class="highlight-red">ಹೇಳಿಕೆಗಳು &amp; ಪ್ರಕಟಣೆಗಳು</span>',
    martyrsSectionTitle: 'ಹೋರಾಟದ <span class="highlight-red">ಅಮರ ಹುತಾತ್ಮರು</span>',
    martyrsIntro: 'ಯುವಜನರ ಹಕ್ಕುಗಳು, ಸಾಮಾಜಿಕ ನ್ಯಾಯ, ಸಮಾನತೆ ಮತ್ತು ಕೋಮು ಸೌಹಾರ್ದತೆಯ ಉದಾತ್ತ ಧ್ಯೇಯಕ್ಕಾಗಿ ತಮ್ಮ ಜೀವನವನ್ನೇ ಬಲಿದಾನ ಮಾಡಿದ ಕ್ರಾಂತಿಕಾರಿ ಹುತಾತ್ಮರಿಗೆ ನಮ್ಮ ಕ್ರಾಂತಿಕಾರಿ ನಮನಗಳು.',
    videoSectionTitle: 'ಯುವಜನ <span class="highlight-red">ರ‍್ಯಾಲಿಗಳು &amp; ವೀಡಿಯೋಗಳು</span>',
    videoMainTitle: 'ಎಸ್.ಎಫ್.ಐ ದಕ್ಷಿಣ ಕನ್ನಡ ರಾಜ್ಯ ಯುವ ಸಮಾವೇಶದ ಪ್ರಮುಖ ಕ್ಷಣಗಳು',
    videoMainSub: 'ಲಕ್ಷಾಂತರ ವಿದ್ಯಾರ್ಥಿಗಳು ಮತ್ತು ಯುವಜನರನ್ನು ಒಗ್ಗೂಡಿಸಿ ಉದ್ಯೋಗ ಮತ್ತು ಶಿಕ್ಷಣಕ್ಕಾಗಿ ನಡೆದ ಬೃಹತ್ ಸಮಾವೇಶದ ನೇರ ದೃಶ್ಯಾವಳಿಗಳು.',
    bloodSearchHeading: 'ತುರ್ತು ರಕ್ತದಾನಿ ಹುಡುಕಾಟ (Emergency Blood Finder)',
    joinModalTitle: 'ಕ್ರಾಂತಿಯಲ್ಲಿ ಕೈಜೋಡಿಸಿ (Join The Revolution)',
    joinModalSub: 'ಯುವಜನರ ಹಕ್ಕುಗಳು, ಶಿಕ್ಷಣ ಮತ್ತು ಸಮಾನ ಸಮಾಜ ನಿರ್ಮಾಣದ ಐತಿಹಾಸಿಕ ಚಳವಳಿಯ ಭಾಗವಾಗಿ. ಸದಸ್ಯತ್ವಕ್ಕಾಗಿ ವಿವರಗಳನ್ನು ಭರ್ತಿ ಮಾಡಿ.',
    btnDownloadStatement: 'ಹೇಳಿಕೆ PDF ಡೌನ್‌ಲೋಡ್ <i class="fa-solid fa-download"></i>',
    adminLink: 'ಅಡ್ಮಿನ್ ಪೋರ್ಟಲ್',
    committeesHeroTitle: 'ಕರ್ನಾಟಕ <span class="highlight-red">ಸಮಿತಿಗಳು &amp; ಘಟಕಗಳು</span>',
    martyrsHeroTitle: 'ಹೋರಾಟದ <span class="highlight-red">ಅಮರ ಹುತಾತ್ಮರು</span>',
    btnPayHomage: 'ಪುಷ್ಪ ನಮನ ಸಲ್ಲಿಸಿ <i class="fa-solid fa-spa"></i>',
    leadSectionTitle: 'ರಾಜ್ಯ <span class="highlight-red">ಮುಖಂಡರು</span>',
    nationalLeadTitle: '<i class="fa-solid fa-flag" style="color:var(--primary,#dc2626); font-size:0.85em; margin-right:4px;"></i> ಅಖಿಲ ಭಾರತ / ರಾಷ್ಟ್ರೀಯ ನಾಯಕತ್ವ',
    stateLeadTitle: '<i class="fa-solid fa-flag" style="color:var(--primary,#dc2626); font-size:0.85em; margin-right:4px;"></i> ಕರ್ನಾಟಕ ರಾಜ್ಯ ನಾಯಕತ್ವ',
    nl1Name: 'ಕಾಮ್ರೇಡ್ ಎ. ಎ. ರಹೀಮ್',
    nl1Role: 'ಅಖಿಲ ಭಾರತ ಅಧ್ಯಕ್ಷರು',
    nl2Name: 'ಕಾಮ್ರೇಡ್ ಹಿಮಾಘ್ನರಾಜ್ ಭಟ್ಟಾಚಾರ್ಯ',
    nl2Role: 'ಅಖಿಲ ಭಾರತ ಪ್ರಧಾನ ಕಾರ್ಯದರ್ಶಿ',
    lead1Name: 'ಕಾಮ್ರೇಡ್ ಲವಿತ್ರ ವಸ್ತ್ರದ',
    lead1Role: 'ರಾಜ್ಯ ಅಧ್ಯಕ್ಷರು',
    lead2Name: 'ಕಾಮ್ರೇಡ್ ಸಂತೋಷ್ ಬಜಾಲ್',
    lead2Role: 'ರಾಜ್ಯ ಪ್ರಧಾನ ಕಾರ್ಯದರ್ಶಿ',
    lead3Name: 'ಕಾಮ್ರೇಡ್ ದಿಲೀಪ್ (ಬೆಂಗಳೂರು)',
    lead3Role: 'ರಾಜ್ಯ ಖಜಾಂಚಿ',
    
    contactTitle: 'ಸಂಪರ್ಕಿಸಿ & <span class="highlight-red">ಜಿಲ್ಲಾ ಜಾಲ</span>',
    officeLabel: 'ರಾಜ್ಯ ಕೇಂದ್ರ ಕಚೇರಿ ವಿಳಾಸ',
    officeVal: 'SFI-DYFI ಕಚೇರಿ, ಸಿ/ಓ: ಅಮ್ಮ ನಿಲಯ, #25, 1ನೇ ಮುಖ್ಯ ರಸ್ತೆ, 11ನೇ ಕ್ರಾಸ್, ಸಂಪಂಗಿರಾಮನಗರ, ಬೆಂಗಳೂರು - 560027.',
    phoneLabel: 'ದೂರವಾಣಿ / ಸಹಾಯವಾಣಿ',
    phoneVal: '+91 9449225636 / +91 9481261229',
    emailLabel: 'ಇಮೇಲ್ ವಿಳಾಸ',
    emailVal: 'dyfikar1980@gmail.com',
    formName: 'ನಿಮ್ಮ ಪೂರ್ಣ ಹೆಸರು',
    formPhone: 'ಮೊಬೈಲ್ ಸಂಖ್ಯೆ',
    formDistrict: 'ನಿಮ್ಮ ಜಿಲ್ಲೆ',
    formMsg: 'ನಿಮ್ಮ ಸಂದೇಶ ಅಥವಾ ಪ್ರಶ್ನೆ',
    formSubmit: 'ಸಂದೇಶ ಕಳುಹಿಸಿ <i class="fa-solid fa-paper-plane"></i>',
    
    footerDesc: 'ಭಾರತ ವಿದ್ಯಾರ್ಥಿ ಫೆಡರೇಶನ್ (SFI) — ವಿದ್ಯಾರ್ಥಿ ಹಕ್ಕುಗಳು, ಉಚಿತ ಶಿಕ್ಷಣ, ಪ್ರಜಾಪ್ರಭುತ್ವ ಮತ್ತು ಸಾಮಾಜಿಕ ನ್ಯಾಯಕ್ಕಾಗಿ ಹೋರಾಡುವ ಮುಂಚೂಣಿ ಸಂಘಟನೆ.',
    footerQuick: 'ತ್ವರಿತ ಲಿಂಕ್‌ಗಳು',
    footerDistricts: 'ಪ್ರಮುಖ ತಾಲ್ಲೂಕುಗಳು',
    footerLegal: 'ಜಿಲ್ಲಾ ಸಮಿತಿ ಕಚೇರಿ',
    footerTerms: 'ಮಂಗಳೂರು, ದಕ್ಷಿಣ ಕನ್ನಡ',
    footerRights: '© 2026 — ಎಸ್.ಎಫ್.ಐ ದಕ್ಷಿಣ ಕನ್ನಡ ಜಿಲ್ಲಾ ಸಮಿತಿ. ಸರ್ವ ಹಕ್ಕುಗಳೂ ಕಾಯ್ದಿರಿಸಲಾಗಿದೆ.',
    linkPrivacy: 'ಗೌಪ್ಯತಾ ನೀತಿ',
    linkTerms: 'ನಿಯಮಗಳು & ಷರತ್ತುಗಳು',
    legalModalBadge: 'ಅಧಿಕೃತ ನೀತಿ ಸಂಹಿತೆ',
    legalModalTitle: 'ಎಸ್.ಎಫ್.ಐ ದಕ್ಷಿಣ ಕನ್ನಡ — ಗೌಪ್ಯತಾ ನೀತಿ ಮತ್ತು ನಿಯಮಗಳು',
    tabPrivacy: 'ಗೌಪ್ಯತಾ ನೀತಿ',
    tabTerms: 'ನಿಯಮಗಳು & ಷರತ್ತುಗಳು'
  }
};

// Current language and theme preferences
let currentLang = localStorage.getItem('sfi_lang') || localStorage.getItem('dyfi_lang') || 'kn';
let currentTheme = localStorage.getItem('sfi_theme') || localStorage.getItem('dyfi_theme') || 'dark';

document.addEventListener('DOMContentLoaded', () => {
  initThemeSwitcher();
  initLanguageSwitcher();
  initDistrictUnits();
  initHeroCarousel();
  initCounters();
  initModals();
  initGallery();
  initContactForm();
  initMobileDrawer();
  initScrollEffects();
  initLegalModals();
});

/* ========================================================
   2.5 THEME SWITCHER (DARK / LIGHT MODE)
   ======================================================== */
function initThemeSwitcher() {
  applyTheme(currentTheme);

  const desktopBtn = document.getElementById('themeToggleBtn');
  const mobileBtn = document.getElementById('mobileThemeToggleBtn');

  const toggleHandler = () => {
    currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('sfi_theme', currentTheme);
    localStorage.setItem('dyfi_theme', currentTheme);
    applyTheme(currentTheme);
    const msg = currentTheme === 'light'
      ? (currentLang === 'kn' ? 'ಬೆಳಕಿನ ಥೀಮ್ (Light Mode) ಸಕ್ರಿಯಗೊಳಿಸಲಾಗಿದೆ' : 'Switched to Light Mode')
      : (currentLang === 'kn' ? 'ಡಾರ್ಕ್ ಥೀಮ್ (Dark Mode) ಸಕ್ರಿಯಗೊಳಿಸಲಾಗಿದೆ' : 'Switched to Dark Mode');
    showToast(msg);
  };

  if (desktopBtn) {
    desktopBtn.addEventListener('click', toggleHandler);
  }
  if (mobileBtn) {
    mobileBtn.addEventListener('click', toggleHandler);
  }
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  const isDark = theme === 'dark';

  // Desktop Toggle Button
  const desktopBtn = document.getElementById('themeToggleBtn');
  const themeIcon = document.getElementById('themeIcon');
  if (themeIcon) {
    themeIcon.innerHTML = isDark ? '<i class="fa-solid fa-sun"></i>' : '<i class="fa-solid fa-moon"></i>';
  }
  if (desktopBtn) {
    const label = isDark
      ? (currentLang === 'kn' ? 'ಬೆಳಕಿನ ಮೋಡ್‌ಗೆ ಬದಲಾಯಿಸಿ' : 'Switch to Light Mode')
      : (currentLang === 'kn' ? 'ಡಾರ್ಕ್ ಮೋಡ್‌ಗೆ ಬದಲಾಯಿಸಿ' : 'Switch to Dark Mode');
    desktopBtn.setAttribute('title', label);
    desktopBtn.setAttribute('aria-label', label);
  }

  // Mobile Drawer Toggle Button
  const mobileThemeIcon = document.getElementById('mobileThemeIcon');
  const mobileThemeText = document.getElementById('mobileThemeText');
  if (mobileThemeIcon) {
    mobileThemeIcon.innerHTML = isDark ? '<i class="fa-solid fa-sun"></i>' : '<i class="fa-solid fa-moon"></i>';
  }
  if (mobileThemeText) {
    if (isDark) {
      mobileThemeText.textContent = currentLang === 'kn' ? 'ಬೆಳಕಿನ ಥೀಮ್ (Light Mode)' : 'Light Mode';
    } else {
      mobileThemeText.textContent = currentLang === 'kn' ? 'ಡಾರ್ಕ್ ಥೀಮ್ (Dark Mode)' : 'Dark Mode';
    }
  }
}

/* ========================================================
   3. LANGUAGE SWITCHER LOGIC
   ======================================================== */
function initLanguageSwitcher() {
  const langBtn = document.getElementById('langToggleBtn');
  const mobileLangBtn = document.getElementById('mobileLangToggleBtn');
  if (!langBtn && !mobileLangBtn) return;
  
  applyLanguage(currentLang);
  
  const handleToggle = () => {
    currentLang = currentLang === 'en' ? 'kn' : 'en';
    localStorage.setItem('sfi_lang', currentLang);
    localStorage.setItem('dyfi_lang', currentLang);
    applyLanguage(currentLang);
    if (typeof renderDistrictCards === 'function') {
      renderDistrictCards();
    }
    showToast(currentLang === 'kn' ? 'ಭಾಷೆಯನ್ನು ಕನ್ನಡಕ್ಕೆ ಬದಲಾಯಿಸಲಾಗಿದೆ' : 'Language switched to English');
  };

  if (langBtn) {
    langBtn.addEventListener('click', handleToggle);
  }
  if (mobileLangBtn) {
    mobileLangBtn.addEventListener('click', handleToggle);
  }
}

function applyLanguage(lang) {
  const data = i18nData[lang];
  if (!data) return;
  
  // Update lang attribute on html
  document.documentElement.lang = lang;
  
  const langBtn = document.getElementById('langToggleBtn');
  if (langBtn) {
    langBtn.innerHTML = `<span class="lang-icon"><i class="fa-solid fa-globe"></i></span> <span class="lang-text">${data.langBtn}</span>`;
  }

  const mobileLangText = document.getElementById('mobileLangText');
  if (mobileLangText) {
    mobileLangText.textContent = lang === 'kn' ? 'English (Switch Language)' : 'ಕನ್ನಡಕ್ಕೆ ಬದಲಾಯಿಸಿ';
  }
  
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (data[key]) {
      el.innerHTML = data[key];
    }
  });

  // Keep theme switcher button text in sync with active language
  applyTheme(currentTheme);

  // Re-apply live customized admin content so admin changes always take priority
  if (typeof renderDynamicDataStoreContent === 'function') {
    renderDynamicDataStoreContent(lang);
  }
}

/* ========================================================
   4. DISTRICT UNITS EXPLORER & MODAL
   ======================================================== */
let currentDistrictFilter = 'all';
let currentDistrictSearch = '';

function initDistrictUnits() {
  renderDistrictCards();
  
  const filterBtns = document.querySelectorAll('.district-filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentDistrictFilter = btn.getAttribute('data-filter');
      renderDistrictCards();
    });
  });

  const searchInput = document.getElementById('districtSearchInput');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      currentDistrictSearch = (e.target.value || '').trim().toLowerCase();
      renderDistrictCards();
    });
  }
  
  // Modal Close
  const closeBtn = document.getElementById('closeDistrictModal');
  const modal = document.getElementById('districtDetailsModal');
  if (closeBtn && modal) {
    closeBtn.addEventListener('click', () => {
      modal.classList.remove('active');
    });
  }
}

function renderDistrictCards() {
  const container = document.getElementById('districtsGridContainer');
  if (!container) return;
  
  // Re-fetch latest districts from DyfiDataStore
  districtUnitsData = getDistrictUnitsData();

  const isKn = currentLang === 'kn';
  const q = currentDistrictSearch;
  const filtered = districtUnitsData.filter(d => {
    const matchZone = currentDistrictFilter === 'all' || d.zone === currentDistrictFilter;
    if (!matchZone) return false;
    if (!q) return true;

    const nameKn = (d.name_kn || '').toLowerCase();
    const nameEn = (d.name_en || '').toLowerCase();
    const zoneKn = (d.zone_kn || '').toLowerCase();
    const zoneEn = (d.zone_en || '').toLowerCase();
    const presKn = (d.president_kn || '').toLowerCase();
    const presEn = (d.president_en || '').toLowerCase();
    const secKn = (d.secretary_kn || '').toLowerCase();
    const secEn = (d.secretary_en || '').toLowerCase();
    const taluksKn = Array.isArray(d.taluks_kn) ? d.taluks_kn.join(' ').toLowerCase() : '';
    const taluksEn = Array.isArray(d.taluks_en) ? d.taluks_en.join(' ').toLowerCase() : '';

    return nameKn.includes(q) || nameEn.includes(q) || zoneKn.includes(q) || zoneEn.includes(q) ||
      presKn.includes(q) || presEn.includes(q) || secKn.includes(q) || secEn.includes(q) ||
      taluksKn.includes(q) || taluksEn.includes(q);
  });
    
  container.innerHTML = filtered.map(d => {
    const dName = isKn ? d.name_kn : d.name_en;
    const dZone = isKn ? d.zone_kn : d.zone_en;
    const talukLabel = isKn ? `${d.taluks_count || (d.taluks_data ? d.taluks_data.length : 0)} ತಾಲ್ಲೂಕುಗಳು` : `${d.taluks_count || (d.taluks_data ? d.taluks_data.length : 0)} Taluks`;
    const unitsLabel = isKn ? `${d.units_count || 0} ಗ್ರಾಮ/ನಗರ ಘಟಕಗಳು` : `${d.units_count || 0} Local Units`;
    const btnText = isKn ? 'ಸಮಿತಿ & ತಾಲ್ಲೂಕು ಪದಾಧಿಕಾರಿಗಳು ವೀಕ್ಷಿಸಿ <i class="fa-solid fa-arrow-right"></i>' : 'View Committee & Taluk Posts <i class="fa-solid fa-arrow-right"></i>';
    const presPost = isKn ? (d.president_post_kn || 'ಜಿಲ್ಲಾ ಅಧ್ಯಕ್ಷರು') : (d.president_post_en || 'District President');
    const secPost = isKn ? (d.secretary_post_kn || 'ಜಿಲ್ಲಾ ಕಾರ್ಯದರ್ಶಿ') : (d.secretary_post_en || 'District Secretary');
    const presName = isKn ? (d.president_kn || d.president_en) : (d.president_en || d.president_kn);
    const secName = isKn ? (d.secretary_kn || d.secretary_en) : (d.secretary_en || d.secretary_kn);
    
    // Sample taluks pills
    const taluksList = (isKn ? d.taluks_kn : d.taluks_en) || 
      (d.taluks_data && d.taluks_data.length > 0 ? d.taluks_data.map(t => isKn ? (t.name_kn || t.name_en) : (t.name_en || t.name_kn)) : []);
    const sampleTaluksHtml = Array.isArray(taluksList) && taluksList.length > 0
      ? taluksList.slice(0, 4).map(t => `<span class="taluk-mini-pill">${t}</span>`).join('')
      : `<span class="taluk-mini-pill">${isKn ? 'ತಾಲ್ಲೂಕು ಸಮಿತಿಗಳು' : 'Taluk Committees'}</span>`;
    const moreTaluksCount = Array.isArray(taluksList) && taluksList.length > 4 ? taluksList.length - 4 : 0;
    
    return `
      <div class="district-card" data-id="${d.id}">
        <div class="district-card-header">
          <div>
            <h3 class="district-name">${dName}</h3>
            <span class="district-zone-badge">${dZone}</span>
          </div>
          <div class="district-stats-vertical">
            <span class="taluk-count-pill"><i class="fa-solid fa-landmark"></i> ${talukLabel}</span>
            <span class="units-count-pill"><i class="fa-solid fa-flag" style="color:#ef4444;"></i> ${unitsLabel}</span>
          </div>
        </div>
        
        <!-- District President & Secretary Spotlight -->
        <div class="district-leaders-preview">
          <div class="preview-leader-item district-pres-item" ${d.president_photo ? `onclick="openLightboxImage('${d.president_photo}', '${presName || presPost} (${dName})')"` : ''}>
            ${d.president_photo 
              ? `<img src="${d.president_photo}" alt="${presName || presPost}" class="preview-avatar" onerror="this.onerror=null; this.outerHTML='<div class=\\'preview-avatar placeholder-avatar\\' style=\\'display:flex; align-items:center; justify-content:center; background:#1e293b; color:#94a3b8; font-size:1.2rem; border:2px solid rgba(239,68,68,0.25);\\'><i class=\\'fa-solid fa-user\\'></i></div>';">` 
              : `<div class="preview-avatar placeholder-avatar" style="display:flex; align-items:center; justify-content:center; background:#1e293b; color:#94a3b8; font-size:1.2rem; border:2px solid rgba(239,68,68,0.25);"><i class="fa-solid fa-user"></i></div>`}
            <div class="preview-info">
              <span class="preview-post-badge pres-badge"><i class="fa-solid fa-flag" style="font-size:0.8em; margin-right:3px;"></i> ${presPost}</span>
              <strong class="preview-name" style="${!presName ? 'color:#94a3b8; font-weight:normal; font-style:italic;' : ''}">
                ${presName || (isKn ? 'ನಿಗದಿಪಡಿಸಿಲ್ಲ' : 'To be assigned')}
              </strong>
              ${d.president_phone ? `<a href="tel:${d.president_phone}" class="preview-phone" onclick="event.stopPropagation();"><i class="fa-solid fa-phone"></i> ${d.president_phone}</a>` : `<span class="preview-phone" style="opacity:0.5;"><i class="fa-solid fa-phone"></i> —</span>`}
            </div>
          </div>
          <div class="preview-leader-item district-sec-item" ${d.secretary_photo ? `onclick="openLightboxImage('${d.secretary_photo}', '${secName || secPost} (${dName})')"` : ''}>
            ${d.secretary_photo 
              ? `<img src="${d.secretary_photo}" alt="${secName || secPost}" class="preview-avatar" onerror="this.onerror=null; this.outerHTML='<div class=\\'preview-avatar placeholder-avatar\\' style=\\'display:flex; align-items:center; justify-content:center; background:#1e293b; color:#94a3b8; font-size:1.2rem; border:2px solid rgba(239,68,68,0.25);\\'><i class=\\'fa-solid fa-user\\'></i></div>';">` 
              : `<div class="preview-avatar placeholder-avatar" style="display:flex; align-items:center; justify-content:center; background:#1e293b; color:#94a3b8; font-size:1.2rem; border:2px solid rgba(239,68,68,0.25);"><i class="fa-solid fa-user"></i></div>`}
            <div class="preview-info">
              <span class="preview-post-badge sec-badge"><i class="fa-solid fa-flag" style="font-size:0.8em; margin-right:3px;"></i> ${secPost}</span>
              <strong class="preview-name" style="${!secName ? 'color:#94a3b8; font-weight:normal; font-style:italic;' : ''}">
                ${secName || (isKn ? 'ನಿಗದಿಪಡಿಸಿಲ್ಲ' : 'To be assigned')}
              </strong>
              ${d.secretary_phone ? `<a href="tel:${d.secretary_phone}" class="preview-phone" onclick="event.stopPropagation();"><i class="fa-solid fa-phone"></i> ${d.secretary_phone}</a>` : `<span class="preview-phone" style="opacity:0.5;"><i class="fa-solid fa-phone"></i> —</span>`}
            </div>
          </div>
        </div>

        <!-- Sample Taluk Pills -->
        <div class="district-taluks-sample">
          <small class="taluks-sample-label">${isKn ? 'ಪ್ರಮುಖ ತಾಲ್ಲೂಕುಗಳು:' : 'Key Taluks:'}</small>
          <div class="taluks-mini-list">
            ${sampleTaluksHtml}
            ${moreTaluksCount > 0 ? `<span class="taluk-mini-pill more">+${moreTaluksCount}</span>` : ''}
          </div>
        </div>
        
        <button type="button" class="btn-open-district" onclick="openDistrictModal('${d.id}')">
          ${btnText}
        </button>
      </div>
    `;
  }).join('');
}

window.openDistrictModal = function(districtId) {
  districtUnitsData = getDistrictUnitsData();
  const d = districtUnitsData.find(item => item.id === districtId);
  if (!d) return;
  
  const modal = document.getElementById('districtDetailsModal');
  if (!modal) return;
  
  const isKn = currentLang === 'kn';
  const dName = isKn ? d.name_kn : d.name_en;
  const dZone = isKn ? d.zone_kn : d.zone_en;
  const dOffice = isKn ? d.office_kn : d.office_en;
  const presPost = isKn ? (d.president_post_kn || 'ಜಿಲ್ಲಾ ಅಧ್ಯಕ್ಷರು') : (d.president_post_en || 'District President');
  const secPost = isKn ? (d.secretary_post_kn || 'ಜಿಲ್ಲಾ ಕಾರ್ಯದರ್ಶಿ') : (d.secretary_post_en || 'District Secretary');
  const presName = isKn ? (d.president_kn || d.president_en || '') : (d.president_en || d.president_kn || '');
  const secName = isKn ? (d.secretary_kn || d.secretary_en || '') : (d.secretary_en || d.secretary_kn || '');

  // Set Modal Title
  const modalTitle = document.getElementById('districtModalTitle');
  if (modalTitle) {
    const confDateBadge = d.conference_date
      ? `<span style="font-size:0.8rem; background:rgba(220,38,38,0.15); color:#ef4444; padding:0.2rem 0.5rem; border-radius:4px; margin-left:8px;"><i class="fa-solid fa-calendar"></i> ${d.conference_date}</span>`
      : `<span style="font-size:0.8rem; color:#94a3b8; font-style:italic; margin-left:8px;">[ ${isKn ? 'ಸಮ್ಮೇಳನ ದಿನಾಂಕ ನಮೂದಿಸಿಲ್ಲ' : 'Date not set'} ]</span>`;
    modalTitle.innerHTML = `<span style="color: #dc2626;"><i class="fa-solid fa-flag"></i></span> ${dName} — ${dZone} ${confDateBadge}`;
  }
  
  // 1. District Leadership Spotlight (District President & Secretary)
  const membersWrap = document.getElementById('districtModalMembers');
  if (membersWrap) {
    membersWrap.innerHTML = `
      <div class="modal-section-title">
        <span><i class="fa-solid fa-users"></i></span> ${isKn ? 'ಜಿಲ್ಲಾ ಪದಾಧಿಕಾರಿಗಳು (District President & Secretary Posts):' : 'District Committee Executive Officers:'}
      </div>
      <div class="district-officers-spotlight">
        <div class="district-officer-card spotlight-pres">
          <div class="officer-avatar-box" ${d.president_photo ? `onclick="openLightboxImage('${d.president_photo}', '${presName || presPost} (${dName})')"` : ''}>
            ${d.president_photo 
              ? `<img src="${d.president_photo}" alt="${presName || presPost}" onerror="this.onerror=null; this.parentElement.innerHTML='<div class=\\'officer-avatar-box placeholder-box\\' style=\\'display:flex; align-items:center; justify-content:center; width:100%; height:100%; background:#1e293b; color:#94a3b8; font-size:2.5rem;\\'><i class=\\'fa-solid fa-user\\'></i></div>';"><span class="officer-zoom-hint"><i class="fa-solid fa-magnifying-glass"></i></span>` 
              : `<div class="officer-avatar-box placeholder-box" style="display:flex; align-items:center; justify-content:center; width:100%; height:100%; background:#1e293b; color:#94a3b8; font-size:2.5rem;"><i class="fa-solid fa-user"></i></div>`}
          </div>
          <div class="officer-info">
            <span class="officer-badge pres-badge"><i class="fa-solid fa-flag" style="font-size:0.8em; margin-right:3px;"></i> ${presPost}</span>
            <h4 class="officer-name" style="${!presName ? 'color:#94a3b8; font-weight:normal; font-style:italic;' : ''}">
              ${presName || (isKn ? 'ಪದಾಧಿಕಾರಿ ನಿಗದಿಪಡಿಸಿಲ್ಲ' : 'Officer to be assigned')}
            </h4>
            <div class="officer-sub">${isKn ? 'ಜಿಲ್ಲಾ ಸಮಿತಿ ಮುಖ್ಯಸ್ಥರು' : 'District Committee President'}</div>
            ${d.president_phone ? `<a href="tel:${d.president_phone}" class="officer-phone-btn"><i class="fa-solid fa-phone"></i> ${d.president_phone}</a>` : `<span class="officer-phone-btn" style="opacity:0.5; pointer-events:none;"><i class="fa-solid fa-phone"></i> —</span>`}
          </div>
        </div>

        <div class="district-officer-card spotlight-sec">
          <div class="officer-avatar-box" ${d.secretary_photo ? `onclick="openLightboxImage('${d.secretary_photo}', '${secName || secPost} (${dName})')"` : ''}>
            ${d.secretary_photo 
              ? `<img src="${d.secretary_photo}" alt="${secName || secPost}" onerror="this.onerror=null; this.parentElement.innerHTML='<div class=\\'officer-avatar-box placeholder-box\\' style=\\'display:flex; align-items:center; justify-content:center; width:100%; height:100%; background:#1e293b; color:#94a3b8; font-size:2.5rem;\\'><i class=\\'fa-solid fa-user\\'></i></div>';"><span class="officer-zoom-hint"><i class="fa-solid fa-magnifying-glass"></i></span>` 
              : `<div class="officer-avatar-box placeholder-box" style="display:flex; align-items:center; justify-content:center; width:100%; height:100%; background:#1e293b; color:#94a3b8; font-size:2.5rem;"><i class="fa-solid fa-user"></i></div>`}
          </div>
          <div class="officer-info">
            <span class="officer-badge sec-badge"><i class="fa-solid fa-flag" style="font-size:0.8em; margin-right:3px;"></i> ${secPost}</span>
            <h4 class="officer-name" style="${!secName ? 'color:#94a3b8; font-weight:normal; font-style:italic;' : ''}">
              ${secName || (isKn ? 'ಪದಾಧಿಕಾರಿ ನಿಗದಿಪಡಿಸಿಲ್ಲ' : 'Officer to be assigned')}
            </h4>
            <div class="officer-sub">${isKn ? 'ಜಿಲ್ಲಾ ಸಂಘಟನಾ ಕಾರ್ಯದರ್ಶಿ' : 'District Organizing Secretary'}</div>
            ${d.secretary_phone ? `<a href="tel:${d.secretary_phone}" class="officer-phone-btn"><i class="fa-solid fa-phone"></i> ${d.secretary_phone}</a>` : `<span class="officer-phone-btn" style="opacity:0.5; pointer-events:none;"><i class="fa-solid fa-phone"></i> —</span>`}
          </div>
        </div>
      </div>
    `;
  }

  // 2. Taluk Committees & Posts (Taluk President & Taluk Secretary for each Taluk)
  const taluksWrap = document.getElementById('districtModalTaluks');
  if (taluksWrap) {
    const taluksData = d.taluks_data || [];
    const talukCardsHtml = taluksData.length > 0 ? taluksData.map((t) => {
      const tName = isKn ? (t.name_kn || t.name_en) : (t.name_en || t.name_kn);
      const tPres = isKn ? (t.president_kn || t.president_en) : (t.president_en || t.president_kn);
      const tSec = isKn ? (t.secretary_kn || t.secretary_en) : (t.secretary_en || t.secretary_kn);
      const presDisplay = tPres || `<span style="color:#94a3b8; font-weight:normal; font-style:italic;">${isKn ? 'ನಿಗದಿಪಡಿಸಿಲ್ಲ' : '—'}</span>`;
      const secDisplay = tSec || `<span style="color:#94a3b8; font-weight:normal; font-style:italic;">${isKn ? 'ನಿಗದಿಪಡಿಸಿಲ್ಲ' : '—'}</span>`;
      const tUnits = isKn 
        ? (t.units_kn || t.units_en || `${t.units || ''} ಸಕ್ರಿಯ ಘಟಕ`) 
        : (t.units_en || t.units_kn || `${t.units || ''} Active Unit`);
      return `
        <div class="taluk-committee-item">
          <div class="taluk-header-bar">
            <div class="taluk-item-name"><i class="fa-solid fa-landmark" style="margin-right:4px;"></i> ${tName}</div>
            <span class="taluk-unit-tag">${tUnits}</span>
          </div>
          <div class="taluk-officers-grid">
            <div class="taluk-officer-col">
              <span class="taluk-officer-role">${isKn ? 'ತಾಲ್ಲೂಕು ಅಧ್ಯಕ್ಷರು:' : 'Taluk President:'}</span>
              <strong class="taluk-officer-name">${presDisplay}</strong>
            </div>
            <div class="taluk-officer-col">
              <span class="taluk-officer-role">${isKn ? 'ತಾಲ್ಲೂಕು ಕಾರ್ಯದರ್ಶಿ:' : 'Taluk Secretary:'}</span>
              <strong class="taluk-officer-name">${secDisplay}</strong>
            </div>
            <div class="taluk-officer-col taluk-contact-col">
              ${t.phone ? `<a href="tel:${t.phone}" class="taluk-call-btn"><i class="fa-solid fa-phone"></i> ${t.phone}</a>` : `<span style="color:#64748b; font-size:0.85rem;"><i class="fa-solid fa-phone"></i> —</span>`}
            </div>
          </div>
          <div class="taluk-meta-row" style="display:flex; flex-wrap:wrap; align-items:center; gap:0.5rem; margin-top:0.6rem; padding-top:0.5rem; border-top:1px dashed var(--border-main,#e2e8f0); font-size:0.82rem;">
            <span class="taluk-date-tag" style="background:rgba(220,38,38,0.1); color:#ef4444; padding:0.25rem 0.55rem; border-radius:4px; font-weight:600;">
              <i class="fa-solid fa-calendar-day"></i> ${isKn ? 'ಸಮ್ಮೇಳನ/ರಚನಾ ದಿನಾಂಕ:' : 'Conference/Date:'} ${t.date ? t.date : `<span style="color:#94a3b8; font-weight:normal; font-style:italic;">${isKn ? '[ ದಿನಾಂಕ ಭರ್ತಿ ಮಾಡಿ ]' : '[ Date to be filled ]'}</span>`}
            </span>
            ${t.areas ? `
              <div class="taluk-areas-box" style="width:100%; color:var(--text-muted,#94a3b8); margin-top:0.35rem; font-size:0.8rem; line-height:1.4;">
                <strong style="color:var(--text-heading,#0f172a);"><i class="fa-solid fa-location-dot" style="color:#ef4444;"></i> ${isKn ? 'ಪ್ರಮುಖ ಕಾಲೇಜು & ಏರಿಯಾ ಘಟಕಗಳು:' : 'Key Campus & Area Units:'}</strong> ${t.areas}
              </div>
            ` : ''}
          </div>
        </div>
      `;
    }).join('') : `
      <div style="background: rgba(0,0,0,0.03); border-radius: 8px; padding: 1.2rem; text-align: center; color: #64748b; font-size: 0.95rem;">
        ${isKn ? 'ಯಾವುದೇ ತಾಲ್ಲೂಕು ಸಮಿತಿಗಳು ನೋಂದಾಯಿಸಲಾಗಿಲ್ಲ. ಅಡ್ಮಿನ್ ಪೋರ್ಟಲ್ ಮೂಲಕ ಸೇರಿಸಬಹುದು.' : 'No taluk committees added yet. You can add them from the Admin Portal.'}
      </div>
    `;

    taluksWrap.innerHTML = `
      <div class="modal-section-title" style="margin-top: 1.5rem;">
        <span><i class="fa-solid fa-landmark"></i></span> ${isKn ? `ತಾಲ್ಲೂಕು ಸಮಿತಿಗಳು ಮತ್ತು ಪದಾಧಿಕಾರಿಗಳು (${taluksData.length} ತಾಲ್ಲೂಕುಗಳು):` : `Taluk Committees & Leadership (${taluksData.length} Taluks):`}
      </div>
      <div class="taluk-committees-container">
        ${talukCardsHtml}
      </div>
    `;
  }

  // 3. Village & Area Units Information
  const unitsWrap = document.getElementById('districtModalUnits');
  if (unitsWrap) {
    const areaDesc = isKn ? (d.area_units_kn || d.area_units_en) : (d.area_units_en || d.area_units_kn);
    unitsWrap.innerHTML = `
      <div class="modal-section-title" style="margin-top: 1.2rem;">
        <span><i class="fa-solid fa-users"></i></span> ${isKn ? 'ಗ್ರಾಮ ಮತ್ತು ನಗರ ಏರಿಯಾ ಘಟಕಗಳು:' : 'Village & Area Youth Units:'}
      </div>
      <div class="units-description-box">
        <p>${areaDesc || (isKn ? 'ಗ್ರಾಮ ಮತ್ತು ನಗರ ಮಟ್ಟದ ಶಾಖೆಗಳು, ಏರಿಯಾ ಸಮಿತಿಗಳು ಸಕ್ರಿಯವಾಗಿ ಕಾರ್ಯನಿರ್ವಹಿಸುತ್ತಿವೆ.' : 'Active village and urban ward committees operational across the district.')}</p>
        <span class="units-badge-highlight"><i class="fa-solid fa-flag" style="color:#ef4444; margin-right:4px;"></i> ${d.units_count || 0} ${isKn ? 'ಸಕ್ರಿಯ ಘಟಕಗಳು' : 'Active Local Units'}</span>
      </div>
    `;
  }

  // 4. District Office & Helpline
  const officeWrap = document.getElementById('districtModalOffice');
  if (officeWrap) {
    officeWrap.innerHTML = `
      <div class="district-office-banner">
        <div>
          <strong><i class="fa-solid fa-building" style="margin-right:4px;"></i> ${isKn ? 'ಜಿಲ್ಲಾ ಸಮಿತಿ ಕಾರ್ಯಾಲಯ:' : 'District Office:'}</strong>
          <div>${dOffice}</div>
        </div>
        <div style="margin-top: 0.6rem;">
          <strong><i class="fa-solid fa-phone" style="margin-right:4px;"></i> ${isKn ? '24/7 ಜಿಲ್ಲಾ ಸಹಾಯವಾಣಿ:' : '24/7 Helpline:'}</strong>
          <a href="tel:${d.phone}" class="office-tel-link">${d.phone}</a>
        </div>
      </div>
    `;
  }

  modal.classList.add('active');
};

/* ========================================================
   5. HERO CAROUSEL ENGINE
   ======================================================== */
function initHeroCarousel() {
  const slides = document.querySelectorAll('.hero-slide');
  const dots = document.querySelectorAll('.carousel-dots .dot');
  const prevBtn = document.getElementById('carouselPrev');
  const nextBtn = document.getElementById('carouselNext');
  
  if (slides.length === 0) return;
  
  let currentIndex = 0;
  let timer = null;
  
  function goToSlide(index) {
    slides[currentIndex].classList.remove('active');
    dots[currentIndex]?.classList.remove('active');
    
    currentIndex = (index + slides.length) % slides.length;
    
    slides[currentIndex].classList.add('active');
    dots[currentIndex]?.classList.add('active');
  }
  
  function startAutoplay() {
    stopAutoplay();
    timer = setInterval(() => {
      goToSlide(currentIndex + 1);
    }, 6000);
  }
  
  function stopAutoplay() {
    if (timer) clearInterval(timer);
  }
  
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      goToSlide(currentIndex + 1);
      startAutoplay();
    });
  }
  
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      goToSlide(currentIndex - 1);
      startAutoplay();
    });
  }
  
  dots.forEach((dot, idx) => {
    dot.addEventListener('click', () => {
      goToSlide(idx);
      startAutoplay();
    });
  });
  
  const heroSection = document.querySelector('.hero-section');
  if (heroSection) {
    heroSection.addEventListener('mouseenter', stopAutoplay);
    heroSection.addEventListener('mouseleave', startAutoplay);
  }
  
  startAutoplay();
}

/* ========================================================
   6. ANIMATED STATISTICS COUNTER
   ======================================================== */
function initCounters() {
  const stats = document.querySelectorAll('.stat-number');
  if (stats.length === 0) return;
  
  let animated = false;
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animated) {
        animated = true;
        stats.forEach(counter => {
          const target = parseInt(counter.getAttribute('data-target'), 10) || 0;
          const suffix = counter.getAttribute('data-suffix') || '';
          let current = 0;
          const step = Math.max(1, Math.floor(target / 60));
          
          const interval = setInterval(() => {
            current += step;
            if (current >= target) {
              current = target;
              clearInterval(interval);
            }
            counter.innerText = current.toLocaleString('en-IN') + suffix;
          }, 25);
        });
      }
    });
  }, { threshold: 0.3 });
  
  const statsSection = document.querySelector('.stats-section');
  if (statsSection) observer.observe(statsSection);
}

/* ========================================================
   7. MODALS & BLOOD DONOR REGISTRATION
   ======================================================== */
function initModals() {
  const bloodRegBtn = document.getElementById('openBloodModalBtn');
  const bloodModal = document.getElementById('bloodModal');
  const closeBloodModal = document.getElementById('closeBloodModal');
  const bloodForm = document.getElementById('bloodDonorForm');
  
  if (bloodRegBtn && bloodModal) {
    bloodRegBtn.addEventListener('click', () => {
      bloodModal.classList.add('active');
    });
  }
  
  if (closeBloodModal && bloodModal) {
    closeBloodModal.addEventListener('click', () => {
      bloodModal.classList.remove('active');
    });
  }
  
  if (bloodForm) {
    bloodForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('donorName').value;
      const phone = document.getElementById('donorPhone').value;
      const bloodGroup = document.getElementById('donorGroup').value;
      const district = document.getElementById('donorDistrict').value;
      
      const donor = { name, phone, bloodGroup, district, date: new Date().toISOString() };
      const donors = JSON.parse(localStorage.getItem('dyfi_donors') || '[]');
      donors.push(donor);
      localStorage.setItem('dyfi_donors', JSON.stringify(donors));
      
      const isKn = currentLang === 'kn';
      const modalBody = bloodModal.querySelector('.modal-body');
      modalBody.innerHTML = `
        <div class="success-checkmark-box">
          <div class="checkmark-circle"><i class="fa-solid fa-check"></i></div>
          <h3 style="font-size: 1.4rem; color: #15803d; margin-bottom: 0.6rem;">
            ${isKn ? 'ಧನ್ಯವಾದಗಳು! ನೋಂದಣಿ ಯಶಸ್ವಿಯಾಗಿದೆ' : 'Thank You! Registration Successful'}
          </h3>
          <p style="color: #64748b; font-size: 0.95rem; margin-bottom: 1.5rem; line-height: 1.6;">
            ${isKn 
              ? 'ನಿಮ್ಮ ವಿವರಗಳನ್ನು ಎಸ್.ಎಫ್.ಐ ದಕ್ಷಿಣ ಕನ್ನಡ ರಕ್ತದಾನಿ ಡೈರೆಕ್ಟರಿಗೆ ಸೇರಿಸಲಾಗಿದೆ. ತುರ್ತು ಸಂದರ್ಭದಲ್ಲಿ ಸಂಪರ್ಕಿಸಲಾಗುವುದು.' 
              : 'Your details have been successfully registered to the SFI Dakshina Kannada Volunteer Blood Directory.'}
          </p>
          <div style="background: rgba(220, 38, 38, 0.08); border: 1px dashed var(--primary); padding: 1rem; border-radius: 8px; margin-bottom: 1.5rem;">
            <p style="color: var(--primary); font-weight: 700; font-size: 0.85rem; margin-bottom: 0.2rem;">
              ${isKn ? 'ತುರ್ತು ರಕ್ತದ ನೆರವಿಗೆ ಸಂಪರ್ಕಿಸಿ:' : 'FOR IMMEDIATE BLOOD EMERGENCY:'}
            </p>
            <p style="color: var(--primary); font-size: 1.2rem; font-weight: 800;">+91 9449225636 / +91 9481261229</p>
          </div>
          <button type="button" class="btn-primary" style="width: 100%; justify-content: center;" onclick="document.getElementById('bloodModal').classList.remove('active')">
            ${isKn ? 'ಮುಚ್ಚಿ' : 'Close'}
          </button>
        </div>
      `;
    });
  }
  
  // Close modals clicking outside
  document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        overlay.classList.remove('active');
      }
    });
  });
}

/* ========================================================
   8. PHOTO GALLERY FILTER & LIGHTBOX
   ======================================================== */
function initGallery() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const items = document.querySelectorAll('.gallery-item');
  const lightbox = document.getElementById('lightboxModal');
  const lightboxImg = document.getElementById('lightboxImage');
  const lightboxClose = document.getElementById('lightboxClose');
  
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.getAttribute('data-filter');
      
      items.forEach(item => {
        if (cat === 'all' || item.getAttribute('data-cat') === cat) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
  
  items.forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      if (img && lightbox && lightboxImg) {
        lightboxImg.src = img.src;
        lightbox.classList.add('active');
      }
    });
  });
  
  if (lightboxClose && lightbox) {
    lightboxClose.addEventListener('click', () => {
      lightbox.classList.remove('active');
    });
  }
  
  if (lightbox) {
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        lightbox.classList.remove('active');
      }
    });
  }
}

/* ========================================================
   9. CONTACT FORM — FORMSPREE AJAX INTEGRATION
   ======================================================== */
function initContactForm() {
  const form = document.getElementById('mainContactForm');
  if (!form) return;
  
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('.btn-submit-form') || document.getElementById('btnSubmitContact');
    const originalText = btn.innerHTML;
    const statusBox = document.getElementById('contactFormStatus');
    
    // Clear previous status
    if (statusBox) {
      statusBox.style.display = 'none';
      statusBox.className = 'contact-form-status';
      statusBox.innerHTML = '';
    }

    const isKn = currentLang === 'kn';
    btn.innerHTML = `<span><i class="fa-solid fa-spinner fa-spin"></i> ${isKn ? 'ಕಳುಹಿಸಲಾಗುತ್ತಿದೆ...' : 'Sending...'}</span>`;
    btn.disabled = true;

    const formData = new FormData(form);

    fetch('https://formspree.io/f/maeeygla', {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json'
      }
    })
    .then(async (response) => {
      if (response.ok) {
        // Also persist to local DyfiDataStore so admin panel can view enquiry in real time
        try {
          if (typeof DyfiDataStore !== 'undefined') {
            const msgs = DyfiDataStore.get(DYFI_DATA_KEYS.MESSAGES) || [];
            msgs.unshift({
              id: 'msg_' + Date.now(),
              name: formData.get('name') || '',
              phone: formData.get('phone') || '',
              district: formData.get('district') || '',
              message: formData.get('message') || '',
              date: new Date().toISOString().split('T')[0],
              status: 'Unread'
            });
            DyfiDataStore.set(DYFI_DATA_KEYS.MESSAGES, msgs);
          }
        } catch (err) {
          console.warn('Local store sync error:', err);
        }

        form.reset();

        if (statusBox) {
          statusBox.className = 'contact-form-status status-success success';
          statusBox.innerHTML = `
            <div class="status-content" style="display:flex; align-items:flex-start; gap:0.75rem;">
              <i class="fa-solid fa-circle-check status-icon" style="font-size:1.4rem; color:#10b981; flex-shrink:0; margin-top:2px;"></i>
              <div>
                <strong style="display:block; font-size:1rem; margin-bottom:0.25rem;">${isKn ? 'ಸಂದೇಶ ಯಶಸ್ವಿಯಾಗಿ ತಲುಪಿದೆ!' : 'Message Sent Successfully!'}</strong>
                <p style="margin:0; font-size:0.9rem; opacity:0.95;">${isKn ? 'ನಿಮ್ಮ ಸಂದೇಶವನ್ನು Formspree ಮೂಲಕ ಸ್ವೀಕರಿಸಲಾಗಿದೆ. ನಾವು ಶೀಘ್ರದಲ್ಲೇ ನಿಮ್ಮನ್ನು ಸಂಪರ್ಕಿಸುತ್ತೇವೆ.' : 'Thank you for contacting SFI Dakshina Kannada. We have received your inquiry.'}</p>
              </div>
            </div>
          `;
          statusBox.style.display = 'block';
          statusBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }

        showToast(isKn ? 'ನಿಮ್ಮ ಸಂದೇಶವನ್ನು ಯಶಸ್ವಿಯಾಗಿ ಕಳುಹಿಸಲಾಗಿದೆ!' : 'Your message has been sent successfully!');
      } else {
        const data = await response.json().catch(() => ({}));
        let errorMsg = isKn ? 'ಸಂದೇಶ ಕಳುಹಿಸುವಲ್ಲಿ ದೋಷ ಉಂಟಾಗಿದೆ. ದಯವಿಟ್ಟು ಪುನಃ ಪ್ರಯತ್ನಿಸಿ.' : 'Oops! There was a problem submitting your form.';
        if (data.errors && data.errors.length > 0) {
          errorMsg = data.errors.map(err => err.message).join(', ');
        }
        
        if (statusBox) {
          statusBox.className = 'contact-form-status status-error error';
          statusBox.innerHTML = `
            <div class="status-content" style="display:flex; align-items:flex-start; gap:0.75rem;">
              <i class="fa-solid fa-circle-exclamation status-icon" style="font-size:1.4rem; color:#ef4444; flex-shrink:0; margin-top:2px;"></i>
              <div>
                <strong style="display:block; font-size:1rem; margin-bottom:0.25rem;">${isKn ? 'ದೋಷ ಸಂಭವಿಸಿದೆ' : 'Submission Error'}</strong>
                <p style="margin:0; font-size:0.9rem; opacity:0.95;">${errorMsg}</p>
              </div>
            </div>
          `;
          statusBox.style.display = 'block';
          statusBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
        showToast(isKn ? 'ದೋಷ: ಸಂದೇಶ ಕಳುಹಿಸಲಾಗಲಿಲ್ಲ' : 'Error submitting form');
      }
    })
    .catch((error) => {
      console.error('Formspree submit error:', error);
      if (statusBox) {
        statusBox.className = 'contact-form-status status-error error';
        statusBox.innerHTML = `
          <div class="status-content" style="display:flex; align-items:flex-start; gap:0.75rem;">
            <i class="fa-solid fa-triangle-exclamation status-icon" style="font-size:1.4rem; color:#ef4444; flex-shrink:0; margin-top:2px;"></i>
            <div>
              <strong style="display:block; font-size:1rem; margin-bottom:0.25rem;">${isKn ? 'ನೆಟ್‌ವರ್ಕ್ ದೋಷ' : 'Network Error'}</strong>
              <p style="margin:0; font-size:0.9rem; opacity:0.95;">${isKn ? 'ನೆಟ್‌ವರ್ಕ್ ಸಂಪರ್ಕ ಪರಿಶೀಲಿಸಿ ಅಥವಾ ನೇರವಾಗಿ dyfikar1980@gmail.com ಗೆ ಇಮೇಲ್ ಮಾಡಿ.' : 'Please check your internet connection or email directly to dyfikar1980@gmail.com'}</p>
            </div>
          </div>
        `;
        statusBox.style.display = 'block';
        statusBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
      showToast(isKn ? 'ನೆಟ್‌ವರ್ಕ್ ದೋಷ ಉಂಟಾಗಿದೆ' : 'Network error submitting form');
    })
    .finally(() => {
      btn.innerHTML = originalText;
      btn.disabled = false;
    });
  });
}

/* ========================================================
   10. MOBILE DRAWER NAVIGATION
   ======================================================== */
function initMobileDrawer() {
  const toggleBtn = document.getElementById('mobileToggleBtn');
  const drawer = document.getElementById('mobileDrawer');
  const overlay = document.getElementById('mobileDrawerOverlay');
  const closeBtn = document.getElementById('closeMobileDrawer');
  
  function openDrawer() {
    drawer?.classList.add('active');
    overlay?.classList.add('active');
  }
  
  function closeDrawer() {
    drawer?.classList.remove('active');
    overlay?.classList.remove('active');
  }
  
  if (toggleBtn) toggleBtn.addEventListener('click', openDrawer);
  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
  if (overlay) overlay.addEventListener('click', closeDrawer);
  
  document.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', closeDrawer);
  });
}

/* ========================================================
   11. SCROLL EFFECTS & NAVBAR
   ======================================================== */
function initScrollEffects() {
  const header = document.querySelector('.site-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  });
}

/* ========================================================
   12. TOAST NOTIFICATIONS
   ======================================================== */
function showToast(message) {
  let toast = document.getElementById('toastNotice');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toastNotice';
    toast.className = 'toast-notice';
    document.body.appendChild(toast);
  }
  
  toast.innerHTML = `<span><i class="fa-solid fa-circle-check" style="color:#22c55e; margin-right:6px;"></i> ${message}</span>`;
  toast.classList.add('show');
  
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3500);
}

  
  // ========================================================
  // DYNAMIC DATASTORE SYNC & RENDERING (Full Admin Management)
  // ========================================================

  function renderDynamicDataStoreContent(optionalLang) {
    if (typeof DyfiDataStore === 'undefined') return;

    const currentLang = optionalLang || localStorage.getItem('dyfi_lang') || 'kn';
    const isKn = currentLang === 'kn';

    // 1. Ticker headlines
    try {
      const tickerData = DyfiDataStore.get(DYFI_DATA_KEYS.TICKER) || [];
      const tickerTextEl = document.querySelector('.ticker-text');
      if (tickerTextEl && tickerData.length > 0) {
        const activeItems = tickerData.filter(t => t.active !== false);
        const itemsToUse = activeItems.length > 0 ? activeItems : tickerData;
        tickerTextEl.innerText = itemsToUse.map(t => isKn ? (t.text_kn || t.text_en) : (t.text_en || t.text_kn)).join('   ✦   ');
      }
    } catch (e) {
      console.warn('Ticker sync error:', e);
    }

    // 2. Site Content & Hero
    try {
      const sc = DyfiDataStore.get(DYFI_DATA_KEYS.SITE_CONTENT);
      if (sc) {
        const heroTitleEl = document.querySelector('.hero-title');
        if (heroTitleEl) {
          heroTitleEl.innerHTML = isKn ? sc.heroTitle_kn : sc.heroTitle_en;
        }

        const heroSubEl = document.querySelector('.hero-description');
        if (heroSubEl) {
          heroSubEl.innerText = isKn ? sc.heroSub_kn : sc.heroSub_en;
        }

        const quoteMainEl = document.querySelector('.quote-main-text');
        if (quoteMainEl) {
          quoteMainEl.innerText = isKn ? sc.quoteText_kn : sc.quoteText_en;
        }

        const quoteAuthorEl = document.querySelector('.quote-author-name');
        if (quoteAuthorEl && sc.quoteAuthor) {
          quoteAuthorEl.innerText = sc.quoteAuthor;
        }

        const officeValEl = document.querySelector('[data-i18n="officeVal"]');
        if (officeValEl) {
          officeValEl.innerText = isKn ? sc.officeAddress_kn : sc.officeAddress_en;
        }

        const phoneValEl = document.querySelector('[data-i18n="phoneVal"]');
        if (phoneValEl) {
          phoneValEl.innerText = `${sc.phone1} / ${sc.phone2}`;
        }

        const emailValEl = document.querySelector('[data-i18n="emailVal"]');
        if (emailValEl) {
          emailValEl.innerText = sc.email;
        }

        // Update footer contact values
        const footerContactItems = document.querySelectorAll('.footer-contact-item span:last-child');
        if (footerContactItems.length >= 3) {
          footerContactItems[0].innerText = isKn ? sc.officeAddress_kn : sc.officeAddress_en;
          footerContactItems[1].innerText = `${sc.phone1} / ${sc.phone2}`;
          footerContactItems[2].innerText = ` ${sc.email}`;
        }

        // Update Video Showcase Banner dynamically
        const vTitle = document.getElementById('videoBannerTitle');
        const vSub = document.getElementById('videoBannerSub');
        const vThumb = document.getElementById('videoBannerThumb');
        const vPlayBtn = document.getElementById('btnPlayMainVideo');

        if (vTitle && (sc.videoTitle_en || sc.videoTitle_kn)) {
          vTitle.innerText = isKn ? (sc.videoTitle_kn || sc.videoTitle_en) : (sc.videoTitle_en || sc.videoTitle_kn);
        }
        if (vSub && (sc.videoSub_en || sc.videoSub_kn)) {
          vSub.innerText = isKn ? (sc.videoSub_kn || sc.videoSub_en) : (sc.videoSub_en || sc.videoSub_kn);
        }
        if (vThumb && sc.videoThumb) {
          vThumb.src = sc.videoThumb;
        }
        if (vPlayBtn && sc.videoUrl) {
          vPlayBtn.onclick = () => {
            window.open(sc.videoUrl, '_blank');
          };
        }
      }
    } catch (e) {
      console.warn('Site content sync error:', e);
    }

    // 2b. Render Recent Activities (Admin Dynamic)
    try {
      const actGrid = document.getElementById('activitiesGridContainer');
      if (actGrid) {
        const activities = DyfiDataStore.get(DYFI_DATA_KEYS.ACTIVITIES) || [];
        if (activities.length > 0) {
          actGrid.innerHTML = activities.map((a, idx) => `
            <article class="campaign-card" onclick="openContentDetails('activity', '${a.id || idx}')" style="cursor: pointer;">
              <div class="card-img-wrap" onclick="openContentDetails('activity', '${a.id || idx}'); event.stopPropagation();" title="${isKn ? 'ಪೂರ್ಣ ವಿವರ ವೀಕ್ಷಿಸಲು ಕ್ಲಿಕ್ ಮಾಡಿ' : 'Click to view full details'}">
                <img src="${a.image || (idx === 0 ? 'images/hero-banner-2.jpg' : idx === 1 ? 'images/hero-banner-3.jpg' : 'images/gallery-1.jpg')}" alt="${a.title_en}" loading="lazy" onerror="this.onerror=null; this.src='images/hero-banner-2.jpg';">
                <div class="card-badges">
                  <span class="badge-date">${a.date || '2026-08-01'}</span>
                  <span class="badge-status activity">${a.badge || 'Activity'}</span>
                </div>
                <span class="card-img-zoom-hint"><i class="fa-solid fa-magnifying-glass"></i> ${isKn ? 'ಪೂರ್ಣ ವೀಕ್ಷಿಸಿ' : 'View Full'}</span>
              </div>
              <div class="card-body">
                <h3 class="card-title">${isKn ? (a.title_kn || a.title_en) : (a.title_en || a.title_kn)}</h3>
                <p class="card-desc">${isKn ? (a.desc_kn || a.desc_en) : (a.desc_en || a.desc_kn)}</p>
                <a href="javascript:void(0)" class="card-link" onclick="openContentDetails('activity', '${a.id || idx}'); event.stopPropagation();">${isKn ? 'ಪೂರ್ಣ ವಿವರ ವೀಕ್ಷಿಸಿ <i class="fa-solid fa-arrow-right"></i>' : 'View Details <i class="fa-solid fa-arrow-right"></i>'}</a>
              </div>
            </article>
          `).join('');
        }
      }
    } catch (e) {
      console.warn('Activities sync error:', e);
    }

    // 3. Render Campaigns (Admin Dynamic)
    try {
      const campaignsGrid = document.querySelector('.campaigns-grid');
      if (campaignsGrid) {
        const campaigns = DyfiDataStore.get(DYFI_DATA_KEYS.CAMPAIGNS) || [];
        if (campaigns.length > 0) {
          campaignsGrid.innerHTML = campaigns.map((c, idx) => `
            <article class="campaign-card" onclick="openContentDetails('campaign', '${c.id || idx}')" style="cursor: pointer;">
              <div class="card-img-wrap" onclick="openContentDetails('campaign', '${c.id || idx}'); event.stopPropagation();" title="${isKn ? 'ಪೂರ್ಣ ವಿವರ ವೀಕ್ಷಿಸಲು ಕ್ಲಿಕ್ ಮಾಡಿ' : 'Click to view full details'}">
                <img src="${c.image || (idx === 0 ? 'images/hero-banner-1.jpg' : idx === 1 ? 'images/hero-banner-2.jpg' : 'images/hero-banner-3.jpg')}" alt="${c.title_en}" loading="lazy" onerror="this.onerror=null; this.src='images/hero-banner-1.jpg';">
                <div class="card-badges">
                  <span class="badge-date">${c.date || '2026-10-15'}</span>
                  <span class="badge-status">${c.status || 'Active'}</span>
                </div>
                <span class="card-img-zoom-hint"><i class="fa-solid fa-magnifying-glass"></i> ${isKn ? 'ಪೂರ್ಣ ವೀಕ್ಷಿಸಿ' : 'View Full'}</span>
              </div>
              <div class="card-body">
                <h3 class="card-title">${isKn ? (c.title_kn || c.title_en) : (c.title_en || c.title_kn)}</h3>
                <p class="card-desc">${isKn ? (c.desc_kn || c.desc_en) : (c.desc_en || c.desc_kn)}</p>
                <a href="javascript:void(0)" class="card-link" onclick="openContentDetails('campaign', '${c.id || idx}'); event.stopPropagation();">${isKn ? 'ಪೂರ್ಣ ವಿವರ ವೀಕ್ಷಿಸಿ <i class="fa-solid fa-arrow-right"></i>' : 'Read Full Details <i class="fa-solid fa-arrow-right"></i>'}</a>
              </div>
            </article>
          `).join('');
        }
      }
    } catch (e) {
      console.warn('Campaigns sync error:', e);
    }

    // 4. Render News & Updates (Admin Dynamic)
    try {
      const newsGrid = document.querySelector('.news-grid');
      if (newsGrid) {
        const newsList = DyfiDataStore.get(DYFI_DATA_KEYS.NEWS) || [];
        if (newsList.length > 0) {
          newsGrid.innerHTML = newsList.map((n, idx) => `
            <article class="news-card" onclick="openContentDetails('news', '${n.id || idx}')" style="cursor: pointer;">
              <div class="news-img-wrap" onclick="openContentDetails('news', '${n.id || idx}'); event.stopPropagation();" title="${isKn ? 'ಪೂರ್ಣ ಸುದ್ದಿ ವೀಕ್ಷಿಸಲು ಕ್ಲಿಕ್ ಮಾಡಿ' : 'Click to view full news'}">
                <img src="${n.image || (idx === 0 ? 'images/hero-banner-1.jpg' : idx === 1 ? 'images/hero-banner-2.jpg' : 'images/hero-banner-3.jpg')}" alt="${n.title_en}" loading="lazy" onerror="this.onerror=null; this.src='images/hero-banner-2.jpg';">
                <span class="card-img-zoom-hint"><i class="fa-solid fa-magnifying-glass"></i> ${isKn ? 'ಪೂರ್ಣ ವೀಕ್ಷಿಸಿ' : 'View Full'}</span>
              </div>
              <div class="news-body">
                <div class="news-meta">
                  <span><i class="fa-solid fa-calendar-days"></i> ${n.date || '2026-10-15'}</span>
                  <span><i class="fa-solid fa-tag"></i> ${n.category || 'News'}</span>
                </div>
                <h3 class="news-title">${isKn ? (n.title_kn || n.title_en) : (n.title_en || n.title_kn)}</h3>
                <p class="news-excerpt">${isKn ? (n.desc_kn || n.desc_en) : (n.desc_en || n.desc_kn)}</p>
                <a href="javascript:void(0)" class="btn-read-article" onclick="openContentDetails('news', '${n.id || idx}'); event.stopPropagation();">${isKn ? 'ಪೂರ್ಣ ವಿವರ ಓದಿ <i class="fa-solid fa-arrow-right"></i>' : 'Read Full Story <i class="fa-solid fa-arrow-right"></i>'}</a>
              </div>
            </article>
          `).join('');
        }
      }
    } catch (e) {
      console.warn('News sync error:', e);
    }

    // 5. Render Statements (Admin Dynamic)
    try {
      const stContainer = document.getElementById('statementsContainer');
      if (stContainer) {
        const statements = DyfiDataStore.get(DYFI_DATA_KEYS.STATEMENTS) || [];
        if (statements.length > 0) {
          stContainer.innerHTML = statements.map((st, idx) => `
            <article class="statement-card" onclick="openContentDetails('statement', '${st.id || idx}')" style="cursor: pointer;">
              <div class="statement-meta-row">
                <span class="statement-badge">${st.category}</span>
                <span class="statement-date">${st.date}</span>
              </div>
              <div class="statement-ref">${st.refNo || 'DYFI-KAR-ST'}</div>
              <h3 class="statement-title">${isKn ? st.title_kn : st.title_en}</h3>
              <div style="display: flex; gap: 0.8rem; align-items: center; margin-top: auto; flex-wrap: wrap;">
                <a href="javascript:void(0)" class="statement-view-link" onclick="openContentDetails('statement', '${st.id || idx}'); event.stopPropagation();" style="color: var(--primary); font-weight: 700; font-size: 0.85rem;">
                  <i class="fa-solid fa-magnifying-glass"></i> ${isKn ? 'ಪೂರ್ಣ ಹೇಳಿಕೆ ಓದಿ' : 'Read Statement'}
                </a>
                <a href="${st.fileUrl || '#'}" class="statement-download-btn" onclick="alert('${isKn ? 'ಅಧಿಕೃತ ಹೇಳಿಕೆ PDF ಡೌನ್‌ಲೋಡ್ ಆಗುತ್ತಿದೆ...' : 'Downloading Official Statement PDF...'}'); event.stopPropagation();">
                  <span>${isKn ? 'PDF ಡೌನ್‌ಲೋಡ್' : 'Download PDF'}</span> <i class="fa-solid fa-download"></i>
                </a>
              </div>
            </article>
          `).join('');
        }
      }
    } catch (e) {
      console.warn('Statements sync error:', e);
    }

    // 6. Render Martyrs (Admin Dynamic)
    try {
      const martyrsContainer = document.getElementById('martyrsContainer');
      if (martyrsContainer) {
        const martyrs = DyfiDataStore.get(DYFI_DATA_KEYS.MARTYRS) || [];
        if (martyrs.length > 0) {
          martyrsContainer.innerHTML = martyrs.map((m, idx) => {
            const avatarHtml = m.photo
              ? `<img src="${m.photo}" alt="${m.name_en}" loading="lazy" onerror="this.outerHTML='<div class=\\'martyr-avatar-wrap placeholder-avatar\\' style=\\'display:flex; align-items:center; justify-content:center; background:#1e293b; color:#94a3b8; font-size:2.5rem; border:3px solid #dc2626;\\'><i class=\\'fa-solid fa-user\\'></i></div>';">`
              : `<div class="martyr-avatar-wrap placeholder-avatar" style="display:flex; align-items:center; justify-content:center; background:#1e293b; color:#94a3b8; font-size:2.5rem; border:3px solid #dc2626;"><i class="fa-solid fa-user"></i></div>`;

            return `
              <div class="martyr-card" onclick="openContentDetails('martyr', '${m.id || idx}')" style="cursor: pointer;">
                <div class="martyr-avatar-wrap">
                  ${avatarHtml}
                  <span class="officer-zoom-hint"><i class="fa-solid fa-magnifying-glass"></i></span>
                </div>
                <h3 class="martyr-name">${isKn ? m.name_kn : m.name_en}</h3>
                <span class="martyr-badge-date">${m.date}</span>
                <div class="martyr-district"><i class="fa-solid fa-flag" style="color:var(--primary,#dc2626); margin-right:4px;"></i> ${m.district}</div>
                <p class="martyr-tribute">"${isKn ? m.tribute_kn : m.tribute_en}"</p>
              </div>
            `;
          }).join('');
        }
      }
    } catch (e) {
      console.warn('Martyrs sync error:', e);
    }

    // 7. Render Leaders (Admin Dynamic — National & State Grid Support)
    try {
      const nationalGrid = document.getElementById('nationalLeadersGrid');
      const stateGrid = document.getElementById('stateLeadersGrid');
      const generalLeaderGrid = document.querySelector('.leadership-grid');
      const leaders = DyfiDataStore.get(DYFI_DATA_KEYS.LEADERS) || [];

      function renderLeaderCard(l, idx) {
        const isBlankName = !l.name_kn && !l.name_en;
        const displayName = isKn ? (l.name_kn || l.name_en) : (l.name_en || l.name_kn);
        const displayRole = isKn ? (l.role_kn || l.role_en) : (l.role_en || l.role_kn);
        const avatarHtml = l.photo
          ? `<img src="${l.photo}" alt="${displayName || 'Leader'}" loading="lazy" onerror="this.outerHTML='<div class=\\'leader-avatar-wrap placeholder-avatar\\' style=\\'display:flex; align-items:center; justify-content:center; background:#1e293b; color:#94a3b8; font-size:2.4rem; border:3px solid #dc2626;\\'><i class=\\'fa-solid fa-user\\'></i></div>';">`
          : `<div class="leader-avatar-wrap placeholder-avatar" style="display:flex; align-items:center; justify-content:center; background:#1e293b; color:#94a3b8; font-size:2.4rem; border:3px solid #dc2626;"><i class="fa-solid fa-user"></i></div>`;

        return `
          <div class="leader-card" onclick="openContentDetails('leader', '${l.id || idx}')" style="cursor: pointer;">
            <div class="leader-avatar-wrap">
              ${avatarHtml}
              <span class="officer-zoom-hint"><i class="fa-solid fa-magnifying-glass"></i></span>
            </div>
            <h3 class="leader-name" style="${isBlankName ? 'color:#94a3b8; font-style:italic;' : ''}">
              ${displayName || (isKn ? '(ಖಾಲಿ / To be assigned)' : '(To be assigned)')}
            </h3>
            <div class="leader-role">${displayRole}</div>
            <div class="leader-region">${l.region || 'DYFI'}</div>
          </div>
        `;
      }

      if (nationalGrid || stateGrid) {
        const nationalLeaders = leaders.filter(l => l.tier === 'national' || (l.id && l.id.startsWith('nl')));
        const stateLeaders = leaders.filter(l => l.tier !== 'national' && (!l.id || !l.id.startsWith('nl')));

        if (nationalGrid && nationalLeaders.length > 0) {
          nationalGrid.innerHTML = nationalLeaders.map(renderLeaderCard).join('');
        }
        if (stateGrid && stateLeaders.length > 0) {
          stateGrid.innerHTML = stateLeaders.map(renderLeaderCard).join('');
        }
      } else if (generalLeaderGrid && leaders.length > 0) {
        generalLeaderGrid.innerHTML = leaders.map(renderLeaderCard).join('');
      }
    } catch (e) {
      console.warn('Leaders sync error:', e);
    }

    // 8. Render Gallery (Admin Dynamic)
    try {
      const galleryGrid = document.querySelector('.gallery-grid');
      if (galleryGrid) {
        const galleryItems = DyfiDataStore.get(DYFI_DATA_KEYS.GALLERY) || [];
        if (galleryItems.length > 0) {
          galleryGrid.innerHTML = galleryItems.map(g => `
            <div class="gallery-item" data-category="${g.category || 'protests'}" onclick="openLightboxImage('${g.src || 'images/hero-banner-1.jpg'}', '${isKn ? (g.caption_kn || g.caption_en || '') : (g.caption_en || g.caption_kn || '')}')" style="cursor: pointer;">
              <img src="${g.src || 'images/hero-banner-1.jpg'}" alt="${g.caption_en || 'SFI Dakshina Kannada'}" loading="lazy" onerror="this.onerror=null; this.src='images/hero-banner-1.jpg';">
              <div class="gallery-overlay">
                <p class="gallery-caption">${isKn ? (g.caption_kn || g.caption_en) : (g.caption_en || g.caption_kn)}</p>
                <span class="gallery-zoom-badge"><i class="fa-solid fa-magnifying-glass"></i> ${isKn ? 'ದೊಡ್ಡದಾಗಿ ನೋಡಿ' : 'View High Res'}</span>
              </div>
            </div>
          `).join('');
        }
      }
    } catch (e) {
      console.warn('Gallery sync error:', e);
    }

    // 9. Render Districts & Taluks (Admin Dynamic)
    try {
      renderDistrictCards();
    } catch (e) {
      console.warn('District cards sync error:', e);
    }
  }

  // Cross-tab real-time storage event listener
  window.addEventListener('storage', (e) => {
    if (e.key && e.key.startsWith('dyfi_kar_')) {
      renderDynamicDataStoreContent();
    }
  });

  // Modern BroadcastChannel real-time sync across tabs
  if (typeof BroadcastChannel !== 'undefined') {
    try {
      const liveSyncChannel = new BroadcastChannel('dyfi_live_sync_bus');
      liveSyncChannel.onmessage = (e) => {
        if (e && e.data && e.data.key) {
          renderDynamicDataStoreContent();
        }
      };
    } catch (err) {
      console.debug('BroadcastChannel registration:', err);
    }
  }

  // Local event listener when updated within same tab
  window.addEventListener('dyfi_data_updated', () => {
    renderDynamicDataStoreContent();
  });

  // Discrete administrator shortcut: Ctrl + Shift + A to open Admin Suite
  // Secret double click on footer copyright to open admin
  const footerRightsEl = document.querySelector('[data-i18n="footerRights"]');
  if (footerRightsEl) {
    footerRightsEl.style.cursor = 'default';
    footerRightsEl.addEventListener('dblclick', () => {
      window.open('admin.html', '_blank');
    });
  }

  window.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
      e.preventDefault();
      window.open('admin.html', '_blank');
    }
  });


  // 6. Emergency Blood Donor Search
  function initBloodDonorSearch() {
    const btnFind = document.getElementById('btnFindDonors');
    const resList = document.getElementById('bloodResultsList');
    if (!btnFind || !resList) return;

    function doSearch() {
      const grp = document.getElementById('quickSearchGroup').value;
      const dist = document.getElementById('quickSearchDistrict').value;
      const donors = (typeof DyfiDataStore !== 'undefined') ? DyfiDataStore.get(DYFI_DATA_KEYS.BLOOD_DONORS) || [] : [];

      const filtered = donors.filter(d => {
        const mG = !grp || d.group === grp;
        const mD = !dist || d.district === dist;
        return mG && mD;
      });

      if (filtered.length === 0) {
        resList.innerHTML = '<div style="grid-column: 1/-1; padding:1rem; text-align:center; color:#94a3b8; font-weight:600;">ಯಾವುದೇ ದಾನಿಗಳು ಕಂಡುಬಂದಿಲ್ಲ. ತುರ್ತು ಸಹಾಯವಾಣಿಗೆ ಕರೆ ಮಾಡಿ: +91 9449225636 / +91 9481261229</div>';
      } else {
        resList.innerHTML = filtered.map(d => `
          <div class="donor-result-card">
            <div>
              <strong style="color:var(--text-heading); font-size:0.95rem;">${d.name}</strong><br>
              <small style="color:#64748b;">${d.district} • ${d.date || 'Active'}</small>
            </div>
            <div style="display:flex; align-items:center; gap:0.6rem;">
              <span class="donor-badge-group">${d.group}</span>
              <a href="tel:${d.phone}" class="btn-primary" style="padding:0.4rem 0.8rem; font-size:0.8rem; text-decoration:none;"><i class="fa-solid fa-phone"></i> ಕರೆ</a>
            </div>
          </div>
        `).join('');
      }
    }

    btnFind.addEventListener('click', (e) => {
      e.preventDefault();
      doSearch();
    });

    // Initial search show
    doSearch();
  }

  // 7. Join The Revolution Modal & Form
  function initJoinModal() {
    const modal = document.getElementById('joinModal');
    const closeBtn = document.getElementById('closeJoinModal');
    const openItem = document.getElementById('navJoinRevItem');
    const quoteBtn = document.querySelector('[data-i18n="btnMovement"]');
    const heroJoinBtn = document.querySelector('.hero-actions .btn-primary');

    function openJoin() {
      if (modal) modal.classList.add('active');
    }
    function closeJoin() {
      if (modal) modal.classList.remove('active');
    }

    if (openItem) openItem.addEventListener('click', (e) => { e.preventDefault(); openJoin(); });
    if (quoteBtn) quoteBtn.addEventListener('click', (e) => { e.preventDefault(); openJoin(); });
    if (heroJoinBtn) heroJoinBtn.addEventListener('click', (e) => { e.preventDefault(); openJoin(); });
    if (closeBtn) closeBtn.addEventListener('click', closeJoin);
    if (modal) {
      modal.addEventListener('click', (e) => { if (e.target === modal) closeJoin(); });
    }

    const form = document.getElementById('joinRevolutionForm');
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('joinName').value.trim();
        const phone = document.getElementById('joinPhone').value.trim();
        const dist = document.getElementById('joinDistrict').value;
        const interest = document.getElementById('joinInterest').value;

        // Auto save to DyfiDataStore messages/volunteers
        if (typeof DyfiDataStore !== 'undefined') {
          const msgs = DyfiDataStore.get(DYFI_DATA_KEYS.MESSAGES) || [];
          msgs.unshift({
            id: 'vol_' + Date.now(),
            name,
            phone,
            district: dist,
            message: `[NEW MEMBERSHIP] Area of Interest: ${interest}`,
            date: new Date().toISOString().split('T')[0],
            status: 'Unread'
          });
          DyfiDataStore.set(DYFI_DATA_KEYS.MESSAGES, msgs);
        }

        alert('ಕ್ರಾಂತಿಕಾರಿ ಧನ್ಯವಾದಗಳು ಒಡನಾಡಿ! ನಿಮ್ಮ ಸದಸ್ಯತ್ವ ನೋಂದಣಿ ಯಶಸ್ವಿಯಾಗಿದೆ. ಸ್ಥಳೀಯ ಘಟಕದಿಂದ ಶೀಘ್ರದಲ್ಲೇ ಸಂಪರ್ಕಿಸಲಾಗುವುದು.');
        form.reset();
        closeJoin();
      });
    }
  }

  // 8. Video Player Modal
  function initVideoPlayer() {
    const playBtn = document.getElementById('btnPlayMainVideo');
    if (playBtn) {
      playBtn.addEventListener('click', () => {
        const lightbox = document.getElementById('lightboxModal');
        const imgWrap = lightbox ? lightbox.querySelector('.lightbox-img-wrap') : null;
        if (lightbox && imgWrap) {
          imgWrap.innerHTML = `<iframe width="100%" height="450" src="https://www.youtube.com/embed/fA71Q8b6528?autoplay=1" title="DYFI Convention" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen style="border-radius:12px; border:none;"></iframe>`;
          lightbox.classList.add('active');
        }
      });
    }
  }

  // Hook into Blood Donor form submission to persist in DyfiDataStore
  const originalDonorForm = document.getElementById('bloodDonorForm');
  if (originalDonorForm) {
    originalDonorForm.addEventListener('submit', (e) => {
      const name = document.getElementById('donorName').value.trim();
      const phone = document.getElementById('donorPhone').value.trim();
      const group = document.getElementById('donorGroup').value;
      const district = document.getElementById('donorDistrict').value;

      if (typeof DyfiDataStore !== 'undefined') {
        const list = DyfiDataStore.get(DYFI_DATA_KEYS.BLOOD_DONORS) || [];
        list.unshift({
          id: 'bd_' + Date.now(),
          name,
          phone,
          group,
          district,
          date: new Date().toISOString().split('T')[0]
        });
        DyfiDataStore.set(DYFI_DATA_KEYS.BLOOD_DONORS, list);
      }
    });
  }

  // Note: Contact Form submission and DyfiDataStore sync are handled cleanly in initContactForm()

  // Initial call on load
  setTimeout(() => {
    renderDynamicDataStoreContent();
    initBloodDonorSearch();
    initJoinModal();
    initVideoPlayer();
    initUniversalImageClicks();
  }, 50);

  /* ========================================================
     10. UNIVERSAL FULL CONTENT DETAILS MODAL
     ======================================================== */
  window.openContentDetails = function(type, id) {
    const modal = document.getElementById('contentDetailsModal');
    if (!modal) return;
    const isKn = currentLang === 'kn';

    let item = null;
    let categoryBadge = isKn ? '<i class="fa-solid fa-flag" style="color:var(--primary,#dc2626); margin-right:4px;"></i> ಎಸ್.ಎಫ್.ಐ ದಕ್ಷಿಣ ಕನ್ನಡ' : '<i class="fa-solid fa-flag" style="color:var(--primary,#dc2626); margin-right:4px;"></i> SFI Dakshina Kannada';
    let title = '';
    let date = '';
    let extra = '';
    let img = 'images/hero-banner-1.jpg';
    let fullText = '';
    let primaryActionText = isKn ? 'ಹೋರಾಟದಲ್ಲಿ ಕೈಜೋಡಿಸಿ <i class="fa-solid fa-arrow-right"></i>' : 'Join The Movement <i class="fa-solid fa-arrow-right"></i>';
    let primaryActionFn = () => {
      modal.classList.remove('active');
      const joinModal = document.getElementById('joinModal');
      if (joinModal) joinModal.classList.add('active');
    };

    if (type === 'activity') {
      const list = (typeof DyfiDataStore !== 'undefined') ? DyfiDataStore.get(DYFI_DATA_KEYS.ACTIVITIES) || [] : [];
      item = list.find(a => a.id === id || String(a.id) === String(id)) || list[id] || list[0];
      if (item) {
        categoryBadge = isKn ? '<i class="fa-solid fa-person-walking" style="color:var(--primary,#dc2626); margin-right:4px;"></i> ಇತ್ತೀಚಿನ ಚಟುವಟಿಕೆ (Recent Activity)' : '<i class="fa-solid fa-person-walking" style="color:var(--primary,#dc2626); margin-right:4px;"></i> Recent DYFI Activity';
        title = isKn ? (item.title_kn || item.title_en) : (item.title_en || item.title_kn);
        date = item.date || '2026-08-01';
        extra = item.badge ? `• ${item.badge}` : '';
        img = item.image || 'images/hero-banner-2.jpg';
        fullText = isKn 
          ? (item.full_kn || `${item.desc_kn}\n\nಕರ್ನಾಟಕ ರಾಜ್ಯದಾದ್ಯಂತ ಎಸ್.ಎಫ್.ಐ ನಡೆಸುತ್ತಿರುವ ನಿರಂತರ ಯುವಜನ ಜಾಗೃತಿ ಹಾಗೂ ಸಾಮಾಜಿಕ ಚಟುವಟಿಕೆಗಳು.`)
          : (item.full_en || `${item.desc_en}\n\nComprehensive coverage of DYFI grassroots organizing, public initiatives, and community service in Karnataka.`);
        primaryActionText = isKn ? 'ಸ್ಥಳೀಯ ಘಟಕ ಸಂಪರ್ಕಿಸಿ <i class="fa-solid fa-arrow-right"></i>' : 'Contact Local Unit <i class="fa-solid fa-arrow-right"></i>';
        primaryActionFn = () => {
          modal.classList.remove('active');
          const contactSec = document.getElementById('contact');
          if (contactSec) contactSec.scrollIntoView({ behavior: 'smooth' });
        };
      }
    } else if (type === 'campaign') {
      const list = (typeof DyfiDataStore !== 'undefined') ? DyfiDataStore.get(DYFI_DATA_KEYS.CAMPAIGNS) || [] : [];
      item = list.find(c => c.id === id || String(c.id) === String(id)) || list[id] || list[0];
      if (item) {
        categoryBadge = isKn ? '<i class="fa-solid fa-flag" style="color:var(--primary,#dc2626); margin-right:4px;"></i> ಪ್ರಮುಖ ಅಭಿಯಾನ (State Campaign)' : '<i class="fa-solid fa-flag" style="color:var(--primary,#dc2626); margin-right:4px;"></i> Major State Campaign';
        title = isKn ? (item.title_kn || item.title_en) : (item.title_en || item.title_kn);
        date = item.date || '2026-10-15';
        extra = item.status ? `• Status: ${item.status}` : '';
        img = item.image || 'images/hero-banner-1.jpg';
        fullText = isKn 
          ? (item.full_kn || `${item.desc_kn}\n\nರಾಜ್ಯದ 31 ಜಿಲ್ಲೆಗಳಲ್ಲಿ ನಿರುದ್ಯೋಗ, ಶಿಕ್ಷಣದ ಖಾಸಗೀಕರಣ ಮತ್ತು ಕೋಮುವಾದದ ವಿರುದ್ಧ ಎಸ್.ಎಫ್.ಐ ಮುನ್ನಡೆಸುತ್ತಿರುವ ಬೃಹತ್ ಅಭಿಯಾನ. ಕಾಲೇಜು ಕ್ಯಾಂಪಸ್‌ಗಳು, ಕೈಗಾರಿಕಾ ವಲಯಗಳು ಹಾಗೂ ಹಳ್ಳಿ ಹಳ್ಳಿಗಳಲ್ಲಿ ಯುವ ಜಾಗೃತಿ ಸಭೆಗಳು, ಪಾದಯಾತ್ರೆಗಳು ಮತ್ತು ಬೀದಿ ನಾಟಕಗಳ ಮೂಲಕ ಲಕ್ಷಾಂತರ ಯುವಜನರನ್ನು ಒಗ್ಗೂಡಿಸಲಾಗುತ್ತಿದೆ.`)
          : (item.full_en || `${item.desc_en}\n\nMass campaign mobilized across 31 districts of Karnataka fighting for employment, secularism, and affordable public education.`);
        primaryActionText = isKn ? 'ಈ ಅಭಿಯಾನದಲ್ಲಿ ಭಾಗವಹಿಸಿ <i class="fa-solid fa-arrow-right"></i>' : 'Participate in Campaign <i class="fa-solid fa-arrow-right"></i>';
      }
    } else if (type === 'news') {
      const list = (typeof DyfiDataStore !== 'undefined') ? DyfiDataStore.get(DYFI_DATA_KEYS.NEWS) || [] : [];
      item = list.find(n => n.id === id || String(n.id) === String(id)) || list[id] || list[0];
      if (item) {
        categoryBadge = isKn ? '<i class="fa-solid fa-newspaper" style="color:#2563eb; margin-right:4px;"></i> ತಾಜಾ ಸುದ್ದಿ & ವರದಿ (Latest News)' : '<i class="fa-solid fa-newspaper" style="color:#2563eb; margin-right:4px;"></i> Latest News & Updates';
        title = isKn ? (item.title_kn || item.title_en) : (item.title_en || item.title_kn);
        date = item.date || '2026-10-14';
        extra = item.category ? `• ${item.category}` : '';
        img = item.image || 'images/hero-banner-2.jpg';
        fullText = isKn 
          ? (item.full_kn || `${item.desc_kn}\n\nರಾಜ್ಯ ಸರ್ಕಾರದ ಗಮನ ಸೆಳೆಯಲು ಎಸ್.ಎಫ್.ಐ ಜಿಲ್ಲಾ ಸಮಿತಿಗಳು ನಡೆಸಿದ ತೀವ್ರ ಹೋರಾಟದ ವರದಿ. ನಿರುದ್ಯೋಗಿ ಯುವಜನರಿಗೆ ಮಾಸಿಕ ಭತ್ಯೆ, ಖಾಲಿ ಇರುವ 2.5 ಲಕ್ಷ ಸರ್ಕಾರಿ ಹುದ್ದೆಗಳ ತಕ್ಷಣ ಭರ್ತಿ ಮತ್ತು ಪಾರದರ್ಶಕ ಪರೀಕ್ಷಾ ವ್ಯವಸ್ಥೆಗೆ ಒತ್ತಾಯಿಸಿ ರಾಜ್ಯಾದ್ಯಂತ ಮನವಿ ಸಲ್ಲಿಸಲಾಗಿದೆ.`)
          : (item.full_en || `${item.desc_en}\n\nComprehensive coverage of DYFI activities, protest rallies, and youth conventions across Karnataka.`);
        primaryActionText = isKn ? 'ಸ್ಥಳೀಯ ಘಟಕ ಸಂಪರ್ಕಿಸಿ <i class="fa-solid fa-arrow-right"></i>' : 'Contact Local Unit <i class="fa-solid fa-arrow-right"></i>';
        primaryActionFn = () => {
          modal.classList.remove('active');
          const contactSec = document.getElementById('contact');
          if (contactSec) contactSec.scrollIntoView({ behavior: 'smooth' });
        };
      }
    } else if (type === 'statement') {
      const list = (typeof DyfiDataStore !== 'undefined') ? DyfiDataStore.get(DYFI_DATA_KEYS.STATEMENTS) || [] : [];
      item = list.find(s => s.id === id || String(s.id) === String(id)) || list[id] || list[0];
      if (item) {
        categoryBadge = isKn ? '<i class="fa-solid fa-scroll" style="color:#d97706; margin-right:4px;"></i> ಅಧಿಕೃತ ಪತ್ರಿಕಾ ಹೇಳಿಕೆ (Official Statement)' : '<i class="fa-solid fa-scroll" style="color:#d97706; margin-right:4px;"></i> Official Press Release';
        title = isKn ? (item.title_kn || item.title_en) : (item.title_en || item.title_kn);
        date = item.date || '2026-10-11';
        extra = item.refNo ? `• Ref: ${item.refNo}` : '';
        img = 'images/hero-banner-3.jpg';
        fullText = isKn
          ? (item.full_kn || `ಭಾರತ ಪ್ರಜಾಸತ್ತಾತ್ಮಕ ಯುವಜನ ಫೆಡರೇಶನ್ (DYFI) ಕರ್ನಾಟಕ ರಾಜ್ಯ ಸಮಿತಿಯು ಅಧಿಕೃತವಾಗಿ ಹೊರಡಿಸಿರುವ ಪತ್ರಿಕಾ ಪ್ರಕಟಣೆ.\n\n${title}\n\nರಾಜ್ಯದ ಯುವಜನರ ಸಾಂವಿಧಾನಿಕ ಹಕ್ಕುಗಳ ರಕ್ಷಣೆ, ಪರೀಕ್ಷಾ ಅಕ್ರಮಗಳ ವಿರುದ್ಧ ಕಠಿಣ ಕಾನೂನು ಜಾರಿ ಮತ್ತು ಶಿಕ್ಷಣದ ವಾಣಿಜ್ಯೀಕರಣ ತಡೆಗಾಗಿ ಎಸ್.ಎಫ್.ಐ ನಿರಂತರವಾಗಿ ದನಿ ಎತ್ತುತ್ತಿದ್ದು, ಸಂಬಂಧಪಟ್ಟ ಇಲಾಖೆಗಳು ತಕ್ಷಣವೇ ಕ್ರಮ ವಹಿಸಬೇಕೆಂದು ಆಗ್ರಹಿಸಲಾಗಿದೆ.\n\nಈ ಅಧಿಕೃತ ಹೇಳಿಕೆಯ ಸಂಪೂರ್ಣ ಪ್ರತಿಯನ್ನು ಕೆಳಗಿನ ಬಟನ್ ಕ್ಲಿಕ್ ಮಾಡುವ ಮೂಲಕ PDF ರೂಪದಲ್ಲಿ ಡೌನ್‌ಲೋಡ್ ಮಾಡಿಕೊಳ್ಳಬಹುದು.`)
          : (item.full_en || `Official press statement released by SFI Dakshina Kannada State Committee regarding:\n\n${title}\n\nStanding firmly for democratic youth rights, transparency, and social justice across Karnataka.`);
        primaryActionText = isKn ? 'ಹೇಳಿಕೆ PDF ಡೌನ್‌ಲೋಡ್ <i class="fa-solid fa-download"></i>' : 'Download Statement PDF <i class="fa-solid fa-download"></i>';
        primaryActionFn = () => {
          alert(isKn ? 'ಅಧಿಕೃತ ಹೇಳಿಕೆ PDF ಡೌನ್‌ಲೋಡ್ ಆಗುತ್ತಿದೆ...' : 'Downloading Official Statement PDF...');
        };
      }
    } else if (type === 'martyr') {
      const list = (typeof DyfiDataStore !== 'undefined') ? DyfiDataStore.get(DYFI_DATA_KEYS.MARTYRS) || [] : [];
      item = list.find(m => m.id === id || String(m.id) === String(id)) || list[id] || list[0];
      if (item) {
        categoryBadge = isKn ? '<i class="fa-solid fa-star" style="color:#eab308; margin-right:4px;"></i> ಅಮರ ಹುತಾತ್ಮರು (Immortal Martyrs)' : '<i class="fa-solid fa-star" style="color:#eab308; margin-right:4px;"></i> Immortal Martyrs of Struggle';
        title = isKn ? (item.name_kn || item.name_en) : (item.name_en || item.name_kn);
        date = item.date || '1992';
        extra = item.district ? `• ಜಿಲ್ಲೆ: ${item.district}` : '';
        img = item.photo || 'images/shivappa.jpg';
        fullText = isKn
          ? `"${item.tribute_kn || item.tribute_en}"\n\nಯುವಜನರ ಶಿಕ್ಷಣ, ಉದ್ಯೋಗ, ಸಮಾನತೆ ಹಾಗೂ ಕೋಮು ಸೌಹಾರ್ದತೆಯ ರಕ್ಷಣೆಗಾಗಿ ಹೋರಾಡಿ ಹುತಾತ್ಮರಾದ ಧೀರ ಒಡನಾಡಿ. ಅವರ ತ್ಯಾಗ ಮತ್ತು ಬಲಿದಾನ ನಮ್ಮ ಪ್ರತಿಯೊಂದು ಹೋರಾಟಕ್ಕೂ ಸದಾ ದಾರಿದೀಪ.\n\nಅಮರ ಹುತಾತ್ಮರಿಗೆ ಕ್ರಾಂತಿಕಾರಿ ಕೆಂಪು ನಮನಗಳು!`
          : `"${item.tribute_en || item.tribute_kn}"\n\nImmortal martyr who laid down his life fighting for communal harmony, employment rights, and student welfare in Karnataka. Revolutionary homage to his ultimate sacrifice.`;
        primaryActionText = isKn ? 'ಕ್ರಾಂತಿಕಾರಿ ನಮನಗಳು <i class="fa-solid fa-hand-fist"></i>' : 'Revolutionary Tribute <i class="fa-solid fa-hand-fist"></i>';
        primaryActionFn = () => {
          alert(isKn ? 'ಅಮರ ಹುತಾತ್ಮರ ತ್ಯಾಗಕ್ಕೆ ಕ್ರಾಂತಿಕಾರಿ ನಮನಗಳು!' : 'Revolutionary homage to our immortal martyrs!');
        };
      }
    } else if (type === 'leader') {
      const list = (typeof DyfiDataStore !== 'undefined') ? DyfiDataStore.get(DYFI_DATA_KEYS.LEADERS) || [] : [];
      item = list.find(l => l.id === id || String(l.id) === String(id)) || list[id] || list[0];
      if (item) {
        const isNational = item.tier === 'national' || (item.id && String(item.id).startsWith('nl'));
        categoryBadge = isNational
          ? (isKn ? '<i class="fa-solid fa-flag" style="color:var(--primary,#dc2626); margin-right:4px;"></i> ಅಖಿಲ ಭಾರತ ನಾಯಕತ್ವ (All India Leadership)' : '<i class="fa-solid fa-flag" style="color:var(--primary,#dc2626); margin-right:4px;"></i> All India Leadership')
          : (isKn ? '<i class="fa-solid fa-flag" style="color:var(--primary,#dc2626); margin-right:4px;"></i> ರಾಜ್ಯ ನಾಯಕತ್ವ (State Leadership)' : '<i class="fa-solid fa-flag" style="color:var(--primary,#dc2626); margin-right:4px;"></i> State Leadership');
        title = isKn ? (item.name_kn || item.name_en) : (item.name_en || item.name_kn);
        date = isKn ? (item.role_kn || item.role_en) : (item.role_en || item.role_kn);
        extra = item.region ? `• ${item.region}` : '';
        img = item.photo || 'images/logo.jpg';
        fullText = isKn
          ? `${title} — ${date}\n\n${item.region || (isNational ? 'ಎಸ್.ಎಫ್.ಐ ಅಖಿಲ ಭಾರತ ಕೇಂದ್ರ' : 'ಕರ್ನಾಟಕ ರಾಜ್ಯ ಸಮಿತಿ')} ಮುಂಚೂಣಿಯಲ್ಲಿ ನಿಂತು ಯುವಜನ ಚಳವಳಿ, ಉದ್ಯೋಗ ಹಕ್ಕು ಹೋರಾಟ, ಸಮಾನತೆ ಹಾಗೂ ಸಾಮಾಜಿಕ ನ್ಯಾಯವನ್ನು ಎತ್ತಿಹಿಡಿಯುತ್ತಿರುವ ನಾಯಕರು.`
          : `${title} — ${date}\n\nLeading the vanguard of progressive youth struggles, employment rights, and secular campaigns across ${item.region || (isNational ? 'DYFI All India Centre' : 'Karnataka State Committee')}.`;
        primaryActionText = isKn ? 'ಸಂಪರ್ಕಿಸಿ <i class="fa-solid fa-arrow-right"></i>' : 'Get in Touch <i class="fa-solid fa-arrow-right"></i>';
        primaryActionFn = () => {
          modal.classList.remove('active');
          const contactSec = document.getElementById('contact');
          if (contactSec) {
            contactSec.scrollIntoView({ behavior: 'smooth' });
          } else {
            window.location.href = 'index.html#contact';
          }
        };
      }
    }

    // Populate Content Modal Elements
    const headerBadge = document.getElementById('contentModalCategoryBadge');
    if (headerBadge) headerBadge.innerHTML = categoryBadge;

    const modalImg = document.getElementById('contentModalImg');
    if (modalImg) {
      modalImg.src = img;
      modalImg.onclick = () => openLightboxImage(img, title);
      modalImg.title = isKn ? 'ಚಿತ್ರವನ್ನು ದೊಡ್ಡದಾಗಿ ವೀಕ್ಷಿಸಲು ಕ್ಲಿಕ್ ಮಾಡಿ' : 'Click to enlarge photo';
    }

    const modalDate = document.getElementById('contentModalDate');
    if (modalDate) modalDate.innerHTML = `<i class="fa-solid fa-calendar-days"></i> ${date}`;

    const modalExtra = document.getElementById('contentModalExtra');
    if (modalExtra) modalExtra.innerHTML = extra;

    const modalTitle = document.getElementById('contentModalTitle');
    if (modalTitle) modalTitle.innerHTML = title;

    const modalDesc = document.getElementById('contentModalDesc');
    if (modalDesc) modalDesc.innerHTML = `<p>${fullText.replace(/\n\n/g, '</p><p>').replace(/\n/g, '<br>')}</p>`;

    const primaryBtn = document.getElementById('contentModalPrimaryBtn');
    if (primaryBtn) {
      primaryBtn.innerHTML = primaryActionText;
      primaryBtn.onclick = primaryActionFn;
    }

    const closeBtn = document.getElementById('contentModalCloseBtn');
    if (closeBtn) {
      closeBtn.innerHTML = `<i class="fa-solid fa-xmark"></i> ${isKn ? 'ಮುಚ್ಚಿ / Close' : 'Close'}`;
      closeBtn.onclick = () => modal.classList.remove('active');
    }

    modal.classList.add('active');
  };

  /* ========================================================
     11. LIGHTBOX IMAGE VIEWER
     ======================================================== */
  window.openLightboxImage = function(src, caption) {
    const lightbox = document.getElementById('lightboxModal');
    const lightboxImg = document.getElementById('lightboxImage');
    const lightboxCaption = document.getElementById('lightboxCaption');
    if (!lightbox || !lightboxImg) return;

    lightboxImg.src = src;
    if (lightboxCaption) {
      lightboxCaption.textContent = caption || 'SFI Dakshina Kannada';
    }
    lightbox.classList.add('active');
  };

  /* ========================================================
     12. UNIVERSAL IMAGE & MODAL CLOSING LOGIC
     ======================================================== */
  function initUniversalImageClicks() {
    // 1. Modal close button listeners
    const closeContentBtn = document.getElementById('closeContentModal');
    const contentModal = document.getElementById('contentDetailsModal');
    if (closeContentBtn && contentModal) {
      closeContentBtn.onclick = () => contentModal.classList.remove('active');
    }

    const closeLightboxBtn = document.getElementById('lightboxClose');
    const lightboxModal = document.getElementById('lightboxModal');
    if (closeLightboxBtn && lightboxModal) {
      closeLightboxBtn.onclick = () => lightboxModal.classList.remove('active');
    }

    // 2. Close on ESC key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        document.querySelectorAll('.modal-overlay.active, .lightbox-overlay.active').forEach(m => {
          m.classList.remove('active');
        });
      }
    });

    // 3. Delegate universal image clicks
    document.addEventListener('click', (e) => {
      const target = e.target;
      if (target.tagName === 'IMG') {
        // Skip logo and current lightbox enlarged image
        if (target.classList.contains('brand-logo-img') || target.id === 'lightboxImage' || target.closest('.mobile-drawer-header')) {
          return;
        }

        // Inside contentDetailsModal: enlarge to lightbox
        if (target.id === 'contentModalImg') {
          openLightboxImage(target.src, document.getElementById('contentModalTitle')?.textContent || '');
          return;
        }

        // In gallery: open in lightbox
        if (target.closest('.gallery-item')) {
          const item = target.closest('.gallery-item');
          const cap = item.querySelector('.gallery-caption')?.textContent || 'SFI Dakshina Kannada Gallery';
          openLightboxImage(target.src, cap);
          return;
        }

        // In Campaign card: open full campaign details
        const campCard = target.closest('.campaign-card');
        if (campCard) {
          const title = campCard.querySelector('.card-title')?.innerText || '';
          const list = (typeof DyfiDataStore !== 'undefined') ? DyfiDataStore.get(DYFI_DATA_KEYS.CAMPAIGNS) || [] : [];
          const match = list.find(c => (c.title_kn && c.title_kn.includes(title)) || (c.title_en && c.title_en.includes(title)));
          openContentDetails('campaign', match ? match.id : 0);
          return;
        }

        // In News card: open full news details
        const newsCard = target.closest('.news-card');
        if (newsCard) {
          const title = newsCard.querySelector('.news-title')?.innerText || '';
          const list = (typeof DyfiDataStore !== 'undefined') ? DyfiDataStore.get(DYFI_DATA_KEYS.NEWS) || [] : [];
          const match = list.find(n => (n.title_kn && n.title_kn.includes(title)) || (n.title_en && n.title_en.includes(title)));
          openContentDetails('news', match ? match.id : 0);
          return;
        }

        // In Leader card: open full leader details
        const leaderCard = target.closest('.leader-card');
        if (leaderCard) {
          const name = leaderCard.querySelector('.leader-name')?.innerText || '';
          const list = (typeof DyfiDataStore !== 'undefined') ? DyfiDataStore.get(DYFI_DATA_KEYS.LEADERS) || [] : [];
          const match = list.find(l => (l.name_kn && l.name_kn.includes(name)) || (l.name_en && l.name_en.includes(name)));
          openContentDetails('leader', match ? match.id : 0);
          return;
        }

        // In Martyr card: open full martyr tribute
        const martyrCard = target.closest('.martyr-card');
        if (martyrCard) {
          const name = martyrCard.querySelector('.martyr-name')?.innerText || '';
          const list = (typeof DyfiDataStore !== 'undefined') ? DyfiDataStore.get(DYFI_DATA_KEYS.MARTYRS) || [] : [];
          const match = list.find(m => (m.name_kn && m.name_kn.includes(name)) || (m.name_en && m.name_en.includes(name)));
          openContentDetails('martyr', match ? match.id : 0);
          return;
        }

        // Default: open in lightbox with zoom
        openLightboxImage(target.src, target.alt || 'SFI Dakshina Kannada');
      }
    });
  }

  /* ========================================================
     13. LEGAL POLICIES & TERMS MODAL LOGIC
     ======================================================== */
  window.openLegalModal = function(tab) {
    const modal = document.getElementById('legalModal');
    if (!modal) {
      if (tab === 'terms') {
        window.location.href = 'terms-conditions.html';
      } else {
        window.location.href = 'privacy-policy.html';
      }
      return;
    }
    window.switchLegalTab(tab || 'privacy');
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  window.closeLegalModal = function() {
    const modal = document.getElementById('legalModal');
    if (modal) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }
  };

  window.switchLegalTab = function(tab) {
    const isKn = (typeof currentLang !== 'undefined' ? currentLang : localStorage.getItem('dyfi_lang')) === 'kn';
    const tabPrivacyBtn = document.getElementById('legalTabPrivacyBtn');
    const tabTermsBtn = document.getElementById('legalTabTermsBtn');
    const privacyContent = document.getElementById('legalPrivacyContent');
    const termsContent = document.getElementById('legalTermsContent');
    const legalModalTitle = document.getElementById('legalModalMainTitle');
    const fullPageLink = document.getElementById('legalModalFullPageLink');

    if (tab === 'terms') {
      if (tabPrivacyBtn) tabPrivacyBtn.classList.remove('active');
      if (tabTermsBtn) tabTermsBtn.classList.add('active');
      if (privacyContent) privacyContent.style.display = 'none';
      if (termsContent) termsContent.style.display = 'block';
      if (legalModalTitle) {
        legalModalTitle.innerHTML = isKn 
          ? '<i class="fa-solid fa-scale-balanced" style="color:var(--primary); margin-right:8px;"></i> ನಿಯಮಗಳು ಮತ್ತು ಷರತ್ತುಗಳು (Terms & Conditions)'
          : '<i class="fa-solid fa-scale-balanced" style="color:var(--primary); margin-right:8px;"></i> Terms & Conditions';
      }
      if (fullPageLink) {
        fullPageLink.href = 'terms-conditions.html';
        fullPageLink.innerHTML = isKn 
          ? '<span>ಪೂರ್ಣ ಪುಟದಲ್ಲಿ ಓದಿ</span> <i class="fa-solid fa-arrow-up-right-from-square"></i>' 
          : '<span>Open Full Page</span> <i class="fa-solid fa-arrow-up-right-from-square"></i>';
      }
    } else {
      if (tabPrivacyBtn) tabPrivacyBtn.classList.add('active');
      if (tabTermsBtn) tabTermsBtn.classList.remove('active');
      if (privacyContent) privacyContent.style.display = 'block';
      if (termsContent) termsContent.style.display = 'none';
      if (legalModalTitle) {
        legalModalTitle.innerHTML = isKn 
          ? '<i class="fa-solid fa-shield-halved" style="color:var(--primary); margin-right:8px;"></i> ಗೌಪ್ಯತಾ ನೀತಿ (Privacy Policy)'
          : '<i class="fa-solid fa-shield-halved" style="color:var(--primary); margin-right:8px;"></i> Privacy Policy';
      }
      if (fullPageLink) {
        fullPageLink.href = 'privacy-policy.html';
        fullPageLink.innerHTML = isKn 
          ? '<span>ಪೂರ್ಣ ಪುಟದಲ್ಲಿ ಓದಿ</span> <i class="fa-solid fa-arrow-up-right-from-square"></i>' 
          : '<span>Open Full Page</span> <i class="fa-solid fa-arrow-up-right-from-square"></i>';
      }
    }

    const modalBody = document.querySelector('.legal-modal-body');
    if (modalBody) modalBody.scrollTop = 0;
  };

  function initLegalModals() {
    const closeBtn = document.getElementById('closeLegalModal');
    const modal = document.getElementById('legalModal');
    if (closeBtn && modal) {
      closeBtn.addEventListener('click', window.closeLegalModal);
    }
    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          window.closeLegalModal();
        }
      });
    }
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        window.closeLegalModal();
      }
    });
  }

