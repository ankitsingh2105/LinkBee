import React, { useState, useEffect, useRef } from 'react';
import { onAuthStateChanged, getAuth, updateProfile } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { doc, setDoc, getDoc, getFirestore } from "firebase/firestore";
import { toast, ToastContainer } from 'react-toastify';
import firebaseConfig from '../../firebaseConfig';
import "./User.css"
import Dummy from "./dummyimage.webp"
import logo from "../Navbar/logo.png"

export default function User() {

    const objArray = [
        {
            class: "fa fa-envelope",
            title: "Gmail",
            color: "red",
            currentAddState: "Add",
        },
        {
            class: "fa fa-facebook",
            title: "Facebook",
            color: "blue",
            currentAddState: "Add",
        },
        {
            class: "fa fa-instagram",
            title: "Instagram",
            color: "#E4405F",
            currentAddState: "Add",
        },
        {
            class: "fa fa-snapchat-ghost",
            title: "Snapchat",
            color: "yellow",
            currentAddState: "Add",
        },
        {
            class: "fa fa-link",
            title: "Website",
            color: "black",
            currentAddState: "Add",
        },
        {
            class: "fa fa-stack-overflow",
            title: "Stack Overflow",
            color: "orange",
            currentAddState: "Add",
        },
        {
            class: "fa fa-youtube",
            title: "YouTube",
            color: "#CD201F",
            currentAddState: "Add",
        },
        {
            class: "fa fa-github",
            title: "GitHub",
            color: "black",
            currentAddState: "Add",
        },
        {
            class: "fa fa-twitter",
            title: "Twitter",
            color: "#1DA1F2",
            currentAddState: "Add",
        },
        {
            class: "fa fa-linkedin",
            title: "LinkedIn",
            color: "#0A66C2",
            currentAddState: "Add",
        }
    ];


    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    const storage = getStorage(app);
    const db = getFirestore(app);
    const user = auth.currentUser;
    const [userID, setuserID] = useState("");

    useEffect(() => {
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                const docRef = doc(db, "users", user.uid);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    console.log("Document data:", docSnap.data());
                    setuserID(docSnap.data().userID);
                }
            }
        });
    }, []);

    const isValidLink = (link) => {
        const urlRegex = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/[^\s]*)?$/;
        return urlRegex.test(link);
    };

    const [uploadedImage, setImage] = useState(Dummy);
    const [tempsetArray, settempArray] = useState([]);
    const [nameProfile, setnameProfile] = useState({ profile: "Enter a name above", bio: "Enter bio above" })

    useEffect(() => {
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                setImage(user.photoURL);
                const docRef = doc(db, "users", user.uid);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    console.log("Document data:", docSnap.data());
                    settempArray(docSnap.data().arrayOfObject);
                }
            }
            const docRef = doc(db, "users", user.uid);
            const docSnap = await getDoc(docRef);
            setnameProfile({ profile: docSnap.data().profile, bio: docSnap.data().bio });
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
            }
            const storageRef = ref(
                storage,
                `images/${user.uid + ' - ' + user.email}/${uploadedImage.name}`
            );

            try {
                toast('Uploading started', { autoClose: 1500 });
                await uploadBytes(storageRef, uploadedImage);
                const url = await getDownloadURL(storageRef);

                await updateProfile(auth.currentUser, { photoURL: url });
                try {
                    window.location.reload();
                }
                catch (err) {
                    toast.error('Something went wrong', { autoClose: 1500 });
                }
            } catch (err) {
                toast.error('Photo not updated', { autoClose: 1500 });
            }
        }
        else {
            toast("Please choose image", { autoClose: 1500 });
        }
    };

    //  * adding data a firebase;

    const handleSave = async (className, title, color, indexop) => {
        const user = auth.currentUser;
        let urlClass = document.querySelector(`.url${indexop}`);
        let nameClass = document.querySelector(`.name${indexop}`);
        let profile = document.querySelector(`.profile`);
        let bio = document.querySelector(`.bio`);
        if (isValidLink(urlClass.value) && nameClass.value.length > 0) {

            console.log("benchod-> ", urlClass.value);
            console.log("this is -> ", className, title, color);
            let obj = {
                class: className,
                title: title,
                color: color,
                link: urlClass.value,
                name: nameClass.value,
                currentAddState: "Added",
            };
            let tempArray = [];
            const docRef = doc(db, "users", user.uid);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                toast("Link added see section below for preview", { autoClose: 1500 });
                console.log("Document data:", docSnap.data());
                tempArray = docSnap.data().arrayOfObject || [];
            }
            tempArray.push(obj);
            setDoc(docRef, {
                arrayOfObject: tempArray,
                uid: docSnap.data().uid,
                userID: docSnap.data().userID,
                profile: profile.value,
                bio: bio.value
            });
            settempArray(tempArray);
            // setnameProfile({ profile: profile.value, bio: bio.value });
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
        console.log("deleting");
        console.log("this is naame-> " , naam);
        let newTemp = tempsetArray.filter((e) => {
            return e.name !== naam;
        });
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        console.log("opwara-> " , newTemp);
        setDoc(docRef, {
            arrayOfObject: newTemp,
            uid: docSnap.data().uid,
            userID: docSnap.data().userID,
            profile: docSnap.data().profile || "",
            bio: docSnap.data().bio || ""
        });
        settempArray(newTemp);
    };

    const AddNameAndBio = async () => {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        let profile = document.querySelector(`.profile`);
        let bio = document.querySelector(`.bio`);
        let tempArray = [];
        if (docSnap.exists()) {
            tempArray = docSnap.data().arrayOfObject || [];
        }
        setDoc(docRef, {
            arrayOfObject: tempArray,
            uid: docSnap.data().uid,
            userID: docSnap.data().userID,
            profile: profile.value,
            bio: bio.value
        });
        console.log("adding something");
        toast("Name and bio updates see preview section", { autoClose: 1500 });
        setnameProfile({ profile: profile.value, bio: bio.value });
    }

    return (
        <>
            <nav className='authNav'>
                <ul>
                    <li><img src={logo} alt="" /></li>
                    <li onClick={() => { window.location.href = `/${userID}` }} >{`localhost:5173/${userID}`}</li>
                </ul>
            </nav>
            <main className="User_main">
                <ToastContainer />

                <h1>~ Customization ~</h1>
                <h2>Profile Section</h2>

                <div className='align2' >

                    <div className='align'>
                        <img src={uploadedImage} alt="" />
                        <b></b>
                    </div>
                    <input id="imageInput" placeholder='' type="file" accept="image/*" onChange={handleImageChanges} />

                    <button onClick={handleUploading}>Upload New Image</button>

                </div>
                <input className="profile" placeholder='Profile name (@yourname)' type="text" />
                <br />
                <textarea className="bio" placeholder='Bio' cols="30" rows="3" />
                <br />
                <button onClick={AddNameAndBio} >Add name and bio</button>
                <br /><br />

                <br />
                <h2 style={{ marginBottom: "0px" }} > ~ Add Social Media Icons ~ </h2>
                <small>Click and add the social media links</small>
                <br /><br />
                <div className="socialIcons">

                    {
                        objArray.map((e, index) => {
                            return (
                                <>
                                    <div className='socailCard' >
                                        <i style={{ color: `${e.color}`, border: "1px solid " }} className={e.class} />
                                        <h4>{e.title}</h4>
                                        <input className={`name${index}`} placeholder={`Enter name (${e.title} id)`} type="text" />
                                        <input className={`url${index}`} placeholder="Enter link here" type="url" />
                                        <br />
                                        <span>
                                            <button onClick={() => { handleSave(e.class, e.title, e.color, index) }}>Add</button> &nbsp; &nbsp;
                                        </span>
                                    </div>
                                </>
                            )
                        })
                    }

                </div>
                <br /><br />
                <div className="cards align">
                    <h2>~ Added Links ~</h2>
                    <h3><b>Name : </b>{nameProfile.profile || ""}</h3>
                    <h3><b>Bio: </b> {nameProfile.bio || ""} </h3>
                    {
                        tempsetArray ? (tempsetArray.map((e) => {
                            return (
                                <>
                                    <div className="box">
                                        <i style={{ color: `${e.color}`, border: "1px solid " }} className={e.class} />
                                        <h4>{e.name}</h4>
                                        <a href={e.link} className='align2'>{e.link}</a>
                                        <button onClick={() => handleDelete(e.name)}>Delete</button>
                                    </div>
                                </>
                            )
                        })
                        ) : (<div></div>)
                    }
                </div>
            </main>
        </>
    )
}