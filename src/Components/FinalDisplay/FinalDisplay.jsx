import React, { useState, useEffect } from 'react'
import "./FinalDisplay.css"
import { onAuthStateChanged, getAuth } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { doc, getDoc, getFirestore } from "firebase/firestore";
import firebaseConfig from '../../firebaseConfig';
import { Helmet } from 'react-helmet';
import Dummy from "../User/dummyimage.webp"

import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';


export default function FinalDisplay() {
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    const db = getFirestore(app);
    const user = auth.currentUser;
    const [loading, setloading] = useState(true);
    const [profile, setprofile] = useState("");
    const [bio, setbio] = useState("");
    const [array, setArray] = useState([]);
    const [id, setID] = useState("");
    
    useEffect(() => {
        onAuthStateChanged(auth, async (user) => {
            const docRef = doc(db, "users", user.uid);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                setbio(docSnap.data().bio);
                setprofile(docSnap.data().profile);
                setArray(docSnap.data().arrayOfObject);
                setID(docSnap.data().userID);
                setloading(false);
            }
        });
    }, []);

    return (
        <>
            {loading ? (<main className="align"><div className='loadingWheel'></div></main>)
                :
                (<main className="FinalDisplay_main">
                    <ToastContainer style={{ zIndex: 99999999 }} />
                    <Helmet>
                        <title>Link Bee ~ @{id}</title>
                    </Helmet>
                    <img src={user.photoURL || Dummy} alt="" />
                    <br />
                    <span> <b> @{id} </b></span>
                    <br />
                    <span style={{ marginTop: "-10px" }} >{bio}</span>
                    <br />  <br />
                    <span>{profile}</span>
                    {
                        array?.map((e) => {
                            return (
                                <div className='finalCard' key={e.name}>
                                    <i style={{ color: `${e.color}` }} className={e.class}></i>
                                    <span>{e.name}</span>
                                    <a href={e.link}>< i class="fa-solid fa-diamond-turn-right" /></a>
                                </div>
                            )
                        })
                    }
                    <br />
                </main>)
            }
        </>
    )
}
