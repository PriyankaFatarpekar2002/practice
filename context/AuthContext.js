'use client'
import { createContext, useContext, useEffect, useState } from "react";
import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from "firebase/auth";
import { auth } from "../libs/firebaseconfig";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState(null);

  // Check auth state on mount
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
      setAuthError(null);
    }, (error) => {
      setAuthError(error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Sign up new user
  const signUp = async (email, password) => {
    try {
      setLoading(true);
      setAuthError(null);
      
      // Basic validation
      if (!email || !password) {
        throw new Error("Email and password are required");
      }
      if (password.length < 6) {
        throw new Error("Password should be at least 6 characters");
      }

      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      return userCredential.user;
    } catch (error) {
      let errorMessage = "Sign up failed. Please try again.";
      
      switch (error.code) {
        case 'auth/email-already-in-use':
          errorMessage = "Email already in use";
          break;
        case 'auth/invalid-email':
          errorMessage = "Invalid email address";
          break;
        case 'auth/weak-password':
          errorMessage = "Password should be at least 6 characters";
          break;
      }
      
      setAuthError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Sign in existing user
  const signIn = async (email, password) => {
    try {
      setLoading(true);
      setAuthError(null);
      
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return userCredential.user;
    } catch (error) {
      let errorMessage = "Login failed. Please try again.";
      
      switch (error.code) {
        case 'auth/invalid-credential':
        case 'auth/user-not-found':
        case 'auth/wrong-password':
          errorMessage = "Invalid email or password";
          break;
        case 'auth/too-many-requests':
          errorMessage = "Account temporarily locked. Try again later";
          break;
      }
      
      setAuthError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Sign out
  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      setAuthError(error.message);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user,
      loading,
      authError,
      signUp,
      signIn,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthContextProvider');
  }
  return context;
};