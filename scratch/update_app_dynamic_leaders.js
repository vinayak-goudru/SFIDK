const fs = require('fs');
const path = require('path');

const appJsPath = path.join(__dirname, '..', 'js', 'app.js');
let js = fs.readFileSync(appJsPath, 'utf8');

const targetStart = '    // 7. Render Leaders (Admin Dynamic — National & State Grid Support)';
const targetEnd = '    // 8. Render Gallery (Admin Dynamic)';

const startIndex = js.indexOf(targetStart);
const endIndex = js.indexOf(targetEnd);

if (startIndex === -1 || endIndex === -1) {
  console.error('ERROR matching targets in app.js', { startIndex, endIndex });
  process.exit(1);
}

const newDynamicLeadersCode = `    // 7. Render Leaders (Admin Dynamic — National, State & District Grid Support)
    try {
      const nationalGrid = document.getElementById('nationalLeadersGrid');
      const stateGrid = document.getElementById('stateLeadersGrid');
      const districtGrid = document.getElementById('districtLeadersGrid');
      const leaders = DyfiDataStore.get(DYFI_DATA_KEYS.LEADERS) || [];

      function renderLeaderSimpleCard(l, idx) {
        const isBlankName = !l.name_kn && !l.name_en;
        const displayName = isKn ? (l.name_kn || l.name_en) : (l.name_en || l.name_kn);
        const displayRole = isKn ? (l.role_kn || l.role_en) : (l.role_en || l.role_kn);
        const fallbackAvatar = 'https://ui-avatars.com/api/?name=' + encodeURIComponent(l.name_en || 'Leader') + '&background=dc2626&color=fff&size=200';
        const photoSrc = l.photo || fallbackAvatar;

        return \`
          <div class="leader-simple-card">
            <div class="leader-avatar-ring red-ring">
              <img src="\${photoSrc}" alt="\${displayName || 'Leader'}" loading="lazy" onerror="this.onerror=null; this.src='\${fallbackAvatar}';">
            </div>
            <h3 class="leader-card-name" style="\${isBlankName ? 'color:#94a3b8; font-style:italic;' : ''}">
              \${displayName || (isKn ? '(ಖಾಲಿ / To be assigned)' : '(To be assigned)')}
            </h3>
            <div class="leader-card-role">\${displayRole || ''}</div>
            <div class="leader-card-region">\${l.region || ''}</div>
          </div>
        \`;
      }

      if (nationalGrid || stateGrid || districtGrid) {
        const nationalLeaders = leaders.filter(l => l.tier === 'national' || (l.id && l.id.startsWith('nl')));
        const stateLeaders = leaders.filter(l => l.tier === 'state' || (l.id && l.id.startsWith('sl')));
        const districtLeaders = leaders.filter(l => l.tier === 'district' || (l.id && l.id.startsWith('dl')) || (!l.tier && !l.id.startsWith('nl') && !l.id.startsWith('sl')));

        if (nationalGrid && nationalLeaders.length > 0) {
          nationalGrid.innerHTML = nationalLeaders.map(renderLeaderSimpleCard).join('');
        }
        if (stateGrid && stateLeaders.length > 0) {
          stateGrid.innerHTML = stateLeaders.map(renderLeaderSimpleCard).join('');
        }
        if (districtGrid && districtLeaders.length > 0) {
          districtGrid.innerHTML = districtLeaders.map(renderLeaderSimpleCard).join('');
        }
      }
    } catch (e) {
      console.warn('Leaders sync error:', e);
    }

`;

js = js.substring(0, startIndex) + newDynamicLeadersCode + js.substring(endIndex);
fs.writeFileSync(appJsPath, js, 'utf8');
console.log('SUCCESS: app.js dynamic leaders rendering updated to clean cards!');
