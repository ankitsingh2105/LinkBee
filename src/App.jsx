import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, getFirestore } from 'firebase/firestore';
import firebaseConfig from '../../../firebaseConfig';
import './FinalDisplay.css';

export default function FinalDisplay() {
  const { userID } = useParams();
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const db = getFirestore(app);

  const [profile, setProfile] = useState('');
  const [bio, setBio] = useState('');
  const [array, setArray] = useState([]);

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const docRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(docRef);
        setBio(docSnap.data().bio);
        setProfile(docSnap.data().profile);
        setArray(docSnap.data().arrayOfObject);
      }
    });
  }, [auth, db]);

  return (
    <main className="FinalDisplay_main">
      <img src={auth.currentUser.photoURL} alt="" />
      <br />
      <span>
        <b>@{userID}</b>
      </span>
      <br />
      <span>{profile}</span>
      <br />
      <span>{bio}</span>
      {array.map((e) => (
        <div className="finalCard" key={e.name}>
          <i style={{ color: e.color }} className={e.class}></i>
          <span>{e.name}</span>
          <a href={e.link}>
            <i className="fa-solid fa-diamond-turn-right" />
          </a>
        </div>
      ))}
      <br />
    </main>
  );
}
