import React from "react";

import "../styles/globals.css";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase";
import Login from "./login";
import Loading from "./loading";
import { doc, serverTimestamp, setDoc } from "@firebase/firestore";

function MyApp({ Component, pageProps }) {
    const [user, loading] = useAuthState(auth);

    React.useEffect(() => {
        const addUser = async () => {
            try {
                if (user) {
                    await setDoc(
                        doc(db, "users", user.uid),
                        {
                            email: user.email,
                            lastSeen: serverTimestamp(),
                            photoUrl: user.photoURL,
                        },
                        { merge: true }
                    );
                }
            } catch (e) {
                console.error("Error adding document: ", e);
            }
        };
        addUser();
    }, [user]);

    if (loading) {
        return <Loading />;
    }

    if (!user) {
        return <Login />;
    }

    return <Component {...pageProps} />;
}

export default MyApp;
