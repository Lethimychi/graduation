// ============================================================
// Firebase Configuration with localStorage Fallback
// ============================================================
// To enable Firebase (shared data across all visitors):
// 1. Go to https://console.firebase.google.com
// 2. Create a project → Add Web App → Copy config
// 3. Replace the firebaseConfig below with your real credentials
// 4. In Firestore, create database and set rules to allow read/write
// ============================================================

const firebaseConfig = {
  apiKey: "AIzaSyAxKLtE553Ew1umU5xsqdS2d8FsFGk5y_g",
  authDomain: "graduation-lethimychi.firebaseapp.com",
  projectId: "graduation-lethimychi",
  storageBucket: "graduation-lethimychi.firebasestorage.app",
  messagingSenderId: "1008285466610",
  appId: "1:1008285466610:web:ea889154ea7bf341bdf56b",
  measurementId: "G-FF655C9345"
};

// Detect if Firebase is properly configured (not demo credentials)
const IS_REAL_FIREBASE = firebaseConfig.apiKey !== "demo-key" && firebaseConfig.projectId !== "demo-project";

let db = null;
let isFirebaseReady = false;
let addDoc, collection, onSnapshot, query, orderBy, serverTimestamp;

if (IS_REAL_FIREBASE) {
  try {
    const firebaseApp = await import('firebase/app');
    const firestore = await import('firebase/firestore');
    const app = firebaseApp.initializeApp(firebaseConfig);
    db = firestore.getFirestore(app);
    addDoc = firestore.addDoc;
    collection = firestore.collection;
    onSnapshot = firestore.onSnapshot;
    query = firestore.query;
    orderBy = firestore.orderBy;
    serverTimestamp = firestore.serverTimestamp;
    isFirebaseReady = true;
    console.log('✅ Firebase connected successfully!');
  } catch (error) {
    console.warn('⚠️ Firebase initialization failed. Using localStorage.', error);
    isFirebaseReady = false;
  }
} else {
  console.info('ℹ️ Firebase not configured. Using localStorage for wishes & RSVP. To share data across visitors, add your Firebase credentials in src/firebase.js');
}

// ============ LOCAL STORAGE HELPERS ============
const LOCAL_WISHES_KEY = 'graduation_wishes';
const LOCAL_RSVP_KEY = 'graduation_rsvp';

function getLocalData(key) {
  try {
    return JSON.parse(localStorage.getItem(key) || '[]');
  } catch {
    return [];
  }
}

function setLocalData(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

// Timeout wrapper - prevents Firebase calls from hanging forever
function withTimeout(promise, ms = 5000) {
  return Promise.race([
    promise,
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Firebase operation timed out')), ms)
    ),
  ]);
}

// ============ WISHES ============
export async function addWish(wish) {
  const wishData = {
    ...wish,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
  };

  if (isFirebaseReady && db) {
    try {
      await withTimeout(addDoc(collection(db, 'wishes'), {
        ...wish,
        createdAt: serverTimestamp(),
      }));
      return true;
    } catch (error) {
      console.warn('Firebase write failed, falling back to localStorage:', error);
    }
  }
  
  // localStorage fallback
  const wishes = getLocalData(LOCAL_WISHES_KEY);
  wishes.unshift(wishData);
  setLocalData(LOCAL_WISHES_KEY, wishes);
  return true;
}

export function subscribeToWishes(callback) {
  if (isFirebaseReady && db) {
    try {
      const q = query(collection(db, 'wishes'), orderBy('createdAt', 'desc'));
      return onSnapshot(q, (snapshot) => {
        const wishes = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt?.toDate?.()?.toISOString() || new Date().toISOString(),
        }));
        callback(wishes);
      }, (error) => {
        console.warn('Firebase snapshot error, using localStorage:', error);
        callback(getLocalData(LOCAL_WISHES_KEY));
      });
    } catch (error) {
      console.warn('Firebase subscribe failed:', error);
    }
  }

  // localStorage fallback - poll every 2 seconds
  callback(getLocalData(LOCAL_WISHES_KEY));
  const interval = setInterval(() => {
    callback(getLocalData(LOCAL_WISHES_KEY));
  }, 2000);
  return () => clearInterval(interval);
}

// ============ RSVP ============
export async function addRSVP(rsvp) {
  const rsvpData = {
    ...rsvp,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
  };

  if (isFirebaseReady && db) {
    try {
      await withTimeout(addDoc(collection(db, 'rsvps'), {
        ...rsvp,
        createdAt: serverTimestamp(),
      }));
      return true;
    } catch (error) {
      console.warn('Firebase write failed, falling back to localStorage:', error);
    }
  }

  // localStorage fallback
  const rsvps = getLocalData(LOCAL_RSVP_KEY);
  rsvps.unshift(rsvpData);
  setLocalData(LOCAL_RSVP_KEY, rsvps);
  return true;
}

export function subscribeToRSVPs(callback) {
  if (isFirebaseReady && db) {
    try {
      const q = query(collection(db, 'rsvps'), orderBy('createdAt', 'desc'));
      return onSnapshot(q, (snapshot) => {
        const rsvps = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt?.toDate?.()?.toISOString() || new Date().toISOString(),
        }));
        callback(rsvps);
      }, (error) => {
        console.warn('Firebase snapshot error, using localStorage:', error);
        callback(getLocalData(LOCAL_RSVP_KEY));
      });
    } catch (error) {
      console.warn('Firebase subscribe failed:', error);
    }
  }

  // localStorage fallback
  callback(getLocalData(LOCAL_RSVP_KEY));
  const interval = setInterval(() => {
    callback(getLocalData(LOCAL_RSVP_KEY));
  }, 2000);
  return () => clearInterval(interval);
}

export { isFirebaseReady };
