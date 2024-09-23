import React from 'react'
import "./Message.css"
import { toast } from 'react-toastify';
export default function Message() {


    const handleMessage = (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const email = e.target.email.value;
        const message = e.target.message.value;
    }

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
