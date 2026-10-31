const fs = require('fs');
const path = require('path');

const indexPath = path.join(__dirname, '..', 'index.html');
let html = fs.readFileSync(indexPath, 'utf8');

// The new leadership section with 3 tiers: National, State, District
const newLeadershipSection = `  <!-- ========================================================
       LEADERSHIP SHOWCASE (SFI NATIONAL, STATE & DISTRICT)
       ======================================================== -->
  <section class="leadership-section" id="leadership">
    <div class="container">
      <div class="section-header-row" style="text-align: center; margin-bottom: 2.5rem;">
        <span class="section-tag" style="display: inline-block;">SFI LEADERSHIP</span>
        <h2 class="section-title" data-i18n="leaderSectionTitle">ನಮ್ಮ <span class="highlight-red">ನಾಯಕತ್ವ</span> (Our Leadership)</h2>
        <p style="color: var(--text-muted); margin-top: 0.5rem;" data-i18n="leaderSectionDesc">ರಾಷ್ಟ್ರೀಯ, ರಾಜ್ಯ ಮತ್ತು ಜಿಲ್ಲಾ ಮಟ್ಟದ ನಾಯಕರು</p>
      </div>

      <!-- ============ TIER 1: NATIONAL LEADERS ============ -->
      <div class="leadership-category-block" style="margin-bottom: 3rem;">
        <div class="leadership-subtitle-wrap">
          <span class="leadership-sub-badge" style="background: linear-gradient(135deg, #b91c1c, #dc2626);">NATIONAL</span>
          <h3 class="leadership-tier-title"><i class="fa-solid fa-flag" style="color:#dc2626;"></i> ರಾಷ್ಟ್ರೀಯ ನಾಯಕರು (National Leaders)</h3>
        </div>
        <div class="leadership-grid state-leaders-grid" id="nationalLeadersGrid">

          <!-- National Leader 1: V.P. Sanu (All India President) -->
          <div class="leader-flip-card" tabindex="0" onclick="this.classList.toggle('is-flipped')" aria-label="Comrade V.P. Sanu details">
            <div class="leader-flip-inner">
              <div class="leader-flip-front leader-card">
                <div>
                  <div class="leader-avatar-wrap">
                    <img src="images/leaders/vp_sanu.jpg" alt="Comrade V.P. Sanu" loading="lazy"
                      onerror="this.src='https://ui-avatars.com/api/?name=VP+Sanu&background=dc2626&color=fff&size=200'">
                  </div>
                  <h3 class="leader-name">Comrade V.P. Sanu</h3>
                  <div class="leader-role">All India President (ಅಖಿಲ ಭಾರತ ಅಧ್ಯಕ್ಷರು)</div>
                  <div class="leader-region">SFI National</div>
                </div>
                <div class="flip-hint-badge"><i class="fa-solid fa-arrows-rotate"></i> <span>ತಿರುಗಿಸಿ ನೋಡಿ • Click to Flip</span></div>
              </div>
              <div class="leader-flip-back leader-card">
                <div class="flip-back-header">
                  <span class="flip-star"><i class="fa-solid fa-star"></i></span>
                  <h4 class="flip-back-title">Comrade V.P. Sanu</h4>
                  <span class="flip-back-role">ಅಖಿಲ ಭಾರತ ಅಧ್ಯಕ್ಷರು • All India President</span>
                </div>
                <div class="flip-back-body">
                  <p class="flip-back-desc">SFI ಅಖಿಲ ಭಾರತ ಅಧ್ಯಕ್ಷರಾಗಿ ದೇಶಾದ್ಯಂತ ವಿದ್ಯಾರ್ಥಿ ಚಳುವಳಿ ಮುನ್ನಡೆಸುತ್ತಿದ್ದಾರೆ. ಶಿಕ್ಷಣದ ಹಕ್ಕು ಮತ್ತು ಸಾಮಾಜಿಕ ನ್ಯಾಯಕ್ಕಾಗಿ ನಿರಂತರ ಹೋರಾಟ.</p>
                  <div><span class="flip-back-motto"><i class="fa-solid fa-graduation-cap"></i> Study &amp; Struggle</span></div>
                </div>
                <div class="flip-back-footer">
                  <button type="button" class="btn-flip-flipback" onclick="event.stopPropagation(); this.closest('.leader-flip-card').classList.remove('is-flipped');"><i class="fa-solid fa-arrow-rotate-left"></i> ವಾಪಸ್</button>
                </div>
              </div>
            </div>
          </div>

          <!-- National Leader 2: Mayukh Biswas (All India General Secretary) -->
          <div class="leader-flip-card" tabindex="0" onclick="this.classList.toggle('is-flipped')" aria-label="Comrade Mayukh Biswas details">
            <div class="leader-flip-inner">
              <div class="leader-flip-front leader-card">
                <div>
                  <div class="leader-avatar-wrap">
                    <img src="images/leaders/mayukh_biswas.jpg" alt="Comrade Mayukh Biswas" loading="lazy"
                      onerror="this.src='https://ui-avatars.com/api/?name=Mayukh+Biswas&background=dc2626&color=fff&size=200'">
                  </div>
                  <h3 class="leader-name">Comrade Mayukh Biswas</h3>
                  <div class="leader-role">All India General Secretary (ಅಖಿಲ ಭಾರತ ಪ್ರಧಾನ ಕಾರ್ಯದರ್ಶಿ)</div>
                  <div class="leader-region">SFI National</div>
                </div>
                <div class="flip-hint-badge"><i class="fa-solid fa-arrows-rotate"></i> <span>ತಿರುಗಿಸಿ ನೋಡಿ • Click to Flip</span></div>
              </div>
              <div class="leader-flip-back leader-card">
                <div class="flip-back-header">
                  <span class="flip-star"><i class="fa-solid fa-star"></i></span>
                  <h4 class="flip-back-title">Comrade Mayukh Biswas</h4>
                  <span class="flip-back-role">ಅಖಿಲ ಭಾರತ ಪ್ರಧಾನ ಕಾರ್ಯದರ್ಶಿ • General Secretary</span>
                </div>
                <div class="flip-back-body">
                  <p class="flip-back-desc">SFI ಅಖಿಲ ಭಾರತ ಪ್ರಧಾನ ಕಾರ್ಯದರ್ಶಿಯಾಗಿ ಸಂಘಟನೆಯ ದೈನಂದಿನ ಕಾರ್ಯನಿರ್ವಹಣೆ ಹಾಗೂ ರಾಷ್ಟ್ರವ್ಯಾಪಿ ಅಭಿಯಾನಗಳ ಯೋಜನೆ ನಿರ್ವಹಿಸುತ್ತಿದ್ದಾರೆ.</p>
                  <div><span class="flip-back-motto"><i class="fa-solid fa-hand-fist"></i> Education for All</span></div>
                </div>
                <div class="flip-back-footer">
                  <button type="button" class="btn-flip-flipback" onclick="event.stopPropagation(); this.closest('.leader-flip-card').classList.remove('is-flipped');"><i class="fa-solid fa-arrow-rotate-left"></i> ವಾಪಸ್</button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      <!-- ============ TIER 2: STATE LEADERS (KARNATAKA) ============ -->
      <div class="leadership-category-block" style="margin-bottom: 3rem;">
        <div class="leadership-subtitle-wrap">
          <span class="leadership-sub-badge" style="background: linear-gradient(135deg, #7c3aed, #9333ea);">KARNATAKA STATE</span>
          <h3 class="leadership-tier-title"><i class="fa-solid fa-map" style="color:#9333ea;"></i> ಕರ್ನಾಟಕ ರಾಜ್ಯ ನಾಯಕರು (State Leaders)</h3>
        </div>
        <div class="leadership-grid state-leaders-grid" id="stateLeadersGrid">

          <!-- State Leader 1: State President -->
          <div class="leader-flip-card" tabindex="0" onclick="this.classList.toggle('is-flipped')" aria-label="SFI Karnataka State President details">
            <div class="leader-flip-inner">
              <div class="leader-flip-front leader-card">
                <div>
                  <div class="leader-avatar-wrap">
                    <img src="images/leaders/state_president.jpg" alt="SFI Karnataka State President" loading="lazy"
                      onerror="this.src='https://ui-avatars.com/api/?name=State+President&background=7c3aed&color=fff&size=200'">
                  </div>
                  <h3 class="leader-name">Comrade Muneer Katipalla</h3>
                  <div class="leader-role">State President (ರಾಜ್ಯಾಧ್ಯಕ್ಷರು)</div>
                  <div class="leader-region">SFI Karnataka</div>
                </div>
                <div class="flip-hint-badge"><i class="fa-solid fa-arrows-rotate"></i> <span>ತಿರುಗಿಸಿ ನೋಡಿ • Click to Flip</span></div>
              </div>
              <div class="leader-flip-back leader-card">
                <div class="flip-back-header">
                  <span class="flip-star"><i class="fa-solid fa-star"></i></span>
                  <h4 class="flip-back-title">Comrade Muneer Katipalla</h4>
                  <span class="flip-back-role">ರಾಜ್ಯಾಧ್ಯಕ್ಷರು • State President</span>
                </div>
                <div class="flip-back-body">
                  <p class="flip-back-desc">SFI ಕರ್ನಾಟಕ ರಾಜ್ಯ ಅಧ್ಯಕ್ಷರಾಗಿ ರಾಜ್ಯದ ಎಲ್ಲಾ ಜಿಲ್ಲೆಗಳಲ್ಲಿ ವಿದ್ಯಾರ್ಥಿ ಚಳುವಳಿ ಬಲಪಡಿಸುವ ಕಾರ್ಯ.</p>
                  <div><span class="flip-back-motto"><i class="fa-solid fa-graduation-cap"></i> ವಿದ್ಯಾರ್ಥಿಗಳ ಏಕತೆ</span></div>
                </div>
                <div class="flip-back-footer">
                  <button type="button" class="btn-flip-flipback" onclick="event.stopPropagation(); this.closest('.leader-flip-card').classList.remove('is-flipped');"><i class="fa-solid fa-arrow-rotate-left"></i> ವಾಪಸ್</button>
                </div>
              </div>
            </div>
          </div>

          <!-- State Leader 2: State Secretary -->
          <div class="leader-flip-card" tabindex="0" onclick="this.classList.toggle('is-flipped')" aria-label="SFI Karnataka State Secretary details">
            <div class="leader-flip-inner">
              <div class="leader-flip-front leader-card">
                <div>
                  <div class="leader-avatar-wrap">
                    <img src="images/leaders/state_secretary.jpg" alt="SFI Karnataka State Secretary" loading="lazy"
                      onerror="this.src='https://ui-avatars.com/api/?name=State+Secretary&background=7c3aed&color=fff&size=200'">
                  </div>
                  <h3 class="leader-name">Comrade Vasanth Acharya</h3>
                  <div class="leader-role">State Secretary (ರಾಜ್ಯ ಕಾರ್ಯದರ್ಶಿ)</div>
                  <div class="leader-region">SFI Karnataka</div>
                </div>
                <div class="flip-hint-badge"><i class="fa-solid fa-arrows-rotate"></i> <span>ತಿರುಗಿಸಿ ನೋಡಿ • Click to Flip</span></div>
              </div>
              <div class="leader-flip-back leader-card">
                <div class="flip-back-header">
                  <span class="flip-star"><i class="fa-solid fa-star"></i></span>
                  <h4 class="flip-back-title">Comrade Vasanth Acharya</h4>
                  <span class="flip-back-role">ರಾಜ್ಯ ಕಾರ್ಯದರ್ಶಿ • State Secretary</span>
                </div>
                <div class="flip-back-body">
                  <p class="flip-back-desc">SFI ಕರ್ನಾಟಕ ರಾಜ್ಯ ಕಾರ್ಯದರ್ಶಿಯಾಗಿ ಸಂಘಟನೆಯ ಬೆಳವಣಿಗೆ, ಜಿಲ್ಲಾ ಸಮಿತಿಗಳ ಸಂಯೋಜನೆ ಹಾಗೂ ಶಿಕ್ಷಣ ಹಕ್ಕು ಹೋರಾಟ.</p>
                  <div><span class="flip-back-motto"><i class="fa-solid fa-hand-fist"></i> Study &amp; Struggle</span></div>
                </div>
                <div class="flip-back-footer">
                  <button type="button" class="btn-flip-flipback" onclick="event.stopPropagation(); this.closest('.leader-flip-card').classList.remove('is-flipped');"><i class="fa-solid fa-arrow-rotate-left"></i> ವಾಪಸ್</button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      <!-- ============ TIER 3: DISTRICT LEADERS (DAKSHINA KANNADA) ============ -->
      <div class="leadership-category-block">
        <div class="leadership-subtitle-wrap">
          <span class="leadership-sub-badge">DAKSHINA KANNADA</span>
          <h3 class="leadership-tier-title"><i class="fa-solid fa-flag" style="color:#dc2626;"></i> ಎಸ್.ಎಫ್.ಐ ದಕ್ಷಿಣ ಕನ್ನಡ ಜಿಲ್ಲಾ ಮುಖಂಡರು (District Leaders)</h3>
        </div>
        <div class="leadership-grid state-leaders-grid" id="districtLeadersGrid">

          <!-- District Leader 1: Hazlan (President) -->
          <div class="leader-flip-card" tabindex="0" onclick="this.classList.toggle('is-flipped')" aria-label="Comrade Hazlan details">
            <div class="leader-flip-inner">
              <div class="leader-flip-front leader-card">
                <div>
                  <div class="leader-avatar-wrap">
                    <img src="images/hazlan.jpg" alt="Comrade Hazlan" loading="lazy"
                      onerror="this.src='https://res.cloudinary.com/avytjxre/image/upload/v1788021809/hazlan.jpg'">
                  </div>
                  <h3 class="leader-name">Comrade Hazlan</h3>
                  <div class="leader-role">District President (ಜಿಲ್ಲಾಧ್ಯಕ್ಷರು)</div>
                  <div class="leader-region">SFI Dakshina Kannada</div>
                </div>
                <div class="flip-hint-badge"><i class="fa-solid fa-arrows-rotate"></i> <span>ತಿರುಗಿಸಿ ನೋಡಿ • Click to Flip</span></div>
              </div>
              <div class="leader-flip-back leader-card">
                <div class="flip-back-header">
                  <span class="flip-star"><i class="fa-solid fa-star"></i></span>
                  <h4 class="flip-back-title">Comrade Hazlan</h4>
                  <span class="flip-back-role">ಜಿಲ್ಲಾಧ್ಯಕ್ಷರು • District President</span>
                </div>
                <div class="flip-back-body">
                  <p class="flip-back-desc">ಕ್ಯಾಂಪಸ್ ಸಮನ್ವಯ, ಶಿಕ್ಷಣದ ಖಾಸಗೀಕರಣ ವಿರೋಧಿ ಚಳುವಳಿ ಮತ್ತು ವಿದ್ಯಾರ್ಥಿ ಹಕ್ಕುಗಳ ರಕ್ಷಣೆ.</p>
                  <div><span class="flip-back-motto"><i class="fa-solid fa-graduation-cap"></i> Independence &amp; Equality</span></div>
                </div>
                <div class="flip-back-footer">
                  <a href="tel:+919480112234" class="btn-flip-phone" onclick="event.stopPropagation();"><i class="fa-solid fa-phone"></i> ಕರೆ ಮಾಡಿ</a>
                  <button type="button" class="btn-flip-flipback" onclick="event.stopPropagation(); this.closest('.leader-flip-card').classList.remove('is-flipped');"><i class="fa-solid fa-arrow-rotate-left"></i> ವಾಪಸ್</button>
                </div>
              </div>
            </div>
          </div>

          <!-- District Leader 2: Vinayak S I (Secretary) -->
          <div class="leader-flip-card" tabindex="0" onclick="this.classList.toggle('is-flipped')" aria-label="Comrade Vinayak S I details">
            <div class="leader-flip-inner">
              <div class="leader-flip-front leader-card">
                <div>
                  <div class="leader-avatar-wrap">
                    <img src="images/vinayak.jpg" alt="Comrade Vinayak S I" loading="lazy"
                      onerror="this.src='https://res.cloudinary.com/avytjxre/image/upload/v1788021848/photo.jpg'">
                  </div>
                  <h3 class="leader-name">Comrade Vinayak S I</h3>
                  <div class="leader-role">District Secretary (ಜಿಲ್ಲಾ ಕಾರ್ಯದರ್ಶಿ)</div>
                  <div class="leader-region">SFI Dakshina Kannada</div>
                </div>
                <div class="flip-hint-badge"><i class="fa-solid fa-arrows-rotate"></i> <span>ತಿರುಗಿಸಿ ನೋಡಿ • Click to Flip</span></div>
              </div>
              <div class="leader-flip-back leader-card">
                <div class="flip-back-header">
                  <span class="flip-star"><i class="fa-solid fa-star"></i></span>
                  <h4 class="flip-back-title">Comrade Vinayak S I</h4>
                  <span class="flip-back-role">ಜಿಲ್ಲಾ ಕಾರ್ಯದರ್ಶಿ • District Secretary</span>
                </div>
                <div class="flip-back-body">
                  <p class="flip-back-desc">ವಿದ್ಯಾರ್ಥಿ ಚಳುವಳಿ ಸಂಘಟನೆ, ಕೆಎಸ್‌ಆರ್‌ಟಿಸಿ ಬಸ್ ಪಾಸ್ ಹೋರಾಟ ಹಾಗೂ ದಕ್ಷಿಣ ಕನ್ನಡ ಜಿಲ್ಲಾ ಸಮಿತಿಯ ಸಮಗ್ರ ಮುನ್ನಡೆ.</p>
                  <div><span class="flip-back-motto"><i class="fa-solid fa-graduation-cap"></i> Study &amp; Struggle</span></div>
                </div>
                <div class="flip-back-footer">
                  <a href="tel:+919480112233" class="btn-flip-phone" onclick="event.stopPropagation();"><i class="fa-solid fa-phone"></i> ಕರೆ ಮಾಡಿ</a>
                  <button type="button" class="btn-flip-flipback" onclick="event.stopPropagation(); this.closest('.leader-flip-card').classList.remove('is-flipped');"><i class="fa-solid fa-arrow-rotate-left"></i> ವಾಪಸ್</button>
                </div>
              </div>
            </div>
          </div>

          <!-- District Leader 3: Shivappa (Vice President) -->
          <div class="leader-flip-card" tabindex="0" onclick="this.classList.toggle('is-flipped')" aria-label="Comrade Shivappa details">
            <div class="leader-flip-inner">
              <div class="leader-flip-front leader-card">
                <div>
                  <div class="leader-avatar-wrap">
                    <img src="images/shivappa.jpg" alt="Comrade Shivappa" loading="lazy"
                      onerror="this.src='https://res.cloudinary.com/avytjxre/image/upload/v1788021817/shivappa.jpg'">
                  </div>
                  <h3 class="leader-name">Comrade Shivappa</h3>
                  <div class="leader-role">District Vice President (ಜಿಲ್ಲಾ ಉಪಾಧ್ಯಕ್ಷರು)</div>
                  <div class="leader-region">SFI Dakshina Kannada</div>
                </div>
                <div class="flip-hint-badge"><i class="fa-solid fa-arrows-rotate"></i> <span>ತಿರುಗಿಸಿ ನೋಡಿ • Click to Flip</span></div>
              </div>
              <div class="leader-flip-back leader-card">
                <div class="flip-back-header">
                  <span class="flip-star"><i class="fa-solid fa-star"></i></span>
                  <h4 class="flip-back-title">Comrade Shivappa</h4>
                  <span class="flip-back-role">ಜಿಲ್ಲಾ ಉಪಾಧ್ಯಕ್ಷರು • District Vice President</span>
                </div>
                <div class="flip-back-body">
                  <p class="flip-back-desc">ಗ್ರಾಮೀಣ ಸಾರಿಗೆ, ಕೆಎಸ್‌ಆರ್‌ಟಿಸಿ ವಿದ್ಯಾರ್ಥಿ ಬಸ್ ಸೌಲಭ್ಯ ಹಾಗೂ ಸರ್ಕಾರಿ ಹಾಸ್ಟೆಲ್ ಸಮಸ್ಯೆಗಳ ಪರಿಹಾರ.</p>
                  <div><span class="flip-back-motto"><i class="fa-solid fa-hand-fist"></i> Student Rights First</span></div>
                </div>
                <div class="flip-back-footer">
                  <a href="tel:+919480112235" class="btn-flip-phone" onclick="event.stopPropagation();"><i class="fa-solid fa-phone"></i> ಕರೆ ಮಾಡಿ</a>
                  <button type="button" class="btn-flip-flipback" onclick="event.stopPropagation(); this.closest('.leader-flip-card').classList.remove('is-flipped');"><i class="fa-solid fa-arrow-rotate-left"></i> ವಾಪಸ್</button>
                </div>
              </div>
            </div>
          </div>

          <!-- District Leader 4: Vijay (Joint Secretary) -->
          <div class="leader-flip-card" tabindex="0" onclick="this.classList.toggle('is-flipped')" aria-label="Comrade Vijay details">
            <div class="leader-flip-inner">
              <div class="leader-flip-front leader-card">
                <div>
                  <div class="leader-avatar-wrap">
                    <img src="images/vijay.png" alt="Comrade Vijay" loading="lazy"
                      onerror="this.src='https://res.cloudinary.com/avytjxre/image/upload/v1788021819/vijay.png'">
                  </div>
                  <h3 class="leader-name">Comrade Vijay</h3>
                  <div class="leader-role">District Joint Secretary (ಜಿಲ್ಲಾ ಜೊತೆ ಕಾರ್ಯದರ್ಶಿ)</div>
                  <div class="leader-region">SFI Dakshina Kannada</div>
                </div>
                <div class="flip-hint-badge"><i class="fa-solid fa-arrows-rotate"></i> <span>ತಿರುಗಿಸಿ ನೋಡಿ • Click to Flip</span></div>
              </div>
              <div class="leader-flip-back leader-card">
                <div class="flip-back-header">
                  <span class="flip-star"><i class="fa-solid fa-star"></i></span>
                  <h4 class="flip-back-title">Comrade Vijay</h4>
                  <span class="flip-back-role">ಜಿಲ್ಲಾ ಜೊತೆ ಕಾರ್ಯದರ್ಶಿ • Joint Secretary</span>
                </div>
                <div class="flip-back-body">
                  <p class="flip-back-desc">ಸದಸ್ಯತ್ವ ಅಭಿಯಾನ, ಪ್ರಚಾರ ನಿರ್ವಹಣೆ ಹಾಗೂ ಕಾಲೇಜು ಪರೀಕ್ಷಾ ಶುಲ್ಕ ಹೆಚ್ಚಳ ವಿರೋಧಿ ಜಾಗೃತಿ.</p>
                  <div><span class="flip-back-motto"><i class="fa-solid fa-users"></i> Mass Membership</span></div>
                </div>
                <div class="flip-back-footer">
                  <a href="tel:+919480112236" class="btn-flip-phone" onclick="event.stopPropagation();"><i class="fa-solid fa-phone"></i> ಕರೆ ಮಾಡಿ</a>
                  <button type="button" class="btn-flip-flipback" onclick="event.stopPropagation(); this.closest('.leader-flip-card').classList.remove('is-flipped');"><i class="fa-solid fa-arrow-rotate-left"></i> ವಾಪಸ್</button>
                </div>
              </div>
            </div>
          </div>

          <!-- District Leader 5: Adarsh M Saji (Joint Secretary) -->
          <div class="leader-flip-card" tabindex="0" onclick="this.classList.toggle('is-flipped')" aria-label="Comrade Adarsh M Saji details">
            <div class="leader-flip-inner">
              <div class="leader-flip-front leader-card">
                <div>
                  <div class="leader-avatar-wrap">
                    <img src="images/adarsh.avif" alt="Comrade Adarsh M Saji" loading="lazy"
                      onerror="this.src='https://res.cloudinary.com/avytjxre/image/upload/v1788021809/Adarsh-m-saji-sfi.avif'">
                  </div>
                  <h3 class="leader-name">Comrade Adarsh M Saji</h3>
                  <div class="leader-role">District Joint Secretary (ಜಿಲ್ಲಾ ಜೊತೆ ಕಾರ್ಯದರ್ಶಿ)</div>
                  <div class="leader-region">SFI Dakshina Kannada</div>
                </div>
                <div class="flip-hint-badge"><i class="fa-solid fa-arrows-rotate"></i> <span>ತಿರುಗಿಸಿ ನೋಡಿ • Click to Flip</span></div>
              </div>
              <div class="leader-flip-back leader-card">
                <div class="flip-back-header">
                  <span class="flip-star"><i class="fa-solid fa-star"></i></span>
                  <h4 class="flip-back-title">Comrade Adarsh M Saji</h4>
                  <span class="flip-back-role">ಜಿಲ್ಲಾ ಜೊತೆ ಕಾರ್ಯದರ್ಶಿ • Joint Secretary</span>
                </div>
                <div class="flip-back-body">
                  <p class="flip-back-desc">ವಿದ್ಯಾರ್ಥಿ 24x7 ಸಹಾಯವಾಣಿ ಸಂಯೋಜನೆ, ಕ್ಯಾಂಪಸ್ ಘಟಕಗಳ ಭೇಟಿ ಹಾಗೂ ಸಾಂಸ್ಕೃತಿಕ ಚಟುವಟಿಕೆಗಳು.</p>
                  <div><span class="flip-back-motto"><i class="fa-solid fa-phone"></i> 24x7 Student Helpline</span></div>
                </div>
                <div class="flip-back-footer">
                  <a href="tel:+919480112237" class="btn-flip-phone" onclick="event.stopPropagation();"><i class="fa-solid fa-phone"></i> ಕರೆ ಮಾಡಿ</a>
                  <button type="button" class="btn-flip-flipback" onclick="event.stopPropagation(); this.closest('.leader-flip-card').classList.remove('is-flipped');"><i class="fa-solid fa-arrow-rotate-left"></i> ವಾಪಸ್</button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

    </div>
  </section>`;

