const fs = require('fs');
const path = require('path');

const indexPath = path.join(__dirname, '..', 'index.html');
let html = fs.readFileSync(indexPath, 'utf8');

const newLeadershipSection = `  <!-- ========================================================
       LEADERSHIP SHOWCASE (NATIONAL, STATE & DISTRICT LEADERS)
       ======================================================== -->
  <section class="leadership-section" id="leadership">
    <div class="container">
      <div class="leadership-header-row">
        <span class="leadership-top-tag">LEADERSHIP OF THE MOVEMENT</span>
        <h2 class="leadership-main-title"><span class="highlight-red">ಮುಖಂಡರು</span> (Leadership)</h2>
      </div>

      <!-- ============ TIER 1: ALL INDIA / NATIONAL LEADERS ============ -->
      <div class="leadership-category-block" style="margin-bottom: 3.5rem;">
        <div class="leadership-subtitle-wrap">
          <span class="leadership-sub-badge">ALL INDIA</span>
          <h3 class="leadership-tier-title"><i class="fa-solid fa-flag" style="color:#dc2626;"></i> ಅಖಿಲ ಭಾರತ / ರಾಷ್ಟ್ರೀಯ ನಾಯಕತ್ವ</h3>
        </div>
        <div class="simple-leaders-grid two-col" id="nationalLeadersGrid">

          <!-- National Leader 1: Comrade A. A. Rahim -->
          <div class="leader-simple-card">
            <div class="leader-avatar-ring red-ring">
              <img src="images/leaders/rahim.jpg" alt="ಕಾ. ಎ. ಎ. ರಹೀಮ್" loading="lazy"
                onerror="this.src='https://ui-avatars.com/api/?name=A+A+Rahim&background=dc2626&color=fff&size=200'">
            </div>
            <h3 class="leader-card-name">ಕಾ. ಎ. ಎ. ರಹೀಮ್</h3>
            <div class="leader-card-role">ಅಖಿಲ ಭಾರತ ಅಧ್ಯಕ್ಷರು (ರಾಷ್ಟ್ರೀಯ ಅಧ್ಯಕ್ಷರು)</div>
            <div class="leader-card-region">All India Centre</div>
          </div>

          <!-- National Leader 2: Comrade Himagnoraj Bhattacharya -->
          <div class="leader-simple-card">
            <div class="leader-avatar-ring red-ring">
              <img src="images/leaders/himagnoraj.jpg" alt="ಕಾಮ್ರೇಡ್ ಹಿಮಾಘ್ನರಾಜ್ ಭಟ್ಟಾಚಾರ್ಯ" loading="lazy"
                onerror="this.src='https://ui-avatars.com/api/?name=Himagnoraj+B&background=dc2626&color=fff&size=200'">
            </div>
            <h3 class="leader-card-name">ಕಾಮ್ರೇಡ್ ಹಿಮಾಘ್ನರಾಜ್ ಭಟ್ಟಾಚಾರ್ಯ</h3>
            <div class="leader-card-role">ಅಖಿಲ ಭಾರತ ಪ್ರಧಾನ ಕಾರ್ಯದರ್ಶಿ</div>
            <div class="leader-card-region">All India Centre</div>
          </div>

        </div>
      </div>

      <!-- ============ TIER 2: KARNATAKA STATE LEADERS ============ -->
      <div class="leadership-category-block" style="margin-bottom: 3.5rem;">
        <div class="leadership-subtitle-wrap">
          <span class="leadership-sub-badge">KARNATAKA</span>
          <h3 class="leadership-tier-title"><i class="fa-solid fa-flag" style="color:#dc2626;"></i> ಕರ್ನಾಟಕ ರಾಜ್ಯ ನಾಯಕತ್ವ</h3>
        </div>
        <div class="simple-leaders-grid three-col" id="stateLeadersGrid">

          <!-- State Leader 1: Comrade Lavitra Vastrad -->
          <div class="leader-simple-card">
            <div class="leader-avatar-ring red-ring">
              <img src="images/leaders/lavitra_president.jpg" alt="ಕಾಮ್ರೇಡ್ ಲವಿತ್ರ ವಸ್ತ್ರದ" loading="lazy"
                onerror="this.src='https://ui-avatars.com/api/?name=Lavitra+V&background=dc2626&color=fff&size=200'">
            </div>
            <h3 class="leader-card-name">ಕಾಮ್ರೇಡ್ ಲವಿತ್ರ ವಸ್ತ್ರದ</h3>
            <div class="leader-card-role">ರಾಜ್ಯ ಅಧ್ಯಕ್ಷರು</div>
            <div class="leader-card-region">Karnataka State Committee</div>
          </div>

          <!-- State Leader 2: Comrade Santosh Bajal -->
          <div class="leader-simple-card">
            <div class="leader-avatar-ring red-ring">
              <img src="images/leaders/santosh_bajal.jpg" alt="ಕಾಮ್ರೇಡ್ ಸಂತೋಷ್ ಬಜಾಲ್" loading="lazy"
                onerror="this.src='https://ui-avatars.com/api/?name=Santosh+B&background=dc2626&color=fff&size=200'">
            </div>
            <h3 class="leader-card-name">ಕಾಮ್ರೇಡ್ ಸಂತೋಷ್ ಬಜಾಲ್</h3>
            <div class="leader-card-role">ರಾಜ್ಯ ಪ್ರಧಾನ ಕಾರ್ಯದರ್ಶಿ</div>
            <div class="leader-card-region">Karnataka State Committee</div>
          </div>

          <!-- State Leader 3: Comrade Dilip Bangalore -->
          <div class="leader-simple-card">
            <div class="leader-avatar-ring red-ring">
              <img src="images/leaders/dilep.jpg" alt="ಕಾಮ್ರೇಡ್ ದಿಲೀಪ್ (ಬೆಂಗಳೂರು)" loading="lazy"
                onerror="this.src='https://ui-avatars.com/api/?name=Dilip+B&background=dc2626&color=fff&size=200'">
            </div>
            <h3 class="leader-card-name">ಕಾಮ್ರೇಡ್ ದಿಲೀಪ್ (ಬೆಂಗಳೂರು)</h3>
            <div class="leader-card-role">ರಾಜ್ಯ ಖಜಾಂಚಿ</div>
            <div class="leader-card-region">Karnataka State Committee</div>
          </div>

        </div>
      </div>

      <!-- ============ TIER 3: DISTRICT LEADERS (DAKSHINA KANNADA) ============ -->
      <div class="leadership-category-block">
        <div class="leadership-subtitle-wrap">
          <span class="leadership-sub-badge">DAKSHINA KANNADA</span>
          <h3 class="leadership-tier-title"><i class="fa-solid fa-flag" style="color:#dc2626;"></i> ದಕ್ಷಿಣ ಕನ್ನಡ ಜಿಲ್ಲಾ ನಾಯಕತ್ವ</h3>
        </div>
        <div class="simple-leaders-grid five-col" id="districtLeadersGrid">

          <!-- District Leader 1: Hazlan (President) -->
          <div class="leader-simple-card">
            <div class="leader-avatar-ring red-ring">
              <img src="images/hazlan.jpg" alt="ಕಾಮ್ರೇಡ್ Hazlan" loading="lazy"
                onerror="this.src='https://res.cloudinary.com/avytjxre/image/upload/v1788021809/hazlan.jpg'">
            </div>
            <h3 class="leader-card-name">ಕಾಮ್ರೇಡ್ Hazlan</h3>
            <div class="leader-card-role">ಜಿಲ್ಲಾಧ್ಯಕ್ಷರು</div>
            <div class="leader-card-region">SFI Dakshina Kannada</div>
          </div>

          <!-- District Leader 2: Vinayak S I (Secretary) -->
          <div class="leader-simple-card">
            <div class="leader-avatar-ring red-ring">
              <img src="images/vinayak.jpg" alt="ಕಾಮ್ರೇಡ್ Vinayak S I" loading="lazy"
                onerror="this.src='https://res.cloudinary.com/avytjxre/image/upload/v1788021848/photo.jpg'">
            </div>
            <h3 class="leader-card-name">ಕಾಮ್ರೇಡ್ Vinayak S I</h3>
            <div class="leader-card-role">ಜಿಲ್ಲಾ ಕಾರ್ಯದರ್ಶಿ</div>
            <div class="leader-card-region">SFI Dakshina Kannada</div>
          </div>

          <!-- District Leader 3: Shivappa (Vice President) -->
          <div class="leader-simple-card">
            <div class="leader-avatar-ring red-ring">
              <img src="images/shivappa.jpg" alt="ಕಾಮ್ರೇಡ್ Shivappa" loading="lazy"
                onerror="this.src='https://res.cloudinary.com/avytjxre/image/upload/v1788021817/shivappa.jpg'">
            </div>
            <h3 class="leader-card-name">ಕಾಮ್ರೇಡ್ Shivappa</h3>
            <div class="leader-card-role">ಜಿಲ್ಲಾ ಉಪಾಧ್ಯಕ್ಷರು</div>
            <div class="leader-card-region">SFI Dakshina Kannada</div>
          </div>

          <!-- District Leader 4: Vijay (Joint Secretary) -->
          <div class="leader-simple-card">
            <div class="leader-avatar-ring red-ring">
              <img src="images/vijay.png" alt="ಕಾಮ್ರೇಡ್ Vijay" loading="lazy"
                onerror="this.src='https://res.cloudinary.com/avytjxre/image/upload/v1788021819/vijay.png'">
            </div>
            <h3 class="leader-card-name">ಕಾಮ್ರೇಡ್ Vijay</h3>
            <div class="leader-card-role">ಜಿಲ್ಲಾ ಜೊತೆ ಕಾರ್ಯದರ್ಶಿ</div>
            <div class="leader-card-region">SFI Dakshina Kannada</div>
          </div>

          <!-- District Leader 5: Adarsh M Saji (Joint Secretary) -->
          <div class="leader-simple-card">
            <div class="leader-avatar-ring red-ring">
              <img src="images/adarsh.avif" alt="ಕಾಮ್ರೇಡ್ Adarsh M Saji" loading="lazy"
                onerror="this.src='https://res.cloudinary.com/avytjxre/image/upload/v1788021809/Adarsh-m-saji-sfi.avif'">
            </div>
            <h3 class="leader-card-name">ಕಾಮ್ರೇಡ್ Adarsh M Saji</h3>
            <div class="leader-card-role">ಜಿಲ್ಲಾ ಜೊತೆ ಕಾರ್ಯದರ್ಶಿ</div>
            <div class="leader-card-region">SFI Dakshina Kannada</div>
          </div>

        </div>
      </div>

    </div>
  </section>`;

// Replace leadership section
const startKey = 'LEADERSHIP SHOWCASE';
let sectionStart = html.indexOf(startKey);
if (sectionStart === -1) {
  console.error('ERROR: Could not find LEADERSHIP SHOWCASE');
  process.exit(1);
}

let commentStart = html.lastIndexOf('<!--', sectionStart);
let lineStart = html.lastIndexOf('\n', commentStart) + 1;

let committeeStart = html.indexOf('COMMITTEES & UNITS');
if (committeeStart === -1) {
  console.error('ERROR: Could not find COMMITTEES & UNITS section');
  process.exit(1);
}
let committeeCommentStart = html.lastIndexOf('<!--', committeeStart);
let sectionEnd = html.lastIndexOf('\n', committeeCommentStart) + 1;

console.log('Replacing leadership section (chars ' + lineStart + ' to ' + sectionEnd + ')...');
html = html.substring(0, lineStart) + newLeadershipSection + '\n\n  ' + html.substring(sectionEnd);

fs.writeFileSync(indexPath, html, 'utf8');
console.log('SUCCESS: Leadership section updated to match screenshot exactly!');
