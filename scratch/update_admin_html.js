const fs = require('fs');
const path = require('path');

// 1. UPDATE admin.html
const adminHtmlPath = path.join(__dirname, '..', 'admin.html');
let adminHtml = fs.readFileSync(adminHtmlPath, 'utf8');

adminHtml = adminHtml.replace(
  `<h3>National &amp; State Leadership Team (ರಾಷ್ಟ್ರೀಯ &amp; ರಾಜ್ಯ ಮುಖಂಡರು)</h3>
                <p class="card-subtitle">Manage office bearers shown in the All India National &amp; Karnataka State Leadership sections.</p>`,
  `<h3><i class="fa-solid fa-users" style="color:var(--primary,#dc2626); margin-right:6px;"></i>Leadership Team (ರಾಷ್ಟ್ರೀಯ, ರಾಜ್ಯ &amp; ಜಿಲ್ಲಾ ಮುಖಂಡರು)</h3>
                <p class="card-subtitle">Manage leaders across All India National, Karnataka State, and Dakshina Kannada District committees.</p>`
);

// Add filter tier dropdown in admin.html pane-leaders if not already there
if (!adminHtml.includes('id="filterLeaderTier"')) {
  adminHtml = adminHtml.replace(
    `<div class="card-body">
              <div class="table-responsive">`,
    `<div class="card-body">
              <div class="filter-bar" style="margin-bottom: 1.25rem;">
                <select id="filterLeaderTier" class="form-control" style="max-width: 320px;">
                  <option value="">All Leadership Tiers (ಎಲ್ಲಾ ಹಂತಗಳು)</option>
                  <option value="national">All India / National (ರಾಷ್ಟ್ರೀಯ ನಾಯಕರು)</option>
                  <option value="state">Karnataka State (ರಾಜ್ಯ ನಾಯಕರು)</option>
                  <option value="district">Dakshina Kannada District (ಜಿಲ್ಲಾ ನಾಯಕರು)</option>
                </select>
              </div>
              <div class="table-responsive">`
  );
}

fs.writeFileSync(adminHtmlPath, adminHtml, 'utf8');
console.log('SUCCESS: admin.html updated!');