// Find the old leadership section and replace it
// Pattern: from "<!-- ========" before "LEADERSHIP SHOWCASE" to the closing "</section>" before "COMMITTEES & UNITS"
const startMarker = '<!-- ========================================================\r\n       LEADERSHIP SHOWCASE';
const endMarker = '<!-- ========================================================\r\n       COMMITTEES & UNITS';

const startIdx = html.indexOf(startMarker);
if (startIdx === -1) {
  // Try LF only
  const startMarkerLF = '<!-- ========================================================\n       LEADERSHIP SHOWCASE';
  const startIdxLF = html.indexOf(startMarkerLF);
  if (startIdxLF === -1) {
    console.error('ERROR: Could not find LEADERSHIP SHOWCASE section start');
    process.exit(1);
  }
}

let sectionStart = html.indexOf('LEADERSHIP SHOWCASE');
if (sectionStart === -1) {
  console.error('ERROR: Could not find LEADERSHIP SHOWCASE');
  process.exit(1);
}

// Go back to find the <!-- before it
let commentStart = html.lastIndexOf('<!--', sectionStart);
// Go back further to include the spacing before <!--
let lineStart = html.lastIndexOf('\n', commentStart) + 1;

// Find end: the </section> that closes the leadership section, which is right before COMMITTEES & UNITS
let committeeStart = html.indexOf('COMMITTEES & UNITS');
if (committeeStart === -1) {
  console.error('ERROR: Could not find COMMITTEES & UNITS section');
  process.exit(1);
}
let committeeCommentStart = html.lastIndexOf('<!--', committeeStart);
let sectionEnd = html.lastIndexOf('\n', committeeCommentStart) + 1;

console.log('Leadership section found at chars:', lineStart, 'to', sectionEnd);
console.log('Replacing with new 3-tier leadership section...');

html = html.substring(0, lineStart) + newLeadershipSection + '\n\n  ' + html.substring(sectionEnd);

fs.writeFileSync(indexPath, html, 'utf8');
console.log('SUCCESS: Leadership section updated with National, State & District tiers!');
