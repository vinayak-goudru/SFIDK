const fs = require('fs');
const path = require('path');

const cssPath = path.join(__dirname, '..', 'css', 'style.css');
let css = fs.readFileSync(cssPath, 'utf8');

const leadershipStyles = `
/* ========================================================
   DYFI-STYLE CLEAN LEADERSHIP CARDS (IDENTICAL TO SCREENSHOT)
   ======================================================== */
.simple-leaders-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 340px));
  justify-content: center;
  gap: 1.75rem;
  margin: 0 auto;
}

.simple-leaders-grid.three-col {
  grid-template-columns: repeat(auto-fit, minmax(260px, 320px));
  max-width: 1050px;
}

.simple-leaders-grid.five-col {
  grid-template-columns: repeat(auto-fit, minmax(220px, 260px));
  max-width: 1350px;
}

.leader-simple-card {
  background: var(--card-bg, #ffffff);
  border-radius: 18px;
  padding: 2.25rem 1.5rem 1.75rem;
  text-align: center;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  border: 1px solid var(--border-color, rgba(0, 0, 0, 0.06));
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
}

[data-theme="dark"] .leader-simple-card {
  background: #141b2d;
  border-color: rgba(255, 255, 255, 0.08);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}

.leader-simple-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 18px 40px rgba(220, 38, 38, 0.12);
}

.leader-avatar-ring {
  width: 110px;
  height: 110px;
  border-radius: 50%;
  padding: 4px;
  margin-bottom: 1.25rem;
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.leader-avatar-ring.red-ring {
  border: 3.5px solid #dc2626;
  box-shadow: 0 4px 15px rgba(220, 38, 38, 0.25);
}

.leader-avatar-ring img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  display: block;
}

.leader-card-name {
  font-size: 1.15rem;
  font-weight: 800;
  color: var(--text-heading, #0f172a);
  margin: 0 0 0.4rem 0;
  line-height: 1.35;
}

[data-theme="dark"] .leader-card-name {
  color: #f8fafc;
}

.leader-card-role {
  font-size: 0.85rem;
  font-weight: 700;
  color: #dc2626;
  margin-bottom: 0.35rem;
  line-height: 1.3;
}

.leader-card-region {
  font-size: 0.8rem;
  color: var(--text-muted, #64748b);
  font-weight: 500;
}

[data-theme="dark"] .leader-card-region {
  color: #94a3b8;
}

.leadership-subtitle-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  margin-bottom: 1.75rem;
  flex-wrap: wrap;
}

.leadership-sub-badge {
  color: #fff;
  font-size: 0.75rem;
  font-weight: 800;
  padding: 0.25rem 0.75rem;
  border-radius: 6px;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  background: #dc2626;
}

.leadership-tier-title {
  font-size: 1.15rem;
  font-weight: 800;
  color: var(--text-heading, #0f172a);
  margin: 0;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

[data-theme="dark"] .leadership-tier-title {
  color: #f8fafc;
}
`;

css += '\n' + leadershipStyles;
fs.writeFileSync(cssPath, css, 'utf8');
console.log('Appended leadership styles to style.css successfully!');
