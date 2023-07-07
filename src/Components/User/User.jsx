import React, { useState, useEffect, useRef } from 'react';
import { onAuthStateChanged, getAuth, updateProfile } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { doc, setDoc, getDoc, getFirestore } from "firebase/firestore";
import { toast, ToastContainer } from 'react-toastify';
import firebaseConfig from '../../firebaseConfig';
import "./User.css"
import Dummy from "./dummyimage.webp"
import logo from "../Navbar/link bee.png"
import { Helmet } from 'react-helmet';

export default function User() {

    const tempUserArray = [
        {
          class: "fa fa-facebook",
          color: "blue",
          link: "https://templinklinkbeen.link/",
          name: "Temo Facebook",
          title: "Temp Facebook"
        },
        {
          class: "fa fa-instagram",
          color: "#E4405F",
          link: "https://templinklinkbeen.link/",
          name: "Temp Insta ",
          title: "Instagram"
        },
        {
          class: "fa fa-github",
          color: "black",
          link: "https://templinklinkbeen.link/",
          name: " Temp Github",
          title: "Snapchat"
        },
        {
          class: "fa fa-snapchat-ghost",
          color: "yellow",
          link: "https://templinklinkbeen.link/",
          name: "Temp SnapChat",
          title: "Snapchat"
        },
        {
          class: "fa fa-stack-overflow",
          color: "orange",
          link: "https://templinklinkbeen.link/",
          name: "Temp StackOverFlow",
          title: "Snapchat"
        },
      ];

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
    const backgroundsGradients = [
        {
            gradient: " linear-gradient(62deg, #FBAB7E 0%, #F7CE68 100%)",
        },
        {
            gradient: " linear-gradient(45deg, #85FFBD 0%, #FFFB7D 100%)",
        },
        {
            gradient: " linear-gradient(45deg, #FA8BFF 0%, #2BD2FF 52%, #2BFF88 90%)",
        },
        {
            gradient: " linear-gradient(180deg, #A9C9FF 0%, #FFBBEC 100%)",
        },
        {
            gradient: " linear-gradient(19deg, #FAACA8 0%, #DDD6F3 100%)",
        },
        {
            gradient: " linear-gradient(225deg, #FF3CAC 0%, #784BA0 50%, #2B86C5 100%)",
        },
        {
            gradient: " linear-gradient(132deg, #F4D03F 0%, #16A085 100%)",
        },
        {
            gradient: " linear-gradient(90deg, #00DBDE 0%, #FC00FF 100%)"
        },
        {
            gradient: "linear-gradient(0deg, #FFDEE9 0%, #B5FFFC 100%)"
        },
        {
            gradient: "linear-gradient(90deg, #FEE140 0%, #FA709A 100%)"
        },
        {
            gradient: "linear-gradient(160deg, #0093E9 0%, #80D0C7 100%)"
        },

    ];



    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    let user = auth.currentUser;
    const storage = getStorage(app);
    const db = getFirestore(app);

    const [userID, setuserID] = useState("tempUser");
    const [uploadedImage, setImage] = useState(Dummy);
    const [tempsetArray, settempArray] = useState(tempUserArray);
    const [nameProfile, setnameProfile] = useState({ profile: "Enter a name above", bio: "Enter bio above" })
    const [loading, setloading] = useState(true);

    const [profile, setprofile] = useState('TempUser Name');
    const [bio, setbio] = useState('Bio for temp user, something have to here anyways');
    const [id, setID] = useState('tempUser');
    const [gradientValue, setgradientValue] = useState("")
    const [imageUrl, setImageUrl] = useState(Dummy);

    const currentUrl = window.location.pathname;
    const parts = currentUrl.split('/');
    const lastTerm = parts[parts.length - 1];

    useEffect(() => {
        onAuthStateChanged(auth, async (user) => {
            const currentUrl = window.location.pathname;
            const parts = currentUrl.split('/');
            const lastTerm = parts[parts.length - 1];
            const docRef = doc(db, 'users', lastTerm);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists() && user) {
                setbio(docSnap.data().bio);
                setprofile(docSnap.data().profile);
                setID(docSnap.data().userID);
                setImageUrl(docSnap.data().imageURL || Dummy);
                setgradientValue(docSnap.data().gradient || "linear-gradient(0deg, #FFDEE9 0%, #B5FFFC 100%)")
                setloading(false);
                settempArray(docSnap.data().arrayOfObject);
                setnameProfile({ profile: docSnap.data().profile, bio: docSnap.data().bio });
                setloading(false);
                setuserID(docSnap.data().userID);
                setImage(user.photoURL);
            } else {
                setloading(false);
            }
        });
    }, []);

    const isValidLink = (link) => {
        const urlRegex = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/[^\s]*)?$/;
        return urlRegex.test(link);
    };

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

    const addHttpsToLink = (link) => {
        if (!link.startsWith('http://') && !link.startsWith('https://')) {
            return 'https://' + link;
        }
        return link;
    };


    const handleSave = async (className, title, color, indexop) => {
        if (!user) {
            toast("Please login first", { autoClose: 1500 });
            return;
        }
        let urlClass = document.querySelector(`.url${indexop}`);
        let nameClass = document.querySelector(`.name${indexop}`);
        let profile = document.querySelector(`.profile`);
        let bio = document.querySelector(`.bio`);
        if (isValidLink(urlClass.value) && nameClass.value.length > 0) {
            let obj = {
                class: className,
                title: title,
                color: color,
                link: addHttpsToLink(urlClass.value),
                name: nameClass.value,
            };
            let tempArray = [];
            const docRef = doc(db, "users", lastTerm);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                toast("Link added, see section below for preview", { autoClose: 1500 });
                tempArray = docSnap.data().arrayOfObject || [];
            }
            tempArray.push(obj);
            setDoc(docRef, {
                arrayOfObject: tempArray,
                userID: docSnap.data().userID,
                profile: docSnap.data().profile || profile.value,
                bio: docSnap.data().bio || bio.value,
                imageURL: docSnap.data().imageURL || "",
                gradient: gradientValue
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
            imageURL: docSnap.data().imageURL || "",
            gradient: gradientValue
        });
        settempArray(newTemp);
    };

    const AddNameAndBio = async () => {
        const user = auth.currentUser;
        const docRef = doc(db, "users", lastTerm);
        const docSnap = await getDoc(docRef);
        let profile = document.querySelector(`.profile`);
        let bio = document.querySelector(`.bio`);
        let tempArray = [];
        if (!user) {
            toast("Please login first", { autoClose: 1500 });
        }
        else if (bio.value === "" || profile.value === "") {
            toast("Please fill both the sections", { autoClose: 1500 });
        }
        else {
            if (docSnap.exists() && user) {
                tempArray = docSnap.data().arrayOfObject || [];
                setDoc(docRef, {
                    arrayOfObject: tempArray,
                    userID: docSnap.data().userID,
                    imageURL: docSnap.data().imageURL,
                    profile: profile.value,
                    bio: bio.value,
                    gradient: gradientValue
                });
                toast("Name and bio updated, see section below", { autoClose: 1500 });
                setnameProfile({ profile: profile.value, bio: bio.value });
            }
        }
    }


    const handleClick = async (e) => {
        setgradientValue(e);
        const docRef = doc(db, "users", lastTerm);
        const docSnap = await getDoc(docRef);
        setDoc(docRef, {
            arrayOfObject: docSnap.data().arrayOfObject,
            userID: docSnap.data().userID,
            imageURL: docSnap.data().imageURL,
            profile: docSnap.data().profile,
            bio: docSnap.data().bio,
            gradient: e
        });
    }


    return (
        <>
            <Helmet>
                <title>~ Create Section | @{id} ~</title>
            </Helmet>
            <ToastContainer style={{ zIndex: 99999999 }} />
            <main className="cover">

                {
                    loading ? (<div className="align"><main className="loadingWheel"></main></div>)
                        :
                        (
                            <>
                                <nav className='authNav'>
                                    <ul>
                                        <li onClick={() => { window.location.href = "/" }} ><img src={logo} alt="" /></li>
                                        <li onClick={() => { window.location.href = `/${userID}` }} >{`linkbee.online/${userID}`}</li>
                                    </ul>
                                </nav>
                                <main className="User_main">

                                    <h1>~ Customization ~</h1>
                                    <h2>Profile Section</h2>

                                    <div className='align2' >
                                        <img src={uploadedImage || Dummy} alt="click upload new image" />
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
                                        <h2>~ Edits Links ~</h2>
                                        <h3 style={{ fontWeight: "300" }}><b>Name : </b>{nameProfile.profile || ""}</h3>
                                        <h3 style={{ fontWeight: "300" }}><b>Bio: </b> {nameProfile.bio || ""} </h3>
                                        {
                                            tempsetArray ? (tempsetArray.map((e, index) => {
                                                return (
                                                    <div key={index} className="box">
                                                        <i style={{ color: `${e.color}`, border: "1px solid " }} className={e.class} />
                                                        <br />
                                                        <h4>{e.name}</h4>
                                                        <br />
                                                        <a href={e.link} className='align2'>{e.link}</a>
                                                        <br />
                                                        <button onClick={() => handleDelete(e.name)}>Delete</button>
                                                    </div>
                                                )
                                            })
                                            ) : (<div></div>)
                                        }
                                    </div>
                                </main>

                                {/* This is the preview */}
                                <div className="align2">
                                    <main>

                                        <h1 className="align" >~ Preview ~</h1>
                                        <main style={{ backgroundImage: gradientValue }} className="FinalDisplay_main2" >
                                            <ToastContainer style={{ zIndex: 99999999 }} />
                                            <div className="notch">
                                            </div>
                                            <img src={imageUrl} alt="" />
                                            <br />
                                            <span>
                                                <b> @{id} </b>
                                            </span>
                                            <br />
                                            <span style={{ marginTop: '-10px' }}>{bio}</span>
                                            <br /> <br />
                                            <span>{profile}</span>
                                            {tempsetArray ? (tempsetArray.map((e) => {
                                                return (
                                                    <div style={{ width: "17rem" }} className="finalCard" key={e.name}>
                                                        <i style={{ color: `${e.color}` }} className={e.class}></i>
                                                        <span>{e.name}</span>
                                                        <a href={e.link}>
                                                            <i className="fa-solid fa-diamond-turn-right" />
                                                        </a>
                                                    </div>
                                                );
                                            })) : (<div></div>)}
                                            <br />
                                        </main>
                                    </main>
                                    <main className="align5">
                                        <div className='align'>
                                            <h1>~ Select Gradient ~</h1>
                                            <main className="gradient_background">
                                                {
                                                    backgroundsGradients.map((e, index) => {
                                                        return (
                                                            <div key={index} onClick={() => handleClick(e.gradient)} style={{ background: e.gradient }} className="gradient_box"></div>
                                                        )
                                                    })
                                                }
                                            </main>
                                        </div>
                                        <br /><br />
                                    </main>
                                </div>
                                <br />

                            </>

                        )
                }
            </main>
        </>

    )
}