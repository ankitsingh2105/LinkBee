import React from 'react'
import "./Home.css"
import HomeImg from "./Linkbee_Home_Image.webp"
import { getAuth } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { doc, getDoc, getFirestore } from "firebase/firestore";
import firebaseConfig from '../../firebaseConfig';
import bee from "./elem2.webp";
export default function Home(props) {
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    const db = getFirestore(app);
    const handleNavigation = () => {
        let user = auth.currentUser;
        if (user) {
            async function Wait() {
                const docRef = doc(db, "users", user.uid);
                const docSnap = await getDoc(docRef);
                window.location.href = `/user/auth/edit/${docSnap.data().userID}`
            }
            Wait();
        }
        else {
            console.log("this is not authorizes");
            window.location.href = "/unauth/tempUser";
        }
    }
    return (
        <main className="main_home" id={props.id} >
            <img style={{ width: "100px", height: "100px" }} className="floating_bee" src={bee} alt="" />
            <div>
                <h1>
                    Your links
                </h1>
                <h1>
                    Your story.
                </h1>
                <div className="align">
                    <p>
                        Welcome to our platform designed to empower you in the digital realm. Curate and showcase your online presence with ease, allowing others to explore the depths of your creativity. <b>Share you portfolio, social media accounts and more only with one ~ Link Bee ~ link.</b>
                    </p>
                    <div className="align2">
                        <button onClick={handleNavigation} >Demo Page</button>
                        <button onClick={() => { window.location.href = "/login" }} >Get Started</button>
                    </div>
                </div>
            </div>
            <img onClick={() => { window.location.href = "http://linkbee.online/ankit21" }} src={HomeImg} alt="" />
        </main>
    )
}
