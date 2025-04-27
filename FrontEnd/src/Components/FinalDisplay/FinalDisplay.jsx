import React, { useState, useEffect } from 'react';
import './FinalDisplay.css';
import { Helmet } from 'react-helmet';
import Dummy from '../User/dummyimage.webp';
import logo from "./logo.png"
import axios from "axios";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import backendLink from "../backendLink";
import errorHoney from "./errorHoney.webp"
axios.defaults.withCredentials = true;
// http://localhost:5173/user/auth/edit/111111


export default function FinalDisplay() {
  const [loading, setloading] = useState(false);
  const [profile, setprofile] = useState('');
  const [bio, setbio] = useState('');
  const [linkArray, setLinkArray] = useState([]);
  const [id, setID] = useState('');
  const [errorMessage, setErrorMessage] = useState(true);
  const [imageUrl, setImageUrl] = useState(Dummy);
  const [gradient, setgradient] = useState("");
  const [bgColor, setbgColor] = useState("");
  const [fontColor, setfontColor] = useState("");
  const [fontFamily, setfontFamily] = useState("");
  const [backImage, setbackIMG] = useState("")
  const [width, setWidth] = useState(window.innerWidth);
  const [bioandprofile, setbioandprofile] = useState("")
  const certainLimit = 400;


  const sendToSignUp = () => {
    window.location.href = "/signup";
  }

  useEffect(() => {
    const currentUrl = window.location.pathname;
    const parts = currentUrl.split('/');
    const userID = parts[parts.length - 1];
    async function fetchData() {
      try {
        const response = await axios.post(`${backendLink}/user/displayUser`, { userID });
        setErrorMessage(false);
        const userData = response.data;
        setID(userData.userID);
        setprofile(userData.profile || '');
        setbio(userData.bio || '');
        const oldUrl = userData.imageUrl;
        const newUrl = oldUrl.replace("http://", "https://");
        setImageUrl(newUrl || '');
        setgradient(userData.gradient || '');
        setfontFamily(userData.fontFamily || '');
        setbgColor(userData.bgColor || '');
        setfontColor(userData.fontColor || '');
        setbackIMG(userData.backImage || '');
        setbioandprofile(userData.bioAndProfileColor || '');
        setLinkArray(userData.linkArray || []);
        setloading(true);
      }
      catch (error) {
        toast.error("Something went wrong ", { autoClose: 15000 });
      }
    }
    fetchData();
  }, [])

  const handleAnalytics = async (link) => {
    try {
      let response = await axios.post(`${backendLink}/user/analytics`, {
        link, "userID": id
      })
    }
    catch (error) {
    }
  }
  return (
    <>
      {!loading ? (
        <main className="align">
          <div className="loadingWheel"></div>
        </main>
      ) : errorMessage ? (
        <div className="errorContainer">
          <span className="align">
            <img style={{ marginTop: "8rem" }} src={errorHoney} alt="" />
            <br />
            <span><b>Page doesn't exist. Sign up for this username.</b></span>
            <br />
            <button onClick={sendToSignUp}>Sign up</button>
            <br />
          </span>
        </div>
      ) : (
        <>
          <nav style={{ background: gradient, fontFamily: fontFamily }} className='FinalDisplayNav'>
            <ul>
              <li><img style={{ marginTop: "2px" }} src={!imageUrl ? logo : `${imageUrl}`} alt="" /></li>
              <li>@{id}</li>
              <li onClick={() => { window.location.href = "http://linkbeemern.vercel.app/" }}><button>Link Bee</button></li>
            </ul>
          </nav>
          <main
            className="FinalDisplay_main"
            style={{
              fontFamily: fontFamily,
              position: "static",
              overflow: "auto",
              backgroundImage: width >= certainLimit ? gradient : `url(${backImage})`,
              backgroundImage: `url(${backImage})`,
              backgroundAttachment: "fixed",
              backgroundSize: width >= certainLimit ? "443px" : `auto 740px`,
            }}

          >
            <ToastContainer style={{ zIndex: 99999999 }} />
            <Helmet>
              <title>{`Link Bee ~ ${id}`}</title>
              <meta name="title" content="From Helmet" />
            </Helmet>

            <img src={imageUrl == '' ? Dummy : `${imageUrl}`} alt={Dummy} />
            <br />
            <span>
              <b style={{ color: bioandprofile }} > @{id} </b>
            </span>
            <br />
            <span style={{ marginTop: '-10px', color: bioandprofile }}>{bio}</span>
            <br /> <br />
            <span style={{ color: bioandprofile }} >{profile}</span>
            {linkArray?.map((e) => {
              return (
                <div
                  className="finalCard slug_finalCard"
                  key={e.name}
                  style={{ color: fontColor, background: bgColor }}
                >
                  <i style={{ color: `${e.color}`, border: ".1px solid black" }} className={e.class}></i>
                  <span>{e.name}</span>
                  <a href={e.link} onClick={() => { handleAnalytics(e.link) }} >
                    <i style={{ border: ".1px solid black" }} className="fa-solid fa-diamond-turn-right" />
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
