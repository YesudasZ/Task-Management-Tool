import { useState, useEffect } from "react";
import { User } from "firebase/auth";
import { auth } from "../services/firebase/config";

export const useAuth = () => {
    const [user, setUser] = useState <User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        const unsubsribe = auth.onAuthStateChanged((user) => {
            setUser(user);
            setLoading(false);
        });

        return unsubsribe;
    }, []);

    return { user, loading }
}