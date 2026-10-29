/**
 * SFI Dakshina Kannada - Firebase Integration & Cloud Database Synchronization
 * Project: sfidk-8d9ab
 */

const firebaseConfig = {
  apiKey: "AIzaSyDMbryuPCXzmeJ8jRLLAQUKFrTlDG30kJY",
  authDomain: "sfidk-8d9ab.firebaseapp.com",
  projectId: "sfidk-8d9ab",
  storageBucket: "sfidk-8d9ab.firebasestorage.app",
  messagingSenderId: "897261038408",
  appId: "1:897261038408:web:355756f9f721a1007c217d",
  measurementId: "G-XK3L7CP3XH"
};

window.SfiFirebase = {
  initialized: false,
  db: null,
  analytics: null,

  init() {
    try {
      if (typeof firebase !== 'undefined' && !this.initialized) {
        if (!firebase.apps.length) {
          firebase.initializeApp(firebaseConfig);
        }
        if (typeof firebase.firestore === 'function') {
          this.db = firebase.firestore();
        }
        if (typeof firebase.analytics === 'function') {
          try {
            this.analytics = firebase.analytics();
          } catch (e) {
            console.info('Firebase analytics initialized in browser.');
          }
        }
        this.initialized = true;

        if (this.db) {
          this.probeCloudHealth();
        }
      }
    } catch (err) {
      console.warn('Firebase init warning:', err);
      this.updateStatusBadge(false, 'Local Storage Mode');
    }
  },

  probeCloudHealth() {
    if (!this.db) return;
    this.db.collection('settings').doc('ping').get()
      .then(() => {
        this.updateStatusBadge(true, 'Cloud Sync Active');
      })
      .catch((err) => {
        console.warn('Firebase offline fallback:', err);
        this.updateStatusBadge(false, 'Local Storage Mode');
      });
  },

  updateStatusBadge(online, label) {
    const badge = document.getElementById('firebaseStatusBadge');
    if (!badge) return;
    badge.className = online ? 'status-online' : 'status-offline';
    badge.title = label;
  }
};

window.DyfiFirebase = window.SfiFirebase;

if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    window.SfiFirebase.init();
  });
}
