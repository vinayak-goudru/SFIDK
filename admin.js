const firebaseConfig = {
apiKey: "AIzaSyDMbryuPCXzmeJ8jRLLAQUKFrTlDG30kJY",
authDomain: "sfidk-8d9ab.firebaseapp.com",
projectId: "sfidk-8d9ab",
storageBucket: "sfidk-8d9ab.firebasestorage.app",
messagingSenderId: "897261038408",
appId: "1:897261038408:web:355756f9f721a1007c217d",
measurementId: "G-XK3L7CP3XH"
};

// Initialize Firebase using the Compat API (Works with file:// protocol)
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// DOM Elements
const authLoading = document.getElementById("auth-loading");
const loginContainer = document.getElementById("login-container");
const dashboardContainer = document.getElementById("dashboard-container");

const loginForm = document.getElementById("admin-login-form");
const emailInput = document.getElementById("admin-email");
const passwordInput = document.getElementById("admin-password");
const loginBtn = document.getElementById("login-btn");
const loginError = document.getElementById("login-error");

const logoutBtn = document.getElementById("logout-btn");

// Auth State Observer
auth.onAuthStateChanged((user) => {
authLoading.style.display = "none";
if (user) {
// User is signed in, show dashboard
loginContainer.style.display = "none";
dashboardContainer.style.display = "block";
} else {
// User is signed out, show login form
dashboardContainer.style.display = "none";
loginContainer.style.display = "flex";
}
});

// Login Form Submit Handler
loginForm.addEventListener("submit", async (e) => {
e.preventDefault();
loginError.style.display = "none";
loginBtn.classList.add("btn-loading");

const email = emailInput.value.trim();
const password = passwordInput.value;

try {
await auth.signInWithEmailAndPassword(email, password);
// onAuthStateChanged will handle the UI update
} catch (error) {
console.error("Login Error:", error.message);
loginError.textContent = "Invalid email or password. Please try again.";
loginError.style.display = "block";
} finally {
loginBtn.classList.remove("btn-loading");
}
});

// Logout Button Handler
logoutBtn.addEventListener("click", async () => {
try {
await auth.signOut();
// onAuthStateChanged will handle the UI update
} catch (error) {
console.error("Logout Error:", error.message);
alert("An error occurred while logging out.");
}
});

// --- Dashboard UI Logic ---
const sidebarBtns = document.querySelectorAll(".sidebar-btn");
const dashboardSections = document.querySelectorAll(".dashboard-section");

sidebarBtns.forEach(btn => {
btn.addEventListener("click", () => {
// Remove active class from all
sidebarBtns.forEach(b => b.classList.remove("active"));
dashboardSections.forEach(s => s.classList.remove("active"));

// Add active class to clicked
btn.classList.add("active");
const targetId = btn.getAttribute("data-target");
document.getElementById(targetId).classList.add("active");
});
});

// --- Cloudinary Upload Helper ---
const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/avytjxre/auto/upload";
const CLOUDINARY_UPLOAD_PRESET = "sfi_dk_preset"; // USER NEEDS TO CREATE THIS IN CLOUDINARY

async function uploadToCloudinary(file) {
const formData = new FormData();
formData.append("file", file);
formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

try {
const response = await fetch(CLOUDINARY_URL, {
method: "POST",
body: formData
});
const data = await response.json();
if (data.secure_url) {
return data.secure_url;
} else {
throw new Error(data.error?.message || "Upload failed");
}
} catch (error) {
console.error("Cloudinary Error:", error);
throw error;
}
}

// --- News Management Logic ---
const addNewsForm = document.getElementById("add-news-form");
const newsTitleInput = document.getElementById("news-title");
const newsContentInput = document.getElementById("news-content");
const newsImageFileInput = document.getElementById("news-image-file");
const newsSubmitBtn = document.getElementById("news-submit-btn");
const newsTableBody = document.getElementById("news-table-body");

