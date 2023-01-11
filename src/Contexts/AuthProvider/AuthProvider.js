import React, { createContext, useEffect, useState } from 'react';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, GoogleAuthProvider, signInWithPopup, onAuthStateChanged, sendPasswordResetEmail, updateProfile, deleteUser } from "firebase/auth";
import { app } from '../../Firebase/Firebase.config';



export const AuthContext = createContext()
const auth = getAuth(app);
const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    //create user using email
    const createUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password);
    }

    //log in with email
    const logIn = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    //log out
    const logOut = () => {
        setLoading(true)
        return signOut(auth);
    }

    //google log in
    const googleProvider = new GoogleAuthProvider();

    const googleLogIn = () => {
        setLoading(true)
        return signInWithPopup(auth, googleProvider);
    }

    //password reset
    //reset password
    const resetPassword = (email) => {
        setLoading(true)
        return sendPasswordResetEmail(auth, email)
    }

    //update profile
    const updateUserProfile = (profile) => {
        return updateProfile(auth.currentUser, profile)
    }

    //delete user
    const removeUser = () => {

        console.log(auth.currentUser);
        // deleteUser(auth.currentUser)
    }




    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
            setLoading(false)
        })

        return () => {
            unsubscribe()
        }
    }, [user])

    const authInfo = {
        user,
        createUser,
        logIn,
        logOut,
        googleLogIn,
        resetPassword,
        setUser,
        updateUserProfile,
        loading,
        removeUser
    }
    return (
        <div>
            <AuthContext.Provider value={authInfo}>
                {children}
            </AuthContext.Provider>
        </div>
    );
};

export default AuthProvider;