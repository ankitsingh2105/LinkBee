import React, { useState, useEffect } from 'react';
import './FinalDisplay.css';
import { initializeApp } from 'firebase/app';
import { doc, getDoc, getFirestore } from 'firebase/firestore';
import firebaseConfig from '../../firebaseConfig';
import { Helmet } from 'react-helmet';
import Dummy from '../User/dummyimage.webp';

import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

import errorHoney from "./errorHoney.webp"

export default function FinalDisplay() {
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const [loading, setloading] = useState(true);
  const [profile, setprofile] = useState('');
  const [bio, setbio] = useState('');
  const [array, setArray] = useState([]);
  const [id, setID] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [imageUrl, setImageUrl] = useState(Dummy);


  const currentUrl = window.location.pathname;
  const parts = currentUrl.split('/');
  const userID = parts[parts.length - 1];

  useEffect(() => {
    const check = async () => {
      const docRef = doc(db, 'users', userID);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setbio(docSnap.data().bio);
        setprofile(docSnap.data().profile);
        setArray(docSnap.data().arrayOfObject);
        setID(docSnap.data().userID);
        setloading(false);
        setImageUrl(docSnap.data().imageURL || Dummy );
      } else {
        setloading(false);
        setErrorMessage('Invalid userID. User not found.');
      }
    };
    check();
  }, []);

  const sendToSignUp = () =>{
    window.location.href = "/signup";
  }

  return (
    <>
      {loading ? (
        <main className="align">
          <div className="loadingWheel"></div>
        </main>
      ) : errorMessage ? (
        <div className="errorContainer">
          <span className="align">
            <img style={{marginTop : "8rem"}} src={errorHoney} alt="" />
            <br />
            <span><b>Page don't exist, Sign up for this username </b></span>
            <br />
            <button onClick={sendToSignUp} >Sign up</button>
            <br />
          </span>
        </div>
      ) : (

        <>
        <nav className='FinalDisplayNav' >
          <ul>
            <li><img src={imageUrl}alt="" /></li>
            <li>@{id}</li>
            <li><button> <a href="http://linkbee.online/signup">Sign Up</a></button></li>
          </ul>
        </nav>
        <main className="FinalDisplay_main">
          <ToastContainer style={{ zIndex: 99999999 }} />
          <Helmet>
            <title>Link Bee ~ @{id}</title>
          </Helmet>
          <img src={imageUrl} alt="" />
          <br />
          <span>
            <b> @{id} </b>
          </span>
          <br />
          <span style={{ marginTop: '-10px' }}>{bio}</span>
          <br /> <br />
          <span>{profile}</span>
          {array?.map((e) => {
            return (
              <div className="finalCard" key={e.name}>
                <i style={{ color: `${e.color}` }} className={e.class}></i>
                <span>{e.name}</span>
                <a href={e.link}>
                  <i className="fa-solid fa-diamond-turn-right" />
                </a>
              </div>
            );
          })}
          <br />
        </main>
        </>
      )}
    </>
  );
}