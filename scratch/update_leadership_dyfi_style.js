const fs = require('fs');
const path = require('path');

const indexPath = path.join(__dirname, '..', 'index.html');
let html = fs.readFileSync(indexPath, 'utf8');

// New leadership section matching DYFI Karnataka reference style
const newLeadershipSection = `  <!-- ========================================================
       LEADERSHIP SHOWCASE (SFI NATIONAL, STATE & DISTRICT)
       ======================================================== -->
  <section class="leadership-section" id="leadership">
    <div class="container">
      <div class="section-header-row" style="text-align: center; margin-bottom: 2.5rem;">
        <span class="section-tag" style="display: inline-block;">LEADERSHIP OF THE MOVEMENT</span>
        <h2 class="section-title" data-i18n="leaderSectionTitle">ಮುಖಂಡರು <span class="highlight-red">(Leadership)</span></h2>
      </div>

      <!-- ============ TIER 1: ALL INDIA / NATIONAL LEADERS ============ -->
      <div class="leadership-category-block" style="margin-bottom: 3rem;">
        <div class="leadership-subtitle-wrap">
          <span class="leadership-sub-badge" style="background: linear-gradient(135deg, #b91c1c, #dc2626);">ALL INDIA</span>
          <h3 class="leadership-tier-title"><i class="fa-solid fa-flag" style="color:#dc2626;"></i> ಅಖಿಲ ಭಾರತ / ರಾಷ್ಟ್ರೀಯ ನಾಯಕತ್ವ</h3>
        </div>
        <div class="leadership-grid simple-leaders-grid" id="nationalLeadersGrid">

          <!-- National Leader 1: V.P. Sanu -->
          <div class="leader-simple-card">
            <div class="leader-avatar-ring red-ring">
              <img src="images/leaders/vp_sanu.jpg" alt="ಕಾ. V.P. Sanu" loading="lazy"
                onerror="this.src='https://ui-avatars.com/api/?name=VP+Sanu&background=dc2626&color=fff&size=200'">
            </div>
            <h3 class="leader-card-name">ಕಾ. V.P. Sanu</h3>
            <div class="leader-card-role">ಅಖಿಲ ಭಾರತ ಅಧ್ಯಕ್ಷರು (ರಾಷ್ಟ್ರೀಯ ಅಧ್ಯಕ್ಷರು)</div>
            <div class="leader-card-region">SFI All India Centre</div>
          </div>

          <!-- National Leader 2: Mayukh Biswas -->
          <div class="leader-simple-card">
            <div class="leader-avatar-ring red-ring">
              <img src="images/leaders/mayukh_biswas.jpg" alt="ಕಾಮ್ರೇಡ್ Mayukh Biswas" loading="lazy"
                onerror="this.src='https://ui-avatars.com/api/?name=Mayukh+Biswas&background=dc2626&color=fff&size=200'">
            </div>
            <h3 class="leader-card-name">ಕಾಮ್ರೇಡ್ Mayukh Biswas</h3>
            <div class="leader-card-role">ಅಖಿಲ ಭಾರತ ಪ್ರಧಾನ ಕಾರ್ಯದರ್ಶಿ</div>
            <div class="leader-card-region">SFI All India Centre</div>
          </div>

        </div>
      </div>

      <!-- ============ TIER 2: KARNATAKA STATE LEADERS ============ -->
      <div class="leadership-category-block" style="margin-bottom: 3rem;">
        <div class="leadership-subtitle-wrap">
          <span class="leadership-sub-badge" style="background: linear-gradient(135deg, #b91c1c, #dc2626);">KARNATAKA</span>
          <h3 class="leadership-tier-title"><i class="fa-solid fa-flag" style="color:#dc2626;"></i> ಕರ್ನಾಟಕ ರಾಜ್ಯ ನಾಯಕತ್ವ</h3>
        </div>
        <div class="leadership-grid simple-leaders-grid three-col" id="stateLeadersGrid">

          <!-- State Leader 1: State President -->
          <div class="leader-simple-card">
            <div class="leader-avatar-ring red-ring">
              <img src="images/leaders/state_president.jpg" alt="ಕಾಮ್ರೇಡ್ Muneer Katipalla" loading="lazy"
                onerror="this.src='https://ui-avatars.com/api/?name=Muneer+K&background=dc2626&color=fff&size=200'">
            </div>
            <h3 class="leader-card-name">ಕಾಮ್ರೇಡ್ Muneer Katipalla</h3>
            <div class="leader-card-role">ರಾಜ್ಯ ಅಧ್ಯಕ್ಷರು</div>
            <div class="leader-card-region">Karnataka State Committee</div>
          </div>

          <!-- State Leader 2: State Secretary -->
          <div class="leader-simple-card">
            <div class="leader-avatar-ring red-ring">
              <img src="images/leaders/state_secretary.jpg" alt="ಕಾಮ್ರೇಡ್ Vasanth Acharya" loading="lazy"
                onerror="this.src='https://ui-avatars.com/api/?name=Vasanth+A&background=dc2626&color=fff&size=200'">
            </div>
            <h3 class="leader-card-name">ಕಾಮ್ರೇಡ್ Vasanth Acharya</h3>
            <div class="leader-card-role">ರಾಜ್ಯ ಪ್ರಧಾನ ಕಾರ್ಯದರ್ಶಿ</div>
            <div class="leader-card-region">Karnataka State Committee</div>
          </div>

          <!-- State Leader 3: State Treasurer -->
          <div class="leader-simple-card">
            <div class="leader-avatar-ring red-ring">
              <img src="images/leaders/state_treasurer.jpg" alt="ಕಾಮ್ರೇಡ್ State Treasurer" loading="lazy"
                onerror="this.src='https://ui-avatars.com/api/?name=State+Leader&background=dc2626&color=fff&size=200'">
            </div>
            <h3 class="leader-card-name">ಕಾಮ್ರೇಡ್ State Leader</h3>
            <div class="leader-card-role">ರಾಜ್ಯ ಬೊಕ್ಕಸದಾರ</div>
            <div class="leader-card-region">Karnataka State Committee</div>
          </div>

        </div>
      </div>

      <!-- ============ TIER 3: DISTRICT LEADERS (DAKSHINA KANNADA) ============ -->
      <div class="leadership-category-block">
        <div class="leadership-subtitle-wrap">
          <span class="leadership-sub-badge" style="background: linear-gradient(135deg, #b91c1c, #dc2626);">DAKSHINA KANNADA</span>
          <h3 class="leadership-tier-title"><i class="fa-solid fa-flag" style="color:#dc2626;"></i> ದಕ್ಷಿಣ ಕನ್ನಡ ಜಿಲ್ಲಾ ನಾಯಕತ್ವ</h3>
        </div>
        <div class="leadership-grid simple-leaders-grid five-col" id="districtLeadersGrid">

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

// Find and replace leadership section
const startKey = 'LEADERSHIP SHOWCASE';
let sectionStart = html.indexOf(startKey);
if (sectionStart === -1) {
  console.error('ERROR: Could not find LEADERSHIP SHOWCASE');
  process.exit(1);
}

let commentStart = html.lastIndexOf('<!--', sectionStart);
let lineStart = html.lastIndexOf('\n', commentStart) + 1;

// Find end: before COMMITTEES & UNITS
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
console.log('SUCCESS: Leadership section updated with DYFI-style clean cards!');

