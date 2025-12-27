import React, { createContext, useContext, useState, useEffect } from 'react'
import { 
  signInWithPopup, 
  signOut, 
  onAuthStateChanged 
} from 'firebase/auth'
import { auth, googleProvider } from '../config/firebase'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!auth) {
      setLoading(false)
      return
    }

    // Listen for auth state changes (handles persistent login)
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
      setLoading(false)
    })

    // Cleanup subscription on unmount
    return () => unsubscribe()
  }, [])

  // Sign in with Google
  const signInWithGoogle = async () => {
    if (!auth || !googleProvider) {
      return { success: false, error: 'Firebase not initialized' }
    }
    try {
      const result = await signInWithPopup(auth, googleProvider)
      return { success: true, user: result.user }
    } catch (error) {
      console.error('Error signing in with Google:', error)
      return { success: false, error: error.message }
    }
  }

  // Sign out
  const logout = async () => {
    if (!auth) {
      return { success: false, error: 'Firebase not initialized' }
    }
    try {
      await signOut(auth)
      return { success: true }
    } catch (error) {
      console.error('Error signing out:', error)
      return { success: false, error: error.message }
    }
  }

  const value = {
    user,
    loading,
    signInWithGoogle,
    logout,
    isAuthenticated: !!user
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}

export default AuthContext
