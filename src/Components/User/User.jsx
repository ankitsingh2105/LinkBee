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

    const fontFamilies = [
        "'Acme', sans-serif",
        "'Anton', sans-serif",
        "'Bacasime Antique', serif",
        "'Bree Serif', serif",
        "'Caveat', cursive",
        "'Crimson Text', serif",
        "'Dosis', sans-serif",
        "'Pacifico', cursive",
        "'Roboto', sans-serif",
        "'Satisfy', cursive",
        "'Teko', sans-serif",
    ];



    const tempUserArray = [
        {
            class: "fa fa-facebook",
            color: "blue",
            link: "https://templinklinkbeen.link/",
            name: "Dummy Facebook",
            title: "Dummy Facebook"
        },
        {
            class: "fa fa-instagram",
            color: "#E4405F",
            link: "https://templinklinkbeen.link/",
            name: "Dummy Insta ",
            title: "Instagram"
        },
        {
            class: "fa fa-github",
            color: "black",
            link: "https://templinklinkbeen.link/",
            name: " Dummy Github",
            title: "Snapchat"
        },
        {
            class: "fa fa-snapchat-ghost",
            color: "yellow",
            link: "https://templinklinkbeen.link/",
            name: "Dummy SnapChat",
            title: "Snapchat"
        },
        {
            class: "fa fa-stack-overflow",
            color: "orange",
            link: "https://templinklinkbeen.link/",
            name: "Dummy StackOverFlow",
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
            gradient: "linear-gradient(180deg, #FBAB7E 0%, #F7CE68 100%)",
        },
        {
            gradient: "linear-gradient(180deg, #85FFBD 0%, #FFFB7D 100%)",
        },
        {
            gradient: "linear-gradient(180deg, #FA8BFF 0%,  #2BFF88 100%)",
        },
        {
            gradient: "linear-gradient(180deg, #A9C9FF 0%, #FFBBEC 100%)",
        },
        {
            gradient: "linear-gradient(180deg, #FAACA8 0%, #DDD6F3 100%)",
        },
        {
            gradient: "linear-gradient(180deg, #FF3CAC 0%, #2B86C5 100%)",
        },
        {
            gradient: "linear-gradient(180deg, #F4D03F 0%, #16A085 100%)",
        },
        {
            gradient: "linear-gradient(180deg, #00DBDE 0%, #FC00FF 100%)",
        },
        {
            gradient: "linear-gradient(180deg, #FFDEE9 0%, #B5FFFC 100%)",
        },
        {
            gradient: "linear-gradient(180deg, #FEE140 0%, #FA709A 100%)",
        },
        {
            gradient: "linear-gradient(180deg, #0093E9 0%, #80D0C7 100%)",
        },
    ];


    const colors = [
        "#000000", // Black
        "rgb(51, 55, 55)",
        "#ffffff", // White
        "#FF4500", // OrangeRed
        "#FFD700", // Gold
        "#7FFF00", // Chartreuse
        "#DC143C", // Crimson
        "#00BFFF", // DeepSkyBlue
        "#9400D3", // DarkViolet
        "#FF1493", // DeepPink
        "#00CED1", // DarkTurquoise
        "#FF8C00", // DarkOrange
        "#8A2BE2", // BlueViolet
        "#00FF7F", // SpringGreen
        "#9932CC", // DarkOrchid
        "#FF4500", // OrangeRed
        "#00FF00", // Lime
        "#FF69B4", // HotPink
        "#1E90FF", // DodgerBlue
        "#FF00FF", // Fuchsia
        "#00FFFF", // Cyan
    ];





    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    let user = auth.currentUser;
    const storage = getStorage(app);
    const db = getFirestore(app);

    const [loading, setloading] = useState(true);
    const [userID, setuserID] = useState("tempUser");
    const [uploadedImage, setImage] = useState(Dummy);
    const [tempsetArray, settempArray] = useState(tempUserArray);

    const [profile, setprofile] = useState('Dummy User Name');
    const [bio, setbio] = useState('Bio for Dummy user, something have to here anyways');
    const [id, setID] = useState('DummyUser');
    const [imageUrl, setImageUrl] = useState(Dummy);
    const [gradientValue, setgradientValue] = useState("linear-gradient(0deg, #FFDEE9 0%, #B5FFFC 100%)")
    const [FontFamily, setFontFamily] = useState("'Bree Serif', serif");
    const [bgColor, setbgColor] = useState("rgb(51, 55, 55)");
    const [fontColor, setfontColor] = useState("white");
    const [imgUrl, seturl] = useState("")

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
                setbio(docSnap.data().bio ? docSnap.data().bio : "");
                setprofile(docSnap.data().profile ? docSnap.data().profile : "");
                setID(docSnap.data().userID);
                setImageUrl(docSnap.data().imageURL ? docSnap.data().imageURL : imageUrl);
                setgradientValue(docSnap.data().gradient ? docSnap.data().gradient : gradientValue);
                setloading(false);
                settempArray(docSnap.data().arrayOfObject ? docSnap.data().arrayOfObject : tempsetArray);
                setloading(false);
                setuserID(docSnap.data().userID);
                setImage(user.photoURL ? user.photoURL : "");
                setFontFamily(docSnap.data().fontFamily ? docSnap.data().fontFamily : "");
                setbgColor(docSnap.data().cardBgColor ? docSnap.data().cardBgColor : "");
                setfontColor(docSnap.data().cardFontColor ? docSnap.data().cardFontColor : "");

                console.log('tempsetArray:', tempsetArray);
                console.log('profile:', profile);
                console.log('bio:', bio);
                console.log('id:', id);
                console.log('imageUrl:', imageUrl);
                console.log('gradientValue:', gradientValue);
                console.log('FontFamily:', FontFamily);
                console.log('bgColor:', bgColor);
                console.log('fontColor:', fontColor);
                console.log('imgUrl:', imgUrl);

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
                seturl(url)

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
            console.log("this is the temp shit-> ", tempArray);
            setDoc(docRef, {
                arrayOfObject: tempArray,
                userID: docSnap.data().userID,
                profile: profile,
                bio: bio,
                imageURL: imgUrl,
                gradient: gradientValue,
                fontFamily: FontFamily,
                cardBgColor: bgColor,
                cardFontColor: fontColor,
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
            profile: profile,
            bio: bio,
            imageURL: imgUrl,
            gradient: gradientValue,
            fontFamily: FontFamily,
            cardBgColor: bgColor,
            cardFontColor: fontColor,
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
                console.log("--->", bio.value, profile.value, lastTerm);
                tempArray = docSnap.data().arrayOfObject || [];
                setDoc(docRef, {
                    arrayOfObject: tempArray,
                    userID: docSnap.data().userID,
                    profile: profile.value,
                    bio: bio.value,
                    imageURL: imgUrl,
                    gradient: gradientValue,
                    fontFamily: FontFamily,
                    cardBgColor: bgColor,
                    cardFontColor: fontColor,
                });
                toast("Name and bio updated, see section below", { autoClose: 1500 });
                setbio(bio.value);
                setprofile(profile.value);
            }
        }
    }


    const handleGradient = async (e) => {
        setgradientValue(e);
        const docRef = doc(db, "users", lastTerm);
        const docSnap = await getDoc(docRef);
        setDoc(docRef, {
            arrayOfObject: tempsetArray,
            userID: docSnap.data().userID,
            profile: profile,
            bio: bio,
            imageURL: imgUrl,
            gradient: e,
            fontFamily: FontFamily,
            cardBgColor: bgColor,
            cardFontColor: fontColor,
        });
    }

    const handleFont = async (e) => {
        setFontFamily(e);
        const docRef = doc(db, "users", lastTerm);
        const docSnap = await getDoc(docRef);
        setDoc(docRef, {
            arrayOfObject: tempsetArray,
            userID: docSnap.data().userID,
            profile: profile,
            bio: bio,
            imageURL: imgUrl,
            gradient: gradientValue,
            fontFamily: e,
            cardBgColor: bgColor,
            cardFontColor: fontColor,
        });
    }

    const handleBgColor = async (e) => {
        setbgColor(e);
        const docRef = doc(db, "users", lastTerm);
        const docSnap = await getDoc(docRef);
        setDoc(docRef, {
            arrayOfObject: tempsetArray,
            userID: docSnap.data().userID,
            profile: profile,
            bio: bio,
            imageURL: imgUrl,
            gradient: gradientValue,
            fontFamily: FontFamily,
            cardBgColor: e,
            cardFontColor: fontColor,
        });
    }

    const handleFontColor = async (e) => {
        setfontColor(e);
        const docRef = doc(db, "users", lastTerm);
        const docSnap = await getDoc(docRef);
        setDoc(docRef, {
            arrayOfObject: tempsetArray,
            userID: docSnap.data().userID,
            profile: profile,
            bio: bio,
            imageURL: imgUrl,
            gradient: gradientValue,
            fontFamily: FontFamily,
            cardBgColor: bgColor,
            cardFontColor: e,
        });
    }

    return (
        <>
            <Helmet>
                {/* <title>~ Create Section | @{id} ~</title> */}
            </Helmet>
            <ToastContainer style={{ zIndex: 999999999999 }} />
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
                                    <h2>~Profile Section~</h2>

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
                                        <h3 style={{ fontWeight: "300" }}><b>Name : </b>{profile || ""}</h3>
                                        <h3 style={{ fontWeight: "300" }}><b>Bio: </b> {bio || ""} </h3>
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
                                <div className="preview_section">
                                    <main className='sticky_phone_preview' >
                                        <h1 className="align" >~ Preview ~</h1>
                                        <main style={{ backgroundImage: gradientValue, fontFamily: FontFamily }} className="FinalDisplay_main2" >

                                            <div className="notch">
                                            </div>

                                            <nav style={{ background: gradientValue, fontFamily: FontFamily }} className='FinalDisplayNav2' >
                                                <ul>
                                                    <li><img src={imageUrl} alt="" /></li>
                                                    <li>@{id}</li>
                                                    <li onClick={() => { window.location.href = "http://linkbee.online/" }} ><button>Link Bee</button></li>
                                                </ul>
                                            </nav>

                                            <img style={{ marginTop: "4rem" }} src={imageUrl} alt="" />
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
                                                    <div style={{ width: "17rem", background: bgColor, color: fontColor }} className="finalCard" key={e.name}>
                                                        <i style={{ color: `${e.color}`, border: ".1px solid black" }} className={e.class}></i>
                                                        <span>{e.name}</span>
                                                        <a href={e.link}>
                                                            <i style={{ border: ".1px solid black" }} className="fa-solid fa-diamond-turn-right" />
                                                        </a>
                                                    </div>
                                                );
                                            })) : (<div></div>)}
                                            <br />
                                        </main>
                                    </main>
                                    <main className="align5" style={{ paddingTop: "4rem" }} >

                                        <div className='align'>
                                            <h1>~ Select Gradient ~</h1>
                                            <main className="gradient_background">
                                                {
                                                    backgroundsGradients.map((e, index) => {
                                                        return (
                                                            <div key={index} onClick={() => handleGradient(e.gradient)} style={{ background: e.gradient }} className="gradient_box"></div>
                                                        )
                                                    })
                                                }
                                            </main>
                                        </div>
                                        <br /><br />

                                        <div className='align'>
                                            <h1>~ Select Fonts ~</h1>
                                            <main className="font_customization">
                                                {
                                                    fontFamilies.map((e , index) => {
                                                        return (
                                                            <div  key={index} onClick={() => handleFont(e)} className="font_style" style={{ fontFamily: e }}>The quick brown fox jumps over the lazy dog.</div>
                                                        )
                                                    })
                                                }
                                            </main>
                                        </div>
                                        <br /><br />


                                        <div className='align'>
                                            <h1>~ Select background ~</h1>
                                            <main className="font_color_customization">
                                                {
                                                    colors.map((e , index) => {
                                                        return (
                                                            <div  key={index} onClick={() => handleBgColor(e)} className="font_color" style={{ background: e }}></div>
                                                        )
                                                    })
                                                }
                                            </main>
                                        </div>
                                        <br /><br />

                                        <div className='align'>
                                            <h1>~ Select Color ~</h1>
                                            <main className="font_color_customization">
                                                {
                                                    colors.map((e , index) => {
                                                        return (
                                                            <div  key={index} onClick={() => handleFontColor(e)} className="font_color" style={{ background: e }}></div>
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