// Fetch News
async function loadNews() {
try {
const snapshot = await db.collection("news").orderBy("createdAt", "desc").get();
newsTableBody.innerHTML = "";

if (snapshot.empty) {
newsTableBody.innerHTML = `<tr><td colspan="3" style="text-align:center; color:var(--text-muted);">No news found.</td></tr>`;
return;
}

snapshot.forEach(doc => {
const data = doc.data();
const tr = document.createElement("tr");
const date = data.createdAt ? data.createdAt.toDate().toLocaleDateString('kn-IN') : 'N/A';
tr.innerHTML = `
<td>${date}</td>
<td>${data.title}</td>
<td>
<button class="action-btn" onclick="deleteNews('${doc.id}')"><i data-lucide="trash-2"></i></button>
</td>
`;
newsTableBody.appendChild(tr);
});
if(window.lucide) lucide.createIcons();
} catch (error) {
console.error("Error loading news:", error);
newsTableBody.innerHTML = `<tr><td colspan="3" style="text-align:center; color:var(--danger);">Error loading news.</td></tr>`;
}
}

// Add News
addNewsForm.addEventListener("submit", async (e) => {
e.preventDefault();
newsSubmitBtn.classList.add("btn-loading");

try {
let imageUrl = null;
if (newsImageFileInput.files.length > 0) {
imageUrl = await uploadToCloudinary(newsImageFileInput.files[0]);
}

await db.collection("news").add({
title: newsTitleInput.value.trim(),
content: newsContentInput.value.trim(),
imageUrl: imageUrl,
createdAt: firebase.firestore.FieldValue.serverTimestamp()
});

addNewsForm.reset();
alert("News added successfully!");
loadNews();
} catch (error) {
console.error("Error adding news:", error);
alert("Failed to add news. Please ensure Cloudinary preset is correct.");
} finally {
newsSubmitBtn.classList.remove("btn-loading");
}
});

// Delete News
window.deleteNews = async function(docId) {
if(confirm("Delete this news?")) {
await db.collection("news").doc(docId).delete();
loadNews();
}
}

// --- Gallery Management Logic ---
const addGalleryForm = document.getElementById("add-gallery-form");
const galleryTableBody = document.getElementById("gallery-table-body");
const gallerySubmitBtn = document.getElementById("gallery-submit-btn");

async function loadGallery() {
try {
const snapshot = await db.collection("gallery").orderBy("createdAt", "desc").get();
galleryTableBody.innerHTML = "";
if (snapshot.empty) {
galleryTableBody.innerHTML = `<tr><td colspan="4" style="text-align:center; color:var(--text-muted);">No gallery items.</td></tr>`;
return;
}
snapshot.forEach(doc => {
const data = doc.data();
const tr = document.createElement("tr");
tr.innerHTML = `
<td><img src="${data.url}" style="width:50px; height:50px; object-fit:cover; border-radius:4px;"></td>
<td>${data.title}</td>
<td>${data.category}</td>
<td>
<button class="action-btn" onclick="deleteGallery('${doc.id}')"><i data-lucide="trash-2"></i></button>
</td>
`;
galleryTableBody.appendChild(tr);
});
if(window.lucide) lucide.createIcons();
} catch (error) {
galleryTableBody.innerHTML = `<tr><td colspan="4" style="text-align:center; color:var(--danger);">Error loading gallery.</td></tr>`;
}
}

addGalleryForm.addEventListener("submit", async (e) => {
e.preventDefault();
gallerySubmitBtn.classList.add("btn-loading");

try {
const file = document.getElementById("gallery-file").files[0];
const url = await uploadToCloudinary(file);

await db.collection("gallery").add({
title: document.getElementById("gallery-title").value.trim(),
category: document.getElementById("gallery-category").value,
desc: document.getElementById("gallery-desc").value.trim(),
url: url,
createdAt: firebase.firestore.FieldValue.serverTimestamp()
});

addGalleryForm.reset();
alert("Added to Gallery!");
loadGallery();
} catch (error) {
console.error("Gallery upload error:", error);
alert("Upload failed.");
} finally {
gallerySubmitBtn.classList.remove("btn-loading");
}
});

window.deleteGallery = async function(docId) {
if(confirm("Delete this gallery item?")) {
await db.collection("gallery").doc(docId).delete();
loadGallery();
}
}

// --- Events Management Logic ---
const addEventForm = document.getElementById("add-event-form");
const eventsTableBody = document.getElementById("events-table-body");
const eventSubmitBtn = document.getElementById("event-submit-btn");

