import React, { useRef, useState, useEffect } from 'react';
import { onAuthStateChanged, getAuth, updateProfile } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { toast } from 'react-toastify';
import firebaseConfig from '../../firebaseConfig';
import "./User.css"
import Dummy from "./dummyimage.webp"

export default function User() {

    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    const storage = getStorage(app);

    const icon = useRef(null);
    const socailLinks = useRef(null);

    const [uploadedImage, setImage] = useState(Dummy);

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setImage(user.photoURL);
            }
        });
    }, []);

    useEffect(() => {
        const user = auth.currentUser;
        console.log("this is the user------> ", user);
    });

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

    //  * saving data a firebase;

    const handleSave = (e) =>{
        console.log("saved some data bawa");
        const clickedIcon = e.currentTarget.innerHTML;
        console.log("this is ankit singh chauhan-> "  , e);
    }


    // todo : "adding social media to the page"

    const handleAdding = (e) => {
        const clickedIcon = e.currentTarget;
        console.log("op bawa-> ", clickedIcon.innerHTML);
        const iconHTML = clickedIcon.innerHTML;

        const socialLinksDiv = socailLinks.current;
        const newLinkDiv = document.createElement('div');
        newLinkDiv.className = 'box';
        newLinkDiv.innerHTML = `
          ${iconHTML}
          <input type="url" name="" />
          <button onClick={handleSave} >Save</button>
        `;

        socialLinksDiv.appendChild(newLinkDiv);
    };


    return (
        <main className="User_main">

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
            <input placeholder='Profile name (@yourname)' type="text" />
            <br />
            <textarea placeholder='Bio' name="" id="" cols="25" rows="5"></textarea>
            <br /><br />


            {/* todo : social section from here */}

            <br />
            <h2 style={{ marginBottom: "0px" }} > ~ Add Social Media Icons ~ </h2>
            <small>Click and add the social media links</small>
            <br /><br />
            <div className="socialIcons">
                <div ref={icon} onClick={handleAdding}>
                    <i style={{ color: "red", border: "1px solid " }} className="fa fa-envelope"></i>
                    <h4>Gmail</h4>
                    <input placeholder="Enter link here" type="url"/>
                    <br />
                    <button onClick={handleSave}>Save</button>
                </div>

                <div ref={icon} onClick={handleAdding}>
                    <i style={{ color: "blue", border: "1px solid " }} className="fa fa-facebook"></i>
                    <h4>Facebook</h4>
                    <input placeholder="Enter link here" type="url"/>
                    <br />
                    <button onClick={handleSave}>Save</button>
                </div>

                <div ref={icon} onClick={handleAdding}>
                    <i style={{ color: "#E4405F", border: "1px solid " }} className="fa fa-instagram"></i>
                    <h4>Instagram</h4>
                    <input placeholder="Enter link here" type="url"/>
                    <br />
                    <button onClick={handleSave}>Save</button>
                </div>

                <div ref={icon} onClick={handleAdding}>
                    <i style={{ color: "yellow", border: "1px solid " }} className="fa fa-snapchat-ghost"></i>
                    <h4>Snapchat</h4>
                    <input placeholder="Enter link here" type="url"/>
                    <br />
                    <button onClick={handleSave}>Save</button>
                </div>

                <div ref={icon} onClick={handleAdding}>
                    <i style={{ color: "black", border: "1px solid " }} className="fa fa-link"></i>
                    <h4>Website</h4>
                    <input placeholder="Enter link here" type="url"/>
                    <br />
                    <button onClick={handleSave}>Save</button>
                </div>

                <div ref={icon} onClick={handleAdding}>
                    <i style={{ color: "orange", border: "1px solid " }} className="fa fa-stack-overflow"></i>
                    <h4>Stack Overflow</h4>
                    <input placeholder="Enter link here" type="url"/>
                    <br />
                    <button onClick={handleSave}>Save</button>
                </div>

                <div ref={icon} onClick={handleAdding}>
                    <i style={{ color: "#CD201F", border: "1px solid " }} className="fa fa-youtube"></i>
                    <h4>YouTube</h4>
                    <input placeholder="Enter link here" type="url"/>
                    <br />
                    <button onClick={handleSave}>Save</button>
                </div>

                <div ref={icon} onClick={handleAdding}>
                    <i style={{ color: "black", border: "1px solid " }} className="fa fa-github"></i>
                    <h4>GitHub</h4>
                    <input placeholder="Enter link here" type="url"/>
                    <br />
                    <button onClick={handleSave}>Save</button>
                </div>

                <div ref={icon} onClick={handleAdding}>
                    <i style={{ color: "#1DA1F2", border: "1px solid " }} className="fa fa-twitter"></i>
                    <h4>Twitter</h4>
                    <input placeholder="Enter link here" type="url"/>
                    <br />
                    <button onClick={handleSave}>Save</button>
                </div>

                <div ref={icon} onClick={handleAdding}>
                    <i style={{ color: "#0A66C2", border: "1px solid " }} className="fa fa-linkedin"></i>
                    <h4>LinkedIn</h4>
                    <input placeholder="Enter link here" type="url"/>
                    <br />
                    <button onClick={handleSave}>Save</button>
                </div>
            </div>
        </main>
    )
}
