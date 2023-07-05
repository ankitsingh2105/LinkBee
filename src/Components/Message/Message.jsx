import React from 'react'
import "./Message.css"
import firebaseConfig from '../../firebaseConfig';
import { initializeApp } from "firebase/app";
import { doc, setDoc, getFirestore } from "firebase/firestore";
import { updateProfile, createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { toast } from 'react-toastify';
export default function Message() {

    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);

    const handleMessage = (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const email = e.target.email.value;
        const message = e.target.message.value;
        adduserIDToFirestore(message , name , email);
    }

    const adduserIDToFirestore = async (message, name, email) => {
        const db = getFirestore(app);
        const ref = doc(db, 'messages', name);
        await setDoc(ref, {
            messengers: { message: message, name: name, email: email }
        });
        toast("Messages reveived, Thanks" , {autoClose:1500});
        setInterval(() => {
            window.location.reload();
        }, 1000);
    };

    return (
        <main className="Message_main message_align">
            <h1>~ Send Us a Message ~</h1>
            <form onSubmit={handleMessage} className='message_align'>
                <h4>Deliever you message from here</h4>
                <input required placeholder="Name" type="text" name='name' />
                <input required placeholder='Email' type="email" name='email' />
                <textarea required placeholder='Enter you message' name="message" cols="30" rows="10"></textarea>
                <br />
                <button>Send</button>
            </form>
        </main>
    )
}
