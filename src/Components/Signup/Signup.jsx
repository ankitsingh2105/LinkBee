import React, { useEffect } from 'react';
import "./Signup.css";
import elem1 from "./elem1.webp";
import elem2 from "./elem2.webp";

import firebaseConfig from '../../firebaseConfig';
import { initializeApp } from "firebase/app";
import { updateProfile, createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { doc, setDoc, getFirestore } from "firebase/firestore";

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

import { Helmet } from 'react-helmet';

export default function Signup() {
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    const userIDRegex = /^[a-zA-Z0-9_-]{4,20}$/;

    const handleSubmit = async (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const email = e.target.email.value;
        const userID = e.target.userID.value;
        const password = e.target.password.value;

        if (!userIDRegex.test(userID)) {
            toast.error(
                "Invalid userID. It should be 4-20 characters long and can contain only alphanumeric characters, underscore, and hyphen.",
                { autoClose: 1500 }
            );
            return;
        }

        try {
            const newUser = await createUserWithEmailAndPassword(auth, email, password);
            toast("Sign up successful", { autoClose: 1500 });
            await updateProfile(auth.currentUser, { displayName: name, userID: userID });
            await adduserIDToFirestore(newUser.user.uid, userID);
            window.location.href = `user/${userID}`;
        } catch (e) {
            toast.error("Password should be at least 6 characters / Email already exists", { autoClose: 1700 });
        }
    };

    const adduserIDToFirestore = async (uid, userID) => {
        const db = getFirestore(app);
        const ref = doc(db, 'users', userID);
        await setDoc(ref, {
            arrayOfObject: [],
            userID: userID,
            profile: "",
            bio: ""
        });
        const ref2 = doc(db, 'users', uid);
        await setDoc(ref2, { uid: uid, userID: userID });
    };

    return (
        <main className="Signup_main">

            <ToastContainer />
            <Helmet>
                <title>Link Bee ~ Sign Up</title>
            </Helmet>

            <div className="fixed-images">
                <img id='elem4' src={elem2} alt="" />
                <img id="elem5" src={elem1} alt="" />
                <img id="elem6" src={elem1} alt="" />
            </div>

            <h1>
                Thank you for choosing Us
            </h1>

            <h2>~ Sign Up for free ~</h2>

            <form action="" onSubmit={handleSubmit} >
                <input type="text" placeholder='Name' name="name" required />
                <input type="email" placeholder='Email' name="email" required />
                <input type="text" placeholder='User ID (cannot be changed)' name="userID" required />
                <input placeholder='Password' type="password" name="password" required />
                <button onClick={() => { toast("Processing", { autoClose: 1500 }); }} >Sign Up</button>
            </form>

            <h2>Already have an account? Login here</h2>
            <button onClick={() => { window.location.href = "/login" }} >Log In</button>
            <br /><br />
        </main>
    )
}
