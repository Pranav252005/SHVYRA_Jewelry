import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider, setPersistence, browserLocalPersistence } from 'firebase/auth'

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDcPJiYaQyKiv6GZceCTLk8jTiXpMNOUyI",
  authDomain: "shvyra-f6640.firebaseapp.com",
  projectId: "shvyra-f6640",
  storageBucket: "shvyra-f6640.firebasestorage.app",
  messagingSenderId: "1021508293676",
  appId: "1:1021508293676:web:793874b629900cbddcad89",
  measurementId: "G-LQ0XXJPVNZ"
}

let app, auth, googleProvider

try {
  // Initialize Firebase
  app = initializeApp(firebaseConfig)
  
  // Initialize Firebase Authentication
  auth = getAuth(app)
  
  // Set persistence to LOCAL (stays logged in even after browser closes)
  setPersistence(auth, browserLocalPersistence).catch(err => {
    console.warn('Firebase persistence setup failed:', err)
  })
  
  // Google Auth Provider
  googleProvider = new GoogleAuthProvider()
  googleProvider.setCustomParameters({
    prompt: 'select_account'
  })
} catch (error) {
  console.error('Firebase initialization error:', error)
}

export { auth, googleProvider }
export default app
