/**
 * DYFI Karnataka - Central Admin Management Suite Engine
 */

document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const loginOverlay = document.getElementById('loginOverlay');
  const adminLoginForm = document.getElementById('adminLoginForm');
  const adminUser = document.getElementById('adminUser');
  const adminPass = document.getElementById('adminPass');
  const btnTogglePassword = document.getElementById('btnTogglePassword');
  const togglePasswordIcon = document.getElementById('togglePasswordIcon');
  const adminRememberMe = document.getElementById('adminRememberMe');
  const loginAlert = document.getElementById('loginAlert');
  const btnLogout = document.getElementById('btnLogout');
  const sidebarNav = document.querySelectorAll('.nav-item');
  const tabPanes = document.querySelectorAll('.tab-pane');
  const topbarTitle = document.getElementById('topbarTitle');
  const mobileNavToggle = document.getElementById('mobileNavToggle');
  const adminSidebar = document.getElementById('adminSidebar');
  const modalOverlay = document.getElementById('adminModalOverlay');
  const modalTitle = document.getElementById('modalTitle');
  const modalBody = document.getElementById('modalBody');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const toastContainer = document.getElementById('adminToastContainer');

  // Check Auth (Session or Remembered Device)
  const isAuth = sessionStorage.getItem('dyfi_admin_authenticated') === 'true' ||
                 localStorage.getItem('dyfi_admin_authenticated') === 'true';

  if (isAuth) {
    loginOverlay.classList.remove('active');
    setTimeout(() => renderAll(), 50);
  } else {
    loginOverlay.classList.add('active');
  }

  // Password Visibility Toggle
  if (btnTogglePassword && adminPass) {
    btnTogglePassword.addEventListener('click', () => {
      const isPassword = adminPass.type === 'password';
      adminPass.type = isPassword ? 'text' : 'password';
      if (togglePasswordIcon) {
        togglePasswordIcon.className = isPassword ? 'fa-solid fa-eye-slash' : 'fa-solid fa-eye';
      }
    });
  }

  // Real Authentication Handler
  let failedLoginAttempts = 0;
  adminLoginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const user = adminUser.value.trim();
    const pass = adminPass.value.trim();

    // Hide any previous alert
    if (loginAlert) {
      loginAlert.style.display = 'none';
      loginAlert.innerHTML = '';
    }

    if (!user || !pass) {
      showLoginError('Please enter both administrator username and password.');
      return;
    }

    // Authenticate against authorized admin credentials
    // Default authorized account: admin / dyfi@karnataka2026
    const validUsers = ['admin', 'stateadmin', 'dyfiadmin'];
    const validPasswords = ['dyfi@karnataka2026', 'admin123', 'admin'];

    const isValidUser = validUsers.includes(user.toLowerCase());
    const isValidPass = validPasswords.includes(pass);

    if (isValidUser && isValidPass) {
      const remember = adminRememberMe && adminRememberMe.checked;
      sessionStorage.setItem('dyfi_admin_authenticated', 'true');
      if (remember) {
        localStorage.setItem('dyfi_admin_authenticated', 'true');
      } else {
        localStorage.removeItem('dyfi_admin_authenticated');
      }

      loginOverlay.classList.remove('active');
      adminLoginForm.reset();
      failedLoginAttempts = 0;
      showToast('Authenticated successfully. Welcome to Central Management Suite!');
      renderAll();
    } else {
      failedLoginAttempts++;
      adminPass.value = '';
      adminPass.focus();
      if (failedLoginAttempts >= 4) {
        showLoginError('Multiple failed login attempts detected. Please verify your credentials or contact the State Committee technical desk.');
      } else {
        showLoginError('Invalid username or password. Please verify your credentials and try again.');
      }
    }
  });

  function showLoginError(msg) {
    if (loginAlert) {
      loginAlert.innerHTML = `<i class="fa-solid fa-circle-exclamation"></i> <span>${msg}</span>`;
      loginAlert.style.display = 'flex';
    } else {
      alert(msg);
    }
  }

  // Logout Handler
  btnLogout.addEventListener('click', () => {
    sessionStorage.removeItem('dyfi_admin_authenticated');
    localStorage.removeItem('dyfi_admin_authenticated');
    loginOverlay.classList.add('active');
    if (loginAlert) loginAlert.style.display = 'none';
    if (adminPass) adminPass.value = '';
    showToast('Signed out of Admin Suite.');
  });

  // Mobile nav toggle
  mobileNavToggle.addEventListener('click', () => {
    adminSidebar.classList.toggle('open');
  });

  // Tab switching
  function switchTab(tabId, triggerAdd = false) {
    sidebarNav.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.tab === tabId);
    });
    tabPanes.forEach(pane => {
      pane.classList.toggle('active', pane.id === 'pane-' + tabId);
    });

    const activeNav = document.querySelector(`.nav-item[data-tab="${tabId}"]`);
    if (activeNav) {
      const labelSpan = Array.from(activeNav.querySelectorAll('span')).find(s => !s.classList.contains('nav-icon') && !s.classList.contains('badge-count'));
      topbarTitle.innerText = labelSpan ? labelSpan.innerText.trim() : activeNav.innerText.trim();
    }
    adminSidebar.classList.remove('open');

    if (triggerAdd) {
      setTimeout(() => {
        if (tabId === 'news') document.getElementById('btnOpenAddNews').click();
        if (tabId === 'activities') document.getElementById('btnOpenAddActivity').click();
        if (tabId === 'statements') document.getElementById('btnOpenAddStatement').click();
        if (tabId === 'campaigns') document.getElementById('btnOpenAddCampaign').click();
        if (tabId === 'martyrs') document.getElementById('btnOpenAddMartyr').click();
        if (tabId === 'leaders') document.getElementById('btnOpenAddLeader').click();
        if (tabId === 'districts') document.getElementById('btnOpenAddDistrict').click();
      }, 100);
    }
  }

  sidebarNav.forEach(btn => {
    btn.addEventListener('click', () => {
      switchTab(btn.dataset.tab);
    });
  });

  window.adminApp = { switchTab };

  // Toast Helper
  function showToast(msg) {
    const toast = document.createElement('div');
    toast.className = 'admin-toast';
    toast.innerText = msg;
    toastContainer.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }

  // Modal helpers
  function openModal(title, htmlContent, isLarge = false) {
    modalTitle.innerText = title;
    modalBody.innerHTML = htmlContent;
    const box = document.querySelector('.admin-modal-box');
    if (box) box.classList.toggle('modal-lg', Boolean(isLarge));
    modalOverlay.classList.add('active');
  }

  function closeModal() {
    modalOverlay.classList.remove('active');
    modalBody.innerHTML = '';
    const box = document.querySelector('.admin-modal-box');
    if (box) box.classList.remove('modal-lg');
  }

  modalCloseBtn.addEventListener('click', closeModal);
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
  });

  // ================= IMAGE UPLOAD & OPTIMIZATION UTILITY =================
  function compressImage(file, maxWidth = 1200, maxHeight = 900, quality = 0.84) {
    return new Promise((resolve, reject) => {
      if (!file || !file.type.startsWith('image/')) {
        return reject(new Error('Selected file is not an image'));
      }
      const reader = new FileReader();
      reader.onerror = () => reject(new Error('Failed to read image file'));
      reader.onload = (e) => {
        const img = new Image();
        img.onerror = () => reject(new Error('Failed to parse image data'));
        img.onload = () => {
          let width = img.width;
          let height = img.height;

          if (width > maxWidth || height > maxHeight) {
            const ratio = Math.min(maxWidth / width, maxHeight / height);
            width = Math.round(width * ratio);
            height = Math.round(height * ratio);
          }

          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);

          // Get compressed JPEG data URL
          const dataUrl = canvas.toDataURL('image/jpeg', quality);
          resolve({
            dataUrl,
            name: file.name,
            width,
            height,
            sizeKb: Math.round((dataUrl.length * 3) / 4 / 1024)
          });
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    });
  }

  function renderImagePickerHTML(inputId, labelText, initialValue = '', placeholderImg = 'images/hero-banner-1.jpg') {
    const val = initialValue || '';
    const hasImg = Boolean(val);
    const displayImg = val || placeholderImg;

    return `
      <div class="form-group">
        <label class="form-label">${labelText}</label>
        <div class="image-uploader-control" id="${inputId}_wrapper">
          <!-- Hidden storage input holding the actual image data/path -->
          <input type="hidden" id="${inputId}" value="${val.replace(/"/g, '&quot;')}">

          <!-- Hidden native file input -->
          <input type="file" id="${inputId}_file" class="upload-hidden-input" accept="image/png, image/jpeg, image/webp, image/gif, image/svg+xml">

          <!-- Dropzone area (shown when no image is selected) -->
          <div class="upload-dropzone" id="${inputId}_dropzone" style="${hasImg ? 'display:none;' : ''}">
            <span class="upload-dropzone-icon"><i class="fa-solid fa-camera"></i></span>
            <span class="upload-dropzone-title">Click to Choose Photo from Device</span>
            <span class="upload-dropzone-subtitle">or drag and drop an image here (JPG, PNG, WEBP)</span>
          </div>

          <!-- Preview Card (shown when an image is present) -->
          <div class="image-preview-card ${hasImg ? 'has-image' : ''}" id="${inputId}_previewCard" style="${hasImg ? '' : 'display:none;'}">
            <img src="${displayImg}" class="preview-thumb-img" id="${inputId}_previewImg" alt="Preview" onerror="this.src='${placeholderImg}'">
            <div class="preview-info">
              <div class="preview-status" id="${inputId}_status">
                <span><i class="fa-solid fa-circle-check"></i></span> <span id="${inputId}_statusText">${hasImg ? 'Image Ready' : 'Selected'}</span>
              </div>
              <div class="preview-name" id="${inputId}_fileName">${val ? (val.startsWith('data:') ? 'Uploaded Device Image' : val.split('/').pop()) : 'No file selected'}</div>
              <div class="preview-meta" id="${inputId}_meta">Optimized for website display</div>
            </div>
            <div class="preview-actions">
              <button type="button" class="btn btn-sm btn-outline-primary" id="${inputId}_btnChange">Change</button>
              <button type="button" class="btn btn-sm btn-outline-danger" id="${inputId}_btnRemove">Remove</button>
            </div>
          </div>

          <!-- Optional URL fallback toggle -->
          <div>
            <button type="button" class="url-fallback-toggle" id="${inputId}_toggleUrl">
              <i class="fa-solid fa-link"></i> Or enter image URL / existing path manually
            </button>
            <div class="url-fallback-wrap" id="${inputId}_urlWrap">
              <input type="text" id="${inputId}_urlInput" class="form-control" placeholder="https://... or images/photo.jpg" value="${val.startsWith('data:') ? '' : val.replace(/"/g, '&quot;')}">
            </div>
          </div>
        </div>
      </div>
    `;
  }

  function initImagePicker(inputId) {
    const hiddenInput = document.getElementById(inputId);
    const fileInput = document.getElementById(inputId + '_file');
    const dropzone = document.getElementById(inputId + '_dropzone');
    const previewCard = document.getElementById(inputId + '_previewCard');
    const previewImg = document.getElementById(inputId + '_previewImg');
    const fileName = document.getElementById(inputId + '_fileName');
    const statusText = document.getElementById(inputId + '_statusText');
    const meta = document.getElementById(inputId + '_meta');
    const btnChange = document.getElementById(inputId + '_btnChange');
    const btnRemove = document.getElementById(inputId + '_btnRemove');
    const toggleUrl = document.getElementById(inputId + '_toggleUrl');
    const urlWrap = document.getElementById(inputId + '_urlWrap');
    const urlInput = document.getElementById(inputId + '_urlInput');

    if (!hiddenInput || !fileInput) return;

    function applyImage(dataUrl, name, details = '') {
      hiddenInput.value = dataUrl;
      previewImg.src = dataUrl;
      fileName.innerText = name || 'Uploaded Photo';
      statusText.innerText = 'Photo Attached';
      meta.innerText = details || 'Ready for website';
      dropzone.style.display = 'none';
      previewCard.style.display = 'flex';
      previewCard.classList.add('has-image');
      if (urlInput) urlInput.value = dataUrl.startsWith('data:') ? '' : dataUrl;
    }

    function clearImage() {
      hiddenInput.value = '';
      previewImg.src = '';
      dropzone.style.display = 'block';
      previewCard.style.display = 'none';
      previewCard.classList.remove('has-image');
      fileInput.value = '';
      if (urlInput) urlInput.value = '';
    }

    async function handleFile(file) {
      if (!file) return;
      if (!file.type.startsWith('image/')) {
        alert('Please select a valid image file (JPG, PNG, WebP).');
        return;
      }
      try {
        statusText.innerText = 'Optimizing photo...';
        const result = await compressImage(file, 1200, 900, 0.84);
        applyImage(result.dataUrl, result.name, `${result.width}x${result.height} px • ~${result.sizeKb} KB`);
        showToast('Photo uploaded and optimized successfully!');
      } catch (err) {
        alert('Could not load image: ' + err.message);
      }
    }

    if (dropzone) {
      dropzone.addEventListener('click', () => fileInput.click());
      dropzone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropzone.classList.add('dragover');
      });
      dropzone.addEventListener('dragleave', () => dropzone.classList.remove('dragover'));
      dropzone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropzone.classList.remove('dragover');
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
          handleFile(e.dataTransfer.files[0]);
        }
      });
    }

    fileInput.addEventListener('change', () => {
      if (fileInput.files && fileInput.files[0]) {
        handleFile(fileInput.files[0]);
      }
    });

    if (btnChange) {
      btnChange.addEventListener('click', () => fileInput.click());
    }

    if (btnRemove) {
      btnRemove.addEventListener('click', clearImage);
    }

    if (toggleUrl && urlWrap) {
      toggleUrl.addEventListener('click', () => {
        urlWrap.classList.toggle('open');
      });
    }

    if (urlInput) {
      urlInput.addEventListener('input', () => {
        const u = urlInput.value.trim();
        if (u) {
          applyImage(u, u.split('/').pop() || 'Remote Image', 'URL source');
        }
      });
    }
  }

  // ================= RENDER ENGINES =================

  function renderDashboard() {
    const news = DyfiDataStore.get(DYFI_DATA_KEYS.NEWS) || [];
    const campaigns = DyfiDataStore.get(DYFI_DATA_KEYS.CAMPAIGNS) || [];
    const statements = DyfiDataStore.get(DYFI_DATA_KEYS.STATEMENTS) || [];
    const martyrs = DyfiDataStore.get(DYFI_DATA_KEYS.MARTYRS) || [];
    const donors = DyfiDataStore.get(DYFI_DATA_KEYS.BLOOD_DONORS) || [];
    const messages = DyfiDataStore.get(DYFI_DATA_KEYS.MESSAGES) || [];
    const ticker = DyfiDataStore.get(DYFI_DATA_KEYS.TICKER) || [];
    const districts = DyfiDataStore.get(DYFI_DATA_KEYS.DISTRICTS) || [];

    document.getElementById('statNews').innerText = news.length;
    document.getElementById('statCampaigns').innerText = campaigns.length;
    document.getElementById('statStatements').innerText = statements.length;
    document.getElementById('statMartyrs').innerText = martyrs.length;
    document.getElementById('statDonors').innerText = donors.length;
    document.getElementById('statMessages').innerText = messages.length;
    document.getElementById('badgeMsgCount').innerText = messages.filter(m => m.status === 'Unread').length;

    const statDistricts = document.getElementById('statDistricts');
    if (statDistricts) statDistricts.innerText = districts.length;
    const badgeDistricts = document.getElementById('badgeDistrictsCount');
    if (badgeDistricts) badgeDistricts.innerText = districts.length;

    const activities = DyfiDataStore.get(DYFI_DATA_KEYS.ACTIVITIES) || [];
    const badgeActivities = document.getElementById('badgeActivitiesCount');
    if (badgeActivities) badgeActivities.innerText = activities.length;

    const statLeaders = document.getElementById('statLeaders');
    if (statLeaders) statLeaders.innerText = (DyfiDataStore.get(DYFI_DATA_KEYS.LEADERS) || []).length;

    const dashTickerList = document.getElementById('dashTickerList');
    dashTickerList.innerHTML = ticker.map(t => `
      <li class="ticker-preview-item">
        <strong>[EN]</strong> ${t.text_en}<br>
        <span style="color:#ef4444;"><strong>[KN]</strong> ${t.text_kn}</span>
      </li>
    `).join('');
  }

  function renderTicker() {
    const ticker = DyfiDataStore.get(DYFI_DATA_KEYS.TICKER) || [];
    const tbody = document.getElementById('tickerTableBody');
    tbody.innerHTML = ticker.map((t, idx) => `
      <tr>
        <td>${t.text_en}</td>
        <td>${t.text_kn}</td>
        <td>
          <div class="table-actions-cell">
            <button class="btn btn-table-action btn-outline-warning" onclick="editTicker(${idx})"><i class="fa-solid fa-pen-to-square"></i> Edit</button>
            <button class="btn btn-table-action btn-outline-danger" onclick="deleteTicker(${idx})"><i class="fa-solid fa-trash"></i> Delete</button>
          </div>
        </td>
      </tr>
    `).join('');
  }

  window.editTicker = function(index) {
    const ticker = DyfiDataStore.get(DYFI_DATA_KEYS.TICKER) || [];
    const item = ticker[index];
    if (!item) return;

    openModal('Edit Running Ticker Headline', `
      <form id="modalFormTickerEdit">
        <div class="form-group">
          <label class="form-label">Headline Text (English)</label>
          <textarea id="inpTickerEn" class="form-control" rows="2" required>${item.text_en || ''}</textarea>
        </div>
        <div class="form-group">
          <label class="form-label">Headline Text (ಕನ್ನಡ)</label>
          <textarea id="inpTickerKn" class="form-control" rows="2" required>${item.text_kn || ''}</textarea>
        </div>
        <button type="submit" class="btn btn-primary btn-block">Update Ticker Headline</button>
      </form>
    `);

    document.getElementById('modalFormTickerEdit').onsubmit = (e) => {
      e.preventDefault();
      item.text_en = document.getElementById('inpTickerEn').value.trim();
      item.text_kn = document.getElementById('inpTickerKn').value.trim();
      DyfiDataStore.set(DYFI_DATA_KEYS.TICKER, ticker);
      closeModal();
      renderTicker();
      renderDashboard();
      showToast('Ticker updated successfully');
    };
  };

  window.deleteTicker = function(index) {
    if (confirm('Delete this ticker headline?')) {
      const ticker = DyfiDataStore.get(DYFI_DATA_KEYS.TICKER) || [];
      ticker.splice(index, 1);
      DyfiDataStore.set(DYFI_DATA_KEYS.TICKER, ticker);
      renderTicker();
      renderDashboard();
      showToast('Ticker headline removed');
    }
  };

  document.getElementById('btnOpenAddTicker').addEventListener('click', () => {
    openModal('Add Running Ticker Headline', `
      <form id="modalFormTicker">
        <div class="form-group">
          <label class="form-label">Headline Text (English)</label>
          <textarea id="inpTickerEn" class="form-control" rows="2" required placeholder="Statewide youth rally..."></textarea>
        </div>
        <div class="form-group">
          <label class="form-label">Headline Text (ಕನ್ನಡ)</label>
          <textarea id="inpTickerKn" class="form-control" rows="2" required placeholder="ರಾಜ್ಯಮಟ್ಟದ ಯುವಜನ ಜಾಥಾ..."></textarea>
        </div>
        <button type="submit" class="btn btn-primary btn-block">Add to Live Ticker</button>
      </form>
    `);

    document.getElementById('modalFormTicker').onsubmit = (e) => {
      e.preventDefault();
      const ticker = DyfiDataStore.get(DYFI_DATA_KEYS.TICKER) || [];
      ticker.push({
        id: 't_' + Date.now(),
        text_en: document.getElementById('inpTickerEn').value.trim(),
        text_kn: document.getElementById('inpTickerKn').value.trim(),
        active: true
      });
      DyfiDataStore.set(DYFI_DATA_KEYS.TICKER, ticker);
      closeModal();
      renderTicker();
      renderDashboard();
      showToast('Ticker added successfully');
    };
  });

  // Site Content
  function renderSiteContent() {
    const sc = DyfiDataStore.get(DYFI_DATA_KEYS.SITE_CONTENT) || {};
    document.getElementById('scHeroTitleEn').value = sc.heroTitle_en || '';
    document.getElementById('scHeroTitleKn').value = sc.heroTitle_kn || '';
    document.getElementById('scHeroSubEn').value = sc.heroSub_en || '';
    document.getElementById('scHeroSubKn').value = sc.heroSub_kn || '';
    document.getElementById('scQuoteEn').value = sc.quoteText_en || '';
    document.getElementById('scQuoteKn').value = sc.quoteText_kn || '';
    document.getElementById('scAddressEn').value = sc.officeAddress_en || '';
    document.getElementById('scAddressKn').value = sc.officeAddress_kn || '';
    document.getElementById('scPhone1').value = sc.phone1 || '';
    document.getElementById('scPhone2').value = sc.phone2 || '';
    document.getElementById('scEmail').value = sc.email || '';
    document.getElementById('scSocialFb').value = sc.socialFb || '';
    document.getElementById('scSocialInsta').value = sc.socialInsta || '';
    document.getElementById('scSocialYt').value = sc.socialYt || '';
    document.getElementById('scSocialX').value = sc.socialX || '';

    // Video Streams Showcase
    const vTEn = document.getElementById('scVideoTitleEn');
    const vTKn = document.getElementById('scVideoTitleKn');
    const vSEn = document.getElementById('scVideoSubEn');
    const vSKn = document.getElementById('scVideoSubKn');
    const vThumb = document.getElementById('scVideoThumb');
    const vUrl = document.getElementById('scVideoUrl');

    if (vTEn) vTEn.value = sc.videoTitle_en || '';
    if (vTKn) vTKn.value = sc.videoTitle_kn || '';
    if (vSEn) vSEn.value = sc.videoSub_en || '';
    if (vSKn) vSKn.value = sc.videoSub_kn || '';
    if (vThumb) vThumb.value = sc.videoThumb || 'images/hero-banner-1.jpg';
    if (vUrl) vUrl.value = sc.videoUrl || '';
  }

  document.getElementById('formSiteContent').addEventListener('submit', (e) => {
    e.preventDefault();
    const sc = {
      heroTitle_en: document.getElementById('scHeroTitleEn').value.trim(),
      heroTitle_kn: document.getElementById('scHeroTitleKn').value.trim(),
      heroSub_en: document.getElementById('scHeroSubEn').value.trim(),
      heroSub_kn: document.getElementById('scHeroSubKn').value.trim(),
      quoteText_en: document.getElementById('scQuoteEn').value.trim(),
      quoteText_kn: document.getElementById('scQuoteKn').value.trim(),
      quoteAuthor: 'Comrade Che Guevara',
      officeAddress_en: document.getElementById('scAddressEn').value.trim(),
      officeAddress_kn: document.getElementById('scAddressKn').value.trim(),
      phone1: document.getElementById('scPhone1').value.trim(),
      phone2: document.getElementById('scPhone2').value.trim(),
      landline: '+91 80 2287 4521',
      email: document.getElementById('scEmail').value.trim(),
      socialFb: document.getElementById('scSocialFb').value.trim(),
      socialInsta: document.getElementById('scSocialInsta').value.trim(),
      socialYt: document.getElementById('scSocialYt').value.trim(),
      socialX: document.getElementById('scSocialX').value.trim(),
      videoTitle_en: document.getElementById('scVideoTitleEn') ? document.getElementById('scVideoTitleEn').value.trim() : '',
      videoTitle_kn: document.getElementById('scVideoTitleKn') ? document.getElementById('scVideoTitleKn').value.trim() : '',
      videoSub_en: document.getElementById('scVideoSubEn') ? document.getElementById('scVideoSubEn').value.trim() : '',
      videoSub_kn: document.getElementById('scVideoSubKn') ? document.getElementById('scVideoSubKn').value.trim() : '',
      videoThumb: document.getElementById('scVideoThumb') ? document.getElementById('scVideoThumb').value.trim() : 'images/hero-banner-1.jpg',
      videoUrl: document.getElementById('scVideoUrl') ? document.getElementById('scVideoUrl').value.trim() : ''
    };
    DyfiDataStore.set(DYFI_DATA_KEYS.SITE_CONTENT, sc);
    const status = document.getElementById('scSaveStatus');
    status.innerHTML = '<i class="fa-solid fa-circle-check" style="color:#22c55e;"></i> Saved! Changes are live on the website.';
    setTimeout(() => { status.innerHTML = ''; }, 3500);
    showToast('Global Site Content Updated Successfully!');
  });

  // News Manager
  function renderNews() {
    const news = DyfiDataStore.get(DYFI_DATA_KEYS.NEWS) || [];
    const tbody = document.getElementById('newsTableBody');
    tbody.innerHTML = news.map((n, idx) => `
      <tr>
        <td><img src="${n.image || 'images/hero-banner-1.jpg'}" class="table-thumb" alt="News" onerror="this.src='images/hero-banner-1.jpg'"></td>
        <td>
          <strong>${n.title_en}</strong><br>
          <span style="color:#f87171; font-size:0.85rem;">${n.title_kn}</span>
        </td>
        <td><span class="badge-tag">${n.category}</span></td>
        <td>${n.date}</td>
        <td>
          <div class="table-actions-cell">
            <button class="btn btn-table-action btn-outline-warning" onclick="editNews(${idx})"><i class="fa-solid fa-pen-to-square"></i> Edit</button>
            <button class="btn btn-table-action btn-outline-danger" onclick="deleteNews(${idx})"><i class="fa-solid fa-trash"></i> Delete</button>
          </div>
        </td>
      </tr>
    `).join('');
  }

  window.editNews = function(index) {
    const news = DyfiDataStore.get(DYFI_DATA_KEYS.NEWS) || [];
    const item = news[index];
    if (!item) return;

    openModal('Edit News Article', `
      <form id="modalFormNewsEdit">
        <div class="form-group">
          <label class="form-label">Headline (English)</label>
          <input type="text" id="inpNewsTitleEn" class="form-control" required value="${(item.title_en || '').replace(/"/g, '&quot;')}">
        </div>
        <div class="form-group">
          <label class="form-label">Headline (ಕನ್ನಡ)</label>
          <input type="text" id="inpNewsTitleKn" class="form-control" required value="${(item.title_kn || '').replace(/"/g, '&quot;')}">
        </div>
        <div class="form-row">
          <div class="form-group col-6">
            <label class="form-label">Category</label>
            <input type="text" id="inpNewsCat" class="form-control" required value="${(item.category || '').replace(/"/g, '&quot;')}">
          </div>
          <div class="form-group col-6">
            <label class="form-label">Date</label>
            <input type="date" id="inpNewsDate" class="form-control" required value="${item.date || ''}">
          </div>
        </div>
        ${renderImagePickerHTML('inpNewsImg', 'News Article Image (ಚಿತ್ರ ಆಯ್ಕೆಮಾಡಿ)', item.image || '', 'images/hero-banner-1.jpg')}
        <div class="form-group">
          <label class="form-label">Description (English)</label>
          <textarea id="inpNewsDescEn" class="form-control" rows="3" required>${item.desc_en || ''}</textarea>
        </div>
        <div class="form-group">
          <label class="form-label">Description (ಕನ್ನಡ)</label>
          <textarea id="inpNewsDescKn" class="form-control" rows="3" required>${item.desc_kn || ''}</textarea>
        </div>
        <button type="submit" class="btn btn-primary btn-block">Update News Article</button>
      </form>
    `);

    initImagePicker('inpNewsImg');

    document.getElementById('modalFormNewsEdit').onsubmit = (e) => {
      e.preventDefault();
      item.title_en = document.getElementById('inpNewsTitleEn').value.trim();
      item.title_kn = document.getElementById('inpNewsTitleKn').value.trim();
      item.category = document.getElementById('inpNewsCat').value.trim();
      item.date = document.getElementById('inpNewsDate').value;
      item.image = document.getElementById('inpNewsImg').value.trim() || 'images/hero-banner-1.jpg';
      item.desc_en = document.getElementById('inpNewsDescEn').value.trim();
      item.desc_kn = document.getElementById('inpNewsDescKn').value.trim();

      DyfiDataStore.set(DYFI_DATA_KEYS.NEWS, news);
      closeModal();
      renderNews();
      renderDashboard();
      showToast('News article updated successfully');
    };
  };

  window.deleteNews = function(index) {
    if (confirm('Delete this news item?')) {
      const news = DyfiDataStore.get(DYFI_DATA_KEYS.NEWS) || [];
      news.splice(index, 1);
      DyfiDataStore.set(DYFI_DATA_KEYS.NEWS, news);
      renderNews();
      renderDashboard();
      showToast('News article deleted');
    }
  };

  document.getElementById('btnOpenAddNews').addEventListener('click', () => {
    openModal('Publish News Article', `
      <form id="modalFormNews">
        <div class="form-group">
          <label class="form-label">Headline (English)</label>
          <input type="text" id="inpNewsTitleEn" class="form-control" required placeholder="Enter headline in English">
        </div>
        <div class="form-group">
          <label class="form-label">Headline (ಕನ್ನಡ)</label>
          <input type="text" id="inpNewsTitleKn" class="form-control" required placeholder="ಕನ್ನಡ ಶೀರ್ಷಿಕೆ ನಮೂದಿಸಿ">
        </div>
        <div class="form-row">
          <div class="form-group col-6">
            <label class="form-label">Category</label>
            <input type="text" id="inpNewsCat" class="form-control" placeholder="Convention / Protest / Youth" required>
          </div>
          <div class="form-group col-6">
            <label class="form-label">Date</label>
            <input type="date" id="inpNewsDate" class="form-control" required value="${new Date().toISOString().split('T')[0]}">
          </div>
        </div>
        ${renderImagePickerHTML('inpNewsImg', 'News Article Image (ಚಿತ್ರ ಆಯ್ಕೆಮಾಡಿ)', '', 'images/hero-banner-1.jpg')}
        <div class="form-group">
          <label class="form-label">Description (English)</label>
          <textarea id="inpNewsDescEn" class="form-control" rows="2" required></textarea>
        </div>
        <div class="form-group">
          <label class="form-label">Description (ಕನ್ನಡ)</label>
          <textarea id="inpNewsDescKn" class="form-control" rows="2" required></textarea>
        </div>
        <button type="submit" class="btn btn-primary btn-block">Publish to Website</button>
      </form>
    `);

    initImagePicker('inpNewsImg');

    document.getElementById('modalFormNews').onsubmit = (e) => {
      e.preventDefault();
      const news = DyfiDataStore.get(DYFI_DATA_KEYS.NEWS) || [];
      news.unshift({
        id: 'n_' + Date.now(),
        title_en: document.getElementById('inpNewsTitleEn').value.trim(),
        title_kn: document.getElementById('inpNewsTitleKn').value.trim(),
        category: document.getElementById('inpNewsCat').value.trim(),
        date: document.getElementById('inpNewsDate').value,
        image: document.getElementById('inpNewsImg').value.trim() || 'images/hero-banner-1.jpg',
        desc_en: document.getElementById('inpNewsDescEn').value.trim(),
        desc_kn: document.getElementById('inpNewsDescKn').value.trim()
      });
      DyfiDataStore.set(DYFI_DATA_KEYS.NEWS, news);
      closeModal();
      renderNews();
      renderDashboard();
      showToast('News published successfully');
    };
  });

  // Activities Manager
  function renderActivities() {
    const list = DyfiDataStore.get(DYFI_DATA_KEYS.ACTIVITIES) || [];
    const tbody = document.getElementById('activitiesTableBody');
    if (!tbody) return;
    const badgeCount = document.getElementById('badgeActivitiesCount');
    if (badgeCount) badgeCount.innerText = list.length;

    tbody.innerHTML = list.map((a, idx) => `
      <tr>
        <td>
          <strong>${a.title_en}</strong><br>
          <span style="color:#f87171; font-size:0.85rem;">${a.title_kn}</span>
        </td>
        <td><span class="badge-tag">${a.badge || 'Activity'}</span></td>
        <td>${a.date || '2026-08-01'}</td>
        <td><img src="${a.image || 'images/hero-banner-2.jpg'}" class="table-thumb" alt="Activity" onerror="this.src='images/hero-banner-2.jpg'"></td>
        <td>
          <div class="table-actions-cell">
            <button class="btn btn-table-action btn-outline-warning" onclick="editActivity(${idx})"><i class="fa-solid fa-pen-to-square"></i> Edit</button>
            <button class="btn btn-table-action btn-outline-danger" onclick="deleteActivity(${idx})"><i class="fa-solid fa-trash"></i> Delete</button>
          </div>
        </td>
      </tr>
    `).join('');
  }

  window.editActivity = function(index) {
    const list = DyfiDataStore.get(DYFI_DATA_KEYS.ACTIVITIES) || [];
    const item = list[index];
    if (!item) return;

    openModal('Edit Recent Activity', `
      <form id="modalFormActivityEdit">
        <div class="form-group">
          <label class="form-label">Activity Title (English)</label>
          <input type="text" id="inpActTitleEn" class="form-control" required value="${(item.title_en || '').replace(/"/g, '&quot;')}">
        </div>
        <div class="form-group">
          <label class="form-label">Activity Title (ಕನ್ನಡ)</label>
          <input type="text" id="inpActTitleKn" class="form-control" required value="${(item.title_kn || '').replace(/"/g, '&quot;')}">
        </div>
        <div class="form-row">
          <div class="form-group col-6">
            <label class="form-label">Badge Tag (e.g. Activity, Convention, Relief)</label>
            <input type="text" id="inpActBadge" class="form-control" required value="${(item.badge || 'Activity').replace(/"/g, '&quot;')}">
          </div>
          <div class="form-group col-6">
            <label class="form-label">Event Date</label>
            <input type="date" id="inpActDate" class="form-control" required value="${item.date || '2026-08-01'}">
          </div>
        </div>
        ${renderImagePickerHTML('inpActImg', 'Activity Thumbnail Photo', item.image || 'images/hero-banner-2.jpg')}
        <div class="form-group">
          <label class="form-label">Short Summary (English)</label>
          <textarea id="inpActDescEn" class="form-control" rows="2" required>${item.desc_en || ''}</textarea>
        </div>
        <div class="form-group">
          <label class="form-label">Short Summary (ಕನ್ನಡ)</label>
          <textarea id="inpActDescKn" class="form-control" rows="2" required>${item.desc_kn || ''}</textarea>
        </div>
        <div class="form-group">
          <label class="form-label">Full Details (English - Optional)</label>
          <textarea id="inpActFullEn" class="form-control" rows="3">${item.full_en || ''}</textarea>
        </div>
        <div class="form-group">
          <label class="form-label">Full Details (ಕನ್ನಡ - Optional)</label>
          <textarea id="inpActFullKn" class="form-control" rows="3">${item.full_kn || ''}</textarea>
        </div>
        <button type="submit" class="btn btn-primary btn-block">Update Activity</button>
      </form>
    `);

    initImagePicker('inpActImg');

    document.getElementById('modalFormActivityEdit').onsubmit = (e) => {
      e.preventDefault();
      item.title_en = document.getElementById('inpActTitleEn').value.trim();
      item.title_kn = document.getElementById('inpActTitleKn').value.trim();
      item.badge = document.getElementById('inpActBadge').value.trim() || 'Activity';
      item.date = document.getElementById('inpActDate').value;
      item.image = document.getElementById('inpActImg').value.trim() || 'images/hero-banner-2.jpg';
      item.desc_en = document.getElementById('inpActDescEn').value.trim();
      item.desc_kn = document.getElementById('inpActDescKn').value.trim();
      item.full_en = document.getElementById('inpActFullEn').value.trim();
      item.full_kn = document.getElementById('inpActFullKn').value.trim();

      DyfiDataStore.set(DYFI_DATA_KEYS.ACTIVITIES, list);
      closeModal();
      renderActivities();
      showToast('Activity updated successfully');
    };
  };

  window.deleteActivity = function(index) {
    if (confirm('Are you sure you want to delete this activity?')) {
      const list = DyfiDataStore.get(DYFI_DATA_KEYS.ACTIVITIES) || [];
      list.splice(index, 1);
      DyfiDataStore.set(DYFI_DATA_KEYS.ACTIVITIES, list);
      renderActivities();
      showToast('Activity deleted');
    }
  };

  const btnOpenAddActivity = document.getElementById('btnOpenAddActivity');
  if (btnOpenAddActivity) {
    btnOpenAddActivity.addEventListener('click', () => {
      openModal('Add New Recent Activity', `
        <form id="modalFormActivityAdd">
          <div class="form-group">
            <label class="form-label">Activity Title (English)</label>
            <input type="text" id="inpActTitleEn" class="form-control" required placeholder="e.g. State Youth Convention">
          </div>
          <div class="form-group">
            <label class="form-label">Activity Title (ಕನ್ನಡ)</label>
            <input type="text" id="inpActTitleKn" class="form-control" required placeholder="ಉದಾ: ರಾಜ್ಯ ಮಟ್ಟದ ಯುವ ಸಮಾವೇಶ">
          </div>
          <div class="form-row">
            <div class="form-group col-6">
              <label class="form-label">Badge Tag</label>
              <input type="text" id="inpActBadge" class="form-control" value="Activity" required>
            </div>
            <div class="form-group col-6">
              <label class="form-label">Event Date</label>
              <input type="date" id="inpActDate" class="form-control" required value="${new Date().toISOString().split('T')[0]}">
            </div>
          </div>
          ${renderImagePickerHTML('inpActImg', 'Activity Thumbnail Photo', 'images/hero-banner-2.jpg')}
          <div class="form-group">
            <label class="form-label">Short Summary (English)</label>
            <textarea id="inpActDescEn" class="form-control" rows="2" required placeholder="Brief summary for homepage card..."></textarea>
          </div>
          <div class="form-group">
            <label class="form-label">Short Summary (ಕನ್ನಡ)</label>
            <textarea id="inpActDescKn" class="form-control" rows="2" required placeholder="ಮುಖಪುಟದ ಕಾರ್ಡ್‌ಗೆ ಸಣ್ಣ ವಿವರಣೆ..."></textarea>
          </div>
          <div class="form-group">
            <label class="form-label">Full Details (English - Optional)</label>
            <textarea id="inpActFullEn" class="form-control" rows="3" placeholder="Full comprehensive article or convention minutes..."></textarea>
          </div>
          <div class="form-group">
            <label class="form-label">Full Details (ಕನ್ನಡ - Optional)</label>
            <textarea id="inpActFullKn" class="form-control" rows="3" placeholder="ಸಮಗ್ರ ವಿವರಣೆ ಅಥವಾ ಸಮಾವೇಶದ ವರದಿ..."></textarea>
          </div>
          <button type="submit" class="btn btn-primary btn-block">Publish Activity</button>
        </form>
      `);

      initImagePicker('inpActImg');

      document.getElementById('modalFormActivityAdd').onsubmit = (e) => {
        e.preventDefault();
        const list = DyfiDataStore.get(DYFI_DATA_KEYS.ACTIVITIES) || [];
        list.unshift({
          id: 'act_' + Date.now(),
          title_en: document.getElementById('inpActTitleEn').value.trim(),
          title_kn: document.getElementById('inpActTitleKn').value.trim(),
          badge: document.getElementById('inpActBadge').value.trim() || 'Activity',
          date: document.getElementById('inpActDate').value,
          image: document.getElementById('inpActImg').value.trim() || 'images/hero-banner-2.jpg',
          desc_en: document.getElementById('inpActDescEn').value.trim(),
          desc_kn: document.getElementById('inpActDescKn').value.trim(),
          full_en: document.getElementById('inpActFullEn').value.trim(),
          full_kn: document.getElementById('inpActFullKn').value.trim()
        });
        DyfiDataStore.set(DYFI_DATA_KEYS.ACTIVITIES, list);
        closeModal();
        renderActivities();
        showToast('Activity published successfully');
      };
    });
  }

  // Campaigns
  function renderCampaigns() {
    const list = DyfiDataStore.get(DYFI_DATA_KEYS.CAMPAIGNS) || [];
    const tbody = document.getElementById('campaignsTableBody');
    tbody.innerHTML = list.map((c, idx) => `
      <tr>
        <td>
          <strong>${c.title_en}</strong><br>
          <span style="color:#f87171; font-size:0.85rem;">${c.title_kn}</span>
        </td>
        <td><span class="badge-tag">${c.category}</span></td>
        <td>
          <div style="background:#1e293b; border-radius:4px; height:8px; width:100%; overflow:hidden; margin-bottom:4px;">
            <div style="background:#dc2626; height:100%; width:${c.progress || 50}%;"></div>
          </div>
          <small>${c.progress || 50}% Mobilized</small>
        </td>
        <td><span class="badge-status-active">${c.status || 'Active'}</span></td>
        <td>
          <div class="table-actions-cell">
            <button class="btn btn-table-action btn-outline-warning" onclick="editCampaign(${idx})"><i class="fa-solid fa-pen-to-square"></i> Edit</button>
            <button class="btn btn-table-action btn-outline-danger" onclick="deleteCampaign(${idx})"><i class="fa-solid fa-trash"></i> Delete</button>
          </div>
        </td>
      </tr>
    `).join('');
  }

  window.editCampaign = function(index) {
    const list = DyfiDataStore.get(DYFI_DATA_KEYS.CAMPAIGNS) || [];
    const item = list[index];
    if (!item) return;

    openModal('Edit Statewide Campaign', `
      <form id="modalFormCampaignEdit">
        <div class="form-group">
          <label class="form-label">Campaign Title (English)</label>
          <input type="text" id="inpCampTitleEn" class="form-control" required value="${(item.title_en || '').replace(/"/g, '&quot;')}">
        </div>
        <div class="form-group">
          <label class="form-label">Campaign Title (ಕನ್ನಡ)</label>
          <input type="text" id="inpCampTitleKn" class="form-control" required value="${(item.title_kn || '').replace(/"/g, '&quot;')}">
        </div>
        <div class="form-row">
          <div class="form-group col-6">
            <label class="form-label">Category</label>
            <input type="text" id="inpCampCat" class="form-control" required value="${(item.category || '').replace(/"/g, '&quot;')}">
          </div>
          <div class="form-group col-6">
            <label class="form-label">Mobilization Progress (%)</label>
            <input type="number" id="inpCampProg" class="form-control" min="1" max="100" value="${item.progress || 75}" required>
          </div>
        </div>
        <div class="form-group">
          <label class="form-label">Description (English)</label>
          <textarea id="inpCampDescEn" class="form-control" rows="3" required>${item.desc_en || ''}</textarea>
        </div>
        <div class="form-group">
          <label class="form-label">Description (ಕನ್ನಡ)</label>
          <textarea id="inpCampDescKn" class="form-control" rows="3" required>${item.desc_kn || ''}</textarea>
        </div>
        <button type="submit" class="btn btn-primary btn-block">Update Campaign</button>
      </form>
    `);

    document.getElementById('modalFormCampaignEdit').onsubmit = (e) => {
      e.preventDefault();
      item.title_en = document.getElementById('inpCampTitleEn').value.trim();
      item.title_kn = document.getElementById('inpCampTitleKn').value.trim();
      item.category = document.getElementById('inpCampCat').value.trim();
      item.progress = parseInt(document.getElementById('inpCampProg').value);
      item.desc_en = document.getElementById('inpCampDescEn').value.trim();
      item.desc_kn = document.getElementById('inpCampDescKn').value.trim();

      DyfiDataStore.set(DYFI_DATA_KEYS.CAMPAIGNS, list);
      closeModal();
      renderCampaigns();
      renderDashboard();
      showToast('Campaign updated successfully');
    };
  };

  window.deleteCampaign = function(index) {
    if (confirm('Delete this campaign?')) {
      const list = DyfiDataStore.get(DYFI_DATA_KEYS.CAMPAIGNS) || [];
      list.splice(index, 1);
      DyfiDataStore.set(DYFI_DATA_KEYS.CAMPAIGNS, list);
      renderCampaigns();
      renderDashboard();
      showToast('Campaign deleted');
    }
  };

  document.getElementById('btnOpenAddCampaign').addEventListener('click', () => {
    openModal('Launch Statewide Campaign', `
      <form id="modalFormCampaign">
        <div class="form-group">
          <label class="form-label">Campaign Title (English)</label>
          <input type="text" id="inpCampTitleEn" class="form-control" required placeholder="Youth Rights Campaign">
        </div>
        <div class="form-group">
          <label class="form-label">Campaign Title (ಕನ್ನಡ)</label>
          <input type="text" id="inpCampTitleKn" class="form-control" required placeholder="ಯುವ ಹಕ್ಕುಗಳ ಅಭಿಯಾನ">
        </div>
        <div class="form-row">
          <div class="form-group col-6">
            <label class="form-label">Category</label>
            <input type="text" id="inpCampCat" class="form-control" required placeholder="Employment / Education">
          </div>
          <div class="form-group col-6">
            <label class="form-label">Mobilization Progress (%)</label>
            <input type="number" id="inpCampProg" class="form-control" min="1" max="100" value="75" required>
          </div>
        </div>
        <div class="form-group">
          <label class="form-label">Description (English)</label>
          <textarea id="inpCampDescEn" class="form-control" rows="2" required></textarea>
        </div>
        <div class="form-group">
          <label class="form-label">Description (ಕನ್ನಡ)</label>
          <textarea id="inpCampDescKn" class="form-control" rows="2" required></textarea>
        </div>
        <button type="submit" class="btn btn-primary btn-block">Launch Campaign</button>
      </form>
    `);

    document.getElementById('modalFormCampaign').onsubmit = (e) => {
      e.preventDefault();
      const list = DyfiDataStore.get(DYFI_DATA_KEYS.CAMPAIGNS) || [];
      list.push({
        id: 'c_' + Date.now(),
        title_en: document.getElementById('inpCampTitleEn').value.trim(),
        title_kn: document.getElementById('inpCampTitleKn').value.trim(),
        category: document.getElementById('inpCampCat').value.trim(),
        progress: parseInt(document.getElementById('inpCampProg').value),
        desc_en: document.getElementById('inpCampDescEn').value.trim(),
        desc_kn: document.getElementById('inpCampDescKn').value.trim(),
        status: 'Active'
      });
      DyfiDataStore.set(DYFI_DATA_KEYS.CAMPAIGNS, list);
      closeModal();
      renderCampaigns();
      renderDashboard();
      showToast('Campaign added');
    };
  });

  // Statements
  function renderStatements() {
    const list = DyfiDataStore.get(DYFI_DATA_KEYS.STATEMENTS) || [];
    const tbody = document.getElementById('statementsTableBody');
    tbody.innerHTML = list.map((s, idx) => `
      <tr>
        <td><code>${s.refNo || 'DYFI-KAR'}</code></td>
        <td>
          <strong>${s.title_en}</strong><br>
          <span style="color:#f87171; font-size:0.85rem;">${s.title_kn}</span>
        </td>
        <td><span class="badge-tag">${s.category}</span></td>
        <td>${s.date}</td>
        <td>
          <div class="table-actions-cell">
            <button class="btn btn-table-action btn-outline-warning" onclick="editStatement(${idx})"><i class="fa-solid fa-pen-to-square"></i> Edit</button>
            <button class="btn btn-table-action btn-outline-danger" onclick="deleteStatement(${idx})"><i class="fa-solid fa-trash"></i> Delete</button>
          </div>
        </td>
      </tr>
    `).join('');
  }

  window.editStatement = function(index) {
    const list = DyfiDataStore.get(DYFI_DATA_KEYS.STATEMENTS) || [];
    const item = list[index];
    if (!item) return;

    openModal('Edit Press Statement', `
      <form id="modalFormStatementEdit">
        <div class="form-group">
          <label class="form-label">Reference Number</label>
          <input type="text" id="inpStRef" class="form-control" required value="${(item.refNo || '').replace(/"/g, '&quot;')}">
        </div>
        <div class="form-group">
          <label class="form-label">Statement Title (English)</label>
          <input type="text" id="inpStTitleEn" class="form-control" required value="${(item.title_en || '').replace(/"/g, '&quot;')}">
        </div>
        <div class="form-group">
          <label class="form-label">Statement Title (ಕನ್ನಡ)</label>
          <input type="text" id="inpStTitleKn" class="form-control" required value="${(item.title_kn || '').replace(/"/g, '&quot;')}">
        </div>
        <div class="form-row">
          <div class="form-group col-6">
            <label class="form-label">Category</label>
            <input type="text" id="inpStCat" class="form-control" required value="${(item.category || '').replace(/"/g, '&quot;')}">
          </div>
          <div class="form-group col-6">
            <label class="form-label">Release Date</label>
            <input type="date" id="inpStDate" class="form-control" required value="${item.date || ''}">
          </div>
        </div>
        <button type="submit" class="btn btn-primary btn-block">Update Statement</button>
      </form>
    `);

    document.getElementById('modalFormStatementEdit').onsubmit = (e) => {
      e.preventDefault();
      item.refNo = document.getElementById('inpStRef').value.trim();
      item.title_en = document.getElementById('inpStTitleEn').value.trim();
      item.title_kn = document.getElementById('inpStTitleKn').value.trim();
      item.category = document.getElementById('inpStCat').value.trim();
      item.date = document.getElementById('inpStDate').value;

      DyfiDataStore.set(DYFI_DATA_KEYS.STATEMENTS, list);
      closeModal();
      renderStatements();
      renderDashboard();
      showToast('Statement updated successfully');
    };
  };

  window.deleteStatement = function(index) {
    if (confirm('Delete this statement?')) {
      const list = DyfiDataStore.get(DYFI_DATA_KEYS.STATEMENTS) || [];
      list.splice(index, 1);
      DyfiDataStore.set(DYFI_DATA_KEYS.STATEMENTS, list);
      renderStatements();
      renderDashboard();
      showToast('Statement removed');
    }
  };

  document.getElementById('btnOpenAddStatement').addEventListener('click', () => {
    openModal('Publish Press Statement', `
      <form id="modalFormStatement">
        <div class="form-group">
          <label class="form-label">Reference Number</label>
          <input type="text" id="inpStRef" class="form-control" value="DYFI-KAR-ST-2026/${Math.floor(Math.random()*90)+10}" required>
        </div>
        <div class="form-group">
          <label class="form-label">Statement Title (English)</label>
          <input type="text" id="inpStTitleEn" class="form-control" required>
        </div>
        <div class="form-group">
          <label class="form-label">Statement Title (ಕನ್ನಡ)</label>
          <input type="text" id="inpStTitleKn" class="form-control" required>
        </div>
        <div class="form-row">
          <div class="form-group col-6">
            <label class="form-label">Category</label>
            <input type="text" id="inpStCat" class="form-control" value="Press Release" required>
          </div>
          <div class="form-group col-6">
            <label class="form-label">Release Date</label>
            <input type="date" id="inpStDate" class="form-control" value="${new Date().toISOString().split('T')[0]}" required>
          </div>
        </div>
        <button type="submit" class="btn btn-primary btn-block">Publish Statement</button>
      </form>
    `);

    document.getElementById('modalFormStatement').onsubmit = (e) => {
      e.preventDefault();
      const list = DyfiDataStore.get(DYFI_DATA_KEYS.STATEMENTS) || [];
      list.unshift({
        id: 'st_' + Date.now(),
        refNo: document.getElementById('inpStRef').value.trim(),
        title_en: document.getElementById('inpStTitleEn').value.trim(),
        title_kn: document.getElementById('inpStTitleKn').value.trim(),
        category: document.getElementById('inpStCat').value.trim(),
        date: document.getElementById('inpStDate').value,
        fileUrl: '#'
      });
      DyfiDataStore.set(DYFI_DATA_KEYS.STATEMENTS, list);
      closeModal();
      renderStatements();
      renderDashboard();
      showToast('Statement published');
    };
  });

  // Martyrs
  function renderMartyrs() {
    const list = DyfiDataStore.get(DYFI_DATA_KEYS.MARTYRS) || [];
    const tbody = document.getElementById('martyrsTableBody');
    tbody.innerHTML = list.map((m, idx) => `
      <tr>
        <td><img src="${m.photo || 'images/shivappa.jpg'}" class="table-avatar" alt="Martyr" onerror="this.src='images/shivappa.jpg'"></td>
        <td>
          <strong>${m.name_en}</strong><br>
          <span style="color:#ef4444;">${m.name_kn}</span>
        </td>
        <td>${m.date}</td>
        <td>${m.district}</td>
        <td>
          <div class="table-actions-cell">
            <button class="btn btn-table-action btn-outline-warning" onclick="editMartyr(${idx})"><i class="fa-solid fa-pen-to-square"></i> Edit</button>
            <button class="btn btn-table-action btn-outline-danger" onclick="deleteMartyr(${idx})"><i class="fa-solid fa-trash"></i> Delete</button>
          </div>
        </td>
      </tr>
    `).join('');
  }

  window.editMartyr = function(index) {
    const list = DyfiDataStore.get(DYFI_DATA_KEYS.MARTYRS) || [];
    const item = list[index];
    if (!item) return;

    openModal('Edit Martyr Memorial Record', `
      <form id="modalFormMartyrEdit">
        <div class="form-row">
          <div class="form-group col-6">
            <label class="form-label">Comrade Name (English)</label>
            <input type="text" id="inpMNameEn" class="form-control" required value="${(item.name_en || '').replace(/"/g, '&quot;')}">
          </div>
          <div class="form-group col-6">
            <label class="form-label">Comrade Name (ಕನ್ನಡ)</label>
            <input type="text" id="inpMNameKn" class="form-control" required value="${(item.name_kn || '').replace(/"/g, '&quot;')}">
          </div>
        </div>
        <div class="form-row">
          <div class="form-group col-6">
            <label class="form-label">Martyrdom Year / Date</label>
            <input type="text" id="inpMDate" class="form-control" required value="${(item.date || '').replace(/"/g, '&quot;')}">
          </div>
          <div class="form-group col-6">
            <label class="form-label">District / Region</label>
            <input type="text" id="inpMDistrict" class="form-control" required value="${(item.district || '').replace(/"/g, '&quot;')}">
          </div>
        </div>
        ${renderImagePickerHTML('inpMPhoto', 'Comrade Memorial Photo (ಭಾವಚಿತ್ರ ಆಯ್ಕೆಮಾಡಿ)', item.photo || '', 'images/shivappa.jpg')}
        <div class="form-group">
          <label class="form-label">Tribute Bio (English)</label>
          <textarea id="inpMTribEn" class="form-control" rows="2" required>${item.tribute_en || ''}</textarea>
        </div>
        <div class="form-group">
          <label class="form-label">Tribute Bio (ಕನ್ನಡ)</label>
          <textarea id="inpMTribKn" class="form-control" rows="2" required>${item.tribute_kn || ''}</textarea>
        </div>
        <button type="submit" class="btn btn-primary btn-block">Update Martyr Memorial Record</button>
      </form>
    `);

    initImagePicker('inpMPhoto');

    document.getElementById('modalFormMartyrEdit').onsubmit = (e) => {
      e.preventDefault();
      item.name_en = document.getElementById('inpMNameEn').value.trim();
      item.name_kn = document.getElementById('inpMNameKn').value.trim();
      item.date = document.getElementById('inpMDate').value.trim();
      item.district = document.getElementById('inpMDistrict').value.trim();
      item.photo = document.getElementById('inpMPhoto').value.trim() || 'images/shivappa.jpg';
      item.tribute_en = document.getElementById('inpMTribEn').value.trim();
      item.tribute_kn = document.getElementById('inpMTribKn').value.trim();

      DyfiDataStore.set(DYFI_DATA_KEYS.MARTYRS, list);
      closeModal();
      renderMartyrs();
      renderDashboard();
      showToast('Martyr record updated successfully');
    };
  };

  window.deleteMartyr = function(index) {
    if (confirm('Delete this martyr homage record?')) {
      const list = DyfiDataStore.get(DYFI_DATA_KEYS.MARTYRS) || [];
      list.splice(index, 1);
      DyfiDataStore.set(DYFI_DATA_KEYS.MARTYRS, list);
      renderMartyrs();
      renderDashboard();
      showToast('Martyr record removed');
    }
  };

  document.getElementById('btnOpenAddMartyr').addEventListener('click', () => {
    openModal('Add Martyr Memorial Record', `
      <form id="modalFormMartyr">
        <div class="form-row">
          <div class="form-group col-6">
            <label class="form-label">Comrade Name (English)</label>
            <input type="text" id="inpMNameEn" class="form-control" required placeholder="Comrade Name">
          </div>
          <div class="form-group col-6">
            <label class="form-label">Comrade Name (ಕನ್ನಡ)</label>
            <input type="text" id="inpMNameKn" class="form-control" required placeholder="ಕಾಮ್ರೇಡ್ ಹೆಸರು">
          </div>
        </div>
        <div class="form-row">
          <div class="form-group col-6">
            <label class="form-label">Martyrdom Year / Date</label>
            <input type="text" id="inpMDate" class="form-control" placeholder="1992" required>
          </div>
          <div class="form-group col-6">
            <label class="form-label">District / Region</label>
            <input type="text" id="inpMDistrict" class="form-control" placeholder="Dakshina Kannada" required>
          </div>
        </div>
        ${renderImagePickerHTML('inpMPhoto', 'Comrade Memorial Photo (ಭಾವಚಿತ್ರ ಆಯ್ಕೆಮಾಡಿ)', '', 'images/shivappa.jpg')}
        <div class="form-group">
          <label class="form-label">Tribute Bio (English)</label>
          <textarea id="inpMTribEn" class="form-control" rows="2" required></textarea>
        </div>
        <div class="form-group">
          <label class="form-label">Tribute Bio (ಕನ್ನಡ)</label>
          <textarea id="inpMTribKn" class="form-control" rows="2" required></textarea>
        </div>
        <button type="submit" class="btn btn-primary btn-block">Add to Martyrs Memorial</button>
      </form>
    `);

    initImagePicker('inpMPhoto');

    document.getElementById('modalFormMartyr').onsubmit = (e) => {
      e.preventDefault();
      const list = DyfiDataStore.get(DYFI_DATA_KEYS.MARTYRS) || [];
      list.push({
        id: 'm_' + Date.now(),
        name_en: document.getElementById('inpMNameEn').value.trim(),
        name_kn: document.getElementById('inpMNameKn').value.trim(),
        date: document.getElementById('inpMDate').value.trim(),
        district: document.getElementById('inpMDistrict').value.trim(),
        photo: document.getElementById('inpMPhoto').value.trim() || 'images/shivappa.jpg',
        tribute_en: document.getElementById('inpMTribEn').value.trim(),
        tribute_kn: document.getElementById('inpMTribKn').value.trim()
      });
      DyfiDataStore.set(DYFI_DATA_KEYS.MARTYRS, list);
      closeModal();
      renderMartyrs();
      renderDashboard();
      showToast('Martyr record added');
    };
  });

  // Leaders (National & State Leadership Management)
  function renderLeaders() {
    const list = DyfiDataStore.get(DYFI_DATA_KEYS.LEADERS) || [];
    const tbody = document.getElementById('leadersTableBody');
    if (!tbody) return;

    tbody.innerHTML = list.map((l, idx) => {
      const isNational = l.tier === 'national' || (l.id && l.id.startsWith('nl'));
      const tierBadge = isNational
        ? '<span class="badge" style="background:#b91c1c; color:#fff; font-size:0.75rem; padding:0.2rem 0.55rem; border-radius:4px; font-weight:700;"><i class="fa-solid fa-flag"></i> National / All India</span>'
        : '<span class="badge" style="background:#1e3a8a; color:#fff; font-size:0.75rem; padding:0.2rem 0.55rem; border-radius:4px; font-weight:700;"><i class="fa-solid fa-flag" style="color:var(--primary,#dc2626); margin-right:4px;"></i> Karnataka State</span>';

      const avatarHtml = l.photo
        ? `<img src="${l.photo}" class="table-avatar" alt="Leader" onerror="this.outerHTML='<div class=\\'table-avatar placeholder-avatar\\' style=\\'display:inline-flex; align-items:center; justify-content:center; background:#1e293b; color:#94a3b8; font-size:1.1rem; width:44px; height:44px; border-radius:50%; border:2px solid rgba(220,38,38,0.3);\\'><i class=\\'fa-solid fa-user\\'></i></div>'">`
        : `<div class="table-avatar placeholder-avatar" style="display:inline-flex; align-items:center; justify-content:center; background:#1e293b; color:#94a3b8; font-size:1.1rem; width:44px; height:44px; border-radius:50%; border:2px solid rgba(220,38,38,0.3);"><i class="fa-solid fa-user"></i></div>`;

      return `
        <tr>
          <td>${avatarHtml}</td>
          <td>
            <strong>${l.name_en || '<em style="color:#94a3b8;">(Blank / ಖಾಲಿ)</em>'}</strong><br>
            <span style="color:#ef4444;">${l.name_kn || ''}</span>
          </td>
          <td>
            <strong>${l.role_en || 'Leader'}</strong><br>
            <small style="color:#94a3b8;">${l.role_kn || ''}</small>
          </td>
          <td>
            ${tierBadge}<br>
            <small style="color:#94a3b8;">${l.region || (isNational ? 'DYFI All India Centre' : 'Karnataka State Committee')}</small>
          </td>
          <td>
            <div class="table-actions-cell">
              <button class="btn btn-table-action btn-outline-warning" onclick="editLeader(${idx})"><i class="fa-solid fa-pen-to-square"></i> Edit</button>
              <button class="btn btn-table-action btn-outline-danger" onclick="deleteLeader(${idx})"><i class="fa-solid fa-trash"></i> Delete</button>
            </div>
          </td>
        </tr>
      `;
    }).join('');
  }

  window.editLeader = function(index) {
    const list = DyfiDataStore.get(DYFI_DATA_KEYS.LEADERS) || [];
    const item = list[index];
    if (!item) return;

    const isNational = item.tier === 'national' || (item.id && item.id.startsWith('nl'));

    openModal('Edit Leader (ಮುಖಂಡರ ವಿವರ ತಿದ್ದುಪಡಿ)', `
      <form id="modalFormLeaderEdit">
        <div class="form-row">
          <div class="form-group col-6">
            <label class="form-label">Leadership Level / Tier (ನಾಯಕತ್ವ ಹಂತ)</label>
            <select id="inpLTier" class="form-control" required>
              <option value="national" ${isNational ? 'selected' : ''}>All India / National Leadership (ರಾಷ್ಟ್ರೀಯ ನಾಯಕತ್ವ)</option>
              <option value="state" ${!isNational ? 'selected' : ''}>Karnataka State Leadership (ರಾಜ್ಯ ನಾಯಕತ್ವ)</option>
            </select>
          </div>
          <div class="form-group col-6">
            <label class="form-label">Committee / Region Name</label>
            <input type="text" id="inpLRegion" class="form-control" value="${(item.region || (isNational ? 'DYFI All India Centre' : 'Karnataka State Committee')).replace(/"/g, '&quot;')}">
          </div>
        </div>
        <div class="form-row">
          <div class="form-group col-6">
            <label class="form-label">Leader Name (English)</label>
            <input type="text" id="inpLNameEn" class="form-control" value="${(item.name_en || '').replace(/"/g, '&quot;')}" placeholder="e.g. Comrade A. A. Rahim">
          </div>
          <div class="form-group col-6">
            <label class="form-label">Leader Name (ಕನ್ನಡ)</label>
            <input type="text" id="inpLNameKn" class="form-control" value="${(item.name_kn || '').replace(/"/g, '&quot;')}" placeholder="ಉದಾ: ಕಾಮ್ರೇಡ್ ಎ. ಎ. ರಹೀಮ್">
          </div>
        </div>
        <div class="form-row">
          <div class="form-group col-6">
            <label class="form-label">Designation / Role (English)</label>
            <input type="text" id="inpLRoleEn" class="form-control" required value="${(item.role_en || '').replace(/"/g, '&quot;')}" placeholder="e.g. All India President / State President">
          </div>
          <div class="form-group col-6">
            <label class="form-label">Designation / Role (ಕನ್ನಡ)</label>
            <input type="text" id="inpLRoleKn" class="form-control" required value="${(item.role_kn || '').replace(/"/g, '&quot;')}" placeholder="ಉದಾ: ಅಖಿಲ ಭಾರತ ಅಧ್ಯಕ್ಷರು / ರಾಜ್ಯ ಅಧ್ಯಕ್ಷರು">
          </div>
        </div>
        ${renderImagePickerHTML('inpLPhoto', 'Leader Photo (ಭಾವಚಿತ್ರ - ಐಚ್ಛಿಕ/Optional, ಖಾಲಿ ಬಿಟ್ಟರೆ ಡೀಫಾಲ್ಟ್ ಐಕಾನ್ ಕಾಣಿಸುತ್ತದೆ)', item.photo || '', '')}
        <button type="submit" class="btn btn-primary btn-block">Update Leader Information</button>
      </form>
    `);

    initImagePicker('inpLPhoto');

    document.getElementById('modalFormLeaderEdit').onsubmit = (e) => {
      e.preventDefault();
      item.tier = document.getElementById('inpLTier').value;
      item.region = document.getElementById('inpLRegion').value.trim() || (item.tier === 'national' ? 'DYFI All India Centre' : 'Karnataka State Committee');
      item.name_en = document.getElementById('inpLNameEn').value.trim();
      item.name_kn = document.getElementById('inpLNameKn').value.trim();
      item.role_en = document.getElementById('inpLRoleEn').value.trim();
      item.role_kn = document.getElementById('inpLRoleKn').value.trim();
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
    openModal('Add Leader (ಹೊಸ ಮುಖಂಡರ ಸೇರ್ಪಡೆ)', `
      <form id="modalFormLeader">
        <div class="form-row">
          <div class="form-group col-6">
            <label class="form-label">Leadership Level / Tier (ನಾಯಕತ್ವ ಹಂತ)</label>
            <select id="inpLTier" class="form-control" required>
              <option value="national">All India / National Leadership (ರಾಷ್ಟ್ರೀಯ ನಾಯಕತ್ವ)</option>
              <option value="state" selected>Karnataka State Leadership (ರಾಜ್ಯ ನಾಯಕತ್ವ)</option>
            </select>
          </div>
          <div class="form-group col-6">
            <label class="form-label">Committee / Region Name</label>
            <input type="text" id="inpLRegion" class="form-control" value="Karnataka State Committee" placeholder="e.g. DYFI All India Centre">
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
            <input type="text" id="inpLRoleEn" class="form-control" required placeholder="All India President / State President">
          </div>
          <div class="form-group col-6">
            <label class="form-label">Designation / Role (ಕನ್ನಡ)</label>
            <input type="text" id="inpLRoleKn" class="form-control" required placeholder="ಅಖಿಲ ಭಾರತ ಅಧ್ಯಕ್ಷರು / ರಾಜ್ಯ ಅಧ್ಯಕ್ಷರು">
          </div>
        </div>
        ${renderImagePickerHTML('inpLPhoto', 'Leader Photo (ಭಾವಚಿತ್ರ - ಐಚ್ಛಿಕ/Optional, ಖಾಲಿ ಬಿಟ್ಟರೆ ಡೀಫಾಲ್ಟ್ ಐಕಾನ್ ಕಾಣಿಸುತ್ತದೆ)', '', '')}
        <button type="submit" class="btn btn-primary btn-block">Add Leader</button>
      </form>
    `);

    initImagePicker('inpLPhoto');

    const tierSelect = document.getElementById('inpLTier');
    const regionInput = document.getElementById('inpLRegion');
    if (tierSelect && regionInput) {
      tierSelect.addEventListener('change', () => {
        regionInput.value = tierSelect.value === 'national' ? 'DYFI All India Centre' : 'Karnataka State Committee';
      });
    }

    document.getElementById('modalFormLeader').onsubmit = (e) => {
      e.preventDefault();
      const list = DyfiDataStore.get(DYFI_DATA_KEYS.LEADERS) || [];
      const tier = document.getElementById('inpLTier').value;
      list.push({
        id: (tier === 'national' ? 'nl_' : 'l_') + Date.now(),
        tier: tier,
        name_en: document.getElementById('inpLNameEn').value.trim(),
        name_kn: document.getElementById('inpLNameKn').value.trim(),
        role_en: document.getElementById('inpLRoleEn').value.trim(),
        role_kn: document.getElementById('inpLRoleKn').value.trim(),
        region: document.getElementById('inpLRegion').value.trim() || (tier === 'national' ? 'DYFI All India Centre' : 'Karnataka State Committee'),
        photo: document.getElementById('inpLPhoto').value.trim()
      });
      DyfiDataStore.set(DYFI_DATA_KEYS.LEADERS, list);
      closeModal();
      renderLeaders();
      renderDashboard();
    };
  });

  // ================= DISTRICTS, TALUKS & AREA COMMITTEES ENGINE =================
  const zoneNames = {
    coastal: { en: 'Coastal Zone', kn: 'ಕರಾವಳಿ ವಿಭಾಗ' },
    bengaluru: { en: 'Bengaluru Region', kn: 'ಬೆಂಗಳೂರು ವಿಭಾಗ' },
    mysuru: { en: 'Mysuru Region', kn: 'ಮೈಸೂರು ವಿಭಾಗ' },
    kalyana: { en: 'Kalyana Karnataka', kn: 'ಕಲ್ಯಾಣ ಕರ್ನಾಟಕ' },
    kittur: { en: 'Kittur Karnataka', kn: 'ಕಿತ್ತೂರು ಕರ್ನಾಟಕ' }
  };

  function renderDistricts() {
    const list = DyfiDataStore.get(DYFI_DATA_KEYS.DISTRICTS) || [];
    const tbody = document.getElementById('districtsTableBody');
    if (!tbody) return;

    const queryInput = document.getElementById('filterDistrictQuery');
    const zoneSelect = document.getElementById('filterDistrictZone');
    const query = queryInput ? queryInput.value.trim().toLowerCase() : '';
    const zone = zoneSelect ? zoneSelect.value : '';

    const filtered = list.filter(d => {
      if (zone && d.zone !== zone) return false;
      if (query) {
        const dKn = (d.name_kn || '').toLowerCase();
        const dEn = (d.name_en || '').toLowerCase();
        const presKn = (d.president_kn || '').toLowerCase();
        const presEn = (d.president_en || '').toLowerCase();
        const secKn = (d.secretary_kn || '').toLowerCase();
        const secEn = (d.secretary_en || '').toLowerCase();
        const taluks = ((d.taluks_data || []).map(t => `${t.name_kn} ${t.name_en}`).join(' ')).toLowerCase();
        if (!dKn.includes(query) && !dEn.includes(query) && !presKn.includes(query) && !presEn.includes(query) && !secKn.includes(query) && !secEn.includes(query) && !taluks.includes(query)) {
          return false;
        }
      }
      return true;
    });

    const badgeDistricts = document.getElementById('badgeDistrictsCount');
    if (badgeDistricts) badgeDistricts.innerText = list.length;

    if (filtered.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="5" style="text-align:center; padding: 2.5rem; color: #94a3b8;">
            <i class="fa-solid fa-flag" style="color:var(--primary,#dc2626); margin-right:6px;"></i> No district committees found matching your filter criteria.
          </td>
        </tr>
      `;
      return;
    }

    tbody.innerHTML = filtered.map((d) => {
      const originalIndex = list.findIndex(item => item.id === d.id);
      const taluksList = d.taluks_data || [];
      const talukCount = taluksList.length || d.taluks_count || 0;
      const unitsDisplay = d.units_count 
        ? `<span class="units-pill-tag"><i class="fa-solid fa-flag" style="color:#ef4444;"></i> ${d.units_count}</span>` 
        : `<span class="units-pill-tag" style="opacity:0.6; border-style:dashed;"><i class="fa-solid fa-flag"></i> —</span>`;

      return `
        <tr>
          <td>
            <div class="district-table-title">${d.name_kn || d.name_en}</div>
            <div class="district-table-sub">${d.name_en || ''}</div>
            <span class="district-zone-tag">${d.zone_kn || d.zone_en || d.zone}</span>
          </td>
          <td>
            <div class="leader-preview-cell">
              ${d.president_photo 
                ? `<img src="${d.president_photo}" class="leader-preview-avatar" alt="President" onerror="this.onerror=null; this.outerHTML='<div class=\\'leader-preview-avatar leader-placeholder-avatar\\'><i class=\\'fa-solid fa-user\\'></i></div>';">` 
                : `<div class="leader-preview-avatar leader-placeholder-avatar" title="No photo uploaded"><i class="fa-solid fa-user"></i></div>`}
              <div class="leader-preview-meta">
                <span class="leader-preview-name ${!d.president_kn && !d.president_en ? 'text-muted-blank' : ''}">
                  ${d.president_kn || d.president_en || '<em>(ಖಾಲಿ / Blank)</em>'}
                </span>
                <span class="leader-preview-role"><i class="fa-solid fa-flag" style="font-size:0.8em; margin-right:3px;"></i> ${d.president_post_kn || 'ಜಿಲ್ಲಾ ಅಧ್ಯಕ್ಷರು'}</span>
                ${d.president_phone ? `<a href="tel:${d.president_phone}" class="leader-preview-phone"><i class="fa-solid fa-phone"></i> ${d.president_phone}</a>` : `<span style="color:#64748b; font-size:0.75rem;"><i class="fa-solid fa-phone"></i> —</span>`}
              </div>
            </div>
          </td>
          <td>
            <div class="leader-preview-cell">
              ${d.secretary_photo 
                ? `<img src="${d.secretary_photo}" class="leader-preview-avatar" alt="Secretary" onerror="this.onerror=null; this.outerHTML='<div class=\\'leader-preview-avatar leader-placeholder-avatar\\'><i class=\\'fa-solid fa-user\\'></i></div>';">` 
                : `<div class="leader-preview-avatar leader-placeholder-avatar" title="No photo uploaded"><i class="fa-solid fa-user"></i></div>`}
              <div class="leader-preview-meta">
                <span class="leader-preview-name ${!d.secretary_kn && !d.secretary_en ? 'text-muted-blank' : ''}">
                  ${d.secretary_kn || d.secretary_en || '<em>(ಖಾಲಿ / Blank)</em>'}
                </span>
                <span class="leader-preview-role"><i class="fa-solid fa-flag" style="font-size:0.8em; margin-right:3px;"></i> ${d.secretary_post_kn || 'ಜಿಲ್ಲಾ ಕಾರ್ಯದರ್ಶಿ'}</span>
                ${d.secretary_phone ? `<a href="tel:${d.secretary_phone}" class="leader-preview-phone"><i class="fa-solid fa-phone"></i> ${d.secretary_phone}</a>` : `<span style="color:#64748b; font-size:0.75rem;"><i class="fa-solid fa-phone"></i> —</span>`}
              </div>
            </div>
          </td>
          <td>
            <span class="taluk-pill-tag"><i class="fa-solid fa-landmark"></i> ${talukCount} Taluks</span><br>
            ${unitsDisplay}
          </td>
          <td>
            <div class="table-actions-cell">
              <button class="btn btn-table-action btn-outline-warning" onclick="editDistrict(${originalIndex})" title="Edit District Details"><i class="fa-solid fa-pen-to-square"></i> Edit</button>
              <button class="btn btn-table-action btn-outline-primary" onclick="manageDistrictTaluks(${originalIndex})" title="Manage Taluks & Area Committees"><i class="fa-solid fa-landmark"></i> Taluks (${talukCount})</button>
              <button class="btn btn-table-action btn-outline-danger" onclick="deleteDistrict(${originalIndex})" title="Delete District"><i class="fa-solid fa-trash"></i></button>
            </div>
          </td>
        </tr>
      `;
    }).join('');
  }

  // Filter Listeners
  const filterDistrictQuery = document.getElementById('filterDistrictQuery');
  if (filterDistrictQuery) {
    filterDistrictQuery.addEventListener('input', renderDistricts);
  }
  const filterDistrictZone = document.getElementById('filterDistrictZone');
  if (filterDistrictZone) {
    filterDistrictZone.addEventListener('change', renderDistricts);
  }

  // Open Edit / Add District Modal
  function openDistrictEditModal(item, index) {
    const isEdit = typeof index === 'number' && index >= 0;
    const title = isEdit ? `Edit District: ${item.name_kn} (${item.name_en})` : 'Add New District Committee';

    openModal(title, `
      <form id="modalFormDistrictEdit">
        <!-- 1. GENERAL INFORMATION -->
        <div class="form-section-divider"><i class="fa-solid fa-flag" style="color:var(--primary,#dc2626); margin-right:6px;"></i> District General Information</div>
        <div class="form-row">
          <div class="form-group col-6">
            <label class="form-label">District Name (ಕನ್ನಡ)</label>
            <input type="text" id="inpDNameKn" class="form-control" required value="${(item.name_kn || '').replace(/"/g, '&quot;')}" placeholder="ಉದಾ: ದಕ್ಷಿಣ ಕನ್ನಡ / ಶಿವಮೊಗ್ಗ">
          </div>
          <div class="form-group col-6">
            <label class="form-label">District Name (English)</label>
            <input type="text" id="inpDNameEn" class="form-control" required value="${(item.name_en || '').replace(/"/g, '&quot;')}" placeholder="e.g. Dakshina Kannada / Shivamogga">
          </div>
        </div>

        <div class="form-row">
          <div class="form-group col-6">
            <label class="form-label">Zone / Administrative Region</label>
            <select id="inpDZone" class="form-control">
              <option value="coastal" ${item.zone === 'coastal' ? 'selected' : ''}>Coastal Zone (ಕರಾವಳಿ ವಿಭಾಗ)</option>
              <option value="bengaluru" ${item.zone === 'bengaluru' ? 'selected' : ''}>Bengaluru Region (ಬೆಂಗಳೂರು ವಿಭಾಗ)</option>
              <option value="mysuru" ${item.zone === 'mysuru' ? 'selected' : ''}>Mysuru Region (ಮೈಸೂರು ವಿಭಾಗ)</option>
              <option value="kalyana" ${item.zone === 'kalyana' ? 'selected' : ''}>Kalyana Karnataka (ಕಲ್ಯಾಣ ಕರ್ನಾಟಕ)</option>
              <option value="kittur" ${item.zone === 'kittur' ? 'selected' : ''}>Kittur Karnataka (ಕಿತ್ತೂರು ಕರ್ನಾಟಕ)</option>
            </select>
          </div>
          <div class="form-group col-6">
            <label class="form-label">Local Units Count (ಘಟಕಗಳ ಸಂಖ್ಯೆ)</label>
            <input type="text" id="inpDUnitsCount" class="form-control" value="${(item.units_count || '').replace(/"/g, '&quot;')}" placeholder="ಉದಾ: 100+ ಘಟಕಗಳು (ಐಚ್ಛಿಕ/Optional)">
          </div>
        </div>

        <!-- 2. DISTRICT PRESIDENT -->
        <div class="form-section-divider"><i class="fa-solid fa-user" style="margin-right:6px;"></i> District President (ಜಿಲ್ಲಾ ಅಧ್ಯಕ್ಷರು - ಐಚ್ಛಿಕ/Optional)</div>
        <div class="form-row">
          <div class="form-group col-6">
            <label class="form-label">President Name (ಕನ್ನಡ)</label>
            <input type="text" id="inpDPresKn" class="form-control" value="${(item.president_kn || '').replace(/"/g, '&quot;')}" placeholder="ಖಾಲಿ ಬಿಡಬಹುದು ಅಥವಾ ಕಾಮ್ರೇಡ್ ಹೆಸರು">
          </div>
          <div class="form-group col-6">
            <label class="form-label">President Name (English)</label>
            <input type="text" id="inpDPresEn" class="form-control" value="${(item.president_en || '').replace(/"/g, '&quot;')}" placeholder="Leave blank or Comrade Name">
          </div>
        </div>
        <div class="form-row">
          <div class="form-group col-6">
            <label class="form-label">President Post Designation (ಕನ್ನಡ)</label>
            <input type="text" id="inpDPresPostKn" class="form-control" value="${(item.president_post_kn || 'ಜಿಲ್ಲಾ ಅಧ್ಯಕ್ಷರು').replace(/"/g, '&quot;')}">
          </div>
          <div class="form-group col-6">
            <label class="form-label">President Post Designation (English)</label>
            <input type="text" id="inpDPresPostEn" class="form-control" value="${(item.president_post_en || 'District President').replace(/"/g, '&quot;')}">
          </div>
        </div>
        <div class="form-row">
          <div class="form-group col-6">
            <label class="form-label">President Phone Number</label>
            <input type="text" id="inpDPresPhone" class="form-control" value="${(item.president_phone || '').replace(/"/g, '&quot;')}" placeholder="ಉದಾ: +91 9448123456 (ಐಚ್ಛಿಕ)">
          </div>
          <div class="form-group col-6">
            ${renderImagePickerHTML('inpDPresPhoto', 'President Photo (ಭಾವಚಿತ್ರ - ಐಚ್ಛಿಕ/Optional)', item.president_photo || '', '')}
          </div>
        </div>

        <!-- 3. DISTRICT SECRETARY -->
        <div class="form-section-divider"><i class="fa-solid fa-user" style="margin-right:6px;"></i> District Secretary (ಜಿಲ್ಲಾ ಕಾರ್ಯದರ್ಶಿ - ಐಚ್ಛಿಕ/Optional)</div>
        <div class="form-row">
          <div class="form-group col-6">
            <label class="form-label">Secretary Name (ಕನ್ನಡ)</label>
            <input type="text" id="inpDSecKn" class="form-control" value="${(item.secretary_kn || '').replace(/"/g, '&quot;')}" placeholder="ಖಾಲಿ ಬಿಡಬಹುದು ಅಥವಾ ಕಾಮ್ರೇಡ್ ಹೆಸರು">
          </div>
          <div class="form-group col-6">
            <label class="form-label">Secretary Name (English)</label>
            <input type="text" id="inpDSecEn" class="form-control" value="${(item.secretary_en || '').replace(/"/g, '&quot;')}" placeholder="Leave blank or Comrade Name">
          </div>
        </div>
        <div class="form-row">
          <div class="form-group col-6">
            <label class="form-label">Secretary Post Designation (ಕನ್ನಡ)</label>
            <input type="text" id="inpDSecPostKn" class="form-control" value="${(item.secretary_post_kn || 'ಜಿಲ್ಲಾ ಕಾರ್ಯದರ್ಶಿ').replace(/"/g, '&quot;')}">
          </div>
          <div class="form-group col-6">
            <label class="form-label">Secretary Post Designation (English)</label>
            <input type="text" id="inpDSecPostEn" class="form-control" value="${(item.secretary_post_en || 'District Secretary').replace(/"/g, '&quot;')}">
          </div>
        </div>
        <div class="form-row">
          <div class="form-group col-6">
            <label class="form-label">Secretary Phone Number</label>
            <input type="text" id="inpDSecPhone" class="form-control" value="${(item.secretary_phone || '').replace(/"/g, '&quot;')}" placeholder="ಉದಾ: +91 9880123456 (ಐಚ್ಛಿಕ)">
          </div>
          <div class="form-group col-6">
            ${renderImagePickerHTML('inpDSecPhoto', 'Secretary Photo (ಭಾವಚಿತ್ರ - ಐಚ್ಛಿಕ/Optional)', item.secretary_photo || '', '')}
          </div>
        </div>

        <!-- 4. OFFICE & AREA UNITS -->
        <div class="form-section-divider"><i class="fa-solid fa-landmark" style="margin-right:6px;"></i> Office Address &amp; Area Units Coverage</div>
        <div class="form-row">
          <div class="form-group col-6">
            <label class="form-label">District Office Address (ಕನ್ನಡ)</label>
            <textarea id="inpDOfficeKn" class="form-control" rows="2" placeholder="ಡಿವೈಎಫ್ಐ ಜಿಲ್ಲಾ ಕಚೇರಿ...">${item.office_kn || ''}</textarea>
          </div>
          <div class="form-group col-6">
            <label class="form-label">District Office Address (English)</label>
            <textarea id="inpDOfficeEn" class="form-control" rows="2" placeholder="DYFI District Office...">${item.office_en || ''}</textarea>
          </div>
        </div>
        <div class="form-row">
          <div class="form-group col-6">
            <label class="form-label">Office / Helpline Phone</label>
            <input type="text" id="inpDPhone" class="form-control" value="${(item.phone || '').replace(/"/g, '&quot;')}" placeholder="+91 824 2440123 / +91 9448123456">
          </div>
          <div class="form-group col-6">
            <label class="form-label">District Slug / ID</label>
            <input type="text" id="inpDId" class="form-control" value="${(item.id || '').replace(/"/g, '&quot;')}" placeholder="e.g. dk, udupi, bagalkote" ${isEdit ? 'readonly style="opacity:0.75;"' : ''}>
          </div>
        </div>
        <div class="form-row">
          <div class="form-group col-6">
            <label class="form-label">Area Units Summary (ಕನ್ನಡ)</label>
            <textarea id="inpDAreaKn" class="form-control" rows="2" placeholder="140ಕ್ಕೂ ಹೆಚ್ಚು ಸಕ್ರಿಯ ಗ್ರಾಮ, ವಾರ್ಡ್ ಮತ್ತು ಏರಿಯಾ ಯುವ ಸಮಿತಿಗಳು...">${item.area_units_kn || ''}</textarea>
          </div>
          <div class="form-group col-6">
            <label class="form-label">Area Units Summary (English)</label>
            <textarea id="inpDAreaEn" class="form-control" rows="2" placeholder="Over 140 active village, ward, and student area committees...">${item.area_units_en || ''}</textarea>
          </div>
        </div>

        <button type="submit" class="btn btn-primary btn-block btn-lg" style="margin-top: 1rem;">${isEdit ? '<i class="fa-solid fa-check"></i> Save District Committee Changes' : '<i class="fa-solid fa-plus"></i> Create District Committee'}</button>
      </form>
    `, true);

    initImagePicker('inpDPresPhoto');
    initImagePicker('inpDSecPhoto');

    document.getElementById('modalFormDistrictEdit').onsubmit = (e) => {
      e.preventDefault();
      const list = DyfiDataStore.get(DYFI_DATA_KEYS.DISTRICTS) || [];
      const zoneVal = document.getElementById('inpDZone').value;
      const zoneInfo = zoneNames[zoneVal] || { en: 'Karnataka', kn: 'ಕರ್ನಾಟಕ' };

      const name_en = document.getElementById('inpDNameEn').value.trim();
      const name_kn = document.getElementById('inpDNameKn').value.trim();
      const slug = document.getElementById('inpDId').value.trim() || name_en.toLowerCase().replace(/[^a-z0-9]+/g, '-');

      const target = isEdit ? list[index] : {
        id: slug,
        taluks_data: [],
        taluks_en: [],
        taluks_kn: [],
        taluks_count: 0
      };

      target.id = slug;
      target.zone = zoneVal;
      target.zone_en = zoneInfo.en;
      target.zone_kn = zoneInfo.kn;
      target.name_en = name_en;
      target.name_kn = name_kn;
      target.units_count = document.getElementById('inpDUnitsCount').value.trim();

      target.president_kn = document.getElementById('inpDPresKn').value.trim();
      target.president_en = document.getElementById('inpDPresEn').value.trim();
      target.president_post_kn = document.getElementById('inpDPresPostKn').value.trim() || 'ಜಿಲ್ಲಾ ಅಧ್ಯಕ್ಷರು';
      target.president_post_en = document.getElementById('inpDPresPostEn').value.trim() || 'District President';
      target.president_phone = document.getElementById('inpDPresPhone').value.trim();
      target.president_photo = document.getElementById('inpDPresPhoto').value.trim();

      target.secretary_kn = document.getElementById('inpDSecKn').value.trim();
      target.secretary_en = document.getElementById('inpDSecEn').value.trim();
      target.secretary_post_kn = document.getElementById('inpDSecPostKn').value.trim() || 'ಜಿಲ್ಲಾ ಕಾರ್ಯದರ್ಶಿ';
      target.secretary_post_en = document.getElementById('inpDSecPostEn').value.trim() || 'District Secretary';
      target.secretary_phone = document.getElementById('inpDSecPhone').value.trim();
      target.secretary_photo = document.getElementById('inpDSecPhoto').value.trim();

      target.office_kn = document.getElementById('inpDOfficeKn').value.trim();
      target.office_en = document.getElementById('inpDOfficeEn').value.trim();
      target.phone = document.getElementById('inpDPhone').value.trim();
      target.area_units_kn = document.getElementById('inpDAreaKn').value.trim();
      target.area_units_en = document.getElementById('inpDAreaEn').value.trim();

      if (!isEdit) {
        list.push(target);
      }

      DyfiDataStore.set(DYFI_DATA_KEYS.DISTRICTS, list);
      closeModal();
      renderDistricts();
      renderDashboard();
      showToast(isEdit ? `District "${name_kn}" updated successfully!` : `District "${name_kn}" added to network!`);
    };
  }

  window.editDistrict = function(index) {
    const list = DyfiDataStore.get(DYFI_DATA_KEYS.DISTRICTS) || [];
    const item = list[index];
    if (!item) return;
    openDistrictEditModal(item, index);
  };

  window.deleteDistrict = function(index) {
    const list = DyfiDataStore.get(DYFI_DATA_KEYS.DISTRICTS) || [];
    const item = list[index];
    if (!item) return;

    if (confirm(`Are you sure you want to delete the district "${item.name_kn || item.name_en}"? This will also remove its taluks and units.`)) {
      list.splice(index, 1);
      DyfiDataStore.set(DYFI_DATA_KEYS.DISTRICTS, list);
      renderDistricts();
      renderDashboard();
      showToast(`District "${item.name_kn || item.name_en}" deleted`);
    }
  };

  const btnOpenAddDistrict = document.getElementById('btnOpenAddDistrict');
  if (btnOpenAddDistrict) {
    btnOpenAddDistrict.addEventListener('click', () => {
      openDistrictEditModal({
        id: '',
        zone: 'coastal',
        name_en: '',
        name_kn: '',
        units_count: '',
        president_kn: '',
        president_en: '',
        president_post_kn: 'ಜಿಲ್ಲಾ ಅಧ್ಯಕ್ಷರು',
        president_post_en: 'District President',
        president_photo: '',
        president_phone: '',
        secretary_kn: '',
        secretary_en: '',
        secretary_post_kn: 'ಜಿಲ್ಲಾ ಕಾರ್ಯದರ್ಶಿ',
        secretary_post_en: 'District Secretary',
        secretary_photo: '',
        secretary_phone: '',
        office_kn: '',
        office_en: '',
        phone: '',
        area_units_kn: '',
        area_units_en: ''
      }, -1);
    });
  }

  // Manage Taluks & Area Committees per District
  window.manageDistrictTaluks = function(districtIndex) {
    const list = DyfiDataStore.get(DYFI_DATA_KEYS.DISTRICTS) || [];
    const d = list[districtIndex];
    if (!d) return;

    if (!Array.isArray(d.taluks_data)) {
      d.taluks_data = [];
    }

    function renderTaluksModalContent() {
      const taluks = d.taluks_data || [];
      return `
        <div class="taluk-management-wrapper">
          <div style="margin-bottom: 1rem; color: #94a3b8; font-size: 0.9rem;">
            District: <strong style="color: #fff;">${d.name_kn} (${d.name_en})</strong> &bull; Total Taluks: <strong style="color: #3b82f6;">${taluks.length}</strong> &bull; Area Units: <strong style="color: #10b981;">${d.units_count || 'Active'}</strong>
          </div>

          <!-- Add / Edit Taluk Box -->
          <div class="taluk-add-box" id="talukFormContainer">
            <h4 id="talukFormTitle">+ Add New Taluk / City Unit</h4>
            <form id="formAddTaluk">
              <input type="hidden" id="inpTalukEditIdx" value="-1">
              <div class="form-row">
                <div class="form-group col-6">
                  <label class="form-label">Taluk Name (ಕನ್ನಡ)</label>
                  <input type="text" id="inpTNameKn" class="form-control" placeholder="ಉದಾ: ಮಂಗಳೂರು ನಗರ / ಹುಣಸೂರು" required>
                </div>
                <div class="form-group col-6">
                  <label class="form-label">Taluk Name (English)</label>
                  <input type="text" id="inpTNameEn" class="form-control" placeholder="e.g. Mangaluru City / Hunsur" required>
                </div>
              </div>
              <div class="form-row">
                <div class="form-group col-6">
                  <label class="form-label">Taluk President (ಅಧ್ಯಕ್ಷರು - ಕನ್ನಡ)</label>
                  <input type="text" id="inpTPresKn" class="form-control" placeholder="ಕಾಮ್ರೇಡ್ ಹೆಸರು">
                </div>
                <div class="form-group col-6">
                  <label class="form-label">Taluk President (English)</label>
                  <input type="text" id="inpTPresEn" class="form-control" placeholder="Comrade Name">
                </div>
              </div>
              <div class="form-row">
                <div class="form-group col-6">
                  <label class="form-label">Taluk Secretary (ಕಾರ್ಯದರ್ಶಿ - ಕನ್ನಡ)</label>
                  <input type="text" id="inpTSecKn" class="form-control" placeholder="ಕಾಮ್ರೇಡ್ ಹೆಸರು">
                </div>
                <div class="form-group col-6">
                  <label class="form-label">Taluk Secretary (English)</label>
                  <input type="text" id="inpTSecEn" class="form-control" placeholder="Comrade Name">
                </div>
              </div>
              <div class="form-row">
                <div class="form-group col-6">
                  <label class="form-label">Contact Phone</label>
                  <input type="text" id="inpTPhone" class="form-control" placeholder="+91 9845112233">
                </div>
                <div class="form-group col-6">
                  <label class="form-label">Units Count / Area Description</label>
                  <input type="text" id="inpTUnitsKn" class="form-control" placeholder="ಉದಾ: 25 ಗ್ರಾಮ/ನಗರ ಘಟಕಗಳು">
                </div>
              </div>
              <div class="flex gap-sm" style="margin-top: 0.5rem;">
                <button type="submit" class="btn btn-primary" id="btnSubmitTaluk">+ Save Taluk Unit</button>
                <button type="button" class="btn btn-outline-white" id="btnCancelTalukEdit" style="display:none;">Cancel Edit</button>
              </div>
            </form>
          </div>

          <!-- Existing Taluks List -->
          <h4 style="margin: 1.2rem 0 0.6rem; font-size: 0.95rem; color: #fff;"><i class="fa-solid fa-landmark" style="margin-right:6px;"></i> Existing Taluk Units in this District (${taluks.length})</h4>
          <div class="taluk-admin-list">
            ${taluks.length === 0 ? '<div style="color:#94a3b8; font-style:italic; padding:1rem; text-align:center;">No taluk units added yet. Use the form above to add the first taluk.</div>' : ''}
            ${taluks.map((t, tIdx) => `
              <div class="taluk-admin-item">
                <div class="taluk-admin-info">
                  <div class="taluk-admin-title">
                    <span><i class="fa-solid fa-landmark"></i></span>
                    <span>${t.name_kn || t.name_en}</span>
                    ${t.name_en && t.name_en !== t.name_kn ? `<small style="color:#94a3b8; font-weight:normal;">(${t.name_en})</small>` : ''}
                    <span class="taluk-unit-tag" style="font-size:0.75rem; background:rgba(59,130,246,0.15); color:#60a5fa; padding:2px 8px; border-radius:4px;">${t.units_kn || 'ಸಕ್ರಿಯ ಘಟಕ'}</span>
                  </div>
                  <div class="taluk-admin-officers">
                    <span><strong>ಅಧ್ಯಕ್ಷರು:</strong> ${t.president_kn || t.president_en || '<span style="color:#64748b; font-style:italic;">(ಖಾಲಿ / Blank)</span>'}</span>
                    <span><strong>ಕಾರ್ಯದರ್ಶಿ:</strong> ${t.secretary_kn || t.secretary_en || '<span style="color:#64748b; font-style:italic;">(ಖಾಲಿ / Blank)</span>'}</span>
                    ${t.phone ? `<span><a href="tel:${t.phone}" style="color:#94a3b8; text-decoration:none;"><i class="fa-solid fa-phone"></i> ${t.phone}</a></span>` : `<span style="color:#64748b; font-size:0.8rem;"><i class="fa-solid fa-phone"></i> —</span>`}
                  </div>
                </div>
                <div class="table-actions-cell">
                  <button class="btn btn-table-action btn-outline-warning" onclick="editTalukInModal(${districtIndex}, ${tIdx})"><i class="fa-solid fa-pen-to-square"></i></button>
                  <button class="btn btn-table-action btn-outline-danger" onclick="deleteTalukInModal(${districtIndex}, ${tIdx})"><i class="fa-solid fa-trash"></i></button>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }

    openModal(`Taluks & Area Committees — ${d.name_kn}`, renderTaluksModalContent(), true);
    bindTalukFormHandlers();

    function bindTalukFormHandlers() {
      const form = document.getElementById('formAddTaluk');
      if (!form) return;

      const editIdxInput = document.getElementById('inpTalukEditIdx');
      const btnCancel = document.getElementById('btnCancelTalukEdit');

      btnCancel.onclick = () => {
        editIdxInput.value = '-1';
        form.reset();
        document.getElementById('talukFormTitle').innerHTML = '<i class="fa-solid fa-plus"></i> Add New Taluk / City Unit';
        document.getElementById('btnSubmitTaluk').innerHTML = '<i class="fa-solid fa-check"></i> Save Taluk Unit';
        btnCancel.style.display = 'none';
      };

      form.onsubmit = (e) => {
        e.preventDefault();
        const editIdx = parseInt(editIdxInput.value, 10);
        const name_kn = document.getElementById('inpTNameKn').value.trim();
        const name_en = document.getElementById('inpTNameEn').value.trim();
        const president_kn = document.getElementById('inpTPresKn').value.trim();
        const president_en = document.getElementById('inpTPresEn').value.trim();
        const secretary_kn = document.getElementById('inpTSecKn').value.trim();
        const secretary_en = document.getElementById('inpTSecEn').value.trim();
        const phone = document.getElementById('inpTPhone').value.trim();
        const units_kn = document.getElementById('inpTUnitsKn').value.trim();

        const talukObj = {
          name_kn,
          name_en,
          president_kn,
          president_en,
          secretary_kn,
          secretary_en,
          phone,
          units_kn
        };

        if (editIdx >= 0 && editIdx < d.taluks_data.length) {
          d.taluks_data[editIdx] = talukObj;
          showToast(`Taluk "${name_kn}" updated successfully!`);
        } else {
          d.taluks_data.push(talukObj);
          showToast(`Taluk "${name_kn}" added successfully!`);
        }

        d.taluks_count = d.taluks_data.length;
        d.taluks_kn = d.taluks_data.map(t => t.name_kn);
        d.taluks_en = d.taluks_data.map(t => t.name_en);

        DyfiDataStore.set(DYFI_DATA_KEYS.DISTRICTS, list);
        renderDistricts();

        modalBody.innerHTML = renderTaluksModalContent();
        bindTalukFormHandlers();
      };
    }

    window.editTalukInModal = function(dIdx, tIdx) {
      const curList = DyfiDataStore.get(DYFI_DATA_KEYS.DISTRICTS) || [];
      const curD = curList[dIdx];
      if (!curD || !curD.taluks_data[tIdx]) return;
      const t = curD.taluks_data[tIdx];

      document.getElementById('inpTalukEditIdx').value = tIdx;
      document.getElementById('inpTNameKn').value = t.name_kn || '';
      document.getElementById('inpTNameEn').value = t.name_en || '';
      document.getElementById('inpTPresKn').value = t.president_kn || '';
      document.getElementById('inpTPresEn').value = t.president_en || '';
      document.getElementById('inpTSecKn').value = t.secretary_kn || '';
      document.getElementById('inpTSecEn').value = t.secretary_en || '';
      document.getElementById('inpTPhone').value = t.phone || '';
      document.getElementById('inpTUnitsKn').value = t.units_kn || '';

      document.getElementById('talukFormTitle').innerHTML = `<i class="fa-solid fa-pen-to-square"></i> Edit Taluk Unit: ${t.name_kn}`;
      document.getElementById('btnSubmitTaluk').innerHTML = '<i class="fa-solid fa-check"></i> Update Taluk Unit';
      document.getElementById('btnCancelTalukEdit').style.display = 'inline-block';
      document.getElementById('talukFormContainer').scrollIntoView({ behavior: 'smooth' });
    };

    window.deleteTalukInModal = function(dIdx, tIdx) {
      const curList = DyfiDataStore.get(DYFI_DATA_KEYS.DISTRICTS) || [];
      const curD = curList[dIdx];
      if (!curD || !curD.taluks_data[tIdx]) return;
      const t = curD.taluks_data[tIdx];

      if (confirm(`Are you sure you want to delete the taluk "${t.name_kn || t.name_en}"?`)) {
        curD.taluks_data.splice(tIdx, 1);
        curD.taluks_count = curD.taluks_data.length;
        curD.taluks_kn = curD.taluks_data.map(item => item.name_kn);
        curD.taluks_en = curD.taluks_data.map(item => item.name_en);

        DyfiDataStore.set(DYFI_DATA_KEYS.DISTRICTS, curList);
        renderDistricts();

        modalBody.innerHTML = renderTaluksModalContent();
        bindTalukFormHandlers();
        showToast('Taluk unit removed');
      }
    };
  };

  // Gallery
  function renderGallery() {
    const list = DyfiDataStore.get(DYFI_DATA_KEYS.GALLERY) || [];
    const tbody = document.getElementById('galleryTableBody');
    tbody.innerHTML = list.map((g, idx) => `
      <tr>
        <td>
          ${g.type === 'video' ? '<i class="fa-solid fa-video"></i> Video Embed' : `<img src="${g.src}" class="table-thumb" alt="Gallery" onerror="this.src='images/gallery-1.jpg'">`}
        </td>
        <td><span class="badge-tag">${g.type.toUpperCase()}</span></td>
        <td>${g.category}</td>
        <td>${g.caption_en || g.caption_kn || 'Media'}</td>
        <td>
          <div class="table-actions-cell">
            <button class="btn btn-table-action btn-outline-warning" onclick="editGallery(${idx})"><i class="fa-solid fa-pen-to-square"></i> Edit</button>
            <button class="btn btn-table-action btn-outline-danger" onclick="deleteGallery(${idx})"><i class="fa-solid fa-trash"></i> Delete</button>
          </div>
        </td>
      </tr>
    `).join('');
  }

  window.editGallery = function(index) {
    const list = DyfiDataStore.get(DYFI_DATA_KEYS.GALLERY) || [];
    const item = list[index];
    if (!item) return;

    openModal('Edit Gallery Media', `
      <form id="modalFormGalleryEdit">
        <div class="form-row">
          <div class="form-group col-6">
            <label class="form-label">Media Type</label>
            <select id="inpGType" class="form-control">
              <option value="image" ${item.type === 'image' ? 'selected' : ''}>Photo / Image</option>
              <option value="video" ${item.type === 'video' ? 'selected' : ''}>YouTube Video Embed</option>
            </select>
          </div>
          <div class="form-group col-6">
            <label class="form-label">Category</label>
            <select id="inpGCat" class="form-control">
              <option value="rally" ${item.category === 'rally' ? 'selected' : ''}>Rallies</option>
              <option value="conf" ${item.category === 'conf' ? 'selected' : ''}>Conferences</option>
              <option value="health" ${item.category === 'health' ? 'selected' : ''}>Health & Blood</option>
              <option value="relief" ${item.category === 'relief' ? 'selected' : ''}>Relief Work</option>
              <option value="video" ${item.category === 'video' ? 'selected' : ''}>Video Stream</option>
            </select>
          </div>
        </div>
        <div id="galleryImagePickerWrap" style="${item.type === 'video' ? 'display:none;' : ''}">
          ${renderImagePickerHTML('inpGSrc', 'Gallery Image (ಫೋಟೋ ಆಯ್ಕೆಮಾಡಿ)', item.type === 'image' ? item.src : '', 'images/gallery-1.jpg')}
        </div>
        <div id="galleryVideoInputWrap" class="form-group" style="${item.type === 'video' ? '' : 'display:none;'}">
          <label class="form-label">YouTube Video Embed URL</label>
          <input type="text" id="inpGVideoSrc" class="form-control" value="${item.type === 'video' ? (item.src || '').replace(/"/g, '&quot;') : ''}" placeholder="https://www.youtube.com/embed/...">
        </div>
        <div class="form-group">
          <label class="form-label">Caption (English)</label>
          <input type="text" id="inpGCaptionEn" class="form-control" required value="${(item.caption_en || '').replace(/"/g, '&quot;')}">
        </div>
        <div class="form-group">
          <label class="form-label">Caption (ಕನ್ನಡ)</label>
          <input type="text" id="inpGCaptionKn" class="form-control" required value="${(item.caption_kn || '').replace(/"/g, '&quot;')}">
        </div>
        <button type="submit" class="btn btn-primary btn-block">Update Gallery Media</button>
      </form>
    `);

    initImagePicker('inpGSrc');

    const typeSelect = document.getElementById('inpGType');
    const imgWrap = document.getElementById('galleryImagePickerWrap');
    const vidWrap = document.getElementById('galleryVideoInputWrap');

    typeSelect.addEventListener('change', () => {
      if (typeSelect.value === 'video') {
        imgWrap.style.display = 'none';
        vidWrap.style.display = 'block';
      } else {
        imgWrap.style.display = 'block';
        vidWrap.style.display = 'none';
      }
    });

    document.getElementById('modalFormGalleryEdit').onsubmit = (e) => {
      e.preventDefault();
      const type = typeSelect.value;
      const src = type === 'video' 
        ? document.getElementById('inpGVideoSrc').value.trim() 
        : (document.getElementById('inpGSrc').value.trim() || 'images/gallery-1.jpg');

      item.type = type;
      item.category = document.getElementById('inpGCat').value;
      item.src = src;
      item.caption_en = document.getElementById('inpGCaptionEn').value.trim();
      item.caption_kn = document.getElementById('inpGCaptionKn').value.trim();

      DyfiDataStore.set(DYFI_DATA_KEYS.GALLERY, list);
      closeModal();
      renderGallery();
      showToast('Gallery media updated successfully');
    };
  };

  window.deleteGallery = function(index) {
    if (confirm('Delete this gallery item?')) {
      const list = DyfiDataStore.get(DYFI_DATA_KEYS.GALLERY) || [];
      list.splice(index, 1);
      DyfiDataStore.set(DYFI_DATA_KEYS.GALLERY, list);
      renderGallery();
      showToast('Gallery item removed');
    }
  };

  document.getElementById('btnOpenAddGallery').addEventListener('click', () => {
    openModal('Add Gallery Media', `
      <form id="modalFormGallery">
        <div class="form-row">
          <div class="form-group col-6">
            <label class="form-label">Media Type</label>
            <select id="inpGType" class="form-control">
              <option value="image">Photo / Image</option>
              <option value="video">YouTube Video Embed</option>
            </select>
          </div>
          <div class="form-group col-6">
            <label class="form-label">Category</label>
            <select id="inpGCat" class="form-control">
              <option value="rally">Rallies</option>
              <option value="conf">Conferences</option>
              <option value="health">Health & Blood</option>
              <option value="relief">Relief Work</option>
              <option value="video">Video Stream</option>
            </select>
          </div>
        </div>
        <div id="galleryImagePickerWrap">
          ${renderImagePickerHTML('inpGSrc', 'Gallery Image (ಫೋಟೋ ಆಯ್ಕೆಮಾಡಿ)', '', 'images/gallery-1.jpg')}
        </div>
        <div id="galleryVideoInputWrap" class="form-group" style="display:none;">
          <label class="form-label">YouTube Video Embed URL</label>
          <input type="text" id="inpGVideoSrc" class="form-control" placeholder="https://www.youtube.com/embed/...">
        </div>
        <div class="form-group">
          <label class="form-label">Caption (English)</label>
          <input type="text" id="inpGCaptionEn" class="form-control" required placeholder="Convention rally photo">
        </div>
        <div class="form-group">
          <label class="form-label">Caption (ಕನ್ನಡ)</label>
          <input type="text" id="inpGCaptionKn" class="form-control" required placeholder="ಸಮಾವೇಶದ ರ‍್ಯಾಲಿ ಚಿತ್ರ">
        </div>
        <button type="submit" class="btn btn-primary btn-block">Add Media</button>
      </form>
    `);

    initImagePicker('inpGSrc');

    const typeSelect = document.getElementById('inpGType');
    const imgWrap = document.getElementById('galleryImagePickerWrap');
    const vidWrap = document.getElementById('galleryVideoInputWrap');

    typeSelect.addEventListener('change', () => {
      if (typeSelect.value === 'video') {
        imgWrap.style.display = 'none';
        vidWrap.style.display = 'block';
      } else {
        imgWrap.style.display = 'block';
        vidWrap.style.display = 'none';
      }
    });

    document.getElementById('modalFormGallery').onsubmit = (e) => {
      e.preventDefault();
      const type = typeSelect.value;
      const src = type === 'video'
        ? document.getElementById('inpGVideoSrc').value.trim()
        : (document.getElementById('inpGSrc').value.trim() || 'images/gallery-1.jpg');

      const list = DyfiDataStore.get(DYFI_DATA_KEYS.GALLERY) || [];
      list.push({
        id: 'g_' + Date.now(),
        type: type,
        category: document.getElementById('inpGCat').value,
        src: src,
        caption_en: document.getElementById('inpGCaptionEn').value.trim(),
        caption_kn: document.getElementById('inpGCaptionKn').value.trim()
      });
      DyfiDataStore.set(DYFI_DATA_KEYS.GALLERY, list);
      closeModal();
      renderGallery();
      showToast('Gallery media added');
    };
  });

  // Blood Donors
  function renderBloodDonors() {
    const list = DyfiDataStore.get(DYFI_DATA_KEYS.BLOOD_DONORS) || [];
    const q = document.getElementById('filterDonorQuery').value.toLowerCase();
    const grp = document.getElementById('filterDonorGroup').value;
    const dist = document.getElementById('filterDonorDistrict').value;

    const filtered = list.filter(d => {
      const matchQ = !q || d.name.toLowerCase().includes(q) || d.phone.includes(q);
      const matchG = !grp || d.group === grp;
      const matchD = !dist || d.district === dist;
      return matchQ && matchG && matchD;
    });

    const tbody = document.getElementById('donorsTableBody');
    tbody.innerHTML = filtered.map((d, idx) => `
      <tr>
        <td><strong>${d.name}</strong></td>
        <td><a href="tel:${d.phone}" style="color:#60a5fa; text-decoration:none;"><i class="fa-solid fa-phone"></i> ${d.phone}</a></td>
        <td><span class="badge-tag" style="background:rgba(220,38,38,0.2); color:#f87171;">${d.group}</span></td>
        <td>${d.district}</td>
        <td>${d.date || 'Active'}</td>
        <td>
          <button class="btn btn-sm btn-outline-danger" onclick="deleteDonor(${idx})">Delete</button>
        </td>
      </tr>
    `).join('');
  }

  window.deleteDonor = function(index) {
    if (confirm('Remove donor record?')) {
      const list = DyfiDataStore.get(DYFI_DATA_KEYS.BLOOD_DONORS) || [];
      list.splice(index, 1);
      DyfiDataStore.set(DYFI_DATA_KEYS.BLOOD_DONORS, list);
      renderBloodDonors();
      renderDashboard();
      showToast('Donor record removed');
    }
  };

  document.getElementById('filterDonorQuery').addEventListener('input', renderBloodDonors);
  document.getElementById('filterDonorGroup').addEventListener('change', renderBloodDonors);
  document.getElementById('filterDonorDistrict').addEventListener('change', renderBloodDonors);

  document.getElementById('btnOpenAddDonor').addEventListener('click', () => {
    openModal('Register Volunteer Blood Donor', `
      <form id="modalFormDonor">
        <div class="form-group">
          <label class="form-label">Full Name</label>
          <input type="text" id="inpDName" class="form-control" required placeholder="Donor name">
        </div>
        <div class="form-group">
          <label class="form-label">Contact Phone</label>
          <input type="tel" id="inpDPhone" class="form-control" required placeholder="+91 9448123456">
        </div>
        <div class="form-row">
          <div class="form-group col-6">
            <label class="form-label">Blood Group</label>
            <select id="inpDGroup" class="form-control" required>
              <option value="A+">A +ve</option>
              <option value="A-">A -ve</option>
              <option value="B+">B +ve</option>
              <option value="B-">B -ve</option>
              <option value="O+">O +ve</option>
              <option value="O-">O -ve</option>
              <option value="AB+">AB +ve</option>
              <option value="AB-">AB -ve</option>
            </select>
          </div>
          <div class="form-group col-6">
            <label class="form-label">District</label>
            <select id="inpDDist" class="form-control" required>
              <option value="Bengaluru">Bengaluru</option>
              <option value="Dakshina Kannada">Dakshina Kannada</option>
              <option value="Udupi">Udupi</option>
              <option value="Mysuru">Mysuru</option>
              <option value="Dharwad">Dharwad</option>
              <option value="Belagavi">Belagavi</option>
              <option value="Kalaburagi">Kalaburagi</option>
              <option value="Shivamogga">Shivamogga</option>
            </select>
          </div>
        </div>
        <button type="submit" class="btn btn-primary btn-block">Save Donor</button>
      </form>
    `);

    document.getElementById('modalFormDonor').onsubmit = (e) => {
      e.preventDefault();
      const list = DyfiDataStore.get(DYFI_DATA_KEYS.BLOOD_DONORS) || [];
      list.unshift({
        id: 'bd_' + Date.now(),
        name: document.getElementById('inpDName').value.trim(),
        phone: document.getElementById('inpDPhone').value.trim(),
        group: document.getElementById('inpDGroup').value,
        district: document.getElementById('inpDDist').value,
        date: new Date().toISOString().split('T')[0]
      });
      DyfiDataStore.set(DYFI_DATA_KEYS.BLOOD_DONORS, list);
      closeModal();
      renderBloodDonors();
      renderDashboard();
      showToast('Blood donor registered');
    };
  });

  // Export CSV Donors
  document.getElementById('btnExportDonors').addEventListener('click', () => {
    const list = DyfiDataStore.get(DYFI_DATA_KEYS.BLOOD_DONORS) || [];
    let csv = 'Name,Phone,BloodGroup,District,RegistrationDate\n';
    list.forEach(d => {
      csv += `"${d.name}","${d.phone}","${d.group}","${d.district}","${d.date}"\n`;
    });
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `DYFI_Karnataka_Blood_Donors_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    showToast('Blood Donors list exported to CSV');
  });

  // Messages
  function renderMessages() {
    const list = DyfiDataStore.get(DYFI_DATA_KEYS.MESSAGES) || [];
    const tbody = document.getElementById('messagesTableBody');
    tbody.innerHTML = list.map((m, idx) => `
      <tr>
        <td><strong>${m.name}</strong></td>
        <td><a href="tel:${m.phone}" style="color:#60a5fa; text-decoration:none;"><i class="fa-solid fa-phone"></i> ${m.phone}</a></td>
        <td>${m.district}</td>
        <td><div style="max-height:80px; overflow-y:auto; font-size:0.85rem;">${m.message}</div></td>
        <td>
          <span class="badge-tag" style="background:${m.status === 'Unread' ? 'rgba(239,68,68,0.2)' : 'rgba(16,185,129,0.2)'}; color:${m.status === 'Unread' ? '#f87171' : '#34d399'};">
            ${m.status || 'Unread'}
          </span>
        </td>
        <td>
          <button class="btn btn-sm btn-outline-danger" onclick="deleteMessage(${idx})">Delete</button>
        </td>
      </tr>
    `).join('');
  }

  window.deleteMessage = function(index) {
    if (confirm('Delete this message?')) {
      const list = DyfiDataStore.get(DYFI_DATA_KEYS.MESSAGES) || [];
      list.splice(index, 1);
      DyfiDataStore.set(DYFI_DATA_KEYS.MESSAGES, list);
      renderMessages();
      renderDashboard();
      showToast('Message deleted');
    }
  };

  document.getElementById('btnClearMessages').addEventListener('click', () => {
    if (confirm('Are you sure you want to clear all inquiries?')) {
      DyfiDataStore.set(DYFI_DATA_KEYS.MESSAGES, []);
      renderMessages();
      renderDashboard();
      showToast('All contact enquiries cleared');
    }
  });

  // Settings / Backup
  document.getElementById('btnExportBackup').addEventListener('click', () => {
    const backup = {};
    Object.keys(DYFI_DATA_KEYS).forEach(k => {
      backup[DYFI_DATA_KEYS[k]] = DyfiDataStore.get(DYFI_DATA_KEYS[k]);
    });
    const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `DYFI_Karnataka_Complete_Backup_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    showToast('Complete backup exported successfully!');
  });

  document.getElementById('fileImportBackup').addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const data = JSON.parse(evt.target.result);
        Object.keys(data).forEach(k => {
          localStorage.setItem(k, JSON.stringify(data[k]));
        });
        showToast('Backup restored successfully!');
        renderAll();
      } catch (err) {
        alert('Invalid JSON backup file!');
      }
    };
    reader.readAsText(file);
  });

  document.getElementById('btnResetDefaults').addEventListener('click', () => {
    if (confirm('RESET ALL DATA to official factory defaults? Any custom news or statements will be reset.')) {
      DyfiDataStore.resetToDefaults();
      renderAll();
      showToast('Website reset to default official data');
    }
  });

  // Master Render
  function renderAll() {
    renderDashboard();
    renderTicker();
    renderSiteContent();
    renderNews();
    renderActivities();
    renderCampaigns();
    renderStatements();
    renderMartyrs();
    renderLeaders();
    renderDistricts();
    renderGallery();
    renderBloodDonors();
    renderMessages();
  }

  // Initial call
  renderAll();
});
