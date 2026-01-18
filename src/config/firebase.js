import { initializeApp } from 'firebase/app';
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
} from 'firebase/auth';
import {
  doc,
  getFirestore,
  setDoc,
  getDoc,
  collection,
  query,
  where,
  getDocs,
} from 'firebase/firestore';
import { toast } from 'react-toastify';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

// Google Provider
const googleProvider = new GoogleAuthProvider();

/* ===================== SIGN UP ===================== */
const signup = async (username, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;

    await setDoc(doc(db, 'users', user.uid), {
      id: user.uid,
      username: username.toLowerCase(),
      email,
      name: '',
      avatar: '',
      bio: 'Hey, There I am using chat app.',
      lastSeen: Date.now(),
    });

    await setDoc(doc(db, 'chats', user.uid), {
      chatData: [],
    });
  } catch (error) {
    console.error(error);
    toast.error(error.code.split('/')[1].split('-').join(' '));
  }
};

/* ===================== LOGIN ===================== */
const login = async (email, password) => {
  try {
    const res = await signInWithEmailAndPassword(auth, email, password);
    // update last seen on log in
    await setDoc(
      doc(db, 'users', res.user.uid),
      { lastSeen: Date.now() },
      { merge: true }
    );
  } catch (error) {
    console.error(error);
    toast.error(error.code.split('/')[1].split('-').join(' '));
  }
};

/* ===================== GOOGLE LOGIN ===================== */
const googleLogin = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;

    const userRef = doc(db, 'users', user.uid);
    const snap = await getDoc(userRef);

    // Create user only first time
    if (!snap.exists()) {
      await setDoc(userRef, {
        id: user.uid,
        username:
          user.displayName?.toLowerCase().replace(/\s+/g, '') ||
          '' + user.uid.slice(0, 5),
        email: user.email,
        name: user.displayName || '',
        avatar: user.photoURL || '',
        bio: 'Hey, There I am using chat app.',
        lastSeen: Date.now(),
      });

      await setDoc(doc(db, 'chats', user.uid), {
        chatData: [],
      });
    } else {
      await setDoc(userRef, { lastSeen: Date.now() }, { merge: true });
    }
  } catch (error) {
    console.error(error);
    toast.error(error.code.split('/')[1].split('-').join(' '));
  }
};

/* ===================== LOGOUT ===================== */
const logout = async () => {
  try {
    //updae lastseen before logout
    if (auth.currentUser) {
      await setDoc(
        doc(db, 'users', auth.currentUser.uid),
        { lastSeen: Date.now() },
        { merge: true }
      );
    }

    //sign out
    await signOut(auth);
  } catch (error) {
    console.error(error);
    toast.error(error.code.split('/')[1].split('-').join(' '));
  }
};

/* ===================== RESET PASSWORD ===================== */
const resetPass = async (email) => {
  if (!email) {
    toast.error('Enter your email!');
    return null;
  }

  try {
    const userRef = collection(db, 'users');
    const q = query(userRef, where('email', '==', email));
    const querySnap = await getDocs(q);
    if (!querySnap.empty) {
      await sendPasswordResetEmail(auth, email);
      toast.success('Reset email sent to your email');
    } else {
      toast.error('Email does not exsists');
    }
  } catch (error) {
    console.log(error);
    toast.error(error.message);
  }
};

export { signup, login, googleLogin, logout, auth, db, resetPass };
export default app;
