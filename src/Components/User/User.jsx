import React, { useState, useEffect, useRef } from 'react';
import { onAuthStateChanged, getAuth, updateProfile } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, doc, setDoc, getDoc, getFirestore } from "firebase/firestore";
import { toast, ToastContainer } from 'react-toastify';
import firebaseConfig from '../../firebaseConfig';
import "./User.css"
import Dummy from "./dummyimage.webp"
import logo from "../Navbar/link bee.png"
import { Helmet } from 'react-helmet';

export default function User() {

    const objArray = [
        {
            class: "fa fa-envelope",
            title: "Gmail",
            color: "red",

        },
        {
            class: "fa fa-facebook",
            title: "Facebook",
            color: "blue",

        },
        {
            class: "fa fa-instagram",
            title: "Instagram",
            color: "#E4405F",

        },
        {
            class: "fa fa-snapchat-ghost",
            title: "Snapchat",
            color: "yellow",

        },
        {
            class: "fa fa-link",
            title: "Website",
            color: "black",

        },
        {
            class: "fa fa-stack-overflow",
            title: "Stack Overflow",
            color: "orange",

        },
        {
            class: "fa fa-youtube",
            title: "YouTube",
            color: "#CD201F",

        },
        {
            class: "fa fa-github",
            title: "GitHub",
            color: "black",

        },
        {
            class: "fa fa-twitter",
            title: "Twitter",
            color: "#1DA1F2",

        },
        {
            class: "fa fa-linkedin",
            title: "LinkedIn",
            color: "#0A66C2",

        },
        {
            class: "fa-solid fa-calendar-days",
            title: "Event",
            color: "black"
        },
        {
            class: "fa-brands fa-reddit",
            title: "Reddit",
            color: "#FF5700"
        }
    ];


    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    const storage = getStorage(app);
    const db = getFirestore(app);

    const [userID, setuserID] = useState("");
    const [uploadedImage, setImage] = useState(Dummy);
    const [tempsetArray, settempArray] = useState([]);
    const [nameProfile, setnameProfile] = useState({ profile: "Enter a name above", bio: "Enter bio above" })
    const [loading, setloading] = useState(true);


    const currentUrl = window.location.pathname;
    const parts = currentUrl.split('/');
    const lastTerm = parts[parts.length - 1];


    useEffect(() => {
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                const docRef = doc(db, "users", user.uid);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setuserID(docSnap.data().userID);
                }
            }
            else {
                window.location.href = "/";
            }
        });
    }, []);

    const isValidLink = (link) => {
        const urlRegex = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/[^\s]*)?$/;
        return urlRegex.test(link);
    };


    useEffect(() => {
        onAuthStateChanged(auth, async (user) => {
            const currentUrl = window.location.pathname;
            const parts = currentUrl.split('/');
            const lastTerm = parts[parts.length - 1];
            if (user) {
                setImage(user.photoURL);
                const docRef = doc(db, "users", lastTerm);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    settempArray(docSnap.data().arrayOfObject);
                    setnameProfile({ profile: docSnap.data().profile, bio: docSnap.data().bio });
                    setloading(false);
                }
            }
        });
    }, []);


    const handleImageChanges = (e) => {
        const photo = e.target.files[0];
        setImage(photo);
    };


    const handleUploading = async () => {
        if (uploadedImage) {
            const user = auth.currentUser;
            if (!user) {
                toast.error('Please login', { autoClose: 1500 });
                return;
            }

            const storageRef = ref(
                storage,
                `images/${lastTerm + ' - ' + user.email}/${uploadedImage.name}`
            );

            try {
                toast('Uploading started', { autoClose: 1500 });
                await uploadBytes(storageRef, uploadedImage);
                const url = await getDownloadURL(storageRef);

                await updateProfile(auth.currentUser, { photoURL: url });

                const userRef = doc(db, "users", lastTerm);
                await setDoc(userRef, { imageURL: url }, { merge: true });

                toast('Photo uploaded successfully', { autoClose: 1500 });
                window.location.reload();
            } catch (err) {
                toast.error('Failed to upload photo', { autoClose: 1500 });
            }
        } else {
            toast('Please choose an image', { autoClose: 1500 });
        }
    };


    //  * adding data a firebase;

    const handleSave = async (className, title, color, indexop) => {
        let urlClass = document.querySelector(`.url${indexop}`);
        let nameClass = document.querySelector(`.name${indexop}`);
        let profile = document.querySelector(`.profile`);
        let bio = document.querySelector(`.bio`);
        if (isValidLink(urlClass.value) && nameClass.value.length > 0) {

            let obj = {
                class: className,
                title: title,
                color: color,
                link: urlClass.value,
                name: nameClass.value,
            };
            let tempArray = [];
            const docRef = doc(db, "users", lastTerm);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                toast("Link added see section below for preview", { autoClose: 1500 });
                tempArray = docSnap.data().arrayOfObject || [];
            }
            tempArray.push(obj);
            setDoc(docRef, {
                arrayOfObject: tempArray,
                userID: docSnap.data().userID,
                profile: docSnap.data().profile ||   profile.value,
                bio: docSnap.data().bio ||   bio.value,
                imageURL: docSnap.data().imageURL || ""
            });
            settempArray(tempArray);
        }
        else {
            if (nameClass.value.length === 0) {
                toast("You have to enter a name", { autoClose: 1500 });
            }
            else {
                toast("Please Enter a valid link", { autoClose: 1500 });
            }
        }

    };

    const handleDelete = async (naam) => {
        let newTemp = tempsetArray.filter((e) => {
            return e.name !== naam;
        });
        const docRef = doc(db, "users", lastTerm);
        const docSnap = await getDoc(docRef);
        setDoc(docRef, {
            arrayOfObject: newTemp,
            userID: docSnap.data().userID,
            profile: docSnap.data().profile || "",
            bio: docSnap.data().bio || "",
            imageURL: docSnap.data().imageURL || ""
        });
        settempArray(newTemp);
    };

    const AddNameAndBio = async () => {
        const docRef = doc(db, "users", lastTerm);
        const docSnap = await getDoc(docRef);
        let profile = document.querySelector(`.profile`);
        let bio = document.querySelector(`.bio`);
        let tempArray = [];
        if (bio.value === "" || profile.value === "") {
            toast("Please fill both the sections", { autoClose: 1500 });
        }
        else {
            if (docSnap.exists()) {
                tempArray = docSnap.data().arrayOfObject || [];
            }
            setDoc(docRef, {
                arrayOfObject: tempArray,
                userID: docSnap.data().userID,
                imageURL: docSnap.data().imageURL,
                profile: profile.value,
                bio: bio.value
            });
            toast("Name and bio updated, see section below", { autoClose: 1500 });
            setnameProfile({ profile: profile.value, bio: bio.value });
        }
    }

    return (
        <>
            <Helmet>
                <title>~ Create Section ~</title>
            </Helmet>
            <ToastContainer style={{ zIndex: 99999999 }} />

            {
                loading ? (<div className="align"><main className="loadingWheel"></main></div>)
                    :
                    (
                        <>
                            <nav className='authNav'>
                                <ul>
                                    <li><img src={logo} alt="" /></li>
                                    <li onClick={() => { window.location.href = `/${userID}` }} >{`linkbee.online/${userID}`}</li>
                                </ul>
                            </nav>
                            <main className="User_main">

                                <h1>~ Customization ~</h1>
                                <h2>Profile Section</h2>

                                <div className='align2' >
                                    <img src={uploadedImage || Dummy} alt="dummy image" />
                                    <input id="imageInput" placeholder='' type="file" accept="image/*" onChange={handleImageChanges} />
                                    <button onClick={handleUploading}>Upload New Image</button>

                                </div>
                                <input className="profile" placeholder='Profile name' type="text" />
                                <br />
                                <textarea className="bio" placeholder='Bio' cols="30" rows="3" />
                                <br />
                                <button onClick={AddNameAndBio} >Add name and bio</button>
                                <br /><br />

                                <br />
                                <h2 style={{ marginBottom: "0px" }} > ~ Add Social Media or Events ~ </h2>
                                <small>Present your digital presence with pride</small>
                                <br /><br />
                                <div className="socialIcons">

                                    {
                                        objArray.map((e, index) => {
                                            return (
                                                <div key={index} className='socailCard' >
                                                    <i style={{ color: `${e.color}`, boxShadow: `0px 2px 1px ${e.color}` }} className={e.class} />
                                                    <h4>{e.title}</h4>
                                                    <input className={`name${index}`} placeholder={`Enter title`} type="text" />
                                                    <input className={`url${index}`} placeholder="Enter link here" type="url" />
                                                    <br />
                                                    <span>
                                                        <button onClick={() => { handleSave(e.class, e.title, e.color, index) }}>Add</button>
                                                    </span>
                                                </div>
                                            )
                                        })
                                    }

                                </div>
                                <br /><br />
                                <div className="cards align">
                                    <h2>~ Added Links ~</h2>
                                    <h3 style={{ fontWeight: "300" }}><b>Name : </b>{nameProfile.profile || ""}</h3>
                                    <h3 style={{ fontWeight: "300" }}><b>Bio: </b> {nameProfile.bio || ""} </h3>
                                    {
                                        tempsetArray ? (tempsetArray.map((e, index) => {
                                            return (
                                                <div key={index} className="box">
                                                    <div>
                                                        <i style={{ color: `${e.color}`, border: "1px solid " }} className={e.class} />
                                                        <h4>{e.name}</h4>
                                                        <a href={e.link} className='align2'>{e.link}</a>
                                                    </div>
                                                    <div>
                                                        <button onClick={() => handleDelete(e.name)}>Delete</button>
                                                    </div>
                                                </div>
                                            )
                                        })
                                        ) : (<div></div>)
                                    }
                                </div>
                            </main>
                        </>

                    )
            }
        </>

    )
}