async function loadEvents() {
try {
const snapshot = await db.collection("events").orderBy("createdAt", "desc").get();
eventsTableBody.innerHTML = "";
if (snapshot.empty) {
eventsTableBody.innerHTML = `<tr><td colspan="3" style="text-align:center; color:var(--text-muted);">No events found.</td></tr>`;
return;
}
snapshot.forEach(doc => {
const data = doc.data();
const tr = document.createElement("tr");
tr.innerHTML = `
<td>${data.title}</td>
<td>${data.targetSignatures || 'N/A'}</td>
<td>
<button class="action-btn" onclick="deleteEvent('${doc.id}')"><i data-lucide="trash-2"></i></button>
</td>
`;
eventsTableBody.appendChild(tr);
});
if(window.lucide) lucide.createIcons();
} catch (error) {
eventsTableBody.innerHTML = `<tr><td colspan="3" style="text-align:center; color:var(--danger);">Error loading events.</td></tr>`;
}
}

addEventForm.addEventListener("submit", async (e) => {
e.preventDefault();
eventSubmitBtn.classList.add("btn-loading");
try {
await db.collection("events").add({
title: document.getElementById("event-title").value.trim(),
desc: document.getElementById("event-desc").value.trim(),
targetSignatures: document.getElementById("event-target").value || null,
createdAt: firebase.firestore.FieldValue.serverTimestamp()
});
addEventForm.reset();
alert("Event published!");
loadEvents();
} catch (error) {
console.error("Event upload error:", error);
alert("Publish failed.");
} finally {
eventSubmitBtn.classList.remove("btn-loading");
}
});

window.deleteEvent = async function(docId) {
if(confirm("Delete this event?")) {
await db.collection("events").doc(docId).delete();
loadEvents();
}
}

// Ensure all load functions run on auth
auth.onAuthStateChanged((user) => {
    if (user) {
        loadNews();
        loadGallery();
        loadEvents();
        loadMembers();
        loadGrievances();
        loadBloodDonors();
    }
});

// --- Dynamic Sections Logic (Memberships, Grievances, Blood Donors) ---

function formatDate(timestamp) {
    if (!timestamp) return 'N/A';
    if (timestamp.toDate) return timestamp.toDate().toLocaleDateString('kn-IN');
    return new Date(timestamp).toLocaleDateString('kn-IN');
}

async function loadMembers() {
    const tbody = document.getElementById("members-table-body");
    if (!tbody) return;
    try {
        const snapshot = await db.collection("members").orderBy("createdAt", "desc").get();
        tbody.innerHTML = "";
        if (snapshot.empty) {
            tbody.innerHTML = '<tr><td colspan="5" style="text-align:center; color:var(--text-muted); padding:1.5rem;">No membership registrations found.</td></tr>';
            return;
        }
        snapshot.forEach(doc => {
            const data = doc.data();
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td>${formatDate(data.createdAt)}</td>
                <td><strong>${data.name || 'N/A'}</strong></td>
                <td>${data.college || 'N/A'}</td>
                <td><a href="tel:${data.phone}" style="color:var(--primary);">${data.phone || 'N/A'}</a></td>
                <td>
                    <button class="action-btn" onclick="deleteDoc('members', '${doc.id}', loadMembers)" title="Delete Registration"><i data-lucide="trash-2"></i></button>
                </td>
            `;
            tbody.appendChild(tr);
        });
        if (window.lucide) lucide.createIcons();
    } catch (error) {
        console.error("Error loading members:", error);
        tbody.innerHTML = '<tr><td colspan="5" style="text-align:center; color:var(--danger); padding:1.5rem;">Error loading members from database.</td></tr>';
    }
}

async function loadGrievances() {
    const tbody = document.getElementById("grievances-table-body");
    if (!tbody) return;
    try {
        const snapshot = await db.collection("grievances").orderBy("createdAt", "desc").get();
        tbody.innerHTML = "";
        if (snapshot.empty) {
            tbody.innerHTML = '<tr><td colspan="8" style="text-align:center; color:var(--text-muted); padding:1.5rem;">No grievances submitted yet.</td></tr>';
            return;
        }
        snapshot.forEach(doc => {
            const data = doc.data();
            const isResolved = data.status === 'Resolved';
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td>${formatDate(data.createdAt)}</td>
                <td><strong>${data.anonymous ? '<em>[Anonymous]</em>' : (data.name || 'N/A')}</strong></td>
                <td>${data.phone ? `<a href="tel:${data.phone}" style="color:var(--primary);">${data.phone}</a>` : 'N/A'}</td>
                <td>${data.college || 'N/A'}</td>
                <td>${data.taluk || 'N/A'}</td>
                <td><span class="badge" style="background:rgba(229,57,53,0.1); color:var(--primary); padding:2px 8px; border-radius:4px; font-size:0.8rem;">${data.category || 'General'}</span></td>
                <td><span style="color:${isResolved ? '#10b981' : '#f59e0b'}; font-weight:600;">${data.status || 'Pending'}</span></td>
                <td>
                    ${!isResolved ? `<button class="action-btn" style="color:#10b981; margin-right:8px;" onclick="resolveGrievance('${doc.id}')" title="Mark Resolved"><i data-lucide="check-circle"></i></button>` : ''}
                    <button class="action-btn" onclick="deleteDoc('grievances', '${doc.id}', loadGrievances)" title="Delete Grievance"><i data-lucide="trash-2"></i></button>
                </td>
            `;
            tbody.appendChild(tr);
        });
        if (window.lucide) lucide.createIcons();
    } catch (error) {
        console.error("Error loading grievances:", error);
        tbody.innerHTML = '<tr><td colspan="8" style="text-align:center; color:var(--danger); padding:1.5rem;">Error loading grievances.</td></tr>';
    }
}

