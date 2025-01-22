import {
    GoogleAuthProvider, signInWithPopup, signOut as firebaseSignOut
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from './config'

export const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
    try {
        const result = await signInWithPopup(auth, googleProvider);
        const user = result.user;
        const userRef = doc(db, 'users', user.uid);
        const userSnap = await getDoc(userRef);

        if (!userSnap.exists()) {
            await setDoc(userRef,{
                uid: user.uid,
                email: user.email,
                displayName: user.displayName,
                photoURL: user.photoURL,
                createdAt: new Date().toISOString(),
                lastLogin: new Date().toISOString()
            })
        }else{
            await setDoc(userRef, {
                lastLogin: new Date().toISOString()
            }, { merge: true });
        }
    } catch (error) {
        console.error('Error signing in with Google:', error);
        throw error;
    }
};

export const signOut = async ()=> {
    try {
        await firebaseSignOut(auth);
        return true
    } catch (error) {
        console.error('Error signing out:', error);
        throw error;
    }
};
