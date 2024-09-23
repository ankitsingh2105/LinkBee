import React from 'react'
import errorHoney from "../FinalDisplay/errorHoney.webp"
import "../FinalDisplay/FinalDisplay.css"
export default function Error() {
    return (
        <div className="errorContainer" style={{marginTop : "-5rem"}} >
            <span className="align">
                <img style={{ marginTop: "8rem" }} src={errorHoney} alt="" />
                <br />
                <span><b>~Link bee has transformed into Link Wasp because~</b></span>
                <br />
                <span><b>~Page don't exist, you can signup or login below~ </b></span>
                <br />
                <br />
                <div className="align4">
                <button onClick={()=>{window.location.href = "/signup"}}>Sign up</button>
                &nbsp; &nbsp; &nbsp;
                <button onClick={()=>{window.location.href = "/login"}}>Log In</button>
                </div>
            </span>
        </div>
    )
}
