const fs = require('fs');
const path = require('path');

const cssPath = path.join(__dirname, '..', 'css', 'style.css');
let css = fs.readFileSync(cssPath, 'utf8');

const additionalStyles = `
/* ========================================================
   DYFI EXACT SCREENSHOT REPLICA LEADERSHIP STYLES
   ======================================================== */
.leadership-header-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2.75rem;
  flex-wrap: wrap;
  gap: 1rem;
}

.leadership-top-tag {
  color: #dc2626;
  font-size: 0.9rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.leadership-main-title {
  font-size: 2.2rem;
  font-weight: 900;
  color: var(--text-heading, #0f172a);
  margin: 0;
}

[data-theme="dark"] .leadership-main-title {
  color: #f8fafc;
}

.leadership-main-title .highlight-red {
  color: #dc2626;
}

.simple-leaders-grid.two-col {
  display: flex;
  justify-content: center;
  gap: 2rem;
  flex-wrap: wrap;
}

.simple-leaders-grid.two-col .leader-simple-card {
  width: 320px;
  max-width: 100%;
}

.simple-leaders-grid.three-col {
  display: flex;
  justify-content: center;
  gap: 2rem;
  flex-wrap: wrap;
}

.simple-leaders-grid.three-col .leader-simple-card {
  width: 300px;
  max-width: 100%;
}

.simple-leaders-grid.five-col {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  flex-wrap: wrap;
}

.simple-leaders-grid.five-col .leader-simple-card {
  width: 230px;
  max-width: 100%;
}

.leader-avatar-ring {
  width: 110px;
  height: 110px;
  border-radius: 50%;
  padding: 3px;
  margin-bottom: 1.25rem;
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.leader-avatar-ring.red-ring {
  border: 3.5px solid #dc2626;
  box-shadow: 0 4px 14px rgba(220, 38, 38, 0.2);
}

.leader-avatar-ring img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  display: block;
}

.leader-card-name {
  font-size: 1.2rem;
  font-weight: 800;
  color: var(--text-heading, #0f172a);
  margin: 0 0 0.4rem 0;
  line-height: 1.3;
}

[data-theme="dark"] .leader-card-name {
  color: #f8fafc;
}

.leader-card-role {
  font-size: 0.88rem;
  font-weight: 700;
  color: #dc2626;
  margin-bottom: 0.35rem;
  line-height: 1.35;
}

.leader-card-region {
  font-size: 0.8rem;
  color: var(--text-muted, #64748b);
  font-weight: 500;
}

[data-theme="dark"] .leader-card-region {
  color: #94a3b8;
}
`;

css += '\n' + additionalStyles;
fs.writeFileSync(cssPath, css, 'utf8');
console.log('Appended additional CSS styles successfully!');