window.resolveGrievance = async function(docId) {
    if (confirm("Mark this student grievance as resolved?")) {
        try {
            await db.collection("grievances").doc(docId).update({ 
                status: 'Resolved',
                resolvedAt: firebase.firestore.FieldValue.serverTimestamp()
            });
            loadGrievances();
        } catch (err) {
            console.error("Error updating grievance:", err);
            alert("Could not update grievance status.");
        }
    }
};

async function loadBloodDonors() {
    const tbody = document.getElementById("blood-donors-table-body");
    if (!tbody) return;
    try {
        const snapshot = await db.collection("blood_donors").orderBy("createdAt", "desc").get();
        tbody.innerHTML = "";
        if (snapshot.empty) {
            tbody.innerHTML = '<tr><td colspan="7" style="text-align:center; color:var(--text-muted); padding:1.5rem;">No blood donors registered yet.</td></tr>';
            return;
        }
        snapshot.forEach(doc => {
            const data = doc.data();
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td>${formatDate(data.createdAt)}</td>
                <td><strong>${data.name || 'N/A'}</strong></td>
                <td><span style="background:rgba(229,57,53,0.15); color:#e53935; font-weight:700; padding:2px 8px; border-radius:4px;">${data.bloodGroup || 'N/A'}</span></td>
                <td>${data.district || 'Dakshina Kannada'}</td>
                <td><a href="tel:${data.phone}" style="color:var(--primary); font-weight:600;">${data.phone || 'N/A'}</a></td>
                <td>${data.lastDonated || 'Available'}</td>
                <td>
                    <button class="action-btn" onclick="deleteDoc('blood_donors', '${doc.id}', loadBloodDonors)" title="Remove Donor"><i data-lucide="trash-2"></i></button>
                </td>
            `;
            tbody.appendChild(tr);
        });
        if (window.lucide) lucide.createIcons();
    } catch (error) {
        console.error("Error loading blood donors:", error);
        tbody.innerHTML = '<tr><td colspan="7" style="text-align:center; color:var(--danger); padding:1.5rem;">Error loading blood donors.</td></tr>';
    }
}

window.deleteDoc = async function(collection, docId, callback) {
    if (confirm("Delete this record permanently?")) {
        try {
            await db.collection(collection).doc(docId).delete();
            if (typeof callback === 'function') callback();
        } catch (err) {
            console.error("Error deleting document:", err);
            alert("Delete failed.");
        }
    }
};

// Also trigger loads on tab switch
document.querySelectorAll(".sidebar-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        const target = btn.getAttribute("data-target");
        if (target === "members-section") loadMembers();
        if (target === "grievances-section") loadGrievances();
        if (target === "blood-donors-section") loadBloodDonors();
        if (target === "news-section") loadNews();
        if (target === "gallery-section") loadGallery();
        if (target === "events-section") loadEvents();
    });
});

