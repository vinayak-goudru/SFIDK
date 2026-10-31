const fs = require('fs');
const path = require('path');

const adminJsPath = path.join(__dirname, '..', 'js', 'admin.js');
let js = fs.readFileSync(adminJsPath, 'utf8');

const startMarker = '  // Leaders (National & State Leadership Management)';
const endMarker = '  // ================= DISTRICTS, TALUKS & AREA COMMITTEES ENGINE =================';

const startIndex = js.indexOf(startMarker);
const endIndex = js.indexOf(endMarker);

if (startIndex === -1 || endIndex === -1) {
  console.error('ERROR matching markers', { startIndex, endIndex });
  process.exit(1);
}

const newLeadersCode = `  // Leaders (National, State & District Leadership Management)
  function renderLeaders() {
    const list = DyfiDataStore.get(DYFI_DATA_KEYS.LEADERS) || [];
    const tbody = document.getElementById('leadersTableBody');
    if (!tbody) return;

    const filterTier = document.getElementById('filterLeaderTier');
    const selectedTier = filterTier ? filterTier.value : '';

    const filtered = list.filter(l => {
      if (!selectedTier) return true;
      if (selectedTier === 'national') return l.tier === 'national' || (l.id && l.id.startsWith('nl'));
      if (selectedTier === 'state') return l.tier === 'state' || (l.id && l.id.startsWith('sl'));
      if (selectedTier === 'district') return l.tier === 'district' || (l.id && l.id.startsWith('dl')) || (!l.tier && !l.id.startsWith('nl') && !l.id.startsWith('sl'));
      return true;
    });

    tbody.innerHTML = filtered.map((l) => {
      const idx = list.indexOf(l);
      const isNational = l.tier === 'national' || (l.id && l.id.startsWith('nl'));
      const isState = l.tier === 'state' || (l.id && l.id.startsWith('sl'));
      const isDistrict = !isNational && !isState;

      let tierBadge = '';
      if (isNational) {
        tierBadge = '<span class="badge" style="background:linear-gradient(135deg, #b91c1c, #dc2626); color:#fff; font-size:0.75rem; padding:0.25rem 0.6rem; border-radius:4px; font-weight:800;"><i class="fa-solid fa-flag"></i> National / All India</span>';
      } else if (isState) {
        tierBadge = '<span class="badge" style="background:linear-gradient(135deg, #7c3aed, #9333ea); color:#fff; font-size:0.75rem; padding:0.25rem 0.6rem; border-radius:4px; font-weight:800;"><i class="fa-solid fa-map"></i> Karnataka State</span>';
      } else {
        tierBadge = '<span class="badge" style="background:#dc2626; color:#fff; font-size:0.75rem; padding:0.25rem 0.6rem; border-radius:4px; font-weight:800;"><i class="fa-solid fa-location-dot"></i> Dakshina Kannada</span>';
      }

      const avatarHtml = l.photo
        ? \`<img src="\${l.photo}" class="table-avatar" alt="Leader" style="width:44px; height:44px; border-radius:50%; object-fit:cover; border:2.5px solid #dc2626;" onerror="this.outerHTML='<div class=\\\\'table-avatar placeholder-avatar\\\\' style=\\\\'display:inline-flex; align-items:center; justify-content:center; background:#1e293b; color:#94a3b8; font-size:1.1rem; width:44px; height:44px; border-radius:50%; border:2px solid rgba(220,38,38,0.3);\\\\'><i class=\\\\'fa-solid fa-user\\\\'></i></div>'">\`
        : \`<div class="table-avatar placeholder-avatar" style="display:inline-flex; align-items:center; justify-content:center; background:#1e293b; color:#94a3b8; font-size:1.1rem; width:44px; height:44px; border-radius:50%; border:2px solid rgba(220,38,38,0.3);"><i class="fa-solid fa-user"></i></div>\`;

      return \`
        <tr>
          <td>\${avatarHtml}</td>
          <td>
            <strong>\${l.name_en || '<em style="color:#94a3b8;">(Blank / ಖಾಲಿ)</em>'}</strong><br>
            <span style="color:#ef4444; font-weight:600;">\${l.name_kn || ''}</span>
          </td>
          <td>
            <strong>\${l.role_en || 'Leader'}</strong><br>
            <small style="color:#94a3b8;">\${l.role_kn || ''}</small>
            \${l.phone ? \`<br><small style="color:#22c55e; font-weight:600;"><i class="fa-solid fa-phone"></i> \${l.phone}</small>\` : ''}
          </td>
          <td>
            \${tierBadge}<br>
            <small style="color:#94a3b8;">\${l.region || (isNational ? 'All India Centre' : isState ? 'Karnataka State Committee' : 'SFI Dakshina Kannada')}</small>
          </td>
          <td>
            <div class="table-actions-cell">
              <button class="btn btn-table-action btn-outline-warning" onclick="editLeader(\${idx})"><i class="fa-solid fa-pen-to-square"></i> Edit</button>
              <button class="btn btn-table-action btn-outline-danger" onclick="deleteLeader(\${idx})"><i class="fa-solid fa-trash"></i> Delete</button>
            </div>
          </td>
        </tr>
      \`;
    }).join('');
  }

  // Filter change listener
  const filterLeaderTierElem = document.getElementById('filterLeaderTier');
  if (filterLeaderTierElem) {
    filterLeaderTierElem.addEventListener('change', renderLeaders);
  }

  window.editLeader = function(index) {
    const list = DyfiDataStore.get(DYFI_DATA_KEYS.LEADERS) || [];
    const item = list[index];
    if (!item) return;

    const isNational = item.tier === 'national' || (item.id && item.id.startsWith('nl'));
    const isState = item.tier === 'state' || (item.id && item.id.startsWith('sl'));
    const currentTier = isNational ? 'national' : (isState ? 'state' : 'district');

    openModal('Edit Leader (ಮುಖಂಡರ ವಿವರ ತಿದ್ದುಪಡಿ)', \`
      <form id="modalFormLeaderEdit">
        <div class="form-row">
          <div class="form-group col-6">
            <label class="form-label">Leadership Level / Tier (ನಾಯಕತ್ವ ಹಂತ)</label>
            <select id="inpLTier" class="form-control" required>
              <option value="national" \${currentTier === 'national' ? 'selected' : ''}>All India / National (ರಾಷ್ಟ್ರೀಯ ನಾಯಕತ್ವ)</option>
              <option value="state" \${currentTier === 'state' ? 'selected' : ''}>Karnataka State (ರಾಜ್ಯ ನಾಯಕತ್ವ)</option>
              <option value="district" \${currentTier === 'district' ? 'selected' : ''}>Dakshina Kannada District (ಜಿಲ್ಲಾ ನಾಯಕತ್ವ)</option>
            </select>
          </div>
          <div class="form-group col-6">
            <label class="form-label">Committee / Region Name</label>
            <input type="text" id="inpLRegion" class="form-control" value="\${(item.region || (currentTier === 'national' ? 'All India Centre' : currentTier === 'state' ? 'Karnataka State Committee' : 'SFI Dakshina Kannada')).replace(/"/g, '&quot;')}">
          </div>
        </div>
        <div class="form-row">
          <div class="form-group col-6">
            <label class="form-label">Leader Name (English)</label>
            <input type="text" id="inpLNameEn" class="form-control" value="\${(item.name_en || '').replace(/"/g, '&quot;')}" placeholder="e.g. Comrade A. A. Rahim">
          </div>
          <div class="form-group col-6">
            <label class="form-label">Leader Name (ಕನ್ನಡ)</label>
            <input type="text" id="inpLNameKn" class="form-control" value="\${(item.name_kn || '').replace(/"/g, '&quot;')}" placeholder="ಉದಾ: ಕಾ. ಎ. ಎ. ರಹೀಮ್">
          </div>
        </div>
        <div class="form-row">
          <div class="form-group col-6">
            <label class="form-label">Designation / Role (English)</label>
            <input type="text" id="inpLRoleEn" class="form-control" required value="\${(item.role_en || '').replace(/"/g, '&quot;')}" placeholder="e.g. All India President / District Secretary">
          </div>
          <div class="form-group col-6">
            <label class="form-label">Designation / Role (ಕನ್ನಡ)</label>
            <input type="text" id="inpLRoleKn" class="form-control" required value="\${(item.role_kn || '').replace(/"/g, '&quot;')}" placeholder="ಉದಾ: ಅಖಿಲ ಭಾರತ ಅಧ್ಯಕ್ಷರು / ಜಿಲ್ಲಾ ಕಾರ್ಯದರ್ಶಿ">
          </div>
        </div>
        <div class="form-row">
          <div class="form-group col-12">
            <label class="form-label">Contact Phone Number (ಐಚ್ಛಿಕ / Optional)</label>
            <input type="text" id="inpLPhone" class="form-control" value="\${(item.phone || '').replace(/"/g, '&quot;')}" placeholder="+91 9480112233">
          </div>
        </div>
        \${renderImagePickerHTML('inpLPhoto', 'Leader Photo (ಭಾವಚಿತ್ರ - ಐಚ್ಛಿಕ/Optional)', item.photo || '', '')}
        <button type="submit" class="btn btn-primary btn-block"><i class="fa-solid fa-floppy-disk"></i> Update Leader Information</button>
      </form>
    \`);

    initImagePicker('inpLPhoto');

    const tierSelect = document.getElementById('inpLTier');
    const regionInput = document.getElementById('inpLRegion');
    if (tierSelect && regionInput) {
      tierSelect.addEventListener('change', () => {
        if (tierSelect.value === 'national') regionInput.value = 'All India Centre';
        else if (tierSelect.value === 'state') regionInput.value = 'Karnataka State Committee';
        else regionInput.value = 'SFI Dakshina Kannada';
      });
    }

    document.getElementById('modalFormLeaderEdit').onsubmit = (e) => {
      e.preventDefault();
      item.tier = document.getElementById('inpLTier').value;
      item.region = document.getElementById('inpLRegion').value.trim() || (item.tier === 'national' ? 'All India Centre' : item.tier === 'state' ? 'Karnataka State Committee' : 'SFI Dakshina Kannada');
      item.name_en = document.getElementById('inpLNameEn').value.trim();
      item.name_kn = document.getElementById('inpLNameKn').value.trim();
      item.role_en = document.getElementById('inpLRoleEn').value.trim();
      item.role_kn = document.getElementById('inpLRoleKn').value.trim();
      item.phone = document.getElementById('inpLPhone').value.trim();
      item.photo = document.getElementById('inpLPhoto').value.trim();

      DyfiDataStore.set(DYFI_DATA_KEYS.LEADERS, list);
      closeModal();
      renderLeaders();
      renderDashboard();
      showToast('Leader information updated successfully');
    };
  };

  window.deleteLeader = function(index) {
    if (confirm('Delete this leader?')) {
      const list = DyfiDataStore.get(DYFI_DATA_KEYS.LEADERS) || [];
      list.splice(index, 1);
      DyfiDataStore.set(DYFI_DATA_KEYS.LEADERS, list);
      renderLeaders();
      renderDashboard();
      showToast('Leader removed');
    }
  };

  document.getElementById('btnOpenAddLeader').addEventListener('click', () => {
    openModal('Add Leader (ಹೊಸ ಮುಖಂಡರ ಸೇರ್ಪಡೆ)', \`
      <form id="modalFormLeader">
        <div class="form-row">
          <div class="form-group col-6">
            <label class="form-label">Leadership Level / Tier (ನಾಯಕತ್ವ ಹಂತ)</label>
            <select id="inpLTier" class="form-control" required>
              <option value="national">All India / National (ರಾಷ್ಟ್ರೀಯ ನಾಯಕತ್ವ)</option>
              <option value="state">Karnataka State (ರಾಜ್ಯ ನಾಯಕತ್ವ)</option>
              <option value="district" selected>Dakshina Kannada District (ಜಿಲ್ಲಾ ನಾಯಕತ್ವ)</option>
            </select>
          </div>
          <div class="form-group col-6">
            <label class="form-label">Committee / Region Name</label>
            <input type="text" id="inpLRegion" class="form-control" value="SFI Dakshina Kannada" placeholder="e.g. SFI Dakshina Kannada">
          </div>
        </div>
        <div class="form-row">
          <div class="form-group col-6">
            <label class="form-label">Leader Name (English)</label>
            <input type="text" id="inpLNameEn" class="form-control" placeholder="Comrade Name">
          </div>
          <div class="form-group col-6">
            <label class="form-label">Leader Name (ಕನ್ನಡ)</label>
            <input type="text" id="inpLNameKn" class="form-control" placeholder="ಕಾಮ್ರೇಡ್ ಹೆಸರು">
          </div>
        </div>
        <div class="form-row">
          <div class="form-group col-6">
            <label class="form-label">Designation / Role (English)</label>
            <input type="text" id="inpLRoleEn" class="form-control" required placeholder="District President / Secretary">
          </div>
          <div class="form-group col-6">
            <label class="form-label">Designation / Role (ಕನ್ನಡ)</label>
            <input type="text" id="inpLRoleKn" class="form-control" required placeholder="ಜಿಲ್ಲಾಧ್ಯಕ್ಷರು / ಜಿಲ್ಲಾ ಕಾರ್ಯದರ್ಶಿ">
          </div>
        </div>
        <div class="form-row">
          <div class="form-group col-12">
            <label class="form-label">Contact Phone Number (ಐಚ್ಛಿಕ / Optional)</label>
            <input type="text" id="inpLPhone" class="form-control" placeholder="+91 9480112233">
          </div>
        </div>
        \${renderImagePickerHTML('inpLPhoto', 'Leader Photo (ಭಾವಚಿತ್ರ - ಐಚ್ಛಿಕ/Optional)', '', '')}
        <button type="submit" class="btn btn-primary btn-block"><i class="fa-solid fa-plus"></i> Add Leader</button>
      </form>
    \`);

    initImagePicker('inpLPhoto');

    const tierSelect = document.getElementById('inpLTier');
    const regionInput = document.getElementById('inpLRegion');
    if (tierSelect && regionInput) {
      tierSelect.addEventListener('change', () => {
        if (tierSelect.value === 'national') regionInput.value = 'All India Centre';
        else if (tierSelect.value === 'state') regionInput.value = 'Karnataka State Committee';
        else regionInput.value = 'SFI Dakshina Kannada';
      });
    }

    document.getElementById('modalFormLeader').onsubmit = (e) => {
      e.preventDefault();
      const list = DyfiDataStore.get(DYFI_DATA_KEYS.LEADERS) || [];
      const tier = document.getElementById('inpLTier').value;
      const prefix = tier === 'national' ? 'nl_' : (tier === 'state' ? 'sl_' : 'dl_');
      list.push({
        id: prefix + Date.now(),
        tier: tier,
        name_en: document.getElementById('inpLNameEn').value.trim(),
        name_kn: document.getElementById('inpLNameKn').value.trim(),
        role_en: document.getElementById('inpLRoleEn').value.trim(),
        role_kn: document.getElementById('inpLRoleKn').value.trim(),
        phone: document.getElementById('inpLPhone').value.trim(),
        region: document.getElementById('inpLRegion').value.trim() || (tier === 'national' ? 'All India Centre' : tier === 'state' ? 'Karnataka State Committee' : 'SFI Dakshina Kannada'),
        photo: document.getElementById('inpLPhoto').value.trim()
      });

      DyfiDataStore.set(DYFI_DATA_KEYS.LEADERS, list);
      closeModal();
      renderLeaders();
      renderDashboard();
      showToast('New leader added successfully');
    };
  });
\n\n`;

js = js.substring(0, startIndex) + newLeadersCode + js.substring(endIndex);
fs.writeFileSync(adminJsPath, js, 'utf8');
console.log('SUCCESS: admin.js updated with full 3-tier leadership management!');
