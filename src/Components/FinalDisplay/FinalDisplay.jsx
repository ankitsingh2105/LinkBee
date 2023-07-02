import React, { useState, useEffect } from 'react'
import "./FinalDisplay.css"
import { onAuthStateChanged, getAuth } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { doc, getDoc, getFirestore } from "firebase/firestore";
import firebaseConfig from '../../firebaseConfig';
export default function FinalDisplay() {
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    const db = getFirestore(app);
    const user = auth.currentUser;

    const [profile, setprofile] = useState("");
    const [bio, setbio] = useState("");
    const [array, setArray] = useState([]);
    const [id, setID] = useState("");

    console.log("this is the user-> ", user);
    useEffect(() => {
        onAuthStateChanged(auth, async (user) => {
            const docRef = doc(db, "users", user.uid);
            const docSnap = await getDoc(docRef);
            setbio(docSnap.data().bio);
            setprofile(docSnap.data().profile);
            setArray(docSnap.data().arrayOfObject);
            setID(docSnap.data().userID);
        });
        console.log("are bbhai-> ", bio)
    }, []);

    return (
        <main className="FinalDisplay_main">
            <img src={user.photoURL} alt="" />
            <br />
            <span> <b> @{id} </b></span>
            <br />
            <span>{profile}</span>
            <br />
            <span>{bio}</span>
            {
                array.map((e) => {
                    return (
                        <div className='finalCard' key={e.name}>
                            <i style={{ color: `${e.color}` }} className={e.class}></i>
                            <span>{e.name}</span>
                            <a href={e.link}>< i class="fa-solid fa-diamond-turn-right"/></a>
                        </div>
                    )
                })
            }
            <br />
        </main>
    )
}
