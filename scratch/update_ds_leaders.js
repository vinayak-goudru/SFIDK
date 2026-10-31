const fs = require('fs');
const path = require('path');

const dsPath = path.join(__dirname, '..', 'js', 'data-store.js');
let ds = fs.readFileSync(dsPath, 'utf8');

const updatedLeadersJson = `  "leaders": [
    {
      "id": "nl1",
      "name_en": "Comrade A. A. Rahim",
      "name_kn": "ಕಾ. ಎ. ಎ. ರಹೀಮ್",
      "role_en": "All India President (National President)",
      "role_kn": "ಅಖಿಲ ಭಾರತ ಅಧ್ಯಕ್ಷರು (ರಾಷ್ಟ್ರೀಯ ಅಧ್ಯಕ್ಷರು)",
      "tier": "national",
      "region": "All India Centre",
      "photo": "images/leaders/rahim.jpg"
    },
    {
      "id": "nl2",
      "name_en": "Comrade Himagnoraj Bhattacharya",
      "name_kn": "ಕಾಮ್ರೇಡ್ ಹಿಮಾಘ್ನರಾಜ್ ಭಟ್ಟಾಚಾರ್ಯ",
      "role_en": "All India General Secretary",
      "role_kn": "ಅಖಿಲ ಭಾರತ ಪ್ರಧಾನ ಕಾರ್ಯದರ್ಶಿ",
      "tier": "national",
      "region": "All India Centre",
      "photo": "images/leaders/himagnoraj.jpg"
    },
    {
      "id": "sl1",
      "name_en": "Comrade Lavitra Vastrad",
      "name_kn": "ಕಾಮ್ರೇಡ್ ಲವಿತ್ರ ವಸ್ತ್ರದ",
      "role_en": "State President",
      "role_kn": "ರಾಜ್ಯ ಅಧ್ಯಕ್ಷರು",
      "tier": "state",
      "region": "Karnataka State Committee",
      "photo": "images/leaders/lavitra_president.jpg"
    },
    {
      "id": "sl2",
      "name_en": "Comrade Santosh Bajal",
      "name_kn": "ಕಾಮ್ರೇಡ್ ಸಂತೋಷ್ ಬಜಾಲ್",
      "role_en": "State General Secretary",
      "role_kn": "ರಾಜ್ಯ ಪ್ರಧಾನ ಕಾರ್ಯದರ್ಶಿ",
      "tier": "state",
      "region": "Karnataka State Committee",
      "photo": "images/leaders/santosh_bajal.jpg"
    },
    {
      "id": "sl3",
      "name_en": "Comrade Dilip Bangalore",
      "name_kn": "ಕಾಮ್ರೇಡ್ ದಿಲೀಪ್ (ಬೆಂಗಳೂರು)",
      "role_en": "State Treasurer",
      "role_kn": "ರಾಜ್ಯ ಖಜಾಂಚಿ",
      "tier": "state",
      "region": "Karnataka State Committee",
      "photo": "images/leaders/dilep.jpg"
    },
    {
      "id": "dl1",
      "name_en": "Comrade Hazlan",
      "name_kn": "ಕಾಮ್ರೇಡ್ ಹಜ್ಲಾನ್",
      "role_en": "District President",
      "role_kn": "ಜಿಲ್ಲಾಧ್ಯಕ್ಷರು",
      "tier": "district",
      "region": "SFI Dakshina Kannada",
      "phone": "+91 9480112234",
      "photo": "images/hazlan.jpg"
    },
    {
      "id": "dl2",
      "name_en": "Comrade Vinayak S I",
      "name_kn": "ಕಾಮ್ರೇಡ್ ವಿನಾಯಕ ಎಸ್.ಐ",
      "role_en": "District Secretary",
      "role_kn": "ಜಿಲ್ಲಾ ಕಾರ್ಯದರ್ಶಿ",
      "tier": "district",
      "region": "SFI Dakshina Kannada",
      "phone": "+91 9480112233",
      "photo": "images/vinayak.jpg"
    },
    {
      "id": "dl3",
      "name_en": "Comrade Shivappa",
      "name_kn": "ಕಾಮ್ರೇಡ್ ಶಿವಪ್ಪ",
      "role_en": "District Vice President",
      "role_kn": "ಜಿಲ್ಲಾ ಉಪಾಧ್ಯಕ್ಷರು",
      "tier": "district",
      "region": "SFI Dakshina Kannada",
      "phone": "+91 9480112235",
      "photo": "images/shivappa.jpg"
    },
    {
      "id": "dl4",
      "name_en": "Comrade Vijay",
      "name_kn": "ಕಾಮ್ರೇಡ್ ವಿಜಯ್",
      "role_en": "District Joint Secretary",
      "role_kn": "ಜಿಲ್ಲಾ ಜೊತೆ ಕಾರ್ಯದರ್ಶಿ",
      "tier": "district",
      "region": "SFI Dakshina Kannada",
      "phone": "+91 9480112236",
      "photo": "images/vijay.png"
    },
    {
      "id": "dl5",
      "name_en": "Comrade Adarsh M Saji",
      "name_kn": "ಕಾಮ್ರೇಡ್ ಆದರ್ಶ್ ಎಂ. ಸಾಜಿ",
      "role_en": "District Joint Secretary",
      "role_kn": "ಜಿಲ್ಲಾ ಜೊತೆ ಕಾರ್ಯದರ್ಶಿ",
      "tier": "district",
      "region": "SFI Dakshina Kannada",
      "phone": "+91 9480112237",
      "photo": "images/adarsh.avif"
    }
  ],`;

// Replace "leaders": [ ... ] in DEFAULT_SFI_DATA
const leadersRegex = /"leaders":\s*\[[\s\S]*?\n\s*\],/;
if (leadersRegex.test(ds)) {
  ds = ds.replace(leadersRegex, updatedLeadersJson.trim());
  fs.writeFileSync(dsPath, ds, 'utf8');
  console.log('SUCCESS: data-store.js updated with all 10 leaders (National, State, District)!');
} else {
  console.error('ERROR: Could not find leaders array in data-store.js');
}
