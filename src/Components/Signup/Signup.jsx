import React, { useEffect } from 'react';
import "./Signup.css";
import elem1 from "./elem1.png";
import elem2 from "./elem2.png";

import firebaseConfig from '../../firebaseConfig';
import { initializeApp } from "firebase/app";
import { updateProfile, createUserWithEmailAndPassword, getAuth} from 'firebase/auth';
import { doc, getDoc, setDoc, collection, getFirestore } from "firebase/firestore";

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

export default function Signup() {
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    const userIDRegex = /^[a-zA-Z0-9_-]{4,20}$/;

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("we have submitted the form");
        const name = e.target.name.value;
        const email = e.target.email.value;
        const userID = e.target.userID.value;
        const password = e.target.password.value;
        console.log(name, email, userID, password);

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
            console.log("this is the user->", newUser.user.uid);
            window.location.href = "/";
        } catch (e) {
            console.log("this is the erro- >", e);
            toast.error("Password should be at least 6 characters / Email already exists", { autoClose: 1500 });
        }
    };

    useEffect(() => {
        const user = auth.currentUser;
        console.log("this is the user- >", user);
    });

    const adduserIDToFirestore = async (uid, userID) => {
        const db = getFirestore(app);
        const ref = doc(db, 'users', uid);
        await setDoc(ref, { uid: uid, userID: userID });
    };

    return (
        <main className="Signup_main">

            <ToastContainer />

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
                <input type="text" placeholder='User Name' name="userID" required />
                <input placeholder='Password' type="password" name="password" required />
                <button >Sign Up</button>
                <br />
            </form>
        </main>
    )
}
